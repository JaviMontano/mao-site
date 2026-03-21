# Research: Site Stabilization

## R1: Navigation Inconsistency Audit

### Decision: Replace inline nav/footer with shared components

**Findings**:
- 60 pages correctly use `<site-header>` and `<site-footer>`
- 2 pages have inline alternatives:
  - `estandares/inputs/.../El_Comite_de_Compra_Icebreaker..html`
    — custom fixed nav with timer (workshop simulation page)
  - `recursos/biblioteca-prompts/biblioteca_para_estudio.html`
    — custom inline footer with mailto, WhatsApp, and
    external links
- `recursos/playbooks/footer.html` — already uses
  `<site-footer>` correctly (no issue)
- 5 pages in `estandares/` are noindex templates — exempt

**Rationale**: The Icebreaker page is an internal workshop
tool (noindex). Its custom nav includes a timer display
not available in SiteHeader. Two options: (a) extend
SiteHeader with optional timer slot, or (b) accept this
as an intentional deviation for a non-public page. Option
(b) is simpler and the page is already noindex.

The biblioteca_para_estudio.html page is also noindex but
has a full inline footer with hardcoded mailto. This
should be migrated to SiteFooter for consistency.

**Alternatives considered**:
- Extend SiteHeader with configurable slots — rejected,
  adds complexity for a single non-public page

---

## R2: CTA System Audit

### Decision: Migrate all CTAs to centralized system

**Findings**:
- CTAHandler uses event delegation on `[data-cta]`
  attributes, loading entries from `cta-data.json`
- 20 entries in cta-data.json, 18 actively used
- 2 orphan entries: `beta-tester-gemini`,
  `beta-tester-gpt` (defined but no HTML references)
- 3 pages bypass the CTA system:
  - `ruta/cotizador.html` — inline mailto at line ~1147
  - `ruta/cotizador-empresas.html` — inline mailto at
    lines ~1555-1557 (includes a duplicate assignment bug)
  - `legal/privacidad.html` — plain mailto without
    subject/body at line ~428
- `ruta/cotizador-personas.html` has an anchor element
  `#mailto-cta` but no JS mailto construction

**Rationale**: The cotizador mailto links construct
dynamic bodies with simulation results. The current
CTAHandler only supports static subjects and bodies from
cta-data.json. To migrate cotizadores, the CTAHandler
needs a template mechanism that accepts dynamic
parameters.

**Approach**: Extend CTAHandler to support dynamic body
templates with variable interpolation. Add new CTA
entries: `cotizador-propuesta` and
`cotizador-empresas-propuesta` with body templates.

For legal/privacidad.html: the `legal-privacidad` entry
already exists in cta-data.json — just add `data-cta`
attribute to the existing link.

For orphan entries: remove `beta-tester-gemini` and
`beta-tester-gpt` from cta-data.json, or add
corresponding pages. Given the resource categories
`asistentes-gemini/` and `asistentes-gpt/` exist, these
CTAs likely need corresponding HTML elements added to
those category pages.

---

## R3: Cotizador Functional Analysis

### Decision: Fix calculation bugs and CTA integration

**Findings**:
- cotizador.html: 5-step wizard, functional but mailto
  bypasses CTA system
- cotizador-empresas.html: Enterprise variant with
  **duplicate mailto assignment** bug at line 1557 (same
  statement repeated — harmless but indicates copy-paste
  error)
- cotizador-personas.html: Has `#mailto-cta` anchor but
  **no JS code to populate it** — the CTA button likely
  does nothing or navigates to `#`
- All three use `updateTareasDistribucion()` for 100%
  enforcement — this works correctly
- Progress bars cap at 100% visually — correct
- Deviation indicators (Faltan/Sobran) work correctly

**Critical bug**: cotizador-personas.html has a
non-functional CTA button. The mailto anchor exists in
HTML but has no JavaScript to build the mailto URL.

**Approach**: Implement CTAHandler template support,
create CTA entries for each cotizador, wire up the
personas cotizador CTA.

---

## R4: Resources Structure Analysis

### Decision: Standardize resource page patterns

**Findings**:
- 14 free categories + 13 premium categories (biblioteca-
  prompts has no premium mirror — intentional)
- All resource category pages use SiteHeader/SiteFooter
- Layout patterns are mostly consistent across categories
- `recursos/playbooks/footer.html` is a standalone file
  that correctly uses `<site-footer>` — it appears to be
  loaded as an include/fragment, not a standalone page
- biblioteca_para_estudio.html (noindex) has the only
  inline footer among resource pages

**Approach**: The resource pages are in better shape than
initially reported. Focus on:
1. Ensuring all beta-tester CTAs in resource categories
   reference valid cta-data.json entries
2. Connecting the 2 orphan CTA entries to their
   corresponding resource category pages
3. Migrating biblioteca_para_estudio.html inline footer
