# Tasks: Home como Landing Vendedora (3 CTAs Primarios)

**Input**: Design documents from `/specs/009-home-landing-sales/`
**Prerequisites**: plan.md (v5), spec.md (v7), data-model.md (v3), contracts/ (3 files), research.md, quickstart.md, 8 .feature files (92 scenarios)
**Branch**: `009-home-landing-sales`
**Total tasks**: 62 | **Per-story**: US-1: 13, US-4: 6, US-5: 5, US-6: 11, US-7: 8, US-2: 4, US-3: 3, Setup: 4, Foundation: 5, Polish: 3

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[USn]**: Which user story this task belongs to
- Include exact file paths in descriptions
- **Traceability**: Test spec IDs reference `.feature` tags (TS-001..TS-092)

---

## Phase 1: Setup

**Purpose**: Baseline capture, project structure, tooling configuration

- [ ] T001 Capture GA4 baseline for SC-001, SC-002, SC-009 (30-day window of current home) — document in specs/009-home-landing-sales/baseline.md
- [ ] T002 [P] Create new directory structure: `js/diagnostic/`, `js/audience/`, `js/analytics/`, `js/theme/`, `js/state/`, `js/blueprint/`, `js/redirects/`
- [ ] T003 [P] Update `vitest.config.js` with per-module coverage thresholds per NFR-008 (pure: 100%, logic: 95%, controllers: 80%, components: 70%, global: 85%)
- [ ] T004 [P] Create pre-commit hook script `scripts/count-pages.js` to enforce exactly 13 canonical pages [TS-057]

**Checkpoint**: Structure ready, baseline documented

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Leaf modules with zero internal dependencies + design tokens — MUST complete before ANY user story

**CRITICAL**: All user stories depend on these pure modules and the token system

- [ ] T005 [P] Implement `js/state/bus.js` — lightweight pub/sub event bus (pure, zero deps) + unit test `tests/unit/bus.spec.js` (100% coverage) [TS-062]
- [ ] T006 [P] Implement `js/diagnostic/logic.js` — pure scoring + threshold logic from `contracts/diagnostic-logic.json` + unit test `tests/unit/diagnostic-logic.spec.js` (100% coverage) [TS-003, TS-004, TS-088, TS-089, TS-090, TS-091, TS-092]
- [ ] T007 [P] Implement `js/audience/state.js` — AudienceState management (provenance cascade from data-model.md §AudienceState) + unit test `tests/unit/audience-state.spec.js` (≥95%) [TS-043, TS-046]
- [ ] T008 [P] Implement `js/theme/toggle.js` — theme switch + localStorage persistence + `prefers-color-scheme` fallback + unit test `tests/unit/theme-toggle.spec.js` (≥95%) [TS-032]
- [ ] T009 [P] Implement `js/redirects/legacy-router.js` — pure URL resolution for legacy paths (/vision.html, /servicios/, /ruta/, /sitemap.html) [TS-053, TS-054, TS-055, TS-056]

**Checkpoint**: 5 leaf modules + 5 unit test files ready — all stories can now begin

---

## Phase 3: US-4 — Neo-Swiss Identity (Priority: P1)

**Goal**: Design tokens, critical CSS, and visual system coherent with cartillas
**Independent Test**: Side-by-side audit of home tokens vs cartilla reference

### Tests

- [ ] T010 [P] [US-4] Write E2E test `tests/e2e/home-critical-css.spec.js` — first paint without FOUC [TS-063]

### Implementation

- [ ] T011 [US-4] Update `estilos/variables.css` — add Neo-Swiss Light/Dark token sets (FR-041, FR-042, FR-044) with canonical custom properties per spec §4.1 [TS-026, TS-027, TS-028]
- [ ] T012 [P] [US-4] Create `estilos/critical.css` — hand-authored fold CSS: tokens + hero layout + CTA primario + above-fold typography (FR-092, FR-096) [TS-063]
- [ ] T013 [P] [US-4] Create `estilos/blueprint.css` — shared page shell layout for 13-page blueprint [TS-049]
- [ ] T014 [US-4] Update `estilos/home.css` — home v2 layout using Neo-Swiss tokens, clamp() typography, 6-breakpoint grid [TS-029, TS-030, TS-038]
- [ ] T015 [US-4] Update `estilos/components.css` — new component styles (DiagnosticStepper, OfflinePill, ConsentBanner, ProgramCard) [TS-031]

