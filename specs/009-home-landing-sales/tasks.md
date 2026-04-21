# Tasks: Home como Landing Vendedora — Sidebar Architecture v8

**Input**: spec.md (v8), plan.md (v7), data-model.md (v3), contracts/ (3), adaptive-blueprint.md, sitemap.md, 9 .feature files (107 scenarios)
**Branch**: `009-home-landing-sales`
**Total tasks**: 95 | **Per-story**: US-1: 13, US-4: 6, US-5: 5, US-6: 21, US-7: 15, US-2: 4, US-3: 3, US-8: 8, Setup: 6, Foundation: 7, Polish: 7
**Version**: v3 (v2 + sidebar architecture + triple toggle + admin content editor)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[USn]**: Which user story this task belongs to
- **Traceability**: Test spec IDs reference `.feature` tags (TS-001..TS-107)

---

## Phase 1: Setup

**Purpose**: Baseline capture, project structure, tooling, redirect infrastructure

- [x] T001 Capture GA4 baseline for SC-001, SC-002, SC-009 (30-day window) — document in specs/009-home-landing-sales/baseline.md
- [x] T002 [P] Create new directory structure: `js/diagnostic/`, `js/audience/`, `js/analytics/`, `js/theme/`, `js/state/`, `js/blueprint/`, `js/sidebar/`, `js/redirects/`, `diagnostico/`, `metodo/`, `casos/`, `insights/`
- [x] T003 [P] Update `vitest.config.js` with per-module coverage thresholds per NFR-008
- [x] T004 [P] Create pre-commit hook script `scripts/count-pages.js` — enforce exactly 13 canonical pages [TS-057]
- [x] T005 [P] Create `.htaccess` with 17 legacy 301 redirect rules (see plan.md v6 §3 redirect map) [TS-053, TS-054, TS-055, TS-056]
- [x] T006 [P] Add layout tokens to `estilos/variables.css`: `--sidebar-w: 260px; --header-h: 72px; --gutter: clamp(1rem,3vw,2rem); --ease: cubic-bezier(.4,0,.2,1)` [FR-240, FR-242]

**Checkpoint**: Structure ready, baseline documented, .htaccess deployed, layout tokens available

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 7 leaf modules with zero internal dependencies — MUST complete before ANY user story

- [x] T007 [P] Implement `js/state/bus.js` — pub/sub event bus (pure) + unit test `tests/unit/bus.spec.js` (100%) [TS-062]
- [x] T008 [P] Implement `js/diagnostic/logic.js` — scoring + thresholds from `contracts/diagnostic-logic.json` + unit test (100%) [TS-003, TS-004, TS-088, TS-089, TS-090, TS-091, TS-092]
- [x] T009 [P] Implement `js/audience/state.js` — AudienceState 6-level provenance cascade + unit test (≥95%) [TS-043, TS-046]
- [x] T010 [P] Implement `js/theme/toggle.js` — theme switch + localStorage + `prefers-color-scheme` fallback + unit test (≥95%) [TS-032, TS-049]
- [x] T011 [P] Implement `js/redirects/legacy-router.js` — client-side fallback for 17 legacy URLs [TS-053, TS-054, TS-055, TS-056]
- [x] T012 [P] Implement `js/sidebar/scroll-spy.js` — IntersectionObserver module (pure, rootMargin '-40% 0px -50% 0px', threshold 0) + unit test `tests/unit/scroll-spy.spec.js` (100%) [TS-094, TS-095]
- [x] T013 [P] Implement `js/sidebar/sections-config.js` — per-page 7-section definitions (12 pages × 7 = 84 entries, 404 excluded) with icon + i18nKey per entry [TS-093, TS-098]

**Checkpoint**: 7 leaf modules + 7 unit test files — all stories can begin

---

## Phase 3: US-4 — Neo-Swiss Identity (Priority: P1)

**Goal**: Design tokens, critical CSS, visual system + sidebar/header/main layout
**Independent Test**: Side-by-side audit of tokens vs cartilla reference

### Tests

- [x] T014 [P] [US-4] Write E2E `tests/e2e/home-critical-css.spec.js` — first paint without FOUC [TS-063]

