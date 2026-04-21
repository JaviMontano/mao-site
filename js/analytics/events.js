/**
 * analytics/events.js — Typed event emitter with consent gating.
 *
 * All events are gated by consent.hasAnalyticsConsent().
 * Every event auto-includes: audience, locale, theme, timestamp.
 * Uses Firebase Analytics logEvent() if available, falls back to console.debug.
 *
 * @module analytics/events
 */

import { hasAnalyticsConsent } from './consent.js';
import { getAudience } from '../audience/state.js';
import { on as busOn } from '../state/bus.js';

// ── Helpers ──

/**
 * Resolve the Firebase Analytics instance from the global scope.
 * @returns {{ logEvent: Function, setUserProperties: Function } | null}
 */
function getFirebase() {
  try {
    if (typeof window !== 'undefined' && window.firebaseAnalytics) {
      return window.firebaseAnalytics;
    }
  } catch (_) { /* SSR or restricted context */ }
  return null;
}

/**
 * Build the base envelope attached to every event.
 * @returns {{ audience: string, locale: string, theme: string, timestamp: number }}
 */
function buildEnvelope() {
  let locale = 'es';
  let theme = 'light';
  try {
    const el = document.documentElement;
    locale = el.lang || el.getAttribute('lang') || 'es';
    theme = el.getAttribute('data-theme') || 'light';
  } catch (_) { /* no DOM */ }

  return {
    audience: getAudience(),
    locale,
    theme,
    timestamp: Date.now(),
  };
}

// ── Public API ──

/**
 * Track a named event. Consent-gated: silently skips if no analytics consent.
 * Auto-attaches envelope fields (audience, locale, theme, timestamp).
 * Explicit params override envelope defaults.
 *
 * @param {string} name  — event name from the catalog
 * @param {object} [params={}] — event-specific payload
 */
export function trackEvent(name, params = {}) {
  if (!hasAnalyticsConsent()) return;

  const envelope = buildEnvelope();
  // Explicit params override envelope (spread order matters)
  const payload = { ...envelope, ...params };

  const fb = getFirebase();
  if (fb && typeof fb.logEvent === 'function') {
    fb.logEvent(name, payload);
  } else {
    console.debug('[analytics]', name, payload);
  }
}

/**
 * Track a page view. Fires `page_view` with the slug and audience.
 *
 * @param {string} pageSlug — e.g. "diagnostico", "home", "ruta"
 */
export function trackPageView(pageSlug) {
  trackEvent('page_view', { page_slug: pageSlug });
}

/**
 * Set user-level properties (audience, locale, theme).
 * Consent-gated: skips if no analytics consent.
 *
 * @param {object} props — e.g. { audience: 'empresa', locale: 'en', theme: 'dark' }
 */
export function setUserProperties(props) {
  if (!hasAnalyticsConsent()) return;

  const fb = getFirebase();
  if (fb && typeof fb.setUserProperties === 'function') {
    fb.setUserProperties(props);
  } else {
    console.debug('[analytics:userProps]', props);
  }
}

// ── Bus listener: audience_switched ──

/**
 * Initialize the bus listener for audience changes.
 * Exported with underscore prefix for testing.
 */
export function _initBusListener() {
  busOn('audience_changed', (data) => {
    trackEvent('audience_switched', {
      from: data?.from,
      to: data?.to,
    });
  });
}

// Auto-init on module load
_initBusListener();
