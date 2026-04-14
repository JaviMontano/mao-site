# Backcasting — Constitution ↔ Spec (009)

**Purpose**: Dos ciclos de trazabilidad bidireccional entre `CONSTITUTION.md` v7.0.0 y los spec artifacts de 009 (spec.md, sitemap.md, adaptive-blueprint.md, plan.md). El backcasting es **obligatorio después de introducir patrones cross-cutting** (como el 3-axis adaptive blueprint) porque son las únicas adiciones que justifican evaluar si la Constitution debe evolucionar.

---

## Direction 1 — Constitution → Spec (forward pass)

**Question**: ¿Qué principios constitucionales **exigen** algo del 3-axis adaptive blueprint, y cómo los materializamos como FRs en el spec?

Cada fila es una **derivación normativa**: el principio manda, el spec responde.

| Constitution v7 principle | Exigencia sobre adaptive blueprint | Dónde se materializa en 009 | Status |
|---|---|---|---|
| **I. BaaS-First, Zero Server** | El switching de audience/theme/locale MUST ser client-side. No hay redirect server-side obligatorio. | `js/audience/state.js` client-only; cookie `mdg_audience` es opcional, usada solo para hint pre-first-paint | ✅ cubierto |
| **II. Accessibility-First** | Toggles MUST ser keyboard-navigable (radiogroup), anunciar cambios vía live-region, contrast ≥3:1 UI | FR-230, FR-231, FR-232 | ✅ cubierto |
| **III. SEO Integrity** | El canonical URL MUST ser estable; audience no genera URLs distintas; `html[lang]` se sync con locale para crawlers | adaptive-blueprint.md §7 risk "SEO canonical confusion" → `canonical` sin query params; shell §2.1 mantiene `html[lang]` sync | ✅ cubierto |
| **IV. Component Consistency** | Los 3 toggles MUST vivir en UN componente único (`<site-header>`), no 3 implementaciones | FR-203 | ✅ cubierto |
| **V. Brand Separation** | — (MetodologIA single brand) | N/A | N/A |
| **VI. Cloud-First + Static Fallback** | Sin JS, el blueprint MUST degradar limpiamente a una variante (default audience=unknown, locale=es, theme=light) | adaptive-blueprint.md §2.3 cascada + FR-063 en spec; `<noscript>` implícito via SSR-less static HTML con defaults | ✅ cubierto |
| **VII. Secure by Default** | audience state NO es PII, no requiere App Check; cuando el diagnóstico infiere audience, se proyecta a `leads/{uid}.segmento` bajo App Check ya existente | adaptive-blueprint.md §3.3; FR-222 | ✅ cubierto |
| **VIII. SWR + Offline UX** | La offline pill MUST aparecer igual en las 13 pages del blueprint; audience/theme/locale no la ocultan | FR-097 ampliado implícitamente por §5.3 sitemap (toggle bar + pill cohabitan en header) | ⚠️ **gap**: añadir FR explícito de que la pill es independiente de toggles |
| **IX. TDD** | El blueprint con 52 combinaciones MUST tener cobertura automatizada antes de ship | FR-215 + `tests/e2e/adaptive-blueprint.spec.js` parametrizado | ✅ cubierto |
| **X. Design System Governance** | Los 3 toggles MUST usar exclusivamente tokens CSS existentes; no crear tokens nuevos para states "activo/inactivo" | FR-200, FR-232 + constrain implícito FR-040..FR-045 | ✅ cubierto |
| **XI. Brand Voice Integrity** | Las variantes `persona` vs `empresa` MUST preservar la voz de marca (no tornarse "corporativo frío" en empresa ni "influencer coach" en persona) | adaptive-blueprint.md §7 risk "dev divergence" → pre-commit grep + review checklist | ⚠️ **gap**: añadir FR explícito de voice-audit en el flujo de edición de copy |
| **XII. Code Sustainability** | Cero dependencias nuevas para blueprint; todos los módulos son ES2022 planos | adaptive-blueprint.md §5.4 lista 4 archivos nuevos, todos puros, zero deps | ✅ cubierto |
| **XIII. Think First** | El 3-axis pattern MUST derivarse de una reflexión explícita, no improvisarse | Este archivo (backcasting.md) + spec §13 + sesión clarifications v6 | ✅ cubierto |
| **XIV. Simple First** | El blueprint MUST preferir cascada de fallback a combinatoria completa | adaptive-blueprint.md §2.3 (5-level cascada con 20% combinatoria efectiva) vs approach ingenuo 4×13×slots | ✅ cubierto |
| **XV. BDD Full-Spectrum** | `.feature` scenarios MUST cubrir el toggle flow como comportamiento de usuario | Pendiente `/iikit-04-testify` generará `.feature` desde FR-200..FR-232 | ⏳ diferido a phase 04 |
| **XVI. Sequential-First, Parallel-Ready** | El blueprint MUST ser refactor-compatible con features 010-012 (backoffice CMS, audience analytics, personalization engine) | adaptive-blueprint.md §5.2 migration path: ContentSlot de JSON → Firestore `slots/{pageSlug}` en 010 | ✅ cubierto |
| **XVII. Continuous Learning Loop** | El patrón del blueprint MUST archivarse en `insights/` como reusable decision pattern | Pendiente — crear `insights/adaptive-blueprint-pattern.md` post-merge | ⏳ pendiente post-merge |
| **XVIII. Indexable & Self-Organizing Repo** | El blueprint MUST encajar en directorios existentes; no crear top-level dirs | `js/audience/`, `js/state/`, `js/i18n/resolver.js` son subdirectorios/archivos bajo `js/` (existente) | ✅ cubierto |
| **XIX. User-Reported Bug Protocol** | N/A (new feature) | — | N/A |
| **XX. Branch-to-Environment Parity** | Sin impacto | — | N/A |
| **XXI. Zero Hardcoding** | Cada variante de copy MUST vivir en dictionaries externos (JSON); cero strings hardcodeados en JS o HTML | FR-211, FR-212 + estructura `js/i18n/dictionaries/{pageSlug}.json` en plan.md | ✅ cubierto |
| **XXII. PII-Append-Only** | audience state NO es PII; cuando se proyecta al diagnóstico, respeta append-only existente | adaptive-blueprint.md §3.3; FR-222 + FR-013/FR-017 ya existentes | ✅ cubierto |
| **XXIII. Feature-Bounded Architecture** | El blueprint MUST ser útil para futuras features sin mezclar scopes; slots JSON → Firestore es migration path, no coupling | adaptive-blueprint.md §5.2, §8 out-of-scope explícito; plan.md no introduce CMS backoffice | ✅ cubierto |

