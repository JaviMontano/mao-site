// @ts-check
import { test, expect } from '@playwright/test';

/**
 * E2E: Sidebar Navigation [T039]
 *
 * Tests the SiteSidebar component:
 * - Scroll-spy: scrolling to a section updates active state in sidebar
 * - Active state tracking: `.is-active` class on correct link
 * - Mobile drawer: hamburger opens, backdrop closes, Escape closes
 * - Section click: scrolls to section with header offset
 * - 12 pages have sidebar (404 does not)
 *
 * Traceability: [TS-093, TS-094, TS-095, TS-096, TS-097, TS-098]
 */

/** Pages that MUST have a sidebar (all except 404) */
const PAGES_WITH_SIDEBAR = [
  { slug: 'home', path: '/' },
  { slug: 'diagnostico', path: '/diagnostico/' },
  { slug: 'empresas', path: '/empresas/' },
  { slug: 'personas', path: '/personas/' },
  { slug: 'programas', path: '/programas/' },
  { slug: 'recursos', path: '/recursos/' },
  { slug: 'metodo', path: '/metodo/' },
  { slug: 'casos', path: '/casos/' },
  { slug: 'nosotros', path: '/nosotros/' },
  { slug: 'insights', path: '/insights/' },
  { slug: 'contacto', path: '/contacto/' },
  { slug: 'legal', path: '/legal/' },
];

// Sidebar selectors (accommodate web component and plain HTML)
const SIDEBAR = 'site-sidebar, .site-sidebar, nav.site-sidebar';
const SIDEBAR_LINK = 'site-sidebar a, .site-sidebar a';
const SIDEBAR_ACTIVE_LINK = 'site-sidebar a.is-active, .site-sidebar a.is-active, site-sidebar a[aria-current="true"], .site-sidebar a[aria-current="true"]';
const HAMBURGER = '[data-sidebar-toggle], .sidebar-hamburger, .hamburger-sidebar, button[aria-controls*="sidebar"]';
const BACKDROP = '.sidebar-backdrop, .site-sidebar-backdrop, [data-sidebar-backdrop]';
const DRAWER = 'site-sidebar.is-open, .site-sidebar.is-open, site-sidebar[open], .site-sidebar[open]';

// ---------------------------------------------------------------------------
// 1. Sidebar presence on 12 pages, absent on 404
// ---------------------------------------------------------------------------

