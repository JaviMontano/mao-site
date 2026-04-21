# Implementation Plan: Home + 13-Page IA Scaffolding (v3)

**Branch**: `009-home-landing-sales` | **Date**: 2026-04-14 | **Revised**: 2026-04-14 (v3 — post-robustness + Constitution v7.0.0 sync)
**Spec**: [spec.md](./spec.md) (v7 Consolidated) · **Sitemap/IA**: [sitemap.md](./sitemap.md) · **Robustness**: [robustness-v1.md](./robustness-v1.md) · **Backcasting**: [backcasting.md](./backcasting.md)
**Input**: Feature specification v7 (post-robustness, post-backcasting, Constitution v7.0.0 aligned)
**Constitution**: v7.0.0 (Cloud-First Content-as-Data) — hard gate enforced, footer synced 2026-04-14

## Summary

Entregar el home v2 Neo-Swiss Light **+ el esqueleto de las 13 páginas del sitio** (Sitemap §2) con nav/footer unificados, redirects legacy, y el flujo de diagnóstico completo como única ruta funcional profunda. Todas las demás páginas se entregan como **shells mínimos** (hero + proof + CTA + layout consistente) que cumplen el contrato de IA y el design system, pero cuyo contenido profundo se itera en features 011+. El backoffice CMS sigue fuera (→010).

Este plan es **v3**: actualización del plan v2 para sincronizar con spec v7 (consolidación de robustness-v1.md, backcasting.md, adaptive-blueprint.md, y Constitution v7.0.0 sync). Las reducciones de v2 vs v1 se mantienen intactas:

- **Componentes nuevos**: 6 → **1** (`DiagnosticStepper` como clase JS, no WC). Theme toggle y offline pill se integran en HTML directamente; no son WC.
- **Módulos `js/diagnostic/`**: 3 → **2** (`logic.js` + `controller.js`).
- **Critical CSS**: archivo dedicado → **inline `<style>` en `<head>`** de cada page template.
- **Seed**: script nuevo → **extender** `scripts/seed-firestore.js` existente.
- **Tests E2E**: 6 suites → **3** (`home.spec.js`, `offline.spec.js`, `diagnostic.spec.js`).
- **Tests integration**: 2 → **1** (`security-rules.spec.js`).

Total archivos nuevos netos: ~20 → **~10**. Reducción **50%**.

## Technical Context

**Language/Version**: HTML5 + CSS3 (custom properties + Tailwind 3.x prebuilt) + Vanilla JavaScript ES2022 modules
**Primary Dependencies**: Firebase JS SDK v10 (Firestore, Auth, Storage, Analytics, App Check); existente `js/cms/` SDK; existente `js/i18n/`; `idb` wrapper (ya en árbol); Lucide icons (existente `js/icons.js`). **Cero dependencias nuevas**.
**Storage**: Firestore (read public-published: `programs`, `resources`, `testimonials`; write append-only: `leads/{uid}`, `diagnostics/{uid}`); `localStorage` (theme, diagnóstico TTL 24h); IndexedDB via `cache-manager.js` (SWR 7d); cookies (`mdg_consent`, `mdg_returning`).
**Testing**: Vitest (unit — pure modules), Firebase Emulator Suite (security rules), Playwright (E2E — 3 suites consolidadas).
**Target Platform**: Navegadores evergreen (spec NFR-003). Hosting estático Hostinger VPS + Cloudflare CDN.
**Project Type**: Static web — single project, mobile-first, zero build runtime.
**Performance Goals**: LCP ≤2.5s 4G / ≤1.5s cable; TBT <200ms; CLS <0.1; INP <200ms. Bundle inicial <250 KB inline. (Spec FR-090..FR-094.)
**Constraints**: 13 páginas hard constraint (Sitemap §2). Zero server-side runtime (NFR-001). Append-only PII (Const. XXII). Feature-bounded CMS (Const. XXIII, →010). Cero hardcoding (Const. XXI).
**Scale/Scope**: 13 páginas (1 funcional profunda + 12 shells mínimos) + flujo diagnóstico 6 pasos + nav/footer unificados + legacy redirects. Audiencia LatAm ES/EN. <5k sessions/día baseline.

