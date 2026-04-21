# Robustness Pass v1 — 009

**Purpose**: Endurecer el spec a través de (A) segunda ronda de debate socrático centrada en calidad, (B) estrategia TDD+ATDD explícita, (C) esquemas de unit tests, (D) contrato de cobertura 85%+, (E) flujos de prueba black-box independientes aportados por el asistente, (F) backcasting inverso de requirements hacia user stories y Constitution, y (G) gaps + acciones concretas.
**Parent**: spec.md v6 + adaptive-blueprint.md + sitemap.md + plan.md v2 + backcasting.md
**Status**: Draft — integración a spec.md en clarificaciones v7

---

## §A · Socratic Debate Round 2 — testing, robustness, edge cases

Round 1 (sitemap §5) atacó IA. Round 2 ataca **prueba + cobertura + robustez del blueprint**. Cada Q es un ataque a una decisión; la respuesta es la decisión tomada.

### Q1. ¿85% cobertura global es un target útil o ceremonia burocrática?

**Tensión**: coverage metrics engañan — se puede llegar a 85% con tests triviales que no detectan bugs reales.
**Contra-argumento**: coverage es necesario pero no suficiente. Solo funciona si:
1. Los tests mapean a spec IDs (FR/SC) explícitamente en su header.
2. Los módulos puros se evalúan con **mutation testing** (ej. Stryker) para detectar tests que no maten mutantes.
3. La cobertura se mide por **capa**, no solo global.

**Decisión**: 85% global **weighted**, pero con breakdown por capa (ver §D). Mutation testing opcional en Fase 1 post-merge (no blocker de 009).

### Q2. TDD y ATDD, ¿son lo mismo, complementarios o excluyentes?

**Tensión**: mucha confusión en la industria. TDD es test-first *por unidad*; ATDD es test-first *por criterio de aceptación*. Son niveles distintos.
**Resolución**: Complementarios. Patrón obligatorio en 009:

```
1. ATDD: escribir .feature scenario Given/When/Then desde US/FR (rojo)
2. Intentar hacer pasar el scenario → descubrir qué módulos necesita
3. TDD: para cada módulo nuevo, unit test rojo → código mínimo → verde → refactor
4. Volver al scenario ATDD → debería ser verde ahora
5. Si sigue rojo, falta un módulo; repetir desde 3
```

**Decisión**: ATDD como **outer loop**, TDD como **inner loop**. Constitution IX se refina para expresar esto explícitamente.

### Q3. ¿Mocks vs Firebase Emulator para integration tests?

**Tensión**: mocks son rápidos pero drift respecto al comportamiento real; emulador es truth pero lento.
**Decisión**:
- **Security rules**: solo emulador (truth sobre reglas declarativas).
- **Auth flows**: solo emulador (signInAnonymously debe ser real).
- **Network failure scenarios**: solo mocks (no se puede "romper el emulador" de forma controlada).
- **SWR/cache-manager**: mock de Firestore response para determinismo.
- **Analytics emission**: mock del SDK (no queremos eventos reales en CI).

**Hybrid gate**: `tests/integration/security-rules.spec.js` exclusivamente emulador; `tests/integration/network-failures.spec.js` exclusivamente mocks.

### Q4. ¿Qué herramienta de coverage para Vanilla JS ES2022?

**Tensión**: sin bundler, sin Jest, sin Babel.
**Decisión**: Vitest tiene `@vitest/coverage-v8` (c8 nativo de Node 20). Config:

```js
// vitest.config.js
export default {
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary', 'lcov'],
      reportsDirectory: './coverage',
      include: ['js/**/*.js', 'components/**/*.js'],
      exclude: [
        'js/cms/firebase-config.js',      // config estático
        'js/icons.js',                    // lookup table
        'js/i18n/dictionaries/**',        // datos
        'dist/**',
        'tests/**'
      ],
      thresholds: {
        lines: 85, functions: 85, branches: 80, statements: 85,
        perFile: false,
        'js/diagnostic/logic.js':   { lines: 100, functions: 100, branches: 100 },
        'js/audience/state.js':     { lines: 95, functions: 100, branches: 90 },
        'js/i18n/resolver.js':      { lines: 95, functions: 100, branches: 90 },
        'js/analytics/events.js':   { lines: 90, functions: 100, branches: 85 },
        'js/state/bus.js':          { lines: 100, functions: 100, branches: 100 }
      }
    }
  }
}
```

### Q5. La matriz 52 de `adaptive-blueprint.spec.js` — ¿escala o se vuelve lenta?