test.describe('Sidebar — Presence on all canonical pages', () => {
  for (const pg of PAGES_WITH_SIDEBAR) {
    test(`sidebar renders on ${pg.slug} (${pg.path})`, async ({ page }) => {
      await page.goto(pg.path);
      await page.waitForLoadState('networkidle');

      const sidebar = page.locator(SIDEBAR);
      await expect(sidebar.first()).toBeVisible();

      // Should contain navigation links
      const links = page.locator(SIDEBAR_LINK);
      const count = await links.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  }

  test('sidebar is absent on 404 page', async ({ page }) => {
    await page.goto('/404.html');
    await page.waitForLoadState('networkidle');

    const sidebar = page.locator(SIDEBAR);
    await expect(sidebar).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// 2. Scroll-spy: scrolling updates active state
// ---------------------------------------------------------------------------

test.describe('Sidebar — Scroll-spy', () => {
  test('scrolling to a section highlights the corresponding sidebar link', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get all sections that scroll-spy targets
    const sections = page.locator('main section[id], main [data-section]');
    const sectionCount = await sections.count();

    if (sectionCount < 2) {
      test.skip(true, 'Not enough sections to test scroll-spy');
      return;
    }

    // Scroll to the second section
    const secondSection = sections.nth(1);
    const sectionId = await secondSection.getAttribute('id');
    await secondSection.scrollIntoViewIfNeeded();

    // Wait for IntersectionObserver to fire
    await page.waitForTimeout(500);

    // Check that the active link corresponds to the scrolled section
    const activeLink = page.locator(SIDEBAR_ACTIVE_LINK);
    const activeLinkCount = await activeLink.count();
    expect(activeLinkCount).toBeGreaterThanOrEqual(1);

    if (sectionId) {
      const activeHref = await activeLink.first().getAttribute('href');
      expect(activeHref).toContain(sectionId);
    }
  });

  test('scrolling to a different section updates the active link', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const sections = page.locator('main section[id], main [data-section]');
    const sectionCount = await sections.count();

    if (sectionCount < 3) {
      test.skip(true, 'Not enough sections to test scroll-spy transitions');
      return;
    }

    // Scroll to section 2
    await sections.nth(1).scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const firstActive = await page.locator(SIDEBAR_ACTIVE_LINK).first().getAttribute('href');

    // Scroll to section 3
    await sections.nth(2).scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const secondActive = await page.locator(SIDEBAR_ACTIVE_LINK).first().getAttribute('href');

    // Active link should have changed
    expect(secondActive).not.toBe(firstActive);
  });

  test('only one link has is-active at a time', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll down to trigger scroll-spy
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);

    const activeLinks = page.locator(SIDEBAR_ACTIVE_LINK);
    const count = await activeLinks.count();
    expect(count).toBeLessThanOrEqual(1);
  });
});

// ---------------------------------------------------------------------------
// 3. Active state tracking: .is-active class
// ---------------------------------------------------------------------------

test.describe('Sidebar — Active state class', () => {
  test('.is-active class is applied to the correct sidebar link on load', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // On initial load, the first section should be active
    const activeLink = page.locator(SIDEBAR_ACTIVE_LINK);
    const count = await activeLink.count();

    // At least one link should be active after page load
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('is-active class moves when clicking a different sidebar link', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const links = page.locator(SIDEBAR_LINK);
    const linkCount = await links.count();

    if (linkCount < 2) {
      test.skip(true, 'Not enough sidebar links');
      return;
    }

    // Click the second sidebar link
    await links.nth(1).click();
    await page.waitForTimeout(800); // Wait for scroll + IntersectionObserver

    // The clicked link (or its target section's link) should now be active
    const activeLink = page.locator(SIDEBAR_ACTIVE_LINK);
    await expect(activeLink.first()).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// 4. Section click: scrolls to section with header offset
// ---------------------------------------------------------------------------

test.describe('Sidebar — Section click navigation', () => {
  test('clicking a sidebar link scrolls to the target section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const links = page.locator(SIDEBAR_LINK);
    const linkCount = await links.count();

    if (linkCount < 2) {
      test.skip(true, 'Not enough sidebar links');
      return;
    }

    // Get the href of the second link
    const href = await links.nth(1).getAttribute('href');
    const targetId = href?.replace('#', '');

    // Click the second link
    await links.nth(1).click();
    await page.waitForTimeout(800); // Smooth scroll

    if (targetId) {
      const targetSection = page.locator(`#${targetId}, [data-section="${targetId}"]`).first();
      const isVisible = await targetSection.isVisible();
      expect(isVisible).toBe(true);

      // Verify the section is scrolled into view with header offset
      const sectionTop = await targetSection.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top;
      });

      // Section top should be near the viewport top, accounting for fixed header
      // Header height is 72px per spec (--header-h: 72px)
      // Allow some tolerance: section top should be between -20 and 120
      expect(sectionTop).toBeGreaterThan(-20);
      expect(sectionTop).toBeLessThan(120);
    }
  });

  test('scroll position accounts for fixed header offset', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const links = page.locator(SIDEBAR_LINK);
    const linkCount = await links.count();

    if (linkCount < 2) {
      test.skip(true, 'Not enough sidebar links');
      return;
    }

    // Click the last link to ensure we scroll far
    await links.last().click();
    await page.waitForTimeout(800);

    const href = await links.last().getAttribute('href');
    const targetId = href?.replace('#', '');

    if (targetId) {
      const sectionTop = await page.locator(`#${targetId}, [data-section="${targetId}"]`).first().evaluate((el) => {
        return el.getBoundingClientRect().top;
      });

      // Should not be hidden behind the header (header is 72px)
      expect(sectionTop).toBeGreaterThanOrEqual(0);
    }
  });
});

// ---------------------------------------------------------------------------
// 5. Mobile drawer: open, backdrop close, Escape close
// ---------------------------------------------------------------------------

test.describe('Sidebar — Mobile drawer', () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone X

  test('sidebar is hidden by default on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Sidebar should exist but not be visible as an overlay
    const sidebar = page.locator(SIDEBAR).first();
    const isVisible = await sidebar.isVisible().catch(() => false);

    // On mobile, sidebar should either be hidden or off-screen
    if (isVisible) {
      const box = await sidebar.boundingBox();
      // If visible, it should be off-screen (left < 0)
      if (box) {
        expect(box.x + box.width).toBeLessThanOrEqual(0);
      }
    }
  });

  test('hamburger button opens the sidebar drawer', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburger = page.locator(HAMBURGER).first();
    await expect(hamburger).toBeVisible();

    await hamburger.click();
    await page.waitForTimeout(300); // Animation

    // Sidebar should now be visible
    const drawer = page.locator(`${DRAWER}, ${SIDEBAR}`).first();
    await expect(drawer).toBeVisible();

    // Drawer should be on-screen
    const box = await drawer.boundingBox();
    expect(box).not.toBeNull();
    expect(box.x).toBeGreaterThanOrEqual(0);
  });

  test('backdrop click closes the sidebar drawer', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Open drawer
    const hamburger = page.locator(HAMBURGER).first();
    await hamburger.click();
    await page.waitForTimeout(300);

    // Backdrop should be visible
    const backdrop = page.locator(BACKDROP).first();
    const backdropVisible = await backdrop.isVisible().catch(() => false);

    if (backdropVisible) {
      await backdrop.click();
      await page.waitForTimeout(300);

      // Sidebar should be closed
      const drawerAfter = page.locator(DRAWER);
      await expect(drawerAfter).toHaveCount(0);
    } else {
      // If no explicit backdrop, click outside the sidebar
      await page.click('main', { position: { x: 300, y: 400 } });
      await page.waitForTimeout(300);
    }
  });

  test('Escape key closes the sidebar drawer', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Open drawer
    const hamburger = page.locator(HAMBURGER).first();
    await hamburger.click();
    await page.waitForTimeout(300);

    // Verify drawer is open
    const drawer = page.locator(`${DRAWER}, ${SIDEBAR}`).first();
    await expect(drawer).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // Drawer should be closed — either removed from DOM or off-screen
    const drawerAfterEscape = page.locator(DRAWER);
    const count = await drawerAfterEscape.count();

    if (count > 0) {
      // If still in DOM, should be off-screen
      const box = await drawerAfterEscape.first().boundingBox();
      if (box) {
        expect(box.x + box.width).toBeLessThanOrEqual(0);
      }
    }
  });

  test('hamburger has correct aria attributes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburger = page.locator(HAMBURGER).first();

    // Should have aria-expanded
    const expanded = await hamburger.getAttribute('aria-expanded');
    expect(expanded).toBe('false');

    // Open drawer
    await hamburger.click();
    await page.waitForTimeout(300);

    const expandedAfter = await hamburger.getAttribute('aria-expanded');
    expect(expandedAfter).toBe('true');

    // Should have aria-controls pointing to sidebar
    const controls = await hamburger.getAttribute('aria-controls');
    expect(controls).toBeTruthy();
  });

  test('focus is trapped inside open drawer', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Open drawer
    const hamburger = page.locator(HAMBURGER).first();
    await hamburger.click();
    await page.waitForTimeout(300);

    // Tab through elements — focus should stay within the sidebar
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      // Check if focused element is inside sidebar
      const sidebar = el.closest('site-sidebar, .site-sidebar, nav.site-sidebar');
      return sidebar ? 'inside-sidebar' : 'outside-sidebar';
    });

    expect(focusedElement).toBe('inside-sidebar');
  });
});