## Constitution Check

*GATE: Hard — Constitution v7.0.0. Passed en v1; re-validado para v2 con el scope ampliado a 13 shells.*

| Principio | v1 | v2 | Nota |
|---|---|---|---|
| I. BaaS-First, Zero Server | ✅ | ✅ | 13 shells siguen siendo estáticos; cero server |
| II. Accessibility-First | ✅ | ✅ | Cada shell hereda skip-link, focus order, landmarks |
| III. SEO Integrity | ✅ | ✅✅ | 13 URLs estables, sitemap.xml, canonicals — mejora vs v1 |
| IV. Component Consistency | ✅ | ✅ | SiteHeader/SiteFooter unificados entre 13 pages |
| V. Brand Separation | ✅ | ✅ | Single brand |
| VI. Cloud-First + Static Fallback | ✅ | ✅ | Shells son HTML estático navegable sin JS |
| VII. Secure by Default | ✅ | ✅ | App Check solo donde hay writes (diagnostico, contacto, insights, recursos premium) |
| VIII. SWR + Offline UX | ✅ | ✅ | Offline pill en nav de todas las 13 pages |
| IX. TDD | ✅ | ✅ | Testify solo para los módulos puros y security rules; shells no requieren tests unitarios (son HTML estático) |
| X. Design System Governance | ✅ | ✅✅ | Los 13 shells usan exactamente los mismos tokens; oportunidad de enforcement |
| XI. Brand Voice | ✅ | ✅ | Copy ES/EN revisado página por página |
| XII. Sustainability | ✅ | ✅✅ | v2 es más sostenible que v1 (menos archivos, menos tests, menos deps) |
| XIII. Think First | ✅ | ✅ | Ciclo socrático del sitemap cumple XIII |
| XIV. Simple First | ⚠️ | ✅✅ | **v1 era over-engineered; v2 corrige** |
| XV. BDD Full-Spectrum | ✅ | ✅ | `.feature` para diagnóstico + security rules |
| XVI. Sequential-First | ✅ | ✅ | Spec→sitemap→plan→checklist→testify→tasks |
| XVII. Continuous Learning | ✅ | ✅ | Sitemap §5 alimenta `insights/` patterns |
| XVIII. Indexable Repo | ✅ | ✅✅ | 13 directorios canónicos, sin duplicados ni órfanos |
| XIX. Bug Protocol | N/A | N/A | — |
| XX. Branch-to-Env Parity | ✅ | ✅ | Mismo flujo |
| XXI. Zero Hardcoding | ✅ | ✅ | Tokens + i18n + `diagnostic-logic.json` |
| XXII. PII-Append-Only | ✅ | ✅ | Writes solo en diagnostico, contacto, insights, recursos premium |
| XXIII. Feature-Bounded | ✅ | ✅ | CMS backoffice → 010; content deep-dive → features 011+ |

**Gate v3**: ✅ **PASS**. Sin violaciones. Constitution v7.0.0 footer synced (was 6.2.0). Robustness-v1.md backcasts clean to all 23 principles. Sin Complexity Tracking.

## Project Structure

### Documentation

```text
specs/009-home-landing-sales/
├── spec.md              # Feature specification v7 (Consolidated — ready for testify)
├── sitemap.md           # IA + Socratic debate + 13-page inventory
├── plan.md              # This file (v3, revised)
├── robustness-v1.md     # TDD/ATDD mandates, coverage contracts, 10 independent flows
├── backcasting.md       # FR→US→SC→Constitution traceability loop
├── adaptive-blueprint.md # 3-axis toggles, shell slots, 52-combo test matrix
├── research.md          # Phase 0 — Socratic decisions archived
├── data-model.md        # Phase 1 — entities touched by 009
├── quickstart.md        # Phase 1 — manual + automated validation
├── contracts/
│   ├── firestore-rules.md
│   ├── analytics-events.md
│   └── diagnostic-logic.json
├── checklists/
└── tasks.md             # Phase 05
```

### Source Code — final state (reuso máximo, `+` nuevo, `~` modificado, `−` removido)

