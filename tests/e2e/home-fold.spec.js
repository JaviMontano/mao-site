// @ts-check
import { test, expect } from '@playwright/test';

/**
 * E2E: Home Fold CTA Visibility [T052]
 *
 * Validates the home hero fold across 6 viewports:
 * - xs (360x640), sm (480x800), md (768x1024), lg (1024x768), xl (1280x800), 2xl (1536x960)
 * - Primary CTA visible without scroll
 * - No horizontal scroll on any viewport
 * - Sidebar present on lg+ viewports
 * - CTA has correct text and link
 * - Hero section above the fold
 * - P1 (gold) CTA is visually dominant
 *
 * Traceability: [TS-001, TS-002]
 */

// ---------------------------------------------------------------------------
// Viewport definitions
// ---------------------------------------------------------------------------

const VIEWPORTS = [
  { name: 'xs', width: 360, height: 640, hasSidebar: false },
  { name: 'sm', width: 480, height: 800, hasSidebar: false },
  { name: 'md', width: 768, height: 1024, hasSidebar: false },
  { name: 'lg', width: 1024, height: 768, hasSidebar: true },
  { name: 'xl', width: 1280, height: 800, hasSidebar: true },
  { name: '2xl', width: 1536, height: 960, hasSidebar: true },
];

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

/** Hero section — look for semantic hero landmark or common patterns */
const HERO = 'section:first-of-type, [data-hero], .hero, [class*="hero"], main > div:first-child, main > section:first-child';

/** Primary CTA — gold button, links to diagnostic or vision page */
const PRIMARY_CTA = [
  'a[href*="diagnostico"]',
  'a[href*="vision"]',
  'a.bg-brand-gold',
  'a[class*="brand-gold"]',
  '[data-cta="primary"]',
  '.cta-primary',
  'a[data-cta="diagnostic"]',
].join(', ');

/** Sidebar selector */
const SIDEBAR = 'site-sidebar, .site-sidebar, nav.site-sidebar';

// ---------------------------------------------------------------------------
// 1. CTA visible across 6 viewports
// ---------------------------------------------------------------------------

test.describe('Home Fold — CTA Visibility', () => {
  for (const vp of VIEWPORTS) {
    test(`${vp.name} (${vp.width}x${vp.height}): primary CTA visible without scroll`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Find the primary CTA
      const cta = page.locator(PRIMARY_CTA).first();
      await expect(cta).toBeVisible({ timeout: 5000 });

      // Verify the CTA is within the viewport (above the fold — no scroll needed)
      const box = await cta.boundingBox();
      expect(box).not.toBeNull();
      expect(box.y + box.height).toBeLessThanOrEqual(vp.height);
    });
  }
});

// ---------------------------------------------------------------------------
// 2. No horizontal scroll on any viewport
// ---------------------------------------------------------------------------

test.describe('Home Fold — No Horizontal Scroll', () => {
  for (const vp of VIEWPORTS) {
    test(`${vp.name} (${vp.width}x${vp.height}): no horizontal scroll`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScroll).toBe(false);
    });
  }
});

// ---------------------------------------------------------------------------
// 3. Sidebar present on lg+ viewports
// ---------------------------------------------------------------------------

test.describe('Home Fold — Sidebar Presence', () => {
  for (const vp of VIEWPORTS) {
    if (vp.hasSidebar) {
      test(`${vp.name} (${vp.width}x${vp.height}): sidebar is visible`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const sidebar = page.locator(SIDEBAR).first();
        await expect(sidebar).toBeVisible({ timeout: 5000 });

        // Sidebar should be on-screen (not off-canvas)
        const box = await sidebar.boundingBox();
        expect(box).not.toBeNull();
        expect(box.x).toBeGreaterThanOrEqual(0);
      });
    } else {
      test(`${vp.name} (${vp.width}x${vp.height}): sidebar is hidden or off-canvas`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const sidebar = page.locator(SIDEBAR).first();
        const isVisible = await sidebar.isVisible().catch(() => false);

        if (isVisible) {
          // If visible, it should be off-screen (mobile drawer pattern)
          const box = await sidebar.boundingBox();
          if (box) {
            expect(box.x + box.width).toBeLessThanOrEqual(0);
          }
        }
        // Otherwise, sidebar is hidden — which is correct for mobile
      });
    }
  }
});

// ---------------------------------------------------------------------------
// 4. CTA has correct text and link
// ---------------------------------------------------------------------------

