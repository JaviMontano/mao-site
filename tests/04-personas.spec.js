const { test, expect } = require('@playwright/test');

test.describe('personas/index.html — Personas B2C', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────

  test('SEO meta tags complete', async ({ page }) => {
    await expect(page).toHaveTitle(/Profesionales.*MetodologIA|MetodologIA.*Personas/i);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  });

  // ── RENDER ───────────────────────────────────────────

  test('no JS errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) failed.push(resp.url());
    });
    await page.goto('/personas/index.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── HERO ─────────────────────────────────────────────

  test('hero H1 is visible', async ({ page }) => {
    await expect(page.locator('main h1')).toBeVisible();
  });

  test('hero CTAs link to cotizador and ruta', async ({ page }) => {
    await expect(page.locator('a[href="../ruta/cotizador.html"]').first()).toBeVisible();
    await expect(page.locator('a[href="../ruta/index.html"]').first()).toBeVisible();
  });

  // ── 6 PROGRAM CARDS ──────────────────────────────────

  test('6 info buttons exist (one per program)', async ({ page }) => {
    const buttons = page.locator('button[onclick*="openProgramModal"]');
    await expect(buttons).toHaveCount(6);
  });

  const programs = [
    { key: 'diagnostico', label: 'Diagnóstico' },
    { key: 'estrategia', label: 'Taller' },
    { key: 'amplificacion', label: 'Bootcamp' },
    { key: 'ofimatica', label: 'Ofimática' },
    { key: 'ventas', label: 'Ventas' },
    { key: 'champions', label: 'Champions' },
  ];

  for (const { key, label } of programs) {
    test(`program modal "${key}" opens and contains content`, async ({ page }) => {
      await page.evaluate(k => openProgramModal(k), key);
      await page.waitForTimeout(400);
      const modal = page.locator('#program-info-modal');
      const opacity = await modal.evaluate(el => getComputedStyle(el).opacity);
      expect(parseFloat(opacity)).toBe(1);
      // Should have title and benefits
      const content = await page.locator('#program-info-content').textContent();
      expect(content.length).toBeGreaterThan(50);
      // Close
      await page.evaluate(() => closeProgramModal());
      await page.waitForTimeout(200);
    });
  }

  test('program modal has ARIA attributes', async ({ page }) => {
    const modal = page.locator('#program-info-modal');
    await expect(modal).toHaveAttribute('role', 'dialog');
    await expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  test('program modal closes with X button', async ({ page }) => {
    await page.evaluate(() => openProgramModal('diagnostico'));
    await page.waitForTimeout(400);
    await page.click('#program-info-modal button[aria-label="Cerrar"]');
    await page.waitForTimeout(400);
    const opacity = await page.locator('#program-info-modal').evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBe(0);
  });

  // ── PROGRAM CARD NAVIGATION ──────────────────────────

  test('diagnostico card links externally (calendar)', async ({ page }) => {
    const card = page.locator('a[href*="calendar.app.google"]').first();
    await expect(card).toHaveAttribute('target', '_blank');
  });

  test('estrategia card links to workshops page', async ({ page }) => {
    const card = page.locator('a[href="consultive-workshops-estrategia-personal.html"]');
    await expect(card).toHaveCount(1);
  });

  test('amplificacion card links to bootcamp page', async ({ page }) => {
    const card = page.locator('a[href="bootcamp-amplificacion-profesional.html"]');
    await expect(card).toHaveCount(1);
  });

  // ── COTIZADOR CTA ────────────────────────────────────

  test('cotizador CTA links to cotizador', async ({ page }) => {
    const ctas = page.locator('a[href="../ruta/cotizador.html"]');
    expect(await ctas.count()).toBeGreaterThanOrEqual(1);
  });

  // ── INFO BUTTON DOES NOT NAVIGATE ─────────────────────

  test('info button click does not navigate parent card', async ({ page }) => {
    const urlBefore = page.url();
    await page.evaluate(() => {
      const btn = document.querySelector('button[aria-label*="Diagnóstico"]');
      if (btn) btn.click();
    });
    await page.waitForTimeout(500);
    expect(page.url()).toBe(urlBefore);
  });

  // ── ADVERSARIAL ───────────────────────────────────────

  test('invalid modal key does not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => openProgramModal('nonexistent'));
    await page.waitForTimeout(200);
    expect(errors).toHaveLength(0);
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

  test('modal works at mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.evaluate(() => openProgramModal('ventas'));
    await page.waitForTimeout(400);
    const opacity = await page.locator('#program-info-modal').evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBe(1);
  });

});