**Tensión**: 52 assertions × ~3s cada una = ~2.5 min. CI feedback lento degrada disciplina.
**Decisión**:
- Parallelizar por Playwright workers (`workers: 4`).
- Sharding por `(locale, audience)` en 4 buckets paralelos.
- Target: matriz completa <90s wall time.
- Cada assertion es `page.goto` + 3 expectativas; no screenshots.

### Q6. ¿Visual regression con screenshots baseline?

**Tensión**: screenshots captan drift visual pero son brittle (1px de diferencia rompe CI).
**Decisión**: **NO** baseline de screenshots. En su lugar:
- **Computed style assertions**: `expect(getComputedStyle(el).getPropertyValue('--navy')).toBe('#122562')`.
- **Layout assertions**: `expect(el.getBoundingClientRect().width).toBeGreaterThan(X)`.
- **Screenshots solo en failure** para debug post-mortem (Playwright trace).

### Q7. ¿axe-core es suficiente para WCAG 2.1 AA?

**Tensión**: axe catches ~57% de issues WCAG automáticamente (benchmark Deque). Keyboard nav y screen-reader experience no son auditables por axe solo.
**Decisión**: pirámide a11y de 3 capas:
1. **axe-core** (automático) — todos los viewports en `home.spec.js`.
2. **Keyboard tests manuales automatizados** — `tests/e2e/a11y-keyboard.spec.js` que simula Tab/Arrow/Space/Enter en los toggles y diagnostic stepper.
3. **ARIA snapshot tests** — assertions explícitas sobre `aria-label`, `aria-live`, `role`, `aria-pressed`, `aria-expanded`.

### Q8. ¿Cómo prevenimos "test theater" (alta cobertura, baja señal)?

**Tensión**: un equipo puede añadir `expect(true).toBe(true)` para subir coverage.
**Decisión**:
- **Traceability header obligatorio**: cada test file comienza con un bloque:
  ```js
  /**
   * @covers FR-010, FR-011, FR-012, FR-013, §4.5
   * @story US-1
   * @success SC-002, SC-003, SC-004
   */
  ```
- **Pre-commit grep** verifica que todo `.spec.js` nuevo tenga este header.
- **Mutation testing opcional** (post-merge) sobre `js/diagnostic/logic.js`, `js/audience/state.js`, `js/i18n/resolver.js` con threshold ≥70% mutation score.

### Q9. ¿Toda FR tiene un US que la justifica? ¿Todo US un SC que lo mide?

**Tensión**: los FR-200..FR-232 fueron añadidos en v6 sin generar US nuevas. Hay riesgo de orphan requirements.
**Decisión**: ejecutar §F (backcasting inverso) en este mismo doc. Si hay orphans:
- FR sin US → o (a) crear US-6 / US-7 / US-8 para cubrir, o (b) cut FR como inventario injustificado.
- US sin SC → añadir SC medible o deprecar la US.
- SC sin principio constitucional → revisitar si el SC aporta o es vanity metric.

### Q10. ¿La estrategia de test cubre flujos reales multi-sesión, red flaky, carga?

**Tensión**: los tests son greenfield/happy path. La realidad es que usuarios vuelven días después, con red inestable, en devices lentos.
**Decisión**: añadir **§E flujos independientes** como battery de escenarios black-box que NO vienen de FRs — son pruebas desde la perspectiva del asistente como QA externo. Cada flujo se traduce en 1+ test E2E.

---

## §B · TDD + ATDD Strategy (mandatory for 009)

### Ciclo canónico (outer loop ATDD, inner loop TDD)

```
┌────────────────────────────────────────────────────────────┐
│  OUTER LOOP (ATDD) — per User Story                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 1. Pick US-N from spec.md                           │   │
│  │ 2. Translate acceptance scenarios → .feature file   │   │
│  │    Given/When/Then in Cucumber/Gherkin syntax       │   │
│  │ 3. Run ATDD suite → RED (no step defs yet)          │   │
│  │ 4. Write step definitions as thinnest glue          │   │
│  │ 5. Run → scenario calls into missing modules → RED  │   │
│  │ 6. ENTER INNER LOOP ↓                               │   │
│  │ ┌───────────────────────────────────────────────┐   │   │
│  │ │  INNER LOOP (TDD) — per module                │   │   │
│  │ │  a. Write failing unit test (RED)             │   │   │
│  │ │  b. Minimum code to pass (GREEN)              │   │   │
│  │ │  c. Refactor (STILL GREEN)                    │   │   │
│  │ │  d. Coverage check for this module ≥ target   │   │   │
│  │ │  e. Next assertion or next module             │   │   │
│  │ └───────────────────────────────────────────────┘   │   │
│  │ 7. Re-run ATDD scenario → GREEN                     │   │
│  │ 8. Commit: "tdd(US-N): <module>"                    │   │
│  │ 9. Next scenario or next US                         │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

### .feature file structure (ATDD — one per US)

```gherkin
# tests/features/us-1-diagnostico.feature
# @covers US-1 FR-010 FR-011 FR-012 FR-013 FR-014 FR-016 FR-017 §4.5
# @success SC-002 SC-003 SC-004