test.describe('Home Fold — CTA Content', () => {
  test('primary CTA has valid text', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const cta = page.locator(PRIMARY_CTA).first();
    await expect(cta).toBeVisible();

    const text = (await cta.textContent()).trim();
    // CTA text should be meaningful (not empty, not a raw i18n key)
    expect(text.length).toBeGreaterThan(0);
    expect(text).not.toContain('[MISSING:');

    // Expected texts: "Iniciar diagnóstico gratuito", "Descubrir Visión",
    // "Continuar tu ruta", or English equivalents
    const validTexts = [
      'iniciar',
      'diagnostico',
      'diagnóstico',
      'descubrir',
      'visión',
      'vision',
      'continuar',
      'start',
      'discover',
      'continue',
      'free',
      'gratuito',
    ];
    const matchesExpected = validTexts.some((t) =>
      text.toLowerCase().includes(t)
    );
    expect(matchesExpected).toBe(true);
  });

  test('primary CTA links to a valid destination', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const cta = page.locator(PRIMARY_CTA).first();
    await expect(cta).toBeVisible();

    const href = await cta.getAttribute('href');
    expect(href).toBeTruthy();

    // Should link to diagnostic, vision, or ruta
    const validDestinations = ['diagnostico', 'vision', 'ruta'];
    const matchesDest = validDestinations.some((d) => href.includes(d));
    expect(matchesDest).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 5. Hero section above the fold
// ---------------------------------------------------------------------------

test.describe('Home Fold — Hero Above the Fold', () => {
  for (const vp of VIEWPORTS) {
    test(`${vp.name} (${vp.width}x${vp.height}): hero section starts above the fold`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Find the hero area — first significant content section
      const hero = page.locator(HERO).first();
      await expect(hero).toBeVisible({ timeout: 5000 });

      const box = await hero.boundingBox();
      expect(box).not.toBeNull();

      // Hero should start within the viewport (accounting for header height ~72px)
      expect(box.y).toBeLessThan(vp.height);

      // Hero should have meaningful height
      expect(box.height).toBeGreaterThan(100);
    });
  }
});

// ---------------------------------------------------------------------------
// 6. P1 (gold) CTA is visually dominant
// ---------------------------------------------------------------------------

test.describe('Home Fold — Gold CTA Visual Dominance', () => {
  test('primary CTA has gold/brand background color', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const cta = page.locator(PRIMARY_CTA).first();
    await expect(cta).toBeVisible();

    const bgColor = await cta.evaluate((el) => {
      return getComputedStyle(el).backgroundColor;
    });

    // Gold/brand colors: expect a warm-toned background
    // Common gold values: rgb(234,179,8), rgb(245,158,11), rgb(217,119,6), etc.
    // Parse the rgb values
    const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch.map(Number);
      // Gold hue: red channel high, green medium-high, blue low
      // The red channel should be dominant or close to green, blue should be lowest
      expect(r).toBeGreaterThan(150);
      expect(r).toBeGreaterThan(b);
    }
    // If rgba or other format, just ensure it's not transparent/default
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(bgColor).not.toBe('transparent');
  });

  test('primary CTA has adequate touch target size', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const cta = page.locator(PRIMARY_CTA).first();
    await expect(cta).toBeVisible();

    const box = await cta.boundingBox();
    expect(box).not.toBeNull();

    // WCAG minimum touch target: 44x44px on mobile
    expect(box.height).toBeGreaterThanOrEqual(44);
    expect(box.width).toBeGreaterThanOrEqual(44);
  });

  test('primary CTA is larger than secondary CTAs', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const primaryCta = page.locator(PRIMARY_CTA).first();
    await expect(primaryCta).toBeVisible();

    const primaryBox = await primaryCta.boundingBox();
    expect(primaryBox).not.toBeNull();

    // Look for secondary CTAs near the primary one
    const secondaryCta = page.locator(
      'a[href*="ruta"], a[class*="border"], [data-cta="secondary"], .cta-secondary'
    ).first();
    const hasSecondary = await secondaryCta.isVisible().catch(() => false);

    if (hasSecondary) {
      const secondaryBox = await secondaryCta.boundingBox();
      // Primary should have at least as much visual weight (area)
      const primaryArea = primaryBox.width * primaryBox.height;
      const secondaryArea = secondaryBox.width * secondaryBox.height;
      expect(primaryArea).toBeGreaterThanOrEqual(secondaryArea * 0.8);
    }
  });
});
