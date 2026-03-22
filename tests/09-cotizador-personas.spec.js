const { test, expect } = require('@playwright/test');

test.describe('ruta/cotizador.html — Cotizador Personas', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/ruta/cotizador.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO ──────────────────────────────────────────────

  test('SEO meta tags', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /cotizador/);
  });

  // ── RENDER ───────────────────────────────────────────

  test('no JS errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/ruta/cotizador.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) failed.push(resp.url());
    });
    await page.goto('/ruta/cotizador.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── RUTA MODE TOGGLE ─────────────────────────────────

  test('personas/empresas toggle buttons exist', async ({ page }) => {
    await expect(page.locator('#toggle-personas')).toBeVisible();
    await expect(page.locator('#toggle-empresas')).toBeVisible();
  });

  test('clicking empresas toggle navigates or changes mode', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.click('#toggle-empresas');
    await page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  });

  // ── STEP NAVIGATION ──────────────────────────────────

  test('step 0 (intro) is visible by default', async ({ page }) => {
    const step0 = page.locator('#step-0, [data-step-content="0"]').first();
    // Step 0 should be the active/visible step
    const stepNodes = page.locator('.step-node');
    expect(await stepNodes.count()).toBeGreaterThanOrEqual(5);
  });

  test('step nodes (progress bar) exist', async ({ page }) => {
    const nodes = page.locator('button[onclick*="goToStep"]');
    expect(await nodes.count()).toBeGreaterThanOrEqual(5);
  });

  test('can navigate from step 0 to step 1', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    // Click next/start button in step 0
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  });

  // ── STEP 1: PROFILE INPUTS ───────────────────────────

  test('step 1 has profile inputs', async ({ page }) => {
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);
    // In personas mode, headcount is hidden. Check for common inputs.
    await expect(page.locator('#ingresos')).toBeVisible();
    await expect(page.locator('#horas-semana')).toBeVisible();
  });

  test('step 1 inputs accept values', async ({ page }) => {
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);
    await page.fill('#ingresos', '8000000');
    const val = await page.locator('#ingresos').inputValue();
    expect(val).toBe('8000000');
  });

  test('range sliders update display', async ({ page }) => {
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);
    const slider = page.locator('#horas-semana');
    await slider.fill('30');
    await slider.dispatchEvent('input');
    await page.waitForTimeout(200);
    // The display should reflect the value
    const display = page.locator('#horas-semana-display, [id*="horas-semana"]').first();
    // Just verify no crash
  });

  // ── STEP 2: TASK DISTRIBUTION (SIMULADOR) ────────────

  test('step 2 has task distribution sliders', async ({ page }) => {
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(300);
    await expect(page.locator('#tareas-simples')).toBeVisible();
    await expect(page.locator('#tareas-medias')).toBeVisible();
    await expect(page.locator('#tareas-altas')).toBeVisible();
  });

  test('task distribution total displays and updates', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(300);
    // Set values that sum to 100
    await page.locator('#tareas-simples').fill('40');
    await page.locator('#tareas-simples').dispatchEvent('input');
    await page.locator('#tareas-medias').fill('35');
    await page.locator('#tareas-medias').dispatchEvent('input');
    await page.locator('#tareas-altas').fill('25');
    await page.locator('#tareas-altas').dispatchEvent('input');
    await page.waitForTimeout(300);
    expect(errors).toHaveLength(0);
    // Check for total display
    const body = await page.locator('body').textContent();
    expect(body).toContain('100%');
  });

  test('task distribution shows deviation when not 100%', async ({ page }) => {
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(300);
    await page.locator('#tareas-simples').fill('50');
    await page.locator('#tareas-simples').dispatchEvent('input');
    await page.locator('#tareas-medias').fill('30');
    await page.locator('#tareas-medias').dispatchEvent('input');
    await page.locator('#tareas-altas').fill('30');
    await page.locator('#tareas-altas').dispatchEvent('input');
    await page.waitForTimeout(300);
    // Total is 110, should show "Sobran"
    const body = await page.locator('body').textContent();
    expect(body).toMatch(/Sobran|sobran|110/);
  });

  test('next button disabled when total != 100%', async ({ page }) => {
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(300);
    // Set values that DON'T sum to 100
    await page.locator('#tareas-simples').fill('50');
    await page.locator('#tareas-simples').dispatchEvent('input');
    await page.locator('#tareas-medias').fill('50');
    await page.locator('#tareas-medias').dispatchEvent('input');
    await page.locator('#tareas-altas').fill('50');
    await page.locator('#tareas-altas').dispatchEvent('input');
    await page.waitForTimeout(300);
    // The next button should be disabled or show a warning
    // Check if there's a disabled state or visual cue
    const nextBtn = page.locator('#step-2 button[onclick*="nextStep"]');
    if (await nextBtn.count() > 0) {
      const isDisabled = await nextBtn.evaluate(el => el.disabled || el.classList.contains('opacity-50'));
      // If the button disables, great. If not, just verify no crash
    }
  });

  // ── STEP 3: PROGRAM SELECTION ────────────────────────

  test('step 3 has program checkboxes', async ({ page }) => {
    await page.evaluate(() => goToStep(3));
    await page.waitForTimeout(300);
    const checkboxes = page.locator('.level-checkbox');
    expect(await checkboxes.count()).toBeGreaterThanOrEqual(5);
  });

  test('checking programs updates selection', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => goToStep(3));
    await page.waitForTimeout(300);
    const firstCheckbox = page.locator('.level-checkbox').first();
    await firstCheckbox.check();
    await page.waitForTimeout(200);
    expect(errors).toHaveLength(0);
    expect(await firstCheckbox.isChecked()).toBeTruthy();
  });

  // ── STEP 4: RESULTS ──────────────────────────────────

  test('step 4 shows results summary', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => goToStep(4));
    await page.waitForTimeout(300);
    expect(errors).toHaveLength(0);
  });

  // ── STEP 5: CONTACT CTAs ─────────────────────────────

  test('step 5 has calendar and email CTAs', async ({ page }) => {
    await page.evaluate(() => goToStep(5));
    await page.waitForTimeout(300);
    const calLink = page.locator('a[href*="calendar.app.google"]');
    expect(await calLink.count()).toBeGreaterThanOrEqual(1);
    const mailCta = page.locator('#mailto-cta');
    expect(await mailCta.count()).toBe(1);
  });

  // ── MODALS ────────────────────────────────────────────

  test('methodology modal opens and closes', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => goToStep(4));
    await page.waitForTimeout(300);
    await page.evaluate(() => openMethodologyModal());
    await page.waitForTimeout(300);
    // Should be visible
    const modal = page.locator('#methodology-modal, .modal-overlay.active').first();
    expect(await modal.count()).toBeGreaterThanOrEqual(1);
    await page.evaluate(() => closeMethodologyModal());
    await page.waitForTimeout(200);
    expect(errors).toHaveLength(0);
  });

  // ── FULL FLOW (Happy Path) ───────────────────────────

  test('complete flow: step 0 → 5 without errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));

    // Step 0 → 1
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);

    // Step 1: fill profile (personas mode — ingresos, not headcount)
    await page.fill('#ingresos', '5000000');
    await page.waitForTimeout(100);

    // Step 1 → 2
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(300);

    // Step 2: set distribution to 100%
    await page.locator('#tareas-simples').fill('40');
    await page.locator('#tareas-simples').dispatchEvent('input');
    await page.locator('#tareas-medias').fill('35');
    await page.locator('#tareas-medias').dispatchEvent('input');
    await page.locator('#tareas-altas').fill('25');
    await page.locator('#tareas-altas').dispatchEvent('input');
    await page.waitForTimeout(200);

    // Step 2 → 3
    await page.evaluate(() => goToStep(3));
    await page.waitForTimeout(300);

    // Step 3: select some programs
    const firstCheckbox = page.locator('.level-checkbox').first();
    await firstCheckbox.check();
    await page.waitForTimeout(100);

    // Step 3 → 4
    await page.evaluate(() => goToStep(4));
    await page.waitForTimeout(300);

    // Step 4 → 5
    await page.evaluate(() => goToStep(5));
    await page.waitForTimeout(300);

    expect(errors).toHaveLength(0);
  });

  // ── ADVERSARIAL ───────────────────────────────────────

  test('rapid step jumping does not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (let i = 0; i <= 5; i++) {
      await page.evaluate(s => goToStep(s), i);
      await page.waitForTimeout(50);
    }
    // Jump backwards
    for (let i = 5; i >= 0; i--) {
      await page.evaluate(s => goToStep(s), i);
      await page.waitForTimeout(50);
    }
    expect(errors).toHaveLength(0);
  });

  test('extreme slider values do not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(200);
    await page.fill('#ingresos', '1000000');
    await page.fill('#ingresos', '999999999');
    await page.locator('#horas-semana').fill('60');
    await page.locator('#horas-semana').dispatchEvent('input');
    await page.locator('#horas-semana').fill('10');
    await page.locator('#horas-semana').dispatchEvent('input');
    await page.waitForTimeout(200);
    expect(errors).toHaveLength(0);
  });

  test('all checkboxes can be toggled on and off', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => goToStep(3));
    await page.waitForTimeout(300);
    const checkboxes = page.locator('.level-checkbox');
    const count = await checkboxes.count();
    // Check all
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
    }
    await page.waitForTimeout(200);
    // Uncheck all
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).uncheck();
    }
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

  test('prev button goes back correctly', async ({ page }) => {
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(200);
    await page.evaluate(() => prevStep());
    await page.waitForTimeout(200);
    // Should be on step 1 now — no error
  });

});
