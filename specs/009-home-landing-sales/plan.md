# Implementation Plan: Home como Landing Vendedora (3 CTAs Primarios)

**Branch**: `009-home-landing-sales` | **Date**: 2026-04-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/009-home-landing-sales/spec.md` (v7 consolidated)
**Version**: v5 (v4 + Socratic debates: write failure modes R14, shell contract R15)

## Summary

Redesign the home page (`index.html`) as a Neo-Swiss Light sales landing with a 3-CTA conversion pyramid (Diagnóstico P1, Recursos P2, Oferta P3), a 6-step diagnostic flow persisted to Firestore via anonymous auth, full responsive design across 6 viewport classes (xs–2xl), an adaptive blueprint with 3 toggles (locale/theme/audience), and a 13-page shell scaffold. The site consumes Firebase BaaS read-only for published content and write-only (append-only) for `leads/` and `diagnostics/`. No server-side runtime. Constitution v7.0.0 governs all decisions.

## Technical Context

**Language/Version**: JavaScript ES2022+ (vanilla, no transpiler), CSS3 with Custom Properties, HTML5
**Primary Dependencies**: Firebase JS SDK v10 (already in tree: `js/cms/firebase-config.js`), Tailwind CSS (prebuilt `dist/output.css`), Lucide Icons (via `js/icons.js`), Web Components API (native)
**Storage**: Firestore (reads: `programs/`, `resources/`, `testimonials/`; writes: `leads/{uid}`, `diagnostics/{uid}`), IndexedDB (SWR cache via `js/cms/cache-manager.js`), localStorage (`mdg_theme`, `mdg_locale`, `mdg_audience`, diagnostic progress)
**Testing**: Vitest (unit), Firebase Emulator Suite (integration/security rules), Playwright (E2E/visual/a11y)
**Target Platform**: Modern evergreen browsers — Chrome 110+, Safari 15+, Firefox 110+, Edge 110+, iOS Safari 15+, Chrome Android 110+
**Project Type**: Static web — single-project structure, no monorepo
**Performance Goals**: LCP ≤2.5s on 4G / ≤1.5s desktop, TBT <200ms, CLS <0.1, INP <200ms, toggle transitions <100ms, Lighthouse ≥90 all categories
**Constraints**: <250 KB initial (HTML + critical CSS), <800 KB total, zero server runtime (Constitution I), zero new dependencies (NFR-001, C-002), Hostinger shared hosting with CDN
**Scale/Scope**: 13 pages, 2 locales (ES/EN), 2 audiences (persona/empresa), <10K daily visitors, 1 human + AI agents team

## Constitution Check (Pre-Design)

*GATE: All 23 principles validated. No violations found.*

| Principle | Status | Notes |
|---|---|---|
| I. BaaS-First, Zero Server | PASS | Firebase-only backend; zero server runtime [CODE] |
| II. Accessibility-First | PASS | WCAG 2.1 AA, keyboard nav, ARIA, skip-link (FR-061..FR-065) [DOC] |
| III. SEO Integrity | PASS | Meta tags, sitemap, canonical URLs, 301 redirects (US-7) [DOC] |
| IV. Component Consistency | PASS | Web Components (SiteHeader, SiteFooter), design tokens, `data-i18n` contract [CODE] |
| V. Brand Separation | PASS | MetodologIA only; no Sofka/JM Labs in public content [DOC] |
| VI. Cloud-First + Static Fallback | PASS | Dual-source bridge permanent; `migration-bridge.js` + static dictionaries [CODE] |
| VII. Secure by Default | PASS | Security rules per contract; App Check on PII writes; input sanitization [DOC] |
| VIII. SWR + Explicit Offline UX | PASS | Offline/syncing/fallback pills, `aria-live`, Playwright test (FR-097..FR-099) [DOC] |
| IX. TDD | PASS | ATDD outer + TDD inner; 85% weighted coverage (NFR-007..NFR-008) [DOC] |
| X. Design System Governance | PASS | Neo-Swiss Light/Dark, canonical tokens from `estilos/variables.css` (FR-040..FR-045) [DOC] |
| XI. Brand Voice Integrity | PASS | Minto pyramid, red-list terms, voice audit per audience (FR-046) [DOC] |
| XII. Code Sustainability | PASS | Business-readable names, README per dir, no dead code [DOC] |
| XIII. Think First | PASS | Spec → Plan → Tasks → Tests → Code pipeline enforced [DOC] |
| XIV. Simple First | PASS | No premature abstractions; hand-authored critical CSS over tooling (R5) [DOC] |
| XV. BDD Full-Spectrum | PASS | Multi-angle scenarios (UX, security, perf, a11y, brand, data) per US [DOC] |
| XVI. Sequential-First | PASS | Sequential default; WIP ≤3; branch-per-task [DOC] |
| XVII. Continuous Learning | PASS | Research decisions archived; insights from Socratic debates [DOC] |
| XVIII. Indexable Repo | PASS | README per new directory; sitemap governance [DOC] |
| XIX. Bug Protocol | N/A | No bugs in scope |
| XX. Branch-to-Environment Parity | PASS | feature → staging → main → production (C-005) [DOC] |
| XXI. Zero Hardcoding | PASS | Tokens in CSS vars; content in dictionaries/Firestore; config in env [DOC] |
| XXII. PII-Append-Only | PASS | `leads/` and `diagnostics/` append-only; dedup deferred to 010 (FR-017) [DOC] |
| XXIII. Feature-Bounded Architecture | PASS | Collections table in spec §4.4; backoffice scoped to 010 [DOC] |

## Project Structure

### Documentation (this feature)

```text
specs/009-home-landing-sales/
  spec.md                  # Feature specification (v7 consolidated)
  plan.md                  # This file (v4)
  research.md              # Phase 0: 13 resolved technical decisions
  data-model.md            # Phase 1: read/write entities for 009 scope
  quickstart.md            # Phase 1: manual + automated validation guide
  contracts/
    diagnostic-logic.json  # Diagnostic scoring contract (§4.5)
    analytics-events.md    # Firebase Analytics event catalog (FR-070..072)
    firestore-rules.md     # Security rules contract (per-collection)
  adaptive-blueprint.md    # 3-axis toggle system + page shell spec
  sitemap.md               # 13-page IA + redirects + nav structure
  robustness-v1.md         # TDD/ATDD/coverage/flows contract
  backcasting.md           # FR→US→SC→Constitution traceability
  checklists/              # Pre-merge checklists
  tasks.md                 # Phase 5 output (NOT created by /iikit-02-plan)
