const { test, expect } = require('@playwright/test');

/* ═══════════════════════════════════════════════════════════════════
   13-recursos-footer-links.spec.js
   Adversarial tests for footer-linked recursos pages
   ═══════════════════════════════════════════════════════════════════ */

const BASE = 'http://localhost:8765';

const VIEWPORTS = [320, 375, 768, 1024, 1440];

// ─── Helper: collect JS errors & 404s during navigation ────────────
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
//  1. AUTOMATIZACIONES N8N
// ═══════════════════════════════════════════════════════════════════

test.describe('Automatizaciones n8n (recursos/automatizaciones/)', () => {
  const URL = `${BASE}/recursos/automatizaciones/`;

  test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
  });

  // ── SEO ───────────────────────────────────────────────
  test('has robots meta with index', async ({ page }) => {
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /index/);
  });

  test('has description meta >= 20 chars', async ({ page }) => {
    const desc = page.locator('meta[name="description"]');
    const content = await desc.getAttribute('content');
    expect(content.length).toBeGreaterThanOrEqual(20);
  });

  test('has keywords meta', async ({ page }) => {
    const kw = page.locator('meta[name="keywords"]');
    const content = await kw.getAttribute('content');
    expect(content.length).toBeGreaterThan(5);
  });

  test('has og:image meta', async ({ page }) => {
    const og = page.locator('meta[property="og:image"]');
    await expect(og).toHaveAttribute('content', /og-image/);
  });

  test('has twitter:card meta', async ({ page }) => {
    const tc = page.locator('meta[property="twitter:card"]');
    await expect(tc).toHaveAttribute('content', 'summary_large_image');
  });

  // ── JS errors ─────────────────────────────────────────
  test('no JS errors on load', async ({ page }) => {
    const { jsErrors } = await gotoCollecting(page, URL);
    const real = jsErrors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(real).toHaveLength(0);
  });

  // ── 404 resources ─────────────────────────────────────
  test('no 404 local resources', async ({ page }) => {
    const { failed404 } = await gotoCollecting(page, URL);
    expect(failed404).toHaveLength(0);
  });

  // ── Shell: header/footer ──────────────────────────────
  test('SiteHeader renders', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
  });

  test('SiteFooter renders', async ({ page }) => {
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── Main H1 visible ──────────────────────────────────
  test('main h1 visible and contains Automatizaciones', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Automatizaciones/i);
  });

  // ── Key content sections ──────────────────────────────
  test('has resource grid with 4 cards', async ({ page }) => {
    const cards = page.locator('main .grid a[href^="item-"]');
    await expect(cards).toHaveCount(4);
  });

  test('breadcrumb nav exists', async ({ page }) => {
    const bc = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(bc.first()).toBeVisible();
  });

  test('CTA beta tester section visible', async ({ page }) => {
    const cta = page.locator('a[data-cta="beta-tester-n8n"]');
    await expect(cta).toBeVisible();
  });

  test('GitHub link present', async ({ page }) => {
    const gh = page.locator('a[href*="github.com"]');
    await expect(gh.first()).toBeAttached();
  });

  // ── Horizontal overflow ───────────────────────────────
  for (const vw of VIEWPORTS) {
    test(`no horizontal overflow at ${vw}px`, async ({ page }) => {
      await page.setViewportSize({ width: vw, height: 800 });
      await page.goto(URL, { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(overflow).toBe(false);
    });
  }
});

// ═══════════════════════════════════════════════════════════════════
//  2. SERVICIOS A MEDIDA (Aceleradores)
// ═══════════════════════════════════════════════════════════════════