### Implementation

- [x] T015 [US-4] Update `estilos/variables.css` — Neo-Swiss Light/Dark token sets (FR-041, FR-042, FR-044) [TS-026, TS-027, TS-028, TS-031]
- [x] T016 [P] [US-4] Create `estilos/critical.css` — hand-authored fold CSS (FR-092, FR-096) [TS-063]
- [x] T017 [US-4] Create `estilos/blueprint.css` — full sidebar + header + main layout system: `.site-header` fixed top, `.site-sidebar` fixed left 260px (off-canvas <960px), `.main` padding-top/left, `.container` max-860px, `.section` with scroll-spy targets. Sidebar drawer + backdrop + hamburger on mobile. [TS-044, TS-045, TS-093]
- [x] T018 [P] [US-4] Create `estilos/sidebar.css` — sidebar nav styles, `is-active` highlight, numbered links, icon alignment, scroll-spy visual feedback [TS-093, TS-094]
- [x] T019 [P] [US-4] Create `estilos/triple-toggle.css` — fixed bottom-left position, translucent pill, 3 stacked buttons, touch targets ≥44px, shadow, z-index 45, no body overlap [TS-099, TS-048]
- [x] T020 [US-4] Update `estilos/home.css` — home v2 layout with Neo-Swiss tokens, clamp() typography, 6-breakpoint grid [TS-029, TS-030, TS-038]

**Checkpoint**: Full layout system + visual tokens ready

---

## Phase 4: US-6 — Adaptive Blueprint + Sidebar + Triple Toggle (Priority: P1)

**Goal**: SiteSidebar + TripleToggle + simplified SiteHeader + shell bootstrap + slot resolution
**Independent Test**: 52-combo matrix (13 pages × 2 locale × 2 audience) — zero raw keys, sidebar on 12 pages

### Tests

- [x] T021 [P] [US-6] Write unit test `tests/unit/slot-resolver.spec.js` — 5-level fallback cascade (≥95%) [TS-048]
- [x] T022 [P] [US-6] Write unit test `tests/unit/triple-toggle.spec.js` — 3 switches, persistence, events (≥95%) [TS-047, TS-099]
- [x] T023 [P] [US-6] Write unit test `tests/unit/sidebar.spec.js` — section rendering, active state, drawer (≥70%) [TS-093, TS-094, TS-096, TS-097]

### Implementation — i18n & Analytics

- [x] T024 [US-6] Create i18n dictionaries: `js/i18n/dictionaries/home.json` (4 variants per slot) + `js/i18n/dictionaries/common.json` (nav 3 items, footer 12 pages, sidebar labels, toggle labels, skip-link, missing-key fallbacks) [TS-048, TS-073]
- [x] T025 [US-6] Add section config i18n keys to `js/i18n/dictionaries/common.json` — 168 keys (84 sections × 2 locales) [TS-098]
- [x] T026 [US-6] Implement `js/analytics/consent.js` — cookie banner logic + `mdg_consent` (two-tier: banner=analytics, PII=checkbox) [TS-075, TS-076, TS-077, TS-078, TS-079]
- [x] T027 [US-6] Implement `js/analytics/events.js` — typed event emitter + consent gating + audience field + `audience_switched` event + unit test (≥95%) [TS-074, TS-075]

### Implementation — Core Shell

- [x] T028 [US-6] Implement `js/blueprint/slot-resolver.js` — 5-level audience/locale fallback cascade, zero raw keys (depends on T009, T024) [TS-048]
- [x] T029 [US-6] Implement `js/blueprint/slug-router.js` — client-side `?slug=X` for 3 dynamic templates (programas/recursos/insights), pre-render top-5 for SEO (depends on T028) [TS-052]
- [x] T030 [US-6] Implement `js/audience/controller.js` — toggle + slot hydration, `data-audience-variant`/`data-audience-filter`, <100ms re-render (depends on T009, T028, T007) [TS-043, TS-047]

### Implementation — Web Components