```

### Source Code (repository root)

```text
# ── Pages (13 canonical) ──────────────────────────────────────
index.html                          # Home v2 landing (primary deliverable)
diagnostico/index.html              # 6-step diagnostic flow
empresas/index.html                 # B2B hub (existing, shell upgrade)
personas/index.html                 # B2C hub (existing, shell upgrade)
programas/index.html                # Programs listing (?slug= detail)
recursos/index.html                 # Resource catalog (existing, shell upgrade)
metodo/index.html                   # Methodology page (shell)
casos/index.html                    # Case studies (shell)
nosotros/index.html                 # About (shell)
insights/index.html                 # Insights (?slug= detail, shell)
contacto/index.html                 # Contact form (shell)
legal/index.html                    # Legal / privacy (shell)
404.html                            # Not found (shell)

# ── JavaScript modules (new for 009) ──────────────────────────
js/diagnostic/
  logic.js                          # Pure scoring + threshold logic
  state.js                          # localStorage state machine
  controller.js                     # DOM orchestration + Firestore write
js/audience/
  state.js                          # AudienceState management
  controller.js                     # Toggle + slot hydration
js/analytics/
  events.js                         # Typed event emitter (consent-gated)
  consent.js                        # Cookie banner + mdg_consent logic
js/theme/
  toggle.js                         # Theme switch + persistence
js/state/
  bus.js                            # Lightweight event bus (pub/sub)
js/blueprint/
  shell.js                          # Common page shell bootstrap
  slot-resolver.js                  # ContentSlot → DOM hydration
  slug-router.js                    # Client-side ?slug=X router for dynamic templates
js/sidebar/
  scroll-spy.js                     # IntersectionObserver scroll tracking (pure)
  sections-config.js                # Per-page 7-section definitions (12 pages × 7 = 84 entries)
js/redirects/
  legacy-router.js                  # 301 legacy URL resolution (17 rules)

# ── JavaScript modules (existing, consumed) ───────────────────
js/cms/
  firebase-config.js                # Firebase init
  content-service.js                # Firestore reads
  cache-manager.js                  # IndexedDB SWR
  migration-bridge.js               # Dual-source (Firestore ↔ static)
  auth-service.js                   # Anonymous auth + claims
  init.js                           # Bootstrap
  admin-api.js                      # (not used in 009 — read-only)
js/i18n/
  i18n.js                           # i18n module
  dictionaries/
    home.json                       # NEW: home page content slots (ES/EN × persona/empresa)
    common.json                     # Shared keys (nav, footer, toggles)
    diagnostico.json                # NEW: diagnostic flow copy
    {pageSlug}.json                 # Per-page dictionaries
js/icons.js                         # Lucide icon loader
js/modal-system.js                  # Modal for resource premium gate

# ── Web Components ────────────────────────────────────────────
components/
  SiteHeader.js                     # SIMPLIFIED: logo + 3 nav (Ruta/Servicios/Contacto) + hamburger mobile
  SiteFooter.js                     # MODIFIED: 12-page link list
  SiteSidebar.js                    # NEW: 7-section numbered nav with scroll-spy (per page)
  TripleToggle.js                   # NEW: always-visible fixed bottom-left (theme/locale/audience)
  DiagnosticStepper.js              # NEW: 6-step wizard component
  OfflinePill.js                    # NEW: cache state indicator
  ConsentBanner.js                  # NEW: LGPD analytics consent
  ProgramCard.js                    # NEW: program listing card

