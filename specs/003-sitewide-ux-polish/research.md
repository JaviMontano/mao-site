# Research: Sitewide UX/UI Polish

**Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)

## R1. Language Toggle Visibility (FR-001, FR-002, FR-003)

**Problem**: The `lang-toggle` div is rendered between the brand block and center nav links (SiteHeader.js:112), outside the `hidden md:flex` right-actions container (line 126). On desktop, the toggle is visible but positioned awkwardly — between logo and nav, not with the right-side actions where users expect utility controls.

**Decision**: Move the desktop `lang-toggle` inside the right-actions container (before the Campus link). Keep the mobile toggle in the mobile menu overlay where it already is.

**CLS prevention**: The toggle already uses fixed-width pills with `overflow: hidden` and `border-radius: 9999px` (components.css:333). Both buttons are always rendered; only `background` and `color` change on active state. No dimension changes — CLS delta is inherently 0. Verify with Playwright CLS measurement.

**Alternatives rejected**:
- Absolute positioning: fragile across breakpoints
- Separate floating toggle: violates Component Consistency principle (Constitution IV)

## R2. Floating Nav Quote Exclusion (FR-006)

**Problem**: `detectSections()` (SiteHeader.js:282) scans all `<section id="...">` elements. The homepage hook-quote uses `<section class="hook-quote-section">` (index.html:153) — it has no `id` attribute, so Strategy 1 skips it. However, if the section gains an ID or falls under Strategy 3 auto-assignment, it could appear.

**Decision**: Add an explicit exclusion in `detectSections()` for elements with class `hook-quote-section` or a `data-nav-exclude` attribute. The `data-nav-exclude` approach is more generic and constitution-aligned (Component Consistency — single pattern for all exclusions).

**Alternatives rejected**:
- CSS-only (`display:none` on floating nav item): doesn't prevent DOM inclusion
- Hardcoded text match: fragile, breaks on translation

## R3. Dead Link Audit (FR-007)

**Problem**: 26 occurrences of `href="#"` across 20 files. Categories:
- Public pages with placeholder CTAs (recursos, contacto, nosotros, legal, ruta cotizadores)
- Archived/template files (archivado/, estandares/) — exempt from fix
- Dashboard (auto-generated) — exempt

**Decision**: Replace all public-page `href="#"` with `href="contacto/index.html"` (relative path adjusted per page depth) or `mailto:contacto@metodologia.info` where the CTA text implies email. Add a general mailto CTA to contacto/index.html per FR-016.

**Files requiring changes** (public only):
1. `contacto/index.html` (1) — add mailto link
2. `legal/terminos.html` (1)
3. `legal/privacidad.html` (1)
4. `nosotros/index.html` (1)
5. `recursos/index.html` (3)
6. `recursos/playbooks/index.html` (1)
7. `recursos/miniapps-aistudio/index.html` (1)
8. `recursos/miniapps-claude/index.html` (1)
9. `recursos/flujos-genspark/index.html` (1)
10. `recursos/ebooks/index.html` (1)
11. `recursos/prototipos-v0/index.html` (1)
12. `recursos/catalogo/index.html` (1)
13. `ruta/cotizador-personas.html` (1)
14. `ruta/cotizador-empresas.html` (1)
15. `ruta/cotizador.html` (1)

## R4. Bilingual Coverage (FR-004, FR-005, FR-017, FR-018, FR-019)

**Problem**: i18n system exists (js/i18n/i18n.js) with en.json/es.json. Some hero text lacks `data-i18n` attributes. Standalone HTML downloads, PDFs, and JSON data files need EN variants.

**Decision**:
- Audit all pages for missing `data-i18n` attributes on visible text (heroes, CTAs, badges, section headers)
- Add missing keys to en.json and es.json
- Create EN variant files for standalone HTMLs, PDFs, and JSONs
- Verify es.json values match HTML fallback text exactly

**Approach**: Page-by-page audit → batch attribute additions → JSON updates → variant file creation.

## R5. Visual Consistency (FR-009, FR-010, FR-014, FR-015)

**Problem**: Mixed card styling (gold card among dark cards), inconsistent zigzag patterns, missing micro-interactions, and non-standard brand terminology in headings.

**Decision**:
- Unify card backgrounds within same-row groups (all dark, no standout gold)
- Apply zigzag pattern (text-left/right alternation) to all text+visual sections
- Add micro-interactions per estandares/micro-interactions.md
- Audit headings against brand_voice_v2.md approved terms

**References**: estandares/layout-patterns.md, estandares/micro-interactions.md, estandares/brand_voice_v2.md

## R6. Stale Content (FR-011)

**Problem**: Date-bound copy references outdated dates (e.g., "Retoma en Febrero 2026").

**Decision**: Audit all HTML for date patterns, update to current status or use relative language. Specific: recursos/index.html podcast section.

## R7. Missing Assets (FR-008, FR-013)

**Problem**: `data/business-logic.json` returns 404 in production. Breaks ruta/ mode-switching.

**Decision**: Verify file exists in git, add if missing. Full 404 audit via Playwright crawl.

## R8. Deprecated Meta Tags (FR-012)

**Problem**: `apple-mobile-web-app-capable` on index.html triggers console warnings. Only 1 page affected (index.html).

**Decision**: Remove the deprecated meta tag. No replacement needed — modern browsers don't use it.

## Technology Summary

No new dependencies required. All changes use existing stack:
- **HTML**: Manual edits to 63+ pages
- **CSS**: Minor edits to components.css (card unification, micro-interactions)
- **JS**: SiteHeader.js (toggle position, floating nav exclusion), i18n JSONs
- **Testing**: Playwright (existing test suites 19-25 for bilingual, new tests for toggle/CLS/dead-links)
