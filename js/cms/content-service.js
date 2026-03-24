/**
 * Centralized Firestore read + cache + fallback orchestration.
 * @module js/cms/content-service
 */
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { CacheManager } from './cache-manager.js';
import { DEFAULT_CACHE_TTL_MS } from './constants.js';

let db = null;
let ready = false;
let migratedCollections = [];
let cacheTtlMs = DEFAULT_CACHE_TTL_MS;
const readyCallbacks = [];

export const ContentService = {
  /**
   * Initialize the content service.
   * @param {Object} config
   * @param {FirebaseApp} config.app
   * @param {number} [config.cacheTtlMs]
   */
  async init({ app, cacheTtlMs: overrideTtl } = {}) {
    db = getFirestore(app);

    // Read config/settings from Firestore
    try {
      const settingsRef = doc(db, 'config', 'settings');
      const settingsSnap = await getDoc(settingsRef);
      if (settingsSnap.exists()) {
        const settings = settingsSnap.data();
        migratedCollections = settings.migrated_collections || [];
        cacheTtlMs = settings.cache_ttl_ms || cacheTtlMs;
      }
    } catch {
      // Config unavailable — use defaults
    }

    if (overrideTtl) cacheTtlMs = overrideTtl;

    ready = true;
    for (const cb of readyCallbacks) cb();
    readyCallbacks.length = 0;
  },

  isReady() {
    return ready;
  },

  onReady(callback) {
    if (ready) {
      callback();
    } else {
      readyCallbacks.push(callback);
    }
  },

  /**
   * @param {'empresas' | 'personas'} audience
   * @returns {Promise<Object[] | null>}
   */
  async getPrograms(audience) {
    if (!migratedCollections.includes('programs')) {
      return null;
    }

    // Stale-while-revalidate: serve cache immediately if available
    const cached = await CacheManager.get('programs', audience);
    if (cached && !CacheManager.isStale(cached, cacheTtlMs)) {
      return cached.data; // Fresh cache — no Firestore fetch needed
    }

    // Fetch from Firestore (background refresh if stale cache exists)
    try {
      const q = query(
        collection(db, 'programs'),
        where('audience', '==', audience),
        where('is_published', '==', true),
        orderBy('sort_order'),
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const programs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        await CacheManager.set('programs', audience, programs);
        return programs;
      }
    } catch (err) {
      // T079: Graceful failure — log for dev observability, serve cache
      console.warn('ContentService: Firestore unreachable for programs/', audience, err.message);
    }

    // Serve stale cache if available
    if (cached) return cached.data;

    return null;
  },

  /**
   * @param {'b2c_base' | 'b2b_multipliers' | 'premium'} category
   * @returns {Promise<Object | null>}
   */
  async getPricing(category) {
    if (!migratedCollections.includes('pricing')) {
      return null;
    }

    const cached = await CacheManager.get('pricing', category);
    if (cached && !CacheManager.isStale(cached, cacheTtlMs)) {
      return cached.data;
    }

    try {
      const docRef = doc(db, 'pricing', category);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        await CacheManager.set('pricing', category, data);
        return data;
      }
    } catch (err) {
      console.warn('ContentService: Firestore unreachable for pricing/', category, err.message);
    }

    if (cached) return cached.data;

    return null;
  },

  /**
   * @param {'es' | 'en'} lang
   * @returns {Promise<Object | null>}
   */
  async getTranslations(lang) {
    if (!migratedCollections.includes('translations')) {
      return null;
    }

    const cached = await CacheManager.get('translations', lang);
    if (cached && !CacheManager.isStale(cached, cacheTtlMs)) {
      return cached.data;
    }

    try {
      const docRef = doc(db, 'translations', lang);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        delete data._meta;
        await CacheManager.set('translations', lang, data);
        return data;
      }
    } catch (err) {
      console.warn('ContentService: Firestore unreachable for translations/', lang, err.message);
    }

    if (cached) return cached.data;

    return null;
  },

  /** Exposed for MigrationBridge */
  _getMigratedCollections() {
    return migratedCollections;
  },

  _getCacheTtlMs() {
    return cacheTtlMs;
  },

  /** Test helper — reset state */
  _reset() {
    db = null;
    ready = false;
    migratedCollections = [];
    cacheTtlMs = DEFAULT_CACHE_TTL_MS;
    readyCallbacks.length = 0;
  },
};
