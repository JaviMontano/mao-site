# Specification Analysis Report: Bilingual Site (ES/EN)

**Feature**: 002-bilingual-i18n | **Date**: 2026-03-22 | **Artifacts**: spec.md, plan.md, tasks.md, 7 .feature files

## Findings

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| A-01 | Phase Separation | MEDIUM | spec.md:43-56 (US3) | User Story 3 prescribes implementation details (JSON files, data-i18n attributes, i18n.js module, localStorage key "lang") that belong in plan.md | Rewrite US3 to describe the *capability* ("translations load and apply without page reload") not the *mechanism*. Move architecture to plan.md |
| A-02 | Coverage Gap | HIGH | tasks.md (missing phases) | Waves 2, 3, 5, 6, 7 from spec.md (lines 75-80) have zero tasks. Only Waves 0, 1, 4 are decomposed. SC-007 requires all 7 waves complete in 4 sprints | Add task phases for Waves 2, 3, 5, 6, 7 — or explicitly mark them out-of-MVP scope in tasks.md |
| A-03 | Coverage Gap | MEDIUM | plan.md (all) | plan.md never references FR-xxx or SC-xxx IDs. Requirements are addressed conceptually but not ID-traceable | Add inline FR/SC ID references where plan sections address specific requirements |
| A-04 | Inconsistency | MEDIUM | plan.md:7, tasks.md:17 (T005) | Browser language auto-detection (navigator.language) appears in plan and T005 but has no FR requirement in spec.md | Add FR-013 for auto-detection, or remove from plan/tasks if not desired |
| A-05 | Ambiguity | MEDIUM | spec.md:163, plan.md:19 | "63+ pages" used without definitive count. Wave breakdown sums to ~62 pages + 18 files + "site-wide" — inconsistent total | Pin exact page count or clarify "63+" as approximation with definitive wave totals |
| A-06 | Duplication | LOW | spec.md:146, 148 (FR-004, FR-007) | FR-004 ("translate all data-i18n elements") subsumes FR-007 ("translate SiteHeader/SiteFooter"). FR-007 is a priority subset, not distinct | Add a note that FR-007 is a P1 specialization of FR-004, or consolidate |
| A-07 | Ambiguity | LOW | spec.md:169 (SC-007) | "within 4 sprints" — sprint duration undefined, making this unmeasurable | Define sprint length (e.g., "2-week sprints") or use absolute timeframe |

## Constitution Alignment

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Static-First | ALIGNED | Pure client-side JS, JSON as static assets, no server dependency |
| II. Accessibility-First | ALIGNED | Toggle uses aria-pressed, role="radiogroup", keyboard navigation in T017 |
| III. SEO Integrity | ALIGNED | hreflang tags (FR-010), meta content translation (FR-005) |
| IV. Component Consistency | ALIGNED | Single i18n.js module, SiteHeader/SiteFooter integrate via shared API |
| V. Brand Separation | ALIGNED | All translations are MetodologIA brand only |

## Coverage Summary

| Requirement | Has Task? | Task IDs | Has Plan? | Plan Refs |
|-------------|-----------|----------|-----------|-----------|
| FR-001 | Yes | T013-T017 | Yes (conceptual) | Phase B, Toggle Design |
| FR-002 | Yes | T004 | Yes (conceptual) | Architecture, API |
| FR-003 | Yes | T004, T005 | Yes (conceptual) | Architecture |
| FR-004 | Yes | T006, T008 | Yes (conceptual) | HTML Attribute Convention |
| FR-005 | Yes | T007 | Yes (conceptual) | HTML Attribute Convention |
| FR-006 | Yes | T009 | Yes (conceptual) | Risk Assessment |
| FR-007 | Yes | T018, T019 | Yes (conceptual) | Phase B |
| FR-008 | Yes | T020 | Yes (conceptual) | Phase B |
| FR-009 | Yes | T023-T030 | Yes (conceptual) | Phase C-F |
| FR-010 | Yes | T034, T035 | Yes (conceptual) | Phase C (hreflang) |
| FR-011 | Yes | T010 | Yes (conceptual) | API (translate method) |
| FR-012 | Yes | T012, T042 | Yes (conceptual) | Performance Goals |
| SC-001 | Yes | T013, T022 | Yes (conceptual) | — |
| SC-002 | Yes | T023-T029 | Yes (conceptual) | Phase C |
| SC-003 | Partial | T012 | Yes (conceptual) | Performance Goals |
| SC-004 | Yes | T041 | — | — |
| SC-005 | Yes | T036-T040 | Yes (conceptual) | Testing Strategy |
| SC-006 | Yes | T042 | Yes (conceptual) | Performance Goals |
| SC-007 | **NO** | Missing Waves 2,3,5,6,7 | Yes (conceptual) | Phases D-F |
| SC-008 | Yes | T034 | Yes (conceptual) | Phase C |