**Checkpoint**: Visual system complete — all pages can consume canonical tokens

---

## Phase 4: US-6 — Adaptive Blueprint (Priority: P1)

**Goal**: 3-toggle system (locale/theme/audience), page shell bootstrap, slot resolution
**Independent Test**: 52-combo matrix (13 pages × 2 locale × 2 audience) — zero raw keys

### Tests

- [ ] T016 [P] [US-6] Write unit test `tests/unit/slot-resolver.spec.js` — ContentSlot fallback cascade (≥95%) [TS-048]

### Implementation

- [ ] T017 [US-6] Create i18n dictionaries: `js/i18n/dictionaries/home.json` (ES/EN × persona/empresa) and `js/i18n/dictionaries/common.json` (nav, footer, toggles) [TS-048, TS-073]
- [ ] T018 [US-6] Implement `js/analytics/consent.js` — cookie banner logic + `mdg_consent` persistence [TS-075, TS-076, TS-077, TS-078, TS-079]
- [ ] T019 [US-6] Implement `js/analytics/events.js` — typed event emitter with consent gating per `contracts/analytics-events.md` + unit test `tests/unit/analytics-events.spec.js` (≥95%) [TS-074, TS-075]
- [ ] T020 [US-6] Implement `js/blueprint/slot-resolver.js` — ContentSlot → DOM hydration with audience/locale/fallback cascade (depends on T007, T017) [TS-048]
- [ ] T021 [US-6] Implement `js/blueprint/shell.js` — common page shell bootstrap: toggles init, slot resolution, theme restore, bus wiring (depends on T005, T008, T020) [TS-044, TS-045]
- [ ] T022 [US-6] Implement `js/audience/controller.js` — toggle + slot hydration, data-audience-variant/filter declarative DOM (depends on T007, T020, T005) [TS-043, TS-047]
- [ ] T023 [US-6] Create Web Component `components/ConsentBanner.js` — LGPD analytics consent banner (depends on T018) [TS-075]
- [ ] T024 [US-6] Create Web Component `components/OfflinePill.js` — cache state indicator (offline/syncing/fallback) with `aria-live="polite"` (depends on T005) [TS-072, TS-050]
- [ ] T025 [US-6] Modify `components/SiteHeader.js` — add 3 toggles (locale/theme/audience) + offline pills coexistence + collapse to "⚙ Preferencias" on xs/sm (depends on T008, T022) [TS-044, TS-045, TS-050]
- [ ] T026 [US-6] Write E2E test `tests/e2e/adaptive-blueprint.spec.js` — 52-combo parametrized matrix (13 pages × 2 locale × 2 audience), zero raw keys, <100ms toggle transitions [TS-043, TS-044, TS-045, TS-046, TS-047, TS-048, TS-049, TS-050, TS-051]

**Checkpoint**: Blueprint operational — any page can consume toggles, slots, and shell. 52-combo matrix passing.

---

## Phase 5: US-1 — Diagnostic CTA (Priority: P1) MVP

**Goal**: 6-step diagnostic wizard → lead + diagnostic in Firestore → personalized result
**Independent Test**: Hero + diagnostic flow end-to-end, lead in Firestore

### Tests

- [ ] T027 [P] [US-1] Write unit test `tests/unit/diagnostic-state.spec.js` — localStorage state machine (≥95%) [TS-005, TS-014, TS-015]
- [ ] T028 [P] [US-1] Write integration test `tests/integration/security-rules.spec.js` — Emulator: leads/ + diagnostics/ CRUD (positive + negative per contracts/firestore-rules.md) [TS-007, TS-008, TS-009, TS-010]

