# Feature Specification: Site Stabilization

**Feature Branch**: `001-site-stabilization`
**Created**: 2026-03-21
**Status**: Draft
**Input**: User description: "El sitio tiene varios fallos funcionales: menús inconsistentes en headers/footers, CTAs no confiables, flujos de simulación ROI con problemas, página de recursos requiere mejoras."

## User Stories *(mandatory)*

### User Story 1 - Consistent Navigation (Priority: P1)

A visitor navigates the site and sees the same menu
structure on every page — same items, same order, same
behavior — regardless of which section they are in.
Currently, some pages use inline navigation instead of
the shared SiteHeader component, and the footer links
vary between pages.

**Why this priority**: Navigation is the primary
wayfinding mechanism. Inconsistency erodes trust and
makes the site feel broken. Affects every visitor on
every page.

**Independent Test**: Open any 10 pages across different
sections and verify identical header menu items and
footer link structure.

**Acceptance Scenarios**:

1. **Given** a visitor on any public page, **When** they
   view the header, **Then** they see the same 5 menu
   items (Ruta, Recursos, Servicios, Contacto, Campus)
   plus the "Primera Conversación" CTA
2. **Given** a visitor on any public page, **When** they
   view the footer, **Then** they see the same link
   structure (Servicios, Recursos, Legal columns)
3. **Given** a template/internal page (estandares/),
   **When** rendered, **Then** it either uses the shared
   components or is explicitly excluded as non-public
4. **Given** the Icebreaker case study page, **When**
   loaded, **Then** it uses SiteHeader instead of inline
   navigation
5. **Given** biblioteca_para_estudio.html, **When**
   loaded, **Then** it uses SiteFooter instead of inline
   footer markup

---

### User Story 2 - Reliable CTAs (Priority: P1)

A visitor clicks any call-to-action button on the site
and it triggers the correct behavior — email with
pre-filled subject, external link, or navigation. No
CTA should fail silently, open blank pages, or use
outdated contact information.

**Why this priority**: CTAs are the conversion mechanism.
A broken CTA directly loses business. Currently the
cotizador pages and legal pages bypass the centralized
CTA system.

**Independent Test**: Click every CTA across the site
and verify each produces the expected result (correct
mailto subject, correct URL, no 404s).

**Acceptance Scenarios**:

1. **Given** a visitor on any page with a CTA, **When**
   they click it, **Then** the CTA handler routes to the
   correct action defined in the centralized CTA data
2. **Given** the cotizador summary page, **When** the
   visitor clicks "Enviar propuesta", **Then** the mailto
   link uses the CTA system (not inline JS construction)
3. **Given** legal/privacidad.html, **When** the visitor
   clicks the contact email, **Then** it uses the
   data-cta system with the "legal-privacidad" identifier
4. **Given** cta-data.json, **When** audited, **Then**
   every entry has at least one corresponding HTML
   element, and no unused entries exist
5. **Given** any page with a CTA, **When** the CTA
   handler fails to load, **Then** the fallback href
   still provides a working contact method

---

### User Story 3 - Trustworthy ROI Simulation (Priority: P2)

A visitor uses any of the 3 cotizador pages to simulate
ROI for their training investment. The flow guides them
through each step clearly, calculations are accurate,
and the summary produces a correct, actionable result.

**Why this priority**: The cotizadores are the primary
self-service evaluation tool. Broken calculations or
confusing flows undermine the value proposition. Ranked
P2 because the current simulators are functional but
need reliability improvements.

**Independent Test**: Complete the full simulation flow
on each cotizador variant and verify calculations match
expected formulas.

**Acceptance Scenarios**:

1. **Given** a visitor on cotizador.html, **When** they
   complete all 5 steps, **Then** the summary shows
   correct ROI based on their inputs (hours, income,
   task distribution, programs selected)
2. **Given** a visitor adjusting task distribution
   sliders, **When** the total exceeds or falls below
   100%, **Then** the deviation indicator shows the
   correct percentage with appropriate color (red for
   over, amber for under, green for balanced)
