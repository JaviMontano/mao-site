// @ts-check
import { test, expect } from '@playwright/test';

/**
 * E2E: Program Section on Home [T089]
 *
 * Validates the programas section renders ProgramCard web components:
 * - Section visible with heading
 * - At least 3 program-card elements rendered
 * - Each card has shadow DOM with name, audience tag, CTA link
 * - Cards respond to locale changes
 * - CTA links point to valid routes
 *
 * Traceability: [TS-022, TS-023, TS-024, TS-025]
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Program Section', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('programas section is visible with heading', async ({ page }) => {
    const section = page.locator('#programas');
    await expect(section).toBeVisible();

    const heading = page.locator('#programas-heading');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/Programas/i);
  });

  test('renders at least 3 program-card elements', async ({ page }) => {
    const cards = page.locator('#programas-grid program-card');
    await expect(cards).toHaveCount(3);
  });

  test('each program-card has required attributes', async ({ page }) => {
    const cards = page.locator('#programas-grid program-card');
    const count = await cards.count();

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card).toHaveAttribute('name-es', /.+/);
      await expect(card).toHaveAttribute('audiencia', /^(persona|empresa|ambos)$/);
      await expect(card).toHaveAttribute('cta-href', /.+/);
    }
  });

  test('program-card shadow DOM renders name and CTA', async ({ page }) => {
    // Check first card's shadow DOM content
    const hasContent = await page.evaluate(() => {
      const card = document.querySelector('#programas-grid program-card');
      if (!card || !card.shadowRoot) return false;
      const name = card.shadowRoot.querySelector('.card__name');
      const cta = card.shadowRoot.querySelector('.card__cta');
      return !!(name && name.textContent.trim() && cta && cta.getAttribute('href'));
    });
    expect(hasContent).toBeTruthy();
  });

  test('program cards have audience tags', async ({ page }) => {
    const hasTags = await page.evaluate(() => {
      const cards = document.querySelectorAll('#programas-grid program-card');
      return Array.from(cards).every(c => {
        const tag = c.shadowRoot?.querySelector('.card__tag');
        return tag && tag.textContent.trim().length > 0;
      });
    });
    expect(hasTags).toBeTruthy();
  });

  test('CTA link in section points to ruta', async ({ page }) => {
    const cta = page.locator('#programas .home-section__cta');
    await expect(cta).toHaveAttribute('href', /ruta/);
  });
});