### Implementation

- [ ] T029 [US-1] Implement `js/diagnostic/state.js` — localStorage state machine (idle → in_progress → captured → persisted/pending_sync) with 24h TTL (depends on T005) [TS-005, TS-014]
- [ ] T030 [US-1] Implement `js/diagnostic/controller.js` — DOM orchestration + Firestore write with optimistic result + deferred sync (R14) + exponential retry (depends on T006, T029, T019) [TS-003, TS-004, TS-005, TS-006, TS-007, TS-010, TS-088, TS-089, TS-090, TS-091, TS-092]
- [ ] T031 [US-1] Create Web Component `components/DiagnosticStepper.js` — 6-step wizard with progress bar, back/next, time estimate "≈3 min" (depends on T030) [TS-003, TS-011, TS-012, TS-013, TS-014, TS-015]
- [ ] T032 [US-1] Create `estilos/diagnostic.css` — stepper + result screen styles per Neo-Swiss tokens [TS-026]
- [ ] T033 [US-1] Create `diagnostico/index.html` — 6-step diagnostic flow page using DiagnosticStepper + shell.js [TS-001, TS-002, TS-003]
- [ ] T034 [US-1] Create i18n dictionary `js/i18n/dictionaries/diagnostico.json` — diagnostic flow copy (ES/EN) [TS-073]
- [ ] T035 [US-1] Update `firebase/firestore.rules` — add leads/ + diagnostics/ rules per contracts/firestore-rules.md (append-only, auth.uid match, App Check) [TS-007, TS-008, TS-009, TS-010]
- [ ] T036 [US-1] Update `firebase/firestore.indexes.json` — add composite indexes for programs (status, order) and testimonials (status, order) [DOC]
- [ ] T037 [US-1] Redesign `index.html` — home v2 landing: hero → proof → 3 routes → programs → closing → footer, with inline critical CSS, deferred output.css, 3 CTA hierarchy, `mdg_returning` cookie detection [TS-001, TS-002, TS-006, TS-080, TS-081, TS-082]
- [ ] T038 [US-1] Write E2E test `tests/e2e/diagnostic-flow.spec.js` — 6-step happy path + result + Firestore persist [TS-003, TS-004, TS-005, TS-006]
- [ ] T039 [US-1] Write E2E test `tests/e2e/home-fold.spec.js` — CTA visible in 6 viewports without scroll [TS-001, TS-002]

**Checkpoint**: Primary conversion flow operational — visitor → diagnostic → lead → result

---

## Phase 6: US-7 — Sitemap + 13-Page Shell (Priority: P1)

**Goal**: 13 canonical pages with shell blueprint, sitemap.xml, legacy redirects
**Independent Test**: Crawler finds exactly 12 public URLs; legacy 301s resolve correctly

### Tests

- [ ] T040 [P] [US-7] Write E2E test `tests/e2e/sitemap-redirects.spec.js` — sitemap.xml validation + legacy 301 redirects [TS-052, TS-053, TS-054, TS-055, TS-056, TS-057, TS-058, TS-059]

### Implementation

- [ ] T041 [US-7] Create 11 shell pages using Minimal Landing Pattern (R15): `empresas/index.html`, `personas/index.html`, `programas/index.html`, `recursos/index.html`, `metodo/index.html`, `casos/index.html`, `nosotros/index.html`, `insights/index.html`, `contacto/index.html`, `legal/index.html`, `404.html` — each with hero + escape_routes + closing slots via shell.js [TS-052, TS-058, TS-059]
- [ ] T042 [US-7] Create 11 i18n dictionaries `js/i18n/dictionaries/{pageSlug}.json` — 132 i18n keys (11 pages × 3 slots × 2 audiences × 2 locales) [TS-073, TS-048]
- [ ] T043 [US-7] Create `scripts/generate-sitemap-xml.js` — 12-URL sitemap generator (excludes 404) [TS-052]
- [ ] T044 [US-7] Modify `components/SiteFooter.js` — 12-page link list per sitemap.md [TS-058, TS-059]
- [ ] T045 [US-7] Update nav in `components/SiteHeader.js` — 5 nav items + 1 CTA button + 3 toggles [TS-059]
- [ ] T046 [US-7] Write integration test `tests/integration/home-firestore.spec.js` — Emulator: SWR + append-only for home content reads [TS-072]
- [ ] T047 [US-7] Create idempotent seed script `scripts/seed.js` — programs, resources, testimonials from JSON manifest [DOC]

