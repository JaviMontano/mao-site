import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock ContentService
const mockContentService = {
  _migratedCollections: [],
  _getMigratedCollections() {
    return this._migratedCollections;
  },
};

// Mock CacheManager
vi.mock('../../js/cms/cache-manager.js', () => ({
  CacheManager: {
    get: vi.fn(() => null),
    set: vi.fn(),
    isStale: vi.fn(() => true),
  },
}));

const { CacheManager } = await import('../../js/cms/cache-manager.js');

// We'll test MigrationBridge with injected dependencies
const { MigrationBridge } = await import('../../js/cms/migration-bridge.js');

describe('MigrationBridge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('resolve', () => {
    it('should use Firestore source when collection is migrated', async () => {
      const firestoreFetcher = vi.fn().mockResolvedValue({ title: 'From Firestore' });
      const result = await MigrationBridge.resolve({
        collection: 'programs',
        migratedCollections: ['programs'],
        firestoreFetcher,
        cacheKey: 'programs:empresas',
        cacheStore: 'programs',
      });

      expect(firestoreFetcher).toHaveBeenCalled();
      expect(result).toEqual({ title: 'From Firestore' });
    });

    it('should check migrated_collections before fetching', async () => {
      const firestoreFetcher = vi.fn();
      const result = await MigrationBridge.resolve({
        collection: 'programs',
        migratedCollections: [], // not migrated
        firestoreFetcher,
        cacheKey: 'programs:empresas',
        cacheStore: 'programs',
      });

      expect(firestoreFetcher).not.toHaveBeenCalled();
      expect(result).toBeNull(); // null = caller uses static
    });

    it('should fall back to cache when Firestore fails', async () => {
      const firestoreFetcher = vi.fn().mockRejectedValue(new Error('offline'));
      CacheManager.get.mockResolvedValueOnce({
        data: { title: 'Cached' },
        cachedAt: Date.now(),
      });

      const result = await MigrationBridge.resolve({
        collection: 'programs',
        migratedCollections: ['programs'],
        firestoreFetcher,
        cacheKey: 'programs:empresas',
        cacheStore: 'programs',
      });

      expect(result).toEqual({ title: 'Cached' });
    });

    it('should return null when both Firestore and cache fail', async () => {
      const firestoreFetcher = vi.fn().mockRejectedValue(new Error('offline'));
      CacheManager.get.mockResolvedValueOnce(null);

      const result = await MigrationBridge.resolve({
        collection: 'programs',
        migratedCollections: ['programs'],
        firestoreFetcher,
        cacheKey: 'programs:empresas',
        cacheStore: 'programs',
      });

      expect(result).toBeNull();
    });
  });
});