// ---------------------------------------------------------------------------
// 6. Sidebar re-renders on locale change
// ---------------------------------------------------------------------------

test.describe('Sidebar — Locale integration', () => {
  test('sidebar labels update when locale changes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Capture Spanish sidebar text
    const esLabels = await page.evaluate(() => {
      const links = document.querySelectorAll('site-sidebar a, .site-sidebar a');
      return Array.from(links).map((a) => a.textContent.trim());
    });

    // Switch to EN
    await page.evaluate(() => {
      localStorage.setItem('mdg_locale', 'en');
      window.dispatchEvent(new CustomEvent('mdg:state-changed', {
        detail: { key: 'locale', value: 'en' },
      }));
    });
    await page.waitForTimeout(500);

    // Capture English sidebar text
    const enLabels = await page.evaluate(() => {
      const links = document.querySelectorAll('site-sidebar a, .site-sidebar a');
      return Array.from(links).map((a) => a.textContent.trim());
    });

    // Labels should have changed (unless identical in both languages)
    if (esLabels.length > 0 && enLabels.length > 0) {
      const allSame = esLabels.every((label, i) => label === enLabels[i]);
      expect(allSame).toBe(false);
    }
  });

  test('no [MISSING:] keys in sidebar labels after locale change', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Switch to EN
    await page.evaluate(() => {
      localStorage.setItem('mdg_locale', 'en');
      window.dispatchEvent(new CustomEvent('mdg:state-changed', {
        detail: { key: 'locale', value: 'en' },
      }));
    });
    await page.waitForTimeout(500);

    const sidebarText = await page.evaluate(() => {
      const sidebar = document.querySelector('site-sidebar, .site-sidebar');
      return sidebar ? sidebar.textContent : '';
    });

    expect(sidebarText).not.toContain('[MISSING:');
  });
});
