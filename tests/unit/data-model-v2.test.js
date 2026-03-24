import { describe, it, expect } from 'vitest';
import {
  CACHE_STORES,
  CACHE_DB_VERSION,
  RESOURCE_TYPES,
  SITE_CONFIG_DOCS,
} from '../../js/cms/constants.js';

describe('Data Model v2 — Phase 1 constants', () => {
  it('should have CACHE_DB_VERSION bumped to 2', () => {
    expect(CACHE_DB_VERSION).toBe(2);
  });

  it('should have 8 CACHE_STORES (3 original + 5 new)', () => {
    expect(CACHE_STORES).toHaveLength(8);
    expect(CACHE_STORES).toContain('programs');
    expect(CACHE_STORES).toContain('pricing');
    expect(CACHE_STORES).toContain('translations');
    expect(CACHE_STORES).toContain('resources');
    expect(CACHE_STORES).toContain('resource_categories');
    expect(CACHE_STORES).toContain('page_content');
    expect(CACHE_STORES).toContain('curriculum');
    expect(CACHE_STORES).toContain('site_config');
  });

  it('should export RESOURCE_TYPES with 11 types', () => {
    expect(RESOURCE_TYPES).toHaveLength(11);
    expect(RESOURCE_TYPES).toContain('biblioteca');
    expect(RESOURCE_TYPES).toContain('miniapp');
    expect(RESOURCE_TYPES).toContain('a-medida');
  });

  it('should export SITE_CONFIG_DOCS with 4 sections', () => {
    expect(SITE_CONFIG_DOCS).toEqual(['branding', 'navigation', 'social', 'features']);
  });

  it('should preserve original 3 stores at the beginning of CACHE_STORES', () => {
    expect(CACHE_STORES.slice(0, 3)).toEqual(['programs', 'pricing', 'translations']);
  });
});