### Direction 1 — gaps to close

Identificamos **2 gaps** que el forward pass exige corregir:

#### Gap A — FR explícito: Offline pill es independiente de toggles (VIII)

**Nueva cláusula a añadir en spec.md §4.1 (después de FR-099)**:

> **FR-099b**: Los 3 toggles globales (locale, theme, audience) MUST coexistir en el header con la offline/syncing/fallback pill (FR-097) sin obstruirla visualmente ni funcionalmente. El pill MUST permanecer visible en el mismo landmark independientemente del estado de los toggles, y sus estados (offline|syncing|fallback) MUST tener contraste ≥3:1 en ambos themes.

#### Gap B — FR explícito: Brand voice audit por audience variant (XI)

**Nueva cláusula a añadir en spec.md §4.1 (en el bloque Branding)**:

> **FR-046**: Cada variante de copy por audience (`persona` vs `empresa`) MUST pasar un audit manual de brand voice antes de merge, validando que (a) persona mantiene tono cercano e inspiracional, (b) empresa mantiene tono seguro y basado en resultados, (c) ambas preservan los principios de voz de marca MetodologIA (claridad > cleverness, evidencia > hype, humano > corporativo). El checklist de review del PR debe incluir una sección "Voice audit — persona + empresa" por cada dictionary modificado.

Ambos gaps se consolidan en el próximo commit (sección §3 de este archivo).

---

## Direction 2 — Spec → Constitution (reverse pass)

**Question**: ¿El adaptive blueprint revela un patrón **suficientemente sistémico** para justificar una amendment a la Constitution? Si sí, ¿qué principio y en qué versión?

### Test de sistemicidad (4 preguntas, las 4 deben ser "sí")

1. **¿El patrón aplica más allá de 009?** → Sí. Toda feature futura que toque páginas públicas heredará el blueprint. Feature 010 (backoffice CMS) necesita editar slots; feature 011+ (nuevas páginas de contenido) necesita usar el shell; feature de personalización avanzada extenderá el eje audience. Es un **estructural**, no un **táctico**.
2. **¿Sin este principio, futuras features podrían reintroducir el problema que el blueprint resuelve?** → Sí. Sin gobernanza explícita, un futuro editor podría crear páginas con layout propio, copy sin audience variants, o theme-dependent content. El drift es certero sin enforcement constitucional.
3. **¿El patrón cambia reglas de decisión en fases anteriores (spec, plan)?** → Sí. Afecta cómo se escriben nuevas specs (cada FR de content debe contemplar audience variants), cómo se auditan nuevos plans (Constitution Check debe verificar shell compliance), cómo se organiza el repo (`js/audience/`, `js/i18n/resolver.js` son estructuras canonicas).
4. **¿El patrón tiene un contrato verificable?** → Sí. El test E2E parametrizado de 52 combinaciones es el contrato ejecutable. El pre-commit grep bloquea keys crudas. Ambos son objetivos, no subjetivos.