- [x] T031 [US-6] Create `components/TripleToggle.js` — 3 `role="switch"` toggles (theme/locale/audience), always visible `position:fixed; bottom:1rem; left:1rem; z-index:45`, <100ms transitions, `aria-live` announcements, emit `mdg:state-changed` (depends on T007, T009, T010) [TS-043, TS-047, TS-049, TS-099]
- [x] T032 [US-6] Create `components/SiteSidebar.js` — 7-section numbered nav, scroll-spy integration, mobile drawer (hamburger/backdrop/Escape), re-render on `langchange` (depends on T012, T013, T007) [TS-044, TS-045, TS-093, TS-094, TS-095, TS-096, TS-097, TS-098]
- [x] T033 [US-6] Create `components/ConsentBanner.js` — LGPD analytics consent (depends on T026) [TS-075]
- [x] T034 [US-6] Create `components/OfflinePill.js` — cache state indicator with `aria-live="polite"` (depends on T007) [TS-072, TS-051]
- [x] T035 [US-6] Simplify `components/SiteHeader.js` — remove ALL toggles + floating nav (~280 lines removed). New: logo + "Ruta" (gold CTA) + "Servicios" + "Contacto" + hamburger (mobile). ~120 lines. (depends on T032) [TS-044, TS-045]

### Implementation — Shell Bootstrap

- [x] T036 [US-6] Implement `js/blueprint/shell.js` — page shell bootstrap: init SiteSidebar, TripleToggle, OfflinePill, ConsentBanner, slot resolution, theme restore via inline `<script>` (anti-FOUC), bus wiring (depends on T028, T030, T031, T032, T033, T034, T035) [TS-044, TS-045, TS-046]

### E2E

- [x] T037 [US-6] Write E2E `tests/e2e/adaptive-blueprint.spec.js` — 52-combo matrix, zero raw keys, <100ms toggles, sidebar on 12 pages, ARIA [TS-043, TS-044, TS-045, TS-046, TS-047, TS-048, TS-049, TS-050, TS-051, TS-093, TS-094, TS-095, TS-096, TS-097, TS-098, TS-099]
- [x] T038 [US-6] Write E2E `tests/e2e/triple-toggle.spec.js` — theme/locale/audience instant switch, persistence across reload, ARIA switch semantics, mobile bottom-left position [TS-043, TS-047, TS-049, TS-099]
- [x] T039 [US-6] Write E2E `tests/e2e/sidebar-navigation.spec.js` — scroll-spy on 12 pages, active state tracking, mobile drawer open/close/Escape, section click with header offset [TS-093, TS-094, TS-095, TS-096, TS-097, TS-098]

**Checkpoint**: Full shell operational — sidebar + triple toggle + simplified header + slot resolution. 52-combo matrix passing.

---

## Phase 5: US-1 — Diagnostic CTA (Priority: P1) MVP

**Goal**: 6-step diagnostic → lead + diagnostic in Firestore → personalized result
**Independent Test**: Hero + diagnostic flow E2E

### Tests

- [x] T040 [P] [US-1] Write unit test `tests/unit/diagnostic-state.spec.js` (≥95%) [TS-005, TS-014, TS-015]
- [x] T041 [P] [US-1] Write integration test `tests/integration/security-rules.spec.js` — Emulator (leads/ + diagnostics/) [TS-007, TS-008, TS-009, TS-010]

### Implementation

