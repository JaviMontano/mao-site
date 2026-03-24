/**
 * IndexedDB cache with TTL logic via idb library.
 * @module js/cms/cache-manager
 */
import { openDB } from 'idb';
import { CACHE_DB_NAME, CACHE_DB_VERSION, CACHE_STORES } from './constants.js';

let dbPromise = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(CACHE_DB_NAME, CACHE_DB_VERSION, {
      upgrade(db, oldVersion, newVersion) {
        for (const store of CACHE_STORES) {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store);
          }
        }
      },
    });
  }
  return dbPromise;
}

export const CacheManager = {
  /**
   * @param {string} storeName
   * @param {string} key
   * @returns {Promise<{ data: any, cachedAt: number } | null>}
   */
  async get(storeName, key) {
    const db = await getDB();
    const entry = await db.get(storeName, key);
    return entry || null;
  },

  /**
   * @param {string} storeName
   * @param {string} key
   * @param {any} data
   * @returns {Promise<void>}
   */
  async set(storeName, key, data) {
    const db = await getDB();
    await db.put(storeName, { data, cachedAt: Date.now() }, key);
  },

  /**
   * @param {{ cachedAt: number }} entry
   * @param {number} ttlMs
   * @returns {boolean}
   */
  isStale(entry, ttlMs) {
    return Date.now() - entry.cachedAt >= ttlMs;
  },

  /**
   * Clear all entries in a single cache store.
   * @param {string} storeName
   * @throws {Error} if store does not exist
   */
  async invalidateStore(storeName) {
    const db = await getDB();
    if (!db.objectStoreNames.contains(storeName)) {
      throw new Error(`CacheManager: store not found: ${storeName}`);
    }
    const tx = db.transaction(storeName, 'readwrite');
    await tx.objectStore(storeName).clear();
    await tx.done;
  },

  /**
   * Clear all known cache stores.
   */
  async invalidateAll() {
    const db = await getDB();
    for (const store of CACHE_STORES) {
      if (db.objectStoreNames.contains(store)) {
        const tx = db.transaction(store, 'readwrite');
        await tx.objectStore(store).clear();
        await tx.done;
      }
    }
  },
};