## Feature File Traceability

| Requirement | .feature Tag? | Feature File(s) |
|-------------|--------------|-----------------|
| FR-001 | Yes | language-toggle.feature (@FR-001) |
| FR-002 | Yes | language-toggle.feature (@FR-002) |
| FR-003 | Yes | i18n-system.feature (@FR-003) |
| FR-004 | Yes | language-toggle.feature, i18n-system.feature, progressive-translation.feature, bilingual-bibliotecas.feature (@FR-004) |
| FR-005 | Yes | i18n-system.feature (@FR-005) |
| FR-006 | Yes | i18n-system.feature, progressive-translation.feature (@FR-006) |
| FR-007 | Yes | header-footer-translation.feature, bilingual-bibliotecas.feature (@FR-007) |
| FR-008 | Yes | header-footer-translation.feature (@FR-008) |
| FR-009 | Yes | progressive-translation.feature (@FR-009) |
| FR-010 | Yes | seo-hreflang.feature (@FR-010) |
| FR-011 | Yes | i18n-system.feature (@FR-011) |
| FR-012 | Yes | i18n-system.feature (@FR-012) |
| SC-001 | Yes | language-toggle.feature, header-footer-translation.feature, bilingual-bibliotecas.feature (@SC-001) |
| SC-002 | Yes | progressive-translation.feature (@SC-002) |
| SC-003 | Yes | language-toggle.feature, i18n-system.feature (@SC-003) |
| SC-004 | Yes | progressive-translation.feature (@SC-004) |
| SC-005 | Yes | bilingual-tests.feature (@SC-005) |
| SC-006 | Yes | i18n-system.feature (@SC-006) |
| SC-007 | Yes | progressive-translation.feature (@SC-007) |
| SC-008 | Yes | seo-hreflang.feature (@SC-008) |

**Orphaned tags**: None — all @FR-xxx and @SC-xxx tags reference valid IDs in spec.md.
**Untested requirements**: None — all FR and SC IDs have at least one .feature tag.
**Step definitions**: 100/100 matched (0 undefined, 0 pending).

## Phase Separation Violations

| Artifact | Lines | Violation | Severity |
|----------|-------|-----------|----------|
| spec.md | 43-56 (US3) | Implementation architecture (JSON files, data-i18n attributes, i18n.js module, file paths) in spec instead of plan | MEDIUM |
| spec.md | 141-142 (FR-002) | localStorage key name "lang" is an implementation choice | MEDIUM |
| spec.md | 144 (FR-005) | Specific attribute names (data-i18n-placeholder, data-i18n-title, data-i18n-content) are implementation details | MEDIUM |

## Metrics

- **Total Requirements**: 12 FR + 8 SC = 20
- **Total Tasks**: 42
- **FR Task Coverage**: 12/12 (100%)
- **SC Task Coverage**: 7/8 (87.5%) — SC-007 under-covered
- **Feature File Coverage**: 20/20 (100%)
- **Plan ID Traceability**: 0/20 (0% — conceptual only)
- **Ambiguity Count**: 2 (page count, sprint duration)
- **Critical Issues**: 0
- **High Issues**: 1
- **Medium Issues**: 3
- **Low Issues**: 2

**Health Score**: 88/100 (→ stable)

## Score History

| Run | Score | Coverage | Critical | High | Medium | Low | Total |
|-----|-------|----------|----------|------|--------|-----|-------|
| 2026-03-22T18:22:00Z | 88 | 95% | 0 | 1 | 3 | 2 | 7 |
