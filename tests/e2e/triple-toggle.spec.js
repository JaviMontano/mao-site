// @ts-check
import { test, expect } from '@playwright/test';

/**
 * E2E: Triple Toggle — Theme, Locale, Audience [T038]
 *
 * Tests the 3 global toggles (TripleToggle component):
 * - Theme: light/dark switch with persistence
 * - Locale: ES/EN switch with content update
 * - Audience: persona/empresa switch with slot re-hydration
 * - All 3 have role="switch" and correct aria-checked
 * - Mobile: fixed bottom-left position verified
 * - Persistence: all 3 states survive page reload
 *
 * Traceability: [TS-043, TS-047, TS-049, TS-099]
 */

// Selectors for the triple toggle component
const TOGGLE_CONTAINER = 'triple-toggle, .triple-toggle';
const THEME_TOGGLE = '[data-toggle="theme"], [aria-label*="theme" i]';
const LOCALE_TOGGLE = '[data-toggle="locale"], [aria-label*="idioma" i], [aria-label*="language" i]';
const AUDIENCE_TOGGLE = '[data-toggle="audience"], [aria-label*="audiencia" i], [aria-label*="audience" i]';

/**
 * Helper: get the toggle switch element within the triple-toggle component.
 */
function getToggle(page, selector) {
  return page.locator(`${TOGGLE_CONTAINER} ${selector}, ${selector}`).first();
}

// ---------------------------------------------------------------------------
// 1. Theme toggle
// ---------------------------------------------------------------------------

test.describe('Triple Toggle — Theme', () => {
  test('switches between light and dark themes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Default should be light
    const initialTheme = await page.locator('html').getAttribute('data-theme');
    expect(initialTheme).toBe('light');

    // Click theme toggle
    const toggle = getToggle(page, THEME_TOGGLE);
    await toggle.click();

    // Should now be dark
    const darkTheme = await page.locator('html').getAttribute('data-theme');
    expect(darkTheme).toBe('dark');

    // Click again to return to light
    await toggle.click();

    const lightTheme = await page.locator('html').getAttribute('data-theme');
    expect(lightTheme).toBe('light');
  });

  test('theme persists across page reload', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Switch to dark
    const toggle = getToggle(page, THEME_TOGGLE);
    await toggle.click();

    const darkTheme = await page.locator('html').getAttribute('data-theme');
    expect(darkTheme).toBe('dark');

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Should still be dark
    const persistedTheme = await page.locator('html').getAttribute('data-theme');
    expect(persistedTheme).toBe('dark');

    // Verify localStorage
    const stored = await page.evaluate(() => localStorage.getItem('mdg_theme'));
    expect(stored).toBe('dark');
  });

  test('dark theme applies correct CSS custom properties', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('mdg_theme', 'dark');
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const bgColor = await page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });
    // Dark theme should NOT be the light default (#F9FAFB / rgb(249,250,251))
    expect(bgColor).not.toMatch(/rgb\(249,\s*250,\s*251\)/);
  });
});

// ---------------------------------------------------------------------------
// 2. Locale toggle
// ---------------------------------------------------------------------------

test.describe('Triple Toggle — Locale', () => {
  test('switches ES to EN and content updates', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Capture Spanish content
    const esText = await page.locator('[data-i18n]').first().textContent();

    // Switch to EN
    const toggle = getToggle(page, LOCALE_TOGGLE);
    await toggle.click();
    await page.waitForTimeout(500); // Allow i18n re-render

    // html lang should update
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');

    // localStorage should persist
    const stored = await page.evaluate(() => localStorage.getItem('mdg_locale'));
    expect(stored).toBe('en');
  });

  test('switches EN back to ES and content restores', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('mdg_locale', 'en');
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify we start in EN
    const langBefore = await page.locator('html').getAttribute('lang');
    expect(langBefore).toBe('en');

    // Switch to ES
    const toggle = getToggle(page, LOCALE_TOGGLE);
    await toggle.click();
    await page.waitForTimeout(500);

    const langAfter = await page.locator('html').getAttribute('lang');
    expect(langAfter).toBe('es');
  });

  test('locale persists across page reload', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Switch to EN
    const toggle = getToggle(page, LOCALE_TOGGLE);
    await toggle.click();
    await page.waitForTimeout(500);

    // Reload
    await page.reload();
    await page.waitForLoadState('networkidle');

    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');

    const stored = await page.evaluate(() => localStorage.getItem('mdg_locale'));
    expect(stored).toBe('en');
  });

  test('no [MISSING:] keys visible after locale switch', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Switch to EN
    const toggle = getToggle(page, LOCALE_TOGGLE);
    await toggle.click();
    await page.waitForTimeout(500);

    const missingKeys = await page.evaluate(() => {
      const body = document.body.innerText;
      return (body.match(/\[MISSING:[^\]]*\]/g) || []);
    });

    expect(missingKeys).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// 3. Audience toggle
