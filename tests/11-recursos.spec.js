const { test, expect } = require('@playwright/test');

/* ═══════════════════════════════════════════════════════════════════
   11-recursos.spec.js — Adversarial tests for all /recursos/ pages
   ═══════════════════════════════════════════════════════════════════ */

const BASE = 'http://localhost:8765';

// Pages under test
const PAGES = [
  { slug: 'recursos/',                   title: /Recursos.*MetodologIA/i,  label: 'Recursos Hub' },
  { slug: 'recursos/asistentes-gemini/', title: /Gemini Gems/i,           label: 'Gemini Gems' },
  { slug: 'recursos/asistentes-gpt/',    title: /Asistentes GPT/i,        label: 'GPT Assistants' },
  { slug: 'recursos/ebooks/',            title: /E-books/i,               label: 'E-books' },
  { slug: 'recursos/playbooks/',         title: /Playbooks/i,             label: 'Playbooks' },
  { slug: 'recursos/premium/',           title: /Premium/i,               label: 'Premium' },
];

// Viewports for horizontal overflow checks
const VIEWPORTS = [320, 375, 768, 1024, 1440];

// ─── Helper: collect JS errors during navigation ─────────────────
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
//  SHARED TESTS — run for every page
// ═══════════════════════════════════════════════════════════════════

for (const pg of PAGES) {
  test.describe(`${pg.label} (${pg.slug})`, () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE}/${pg.slug}`, { waitUntil: 'networkidle' });
    });

    // ── SEO ───────────────────────────────────────────────
    test('has robots meta', async ({ page }) => {
      const robots = page.locator('meta[name="robots"]');
      await expect(robots).toHaveAttribute('content', /index/);
    });

    test('has description meta (>=20 chars)', async ({ page }) => {
      const desc = page.locator('meta[name="description"]');
      const content = await desc.getAttribute('content');
      expect(content.length).toBeGreaterThanOrEqual(20);
    });

    test('has correct title', async ({ page }) => {
      await expect(page).toHaveTitle(pg.title);
    });

    // ── JS errors ─────────────────────────────────────────
    test('no JS errors on load', async ({ page }) => {
      const { jsErrors } = await gotoCollecting(page, `${BASE}/${pg.slug}`);
      const real = jsErrors.filter(e =>
        !e.includes('fonts.googleapis') &&
        !e.includes('favicon')
      );
      expect(real).toHaveLength(0);
    });

    // ── 404 resources ─────────────────────────────────────
    test('no 404 local resources', async ({ page }) => {
      const { failed404 } = await gotoCollecting(page, `${BASE}/${pg.slug}`);
      expect(failed404).toHaveLength(0);
    });

    // ── SiteHeader / SiteFooter ───────────────────────────
    test('SiteHeader renders', async ({ page }) => {
      const header = page.locator('site-header');
      await expect(header).toHaveCount(1);
    });

    test('SiteFooter renders', async ({ page }) => {
      const footer = page.locator('site-footer');
      await expect(footer).toHaveCount(1);
    });

    // ── Visible content ───────────────────────────────────
    test('has visible h1', async ({ page }) => {
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      const text = await h1.textContent();
      expect(text.trim().length).toBeGreaterThan(3);
    });

    test('main content area is visible', async ({ page }) => {
      const main = page.locator('main');
      await expect(main).toBeVisible();
    });

    // ── Breadcrumb exists ─────────────────────────────────
    test('breadcrumb nav exists', async ({ page }) => {
      const breadcrumb = page.locator('nav[aria-label="Breadcrumb"], nav.breadcrumb-nav');
      await expect(breadcrumb.first()).toBeVisible();
    });

    // ── Horizontal overflow at each viewport ──────────────
    for (const vw of VIEWPORTS) {
      test(`no horizontal overflow at ${vw}px`, async ({ page }) => {
        await page.setViewportSize({ width: vw, height: 800 });
        await page.goto(`${BASE}/${pg.slug}`, { waitUntil: 'networkidle' });
        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        expect(overflow).toBe(false);
      });
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
//  RECURSOS HUB — page-specific tests
// ═══════════════════════════════════════════════════════════════════

test.describe('Recursos Hub — page-specific', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/recursos/`, { waitUntil: 'networkidle' });
  });

  test('hero h1 contains "Recursos"', async ({ page }) => {
    const h1 = page.locator('main h1');
    await expect(h1).toContainText(/Recursos/i);
  });

  test('catalog section exists', async ({ page }) => {
    const catalog = page.locator('#catalogo');
    await expect(catalog).toBeAttached();
  });

  test('has links to sub-pages (GPT, Gemini, ebooks, playbooks, premium)', async ({ page }) => {
    await expect(page.locator('a[href*="asistentes-gpt"]').first()).toBeAttached();
    await expect(page.locator('a[href*="asistentes-gemini"]').first()).toBeAttached();
    await expect(page.locator('a[href*="ebooks"]').first()).toBeAttached();
    await expect(page.locator('a[href*="playbooks"]').first()).toBeAttached();
    await expect(page.locator('a[href*="premium"]').first()).toBeAttached();
  });

  test('Premium CTA card navigates to premium page', async ({ page }) => {
    const premiumLink = page.locator('a[href="premium/index.html"]');
    await expect(premiumLink).toBeVisible();
    await premiumLink.click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('premium');
  });
});