**Checkpoint**: 13-page site structure complete — all pages navigable, sitemap valid, legacy URLs redirect

---

## Phase 7: US-5 — Responsive Native (Priority: P1)

**Goal**: Design-specific layouts per viewport class (xs/sm/md/lg/xl/2xl), no scroll horizontal, touch targets, clamp() typography
**Independent Test**: 6-viewport checklist of 12 points per US-5

### Tests

- [ ] T048 [P] [US-5] Write E2E test `tests/e2e/home-a11y.spec.js` — axe-core audit + keyboard tab order (skip-link → nav → CTA1 → CTA2 → programs → footer) [TS-037, TS-067, TS-068]

### Implementation

- [ ] T049 [US-5] Responsive CSS refinement across `estilos/home.css`, `estilos/blueprint.css`, `estilos/diagnostic.css` — 6-breakpoint mobile-first, clamp() typography, safe-area insets, landscape compact hero [TS-033, TS-034, TS-035, TS-036, TS-038, TS-039, TS-040]
- [ ] T050 [US-5] Add `srcset` WebP/AVIF + fallback + `loading="lazy"` + `aspect-ratio` for all images outside fold [TS-040, TS-085, TS-086]
- [ ] T051 [US-5] Ensure touch targets ≥44×44px (xs/sm) and ≥48×48px (md+) with ≥8px spacing on all interactive elements [TS-033, TS-037]
- [ ] T052 [US-5] Write E2E test `tests/e2e/home-i18n.spec.js` — ES↔EN switch, zero raw keys in production DOM [TS-073, TS-074]

**Checkpoint**: All 6 viewports pass 12-point checklist — no horizontal scroll, touch targets compliant, LCP within budget

---

## Phase 8: US-2 — Resource Escape Route (Priority: P2)

**Goal**: Secondary CTA "Explorar recursos" linking to catalog, premium gate with email modal
**Independent Test**: Home → catalog → resource open/download → contextual diagnostic invite

- [ ] T053 [US-2] Implement CTA secondary in `index.html` hero — "Explorar recursos" with subordinate visual weight (outline, medium size) linking to `recursos/index.html` [TS-016, TS-017]
- [ ] T054 [US-2] Implement premium resource email modal in `js/modal-system.js` (extend existing) — lead write with fuente `home-resource-premium` [TS-019, TS-020, TS-021]
- [ ] T055 [US-2] Add contextual diagnostic invitation after resource consumption in `recursos/index.html` [TS-018]
- [ ] T056 [US-2] Write E2E test for premium unlock flow — email modal → lead in Firestore [TS-019, TS-020, TS-021]

**Checkpoint**: Resource escape route functional — captures early-stage visitors

---

## Phase 9: US-3 — Educational Offer (Priority: P3)

**Goal**: "Programas activos" section on home with program cards linking to existing pages
**Independent Test**: Home → program cards → empresas/ or personas/ landing

- [ ] T057 [US-3] Create Web Component `components/ProgramCard.js` — name, audience, duration, result, CTA (standalone, template-only) [TS-022, TS-023]
- [ ] T058 [US-3] Implement "Programas activos" section in `index.html` — 3–4 cards from Firestore `programs/` (with static fallback), responsive grid (1-col xs/sm, 2-col md, 3-col lg+) [TS-022, TS-024, TS-025]
- [ ] T059 [US-3] Write E2E test for program section — card rendering, link targets, program_request analytics event [TS-022, TS-023, TS-024, TS-025]

