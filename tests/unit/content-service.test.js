import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Firebase modules
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
}));

// Mock CacheManager
vi.mock('../../js/cms/cache-manager.js', () => ({
  CacheManager: {
    get: vi.fn(() => null),
    set: vi.fn(),
    isStale: vi.fn(() => true),
  },
}));

const { getDoc, getDocs, doc, query } = await import('firebase/firestore');
const { CacheManager } = await import('../../js/cms/cache-manager.js');
const { ContentService } = await import('../../js/cms/content-service.js');

describe('ContentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    ContentService._reset();
  });

  describe('init', () => {
    it('should initialize and read config/settings', async () => {
      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          cache_ttl_ms: 3600000,
          migrated_collections: ['programs'],
        }),
      });

      await ContentService.init({ app: {} });
      expect(ContentService.isReady()).toBe(true);
    });

    it('should use default TTL when config/settings is missing', async () => {
      getDoc.mockResolvedValueOnce({ exists: () => false });

      await ContentService.init({ app: {} });
      expect(ContentService.isReady()).toBe(true);
    });
  });

  describe('isReady / onReady', () => {
    it('should be false before init', () => {
      expect(ContentService.isReady()).toBe(false);
    });

    it('should call onReady callback after init', async () => {
      getDoc.mockResolvedValueOnce({ exists: () => false });

      const callback = vi.fn();
      ContentService.onReady(callback);
      expect(callback).not.toHaveBeenCalled();

      await ContentService.init({ app: {} });
      expect(callback).toHaveBeenCalled();
    });

    it('should call onReady immediately if already ready', async () => {
      getDoc.mockResolvedValueOnce({ exists: () => false });
      await ContentService.init({ app: {} });

      const callback = vi.fn();
      ContentService.onReady(callback);
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('getPrograms', () => {
    beforeEach(async () => {
      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          cache_ttl_ms: 3600000,
          migrated_collections: ['programs'],
        }),
      });
      await ContentService.init({ app: {} });
    });

    it('should fetch programs from Firestore when migrated', async () => {
      const mockPrograms = [
        { id: 'empresas_diagnostico', data: () => ({ title_es: 'Diagnóstico', audience: 'empresas' }) },
      ];
      getDocs.mockResolvedValueOnce({
        docs: mockPrograms,
        empty: false,
      });

      const result = await ContentService.getPrograms('empresas');
      expect(result).toHaveLength(1);
      expect(result[0].title_es).toBe('Diagnóstico');
    });

    it('should return cached data when Firestore fails', async () => {
      getDocs.mockRejectedValueOnce(new Error('Network error'));
      CacheManager.get.mockResolvedValueOnce({
        data: [{ id: 'prog1', title_es: 'Cached' }],
        cachedAt: Date.now(),
      });

      const result = await ContentService.getPrograms('empresas');
      expect(result).toHaveLength(1);
      expect(result[0].title_es).toBe('Cached');
    });

    it('should return null when both Firestore and cache fail', async () => {
      getDocs.mockRejectedValueOnce(new Error('Network error'));
      CacheManager.get.mockResolvedValueOnce(null);

      const result = await ContentService.getPrograms('empresas');
      expect(result).toBeNull();
    });
  });

  describe('getPricing', () => {
    beforeEach(async () => {
      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          cache_ttl_ms: 3600000,
          migrated_collections: ['pricing'],
        }),
      });
      await ContentService.init({ app: {} });
    });

    it('should fetch pricing from Firestore when migrated', async () => {
      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ programs: { empoderamiento: { price: 2760000 } } }),
      });

      const result = await ContentService.getPricing('b2c_base');
      expect(result.programs.empoderamiento.price).toBe(2760000);
    });

    it('should return null as terminal fallback', async () => {
      getDoc.mockRejectedValueOnce(new Error('Network error'));
      CacheManager.get.mockResolvedValueOnce(null);

      const result = await ContentService.getPricing('b2c_base');
      expect(result).toBeNull();
    });
  });

  describe('getTranslations', () => {
    beforeEach(async () => {
      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          cache_ttl_ms: 3600000,
          migrated_collections: ['translations'],
        }),
      });
      await ContentService.init({ app: {} });
    });

    it('should fetch translations and strip _meta field', async () => {
      getDoc.mockResolvedValueOnce({
        exists: () => true,
        data: () => ({
          nav: { home: 'Inicio' },
          _meta: { key_count: 1132 },
        }),
      });

      const result = await ContentService.getTranslations('es');
      expect(result.nav.home).toBe('Inicio');
      expect(result._meta).toBeUndefined();
    });

    it('should return null as terminal fallback', async () => {
      getDoc.mockRejectedValueOnce(new Error('Network error'));
      CacheManager.get.mockResolvedValueOnce(null);

      const result = await ContentService.getTranslations('es');
      expect(result).toBeNull();
    });
  });
});
