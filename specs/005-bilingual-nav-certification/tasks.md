# Tasks: Bilingual & Floating Nav Certification

**Feature**: 005-bilingual-nav-certification
**Branch**: `005-bilingual-nav-certification`
**Generated**: 2026-03-23
**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)

## Summary

- **Total tasks**: 29
- **By story**: US1=7, US2=9, US3=4, US4=4, US5=5
- **By priority**: P1=20 (US1+US2+US3), P2=4 (US4), P3=5 (US5)
- **Parallel batches**: 6 identified

## Phase 1: Setup

- [ ] T001 Create data/ directory and add data/i18n-levels.json with page→level classification rules and overrides per data-model.md schema
- [ ] T002 [P] Create data/i18n-allowlist.json with legitimately identical terms per data-model.md schema
- [ ] T003 [P] Create data/i18n-spanish-patterns.json with Spanish remnant regex patterns per data-model.md schema

> **Parallel batch 1**: T002, T003 (independent config files, no shared state)

## Phase 2: Foundational — Event Contract

- [ ] T004 [US1] Modify js/i18n/i18n.js setLang() to dispatch langchange CustomEvent after applyTranslations resolves [TS-004]
- [ ] T005 [US1] Add langchange listener in components/SiteHeader.js setupFloatingNav() to re-read heading textContent into floating nav links [TS-005]

> **Dependency**: T005 depends on T004 (listener needs event to exist)

## Phase 3: US1 — Floating Nav Bilingual (P1)

- [ ] T006 [US1] Add ruta.nav.* keys to js/i18n/en.json and js/i18n/es.json for floating nav aria-labels and title attributes [TS-006]
- [ ] T007 [US1] Update components/SiteHeader.js floating nav to apply data-i18n-aria-label and data-i18n-title using per-page nav.* keys [TS-006, TS-007]
- [ ] T008 [US1] Add nav.* keys for all other pages with floating nav to en.json and es.json [TS-007]
- [ ] T009 [US1] Handle Strategy 3 auto-label pages: report as warnings, not failures in certification [TS-003]

> **Parallel batch 2**: T006, T008 (both add JSON keys, different namespaces)
> **Dependency**: T007 depends on T006 (needs keys to exist)

## Phase 4: US2 — Certification Suite Static (P1)

- [ ] T010 [US2] Create tests/unit/i18n-certification.test.js scaffold with Vitest describe blocks per certification-output.md contract [TS-008]
- [ ] T011 [US2] Implement HTML parser: scan all public HTML files for data-i18n attribute values using regex extraction [TS-008]
- [ ] T012 [US2] Implement missing key detection: cross-reference HTML data-i18n keys against en.json entries, fail on missing [TS-008]
- [ ] T013 [P] [US2] Implement orphaned key detection: find en.json keys with no HTML data-i18n reference [TS-010]
- [ ] T014 [US2] Implement three-condition translation validation: exists + non-empty + differs from es.json (with allowlist exemption) [TS-012, TS-013]
- [ ] T015 [US2] Implement page level classification: auto-classify by directory pattern using data/i18n-levels.json with override support [TS-014]
- [ ] T016 [US2] Implement coverage scoring per level (L1-L5) with level-appropriate pass/fail thresholds [TS-011]
- [ ] T017 [US2] Implement zero-key page warning: report pages with SiteHeader but no data-i18n keys as warnings [TS-009, TS-015]
- [ ] T018 [P] [US2] Implement floating nav label verification in rendered certification check [TS-016]

> **Parallel batch 3**: T013, T018 (orphan detection and floating nav check are independent test blocks)
> **Dependencies**: T012 depends on T011 (needs parser); T014 depends on T012 (builds on key detection); T015 depends on T001 (needs levels manifest); T016 depends on T014, T015 (needs classification + validation)

## Phase 5: US2 — Certification Suite Rendered (P1)

- [ ] T019 [US2] Create tests/e2e/bilingual-certification.spec.js scaffold with Playwright test blocks [TS-016, TS-017]
- [ ] T020 [US2] Implement Layer 1: verify data-i18n elements render en.json values on L1 pages in EN mode [TS-017, TS-018, TS-019, TS-020, TS-021]
- [ ] T021 [US2] Implement Layer 2: regex scan visible text outside data-i18n elements for Spanish patterns from data/i18n-spanish-patterns.json [TS-021]