- [x] T042 [US-1] Implement `js/diagnostic/state.js` — localStorage state machine with 24h TTL (depends on T007) [TS-005, TS-014]
- [x] T043 [US-1] Implement `js/diagnostic/controller.js` — DOM orchestration + optimistic result + deferred sync R14 (depends on T008, T042, T027) [TS-003, TS-004, TS-005, TS-006, TS-007, TS-010, TS-088, TS-089, TS-090, TS-091, TS-092]
- [x] T044 [US-1] Create `components/DiagnosticStepper.js` — 6-step wizard with progress bar (depends on T043) [TS-003, TS-011, TS-012, TS-013, TS-014, TS-015]
- [x] T045 [P] [US-1] Create `estilos/diagnostic.css` — stepper + result screen styles [TS-026]
- [x] T046 [US-1] Create `diagnostico/index.html` — 7 sections for sidebar, DiagnosticStepper + shell.js, accepts `?audiencia=` [TS-001, TS-002, TS-003]
- [x] T047 [P] [US-1] Create i18n dictionary `js/i18n/dictionaries/diagnostico.json` (4 variants) [TS-073]
- [x] T048 [US-1] Update `firebase/firestore.rules` — add leads/ + diagnostics/ rules per contracts (consumer PII only; slots/ rules deferred to T078) [TS-007, TS-008, TS-009, TS-010]
- [x] T049 [P] [US-1] Update `firebase/firestore.indexes.json` — composite indexes [DOC]
- [x] T050 [US-1] Redesign `index.html` — home v2 with 7 sections (propuesta, diagnostico, recursos, programas, metodo, prueba-social, contacto), full structure per FR-005: hero + proof + 3 routes + programs (static cards) + closing + footer. Inline critical.css, defer output.css. [TS-001, TS-002, TS-006, TS-016, TS-022, TS-080, TS-081, TS-082]
- [x] T051 [US-1] Write E2E `tests/e2e/diagnostic-flow.spec.js` [TS-003, TS-004, TS-005, TS-006]
- [x] T052 [US-1] Write E2E `tests/e2e/home-fold.spec.js` — CTA visible in 6 viewports [TS-001, TS-002]

**Checkpoint**: Primary conversion flow operational

---

## Phase 6: US-7 — Sitemap + 13-Page Shell (Priority: P1)

**Goal**: 13 pages with 7 sections each, sitemap.xml, legacy redirects
**Independent Test**: Crawler finds 12 URLs; 17 legacy 301s resolve

### Tests

- [x] T053 [P] [US-7] Write E2E `tests/e2e/sitemap-redirects.spec.js` — sitemap (12 URLs) + 17 legacy 301s + nav 3 items + footer 12 pages [TS-052, TS-053, TS-054, TS-055, TS-056, TS-057, TS-058, TS-059]

### Tier A — Rewrite existing pages (each with 7 sections for sidebar)

- [x] T054 [US-7] Rewrite `empresas/index.html` — Neo-Swiss shell, 7 sections (b2b, programas, diagnostico, recursos, casos, metodo, contacto), audience=empresa locked (FR-245), preserve JSON-LD [TS-052, TS-058]
- [x] T055 [P] [US-7] Rewrite `personas/index.html` — Neo-Swiss shell, 7 sections, audience=persona locked [TS-052, TS-058]
- [x] T056 [P] [US-7] Rewrite `recursos/index.html` — Neo-Swiss shell, 7 sections (biblioteca, playbooks, herramientas, premium, prompts, automatizacion, comunidad), preserve subcategory links [TS-052, TS-058]
- [x] T057 [P] [US-7] Rewrite `nosotros/index.html` — Neo-Swiss shell, 7 sections, absorb ecosistema.html + mision.html [TS-052, TS-058]
- [x] T058 [P] [US-7] Rewrite `contacto/index.html` — Neo-Swiss shell, 7 sections, preserve JSON-LD ContactPage [TS-052, TS-058]

### Tier B — Create new pages (each with 7 sections)

- [x] T059 [P] [US-7] Create `programas/index.html` — 7 sections + slug router for `?slug=X` [TS-052, TS-058]
- [x] T060 [P] [US-7] Create `metodo/index.html` — 7 sections (filosofia, diagnostico, estrategia, amplificacion, pivote, evidencia, siguiente) [TS-052, TS-058]
- [x] T061 [P] [US-7] Create `casos/index.html` — 7 sections, top-3 testimonials from i18n, uses `testimonials/` with `type` filter [TS-052, TS-058]
- [x] T062 [P] [US-7] Create `insights/index.html` — 7 sections, "early access" shell + subscription form → `leads/` with fuente "insights-subscribe" [TS-052, TS-058]
- [x] T063 [P] [US-7] Create `404.html` — NO sidebar, recovery CTA "Volver al home", i18n, analytics event [TS-056]

### Tier C — Consolidate

