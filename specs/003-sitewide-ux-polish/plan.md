# Implementation Plan: Sitewide UX/UI Polish

**Branch**: `003-sitewide-ux-polish` | **Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-sitewide-ux-polish/spec.md`

## Summary

Fix the invisible language toggle, eliminate layout shift on language switch, complete bilingual coverage across all 63+ pages and downloadable assets, exclude decorative content from the floating nav, eliminate dead links, unify visual styling, update stale content, deploy missing assets, and remove deprecated meta tags. All changes are client-side HTML/CSS/JS edits — no new dependencies, no backend, no build changes.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript ES6+ (vanilla, no transpiler)
**Primary Dependencies**: Tailwind CSS 3.4 (dev build), Playwright 1.58 (testing)
**Storage**: N/A (static site, localStorage for language preference only)
**Testing**: Playwright (24 existing test suites at `tests/`)
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge), desktop + mobile
**Project Type**: Static multi-page site (63+ HTML pages)
**Performance Goals**: Lighthouse Performance ≥ 90 on homepage, empresas/, personas/; CLS = 0.000 on language switch
**Constraints**: No server-side logic (Constitution I), no new JS dependencies, no build step required for serving
**Scale/Scope**: 63+ public HTML pages, 24 Playwright test files, 3 JS modules modified

## Constitution Check

*GATE: Passed — all design decisions verified against Constitution v1.0.0.*

| Principle | Status | Verification |
|-----------|--------|--------------|
| I. Static-First | PASS | No server dependencies added. All changes are HTML/CSS/JS edits. |
| II. Accessibility-First | PASS | Lang toggle has ARIA radiogroup, aria-pressed, focus-visible. Skip-to-content exists. |
| III. SEO Integrity | PASS | No pages added/removed. Existing meta tags preserved. Deprecated tag removed. |
| IV. Component Consistency | PASS | Toggle uses shared `.lang-toggle` CSS. Floating nav exclusion uses reusable `data-nav-exclude` attribute. |
| V. Brand Separation | PASS | All copy changes use MetodologIA-approved terminology per brand_voice_v2.md. |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser (Client)                  │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  SiteHeader   │  │  i18n Module  │  │  Modal     │ │
│  │  (Web Comp)   │  │  (Singleton)  │  │  System    │ │
│  │              │  │              │  │            │ │
│  │ • Nav bar    │  │ • en.json    │  │ • ARIA     │ │
│  │ • Lang toggle│  │ • es.json    │  │ • Session  │ │
│  │ • Float nav  │  │ • DOM trans. │  │   Storage  │ │
│  │ • Mobile menu│  │ • localStorage│  │            │ │
│  └──────┬───────┘  └──────┬───────┘  └────────────┘ │
│         │                 │                          │
│         └────── Events ───┘                          │
│                                                      │
│  ┌──────────────────────────────────────────────────┐│
│  │          63+ Static HTML Pages                    ││
│  │  • data-i18n attributes on all visible text       ││
│  │  • Consistent card/zigzag/micro-interaction CSS   ││
│  │  • No href="#" placeholders                       ││
│  └──────────────────────────────────────────────────┘│
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                 │
│  │  CSS Layers   │  │  Static      │                 │
│  │  variables →  │  │  Assets      │                 │
│  │  base →       │  │  • JSONs     │                 │
│  │  components → │  │  • PDFs      │                 │
│  │  page-specific│  │  • HTMLs     │                 │
│  └──────────────┘  └──────────────┘                 │
└─────────────────────────────────────────────────────┘
```

## Project Structure

### Documentation (this feature)

```text
specs/003-sitewide-ux-polish/
  spec.md              # Feature specification (done)
  plan.md              # This file
  research.md          # Technical research and decisions
  data-model.md        # Client-side data structures
  quickstart.md        # Test scenarios and setup
  contracts/           # Interface contracts
    i18n-keys.md       # Translation key coverage contract
    floating-nav.md    # Section detection contract
  tasks.md             # Task breakdown (next phase — /iikit-tasks)
```

