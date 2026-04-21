// @ts-check
import { test, expect } from '@playwright/test';

/**
 * E2E: Adaptive Blueprint — 52-combo matrix [T037]
 *
 * Validates the adaptive blueprint across 13 pages x 2 locales x 2 audiences.
 * Tests a representative subset of the full 52-combo matrix plus:
 * - Zero raw i18n keys ([MISSING:] markers)
 * - Toggle transitions <100ms
 * - Sidebar present on 12 pages (not 404)
 * - ARIA roles on toggles and sidebar
 *
 * Traceability: [TS-043..TS-051, TS-093..TS-099]
 */

/** The 13 canonical pages per sitemap.md */
const PAGES = [
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
  { slug: '404', path: '/404.html' },
];

const PAGES_WITH_SIDEBAR = PAGES.filter((p) => p.slug !== '404');

const LOCALES = ['es', 'en'];
const AUDIENCES = ['persona', 'empresa'];

/**
 * Representative subset: test a cross-section of pages across locale/audience
 * combos to cover the matrix without running all 52 sequentially.
 */
const MATRIX_SUBSET = [
  { page: '/', locale: 'es', audience: 'persona' },
  { page: '/', locale: 'en', audience: 'empresa' },
  { page: '/diagnostico/', locale: 'es', audience: 'empresa' },
  { page: '/diagnostico/', locale: 'en', audience: 'persona' },
  { page: '/empresas/', locale: 'es', audience: 'empresa' },
  { page: '/empresas/', locale: 'en', audience: 'persona' },
  { page: '/personas/', locale: 'es', audience: 'persona' },
  { page: '/personas/', locale: 'en', audience: 'empresa' },
  { page: '/programas/', locale: 'es', audience: 'persona' },
  { page: '/programas/', locale: 'en', audience: 'empresa' },
  { page: '/recursos/', locale: 'es', audience: 'empresa' },
  { page: '/recursos/', locale: 'en', audience: 'persona' },
  { page: '/metodo/', locale: 'es', audience: 'persona' },
  { page: '/metodo/', locale: 'en', audience: 'empresa' },
  { page: '/casos/', locale: 'es', audience: 'empresa' },
  { page: '/nosotros/', locale: 'en', audience: 'persona' },
  { page: '/insights/', locale: 'es', audience: 'persona' },
  { page: '/contacto/', locale: 'en', audience: 'empresa' },
  { page: '/legal/', locale: 'es', audience: 'persona' },
  { page: '/legal/', locale: 'en', audience: 'empresa' },
];

// ---------------------------------------------------------------------------
// 1. Zero raw i18n keys across the matrix subset
// ---------------------------------------------------------------------------

test.describe('Adaptive Blueprint — Zero raw i18n keys', () => {
  for (const combo of MATRIX_SUBSET) {
    test(`no [MISSING:] markers on ${combo.page} (${combo.locale}/${combo.audience})`, async ({ page }) => {
      // Pre-set locale and audience before navigation
      await page.addInitScript(({ locale, audience }) => {
        localStorage.setItem('mdg_locale', locale);
        localStorage.setItem('mdg_audience', audience);
      }, { locale: combo.locale, audience: combo.audience });

      await page.goto(combo.page);
      await page.waitForLoadState('networkidle');

      // Check for raw i18n key markers in the visible text
      const missingKeys = await page.evaluate(() => {
        const body = document.body.innerText;
        const matches = body.match(/\[MISSING:[^\]]*\]/g);
        return matches || [];
      });

      expect(missingKeys, `Found raw i18n keys: ${missingKeys.join(', ')}`).toHaveLength(0);

      // Also check for untranslated data-i18n placeholders showing literal dash
      const untranslatedSlots = await page.evaluate(() => {
        const elements = document.querySelectorAll('[data-i18n]');
        const failures = [];
        for (const el of elements) {
          const text = el.textContent.trim();
          if (text === '—' || text === '' || text.startsWith('{')) {
            failures.push({
              key: el.getAttribute('data-i18n'),
              text: text.substring(0, 50),
            });
          }
        }
        return failures;
      });

      expect(untranslatedSlots, 'Found untranslated i18n elements').toHaveLength(0);
    });
  }
});

// ---------------------------------------------------------------------------
// 2. Toggle transitions under 100ms
// ---------------------------------------------------------------------------