3. **Given** a visitor on cotizador-empresas.html,
   **When** they select enterprise programs, **Then**
   pricing reflects the correct program costs for the
   enterprise tier
4. **Given** a visitor on cotizador-personas.html,
   **When** they reach the summary, **Then** the
   generated mailto link uses the centralized CTA system
   and includes all selected parameters
5. **Given** any cotizador page, **When** a visitor
   navigates backward in the wizard, **Then** their
   previous selections are preserved

---

### User Story 4 - Improved Resources Experience (Priority: P2)

A visitor browsing the recursos section can discover,
navigate, and access resources across all 14 free
categories and 13 premium categories without dead ends,
broken links, or confusing navigation patterns.

**Why this priority**: The resource library is a primary
value driver and SEO asset. Sub-microsites need
consistent patterns to scale. Ranked P2 because the
structure exists but needs polish.

**Independent Test**: Navigate to each resource category
from the hub, verify all item links work, and confirm
consistent layout patterns.

**Acceptance Scenarios**:

1. **Given** a visitor on recursos/index.html, **When**
   they click any category card, **Then** they land on a
   working category page with consistent layout
2. **Given** a visitor on any resource category page,
   **When** they view the page, **Then** it uses
   SiteHeader and SiteFooter components (not inline
   variants)
3. **Given** a visitor on a resource detail page,
   **When** they look for the CTA, **Then** the beta
   tester or access CTA uses the centralized data-cta
   system
4. **Given** the premium resources section, **When**
   compared to free resources, **Then** the layout and
   navigation patterns are consistent between both tiers
5. **Given** recursos/playbooks/, **When** loaded,
   **Then** the footer uses SiteFooter component instead
   of a separate footer.html file

---

### Edge Cases

- What happens when a visitor accesses a cotizador with
  all sliders at 0 (zero hours, zero income)?
- How does the site handle deep-linked resource pages
  when the base-path calculation produces an incorrect
  relative path?
- What happens when cta-data.json fails to load (network
  error or corrupt file)?
- How do resource pages behave when the visitor
  navigates directly via URL without going through the
  hub?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All public pages MUST use the SiteHeader
  web component for navigation
- **FR-002**: All public pages MUST use the SiteFooter
  web component for footer content
- **FR-003**: All CTAs MUST route through the
  centralized CTAHandler system using data-cta attributes
- **FR-004**: cta-data.json MUST contain only entries
  that have corresponding HTML elements (no orphans)
- **FR-005**: Cotizador mailto links MUST be generated
  through the CTA system, not constructed inline
- **FR-006**: Task distribution sliders MUST enforce a
  100% total with clear visual feedback for deviations
- **FR-007**: ROI calculations MUST produce consistent
  results across all 3 cotizador variants for equivalent
  inputs
- **FR-008**: All resource category pages MUST follow a
  consistent layout pattern with shared components
- **FR-009**: Inline navigation and footer markup in
  non-template pages MUST be replaced with shared
  components
- **FR-010**: CTA fallback behavior MUST ensure a
  working contact method when the handler fails to load

### Key Entities

- **CTA Entry**: Identifier, mailto subject, mailto
  body template, target email. Lives in cta-data.json.
- **Cotizador Step**: Step number, input fields,
  validation rules, calculated outputs. Part of the
  wizard flow.
- **Resource Category**: Name, slug, tier (free/premium),
  item count, layout template. Defines a sub-microsite.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of public pages use SiteHeader and
  SiteFooter components (0 inline navigation/footer
  instances)
- **SC-002**: 100% of CTAs use the data-cta system with
  entries in cta-data.json (0 inline mailto constructions
  outside the handler)
- **SC-003**: 0 unused entries in cta-data.json (every
  entry referenced by at least one HTML element)
- **SC-004**: All 3 cotizador variants produce correct
  ROI calculations for a defined set of test inputs
- **SC-005**: All 27+ resource category pages (14 free +
  13 premium) load without errors and use shared
  components
- **SC-006**: A manual walkthrough of every CTA on the
  site produces the expected action with no failures
