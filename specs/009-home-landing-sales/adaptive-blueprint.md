# Adaptive Blueprint — 009 (spec extension)

**Parent spec**: [spec.md](./spec.md) · **IA**: [sitemap.md](./sitemap.md) · **Plan**: [plan.md](./plan.md)
**Created**: 2026-04-14
**Status**: Draft v1 — requires integration into spec.md §4 FR block and data-model.md
**Purpose**: Especificar los 3 toggles globales (Locale, Theme, Audience) y el blueprint homologado cuyos slots se adaptan declarativamente a la combinación activa.

---

## 1. The three axes

| Eje | Estados | Impacto en render | Persistencia | Instant click |
|---|---|---|---|---|
| **Locale** | `es` \| `en` | Texto (vía `data-i18n`) | `localStorage.mdg_locale` + cookie `mdg_locale` (para redirect server-side opcional) | ✅ |
| **Theme** | `light` \| `dark` | Solo CSS custom properties (tokens); cero cambios de contenido | `localStorage.mdg_theme` | ✅ |
| **Audience** | `persona` \| `empresa` \| `unknown` (default inicial) | Copy de slots (hero, proof, CTA), filtros de listados, proof seleccionada | `localStorage.mdg_audience` + query param `?audiencia=` override | ✅ |

**Ortogonalidad**: Theme es **CSS-only**; no toca contenido. Locale + Audience son **content-only**; no tocan tokens. Esto garantiza 2×2×2 = 8 combinaciones visualmente consistentes sin combinatoria de CSS.

---

## 2. The blueprint — single layout, adaptive slots

Todas las 13 páginas (Sitemap §2) heredan el **mismo blueprint visual**: header, main con slots tipados, footer. La única variación entre páginas es qué slots están presentes y qué `pageSlug` resuelven.

### 2.1 Page shell (common HTML skeleton)

```html
<!DOCTYPE html>
<html lang="es" data-theme="light" data-audience="unknown">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title data-i18n="{pageSlug}.meta.title">—</title>
    <meta name="description" data-i18n="{pageSlug}.meta.description" content="—" />
    <link rel="canonical" href="https://metodologia.info{path}/" />
    <style>/* CRITICAL FOLD — tokens + hero layout inline */</style>
    <link rel="stylesheet" href="/dist/output.css" media="print" onload="this.media='all'" />
  </head>
  <body>
    <a class="skip-link" href="#main" data-i18n="common.skip_to_main">—</a>
    <site-header></site-header>

    <main id="main" data-page-slug="{pageSlug}">
      <!-- Hero slot: morfa por (locale, audience) -->
      <section data-slot="hero"
               data-i18n-key="{pageSlug}.hero.{audience}"
               aria-labelledby="hero-title">
        <h1 id="hero-title" data-i18n="{pageSlug}.hero.{audience}.headline">—</h1>
        <p data-i18n="{pageSlug}.hero.{audience}.subheadline">—</p>
        <a class="cta-primary"
           data-i18n="{pageSlug}.hero.{audience}.cta_label"
           data-i18n-href="{pageSlug}.hero.{audience}.cta_href">—</a>
      </section>

      <!-- Proof slot: audience-dependent -->
      <section data-slot="proof" data-audience-variant="{audience}">…</section>

      <!-- Oferta slot: audience filters programs -->
      <section data-slot="oferta" data-audience-filter="{audience}">…</section>

      <!-- Cierre slot: repeats CTAs -->
      <section data-slot="closing">…</section>
    </main>

    <site-footer></site-footer>

    <!-- Controllers load as ES modules -->
    <script type="module" src="/js/i18n/index.js"></script>
    <script type="module" src="/js/theme/toggle.js"></script>
    <script type="module" src="/js/audience/controller.js"></script>
    <script type="module" src="/components/SiteHeader.js"></script>
    <script type="module" src="/components/SiteFooter.js"></script>
  </body>
</html>
```

**Reglas del shell**:
- `html[lang]` se mantiene en sync con `mdg_locale` (para SEO + a11y).
- `html[data-theme]` se mantiene en sync con `mdg_theme` (para CSS selectors `[data-theme="dark"] { --bg: … }`).
- `html[data-audience]` se mantiene en sync con `mdg_audience` (para CSS selectors `[data-audience="empresa"] .audience-only-persona { display: none }` y para JS query selectors).
- El cambio de cualquier toggle actualiza los 3 atributos y dispara un evento custom `mdg:state-changed` que escuchan `i18n`, `theme`, `audience-controller`.

### 2.2 Content slots — declarative contract

Un **slot** es una región del HTML identificada por `data-slot="{name}"` que resuelve su contenido contra `{pageSlug}.{slot}.{audience}.{locale}` en el diccionario i18n activo. Slots canónicos:

| Slot | Variante por audience? | Variante por locale? | Variante por theme? | Dónde aparece |
|---|---|---|---|---|
| `hero` | ✅ (copy + CTA) | ✅ | ❌ | Todas las 13 pages (incluyendo 404) |
| `proof` | ✅ (qué testimoniales/logos/métricas) | ✅ (labels) | ❌ | home, empresas, personas, metodo, casos, programas listing |
| `oferta` | ✅ (filtra programs por audiencia) | ✅ | ❌ | home, empresas, personas, programas listing |
| `escape_routes` | ✅ (qué rutas sugiere) | ✅ | ❌ | home, empresas, personas, metodo, contacto |
| `closing` | ✅ | ✅ | ❌ | home, empresas, personas, programas, recursos, metodo |
| `meta` (title, description, og) | ✅ | ✅ | ❌ | todas |

**Invariante**: ningún slot depende de theme. Theme solo reescala tokens CSS. Si alguna feature necesita contenido dependiente de theme (ej. logo inverso), se resuelve por CSS (`background-image: var(--logo-url)`), no por JS.

### 2.3 Fallback cascade (cuando falta una variante)

Un slot resuelve su contenido con la siguiente cascada, en orden:

1. `{pageSlug}.{slot}.{audience}.{locale}` — match exacto
2. `{pageSlug}.{slot}.unknown.{locale}` — audience-neutral
3. `{pageSlug}.{slot}.{audience}.es` — fallback de locale a ES
4. `{pageSlug}.{slot}.unknown.es` — last resort
5. `common.missing.{slot}` — hard fallback ("Contenido no disponible" / "Content unavailable")

**Invariante**: nunca un string vacío, nunca una key cruda (`home.hero.persona.headline`) debe aparecer en el DOM. Test E2E lo enforce.

---

## 3. Audience state — provenance and transitions

### 3.1 Provenance (de dónde viene el valor inicial)

En orden de prioridad (cascada):

1. **URL param**: `?audiencia=empresa` o `?audiencia=persona` — sobrescribe todo y persiste.
2. **localStorage**: `mdg_audience` — si el usuario ya toggled antes.
3. **Landing page inference**: si la primera página vista es `/empresas/` → `empresa`; si es `/personas/` → `persona`.
4. **Diagnóstico inference**: al completar el diagnóstico, `q_segmento in {directivo, fundador, lider_equipo}` → `empresa`; `q_segmento == persona` → `persona`.
5. **UTM content**: `?utm_content=empresas` → `empresa`.
6. **Default**: `unknown` (hero usa copy audience-neutral de la cascada §2.3).

### 3.2 Transitions

Un cambio de audience **nunca recarga la página**. El controlador:

1. Escribe `localStorage.mdg_audience`
2. Actualiza `html[data-audience]`
3. Dispara `mdg:state-changed` con `{ kind: "audience", from, to }`
4. Re-resuelve todos los slots `[data-audience-variant]` y `[data-audience-filter]`
5. Re-aplica traducciones (`data-i18n` keys contienen `{audience}`)
6. Re-renderiza listados filtrados (`/programas/` grid aplica nuevo filter)
7. Emite evento analytics `audience_switched` con `{from, to, page_slug}`

**Tiempo target**: transición <100ms desde click a DOM actualizado. Enforced por E2E Playwright.

### 3.3 Persistence model

- **localStorage.mdg_audience** (sin expiry) — autoridad del cliente
- **Cookie mdg_audience** (Secure, SameSite=Lax, 180d) — para que server-side .htaccess pueda hacer redirect opcional `/programas/` → `/programas/?audiencia=empresa` en el primer request (UX opcional, no requerido)
- **Sin Firestore**: el audience state es puramente client-side. No es PII. No se escribe a `leads/{uid}` excepto cuando el diagnóstico lo infiere como parte de `segmento` (ya cubierto por FR-013).

---

## 4. Functional Requirements (to merge into spec.md §4.1)

**Toggle bar — control de usuario**