**Veredicto**: **Sí — amendment constitucional justificada**. Versión propuesta: **v7.1.0** (minor bump, additive, non-breaking).

### Propuesta de amendment — Constitution v7.1.0

#### New principle: XXIV. Adaptive Blueprint Personalization

> **XXIV. Adaptive Blueprint Personalization**
>
> Cada página pública del sitio MUST renderizarse desde un **shell único** cuyo contenido se adapta declarativamente a la combinación activa de tres ejes ortogonales:
>
> - **Locale** (`es`/`en`): afecta texto vía `data-i18n` + diccionarios externos.
> - **Theme** (`light`/`dark`): afecta exclusivamente tokens CSS. **NUNCA** afecta contenido.
> - **Audience** (`persona`/`empresa`/`unknown`): afecta copy, proof, CTAs y filtros de listados vía slots tipados.
>
> **Invariantes**:
>
> 1. **Ortogonalidad**: theme es CSS-only; locale + audience son content-only. No hay combinatoria de CSS por audience ni combinatoria de contenido por theme.
> 2. **Shell homologado**: todas las páginas públicas comparten el mismo HTML skeleton (`<html data-theme data-audience>`, `<site-header>`, `<main data-page-slug>`, `<site-footer>`). Variación permitida: qué slots están presentes. Variación prohibida: layout propio, header/footer alternativos.
> 3. **Cascada de fallback**: slots se resuelven en 5 niveles — `{pageSlug}.{slot}.{audience}.{locale}` → `{pageSlug}.{slot}.unknown.{locale}` → `{pageSlug}.{slot}.{audience}.es` → `{pageSlug}.{slot}.unknown.es` → `common.missing.{slot}`. Ninguna key cruda puede aparecer en el DOM de producción.
> 4. **Instantaneidad**: el cambio de cualquier toggle MUST completar la transición DOM en <100ms y sin reload.
> 5. **Client-only state**: locale/theme/audience viven en `localStorage` + atributos en `<html>`. Ninguno es PII. El audience state puede proyectarse a `leads/{uid}.segmento` **solo** a través del flujo de diagnóstico existente (XXII sigue intacto).
> 6. **Cobertura verificable**: cada página nueva MUST incluirse en el test E2E parametrizado que recorre la matriz (N pages × 2 locale × 2 audience), validando ausencia de keys crudas y transición <100ms.
>
> **Rationale**: Sin este principio, futuras features podrían (a) crear páginas con layouts divergentes que rompen la consistencia UX, (b) hardcodear copy sin variantes de audience lo cual segmenta mal la comunicación, (c) mezclar theme con contenido lo cual explota la combinatoria de variantes, (d) olvidar cubrir nuevas páginas en el test parametrizado lo cual permite drift silencioso. El blueprint adaptativo es la única forma de escalar content personalization sin fragmentar la arquitectura.
>
> **Acceptance criteria**:
> - Toda nueva feature con contenido público verifica el blueprint en su Constitution Check (gate).
> - El E2E matriz parametrizado se ejecuta en CI y bloquea merge si falla.
> - Pre-commit hook rechaza `data-i18n` keys que no contengan `{audience}` en slots donde aplica.
>
> **Anti-patterns**:
> - Crear una página con su propio `<header>` en lugar de `<site-header>`.
> - Escribir `if (theme === 'dark') { show('logo-dark') }` en JS — debe ser CSS.
> - Crear una ruta `/empresas/programas/` para "la versión empresa de programas" cuando basta con `?audiencia=empresa` + audience state.
>
> **Edge case**: `/empresas/` y `/personas/` son las **dos únicas páginas con audiencia intrínseca** (no adaptativa). Su toggle actúa como "switch to the other landing" (FR-206), no como mutación in-place. Esta excepción es aceptable porque son **hubs de entrada** con proof social específica por segmento, no páginas de contenido generalista.

#### Sync Impact Report (header para CONSTITUTION.md)

```
Version: 7.1.0 (Adaptive Blueprint Personalization)
Breaking changes: none
Additive changes:
  - XXIV (NEW): Adaptive Blueprint Personalization —
    three-axis orthogonal personalization (locale/theme/audience),
    single shell, declarative slot cascade, instant transitions,
    client-only state.
Non-breaking: all principles I-XXIII unchanged
Origin: Feature 009-home-landing-sales, spec v6 introduced
  the 3-toggle pattern as a systemic affordance. Backcasting
  Direction 2 validated it as constitutional, not tactical.
Previous version: 7.0.0 (Cloud-First Content-as-Data)
Follow-up TODOs:
  - Update PREMISE.md to reference XXIV
  - Add blueprint compliance row to feature spec template's
    Constitution Check table
  - Create insights/adaptive-blueprint-pattern.md as the
    continuous-learning archive (Constitution XVII)
  - Define pre-commit hook: reject data-i18n keys missing
    {audience} segment in adaptive slots
  - Feature 010 (backoffice CMS) MUST expose a slot editor
    that enforces the fallback cascade
```

