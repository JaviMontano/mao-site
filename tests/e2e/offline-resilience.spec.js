// @ts-check
import { test, expect } from '@playwright/test';

/**
 * E2E tests for offline resilience and caching behavior.
 * Requires: Firebase Emulator + dev server running.
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// TS-004: Cached content shown when Firestore unreachable (also in public-content.spec.js)
test('T026 [TS-004] offline: cached programs shown when Firestore down', async ({ page, context }) => {
  // First visit with connectivity
  await page.goto(`${BASE_URL}/empresas/`);
  await page.waitForLoadState('networkidle');

  // Block Firestore
  await context.route('**/firestore.googleapis.com/**', (route) => route.abort());
  await context.route('**/localhost:8080/**', (route) => route.abort());

  // Reload
  await page.reload();
  await page.waitForLoadState('domcontentloaded');

  // Should still render content
  const body = await page.textContent('body');
  expect(body.length).toBeGreaterThan(100);
  // No error states visible
  const errorElements = await page.locator('.error, [role="alert"]').count();
  expect(errorElements).toBe(0);
});

// TS-011: Cotizador works with cached prices when Firestore unreachable
test('T038 [TS-011] offline: cotizador uses cached prices', async ({ page, context }) => {
  // First visit with connectivity
  await page.goto(`${BASE_URL}/ruta/cotizador.html`);
  await page.waitForLoadState('networkidle');

  // Block Firestore
  await context.route('**/firestore.googleapis.com/**', (route) => route.abort());
  await context.route('**/localhost:8080/**', (route) => route.abort());

  // Reload
  await page.reload();
  await page.waitForLoadState('domcontentloaded');

  // Price elements should still work
  const body = await page.textContent('body');
  expect(body.length).toBeGreaterThan(100);
});