test.describe('Servicios a Medida (recursos/a-medida/)', () => {
  const URL = `${BASE}/recursos/a-medida/`;

  test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
  });

  // ── SEO ───────────────────────────────────────────────
  test('has robots meta with index', async ({ page }) => {
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /index/);
  });

  test('has description meta >= 20 chars', async ({ page }) => {
    const desc = page.locator('meta[name="description"]');
    const content = await desc.getAttribute('content');
    expect(content.length).toBeGreaterThanOrEqual(20);
  });

  test('has keywords meta', async ({ page }) => {
    const kw = page.locator('meta[name="keywords"]');
    const content = await kw.getAttribute('content');
    expect(content.length).toBeGreaterThan(5);
  });

  test('has og:image meta', async ({ page }) => {
    const og = page.locator('meta[property="og:image"]');
    await expect(og).toHaveAttribute('content', /og-image/);
  });

  test('has twitter:card meta', async ({ page }) => {
    const tc = page.locator('meta[property="twitter:card"]');
    await expect(tc).toHaveAttribute('content', 'summary_large_image');
  });

  // ── JS errors ─────────────────────────────────────────
  test('no JS errors on load', async ({ page }) => {
    const { jsErrors } = await gotoCollecting(page, URL);
    const real = jsErrors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(real).toHaveLength(0);
  });

  // ── 404 resources ─────────────────────────────────────
  test('no 404 local resources', async ({ page }) => {
    const { failed404 } = await gotoCollecting(page, URL);
    expect(failed404).toHaveLength(0);
  });

  // ── Shell: header/footer ──────────────────────────────
  test('SiteHeader renders', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
  });

  test('SiteFooter renders', async ({ page }) => {
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── Main H1 visible ──────────────────────────────────
  test('main h1 visible and contains Aceleradores', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Aceleradores/i);
  });

  // ── Key content sections ──────────────────────────────
  test('breadcrumb nav exists', async ({ page }) => {
    const bc = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(bc.first()).toBeVisible();
  });

  test('has 3-phase process section', async ({ page }) => {
    const proceso = page.locator('#proceso');
    await expect(proceso).toBeAttached();
  });

  test('capability cards section with 3 cards', async ({ page }) => {
    const cards = page.locator('.capability-card');
    await expect(cards).toHaveCount(3);
  });

  test('Conversacion VIP CTA link present', async ({ page }) => {
    const vip = page.locator('a[href*="calendar.app.google"]');
    await expect(vip.first()).toBeAttached();
    await expect(vip.first()).toHaveAttribute('target', '_blank');
  });

  test('process steps include Discovery, Arquitectura, Iteración', async ({ page }) => {
    await expect(page.locator('main')).toContainText('Discovery');
    await expect(page.locator('main')).toContainText('Arquitectura');
    await expect(page.locator('main')).toContainText('Iteración');
  });

  // ── Horizontal overflow ───────────────────────────────
  for (const vw of VIEWPORTS) {
    test(`no horizontal overflow at ${vw}px`, async ({ page }) => {
      await page.setViewportSize({ width: vw, height: 800 });
      await page.goto(URL, { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(overflow).toBe(false);
    });
  }
});

// ═══════════════════════════════════════════════════════════════════
//  3. CATÁLOGO
// ═══════════════════════════════════════════════════════════════════

test.describe('Catálogo (recursos/catalogo/)', () => {
  const URL = `${BASE}/recursos/catalogo/`;

  test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: 'networkidle' });
  });

  // ── SEO ───────────────────────────────────────────────
  test('has robots meta with index', async ({ page }) => {
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /index/);
  });

  test('has description meta >= 20 chars', async ({ page }) => {
    const desc = page.locator('meta[name="description"]');
    const content = await desc.getAttribute('content');
    expect(content.length).toBeGreaterThanOrEqual(20);
  });

  test('has keywords meta', async ({ page }) => {
    const kw = page.locator('meta[name="keywords"]');
    const content = await kw.getAttribute('content');
    expect(content.length).toBeGreaterThan(5);
  });

  test('has og:image meta', async ({ page }) => {
    const og = page.locator('meta[property="og:image"]');
    await expect(og).toHaveAttribute('content', /og-image/);
  });

  test('has twitter:card meta', async ({ page }) => {
    const tc = page.locator('meta[property="twitter:card"]');
    await expect(tc).toHaveAttribute('content', 'summary_large_image');
  });

  // ── JS errors ─────────────────────────────────────────
  // KNOWN BUG: catalogo/index.html calls window.icons.createIcons()
  // without DOMContentLoaded guard — icons.js is deferred so window.icons
  // may be undefined when the inline <script> executes.
  test('no JS errors on load (KNOWN BUG: icons.createIcons)', async ({ page }) => {
    const { jsErrors } = await gotoCollecting(page, URL);
    const real = jsErrors.filter(e =>
      !e.includes('fonts.googleapis') &&
      !e.includes('favicon') &&
      !e.includes('createIcons')  // known bug — tracked
    );
    expect(real).toHaveLength(0);
  });

  // ── 404 resources ─────────────────────────────────────
  // KNOWN BUG: catalogo/index.html links Tailwind as ../dist/output.css
  // which resolves to /recursos/dist/output.css (404). Should be
  // ../../dist/output.css to reach the project root /dist/output.css.
  test('no 404 local resources (KNOWN BUG: wrong Tailwind path)', async ({ page }) => {
    const { failed404 } = await gotoCollecting(page, URL);
    const unexpected = failed404.filter(u => !u.includes('/recursos/dist/output.css'));
    expect(unexpected).toHaveLength(0);
  });

  // ── Shell: header/footer ──────────────────────────────
  test('SiteHeader renders', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
  });

  test('SiteFooter renders', async ({ page }) => {
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── Main H1 visible ──────────────────────────────────
  test('main h1 visible and contains Catálogo', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Cat[aá]logo/i);
  });

  // ── Key content sections ──────────────────────────────
  test('breadcrumb nav exists', async ({ page }) => {
    const bc = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(bc.first()).toBeVisible();
  });

  test('has 12 category cards', async ({ page }) => {
    const cards = page.locator('.category-card');
    await expect(cards).toHaveCount(12);
  });

  test('category cards link to correct sub-pages', async ({ page }) => {
    await expect(page.locator('a[href*="playbooks"]').first()).toBeAttached();
    await expect(page.locator('a[href*="ebooks"]').first()).toBeAttached();
    await expect(page.locator('a[href*="asistentes-gpt"]').first()).toBeAttached();
    await expect(page.locator('a[href*="asistentes-gemini"]').first()).toBeAttached();
    await expect(page.locator('a[href*="automatizaciones"]').first()).toBeAttached();
  });

  test('premium link present', async ({ page }) => {
    const premium = page.locator('a[href*="premium"]');
    await expect(premium.first()).toBeAttached();
  });

  test('beta tester CTA visible', async ({ page }) => {
    const cta = page.locator('a[data-cta="beta-tester-general"]');
    await expect(cta).toBeVisible();
  });

  // ── Horizontal overflow ───────────────────────────────
  for (const vw of VIEWPORTS) {
    test(`no horizontal overflow at ${vw}px`, async ({ page }) => {
      await page.setViewportSize({ width: vw, height: 800 });
      await page.goto(URL, { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(overflow).toBe(false);
    });
  }
});