### Direction 2 — status

**Proposed but NOT auto-applied**. Constitution amendments require explicit user approval per the `.tessl/.../rules/constitution.md` rule:

> NEVER amend `CONSTITUTION.md` without explicit user approval and version increment

Por tanto este archivo **propone** la amendment; el usuario decide:

- ✅ **Aprobar como v7.1.0 exactamente como está** → commit CONSTITUTION.md update
- ⚙️ **Aprobar con modificaciones** → iterar el wording antes de commit
- ❌ **Rechazar** → el blueprint queda como patrón de 009 sin promoción constitucional, y esta `backcasting.md` se archiva como contexto para futuras features

Mi recomendación: **aprobar como v7.1.0** porque el test de sistemicidad pasó los 4 puntos y el coste de no promoverlo (drift futuro) supera el coste de promoverlo (una entrada más en CONSTITUTION.md).

---

## 3. Consolidation — changes triggered by this backcasting

Esta sección lista **exactamente** los cambios que este ciclo backcasting exige aplicar al repo. Son las acciones concretas que el siguiente commit debe materializar.

### 3.1 Changes from Direction 1 (gaps A + B)

- [ ] **spec.md §4.1**: añadir `FR-099b` (offline pill coexiste con toggles) y `FR-046` (brand voice audit por audience variant)
- [ ] **sitemap.md §12**: sin cambios (ya apunta a adaptive-blueprint.md)
- [ ] **adaptive-blueprint.md §4**: añadir `FR-099b` y `FR-046` a la lista que se merge hacia spec.md

### 3.2 Changes from Direction 2 (Constitution v7.1.0)

- [ ] **CONSTITUTION.md**: añadir principio XXIV completo (section §2 de este archivo) con Sync Impact Report actualizado a v7.1.0 — **pendiente de aprobación del usuario**
- [ ] **PREMISE.md**: update si existe referencia a v7.0.0 que convenga bumpear
- [ ] **insights/adaptive-blueprint-pattern.md**: crear post-merge como archivo de continuous learning (Constitution XVII)
- [ ] Pre-commit hook en `.husky/pre-commit` o similar: reject `data-i18n` keys missing `{audience}` segment — diferido a tasks phase 05

### 3.3 Cascada hacia phases siguientes

- **/iikit-03-checklist** debe incluir un checklist item "Blueprint compliance" que valide shell, slots, cascada, matriz E2E.
- **/iikit-04-testify** debe generar `.feature` scenarios derivados de FR-200..FR-232 (BDD coverage del toggle flow).
- **/iikit-05-tasks** debe ordenar las tareas de modo que `js/state/bus.js` + `js/audience/state.js` existan antes que `SiteHeader.js` modificado + `adaptive-blueprint.spec.js`, para respetar dependencies.

---

## 4. Convergence test — is the loop closed?

Un ciclo de backcasting se considera **cerrado** cuando:

- [x] Cada principio Constitution v7 tiene una columna de verificación en Direction 1
- [x] Cada gap identificado en Direction 1 tiene un FR propuesto o un cambio concreto en §3
- [x] El test de sistemicidad de Direction 2 se ejecutó con las 4 preguntas respondidas
- [x] Si la amendment se justificó, el wording exacto está en §2 listo para commit
- [x] La consolidación §3 es ejecutable (no handwavy)
- [ ] El usuario ha dado approval sobre la amendment v7.1.0 (**pendiente**)

**Status del loop**: **95% cerrado**. El 5% restante es el approval del usuario sobre la Constitution amendment. Hasta entonces:

- Los cambios de Direction 1 (gap A + gap B) se aplican **ahora** en este commit (son FRs del feature, no de la constitution).
- Los cambios de Direction 2 (nuevo principio XXIV) quedan **propuestos** en este archivo y esperan aprobación explícita antes de tocar CONSTITUTION.md.

---

## 5. Meta — why this artifact exists

Backcasting bidireccional (Constitution ↔ Spec) es el único mecanismo que previene dos patologías:

1. **Constitution rot** (la constitución se aleja de la realidad del código): se previene con Direction 2 que fuerza a mirar cada feature como posible evolución constitucional.
2. **Spec anarchy** (las specs se libran de gobernanza mientras nadie mira): se previene con Direction 1 que obliga a rastrear cada FR contra un principio.

El backcasting NO es opcional cuando una feature introduce un patrón cross-cutting. Este archivo queda como **precedente** y **template** para futuros backcasting rounds. Feature 010 lo replicará.