```text
# Páginas (13 shells — Sitemap §2)
index.html                          ~ P1 Home v2 — hero + 3 CTAs + programas + proof + cierre
diagnostico/index.html              + P2 Diagnóstico — 6 pasos + resultado + App Check write
empresas/index.html                 ~ P3 B2B landing — hero + proof + programas?audiencia=empresa + CTA
personas/index.html                 ~ P4 B2C landing — análogo
programas/index.html                + P5 Catálogo + detalle via ?slug (top-5 pre-rendered)
recursos/index.html                 ~ P6 Catálogo + detalle via ?slug + modal premium
metodo/index.html                   + P7 Método (redirect-target para legacy vision.html)
casos/index.html                    + P8 Casos de éxito con filtros
nosotros/index.html                 ~ P9 About minimalista (reescrito)
insights/index.html                 + P10 Shell + form early-access
contacto/index.html                 ~ P11 Form + datos + write append-only lead
legal/index.html                    + P12 Consolidado con #privacidad #terminos #cookies
404.html                            + P13 Not found + buscador

# Legacy redirects
vision.html                         − removido (redirect .htaccess → /metodo/)
servicios/index.html                − removido (redirect .htaccess → /programas/)
ruta/index.html                     − removido (redirect .htaccess → /diagnostico/)
sitemap.html                        − removido (reemplazado por sitemap.xml)
.htaccess                           ~ añadir redirects 301 + rewrite para ?slug

# Sitemap
sitemap.xml                         + generado por script, 12 URLs (404 excluida)

# Estilos — tokens + layouts; sin archivo critical.css separado
estilos/
├── variables.css                   ~ tokens Neo-Swiss Light + dark mirror + marker /* CRITICAL FOLD */
├── base.css                        ~ resets + clamp + safe-area
├── home.css                        ~ layout del home v2
├── components.css                  ~ CTAs, cards, pills offline (clase plana)
├── empresas.css                    ~ ajustes B2B
├── personas.css                    ~ ajustes B2C
└── (otros .css existentes)         (sin cambios estructurales; solo re-importan tokens)

# Componentes — mínimos
components/
├── SiteHeader.js                   ~ nav 5 items + CTA dorado + theme toggle embebido + lang toggle
├── SiteFooter.js                   ~ sitemap 12 items + social + idioma + consent reset
└── DiagnosticStepper.js            + clase JS (no Web Component): monta en <section id="stepper">

# Lógica de diagnóstico
js/diagnostic/
├── logic.js                        + puro: lee diagnostic-logic.json, calcula score/nivel/recomendación
└── controller.js                   + glue DOM + localStorage TTL 24h + Firestore write + mailto fallback

# Adaptive blueprint — 3 toggles + slots (ver adaptive-blueprint.md)
js/audience/
├── state.js                        + puro: cascada de provenance §3.1, get/set/subscribe, lock
└── controller.js                   + glue DOM: escucha mdg:state-changed, re-renderiza slots [data-audience-variant] y filtros [data-audience-filter]
js/i18n/
└── resolver.js                     + implementa cascada §2.3 (audience × locale fallback en 5 niveles)
js/state/
└── bus.js                          + event bus mínimo mdg:state-changed (pub/sub, zero deps)

# Analítica (delgado, tipado)
js/analytics/events.js              + wrapper FR-070..FR-072 + consent gating (mdg_consent)

# Theme (helper plano — usado por SiteHeader inline)
js/theme/toggle.js                  + helper set/get mdg_theme + prefers-color-scheme fallback

# i18n
js/i18n/dictionaries/
├── home.es.json                    + copy v2
├── home.en.json                    +
├── diagnostico.es.json             +
├── diagnostico.en.json             +
├── empresas.es.json, ...           + (13 páginas × 2 idiomas = hasta 26 archivos; los que no cambian reutilizan base)
└── (namespaces existentes)         (reuso)

# Scripts
scripts/
├── seed-firestore.js               ~ EXTENDER: añadir bloques programs/, testimonials/, resources (si falta)
├── generate-sitemap-xml.js         + lee repo + programs/ + recursos/ + insights/ → sitemap.xml
└── (scripts existentes)            (sin cambios)

# Firebase
firebase/
├── firestore.rules                 ~ append-only leads/ diagnostics/ + public-read programs/ resources/ testimonials/
└── firestore.indexes.json          ~ composite (status, order) para programs/resources/testimonials

# Test config (nuevo, por robustness v7)
vitest.config.js                    + thresholds per-capa (NFR-008), exclude list, v8 coverage provider
playwright.config.js                ~ workers: 4, sharding por (locale, audience), budget <3min (NFR-012)
cucumber.config.js                  + BDD runner para tests/features (NFR-009)

# Tests — consolidados + robustness additions
tests/
├── features/                       + .feature files ATDD, uno por User Story
│   ├── us-1-diagnostico.feature
│   ├── us-2-recursos.feature
│   ├── us-3-programas.feature
│   ├── us-4-identidad.feature
│   ├── us-5-responsive.feature
│   ├── us-6-adaptive-blueprint.feature   + cubre FR-200..FR-232
│   ├── us-7-sitemap-ia.feature            + cubre sitemap + redirects + 404
│   └── step_definitions/
│       ├── common.steps.js
│       ├── diagnostic.steps.js
│       ├── i18n.steps.js
│       ├── audience.steps.js
│       ├── theme.steps.js
│       ├── offline.steps.js
│       └── analytics.steps.js
├── unit/
│   ├── diagnostic-logic.spec.js    + Vitest — scoring, thresholds, i18n recomendaciones
│   ├── analytics-events.spec.js    + Vitest — gating consent, shape payload, PII scrub, audience field
│   ├── audience-state.spec.js      + Vitest — provenance cascada §3.1, persist, subscribe, lock
│   └── i18n-resolver.spec.js       + Vitest — cascada fallback §2.3 (5 niveles), zero raw keys
├── integration/
│   └── security-rules.spec.js      + emulador — per-collection rules (append-only, auth, App Check)
└── e2e/
    ├── home.spec.js                + Playwright — responsive (6 viewports) + critical CSS fold + i18n switch + axe a11y
    ├── offline.spec.js             + Playwright — stub Firestore fail → pill <3s → recuperación
    ├── diagnostic.spec.js          + Playwright — 6 pasos + resultado + append-only doc + mailto fallback
    ├── adaptive-blueprint.spec.js  + Playwright parametrizado — matriz 52 (13 pages × 2 locale × 2 audience); FR-215; <100ms transición; zero raw keys
    ├── flow-linkedin-b2b.spec.js   + independent flow 1 (utm inference + returning user)
    ├── flow-mobile-flaky.spec.js   + independent flow 2 (cache + mailto fallback)
    ├── flow-keyboard-a11y.spec.js  + independent flow 3 (keyboard + aria-live)
    ├── flow-seo-crawler.spec.js    + independent flow 4 (Googlebot no-JS)
    ├── flow-lgpd-audit.spec.js     + independent flow 5 (consent rejection + PII still works)
    ├── flow-theme-chaos.spec.js    + independent flow 6 (20x theme toggle stress)
    ├── flow-social-share.spec.js   + independent flow 10 (OG meta per slug)
    └── seed-roundtrip.spec.js      + independent flow 8 (content editor path)
```

