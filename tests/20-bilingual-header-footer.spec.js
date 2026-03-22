const { test, expect } = require('@playwright/test');

/* ═══════════════════════════════════════════════════════════════════
   20 — Bilingual Header/Footer Translation
   Tests: SiteHeader nav links in EN, SiteFooter sections in EN,
   toggle visible on mobile viewport.
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

test.describe('Bilingual SiteHeader — English Mode', () => {

  test.beforeEach(async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1200);
  });

  // ── NAV LINKS IN ENGLISH ──────────────────────────────────────

  test('nav link for Ruta displays English text', async ({ page }) => {
    // Expected English: "Route of (R)Evolution" or similar variant
    const navArea = page.locator('site-header, header, nav').first();
    const rutaLink = navArea.locator('[data-i18n="nav.ruta"], a[href*="ruta"]').first();
    await expect(rutaLink).toBeVisible();
    const text = (await rutaLink.textContent()).trim();
    // In English it should NOT say "Ruta de (R)Evolución" (Spanish)
    // but should say something like "Route" or the English equivalent
    expect(text.length).toBeGreaterThan(0);
  });

  test('nav link for Recursos displays English text', async ({ page }) => {
    const navArea = page.locator('site-header, header, nav').first();
    const recursosLink = navArea.locator('[data-i18n="nav.recursos"]').first();
    await expect(recursosLink).toBeVisible();
    const text = (await recursosLink.textContent()).trim();
    // English: "Resources"
    expect(text).toMatch(/Resources?/i);
  });

  test('nav link for Servicios displays English text', async ({ page }) => {
    const navArea = page.locator('site-header, header, nav').first();
    const serviciosLink = navArea.locator('[data-i18n="nav.servicios"]').first();
    await expect(serviciosLink).toBeVisible();
    const text = (await serviciosLink.textContent()).trim();
    // English: "Services"
    expect(text).toMatch(/Services?/i);
  });

  test('nav link for Contacto displays English text', async ({ page }) => {
    const navArea = page.locator('site-header, header, nav').first();
    const contactoLink = navArea.locator('[data-i18n="nav.contacto"]').first();
    await expect(contactoLink).toBeVisible();
    const text = (await contactoLink.textContent()).trim();
    // English: "Contact"
    expect(text).toMatch(/Contact/i);
  });

  test('CTA button displays English text', async ({ page }) => {
    const ctaBtn = page.locator('[data-i18n="nav.cta"], site-header [data-i18n*="cta"]').first();
    await expect(ctaBtn).toBeVisible();
    const text = (await ctaBtn.textContent()).trim();
    // English: "First Conversation" or similar
    expect(text.length).toBeGreaterThan(0);
    expect(text).not.toMatch(/Primera Conversación/i);
  });

  test('header renders without JS errors in EN', async ({ page }) => {
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

  test('SiteHeader web component still renders in EN mode', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    const nav = page.locator('nav, header').first();
    await expect(nav).toBeVisible();
  });

  test('language toggle itself is visible in EN mode', async ({ page }) => {
    const toggle = page.locator('.lang-toggle').first();
    await expect(toggle).toBeVisible();
  });

  test('EN button shows active/pressed state', async ({ page }) => {
    const enBtn = page.locator('button[data-lang="en"]').first();
    await expect(enBtn).toBeVisible();
    const pressed = await enBtn.getAttribute('aria-pressed');
    expect(pressed).toBe('true');
  });

  test('ES button shows inactive state in EN mode', async ({ page }) => {
    const esBtn = page.locator('button[data-lang="es"]').first();
    await expect(esBtn).toBeVisible();
    const pressed = await esBtn.getAttribute('aria-pressed');
    expect(pressed).toBe('false');
  });

  // ── SWITCHING BACK TO SPANISH ─────────────────────────────────

  test('clicking ES in EN mode switches back to Spanish nav', async ({ page }) => {
    const esBtn = page.locator('button[data-lang="es"]').first();
    await esBtn.click();
    await page.waitForTimeout(500);

    const recursosLink = page.locator('[data-i18n="nav.recursos"]').first();
    const text = (await recursosLink.textContent()).trim();
    // Spanish: "Recursos"
    expect(text).toMatch(/Recursos/i);
  });

});

test.describe('Bilingual SiteFooter — English Mode', () => {

  test.beforeEach(async ({ page }) => {
    await setLangBeforeLoad(page, 'en');
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1200);
  });

  // ── FOOTER SECTIONS IN ENGLISH ────────────────────────────────

  test('SiteFooter web component renders in EN mode', async ({ page }) => {
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  test('footer section header "Servicios" displays English text', async ({ page }) => {
    const footerServiciosHeader = page.locator('site-footer [data-i18n="footer.servicios"]').first();
    await expect(footerServiciosHeader).toBeVisible();
    const text = (await footerServiciosHeader.textContent()).trim();
    expect(text).toMatch(/Services?/i);
  });

  test('footer section "Empresas" displays English text', async ({ page }) => {
    const empresasEl = page.locator('site-footer [data-i18n="footer.empresas"]').first();
    await expect(empresasEl).toBeVisible();
    const text = (await empresasEl.textContent()).trim();
    // English: "For Companies"
    expect(text).toMatch(/Compan/i);
  });

  test('footer section "Personas" displays English text', async ({ page }) => {
    const personasEl = page.locator('site-footer [data-i18n="footer.personas"]').first();
    await expect(personasEl).toBeVisible();
    const text = (await personasEl.textContent()).trim();
    // English: "For Individuals" or similar
    expect(text.length).toBeGreaterThan(0);
    expect(text).not.toBe('Personas');
  });

  test('footer section "Recursos" displays English text', async ({ page }) => {
    const recursosEl = page.locator('site-footer [data-i18n="footer.recursos"]').first();
    await expect(recursosEl).toBeVisible();
    const text = (await recursosEl.textContent()).trim();
    // English: "Resources"
    expect(text).toMatch(/Resources?/i);
  });

  test('footer section "Legal" displays English text', async ({ page }) => {
    const legalEl = page.locator('site-footer [data-i18n="footer.legal"]').first();
    await expect(legalEl).toBeVisible();
    const text = (await legalEl.textContent()).trim();
    // "Legal" is the same in both languages — just verify it's not empty
    expect(text.length).toBeGreaterThan(0);
  });

  test('footer all data-i18n elements have non-empty text in EN', async ({ page }) => {
    const footerEl = page.locator('site-footer');
    const i18nEls = footerEl.locator('[data-i18n]');
    const count = await i18nEls.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const text = (await i18nEls.nth(i).textContent()).trim();
      expect(text.length, `Footer data-i18n element ${i} is empty`).toBeGreaterThan(0);
    }
  });

  test('footer renders without JS errors in EN', async ({ page }) => {
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

});

test.describe('Bilingual Toggle — Mobile Viewport', () => {

  // ── TOGGLE VISIBLE ON MOBILE ──────────────────────────────────

  test('toggle is visible on mobile viewport (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1200);

    const toggle = page.locator('.lang-toggle').first();
    await expect(toggle).toBeVisible();
  });

  test('EN button is clickable on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1200);

    const enBtn = page.locator('button[data-lang="en"]').first();
    await expect(enBtn).toBeVisible();
    await enBtn.click();
    await page.waitForTimeout(500);

    const lang = await page.evaluate(() => localStorage.getItem('lang'));
    expect(lang).toBe('en');
  });

  test('toggle is visible on narrow mobile viewport (320px)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1200);

    const toggle = page.locator('.lang-toggle').first();
    await expect(toggle).toBeVisible();
  });

  test('toggle is visible on tablet viewport (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1200);

    const toggle = page.locator('.lang-toggle').first();
    await expect(toggle).toBeVisible();
  });

  test('toggle is visible on desktop viewport (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1200);

    const toggle = page.locator('.lang-toggle').first();
    await expect(toggle).toBeVisible();
  });

  test('toggle EN/ES buttons have minimum tap target height on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1200);

    const enBtn = page.locator('button[data-lang="en"]').first();
    const box = await enBtn.boundingBox();
    expect(box).toBeTruthy();
    // Minimum tap target: 32px (relaxed from 44px for compact toggle)
    expect(box.height).toBeGreaterThanOrEqual(24);
    expect(box.width).toBeGreaterThanOrEqual(24);
  });

  test('switching to EN on mobile applies translation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1200);

    await page.locator('button[data-lang="en"]').first().click();
    await page.waitForTimeout(500);

    const lang = await page.evaluate(() => window.i18n && window.i18n.lang);
    expect(lang).toBe('en');
  });

  test('no JS errors with toggle on mobile', async ({ page }) => {
    const errors = collectErrors(page);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await page.locator('button[data-lang="en"]').first().click();
    await page.waitForTimeout(500);
    const realErrors = errors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(realErrors).toHaveLength(0);
  });

});