- [x] T064 [US-7] Create `legal/index.html` — consolidate privacidad + terminos into single page with 3 anchors (#privacidad, #terminos, #cookies), 7 sections [TS-052, TS-058]

### Shared infrastructure

- [x] T065 [P] [US-7] Create 11 i18n dictionaries `js/i18n/dictionaries/{pageSlug}.json` — 168 section labels derived from sections-config.js (mechanical) + 132 content keys requiring brand voice FR-046 (creative copywriting). Total ~300 keys, 4 variants per content slot [TS-073, TS-048]
- [x] T066 [US-7] Create `scripts/generate-sitemap-xml.js` — 12-URL sitemap with hreflang (es/en) [TS-052]
- [x] T067 [US-7] Modify `components/SiteFooter.js` — 12-page link list per sitemap.md [TS-058, TS-059]
- [x] T068 [US-7] Write integration test `tests/integration/home-firestore.spec.js` — Emulator: SWR + append-only [TS-072]
- [x] T069 [US-7] Create `scripts/seed.js` — idempotent seeder (programs, resources, testimonials) [DOC]

**Checkpoint**: 13 pages with sidebar + 7 sections each, sitemap valid, 17 redirects working

---

## Phase 7: US-5 — Responsive Native (Priority: P1)

**Goal**: 6 viewport classes, touch targets, clamp(), safe areas, sidebar collapse

### Tests

- [x] T070 [P] [US-5] Write E2E `tests/e2e/home-a11y.spec.js` — axe-core + keyboard tab order (skip-link → header → sidebar → main → toggles → footer) [TS-037, TS-067, TS-068]

### Implementation

- [x] T071 [US-5] Responsive CSS refinement: 6-breakpoint mobile-first, clamp() typography, safe-area insets, landscape compact hero, sidebar collapse at 960px without layout shift. TDD inner loop: implement one TS at a time, verify E2E per TS before next [TS-033, TS-034, TS-035, TS-036, TS-038, TS-039, TS-040, TS-041, TS-042]
- [x] T072 [US-5] Add `srcset` WebP/AVIF + fallback + `loading="lazy"` + `aspect-ratio` [TS-040, TS-085, TS-086]
- [x] T073 [US-5] Touch targets ≥44×44px (xs/sm), ≥48×48px (md+), ≥8px spacing [TS-033, TS-037]
- [x] T074 [US-5] Write E2E `tests/e2e/home-i18n.spec.js` — ES↔EN switch, zero raw keys [TS-073, TS-074]

**Checkpoint**: All 6 viewports pass 12-point checklist

---

## Phase 8: US-8 — Admin Content Editor (Priority: P1)

**Goal**: Firestore-backed 4-variant content editor for all 13 pages
**Independent Test**: Admin login → edit slot → save → public site shows new content

### Tests

- [x] T075 [P] [US-8] Write integration test `tests/integration/admin-slots.spec.js` — Emulator: admin write to slots/, public read, non-admin denied [TS-105, TS-106]

### Implementation

- [x] T076 [US-8] Create `admin/content-editor.html` — page picker grid (13 cards) + slot editor UI with 4 textareas per slot (ES×persona, ES×empresa, EN×persona, EN×empresa) [TS-100, TS-101]
- [x] T077 [US-8] Create `admin/content-editor.js` — Firestore CRUD for `slots/{pageSlug}`, schema: `{ slotId, variants: { "persona.es", "persona.en", "empresa.es", "empresa.en" } }`, save per slot (depends on T048 for rules) [TS-102]
- [x] T078 [US-8] Update `firebase/firestore.rules` — add `slots/{pageSlug}` rules: public read (published) + admin write (custom claim `admin: true`). Owns all slots/ rules (T048 does NOT touch slots/) [TS-105, TS-106]
- [x] T079 [US-8] Update `js/cms/migration-bridge.js` — enable `cms-i18n` flag: read from Firestore `slots/{pageSlug}` when documents exist, fallback to static JSON [TS-103, TS-104]
- [x] T080 [US-8] Update `js/blueprint/slot-resolver.js` — integrate migration-bridge for Firestore-first slot resolution with static fallback [TS-103, TS-104]
- [x] T081 [US-8] Write E2E `tests/e2e/admin-content-editor.spec.js` — login → select page → edit 4 variants → save → verify Firestore + public render [TS-100, TS-101, TS-102, TS-103, TS-107]
- [x] T082 [US-8] Auth gate: verify `/admin/content-editor.html` redirects to login for unauthenticated users [TS-107]

**Checkpoint**: Admin can edit any page's content in 4 variants without redeploy

---

## Phase 9: US-2 — Resource Escape Route (Priority: P2)

**Goal**: Premium resource gate + contextual diagnostic invitation

- [x] T083 [US-2] Implement premium resource email modal in `js/modal-system.js` — lead with fuente `home-resource-premium` [TS-019, TS-020, TS-021]
- [x] T084 [US-2] Add contextual diagnostic invitation in `recursos/index.html` [TS-018]
- [x] T085 [US-2] Wire analytics: `resource_open`, `resource_premium_unlock` [TS-017]
- [x] T086 [US-2] Write E2E for premium unlock flow [TS-019, TS-020, TS-021]

**Checkpoint**: Resource escape route with premium gate

---

## Phase 10: US-3 — Educational Offer (Priority: P3)

**Goal**: Dynamic ProgramCard WC + Firestore on home

- [x] T087 [US-3] Create `components/ProgramCard.js` — name_i18n, audiencia, duracion, resultado_i18n, CTA href [TS-022, TS-023]
- [x] T088 [US-3] Replace static program cards in `index.html` with ProgramCard WC from Firestore `programs/` [TS-022, TS-024, TS-025]
- [x] T089 [US-3] Write E2E for program section [TS-022, TS-023, TS-024, TS-025]

**Checkpoint**: Dynamic programs on home

---

## Phase 11: Polish & Cross-Cutting Concerns

- [x] T090 Write E2E `tests/e2e/home-offline-pill.spec.js` — stub Firestore → pill appears [TS-072, TS-074, TS-080]
- [x] T091 Performance audit — Lighthouse ≥90 (4 categories), bundle <250KB initial / <800KB total, deferred JS [TS-060, TS-061, TS-062, TS-064, TS-065, TS-066, TS-085, TS-086]
- [x] T092 Brand voice audit per FR-046 + quickstart.md validation + coverage report [TS-067, TS-068, TS-069, TS-070, TS-071, TS-080, TS-081, TS-082, TS-083, TS-084, TS-085, TS-086, TS-087]
- [x] T093 Verify all 17 .htaccess redirects return 301 on production [TS-053, TS-054, TS-055, TS-056]
- [x] T094 Verify scroll-spy accuracy across all 12 sidebar pages with varying section heights [TS-094]
- [x] T095 Verify TripleToggle does not overlap content on xs viewport (360px) [TS-099]

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) → Phase 2 (Foundation: 7 leaf modules)
    → Phase 3 (US-4: Tokens + Layout System)
        → Phase 4 (US-6: Sidebar + TripleToggle + Shell)
            ├→ Phase 5 (US-1: Diagnostic + Home)
            │   └→ Phase 8 (US-8: Admin Content Editor) *T077+ blocked by T048*
            ├→ Phase 6 (US-7: 13-Page Shell)
            └→ Phase 7 (US-5: Responsive)
                Phase 8 ├→ Phase 9 (US-2: Resources)
                        └→ Phase 10 (US-3: Programs)
                            → Phase 11 (Polish)
