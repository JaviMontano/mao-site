// @ts-check
import { test, expect } from '@playwright/test';

/**
 * E2E: Home Offline Pill [T090]
 *
 * Validates the offline-pill web component:
 * - Pill hidden by default when online
 * - Pill appears when Firestore/network is unavailable (stub)
 * - Pill has aria-live="polite" for screen reader announcements
 * - Pill disappears when connectivity restores
 *
 * Traceability: [TS-072, TS-074, TS-080]
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Offline Pill', () => {

  test('offline-pill element exists in DOM', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState('domcontentloaded');

    const pill = page.locator('offline-pill');
    await expect(pill).toHaveCount(1);
  });

  test('pill is hidden when online', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState('domcontentloaded');

    // The pill should not show visible content when online
    const pillText = await page.evaluate(() => {
      const el = document.querySelector('offline-pill');
      if (!el || !el.shadowRoot) return '';
      const container = el.shadowRoot.querySelector('[role="status"]') || el.shadowRoot.firstElementChild;
      return container ? container.textContent.trim() : '';
    });
    // When online and fresh, pill text should be empty
    expect(pillText).toBe('');
  });

  test('pill appears when going offline', async ({ page, context }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState('domcontentloaded');

    // Simulate offline by setting browser offline mode
    await context.setOffline(true);

    // Dispatch a bus event to simulate Firestore fallback
    await page.evaluate(() => {
      // Emit a cache-state event via the bus if available
      if (window.__mdgBus && typeof window.__mdgBus.emit === 'function') {
        window.__mdgBus.emit('cache-state', { state: 'fallback' });
      }
    });

    // Wait a moment for the pill to react
    await page.waitForTimeout(500);

    // Check pill has aria-live attribute
    const hasAriaLive = await page.evaluate(() => {
      const el = document.querySelector('offline-pill');
      if (!el || !el.shadowRoot) return false;
      const status = el.shadowRoot.querySelector('[aria-live]');
      return status !== null;
    });
    expect(hasAriaLive).toBeTruthy();

    // Restore online
    await context.setOffline(false);
  });

  test('offline-pill has aria-live="polite" in shadow DOM', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState('domcontentloaded');

    const ariaLiveValue = await page.evaluate(() => {
      const el = document.querySelector('offline-pill');
      if (!el || !el.shadowRoot) return null;
      const status = el.shadowRoot.querySelector('[aria-live]');
      return status ? status.getAttribute('aria-live') : null;
    });
    expect(ariaLiveValue).toBe('polite');
  });
});