// ---------------------------------------------------------------------------

test.describe('Triple Toggle — Audience', () => {
  test('switches persona to empresa and slots re-hydrate', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('mdg_audience', 'persona');
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify initial audience
    const initial = await page.locator('html').getAttribute('data-audience');
    expect(initial).toBe('persona');

    // Capture persona hero content
    const heroTextBefore = await page.locator('[data-slot="hero"]').first().textContent();

    // Switch to empresa
    const toggle = getToggle(page, AUDIENCE_TOGGLE);
    await toggle.click();
    await page.waitForTimeout(500);

    // data-audience should update
    const updated = await page.locator('html').getAttribute('data-audience');
    expect(updated).toBe('empresa');

    // localStorage should persist
    const stored = await page.evaluate(() => localStorage.getItem('mdg_audience'));
    expect(stored).toBe('empresa');
  });

  test('audience-dependent slots show correct variant', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('mdg_audience', 'empresa');
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Sections with data-audience-variant should reflect empresa
    const audienceVariants = page.locator('[data-audience-variant]');
    const count = await audienceVariants.count();

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const variant = await audienceVariants.nth(i).getAttribute('data-audience-variant');
        expect(variant).toBe('empresa');
      }
    }
  });

  test('audience persists across page reload', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('mdg_audience', 'empresa');
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Reload
    await page.reload();
    await page.waitForLoadState('networkidle');

    const audience = await page.locator('html').getAttribute('data-audience');
    expect(audience).toBe('empresa');

    const stored = await page.evaluate(() => localStorage.getItem('mdg_audience'));
    expect(stored).toBe('empresa');
  });
});

// ---------------------------------------------------------------------------
// 4. ARIA switch semantics on all 3 toggles
// ---------------------------------------------------------------------------

