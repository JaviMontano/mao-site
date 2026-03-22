const { test, expect } = require('@playwright/test');

/* ═══════════════════════════════════════════════════════════════════
   12-legal-sitemap.spec.js — Adversarial tests for legal pages & sitemap
   ═══════════════════════════════════════════════════════════════════ */

const BASE = 'http://localhost:8765';

const VIEWPORTS = [320, 375, 768, 1024, 1440];

// ─── Helper: collect JS errors and 404s during navigation ───────
async function gotoCollecting(page, url) {
  const jsErrors = [];
  const failed404 = [];
  page.on('pageerror', e => jsErrors.push(e.message));
  page.on('response', resp => {
    const u = resp.url();
    if (
      resp.status() === 404 &&
      !u.includes('favicon') &&
      !u.includes('fonts.googleapis') &&
      !u.includes('fonts.gstatic') &&
      !u.includes('cdn') &&
      !u.includes('cdnjs')
    ) {
      failed404.push(u);
    }
  });
  await page.goto(url, { waitUntil: 'networkidle' });
  return { jsErrors, failed404 };
}

// ═══════════════════════════════════════════════════════════════════
//  LEGAL: Política de Privacidad
// ═══════════════════════════════════════════════════════════════════

test.describe('Legal — Privacidad (legal/privacidad.html)', () => {
  const URL = `${BASE}/legal/privacidad.html`;

  test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
  });

  // ── SEO ───────────────────────────────────────────────────
  test('has robots meta with index', async ({ page }) => {
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /index/);
  });

  test('has description meta (>=20 chars)', async ({ page }) => {
    const desc = page.locator('meta[name="description"]');
    const content = await desc.getAttribute('content');
    expect(content.length).toBeGreaterThanOrEqual(20);
  });

  test('has canonical link', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /privacidad/);
  });

  // ── No JS errors ──────────────────────────────────────────
  test('no JS errors on load', async ({ page }) => {
    const { jsErrors } = await gotoCollecting(page, URL);
    const real = jsErrors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(real).toHaveLength(0);
  });

  // ── No 404 resources ──────────────────────────────────────
  test('no 404 resources (excluding favicon)', async ({ page }) => {
    const { failed404 } = await gotoCollecting(page, URL);
    expect(failed404).toHaveLength(0);
  });

  // ── Components render ─────────────────────────────────────
  test('SiteHeader renders', async ({ page }) => {
    const header = page.locator('site-header');
    await expect(header).toBeAttached();
    const nav = page.locator('site-header nav, header nav, nav');
    await expect(nav.first()).toBeVisible();
  });

  test('SiteFooter renders', async ({ page }) => {
    const footer = page.locator('site-footer');
    await expect(footer).toBeAttached();
  });

  // ── Content ───────────────────────────────────────────────
  test('h1 contains "Privacidad"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toContainText(/Privacidad/i);
  });

  test('legal content has substantial text (>500 chars)', async ({ page }) => {
    const mainText = await page.locator('main').innerText();
    expect(mainText.length).toBeGreaterThan(500);
  });

  test('contains contact/email reference', async ({ page }) => {
    const body = await page.locator('main').innerHTML();
    expect(body).toMatch(/contacto@metodologia\.info/i);
  });

  test('has accordion sections with legal headings', async ({ page }) => {
    const accordionBtns = page.locator('.accordion-btn');
    const count = await accordionBtns.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  // ── Breadcrumb link to home ───────────────────────────────
  test('breadcrumb links back to home', async ({ page }) => {
    const homeLink = page.locator('.breadcrumb-nav a[href*="index.html"], .breadcrumb-list a[href*="index.html"]');
    await expect(homeLink.first()).toBeVisible();
    const href = await homeLink.first().getAttribute('href');
    expect(href).toContain('index.html');
  });

  // ── Horizontal overflow ───────────────────────────────────
  for (const width of VIEWPORTS) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(URL, { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(overflow).toBe(false);
    });
  }
});

// ═══════════════════════════════════════════════════════════════════
//  LEGAL: Términos y Condiciones
// ═══════════════════════════════════════════════════════════════════

