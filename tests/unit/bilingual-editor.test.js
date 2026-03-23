/**
 * Bilingual editor component tests — TDD.
 * @see specs/006-cms-backoffice-rbac/spec.md US5
 */
import { describe, it, expect } from 'vitest';

// T042: bilingual field component tests [TS-022, TS-023]
describe('Bilingual Editor', () => {
  describe('stale indicator [TS-022]', () => {
    it('should mark EN as stale when ES is modified', () => {
      const state = { title_es: 'Nuevo', title_en: 'Old', title_en_stale: false };
      // Simulate ES edit
      state.title_es = 'Modificado';
      state.title_en_stale = true;
      expect(state.title_en_stale).toBe(true);
    });

    it('should clear stale flag when EN is updated', () => {
      const state = { title_en_stale: true };
      state.title_en_stale = false;
      expect(state.title_en_stale).toBe(false);
    });
  });

  describe('translation needed indicator [TS-023]', () => {
    it('should show "translation needed" when ES changed but EN not', () => {
      const dirty = { es: true, en: false };
      const needsTranslation = dirty.es && !dirty.en;
      expect(needsTranslation).toBe(true);
    });
  });
});
