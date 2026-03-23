# Implementation Plan: Bilingual & Floating Nav Certification

**Branch**: `005-bilingual-nav-certification` | **Date**: 2026-03-23 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/005-bilingual-nav-certification/spec.md`

## Summary

Make the floating navigation bilingual by emitting a `langchange` custom event
from `i18n.setLang()` and having SiteHeader's floating nav re-read
already-translated heading text on that event. Build a hybrid certification
suite (Vitest for static key coverage, Playwright for L1 rendered remnants)
that guards against i18n regressions in CI. Expand EN translation coverage
across all 5 page levels.

## Technical Context

**Language/Version**: JavaScript ES6+ (vanilla, no transpiler)
**Primary Dependencies**: Vitest 1.x (unit), Playwright 1.x (E2E)
**Storage**: Static JSON files (`js/i18n/en.json`, `js/i18n/es.json`)
**Testing**: Vitest (key coverage certification), Playwright (L1 remnant detection)
**Target Platform**: Modern evergreen browsers (per Constitution)
**Project Type**: Static site with web components
**Performance Goals**: Zero additional JS payload for floating nav i18n (re-uses existing i18n.js)
**Constraints**: No build step required; no new dependencies beyond test runners already in use
**Scale/Scope**: 81 pages with SiteHeader, ~1132-line translation files, 5 coverage levels

## Constitution Check

*GATE: Passed — all decisions validated against Constitution v6.0.0*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Client-Rendered | Pass | All changes are client-side JS |
| II. Accessibility | Pass | Floating nav aria-labels translate via existing `data-i18n-*` |
| IV. Component Consistency | Pass | `langchange` event is the single notification contract |
| VII. Secure by Default | Pass | No new inputs or data writes |
| IX. TDD | Pass | Certification suite IS the test-first artifact |
| XII. Sustainability | Pass | Event-based decoupling; no magic strings |
| XIV. Simple First | Pass | Re-reads existing translated headings; no new key system for labels |
| XX. Branch Parity | Pass | Feature branch → staging → main |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Browser (Client)                                   │
│                                                     │
│  ┌──────────────┐    langchange     ┌────────────┐  │
│  │   i18n.js    │ ──── event ────→  │ SiteHeader │  │
│  │  setLang()   │                   │ floatingNav│  │
│  │  translate   │                   │ re-read    │  │
│  │  DOM         │                   │ headings   │  │
│  └──────┬───────┘                   └────────────┘  │
│         │                                           │
│         ▼                                           │
│  ┌──────────────┐                                   │
│  │  en.json     │  <page>.nav.* keys for aria/title │
│  │  es.json     │  Section labels from heading text │
│  └──────────────┘                                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Certification Suite (CI)                           │
│                                                     │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │ Vitest (static)  │  │ Playwright (rendered)    │ │
│  │ - key coverage   │  │ - L1 remnant detection   │ │
│  │ - orphan detect  │  │ - floating nav i18n      │ │
│  │ - level scoring  │  │ - two-layer scan         │ │
│  │ - allowlist      │  │                          │ │
│  └────────┬─────────┘  └────────────┬─────────────┘ │
│           │                         │               │
│           ▼                         ▼               │
│  ┌──────────────────────────────────────────────────┤
│  │  data/i18n-levels.json  (page→level manifest)   │
│  │  data/i18n-allowlist.json (identical terms)      │
│  │  data/i18n-spanish-patterns.json (remnant regex) │
│  └─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

## Project Structure

### Documentation (this feature)

```text
specs/005-bilingual-nav-certification/
  spec.md              # Feature specification (complete)
  plan.md              # This file
  research.md          # Research decisions
  data-model.md        # Entity definitions
  quickstart.md        # Test scenarios
  contracts/           # API contracts (event, JSON schemas)
```

### Source Code (repository root)

```text
js/i18n/i18n.js                    # MODIFY: emit langchange event in setLang()
components/SiteHeader.js            # MODIFY: listen for langchange, re-read labels
js/i18n/en.json                     # MODIFY: add <page>.nav.* keys per page
js/i18n/es.json                     # MODIFY: add matching <page>.nav.* keys

data/
  i18n-levels.json                  # NEW: page→level classification manifest
  i18n-allowlist.json               # NEW: legitimately identical terms
  i18n-spanish-patterns.json        # NEW: regex patterns for remnant detection

tests/
  unit/
    i18n-certification.test.js      # NEW: Vitest key coverage certification
  e2e/
    bilingual-certification.spec.js # NEW: Playwright L1 remnant + floating nav