> **Dependency**: T021 depends on T020 (Layer 2 runs after Layer 1 passes); T019 depends on T003 (needs patterns file)

## Phase 6: US3 — Level 1 Bilingual Coverage (P1)

- [ ] T022 [US3] Audit index.html for missing data-i18n keys and add translations to en.json/es.json [TS-017]
- [ ] T023 [P] [US3] Audit ruta/index.html for missing data-i18n keys and add translations to en.json/es.json [TS-018]
- [ ] T024 [P] [US3] Audit empresas/index.html for missing data-i18n keys and add translations to en.json/es.json [TS-019]
- [ ] T025 [P] [US3] Audit personas/index.html for missing data-i18n keys and add translations to en.json/es.json [TS-020]

> **Parallel batch 4**: T022, T023, T024, T025 (independent pages, shared en.json but different key namespaces)
> **Dependency**: Phase 6 depends on Phase 4 completion (certification suite must exist to validate coverage)

## Phase 7: US4 — Level 2-5 Coverage Expansion (P2)

- [ ] T026 [US4] Add data-i18n keys and translations for L2 pages (empresas/*, personas/*, servicios/*) to reach 100% coverage [TS-022]
- [ ] T027 [P] [US4] Add data-i18n keys and translations for L3 pages (recursos index pages) to reach >=90% coverage [TS-023]
- [ ] T028 [P] [US4] Add data-i18n keys and translations for L4 pages (resource detail) — headings, CTAs, nav elements [TS-024]
- [ ] T029 [P] [US4] Add data-i18n keys and translations for L5 pages (contacto, nosotros, legal) to reach 100% coverage [TS-025]

> **Parallel batch 5**: T026, T027, T028, T029 (independent page levels)
> **Dependency**: Phase 7 depends on Phase 4 (needs certification suite to validate)

## Phase 8: US5 — i18n Efficiency Cleanup (P3)

- [ ] T030 [US5] Remove orphaned en.json keys identified by certification suite run [TS-028]
- [ ] T031 [US5] Add data-skip-i18n attribute support to SiteHeader.loadI18n() — skip i18n.js loading when attribute present [TS-026]
- [ ] T032 [US5] Add data-skip-i18n attribute to HTML pages that have zero translatable content [TS-026, TS-027]
- [ ] T033 [US5] Verify no console errors on pages with data-skip-i18n [TS-027]
- [ ] T034 [US5] Update certification suite to promote zero-key page warnings to failures after data-skip-i18n is available [TS-029]

> **Parallel batch 6**: T030, T031 (orphan cleanup and skip-attribute are independent)
> **Dependencies**: T032 depends on T031 (needs attribute support); T033 depends on T032; T034 depends on T031

## Dependency Graph

```
T001 ──→ T015
T002 ──→ T014
T003 ──→ T019
T004 ──→ T005
T006 ──→ T007
T010 ──→ T011 ──→ T012 ──→ T014 ──→ T016
                                 T015 ──→ T016
T017 (independent after T011)
T019 ──→ T020 ──→ T021
T022-T025 depend on Phase 4 (T010-T018)
T026-T029 depend on Phase 4
T030 depends on Phase 4 (needs orphan list)
T031 ──→ T032 ──→ T033
T031 ──→ T034
```

**Critical path**: T001 → T015 → T016 → T022-T025 (certification must work before coverage expansion)

**Longest chain**: T010 → T011 → T012 → T014 → T016 → T022 → run certification (7 steps)

## Implementation Strategy

### MVP Scope (P1 — 20 tasks)
Phases 1-6: Event contract, certification suite, L1 coverage. Delivers the regression guard and fixes the most visible bilingual gaps.

### Extended Scope (P2 — 4 tasks)
Phase 7: Full site coverage expansion. Can be done incrementally per level.

### Cleanup Scope (P3 — 5 tasks)
Phase 8: Performance optimization and progressive enforcement. Only after P1+P2 are stable.

### Test-First Order
Within each phase, the .feature files define expected behavior. Implementation order follows: test infrastructure → production code → validation run.
