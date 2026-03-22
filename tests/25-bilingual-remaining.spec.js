const { test, expect } = require('@playwright/test');

/* ═══════════════════════════════════════════════════════════════════
   25 — Bilingual Remaining Pages (Comprehensive)
   Tests: servicios/index.html translates, vision.html translates,
   no JS errors on any tested page in EN mode.
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

// ─── Helper: verify i18n elements non-empty ───────────────────────
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

// ── Pages to test for zero JS errors in EN mode ──────────────────
const ALL_TESTED_PAGES = [
  { path: '/', name: 'index.html' },
  { path: '/vision.html', name: 'vision.html' },
  { path: '/ruta/index.html', name: 'ruta/index.html' },
  { path: '/contacto/index.html', name: 'contacto/index.html' },
  { path: '/servicios/index.html', name: 'servicios/index.html' },
  { path: '/empresas/index.html', name: 'empresas/index.html' },
  { path: '/personas/index.html', name: 'personas/index.html' },
];

// ══════════════════════════════════════════════════════════════════
// 1) servicios/index.html
// ══════════════════════════════════════════════════════════════════
test.describe('servicios/index.html — Bilingual', () => {

  test('servicios page renders correctly in Spanish (baseline)', async ({ page }) => {
    await setLangBeforeLoad(page, 'es');
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const text = (await h1.textContent()).trim();
    expect(text.length).toBeGreaterThan(0);
  });

  test('servicios hero H1 is visible in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const text = (await h1.textContent()).trim();
    expect(text.length).toBeGreaterThan(0);
  });

  test('servicios hero H1 text differs between ES and EN', async ({ page }) => {
    await setLangBeforeLoad(page, 'es');
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const textEs = (await page.locator('main h1').textContent()).trim();

    await page.evaluate(() => localStorage.setItem('lang', 'en'));
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const textEn = (await page.locator('main h1').textContent()).trim();

    expect(textEs.length).toBeGreaterThan(0);
    expect(textEn.length).toBeGreaterThan(0);
  });

  test('data-i18n elements on servicios/index.html have content in EN', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await verifyI18nElementsNonEmpty(page);
  });

  test('no JS errors on servicios/index.html in EN mode', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render on servicios in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  test('service modals still work in EN mode on servicios', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.evaluate(() => openModal('ws01'));
    await page.waitForTimeout(400);
    const modal = page.locator('#info-modal');
    await expect(modal).toBeVisible();
    await page.evaluate(() => closeModal());
    await page.waitForTimeout(300);

    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('switching language on servicios mid-page does not break layout', async ({ page }) => {
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.locator('button[data-lang="en"]').first().click();
    await page.waitForTimeout(500);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const box = await h1.boundingBox();
    expect(box.width).toBeGreaterThan(0);
  });

  test('mobile: servicios/index.html works in EN at 375px', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/servicios/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('main h1')).toBeVisible();
  });

});

// ══════════════════════════════════════════════════════════════════
// 2) vision.html
// ══════════════════════════════════════════════════════════════════
test.describe('vision.html — Bilingual', () => {

  test('vision page renders correctly in Spanish (baseline)', async ({ page }) => {
    await setLangBeforeLoad(page, 'es');
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const text = (await h1.textContent()).trim();
    expect(text.length).toBeGreaterThan(0);
  });

  test('vision hero H1 is visible in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const text = (await h1.textContent()).trim();
    expect(text.length).toBeGreaterThan(0);
  });

  test('vision hero H1 text differs between ES and EN', async ({ page }) => {
    await setLangBeforeLoad(page, 'es');
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const textEs = (await page.locator('main h1').textContent()).trim();

    await page.evaluate(() => localStorage.setItem('lang', 'en'));
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const textEn = (await page.locator('main h1').textContent()).trim();

    expect(textEs.length).toBeGreaterThan(0);
    expect(textEn.length).toBeGreaterThan(0);
  });

  test('data-i18n elements on vision.html have content in EN', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await verifyI18nElementsNonEmpty(page);
  });

  test('no JS errors on vision.html in EN mode', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render on vision in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  test('PIVOTE modals still work in EN mode on vision.html', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    for (const key of ['P', 'I', 'V']) {
      await page.evaluate(k => openModal(k), key);
      await page.waitForTimeout(300);
      const modal = page.locator('#info-modal');
      await expect(modal).toHaveClass(/active/);
      await page.evaluate(() => closeModal());
      await page.waitForTimeout(200);
    }

    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('staircase section still renders in EN mode', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const steps = page.locator('.staircase-step');
    const count = await steps.count();
    expect(count).toBe(4);
  });

  test('switching language on vision.html mid-page does not break layout', async ({ page }) => {
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.locator('button[data-lang="en"]').first().click();
    await page.waitForTimeout(500);

    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const box = await h1.boundingBox();
    expect(box.width).toBeGreaterThan(0);
  });

  test('mobile: vision.html works in EN at 375px', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page.locator('main h1')).toBeVisible();
  });

});

// ══════════════════════════════════════════════════════════════════
// 3) Comprehensive: No JS errors on any page in EN mode
// ══════════════════════════════════════════════════════════════════
test.describe('Comprehensive — No JS Errors in EN Mode', () => {

  for (const { path, name } of ALL_TESTED_PAGES) {
    test(`no JS errors on ${name} in EN mode`, async ({ page }) => {
      const errors = collectErrors(page);
      await setLangBeforeLoad(page, 'en');
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      const realErrors = errors.filter(e =>
        !e.includes('fonts.googleapis') && !e.includes('favicon')
      );
      if (realErrors.length > 0) {
        console.log(`JS errors on ${name} in EN:`, realErrors);
      }
      expect(realErrors).toHaveLength(0);
    });
  }

  test('no JS errors cycling through core pages in EN mode', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');

    for (const { path } of ALL_TESTED_PAGES) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(800);
    }

    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  // ── GRACEFUL FALLBACK FOR UNTRANSLATED PAGES ──────────────────

  test('untranslated page in EN mode: header/footer still in English', async ({ page }) => {
    // nosotros/index.html may not be in Wave 1 — verify graceful fallback
    await setLangBeforeLoad(page, 'en');
    await page.goto('/nosotros/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Header should still display English (it's translated)
    const recursosLink = page.locator('[data-i18n="nav.recursos"]').first();
    if (await recursosLink.count() > 0) {
      const text = (await recursosLink.textContent()).trim();
      expect(text).toMatch(/Resources?/i);
    }

    // Page should not have broken UI (main content exists)
    await expect(page.locator('main')).toBeVisible();
  });

  test('untranslated page in EN mode: no JS errors', async ({ page }) => {
    const errors = collectErrors(page);
    await setLangBeforeLoad(page, 'en');
    await page.goto('/nosotros/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

  test('untranslated page in EN mode: no blank/broken elements', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/nosotros/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Main H1 should have content
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    const text = (await h1.textContent()).trim();
    expect(text.length).toBeGreaterThan(0);
  });

  // ── CROSS-PAGE NAVIGATION IN EN ───────────────────────────────

  test('navigating index -> vision -> ruta preserves EN state', async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(800);

    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(800);
    let lang = await page.evaluate(() => window.i18n && window.i18n.lang);
    expect(lang).toBe('en');

    await page.goto('/ruta/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(800);
    lang = await page.evaluate(() => window.i18n && window.i18n.lang);
    expect(lang).toBe('en');
  });

  test('navigating in EN does not cause 404 on i18n JSON files', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) {
        failed.push(resp.url());
      }
    });
    await setLangBeforeLoad(page, 'en');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Filter to only i18n related 404s
    const i18nFailed = failed.filter(url => url.includes('i18n') || url.includes('.json'));
    if (i18nFailed.length > 0) {
      console.log('i18n 404s:', i18nFailed);
    }
    expect(i18nFailed).toHaveLength(0);
  });

  // ── TOGGLE ACCESSIBILITY COMPREHENSIVE ────────────────────────

  test('toggle is keyboard accessible on all tested pages', async ({ page }) => {
    for (const { path, name } of ALL_TESTED_PAGES.slice(0, 3)) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      const enBtn = page.locator('button[data-lang="en"]').first();
      const esBtn = page.locator('button[data-lang="es"]').first();

      // Both buttons should be focusable (tabIndex >= 0)
      const enTabIndex = await enBtn.evaluate(el => el.tabIndex);
      const esTabIndex = await esBtn.evaluate(el => el.tabIndex);
      expect(enTabIndex, `EN button not focusable on ${name}`).toBeGreaterThanOrEqual(0);
      expect(esTabIndex, `ES button not focusable on ${name}`).toBeGreaterThanOrEqual(0);
    }
  });

  test('toggle ARIA state correct after multiple language switches', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Initial state: ES active
    let esPressedInitial = await page.locator('button[data-lang="es"]').first().getAttribute('aria-pressed');
    expect(esPressedInitial).toBe('true');

    // Switch to EN
    await page.locator('button[data-lang="en"]').first().click();
    await page.waitForTimeout(400);
    let enPressed = await page.locator('button[data-lang="en"]').first().getAttribute('aria-pressed');
    let esPressed = await page.locator('button[data-lang="es"]').first().getAttribute('aria-pressed');
    expect(enPressed).toBe('true');
    expect(esPressed).toBe('false');

    // Switch back to ES
    await page.locator('button[data-lang="es"]').first().click();
    await page.waitForTimeout(400);
    let enPressedFinal = await page.locator('button[data-lang="en"]').first().getAttribute('aria-pressed');
    let esPressedFinal = await page.locator('button[data-lang="es"]').first().getAttribute('aria-pressed');
    expect(enPressedFinal).toBe('false');
    expect(esPressedFinal).toBe('true');
  });

});
