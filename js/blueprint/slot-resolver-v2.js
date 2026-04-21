/**
 * slot-resolver.js — 5-level audience/locale fallback cascade
 * with Firestore-first resolution via migration-bridge.
 *
 * Cascade order:
 *   1. Firestore slots/{pageSlug} via migration-bridge (if cms-i18n flag ON)
 *   2. Dictionary exact:    {pageSlug}.{slotId}.{audience}.{locale}
 *   3. Locale fallback:     {pageSlug}.{slotId}.{audience}.es
 *   4. Audience fallback:   {pageSlug}.{slotId}.persona.{locale}
 *   5. Double fallback:     {pageSlug}.{slotId}.persona.es
 *   6. Return "[MISSING: {slotId}]"
 *
 * [TS-103, TS-104]
 */
import { MigrationBridge } from '../cms/migration-bridge.js';

const DEFAULT_LOCALE = 'es';
const DEFAULT_AUDIENCE = 'persona';

/**
 * Extract the resolved value from a Firestore slot entry for the given audience+locale.
 * Firestore slots store: { slotId, variants: { "persona.es": "...", "empresa.en": "..." } }
 *
 * @param {object} fsSlot - Firestore slot entry with .variants
 * @param {string} audience
 * @param {string} locale
 * @returns {string|undefined}
 */
function resolveFirestoreVariant(fsSlot, audience, locale) {
  if (!fsSlot?.variants) return undefined;
  const v = fsSlot.variants;

  // Exact match
  const exactKey = `${audience}.${locale}`;
  if (v[exactKey] !== undefined && v[exactKey] !== '') return v[exactKey];

  // Locale fallback
  const localeFb = `${audience}.${DEFAULT_LOCALE}`;
  if (v[localeFb] !== undefined && v[localeFb] !== '') return v[localeFb];

  // Audience fallback
  const audFb = `${DEFAULT_AUDIENCE}.${locale}`;
  if (v[audFb] !== undefined && v[audFb] !== '') return v[audFb];

  // Double fallback
  const dblFb = `${DEFAULT_AUDIENCE}.${DEFAULT_LOCALE}`;
  if (v[dblFb] !== undefined && v[dblFb] !== '') return v[dblFb];

  return undefined;
}

/**
 * Resolve a single content slot through the 5-level fallback cascade.
 *
 * @param {string} pageSlug
 * @param {string} slotId
 * @param {string} audience
 * @param {string} locale
 * @param {object} options
 * @param {object} options.dictionaries
 * @param {object} [options.firestoreSlots] - Pre-loaded Firestore slot data { pageSlug: { slotId: { slotId, variants } } }
 * @param {boolean} [options.cmsEnabled]
 * @returns {string}
 */
export function resolveSlot(pageSlug, slotId, audience, locale, options = {}) {
  const { dictionaries = {}, firestoreSlots = {}, cmsEnabled = false } = options;

  // Level 1: Firestore override (via migration-bridge cms-i18n flag or explicit cmsEnabled)
  const useFirestore = cmsEnabled || MigrationBridge.isEnabled('cms-i18n');
  if (useFirestore) {
    const fsPage = firestoreSlots[pageSlug];
    if (fsPage) {
      const fsSlot = fsPage[slotId];
      if (fsSlot) {
        // If Firestore slot has structured variants, resolve with audience+locale cascade
        const resolved = resolveFirestoreVariant(fsSlot, audience, locale);
        if (resolved !== undefined) return resolved;
      }
      // Legacy: direct string value (backward compat with pre-variant format)
      if (typeof fsPage[slotId] === 'string') {
        return fsPage[slotId];
      }
    }
  }

  const page = dictionaries[pageSlug];
  if (!page) return `[MISSING: ${slotId}]`;

  // Support dotted slot IDs: "hero.title" → section="hero", field="title"
  const parts = slotId.split('.');
  const section = parts[0];
  const field = parts.length > 1 ? parts.slice(1).join('.') : null;

  const slot = page[section];
  if (!slot) return `[MISSING: ${slotId}]`;

  // Resolve helper: extract leaf value (string or nested field)
  function leaf(node) {
    if (node === undefined || node === null) return undefined;
    if (field && typeof node === 'object') return node[field];
    if (typeof node === 'string') return node;
    return undefined;
  }

  // Level 2: Exact match
  const l2 = leaf(slot[audience]?.[locale]);
  if (l2 !== undefined) return l2;

  // Level 3: Locale fallback (same audience, default locale)
  const l3 = leaf(slot[audience]?.[DEFAULT_LOCALE]);
  if (l3 !== undefined) return l3;

  // Level 4: Audience fallback (default audience, original locale)
  const l4 = leaf(slot[DEFAULT_AUDIENCE]?.[locale]);
  if (l4 !== undefined) return l4;

  // Level 5: Double fallback (default audience + default locale)
  const l5 = leaf(slot[DEFAULT_AUDIENCE]?.[DEFAULT_LOCALE]);
  if (l5 !== undefined) return l5;

  return `[MISSING: ${slotId}]`;
}

/**
 * Load Firestore slots for a page via migration-bridge.
 * Returns slot data or empty object if unavailable.
 *
 * @param {string} pageSlug
 * @param {Function} firestoreFetcher - Async fn returning Firestore doc data
 * @returns {Promise<Object>} { slotId: { slotId, variants } } or {}
 */
export async function loadFirestoreSlots(pageSlug, firestoreFetcher) {
  if (!MigrationBridge.isEnabled('cms-i18n')) {
    return {};
  }

  const slots = await MigrationBridge.resolveSlots({
    pageSlug,
    firestoreFetcher,
  });

  return slots || {};
}

/**
 * Resolve all slots for a page, returning a Map<slotId, string>.
 *
 * @param {string} pageSlug
 * @param {string} audience
 * @param {string} locale
 * @param {object} options
 * @returns {Map<string, string>}
 */
export function resolveAllSlots(pageSlug, audience, locale, options = {}) {
  const { dictionaries = {} } = options;
  const result = new Map();

  const page = dictionaries[pageSlug];
  if (!page) return result;

  for (const slotId of Object.keys(page)) {
    result.set(slotId, resolveSlot(pageSlug, slotId, audience, locale, options));
  }

  return result;
}
