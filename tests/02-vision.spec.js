const { test, expect } = require('@playwright/test');

test.describe('vision.html — Visión y EstrategIA', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO & HEAD ──────────────────────────────────────

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Visión.*MetodologIA/);
  });

  test('has all SEO meta tags', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
    await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /vision/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  });

  test('has JSON-LD structured data', async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    expect(count).toBeGreaterThanOrEqual(1);
    const content = await jsonLd.first().textContent();
    const parsed = JSON.parse(content);
    expect(parsed['@type']).toBeTruthy();
  });

  // ── LAYOUT & RENDER ──────────────────────────────────

  test('no JS errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });

  test('no 404 resources', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon') && !resp.url().includes('noise.svg')) {
        failed.push(resp.url());
      }
    });
    await page.goto('/vision.html');
    await page.waitForLoadState('networkidle');
    expect(failed).toHaveLength(0);
  });

  test('SiteHeader and SiteFooter render', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  test('html lang is "es"', async ({ page }) => {
    expect(await page.locator('html').getAttribute('lang')).toBe('es');
  });

  // ── HERO SECTION ──────────────────────────────────────

  test('hero H1 contains Método + TecnologIA', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toContainText('Método');
    await expect(h1).toContainText('Soberanía');
  });

  test('hero CTA "Explorar el Sistema" links to #problema', async ({ page }) => {
    const cta = page.locator('a[href="#problema"]').first();
    await expect(cta).toBeVisible();
    await expect(cta).toContainText('Explorar el Sistema');
  });

  test('anchor #problema scrolls to section', async ({ page }) => {
    await page.click('a[href="#problema"]');
    await page.waitForTimeout(1000);
    const section = page.locator('#problema');
    await expect(section).toBeInViewport();
  });

  // ── BREADCRUMB ────────────────────────────────────────

  test('breadcrumb shows Inicio > Visión', async ({ page }) => {
    const breadcrumb = page.locator('.breadcrumb-nav, nav.breadcrumb-nav');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText('Inicio');
    await expect(breadcrumb).toContainText('Visión');
  });

  test('breadcrumb Inicio links to index.html', async ({ page }) => {
    const link = page.locator('.breadcrumb-nav a[href="index.html"]');
    await expect(link).toHaveCount(1);
  });

  // ── STAIRCASE VISUAL ─────────────────────────────────

  test('staircase has 4 phases (FUNDAMENTAR, ACELERAR, CATALIZAR, AMPLIFICAR)', async ({ page }) => {
    const steps = page.locator('.staircase-step');
    await expect(steps).toHaveCount(4);
    const text = await page.locator('.staircase').textContent();
    expect(text).toContain('FUNDAMENTAR');
    expect(text).toContain('ACELERAR');
    expect(text).toContain('CATALIZAR');
    expect(text).toContain('AMPLIFICAR');
  });

  // ── PROBLEM CARDS (4 modals) ──────────────────────────

  test('4 problem cards are visible', async ({ page }) => {
    await page.locator('#problema').scrollIntoViewIfNeeded();
    const cards = page.locator('#problema button[onclick^="openModal"]');
    await expect(cards).toHaveCount(4);
  });

  test.describe('Problem modal: desorden', () => {
    test('opens and shows content', async ({ page }) => {
      await page.click('button[onclick="openModal(\'desorden\')"]');
      await page.waitForTimeout(500);
      const modal = page.locator('#info-modal');
      await expect(modal).toHaveClass(/active/);
      const content = page.locator('#modal-content');
      await expect(content).toContainText('Estar ocupado no es ser productivo');
      await expect(content).toContainText('Antídoto MetodologIA');
    });

    test('closes with X button', async ({ page }) => {
      await page.click('button[onclick="openModal(\'desorden\')"]');
      await page.waitForTimeout(300);
      await page.click('#info-modal button[onclick="closeModal()"]');
      await page.waitForTimeout(300);
      const modal = page.locator('#info-modal');
      const classes = await modal.getAttribute('class');
      expect(classes).not.toContain('active');
    });

    test('closes when clicking overlay', async ({ page }) => {
      await page.click('button[onclick="openModal(\'desorden\')"]');
      await page.waitForTimeout(300);
      // Click on the overlay (outside modal-content)
      await page.locator('#info-modal').click({ position: { x: 10, y: 10 } });
      await page.waitForTimeout(300);
      const classes = await page.locator('#info-modal').getAttribute('class');
      expect(classes).not.toContain('active');
    });
  });

  test('problem modal: repetitivo opens correctly', async ({ page }) => {
    await page.click('button[onclick="openModal(\'repetitivo\')"]');
    await page.waitForTimeout(300);
    await expect(page.locator('#modal-content')).toContainText('tareas baratas');
  });

  test('problem modal: fragmentado opens correctly', async ({ page }) => {
    await page.click('button[onclick="openModal(\'fragmentado\')"]');
    await page.waitForTimeout(300);
    await expect(page.locator('#modal-content')).toContainText('negocio se detiene');
  });

  test('problem modal: sinmetodo opens correctly', async ({ page }) => {
    await page.click('button[onclick="openModal(\'sinmetodo\')"]');
    await page.waitForTimeout(300);
    await expect(page.locator('#modal-content')).toContainText('tecnología no arregla');
  });

  // ── PIVOTE CARDS (6 modals: P, I, V, O, T, E) ───────

  test('6 PIVOTE cards are visible', async ({ page }) => {
    await page.locator('#solucion').scrollIntoViewIfNeeded();
    const cards = page.locator('#solucion button[onclick^="openModal"]');
    await expect(cards).toHaveCount(6);
  });

  const pivoteKeys = [
    { key: 'P', expectedText: 'Personas' },
    { key: 'I', expectedText: 'Interacciones' },
    { key: 'V', expectedText: 'Valor' },
    { key: 'O', expectedText: 'Organización' },
    { key: 'T', expectedText: 'Tecnología' },
    { key: 'E', expectedText: 'Evolución' },
  ];

  for (const { key, expectedText } of pivoteKeys) {
    test(`PIVOTE modal "${key}" opens and shows "${expectedText}"`, async ({ page }) => {
      await page.click(`button[onclick="openModal('${key}')"]`);
      await page.waitForTimeout(400);
      const modal = page.locator('#info-modal');
      await expect(modal).toHaveClass(/active/);
      await expect(page.locator('#modal-content')).toContainText(expectedText);
      // Close
      await page.click('#info-modal button[onclick="closeModal()"]');
      await page.waitForTimeout(200);
    });
  }

  // ── SECTION NAVIGATION ────────────────────────────────

  test('section #trampa exists and is navigable', async ({ page }) => {
    const section = page.locator('#trampa');
    await expect(section).toHaveCount(1);
    await page.click('a[href="#trampa"]');
    await page.waitForTimeout(1000);
    await expect(section).toBeInViewport();
  });

  test('section #solucion exists and is navigable', async ({ page }) => {
    const section = page.locator('#solucion');
    await expect(section).toHaveCount(1);
    await page.click('a[href="#solucion"]');
    await page.waitForTimeout(1000);
    await expect(section).toBeInViewport();
  });

  // ── RESULTADO SECTION CTAs ────────────────────────────

  test('resultado section has "Ver La Ruta" CTA', async ({ page }) => {
    const cta = page.locator('a[href="ruta/index.html"]');
    await expect(cta).toBeVisible();
  });

  test('resultado "Ver La Ruta" navigates correctly', async ({ page }) => {
    await page.click('a[href="ruta/index.html"]');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('ruta/');
  });

  test('resultado section has "Explorar Servicios" CTA', async ({ page }) => {
    const cta = page.locator('a[href="servicios/index.html"]');
    await expect(cta).toBeVisible();
  });

  // ── ADVERSARIAL ───────────────────────────────────────

  test('rapid modal open/close does not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    // Rapidly open and close different modals
    for (const key of ['desorden', 'repetitivo', 'P', 'V', 'T']) {
      await page.evaluate(k => openModal(k), key);
      await page.waitForTimeout(50);
      await page.evaluate(() => closeModal());
      await page.waitForTimeout(50);
    }
    expect(errors).toHaveLength(0);
  });

  test('opening modal with invalid key does not crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.evaluate(() => openModal('nonexistent'));
    await page.waitForTimeout(200);
    expect(errors).toHaveLength(0);
  });

  test('double-clicking problem card does not break modal', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const card = page.locator('button[onclick="openModal(\'desorden\')"]');
    await card.dblclick();
    await page.waitForTimeout(300);
    expect(errors).toHaveLength(0);
    // Modal should still be in a usable state
    await expect(page.locator('#info-modal')).toHaveClass(/active/);
  });

  test('no horizontal overflow at any viewport', async ({ page }) => {
    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(200);
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasOverflow, `Horizontal overflow at ${width}px`).toBeFalsy();
    }
  });

  test('modal works at mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    await page.evaluate(() => openModal('desorden'));
    await page.waitForTimeout(400);
    await expect(page.locator('#info-modal')).toHaveClass(/active/);
    await expect(page.locator('#modal-content')).toContainText('Estar ocupado');
  });

});
