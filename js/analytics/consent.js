/**
 * js/analytics/consent.js
 * Two-tier consent system for MetodologIA analytics (R6).
 *
 * Tier 1 — Banner (analytics): cookie-based, managed here.
 * Tier 2 — PII (checkbox):     in-memory, set by diagnostic step 6.
 *
 * Cookie: mdg_consent  { analytics, timestamp, version }
 *   max-age 365d · path / · SameSite=Lax
 *
 * Event: window dispatches "mdg:consent-changed" on analytics consent change.
 */

const COOKIE_NAME = 'mdg_consent';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 365 days in seconds
const CONSENT_VERSION = '1.0';

// ---------------------------------------------------------------------------
// Internal state — PII consent lives only in memory (never persisted as cookie)
// ---------------------------------------------------------------------------
let _piiConsent = false;

// ---------------------------------------------------------------------------
// Cookie helpers
// ---------------------------------------------------------------------------

/** @returns {object|null} parsed mdg_consent cookie or null */
function _readCookie() {
  try {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    if (!match) return null;
    return JSON.parse(decodeURIComponent(match.split('=').slice(1).join('=')));
  } catch {
    return null;
  }
}

/** Persist consent object as cookie. */
function _writeCookie(value) {
  const encoded = encodeURIComponent(JSON.stringify(value));
  document.cookie = [
    `${COOKIE_NAME}=${encoded}`,
    `max-age=${COOKIE_MAX_AGE}`,
    'path=/',
    'SameSite=Lax',
  ].join('; ');
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Full consent snapshot.
 * @returns {{ analytics: boolean, pii: boolean }}
 */
export function getConsent() {
  const cookie = _readCookie();
  return {
    analytics: cookie?.analytics === true,
    pii: _piiConsent,
  };
}

/**
 * Set analytics consent (banner action).
 * Persists mdg_consent cookie and dispatches mdg:consent-changed.
 * @param {boolean} accepted
 */
export function setAnalyticsConsent(accepted) {
  const value = {
    analytics: Boolean(accepted),
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  _writeCookie(value);

  window.dispatchEvent(
    new CustomEvent('mdg:consent-changed', {
      detail: { analytics: value.analytics, timestamp: value.timestamp },
    }),
  );
}

/**
 * @returns {boolean} true if analytics consent has been granted
 */
export function hasAnalyticsConsent() {
  return _readCookie()?.analytics === true;
}

/**
 * @returns {boolean} true if PII consent has been granted (in-memory only)
 */
export function hasPiiConsent() {
  return _piiConsent;
}

/**
 * Set PII consent from the diagnostic form checkbox (step 6).
 * @param {boolean} accepted
 */
export function setPiiConsent(accepted) {
  _piiConsent = Boolean(accepted);
}

/**
 * @returns {string|null} ISO timestamp of analytics consent, or null
 */
export function getConsentTimestamp() {
  return _readCookie()?.timestamp ?? null;
}

/**
 * @returns {boolean} true when no mdg_consent cookie exists (banner should show)
 */
export function shouldShowBanner() {
  return _readCookie() === null;
}
