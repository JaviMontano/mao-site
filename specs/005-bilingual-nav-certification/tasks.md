# Tasks: Bilingual & Floating Nav Certification

**Feature**: 005-bilingual-nav-certification
**Branch**: `005-bilingual-nav-certification`
**Generated**: 2026-03-23
**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)

## Summary

- **Total tasks**: 43
- **By story**: Setup=4, US1=5, US2=16, US3=4, US4=9, US5=5
- **By priority**: P1=28 (Setup+US1+US2+US3), P2=9 (US4), P3=5 (US5)
- **Parallel batches**: 6 identified

## Phase 1: Setup

- [x] T001 Create data/ directory and add data/i18n-levels.json with page→level classification rules and overrides per data-model.md schema
- [x] T002 [P] Create data/i18n-allowlist.json with legitimately identical terms per data-model.md schema
- [x] T003 [P] Create data/i18n-spanish-patterns.json with Spanish remnant regex patterns per data-model.md schema
- [x] T003b [P] Create data/README.md explaining i18n config files per XVIII (Indexable)

> **Parallel batch 1**: T002, T003, T003b (independent config files, no shared state)

## Phase 2: Foundational — Event Contract

- [x] T004 [US1] Modify js/i18n/i18n.js setLang() to dispatch langchange CustomEvent after applyTranslations resolves [TS-004]
- [x] T005 [US1] Add langchange listener in components/SiteHeader.js setupFloatingNav() to re-read heading textContent into floating nav links [TS-005]

> **Dependency**: T005 depends on T004 (listener needs event to exist)

## Phase 3: US1 — Floating Nav Bilingual (P1)

- [x] T006 [US1] Add ruta.nav.* keys to js/i18n/en.json and js/i18n/es.json for floating nav aria-labels and title attributes [TS-006]
- [x] T007 [US1] Update components/SiteHeader.js floating nav to apply data-i18n-aria-label and data-i18n-title using per-page nav.* keys [TS-006, TS-007]
- [x] T008 [US1] Add nav.* keys for all other pages with floating nav to en.json and es.json [TS-007]

> **Parallel batch 2**: T006, T008 (both add JSON keys, different namespaces)
> **Dependency**: T007 depends on T006 (needs keys to exist)

## Phase 4: US2 — Certification Suite Static (P1)

- [x] T009 [US2] Configure Strategy 3 auto-label pages: report as warnings, not failures in certification suite [TS-003]
- [x] T010 [US2] Create tests/unit/i18n-certification.test.js scaffold with Vitest describe blocks per certification-output.md contract [TS-008]
- [x] T011 [US2] Implement HTML parser: scan all public HTML files for data-i18n attribute values using regex extraction [TS-008]
- [x] T012 [US2] Implement missing key detection: cross-reference HTML data-i18n keys against en.json entries, fail on missing [TS-008]
- [x] T013 [P] [US2] Implement orphaned key detection: find en.json keys with no HTML data-i18n reference [TS-010]
- [x] T014 [US2] Implement three-condition translation validation: exists + non-empty + differs from es.json (with allowlist exemption) [TS-012, TS-013]
- [x] T015 [US2] Implement page level classification: auto-classify by directory pattern using data/i18n-levels.json with override support [TS-014]
- [x] T016 [US2] Implement coverage scoring per level (L1-L5) with level-appropriate pass/fail thresholds [TS-011]
- [x] T017 [US2] Implement zero-key page warning: report pages with SiteHeader but no data-i18n keys as warnings [TS-009, TS-015]
- [x] T018 [P] [US2] Implement floating nav label verification in rendered certification check [TS-016]

> **Parallel batch 3**: T009, T013, T018 (warning config, orphan detection, and floating nav check are independent test blocks)
> **Dependencies**: T009 depends on T010 (needs certification scaffold); T012 depends on T011 (needs parser); T014 depends on T012 (builds on key detection); T015 depends on T001 (needs levels manifest); T016 depends on T014, T015 (needs classification + validation)