- **FR-200**: El header MUST exponer 3 toggles visibles en todos los breakpoints: `locale` (ES/EN), `theme` (light/dark), `audience` (persona/empresa). En xs/sm se colapsan a un menú "⚙ Preferencias" accesible via botón con `aria-expanded`. En md+ son 3 controles segmentados inline.
- **FR-201**: Cada toggle MUST ser semánticamente un `role="radiogroup"` con dos `role="radio"` (o un `<button aria-pressed>` pair), con `aria-label` descriptivo en el locale activo.
- **FR-202**: El click en cualquier toggle MUST ser instantáneo (no reload), actualizar los atributos `html[lang|data-theme|data-audience]`, persistir en `localStorage`, y completar la transición DOM en <100ms.
- **FR-203**: Los 3 toggles MUST compartir un componente único `<site-header>` (Constitution IV); no hay implementaciones alternativas por página.
- **FR-204**: El toggle de audience MUST mostrar feedback visual no-intrusivo (micro-pulse en el slot `hero` que acaba de cambiar) respetando `prefers-reduced-motion`.
- **FR-205**: Si el usuario llega con `?audiencia=X` en la URL, el toggle MUST inicializar en ese estado y persistirlo antes del primer paint (para evitar FOUC de contenido).
- **FR-206**: El header MUST renderizar el toggle de audience **también** en `/empresas/` y `/personas/` como indicación visible de que la audiencia está "pinneada" a esa landing; el click cambia a la landing complementaria con redirect suave (pushState) en lugar de solo cambiar `data-audience` (excepción a FR-202 porque esas dos páginas tienen audiencia intrínseca).

**Blueprint homologado — slots adaptativos**

- **FR-210**: Cada page HTML MUST seguir el shell de §2.1 con los atributos `html[data-theme][data-audience]`, `<main data-page-slug>`, y slots `[data-slot]` canónicos.
- **FR-211**: Los slots `hero`, `proof`, `oferta`, `escape_routes`, `closing` MUST resolver su contenido declarativamente via `data-i18n` keys que incluyen el audience como componente (`{pageSlug}.{slot}.{audience}.{field}`).
- **FR-212**: El content service MUST implementar la cascada de fallback §2.3 con zero keys crudas en el DOM final.
- **FR-213**: Ningún slot MUST depender de theme. Theme afecta exclusivamente tokens CSS.
- **FR-214**: Los listados (`/programas/`, `/recursos/`, `/casos/`) MUST aplicar `data-audience-filter` como filtro cliente sobre los documentos Firestore cacheados, sin refetch.
- **FR-215**: El comportamiento de los slots en las 13 páginas MUST ser probado por un único test E2E parametrizado que recorre cada page con cada combinación (2 locale × 2 audience = 4 matrices × 13 pages = 52 validaciones), verificando ausencia de keys crudas.

**Audience state — estado global**

- **FR-220**: El estado `mdg_audience` MUST resolverse al boot siguiendo la cascada de §3.1.
- **FR-221**: El cambio de audience MUST emitir evento `mdg:state-changed` que componentes y scripts de página escuchan para re-render parcial.
- **FR-222**: El diagnóstico, al completarse, MUST inferir audience desde `q_segmento` y actualizar `mdg_audience` consecuentemente (FR-013 + §3.1.4).
- **FR-223**: Los eventos Analytics (FR-070..FR-072) MUST incluir un campo `audience` (`persona|empresa|unknown`) en el envelope global, independiente del segmento capturado en `leads/{uid}`.
- **FR-224**: El cambio de audience MUST generar un evento `audience_switched` con `{from, to, page_slug, trigger: "click"|"url-param"|"inference"}`.

**Accesibilidad de los toggles**

- **FR-230**: Los 3 toggles MUST ser navegables completamente por teclado: `Tab` entre grupos, `Arrow Left/Right` entre opciones del grupo, `Space`/`Enter` para activar.
- **FR-231**: Cada toggle MUST anunciar su estado via screen reader al cambiar (`aria-live="polite"` en un sr-only `<span>` hermano).
- **FR-232**: El contraste del toggle activo MUST ser ≥3:1 vs el inactivo en ambos themes (WCAG 2.1 AA UI components).

---

## 5. Impact on existing artifacts

### 5.1 spec.md

**Merge these into §4.1** (add FR-200..FR-232 after FR-099). The existing FR-042 / FR-045 (theme persistence) and FR-060 (i18n) remain; FR-200..FR-232 supersede them where there is overlap by elevating the 3 toggles to a unified control contract.

**Update §4.3 Key Entities** — add:

- **AudienceState**: `{value: "persona"|"empresa"|"unknown", provenance: "url"|"localStorage"|"landing"|"diagnostic"|"utm"|"default", updatedAt: Timestamp, locked: boolean}` — client-only, never Firestore-written except as a field projected into `leads/{uid}.segmento` after diagnostic completion.
- **ContentSlot**: `{slot, pageSlug, variants: {[audience]: {[locale]: {headline, subheadline, cta_label, cta_href, ...}}}}` — lives in `js/i18n/dictionaries/{pageSlug}.json` bundled, migration to Firestore `slots/{pageSlug}` is feature 010.

**Add §13 Adaptive Blueprint** — single paragraph pointing to this file as the authoritative spec extension.

### 5.2 data-model.md

Add:

- `AudienceState` entity with the fields above, explicitly marked **client-only, not persisted to Firestore**.
- `ContentSlot` entity with variants matrix and the fallback cascade rules.
- Note on Firestore: feature 009 keeps content slots in bundled JSON; feature 010 migrates to `slots/{pageSlug}` collection.

### 5.3 sitemap.md

Add **§12 Cross-cutting toggles** subsection to the IA spec acknowledging that all 13 pages carry the same 3-toggle header and the blueprint rules from this file. Reaffirm that `/empresas/` and `/personas/` remain distinct pages (Q1 decision) but now with an explicit toggle affordance to cross to the other (FR-206).

### 5.4 plan.md

Add to the Project Structure tree:

```text
js/
├── audience/
│   ├── state.js                    + puro: resolve(), get(), set(), subscribe()
│   └── controller.js               + glue DOM: escucha mdg:state-changed, re-renderiza slots
├── i18n/
│   └── resolver.js                 + implementa cascada §2.3 con audience component
└── state/
    └── bus.js                      + event bus mdg:state-changed (publisher/subscriber minimal)

components/
└── SiteHeader.js                   ~ ahora también incluye los 3 toggles + collapse xs/sm

tests/
└── e2e/
    └── adaptive-blueprint.spec.js  + Playwright parametrizado: 52 validaciones (FR-215)
```

**Net additions**: 4 new files (`state.js`, `controller.js`, `resolver.js`, `bus.js` + 1 E2E). No deletions. Total archivos nuevos netos del plan v2: ~10 → **~14**. El delta (+4) es aceptable porque los módulos son puros y el E2E es parametrizado (1 archivo, 52 assertions).

### 5.5 contracts/analytics-events.md

Add `audience` field to the BaseEventEnvelope and add the `audience_switched` event to the catalog.

---

## 6. Test plan (to consolidate into existing test tree)

| Level | File | What it covers |
|---|---|---|
| Unit | `tests/unit/audience-state.spec.js` | Cascada §3.1 (6 cases), persistence, subscribe/unsubscribe, lock behavior |
| Unit | `tests/unit/i18n-resolver.spec.js` | Cascada §2.3 (5 fallback levels), missing-key guard |
| Unit | `tests/unit/analytics-events.spec.js` | ~ añadir audience field en envelope + audience_switched event |
| E2E | `tests/e2e/adaptive-blueprint.spec.js` | FR-215 matriz 52 (13 pages × 4 combos) — ausencia de keys crudas, integridad de contenido, transición <100ms |
| E2E | `tests/e2e/home.spec.js` | ~ añadir toggle interactions en home |
| A11y | `tests/e2e/home.spec.js` | ~ añadir FR-230..FR-232 checks (axe + keyboard) |

---

## 7. Risks and mitigations

| Riesgo | Impacto | Mitigación |
|---|---|---|
| FOUC cuando `mdg_audience` se lee después del primer paint | Visual flash | Inline `<script>` en `<head>` que lee localStorage y setea `html[data-audience]` antes de CSS (como ya se hace con theme) |
| Combinatoria de copy (4 variantes × 13 pages × N slots) | Mantenimiento | Cascada de fallback §2.3 permite empezar con `unknown` como default + 1 variante específica por audience cuando vale la pena, reduciendo la combinatoria efectiva a ~20% |
| Dev divergence: alguien escribe copy sin audience key | Keys crudas en prod | Test E2E parametrizado (FR-215) + pre-commit grep `data-i18n="[^"]*\.{headline,cta_label}"` que falla si falta el audience segment |
| SEO: Google indexa una combinación ambigua | Canonical confusion | `canonical` siempre apunta al path sin query params; `audiencia` es state del cliente, nunca en canonical |
| Accesibilidad: screen readers no entienden qué cambió | Confusión AT | FR-231 `aria-live="polite"` sr-only con mensaje "Vista cambiada a empresas" / "Switched to business view" |
| Performance: re-render de 52 validaciones en cada toggle | Lag | El re-render es parcial (solo slots con `data-slot`); cascada de fallback es O(1) por key; benchmark target <100ms E2E-enforced |

---

## 8. Out of scope

- Audience beyond `persona|empresa|unknown` — p.ej. sub-segmentos por industria quedan para feature 011+.
- Theme beyond light/dark — high-contrast mode es feature a11y futura.
- Locale beyond es/en — portugués y francés quedan para features de expansión regional.
- Persistence del audience en server (cookie HTTP) más allá de la cascada §3.1 — cookie `mdg_audience` existe pero no dispara redirect server-side en v1; eso se puede activar en iteración futura.
- A/B testing de variantes de audience copy — los experimentos A/B están out of scope de 009 (viven en feature 010 via `experiments/{id}`).