# ── Styles ────────────────────────────────────────────────────
estilos/
  variables.css                     # MODIFIED: add Neo-Swiss Light/Dark tokens (Constitution X)
  critical.css                      # NEW: hand-authored fold CSS (FR-092, FR-096)
  home.css                          # MODIFIED: home v2 layout
  diagnostic.css                    # NEW: stepper + result screen
  blueprint.css                     # NEW: sidebar + header + main layout system (260px sidebar, 72px header)
  sidebar.css                       # NEW: sidebar nav styles, scroll-spy active state
  triple-toggle.css                 # NEW: fixed bottom-left toggle pill styles
  components.css                    # MODIFIED: new component styles

# ── Admin Content Editor ─────────────────────────────────────
admin/
  index.html                        # EXISTING: admin shell with Firebase Auth login
  content-editor.html               # NEW: 4-variant content editor UI
  content-editor.js                 # NEW: page picker + slot editor + Firestore CRUD for slots/{pageSlug}

# ── Firebase ──────────────────────────────────────────────────
firebase/
  firestore.rules                   # MODIFIED: add leads/ + diagnostics/ + slots/ rules
  firestore.indexes.json            # MODIFIED: add composite indexes

# ── Infrastructure ───────────────────────────────────────────
.htaccess                           # NEW: 17 RewriteRule 301 redirects for SEO

# ── Scripts ───────────────────────────────────────────────────
scripts/
  seed.js                           # NEW: idempotent seeder (programs, resources, testimonials)
  generate-sitemap-xml.js           # NEW: 12-URL sitemap generator
  count-pages.js                    # NEW: 13-page constraint enforcer (pre-commit)

# ── Tests ─────────────────────────────────────────────────────
tests/
  unit/
    diagnostic-logic.spec.js        # Pure scoring (100% coverage)
    diagnostic-state.spec.js        # localStorage state machine
    analytics-events.spec.js        # Consent gating, envelope, PII rules
    theme-toggle.spec.js            # Theme persistence + fallback
    audience-state.spec.js          # AudienceState provenance chain
    bus.spec.js                     # Event bus (100% coverage)
    slot-resolver.spec.js           # ContentSlot fallback cascade
  integration/
    security-rules.spec.js          # Emulator: leads/ + diagnostics/ CRUD
    home-firestore.spec.js          # Emulator: SWR + append-only
  e2e/
    home-fold.spec.js               # Responsive fold: CTA visible in 6 viewports
    home-a11y.spec.js               # axe-core audit + keyboard tab order
    home-critical-css.spec.js       # First paint without FOUC
    home-i18n.spec.js               # ES↔EN switch, zero raw keys
    home-offline-pill.spec.js       # Firestore stub → pill appears
    diagnostic-flow.spec.js         # 6-step happy path + result
    adaptive-blueprint.spec.js      # 52-combo matrix (13 pages × 2 locale × 2 audience)
    sitemap-redirects.spec.js       # Legacy URL 301s + sitemap.xml validation
  features/
    us-1-diagnostic.feature         # ATDD scenarios from spec
    us-2-resources.feature
    us-3-oferta.feature
    us-4-neoswiss.feature
    us-5-responsive.feature
    us-6-blueprint.feature
    us-7-sitemap.feature
```

**Structure Decision**: Single-project flat structure extending the existing repo layout. No monorepo, no bundler. New JS modules organized by domain concern (`diagnostic/`, `audience/`, `analytics/`, `theme/`, `state/`, `blueprint/`) following Constitution XII (business-readable). Tests follow the existing `tests/` hierarchy with unit/integration/e2e/features separation per NFR-007..NFR-013.

### Module Dependency Graph

Import relationships between new modules and existing SDK. Arrows = `import`. Leaf nodes have zero internal dependencies and can be implemented first (task parallelization candidates).

```
                     ┌─────────────────────────────────────┐
                     │        Pages (index.html, etc.)      │
                     └──┬──────┬──────┬──────┬──────┬──────┘
                        │      │      │      │      │
                        ▼      ▼      ▼      ▼      ▼
              ┌─────────┐ ┌────────┐ ┌──────┐ ┌─────────┐ ┌───────────┐
              │blueprint/│ │diagnos-│ │audi- │ │analytics│ │ redirects/│
              │shell.js  │ │tic/    │ │ence/ │ │/        │ │legacy-    │
              │slot-     │ │control-│ │contr-│ │events.js│ │router.js  │
              │resolver  │ │ler.js  │ │oller │ │consent  │ │           │
              └──┬───┬───┘ └┬──┬───┘ └┬──┬──┘ └──┬──────┘ └───────────┘
                 │   │      │  │      │  │       │              ▲
                 │   │      │  │      │  │       │         (no imports)
                 │   │      ▼  │      ▼  │       │
                 │   │  ┌──────┤  ┌──────┤       │
                 │   │  │diag/ │  │audi/ │       │
                 │   │  │logic │  │state │       │
                 │   │  │.js   │  │.js   │       │
                 │   │  └──────┘  └──────┘       │
                 │   │   (pure)    (pure)         │
                 │   │                            │
                 ▼   ▼                            ▼
          ┌────────────────┐              ┌──────────────┐
          │  js/i18n/      │              │  state/      │
          │  i18n.js       │              │  bus.js      │
          │  dictionaries/ │              │  (pure)      │
          └────────────────┘              └──────────────┘
                 │
                 ▼
          ┌────────────────────────────────────────────┐
          │          js/cms/ (existing SDK)             │
          │  content-service → cache-manager → IDB     │
          │  migration-bridge → content-service         │
          │  auth-service → firebase-config             │
          │  init.js (bootstrap)                        │
          └────────────────────────────────────────────┘
                 │
                 ▼
          ┌────────────────┐    ┌──────────────┐
          │  theme/        │    │ components/  │
          │  toggle.js     │    │ (Web Comps)  │
          │  (pure)        │    │ import from  │
          └────────────────┘    │ all above    │
                                └──────────────┘
