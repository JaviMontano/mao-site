/**
 * Theme toggle — light/dark switch with localStorage persistence
 * and prefers-color-scheme fallback.
 *
 * Storage key: mdg_theme
 * Default: "dark" (CSS default — no data-theme attribute = dark)
 */

const STORAGE_KEY = 'mdg_theme';
const LIGHT = 'light';
const DARK = 'dark';

// Eagerly resolve theme at module load time (before initTheme) so that
// getTheme()/toggleTheme() return the correct value even if called
// before initShell() runs (e.g. from TripleToggle.connectedCallback).
// Default is DARK to match the CSS baseline (no data-theme attr = dark).
let currentTheme = (() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === LIGHT || stored === DARK) return stored;
  } catch { /* localStorage disabled */ }
  return DARK;
})();
const subscribers = new Set();

/**
 * Resolve the initial theme:
 * 1. localStorage mdg_theme
 * 2. prefers-color-scheme: dark → "dark"
 * 3. fallback → "light"
 */
function resolveTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === LIGHT || stored === DARK) return stored;
  return DARK;
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

function notifySubscribers(theme) {
  for (const cb of subscribers) {
    cb(theme);
  }
}

// --- Public API ---

/** @returns {"light"|"dark"} */
export function getTheme() {
  return currentTheme;
}

/**
 * Set theme to "light" or "dark".
 * Persists to localStorage and updates the DOM.
 * @param {"light"|"dark"} theme
 */
export function setTheme(theme) {
  if (theme !== LIGHT && theme !== DARK) return;
  currentTheme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
  notifySubscribers(theme);
}

/** Toggle between light and dark. */
export function toggleTheme() {
  setTheme(currentTheme === LIGHT ? DARK : LIGHT);
}

/**
 * Initialize theme from persisted preference or system setting.
 * Call once at app startup.
 */
export function initTheme() {
  currentTheme = resolveTheme();
  applyTheme(currentTheme);
}

/** Subscribe to theme changes. Callback receives the new theme string. */
export function subscribe(callback) {
  subscribers.add(callback);
}

/** Unsubscribe from theme changes. */
export function unsubscribe(callback) {
  subscribers.delete(callback);
}