**Structure Decision**: Static single-project. **Nada de `src/`**, nada de bundler runtime, nada de framework. Tailwind prebuilt sigue siendo la única build step opcional. Los 13 shells comparten `components/SiteHeader.js` + `components/SiteFooter.js` cargados como `<script type="module">` en cada page — esto es el único mecanismo de consistencia cross-page.

**Delta robustness v7**: +3 config files (vitest, playwright update, cucumber) + `tests/features/` (7 .feature files + 7 step_definitions) + 8 independent flow E2E tests + 1 integration test (`cache-manager-corruption`). Total archivos nuevos netos ahora: ~14 → **~35**. El incremento es en tests, no en production code; respeta NFR-008 (coverage layered) y NFR-013 (independent flows). Los módulos de producción permanecen en **~14**.

**Delta spec v7 consolidation**: Spec status bumped from Draft v2 → Consolidated v7. All quality gates G0–G3 pass (checklist re-generated). Constitution footer synced 6.2.0 → 7.0.0. Backcasting §F.4 closes 0 orphan FRs, 0 orphan US, 0 orphan SC. No new production modules; no breaking changes to architecture.

## Architecture (reutiliza spec §9, sin cambios)

El contrato BaaS + static fallback + append-only PII de spec §9 sigue vigente. El cambio en v2 es **cobertura**: donde v1 aplicaba a 1 página (home) y 1 ruta (diagnóstico), v2 aplica a 13 páginas con el mismo patrón. No hay componentes nuevos de arquitectura.