```

**Leaf modules (zero internal deps — implement first)**:
- `state/bus.js` — pure event bus
- `diagnostic/logic.js` — pure scoring
- `audience/state.js` — pure state machine
- `theme/toggle.js` — pure theme persistence
- `redirects/legacy-router.js` — pure URL resolver

**Mid-layer (depend on leaves + existing SDK)**:
- `analytics/events.js` → `state/bus.js`
- `analytics/consent.js` → (standalone, cookie-only)
- `blueprint/slot-resolver.js` → `js/i18n/`, `audience/state.js`
- `blueprint/shell.js` → `slot-resolver.js`, `theme/toggle.js`, `state/bus.js`
- `diagnostic/state.js` → `state/bus.js` (localStorage orchestration)

**Top-layer (depend on mid-layer)**:
- `diagnostic/controller.js` → `diagnostic/logic.js`, `diagnostic/state.js`, `js/cms/auth-service.js`, `analytics/events.js`
- `audience/controller.js` → `audience/state.js`, `blueprint/slot-resolver.js`, `state/bus.js`

**Web Components (depend on everything above)**:
- `DiagnosticStepper.js` → `diagnostic/controller.js`
- `OfflinePill.js` → `js/cms/cache-manager.js`, `state/bus.js`
- `ConsentBanner.js` → `analytics/consent.js`
- `ProgramCard.js` → (standalone, template-only)
- `SiteHeader.js` (modified) → `theme/toggle.js`, `audience/controller.js`, `js/i18n/`
- `SiteFooter.js` (modified) → `js/i18n/`

## Architecture

### System overview (009 scope only)

```
┌────────────────────────────────────────────────────────────────────┐
│                    Visitor Browser (client)                        │
│                                                                    │
│  ┌──────────┐  ┌──────────────┐  ┌────────────┐  ┌────────────┐  │
│  │ 13 HTML  │  │ JS Modules   │  │ Web        │  │ CSS        │  │
│  │ Pages    │──│ (diagnostic, │──│ Components │──│ (tokens +  │  │
│  │ (shell)  │  │  audience,   │  │ (Header,   │  │  critical + │  │
│  │          │  │  analytics,  │  │  Footer,   │  │  Tailwind)  │  │
│  │          │  │  theme, i18n,│  │  Stepper,  │  │            │  │
│  │          │  │  blueprint)  │  │  Pill, …)  │  │            │  │
│  └──────────┘  └──────┬───────┘  └────────────┘  └────────────┘  │
│                       │                                            │
│           ┌───────────┴──────────┐                                │
│           │ js/cms/ SDK          │                                │
│           │ (content-service,    │                                │
│           │  cache-manager,      │                                │
│           │  migration-bridge,   │                                │
│           │  auth-service)       │                                │
│           └───────────┬──────────┘                                │
│                       │                                            │
│           ┌───────────┴──────────┐                                │
│           │ IndexedDB (SWR)      │                                │
│           └──────────────────────┘                                │
└───────────────────────┬────────────────────────────────────────────┘
                        │ HTTPS (Firebase SDK)
                        ▼
┌────────────────────────────────────────────────────────────────────┐
│                    Firebase BaaS (Google)                          │
│                                                                    │
│  ┌───────────┐  ┌──────┐  ┌─────────┐  ┌───────────┐  ┌───────┐ │
│  │ Firestore │  │ Auth │  │ Storage │  │ Analytics │  │ App   │ │
│  │ (7 colls) │  │(anon)│  │ (assets)│  │ (events)  │  │ Check │ │
│  └───────────┘  └──────┘  └─────────┘  └───────────┘  └───────┘ │
└────────────────────────────────────────────────────────────────────┘
                        │
                        │ git pull SSH (:65002)
                        ▼
