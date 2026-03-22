# Quickstart: Sitewide UX/UI Polish

**Branch**: `003-sitewide-ux-polish`

## Setup

```bash
# Already on the feature branch
git checkout 003-sitewide-ux-polish

# Install dependencies (Playwright + Tailwind)
npm install

# Start local server (required for Playwright tests)
npx http-server . -p 8765 -c-1 &

# Build Tailwind CSS
npm run build:css
```

## Test Scenarios

### TS-1: Language Toggle Visibility (FR-001, FR-002)
1. Open `http://localhost:8765/index.html` on desktop (≥1024px)
2. Verify ES/EN toggle is visible in the right section of the nav bar
3. Resize to mobile (≤768px), open hamburger menu
4. Verify toggle is visible and tappable in mobile menu

### TS-2: Zero Layout Shift on Language Switch (FR-003)
1. Open any page, open DevTools Performance panel
2. Click EN toggle, observe CLS metric
3. Expected: CLS delta = 0.000

### TS-3: Bilingual Hero Coverage (FR-004, FR-005)
1. Navigate to homepage, switch to EN
2. Verify hero title, subtitle, badge, CTAs display in English
3. Repeat for empresas/, personas/, ruta/, recursos/, contacto/
4. Verify zero Spanish text remains in visible content

### TS-4: Floating Nav Exclusion (FR-006)
1. Open homepage, scroll past main nav
2. Verify floating nav appears with section links
3. Verify hook-quote text is NOT listed as a floating nav item
4. Verify quote still renders at its position on the page

### TS-5: Dead Link Elimination (FR-007)
1. Run: `grep -r 'href="#"' --include="*.html" . | grep -v archivado | grep -v estandares | grep -v .specify`
2. Expected: zero matches on public pages

### TS-6: Missing Assets (FR-008, FR-013)
1. Open DevTools Network tab, navigate through all pages
2. Verify zero 404 errors
3. Specifically check: `data/business-logic.json` loads on ruta/ pages

### TS-7: Visual Consistency (FR-009, FR-010)
1. Compare card rows on empresas/ and personas/ — all same style
2. Check text+visual sections follow zigzag pattern

### TS-8: Deprecated Meta Tags (FR-012)
1. Open any page, check console for deprecation warnings
2. Run: `grep -r 'apple-mobile-web-app-capable' --include="*.html" .`
3. Expected: zero matches

## Automated Tests

```bash
# Run existing bilingual test suites
npx playwright test tests/19-bilingual-foundation.spec.js
npx playwright test tests/20-bilingual-header-footer.spec.js
npx playwright test tests/21-bilingual-core-pages.spec.js
npx playwright test tests/22-bilingual-bibliotecas.spec.js
npx playwright test tests/24-bilingual-product-pages.spec.js
npx playwright test tests/25-bilingual-remaining.spec.js

# Run all tests
npx playwright test
```
