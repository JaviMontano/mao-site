// @ts-check
import { test, expect } from '@playwright/test';

/**
 * E2E: Sitemap, Legacy Redirects, Nav & Footer [T053]
 *
 * 1. sitemap.xml — 12 URLs with hreflang es/en
 * 2. Legacy 301 redirects — 5 representative rules (server or JS fallback)
 * 3. Header nav — 3 items (Ruta, Servicios, Contacto)
 * 4. Footer — 12 page links
 *
 * Traceability: [TS-052, TS-053, TS-054, TS-055, TS-056, TS-057, TS-058, TS-059]
 */

// ---------------------------------------------------------------------------
// 1. sitemap.xml — 12 canonical URLs with hreflang
// ---------------------------------------------------------------------------

const SITEMAP_URLS = [
  'https://metodologia.info/',
  'https://metodologia.info/diagnostico/',
  'https://metodologia.info/empresas/',
  'https://metodologia.info/personas/',
  'https://metodologia.info/programas/',
  'https://metodologia.info/recursos/',
  'https://metodologia.info/metodo/',
  'https://metodologia.info/casos/',
  'https://metodologia.info/nosotros/',
  'https://metodologia.info/insights/',
  'https://metodologia.info/contacto/',
  'https://metodologia.info/legal/',
];

test.describe('Sitemap.xml Validation', () => {
  test('sitemap.xml exists and is valid XML', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.ok()).toBe(true);

    const body = await res.text();
    expect(body).toContain('<?xml');
    expect(body).toContain('<urlset');
    expect(body).toContain('http://www.sitemaps.org/schemas/sitemap/0.9');
  });

  test('sitemap.xml contains exactly 12 URLs', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    const body = await res.text();

    const locMatches = body.match(/<loc>/g);
    expect(locMatches).not.toBeNull();
    expect(locMatches.length).toBe(12);
  });

  test('sitemap.xml contains all 12 canonical URLs', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    const body = await res.text();

    for (const url of SITEMAP_URLS) {
      expect(body).toContain(url);
    }
  });

  test('sitemap.xml has hreflang es/en alternates for each URL', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    const body = await res.text();

    // Each URL block should have xhtml:link alternates for es and en
    expect(body).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');

    const esAlternates = body.match(/hreflang="es"/g);
    const enAlternates = body.match(/hreflang="en"/g);

    expect(esAlternates).not.toBeNull();
    expect(enAlternates).not.toBeNull();
    // Each of the 12 URLs has 1 es + 1 en alternate
    expect(esAlternates.length).toBe(12);
    expect(enAlternates.length).toBe(12);
  });

  test('sitemap.xml does not contain 404 page', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    const body = await res.text();

    expect(body).not.toContain('/404');
  });
});

// ---------------------------------------------------------------------------
// 2. Legacy 301 redirects — 5 representative rules
// ---------------------------------------------------------------------------

/**
 * These test 5 representative legacy redirects from the 17 defined in .htaccess.
 * On the local dev server (no Apache), legacy-router.js handles these as JS redirects.
 * On production (Hostinger), .htaccess returns HTTP 301.
 *
 * We test that navigating to the old URL ends up at the correct new URL.
 */
const LEGACY_REDIRECTS = [
  { from: '/vision.html', to: '/metodo/' },
  { from: '/ruta/', to: '/diagnostico/' },
  { from: '/servicios/', to: '/programas/' },
  { from: '/sitemap.html', to: '/' },
  { from: '/legal/privacidad.html', to: '/legal/' },
];