```

**Structure Decision**: Existing flat structure preserved. New test files follow
established naming in `tests/unit/` and `tests/e2e/`. Config data in `data/`
directory (new, aligns with existing `data/` pattern for `business-logic.json`).

## Implementation Phases

> **Phase mapping**: Plan uses 6 coarse phases; tasks.md uses 8 granular phases.
>
> | Plan Phase | Tasks Phase(s) | Scope |
> |------------|---------------|-------|
> | 1 (Event Contract) | 1 (Setup) + 2 (Event Contract) + 3 (Floating Nav) | Config files + runtime i18n |
> | 2 (Cert Static) | 4 (Cert Static) | Vitest certification |
> | 3 (Cert Rendered) | 5 (Cert Rendered) | Playwright certification |
> | 4 (L1 Coverage) | 6 (L1 Coverage) | L1 page translation |
> | 5 (L2-L5 Coverage) | 7 (L2-L5 Coverage) | Extended translation |
> | 6 (Cleanup) | 8 (Cleanup) | Orphan removal + skip-i18n |

### Phase 1: Event Contract (FR-001, FR-002, FR-003, FR-004) — P1

1. Add `langchange` custom event dispatch to `i18n.setLang()` after
   `applyTranslations()` resolves
2. Add `langchange` listener in `SiteHeader.setupFloatingNav()` that
   re-reads heading `textContent` into floating nav link elements
3. Add `<page>.nav.*` keys to en.json/es.json for floating nav aria-labels

**Files**: `js/i18n/i18n.js`, `components/SiteHeader.js`, `js/i18n/en.json`,
`js/i18n/es.json`

### Phase 2: Certification Suite — Static (FR-005, FR-008, FR-009, FR-010) — P1

1. Create `data/i18n-levels.json` with directory-based auto-classification
   rules and manifest overrides
2. Create `data/i18n-allowlist.json` with terms identical in both languages
3. Create Vitest `i18n-certification.test.js`:
   - Parse all HTML files for `data-i18n` keys
   - Cross-reference against en.json entries
   - Report missing keys (fail), orphaned keys (fail), untranslated pages (warn)
   - Score coverage % per level using `i18n-levels.json`
   - Apply allowlist for identical-term false positives

**Files**: `data/i18n-levels.json`, `data/i18n-allowlist.json`,
`tests/unit/i18n-certification.test.js`

### Phase 3: Certification Suite — Rendered (FR-006, FR-007) — P1

1. Create `data/i18n-spanish-patterns.json` with regex patterns
2. Create Playwright `bilingual-certification.spec.js`:
   - Layer 1: verify `data-i18n` elements render en.json values
   - Layer 2: regex scan visible text outside `data-i18n` for Spanish patterns
   - Floating nav label check on L1 pages
   - L1 pages only (4 pages: index, ruta, empresas, personas)

**Files**: `data/i18n-spanish-patterns.json`,
`tests/e2e/bilingual-certification.spec.js`

### Phase 4: L1 Coverage Expansion (FR-011) — P1

1. Audit L1 pages for missing `data-i18n` keys
2. Add missing keys to HTML and en.json/es.json
3. Run certification suite — target: 100%, zero remnants

**Files**: `index.html`, `ruta/index.html`, `empresas/index.html`,
`personas/index.html`, `js/i18n/en.json`, `js/i18n/es.json`

### Phase 5: L2-L5 Coverage Expansion (FR-012, FR-013, FR-014, FR-015) — P2

1. Add translation keys per level targets
2. Run certification suite per level

**Files**: Multiple HTML pages per level, `js/i18n/en.json`, `js/i18n/es.json`

### Phase 6: Cleanup (FR-016, FR-017) — P3

1. Remove orphaned en.json keys identified by certification
2. Add `data-skip-i18n` support to SiteHeader.loadI18n()
3. Mark pages that should skip i18n
4. Promote zero-key page warnings to failures in certification suite

**Files**: `components/SiteHeader.js`, `js/i18n/en.json`, various HTML pages

## Key Design Decisions

| Decision | Choice | Rationale (Constitution ref) |
|----------|--------|------------------------------|
| Floating nav notification | `langchange` CustomEvent | Clean contract, event-driven decoupling (IV, XII) |
| Section label source | Re-read heading textContent | Zero new i18n keys for labels; headings already translated (XIV) |
| Strategy 3 exemption | Warn, not fail | Auto-generated sections lack i18n; low priority pages (XIV) |
| Test runner split | Vitest static + Playwright rendered | Fast CI for data checks; browser-real for rendering (IX) |
| Translation check | Exists + non-empty + differs from es.json | Catches stubs and copy-paste; allowlist for exceptions |
| Page classification | Directory auto-classify + manifest overrides | Low maintenance with precision for edge cases (XIV) |
| Nav key namespace | `<page>.nav.*` | Per-page namespacing allows page-specific aria-labels |
| Cotizador pages | Out of scope, warned | Dynamic JS content needs separate approach |
| Zero-key pages | Warnings now, failures after P3 | Progressive enforcement aligned with priority ordering |

## Complexity Tracking

No constitutional violations. All decisions use simplest viable approach.
