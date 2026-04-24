/**
 * controller.js — Audience toggle + slot hydration controller.
 *
 * Orchestrates audience switching and DOM slot hydration with <100ms re-render.
 * Listens to audience state changes, resolves slot content via the fallback
 * cascade, and batches DOM updates inside requestAnimationFrame.
 */

import { getAudience, setAudience, subscribe } from './state.js';
import { resolveSlot } from '../blueprint/slot-resolver-v2.js';
import { emit } from '../state/bus.js';

/** @type {{ pageSlug: string, locale: string, dictionaries: object, firestoreSlots: object, cmsEnabled: boolean } | null} */
let currentOptions = null;

/** Track whether a rAF hydration is already scheduled */
let rafPending = false;

/**
 * Initialize the audience controller.
 *
 * Sets up the audience change listener and performs the initial hydration
 * of all slots on the page.
 *
 * @param {object} options
 * @param {string} options.pageSlug
 * @param {string} options.locale
 * @param {object} options.dictionaries
 * @param {object} [options.firestoreSlots]
 * @param {boolean} [options.cmsEnabled]
 */
export function initAudienceController(options) {
  const {
    pageSlug,
    locale = 'es',
    dictionaries = {},
    firestoreSlots = {},
    cmsEnabled = false,
  } = options;

  currentOptions = { pageSlug, locale, dictionaries, firestoreSlots, cmsEnabled };

  // Subscribe to future audience changes
  subscribe((newAudience) => {
    const currentLocale = document.documentElement.lang || 'es';
    scheduleHydration(pageSlug, newAudience, currentLocale, currentOptions);
  });

  // Initial hydration with current audience
  const audience = getAudience();
  hydrateSlots(pageSlug, audience, locale, currentOptions);
}

/**
 * Hydrate all DOM elements that carry a `data-slot` attribute and
 * toggle visibility of audience-variant / audience-filter elements.
 *
 * @param {string} pageSlug
 * @param {"persona"|"empresa"} audience
 * @param {string} locale
 * @param {object} options
 * @param {object} options.dictionaries
 * @param {object} [options.firestoreSlots]
 * @param {boolean} [options.cmsEnabled]
 */
export function hydrateSlots(pageSlug, audience, locale, options = {}) {
  const resolverOpts = {
    dictionaries: options.dictionaries || {},
    firestoreSlots: options.firestoreSlots || {},
    cmsEnabled: options.cmsEnabled || false,
  };

  // --- Slot content hydration ---
  const slotElements = document.querySelectorAll('[data-slot]');
  for (let i = 0; i < slotElements.length; i++) {
    const el = slotElements[i];
    const slotId = el.getAttribute('data-slot');
    if (!slotId) continue;

    const content = resolveSlot(pageSlug, slotId, audience, locale, resolverOpts);

    // Use textContent for plain strings, innerHTML when content contains HTML
    if (content.includes('<') && content.includes('>')) {
      el.innerHTML = content;
    } else {
      el.textContent = content;
    }
  }

  // --- Audience variant visibility ---
  const variantElements = document.querySelectorAll('[data-audience-variant]');
  for (let i = 0; i < variantElements.length; i++) {
    const el = variantElements[i];
    const variant = el.getAttribute('data-audience-variant');
    el.hidden = variant !== audience;
  }

  // --- Audience filter (display:none if not matching) ---
  const filterElements = document.querySelectorAll('[data-audience-filter]');
  for (let i = 0; i < filterElements.length; i++) {
    const el = filterElements[i];
    const filter = el.getAttribute('data-audience-filter');
    el.style.display = filter === audience ? '' : 'none';
  }

  // Signal completion
  emit('audience_changed', { audience, pageSlug, locale });
}

/**
 * Switch audience from user interaction (e.g. TripleToggle).
 * Sets state via the provenance cascade (toggle = level 2, always wins)
 * and triggers re-hydration. Must complete in <100ms.
 *
 * @param {"persona"|"empresa"} audience
 */
export function switchAudience(audience) {
  // setAudience with 'toggle' source fires subscribers, which triggers
  // scheduleHydration via the listener installed in initAudienceController.
  setAudience(audience, 'toggle');
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Schedule a batched hydration inside requestAnimationFrame to keep
 * re-render under 100ms and avoid layout thrashing.
 *
 * @param {string} pageSlug
 * @param {string} audience
 * @param {string} locale
 * @param {object} options
 */
function scheduleHydration(pageSlug, audience, locale, options) {
  if (rafPending) return;
  rafPending = true;

  requestAnimationFrame(() => {
    rafPending = false;
    hydrateSlots(pageSlug, audience, locale, options);
  });
}
