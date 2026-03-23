// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Regression tests for BUG-001: i18n not loading on ruta page.
 *
 * Root cause: deployed SiteHeader.js lacked loadI18n() method.
 * These tests verify the fix permanently.
 */

const BASE_URL = process.env.BASE_URL || 'https://metodologia.info';

test.describe('Ruta page i18n', () => {

  test('BUG-001-REG-01: i18n.js loads on ruta page', async ({ page }) => {
    await page.goto(`${BASE_URL}/ruta/`);
    await page.waitForLoadState('networkidle');

    const i18nLoaded = await page.evaluate(() => !!window.i18n);
    expect(i18nLoaded).toBe(true);
  });

  test('BUG-001-REG-02: language toggle is visible', async ({ page }) => {
    await page.goto(`${BASE_URL}/ruta/`);
    await page.waitForLoadState('networkidle');

    const toggleButtons = page.locator('.lang-toggle__btn');
    await expect(toggleButtons).toHaveCount(2); // ES and EN (desktop)
  });

  test('BUG-001-REG-03: switching to EN translates data-i18n elements', async ({ page }) => {
    await page.goto(`${BASE_URL}/ruta/`);
    await page.waitForLoadState('networkidle');

    // Switch to English
    await page.evaluate(() => window.i18n.setLang('en'));
    await page.waitForTimeout(1000); // Wait for translations to apply

    // Check hero — should be English
    const heroTitle = await page.locator('[data-i18n="ruta.hero.title_line1"]').textContent();
    expect(heroTitle.trim()).toBe('Your Path to');

    const heroBadge = await page.locator('[data-i18n="ruta.hero.badge"]').textContent();
    expect(heroBadge.trim()).toBe('9-Level System');
  });

  test('BUG-001-REG-04: navigation menu translates to EN', async ({ page }) => {
    await page.goto(`${BASE_URL}/ruta/`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.i18n.setLang('en'));
    await page.waitForTimeout(1000);

    const navRuta = page.locator('[data-i18n="nav.ruta"]').first();
    const text = await navRuta.textContent();
    expect(text.trim()).toBe('Route of (R)Evolution');
  });

  test('BUG-001-REG-05: roadmap phases translate to EN', async ({ page }) => {
    await page.goto(`${BASE_URL}/ruta/`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.i18n.setLang('en'));
    await page.waitForTimeout(1000);

    const phase1 = await page.locator('[data-i18n="ruta.roadmap.phase1_label"]').textContent();
    expect(phase1.trim()).toBe('Phase 1: Foundation');

    const phase2 = await page.locator('[data-i18n="ruta.roadmap.phase2_label"]').textContent();
    expect(phase2.trim()).toBe('Phase 2: Accelerate');
  });

  test('BUG-001-REG-06: level descriptions translate to EN', async ({ page }) => {
    await page.goto(`${BASE_URL}/ruta/`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.i18n.setLang('en'));
    await page.waitForTimeout(1000);

    const n0Level = await page.locator('[data-i18n="ruta.n0.level_label"]').textContent();
    expect(n0Level.trim()).toBe('Level 0');

    const n0Title = await page.locator('[data-i18n="ruta.n0.title"]').textContent();
    expect(n0Title.trim()).toBe('Strategic');
  });

  test('BUG-001-REG-07: CTA sections translate to EN', async ({ page }) => {
    await page.goto(`${BASE_URL}/ruta/`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.i18n.setLang('en'));
    await page.waitForTimeout(1000);

    const ctaBtn = await page.locator('[data-i18n="ruta.cta_cotizador.btn"]').textContent();
    expect(ctaBtn.trim()).not.toContain('Inversión'); // Should be English
  });

  test('BUG-001-REG-08: zero Spanish remnants in EN mode', async ({ page }) => {
    await page.goto(`${BASE_URL}/ruta/`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.i18n.setLang('en'));
    await page.waitForTimeout(1000);

    // Check all data-i18n elements — none should still show Spanish fallback
    const untranslated = await page.evaluate(() => {
      const spanishPatterns = [
        'Diagnóstico', 'Evolución', 'Niveles', 'Bootcamp', 'Fase',
        'Inversión', 'Soberanía', 'Listo', 'Detalles', 'Agendar',
      ];
      const elements = document.querySelectorAll('[data-i18n]');
      const failures = [];
      for (const el of elements) {
        const text = el.textContent.trim();
        for (const pattern of spanishPatterns) {
          if (text.includes(pattern)) {
            failures.push({ key: el.getAttribute('data-i18n'), text: text.substring(0, 50) });
            break;
          }
        }
      }
      return failures;
    });

    expect(untranslated).toEqual([]);
  });

  test('BUG-001-REG-09: switching back to ES restores Spanish', async ({ page }) => {
    await page.goto(`${BASE_URL}/ruta/`);
    await page.waitForLoadState('networkidle');

    // EN then back to ES
    await page.evaluate(() => window.i18n.setLang('en'));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.i18n.setLang('es'));
    await page.waitForTimeout(500);

    const heroTitle = await page.locator('[data-i18n="ruta.hero.title_line1"]').textContent();
    expect(heroTitle.trim()).toBe('Tu Ruta a la');
  });
});
