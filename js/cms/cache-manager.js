/**
 * IndexedDB cache with TTL logic via idb library.
 * @module js/cms/cache-manager
 */
import { openDB } from 'idb';

const DB_NAME = 'metodologia-cms';
const DB_VERSION = 1;
const STORES = ['programs', 'pricing', 'translations', 'slots'];

let dbPromise = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        for (const store of STORES) {
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
};