## Phase 5: US2 — Certification Suite Rendered (P1)

- [x] T019 [US2] Create tests/e2e/bilingual-certification.spec.js scaffold with Playwright test blocks [TS-016, TS-017]
- [x] T020a [US2] Implement Layer 1 for index.html: verify data-i18n elements render en.json values in EN mode [TS-017]
- [x] T020b [P] [US2] Implement Layer 1 for ruta/index.html: verify data-i18n elements render en.json values in EN mode [TS-018]
- [x] T020c [P] [US2] Implement Layer 1 for empresas/index.html: verify data-i18n elements render en.json values in EN mode [TS-019]
- [x] T020d [P] [US2] Implement Layer 1 for personas/index.html: verify data-i18n elements render en.json values in EN mode [TS-020]
- [x] T021 [US2] Implement Layer 2: regex scan visible text outside data-i18n elements for Spanish patterns from data/i18n-spanish-patterns.json [TS-021]

> **Parallel batch**: T020a, T020b, T020c, T020d (same logic per page, independent assertions)
> **Dependency**: T021 depends on T020a-T020d (Layer 2 runs after Layer 1 passes); T021 depends on T003 (needs patterns file for regex scan)

## Phase 6: US3 — Level 1 Bilingual Coverage (P1)

- [x] T022 [P] [US3] Audit index.html for missing data-i18n keys and add translations to en.json/es.json [TS-017]
- [x] T023 [P] [US3] Audit ruta/index.html for missing data-i18n keys and add translations to en.json/es.json [TS-018]
- [x] T024 [P] [US3] Audit empresas/index.html for missing data-i18n keys and add translations to en.json/es.json [TS-019]
- [x] T025 [P] [US3] Audit personas/index.html for missing data-i18n keys and add translations to en.json/es.json [TS-020]

> **Parallel batch 4**: T022, T023, T024, T025 (independent pages, shared en.json but different key namespaces)
> **Dependency**: Phase 6 depends on Phase 4 completion (certification suite must exist to validate coverage)

## Phase 7: US4 — Level 2-5 Coverage Expansion (P2)

- [x] T026a [US4] Add data-i18n keys and translations for empresas/diagnostico-gratuito.html to reach 100% coverage [TS-022]
- [x] T026b [P] [US4] Add data-i18n keys and translations for empresas/bootcamp-ventas-ia.html to reach 100% coverage [TS-022]
- [x] T026c [P] [US4] Add data-i18n keys and translations for empresas/workshop-venta-amplificada.html to reach 100% coverage [TS-022]
- [x] T026d [P] [US4] Add data-i18n keys and translations for personas/autodiagnostico.html to reach 100% coverage [TS-022]
- [x] T026e [P] [US4] Add data-i18n keys and translations for personas/bootcamp-amplificacion-profesional.html to reach 100% coverage [TS-022]
- [x] T026f [P] [US4] Add data-i18n keys and translations for personas/consultive-workshops-estrategia-personal.html to reach 100% coverage [TS-022]
- [x] T027 [P] [US4] Add data-i18n keys and translations for L3 pages (recursos index pages) to reach >=90% coverage [TS-023]
- [x] T028 [P] [US4] Add data-i18n keys and translations for L4 pages (resource detail) — headings, CTAs, nav elements [TS-024]
- [x] T029 [P] [US4] Add data-i18n keys and translations for L5 pages (contacto, nosotros, legal) to reach 100% coverage [TS-025]

> **Parallel batch 5**: T026a-T026f, T027, T028, T029 (independent pages/levels)
> **Dependency**: Phase 7 depends on Phase 4 (needs certification suite to validate)

## Phase 8: US5 — i18n Efficiency Cleanup (P3)

- [x] T030 [US5] Remove orphaned en.json keys identified by certification suite run [TS-028]
- [x] T031 [US5] Add data-skip-i18n attribute support to SiteHeader.loadI18n() — skip i18n.js loading when attribute present [TS-026]
- [x] T032 [US5] Add data-skip-i18n attribute to HTML pages that have zero translatable content [TS-026, TS-027]
- [x] T033 [US5] Verify no console errors on pages with data-skip-i18n [TS-027]
- [x] T034 [US5] Update certification suite to promote zero-key page warnings to failures after data-skip-i18n is available [TS-029]

