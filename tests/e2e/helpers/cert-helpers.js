/**
 * cert-helpers.js — Shared utilities for site-wide certification tests.
 * Extracted from content-migration-certification.spec.js.
 *
 * @license Copyleft
 * @copyright MetodologIA
 */
import { expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const NOISE_FILTERS = [
  'favicon', 'analytics', 'ERR_BLOCKED', 'net::', 'firebase',
  'fonts.googleapis', 'fonts.gstatic', 'cdnjs', 'cdn.jsdelivr',
  'Failed to load resource', 'third-party',
];

/**
 * Navigate to a page and wait for shell hydration.
 */
export async function navigateTo(page, path) {
  await page.goto(`${BASE_URL}${path}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);
}

/**
 * Switch locale to EN via i18n API.
 */
export async function switchToEN(page) {
  await page.evaluate(() => {
    if (window.i18n?.setLang) window.i18n.setLang('en');
    else {
      localStorage.setItem('mdg_locale', 'en');
      document.documentElement.lang = 'en';
    }
  });
  await page.waitForTimeout(600);
}

/**
 * Assert no raw i18n keys leak into visible content.
 */
export async function assertNoRawKeys(page) {
  const bodyText = await page.locator('body').textContent();
  const missingKeys = bodyText.match(/\[MISSING:[^\]]+\]/g) || [];
  expect(missingKeys, 'Found [MISSING:*] keys').toHaveLength(0);
}

/**
 * Assert the NeoSwiss shell contract: header, footer(×1), toggle, CSS 200.
 * Returns the CSS status for chaining.
 */
export async function assertNeoSwissShell(page) {
  await expect(page.locator('site-header')).toBeAttached({ timeout: 3000 });
  const footerCount = await page.locator('site-footer').count();
  expect(footerCount, 'Exactly 1 site-footer').toBe(1);
  await expect(page.locator('triple-toggle')).toBeAttached({ timeout: 3000 });
}

/**
 * Start collecting console errors on a page. Call BEFORE navigateTo.
 * Returns a function that asserts zero real errors.
 */
export function startErrorCollector(page) {
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  return function assertZeroErrors(label) {
    const real = errors.filter(
      e => !NOISE_FILTERS.some(f => e.toLowerCase().includes(f.toLowerCase()))
    );
    expect(real, `Console errors on ${label}: ${real.join('; ')}`).toHaveLength(0);
  };
}

/**
 * Assert neoswiss-system.css loads with HTTP 200.
 * Must be called BEFORE navigateTo (sets up response listener).
 */
export function startCSSChecker(page) {
  const statuses = [];
  page.on('response', (res) => {
    if (res.url().includes('neoswiss')) statuses.push(res.status());
  });
  return function assertCSSLoaded(label) {
    expect(statuses.length, `${label}: neoswiss CSS must load`).toBeGreaterThanOrEqual(1);
    expect(statuses[0]).toBe(200);
  };
}