test.describe('Adaptive Blueprint — Toggle transition performance', () => {
  test('locale toggle re-renders content in <100ms', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const elapsed = await page.evaluate(() => {
      const start = performance.now();
      // Trigger locale change
      document.documentElement.setAttribute('lang', 'en');
      window.dispatchEvent(new CustomEvent('mdg:state-changed', {
        detail: { key: 'locale', value: 'en' },
      }));
      // Force synchronous layout
      document.body.offsetHeight;
      return performance.now() - start;
    });

    expect(elapsed).toBeLessThan(100);
  });

  test('audience toggle re-renders slots in <100ms', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const elapsed = await page.evaluate(() => {
      const start = performance.now();
      document.documentElement.setAttribute('data-audience', 'empresa');
      window.dispatchEvent(new CustomEvent('mdg:state-changed', {
        detail: { key: 'audience', value: 'empresa' },
      }));
      document.body.offsetHeight;
      return performance.now() - start;
    });

    expect(elapsed).toBeLessThan(100);
  });

  test('theme toggle applies CSS in <100ms', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const elapsed = await page.evaluate(() => {
      const start = performance.now();
      document.documentElement.setAttribute('data-theme', 'dark');
      window.dispatchEvent(new CustomEvent('mdg:state-changed', {
        detail: { key: 'theme', value: 'dark' },
      }));
      document.body.offsetHeight;
      return performance.now() - start;
    });

    expect(elapsed).toBeLessThan(100);
  });
});

// ---------------------------------------------------------------------------
// 3. Sidebar present on 12 pages, absent on 404
// ---------------------------------------------------------------------------

test.describe('Adaptive Blueprint — Sidebar presence', () => {
  for (const pg of PAGES_WITH_SIDEBAR) {
    test(`sidebar is present on ${pg.slug} (${pg.path})`, async ({ page }) => {
      await page.goto(pg.path);
      await page.waitForLoadState('networkidle');

      const sidebar = page.locator('site-sidebar, .site-sidebar, [role="navigation"][aria-label*="sidebar" i], nav.site-sidebar');
      await expect(sidebar.first()).toBeVisible();
    });
  }

  test('sidebar is NOT present on 404 page', async ({ page }) => {
    await page.goto('/404.html');
    await page.waitForLoadState('networkidle');

    const sidebar = page.locator('site-sidebar, .site-sidebar, [role="navigation"][aria-label*="sidebar" i], nav.site-sidebar');
    await expect(sidebar).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// 4. ARIA roles on toggles and sidebar
// ---------------------------------------------------------------------------

test.describe('Adaptive Blueprint — ARIA semantics', () => {
  test('triple toggle has role="switch" on all 3 toggles', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const switches = page.locator('triple-toggle [role="switch"], .triple-toggle [role="switch"]');
    await expect(switches).toHaveCount(3);

    // Each switch must have aria-checked
    for (let i = 0; i < 3; i++) {
      const ariaChecked = await switches.nth(i).getAttribute('aria-checked');
      expect(['true', 'false']).toContain(ariaChecked);
    }
  });

  test('sidebar navigation has proper ARIA landmark', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Sidebar should be a nav landmark
    const sidebarNav = page.locator('site-sidebar nav[role="navigation"], .site-sidebar[role="navigation"], nav.site-sidebar');
    await expect(sidebarNav.first()).toBeVisible();

    // Should have an accessible label
    const label = await sidebarNav.first().getAttribute('aria-label');
    expect(label).toBeTruthy();
  });

  test('sidebar links have aria-current on active section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // At least one link should have aria-current="true" or the is-active class
    const activeLink = page.locator(
      'site-sidebar a[aria-current="true"], .site-sidebar a[aria-current="true"], site-sidebar a.is-active, .site-sidebar a.is-active'
    );
    await expect(activeLink.first()).toBeVisible();
  });

  test('toggle buttons have accessible labels', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const switches = page.locator('triple-toggle [role="switch"], .triple-toggle [role="switch"]');
    const count = await switches.count();

    for (let i = 0; i < count; i++) {
      const label = await switches.nth(i).getAttribute('aria-label');
      const labelledBy = await switches.nth(i).getAttribute('aria-labelledby');
      // Must have either aria-label or aria-labelledby
      expect(label || labelledBy, `Toggle ${i} missing accessible name`).toBeTruthy();
    }
  });
});

// ---------------------------------------------------------------------------
// 5. Blueprint shell structure on every page
// ---------------------------------------------------------------------------

test.describe('Adaptive Blueprint — Shell structure', () => {
  test('html element has lang, data-theme, and data-audience attributes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const lang = await page.locator('html').getAttribute('lang');
    expect(['es', 'en']).toContain(lang);

    const theme = await page.locator('html').getAttribute('data-theme');
    expect(['light', 'dark']).toContain(theme);

    const audience = await page.locator('html').getAttribute('data-audience');
    expect(['persona', 'empresa', 'unknown']).toContain(audience);
  });

  test('main element has data-page-slug attribute', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const slug = await page.locator('main#main, main[id="main"]').getAttribute('data-page-slug');
    expect(slug).toBeTruthy();
  });

  test('skip-link is present and targets #main', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('a.skip-link[href="#main"]');
    await expect(skipLink).toHaveCount(1);
  });

  test('site-header and site-footer are present', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('site-header')).toHaveCount(1);
    await expect(page.locator('site-footer')).toHaveCount(1);
  });
});