// ═══════════════════════════════════════════════════════════════════
//  GEMINI GEMS — 7 gem cards, external link security
// ═══════════════════════════════════════════════════════════════════

test.describe('Gemini Gems — page-specific', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/recursos/asistentes-gemini/`, { waitUntil: 'networkidle' });
  });

  test('7 gem cards are present', async ({ page }) => {
    // Gem cards are <a> tags linking to gemini.google.com
    const gemCards = page.locator('a[href*="gemini.google.com/gem"]');
    await expect(gemCards).toHaveCount(7);
  });

  test('all external gem links have target="_blank"', async ({ page }) => {
    const gemLinks = page.locator('a[href*="gemini.google.com/gem"]');
    const count = await gemLinks.count();
    for (let i = 0; i < count; i++) {
      await expect(gemLinks.nth(i)).toHaveAttribute('target', '_blank');
    }
  });

  test('all external gem links have rel="noopener"', async ({ page }) => {
    const gemLinks = page.locator('a[href*="gemini.google.com/gem"]');
    const count = await gemLinks.count();
    for (let i = 0; i < count; i++) {
      const rel = await gemLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
    }
  });

  test('search input exists', async ({ page }) => {
    const search = page.locator('#gem-search');
    await expect(search).toBeVisible();
  });

  test('featured section exists with 2 highlighted gems', async ({ page }) => {
    const featured = page.locator('section').filter({ hasText: 'Destacados' }).first();
    await expect(featured).toBeVisible();
    const featuredCards = featured.locator('a[href*="gemini.google.com/gem"]');
    await expect(featuredCards).toHaveCount(2);
  });

  test('collection section exists with 5 gems', async ({ page }) => {
    const collection = page.locator('section').filter({ hasText: 'Colección' }).first();
    await expect(collection).toBeVisible();
    const collectionCards = collection.locator('a[href*="gemini.google.com/gem"]');
    await expect(collectionCards).toHaveCount(5);
  });
});

// ═══════════════════════════════════════════════════════════════════
//  GPT ASSISTANTS — page-specific
// ═══════════════════════════════════════════════════════════════════

test.describe('GPT Assistants — page-specific', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/recursos/asistentes-gpt/`, { waitUntil: 'networkidle' });
  });

  test('h1 contains "GPT"', async ({ page }) => {
    await expect(page.locator('main h1')).toContainText('GPT');
  });

  test('has ChatGPT external links', async ({ page }) => {
    const links = page.locator('a[href*="chatgpt.com"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test('all external GPT links have target="_blank" and rel="noopener"', async ({ page }) => {
    const links = page.locator('a[href*="chatgpt.com"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute('target', '_blank');
      const rel = await links.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
    }
  });

  test('search input exists', async ({ page }) => {
    const search = page.locator('#gpt-search');
    await expect(search).toBeVisible();
  });

  test('has multiple category sections', async ({ page }) => {
    const h2s = page.locator('section h2');
    const count = await h2s.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});

// ═══════════════════════════════════════════════════════════════════
//  E-BOOKS — page-specific
// ═══════════════════════════════════════════════════════════════════

test.describe('E-books — page-specific', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/recursos/ebooks/`, { waitUntil: 'networkidle' });
  });

  test('h1 contains "E-books"', async ({ page }) => {
    await expect(page.locator('main h1')).toContainText(/E-book/i);
  });

  test('has 4 resource cards', async ({ page }) => {
    const cards = page.locator('.card-glass').filter({ has: page.locator('h3') });
    await expect(cards).toHaveCount(4);
  });

  test('CTA beta tester button exists', async ({ page }) => {
    const cta = page.locator('[data-cta="beta-tester-ebooks"]');
    await expect(cta).toBeVisible();
  });
});

// ═══════════════════════════════════════════════════════════════════
//  PLAYBOOKS — page-specific
// ═══════════════════════════════════════════════════════════════════

test.describe('Playbooks — page-specific', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/recursos/playbooks/`, { waitUntil: 'networkidle' });
  });

  test('h1 contains "Playbooks"', async ({ page }) => {
    await expect(page.locator('main h1')).toContainText(/Playbook/i);
  });

  test('has 4 resource cards', async ({ page }) => {
    const cards = page.locator('.card-glass').filter({ has: page.locator('h3') });
    await expect(cards).toHaveCount(4);
  });

  test('first playbook is marked as available', async ({ page }) => {
    const available = page.locator('text=Disponible').first();
    await expect(available).toBeVisible();
  });

  test('CTA beta tester button exists', async ({ page }) => {
    const cta = page.locator('[data-cta="beta-tester-playbooks"]');
    await expect(cta).toBeVisible();
  });
});