Feature: Diagnóstico gratuito como CTA primario
  Como visitante nuevo
  Quiero completar un diagnóstico corto y recibir una recomendación personalizada
  Para entender qué nivel tengo y qué camino seguir

  Background:
    Given Firebase emulator is running with seeded programs and testimonials
    And the home page is loaded at "http://localhost:3000/"
    And the viewport is "sm" (390x844)

  Scenario: New visitor completes diagnostic end-to-end
    Given I am a first-time visitor with locale "es" and audience "unknown"
    When I click the primary CTA "Iniciar diagnóstico gratuito"
    Then I arrive at "/diagnostico/" within 500ms
    And I see step 1 of 6 with question "¿Qué representas hoy?"

    When I select option "directivo" and click "Siguiente"
    Then step 2 is visible with progress "2/6"
    And localStorage.mdg_diagnostic has the partial answer

    When I answer steps 2 through 5 with all high-weight options
    Then step 6 shows the PII form with fields email, name, consent checkbox

    When I enter "qa@metodologia.info", "QA Tester", and check consent
    And I submit
    Then a document exists in Firestore at diagnostics/{current-uid}
    And the document has resultado.nivel_id "strategist"
    And a document exists at leads/{current-uid} with email and segmento "directivo"
    And the result screen shows the "strategist" recommendation in Spanish
    And the analytics event "diagnostic_completed" fired with nivel_id and score
    And cookie "mdg_returning" is set

  Scenario: Resume after abandonment within 24h
    Given I started a diagnostic 2 hours ago and answered steps 1 and 2
    When I return to the home
    Then the hero banner reads "Tienes un diagnóstico sin terminar — continuar"
    When I click "Continuar"
    Then I land on step 3 with previous answers preserved

  Scenario: Firestore unavailable falls back to mailto
    Given Firestore writes are stubbed to fail
    When I complete all 6 diagnostic steps and submit
    Then I see a fallback message "Servicio temporal fuera — contáctanos"
    And a mailto link is rendered with prefilled subject "Diagnóstico completado"
    And no analytics event "diagnostic_completed" is emitted
```

**Una `.feature` por User Story**. US-1..US-5 generan 5 archivos. Las nuevas FR-200..FR-232 requieren 1 o más User Stories adicionales (ver §F gap).

### Step definitions location

```
tests/features/
├── us-1-diagnostico.feature
├── us-2-recursos.feature
├── us-3-programas.feature
├── us-4-identidad.feature
├── us-5-responsive.feature
├── us-6-adaptive-blueprint.feature    (NEW — covers FR-200..FR-232)
├── us-7-sitemap-ia.feature             (NEW — covers sitemap §2 IA)
└── step_definitions/
    ├── common.steps.js
    ├── diagnostic.steps.js
    ├── i18n.steps.js
    ├── audience.steps.js
    ├── theme.steps.js
    ├── offline.steps.js
    └── analytics.steps.js
```

**BDD runner**: `@cucumber/cucumber` v11 + Playwright fixture. Zero additional deps beyond what tests/ already needs.

---

## §C · Unit test schemas (templates per module)

### Schema template (used by every unit test file)

```js
// tests/unit/<module>.spec.js
/**
 * @module js/<path>.js
 * @covers FR-XXX, FR-YYY, §Z
 * @story US-N
 * @success SC-MMM
 * @coverage-target {lines: 95, functions: 100, branches: 90}
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { subjectUnderTest } from '../../js/<path>.js';

describe('<moduleName>', () => {
  describe('happy path', () => {
    it.each([
      ['input-1', 'expected-1'],
      ['input-2', 'expected-2'],
    ])('maps %s → %s', (input, expected) => {
      expect(subjectUnderTest(input)).toBe(expected);
    });
  });

  describe('edge cases', () => {
    it('handles null', () => { … });
    it('handles empty string', () => { … });
    it('handles boundary values (min, max, max+1)', () => { … });
  });

  describe('error modes', () => {
    it('throws on invalid input with message "..."', () => { … });
    it('returns default on missing dependency', () => { … });
  });

  describe('contract invariants', () => {
    it('is pure (same input → same output)', () => { … });
    it('does not mutate input', () => { … });
    it('does not touch localStorage/fetch/DOM', () => { … });
  });
});
```

### Per-module schemas

#### C.1 `js/diagnostic/logic.js` — pure scoring

```js
/**
 * @module js/diagnostic/logic.js
 * @covers FR-011, FR-012, FR-013, §4.5
 * @story US-1
 * @success SC-002, SC-003, SC-004
 * @coverage-target {lines: 100, functions: 100, branches: 100}
 */