```

> **Note**: Phase 8 T075/T076 can start in parallel with Phase 5, but T077+ are blocked by T048 (firestore rules). Phase 6 and Phase 7 are fully parallel with Phase 5.

### Critical Path

T001 → T007 → T015 → T017 → T028 → T036 → T050 → T054 → T076 → T092

**Longest chain**: 10 tasks

### Parallel Batches

| Phase | Parallel batch | Tasks |
|---|---|---|
| 1 | All | T002, T003, T004, T005, T006 (after T001) |
| 2 | All | T007, T008, T009, T010, T011, T012, T013 (all independent) |
| 3 | C | T014, T016, T018, T019 (after T015) |
| 4 | D | T021, T022, T023, T024, T025 (after Phase 3) |
| 5 | E | T040, T041, T045, T047, T049 (after Phase 4) |
| 6-A | E2 | T055, T056, T057, T058 (after T054 establishes rewrite pattern) |
| 6-B | F | T059, T060, T061, T062, T063 (all new pages, independent) |
| 6-infra | F2 | T065 (i18n dictionaries, parallel with page creation) |
| 8 | G | T075, T076 parallel with Phase 5; T077+ blocked by T048 |

### Story Independence

| Story | Can start after | Depends on |
|---|---|---|
| US-4 | Phase 2 | Foundation |
| US-6 | US-4 | Tokens + Layout |
| US-1 | US-6 | Shell + Sidebar |
| US-7 | US-6 | Shell + Sidebar |
| US-5 | US-4 | Tokens (cross-cutting) |
| US-8 | US-6 + US-1 (rules) | Shell + Firestore rules |
| US-2 | US-1 + US-7 | Home + recursos rewritten |
| US-3 | US-1 | Home with static cards |

---

## MVP Scope Suggestion

**Minimum viable launch** = Phases 1–6 (Setup + Foundation + US-4 + US-6 + US-1 + US-7):
- Home v2 with sidebar + triple toggle + 3 CTAs
- Diagnostic flow E2E
- 13 pages with 7 sections each
- Full layout system (sidebar + header + main)
- **59 tasks** to MVP

Phases 7–11 add: responsive polish, admin editor, resources, programs, cross-cutting = 36 tasks.

---

## Notes

- [P] = different files, no dependencies
- TDD discipline (NFR-007): tests FIRST, ensure they FAIL, then implement
- 107 BDD scenarios (TS-001..TS-107) provide full traceability
- Every page (except 404) has exactly 7 `<section id>` for sidebar scroll-spy
- All content slots exist in 4 variants (ES×persona, ES×empresa, EN×persona, EN×empresa)
- Admin content editor writes to Firestore `slots/{pageSlug}`, site reads via migration-bridge.js
- Triple toggle always visible fixed bottom-left (z-index 45), even with sidebar closed on mobile
- Header simplified: logo + Ruta (gold CTA) + Servicios + Contacto — NO toggles

---

## Clarifications

### Session 2026-04-21 (v4 — Socratic debate: 5 task ambiguities)

- Q: T048 and T078 both modify firestore.rules for slots/ — who owns slots/ rules? → A: T048 scope = leads/ + diagnostics/ only (consumer PII). T078 owns all slots/ rules (public read + admin write). TS-105/TS-106 removed from T048, remain on T078. Rationale: slots/ is 100% content editor concern (US-8), not diagnostic concern (US-1). [T048, T078, TS-105, TS-106, Constitution XXIII]
- Q: Phase dependency diagram shows Phase 8 branching from Phase 4, but T077 depends on T048 (Phase 5) — which is correct? → A: Phase 8 has partial dependency on Phase 5. T075/T076 can start in parallel with Phase 5; T077+ blocked by T048. Diagram corrected. [Phase 5, Phase 8, T077, T048, Constitution XVI]
- Q: Tier A page rewrites (T054-T058) affect different files — should T055-T058 be [P]? → A: Yes. T054 establishes the rewrite pattern (critical path); T055-T058 replicate it in parallel. All 4 criteria of XVI satisfied. [T054, T055, T056, T057, T058, Constitution XVI]
- Q: T065 creates ~300 i18n keys in one task — should it split? → A: No split, but add [P] marker. Output is homogeneous (JSON files), structure repetitive. Scope note added: 168 labels (mechanical from sections-config.js) + 132 content keys (creative copywriting, FR-046 applies). [T065, FR-046, Constitution XIV]
- Q: T071 covers 9 TS references in one responsive CSS task — too large? → A: Maintained as single task. CSS responsive is cohesive; splitting generates merge conflicts in same files. Added TDD inner loop note: implement one TS at a time. [T071, Constitution IX, Constitution XIV]
