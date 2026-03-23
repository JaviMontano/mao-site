# Specification: Bilingual & Floating Nav Certification

**Feature**: 005-bilingual-nav-certification
**Branch**: `005-bilingual-nav-certification`
**Date**: 2026-03-23
**Constitution**: v6.0.0

## Problem Statement

The site has a partially deployed i18n system: 37 of 81
SiteHeader pages have translation keys, but 48 pages load
i18n.js with zero translatable content. The floating
navigation menu labels remain in Spanish when the user
switches to English. No automated certification exists
for bilingual completeness — gaps are discovered by users
(BUG-001), not by tests.

**Current state** (measured 2026-03-23):

| Metric | Value |
|--------|-------|
| Pages with SiteHeader | 81 / 126 |
| Pages with `data-i18n` keys | 37 / 81 (46%) |
| Pages with zero translation keys | 48 / 81 (59%) |
| Floating nav label translation | 0% |
| Orphaned en.json sections | 1 ("cta") |
| Automated bilingual certification | None |

## User Stories

### US1 — Floating Nav Bilingual (P1)

As a visitor scrolling a long page in English mode, I want
the floating section navigation to display labels in English
so that I can navigate without language confusion.

**Why P1**: Floating nav is always visible on scroll — a
Spanish label in an English session is the most jarring UX
failure. Low effort, high impact.

**Independent test**: Switch to EN on ruta/index.html, scroll
past header. Floating nav labels should be in English.

**Acceptance scenarios**:

1. **Given** language is EN and user scrolls past header on
   ruta/index.html, **When** floating nav appears, **Then**
   all section labels are in English
2. **Given** user switches from EN to ES while floating nav
   is visible, **When** the toggle fires, **Then** labels
   update to Spanish without page reload
3. **Given** a page has auto-detected sections (Strategy 3),
   **When** language is EN, **Then** auto-labels also
   translate (or use a generic fallback like "Section 1")

### US2 — Bilingual Certification Suite (P1)

As the project owner, I want an automated test suite that
certifies bilingual completeness across all public pages so
that i18n gaps are caught in CI, not by users.

**Why P1**: Without certification, every deploy risks
shipping a page with untranslated content. This is the
permanent guard against BUG-001-class failures.

**Independent test**: Run the certification suite — it
reports coverage percentage per level and fails on
regressions.

**Acceptance scenarios**:

1. **Given** the test suite runs, **When** a `data-i18n` key
   on any page has no corresponding en.json entry, **Then**
   the test reports the missing key and fails
2. **Given** a developer adds a new page with SiteHeader,
   **When** they don't add `data-i18n` keys, **Then** the
   suite reports the untranslated page
3. **Given** en.json has a key with no corresponding
   `data-i18n` in any HTML, **Then** the suite reports it
   as orphaned

### US3 — Level 1 Bilingual Coverage (P1)

As a visitor on the critical path (homepage, ruta, empresas,
personas), I want zero Spanish remnants when I switch to
English so that the experience is fully bilingual.

**Why P1**: These 4 pages carry 80%+ of traffic. Partial
translation on high-traffic pages erodes trust.

**Independent test**: Switch to EN on each L1 page, scan for
known Spanish patterns — zero matches.

**Acceptance scenarios**:

1. **Given** language is EN on index.html, **When** page
   renders, **Then** all `data-i18n` elements show English
   text and zero Spanish remnants
2. **Given** the same test on ruta/index.html (142 keys),
   **Then** zero Spanish remnants
3. **Given** the same test on empresas/index.html and
   personas/index.html, **Then** zero Spanish remnants

### US4 — Level 2-5 Coverage Expansion (P2)

As the project owner, I want all remaining pages to reach
their level-appropriate bilingual coverage so that the
entire site is certifiably bilingual.

**Why P2**: Lower traffic pages still matter for brand
consistency (V, XI) but have less immediate user impact.

**Independent test**: Run certification suite per level —
all levels meet their target percentage.

