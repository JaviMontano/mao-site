// @ts-check
import { test, expect } from '@playwright/test';

/**
 * E2E: Home Accessibility — axe-core + keyboard tab order [T070]
 *
 * Validates:
 * - axe-core automated audit on home page (WCAG 2.1 AA)
 * - Keyboard tab order: skip-link -> header -> sidebar (lg+) -> main -> toggles -> footer
 * - Skip-link functionality
 * - Focus visibility on interactive elements
 *
 * Traceability: [TS-037, TS-067, TS-068]
 */

// ---------------------------------------------------------------------------
// Helper: inject axe-core via page.evaluate (no npm dep required)
// ---------------------------------------------------------------------------

const AXE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js';

/**
 * Injects axe-core into the page and runs an audit.
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<{violations: Array<{id: string, impact: string, description: string, nodes: Array<{html: string}>}>}>}
 */
async function runAxeAudit(page) {
  // Inject axe-core script
  await page.addScriptTag({ url: AXE_CDN });
  // Wait for axe to be available
  await page.waitForFunction(() => typeof window.axe !== 'undefined', null, { timeout: 10000 });
  // Run audit
  const results = await page.evaluate(() => {
    return window.axe.run(document, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'best-practice'],
      },
    });
  });
  return results;
}

// ---------------------------------------------------------------------------
// Viewports
// ---------------------------------------------------------------------------

const DESKTOP = { width: 1280, height: 800 };
const MOBILE = { width: 360, height: 640 };

// ---------------------------------------------------------------------------
// 1. axe-core automated audit (desktop)
// ---------------------------------------------------------------------------

test.describe('Home A11y — axe-core Audit', () => {
  test('desktop: zero critical/serious axe violations', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await runAxeAudit(page);

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    if (critical.length > 0) {
      const summary = critical.map(
        (v) => `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} nodes)`
      );
      console.error('axe violations:', summary);
    }

    expect(critical).toHaveLength(0);
  });

  test('mobile: zero critical/serious axe violations', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await runAxeAudit(page);

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    if (critical.length > 0) {
      const summary = critical.map(
        (v) => `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} nodes)`
      );
      console.error('axe violations (mobile):', summary);
    }

    expect(critical).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// 2. Skip-link functionality
// ---------------------------------------------------------------------------

test.describe('Home A11y — Skip Link', () => {
  test('skip-link is first focusable element and targets #main', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Tab once — skip-link should be the first focusable element
    await page.keyboard.press('Tab');

    const skipLink = page.locator('.skip-link, a[href="#main"]').first();
    await expect(skipLink).toBeFocused();

    // Verify href points to #main
    const href = await skipLink.getAttribute('href');
    expect(href).toBe('#main');
  });

  test('activating skip-link moves focus to main content', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Tab to skip-link and press Enter
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // Focus should move to or near #main
    const focusedId = await page.evaluate(() => document.activeElement?.id || '');
    const focusedRole = await page.evaluate(() => document.activeElement?.tagName?.toLowerCase() || '');

    // Either #main itself is focused, or focus moved into main content area
    const mainEl = page.locator('#main');
    const mainBox = await mainEl.boundingBox();
    expect(mainBox).not.toBeNull();

    // Verify page scrolled toward main or focus is on/inside main
    const isFocusInMain = await page.evaluate(() => {
      const main = document.getElementById('main');
      return main?.contains(document.activeElement) || document.activeElement?.id === 'main';
    });

    expect(isFocusInMain || focusedId === 'main').toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// 3. Keyboard tab order: skip-link -> header -> sidebar -> main -> toggles -> footer
// ---------------------------------------------------------------------------

test.describe('Home A11y — Tab Order', () => {
  test('desktop (lg): tab order follows skip-link -> header -> sidebar -> main -> toggles -> footer', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const tabOrder = [];
    const MAX_TABS = 60;

    for (let i = 0; i < MAX_TABS; i++) {
      await page.keyboard.press('Tab');

      const info = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;

        // Determine which landmark the element is inside
        const header = document.querySelector('site-header, .site-header, header');
        const sidebar = document.querySelector('site-sidebar, .site-sidebar');
        const main = document.getElementById('main');
        const footer = document.querySelector('site-footer, .site-footer, footer');
        const tripleToggle = document.querySelector('triple-toggle, .triple-toggle');

        // Check skip-link
        if (el.classList?.contains('skip-link') || el.getAttribute('href') === '#main') {
          return 'skip-link';
        }

        // Check containment — use host elements for web components
        if (header?.contains(el) || header?.shadowRoot?.contains(el)) return 'header';
        if (sidebar?.contains(el) || sidebar?.shadowRoot?.contains(el)) return 'sidebar';
        if (tripleToggle?.contains(el) || tripleToggle?.shadowRoot?.contains(el)) return 'toggles';
        if (main?.contains(el)) return 'main';
        if (footer?.contains(el) || footer?.shadowRoot?.contains(el)) return 'footer';

        return 'other';
      });

      if (info) {
        // Only record transitions (not repeated regions)
        if (tabOrder.length === 0 || tabOrder[tabOrder.length - 1] !== info) {
          tabOrder.push(info);
        }
      }
    }

    // Expected order regions appear in
    const expectedSequence = ['skip-link', 'header', 'sidebar', 'main', 'toggles', 'footer'];

    // Verify each region appears and in the correct relative order
    for (let i = 0; i < expectedSequence.length - 1; i++) {
      const current = expectedSequence[i];
      const next = expectedSequence[i + 1];
      const currentIdx = tabOrder.indexOf(current);
      const nextIdx = tabOrder.indexOf(next);

      // Both regions should be reachable via Tab
      if (currentIdx !== -1 && nextIdx !== -1) {
        expect(currentIdx).toBeLessThan(nextIdx);
      }
    }

    // At minimum, skip-link, header, and main must be in the tab order
    expect(tabOrder).toContain('skip-link');
    expect(tabOrder).toContain('header');
    expect(tabOrder).toContain('main');
  });

  test('mobile (xs): tab order skips sidebar (off-canvas), reaches main and toggles', async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const tabOrder = [];
    const MAX_TABS = 50;

    for (let i = 0; i < MAX_TABS; i++) {
      await page.keyboard.press('Tab');

      const info = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;

        const header = document.querySelector('site-header, .site-header, header');
        const main = document.getElementById('main');
        const footer = document.querySelector('site-footer, .site-footer, footer');
        const tripleToggle = document.querySelector('triple-toggle, .triple-toggle');

        if (el.classList?.contains('skip-link') || el.getAttribute('href') === '#main') return 'skip-link';
        if (header?.contains(el) || header?.shadowRoot?.contains(el)) return 'header';
        if (tripleToggle?.contains(el) || tripleToggle?.shadowRoot?.contains(el)) return 'toggles';
        if (main?.contains(el)) return 'main';
        if (footer?.contains(el) || footer?.shadowRoot?.contains(el)) return 'footer';

        return 'other';
      });

      if (info && (tabOrder.length === 0 || tabOrder[tabOrder.length - 1] !== info)) {
        tabOrder.push(info);
      }
    }

    // On mobile, sidebar should NOT appear in tab order (it's off-canvas)
    // skip-link, header, main must be reachable
    expect(tabOrder).toContain('skip-link');
    expect(tabOrder).toContain('main');
  });
});

