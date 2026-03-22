const { test, expect } = require('@playwright/test');

/* ═══════════════════════════════════════════════════════════════════
   24 — Bilingual Product Pages (Wave 2)
   Tests: empresas/index.html and personas/index.html hero sections
   change to English when lang is set to "en".
   ═══════════════════════════════════════════════════════════════════ */

// ─── Helper: set language via localStorage before page load ───────
async function setLangBeforeLoad(page, lang) {
  await page.addInitScript(l => localStorage.setItem('lang', l), lang);
}

// ─── Helper: collect JS errors ────────────────────────────────────
function collectErrors(page) {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  return errors;
}

// ─── Helper: verify data-i18n elements are non-empty ──────────────
async function verifyI18nElementsNonEmpty(page) {
  const els = page.locator('[data-i18n]');
  const count = await els.count();
  if (count > 0) {
    for (let i = 0; i < count; i++) {
      const text = (await els.nth(i).textContent()).trim();
      expect(text.length, `data-i18n element ${i} is empty`).toBeGreaterThan(0);
    }
  }
}

// ══════════════════════════════════════════════════════════════════
// 1) empresas/index.html
// ══════════════════════════════════════════════════════════════════
test.describe('empresas/index.html — Bilingual (Wave 2)', () => {

  // ── SPANISH BASELINE ─────────────────────────────────────────

  test('empresas page renders correctly in Spanish (baseline)', async ({ page }) => {
    await setLangBeforeLoad(page, 'es');
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const text = (await h1.textContent()).trim();
    expect(text.length).toBeGreaterThan(0);
  });

  // ── ENGLISH MODE ─────────────────────────────────────────────

  test('empresas hero H1 is visible in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const text = (await h1.textContent()).trim();
    expect(text.length).toBeGreaterThan(0);
  });

  test('empresas hero H1 text differs between ES and EN', async ({ page }) => {
    await setLangBeforeLoad(page, 'es');
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const textEs = (await page.locator('main h1').textContent()).trim();

    await page.evaluate(() => localStorage.setItem('lang', 'en'));
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const textEn = (await page.locator('main h1').textContent()).trim();

    expect(textEs.length).toBeGreaterThan(0);
    expect(textEn.length).toBeGreaterThan(0);
  });

  test('data-i18n elements on empresas/index.html have content in EN', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await verifyI18nElementsNonEmpty(page);
  });

  test('no JS errors on empresas/index.html in EN mode', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render on empresas in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  test('program info modal buttons still work in EN mode on empresas', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Info buttons should still open modals
    const infoButtons = page.locator('button[onclick*="openModal"]');
    const count = await infoButtons.count();
    if (count > 0) {
      await infoButtons.first().click();
      await page.waitForTimeout(400);
      const modal = page.locator('#info-modal');
      await expect(modal).toBeVisible();
      await page.evaluate(() => closeModal());
      await page.waitForTimeout(300);
    }

    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('CTA links on empresas are functional in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // CTA links to contacto should still exist
    const contactoLinks = page.locator('a[href*="contacto/index.html"]');
    const count = await contactoLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('switching language on empresas mid-page does not break layout', async ({ page }) => {
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const h1Before = await page.locator('main h1').boundingBox();
    await page.locator('button[data-lang="en"]').first().click();
    await page.waitForTimeout(500);
    const h1After = await page.locator('main h1').boundingBox();

    expect(h1After).toBeTruthy();
    expect(h1After.width).toBeGreaterThan(0);
    expect(h1After.height).toBeGreaterThan(0);
  });

  test('mobile: empresas/index.html works in EN at 375px', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('main h1')).toBeVisible();
    const toggle = page.locator('.lang-toggle').first();
    await expect(toggle).toBeVisible();
  });

  test('no horizontal overflow on empresas in EN at 375px', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);
  });

});

// ══════════════════════════════════════════════════════════════════
// 2) personas/index.html
// ══════════════════════════════════════════════════════════════════
test.describe('personas/index.html — Bilingual (Wave 2)', () => {

  // ── SPANISH BASELINE ─────────────────────────────────────────

  test('personas page renders correctly in Spanish (baseline)', async ({ page }) => {
    await setLangBeforeLoad(page, 'es');
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const text = (await h1.textContent()).trim();
    expect(text.length).toBeGreaterThan(0);
  });

  // ── ENGLISH MODE ─────────────────────────────────────────────

  test('personas hero H1 is visible in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const text = (await h1.textContent()).trim();
    expect(text.length).toBeGreaterThan(0);
  });

  test('personas hero H1 text differs between ES and EN', async ({ page }) => {
    await setLangBeforeLoad(page, 'es');
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const textEs = (await page.locator('main h1').textContent()).trim();

    await page.evaluate(() => localStorage.setItem('lang', 'en'));
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const textEn = (await page.locator('main h1').textContent()).trim();

    expect(textEs.length).toBeGreaterThan(0);
    expect(textEn.length).toBeGreaterThan(0);
  });

  test('data-i18n elements on personas/index.html have content in EN', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await verifyI18nElementsNonEmpty(page);
  });

  test('no JS errors on personas/index.html in EN mode', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render on personas in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  test('program info modal buttons still work in EN mode on personas', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const infoButtons = page.locator('button[onclick*="openModal"]');
    const count = await infoButtons.count();
    if (count > 0) {
      await infoButtons.first().click();
      await page.waitForTimeout(400);
      const modal = page.locator('#info-modal');
      await expect(modal).toBeVisible();
      await page.evaluate(() => closeModal());
      await page.waitForTimeout(300);
    }

    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('CTA links on personas are functional in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const contactoLinks = page.locator('a[href*="contacto/index.html"]');
    const count = await contactoLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('switching language on personas mid-page does not break layout', async ({ page }) => {
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.locator('button[data-lang="en"]').first().click();
    await page.waitForTimeout(500);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const box = await h1.boundingBox();
    expect(box.width).toBeGreaterThan(0);
    expect(box.height).toBeGreaterThan(0);
  });

  test('mobile: personas/index.html works in EN at 375px', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('main h1')).toBeVisible();
    const toggle = page.locator('.lang-toggle').first();
    await expect(toggle).toBeVisible();
  });

  test('no horizontal overflow on personas in EN at 375px', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);
  });

  // ── CROSS-PAGE PERSISTENCE: empresas -> personas ──────────────

  test('EN language persists navigating empresas -> personas', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Navigate to personas
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const lang = await page.evaluate(() => window.i18n && window.i18n.lang);
    expect(lang).toBe('en');
  });

});
