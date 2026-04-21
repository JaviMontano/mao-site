/**
 * Diagnostic Controller — DOM orchestration + optimistic result + deferred sync
 *
 * Orchestrates the 6-step diagnostic flow:
 *   Steps 1-5: scored questions → saveAnswer per step
 *   Step 6: PII capture (email, name, consent)
 *   Result: shown immediately via computeScore (zero network dependency)
 *   Background: anonymous auth → Firestore write → markSynced/markSyncFailed
 *
 * On next page load: retrySync() if shouldRetrySync() (max 3, exponential backoff).
 *
 * @module js/diagnostic/controller
 * @see specs/009-home-landing-sales/plan.md R14
 */

import {
  computeScore,
  getThreshold,
  getRecommendation,
  getQuestions,
  validateAnswers,
} from './logic.js';

import {
  getState,
  startDiagnostic,
  saveAnswer,
  completeDiagnostic,
  markSynced,
  markSyncFailed,
  shouldRetrySync,
} from './state.js';

import { trackEvent } from '../analytics/events.js';
import { emit, on } from '../state/bus.js';

/* ------------------------------------------------------------------ */
/*  Module-level state                                                */
/* ------------------------------------------------------------------ */

let _locale = 'es';
let _audience = 'persona';
let _containerEl = null;
let _questions = [];

/* ------------------------------------------------------------------ */
/*  Firestore helper — best-effort, never blocks UI                   */
/* ------------------------------------------------------------------ */

/**
 * Write lead + diagnostic docs to Firestore in the background.
 * Uses anonymous auth. Silently no-ops if Firebase is unavailable.
 *
 * @param {object} result   - { score, threshold, recommendation }
 * @param {object} pii      - { email, name, consent }
 * @param {object} answers  - raw answer map
 * @returns {Promise<void>}
 */
async function syncToFirestore(result, pii, answers) {
  try {
    // Dynamic import — avoids hard dependency; tree-shakes if unused
    const { getApp } = await import('firebase/app');
    const { getAuth, signInAnonymously } = await import('firebase/auth');
    const { getFirestore, collection, addDoc, serverTimestamp } = await import('firebase/firestore');

    const app = getApp();
    const auth = getAuth(app);

    // Anonymous auth (no user interaction required)
    await signInAnonymously(auth);

    const db = getFirestore(app);
    const ts = serverTimestamp();
    const state = getState();

    const sharedFields = {
      locale: _locale,
      audience: _audience,
      createdAt: ts,
    };

    // Write lead doc
    await addDoc(collection(db, 'leads'), {
      ...sharedFields,
      email: pii.email,
      name: pii.name,
      consent: pii.consent,
      source: 'diagnostic',
    });

    // Write diagnostic doc
    await addDoc(collection(db, 'diagnostics'), {
      ...sharedFields,
      answers,
      score: result.score,
      nivel_id: result.threshold.nivel_id,
      startedAt: state.startedAt,
      completedAt: state.completedAt,
    });

    markSynced();
    trackEvent('diagnostic_synced', { nivel_id: result.threshold.nivel_id });
  } catch (_err) {
    markSyncFailed();
    // Silent — user already has their result; data stays in localStorage
  }
}

/* ------------------------------------------------------------------ */
/*  Retry logic — exponential backoff 1s → 4s → 16s                  */
/* ------------------------------------------------------------------ */

const BACKOFF_BASE_MS = 1000;
const BACKOFF_FACTOR = 4;

/**
 * Attempt to sync a pending diagnostic to Firestore.
 * Called on page load when shouldRetrySync() is true.
 * Exponential backoff: attempt N waits BACKOFF_BASE_MS * BACKOFF_FACTOR^N ms.
 */
