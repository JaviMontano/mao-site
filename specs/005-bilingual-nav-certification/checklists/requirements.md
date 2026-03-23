# Requirements Checklist: 005-bilingual-nav-certification

## Content Quality

- [x] No implementation details in spec (HOW-free)
- [x] User stories describe WHAT and WHY
- [x] Success criteria are measurable and technology-agnostic
- [x] Evidence tags present on assumptions
- [x] No tool-specific names (Constitution phase separation)

## Requirement Completeness

- [x] All user stories have acceptance scenarios (GWT)
- [x] All FRs trace to at least one user story
- [x] All SCs trace to at least one FR
- [x] Edge cases documented
- [x] Assumptions explicit
- [x] Out of scope defined
- [x] Key entities listed
- [x] Priority levels assigned (P1-P3)

## Feature Readiness

- [x] Problem statement with measured baseline data
- [x] Coverage levels defined with specific page counts
- [x] Independent testability per user story
- [x] No unresolved [NEEDS CLARIFICATION] markers
- [x] Constitution principles referenced where relevant
- [x] BUG-001 context preserved (origin of this feature)

## Bilingual-Specific

- [x] Current coverage metrics documented (37/81, 48 dead)
- [x] Level system defined (L1-L5) with targets
- [x] Floating nav gap explicitly scoped
- [x] Cotizador dynamic content edge case noted
- [x] Orphaned key cleanup included
- [x] Performance optimization deferred to P3 (XIV)

## Clarification Coverage

- [x] Floating nav notification mechanism resolved — langchange event [FR-001, FR-002]
- [x] Strategy 3 auto-label behavior decided — exempt, warn not fail [FR-007]
- [x] Test runner selection decided — hybrid Vitest + Playwright [FR-005–FR-010]
- [x] "Translated" definition is precise and testable — 3 conditions + allowlist [FR-010, SC-004]
- [x] Zero-key page handling has P1/P3 progression — warnings now, failures later [FR-009, FR-017]
- [x] Key namespace convention decided — `<page>.nav.*` [FR-003, FR-004]
- [x] Spanish remnant detection method specified — two-layer scan [FR-006, SC-003]
- [x] Page level classification method decided — directory rules + overrides [FR-010]
- [x] Cotizador scope explicitly excluded with warning path [US2, SC-005]

## Consistency

- [x] FR-001 through FR-004 (floating nav) have clear acceptance scenarios in US1
- [x] FR-005 through FR-010 (certification) consistently map to US2 scenarios
- [x] FR-011 through FR-015 (coverage) level targets match Coverage Levels table
- [x] SC-001 through SC-007 each map to specific FRs without orphans
- [x] Clarification answers are consistent with each other (no contradictions)
- [x] Plan phases align 1:1 with spec priority tiers (P1→Phases 1-4, P2→Phase 5, P3→Phase 6)

## Acceptance Criteria Quality

- [x] US1 scenarios cover: initial render, live toggle, and Strategy 3 edge case
- [x] US2 scenarios cover: missing keys, untranslated pages, and orphaned keys
- [x] US3 scenarios are specific per L1 page (index, ruta, empresas, personas)
- [x] US4 scenarios differentiate L2-L5 targets (100%, >=90%, headings+CTAs)
- [x] US5 scenarios include both functional (skip loading) and non-functional (no errors)
- [x] All scenarios use Given/When/Then format consistently

## Non-Functional Requirements

- [x] Performance: zero additional JS payload specified [Technical Context]
- [x] Backward compatibility: no breaking changes to i18n API [Contract]
- [x] Accessibility: aria-labels translate via existing data-i18n-* [II, FR-004]
- [x] Regression guard: SC-005 ensures new pages trigger warnings [FR-009]

## Dependencies & Assumptions

- [x] Dependency on existing i18n.js singleton documented [CODE]
- [x] Dependency on SiteHeader floating nav structure documented [CODE]
- [x] Assumption about data-i18n contract stability tagged [DOC]
- [x] Assumption about SiteHeader being sole i18n loader tagged [CODE]
- [x] AI-assisted translation assumption for L3-L5 tagged [ASSUMPTION]