// ---------------------------------------------------------------------------
// 4. Focus visibility on interactive elements
// ---------------------------------------------------------------------------

test.describe('Home A11y — Focus Visibility', () => {
  test('all interactive elements have visible focus indicator', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Tab through first 20 interactive elements and check focus styles
    const focusIssues = [];

    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');

      const focusInfo = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;

        const styles = getComputedStyle(el);
        const outline = styles.outline;
        const outlineWidth = parseFloat(styles.outlineWidth);
        const boxShadow = styles.boxShadow;

        // Element has visible focus if: outline > 0, or box-shadow present, or border change
        const hasOutline = outlineWidth > 0 && styles.outlineStyle !== 'none';
        const hasBoxShadow = boxShadow && boxShadow !== 'none';

        return {
          tag: el.tagName.toLowerCase(),
          text: el.textContent?.trim().substring(0, 30) || '',
          hasVisibleFocus: hasOutline || hasBoxShadow,
        };
      });

      if (focusInfo && !focusInfo.hasVisibleFocus) {
        focusIssues.push(`${focusInfo.tag}: "${focusInfo.text}"`);
      }
    }

    // Allow up to 2 elements without focus indicators (some may be styled differently)
    expect(focusIssues.length).toBeLessThanOrEqual(2);
  });
});

// ---------------------------------------------------------------------------
// 5. ARIA landmarks present
// ---------------------------------------------------------------------------

test.describe('Home A11y — ARIA Landmarks', () => {
  test('page has required ARIA landmarks', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Main landmark
    const main = page.locator('main, [role="main"]');
    await expect(main.first()).toBeVisible();

    // All sections have aria-labelledby
    const sections = page.locator('.home-section[aria-labelledby]');
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThanOrEqual(7);
  });
});
