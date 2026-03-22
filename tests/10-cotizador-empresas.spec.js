const { test, expect } = require('@playwright/test');

test.describe('ruta/cotizador-empresas.html — Cotizador Empresas', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/ruta/cotizador-empresas.html');
    await page.waitForLoadState('networkidle');
  });

  // ── 1. SEO ─────────────────────────────────────────────

  test('SEO: robots meta allows indexing', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
  });

  test('SEO: description meta is present and meaningful', async ({ page }) => {
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
  });

  test('SEO: canonical URL points to cotizador-empresas', async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /cotizador-empresas/);
  });

  // ── 2. NO JS ERRORS / NO 404s ─────────────────────────

  test('no JS errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/ruta/cotizador-empresas.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) failed.push(resp.url());
    });
    await page.goto('/ruta/cotizador-empresas.html');
    await page.waitForLoadState('networkidle');
    if (failed.length > 0) console.log('404s:', failed);
    expect(failed).toHaveLength(0);
  });

  // ── 3. SITEHEADER / SITEFOOTER ────────────────────────

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── 4. STEP NAVIGATION (0→5 and backwards) ────────────

  test('step 0 (consent/context) is visible by default', async ({ page }) => {
    const step0 = page.locator('#step-0');
    await expect(step0).toBeVisible();
  });

  test('step node buttons exist for all 6 steps (0-5)', async ({ page }) => {
    // Desktop stepper has .step-node buttons with data-step 0-5
    const nodes = page.locator('.step-node[data-step]');
    expect(await nodes.count()).toBe(6);
  });

  test('can navigate forward from step 0 to step 1', async ({ page }) => {
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);
    await expect(page.locator('#step-1')).toBeVisible();
    await expect(page.locator('#step-0')).toBeHidden();
  });

  test('can navigate backward with prevStep', async ({ page }) => {
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(200);
    await page.evaluate(() => prevStep());
    await page.waitForTimeout(200);
    await expect(page.locator('#step-1')).toBeVisible();
  });

  test('nextStep advances from step 2 to step 3', async ({ page }) => {
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(200);
    await page.evaluate(() => nextStep());
    await page.waitForTimeout(200);
    await expect(page.locator('#step-3')).toBeVisible();
  });

  // ── 5. STEP 1: headcount, payroll, revenue, range sliders ──

  test('step 1 has headcount, payroll, revenue, and horas-estudio inputs', async ({ page }) => {
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);
    await expect(page.locator('#headcount')).toBeVisible();
    await expect(page.locator('#payroll')).toBeVisible();
    await expect(page.locator('#revenue')).toBeVisible();
    await expect(page.locator('#horas-estudio')).toBeVisible();
  });

  test('headcount input accepts numeric value', async ({ page }) => {
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);
    await page.locator('#headcount').fill('25');
    expect(await page.locator('#headcount').inputValue()).toBe('25');
  });

  test('horas-estudio range slider updates display', async ({ page }) => {
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);
    await page.locator('#horas-estudio').fill('12');
    await page.locator('#horas-estudio').dispatchEvent('input');
    await page.waitForTimeout(200);
    const display = page.locator('#estudio-display');
    await expect(display).toContainText('12h');
  });

  test('revenue input accepts and formats currency', async ({ page }) => {
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);
    const input = page.locator('#revenue');
    await input.fill('');
    await input.type('200000000');
    await input.dispatchEvent('input');
    await page.waitForTimeout(200);
    const val = await input.inputValue();
    // Should be formatted with dots (es-CO locale) or at least contain digits
    expect(val.replace(/[^0-9]/g, '')).toContain('200000000');
  });

  // ── 6. STEP 2: task distribution sliders ───────────────

  test('step 2 has three task distribution sliders', async ({ page }) => {
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(300);
    await expect(page.locator('#tareas-simples')).toBeVisible();
    await expect(page.locator('#tareas-medias')).toBeVisible();
    await expect(page.locator('#tareas-altas')).toBeVisible();
  });

  test('task distribution: total 100% shows green validation', async ({ page }) => {
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(300);
    // Default: 60 + 30 + 10 = 100
    const msg = page.locator('#validation-msg');
    await expect(msg).toContainText('100%');
  });

  test('task distribution: over 100% shows Sobran deviation', async ({ page }) => {
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(300);
    await page.locator('#tareas-simples').fill('60');
    await page.locator('#tareas-simples').dispatchEvent('input');
    await page.locator('#tareas-medias').fill('30');
    await page.locator('#tareas-medias').dispatchEvent('input');
    await page.locator('#tareas-altas').fill('20');
    await page.locator('#tareas-altas').dispatchEvent('input');
    await page.waitForTimeout(300);
    const msg = page.locator('#validation-msg');
    await expect(msg).toContainText('Sobran');
  });

  test('task distribution: under 100% shows Faltan deviation', async ({ page }) => {
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(300);
    await page.locator('#tareas-simples').fill('30');
    await page.locator('#tareas-simples').dispatchEvent('input');
    await page.locator('#tareas-medias').fill('20');
    await page.locator('#tareas-medias').dispatchEvent('input');
    await page.locator('#tareas-altas').fill('10');
    await page.locator('#tareas-altas').dispatchEvent('input');
    await page.waitForTimeout(300);
    const msg = page.locator('#validation-msg');
    await expect(msg).toContainText('Faltan');
  });

  test('task distribution: progress bar visible in validation area after slider interaction', async ({ page }) => {
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(300);
    // Trigger updateTareasDistribucion by moving a slider
    await page.locator('#tareas-simples').fill('60');
    await page.locator('#tareas-simples').dispatchEvent('input');
    await page.waitForTimeout(300);
    // After the JS updates, the validation-msg should contain a progress bar
    const bar = page.locator('#validation-msg .h-full');
    expect(await bar.count()).toBeGreaterThanOrEqual(1);
  });

  test('next button disabled when total != 100%', async ({ page }) => {
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(300);
    await page.locator('#tareas-simples').fill('50');
    await page.locator('#tareas-simples').dispatchEvent('input');
    await page.locator('#tareas-medias').fill('50');
    await page.locator('#tareas-medias').dispatchEvent('input');
    await page.locator('#tareas-altas').fill('50');
    await page.locator('#tareas-altas').dispatchEvent('input');
    await page.waitForTimeout(300);
    const nextBtn = page.locator('#step-2 button[onclick*="nextStep"]');
    const isDisabled = await nextBtn.evaluate(el => el.disabled);
    expect(isDisabled).toBeTruthy();
  });

  // ── 7. STEP 3: program checkboxes ─────────────────────

  test('step 3 has program checkboxes (.level-checkbox)', async ({ page }) => {
    await page.evaluate(() => goToStep(3));
    await page.waitForTimeout(300);
    const checkboxes = page.locator('.level-checkbox');
    expect(await checkboxes.count()).toBeGreaterThanOrEqual(5);
  });

  test('checking a program checkbox updates its state', async ({ page }) => {
    await page.evaluate(() => goToStep(3));
    await page.waitForTimeout(300);
    const first = page.locator('.level-checkbox').first();
    await first.check();
    await page.waitForTimeout(100);
    expect(await first.isChecked()).toBeTruthy();
  });

  test('toggle all checkboxes on then off without errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => goToStep(3));
    await page.waitForTimeout(300);
    const checkboxes = page.locator('.level-checkbox');
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
    }
    await page.waitForTimeout(200);
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).uncheck();
    }
    await page.waitForTimeout(200);
    expect(errors).toHaveLength(0);
  });

  // ── 8. STEP 4: results display + methodology modal ────

  test('step 4 shows ROI result cards', async ({ page }) => {
    // Select at least one program first for meaningful results
    await page.evaluate(() => goToStep(3));
    await page.waitForTimeout(200);
    await page.locator('.level-checkbox').first().check();
    await page.evaluate(() => goToStep(4));
    await page.waitForTimeout(400);
    await expect(page.locator('#result-horas')).toBeVisible();
    await expect(page.locator('#result-mejora')).toBeVisible();
    await expect(page.locator('#result-inversion')).toBeVisible();
  });

  test('methodology modal opens and closes without errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => goToStep(4));
    await page.waitForTimeout(300);
    await page.evaluate(() => openMethodologyModal());
    await page.waitForTimeout(400);
    const modal = page.locator('#methodology-modal');
    // After opening, the modal should not have pointer-events-none
    const hasPointerNone = await modal.evaluate(el => el.classList.contains('pointer-events-none'));
    expect(hasPointerNone).toBeFalsy();
    await page.evaluate(() => closeMethodologyModal());
    await page.waitForTimeout(300);
    expect(errors).toHaveLength(0);
  });

  // ── 9. STEP 5: calendar + email CTAs ───────────────────

  test('step 5 has calendar CTA link', async ({ page }) => {
    await page.evaluate(() => goToStep(5));
    await page.waitForTimeout(300);
    const calLink = page.locator('a[href*="calendar.app.google"]');
    expect(await calLink.count()).toBeGreaterThanOrEqual(1);
  });

  test('step 5 has mailto CTA (#mailto-cta)', async ({ page }) => {
    await page.evaluate(() => goToStep(5));
    await page.waitForTimeout(300);
    const mailCta = page.locator('#mailto-cta');
    await expect(mailCta).toBeVisible();
  });

  test('step 5 has final-company and final-role inputs', async ({ page }) => {
    await page.evaluate(() => goToStep(5));
    await page.waitForTimeout(300);
    await expect(page.locator('#final-company')).toBeVisible();
    await expect(page.locator('#final-role')).toBeVisible();
  });

  // ── 10. COMPLETE HAPPY PATH (step 0→5) ─────────────────

  test('complete happy path: step 0 through 5 without JS errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));

    // Step 0 → 1
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);

    // Step 1: fill B2B org data
    await page.locator('#headcount').fill('20');
    await page.locator('#revenue').fill('');
    await page.locator('#revenue').type('300000000');
    await page.locator('#revenue').dispatchEvent('input');
    await page.locator('#payroll').fill('');
    await page.locator('#payroll').type('80000000');
    await page.locator('#payroll').dispatchEvent('input');
    await page.locator('#horas-estudio').fill('10');
    await page.locator('#horas-estudio').dispatchEvent('input');
    await page.waitForTimeout(200);

    // Step 1 → 2
    await page.evaluate(() => goToStep(2));
    await page.waitForTimeout(300);

    // Step 2: verify default is 100% (60+30+10)
    const msg = page.locator('#validation-msg');
    await expect(msg).toContainText('100%');

    // Step 2 → 3
    await page.evaluate(() => goToStep(3));
    await page.waitForTimeout(300);

    // Step 3: select a couple of programs
    await page.locator('.level-checkbox').nth(0).check();
    await page.locator('.level-checkbox').nth(2).check();
    await page.waitForTimeout(100);

    // Step 3 → 4
    await page.evaluate(() => goToStep(4));
    await page.waitForTimeout(400);
    await expect(page.locator('#result-horas')).toBeVisible();

    // Step 4 → 5
    await page.evaluate(() => goToStep(5));
    await page.waitForTimeout(300);
    await expect(page.locator('#mailto-cta')).toBeVisible();

    expect(errors).toHaveLength(0);
  });

  // ── 11. ADVERSARIAL TESTS ──────────────────────────────

  test('rapid step jumping (0→5→0) does not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (let i = 0; i <= 5; i++) {
      await page.evaluate(s => goToStep(s), i);
      await page.waitForTimeout(50);
    }
    for (let i = 5; i >= 0; i--) {
      await page.evaluate(s => goToStep(s), i);
      await page.waitForTimeout(50);
    }
    expect(errors).toHaveLength(0);
  });

  test('extreme headcount values do not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(200);
    await page.locator('#headcount').fill('1');
    await page.locator('#headcount').dispatchEvent('input');
    await page.locator('#headcount').fill('99999');
    await page.locator('#headcount').dispatchEvent('input');
    await page.locator('#headcount').fill('0');
    await page.locator('#headcount').dispatchEvent('input');
    await page.waitForTimeout(200);
    expect(errors).toHaveLength(0);
  });

  test('extreme revenue/payroll values do not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(200);
    await page.locator('#revenue').fill('');
    await page.locator('#revenue').type('999999999999');
    await page.locator('#revenue').dispatchEvent('input');
    await page.locator('#payroll').fill('');
    await page.locator('#payroll').type('0');
    await page.locator('#payroll').dispatchEvent('input');
    await page.waitForTimeout(200);
    // Navigate to step 4 to trigger ROI calculation with extreme values
    await page.evaluate(() => goToStep(4));
    await page.waitForTimeout(300);
    expect(errors).toHaveLength(0);
  });

  test('all checkboxes checked then calculate ROI does not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => goToStep(3));
    await page.waitForTimeout(300);
    const checkboxes = page.locator('.level-checkbox');
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
    }
    await page.evaluate(() => goToStep(4));
    await page.waitForTimeout(400);
    // result-mejora should show a non-zero improvement
    const mejora = await page.locator('#result-mejora').textContent();
    expect(mejora).not.toBe('0%');
    expect(errors).toHaveLength(0);
  });

  test('no horizontal overflow at common viewport widths', async ({ page }) => {
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(200);
      const hasOverflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasOverflow, `Overflow at ${width}px`).toBeFalsy();
    }
  });

  // ── 12. MODO FOUNDER / STARTUP MODAL ───────────────────

  test('selecting Emergente radio shows startup modal', async ({ page }) => {
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);
    // Click the "Emergente" (startup) radio
    await page.locator('input[name="company_age"][value="startup"]').check({ force: true });
    await page.evaluate(() => checkCompanyAge());
    await page.waitForTimeout(300);
    const modal = page.locator('#startup-modal');
    const isHidden = await modal.evaluate(el => el.classList.contains('hidden'));
    expect(isHidden).toBeFalsy();
  });

  test('closing startup modal works', async ({ page }) => {
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);
    await page.locator('input[name="company_age"][value="startup"]').check({ force: true });
    await page.evaluate(() => checkCompanyAge());
    await page.waitForTimeout(300);
    await page.evaluate(() => closeStartupModal());
    await page.waitForTimeout(200);
    const modal = page.locator('#startup-modal');
    const isHidden = await modal.evaluate(el => el.classList.contains('hidden'));
    expect(isHidden).toBeTruthy();
  });

  test('SME alert shows for startup with headcount < 10', async ({ page }) => {
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);
    // Set startup + low headcount
    await page.locator('input[name="company_age"][value="startup"]').check({ force: true });
    await page.locator('#headcount').fill('5');
    await page.locator('#headcount').dispatchEvent('input');
    await page.evaluate(() => checkSMEContext());
    await page.waitForTimeout(300);
    const alert = page.locator('#sme-alert');
    const isHidden = await alert.evaluate(el => el.classList.contains('hidden'));
    expect(isHidden).toBeFalsy();
  });

  test('SME alert hidden for scaleup or headcount >= 10', async ({ page }) => {
    await page.evaluate(() => goToStep(1));
    await page.waitForTimeout(300);
    // Default is scaleup with headcount=15
    await page.evaluate(() => checkSMEContext());
    await page.waitForTimeout(200);
    const alert = page.locator('#sme-alert');
    const isHidden = await alert.evaluate(el => el.classList.contains('hidden'));
    expect(isHidden).toBeTruthy();
  });

});
