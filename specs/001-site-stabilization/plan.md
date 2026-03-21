# Implementation Plan: Site Stabilization

**Branch**: `001-site-stabilization` | **Date**: 2026-03-21 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-site-stabilization/spec.md`

## Summary

Stabilize the MetodologIA site by fixing navigation
inconsistencies across 63+ pages, migrating all CTAs to
the centralized CTAHandler system, fixing cotizador ROI
simulation bugs (non-functional CTA in personas variant,
duplicate assignment in empresas), and standardizing
resource page patterns. The approach extends the existing
CTAHandler to support dynamic body templates for
cotizador flows, replaces inline nav/footer markup with
shared web components, and cleans up orphan CTA entries.

## Technical Context

**Language/Version**: HTML5, CSS3 (Tailwind CSS via local
build), JavaScript ES2020+ (vanilla, no framework)
**Primary Dependencies**: Tailwind CSS (dev build),
Lucide Icons (client-side), Google Fonts
**Storage**: sessionStorage (cotizador wizard state),
JSON files (cta-data.json)
**Testing**: Manual browser testing (no automated test
framework — static site)
**Target Platform**: Modern browsers (Chrome, Firefox,
Safari, Edge — latest 2 versions)
**Project Type**: Static web site (no build step for
serving, Tailwind compilation is dev-only)
**Performance Goals**: All pages load under 3s on 3G,
Core Web Vitals passing
**Constraints**: No server-side logic (Constitution I:
Static-First), no build dependencies for serving
**Scale/Scope**: ~80 HTML pages, 2 JS components, 1 CTA
handler, 3 cotizador pages, 27+ resource pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check
after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Static-First | PASS | All changes are client-side HTML/JS/CSS |
| II. Accessibility-First | PASS | Component migration preserves ARIA; adding skip-to-content where missing |
| III. SEO Integrity | PASS | No page additions/removals; existing meta tags unaffected |
| IV. Component Consistency | PASS | This is the primary goal — unifying to shared components |
| V. Brand Separation | PASS | No cross-brand references introduced |

No violations. No complexity tracking needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-site-stabilization/
  spec.md              # Feature specification
  plan.md              # This file
  research.md          # Research findings
  data-model.md        # Data model definitions
  quickstart.md        # Test scenarios
  tasks.md             # Task breakdown (iikit-tasks)
```

### Source Code (repository root)

```text
components/
  SiteHeader.js        # MODIFY — no changes needed
  SiteFooter.js        # MODIFY — no changes needed

js/
  CTAHandler.js        # MODIFY — add template support
  cta-data.json        # MODIFY — add cotizador entries,
                       #   connect orphans or remove

ruta/
  cotizador.html       # MODIFY — migrate mailto to CTA
  cotizador-empresas.html  # MODIFY — fix duplicate,
                           #   migrate mailto to CTA
  cotizador-personas.html  # MODIFY — wire CTA button

legal/
  privacidad.html      # MODIFY — add data-cta attribute

recursos/
  biblioteca-prompts/
    biblioteca_para_estudio.html  # MODIFY — replace
                                  #   inline footer
```

**Structure Decision**: Existing static site structure.
No new directories. All changes modify existing files.
The `components/` and `js/` directories contain the
shared infrastructure; page files consume them.

## Architecture

```text
┌─────────────────────────────────────────────┐
│                  Browser                     │
│                                             │
│  ┌───────────┐  ┌───────────┐  ┌─────────┐ │
│  │SiteHeader │  │SiteFooter │  │CTAHandler│ │
│  │    .js    │  │    .js    │  │   .js    │ │
│  └─────┬─────┘  └─────┬─────┘  └────┬────┘ │
│        │               │             │      │
│        ▼               ▼             ▼      │
│  ┌─────────────────────────────────────────┐│
│  │         HTML Pages (80+)                ││
│  │  <site-header>  <site-footer>           ││
│  │  [data-cta]     [data-cta-params]       ││
│  └─────────────────────────────────────────┘│
│                      │                      │
│                      ▼                      │
│              ┌──────────────┐               │
│              │cta-data.json │               │
│              │ (20 entries) │               │
│              └──────────────┘               │
│                      │                      │
│              ┌───────┴────────┐             │
│              │ sessionStorage │             │
│              │ (cotizadores)  │             │
│              └────────────────┘             │
└─────────────────────────────────────────────┘
```

## Change Strategy

### Phase A: CTA System Extension

1. **Extend CTAHandler.js** to support dynamic body
   templates. Add a `buildMailto(ctaId, params)` method
   that:
   - Reads the CTA entry from cta-data.json
   - If entry has `template: true`, interpolates
     `{{variable}}` placeholders in body using `params`
   - Falls back to static body if no params provided
   - Returns the complete mailto: URL

2. **Add cotizador CTA entries** to cta-data.json:
   - `cotizador-propuesta`: template entry for personal
     ROI simulation results
   - `cotizador-empresas-propuesta`: template entry for
     enterprise simulation results

3. **Clean up orphan entries**: Verify whether
   `beta-tester-gemini` and `beta-tester-gpt` should be
   connected to resource category pages or removed

### Phase B: Cotizador CTA Migration

1. **cotizador.html**: Replace inline mailto construction
   (line ~1147) with CTAHandler.buildMailto() call using
   the `cotizador-propuesta` template entry

2. **cotizador-empresas.html**: Remove duplicate mailto
   assignment (line 1557), replace inline construction
   with CTAHandler.buildMailto() using the
   `cotizador-empresas-propuesta` template entry

3. **cotizador-personas.html**: Wire the `#mailto-cta`
   anchor to CTAHandler using the appropriate CTA entry.
   This fixes the non-functional CTA button.

### Phase C: Navigation Consistency

1. **biblioteca_para_estudio.html**: Replace inline
   footer (lines ~4216-4308) with `<site-footer>` and
   correct `base-path`

2. **legal/privacidad.html**: Add `data-cta="legal-
   privacidad"` to the existing mailto link (line ~428)

3. **Icebreaker page**: Leave as-is — noindex workshop
   page with intentional custom nav (timer feature)

### Phase D: Resource Pages Polish

1. Verify all resource category pages use data-cta
   system for beta-tester CTAs
2. Connect orphan CTA entries to corresponding pages or
   remove them
3. Validate navigation consistency across all 27+
   resource pages
