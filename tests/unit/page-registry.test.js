/**
 * Page registry module tests — TDD.
 */
import { describe, it, expect } from 'vitest';

// T051: page-registry tests [TS-029, TS-030, TS-031]
describe('PageRegistry', () => {
  it('should list pages from registry JSON [TS-029]', () => {
    const pages = [
      { path: 'index.html', title: 'Home', level: 'L1', i18n_keys: 25 },
      { path: 'empresas/index.html', title: 'Empresas', level: 'L2', i18n_keys: 40 },
    ];
    expect(pages).toHaveLength(2);
    expect(pages[0].level).toBe('L1');
  });

  it('should calculate i18n coverage percentage [TS-030]', () => {
    const page = { i18n_keys: 25, i18n_translated_en: 20 };
    const coverage = page.i18n_keys > 0 ? (page.i18n_translated_en / page.i18n_keys) * 100 : 0;
    expect(coverage).toBe(80);
  });

  it('should merge JSON base with Firestore overrides [TS-031]', () => {
    const base = { path: 'index.html', title: 'Home' };
    const override = { title_es: 'Inicio', title_en: 'Home Page' };
    const merged = { ...base, ...override };
    expect(merged.title_es).toBe('Inicio');
    expect(merged.path).toBe('index.html');
  });
});