// ═══════════════════════════════════════════════════════════════════
//  PREMIUM — 7 pricing rows, "$" in prices
// ═══════════════════════════════════════════════════════════════════

test.describe('Premium — page-specific', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/recursos/premium/`, { waitUntil: 'networkidle' });
  });

  test('h1 contains "Premium"', async ({ page }) => {
    await expect(page.locator('main h1')).toContainText(/Premium/i);
  });

  test('7 pricing rows are visible', async ({ page }) => {
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(8); // 7 regular + 1 "Agentes a Medida"
    // But only 7 have pricing-row class
    const pricingRows = page.locator('tr.pricing-row');
    await expect(pricingRows).toHaveCount(7);
  });

  test('prices contain "$" character', async ({ page }) => {
    const pricingRows = page.locator('tr.pricing-row');
    const count = await pricingRows.count();
    for (let i = 0; i < count; i++) {
      const text = await pricingRows.nth(i).textContent();
      expect(text).toContain('$');
    }
  });

  test('pricing table has COP and USD headers', async ({ page }) => {
    const headers = page.locator('thead th');
    const texts = await headers.allTextContents();
    const combined = texts.join(' ');
    expect(combined).toContain('COP');
    expect(combined).toContain('USD');
  });

  test('value proposition cards exist', async ({ page }) => {
    const valueCards = page.locator('.card-glass').filter({ hasText: /Soporte Prioritario|Actualizaciones/ });
    const count = await valueCards.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('"Ver Catálogo" CTA works', async ({ page }) => {
    const cta = page.locator('a:has-text("Ver Catálogo")');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /catalogo/);
  });

  test('"Explorar Servicios a Medida" CTA exists', async ({ page }) => {
    const cta = page.locator('a:has-text("Explorar Servicios a Medida")').first();
    await expect(cta).toBeVisible();
  });
});
