// @ts-check
import { test, expect } from '@playwright/test';
import {
  navigateTo, switchToEN, assertNoRawKeys,
  assertNeoSwissShell, startErrorCollector, startCSSChecker,
} from './helpers/cert-helpers.js';

/**
 * cert-01 — Core Pages Certification (16 pages × 7 tests = 112)
 *
 * NeoSwiss contract: header, footer(×1), toggle, CSS 200, zero errors,
 * data-page-slug, locale toggle with zero raw keys.
 *
 * NOTE: /vision/ and /servicios/ are redirected by legacy-router.js,
 * so we test via /vision/index.html and /servicios/index.html.
 */

const CORE_PAGES = [
  { slug: 'home',        path: '/',                         name: 'Home' },
  { slug: 'empresas',    path: '/empresas/',                name: 'Empresas' },
  { slug: 'personas',    path: '/personas/',                name: 'Personas' },
  { slug: 'programas',   path: '/programas/',               name: 'Programas' },
  { slug: 'recursos',    path: '/recursos/',                name: 'Recursos' },
  { slug: 'metodo',      path: '/metodo/',                  name: 'Metodo' },
  { slug: 'diagnostico', path: '/diagnostico/',             name: 'Diagnostico' },
  { slug: 'casos',       path: '/casos/',                   name: 'Casos' },
  { slug: 'nosotros',    path: '/nosotros/',                name: 'Nosotros' },
  { slug: 'insights',    path: '/insights/',                name: 'Insights' },
  { slug: 'contacto',    path: '/contacto/',                name: 'Contacto' },
  { slug: 'legal',       path: '/legal/',                   name: 'Legal' },
  { slug: 'ruta',        path: '/ruta/',                    name: 'Ruta' },
  { slug: 'embajadores', path: '/nosotros/embajadores/',    name: 'Embajadores' },
  { slug: 'vision',      path: '/vision/',                   name: 'Vision' },
  { slug: 'servicios',   path: '/servicios/',                name: 'Servicios' },
];

for (const pg of CORE_PAGES) {
  test.describe(`Core: ${pg.name}`, () => {

    test(`${pg.name} — loads with HTTP 200`, async ({ page }) => {
      const res = await page.goto(`http://localhost:3000${pg.path}`, { waitUntil: 'domcontentloaded' });
      expect(res?.status()).toBe(200);
    });

    test(`${pg.name} — site-header present`, async ({ page }) => {
      await navigateTo(page, pg.path);
      await expect(page.locator('site-header')).toBeAttached({ timeout: 3000 });
    });

    test(`${pg.name} — exactly 1 site-footer`, async ({ page }) => {
      await navigateTo(page, pg.path);
      expect(await page.locator('site-footer').count()).toBe(1);
    });

    test(`${pg.name} — triple-toggle present`, async ({ page }) => {
      await navigateTo(page, pg.path);
      await expect(page.locator('triple-toggle')).toBeAttached({ timeout: 3000 });
    });

    test(`${pg.name} — neoswiss-system.css loads (200)`, async ({ page }) => {
      const assertCSS = startCSSChecker(page);
      await navigateTo(page, pg.path);
      assertCSS(pg.name);
    });

    test(`${pg.name} — zero console errors`, async ({ page }) => {
      const assertErrors = startErrorCollector(page);
      await navigateTo(page, pg.path);
      assertErrors(pg.name);
    });

    test(`${pg.name} — locale EN: no raw keys`, async ({ page }) => {
      await navigateTo(page, pg.path);
      await switchToEN(page);
      await assertNoRawKeys(page);
    });
  });
}