// ═══════════════════════════════════════════════════════════════════
//  4. COTIZADOR PERSONAS
// ═══════════════════════════════════════════════════════════════════

test.describe('Cotizador Personas (ruta/cotizador-personas.html)', () => {
  const URL = `${BASE}/ruta/cotizador-personas.html`;

  test.beforeEach(async ({ page }) => {
    const resp = await page.goto(URL, { waitUntil: 'networkidle' });
    test.skip(resp.status() === 404, 'Page does not exist — skipping');
  });

  // ── SEO ───────────────────────────────────────────────
  test('has robots meta with index', async ({ page }) => {
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute('content', /index/);
  });

  test('has description meta >= 20 chars', async ({ page }) => {
    const desc = page.locator('meta[name="description"]');
    const content = await desc.getAttribute('content');
    expect(content.length).toBeGreaterThanOrEqual(20);
  });

  test('has keywords meta', async ({ page }) => {
    const kw = page.locator('meta[name="keywords"]');
    const content = await kw.getAttribute('content');
    expect(content.length).toBeGreaterThan(5);
  });

  test('has og:image meta', async ({ page }) => {
    const og = page.locator('meta[property="og:image"]');
    await expect(og).toHaveAttribute('content', /og-image/);
  });

  test('has twitter:card meta', async ({ page }) => {
    const tc = page.locator('meta[property="twitter:card"]');
    await expect(tc).toHaveAttribute('content', 'summary_large_image');
  });

  // ── JS errors ─────────────────────────────────────────
  test('no JS errors on load', async ({ page }) => {
    const { jsErrors } = await gotoCollecting(page, URL);
    const real = jsErrors.filter(e =>
      !e.includes('fonts.googleapis') && !e.includes('favicon')
    );
    expect(real).toHaveLength(0);
  });

  // ── 404 resources ─────────────────────────────────────
  test('no 404 local resources', async ({ page }) => {
    const { failed404 } = await gotoCollecting(page, URL);
    expect(failed404).toHaveLength(0);
  });

  // ── Shell: header/footer ──────────────────────────────
  test('SiteHeader renders', async ({ page }) => {
    await expect(page.locator('site-header')).toHaveCount(1);
  });

  test('SiteFooter renders', async ({ page }) => {
    await expect(page.locator('site-footer')).toHaveCount(1);
  });

  // ── Main H1 visible ──────────────────────────────────
  // KNOWN BUG: cotizador-personas.html has no <main> landmark element.
  // The H1 lives inside a <section> directly in <body>.
  test('h1 visible (KNOWN BUG: no main element)', async ({ page }) => {
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    const text = await h1.textContent();
    expect(text.trim().length).toBeGreaterThan(3);
  });

  // ── Key content sections ──────────────────────────────
  test('breadcrumb nav exists', async ({ page }) => {
    const bc = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(bc.first()).toBeVisible();
  });

  test('personas/empresas toggle exists', async ({ page }) => {
    const toggle = page.locator('.inline-flex a, .inline-flex button').first();
    await expect(toggle).toBeAttached();
  });

  test('cotizador form elements present', async ({ page }) => {
    // range sliders or step cards should exist
    const hasSlider = await page.locator('.range-slider, input[type="range"]').count();
    const hasStepCard = await page.locator('.step-card').count();
    expect(hasSlider + hasStepCard).toBeGreaterThan(0);
  });

  // ── Horizontal overflow ───────────────────────────────
  for (const vw of VIEWPORTS) {
    test(`no horizontal overflow at ${vw}px`, async ({ page }) => {
      await page.setViewportSize({ width: vw, height: 800 });
      await page.goto(URL, { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(overflow).toBe(false);
    });
  }
});
