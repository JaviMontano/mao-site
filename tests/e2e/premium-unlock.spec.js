// @ts-check
import { test, expect } from '@playwright/test';

/**
 * E2E: Premium Resource Unlock Flow [T086]
 *
 * Validates the premium resource email gate modal:
 * - Premium CTA opens the gate modal
 * - Modal is accessible (role=dialog, aria-modal, focus trap)
 * - Invalid email shows validation error
 * - Valid email submission closes modal and proceeds
 * - Close button and Escape dismiss the modal
 *
 * Traceability: [TS-019, TS-020, TS-021]
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Premium Resource Unlock Flow', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/recursos/`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('premium CTA opens email gate modal', async ({ page }) => {
    // Click the premium link in the premium section
    const premiumCTA = page.locator('#premium a[href*="premium"]');
    await premiumCTA.click();

    // Modal should appear
    const modal = page.locator('#premium-gate-modal');
    await expect(modal).toBeVisible({ timeout: 3000 });
    await expect(modal).toHaveAttribute('role', 'dialog');
    await expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  test('modal shows validation error for invalid email', async ({ page }) => {
    const premiumCTA = page.locator('#premium a[href*="premium"]');
    await premiumCTA.click();

    const modal = page.locator('#premium-gate-modal');
    await expect(modal).toBeVisible({ timeout: 3000 });

    // Submit with empty email
    await page.locator('.premium-gate__submit').click();
    const error = page.locator('.premium-gate__error');
    await expect(error).toBeVisible();

    // Submit with invalid email
    await page.fill('#premium-gate-email', 'not-an-email');
    await page.locator('.premium-gate__submit').click();
    await expect(error).toBeVisible();
  });

  test('valid email closes modal and proceeds', async ({ page }) => {
    const premiumCTA = page.locator('#premium a[href*="premium"]');
    await premiumCTA.click();

    const modal = page.locator('#premium-gate-modal');
    await expect(modal).toBeVisible({ timeout: 3000 });

    // Fill valid email
    await page.fill('#premium-gate-email', 'test@example.com');
    await page.locator('.premium-gate__submit').click();

    // Modal should close (may navigate — check it disappears)
    await expect(modal).not.toBeVisible({ timeout: 5000 });
  });

  test('close button dismisses modal', async ({ page }) => {
    const premiumCTA = page.locator('#premium a[href*="premium"]');
    await premiumCTA.click();

    const modal = page.locator('#premium-gate-modal');
    await expect(modal).toBeVisible({ timeout: 3000 });

    // Click close button
    await page.locator('.premium-gate__close').click();
    await expect(modal).not.toBeVisible({ timeout: 3000 });
  });

  test('Escape key dismisses modal', async ({ page }) => {
    const premiumCTA = page.locator('#premium a[href*="premium"]');
    await premiumCTA.click();

    const modal = page.locator('#premium-gate-modal');
    await expect(modal).toBeVisible({ timeout: 3000 });

    // Press Escape
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible({ timeout: 3000 });
  });

  test('modal traps focus within itself', async ({ page }) => {
    const premiumCTA = page.locator('#premium a[href*="premium"]');
    await premiumCTA.click();

    const modal = page.locator('#premium-gate-modal');
    await expect(modal).toBeVisible({ timeout: 3000 });

    // Focus should be within the modal
    const activeTag = await page.evaluate(() => document.activeElement?.closest('#premium-gate-modal') !== null);
    expect(activeTag).toBeTruthy();
  });
});
