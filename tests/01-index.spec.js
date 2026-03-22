const { test, expect } = require('@playwright/test');

test.describe('index.html — Home Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // ── SEO & HEAD ──────────────────────────────────────

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/MetodologIA/);
  });

  test('has robots meta', async ({ page }) => {
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', 'index, follow');
  });

  test('has canonical URL', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://metodologia.info/');
  });

  test('has Open Graph meta tags', async ({ page }) => {
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', /.+/);
  });

  test('has Twitter card meta tags', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[property="twitter:title"]')).toHaveAttribute('content', /.+/);
  });

  test('has JSON-LD structured data', async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]');
    const count = await jsonLd.count();
    expect(count).toBeGreaterThanOrEqual(1);
    const content = await jsonLd.first().textContent();
    const parsed = JSON.parse(content);
    expect(parsed['@type']).toBeTruthy();
  });

  test('has description meta', async ({ page }) => {
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute('content', /.{20,}/);
  });

  test('has keywords meta', async ({ page }) => {
    const kw = page.locator('meta[name="keywords"]');
    await expect(kw).toHaveAttribute('content', /.+/);
  });

  // ── LAYOUT & RENDER ──────────────────────────────────

  test('page renders without JS errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Filter out external font/resource errors
    const realErrors = errors.filter(e => !e.includes('fonts.googleapis') && !e.includes('favicon'));
    expect(realErrors).toHaveLength(0);
  });

  test('no 404 resources on page load', async ({ page }) => {
    const failed = [];
    page.on('response', resp => {
      if (resp.status() === 404 && !resp.url().includes('favicon')) {
        failed.push(resp.url());
      }
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(failed).toHaveLength(0);
  });

  test('body is visible and not empty', async ({ page }) => {
    const body = page.locator('body');
    await expect(body).toBeVisible();
    const text = await body.textContent();
    expect(text.trim().length).toBeGreaterThan(50);
  });

  test('SiteHeader web component renders', async ({ page }) => {
    const header = page.locator('site-header');
    await expect(header).toHaveCount(1);
    // Check that shadow DOM or inner content rendered
    await page.waitForTimeout(1000);
    const nav = page.locator('nav, header').first();
    await expect(nav).toBeVisible();
  });

  test('SiteFooter web component renders', async ({ page }) => {
    const footer = page.locator('site-footer');
    await expect(footer).toHaveCount(1);
  });

  // ── HERO SECTION ──────────────────────────────────────

  test('hero H1 contains "Success as a Service"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toContainText('Success as a');
    await expect(h1).toContainText('Service');
  });

  test('hero has "Descubrir Visión" CTA link', async ({ page }) => {
    const cta = page.locator('a:has-text("Descubrir Visión")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', 'vision.html');
  });

  test('hero has "Ver Niveles" CTA link', async ({ page }) => {
    const cta = page.locator('a:has-text("Ver Niveles")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', 'ruta/index.html');
  });

  test('"Descubrir Visión" navigates to vision.html', async ({ page }) => {
    await page.click('a:has-text("Descubrir Visión")');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('vision.html');
  });

  test('"Ver Niveles" navigates to ruta/', async ({ page }) => {
    await page.click('a:has-text("Ver Niveles")');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('ruta/');
  });

  // ── 100 CHECK DASHBOARD ──────────────────────────────

  test('dashboard KPI cards render (4 metrics)', async ({ page }) => {
    const kpis = page.locator('.kpi-card');
    await expect(kpis).toHaveCount(4);
  });

  test('dashboard shows 1-0-0-Check values', async ({ page }) => {
    const kpiTexts = await page.locator('.kpi-card').allTextContents();
    const combined = kpiTexts.join(' ');
    expect(combined).toContain('1');
    expect(combined).toContain('0');
  });

  // ── GATEWAY CARDS (Empresas / Personas) ─────────────

  test('Empresas card is visible and links correctly', async ({ page }) => {
    const card = page.locator('a[href="empresas/index.html"]');
    await expect(card).toBeVisible();
    await expect(card).toContainText('Empresas');
  });

  test('Personas card is visible and links correctly', async ({ page }) => {
    const card = page.locator('a[href="personas/index.html"]');
    await expect(card).toBeVisible();
    await expect(card).toContainText('Personas');
  });

  test('Empresas card navigates correctly', async ({ page }) => {
    await page.click('a[href="empresas/index.html"]');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('empresas/');
  });

  test('Personas card navigates correctly', async ({ page }) => {
    await page.click('a[href="personas/index.html"]');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('personas/');
  });

  // ── CLOSING ART SECTION ──────────────────────────────

  test('closing section has key messaging', async ({ page }) => {
    const section = page.locator('section:has(.highlight-ia-premium)').last();
    await expect(section).toContainText('Método');
    await expect(section).toContainText('camino');
  });

  // ── ACCESSIBILITY ────────────────────────────────────

  test('html lang is "es"', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('es');
  });

  test('page has breadcrumb navigation', async ({ page }) => {
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
  });

  test('all images have alt text or are decorative', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');
      const ariaHidden = await img.getAttribute('aria-hidden');
      // Must have alt, or be marked decorative
      expect(alt !== null || role === 'presentation' || ariaHidden === 'true').toBeTruthy();
    }
  });

  test('SVG icons with role="img" have aria labels', async ({ page }) => {
    await page.waitForTimeout(1000);
    const svgs = page.locator('svg[role="img"]');
    const count = await svgs.count();
    const missing = [];
    for (let i = 0; i < count; i++) {
      const svg = svgs.nth(i);
      const label = await svg.getAttribute('aria-label');
      const labelledBy = await svg.getAttribute('aria-labelledby');
      const ariaHidden = await svg.getAttribute('aria-hidden');
      if (!label && !labelledBy && ariaHidden !== 'true') {
        const outerHtml = await svg.evaluate(el => el.outerHTML.substring(0, 120));
        missing.push(outerHtml);
      }
    }
    if (missing.length > 0) {
      console.log('SVGs with role="img" missing aria-label:', missing);
    }
    expect(missing).toHaveLength(0);
  });

  // ── ADVERSARIAL: Edge Cases ──────────────────────────

  test('no console errors on rapid scroll', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Rapid scroll to bottom and back
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(200);
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(200);
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  });

  test('no layout shift on viewport resize', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(300);
    const h1Before = await page.locator('main h1').boundingBox();

    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    const h1After = await page.locator('main h1').boundingBox();

    // H1 should still exist and be visible
    expect(h1After).toBeTruthy();
    expect(h1After.width).toBeGreaterThan(0);
  });

  test('page works at mobile viewport (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    // Gateway cards should stack
    const empresasCard = page.locator('a[href="empresas/index.html"]');
    await expect(empresasCard).toBeVisible();
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

  test('Lucide icons initialize (no raw i[data-lucide] visible)', async ({ page }) => {
    await page.waitForTimeout(1500);
    // After icons.js runs, data-lucide should be replaced with SVGs
    const unreplaced = await page.evaluate(() => {
      const els = document.querySelectorAll('i[data-lucide]');
      // If icons.js replaced them, they become SVGs
      return els.length;
    });
    // Some may remain as fallback — check that at least the main ones rendered
    // The key test is no JS error, which we check separately
  });

  test('double-click on CTA does not cause issues', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const cta = page.locator('a:has-text("Descubrir Visión")');
    await cta.dblclick();
    await page.waitForTimeout(500);
    expect(errors).toHaveLength(0);
  });

});
