# Feature Specification: Sitewide UX/UI Polish

**Feature Branch**: `003-sitewide-ux-polish`
**Created**: 2026-03-22
**Status**: Draft
**Input**: Sitewide UX/UI audit and polish — fix lang toggle visibility, eliminate layout shifts on language switch, complete bilingual hero coverage, fix dead links, align to MetodologIA brand voice standards, achieve visual consistency across all 63+ public pages.

## User Stories

### User Story 1 - Visible, Stable Language Toggle (Priority: P1)

A visitor on any page sees a pill-shaped ES/EN toggle in the navigation bar (desktop and mobile). Clicking it switches the page language instantly without any layout shift, reflow, or visual jank. The toggle looks identical in both states — only the active indicator changes.

**Why this priority**: The bilingual system (002) is deployed but the toggle is invisible on desktop because it's placed outside the visible nav container. Users cannot access the EN version at all. This is the #1 blocker.

**Independent Test**: Navigate to any page, confirm toggle is visible in nav bar, click EN, verify page translates with zero layout shift (no CLS delta).

**Acceptance Scenarios**:

1. **Given** a user loads any public page on desktop, **When** the page renders, **Then** the ES/EN toggle is visible in the right section of the nav bar, between Campus link and CTA button.
2. **Given** a user loads any public page on mobile, **When** the user opens the hamburger menu, **Then** the ES/EN toggle is visible and tappable within the mobile menu.
3. **Given** a user clicks EN on the toggle, **When** the language switches, **Then** no element on the page changes size, position, or causes reflow — CLS delta is 0.
4. **Given** the toggle is in ES state, **When** the user views the toggle, **Then** ES has the active/gold indicator and EN is semi-transparent; the overall toggle width and shape remain identical.
5. **Given** the toggle is in EN state, **When** the user views the toggle, **Then** EN has the active/gold indicator and ES is semi-transparent; toggle dimensions unchanged.

---

### User Story 2 - Complete Bilingual Hero & Section Text (Priority: P1)

Every hero section, CTA, badge, and visible text element across all public pages has `data-i18n` attributes and corresponding EN translations. No Spanish-only text remains in user-visible content areas.

**Why this priority**: Heroes are the first thing visitors see. Untranslated hero text in EN mode breaks trust and professionalism.

**Independent Test**: Switch to EN on each page, verify all hero titles, subtitles, CTAs, badges, and section headers display in English.

**Acceptance Scenarios**:

1. **Given** a user switches to EN on the homepage, **When** they view the hero, **Then** the title, subtitle, badge, CTAs, and closing quote all display in English.
2. **Given** a user switches to EN on any empresas/ or personas/ page, **When** they view the hero, **Then** all hero text, program cards, and CTAs display in English.
3. **Given** a user switches to EN on any page, **When** they scroll the full page, **Then** zero Spanish text remains in any user-facing content (nav, hero, sections, footer, modals, CTAs).
4. **Given** `es.json` translations exist, **When** compared to the HTML fallback text, **Then** all ES translations exactly match the HTML source text (no mismatches like "Way of Working" vs "Forma de Trabajar").

---

### User Story 3 - Navigation Polish: No Closing Quote in Menu (Priority: P1)

The index.html hook-quote section ("El éxito depende más de cómo te apalancas...") must not render as part of or overlap with the navigation menu. The quote should sit cleanly below the nav with proper spacing and visual separation.

**Why this priority**: User explicitly reported this as a visual defect. The quote appearing to be part of the menu creates confusion about the navigation structure.

**Independent Test**: Load homepage, verify quote is visually separated from the nav bar by clear spacing and does not appear to be a menu item.

**Acceptance Scenarios**:

1. **Given** a user loads the homepage, **When** they view the navigation area, **Then** the closing quote is not visible within or adjacent to the nav menu items.
2. **Given** a user views the page on mobile, **When** the nav is collapsed, **Then** the quote section does not overlap with or appear to be part of the hamburger menu.
3. **Given** the quote section exists, **When** rendered on desktop, **Then** there is adequate visual separation (spacing, divider, or background contrast) between the nav and the quote.

---

### User Story 4 - Dead Link Elimination (Priority: P2)

All `href="#"` placeholder links across the site are replaced with functional destinations or appropriate actions (mailto, contact page link, or modal trigger).

**Why this priority**: Dead links damage credibility and SEO. Multiple pages (recursos, contacto) have non-functional CTAs.

**Independent Test**: Click every CTA and link on each page, verify none result in a no-op `#` jump.

**Acceptance Scenarios**:

1. **Given** a user clicks "Escríbenos para ser Beta Tester" on recursos/index.html, **When** the link activates, **Then** it opens a mailto or navigates to contacto/.
2. **Given** a user clicks "Contactar por Email" on any page, **When** the link activates, **Then** it opens mailto:contacto@metodologia.info.
3. **Given** a user clicks "Envíanos un email" on contacto/index.html, **When** the link activates, **Then** it opens mailto:contacto@metodologia.info.
4. **Given** a complete site audit, **When** scanning all HTML files, **Then** zero `href="#"` placeholder links remain on public pages (except legitimate anchor links like back-to-top or scroll targets).

---

### User Story 5 - Visual Consistency Across Pages (Priority: P2)

All pages follow MetodologIA brand standards: consistent card styling, consistent CTA colors, proper zigzag layout patterns, section highlight animations, and brand-gold accent usage per the estandares/ guidelines.

**Why this priority**: Inconsistencies (e.g., gold card among dark cards on empresas/personas) undermine the premium brand perception.

**Independent Test**: Side-by-side comparison of equivalent sections across pages confirms uniform card styling, CTA colors, and layout patterns.

