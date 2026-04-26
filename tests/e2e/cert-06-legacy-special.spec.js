// @ts-check
import { test, expect } from '@playwright/test';
import { navigateTo, startErrorCollector } from './helpers/cert-helpers.js';

/**
 * cert-06 — Legacy + Special Pages (4 pages × 4 tests = 16)
 *
 * Pages that use older templates or have special behavior:
 * - biblioteca-prompts: legacy template, no NeoSwiss shell
 * - biblioteca-universal: legacy template, no NeoSwiss shell
 * - 404.html: error page with NeoSwiss shell
 * - Montano_Javier_Canonical.html: standalone bio page
 *
 * Reduced criteria: HTTP 200, has content, no fatal JS errors.
 */

test.describe('Biblioteca: prompts (migrated to NeoSwiss)', () => {
  const path = '/recursos/biblioteca-prompts/';

  test('loads HTTP 200', async ({ page }) => {
    const res = await page.goto(`http://localhost:3000${path}`, { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(200);
  });

  test('has site-header', async ({ page }) => {
    await navigateTo(page, path);
    await expect(page.locator('site-header')).toBeAttached({ timeout: 3000 });
  });

  test('has site-footer', async ({ page }) => {
    await navigateTo(page, path);
    expect(await page.locator('site-footer').count()).toBeGreaterThanOrEqual(1);
  });

  test('has triple-toggle', async ({ page }) => {
    await navigateTo(page, path);
    await expect(page.locator('triple-toggle')).toBeAttached({ timeout: 3000 });
  });

  test('zero console errors', async ({ page }) => {
    const assertErrors = startErrorCollector(page);
    await navigateTo(page, path);
    assertErrors('biblioteca-prompts');
  });
});

test.describe('Biblioteca: universal (migrated to NeoSwiss)', () => {
  const path = '/recursos/biblioteca-universal/';

  test('loads HTTP 200', async ({ page }) => {
    const res = await page.goto(`http://localhost:3000${path}`, { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(200);
  });

  test('has site-header', async ({ page }) => {
    await navigateTo(page, path);
    await expect(page.locator('site-header')).toBeAttached({ timeout: 3000 });
  });

  test('has site-footer', async ({ page }) => {
    await navigateTo(page, path);
    expect(await page.locator('site-footer').count()).toBeGreaterThanOrEqual(1);
  });

  test('has triple-toggle', async ({ page }) => {
    await navigateTo(page, path);
    await expect(page.locator('triple-toggle')).toBeAttached({ timeout: 3000 });
  });

  test('zero console errors', async ({ page }) => {
    const assertErrors = startErrorCollector(page);
    await navigateTo(page, path);
    assertErrors('biblioteca-universal');
  });
});

test.describe('Special: 404 page', () => {
  test('loads HTTP 200 (static serve)', async ({ page }) => {
    const res = await page.goto('http://localhost:3000/404.html', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(200);
  });

  test('has error heading', async ({ page }) => {
    await navigateTo(page, '/404.html');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeAttached();
  });

  test('has CTA back to home', async ({ page }) => {
    await navigateTo(page, '/404.html');
    const link = page.locator('a[href="/"], a[href="./"]').first();
    await expect(link).toBeAttached();
  });

  test('zero console errors', async ({ page }) => {
    const assertErrors = startErrorCollector(page);
    await navigateTo(page, '/404.html');
    assertErrors('404');
  });
});

test.describe('Special: Canonical bio', () => {
  test('loads HTTP 200', async ({ page }) => {
    const res = await page.goto('http://localhost:3000/Montano_Javier_Canonical.html', { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(200);
  });

  test('has content (not blank)', async ({ page }) => {
    await navigateTo(page, '/Montano_Javier_Canonical.html');
    const text = await page.locator('body').textContent();
    expect(text?.trim().length).toBeGreaterThan(50);
  });
});
