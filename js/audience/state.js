/**
 * AudienceState — 6-level provenance cascade for audience segmentation.
 *
 * Priority (1 = highest):
 *   1. URL parameter ?audiencia=empresa|persona
 *   2. Explicit user toggle (TripleToggle interaction)
 *   3. localStorage mdg_audience
 *   4. Diagnostic result segment mapping
 *   5. Returning visitor cookie mdg_returning
 *   6. Default: "persona"
 */

const VALID_VALUES = ['persona', 'empresa'];
const LS_KEY = 'mdg_audience';

const SOURCE_LEVEL = {
  url: 1,
  toggle: 2,
  localStorage: 3,
  diagnostic: 4,
  cookie: 5,
  default: 6,
};

let currentValue = 'persona';
let currentSource = 'default';
const subscribers = new Set();

// --- Initialization ---

function init() {
  // Level 1: URL parameter
  try {
    const params = new URLSearchParams(location.search);
    const urlAudience = params.get('audiencia');
    if (urlAudience && VALID_VALUES.includes(urlAudience)) {
      currentValue = urlAudience;
      currentSource = 'url';
      // Persist URL-derived value to localStorage
      try { localStorage.setItem(LS_KEY, currentValue); } catch (_) { /* noop */ }
      return;
    }
  } catch (_) { /* location may not be available */ }

  // Level 3: localStorage
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (stored && VALID_VALUES.includes(stored)) {
      currentValue = stored;
      currentSource = 'localStorage';
      return;
    }
  } catch (_) { /* localStorage may not be available */ }

  // Levels 4-5 are set dynamically via setAudience()
  // Level 6: default is already set
}

init();

// --- Public API ---

/**
 * Resolve and return current audience value.
 * @returns {"persona"|"empresa"}
 */
export function getAudience() {
  return currentValue;
}

/**
 * Set audience from a given source. Higher-priority sources override lower ones.
 * Toggle (level 2) always wins — user intent is king.
 *
 * @param {"persona"|"empresa"} value
 * @param {"url"|"toggle"|"diagnostic"|"cookie"} source
 */
export function setAudience(value, source) {
  if (!VALID_VALUES.includes(value)) return;

  const incomingLevel = SOURCE_LEVEL[source];
  if (incomingLevel === undefined) return;

  const currentLevel = SOURCE_LEVEL[currentSource];

  // Toggle always wins — user intent is king (override any source)
  const isToggle = source === 'toggle';

  // Only accept if incoming priority is equal or higher (lower number),
  // unless it's a toggle which always overrides.
  if (!isToggle && incomingLevel > currentLevel) return;

  const previousValue = currentValue;
  currentValue = value;
  currentSource = source;

  // Persist to localStorage
  try { localStorage.setItem(LS_KEY, value); } catch (_) { /* noop */ }

  // Notify subscribers only on actual value change
  if (value !== previousValue) {
    const provenance = getProvenance();
    for (const cb of subscribers) {
      cb(value, provenance);
    }
  }
}

/**
 * Get provenance metadata for the current audience value.
 * @returns {{ value: string, source: string, level: number }}
 */
export function getProvenance() {
  return {
    value: currentValue,
    source: currentSource,
    level: SOURCE_LEVEL[currentSource],
  };
}

/**
 * Subscribe to audience changes.
 * Callback receives (value, provenance).
 * @param {Function} callback
 */
export function subscribe(callback) {
  subscribers.add(callback);
}

/**
 * Unsubscribe from audience changes.
 * @param {Function} callback
 */
export function unsubscribe(callback) {
  subscribers.delete(callback);
}