export async function retrySync() {
  if (!shouldRetrySync()) return;

  const state = getState();
  if (!state.result || state.status !== 'completed') return;

  // Calculate delay based on previous failures
  const failures = state.sync_failures || 0;
  const delay = BACKOFF_BASE_MS * Math.pow(BACKOFF_FACTOR, failures);

  await new Promise((resolve) => setTimeout(resolve, delay));

  // Re-check — state may have changed during delay
  if (!shouldRetrySync()) return;

  try {
    const { getApp } = await import('firebase/app');
    const { getAuth, signInAnonymously } = await import('firebase/auth');
    const { getFirestore, collection, addDoc, serverTimestamp } = await import('firebase/firestore');

    const app = getApp();
    const auth = getAuth(app);
    await signInAnonymously(auth);

    const db = getFirestore(app);
    const ts = serverTimestamp();
    const current = getState();

    const sharedFields = {
      locale: _locale,
      audience: _audience,
      createdAt: ts,
    };

    // Retry both writes — idempotent from the server's perspective
    // (duplicates are acceptable; dedup can happen server-side)
    await addDoc(collection(db, 'leads'), {
      ...sharedFields,
      email: current.result.email || '',
      name: current.result.name || '',
      consent: current.result.consent || false,
      source: 'diagnostic',
    });

    await addDoc(collection(db, 'diagnostics'), {
      ...sharedFields,
      answers: current.answers,
      score: current.result.score,
      nivel_id: current.result.nivel_id,
      startedAt: current.startedAt,
      completedAt: current.completedAt,
    });

    markSynced();
    trackEvent('diagnostic_retry_synced');
  } catch (_err) {
    markSyncFailed();
  }
}

/* ------------------------------------------------------------------ */
/*  Public API                                                        */
/* ------------------------------------------------------------------ */

/**
 * Initialize the diagnostic flow.
 * Loads questions for the given locale and prepares the container.
 *
 * @param {object} options
 * @param {string} options.locale    - 'es' | 'en'
 * @param {string} options.audience  - 'persona' | 'empresa'
 * @param {HTMLElement} options.containerEl - DOM node to render into
 */
export function initDiagnostic({ locale = 'es', audience = 'persona', containerEl }) {
  _locale = locale;
  _audience = audience;
  _containerEl = containerEl;
  _questions = getQuestions(locale);

  // Check for pending sync from a previous session
  if (shouldRetrySync()) {
    retrySync();
  }

  // If there's already a completed diagnostic, show result
  const current = getState();
  if (current.status === 'completed' && current.result) {
    emit('diagnostic_show_result', current.result);
    return;
  }

  // Start fresh
  const state = startDiagnostic();
  trackEvent('diagnostic_started', { locale, audience });
  emit('diagnostic_show_step', { step: state.step, question: _questions[0] });
}

/**
 * Handle a user's answer to a diagnostic question.
 * Saves the answer and advances to the next step or PII capture.
 *
 * @param {string} questionId - e.g. 'q1'
 * @param {string} answerId   - e.g. 'q1_a'
 */
export function handleStepAnswer(questionId, answerId) {
  const state = saveAnswer(questionId, answerId);
  trackEvent('diagnostic_answer', { questionId, answerId, step: state.step });

  const questionIndex = state.step - 1;

  if (questionIndex < _questions.length) {
    // More scored questions remain
    emit('diagnostic_show_step', {
      step: state.step,
      question: _questions[questionIndex],
    });
  } else {
    // All scored questions answered — show PII capture (step 6)
    emit('diagnostic_show_pii', { step: state.step });
  }
}

/**
 * Handle PII form submission.
 * Computes result immediately (optimistic), then syncs to Firestore in background.
 *
 * @param {object} formData
 * @param {string} formData.email
 * @param {string} formData.name
 * @param {boolean} formData.consent
 */
export function handlePiiSubmit(formData) {
  const state = getState();
  const { valid, missing } = validateAnswers(state.answers);

  if (!valid) {
    emit('diagnostic_error', { type: 'incomplete', missing });
    return;
  }

  // Pure computation — zero network dependency
  const score = computeScore(state.answers);
  const threshold = getThreshold(score);
  const recommendation = getRecommendation(threshold.nivel_id);

  const result = {
    score,
    threshold,
    recommendation,
    email: formData.email,
    name: formData.name,
    consent: formData.consent,
    nivel_id: threshold.nivel_id,
  };

  // Persist to localStorage immediately
  completeDiagnostic(result);

  // Show result to user — no waiting
  emit('diagnostic_show_result', result);
  trackEvent('diagnostic_completed', {
    score,
    nivel_id: threshold.nivel_id,
    audience: _audience,
  });

  // Background sync — fire and forget
  syncToFirestore(result, formData, state.answers);
}