test.describe('Legal — Términos (legal/terminos.html)', () => {
  const URL = `${BASE}/legal/terminos.html`;

  test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
  });

  // ── SEO ───────────────────────────────────────────────────
  test('has robots meta with index', async ({ page }) => {
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /index/);
  });

  test('has description meta (>=20 chars)', async ({ page }) => {
    const desc = page.locator('meta[name="description"]');
    const content = await desc.getAttribute('content');
    expect(content.length).toBeGreaterThanOrEqual(20);
  });

  test('has canonical link', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /terminos/);
  });

  // ── No JS errors ──────────────────────────────────────────
  test('no JS errors on load', async ({ page }) => {
    const { jsErrors } = await gotoCollecting(page, URL);
    const real = jsErrors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(real).toHaveLength(0);
  });

  // ── No 404 resources ──────────────────────────────────────
  test('no 404 resources (excluding favicon)', async ({ page }) => {
    const { failed404 } = await gotoCollecting(page, URL);
    expect(failed404).toHaveLength(0);
  });

  // ── Components render ─────────────────────────────────────
  test('SiteHeader renders', async ({ page }) => {
    const header = page.locator('site-header');
    await expect(header).toBeAttached();
    const nav = page.locator('site-header nav, header nav, nav');
    await expect(nav.first()).toBeVisible();
  });

  test('SiteFooter renders', async ({ page }) => {
    const footer = page.locator('site-footer');
    await expect(footer).toBeAttached();
  });

  // ── Content ───────────────────────────────────────────────
  test('h1 contains "Términos" or "Condiciones"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toContainText(/T(é|e)rminos|Condiciones/i);
  });

  test('legal content has substantial text (>500 chars)', async ({ page }) => {
    const mainText = await page.locator('main').innerText();
    expect(mainText.length).toBeGreaterThan(500);
  });

  test('contains contact/email reference', async ({ page }) => {
    const body = await page.locator('main').innerHTML();
    expect(body).toMatch(/contacto@metodologia\.info/i);
  });

  test('has accordion sections with legal content', async ({ page }) => {
    const accordionBtns = page.locator('.accordion-btn');
    const count = await accordionBtns.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  // ── Breadcrumb link to home ───────────────────────────────
  test('breadcrumb links back to home', async ({ page }) => {
    const homeLink = page.locator('.breadcrumb-nav a[href*="index.html"], .breadcrumb-list a[href*="index.html"]');
    await expect(homeLink.first()).toBeVisible();
    const href = await homeLink.first().getAttribute('href');
    expect(href).toContain('index.html');
  });

  // ── Horizontal overflow ───────────────────────────────────
  for (const width of VIEWPORTS) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(URL, { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(overflow).toBe(false);
    });
  }
});

// ═══════════════════════════════════════════════════════════════════
//  SITEMAP (sitemap.html)
// ═══════════════════════════════════════════════════════════════════

test.describe('Sitemap (sitemap.html)', () => {
  const URL = `${BASE}/sitemap.html`;

  test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
  });

  // ── SEO ───────────────────────────────────────────────────
  test('has robots meta with index', async ({ page }) => {
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /index/);
  });

  test('has description meta (>=20 chars)', async ({ page }) => {
    const desc = page.locator('meta[name="description"]');
    const content = await desc.getAttribute('content');
    expect(content.length).toBeGreaterThanOrEqual(20);
  });

  test('has canonical link', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /sitemap/);
  });

  // ── No JS errors ──────────────────────────────────────────
  test('no JS errors on load', async ({ page }) => {
    const { jsErrors } = await gotoCollecting(page, URL);
    const real = jsErrors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(real).toHaveLength(0);
  });

  // ── No 404 resources ──────────────────────────────────────
  test('no 404 resources (excluding favicon)', async ({ page }) => {
    const { failed404 } = await gotoCollecting(page, URL);
    expect(failed404).toHaveLength(0);
  });

  // ── Components render ─────────────────────────────────────
  test('SiteHeader renders', async ({ page }) => {
    const header = page.locator('site-header');
    await expect(header).toBeAttached();
    const nav = page.locator('site-header nav, header nav, nav');
    await expect(nav.first()).toBeVisible();
  });

  test('SiteFooter renders', async ({ page }) => {
    const footer = page.locator('site-footer');
    await expect(footer).toBeAttached();
  });

  // ── Content ───────────────────────────────────────────────
  test('h1 is visible', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
  });

  test('has Content Hub heading', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toContainText(/Content|Hub|Sitemap/i);
  });

  // ── Links to main sections ────────────────────────────────
  const REQUIRED_SECTIONS = [
    { name: 'empresas', pattern: /empresas/ },
    { name: 'personas', pattern: /personas/ },
    { name: 'ruta', pattern: /ruta/ },
    { name: 'contacto', pattern: /contacto/ },
    { name: 'nosotros', pattern: /nosotros/ },
    { name: 'recursos', pattern: /recursos/ },
  ];

  for (const section of REQUIRED_SECTIONS) {
    test(`has link to ${section.name} section`, async ({ page }) => {
      const link = page.locator(`a[href*="${section.name}"]`);
      const count = await link.count();
      expect(count).toBeGreaterThan(0);
    });
  }

  // ── All sitemap links are internal (not external) ─────────
  test('all sitemap item links are internal', async ({ page }) => {
    const links = page.locator('.sitemap-item-node, .sitemap-item-mini');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    const externalLinks = [];
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        externalLinks.push(href);
      }
    }
    expect(externalLinks).toHaveLength(0);
  });

  // ── Breadcrumb link to home ───────────────────────────────
  test('breadcrumb links back to home', async ({ page }) => {
    const homeLink = page.locator('nav[aria-label] a[href*="index.html"], .breadcrumb-nav a[href*="index.html"]');
    await expect(homeLink.first()).toBeVisible();
  });

  // ── Search input exists ───────────────────────────────────
  test('has search input for filtering', async ({ page }) => {
    const search = page.locator('#neural-search');
    await expect(search).toBeVisible();
  });

  // ── Horizontal overflow ───────────────────────────────────
  for (const width of VIEWPORTS) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(URL, { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(overflow).toBe(false);
    });
  }
});