**Checkpoint**: Oferta educativa visible on home — third conversion path active

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Performance optimization, a11y hardening, E2E offline pill, brand audit

- [ ] T060 Write E2E test `tests/e2e/home-offline-pill.spec.js` — stub Firestore → pill appears within 3s, aria-live announces state [TS-072, TS-074, TS-080]
- [ ] T061 Performance audit — Lighthouse ≥90 (4 categories) on mobile + desktop, bundle <250KB initial / <800KB total, all deferred JS uses `defer` or `type="module"` [TS-060, TS-061, TS-062, TS-064, TS-065, TS-066, TS-085, TS-086]
- [ ] T062 Run full quickstart.md validation (manual + automated), brand voice audit per FR-046, final coverage report against NFR-008 thresholds [TS-067, TS-068, TS-069, TS-070, TS-071, TS-080, TS-081, TS-082, TS-083, TS-084, TS-085, TS-086, TS-087]

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──→ Phase 2 (Foundational) ──→ Phase 3 (US-4 Tokens)
                                                       │
                                    ┌──────────────────┤
                                    ▼                  ▼
                           Phase 4 (US-6 Blueprint)   Phase 7 (US-5 Responsive)
                                    │
                    ┌───────────────┤───────────────┐
                    ▼               ▼               ▼
           Phase 5 (US-1)   Phase 6 (US-7)   Phase 8 (US-2)
                    │               │               │
                    ▼               ▼               ▼
           Phase 9 (US-3)    ──────────────────────────
                                    │
                                    ▼
                           Phase 10 (Polish)
```

### Critical Path

T001 → T005 → T011 → T020 → T021 → T030 → T037 → T041 → T062

**Longest chain**: 9 tasks (Setup → Foundational → Tokens → Blueprint → Diagnostic → Home → Shells → Polish)

### Parallel Batches per Phase

| Phase | Parallel batch | Tasks |
|---|---|---|
| 1 | Batch A | T002, T003, T004 (after T001) |
| 2 | Batch B | T005, T006, T007, T008, T009 (all independent) |
| 3 | Batch C | T010, T012, T013 (after T011) |
| 4 | Batch D | T016, T017, T018 (after Phase 3) |
| 5 | Batch E | T027, T028 (after Phase 4); T032, T034 parallel with T029 |
| 6 | Batch F | T040, T042, T043 (after Phase 4) |
| 7 | Batch G | T048 parallel with T049, T050 |
| 8 | All 4 tasks sequential (small phase) |
| 9 | T057 parallel with T058 |

### Story Independence

| Story | Can start after | Depends on stories |
|---|---|---|
| US-4 | Phase 2 | None |
| US-6 | US-4 (tokens) | US-4 |
| US-1 | US-6 (shell + slots) | US-4, US-6 |
| US-7 | US-6 (shell + slots) | US-4, US-6 |
| US-5 | US-4 (tokens) | US-4 (applied across all) |
| US-2 | US-1 (home exists) | US-4, US-6, US-1 |
| US-3 | US-1 (home exists) | US-4, US-6, US-1 |

---

## MVP Scope Suggestion

**Minimum viable launch** = Phases 1–6 (Setup + Foundation + US-4 + US-6 + US-1 + US-7):
- Home v2 landing with 3-CTA pyramid
- Diagnostic flow end-to-end
- 13-page shell scaffold
- Design tokens + adaptive blueprint
- **39 tasks** to MVP

Phases 7–10 (US-5 polish, US-2, US-3, cross-cutting) add the remaining 23 tasks for full feature completion.

---

## Notes

- [P] tasks = different files, no dependencies
- [USn] label maps task to user story for traceability
- TDD discipline (NFR-007): write tests FIRST in each phase, ensure they FAIL, then implement
- Constitution IX enforces ATDD outer loop: `.feature` scenarios (TS-xxx) written before step definitions
- Each user story is independently completable and testable per spec's "Independent test" sections
- 92 BDD scenarios (TS-001..TS-092) provide full traceability coverage