### Source Code (files modified)

```text
components/
  SiteHeader.js          # Lang toggle position, floating nav exclusion

js/
  i18n/
    en.json              # New translation keys
    es.json              # Verify fallback fidelity

estilos/
  components.css         # Card unification, micro-interactions
  home.css               # Zigzag adjustments (if needed)
  empresas.css           # Card consistency
  personas.css           # Card consistency

# 63+ HTML pages — data-i18n attributes, dead link fixes,
# deprecated meta removal, stale content updates

data/
  business-logic.json    # Ensure tracked in git

tests/
  19-25-bilingual-*.js   # Existing suites (must continue passing)
  # New test files for toggle visibility, CLS, dead links
```

**Structure Decision**: Existing static site structure. No new directories. Changes are edits to existing files plus EN variant files for downloads.

## Implementation Phases

### Phase A: Critical Path — Toggle & Floating Nav (P1)
**Files**: `components/SiteHeader.js`, `estilos/components.css`
**FRs**: FR-001, FR-002, FR-003, FR-006
**Risk**: Low — isolated JS/CSS changes in single component

1. Move desktop `lang-toggle` div inside right-actions container (before Campus link)
2. Add `data-nav-exclude` attribute to hook-quote section in index.html
3. Update `detectSections()` to skip elements with `data-nav-exclude` or class `hook-quote-section`
4. Verify CLS = 0 on language switch (toggle dimensions are fixed-width pills, no reflow expected)

### Phase B: Bilingual Completion (P1)
**Files**: 63+ HTML pages, `js/i18n/en.json`, `js/i18n/es.json`
**FRs**: FR-004, FR-005, FR-017, FR-018, FR-019
**Risk**: Medium — high volume of manual edits, key mismatches possible

1. Audit each page for missing `data-i18n` attributes on heroes, CTAs, badges, section headers
2. Add `data-i18n` attributes with consistent key naming
3. Add corresponding keys to en.json and es.json
4. Verify es.json values match HTML fallback text
5. Create EN variant files for standalone HTMLs
6. Create EN variant files for PDFs (content translation)
7. Add bilingual keys to JSON data files

### Phase C: Dead Links & Missing Assets (P2)
**Files**: 15 HTML pages, `data/business-logic.json`, `contacto/index.html`
**FRs**: FR-007, FR-008, FR-013, FR-016
**Risk**: Low — mechanical replacements

1. Replace `href="#"` with appropriate destinations (contacto/ or mailto)
2. Add general inquiry mailto CTA to contacto/index.html
3. Verify `data/business-logic.json` is tracked in git
4. Run full 404 audit

### Phase D: Visual Consistency (P2)
**Files**: `estilos/components.css`, `estilos/empresas.css`, `estilos/personas.css`, page HTMLs
**FRs**: FR-009, FR-010, FR-014, FR-015
**Risk**: Medium — visual changes require cross-page verification

1. Unify card styling (remove gold standout, all dark)
2. Apply zigzag pattern to all text+visual sections
3. Add micro-interactions per estandares/micro-interactions.md
4. Audit and fix brand terminology in headings

### Phase E: Cleanup (P2-P3)
**Files**: `index.html`, recursos/index.html, various pages
**FRs**: FR-011, FR-012
**Risk**: Low — targeted removals

1. Update stale date references
2. Remove `apple-mobile-web-app-capable` meta tag
3. Final console error audit

## Dependencies Between Phases

```
Phase A ──→ Phase B (toggle must work before bilingual audit)
Phase A ──→ Phase C (independent, can parallel with B)
Phase B ──→ Phase D (translations before visual polish)
Phase C ──→ Phase E (independent)
Phase D ──→ Phase E (visual done before final cleanup)
```

## Complexity Tracking

> No constitution violations. No complexity justifications needed.

All changes align with existing patterns. No new abstractions, no new dependencies, no architectural changes.