**Acceptance scenarios**:

1. **Given** L2 pages (product detail), **When** certified,
   **Then** 100% of keys translated
2. **Given** L3 pages (resource index), **When** certified,
   **Then** 100% structural keys + >=90% content keys
3. **Given** L4 pages (resource detail), **When** certified,
   **Then** headings, CTAs, and nav elements translated
4. **Given** L5 pages (legal, contact, about), **When**
   certified, **Then** 100% of keys translated

### US5 — i18n Efficiency Cleanup (P3)

As a performance-conscious developer, I want pages without
translatable content to skip i18n.js loading so that ~48
pages avoid unnecessary JS execution.

**Why P3**: Functional correctness (P1-P2) before
performance optimization. XIV (Simple First) — fix the
translations, then optimize the loading.

**Independent test**: A page marked as no-i18n does not
load i18n.js and shows no console errors.

**Acceptance scenarios**:

1. **Given** a page has `data-skip-i18n` attribute on
   site-header, **When** SiteHeader renders, **Then**
   i18n.js is not loaded
2. **Given** a page skips i18n, **When** inspected,
   **Then** no i18n-related console errors appear

### Edge Cases

- Page with only shared keys (nav, footer) from web
  components but no page-specific keys — counts as
  "has translations" for certification
- Cotizador pages generate content via JS —
  `data-i18n` on static HTML won't cover dynamic labels;
  needs separate i18n integration approach
- Internal pages (TEMPLATE.html, biblioteca_para_estudio)
  excluded from certification
- Floating nav Strategy 3 (auto-IDs) has no predefined
  i18n keys — accept untranslated auto-labels or map
  heading text to keys
- Floating nav offline: when en.json is unavailable
  (cache miss, offline), floating nav labels fall back
  to heading textContent (which remains in the page's
  original language) — graceful degradation per VIII

## Functional Requirements

### Floating Nav i18n

- **FR-001**: Floating nav section labels MUST translate
  when the user switches language [US1]
- **FR-002**: Floating nav MUST re-render labels when
  `i18n.setLang()` fires [US1]
- **FR-003**: Section label translations MUST be defined
  in en.json per page or shared namespace [US1]
- **FR-004**: Floating nav home link aria-label and title
  MUST translate (verify existing support) [US1]

### Certification Test Suite

- **FR-005**: Test MUST verify every `data-i18n` key on
  every public page has a corresponding en.json entry [US2]
- **FR-006**: Test MUST verify switching to EN produces
  zero Spanish remnants on L1 pages [US2, US3]
- **FR-007**: Test MUST verify floating nav labels
  translate on every page with floating nav [US2]
- **FR-008**: Test MUST report orphaned en.json keys [US2]
- **FR-009**: Test MUST report untranslated pages as
  warnings per level [US2]
- **FR-010**: Test MUST output coverage % per level [US2]

### Coverage Expansion (Top-Down)

- **FR-011**: L1 (critical path): 100% translated, zero
  remnants [US3]
- **FR-012**: L2 (product): 100% translated [US4]
- **FR-013**: L3 (resource index): >=90% translated [US4]
- **FR-014**: L4 (resource detail): 100% of heading, CTA,
  and nav element keys translated [US4]
- **FR-015**: L5 (support): 100% translated [US4]

### Cleanup

- **FR-016**: Orphaned en.json keys removed [US5]
- **FR-017**: Internal/template pages skip i18n via
  `data-skip-i18n` attribute [US5]

## Success Criteria

- **SC-001**: Floating nav labels in EN on all floating
  nav pages [FR-001, FR-002]
- **SC-002**: Certification suite passes — zero missing
  keys, zero orphaned keys [FR-005, FR-008]
- **SC-003**: L1 pages: zero Spanish remnants in EN [FR-006]
- **SC-004**: L1=100%, L2=100%, L3>=90%, L4=100% of
  heading/CTA/nav keys, L5=100% [FR-011, FR-012, FR-013, FR-014, FR-015]