describe('diagnostic/logic', () => {
  // 1 test per threshold boundary (0,4,5,9,10,15)
  // 1 test per recommendation (explorer, builder, strategist)
  // 1 test per locale (es, en)
  // 1 test per invalid input (5 answers instead of 5 valid, missing weight)
  // 1 test asserting pure function contract
  // Total: ~24 assertions
});
```

#### C.2 `js/audience/state.js` — provenance cascade

```js
/**
 * @covers FR-220, FR-221, FR-222, adaptive-blueprint §3.1
 * @story US-6
 * @coverage-target {lines: 95, functions: 100, branches: 90}
 */
describe('audience/state', () => {
  // 6 tests for provenance cascade (url > localStorage > landing > diagnostic > utm > default)
  // 1 test per persistence (set, get, unchanged after reload)
  // 1 test per lock behavior
  // 1 test per subscribe/unsubscribe
  // 1 test for event emission mdg:state-changed
  // Total: ~11 assertions
});
```

#### C.3 `js/i18n/resolver.js` — fallback cascade

```js
/**
 * @covers FR-212, adaptive-blueprint §2.3
 * @coverage-target {lines: 95, functions: 100, branches: 90}
 */
describe('i18n/resolver', () => {
  // 5 tests — one per cascade level
  // 1 test — missing key returns common.missing, never raw key
  // 1 test — concurrent lookups do not race
  // 1 test — dictionary swap picks up new keys
  // Total: ~8 assertions
});
```

#### C.4 `js/analytics/events.js` — consent gating

```js
/**
 * @covers FR-070, FR-071, FR-072, FR-223, FR-224
 * @coverage-target {lines: 90, functions: 100, branches: 85}
 */
describe('analytics/events', () => {
  // 1 test — drops when consent absent
  // 1 test — drops when consent.analytics === false
  // 1 test — emits when consent.analytics === true with envelope
  // 1 test — envelope includes audience, locale, deviceClass, source
  // 1 test — never emits email, name, phone in payload
  // 1 test — diagnostic_completed only includes nivel_id, score
  // 1 test — audience_switched fires with {from, to, page_slug, trigger}
  // Total: ~7 assertions
});
```

#### C.5 `js/state/bus.js` — pub/sub event bus

```js
/**
 * @covers adaptive-blueprint §3.2
 * @coverage-target {lines: 100, functions: 100, branches: 100}
 */
