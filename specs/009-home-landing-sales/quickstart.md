# Quickstart — 009-home-landing-sales (v3)

Hands-on walkthrough for the home v2 landing + 13-page shell scaffolding. Validates the three CTAs, responsive fold, i18n, offline pill, adaptive blueprint matrix, and the diagnostic end-to-end — locally against Firebase Emulator and against the deployed site.

## Prereqs

- Node 20+ and `npm ci`
- Firebase CLI (`firebase-tools`) logged in for emulator
- Playwright browsers installed: `npx playwright install`
- Branch: `009-home-landing-sales` checked out from `staging`

## Local dev loop

```bash
# 1. Tailwind watch (if changes to estilos/)
npx tailwindcss -i estilos/tailwind.css -o dist/output.css --watch &

# 2. Serve static root
npx serve . -l 3000

# 3. In a second terminal — Firebase emulator suite
firebase emulators:start --only firestore,auth,storage

# 4. Seed the emulator (programs, resources, testimonials)
node scripts/seed.js --emulator --apply

# 5. Open the home
open http://localhost:3000/
```

## Manual validation matrix

Run each of these by hand before flipping `/iikit-05-tasks` to `in-progress`.

### A. Fold and CTAs (FR-001..FR-005)

1. Open `http://localhost:3000/` at viewport widths 360, 390, 768, 1024, 1280, 1536.
2. Confirm the primary CTA "Iniciar diagnóstico gratuito" is above the fold at every width.
3. Confirm the secondary CTA "Explorar recursos gratis" renders with subordinate weight.
4. Confirm the tertiary CTA (programas) is **not** in the hero — it belongs to the "Programas activos" section.
5. Confirm the closing section before the footer repeats the 3 CTAs.

### B. Responsive (FR-050..FR-057)

1. Rotate DevTools to landscape mobile (844×390). CTA primario must still be visible without scroll.
2. Scroll through every viewport; `document.documentElement.scrollWidth` must equal `clientWidth` (no horizontal scroll).
3. On iPhone simulator: confirm safe-area insets are honored (no overlap with Dynamic Island).

### C. Design system (FR-040..FR-045)

1. Compare side-by-side with `workspace/.../cartilla-onboarding-programa-v11.html` — background tones, gold accents, typography must match.
2. Toggle theme via header button — confirm dark mirror colors, `localStorage.mdg_theme` updates.
3. Reload the page — theme persists; with `localStorage.clear()`, theme falls back to `prefers-color-scheme`.

### D. i18n (FR-060)

1. Switch language ES → EN via header toggle. Every `data-i18n` node updates.
2. Confirm no raw i18n keys remain in the DOM (`document.body.innerText` should not match `/^home\.[a-z_.]+$/m`).

### E. Offline pill (FR-097..FR-099)

1. In DevTools, block `firestore.googleapis.com` via Network conditions.
2. Reload. The `offline` pill must appear within 3 seconds with `aria-live="polite"`.
3. Unblock Firestore and trigger a cache revalidation; pill must transition to `syncing` then disappear.

### F. Diagnóstico end-to-end (FR-010..FR-017, §4.5)

1. Click "Iniciar diagnóstico gratuito".
2. Answer steps 1..5 with any combo; progress bar must update `1/6 → 5/6`.
3. At step 6, enter `qa@metodologia.info`, name `QA Tester`, check the consent box.
4. Submit → confirm the result screen shows a level + recommendation matching the scoring table in `contracts/diagnostic-logic.json`.
5. Open Firebase emulator UI (`http://localhost:4000/firestore`) — confirm one new `leads/{uid}` and one `diagnostics/{uid}` with `status: "completed"`.
6. Close the tab without completing another diagnostic. Reload within 24h — the started state should resume from `localStorage` (FR-014).

### G. Degraded / no-JS (FR-063, FR-015)

1. Disable JS in DevTools. Reload. The home must still render a navigable fallback linking to `/diagnostico/`, `/recursos/`, `/empresas/`, `/personas/`.
2. With JS on but Firestore blocked at step 6, confirm the mailto fallback appears with a clear message.

## Automated validation (→ `npm test` shortcuts)

```bash
# Unit (pure modules — NFR-008 weighted layered)
npx vitest run tests/unit/diagnostic-logic.spec.js
npx vitest run tests/unit/analytics-events.spec.js
npx vitest run tests/unit/audience-state.spec.js
npx vitest run tests/unit/i18n-resolver.spec.js

# Integration (emulator must be running)
npx vitest run tests/integration/security-rules.spec.js

# E2E core (dev server must be running at :3000, emulator at :4000)
npx playwright test tests/e2e/home.spec.js
npx playwright test tests/e2e/offline.spec.js
npx playwright test tests/e2e/diagnostic.spec.js

# E2E adaptive blueprint (52-combo matrix, NFR-012 budget <3min)
npx playwright test tests/e2e/adaptive-blueprint.spec.js

# E2E independent flows (robustness-v1.md §E)
npx playwright test tests/e2e/flow-linkedin-b2b.spec.js
npx playwright test tests/e2e/flow-mobile-flaky.spec.js
npx playwright test tests/e2e/flow-keyboard-a11y.spec.js
npx playwright test tests/e2e/flow-seo-crawler.spec.js
npx playwright test tests/e2e/flow-lgpd-audit.spec.js
npx playwright test tests/e2e/flow-theme-chaos.spec.js
npx playwright test tests/e2e/flow-social-share.spec.js
npx playwright test tests/e2e/seed-roundtrip.spec.js

# BDD features (ATDD outer loop — NFR-009)
npx cucumber-js tests/features/
```

## Deploy verification (after PR to `main` + SSH git pull)

```bash
ssh -p 65002 u363367449@156.67.75.195 \
  "cd domains/metodologia.info/public_html && git pull origin main"

# purge caches in hPanel + CDN, then:
npx playwright test tests/e2e/home-responsive.spec.js --config=playwright.prod.config.js
```

Validate on https://metodologia.info/ :
- Lighthouse mobile LCP ≤2.5s, TBT <200ms, CLS <0.1
- `curl -s https://metodologia.info/ | grep -c 'data-i18n'` > 30
- `document.querySelector('site-header')?.shadowRoot` renders Neo-Swiss tokens

## Rollback

1. Revert the merge commit on `main`.
2. SSH + `git pull`.
3. Purge caches.
4. Incident log entry in `insights/incidents/`.
