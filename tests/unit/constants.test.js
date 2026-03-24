import { describe, it, expect } from 'vitest';
import {
  ROLE_LEVELS,
  BILINGUAL_FIELDS,
  PRICING_CATEGORIES,
  SUPPORTED_LANGS,
  CACHE_DB_NAME,
  CACHE_DB_VERSION,
  CACHE_STORES,
  DEFAULT_CACHE_TTL_MS,
  AUDIT_TTL_DAYS,
  AUDIT_TTL_MS,
  FIRESTORE_BATCH_LIMIT,
} from '../../js/cms/constants.js';

describe('constants', () => {
  it('should export ROLE_LEVELS with 4 roles in correct hierarchy', () => {
    expect(Object.keys(ROLE_LEVELS)).toHaveLength(4);
    expect(ROLE_LEVELS.super_admin).toBeGreaterThan(ROLE_LEVELS.admin);
    expect(ROLE_LEVELS.admin).toBeGreaterThan(ROLE_LEVELS.editor);
    expect(ROLE_LEVELS.editor).toBeGreaterThan(ROLE_LEVELS.viewer);
  });

  it('should export BILINGUAL_FIELDS with 4 field bases', () => {
    expect(BILINGUAL_FIELDS).toEqual(['title', 'tagline', 'description', 'transformation']);
  });

  it('should export PRICING_CATEGORIES with 3 categories', () => {
    expect(PRICING_CATEGORIES).toEqual(['b2c_base', 'b2b_multipliers', 'premium']);
  });

  it('should export SUPPORTED_LANGS with es and en', () => {
    expect(SUPPORTED_LANGS).toEqual(['es', 'en']);
  });

  it('should export cache config with correct types', () => {
    expect(typeof CACHE_DB_NAME).toBe('string');
    expect(typeof CACHE_DB_VERSION).toBe('number');
    expect(Array.isArray(CACHE_STORES)).toBe(true);
    expect(CACHE_STORES.slice(0, 3)).toEqual(['programs', 'pricing', 'translations']);
    expect(CACHE_STORES).toHaveLength(8);
  });

  it('should export DEFAULT_CACHE_TTL_MS as 1 hour in ms', () => {
    expect(DEFAULT_CACHE_TTL_MS).toBe(3_600_000);
  });

  it('should derive AUDIT_TTL_MS correctly from AUDIT_TTL_DAYS', () => {
    expect(AUDIT_TTL_DAYS).toBe(90);
    expect(AUDIT_TTL_MS).toBe(90 * 24 * 60 * 60 * 1000);
  });

  it('should export FIRESTORE_BATCH_LIMIT as 500', () => {
    expect(FIRESTORE_BATCH_LIMIT).toBe(500);
  });
});
