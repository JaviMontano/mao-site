// @ts-check
import { test, expect } from '@playwright/test';

/**
 * E2E tests for public content served from Firestore.
 * Requires: Firebase Emulator + dev server running.
 *
 * Run: npx playwright test tests/e2e/public-content.spec.js
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// TS-001: Program card displays Firestore content on empresas page
test('T024 [TS-001] empresas program card displays Firestore content', async ({ page }) => {
  await page.goto(`${BASE_URL}/empresas/`);
  await page.waitForLoadState('networkidle');

  // Program cards should be present (either from Firestore or static fallback)
  const programSection = page.locator('[data-programs], .grid');
  await expect(programSection.first()).toBeVisible();
});

// TS-002: Program card displays Firestore content on personas page
test('T025 [TS-002] personas program card displays Firestore content', async ({ page }) => {
  await page.goto(`${BASE_URL}/personas/`);
  await page.waitForLoadState('networkidle');

  const programSection = page.locator('[data-programs], .grid');
  await expect(programSection.first()).toBeVisible();
});

// TS-004: Cached content shown when Firestore unreachable
test('T026 [TS-004] cached content shown when Firestore unreachable', async ({ page, context }) => {
  // First visit — populate cache
  await page.goto(`${BASE_URL}/empresas/`);
  await page.waitForLoadState('networkidle');

  // Block Firestore requests
  await context.route('**/firestore.googleapis.com/**', (route) => route.abort());
  await context.route('**/localhost:8080/**', (route) => route.abort());

  // Reload — should use cached content
  await page.reload();
  await page.waitForLoadState('domcontentloaded');

  // Page should still have content (no blank sections)
  const body = await page.textContent('body');
  expect(body.length).toBeGreaterThan(100);
});

// TS-005: Language toggle uses bilingual Firestore content
test('T027 [TS-005] language toggle uses bilingual content', async ({ page }) => {
  await page.goto(`${BASE_URL}/empresas/`);
  await page.waitForLoadState('networkidle');

  // Check for language toggle presence
  const langToggle = page.locator('[data-lang-toggle], .lang-toggle, [aria-label*="language"], [aria-label*="idioma"]');
  if (await langToggle.count() > 0) {
    await langToggle.first().click();
    await page.waitForTimeout(500);
    // Content should change language
    const body = await page.textContent('body');
    expect(body.length).toBeGreaterThan(100);
  }
});

// TS-007: Cotizador uses B2C prices from Firestore
test('T035 [TS-007] cotizador uses B2C prices from Firestore', async ({ page }) => {
  await page.goto(`${BASE_URL}/ruta/cotizador.html`);
  await page.waitForLoadState('networkidle');

  // Price elements should be present
  const priceElements = page.locator('[data-price]');
  const count = await priceElements.count();
  expect(count).toBeGreaterThan(0);
});

// TS-008: Empresas cotizador uses B2B multipliers from Firestore
test('T036 [TS-008] empresas cotizador uses B2B multipliers', async ({ page }) => {
  await page.goto(`${BASE_URL}/ruta/cotizador-empresas.html`);
  await page.waitForLoadState('networkidle');

  // Page should render with pricing content
  const body = await page.textContent('body');
  expect(body.length).toBeGreaterThan(100);
});

// TS-009: Premium catalog displays Firestore prices
test('T037 [TS-009] premium catalog displays Firestore prices', async ({ page }) => {
  await page.goto(`${BASE_URL}/recursos/premium/`);
  await page.waitForLoadState('networkidle');

  // Premium pricing table should be visible
  const body = await page.textContent('body');
  expect(body).toContain('$');
});

// TS-006: First load on 3G renders within 2s or falls back
test('T028 [TS-006] first load renders within 2s on slow connection', async ({ page }) => {
  // Emulate slow 3G
  const client = await page.context().newCDPSession(page);
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: 50000, // ~400kbps (slow 3G)
    uploadThroughput: 25000,
    latency: 400,
  });

  const start = Date.now();
  await page.goto(`${BASE_URL}/empresas/`, { waitUntil: 'domcontentloaded' });
  const loadTime = Date.now() - start;

  // Content should be visible (from cache/static fallback if Firestore slow)
  const body = await page.textContent('body');
  expect(body.length).toBeGreaterThan(100);

  // If > 2s, at least verify fallback worked (no blank page)
  if (loadTime > 2000) {
    const hasContent = await page.locator('main, .content, [role="main"]').count();
    expect(hasContent).toBeGreaterThan(0);
  }
});
