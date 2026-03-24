import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock transaction and batch objects
const mockTransaction = {
  get: vi.fn(),
  update: vi.fn(),
  set: vi.fn(),
};

const mockBatch = {
  update: vi.fn(),
  set: vi.fn(),
  commit: vi.fn().mockResolvedValue(undefined),
};

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  doc: vi.fn((...args) => ({ path: args.filter((a) => typeof a === 'string').join('/') })),
  getDoc: vi.fn(),
  addDoc: vi.fn().mockResolvedValue({ id: 'audit-1' }),
  collection: vi.fn((...args) => ({ path: args.filter((a) => typeof a === 'string').join('/') })),
  runTransaction: vi.fn((db, fn) => Promise.resolve(fn(mockTransaction))),
  writeBatch: vi.fn(() => mockBatch),
  serverTimestamp: vi.fn(() => new Date()),
}));

// Mock AuthService
vi.mock('../../js/cms/auth-service.js', () => ({
  AuthService: {
    isAdmin: vi.fn(() => true),
    getCurrentUser: vi.fn(() => ({ uid: 'admin1', email: 'admin@test.com' })),
  },
}));

const { getDoc } = await import('firebase/firestore');
const { AdminAPI, getNestedValue } = await import('../../js/cms/admin-api.js');

describe('AdminAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockBatch.commit.mockResolvedValue(undefined);

    // Default: document exists with previous data
    mockTransaction.get.mockResolvedValue({
      exists: () => true,
      data: () => ({
        title_es: 'Old Title ES', title_en: 'Old Title EN',
        tagline_es: 'Old Tag ES', tagline_en: 'Old Tag EN',
        description_es: 'Old Desc ES', description_en: 'Old Desc EN',
        transformation_es: 'Old Trans ES', transformation_en: 'Old Trans EN',
      }),
    });

    // Default for getDoc (pricing/translations read-before-write)
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({}),
    });
  });

  describe('updateProgram', () => {
    it('should update program and create audit entries via transaction', async () => {
      await AdminAPI.updateProgram('empresas_diagnostico', {
        description_es: 'New ES',
        description_en: 'New EN',
      });
      expect(mockTransaction.get).toHaveBeenCalled();
      expect(mockTransaction.update).toHaveBeenCalled();
      // 2 fields = 2 audit entries
      expect(mockTransaction.set).toHaveBeenCalledTimes(2);
    });

    it('should capture previous_value from transaction read', async () => {
      await AdminAPI.updateProgram('empresas_diagnostico', {
        description_es: 'New ES',
        description_en: 'New EN',
      });

      // First set call = description_es audit entry
      const firstAuditEntry = mockTransaction.set.mock.calls[0][1];
      expect(firstAuditEntry.previous_value).toBe('Old Desc ES');
      expect(firstAuditEntry.new_value).toBe('New ES');

      // Second set call = description_en audit entry
      const secondAuditEntry = mockTransaction.set.mock.calls[1][1];
      expect(secondAuditEntry.previous_value).toBe('Old Desc EN');
      expect(secondAuditEntry.new_value).toBe('New EN');
    });

    it('should set previous_value to null when document does not exist', async () => {
      mockTransaction.get.mockResolvedValue({
        exists: () => false,
        data: () => null,
      });

      await AdminAPI.updateProgram('new_program', {
        title_es: 'New',
        title_en: 'New EN',
      });

      const auditEntry = mockTransaction.set.mock.calls[0][1];
      expect(auditEntry.previous_value).toBeNull();
    });

    it('should reject when bilingual pair is incomplete', async () => {
      await expect(
        AdminAPI.updateProgram('empresas_diagnostico', {
          description_es: 'Only ES',
          // missing description_en
        }),
      ).rejects.toThrow(/bilingual/i);
    });

    it('should throw when batch size exceeds limit', async () => {
      // Create fields that would produce >500 operations
      const fields = {};
      for (let i = 0; i < 501; i++) {
        fields[`field_${i}`] = 'value';
      }
      await expect(
        AdminAPI.updateProgram('test', fields),
      ).rejects.toThrow(/exceeds limit/);
    });
  });

  describe('updatePricing', () => {
    it('should update pricing via writeBatch', async () => {
      await AdminAPI.updatePricing('b2c_base', { programs: {} });
      expect(mockBatch.update).toHaveBeenCalled();
      expect(mockBatch.set).toHaveBeenCalled();
      expect(mockBatch.commit).toHaveBeenCalled();
    });

    it('should capture previous document in audit entry', async () => {
      getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({ programs: { diagnostico: 10000 } }),
      });

      await AdminAPI.updatePricing('b2c_base', { programs: { diagnostico: 15000 } });

      const auditEntry = mockBatch.set.mock.calls[0][1];
      expect(auditEntry.previous_value).toEqual({ programs: { diagnostico: 10000 } });
      expect(auditEntry.new_value).toEqual({ programs: { diagnostico: 15000 } });
    });
  });

  describe('updateTranslations', () => {
    it('should merge translation updates via writeBatch', async () => {
      await AdminAPI.updateTranslations('es', { nav: { home: 'Inicio nuevo' } });
      expect(mockBatch.update).toHaveBeenCalled();
      expect(mockBatch.commit).toHaveBeenCalled();
    });

    it('should capture previous values for changed keys only', async () => {
      getDoc.mockResolvedValue({
        exists: () => true,
        data: () => ({
          nav: { home: 'Inicio', about: 'Acerca' },
          _meta: { key_count: 140 },
        }),
      });

      await AdminAPI.updateTranslations('es', { nav: { home: 'Inicio nuevo' } });

      const auditEntry = mockBatch.set.mock.calls[0][1];
      // Should have previous value for nav.home, not for _meta.*
      expect(auditEntry.previous_value).toEqual({ 'nav.home': 'Inicio' });
      expect(auditEntry.previous_value['_meta.updated_at']).toBeUndefined();
    });
  });

  describe('sanitizeInput', () => {
    it('should strip HTML tags from text input', () => {
      const result = AdminAPI.sanitizeInput('<script>alert("xss")</script>Hello');
      expect(result).toBe('Hello');
      expect(result).not.toContain('<script>');
    });

    it('should preserve plain text', () => {
      const result = AdminAPI.sanitizeInput('Normal text & more');
      expect(result).toBe('Normal text & more');
    });
  });

  describe('getNestedValue', () => {
    it('should navigate nested objects with dot path', () => {
      expect(getNestedValue({ a: { b: 1 } }, 'a.b')).toBe(1);
    });

    it('should return undefined for missing paths', () => {
      expect(getNestedValue({ a: { b: 1 } }, 'a.c')).toBeUndefined();
    });

    it('should return undefined for empty objects', () => {
      expect(getNestedValue({}, 'a.b')).toBeUndefined();
    });

    it('should return undefined for null input', () => {
      expect(getNestedValue(null, 'a')).toBeUndefined();
    });
  });
});