┌────────────────────────────────────────────────────────────────────┐
│          Hostinger (static hosting + CDN + SSL)                    │
│          /public_html/ ← main branch                              │
└────────────────────────────────────────────────────────────────────┘
```

### Node classifications (for dashboard)

| Node | Classification |
|---|---|
| Visitor Browser | client |
| 13 HTML Pages | client |
| JS Modules | client |
| Web Components | client |
| CSS | client |
| js/cms/ SDK | client |
| IndexedDB | storage |
| Firestore | storage |
| Firebase Auth | external |
| Firebase Storage | external |
| Firebase Analytics | external |
| App Check | external |
| Hostinger | external |

### Data flow — Read path (content)

1. Page loads → `shell.js` bootstraps toggles (locale, theme, audience) from localStorage/URL
2. `slot-resolver.js` resolves content from `js/i18n/dictionaries/{pageSlug}.json` (static fallback)
3. `migration-bridge.js` checks if Firestore is available + feature flag `cms-i18n` ON
4. If Firestore reachable: `content-service.js` → `cache-manager.js` (IndexedDB SWR) → Firestore
5. Offline pill reflects cache state (fresh/stale/syncing/fallback) via `OfflinePill.js`

### Data flow — Write path (diagnostic → lead)

**Happy path:**

1. User starts diagnostic → `diagnostic/state.js` saves progress to localStorage
2. User completes step 6 (PII) → `auth-service.js` signs in anonymously
3. `diagnostic/controller.js` builds `diagnostic` + `lead` docs per data-model contract
4. localStorage: save complete responses + computed result (`synced: false`)
5. **Screen: show result immediately** (pure function from `diagnostic/logic.js`, zero network dependency)
6. App Check token attached → Firestore create (`diagnostics/{uid}`, `leads/{uid}`) — **background, non-blocking**
7. On success: mark `synced: true` in localStorage; fire `diagnostic_completed` analytics event (if consent)
8. `mdg_returning` cookie set (SHA-256 of email)

**Failure path — Optimistic Result + Deferred Sync (R14):**

If step 6 fails (network down, auth failure, App Check invalid, Firestore quota):

1. User **already sees result** (step 5 executed before write attempt)
2. localStorage marked `pending_sync: true` + `sync_attempt_ts` + `sync_failures: 1`
3. **No error shown** — user is viewing their result at peak commitment moment
4. On next page load (any page with `shell.js`): detect `pending_sync`, retry write
5. Retry strategy: max 3 attempts, exponential backoff (1s → 4s → 16s)
6. On retry success: clear `pending_sync`, fire delayed `diagnostic_completed` analytics
7. After 3 failures: show **sync pill** (reuses `OfflinePill.js` pattern, FR-097..FR-099):
   `"Tu diagnóstico está guardado localmente. Se sincronizará cuando haya conexión."`
   — not a modal, not blocking, consistent with existing offline UX
8. `mdg_returning` cookie set regardless of sync status (email available locally)

**Accepted risks:** localStorage cleared before sync = lead lost (~0.001%); incognito + close = lead lost (acceptable: user opted out of persistence). Dedup remains deferred to 010 (R3).

### Key design decisions (from research.md)

| # | Decision | Constitutional anchor |
|---|---|---|
| R1 | Neo-Swiss Light default, Dark mirror opt-in | X Design System |
| R2 | Firebase BaaS + Hostinger static, zero server | I BaaS-First |
| R3 | Append-only PII, dedup deferred to 010 | XXII PII-Append-Only |
| R4 | 009 read-only CMS; backoffice = 010 | XXIII Feature-Bounded |
| R5 | Hand-authored critical CSS, no extraction tool | XIV Simple First |
| R6 | Two-tier consent (Analytics banner + PII checkbox) | VII Secure, VIII SWR |
| R7 | 6 breakpoints, mobile-first, clamp() typography | II Accessibility |
| R8 | Firebase Analytics only, no new vendor | XIV Simple First |
| R9 | Unit/integration/E2E pyramid, no overlap | IX TDD, XV BDD |
| R10 | Exactly 13 pages, closed set | XXIII Feature-Bounded |
| R11 | Shell-first delivery; deep content = home + diagnostic only | XIV Simple First |
| R12 | Client-side slug routing, top-5 pre-rendered | XIV Simple First |
| R13 | Full robustness contract (ATDD + 85% + 10 flows) | IX TDD, XV BDD |
| R14 | Optimistic Result + Deferred Sync for write failures | VIII SWR, XIV Simple First |
| R15 | Shell = Minimal Landing Pattern (hero + escape routes + closing), zero Firestore | XIV Simple First, III SEO |

## Scope Boundary

### In scope (009)

- Home page redesign (`index.html`) — full Neo-Swiss Light + 3 CTAs
- Diagnostic flow (`diagnostico/index.html`) — 6-step wizard + Firestore persist
- 13-page shell scaffold (consistent header/footer/toggles/blueprint) — see Shell Contract below
- Adaptive blueprint (locale/theme/audience toggles)
- Design tokens in `estilos/variables.css` (Light default + Dark mirror)
- Security rules for `leads/`, `diagnostics/`, `programs/`, `resources/`, `testimonials/`
- Seed script (`scripts/seed.js`) for initial content
- Sitemap.xml generator + legacy redirect router
- Analytics event catalog (consent-gated)
- Consent banner (LGPD-light)
- Offline/syncing/fallback pills
- Full test suite (unit + integration + E2E + BDD features)

### Shell Contract — Minimal Landing Pattern (R15)

The 11 non-home/non-diagnostic pages render as **minimal landing pages**, not placeholders. Each shell page renders exactly:

| Slot | Required | Source | Content |
|---|---|---|---|
| `hero` | Yes | i18n dictionary `{pageSlug}.hero.{audience}` | Section headline + 1 audience-aware paragraph |
| `proof` | Optional | i18n dictionary (only if data exists) | Omitted on most shells |
| `oferta` | No | — | — |
| `escape_routes` | Yes | i18n dictionary `{pageSlug}.escape_routes.{audience}` | 2 CTAs: diagnóstico + recursos (audience-contextualized) |
| `closing` | Yes | i18n dictionary `{pageSlug}.closing.{audience}` | CTA primario (diagnóstico) |

**Rules:**
- Zero Firestore reads — all shell content lives in i18n dictionaries (static JSON)
- Zero new JS logic — slots resolved by existing `slot-resolver.js` + adaptive blueprint cascade (§2.3)
- Nav does not distinguish shells from full pages — all 13 pages are equally legitimate sections
- SEO: `<meta name="description">` + canonical URL + sitemap.xml inclusion satisfies Constitution III
- Deep content for shells arrives in Feature 011+ — shells are the **scaffolding**, not placeholders

**Dictionary requirement:** Each of the 11 shell pages needs entries in `js/i18n/dictionaries/{pageSlug}.json` for `hero`, `escape_routes`, and `closing` slots × 2 audiences × 2 locales. This is copywriting work, not code — estimated 11 × 3 slots × 2 × 2 = 132 i18n keys.

### Out of scope (deferred)

- **Feature 010**: Backoffice CMS (FR-100..FR-120), schema-driven admin, block editor, versioning, audit log, publish workflow, feature flags UI, experiments, i18n from Firestore
- **Feature 011+**: Deep content for 11 non-home pages, rich-text editing, asset pipeline
- Email marketing integrations, A/B experiment launches, Service Worker/PWA, new locales

## Testing Strategy

### Pyramid allocation (per R9 + NFR-007..NFR-013)

| Level | Runner | Scope | Coverage target |
|---|---|---|---|
| **Unit** | Vitest | Pure modules: `diagnostic/logic.js`, `state/bus.js` (100%); Logic modules: `audience/state.js`, `analytics/events.js`, `theme/toggle.js`, `i18n/resolver.js` (≥95%); Controllers (≥80%); Web Components (≥70%) | Global ≥85% lines, ≥80% branches |
| **Integration** | Vitest + Firebase Emulator | Security rules (positive + negative), SWR behavior, append-only invariants | Rules: 100% of contract |
| **E2E** | Playwright | Responsive fold (6 viewports), a11y (axe-core), critical CSS, i18n, offline pill, diagnostic flow, adaptive blueprint (52 combos), sitemap/redirects | 8 spec files, <3 min wall time |
| **BDD** | Cucumber/Playwright | `.feature` per US (7 files), hash-locked, traceability headers | ≥1 scenario per spec acceptance scenario |

### Test execution

```bash
# Unit + integration
npx vitest run

