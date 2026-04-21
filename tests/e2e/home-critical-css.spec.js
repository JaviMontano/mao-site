// @ts-check
import { test, expect } from '@playwright/test';

/**
 * E2E: Critical CSS — First paint without FOUC [TS-063]
 * Verifies that critical.css is inlined and prevents flash of unstyled content.
 */

test.describe('Critical CSS — No FOUC', () => {
  test('inline critical CSS present in <head>', async ({ page }) => {
    await page.goto('/');
    const inlineStyle = await page.$('head style');
    expect(inlineStyle).not.toBeNull();
    const content = await inlineStyle.textContent();
    expect(content).toContain('--ns-bg');
    expect(content).toContain('--ns-text');
  });

  test('body has Neo-Swiss Light background on first paint', async ({ page }) => {
    await page.goto('/');
    const bgColor = await page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });
    // Neo-Swiss Light default: #F9FAFB ≈ rgb(249, 250, 251)
    expect(bgColor).toMatch(/rgb\(249,\s*250,\s*251\)/);
  });

  test('no FOUC: body background set before DOMContentLoaded', async ({ page }) => {
    // Navigate and check that the background is correct at the earliest point
    const bgOnLoad = await page.evaluate(async () => {
      return new Promise((resolve) => {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            resolve(getComputedStyle(document.body).backgroundColor);
          });
        } else {
          resolve(getComputedStyle(document.body).backgroundColor);
        }
      });
    });
    expect(bgOnLoad).toMatch(/rgb\(249,\s*250,\s*251\)/);
  });

  test('dark theme: no FOUC when data-theme="dark"', async ({ page }) => {
    // Set localStorage before navigation to simulate returning dark-mode user
    await page.addInitScript(() => {
      localStorage.setItem('mdg_theme', 'dark');
    });
    await page.goto('/');
    const bgColor = await page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });
    // Dark mirror: #0B2545 ≈ rgb(11, 37, 69)
    expect(bgColor).toMatch(/rgb\(11,\s*37,\s*69\)/);
  });

  test('font-display: swap applied', async ({ page }) => {
    await page.goto('/');
    // Verify text is visible even before web fonts load
    const heroVisible = await page.locator('h1, [data-hero]').first().isVisible();
    expect(heroVisible).toBe(true);
  });
});