**Dynamic templates** (Sitemap §3): `/programas/`, `/recursos/`, `/insights/` implementan client-side routing con `URLSearchParams`. Listing view es el default; detail view se activa si hay `?slug=X`. Top-5 slugs por section viven como `<template data-slug="X">` inline en el HTML; el resto se hidrata desde Firestore via `content-service.js` existente.

**Redirects legacy** (Sitemap Q15, D2): `.htaccess` con 8 reglas 301:
```apache
RewriteEngine On
RewriteRule ^vision\.html$ /metodo/ [R=301,L]
RewriteRule ^servicios/?$ /programas/ [R=301,L]
RewriteRule ^ruta/?$ /diagnostico/?utm_source=legacy-ruta [R=301,L]
RewriteRule ^sitemap\.html$ /sitemap.xml [R=301,L]
ErrorDocument 404 /404.html
# Trailing slash enforcement for 13 canonical paths
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !/$
RewriteRule ^(empresas|personas|programas|recursos|metodo|casos|nosotros|insights|contacto|legal|diagnostico)$ /$1/ [R=301,L]
```

## Tessl Tile Discovery

Sin cambios. No se instalan tiles en Phase 02. Revisita en checklist.

## Phase 0 — Research

`research.md` v1 sigue vigente. Adicional para v2:

- **R10 — 13-page constraint rationale**: ver Sitemap §5 Q14, Q15. Alcance cerrado por principio F.
- **R11 — Shell-first vs content-first**: ver Sitemap §7 D1. Decisión: shell-first (lectura estricta).
- **R12 — Dynamic templates vs static slugs**: ver Sitemap §5 Q8, D5. Decisión: template + pre-render top-5.

(Registro adicional se añadirá a `research.md` en el commit de v2.)

## Phase 1 — Design & Contracts

Entregables Phase 1 (ya existen desde v1, re-validados para v2):

1. **`data-model.md`** — sin cambios en las entidades; añadir nota de que `casos/` se deriva de `testimonials/` con campo `caso_completo` hasta feature 010.
2. **`contracts/firestore-rules.md`** — sin cambios; sigue siendo append-only puro.
3. **`contracts/analytics-events.md`** — añadir eventos `contact_form_submit`, `insights_subscribe`, `resource_premium_unlock` (ya incluido) al catálogo.
4. **`contracts/diagnostic-logic.json`** — sin cambios.
5. **`sitemap.md`** — NUEVO, generado en esta sesión (§ §1–§11 del archivo).
6. **`quickstart.md`** — actualizar matriz manual para cubrir navegación entre las 13 páginas + redirects legacy + 404.
7. **`sitemap.xml`** — generado por `scripts/generate-sitemap-xml.js` en la primera seed.
8. **Agent context** — re-ejecutar `update-agent-context.sh claude` tras v2.

## Phase 2 — Constitution Re-check (post-design v2)

Revalidar contra:
- **XXI Zero Hardcoding**: verificar que los 13 shells no embebían copy crudo — todo via `data-i18n` o Firestore.
- **XXII PII Append-Only**: ampliar tests a `contacto/` (ahora también escribe `leads/`) y `insights/` (subscriptions).
- **VIII SWR + Offline UX**: pill de offline debe aparecer en **todas** las 13 pages, no solo home.

## Phase Separation Validation