# E2E (requires dev server + emulator)
npx playwright test

# Coverage report
npx vitest run --coverage
```

## Quality Gates (Constitution §Quality Gates)

| Gate | Criteria for 009 | Enforced by |
|---|---|---|
| **G0** | Secrets scan clean, branch `009-home-landing-sales` from staging, constitution v7 compliance | Pre-commit hook |
| **G1** | Spec complete (45+ FRs, 22 SCs, 7 US with GWT), evidence tags, no `[NEEDS CLARIFICATION]` | `/iikit-01-specify` |
| **G2** | Data model (v3), API contracts (3 files), security rules, BDD hash-locked, tokens referenced, role governance | This plan (`/iikit-02-plan`) |
| **G3** | Tests pass, Lighthouse ≥90 (4 cats), emulator tests, a11y audit, brand scan clean, 85% coverage | Pre-merge CI |

## Risk Mitigations (plan-level)

| Risk | Mitigation |
|---|---|
| R-01 Header/footer theme mismatch | Home uses `body[data-theme]` scope; full header light-mode = feature 010 |
| R-03 Font LCP on 3G | `font-display: swap` + preconnect; self-host fonts in phase 2 |
| R-04 No GA4 baseline | T-000 task captures baseline before implementation begins |
| R-05 Visual drift home ↔ cartillas | Single source of truth in `estilos/variables.css` |
| R-09 Duplicate leads | Accepted in 009; reconciliation = 010; dashboard filters by most-recent |

## Rollback Strategy

If the home v2 launch causes conversion drop, critical bug, or visual regression that cannot be hotfixed within 24h:

### Procedure (3 steps, <15 min)

1. **Revert the merge commit** on `main`:
   ```bash
   git revert --no-edit <merge-commit-sha>
   git push origin main
   ```
2. **Deploy the revert** to production:
   ```bash
   ssh -p 65002 u363367449@156.67.75.195 \
     "cd domains/metodologia.info/public_html && git pull origin main"
   # Purge Hostinger cache + CDN cache
   ```
3. **Verify** home v1 is live via Playwright smoke test on production URL.

### Data impact

- **Firestore `leads/` and `diagnostics/`**: No action needed. Documents written during the v2 window are append-only and structurally compatible with v1 (v1 doesn't read these collections). Data is preserved for when v2 relaunches.
- **`localStorage` keys** (`mdg_theme`, `mdg_locale`, `mdg_audience`, diagnostic progress): v1 ignores these. No conflict. Users who return after revert see v1 without side effects.
- **Cookie `mdg_returning`**: v1 ignores it. No conflict.
- **Security rules**: The reverted `firestore.rules` removes `leads/` and `diagnostics/` client-write rules. Existing docs remain readable by admin. No data loss.
- **Seed data** (`programs/`, `resources/`, `testimonials/`): Firestore docs remain. v1 doesn't read them (uses static HTML). No conflict.

### Decision criteria for rollback

| Signal | Threshold | Action |
|---|---|---|
| Conversion drop vs baseline | >50% drop in first 48h | Rollback immediately |
| Critical JS error on production | Any unhandled exception on load | Hotfix first; rollback if not fixed in 4h |
| Lighthouse regression | Performance <70 on mobile | Hotfix first; rollback if not fixed in 24h |
| Visual regression (brand mismatch) | Reported by owner | Hotfix first; rollback if not fixed in 24h |

### Post-rollback

- Open a `hotfix/009-<issue>` branch from the reverted `main`
- Fix the root cause, re-test against G3 gate
- Re-merge via staging → main pipeline (Constitution XX)

## Complexity Tracking

> No Constitution violations requiring justification. All decisions follow Simple First (XIV).

| Decision | Why simple | Simpler alternative considered |
|---|---|---|
| 6 breakpoints | LatAm device matrix demands it (R7) | Fewer breakpoints → broken landscape mobile |
| Separate `js/diagnostic/` module tree | Single file would exceed 500 LOC, violating XII | Inline in controller → unmaintainable |
| Web Component for DiagnosticStepper | Encapsulates 6-step state machine; reusable | Vanilla DOM manipulation → scattered state |

## Clarifications

### Session 2026-04-21 (v4 — /iikit-clarify score hardening)

- Q: ¿Faltan dependencias explícitas entre módulos JS nuevos? → A: Añadir DAG de dependencias con clasificación leaf/mid/top layer y relaciones import explícitas. Leaf modules (bus.js, logic.js, state.js, toggle.js, legacy-router.js) implementables primero en paralelo. [§Module Dependency Graph, §Structure Decision]
- Q: ¿Estrategia de rollback si home v2 falla en producción? → A: Git revert del merge commit en main + redeploy. Datos Firestore (leads/, diagnostics/) preservados (append-only, sin conflicto de schema). Criterios: >50% drop conversión = rollback inmediato; bug crítico = hotfix 4h o rollback; Lighthouse <70 = hotfix 24h o rollback. [§Rollback Strategy, R-01, R-04, Constitution XX]

### Session 2026-04-21 (v5 — /iikit-clarify Socratic debates)

- Q: ¿Qué ocurre cuando falla el write a Firestore tras completar el diagnóstico (auth fail, network down, App Check inválido)? → A: Optimistic Result + Deferred Sync (R14). Resultado mostrado inmediato (pure function, zero network). Write en background; si falla, localStorage backup con pending_sync flag. Retry en próxima carga (max 3, exponential backoff). Tras 3 fallos, sync pill sutil (reutiliza OfflinePill, FR-097..FR-099). Nunca modal ni bloqueo en momento de máximo compromiso. [§Data flow — Write path, R14, FR-097, FR-098, FR-099, US-1 SC-4, Constitution VIII, Constitution XIV]
- Q: ¿Qué renderizan las 11 shell pages (non-home, non-diagnostic) cuando el usuario navega a ellas? → A: Minimal Landing Pattern (R15). Cada shell renderiza hero (headline + 1 párrafo audience-aware) + escape_routes (2 CTAs a diagnóstico/recursos) + closing (CTA primario). Zero Firestore reads, zero lógica nueva — todo resuelto por diccionarios i18n existentes via slot-resolver.js. Nav no distingue shells de páginas completas. SEO satisfecho con meta tags + canonical + sitemap.xml. Contenido profundo = Feature 011+. Requiere 132 i18n keys (11 pages × 3 slots × 2 audiences × 2 locales). [§Shell Contract, §Scope Boundary, R15, R11, Constitution III, Constitution XIV]

### Session 2026-04-21 (v6 — Socratic debate: UX + Product + Tech panel, repo audit)

- Q: El repo tiene 70+ archivos HTML pero el spec dice 13 páginas. ¿Qué pasa con las 57+ restantes? → A: Tres destinos: (1) absorbidas por templates dinámicos (?slug=X para programas/recursos/insights), (2) redirected 301 via .htaccess (17 reglas), (3) preservadas sin participar en nav/sitemap. Las 14+ subcategorías de /recursos/ siguen funcionando como rutas estáticas en 009; migración completa = features 011+. [§Scope Boundary, §Project Structure, R10, R12, Constitution XXIII]
- Q: ¿Cómo se implementan los 301 redirects si Hostinger es static hosting? → A: Dual strategy. Hostinger sí soporta mod_rewrite en shared hosting → .htaccess con RewriteRule para 17 legacy URLs (SEO real). Además, legacy-router.js como fallback JS para browsers que bypasean .htaccess. Mapa expandido: /vision.html→/metodo/, /servicios/→/programas/, /ruta/*→/diagnostico/, /metodologia.html→/metodo/, /empresas/diagnostico-gratuito.html→/diagnostico/?audiencia=empresa, /personas/autodiagnostico.html→/diagnostico/?audiencia=persona, /legal/privacidad.html→/legal/#privacidad, /legal/terminos.html→/legal/#terminos, /nosotros/ecosistema.html→/nosotros/, /nosotros/mision.html→/nosotros/, /ruta/cotizador*.html→/diagnostico/, /ruta/levels_grid.html→/programas/, /ruta/service_blueprint.html→/programas/, /ruta/a-medida.html→/contacto/, /sitemap.html→/. [§Project Structure, US-7, sitemap.md §6]
- Q: Las 5 páginas existentes (empresas, personas, recursos, nosotros, contacto) tienen contenido rico (KPI cards, JSON-LD, modales). ¿Se tratan como "crear shell" o "reescribir página"? → A: Rewrite, no create. Split en 3 tiers: Tier A (5 rewrites preservando contenido valioso), Tier B (5 new shells: programas, metodo, casos, insights, 404), Tier C (1 consolidación: legal fusiona privacidad.html + terminos.html). [§Shell Contract, §Project Structure, R15]
- Q: El home (T039/ex-T037) incluye los 3 CTAs + sección de programas desde el inicio, pero US-2 y US-3 están en fases posteriores. ¿Redundancia? → A: No. T039 entrega la estructura HTML completa (3 CTAs + programas con cards estáticas desde i18n). US-2 agrega solo lógica interactiva (premium modal en /recursos/). US-3 reemplaza cards estáticas con ProgramCard WC + Firestore. Cumple FR-005 sin rework. [§Scope Boundary, FR-005, US-1 US-2 US-3]
- Q: Falta un slug router para los 3 templates dinámicos (programas, recursos, insights). → A: Agregar js/blueprint/slug-router.js — lee ?slug=X, fetch de Firestore o fallback i18n, renderiza en template slots. Pre-render top-5 slugs como HTML estático para SEO. [§Project Structure, §Module Dependency Graph, R12]
- Q: Open Questions de sitemap.md (OQ1-OQ5). → A: OQ1 resuelto: insights subscription → leads/ con fuente "insights-subscribe" (no new collection, Constitution XXIII). OQ2: /casos/ → testimonials/ con campo type (no new collection). OQ3: /nosotros/ → HTML estático en 009, Firestore en 010. OQ4: dual .htaccess + JS (resuelto arriba). OQ5: script generate-sitemap-xml.js (estático generado). [§Scope Boundary, Constitution XXIII, sitemap.md §5]

### Session 2026-04-21 (v7 — UX architecture redesign: sidebar + triple toggle + admin editor)

- Q: ¿Cómo debe ser la navegación del sitio? → A: Inspirada en `Montano_Javier_Canonical.html`: sidebar izquierdo fijo (260px, 7 secciones numeradas por página con scroll-spy) + header simplificado (logo + 3 nav: Ruta/Servicios/Contacto) + triple toggle siempre visible fixed bottom-left. Los toggles salen del header y van a la esquina inferior izquierda, visibles incluso con sidebar cerrado en mobile. [FR-240..FR-249, §Project Structure, adaptive-blueprint.md]
- Q: ¿Cuáles son los 3 nav items del header? → A: "Ruta" (CTA dorado → /diagnostico/), "Servicios" (→ /programas/), "Contacto" (→ /contacto/). Naming genérico, no feature-specific. [FR-242, sitemap.md]
- Q: ¿El triple toggle vive dentro del sidebar o siempre visible? → A: SIEMPRE visible como `position: fixed; bottom: 1rem; left: 1rem; z-index: 45`. En desktop se alinea visualmente con el sidebar bottom pero NO está dentro de él. En mobile con sidebar cerrado, sigue visible. Cambiar tema/idioma/audiencia a un click sin abrir sidebar es requerimiento clave. [FR-245..FR-249]
- Q: ¿Cómo se mantienen los textos en 4 variantes (2 locales × 2 audiencias)? → A: Admin content editor Firestore-backed en `/admin/content-editor.html`. Grilla de 13 páginas → editor de slots con 4 textareas por slot. Escribe a Firestore `slots/{pageSlug}`. El sitio lee via migration-bridge.js con flag `cms-i18n` ON. Fallback a JSON estático. Security rules: admin write only con custom claim. [FR-250..FR-253, US-8]
- Q: ¿Esto trae el backoffice CMS al scope de 009? → A: Solo la parte de content editing (slots). El backoffice completo (schema registry, block editor, versioning, audit log, etc.) sigue diferido a 010. Lo que se trae: lectura/escritura de `slots/{pageSlug}` + UI de edición + security rules de admin. [§Scope Boundary, FR-250..FR-253]
- Q: ¿Cuántas secciones tiene cada página y cuáles son? → A: Exactamente 7 por página (12 páginas, 404 excluida). Definidas en `js/sidebar/sections-config.js`. Total: 84 secciones. Labels i18n: 168 keys (84 × 2 locales). Ver tabla en plan. [FR-241, FR-244]
- Q: ¿Nuevos leaf modules? → A: `js/sidebar/scroll-spy.js` (pure, IntersectionObserver) y `js/sidebar/sections-config.js` (pure, 84 entries). Se agregan a Phase 2 como parallelizables con bus.js, logic.js, etc. [§Module Dependency Graph]
