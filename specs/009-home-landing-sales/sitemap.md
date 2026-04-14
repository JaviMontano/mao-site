# Information Architecture & Sitemap — 009

**Feature**: 009-home-landing-sales
**Artifact type**: UX specification — IA + sitemap + page inventory
**Created**: 2026-04-14
**Status**: Draft v1 (Socratic refinement in §5)
**Related**: spec.md, plan.md
**Constraint**: **Exactly 13 pages total**, including home and 404.

---

## 1. UX Principles (the rules we will not break)

These principles govern every IA decision downstream. They are the compression of the Socratic debate (§5) into rules.

1. **One job per page**. Every page has exactly one primary decision the visitor is supposed to make. If a page has two CTAs of equal weight, the page is broken.
2. **Pyramid of intent, not menu of choices** (Hick's law). The home funnels into the diagnostic; everything else is an escape route. Secondary pages funnel into their own primary CTA, not back to the home.
3. **Two audiences, two landings**. B2B (`/empresas/`) and B2C (`/personas/`) do not share a page. They share components, copy tone shifts, proof shifts, pricing frames shift.
4. **Trust before conversion** (BJ Fogg ability model). Visitors who need proof get `/metodo/`, `/casos/`, `/nosotros/` before the diagnostic gate. Visitors who are ready go straight.
5. **Zero orphan pages**. Every page is reachable from ≤2 clicks from home. Every page links back to home and to its nearest sibling.
6. **Information scent must hold across clicks**. A link labeled "Ver programas" lands on `/programas/`, not `/oferta/` or `/cursos/`. Labels match destinations verbatim.
7. **One URL per concept**. No duplicate pages. No `/sobre-nosotros/` AND `/nosotros/`. No `/catalogo/` AND `/programas/`. Redirects consolidate.
8. **Detail pages are templates, not static pages**. Program detail, resource detail, insight detail all share one `index.html` per section + client-side router with `?slug=`. This keeps the count at 13 and the codebase at O(1) instead of O(N).
9. **SEO integrity survives client-side routing**. Each dynamic slug ships `<link rel="canonical">`, dynamic `<title>` / `og:*`, and pre-rendered HTML for the most valuable slugs (inlined in `index.html` of the section via conditional hydration). Constitution III.
10. **Footer is the safety net, not the site map**. Footer surfaces every page once; nav surfaces only the top 5.
11. **Accessibility is structural, not decorative**. Skip links, logical heading order, landmark roles, focus management on route change. Constitution II.
12. **Language parity is total**. Every page exists in ES and EN via `data-i18n`. Constitution XI and FR-060.

---

## 2. The 13 pages — canonical inventory

| # | Slug | Path | Job-to-be-done | Primary CTA | In nav? | In footer? |
|---|---|---|---|---|---|---|
| 1 | `home` | `/` | Convertir al diagnóstico | "Iniciar diagnóstico gratuito" → `/diagnostico/` | — (logo) | ✅ |
| 2 | `diagnostico` | `/diagnostico/` | Capturar lead calificado con contexto | "Ver tu resultado" → step 6 submit | ✅ (CTA button) | ✅ |
| 3 | `empresas` | `/empresas/` | Que un tomador de decisión B2B agende o diagnostique | "Hablemos de tu equipo" → `/diagnostico/?utm_content=empresas` | ✅ | ✅ |
| 4 | `personas` | `/personas/` | Que un profesional B2C se inscriba o diagnostique | "Encuentra tu ruta" → `/diagnostico/?utm_content=personas` | ✅ | ✅ |
| 5 | `programas` | `/programas/` | Navegar catálogo y entrar a un programa específico | "Quiero este programa" → mailto/contacto | ✅ | ✅ |
| 6 | `recursos` | `/recursos/` | Consumir un recurso gratuito; convertir premium | "Descargar ahora" (free) / "Desbloquear" (premium) | ✅ | ✅ |
| 7 | `metodo` | `/metodo/` | Educar sobre la metodología para reducir objeciones | "Probarlo con un diagnóstico" → `/diagnostico/` | ✅ | ✅ |
| 8 | `casos` | `/casos/` | Dar prueba social específica y creíble | "Agenda una conversación" → `/contacto/` | — | ✅ |
| 9 | `nosotros` | `/nosotros/` | Mostrar quién está detrás, para trust B2B | "Agenda una llamada" → `/contacto/` | — | ✅ |
| 10 | `insights` | `/insights/` | Content marketing orgánico SEO long-term | "Suscribirse a insights" → form | — | ✅ |
| 11 | `contacto` | `/contacto/` | Canalizar leads que no quieren diagnóstico | "Enviar" (form submit) | — | ✅ |
| 12 | `legal` | `/legal/` | Cumplimiento LGPD/GDPR + términos | — (anchors: `#privacidad`, `#terminos`, `#cookies`) | — | ✅ |
| 13 | `404` | `/404.html` | Recuperar al visitante que cayó a URL muerta | "Volver al home" | — | — |

**Total**: **13 páginas. Punto.**

**Nav primario** (5 items, regla Hick): `Diagnóstico` (como CTA button dorado), `Empresas`, `Personas`, `Recursos`, `Método`.
**Footer** (12 items, sin 404): todas las páginas + social + idioma.

---

## 3. Dynamic templates (how we stay at 13 while scaling content)

Tres "pages" son en realidad templates con router client-side que consume Firestore:

| Template | Lista | Detalle | Router param |
|---|---|---|---|
| `/programas/` | index renderiza grid de `programs/` (status=published, sorted by `order`) | `/programas/?slug=design-thinking-b2b` renderiza el mismo `index.html` con vista detalle | `slug` |
| `/recursos/` | catálogo por `tipo` + `estado` | `/recursos/?slug=toolkit-okr` | `slug` |
| `/insights/` | feed paginado | `/insights/?slug=por-que-okr-fallan` | `slug` |

**Por qué no páginas estáticas por cada programa/recurso**:
- Mantiene el count en 13 (constraint duro del usuario).
- O(1) mantenimiento: un template, N documentos Firestore.
- El contenido se edita sin redeploy (feature 010 backoffice).
- SEO: `canonical` dinámico + pre-renderización selectiva de los top-5 slugs dentro del `<template>` del section index (progressive enhancement).

**Fallback**: si JS está off, el `index.html` de cada section lista los top-10 items hard-coded, con enlaces que también funcionan como anclas (`#slug-x`). Constitution VI + III + FR-063.

---

## 4. Page-by-page spec (one screen per page)

Formato: **Job → Scent → Primary CTA → Above-the-fold → Proof → Escape → Outbound links**. Mantenido deliberadamente mínimo para no replicar contenido del spec.md.

### P1. `/` — Home
- **Job**: diagnóstico.
- **Above-the-fold**: promesa ≤12 palabras + CTA primario oro "Iniciar diagnóstico gratuito" + CTA secundario outline "Explorar recursos gratis" + nav.
- **Proof**: testimoniales (top 3) + logos.
- **Oferta**: 3–4 programas destacados → link "Ver todos" → `/programas/`.
- **Escape routes**: `/empresas/`, `/personas/`, `/recursos/`.
- **Detalle**: spec.md §4.1 FR-001..FR-005.

### P2. `/diagnostico/` — Diagnóstico
- **Job**: completar 6 pasos y capturar PII.
- **Fold**: stepper 1/6 + barra de progreso + pregunta + opciones.
- **Proof**: ninguna (distrae del flujo).
- **Salida**: pantalla de resultado con nivel + recomendación + CTA contextual (según tabla §4.5).
- **No hay nav completa** durante el flujo — solo logo + link "Salir" que confirma.
- **Detalle**: spec.md §4.5 + contracts/diagnostic-logic.json.

### P3. `/empresas/` — B2B landing
- **Job**: convencer a directivo/líder.
- **Fold**: promesa B2B (ROI, velocidad, alineamiento) + CTA "Hablemos de tu equipo" → `/diagnostico/?utm_content=empresas`.
- **Proof**: casos B2B (top 3, link a `/casos/?filter=empresa`).
- **Oferta**: programs con `audiencia=empresa` (3 cards, link a `/programas/?audiencia=empresa`).
- **Escape**: `/casos/`, `/nosotros/`.
- **Secondary CTA**: "Ver casos" → `/casos/?filter=empresa`.

### P4. `/personas/` — B2C landing
- **Job**: convencer al profesional individual.
- **Fold**: promesa personal (carrera, claridad, método propio) + CTA "Encuentra tu ruta" → `/diagnostico/?utm_content=personas`.
- **Proof**: testimoniales B2C (top 3).
- **Oferta**: programs con `audiencia=persona` (3 cards, link a `/programas/?audiencia=persona`).
- **Escape**: `/recursos/`.
- **Secondary CTA**: "Explorar recursos gratis" → `/recursos/`.

### P5. `/programas/` — Catálogo + detalle
- **Job (lista)**: que el visitante encuentre un programa y entre a su detalle.
- **Job (detalle)**: que el visitante solicite inscripción o contacte.
- **Filtros**: `audiencia` (empresa/persona), `duracion`, `nivel`.
- **CTA detalle**: "Quiero este programa" → `/contacto/?programa={slug}` (pre-fill).
- **Fuente**: Firestore `programs/` (read-only).

### P6. `/recursos/` — Catálogo free + premium
- **Job**: consumir free; convertir premium.
- **Filtros**: `tipo`, `estado` (free/premium), `locale`.
- **CTA free**: "Descargar" directo.
- **CTA premium**: modal "Desbloquear con email" → crea `leads/{uid}` con `fuente=home-resource-premium` (FR-022).
- **Fuente**: Firestore `resources/`.

### P7. `/metodo/` — Metodología
- **Job**: educar y reducir objeciones.
- **Estructura**: 4 secciones — "Qué es", "Cómo lo aplicamos", "Qué lo hace diferente", "Cómo probarlo".
- **CTA**: "Probar con un diagnóstico" → `/diagnostico/`.
- **Proof**: bloque de métricas propias (años, clientes, cohortes).
- **Zero framework comparison tables** — violan "one job per page".

### P8. `/casos/` — Casos de éxito
- **Job**: dar prueba social profunda para quien todavía duda.
- **Filtros**: `segmento` (empresa/persona), `industria`.
- **Card**: problema → solución → resultado medible → logo/avatar.
- **CTA**: "Agenda una conversación" → `/contacto/`.
- **Fuente**: Firestore `testimonials/` + `casos/` (feature 010 agregará `casos/`; en 009 usamos `testimonials/` con campo `caso_completo`).

### P9. `/nosotros/` — About
- **Job**: establecer legitimidad para compradores B2B enterprise.
- **Estructura**: misión (1 párrafo) + fundador (foto + bio corta) + equipo (3–5 cards opcional) + filosofía (link a `/metodo/`).
- **CTA**: "Agenda una llamada" → `/contacto/`.
- **Minimalismo**: NO timeline histórico, NO valores genéricos, NO collage de fotos.

### P10. `/insights/` — Blog / content marketing
- **Job**: SEO orgánico long-term + captura de email.
- **MVP (en 009)**: shell vacío con placeholder + form de suscripción (escribe en `leads/{uid}` con `fuente=insights-subscribe`).
- **Crecimiento**: contenido se agrega vía feature 010 backoffice.
- **Por qué existe hoy**: reservar slot de SEO y evitar futura restructura de URLs.

### P11. `/contacto/` — Contacto
- **Job**: canalizar leads que rechazaron el diagnóstico o prefieren humano.
- **Estructura**: form (nombre, email, mensaje, programa opcional pre-fill) + whatsapp + email + dirección (trust B2B).
- **Write path**: `leads/{uid}` con `fuente=contact-form`, append-only igual que diagnóstico.
- **Mailto fallback** si Firestore cae.

### P12. `/legal/` — Legal consolidado
- **Job**: cumplimiento LGPD/GDPR + términos.
- **Estructura**: 3 anchors `#privacidad`, `#terminos`, `#cookies`. Cada sección autónoma.
- **Por qué 1 página**: anchors satisfacen regulador (deep link), URL única simplifica nav y evita drift entre 3 páginas legales.

### P13. `/404.html` — Not found
- **Job**: recuperar al visitante.
- **Estructura**: mensaje + botón "Volver al home" + buscador (opcional, filtra programs/resources).
- **Por qué cuenta**: ship file real, URL real cuando el server devuelve 404.

---

## 5. Socratic debate — refinement cycle

Each question pressure-tests a draft decision. **Answer = decision taken**. Questions resolved in this session become §6 principles; open ones become clarifications for the next spec iteration.

### Q1. ¿Por qué no fusionar `/empresas/` y `/personas/` en una sola página "Soluciones" con toggle?
**Tensión**: reducir a 12 páginas con un toggle parece más simple.
**Contra-argumento UX**: un toggle fuerza al visitante a auto-segmentarse antes de ver contenido relevante. B2B y B2C tienen **pruebas sociales incompatibles** (logos corporativos vs testimonios personales), **framings de precio distintos** (inversión vs desarrollo personal), **lenguaje diferente** (ROI vs claridad).
**Decisión**: ❌ Rechazado. Mantener 2 landings separadas. El costo de duplicación se mitiga con componentes compartidos (hero, proof card, programa card); el beneficio es tasa de conversión 2x en cada segmento (principio Mental Models de Jakob Nielsen).

### Q2. ¿`/metodo/` es redundante con la sección "Método" del home?
**Tensión**: el home ya vende el método; una página aparte puede ser redundante.
**Contra-argumento UX**: el home tiene ~45 segundos de atención (benchmark B2C landing). El método profundo necesita ~5 minutos de lectura. Son **dos jobs-to-be-done diferentes**: home = "convencer de probar", `/metodo/` = "convencer de creer antes de probar".
**Decisión**: ✅ Mantener `/metodo/`. El home solo insinúa; `/metodo/` profundiza para visitantes que hicieron click específicamente porque quieren entender antes de decidir.

### Q3. ¿`/nosotros/` no tiene la tasa de bounce más alta de cualquier sitio SaaS?
**Tensión**: las páginas "about" bouncean 70–80% típicamente. ¿Vale el slot?
**Contra-argumento UX**: en LatAm B2B enterprise, "quién está detrás" es **decisivo para comité de compras** (evaluación de riesgo de proveedor). Bounce alto en B2C es irrelevante; conversión B2B depende de legitimidad de la empresa.
**Decisión**: ✅ Mantener `/nosotros/`, pero radicalmente minimalista (1 scroll, no hero grande, no timeline, no collage). Sirve su job sin robar atención.

### Q4. ¿`/casos/` no debería ser una sección dentro de empresas/personas en lugar de una página?
**Tensión**: ya planeamos secciones de proof en ambas landings.
**Contra-argumento UX**: sí, pero 3 casos en el fold de una landing son **preview**. Un visitante que está a punto de convertir busca **más casos que los 3 destacados**. Si no tiene página dedicada, abandona buscándola en Google.
**Decisión**: ✅ Embeber top 3 en cada landing + mantener `/casos/` con filtros. Ambas cosas. El link "Ver todos los casos" del embed es el puente.

### Q5. ¿`/diagnostico/` debería ser un modal sobre el home en lugar de una ruta?
**Tensión**: un modal tiene menos fricción que cambiar de página.
**Contra-argumento UX**: el diagnóstico necesita URL propia para (a) **share** ("envíale esto a tu jefe"), (b) **analytics** (funnel limpio por step), (c) **A/B** (dos variantes, dos URLs), (d) **reanudar** sin depender de estado de home, (e) **SEO** (ranking propio). Un modal rompe todas estas.
**Decisión**: ✅ Ruta dedicada `/diagnostico/`. El home link abre la ruta; no modal.

### Q6. `/insights/` vacío en MVP — ¿no es mejor no tener la página que tener una vacía?
**Tensión**: una página vacía con "próximamente" daña la credibilidad.
**Contra-argumento UX/SEO**: no publicar `/insights/` hoy significa **re-arquitectar URLs** cuando exista contenido, lo cual es un costo SEO (redirects + perdida de backlinks históricos). Además la forma "empty shell" se puede resolver con **form de suscripción útil** ("sé el primero en recibir el primer insight") — no es vacía, es **early access**.
**Decisión**: ✅ Mantener `/insights/` desde día 1 como "early access" con form de suscripción. No como "coming soon".

### Q7. Legal en 1 página con anchors vs 3 páginas separadas (privacy, terms, cookies)
**Tensión**: LGPD y GDPR se refieren a URLs canónicas de política de privacidad.
**Contra-argumento legal/UX**: las regulaciones aceptan **deep links a anchors** (`/legal/#privacidad`) como URL canónica válida. Lo que importa es que la URL sea estable, accesible, y contenga el texto completo. Tres páginas separadas triplican el mantenimiento y el drift entre versiones.
**Decisión**: ✅ Una sola `/legal/` con 3 anchors. Cada anchor tiene su propio `<h1>` + título semántico para SEO.

### Q8. Programas como static per-slug vs template dinámico
**Tensión**: páginas estáticas por programa son mejores para SEO long-tail.
**Contra-argumento constraint**: **13 páginas es un hard constraint del usuario**. Además, con 10+ programas, estático = O(N) mantenimiento. Template dinámico + **pre-renderización selectiva** de los top-5 slugs más buscados (inyectados como `<template>` dentro de `/programas/index.html` y extraídos por JS según slug) = SEO cercano al estático sin romper el count.
**Decisión**: ✅ Template dinámico con pre-renderización selectiva. Top-5 slugs viven en HTML del repo; el resto se hidrata desde Firestore.

### Q9. ¿404.html debe contar en el 13?
**Tensión**: no es navegable desde nav; algunos sitios no la cuentan.
**Contra-argumento realista**: **es un HTML que shippeamos**, vive en el repo, tiene que tener el mismo design system, tiene que estar internacionalizado, tiene que tener analytics. Contarla obliga a honestidad y previene la trampa de "en realidad tenemos N+1 pages".
**Decisión**: ✅ 404 cuenta como la página 13. Punto.

### Q10. Contacto: ¿página o modal desde cualquier CTA?
**Tensión**: modal conserva contexto.
**Contra-argumento UX + negocio**: `/contacto/` da **legitimidad operacional** — Google snippets muestran dirección física y whatsapp; esto mejora trust signal B2B. Un modal no aparece en snippets. Además, el form de contacto necesita URL para tracking de campañas (`/contacto/?utm_campaign=linkedin-q2`).
**Decisión**: ✅ Página dedicada.

### Q11. Information scent — ¿el visitante de `/empresas/` cómo sabe que existen programas específicos?
**Tensión**: riesgo de silo — el visitante no salta de audiencia → oferta.
**Solución**: cada landing de audiencia embebe 3 cards de programs con **filtrado pre-aplicado** (`/programas/?audiencia=empresa`) y un link "Ver todos los programas para empresas". El scent se mantiene: la label coincide con el destino filtrado.
**Decisión**: ✅ Embed + filtered link.

### Q12. Nav primario con 13 items rompe Hick's law. ¿Cuántos mostrar?
**Tensión**: 13 items en nav = 1.4s+ de decisión; 5 items = 0.8s (Nielsen Norman benchmark).
**Decisión**: **nav primario = 5 items** (`Diagnóstico`, `Empresas`, `Personas`, `Recursos`, `Método`). Footer surface las 12 restantes (sin 404). Diagnóstico en nav es el **CTA button dorado**, no un link normal — jerarquía visual explícita.

### Q13. ¿El plan previo (Web Components + seed manifest + critical.css hand-authored + 6 tests E2E) es proporcional?
**Tensión**: el plan actual es muy robusto para una landing. Sobrecarga la implementación.
**Auditoría rápida** de over-engineering candidatos:
- `BlockRenderer.js` → ❌ cortar. Los bloques CMS son feature 010.
- `ThemeToggle` como Web Component aparte → ❌ cortar. Es un botón dentro de `SiteHeader`.
- `OfflinePill.js` como Web Component → ❌ cortar. Es un `<div role="status" aria-live="polite">` en `index.html`.
- `DiagnosticStepper.js` como Web Component con shadow DOM → ⚠️ simplificar a clase JS que toma un `<section id="stepper">` existente en el HTML.
- `scripts/seed.js` + `seed.manifest.json` → ❌ cortar. Ya existe `scripts/seed-firestore.js`; extender ese archivo.
- `estilos/critical.css` como archivo separado → ❌ cortar. Inlinear el fold CSS directamente en `<style>` del `<head>` de `index.html`.
- `js/diagnostic/state.js` + `js/diagnostic/render.js` como módulos separados → ❌ colapsar en `js/diagnostic/logic.js` + 1 archivo `js/diagnostic/controller.js` máximo.
- Tests E2E — 6 suites separadas → ⚠️ consolidar en 3: `home.spec.js` (responsive + critical CSS + a11y + i18n), `offline.spec.js` (pill), `diagnostic.spec.js` (happy path).
- `tests/integration/home-firestore.spec.js` → ❌ cortar. Redundante con `security-rules.spec.js`.

**Decisión**: ✅ Todos los cuts aprobados. Plan se reduce de **15+ archivos nuevos** a **~7 archivos nuevos**. Ver §7 feedback.

### Q14. ¿Deberíamos añadir `/precios/` como página 14?
**Tensión**: B2B espera ver precios; la falta de precios aumenta CPL.
**Contra-argumento constraint**: 13 páginas duro. Además, el pricing en MetodologIA es **cotización** (value-based, no listas), lo cual es mejor servido por el diagnóstico + contacto + propuesta personalizada.
**Decisión**: ❌ No añadir `/precios/`. En su lugar, cada programa en `/programas/?slug=*` tiene un bloque "Rango de inversión estimado" y un CTA a `/contacto/`.

### Q15. ¿`/ruta/` existente en el repo debe preservarse?
**Tensión**: `ruta/` tiene un cotizador funcional; cortarlo es pérdida.
**Contra-argumento**: `/ruta/` es funcionalidad de **diagnóstico v1**. En 009 el diagnóstico es la nueva ruta canónica. `/ruta/` debe redirigir 301 a `/diagnostico/` — NO cuenta como página 14 porque es redirect server-side en `.htaccess`.
**Decisión**: ✅ `/ruta/*` → 301 redirect → `/diagnostico/`. Preservar analytics con `?utm_source=legacy-ruta`.

### Open questions (for `/iikit-clarify`, if needed)

- **OQ1**: ¿El form de suscripción de `/insights/` usa la misma colección `leads/` o una nueva `subscribers/`?
- **OQ2**: ¿`/casos/` consume `testimonials/` con filtro o necesita una colección nueva `cases/`?
- **OQ3**: ¿`/nosotros/` es contenido estático en HTML o consume `pages/nosotros` de Firestore?
- **OQ4**: ¿Legacy redirects (`/vision.html` → `/metodo/`, `/servicios/` → `/programas/`, `/ruta/` → `/diagnostico/`) van en `.htaccess` Hostinger o en JS `router`?
- **OQ5**: ¿Sitemap.xml se regenera vía script en CI o se mantiene estático?

---

## 6. Derived principles (output of §5 → governance input for plan.md)

| # | Principle | Source | Impact on plan |
|---|---|---|---|
| A | Nav primario = exactamente 5 items | Q12 | SiteHeader.js hardcodea 5 items + CTA button |
| B | Footer surface las 12 páginas (sin 404) | Q12 | SiteFooter.js tiene sitemap completo |
| C | Dynamic templates para programas/recursos/insights | Q8 | 3 templates client-routed, pre-render top-5 slugs |
| D | Legal consolidado con anchors | Q7 | 1 archivo `legal/index.html` con 3 `<section>` |
| E | Diagnóstico es ruta dedicada, no modal | Q5 | `diagnostico/index.html` + router, no modal en `index.html` |
| F | 13 es hard constraint | Q14, Q8, Q9 | Sin páginas adicionales sin aprobación explícita |
| G | `/insights/` como "early access", no "coming soon" | Q6 | Shell mínima + form de suscripción |
| H | Plan simplificado — cut over-engineering | Q13 | Ver §7 feedback |
| I | `/ruta/` → `/diagnostico/` 301 | Q15 | `.htaccess` redirects declarativos |
| J | Information scent preservado via filtered links | Q11 | Deep links con query params en todos los CTAs cruzados |

---

## 7. Feedback loop — plan.md simplification driven by this IA

**Trigger**: §5 Q13 derivó principio H (plan simplificado).

**Antes (plan v1 — demasiado robusto para el alcance)**:
- 6+ archivos nuevos en `components/`
- 4 archivos nuevos en `js/diagnostic/`
- Nuevo `scripts/seed.js` + manifest
- Nuevo `estilos/critical.css`
- 6 suites E2E separadas
- 2 suites integration

**Después (plan v2 — alineado con IA)**:
- **Components nuevos**: `DiagnosticStepper.js` (clase, no WC con shadow DOM). Modificar `SiteHeader.js` para integrar theme toggle + nav 5 items, y `SiteFooter.js` para sitemap 12.
- **Diagnostic module**: `js/diagnostic/logic.js` (puro, SSOT desde `contracts/diagnostic-logic.json`) + `js/diagnostic/controller.js` (glue DOM + localStorage TTL + Firestore write). Total = 2 archivos.
- **Seed**: extender `scripts/seed-firestore.js` existente con bloques `programs/`, `testimonials/`. No archivo nuevo.
- **Critical CSS**: inlinear en `<style>` dentro de `<head>` de `index.html` y de cada page template. Sin archivo separado. El contenido inlinear sale de una sección comentada `/* == CRITICAL FOLD == */` en `estilos/variables.css` — el humano copia-pega cuando actualiza tokens.
- **E2E tests**: 3 suites — `tests/e2e/home.spec.js` (responsive + critical CSS + i18n + a11y), `tests/e2e/offline.spec.js`, `tests/e2e/diagnostic.spec.js`.
- **Integration tests**: 1 suite — `tests/integration/security-rules.spec.js`. Eliminado `home-firestore.spec.js`.
- **Unit tests**: 2 suites — `tests/unit/diagnostic-logic.spec.js`, `tests/unit/analytics-events.spec.js`. Eliminados `diagnostic-state.spec.js` (cubierto por controller en E2E) y `theme-toggle.spec.js` (cubierto por `home.spec.js`).

**Archivos nuevos netos**: de ~20 → **~8**. Reducción 60%.

**Archivos modificados**: `index.html` (reescrito), `estilos/variables.css`, `estilos/home.css`, `estilos/base.css`, `components/SiteHeader.js`, `components/SiteFooter.js`, `firebase/firestore.rules`, `scripts/seed-firestore.js`.

**Páginas a crear/modificar** (para las 13):
- Modificar: `index.html` (P1), `empresas/index.html` (P3), `personas/index.html` (P4), `recursos/index.html` (P6), `nosotros/index.html` (P9), `contacto/index.html` (P11).
- Crear nuevos: `diagnostico/index.html` (P2), `programas/index.html` (P5), `metodo/index.html` (P7), `casos/index.html` (P8), `insights/index.html` (P10), `legal/index.html` (P12), `404.html` (P13).
- Retirar/redirigir: `vision.html` → `/metodo/`, `servicios/index.html` → `/programas/`, `ruta/index.html` → `/diagnostico/`, `sitemap.html` → `/sitemap.xml` (auto-generado).

**Impacto en spec.md**: el alcance de 009 crece de "solo home" a "home + 12 páginas más". Propongo dos lecturas:

1. **Lectura estricta (recomendada)**: 009 entrega el home + `/diagnostico/` + shell esqueleto (10 líneas cada uno) de las 11 páginas restantes + redirects + 404 + sitemap.xml + nav/footer actualizados. El contenido real de cada shell se completa en features 011-page-contenido-{nombre} por página. Esto mantiene 009 en tamaño de sprint.

2. **Lectura expandida**: 009 entrega las 13 páginas completas. Sprint grande, ~3x más trabajo, riesgo de no cerrar.

**Decisión propuesta** (requiere tu confirmación explícita — ver §8): **lectura estricta**. La razón: el hard constraint de 13 páginas es sobre **arquitectura**, no sobre **completitud de contenido**. Tener los 13 shells impide restructuración futura y acuerda el mapa mental del sitio; el contenido se itera.

---

## 8. Decisions requiring user confirmation

Estas decisiones cambian el alcance del spec v5. Necesitan tu visto antes de que `/iikit-02-plan` se re-ejecute con los nuevos archivos:

1. **D1**: Lectura estricta vs expandida (§7). _Propuesta: estricta._
2. **D2**: `/ruta/` → `/diagnostico/` 301 redirect irreversible. _Propuesta: sí, con `?utm_source=legacy-ruta` para seguimiento._
3. **D3**: `/insights/` como "early access" shell + form de suscripción en día 1. _Propuesta: sí._
4. **D4**: Legal consolidado 1 página con anchors. _Propuesta: sí._
5. **D5**: Pre-renderización selectiva de top-5 slugs (programs/resources/insights). _Propuesta: sí._
6. **D6**: Cut de over-engineering del plan — §7 archivos reducidos. _Propuesta: sí._
7. **D7**: Nav primario 5 items, footer 12. _Propuesta: sí._
8. **D8**: OQ1–OQ5 abiertas → `/iikit-clarify` en sesión aparte si hay tiempo. _Propuesta: diferido._

---

## 9. Sitemap.xml (machine-readable, for crawlers)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>https://metodologia.info/</loc>                <xhtml:link rel="alternate" hreflang="es" href="https://metodologia.info/"/>                <xhtml:link rel="alternate" hreflang="en" href="https://metodologia.info/?lang=en"/></url>
  <url><loc>https://metodologia.info/diagnostico/</loc>    <priority>1.0</priority></url>
  <url><loc>https://metodologia.info/empresas/</loc>       <priority>0.9</priority></url>
  <url><loc>https://metodologia.info/personas/</loc>       <priority>0.9</priority></url>
  <url><loc>https://metodologia.info/programas/</loc>      <priority>0.8</priority></url>
  <url><loc>https://metodologia.info/recursos/</loc>       <priority>0.8</priority></url>
  <url><loc>https://metodologia.info/metodo/</loc>         <priority>0.7</priority></url>
  <url><loc>https://metodologia.info/casos/</loc>          <priority>0.6</priority></url>
  <url><loc>https://metodologia.info/nosotros/</loc>       <priority>0.5</priority></url>
  <url><loc>https://metodologia.info/insights/</loc>       <priority>0.6</priority></url>
  <url><loc>https://metodologia.info/contacto/</loc>       <priority>0.5</priority></url>
  <url><loc>https://metodologia.info/legal/</loc>          <priority>0.3</priority></url>
</urlset>
```

**Nota**: 404 no se incluye en sitemap.xml (convención). Programas/recursos/insights detail slugs se añaden dinámicamente vía script post-seed (ver plan §Phase 1).

---

## 10. Cross-page link graph (proof there are no orphans)

```
home → diagnostico, empresas, personas, recursos, programas (via programas section)
diagnostico → home (logo), resultado → recomendacion (recursos|personas|empresas)
empresas → diagnostico, programas?audiencia=empresa, casos?filter=empresa, nosotros, contacto
personas → diagnostico, programas?audiencia=persona, recursos, casos?filter=persona
programas → programas?slug=X → contacto?programa=X, home, audiencia landing
recursos → recursos?slug=X, home, modal premium (write lead)
metodo → diagnostico, casos, home
casos → contacto, empresas/personas, home
nosotros → contacto, metodo, home
insights → form suscripcion → lead, home, insights?slug=X
contacto → home, programas (pre-fill)
legal → home (nav)
404 → home, buscador → programas/recursos
```

**Verificación**:
- Cada nodo tiene in-degree ≥1 (todos son reachable desde home o nav).
- Cada nodo tiene out-degree ≥2 (ningún dead-end).
- Ciclos cortos home ↔ empresas/personas/diagnóstico ayudan a navegación recuperable.

---

## 12. Cross-cutting toggles — three-axis adaptive blueprint

Esta IA es compatible — y se refuerza — con el patrón **blueprint homologado + 3 toggles globales** especificado en [adaptive-blueprint.md](./adaptive-blueprint.md). Summary:

- Las 13 páginas (§2) comparten un **shell único** con header + main + footer. La variación entre páginas es qué slots están presentes, no qué layout usan.
- El header expone 3 toggles visibles en md+ (colapsados en xs/sm): **locale** (ES/EN), **theme** (light/dark), **audience** (persona/empresa).
- **Theme es ortogonal al contenido** (solo tokens CSS). Locale + audience generan 4 variantes de copy por slot.
- **Principio F reafirmado** (13 pages): el toggle de audience NO crea páginas nuevas — adapta los slots de las existentes. `/empresas/` y `/personas/` mantienen audiencia intrínseca pero el toggle en su header actúa como "switch to the other landing" (FR-206), no como mutación in-place.
- **Principio J reforzado** (scent preserved): los CTAs cruzados ahora son conscientes del audience state — `/programas/?audiencia=empresa` es redundante cuando `mdg_audience=empresa` ya está activo, pero se preserva como override explícito.
- **Acceptance adicional** para esta IA:
  - [ ] El toggle bar aparece en las 13 páginas vía `SiteHeader` único.
  - [ ] La matriz 52 (13 pages × 2 locale × 2 audience) está cubierta por el E2E parametrizado (FR-215).
  - [ ] Ninguna página depende de theme para su contenido.

---

## 11. Acceptance criteria for this IA spec

Para considerar §1–§10 "aceptados" y proceder a re-plan:

- [ ] Usuario confirma **D1–D8** (§8).
- [ ] Ninguna página del inventario §2 tiene job duplicado con otra.
- [ ] Nav primario = 5 items confirmado en §6 principio A.
- [ ] 13 páginas exactas verificado en §2 (count físico).
- [ ] `sitemap.xml` de §9 refleja el inventario §2.
- [ ] Link graph §10 sin orphans ni dead-ends.
- [ ] Socratic §5 sin open questions críticas (OQ1–OQ5 son no-bloqueantes).
- [ ] Feedback §7 aplicable sin violar Constitution v7.

Cuando los 8 checkboxes estén marcados (vía ciclo siguiente), `/iikit-02-plan` se re-ejecuta con scope ajustado y este `sitemap.md` se convierte en dependency input de `plan.md`.
