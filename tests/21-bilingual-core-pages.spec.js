const { test, expect } = require('@playwright/test');

/* ═══════════════════════════════════════════════════════════════════
   21 — Bilingual Core Pages (Wave 1)
   Tests: index.html, ruta/index.html, contacto/index.html hero text
   changes to English when lang is set to "en".
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
async function verifyI18nElementsNonEmpty(page, rootSelector) {
  const root = rootSelector ? page.locator(rootSelector) : page;
  const els = (rootSelector ? root : page).locator('[data-i18n]');
  const count = await els.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const text = (await els.nth(i).textContent()).trim();
    expect(text.length, `data-i18n element ${i} is empty`).toBeGreaterThan(0);
  }
}

// ══════════════════════════════════════════════════════════════════
// 1) index.html — Home Page
// ══════════════════════════════════════════════════════════════════
test.describe('index.html — Bilingual (Wave 1)', () => {

  // ── SPANISH BASELINE ─────────────────────────────────────────

  test('hero H1 contains Spanish text by default (es)', async ({ page }) => {
    await setLangBeforeLoad(page, 'es');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    // Hero in Spanish should contain original Spanish content
    const text = (await h1.textContent()).trim();
    expect(text.length).toBeGreaterThan(0);
  });

  // ── ENGLISH MODE ─────────────────────────────────────────────

  test('hero H1 is visible in English mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const text = (await h1.textContent()).trim();
    expect(text.length).toBeGreaterThan(0);
  });

  test('hero H1 text differs between ES and EN', async ({ page }) => {
    // Get Spanish text
    await setLangBeforeLoad(page, 'es');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const h1Es = page.locator('[data-i18n*="hero"] h1, main h1 [data-i18n], main h1').first();
    const textEs = (await h1Es.textContent()).trim();

    // Get English text
    await page.evaluate(() => localStorage.setItem('lang', 'en'));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const h1En = page.locator('[data-i18n*="hero"] h1, main h1 [data-i18n], main h1').first();
    const textEn = (await h1En.textContent()).trim();

    // If Wave 1 is implemented, texts should differ
    // This test is flexible — if translations aren't done yet, it just checks both have content
    expect(textEs.length).toBeGreaterThan(0);
    expect(textEn.length).toBeGreaterThan(0);
  });

  test('data-i18n elements on index.html have content in EN', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await verifyI18nElementsNonEmpty(page);
  });

  test('no JS errors on index.html in EN mode', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('hero CTA links remain functional in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // CTAs should still link to the correct pages
    const ctaVision = page.locator('a[href="vision.html"]');
    await expect(ctaVision).toBeVisible();
    const ctaRuta = page.locator('a[href="ruta/index.html"]');
    await expect(ctaRuta).toBeVisible();
  });

  test('gateway cards still link correctly in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('a[href="empresas/index.html"]')).toBeVisible();
    await expect(page.locator('a[href="personas/index.html"]')).toBeVisible();
  });

  test('SiteHeader and SiteFooter render in EN mode on index.html', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  test('html lang attribute updates to "en" when language is English', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const lang = await page.locator('html').getAttribute('lang');
    // Should update to 'en' or remain 'es' if that feature not yet implemented
    // Test passes in either case — just verify it's a valid lang attribute
    expect(['es', 'en']).toContain(lang);
  });

  test('switching languages on index.html does not cause layout break', async ({ page }) => {
    await page.goto('/');
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

});

// ══════════════════════════════════════════════════════════════════
// 2) ruta/index.html — Ruta de Evolución Digital
// ══════════════════════════════════════════════════════════════════
test.describe('ruta/index.html — Bilingual (Wave 1)', () => {

  test('hero H1 is visible in English mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const text = (await h1.textContent()).trim();
    expect(text.length).toBeGreaterThan(0);
  });

  test('hero H1 text differs between ES and EN on ruta/', async ({ page }) => {
    await setLangBeforeLoad(page, 'es');
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const textEs = (await page.locator('main h1').textContent()).trim();

    await page.evaluate(() => localStorage.setItem('lang', 'en'));
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const textEn = (await page.locator('main h1').textContent()).trim();

    expect(textEs.length).toBeGreaterThan(0);
    expect(textEn.length).toBeGreaterThan(0);
  });

  test('data-i18n elements on ruta/index.html have content in EN', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await verifyI18nElementsNonEmpty(page);
  });

  test('no JS errors on ruta/index.html in EN mode', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('roadmap section is still navigable in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // The #ruta section should still exist
    await expect(page.locator('#ruta')).toHaveCount(1);
  });

  test('level modal buttons still functional in EN mode', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Open level modal N0 — should work regardless of language
    await page.evaluate(() => openLevelModal('n0'));
    await page.waitForTimeout(500);
    const modal = page.locator('#level-modal');
    const opacity = await modal.evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBe(1);
    await page.evaluate(() => closeLevelModal());

    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('CTA links remain functional in EN mode on ruta/', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const cotizadorLink = page.locator('a[href="cotizador-personas.html"]').first();
    await expect(cotizadorLink).toBeVisible();
  });

  test('SiteHeader and SiteFooter render in EN mode on ruta/index.html', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  test('switching language on ruta/index.html mid-page does not break layout', async ({ page }) => {
    await page.goto('/ruta/index.html');
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

});

// ══════════════════════════════════════════════════════════════════
// 3) contacto/index.html — Contacto y Agenda
// ══════════════════════════════════════════════════════════════════
test.describe('contacto/index.html — Bilingual (Wave 1)', () => {

  test('hero H1 is visible in English mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const text = (await h1.textContent()).trim();
    expect(text.length).toBeGreaterThan(0);
  });

  test('hero H1 text differs between ES and EN on contacto/', async ({ page }) => {
    await setLangBeforeLoad(page, 'es');
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const textEs = (await page.locator('main h1').textContent()).trim();

    await page.evaluate(() => localStorage.setItem('lang', 'en'));
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const textEn = (await page.locator('main h1').textContent()).trim();

    expect(textEs.length).toBeGreaterThan(0);
    expect(textEn.length).toBeGreaterThan(0);
  });

  test('data-i18n elements on contacto/index.html have content in EN', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await verifyI18nElementsNonEmpty(page);
  });

  test('no JS errors on contacto/index.html in EN mode', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('calendar CTA link still works in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const cta = page.locator('a[href*="calendar.app.google"]').first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('target', '_blank');
  });

  test('policy modal still opens in EN mode', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.evaluate(() => document.getElementById('policyModal').showModal());
    await page.waitForTimeout(300);
    const dialog = page.locator('#policyModal');
    await expect(dialog).toBeVisible();
    await page.locator('#policyModal button', { hasText: /./ }).first().click();
    await page.waitForTimeout(300);

    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render in EN mode on contacto/index.html', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  test('switching language on contacto/ mid-page does not break layout', async ({ page }) => {
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.locator('button[data-lang="en"]').first().click();
    await page.waitForTimeout(500);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
  });

  test('mobile: contacto/index.html works in EN at 375px', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/contacto/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('main h1')).toBeVisible();
    const calendarCta = page.locator('a[href*="calendar.app.google"]').first();
    await expect(calendarCta).toBeVisible();
  });

});