> **Parallel batch 6**: T030, T031 (orphan cleanup and skip-attribute are independent)
> **Dependencies**: T032 depends on T031 (needs attribute support); T033 depends on T032; T034 depends on T031

## Dependency Graph

```
T001 ──→ T015
T002 ──→ T014
T003 ──→ T021
T004 ──→ T005
T006 ──→ T007
T010 ──→ T009 (warning config)
T010 ──→ T011 ──→ T012 ──→ T014 ──→ T016
                                 T015 ──→ T016
T017 (independent after T011)
T019 ──→ T020a ──→ T021
              T020b ──→ T021
              T020c ──→ T021
              T020d ──→ T021
T022-T025 depend on Phase 4 (T010-T018)
T026a-T026f, T027-T029 depend on Phase 4
T030 depends on Phase 4 (needs orphan list)
T031 ──→ T032 ──→ T033
T031 ──→ T034
```

**Critical path**: T001 → T015 → T016 → T022-T025 (certification must work before coverage expansion)

**Longest chain**: T010 → T011 → T012 → T014 → T016 → T022 → run certification (7 steps)

**Note**: T020 was split into T020a-T020d (one per L1 page) for granularity parity with Phase 6

## Implementation Strategy

### MVP Scope (P1 — 28 tasks)
Phases 1-6: Event contract, certification suite, L1 coverage. Delivers the regression guard and fixes the most visible bilingual gaps.

### Extended Scope (P2 — 9 tasks)
Phase 7: Full site coverage expansion. Can be done incrementally per level.

### Cleanup Scope (P3 — 5 tasks)
Phase 8: Performance optimization and progressive enforcement. Only after P1+P2 are stable.

### Test-First Order
Within each phase, the .feature files define expected behavior. Implementation order follows: test infrastructure → production code → validation run.

## Clarifications

### Session 2026-03-23

- Q: Task count mismatch — summary says 29 tasks (US1=7, US2=9) but body has 34 (T001-T034). Which is correct? -> A: Update summary to match body: 34 tasks (Setup=3, US1=6, US2=12, US3=4, US4=4, US5=5) [T001-T034]
- Q: T019 lists T003 as dependency but T019 is just a scaffold — should dependency be on T021 instead? -> A: Yes, move T003 dependency to T021 which actually consumes the spanish patterns file [T003, T019, T021]
- Q: T020 covers 5 test specs across 4 L1 pages — split into per-page tasks like Phase 6? -> A: Yes, split into T020a-T020d (one per L1 page) for consistent granularity [T020a, T020b, T020c, T020d, T021]
- Q: T026 covers ~10 L2 pages in one task — split per page like Phase 6? -> A: Yes, split into T026a-T026f (6 actual L2 pages: 3 empresas, 3 personas, 0 servicios non-index) [T026a, T026b, T026c, T026d, T026e, T026f]
- Q: T022 missing [P] marker despite being in parallel batch 4 with T023-T025 — add it? -> A: Yes, add [P] for consistency since all 4 are independent page audits [T022]
- Q: T009 is in Phase 3 (US1 runtime) but defines certification reporting behavior — should it move to Phase 4 (certification suite)? -> A: Yes, move T009 to Phase 4 with T010 dependency; relabel as US2; Phase 3 stays focused on runtime [T009, T010]
- Q: T021 (Layer 2 Spanish regex scan) covers all L1 pages in one task — split per page like T020a-d? -> A: Keep as single task — Layer 2 is one test block that iterates all pages with identical logic [T021]
- Q: T017 (zero-key page warning) depends on T011 — should it also depend on T015 (page level classification) for severity context? -> A: No, T017 is a binary check (SiteHeader present + zero data-i18n keys), level context is not blocking [T017, T011, T015]