- **SC-005**: New pages without i18n trigger test warning
  (regression guard) [FR-009]
- **SC-006**: en.json zero orphaned keys [FR-016]
- **SC-007**: No perf regression on i18n-skipped pages [FR-017]

## Key Entities

| Entity | Description |
|--------|-------------|
| Translation key | `data-i18n` attr → en.json path |
| Page level (L1-L5) | Priority tier for coverage target |
| Floating nav label | Section text in floating pill nav |
| Coverage % | translated keys / total keys per level |
| Orphaned key | en.json entry with no HTML reference |
| Spanish remnant | Visible Spanish text in EN mode |

## Coverage Levels

| Level | Pages | Count | Target |
|-------|-------|-------|--------|
| **L1** | index, ruta/index, empresas/index, personas/index | 4 | 100%, zero remnants |
| **L2** | empresas/*, personas/*, servicios/* | ~10 | 100% |
| **L3** | recursos/index, recursos/*/index | ~8 | >=90% |
| **L4** | recursos detail/item, biblioteca-* detail | ~20 | 100% heading/CTA/nav keys |
| **L5** | contacto/, nosotros/*, legal/* | ~7 | 100% |

## Assumptions

- EN translations for L1-L2 are human-quality; L3-L5
  may use AI-assisted translation with review [ASSUMPTION]
- `data-i18n` attribute contract unchanged [DOC]
- SiteHeader is sole i18n.js loader [CODE]
- Floating nav expansion not in scope [CODE]
- Cotizador dynamic content needs separate approach [INFERENCE]

## Out of Scope

- Adding floating nav to new pages
- Translating editorial body text in resource detail
- Third language support
- Translating images or PDFs
- CMS-driven translation management (feature 004)

## Clarifications

### Session 2026-03-23

- Q: How should the floating nav learn about language changes? -> A: Emit a custom `langchange` event from `i18n.setLang()`, floating nav listens and re-reads already-translated heading textContent [FR-001, FR-002, US1]
- Q: What happens with Strategy 3 auto-labels when language is EN? -> A: Strategy 3 pages are exempt from floating nav i18n certification; reported as warnings, not failures [FR-007, US1, SC-001]
- Q: What test runner should the certification suite use? -> A: Hybrid — Vitest for static key coverage (FR-005, FR-008, FR-009, FR-010), Playwright for rendered Spanish remnant detection (FR-006, FR-007) on L1 pages only [FR-005, FR-006, FR-007, FR-008, FR-009, FR-010, US2, SC-002]
- Q: What counts as "translated" for certification coverage scoring? -> A: en.json entry exists, is non-empty, AND differs from es.json value; legitimately identical terms (brand names, technical terms) maintained in an allowlist to avoid false positives [FR-010, SC-004, US2]
- Q: How should certification handle 48 pages with SiteHeader but zero data-i18n keys? -> A: Report as warnings in P1; promote to failures after data-skip-i18n (FR-017) is implemented in P3 — progressive enforcement [FR-009, FR-017, US2, US5, SC-005]
- Q: What is the en.json key namespace for floating nav element attributes? -> A: Nested per page under `<page>.nav.*` (e.g., `ruta.nav.sections_label`); allows page-specific aria-labels [FR-003, FR-004, US1]
- Q: How should Playwright detect Spanish remnants on L1 pages? -> A: Two-layer — (1) verify all `data-i18n` elements render en.json values, (2) regex scan visible text outside `data-i18n` elements for known Spanish patterns (e.g., "Conoce más", "Contáctanos", "Nuestros") [FR-006, US3, SC-003]
- Q: How should the certification suite classify pages into levels (L1-L5)? -> A: Auto-classify by directory pattern with a manifest override file for edge cases [FR-010, SC-004, US2, US4]
- Q: Are cotizador dynamic labels in scope for this feature? -> A: Out of scope — certification reports cotizador pages as warnings, fix deferred to separate feature [US2, SC-005]
