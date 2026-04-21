/**
 * Dual-source resolver: Firestore-first with cache fallback, null terminal.
 * Content-agnostic — consumers decide what null means.
 *
 * cms-i18n flag: When enabled, resolves content slots from Firestore
 * slots/{pageSlug} before falling back to static JSON dictionaries.
 * [TS-103, TS-104]
 *
 * @module js/cms/migration-bridge
 */
import { CacheManager } from './cache-manager.js';

/** Feature flags — cms-i18n enables Firestore slot resolution */
const FLAGS = {
  'cms-i18n': true,
};

export const MigrationBridge = {
  /**
   * Check if a feature flag is enabled.
   * @param {string} flag
   * @returns {boolean}
   */
  isEnabled(flag) {
    return FLAGS[flag] === true;
  },

  /**
   * Enable or disable a feature flag at runtime.
   * @param {string} flag
   * @param {boolean} value
   */
  setFlag(flag, value) {
    FLAGS[flag] = value;
  },

  /**
   * Resolve content from Firestore or cache based on migration status.
   *
   * @param {Object} options
   * @param {string} options.collection - Collection name (e.g., 'programs')
   * @param {string[]} options.migratedCollections - Currently migrated collections
   * @param {Function} options.firestoreFetcher - Async function that fetches from Firestore
   * @param {string} options.cacheKey - Cache lookup key
   * @param {string} options.cacheStore - IndexedDB store name
   * @returns {Promise<any | null>} Resolved data or null (caller handles static fallback)
   */
  async resolve({ collection, migratedCollections, firestoreFetcher, cacheKey, cacheStore }) {
    // Not migrated — return null so caller uses static content
    if (!migratedCollections.includes(collection)) {
      return null;
    }

    // Firestore-first
    try {
      const data = await firestoreFetcher();
      if (data != null) {
        await CacheManager.set(cacheStore, cacheKey, data);
        return data;
      }
    } catch {
      // Firestore unavailable — fall through to cache
    }

    // Cache fallback
    const cached = await CacheManager.get(cacheStore, cacheKey);
    if (cached) return cached.data;

    // Terminal fallback — null
    return null;
  },

  /**
   * Resolve content slots from Firestore slots/{pageSlug}.
   * Used when cms-i18n flag is ON.
   * Returns slot data keyed by slotId, or null if unavailable.
   *
   * @param {Object} options
   * @param {string} options.pageSlug - Page slug (e.g., 'home')
   * @param {Function} options.firestoreFetcher - Async fn returning doc data or null
   * @returns {Promise<Object|null>} Slot map { slotId: { variants } } or null
   */
  async resolveSlots({ pageSlug, firestoreFetcher }) {
    if (!FLAGS['cms-i18n']) {
      return null;
    }

    const cacheKey = `slots:${pageSlug}`;
    const cacheStore = 'slots';

    // Firestore-first
    try {
      const data = await firestoreFetcher();
      if (data?.slots) {
        try {
          await CacheManager.set(cacheStore, cacheKey, data.slots);
        } catch {
          // Cache write failure is non-fatal
        }
        return data.slots;
      }
    } catch {
      // Firestore unavailable — fall through to cache
    }

    // Cache fallback
    try {
      const cached = await CacheManager.get(cacheStore, cacheKey);
      if (cached) return cached.data;
    } catch {
      // Cache unavailable
    }

    // Terminal fallback — null (caller uses static JSON)
    return null;
  },
};