Auditado:
- ❌ Sin principios nuevos (toda la gobernanza sigue en CONSTITUTION.md).
- ❌ Sin policy transversal nueva — el 13-page constraint es un constraint de **esta feature**, no del proyecto.
- ✅ Decisiones tácticas de 009 únicamente.
- ✅ `sitemap.md` es un **design artifact** (HOW a nivel IA), no un spec (WHAT). Vive en `specs/009-home-landing-sales/` porque es input de este plan, no input del spec original.

## Scope boundary — lo que NO entrega v2

Lista explícita para prevenir scope creep:

- ❌ Contenido profundo de `/metodo/`, `/casos/`, `/nosotros/`, `/insights/` — features 011+.
- ❌ Backoffice CMS — feature 010.
- ❌ Búsqueda cross-page (`/404.html` tiene un placeholder, no funcionalidad real).
- ❌ Internacionalización de URLs (no `/en/empresas/`; EN se activa via `?lang=en` + `data-i18n`).
- ❌ Sitemap.xml dinámico en runtime — se regenera en CI por script, sirve estático.
- ❌ A/B testing en shells — solo en home y diagnóstico.
- ❌ Animaciones beyond `prefers-reduced-motion`-safe.

## Complexity Tracking

> Vacío en v2 tras la simplificación.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| _(none)_ | — | — |

## Decisions Resolved (v3)

All open decisions from Sitemap §8 are now **resolved** after workspace session `2026-04-14-009-home-landing-sales` and spec v7 consolidation:

1. **D1**: ✅ **Lectura estricta** — 13 shells + home/diagnostico profundos. Confirmed by session.json `post-robustness-v7 / pre-testify`.
2. **D2**: ✅ Shell templates inherit `SiteHeader.js` + `SiteFooter.js` via `<script type="module">`.
3. **D3**: ✅ Dynamic templates for `/programas/`, `/recursos/`, `/insights/` with `?slug=X`.
4. **D4**: ✅ Redirects via `.htaccess` (8 rules).
5. **D5**: ✅ Top-5 pre-rendered per section; rest hydrated from Firestore.
6. **D6**: ✅ `sitemap.xml` generated statically by script; 12 URLs (404 excluded).
7. **D7**: ✅ Nav 5 items + CTA dorado per Sitemap §6 principle A.
8. **D8**: ✅ Cut over-engineering per Sitemap §7 — no `BlockRenderer WC`, no `ThemeToggle WC`, no `OfflinePill WC`.

**Plan v3 status**: ✅ All decisions resolved. Ready for Phase 05 tasks.

## Feedback loop summary (sitemap ↔ plan)

**sitemap.md → plan.md**:
- §5 Q13 derivó principio H (simplificación) → plan v2 reduce archivos ~50%.
- §2 inventario 13-page → plan v2 amplía cobertura de 1 page a 13 shells.
- §5 Q8 dynamic templates → plan v2 define client-side router con pre-render selectivo.
- §5 Q15 legacy `/ruta/` → plan v2 añade `.htaccess` redirects.
- §6 principio A nav 5 items → plan v2 especifica el header con 5 + CTA.
- §7 cut over-engineering → plan v2 consolida tests y elimina `BlockRenderer`, `ThemeToggle WC`, `OfflinePill WC`, `critical.css` archivo, `seed.js` script, `state.js`, `render.js`.

**plan.md → sitemap.md**:
- Constraint Constitution v7 XXIII (feature-bounded) → sitemap §7 propone lectura estricta (shells + 2 pages profundas).
- Constraint Constitution XIV (simple first) → sitemap §5 Q13 socráticamente valida los cuts.
- Reuso de `js/cms/` existente (plan §Dependencies) → sitemap §3 dynamic templates usan `content-service.js` sin inventar SDK nuevo.
- Test pyramid de research R9 (TDD) → sitemap §7 acepta consolidación a 3 E2E suites (no compromete TDD porque los módulos puros siguen teniendo unit coverage).

El loop converge: sitemap y plan están mutuamente consistentes y ambos están bajo el techo constitucional.

## Clarifications

### Session 2026-04-20

- Q: plan.md was overwritten with raw template in commit f70e064 — restore from v3 or regenerate? -> A: Restore from commit 5f3cf0c (v3 technical design, Constitution v7.0.0 synced) [Summary, Technical Context, Project Structure]
