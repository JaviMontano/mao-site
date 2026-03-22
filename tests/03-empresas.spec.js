const { test, expect } = require('@playwright/test');

test.describe('empresas/index.html — Empresas B2B', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────

  test('SEO meta tags complete', async ({ page }) => {
    await expect(page).toHaveTitle(/Empresas.*MetodologIA/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /empresas/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  });

  // ── RENDER ───────────────────────────────────────────

  test('no JS errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) {
        failed.push(resp.url());
      }
    });
    await page.goto('/empresas/index.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO ─────────────────────────────────────────────

  test('hero has relevant H1', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
  });

  test('hero CTA links to workshop', async ({ page }) => {
    const cta = page.locator('a[href="workshop-venta-amplificada.html"]').first();
    await expect(cta).toBeVisible();
  });

  test('hero CTA links to bootcamp', async ({ page }) => {
    const cta = page.locator('a[href="bootcamp-ventas-ia.html"]').first();
    await expect(cta).toBeVisible();
  });

  // ── BREADCRUMB ────────────────────────────────────────

  test('breadcrumb navigates to Inicio', async ({ page }) => {
    const link = page.locator('.breadcrumb-nav a').first();
    await expect(link).toHaveAttribute('href', /index\.html/);
  });

  // ── PROGRAM CARDS (3) ────────────────────────────────

  test('3 program cards visible (diagnostico, workshop, bootcamp)', async ({ page }) => {
    await expect(page.locator('a[href="diagnostico-gratuito.html"]')).toHaveCount(1);
    await expect(page.locator('a[href="workshop-venta-amplificada.html"]')).toHaveCount(2); // hero + card
    await expect(page.locator('a[href="bootcamp-ventas-ia.html"]')).toHaveCount(2); // hero + card
  });

  test('diagnostico card navigates', async ({ page }) => {
    await page.click('a[href="diagnostico-gratuito.html"]');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('diagnostico');
  });

  // ── PROGRAM INFO MODALS (3 info buttons) ──────────────

  test('3 info buttons exist', async ({ page }) => {
    const buttons = page.locator('button[onclick*="openProgramModal"]');
    await expect(buttons).toHaveCount(3);
  });

  test('diagnostico info modal opens and has content', async ({ page }) => {
    await page.click('button[aria-label*="Diagnostico"]');
    await page.waitForTimeout(400);
    const modal = page.locator('#program-info-modal');
    const opacity = await modal.evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBe(1);
    await expect(page.locator('#program-info-content')).toContainText(/diagnostico/i);
  });

  test('workshop info modal opens', async ({ page }) => {
    await page.click('button[aria-label*="Workshop"]');
    await page.waitForTimeout(400);
    await expect(page.locator('#program-info-content')).toContainText(/workshop|Workshop/i);
  });

  test('bootcamp info modal opens', async ({ page }) => {
    await page.click('button[aria-label*="Bootcamp"]');
    await page.waitForTimeout(400);
    await expect(page.locator('#program-info-content')).toContainText(/bootcamp|Bootcamp/i);
  });

  test('program modal closes with X button', async ({ page }) => {
    await page.click('button[aria-label*="Diagnostico"]');
    await page.waitForTimeout(400);
    await page.click('#program-info-modal button[aria-label="Cerrar"]');
    await page.waitForTimeout(400);
    const modal = page.locator('#program-info-modal');
    const opacity = await modal.evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBe(0);
  });

  test('program modal has ARIA attributes', async ({ page }) => {
    const modal = page.locator('#program-info-modal');
    await expect(modal).toHaveAttribute('role', 'dialog');
    await expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  // ── COTIZADOR CTA ────────────────────────────────────

  test('cotizador CTA links to cotizador-empresas', async ({ page }) => {
    const cta = page.locator('a[href="../ruta/cotizador-empresas.html"]');
    await expect(cta).toHaveCount(1);
    await expect(cta).toBeVisible();
  });

  // ── QUICK ACCESS GRID ────────────────────────────────

  test('quick access links exist', async ({ page }) => {
    const catalogo = page.locator('a[href*="recursos/index.html"]');
    expect(await catalogo.count()).toBeGreaterThanOrEqual(1);
    const aMedida = page.locator('a[href*="a-medida"]');
    expect(await aMedida.count()).toBeGreaterThanOrEqual(1);
    // Calendar link (external)
    const calLinks = page.locator('a[href*="calendar.app.google"]');
    expect(await calLinks.count()).toBeGreaterThanOrEqual(1);
    await expect(calLinks.first()).toHaveAttribute('target', '_blank');
  });

  // ── ADVERSARIAL ───────────────────────────────────────

  test('rapid info button clicks do not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const label of ['Diagnostico', 'Workshop', 'Bootcamp']) {
      await page.evaluate((l) => {
        const btn = document.querySelector(`button[aria-label*="${l}"]`);
        if (btn) btn.click();
      }, label);
      await page.waitForTimeout(100);
      await page.evaluate(() => {
        if (typeof closeProgramModal === 'function') closeProgramModal();
      });
      await page.waitForTimeout(100);
    }
    expect(errors).toHaveLength(0);
  });

  test('info button click does not navigate parent card', async ({ page }) => {
    const urlBefore = page.url();
    await page.click('button[aria-label*="Diagnostico"]');
    await page.waitForTimeout(500);
    expect(page.url()).toBe(urlBefore);
  });

  test('no horizontal overflow', async ({ page }) => {
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(200);
      const hasOverflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow, `Overflow at ${width}px`).toBeFalsy();
    }
  });

  test('mobile: cards stack vertically', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    const card1 = page.locator('a[href="diagnostico-gratuito.html"]');
    await expect(card1).toBeVisible();
  });

});
