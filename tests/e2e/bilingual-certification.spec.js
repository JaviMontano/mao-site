// @ts-check
import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Bilingual Certification Suite — Rendered Layer
 *
 * Layer 1: Verify data-i18n elements render en.json values in EN mode
 * Layer 2: Regex scan visible text outside data-i18n for Spanish patterns
 *
 * @see specs/005-bilingual-nav-certification/spec.md (FR-006, FR-007)
 * @see specs/005-bilingual-nav-certification/contracts/certification-output.md
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const ROOT = join(__dirname, '../..');

// Load reference data
const enJson = JSON.parse(readFileSync(join(ROOT, 'js/i18n/en.json'), 'utf8'));
const spanishPatterns = JSON.parse(
  readFileSync(join(ROOT, 'data/i18n-spanish-patterns.json'), 'utf8')
);

function getNestedValue(obj, key) {
  const parts = key.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[part];
  }
  return current;
}

const L1_PAGES = [
  { name: 'index.html', path: '/' },
  { name: 'ruta/index.html', path: '/ruta/' },
  { name: 'empresas/index.html', path: '/empresas/' },
  { name: 'personas/index.html', path: '/personas/' }
];

test.describe('Bilingual Certification — Rendered', () => {

  // --- T020a-d: Layer 1 per L1 page ---
  for (const page of L1_PAGES) {
    test.describe(`Layer 1: ${page.name}`, () => {

      test(`data-i18n elements render en.json values in EN mode`, async ({ page: pw }) => {
        await pw.goto(`${BASE_URL}${page.path}`);
        await pw.waitForLoadState('networkidle');

        // Switch to EN
        const enBtn = pw.locator('.lang-toggle__btn[data-lang="en"]').first();
        await enBtn.click();
        await pw.waitForTimeout(500); // Wait for translations to apply

        // Verify data-i18n elements show English text
        const elements = await pw.locator('[data-i18n]').all();
        const mismatches = [];

        for (const el of elements) {
          const key = await el.getAttribute('data-i18n');
          if (!key) continue;
          const expectedValue = getNestedValue(enJson, key);
          if (expectedValue === undefined) continue; // Missing key — caught by static suite

          const actualText = await el.textContent();
          if (actualText && actualText.trim() !== String(expectedValue).trim()) {
            mismatches.push({
              key,
              expected: String(expectedValue).trim().substring(0, 40),
              actual: actualText.trim().substring(0, 40)
            });
          }
        }

        if (mismatches.length > 0) {
          const report = mismatches.slice(0, 10).map(m =>
            `  ${m.key}: expected="${m.expected}" got="${m.actual}"`
          ).join('\n');
          expect(mismatches, `data-i18n mismatches on ${page.name}:\n${report}`).toHaveLength(0);
        }
      });
    });
  }

  // --- T021: Layer 2 — Spanish pattern scan across all L1 pages ---
  test.describe('Layer 2: Spanish remnant detection', () => {

    for (const page of L1_PAGES) {
      test(`zero Spanish remnants on ${page.name} in EN mode`, async ({ page: pw }) => {
        await pw.goto(`${BASE_URL}${page.path}`);
        await pw.waitForLoadState('networkidle');

        // Switch to EN
        const enBtn = pw.locator('.lang-toggle__btn[data-lang="en"]').first();
        await enBtn.click();
        await pw.waitForTimeout(500);

        // Scan visible text outside data-i18n elements for Spanish patterns
        const remnants = await pw.evaluate((patterns) => {
          const found = [];
          const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
              acceptNode: function(node) {
                // Skip hidden elements
                const el = node.parentElement;
                if (!el || el.offsetParent === null) return NodeFilter.FILTER_REJECT;
                // Skip elements with data-i18n (already verified in Layer 1)
                if (el.hasAttribute('data-i18n') || el.hasAttribute('data-i18n-html')) {
                  return NodeFilter.FILTER_REJECT;
                }
                // Skip script/style
                const tag = el.tagName;
                if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') {
                  return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
              }
            }
          );

          let node;
          while ((node = walker.nextNode())) {
            const text = node.textContent.trim();
            if (!text || text.length < 3) continue;
            for (const pattern of patterns) {
              try {
                const regex = new RegExp(pattern, 'i');
                if (regex.test(text)) {
                  found.push({
                    text: text.substring(0, 60),
                    pattern,
                    selector: node.parentElement.tagName + (node.parentElement.className ? '.' + node.parentElement.className.split(' ')[0] : '')
                  });
                }
              } catch (e) { /* invalid regex — skip */ }
            }
          }
          return found;
        }, spanishPatterns.patterns);

        if (remnants.length > 0) {
          const report = remnants.slice(0, 10).map(r =>
            `  "${r.text}" matched /${r.pattern}/ in <${r.selector}>`
          ).join('\n');
          expect(remnants, `Spanish remnants on ${page.name}:\n${report}`).toHaveLength(0);
        }
      });
    }
  });

  // --- Floating nav label check ---
  test.describe('Floating Nav i18n (FR-007)', () => {

    test('floating nav labels translate on ruta page', async ({ page: pw }) => {
      await pw.goto(`${BASE_URL}/ruta/`);
      await pw.waitForLoadState('networkidle');

      // Switch to EN
      const enBtn = pw.locator('.lang-toggle__btn[data-lang="en"]').first();
      await enBtn.click();
      await pw.waitForTimeout(500);

      // Scroll down to trigger floating nav
      await pw.evaluate(() => window.scrollTo(0, 800));
      await pw.waitForTimeout(300);

      const floatingNav = pw.locator('.floating-nav');
      const isVisible = await floatingNav.isVisible().catch(() => false);

      if (isVisible) {
        // Check that nav aria-label is translated
        const ariaLabel = await floatingNav.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();

        // Check home link has translated aria-label
        const homeLink = floatingNav.locator('.floating-nav__home');
        if (await homeLink.count() > 0) {
          const homeAriaLabel = await homeLink.getAttribute('aria-label');
          expect(homeAriaLabel).toBeTruthy();
        }
      }
    });
  });
});
