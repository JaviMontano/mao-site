/**
 * Diagnostic State Machine — localStorage-backed with 24h TTL
 * @module js/diagnostic/state
 * Dependencies: js/state/bus.js
 */

import { emit } from '../state/bus.js';

const STORAGE_KEY = 'mdg_diagnostic';
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_SYNC_FAILURES = 3;

const INITIAL_STATE = {
  status: 'idle',
  step: 0,
  answers: {},
  startedAt: null,
  completedAt: null,
  result: null,
  synced: false,
  pending_sync: false,
  sync_failures: 0,
  sync_attempt_ts: null,
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_STATE };
    const parsed = JSON.parse(raw);
    return { ...INITIAL_STATE, ...parsed };
  } catch {
    return { ...INITIAL_STATE };
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable — silent fail
  }
}

let state = load();

export function getState() {
  state = load();
  if (isExpired()) {
    resetState();
    state = load();
  }
  return { ...state };
}

export function startDiagnostic() {
  state = load();
  if (state.status === 'in_progress') return getState();

  state = {
    ...INITIAL_STATE,
    status: 'in_progress',
    step: 1,
    startedAt: Date.now(),
  };
  save(state);
  emit('diagnostic_started', { step: 1 });
  return getState();
}

export function saveAnswer(questionId, answerId) {
  state = load();
  if (state.status !== 'in_progress') return getState();

  state.answers[questionId] = answerId;
  state.step = Math.min(state.step + 1, 6);
  save(state);
  emit('diagnostic_step', { step: state.step, questionId, answerId });
  return getState();
}

export function completeDiagnostic(result) {
  state = load();
  if (state.status !== 'in_progress') return getState();

  state.status = 'completed';
  state.completedAt = Date.now();
  state.result = result;
  state.synced = false;
  state.pending_sync = true;
  state.sync_failures = 0;
  state.sync_attempt_ts = null;
  save(state);
  emit('diagnostic_completed', { result });
  return getState();
}

export function markSynced() {
  state = load();
  state.synced = true;
  state.pending_sync = false;
  state.sync_failures = 0;
  state.sync_attempt_ts = null;
  save(state);
  emit('diagnostic_synced');
  return getState();
}

export function markSyncFailed() {
  state = load();
  state.sync_failures = (state.sync_failures || 0) + 1;
  state.sync_attempt_ts = Date.now();
  save(state);
  emit('diagnostic_sync_failed', { failures: state.sync_failures });
  return getState();
}

export function shouldRetrySync() {
  const s = load();
  return s.pending_sync === true && (s.sync_failures || 0) < MAX_SYNC_FAILURES;
}

export function resetState() {
  state = { ...INITIAL_STATE };
  save(state);
}

export function isExpired() {
  const s = load();
  if (!s.startedAt || s.status === 'idle' || s.status === 'completed') return false;
  return (Date.now() - s.startedAt) > TTL_MS;
}