**Acceptance Scenarios**:

1. **Given** a user views the 4-card solution row on empresas/ and personas/, **When** comparing cards, **Then** all cards use the same background style (no single gold card among dark cards).
2. **Given** the estandares/layout-patterns.md zigzag standard, **When** auditing content sections, **Then** sections with text + visual columns alternate text-left/text-right per the zigzag pattern.
3. **Given** the estandares/micro-interactions.md standard, **When** auditing sections, **Then** every major section has at least one attention-grabbing micro-interaction (pulse, glow, shimmer).
4. **Given** the brand voice standard (brand_voice_v2.md), **When** auditing heading copy, **Then** pages use approved terminology (Metodo/Sistema, not Hack/Truco; (R)Evolucion, not Transformacion).

---

### User Story 6 - Stale Content & Copy Updates (Priority: P2)

Outdated date references, stale copy, and temporal content are updated to reflect the current state (March 2026).

**Why this priority**: Stale dates (e.g., "Retoma en Febrero 2026" when it's already March 2026) signal neglect.

**Independent Test**: Search all pages for date references and temporal copy, verify all are current.

**Acceptance Scenarios**:

1. **Given** the recursos/index.html podcast section says "Retoma en Febrero 2026", **When** audited, **Then** it reflects the actual current status or is removed.
2. **Given** any page contains a date-bound reference, **When** audited, **Then** the date is accurate as of March 2026 or uses relative language.

---

### User Story 7 - Missing Asset Deployment (Priority: P2)

All locally-tracked files that are referenced by the site but missing from the production server are identified and included in the deployment.

**Why this priority**: The `/data/business-logic.json` 404 breaks the ruta/ page mode-switching feature silently.

**Independent Test**: Run a 404 audit across all pages, confirm zero missing resources.

**Acceptance Scenarios**:

1. **Given** the ruta/ page references `data/business-logic.json`, **When** loaded in production, **Then** the file is served with 200 status, and mode-switching works.
2. **Given** a full-site resource audit, **When** checking all script/link/img references, **Then** zero 404 errors occur.

---

### User Story 8 - Deprecated Meta Tag Cleanup (Priority: P3)

Remove deprecated meta tags that trigger browser console warnings, specifically `apple-mobile-web-app-capable`.

**Why this priority**: Console warnings are low-severity but signal technical debt in audits.

**Independent Test**: Load any page, verify zero deprecation warnings in browser console.

**Acceptance Scenarios**:

1. **Given** any page is loaded, **When** checking the browser console, **Then** zero deprecation warnings appear related to meta tags.

---

### Edge Cases

- What happens when a user switches language on a page with modal open? Modal content must also translate via `i18n.translate()`.
- What happens when a user bookmarks the EN version and returns? Language preference persists via localStorage.
- What happens on pages with dynamically injected content (CTAHandler.js)? Dynamic content re-translates via `i18n.translate()`.
- What happens with the toggle on very narrow viewports (< 320px)? Toggle remains accessible and does not break layout.
- What happens when JavaScript is disabled? The page remains in Spanish (fallback), no toggle appears, and no broken UI results.

## Requirements

### Functional Requirements

- **FR-001**: The language toggle MUST be visible in the desktop nav bar within the right-actions container (alongside Campus and CTA).
- **FR-002**: The language toggle MUST maintain identical dimensions in both ES and EN states (fixed-width pill, no layout shift).
- **FR-003**: Switching languages MUST produce zero Cumulative Layout Shift (CLS delta = 0) on every page.
- **FR-004**: All user-facing text in hero sections, CTAs, badges, and section headers MUST have `data-i18n` attributes with corresponding EN translations.
- **FR-005**: The `es.json` translation values MUST exactly match the HTML fallback text for all keys (no mismatches).
- **FR-006**: The homepage hook-quote section MUST render with clear visual separation from the navigation bar — it MUST NOT appear to be a menu item.
- **FR-007**: All `href="#"` placeholder links MUST be replaced with functional destinations (mailto, page link, or modal trigger).
- **FR-008**: All locally-tracked assets referenced by HTML/JS MUST be included in Git and deployed to production.
- **FR-009**: Card styling within the same row/section MUST use consistent background and border treatments.
- **FR-010**: Content sections with text + visual columns MUST follow the zigzag alternation pattern per estandares/layout-patterns.md.
- **FR-011**: Stale date references MUST be updated to reflect current status.
- **FR-012**: Deprecated meta tags (e.g., `apple-mobile-web-app-capable`) MUST be removed or replaced with current standards.
- **FR-013**: All pages MUST produce zero console errors and zero 404 resource errors.
- **FR-014**: Every major content section MUST include at least one micro-interaction element per estandares/micro-interactions.md.
- **FR-015**: All heading copy MUST use MetodologIA approved terminology per brand_voice_v2.md.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Language toggle is visible and functional on 100% of public pages (desktop and mobile).
- **SC-002**: CLS delta when switching languages is 0.000 on all pages (measured via Lighthouse or CLS observer).
- **SC-003**: 100% of user-facing text elements display in English when EN is selected — zero Spanish remnants.
- **SC-004**: Zero `href="#"` placeholder links remain on any public page.
- **SC-005**: Zero 404 resource errors across all pages in production.
- **SC-006**: Zero browser console errors or deprecation warnings across all pages.
- **SC-007**: Lighthouse Performance score remains >= 90 on homepage, empresas/, personas/ after all changes.
- **SC-008**: All Playwright bilingual test suites (19-25) continue to pass at 100%.
- **SC-009**: Brand voice audit: 100% compliance with approved terminology on all page headings.
- **SC-010**: Visual consistency: all card rows within the same section use uniform styling.
