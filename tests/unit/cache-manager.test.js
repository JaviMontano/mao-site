import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock idb since we're in Node environment
const mockStore = new Map();
const mockClearFn = vi.fn();
const VALID_STORES = [
  'programs', 'pricing', 'translations',
  'resources', 'resource_categories', 'page_content', 'curriculum', 'site_config',
];

const mockDb = {
  get(storeName, key) {
    const storeKey = `${storeName}:${key}`;
    return mockStore.get(storeKey) || null;
  },
  put(storeName, value, key) {
    const storeKey = `${storeName}:${key}`;
    mockStore.set(storeKey, value);
  },
  objectStoreNames: {
    contains: (name) => VALID_STORES.includes(name),
  },
  transaction(storeName, mode) {
    return {
      objectStore: () => ({ clear: mockClearFn }),
      done: Promise.resolve(),
    };
  },
};

vi.mock('idb', () => ({
  openDB: vi.fn(() => Promise.resolve(mockDb)),
}));

// Import after mock setup
const { CacheManager } = await import('../../js/cms/cache-manager.js');

describe('CacheManager', () => {
  beforeEach(() => {
    mockStore.clear();
    mockClearFn.mockClear();
  });

  describe('get', () => {
    it('should return null when no cached entry exists', async () => {
      const result = await CacheManager.get('programs', 'empresas');
      expect(result).toBeNull();
    });

    it('should return cached entry with data and cachedAt', async () => {
      const data = [{ id: 'prog1', title_es: 'Test' }];
      const cachedAt = Date.now();
      mockStore.set('programs:empresas', { data, cachedAt });

      const result = await CacheManager.get('programs', 'empresas');
      expect(result).toEqual({ data, cachedAt });
    });
  });

  describe('set', () => {
    it('should store data with automatic cachedAt timestamp', async () => {
      const data = [{ id: 'prog1' }];
      const before = Date.now();
      await CacheManager.set('programs', 'empresas', data);
      const after = Date.now();

      const stored = mockStore.get('programs:empresas');
      expect(stored.data).toEqual(data);
      expect(stored.cachedAt).toBeGreaterThanOrEqual(before);
      expect(stored.cachedAt).toBeLessThanOrEqual(after);
    });
  });

  describe('isStale', () => {
    it('should return true when entry is older than TTL', () => {
      const entry = { cachedAt: Date.now() - 7200000 }; // 2 hours ago
      const ttlMs = 3600000; // 1 hour
      expect(CacheManager.isStale(entry, ttlMs)).toBe(true);
    });

    it('should return false when entry is within TTL', () => {
      const entry = { cachedAt: Date.now() - 1800000 }; // 30 min ago
      const ttlMs = 3600000; // 1 hour
      expect(CacheManager.isStale(entry, ttlMs)).toBe(false);
    });

    it('should return true for exactly expired entry', () => {
      const ttlMs = 3600000;
      const entry = { cachedAt: Date.now() - ttlMs };
      expect(CacheManager.isStale(entry, ttlMs)).toBe(true);
    });
  });

  describe('invalidateStore', () => {
    it('should clear all entries in the specified store', async () => {
      await CacheManager.invalidateStore('programs');
      expect(mockClearFn).toHaveBeenCalledOnce();
    });

    it('should throw descriptive error for nonexistent store', async () => {
      await expect(CacheManager.invalidateStore('nonexistent'))
        .rejects.toThrow('CacheManager: store not found: nonexistent');
    });
  });

  describe('invalidateAll', () => {
    it('should clear all known stores', async () => {
      await CacheManager.invalidateAll();
      expect(mockClearFn).toHaveBeenCalledTimes(8);
    });

    it('should skip stores not present in IndexedDB', async () => {
      // Override to simulate a store missing from IndexedDB
      const origContains = mockDb.objectStoreNames.contains;
      mockDb.objectStoreNames.contains = (name) => name !== 'translations';

      await CacheManager.invalidateAll();
      expect(mockClearFn).toHaveBeenCalledTimes(7); // 8 stores minus translations

      mockDb.objectStoreNames.contains = origContains;
    });
  });
});