describe('state/bus', () => {
  // subscribe → publish → handler called
  // unsubscribe → handler not called
  // multiple subscribers all called
  // handler throwing does not break other handlers
  // publish with no subscribers is no-op
});
```

---

## §D · Coverage contract — 85% weighted, layered

### Global targets (vitest.config.js enforced)

| Capa | Target lines | Target branches | Tool | Blocker en CI |
|---|---|---|---|---|
| **Pure modules** (`diagnostic/logic`, `state/bus`) | **100%** | **100%** | Vitest + v8 | ✅ fail → CI rojo |
| **Logic modules** (`audience/state`, `i18n/resolver`, `analytics/events`, `theme/toggle`) | **≥95%** | **≥90%** | Vitest + v8 | ✅ |
| **Controller modules** (`diagnostic/controller`, `audience/controller`) | **≥80%** | **≥75%** | Vitest + jsdom | ✅ |
| **Web Components** (`components/*.js`) | **≥70%** | **≥65%** | Vitest + jsdom (WC polyfill) | ⚠️ warning |
| **Page shells** (`*.html` behavior) | N/A | N/A | Playwright E2E | covered by BDD |
| **Firestore rules** | **100%** de colecciones | **100%** de ops | Firebase emulator | ✅ |
| **Global weighted** | **≥85%** | **≥80%** | Vitest rollup | ✅ |

### Mutation testing (optional post-merge)

- Tool: `@stryker-mutator/core` + `@stryker-mutator/vitest-runner`
- Scope: pure + logic modules only (6 files max)
- Threshold: **mutation score ≥70%** para cerrar Fase 1 de 009
- Non-blocker del merge inicial; ejecutado en CI weekly

### Exclusions from coverage (justified)

| File/Glob | Reason |
|---|---|
| `js/cms/firebase-config.js` | Config estática (claves públicas, no lógica) |
| `js/icons.js` | Lookup table (Lucide paths) |
| `js/i18n/dictionaries/**` | Datos, no código |
| `dist/**` | Output de Tailwind |
| `scripts/**` | Tooling de dev, cubiertos por smoke tests manuales en quickstart |

---

## §E · Independent test flows (black-box scenarios from the assistant)

Estos escenarios NO derivan de FRs individuales — son historias end-to-end que el asistente propone como QA externo para capturar comportamiento emergente. Cada uno se materializa en 1 E2E test adicional.

### Flow 1 — LinkedIn B2B ad landing (utm inference)

> Usuario viene de LinkedIn con `?utm_source=linkedin&utm_medium=cpc&utm_campaign=q2-leads&utm_content=empresas`.
> Llega al home. `mdg_audience` se infiere = `empresa` (FR-220 rule 5 UTM).
> Hero muestra copy empresa. Proof muestra logos corporativos. Oferta filtra programs `audiencia=empresa`.
> Completa diagnóstico con `q_segmento=directivo`. `mdg_audience` permanece `empresa` (diagnóstico confirma).
> Cierra el tab. 3 días después vuelve directo al home (`/`). Cookie `mdg_returning` + `localStorage.mdg_audience=empresa`. Hero CTA dice "Continuar tu ruta" (FR-081).

**Test file**: `tests/e2e/flow-linkedin-b2b.spec.js`

### Flow 2 — Mobile flaky network returning user

> Returning user con cookie `mdg_returning`, red 3G lenta, Firestore intermitente.
> Home renderiza desde IDB cache (SWR stale). Offline pill aparece <3s (FR-098).
> Click en diagnóstico. Paso 1-5 desde localStorage parcial. Paso 6 submit: Firestore rejects.
> Mailto fallback renderiza con subject y body prellenados. Ningún dato se pierde.

**Test file**: `tests/e2e/flow-mobile-flaky.spec.js`

### Flow 3 — Keyboard + screen reader power user

> Usuario 100% keyboard, NVDA/VoiceOver activo.
> `Tab`: skip-link → logo → nav (5 items) → 3 toggles (radiogroup) → CTA primario → hero body → proof → footer.
> `Arrow Left/Right` en el toggle de audience cambia el radio; `aria-live` anuncia "Cambiado a vista empresas".
> Entra al diagnóstico con `Enter`. Focus trap en el stepper modal-like. `Esc` sale del flujo y confirma.
> Nunca pierde foco. Orden lógico completo.

**Test file**: `tests/e2e/flow-keyboard-a11y.spec.js`

### Flow 4 — SEO crawler (Googlebot emulated)

> Playwright con `user-agent: Googlebot`, JavaScript disabled.
> Crawler pide `/`, `/metodo/`, `/empresas/`, `/programas/`, `/programas/?slug=design-thinking-b2b`.
> Cada HTML tiene: `<link rel="canonical">` al path sin query, `<meta description>`, `<h1>` único, 0 keys crudas en el body renderizado.
> `sitemap.xml` lista 12 URLs (excluye 404) con `lastmod`.
> `hreflang alternate` para es/en presentes.

**Test file**: `tests/e2e/flow-seo-crawler.spec.js`

### Flow 5 — LGPD compliance reviewer

> Auditor entra con devtools, rechaza banner de cookies.
> Verifica: **cero** eventos analytics en network tab (ni siquiera `home_view`).
> Completa diagnóstico: PII sí se escribe (gateada por checkbox explícito FR-012, independiente del banner).
> Va a `/legal/#privacidad`. Anchor scroll funciona. Encuentra sección de borrado de datos con email de contacto.
> No hay dark patterns: el banner tiene "Rechazar" igual de prominente que "Aceptar".

**Test file**: `tests/e2e/flow-lgpd-audit.spec.js`

### Flow 6 — Theme toggle stress (chaos)

> Usuario cambia light ↔ dark 20 veces rápido (200ms entre clicks).
> Sin flashes, sin FOUC, sin leak de tokens (light bg en dark mode o viceversa).
> `localStorage.mdg_theme` siempre consistente con `html[data-theme]`.
> Dark mode contrast sigue pasando axe cada vez.
> Los otros toggles (locale, audience) NO se afectan por el cambio de theme (ortogonalidad).

**Test file**: `tests/e2e/flow-theme-chaos.spec.js`

### Flow 7 — Developer onboarding path

> Nuevo dev clona repo. Sigue `quickstart.md`.
> `npm ci && npm test` pasa con coverage ≥85%.
> `npm run test:e2e` pasa matriz 52 en <90s.
> Cambia `js/i18n/dictionaries/home.es.json` removiendo la key `home.hero.empresa.headline`.
> `npm run test:e2e -- adaptive-blueprint` falla con mensaje claro: "Missing i18n key at slot hero for audience empresa locale es; cascade resolved to common.missing.hero but FR-215 requires explicit variant".
> Restaura la key. Todo verde.

**Test file**: manual smoke, no automatizado.

### Flow 8 — Content editor pre-backoffice

> Editor (sin feature 010) necesita actualizar un programa.
> Edita `scripts/seed.manifest.json` (extendido en `seed-firestore.js`).
> `node scripts/seed-firestore.js --dry-run` muestra diff.
> `node scripts/seed-firestore.js --apply` escribe.
> Home re-hidrata en <7 días (TTL SWR) o inmediato con hard reload.
> Fallback estático sigue listando los top-5 pre-renderizados aunque la seed falle.

**Test file**: `tests/integration/seed-roundtrip.spec.js`

### Flow 9 — Catastrophic cache poisoning

> IDB tiene data corrupta (JSON truncado, 2 weeks old).
> `cache-manager.js` detecta parse error, purga la entry, marca como miss.
> `content-service.js` fetch fresh, repopula, sigue sirviendo.
> Ningún duplicate render, ningún memory leak (heap snapshot antes/después < 5 MB diff).

**Test file**: `tests/unit/cache-manager-corruption.spec.js` (ya existe si `cache-manager.js` lo soporta — si no, gap en §G).

### Flow 10 — Programa detail social share

> Usuario comparte `https://metodologia.info/programas/?slug=design-thinking-b2b` en WhatsApp.
> WhatsApp previewer (bot) hace GET con `user-agent: WhatsApp/2.x`.
> Recibe HTML con `<meta property="og:title">`, `<meta property="og:image">`, `<meta property="og:description">` específicos del slug (pre-rendered).
> Usuario abre el link: lands directo en detail view, no en listing.
> Botón "Back" del browser vuelve a listing (history pushState).

**Test file**: `tests/e2e/flow-social-share.spec.js`

### Summary of independent flows

| Flow | Maps to FRs | New test file | Estimated duration |
|---|---|---|---|
| 1 — LinkedIn B2B | FR-081, FR-220, FR-222, FR-016 | `flow-linkedin-b2b.spec.js` | ~8s |
| 2 — Mobile flaky | FR-014, FR-015, FR-097, FR-098 | `flow-mobile-flaky.spec.js` | ~10s |
| 3 — Keyboard a11y | FR-062, FR-230, FR-231 | `flow-keyboard-a11y.spec.js` | ~12s |
| 4 — SEO crawler | FR-063, FR-210 | `flow-seo-crawler.spec.js` | ~6s |
| 5 — LGPD | FR-012, FR-072 | `flow-lgpd-audit.spec.js` | ~10s |
| 6 — Theme chaos | FR-042, FR-045 | `flow-theme-chaos.spec.js` | ~15s |
| 7 — Dev onboarding | (manual) | quickstart.md | N/A |
| 8 — Content editor | seed script | `seed-roundtrip.spec.js` | ~6s |
| 9 — Cache poisoning | FR-098 | `cache-manager-corruption.spec.js` | ~2s |
| 10 — Social share | FR-210, FR-211 | `flow-social-share.spec.js` | ~8s |

**Total new test files**: 8 E2E + 1 unit + 1 integration = **10**. **Total E2E wall time estimate**: ~75s for these flows + ~90s for matriz 52 = **~165s (~2:45)**. Dentro del budget.

---

## §F · Requirements backcasting (backwards trace)

**Regla**: cada **FR** MUST trazar a ≥1 **US**; cada **US** MUST trazar a ≥1 **SC**; cada **SC** MUST trazar a ≥1 **Constitution principle**. Si algo rompe la cadena, es un **orphan** y se corrige.

### F.1 FR → US traceability matrix (sample of critical FRs)

| FR | US justifying it | Gap? |
|---|---|---|
| FR-001..005 (home structure) | US-1, US-4 | ✅ |
| FR-010..017 (diagnóstico) | US-1 | ✅ |
| FR-020..022 (recursos) | US-2 | ✅ |
| FR-030..032 (programas) | US-3 | ✅ |
| FR-040..046 (design system, incl. FR-046 voice) | US-4 | ✅ |
| FR-050..057 (responsive) | US-5 | ✅ |
| FR-060..065 (i18n + a11y) | US-1, US-2, US-3, US-5 | ✅ |
| FR-070..072 (analytics) | US-1, US-2, US-3 (indirect via SC) | ⚠️ weak — no US explicit for "lead tracking" |
| FR-080..081 (personalization) | US-1 | ✅ |
| FR-090..096 (performance) | US-5 | ✅ |
| FR-097..099b (offline UX, toggle coexistence) | (none explicit) | ❌ **GAP** |
| FR-200..206 (toggles) | (none explicit) | ❌ **GAP** |
| FR-210..215 (blueprint slots + matrix test) | (none explicit) | ❌ **GAP** |
| FR-220..224 (audience state) | (none explicit) | ❌ **GAP** |
| FR-230..232 (toggle a11y) | US-5 (parcial) | ⚠️ |

**4 gaps detectados**. Corrección: añadir 2 User Stories nuevas (§F.4).

### F.2 US → SC traceability

| US | SCs covered | Gap? |
|---|---|---|
| US-1 | SC-001, SC-002, SC-003, SC-004 | ✅ |
| US-2 | SC-001 (parcial, CTR total) | ⚠️ recurso sin SC específico |
| US-3 | SC-001 | ⚠️ programa sin SC específico (pipeline) |
| US-4 | SC-006 | ✅ |
| US-5 | SC-005, SC-007 | ✅ |
| (US-6 nueva) | (needs new SC) | ❌ SC-013..015 TBD |
| (US-7 nueva) | (needs new SC) | ❌ SC-016 TBD |

### F.3 SC → Constitution

| SC | Constitution principle | Ok? |
|---|---|---|
| SC-001 CTR total 40% | XI (brand voice → conversión) + VIII (UX) | ✅ |
| SC-002 CTR diagnóstico 15% | IX (TDD validates funnel) + I (BaaS → persist) | ✅ |
| SC-003 Completion 60% | IX, XIV | ✅ |
| SC-004 Tiempo mediano 3 min | XIV simple first | ✅ |
| SC-005 LCP 2.5s | II accessibility + XIV | ✅ |
| SC-006 Visual consistency 95% | X design system | ✅ |
| SC-007 Lighthouse 90 | II + III (SEO) | ✅ |
| SC-008 Usabilidad 90% | II + XIV | ✅ |

### F.4 Gap fixes — new User Stories

#### US-6 — Blueprint adaptativo de 3 ejes (Priority: P1)

Un visitante llega al sitio en cualquier página de las 13 y ve una experiencia coherente con 3 toggles (locale ES/EN, theme light/dark, audience persona/empresa) en el header. Un click en cualquiera cambia el shell completo en <100ms sin recargar, sin flicker, sin pérdida de contexto. Visitantes que llegan con `?audiencia=X` ven esa audiencia pre-seleccionada antes del primer paint. El contenido de cada slot se adapta a la combinación activa usando cascada de fallback; nunca aparece una key cruda en el DOM.

**Why P1**: Sin el blueprint homologado, el sitio es inconsistente, el audience switching no existe, y cada página requiere implementación a medida.

**Independent test**: Recorriendo las 13 páginas × 4 combinaciones (locale × audience), ninguna presenta keys crudas, layout roto, o transición >100ms.

**Acceptance scenarios**:
1. Given visitor on `/programas/` with `mdg_audience=persona`, When clicks audience toggle to `empresa`, Then the hero copy, proof, and filtered programs update in <100ms and `localStorage.mdg_audience='empresa'`.
2. Given visitor on any of the 13 pages, When inspects header, Then 3 toggles are present (or collapsed into "⚙ Preferencias" button on xs/sm).
3. Given URL `/metodo/?audiencia=empresa`, When page loads, Then `html[data-audience]='empresa'` is set **before** first paint (no flicker).
4. Given keyboard navigation, When user tabs to the audience toggle and presses Arrow Right, Then the other option activates and `aria-live` announces the change.
5. Given missing i18n key `home.hero.empresa.en`, When resolver runs cascade, Then it falls back to `home.hero.unknown.en` and never shows the raw key.

**Covers**: FR-200..FR-232 + FR-099b.
**SC mapping**: SC-013 (nueva), SC-014 (nueva), SC-015 (nueva) — ver §F.5.

#### US-7 — Sitemap de 13 páginas con blueprint compliance (Priority: P1)

Un visitante, un crawler o un auditor puede recorrer el sitio completo y encontrar exactamente 13 páginas (incluyendo 404), cada una siguiendo el shell homologado, sin orphans y sin dead-ends. Los redirects legacy (`/vision.html`, `/servicios/`, `/ruta/`, `/sitemap.html`) resuelven a sus destinos canónicos con 301. El `sitemap.xml` refleja 12 URLs públicas.

**Why P1**: El constraint de 13 páginas es arquitectónico. Sin test automatizado, el drift es certero.

**Independent test**: Un crawler que visita `/` y sigue enlaces NO debe encontrar más de 12 URLs únicas (excluyendo 404 y detail slugs dinámicos); un request a `/vision.html` devuelve 301 a `/metodo/`.

**Acceptance scenarios**:
1. Given `sitemap.xml`, When parsed, Then contiene exactamente 12 `<url>` entries.
2. Given GET `/vision.html`, Then response is 301 with Location `/metodo/`.
3. Given GET `/nonexistent`, Then response is 404 and body includes `404.html` shell.
4. Given nav primario rendered, When inspected, Then contiene exactamente 5 items + 1 CTA + 3 toggles.

**Covers**: sitemap.md §2 (IA) + .htaccess redirects + FR-063.
**SC mapping**: SC-016 (nueva).

### F.5 Gap fixes — new Success Criteria

- **SC-013**: Tiempo de transición de cualquier toggle (locale, theme, audience) MUST ser <100ms medido de `click` a `DOMContentLoaded` del re-render (E2E Playwright).
- **SC-014**: Cobertura del test parametrizado FR-215 MUST ser 52/52 combinaciones pasando (13 pages × 2 locale × 2 audience).
- **SC-015**: Cero `data-i18n` keys crudas en el DOM de producción en ninguna combinación.
- **SC-016**: Número de páginas únicas en el sitio = exactamente 13 (inventariado por sitemap.xml + 404.html). Enforcement: script `scripts/count-pages.js` en pre-commit.
- **SC-017** *(backcasting gap FR-070..072)*: Cada lead registrado desde los 3 CTAs (diagnóstico, recurso premium, contacto) tiene fuente trazable en `leads/{uid}.fuente` y queda mapeable al funnel analytics.

### F.6 Orphan inventory — resolved

| Tipo | Antes | Después |
|---|---|---|
| FR sin US | 15 (FR-097..099b, 200..232) | 0 ✅ (US-6, US-7 cubren) |
| US sin SC | 0 | 0 ✅ |
| SC sin Constitution | 0 | 0 ✅ |

**Loop cerrado**.

---

## §G · Gaps surfaced + actions

Esta sección consolida TODO lo que este robustness pass exige implementar/documentar, en orden de prioridad.

### Must-do (blocker for /iikit-04-testify)

1. **spec.md clarifications v7**: registrar esta sesión y apuntar a este archivo.
2. **spec.md §4.2 NFRs**: añadir NFR-007..NFR-012 (coverage, TDD, ATDD, mutation, traceability, mocks policy).
3. **spec.md User Stories**: añadir US-6 y US-7 con scenarios completos.
4. **spec.md §5 Success Criteria**: añadir SC-013..SC-017.
5. **plan.md**: añadir `vitest.config.js` + `tests/features/` + config BDD runner + coverage thresholds.
6. **Estas acciones se ejecutan en el siguiente commit de este mismo turno**.

### Should-do (pre-implementation)

7. Pre-commit hook que enforce traceability header en cada `.spec.js`.
8. Pre-commit grep que detecte `data-i18n` keys sin audience segment en slots adaptativos.
9. `scripts/count-pages.js` que enforce SC-016 (13 páginas).
10. Mutation testing config (opt-in) sobre pure modules.

### Nice-to-have (post-merge)

11. Stryker run weekly con reporte histórico.
12. Coverage trend dashboard.
13. Flaky test detector (Playwright retries + report).

---

## §H · Meta — why this robustness pass exists

El spec original (v1..v5) era denso pero orientado a arquitectura. El v6 amplió scope a blueprint. Este v7 endurece el **contrato de calidad**: sin TDD/ATDD explícitos, sin coverage numérico, sin flows black-box, el spec podía pasar fase de plan pero fallar en implementación. El robustness pass es la "última oportunidad" de encontrar gaps antes de que el código los cristalice.

Este doc queda como **template** para futuros robustness passes en features 010+. Cualquier feature que introduzca módulos puros o blueprints adaptativos debe ejecutar el mismo ciclo §A–§G.