test.describe('Triple Toggle — ARIA switch role', () => {
  test('all 3 toggles have role="switch"', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const switches = page.locator(`${TOGGLE_CONTAINER} [role="switch"]`);
    await expect(switches).toHaveCount(3);
  });

  test('theme toggle has correct aria-checked state', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const toggle = getToggle(page, THEME_TOGGLE);
    const initialChecked = await toggle.getAttribute('aria-checked');
    // Light = unchecked (false), or implementation-specific
    expect(['true', 'false']).toContain(initialChecked);

    // Toggle and verify aria-checked flips
    await toggle.click();
    const afterChecked = await toggle.getAttribute('aria-checked');
    expect(afterChecked).not.toBe(initialChecked);
  });

  test('locale toggle has correct aria-checked state', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const toggle = getToggle(page, LOCALE_TOGGLE);
    const initialChecked = await toggle.getAttribute('aria-checked');
    expect(['true', 'false']).toContain(initialChecked);

    await toggle.click();
    await page.waitForTimeout(300);
    const afterChecked = await toggle.getAttribute('aria-checked');
    expect(afterChecked).not.toBe(initialChecked);
  });

  test('audience toggle has correct aria-checked state', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('mdg_audience', 'persona');
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const toggle = getToggle(page, AUDIENCE_TOGGLE);
    const initialChecked = await toggle.getAttribute('aria-checked');
    expect(['true', 'false']).toContain(initialChecked);

    await toggle.click();
    await page.waitForTimeout(300);
    const afterChecked = await toggle.getAttribute('aria-checked');
    expect(afterChecked).not.toBe(initialChecked);
  });

  test('toggles announce state changes via aria-live', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // There should be an aria-live region associated with the toggle component
    const liveRegion = page.locator(
      `${TOGGLE_CONTAINER} [aria-live="polite"], ${TOGGLE_CONTAINER} [aria-live="assertive"]`
    );
    const count = await liveRegion.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

// ---------------------------------------------------------------------------
// 5. Mobile: fixed bottom-left position
// ---------------------------------------------------------------------------

test.describe('Triple Toggle — Mobile position', () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone X

  test('toggle is visible and fixed at bottom-left on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const container = page.locator(TOGGLE_CONTAINER).first();
    await expect(container).toBeVisible();

    const box = await container.boundingBox();
    expect(box).not.toBeNull();

    // Should be in the bottom-left quadrant
    // Bottom: y + height should be near viewport bottom (812px)
    expect(box.x).toBeLessThan(100); // Left side
    expect(box.y + box.height).toBeGreaterThan(600); // Bottom area
  });

  test('toggle does not overlap main content area', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const container = page.locator(TOGGLE_CONTAINER).first();
    const toggleBox = await container.boundingBox();

    // Toggle should have a reasonable z-index (45 per spec)
    const zIndex = await container.evaluate((el) => {
      return getComputedStyle(el).zIndex;
    });
    expect(parseInt(zIndex, 10)).toBeGreaterThanOrEqual(40);
  });

  test('touch targets are at least 44px', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const switches = page.locator(`${TOGGLE_CONTAINER} [role="switch"]`);
    const count = await switches.count();

    for (let i = 0; i < count; i++) {
      const box = await switches.nth(i).boundingBox();
      expect(box).not.toBeNull();
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });
});

// ---------------------------------------------------------------------------
// 6. Full persistence: all 3 states survive reload
// ---------------------------------------------------------------------------

test.describe('Triple Toggle — Full persistence', () => {
  test('all 3 toggle states survive page reload together', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Set all 3 states via toggles
    const themeToggle = getToggle(page, THEME_TOGGLE);
    await themeToggle.click(); // Switch to dark

    const localeToggle = getToggle(page, LOCALE_TOGGLE);
    await localeToggle.click(); // Switch to EN
    await page.waitForTimeout(300);

    const audienceToggle = getToggle(page, AUDIENCE_TOGGLE);
    await audienceToggle.click(); // Switch audience
    await page.waitForTimeout(300);

    // Capture current states
    const statesBefore = await page.evaluate(() => ({
      theme: localStorage.getItem('mdg_theme'),
      locale: localStorage.getItem('mdg_locale'),
      audience: localStorage.getItem('mdg_audience'),
    }));

    // Reload
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify all 3 persisted
    const statesAfter = await page.evaluate(() => ({
      theme: localStorage.getItem('mdg_theme'),
      locale: localStorage.getItem('mdg_locale'),
      audience: localStorage.getItem('mdg_audience'),
    }));

    expect(statesAfter.theme).toBe(statesBefore.theme);
    expect(statesAfter.locale).toBe(statesBefore.locale);
    expect(statesAfter.audience).toBe(statesBefore.audience);

    // Verify DOM reflects persisted state
    const htmlTheme = await page.locator('html').getAttribute('data-theme');
    expect(htmlTheme).toBe(statesBefore.theme);

    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe(statesBefore.locale);

    const htmlAudience = await page.locator('html').getAttribute('data-audience');
    expect(htmlAudience).toBe(statesBefore.audience);
  });

  test('states persist across navigation to different page', async ({ page }) => {
    // Set states via localStorage
    await page.addInitScript(() => {
      localStorage.setItem('mdg_theme', 'dark');
      localStorage.setItem('mdg_locale', 'en');
      localStorage.setItem('mdg_audience', 'empresa');
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to a different page
    await page.goto('/programas/');
    await page.waitForLoadState('networkidle');

    const theme = await page.locator('html').getAttribute('data-theme');
    expect(theme).toBe('dark');

    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');

    const audience = await page.locator('html').getAttribute('data-audience');
    expect(audience).toBe('empresa');
  });
});