test.describe('Legacy Redirects', () => {
  for (const redirect of LEGACY_REDIRECTS) {
    test(`${redirect.from} → ${redirect.to}`, async ({ page }) => {
      const response = await page.goto(redirect.from, { waitUntil: 'networkidle' });

      // Accept either:
      // - HTTP 301/302 redirect (production .htaccess)
      // - JS redirect via legacy-router.js (local dev)
      const finalUrl = new URL(page.url());
      const expectedPath = redirect.to.replace(/#.*$/, ''); // strip anchor for comparison

      expect(finalUrl.pathname).toBe(expectedPath);
    });
  }
});

// ---------------------------------------------------------------------------
// 3. Header nav — 3 items
// ---------------------------------------------------------------------------

test.describe('Header Navigation — 3 Items', () => {
  test('header has exactly 3 nav links', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const navLinks = page.locator('site-header .site-header__links a, site-header nav[aria-label] ul a');
    const count = await navLinks.count();
    expect(count).toBe(3);
  });

  test('nav links are Ruta, Servicios, Contacto (ES)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const navLinks = page.locator('site-header .site-header__links a, site-header nav[aria-label] ul a');

    const texts = [];
    for (let i = 0; i < await navLinks.count(); i++) {
      const text = (await navLinks.nth(i).textContent()).trim();
      texts.push(text);
    }

    // ES labels: Ruta, Servicios, Contacto
    expect(texts).toEqual(['Ruta', 'Servicios', 'Contacto']);
  });

  test('nav links point to correct destinations', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const navLinks = page.locator('site-header .site-header__links a, site-header nav[aria-label] ul a');

    const hrefs = [];
    for (let i = 0; i < await navLinks.count(); i++) {
      const href = await navLinks.nth(i).getAttribute('href');
      hrefs.push(href);
    }

    expect(hrefs).toContain('/diagnostico/');
    expect(hrefs).toContain('/programas/');
    expect(hrefs).toContain('/contacto/');
  });

  test('gold CTA button is the first nav item', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const goldCta = page.locator('site-header .site-header__cta-gold, site-header a[data-i18n="nav.ruta"]').first();
    await expect(goldCta).toBeVisible();

    const href = await goldCta.getAttribute('href');
    expect(href).toContain('diagnostico');
  });
});

// ---------------------------------------------------------------------------
// 4. Footer — 12 page links
// ---------------------------------------------------------------------------

const FOOTER_PAGES = [
  { slug: 'home', path: '/' },
  { slug: 'diagnostico', path: '/diagnostico/' },
  { slug: 'empresas', path: '/empresas/' },
  { slug: 'personas', path: '/personas/' },
  { slug: 'programas', path: '/programas/' },
  { slug: 'recursos', path: '/recursos/' },
  { slug: 'metodo', path: '/metodo/' },
  { slug: 'casos', path: '/casos/' },
  { slug: 'nosotros', path: '/nosotros/' },
  { slug: 'insights', path: '/insights/' },
  { slug: 'contacto', path: '/contacto/' },
  { slug: 'legal', path: '/legal/' },
];

test.describe('Footer — 12 Page Links', () => {
  test('footer contains at least 12 page links', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const footerLinks = page.locator('site-footer footer a[href]');
    const count = await footerLinks.count();

    // At least 12 page links (may also have social/logo links)
    expect(count).toBeGreaterThanOrEqual(12);
  });

  test('footer links cover all 12 canonical pages', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const footerLinks = page.locator('site-footer footer a[href]');
    const allHrefs = [];

    for (let i = 0; i < await footerLinks.count(); i++) {
      const href = await footerLinks.nth(i).getAttribute('href');
      if (href) allHrefs.push(href);
    }

    for (const pg of FOOTER_PAGES) {
      const found = allHrefs.some(
        (href) => href === pg.path || href.endsWith(pg.path) || href.includes(pg.slug)
      );
      expect(found, `Missing footer link for ${pg.slug} (${pg.path})`).toBe(true);
    }
  });

  test('footer does not contain 404 page link', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const footerLinks = page.locator('site-footer footer a[href]');
    const allHrefs = [];

    for (let i = 0; i < await footerLinks.count(); i++) {
      const href = await footerLinks.nth(i).getAttribute('href');
      if (href) allHrefs.push(href);
    }

    const has404 = allHrefs.some((href) => href.includes('404'));
    expect(has404).toBe(false);
  });

  test('footer links have data-i18n attributes', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that footer page links use data-i18n for internationalization
    const i18nLinks = page.locator('site-footer footer a[data-i18n]');
    const count = await i18nLinks.count();

    // At least 12 links should have data-i18n
    expect(count).toBeGreaterThanOrEqual(12);
  });

  test('footer is organized in columns (grid layout)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const grid = page.locator('site-footer .grid, site-footer [class*="grid"]').first();
    await expect(grid).toBeVisible();
  });
});
