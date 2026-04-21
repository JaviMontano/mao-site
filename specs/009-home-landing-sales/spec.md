# Feature Specification: Home como Landing Vendedora (3 CTAs Primarios)

**Feature Branch**: `009-home-landing-sales`
**Created**: 2026-04-14
**Revised**: 2026-04-14 (v7 — re-specify consolidation: robustness pass + backcasting + Constitution v7.0.0 alignment)
**Status**: Consolidated v7 (Ready for /iikit-04-testify)
**Input (v1)**: "Requiero crear una versión nueva de mi sitio web, pero mucho más vendedora. El home es una landing que invita a (1) iniciar un diagnóstico gratuito, (2) usar un recurso, o (3) conocer nuestra oferta educativa. El branding esperado está demostrado en las cartillas/playbooks Neo-Swiss del workspace."
**Input (v2 amendment)**: Full responsive (mobile/tablet/desktop native), stack desplegable en Hostinger (HTML/CSS/JS), debate socrático para afinar intención, mejorar requerimiento y trazar mejor especificación, revisando `workspace/2026-04-10-site-reconstruction/inputs`.

---

## 1. Debate Socrático — Intención y Restricciones

### 1.1 Intención Real del Usuario (cuestionamiento)

**Pregunta**: ¿El objetivo es "tres rutas iguales de conversión" o "una sola intención de venta con dos escape routes para reducir abandono"?

**Tensión**: Tres CTAs con igual jerarquía diluyen la decisión y bajan conversión (ley de Hick). Pero el visitante que no está listo para diagnóstico rebota si solo ve una opción.

**Resolución**: Es una **pirámide de intención**, no tres rutas iguales.

- **CTA Primario (P1)** — Diagnóstico gratuito: peso visual dominante, arriba del fold, color oro, tamaño XL.
- **CTA Secundario (P2)** — Recurso gratuito: peso medio, outline, disponible junto al primario pero visualmente subordinado.
- **CTA Terciario (P3)** — Oferta educativa: link con chevron en nav + card en sección dedicada, sin competir con el hero.

**Por qué**: El diagnóstico es el único CTA que produce un **lead con contexto** (segmento + madurez + intent). Los otros dos capturan audiencias tempranas que aún no están listas para compartir datos. Degradar P2/P3 a "escape routes con peso visual decreciente" multiplica la conversión del P1 sin sacrificar los tempranos.

---

### 1.2 Identidad Visual — Presente vs Futuro

**Pregunta**: El home actual usa estética dark startup (navy #0B2545 + oro + glass), y el usuario dice "refleja la identidad pero no el futuro". Las cartillas premium (`cartilla-onboarding-programa-v11.html`, `playbook-deep-research-ia-v1.html`) usan Neo-Swiss Light (#F9FAFB base, navy #122562 ink, oro #FFD700 accent). ¿Cuál es "el futuro"?

**Resolución**: **Neo-Swiss Light es el futuro. Dark Mode es el mirror opcional.**

Evidencia en inputs:
- `--bg: #F9FAFB` (light default), `--bg: #0B2545` (dark mirror)
- Mismo sistema tipográfico en ambos: Poppins head / Montserrat body / Trebuchet MS notes
- Misma paleta: navy, gold, blue, white, lavender implícito
- Mismos radios: 6/12/20/32 px
- Mismas shadows: glow suave en light, glow denso en dark

**Implicación**: El home v2 debe:
1. Partir de **light por defecto** (respetando `prefers-color-scheme: light`)
2. Ofrecer **toggle a dark** persistente en `localStorage`
3. Mirror exacto del sistema de las cartillas — sin introducir tokens nuevos
4. Dark mode es el mirror, no el default

---

### 1.3 Restricciones de Stack — Hostinger Static

**Pregunta**: ¿Qué tecnologías son viables en Hostinger con deployment vía git pull?

**Realidad técnica** (verificada contra el repo):
- **Viable**: HTML estático, CSS (custom props + Tailwind build), Vanilla JS, Web Components, Firebase client SDK (ya integrado en `js/cms/`), Firestore, Firebase Auth, Firebase Analytics, localStorage, Service Worker/PWA.
- **No viable sin server**: Node runtime, Express, SSR, endpoints personalizados, secrets management server-side.
- **Ya integrado en el repo**: Firebase client SDK, i18n module (`js/i18n/`), Web Components (`components/SiteHeader.js`, `components/SiteFooter.js`), Tailwind build (`dist/output.css`), CMS service modules.

**Resolución**: **Stack v2 = HTML + CSS (custom props + Tailwind prebuilt) + Vanilla JS + Web Components + Firebase client SDK**. Cero dependencias nuevas. Todo el backend corre en Firestore desde el cliente, gobernado por security rules.

---

### 1.4 Responsive — Native en Todos los Dispositivos

**Pregunta**: ¿Qué significa "full responsive, mobile native, desktop native, tablet ready"?

**Interpretación**: No es "responsive CSS adaptativo"; es **diseño específico por viewport class con transiciones fluidas**.

**Resolución — Viewport classes + breakpoints**:

| Class | Range | Target devices | Layout |
|---|---|---|---|
| `xs` | 360–389 px | iPhone SE, pequeños Android | 1-col hero, CTA stack vertical, nav drawer |
| `sm` | 390–767 px | iPhone 12–15, Pixel | 1-col hero, CTAs side-by-side condensed |
| `md` | 768–1023 px | iPad portrait, tablet | 1-col hero ancho, CTAs horizontales, rail lateral |
| `lg` | 1024–1279 px | iPad landscape, laptop pequeño | 2-col hero, CTAs horizontales, prueba social lateral |
| `xl` | 1280–1535 px | Desktop estándar | 2-col hero optimizado, max-w 1280 |
| `2xl` | ≥1536 px | Desktop wide, 4K | 2-col hero centrado max-w 1440, resto centrado |

**Reglas duras**:
- **Mobile-first CSS**: base styles son xs, el resto es `min-width`.
- **Sin scroll horizontal** en ningún viewport.
- **Touch targets** ≥44×44 px en xs/sm/md (WCAG 2.1 AAA en mobile).
- **Typography scale** con `clamp()` fluido entre breakpoints, no saltos.
- **Hero alcanza el CTA primario sin scroll** en xs (360×640), sm, md, lg, xl, 2xl.
- **Safe-areas iOS** respetadas vía `env(safe-area-inset-*)`.
- **Orientación landscape en mobile**: hero colapsa a layout compacto con CTA primario visible.

---

### 1.5 Diagnóstico — Datos Mínimos y Persistencia

**Pregunta**: ¿Qué datos pide y dónde viven?

**Resolución**:

**Datos mínimos para completar diagnóstico** (punto de conversión a lead):
- Email (obligatorio, validado formato)
- Nombre (obligatorio, 2–80 chars)
- Segmento inferido (persona/empresa) — derivado de las respuestas, no pedido al usuario
- Idioma activo (auto-detectado, ES/EN)
- Consentimiento LGPD/GDPR-light (checkbox con texto corto + link a política)

**Datos opcionales** (presentados como "agregar contexto"):
- Empresa (si segmento=empresa)
- Rol
- Tamaño de equipo

**Persistencia**:

| Estado | Storage | TTL | Por qué |
|---|---|---|---|
| Diagnóstico en curso (paso 1–5 sin email) | `localStorage` | 24h | Retoma en misma sesión sin pedir nada |
| Diagnóstico completado (con email) | Firestore `diagnostics/{uid}` | Persistente | Fuente de verdad del lead |
| Lead | Firestore `leads/{uid}` | Persistente | Alimenta CRM manual / export |
| Cookie `mdg_returning` (hash del email SHA-256) | Cookie 180 días | 6 meses | Detectar "visitante con diagnóstico previo" para cambiar CTA a "Continuar tu ruta" |

---

### 1.6 Analytics — Vendor y Eventos

**Resolución**: **Firebase Analytics (ya integrado)** + opción a capa GA4 paralela vía gtag si el usuario decide más tarde. No requiere nueva dependencia.

---

### 1.7 Programas Educativos — ¿Existen?

**Pregunta**: ¿La oferta educativa ya está en el repo o hay que crearla?

**Hallazgo**: `empresas/` y `personas/` ya contienen páginas con programas (`bootcamp-ventas-ia.html`, `workshop-venta-amplificada.html`, `bootcamp-amplificacion-profesional.html`, `consultive-workshops-estrategia-personal.html`, `autodiagnostico.html`).

**Resolución**: **Se reutiliza lo existente**. El CTA P3 del home enlaza a `empresas/index.html` y `personas/index.html` como hub de oferta. No se crean programas nuevos.

---

### 1.8 Baseline para Success Criteria

**Pregunta**: ¿Cuál es el baseline actual de conversión del home?

**Resolución**: Los SC de conversión (SC-001, SC-002, SC-009) se miden contra un **baseline capturado en T-000** (tarea técnica previa, GA4 últimos 30 días del home actual). Los SC se definen como "uplift vs baseline capturado" en lugar de valores absolutos. Notación en los SC: `[baseline: T-000 GA4 capture, 30-day window]`.

---

## 2. Contexto del Producto (mejorado)

**metodologia.info** es el sitio vendedor de **MetodologIA — "Success as a Service"**, una consultora y plataforma EdTech LatAm fundada por Javier Montaño (Sofka + JM Labs). Sirve a dos audiencias complementarias:

- **B2B — Empresas**: líderes y equipos que necesitan modelos operativos y formas de trabajo amplificadas con IA.
- **B2C — Personas**: profesionales que se reinventan en la era de la IA para crear impacto.

**Problema actual del home**: la versión vigente en `index.html` usa estética dark startup (navy + oro + glass + dashboard hero) que comunica tecnología y autoridad pero **no cierra** por tres razones:

1. **Doble gateway Empresas/Personas** fuerza al visitante a auto-clasificarse antes de recibir propuesta de valor.
2. **Cero llamados a la acción en el fold**: el CTA "Descubrir Visión" es navegacional, no conversor.
3. **Discontinuidad visual con las cartillas premium** del workspace: las cartillas son Neo-Swiss Light, el home es dark — el visitante que ha consumido cartillas percibe dos marcas.

**Esta feature redefine el home como una landing de una sola intención macro — "iniciar tu ruta de éxito con una prueba concreta y gratuita" — en estética Neo-Swiss Light coherente con las cartillas, con tres rutas de conversión jerarquizadas (no igualadas) y full responsive nativo en xs/sm/md/lg/xl/2xl.**

---

## User Stories *(mandatory)*

### US-1 — Diagnóstico Gratuito como CTA Primario (Priority: P1)

Un visitante nuevo llega al home y en **≤8 segundos** entiende qué es MetodologIA y ve un botón prominente "Iniciar diagnóstico gratuito". Hace clic, completa un cuestionario de ≤6 pasos y recibe un resultado personalizado (nivel de madurez metodológica + recomendación + CTA siguiente), quedando registrado como lead cualificado con segmento (persona/empresa), idioma, timestamp y fuente `home-hero`.

**Why this priority**: Es la ruta de mayor valor comercial. Un diagnóstico completado es un lead con intent, contexto y segmento, convertible a cotización o conversación. Sin esta ruta, el sitio no vende.

**Independent test**: Publicando solo el hero + flujo de diagnóstico, un visitante puede entrar, iniciar, completar y recibir resultado + registro en Firestore, sin depender de US-2 ni US-3.

**Acceptance Scenarios**:

1. **Given** un visitante nuevo en el home en viewport xs (360×640), **When** la página termina de cargar (LCP ≤2.5s en 4G), **Then** ve el hero Neo-Swiss Light con promesa ≤12 palabras y el botón primario "Iniciar diagnóstico gratuito" visible sin scroll y con touch target ≥44px.
2. **Given** el mismo visitante en viewport 2xl (1920×1080), **When** carga, **Then** ve el mismo hero en layout 2-col optimizado, con el CTA primario manteniendo peso visual dominante.
3. **Given** un visitante hace clic en "Iniciar diagnóstico gratuito", **When** entra al flujo, **Then** ve pasos cortos (≤6 preguntas), indicador de progreso persistente, botones back/next, y tiempo estimado "≈3 min".
4. **Given** un visitante completa el diagnóstico, **When** envía el último paso con email + nombre + consent, **Then** las respuestas quedan persistidas en Firestore `diagnostics/{uid}`, el lead en `leads/{uid}` con segmento inferido, idioma y fuente `home-hero`, y se dispara evento Analytics `diagnostic_completed`.
5. **Given** un visitante abandona en el paso 3, **When** vuelve al home en la misma sesión (≤24h), **Then** ve un banner "Tienes un diagnóstico sin terminar — continuar" que retoma desde el paso 3 (estado en `localStorage`).
6. **Given** un visitante con cookie `mdg_returning`, **When** carga el home, **Then** el CTA primario cambia a "Continuar tu ruta" en lugar de "Iniciar diagnóstico".

---

### US-2 — Recurso Gratuito como Escape Route Temprana (Priority: P2)

Un visitante que aún no está listo para dejar datos ve, **dentro del mismo hero o inmediatamente debajo**, el CTA secundario "Explorar recursos gratis". Navega al catálogo `recursos/`, elige una categoría (cartilla, playbook, biblioteca, mini-app), abre o descarga un recurso y, al terminar, ve una invitación contextual al diagnóstico o a la oferta.

**Why this priority**: Captura visitantes en etapa temprana, construye autoridad y alimenta remarketing. Es el puente entre "curioso" y "lead cualificado". Sin este puente, los visitantes no listos rebotan.

**Independent test**: Publicando solo el home + catálogo, un visitante llega, elige recurso, lo abre/descarga y vuelve — historia completa independiente de US-1 y US-3.

**Acceptance Scenarios**:

1. **Given** un visitante en el home, **When** ve las tres rutas, **Then** "Explorar recursos" aparece como CTA secundario con peso visual claramente subordinado al primario (outline vs filled, tamaño medio vs XL).
2. **Given** un visitante elige "Explorar recursos", **When** navega al catálogo, **Then** ve los recursos organizados por tipo con previsualización Neo-Swiss consistente con las cartillas existentes.
3. **Given** un visitante abre un recurso gratuito, **When** termina de consumirlo, **Then** ve una invitación contextual ("¿Quieres saber qué nivel ya tienes? Haz el diagnóstico de 3 min").
4. **Given** un visitante intenta abrir un recurso premium, **When** clica, **Then** ve un modal "Ingresa tu email para desbloquear" que registra lead con fuente `home-resource-premium` y entrega el recurso sin double opt-in.

---

### US-3 — Oferta Educativa como Camino de Alta Intención (Priority: P3)

Un visitante que ya conoce MetodologIA, o que llegó buscando formación concreta, ve el tercer camino en una sección dedicada bajo el hero ("Programas activos"). Navega a `empresas/` o `personas/`, explora programas con formato consistente (nombre, duración, audiencia, resultado, CTA solicitud), solicita información y queda registrado como lead con contexto `offer:<programa>`.

**Why this priority**: Monetización directa pero con ciclo de venta más largo y audiencia más pequeña. Importante pero no domina el fold.

**Independent test**: Publicando home + `empresas/` + `personas/`, un visitante descubre programas y solicita info — historia completa.

**Acceptance Scenarios**:

1. **Given** un visitante en el home, **When** hace scroll 1 viewport, **Then** ve una sección "Programas activos" con 3–4 cards (uno por programa principal) en layout responsive (1-col xs/sm, 2-col md, 3-col lg+).
2. **Given** un visitante elige un programa, **When** navega, **Then** aterriza en `empresas/index.html` o `personas/index.html` con la oferta respectiva.
3. **Given** un visitante solicita información, **When** envía formulario, **Then** queda registrado como lead con contexto `offer:<slug-programa>`.

---

### US-4 — Identidad Neo-Swiss Light Coherente con Cartillas (Priority: P1)

Un visitante que ya conoce las cartillas premium llega al home y percibe **continuidad visual inmediata**: mismo sistema tipográfico (Poppins/Montserrat/Trebuchet MS), misma paleta (navy #122562, gold #FFD700, blue #137DC5, white #FFFFFF, bg #F9FAFB, bg-soft #F0F0EC), mismos radios (6/12/20/32), mismas shadows, mismos patrones.

**Why this priority**: Sin coherencia visual, el home no hereda la autoridad construida por las cartillas y la retórica "vendedora" suena a marketing barato. La identidad ES parte del argumento de venta.

**Independent test**: Un auditor de marca compara el home nuevo lado a lado con `cartilla-onboarding-programa-v11.html` y `playbook-deep-research-ia-v1.html` y valida consistencia visual ≥95% sin probar ningún flujo.

**Acceptance Scenarios**:

1. **Given** el home nuevo publicado, **When** se compara con las cartillas de referencia, **Then** comparten tokens (colores, tipografía, radios, shadows, spacing) al 100% — mismos custom properties CSS.
2. **Given** el home en modo light (default), **When** se compara con `cartilla-onboarding-programa-v11.html`, **Then** el bg es `#F9FAFB`, el navy `#122562`, el gold `#FFD700` y la tipografía idéntica.
3. **Given** el home en modo dark (toggle), **When** se compara con el dark mirror de las mismas cartillas, **Then** el bg es `#0B2545`, el text `#F0F4F8` y la paleta se adapta con los mismos tokens desaturados.
4. **Given** el home en xs, sm, md, lg, xl y 2xl, **When** se inspecciona, **Then** la jerarquía de los 3 CTAs se preserva y el diagnóstico siempre domina el fold.

---

### US-5 — Responsive Nativo en Todos los Dispositivos (Priority: P1)

Un visitante accede al home desde iPhone SE (xs), iPhone 15 (sm), iPad portrait (md), iPad landscape / MacBook Air (lg), desktop 27" (xl) o monitor 4K (2xl), y en cada caso percibe un **diseño nativo, no un responsive genérico**. Las tres rutas se preservan, el fold muestra CTA primario, no hay scroll horizontal, los touch targets cumplen WCAG, y el LCP es ≤2.5s en 4G.

**Why this priority**: El tráfico LatAm es ≥65% mobile. Un home mal adaptado a xs/sm pierde al grueso de la audiencia; uno mal adaptado a desktop pierde credibilidad B2B.

**Independent test**: Matriz de pruebas manuales en viewports 360×640, 390×844, 768×1024, 1024×768, 1280×800, 1920×1080 — cada uno debe pasar un checklist visual de 12 puntos (fold CTA visible, nav accesible, tipografía legible, touch targets ≥44px, sin scroll horizontal, imágenes nítidas, contrast ≥4.5:1, safe areas respetadas, orientación landscape operativa, modo oscuro legible, i18n sin overflow, footer visible).

**Acceptance Scenarios**:

1. **Given** un visitante en iPhone SE (360×640 portrait), **When** carga, **Then** ve promesa + CTA primario sin scroll, nav en drawer, touch targets ≥44px, tipografía base 16px.
2. **Given** un visitante en iPhone 15 landscape (844×390), **When** carga, **Then** el hero colapsa a layout compacto manteniendo CTA primario visible.
3. **Given** un visitante en iPad portrait (768×1024), **When** carga, **Then** ve el hero en 1-col ancho con CTAs horizontales.
4. **Given** un visitante en desktop 1920×1080, **When** carga, **Then** ve el hero 2-col con max-w 1440 centrado.
5. **Given** un visitante con navegación por teclado, **When** tabula desde el inicio, **Then** el orden de foco es: skip-link → nav → CTA primario → CTA secundario → sección programas → footer.

---

### US-6 — Blueprint Adaptativo de 3 Ejes (Priority: P1)

*Añadida en v7 robustness pass, reescrita en v8 (sidebar architecture). Cubre FR-240..FR-253 y FR-099b.*

Un visitante llega al sitio en cualquier página de las 13 y ve una experiencia coherente con: (a) un sidebar izquierdo fijo con 7 secciones numeradas por página con scroll-spy (inspirado en `Montano_Javier_Canonical.html`), (b) un header simplificado con logo + 3 nav items (Ruta, Servicios, Contacto), y (c) un triple toggle siempre visible en la esquina inferior izquierda para cambiar tema (light/dark), idioma (ES/EN) y audiencia (persona/empresa) a un click, sin recargar, sin flicker, en <100ms. La experiencia de cambiar el tono del contenido, el idioma o el look and feel a un click es requerimiento clave. Cada texto en el sitio existe en 4 variantes (ES×persona, ES×empresa, EN×persona, EN×empresa) gestionables desde un admin Firestore-backed.

**Why this priority**: Sin el blueprint homologado con sidebar + triple toggle, el sitio es inconsistente, la navegación intra-página no existe, y cada cambio de idioma/tono/tema requiere recarga. Es la base de la experiencia personalizada cross-page.

**Independent test**: Recorriendo las 13 páginas × 4 combinaciones (locale × audience), ninguna presenta keys crudas en el DOM, layout roto, sidebar sin secciones, o transición >100ms. El test parametrizado `tests/e2e/adaptive-blueprint.spec.js` cubre las 52 validaciones. El sidebar muestra 7 secciones con scroll-spy activo en 12 páginas (404 excluida).

**Acceptance Scenarios**:

1. **Given** un visitante en `/programas/` con `mdg_audience=persona`, **When** hace click en el toggle de audience (bottom-left) a `empresa`, **Then** hero copy, proof section y filtered programs se actualizan en <100ms, `localStorage.mdg_audience='empresa'` y `html[data-audience]='empresa'`.
2. **Given** un visitante en cualquiera de las 12 páginas (excl. 404) en desktop (≥960px), **When** mira la pantalla, **Then** ve un sidebar izquierdo fijo de 260px con 7 secciones numeradas (01–07) con iconos, y el triple toggle siempre visible en la esquina inferior izquierda.
3. **Given** URL `/metodo/?audiencia=empresa`, **When** la página carga, **Then** `html[data-audience]='empresa'` se setea **antes** del primer paint (inline `<script>` en `<head>`), sin flicker.
4. **Given** un visitante navega por teclado, **When** tabula al triple toggle de audience y presiona `Space`, **Then** el estado cambia, `aria-live` anuncia "Cambiado a vista empresas" / "Switched to business view".
5. **Given** key i18n `home.hero.empresa.en` ausente, **When** el resolver ejecuta cascada, **Then** cae a `home.hero.unknown.en` y nunca muestra la key cruda.
6. **Given** un cambio de theme light→dark via triple toggle, **When** se re-pintan los slots, **Then** el contenido (hero, proof, CTA) NO cambia — solo tokens CSS. Ortogonalidad verificada.
7. **Given** un visitante en mobile (xs, 360px), **When** el sidebar está cerrado, **Then** el triple toggle sigue visible como floating fixed en la esquina inferior izquierda, accesible sin abrir sidebar.
8. **Given** un visitante scrollea en `/empresas/`, **When** pasa la sección "casos" (S5), **Then** el sidebar marca "05 · Casos" como activo con scroll-spy.

---

### US-7 — Sitemap de 13 páginas homologado (Priority: P1)

*Añadida en v7 robustness pass — cubre sitemap.md §2 (IA) + redirects legacy.*

Un visitante, un crawler o un auditor recorre el sitio completo y encuentra exactamente 13 páginas (incluyendo 404), cada una siguiendo el shell homologado del blueprint adaptativo, sin orphans ni dead-ends. Los redirects legacy (`/vision.html`, `/servicios/`, `/ruta/`, `/sitemap.html`) resuelven a destinos canónicos con 301. El `sitemap.xml` refleja exactamente 12 URLs públicas (excluyendo 404). El nav primario expone 5 items; el footer cubre las 12 restantes.

**Why this priority**: El constraint de 13 páginas es arquitectónico. Sin test automatizado, el drift es certero: una feature futura añade una página sin darse cuenta y rompe la IA.

**Independent test**: Un crawler sin JS visita `/` y sigue enlaces; no encuentra más de 12 URLs únicas (excluyendo detail slugs dinámicos `?slug=`). Un GET a cada URL legacy devuelve 301 con Location correcto. Script `scripts/count-pages.js` cuenta exactamente 13 `.html` canónicos bajo el directorio root.

**Acceptance Scenarios**:

1. **Given** `sitemap.xml` generado por `scripts/generate-sitemap-xml.js`, **When** se parsea, **Then** contiene exactamente 12 `<url>` entries.
2. **Given** GET `/vision.html`, **Then** response es 301 con Location `/metodo/`.
3. **Given** GET `/servicios/`, **Then** response es 301 con Location `/programas/`.
4. **Given** GET `/ruta/`, **Then** response es 301 con Location `/diagnostico/?utm_source=legacy-ruta`.
5. **Given** GET `/nonexistent`, **Then** response es 404 y body renderiza `404.html` shell con botón "Volver al home".
6. **Given** el nav primario renderizado, **When** inspeccionado, **Then** contiene exactamente 5 nav items + 1 CTA button + 3 toggles.
7. **Given** el footer renderizado, **When** inspeccionado, **Then** lista las 12 páginas públicas.

---

### US-8 — Admin Content Editor con 4 Variantes por Texto (Priority: P1)

*Añadida en v8 — sidebar architecture. Trae parte del backoffice CMS (antes diferido a 010) al scope de 009 para habilitar mantenimiento de contenido sin redeploy.*

Un administrador (Javier) accede a `/admin/content-editor.html` tras login con Google Auth, ve una grilla de 13 páginas, selecciona una, y edita todos los content slots de esa página en 4 variantes (ES×persona, ES×empresa, EN×persona, EN×empresa). Al guardar, el contenido se persiste en Firestore `slots/{pageSlug}` y el sitio público lo consume via `migration-bridge.js` sin necesidad de redeploy. El editor hace simple el mantenimiento futuro de los textos composables del sitio.

**Why this priority**: Sin el admin editor, cada cambio de copy requiere editar JSON files + git push + deploy SSH. Con el editor, el contenido es gestionable en tiempo real. Es la pieza que hace viable el modelo de 4 variantes por texto.

**Independent test**: Admin login → seleccionar home → editar hero.headline en las 4 variantes → guardar → verificar que el sitio público muestra el nuevo texto en la combinación correcta (locale × audience).

**Acceptance Scenarios**:

1. **Given** un admin autenticado en `/admin/`, **When** navega a content-editor, **Then** ve 13 cards de páginas con nombre y cantidad de slots editables.
2. **Given** un admin selecciona "Home", **When** el editor carga, **Then** ve todos los content slots (hero, proof, oferta, escape_routes, closing, meta) con 4 textareas por slot (ES×persona, ES×empresa, EN×persona, EN×empresa).
3. **Given** un admin edita `home.hero.headline` en la variante EN×empresa, **When** guarda, **Then** el documento Firestore `slots/home` se actualiza con la nueva variante.
4. **Given** un visitante carga el home con `mdg_locale=en` + `mdg_audience=empresa`, **When** el slot-resolver ejecuta, **Then** lee la variante editada desde Firestore (via migration-bridge.js) en lugar del JSON estático.
5. **Given** Firestore caído, **When** un visitante carga el home, **Then** el fallback a JSON estático funciona sin error visible.

---

### Edge Cases

- Visitante con JavaScript deshabilitado: hero y los 3 CTAs renderizan como HTML estático con hrefs funcionales a `/diagnostico/`, `/recursos/`, `/empresas/`. El diagnóstico degrada a formulario de contacto simple.
- Backend Firestore caído o rules rechazan: CTA primario muestra toast "Servicio temporal fuera — contáctanos" con link mailto:.
- Visitante con diagnóstico previo: CTA muta a "Continuar tu ruta" (cookie `mdg_returning`).
- UTM `utm_content=recurso` o `utm_content=oferta`: la ruta correspondiente se destaca dinámicamente con un halo gold sin romper jerarquía.
- Home en ES o EN: misma jerarquía, mismo layout, cero cadenas huérfanas.
- Usuarios con `prefers-reduced-motion`: animaciones de entrada desactivadas, transiciones ≤100ms.
- iOS notch / Dynamic Island: contenido crítico respeta `env(safe-area-inset-top)`.
- Lector de pantalla: orden lógico de lectura, skip-link visible al focus, labels descriptivos, live region para progress bar del diagnóstico.
- Bajo ancho de banda (2G/3G): critical CSS inline, fuentes `font-display: swap`, imágenes con `loading="lazy"` y srcset WebP/AVIF con fallback.

---

## Requirements *(mandatory)*

### 4.1 Functional Requirements

**Home landing y narrativa**

- **FR-001**: El home MUST presentar en el viewport inicial sin scroll (xs a 2xl) una promesa de valor ≤12 palabras y los 3 CTAs con jerarquía visual explícita (primario dominante, secundario subordinado, terciario en sección dedicada bajo el hero).
- **FR-002**: El CTA primario "Iniciar diagnóstico gratuito" MUST ser el único con peso visual dominante (filled gold, tamaño XL, touch target ≥44×44 px en mobile y ≥48×48 en tablet/desktop).
- **FR-003**: El home MUST incluir una sección de prueba social (testimonios o logos o métricas) entre el hero y la sección de programas.
- **FR-004**: El home MUST repetir los 3 CTAs en una sección de cierre antes del footer.
- **FR-005**: El home MUST usar la estructura: `hero → prueba social → 3 rutas expandidas → programas activos → cierre con CTAs → footer`.

**Diagnóstico gratuito**

- **FR-010**: El sistema MUST permitir a un visitante iniciar el diagnóstico sin registro previo, sin email, sin cookies.
- **FR-011**: El diagnóstico MUST constar de ≤6 pasos con barra de progreso visible y tiempo estimado "≈3 min".
- **FR-012**: El diagnóstico MUST terminar con un resultado personalizado (nivel + recomendación + CTA siguiente) y solicitar en el último paso: email, nombre, consentimiento LGPD/GDPR-light (checkbox obligatorio con link a política).
- **FR-013**: El sistema MUST persistir el diagnóstico completado en Firestore `diagnostics/{uid}` y el lead en `leads/{uid}` con: segmento inferido, fuente, idioma, timestamp, respuestas hash-paso-a-paso, resultado calculado.
- **FR-014**: El sistema MUST persistir el diagnóstico en curso en `localStorage` con TTL 24h para retomar en la misma sesión o dentro del día.
- **FR-015**: El sistema MUST degradar el CTA a un formulario de contacto cuando Firestore no esté disponible, mostrando mensaje claro ("Servicio temporal fuera — usa este formulario").
- **FR-016**: El sistema MUST generar una cookie `mdg_returning` (SHA-256 del email, Secure, SameSite=Lax, 180 días) al completar el diagnóstico, y cambiar el CTA primario a "Continuar tu ruta" cuando esté presente.
- **FR-017**: El sistema MUST aplicar **append-only** a `leads/{uid}` y `diagnostics/{uid}`: cada completion crea documentos nuevos bajo el anonymous uid de la sesión actual, aunque el email coincida con un lead previo. La deduplicación por email es responsabilidad de una reconciliación admin diferida a feature `010-backoffice-cms`. Razón: los anonymous uids son device-scoped y las security rules validan `auth.uid`, no el hash de email.

**Recursos**

- **FR-020**: El home MUST exponer un CTA "Explorar recursos gratis" como link secundario junto al CTA primario, con peso visual subordinado.
- **FR-021**: El CTA MUST llevar a `recursos/index.html` (catálogo existente) con resaltado visual Neo-Swiss.
- **FR-022**: Recursos premium MUST pedir email + nombre en un modal antes de desbloquear (lead con fuente `home-resource-premium`), sin double opt-in.

**Oferta educativa**

- **FR-030**: El home MUST exponer una sección "Programas activos" bajo el hero con 3–4 programas representativos (cards con nombre, audiencia, duración, resultado, CTA).
- **FR-031**: Cada card MUST enlazar a la página existente (`empresas/*.html` o `personas/*.html`) sin crear páginas nuevas.
- **FR-032**: El CTA global de la sección MUST ser "Ver todos los programas" enlazando a `empresas/index.html` y `personas/index.html` según segmento.

**Branding y design system**

- **FR-040**: El home MUST consumir exclusivamente los tokens CSS gobernados por `CONSTITUTION.md §X` — custom properties idénticas a las cartillas de referencia.
- **FR-041**: El home MUST usar la paleta Neo-Swiss Light como default: `--bg #F9FAFB`, `--bg-soft #F0F0EC`, `--bg-card rgba(255,255,255,.88)`, `--navy #122562`, `--gold #FFD700`, `--gold-dark #B8860B`, `--blue #137DC5`, `--text #1F2833`, `--text-sec #4A5568`, `--text-muted #808080`, `--border rgba(18,37,98,.08)`.
- **FR-042**: El home MUST soportar dark mirror (toggle manual + `prefers-color-scheme`): `--bg #0B2545`, `--bg-soft #071A33`, `--text #F0F4F8`, con los mismos gold/blue desaturados.
- **FR-043**: El home MUST usar el sistema tipográfico de 3 niveles: `--font-head 'Poppins'` (headings), `--font-body 'Montserrat'` (body), `--font-note 'Trebuchet MS'` (notes, labels, micro-copy).
- **FR-044**: El home MUST usar radios `--radius-sm 6px`, `--radius-md 12px`, `--radius-lg 20px`, `--radius-xl 32px` y shadows `--shadow-card`, `--shadow-glow` idénticos a las cartillas.
- **FR-045**: El home MUST persistir el modo activo (light/dark) en `localStorage` como `mdg_theme`, respetando `prefers-color-scheme` como fallback.
- **FR-046** *(añadido en v6, derivado de backcasting §3.1 gap B)*: Cada variante de copy por audience (`persona` vs `empresa`) MUST pasar un audit manual de brand voice antes de merge, validando un checklist de 5 puntos: (1) persona mantiene tono cercano e inspiracional, (2) empresa mantiene tono seguro y basado en resultados, (3) ambas preservan los principios de voz de marca MetodologIA (claridad > cleverness, evidencia > hype, humano > corporativo), (4) cero términos de la red-list (Constitution XI) presentes en el copy, (5) cada CTA es accionable (enlaza a página o acción concreta). **Pass = 5/5 checks**; cualquier fallo bloquea merge hasta corrección. El checklist de review del PR MUST incluir sección "Voice audit — persona + empresa" por cada dictionary modificado. *(Deriva de Constitution XI Brand Voice Integrity.)*

**Responsive y diseño nativo**

- **FR-050**: El home MUST ser mobile-first, con breakpoints `xs 360`, `sm 390`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.
- **FR-051**: El home MUST mostrar el CTA primario visible sin scroll en todos los breakpoints, incluyendo landscape mobile (844×390).
- **FR-052**: El home MUST usar `clamp()` para typography scale fluida entre breakpoints.
- **FR-053**: El home MUST respetar `env(safe-area-inset-*)` en iOS para notch/Dynamic Island/home indicator.
- **FR-054**: El home MUST tener touch targets ≥44×44 px en xs/sm y ≥48×48 px en md/lg/xl/2xl, con spacing ≥8px entre ellos.
- **FR-055**: El home MUST evitar scroll horizontal en cualquier viewport (test automatizado en Playwright).
- **FR-056**: El home MUST cargar imágenes con `srcset` WebP/AVIF + fallback PNG/JPG y `loading="lazy"` fuera del fold.
- **FR-057**: El home MUST reservar espacio (`aspect-ratio` o `width/height`) para todos los media para mantener CLS <0.1.

**Internacionalización y accesibilidad**

- **FR-060**: El home MUST estar 100% traducido ES/EN usando el módulo `js/i18n/` existente y `data-i18n` attributes.
- **FR-061**: El home MUST cumplir WCAG 2.1 AA mínimo: contrast ≥4.5:1 texto normal, ≥3:1 texto grande, ≥3:1 UI components, focus rings visibles, orden de foco lógico.
- **FR-062**: El orden de foco por teclado MUST ser: skip-link → header nav (Ruta, Servicios, Contacto) → sidebar secciones (7 links) → main content → triple toggle (theme, locale, audience) → footer. *(v8: actualizado para sidebar + triple toggle architecture)*
- **FR-063**: El home MUST renderizar un estado degradado funcional sin JavaScript (HTML estático navegable a `/diagnostico/`, `/recursos/`, `/empresas/`, `/personas/`).
- **FR-064**: El home MUST respetar `prefers-reduced-motion` desactivando entrance animations y limitando transiciones a ≤100ms.
- **FR-065**: Los iconos lucide MUST tener `aria-hidden="true"` cuando sean decorativos y `aria-label` cuando sean funcionales.

**Analítica de conversión**

- **FR-070**: El home MUST registrar eventos en Firebase Analytics: `home_view`, `cta_click_primary`, `cta_click_secondary`, `cta_click_tertiary`, `diagnostic_start`, `diagnostic_step_{1..6}`, `diagnostic_completed`, `diagnostic_abandoned`, `resource_open`, `resource_premium_unlock`, `program_request`.
- **FR-071**: Cada evento MUST incluir: `locale` (es/en), `device_class` (xs/sm/md/lg/xl/2xl), `source` (organic/utm/direct), `utm_content` si aplica, `variant` si A/B.
- **FR-072**: El home MUST declarar consent banner LGPD-light con opciones **aceptar/rechazar** Analytics antes de disparar eventos (cookie `mdg_consent`). **Two-tier consent**: el banner cubre exclusivamente Analytics (FR-070, FR-071); la captura de PII en el diagnóstico (`leads/`, `diagnostics/`) está gateada por el checkbox explícito de FR-012 que es independiente y necesario para la entrega del servicio. Si el usuario **rechaza** el banner: (a) el home renderiza normalmente, (b) el diagnóstico funciona end-to-end, (c) cero eventos Analytics se disparan (ni siquiera `home_view`), (d) `leads/` y `diagnostics/` se siguen escribiendo si el checkbox de FR-012 está marcado, porque son necesarios para mostrar el resultado personalizado. Alineado con Constitution XXII (PII-Append-Only): el banner no sustituye al checkbox explícito de PII.

**Contexto personalizado por intención**

- **FR-080**: El home MUST leer `utm_content` y cuando sea `diagnostico`, `recurso` u `oferta`, destacar visualmente la ruta correspondiente con un halo/glow gold sutil, sin cambiar la jerarquía base.
- **FR-081**: El home MUST detectar la cookie `mdg_returning` y mutar el CTA primario a "Continuar tu ruta" + link directo al diagnóstico con estado restaurado.

**Backoffice CMS — gestión sin código** *(Scope: feature `010-backoffice-cms`. Decisión: v4 clarification Q1. Feature 009 consume `js/cms/` existente en modo read-only sobre colecciones seedeadas manualmente. La única escritura de 009 es a `leads/{uid}` y `diagnostics/{uid}` bajo anonymous auth.)*

> **FR-100..FR-120 — Traceability index** (implementation deferred to feature 010)
>
> | ID | Title | 010 scope |
> |---|---|---|
> | FR-100 | Backoffice `/admin/` con Firebase Auth + custom claims | Admin shell |
> | FR-101 | CRUD completo sobre 16 colecciones Firestore | Entity management |
> | FR-102 | Schema descriptors (JSON Schema en `settings/schemas/`) | Schema registry |
> | FR-103 | Bloques de contenido reutilizables (`blocks/{slug}`) | Block editor |
> | FR-104 | Páginas como composición de bloques con versionado | Page composer |
> | FR-105 | URLs editables con redirects (`pages/{slug}.path`) | URL router |
> | FR-106 | Precios multi-moneda (`pricing/{id}`) | Pricing engine |
> | FR-107 | i18n desde Firestore (flag `cms-i18n`, OFF en 009) | Translation sync |
> | FR-108 | Versionado y rollback (`{entity}_versions/`) | Version history |
> | FR-109 | Audit log inmutable (`audit/{eventId}`) | Audit trail |
> | FR-110 | Workflow de publicación (draft→published) con roles | Publish workflow |
> | FR-111 | Upload de assets a Firebase Storage | Asset library |
> | FR-112 | Preview de drafts (`?preview={token}`) | Preview mode |
> | FR-113 | Dashboard métricas live (leads, diagnostics, funnel) | Admin dashboard |
> | FR-114 | Export JSON/CSV de leads, diagnostics, audit | Data export |
> | FR-115 | Feature flags (`flags/{key}`) con targeting | Flag management |
> | FR-116 | Experimentos A/B (`experiments/{id}`) | A/B framework |
> | FR-117 | i18n del propio admin UI | Admin i18n |
> | FR-118 | Design system Neo-Swiss en admin | Admin theming |
> | FR-119 | Schema migrations declarativas | Migration runner |
> | FR-120 | Security rules completas (admin write, public read) | Full ruleset |
>
> *Note: FR-107 flag `cms-i18n` stays OFF in 009; `migration-bridge.js` retains dual-source code but reads only from `js/i18n/dictionaries/*.json` until 010 enables the flag.*

**Performance**

- **FR-090**: El home MUST cargar el LCP en ≤2.5s en 4G (slow 3G Fast simulación) y ≤1.5s en desktop cable.
- **FR-091**: El home MUST tener TBT <200ms, CLS <0.1, INP <200ms.
- **FR-092**: El home MUST inline critical CSS del fold (hand-authored en `estilos/critical.css`, embebido en `<style>` del `<head>`: tokens + hero layout + CTA primario + typography above-the-fold) y diferir `dist/output.css` vía `media="print"` + `onload` swap. Sin herramientas de extracción automática (ver FR-095).
- **FR-096**: El archivo `estilos/critical.css` MUST mantenerse como source-of-truth hand-authored; los cambios a tokens o al hero MUST reflejarse manualmente. Un test Playwright valida que el primer paint renderiza hero+CTA sin FOUC.
- **FR-093**: El home MUST cargar fuentes con `font-display: swap` y preconnect a `fonts.googleapis.com`.
- **FR-094**: El home MUST diferir toda JS no crítica con `defer` o `type="module"`.
- **FR-095**: El home MUST consumir los assets existentes del proyecto (`dist/output.css`, `components/SiteHeader.js`, `components/SiteFooter.js`, `js/icons.js`) sin introducir dependencias nuevas.

### 4.2 Non-Functional Requirements

- **NFR-001**: Stack = HTML estático + CSS (custom properties + Tailwind prebuilt) + Vanilla JS + Web Components + Firebase client SDK. **Cero runtime server-side**.
- **NFR-002**: Despliegue vía git pull SSH a Hostinger (`u363367449@156.67.75.195:65002`) en rama `main`.
- **NFR-003**: Compatibilidad navegadores: Chrome 110+, Safari 15+, Firefox 110+, Edge 110+, iOS Safari 15+, Chrome Android 110+.
- **NFR-004**: Tamaño total del home <250 KB (HTML + critical CSS) inicial, <800 KB total con lazy loading.
- **NFR-005**: Firestore security rules MUST restringir escritura a `diagnostics/{uid}` y `leads/{uid}` solo al uid de la sesión anónima que las creó.
- **NFR-006**: PII protegida — email nunca en logs de cliente, eventos de Analytics sin email raw (solo hash).

**Calidad (añadidos en v7 robustness pass, ver robustness-v1.md §§B-D)**

- **NFR-007** *(Testing Discipline)*: El desarrollo MUST seguir el ciclo **ATDD outer loop + TDD inner loop** especificado en robustness-v1.md §B: cada `.feature` scenario se escribe antes de step definitions; cada unit test se escribe antes del módulo. Commits que violen el orden (código antes que test) son rechazados por revisión.
- **NFR-008** *(Coverage contract)*: La cobertura de código MUST cumplir:
  - **Pure modules** (`js/diagnostic/logic.js`, `js/state/bus.js`): **100% lines + 100% branches**
  - **Logic modules** (`js/audience/state.js`, `js/i18n/resolver.js`, `js/analytics/events.js`, `js/theme/toggle.js`): **≥95% lines + ≥90% branches**
  - **Controllers** (`js/diagnostic/controller.js`, `js/audience/controller.js`): **≥80% lines + ≥75% branches**
  - **Web Components** (`components/*.js`): **≥70% lines + ≥65% branches**
  - **Global weighted**: **≥85% lines + ≥80% branches**
  Enforced by `vitest.config.js` thresholds; CI failure on miss.
- **NFR-009** *(ATDD coverage)*: Cada User Story MUST tener un `.feature` file en `tests/features/us-N-<name>.feature` con al menos un scenario por acceptance scenario del spec. Cada `.feature` inicia con un header `@covers FR-... @story US-... @success SC-...` para trazabilidad automática.
- **NFR-010** *(Test traceability)*: Cada `.spec.js` y `.feature` MUST comenzar con el header de trazabilidad (robustness-v1.md §C schema template). Pre-commit hook rechaza archivos sin header.
- **NFR-011** *(Integration testing policy)*: Security rules y auth flows MUST probarse exclusivamente contra Firebase Emulator Suite (no mocks). Network failure scenarios y analytics emission MUST probarse con mocks (no emulator). Policy hybrid declarada en robustness-v1.md §A Q3.
- **NFR-012** *(E2E performance budget)*: El test E2E parametrizado (`adaptive-blueprint.spec.js` matriz 52) + los 10 flows independientes (§E) MUST ejecutarse en <3 min wall time total con 4 Playwright workers en paralelo.
- **NFR-013** *(Independent flows)*: El asistente QA entrega 10 flujos black-box adicionales en robustness-v1.md §E que NO derivan directamente de FRs sino de historias end-to-end emergentes. Cada flow se materializa como 1 archivo de test (8 E2E + 1 unit + 1 integration).

### 4.3 Key Entities

- **Product**: `{id, slug, title_i18n, description_i18n, type:"course|workshop|bootcamp|consulting|service", segmento, pricingRef, assets[], tags[], status, createdAt, updatedAt, version}`
- **Service**: `{id, slug, title_i18n, description_i18n, deliverables_i18n[], duration, pricingRef, segmento, status}`
- **Program**: extiende Product con `{cohortes[], curriculum[], instructor, certificacion}`
- **Pricing**: `{id, productRef, currency, amount, discounts[], validFrom, validUntil, plans[], status}`
- **Page**: `{slug, locale, title_i18n, seo:{title,description,og,canonical}, blocks:[{blockRef,order,overrides}], status, publishedAt, author, version}`
- **Block**: `{id, type:"hero|feature|testimonial|cta-group|pricing-table|faq|image|video|rich-text|html", schema, content_i18n, status}`
- **Asset**: `{uuid, filename, mimeType, size, storagePath, publicUrl, width, height, alt_i18n, tags[], uploadedBy, uploadedAt}`
- **Translation**: `{locale, namespace, key, value, updatedBy, updatedAt}`
- **Flag**: `{key, value, targeting:{locales[],deviceClasses[],utm[],cohorts[]}, enabled, updatedAt}`
- **Experiment**: `{id, name, hypothesis, variants:[{id,weight,config}], assignment:"session|user", metric, status, startedAt, endsAt}`
- **Schema**: `{entity, version, fields:[{name,type,required,validation,label_i18n,help_i18n}]}`
- **AuditEvent**: `{eventId, actorUid, action, entity, entityId, before, after, diffSummary, ip, userAgent, serverTimestamp}`
- **Setting**: `{key, value_i18n?, scope:"global|env", updatedBy, updatedAt}`
- **Lead**: `{uid, email, name, segmento, fuente, locale, createdAt, updatedAt, consent, programaInterest?}`
- **Diagnóstico**: `{uid, leadUid, steps:[{id,answer}], resultado:{nivel,recomendacion}, locale, deviceClass, fuente, startedAt, completedAt, status:"in-progress"|"completed"|"abandoned"}`
- **Recurso**: `{id, tipo, estado:"free"|"premium", locale, previewUrl, fullUrl}` (existente en el CMS).
- **Programa Educativo**: `{id, slug, nombre, duracion, audiencia, resultado, estado, segmento:"empresa"|"persona", href}` (existente).
- **Evento de Conversión**: `{tipo, sessionId, route, variant?, locale, deviceClass, audience, timestamp, utm?}`
- **AudienceState** *(client-only, never persisted to Firestore)*: `{value: "persona"|"empresa"|"unknown", provenance: "url"|"localStorage"|"landing"|"diagnostic"|"utm"|"default", updatedAt, locked: boolean}` — ver adaptive-blueprint.md §3
- **ContentSlot**: `{slot, pageSlug, variants: {[audience]: {[locale]: {headline, subheadline, cta_label, cta_href, ...}}}}` — bundled en `js/i18n/dictionaries/{pageSlug}.json` en 009; migra a Firestore `slots/{pageSlug}` en 010 — ver adaptive-blueprint.md §2.2

### 4.4 Constitutional Alignment (v7.1.0)

> Added in v4 clarification session per Constitution v7.0.0; updated to v7.1.0 (added XXIV Adaptive Blueprint Personalization). This section is a MUST for every feature under v7+.

#### Firebase services used (Constitution I)

| Service | Usage | Fallback when down |
|---|---|---|
| Firestore | Read `programs/`, `resources/`, `testimonials/`, `pages/`, `blocks/` (public published docs). Write `leads/{uid}`, `diagnostics/{uid}` (append-only). | Static fallback via `js/i18n/dictionaries/*.json` + hard-coded HTML in `index.html`. Diagnóstico falls back to `mailto:` form (FR-015). |
| Auth | Anonymous sign-in (`signInAnonymously`) before any PII write. | PII write blocked → show degraded contact form. |
| Storage | Read published asset URLs from Firestore doc references (images, PDFs). | Static `img/` + `recursos/` directories in the repo. |
| Analytics | Event tracking per FR-070..FR-072 (consented only). | Events dropped silently; no blocking. |
| App Check | Attestation token on all writes to `leads/` and `diagnostics/`. | Write rejected → degraded contact form. |

#### Collections touched (Constitution XXIII)

| Collection | Read | Write | Notes |
|---|---|---|---|
| `programs/` | ✅ public-published | ❌ | Seeded by `scripts/seed.js` until feature 010 lands |
| `resources/` | ✅ public-published | ❌ | Existing catalog |
| `testimonials/` | ✅ public-published | ❌ | Seeded manually |
| `pages/` | ✅ public-published (only `pages/home`) | ❌ | Optional; static `index.html` is the fallback |
| `blocks/` | ✅ public-published | ❌ | Only if `pages/home` references blocks |
| `leads/{uid}` | ✅ own-uid | ✅ create (append-only per FR-017) | PII per Constitution XXII |
| `diagnostics/{uid}` | ✅ own-uid | ✅ create (append-only per FR-017) | PII per Constitution XXII |
| `translations/` | ❌ (flag OFF by default — FR-107) | ❌ | Activates in feature 010 |

#### Seed path (Constitution XXIII)

Feature 009 ships with `scripts/seed.js` that populates `programs/`, `resources/`, `testimonials/` idempotently from a local JSON manifest. The home page renders correctly with empty collections via static fallback. Seed script run order:
1. Login to Firebase CLI as project owner
2. `node scripts/seed.js --dry-run` to preview
3. `node scripts/seed.js --apply` to write

#### Explicit offline UX (Constitution VIII)

- **FR-097**: The home MUST surface cache state with visible pills near the header/footer:
  - `offline` pill (yellow): stale cache served, revalidation failed
  - `syncing` pill (blue, animated): revalidation in progress
  - `fallback` pill (gray): static fallback served (Firestore gated by flag or unreachable on first load)
- **FR-098**: A Playwright test in `tests/e2e/offline-pill.spec.js` MUST stub Firestore to fail and assert the `offline` pill appears on the home within 3 seconds.
- **FR-099**: The pills are `aria-live="polite"` so screen readers announce cache state changes.
- **FR-099b** *(v8: reescrito para sidebar architecture)*: Las offline/syncing/fallback pills (FR-097..FR-099) MUST permanecer visibles en el header o al inicio del `<main>` content, sin ser obstruidas por el sidebar ni el triple toggle. Contraste ≥3:1 en ambos themes. *(Deriva de Constitution VIII SWR + Explicit Offline UX.)*

#### Adaptive Blueprint Personalization (Constitution XXIV)

This feature satisfies XXIV via the 3-axis orthogonal system: locale (ES/EN) affects text only via `data-i18n`; theme (light/dark) affects CSS custom properties only; audience (persona/empresa) affects copy and listing filters only. Single homologated shell with sidebar (FR-240..FR-244) + triple toggle (FR-245..FR-249). Validated by 52-combo matrix test (SC-014). Content manageable without redeploy via admin editor (FR-250..FR-253).

**Sidebar y navegación intra-página** *(v8 — sidebar architecture, inspirado en Montano_Javier_Canonical.html)*

- **FR-240**: Cada una de las 12 páginas (excl. 404) MUST tener un sidebar izquierdo fijo (`components/SiteSidebar.js`) con exactamente 7 secciones numeradas (01–07), cada una con icono SVG, label i18n y link anchor `#section-id`. El sidebar usa scroll-spy (IntersectionObserver) para marcar la sección activa con `is-active` class. En desktop (≥960px): sidebar visible, 260px ancho, `position: fixed`. En mobile (<960px): off-canvas drawer con hamburger toggle, backdrop, Escape para cerrar.
- **FR-241**: Cada página MUST definir exactamente 7 `<section id="...">` en su `<main>`, correspondientes a las 7 entradas del sidebar. Las secciones son la unidad de navegación intra-página.
- **FR-242**: El header MUST simplificarse a: logo MetodologIA + 3 nav links ("Ruta" como CTA dorado → `/diagnostico/`, "Servicios" → `/programas/`, "Contacto" → `/contacto/`). NO contiene toggles. En mobile (<960px) incluye hamburger para abrir sidebar.
- **FR-243**: El scroll-spy MUST usar `rootMargin: '-40% 0px -50% 0px'` con `threshold: 0` para determinar la sección activa. Smooth scroll al hacer click en un link del sidebar con offset de `var(--header-h) + 12px`.
- **FR-244**: Las 7 secciones por página se definen en `js/sidebar/sections-config.js` y sus labels se resuelven via i18n (`{pageSlug}.sections.{sectionId}` × 2 locales = 168 keys).

**Triple toggle siempre visible** *(v8)*

- **FR-245**: El sitio MUST presentar un triple toggle (`components/TripleToggle.js`) SIEMPRE visible en la esquina inferior izquierda (`position: fixed; bottom: 1rem; left: 1rem; z-index: 45`), independientemente del estado del sidebar. En desktop se alinea visualmente con el borde inferior del sidebar pero NO está dentro de él.
- **FR-246**: El triple toggle contiene 3 botones `role="switch"` con `aria-checked`:
  - **Theme**: ☀️ light / 🌙 dark — flip `html[data-theme]`, persist `localStorage.mdg_theme`
  - **Locale**: ES / EN — flip `html[lang]`, emit `langchange`, persist `localStorage.mdg_locale`
  - **Audience**: 👤 persona / 🏢 empresa — flip `html[data-audience]`, emit `mdg:state-changed`, persist `localStorage.mdg_audience`
- **FR-247**: Cada click en un toggle MUST completar la transición DOM en <100ms sin recarga. El cambio de tema es CSS-only; el cambio de idioma y audiencia re-resuelve todos los content slots via la cascada de fallback. Cambiar el tono del contenido, el idioma o el look and feel a un click es el requerimiento clave de la experiencia.
- **FR-248**: El triple toggle MUST tener fondo translúcido con shadow sutil, no MUST solapar con el body content scrolleable. En mobile (xs, 360px) los 3 botones se apilan verticalmente con touch target ≥44×44px y spacing ≥8px.
- **FR-249**: El triple toggle MUST ser navegable por teclado (Tab entre switches, Space/Enter para flip). Cada cambio MUST anunciarse via `aria-live="polite"` con texto descriptivo ("Tema oscuro activado" / "Dark theme enabled").

**Admin content editor** *(v8 — Firestore-backed content management)*

- **FR-250**: El sitio MUST incluir un admin content editor en `/admin/content-editor.html` accesible tras Firebase Auth login (Google Sign-In + custom claim admin). El editor presenta una grilla de 13 page cards; al seleccionar una, muestra todos los content slots de la página con 4 `<textarea>` por slot (ES×persona, ES×empresa, EN×persona, EN×empresa).
- **FR-251**: El admin editor MUST leer/escribir Firestore `slots/{pageSlug}` documents con schema: `{ slotId, variants: { "persona.es": "...", "persona.en": "...", "empresa.es": "...", "empresa.en": "..." } }`.
- **FR-252**: El sitio público MUST leer content slots desde Firestore via `migration-bridge.js` con flag `cms-i18n` ON cuando existen documentos en `slots/{pageSlug}`. Fallback: static i18n JSON dictionaries cuando Firestore no disponible o sin documentos.
- **FR-253**: Las security rules de Firestore MUST permitir write a `slots/{pageSlug}` solo a usuarios con custom claim `admin: true`. Read público permitido para `status == 'published'`.

### 4.5 Diagnóstico Logic (declarative rules)

> Single source of truth para la lógica del diagnóstico (FR-011, FR-012). Este bloque alimenta tanto la implementación como los `.feature` scenarios. Cambios a esta tabla MUST acompañarse de update a tests.

**Preguntas (6 pasos, obligatorias, orden fijo):**

| step | id | pregunta_es | pregunta_en | opciones (id · weight) |
|---|---|---|---|---|
| 1 | `q_segmento` | ¿Qué representas hoy? | What best describes you today? | `persona·0`, `lider_equipo·1`, `fundador·2`, `directivo·3` |
| 2 | `q_madurez` | ¿Cuál es tu nivel actual de metodología de trabajo? | What's your current methodology maturity? | `sin_metodo·0`, `ad_hoc·1`, `scrum_basico·2`, `marco_propio·3` |
| 3 | `q_dolor` | ¿Cuál es tu mayor dolor hoy? | What's your biggest pain point? | `claridad·1`, `velocidad·2`, `calidad·2`, `alineacion·3` |
| 4 | `q_urgencia` | ¿En cuánto tiempo necesitas resultados? | How urgently do you need results? | `90d·3`, `6m·2`, `12m·1`, `explorando·0` |
| 5 | `q_equipo` | ¿Cuántas personas impacta tu decisión? | How many people does your decision impact? | `solo_yo·0`, `2_10·1`, `11_50·2`, `50_plus·3` |
| 6 | `q_contacto` | Email + nombre + consent (no tiene weight; es el paso de captura PII descrito en FR-012) | — | — |

**Scoring:** suma de weights de pasos 1..5 → rango 0..15.

**Thresholds → nivel:**

| score | nivel_id | nivel_es | nivel_en |
|---|---|---|---|
| 0–4 | `explorer` | Explorador | Explorer |
| 5–9 | `builder` | Constructor | Builder |
| 10–15 | `strategist` | Estratega | Strategist |

**Recomendación (i18n, por nivel):**

| nivel_id | titulo_es | titulo_en | cta_id | cta_href |
|---|---|---|---|---|
| `explorer` | Empieza con recursos gratuitos | Start with free resources | `go_resources` | `/recursos/` |
| `builder` | Conoce nuestros programas para equipos | Explore our team programs | `go_personas` | `/personas/` |
| `strategist` | Agenda una sesión de estrategia | Book a strategy session | `go_empresas` | `/empresas/` |

**Regla de resultado:** al completar paso 6, el sistema calcula `score = sum(weights)`, mapea a `nivel_id`, resuelve `recomendacion` en el locale activo, persiste en `diagnostics/{uid}.resultado = {score, nivel, recomendacion, cta}` y muestra pantalla final con el CTA.

**Empates / edge cases:** si falta una respuesta (no debería: todos los pasos son obligatorios), el paso se bloquea hasta responder. No hay ponderación por combinaciones; es suma simple. Los thresholds son fijos en v1 (no se editan en 009).

---

## Success Criteria *(mandatory)*

### 5.1 Measurable Outcomes (con baselines declarados)

> **Nota**: Los SC marcados `[baseline: T-000 GA4 capture, 30-day window]` se miden contra un baseline GA4 capturado en la tarea T-000 del plan (últimos 30 días del home actual). El valor numérico se completa post-captura; el target (e.g., +2×) es fijo.

- **SC-001**: **CTR total** — ≥40% de visitas al home hacen clic en uno de los 3 CTAs `[baseline: T-000 GA4 capture, 30-day window, target +2×]`. *(Post-launch metric: measured via GA4 dashboard 30 days after deploy, not automatable in BDD.)*
- **SC-002**: **CTR diagnóstico** — ≥15% de visitas al home inician el diagnóstico `[baseline: T-000 GA4 capture, 30-day window]`. *(Post-launch metric: measured via GA4 dashboard 30 days after deploy, not automatable in BDD.)*
- **SC-003**: **Completion rate diagnóstico** — ≥60% de los diagnósticos iniciados terminan con lead registrado.
- **SC-004**: **Tiempo mediano de diagnóstico** — ≤3 minutos (medido desde `diagnostic_start` hasta `diagnostic_completed`).
- **SC-005**: **LCP** — ≤2.5s en 4G (Lighthouse throttled), ≤1.5s desktop cable, en xs/sm/md/lg/xl/2xl.
- **SC-006**: **Consistencia visual cartillas ↔ home** — ≥95% en auditoría lado-a-lado (mismos custom properties, mismos patrones componentes, mismo sistema tipográfico).
- **SC-007**: **Lighthouse** — ≥90 en Performance, Accessibility, Best Practices, SEO en mobile y desktop.
- **SC-008**: **Usabilidad** — ≥90% de usuarios en prueba moderada identifican los 3 caminos y eligen uno en ≤10 segundos. *(Manual moderated test, not automatable in BDD. Validated post-launch.)*

**Añadidos en v7 robustness pass (ver robustness-v1.md §F.5)**

- **SC-013**: **Toggle transition time** — cualquier cambio de locale, theme o audience MUST completar transición DOM en <100ms medido de click-event a next-paint (E2E Playwright `performance.now()`).
- **SC-014**: **Adaptive blueprint matrix** — el test parametrizado `tests/e2e/adaptive-blueprint.spec.js` MUST pasar **52/52** combinaciones (13 pages × 2 locale × 2 audience). Sin skips, sin flakes en 10 runs consecutivos.
- **SC-015**: **Zero raw i18n keys** — cero ocurrencias de keys crudas (`{pageSlug}.{slot}.{...}`) en el DOM renderizado de producción, en cualquier combinación. Enforced por aserción regex en cada E2E.
- **SC-016**: **13 páginas exactas** — el recuento físico de páginas canónicas (archivos `index.html` y `404.html` bajo root, excluyendo `dist/`, `node_modules/`, subdirectorios detail) MUST ser exactamente 13. Enforced por `scripts/count-pages.js` en pre-commit.
- **SC-017**: **Lead source traceability** — 100% de los leads escritos a `leads/{uid}` MUST tener un campo `fuente` no vacío mapeable a uno de los 3 CTAs (valores enumerados: `home-diagnostic`, `home-resource-premium`, `contact-form`, `insights-subscribe`, `diagnostic-mailto-fallback`). Verificado en `tests/integration/security-rules.spec.js`.
- **SC-018**: **Coverage floor** — el pipeline CI MUST enforzar los thresholds de NFR-008. Merge bloqueado si coverage global <85% o si un módulo pure <100%. *(CI gate, enforced by vitest.config.js thresholds, not BDD scenario.)*
- **SC-019**: **Backcasting closed loop** — cada FR del spec MUST tener trazabilidad explícita a ≥1 US, cada US a ≥1 SC, cada SC a ≥1 Constitution principle. Matriz verificable en robustness-v1.md §F.1-F.3, sin orphans. *(Process gate, verified by /iikit-06-analyze, not BDD scenario.)*
- **SC-009**: **Conversión total leads** — uplift ≥2× vs baseline en los primeros 30 días post-lanzamiento `[baseline: T-000 GA4 capture, 30-day window]`.
- **SC-010**: **Cobertura i18n** — 0 cadenas sin traducir en auditoría automática ES y EN.
- **SC-011**: **Matriz responsive** — 6/6 viewports (xs/sm/md/lg/xl/2xl) pasan el checklist de 12 puntos de US-5.
- **SC-012**: **Zero scroll horizontal** — test Playwright en los 6 viewports confirma ausencia de scroll horizontal.
- **SC-020**: **Touch targets** — 100% de elementos interactivos cumplen ≥44×44 px en xs/sm.
- **SC-021**: **CLS** — <0.1 en xs/sm/md/lg (Core Web Vitals).
- **SC-022**: **Contrast** — 100% de pares foreground/background pasan WCAG AA (≥4.5:1 normal, ≥3:1 large).

---

## 6. Constraints & Assumptions

### 6.1 Constraints

- **C-001**: Stack limitado a HTML/CSS/JS estático + Firebase client SDK (Hostinger sin Node runtime).
- **C-002**: No se introducen frameworks nuevos (React, Vue, Svelte) — se mantiene vanilla + Web Components.
- **C-003**: No se crean programas educativos nuevos — se reutilizan los existentes en `empresas/` y `personas/`.
- **C-004**: Paleta y tipografía fijas a tokens del design system gobernado por `CONSTITUTION.md §X`.
- **C-005**: Deployment vía git pull SSH en rama `main` (Constitution XX).
- **C-006**: Bundle Firebase SDK reutilizado — versión ya integrada en `js/cms/firebase-config.js`.

### 6.2 Assumptions

- **A-001**: Existe un baseline de GA4 del home actual capturable en T-000 del plan.
- **A-002**: Las cartillas en `workspace/2026-04-10-site-reconstruction/inputs/` son la fuente de verdad visual hasta que se migren a design system tokens oficiales.
- **A-003**: El catálogo de recursos en `recursos/` está operativo y los premium están marcados.
- **A-004**: La consola Firebase del proyecto permite crear colecciones `diagnostics/` y `leads/` con security rules bajo el modelo de sesión anónima.
- **A-005**: Los usuarios LatAm aceptan consent banner LGPD-light sin double opt-in.
- **A-006**: Feature `010-backoffice-cms` se ejecuta DESPUÉS de 009. Durante 009 las colecciones Firestore no-PII (`programs`, `resources`, `testimonials`, `pages`, `blocks`) se seedean manualmente (script en `scripts/seed.js`) o permanecen vacías con fallback a contenido estático en `js/i18n/dictionaries/` y páginas existentes en `empresas/`, `personas/`, `recursos/`.

---

## 7. Out of Scope

- **Backoffice CMS completo (FR-100..FR-120)** — movido a feature `010-backoffice-cms`. Incluye: schema registry, block editor, versioning, audit log, publish workflow, feature flags UI, experiments, asset upload pipeline, preview signed tokens, dashboard métricas, export CSV/JSON, i18n desde Firestore, schema migrations. 009 opera read-only sobre datos seedeados manualmente (A-006).
- **Deduplicación de leads por email** — los writes son append-only (FR-017). La reconciliación es scope de 010 (o feature posterior).
- Integración email marketing (Mailchimp, Brevo) — fuera del MVP, se hace en fase 2.
- A/B testing framework — la infraestructura se prepara (`variant` en eventos) pero no se lanzan experimentos en el v1.
- Nuevas páginas de programas educativos — solo reutilización.
- Migración del header/footer a light mode — esta feature afecta solo el home; el header/footer se adaptan en una feature subsecuente (`010-navigation-light-mode`).
- Service Worker / PWA offline — puede llegar en fase 2.
- Auto-traducción a nuevos idiomas — solo ES y EN.

---

## 8. Risks & Mitigations

| ID | Riesgo | Impacto | Probabilidad | Mitigación |
|---|---|---|---|---|
| R-01 | Dark mode del header/footer rompe al switchear a light mode en home | Alto | Alta | Scope dark-mode-header a feature separada `010-`, home usa its own theme scope via `body[data-theme]` |
| R-02 | Firebase Firestore quota exceeded en lanzamiento | Medio | Baja | Monitor cuota + fallback a formspree si >80% uso |
| R-03 | LCP degrada por fonts de Google en mobile 3G | Medio | Media | font-display:swap + inline critical CSS + self-host fonts en fase 2 |
| R-04 | Baseline GA4 no disponible → SC no mensurable | Alto | Media | T-000 en plan captura baseline antes del lanzamiento |
| R-05 | Visual drift entre home y cartillas tras updates de cartillas | Medio | Alta | Single source of truth en `estilos/tokens.css` referenciado por ambos |
| R-06 | Usuarios rechazan consent → eventos no se disparan | Medio | Media | Eventos esenciales (page_view) son cookieless; el resto requieren consent |
| R-07 | Touch targets fallan en iOS Safari por hit-area reducida | Medio | Media | hitSlop CSS padding invisible + test manual en 3 devices |
| R-08 | Spec ambigua en fase plan | Alto | Baja | Este documento v2 + `/iikit-clarify` siguiente ronda si surgen dudas |
| R-09 | Leads duplicados en Firestore por append-only (FR-017) degradan analítica | Medio | Media | Acepted en 009; reconciliación por email programada para feature 010; dashboard admin filtra por email más reciente hasta entonces |
| R-10 | Split 009/010 genera contenido estático stale que requiere redeploy | Medio | Media | Seed script en `scripts/seed.js` + convención "cambios de contenido requieren PR" durante la vida de 009; 010 rompe esa convención |

---

## 9. Architecture — Backend-for-Frontend (Firebase BaaS + Hostinger Static)

### 9.1 Principios

- **BaaS (Backend-as-a-Service)**: Firebase es el backend completo — Firestore (datos), Auth (identidad), Storage (assets), Analytics (eventos), App Check (anti-abuso), Remote Config (flags opcionales). Sin servidor propio.
- **Static frontend on Hostinger**: HTML/CSS/JS + Web Components desplegados vía git pull, consumiendo Firebase desde el cliente con security rules como control de acceso único.
- **BFF light = smart client**: el cliente implementa caché (stale-while-revalidate con IndexedDB), fallback estático, resolvedor dual-source, y lógica de presentación. No hay capa intermedia.
- **Schema-driven admin**: el backoffice en `/admin/` renderiza UI dinámica a partir de JSON Schemas en `settings/schemas/*`, permitiendo extender sin tocar código.
- **Content-as-data**: cada página del sitio es una composición ordenada de bloques reutilizables almacenados en Firestore. Editar = publicar.

### 9.2 C4 Level 1 — System Context

```mermaid
C4Context
  title System Context — MetodologIA Site v2

  Person(visitor, "Visitante", "B2C/B2B, LatAm, mobile-first")
  Person(lead, "Lead", "Visitante con diagnóstico completado")
  Person(editor, "Editor / Admin", "Javier + equipo contenido")

  System(site, "MetodologIA Site", "Home landing + catálogo + diagnóstico + backoffice CMS")

  System_Ext(firebase, "Firebase (Google)", "Firestore / Auth / Storage / Analytics / App Check")
  System_Ext(hostinger, "Hostinger", "Static hosting + CDN + SSL")
  System_Ext(ga, "Google Analytics", "GA4 complementario (opcional)")
  System_Ext(fonts, "Google Fonts", "Poppins / Montserrat")

  Rel(visitor, site, "Navega, explora, inicia diagnóstico", "HTTPS")
  Rel(lead, site, "Retoma diagnóstico, descarga recursos", "HTTPS + cookie")
  Rel(editor, site, "Gestiona contenido, precios, URLs", "HTTPS + Google Auth")
  Rel(site, firebase, "Lee/escribe datos, autentica, sube assets", "HTTPS + SDK")
  Rel(site, hostinger, "Servido estático", "HTTPS")
  Rel(site, ga, "Eventos (opcional)", "HTTPS")
  Rel(site, fonts, "Tipografías", "HTTPS")
```

### 9.3 C4 Level 2 — Container Diagram

```mermaid
C4Container
  title Container Diagram — MetodologIA Site v2

  Person(visitor, "Visitante")
  Person(editor, "Editor / Admin")

  System_Boundary(site, "MetodologIA Site") {
    Container(public, "Public Frontend", "HTML + CSS + Vanilla JS + Web Components", "Home, catálogos, diagnóstico, páginas dinámicas")
    Container(admin, "Backoffice CMS", "HTML + Vanilla JS + schema-driven forms", "Gestión sin código de productos, precios, páginas, traducciones")
    Container(shared, "CMS Client SDK", "ES modules en js/cms/*", "content-service, cache-manager, auth-service, admin-api, migration-bridge")
    ContainerDb(idb, "IndexedDB Cache", "idb", "Stale-while-revalidate cache, 7d TTL")
    Container(sw, "Service Worker", "JS", "Offline fallback, precache del shell")
  }

  System_Boundary(firebase, "Firebase BaaS") {
    ContainerDb(fs, "Firestore", "NoSQL", "products, pages, leads, diagnostics, audit, ...")
    Container(auth, "Firebase Auth", "OAuth + custom claims", "Google sign-in, admin/editor claims")
    ContainerDb(storage, "Firebase Storage", "Object store", "Assets: imágenes, PDFs")
    Container(analytics, "Firebase Analytics", "Events API", "Conversion funnel, device class, locale")
    Container(appcheck, "App Check", "Attestation", "reCAPTCHA Enterprise v3 anti-abuso")
    Container(rules, "Security Rules", "DSL", "Reglas declarativas por colección")
  }

  Rel(visitor, public, "Navega", "HTTPS")
  Rel(editor, admin, "Edita", "HTTPS + Google Auth")
  Rel(public, shared, "importa")
  Rel(admin, shared, "importa")
  Rel(shared, idb, "lee/escribe cache")
  Rel(shared, fs, "lee datos CMS publicados", "Firestore SDK")
  Rel(shared, auth, "autentica editores", "Auth SDK")
  Rel(admin, storage, "sube assets", "Storage SDK")
  Rel(shared, analytics, "dispara eventos", "Analytics SDK")
  Rel(shared, appcheck, "firma requests", "App Check SDK")
  Rel(fs, rules, "valida acceso")
  Rel(public, sw, "registra")
```

### 9.4 C4 Level 3 — Component Diagram (Public Frontend + CMS Client SDK)

```mermaid
flowchart TB
  subgraph PublicFrontend["Public Frontend (pages)"]
    Home["index.html — Home v2"]
    Diag["diagnostico/ — flujo 6 pasos"]
    Catalog["recursos/ — catálogo"]
    Dyn["dynamic-page.html — router de pages"]
    Components["Web Components: SiteHeader, SiteFooter, ThemeToggle, DiagnosticStepper, BlockRenderer"]
  end

  subgraph AdminFrontend["Backoffice CMS (/admin/)"]
    AdminShell["AdminShell"]
    EntityList["EntityList (schema-driven table)"]
    EntityForm["EntityForm (schema-driven form)"]
    BlockEditor["BlockEditor (drag & drop bloques)"]
    AssetLibrary["AssetLibrary (upload + preview)"]
    AuditViewer["AuditViewer"]
    DashboardPanel["Dashboard (metrics)"]
  end

  subgraph SDK["CMS Client SDK (js/cms/)"]
    Init["init.js — bootstrap"]
    ContentSvc["content-service.js — fetch + SWR"]
    CacheMgr["cache-manager.js — IndexedDB"]
    AuthSvc["auth-service.js — Google sign-in + claims"]
    AdminAPI["admin-api.js — writes + validation + audit"]
    Bridge["migration-bridge.js — dual-source (CMS↔static)"]
    SchemaReg["schema-registry.js — carga schemas dinámicos"]
    FlagsSvc["flags-service.js — feature flags"]
    ExpSvc["experiment-service.js — A/B assignment"]
    Analytics["analytics.js — eventos tipados"]
  end

  Home --> Bridge
  Home --> Components
  Home --> FlagsSvc
  Home --> ExpSvc
  Home --> Analytics
  Diag --> ContentSvc
  Diag --> AdminAPI
  Diag --> Analytics
  Catalog --> ContentSvc
  Dyn --> ContentSvc
  Dyn --> SchemaReg

  AdminShell --> AuthSvc
  EntityList --> ContentSvc
  EntityForm --> SchemaReg
  EntityForm --> AdminAPI
  BlockEditor --> AdminAPI
  AssetLibrary --> AdminAPI
  AuditViewer --> ContentSvc
  DashboardPanel --> ContentSvc

  ContentSvc --> CacheMgr
  ContentSvc --> Bridge
  AdminAPI --> AuthSvc
  Init --> ContentSvc
  Init --> AuthSvc
  Init --> FlagsSvc
```

### 9.5 Data Model — Firestore Collections

```
firestore/
├── products/{productId}             # bootcamps, workshops, courses
├── services/{serviceId}             # consultoría, auditoría
├── programs/{programId}             # extiende products
├── pricing/{pricingId}              # precios multi-moneda
├── pages/{pageSlug}                 # páginas del sitio
├── blocks/{blockId}                 # bloques reutilizables
├── assets/{assetUuid}               # metadata imágenes/PDFs
├── resources/{resourceId}           # catálogo recursos
├── testimonials/{testimonialId}
├── translations/{locale}/ns/{key}
├── flags/{flagKey}
├── experiments/{expId}
├── seo/{pageSlug}
├── leads/{leadUid}                  # PII — write own only
├── diagnostics/{diagUid}            # PII — write own only
├── audit/{eventId}                  # immutable
├── settings/
│   ├── schemas/{entity}             # JSON Schemas descriptores
│   ├── migrations/{version}         # migraciones declarativas
│   └── config/global                # nombre sitio, idiomas, dominios
└── {entity}_versions/{id}/{vId}     # historial de cambios
```

### 9.6 Security Rules (resumen declarativo)

| Colección | Lectura | Escritura |
|---|---|---|
| `products`, `services`, `programs`, `pricing`, `pages`, `blocks`, `resources`, `testimonials`, `translations`, `flags`, `experiments`, `seo`, `assets` | pública si `status==published` | solo `admin==true` o `editor==true` |
| `leads/{uid}`, `diagnostics/{uid}` | solo el uid dueño o `admin==true` | crear: solo el uid autenticado anónimamente (session match); update: solo dueño; delete: deny |
| `audit/{eventId}` | solo `admin==true` | server-write only (triggered por Cloud Function si aparece) — en MVP write desde admin client con validación estricta |
| `settings/schemas/{entity}` | pública (necesaria para admin) | solo `admin==true` |
| `{entity}_versions/{id}/{vId}` | solo `admin==true` | solo `admin==true` al hacer update |

### 9.7 Deployment Topology

```
┌─────────────────────┐       git pull        ┌─────────────────────┐
│  GitHub origin/main │───────────────────────▶│  Hostinger VPS      │
│  (CI lint+test)     │                        │  /public_html/      │
└─────────────────────┘                        │  + CDN + SSL        │
                                               └──────────┬──────────┘
                                                          │ HTTPS
                                                          ▼
                                               ┌─────────────────────┐
                                               │     Visitante       │
                                               └──────────┬──────────┘
                                                          │ Firebase SDK
                                                          ▼
                                               ┌─────────────────────┐
                                               │  Firebase (Google)  │
                                               │  Firestore + Auth + │
                                               │  Storage + Analytics│
                                               │  + App Check        │
                                               └─────────────────────┘
```

---

## 10. Sequence Diagrams — Flujos Críticos

### 10.1 Visita inicial al home (public read path)

```mermaid
sequenceDiagram
  autonumber
  participant V as Visitante
  participant H as Hostinger CDN
  participant I as index.html
  participant SW as ServiceWorker
  participant B as migration-bridge
  participant CM as cache-manager (IDB)
  participant CS as content-service
  participant FS as Firestore
  participant AN as Analytics

  V->>H: GET /
  H-->>V: HTML + critical CSS inline
  V->>SW: register
  V->>I: bootstrap JS
  I->>B: resolvePage("home")
  B->>CM: cache.get("pages/home")
  alt cache hit fresh
    CM-->>B: page doc
    B-->>I: render blocks
  else stale
    CM-->>B: stale doc
    B-->>I: render stale (SWR)
    B->>CS: fetch fresh
    CS->>FS: get pages/home where status=published
    FS-->>CS: page doc
    CS->>CM: cache.put
    CS-->>B: fresh doc
    B-->>I: re-render if diff
  else miss
    B->>CS: fetch
    CS->>FS: get pages/home
    FS-->>CS: page doc
    CS->>CM: cache.put
    CS-->>B: doc
    B-->>I: render
  end
  I->>AN: event home_view {locale, deviceClass, source}
```

### 10.2 Completar diagnóstico (write path con App Check)

```mermaid
sequenceDiagram
  autonumber
  participant V as Visitante
  participant D as diagnostico page
  participant LS as localStorage
  participant AC as AppCheck
  participant AU as FirebaseAuth
  participant FS as Firestore
  participant AN as Analytics

  V->>D: click "Iniciar diagnóstico"
  D->>LS: init state {step:1}
  AN-->>V: diagnostic_start

  loop pasos 1..5
    V->>D: responder paso
    D->>LS: persist answers
    AN-->>V: diagnostic_step_N
  end

  V->>D: paso 6 (email + nombre + consent)
  D->>AU: signInAnonymously()
  AU-->>D: uid anónimo
  D->>AC: getToken()
  AC-->>D: appCheckToken
  D->>FS: create leads/{uid} {email,name,segment,locale,consent}
  FS-->>D: ok
  D->>FS: create diagnostics/{uid} {leadUid,steps,resultado}
  FS-->>D: ok
  D->>LS: clear in-progress
  D->>V: set cookie mdg_returning=sha256(email)
  AN-->>V: diagnostic_completed
  D-->>V: show result + next CTA
```

### 10.3 Editor publica un cambio de precio

```mermaid
sequenceDiagram
  autonumber
  participant E as Editor
  participant A as /admin/ UI
  participant AU as FirebaseAuth
  participant SR as schema-registry
  participant AA as admin-api
  participant FS as Firestore
  participant AUD as audit
  participant VER as pricing_versions

  E->>A: login con Google
  A->>AU: signInWithPopup
  AU-->>A: idToken + claims {editor:true}
  E->>A: abrir Pricing → P-042
  A->>FS: get pricing/P-042
  FS-->>A: doc v7
  A->>SR: getSchema("pricing")
  SR-->>A: schema
  A->>E: render form con schema
  E->>A: edita amount 1200→1350 USD
  A->>A: validate contra schema
  E->>A: click "Publicar"
  A->>AA: update("pricing","P-042", before, after)
  AA->>FS: update pricing/P-042 (v8)
  FS-->>AA: ok
  AA->>VER: create pricing_versions/P-042/v8 {snapshot,diff,author}
  AA->>AUD: create audit/{eventId} {actor,action:update,entity:pricing,before,after}
  AA-->>A: ok
  A-->>E: toast "Publicado"
  Note over FS: clientes consumen nuevo precio<br/>en siguiente fetch (SWR ≤60s)
```

### 10.4 Rollback de una página

```mermaid
sequenceDiagram
  autonumber
  participant E as Admin
  participant A as /admin/ UI
  participant FS as Firestore
  participant VER as pages_versions
  participant AUD as audit

  E->>A: abre pages/home historial
  A->>VER: list pages_versions/home
  VER-->>A: [v12,v11,v10,...]
  E->>A: click "Restaurar v11"
  A->>VER: get pages_versions/home/v11
  VER-->>A: snapshot v11
  A->>A: confirm dialog
  E->>A: confirmar
  A->>FS: update pages/home = snapshot v11 (bumped v13)
  A->>VER: create pages_versions/home/v13 {restoredFrom:v11}
  A->>AUD: audit {action:"restore",from:v11,to:v13}
  A-->>E: toast "Restaurado"
```

---

## 11. BPMN Functional Flows

### 11.1 Flujo: Captura de Lead vía Diagnóstico

```mermaid
flowchart LR
  S((Start: Visitante llega al home)) --> A{¿Tiene cookie<br/>mdg_returning?}
  A -- sí --> A1[Mostrar CTA<br/>"Continuar tu ruta"]
  A -- no --> A2[Mostrar CTA<br/>"Iniciar diagnóstico"]
  A1 --> B[Restaurar estado<br/>desde localStorage]
  A2 --> C[Click CTA]
  B --> D[Flujo diagnóstico<br/>6 pasos]
  C --> D
  D --> E{¿Visitante<br/>completa?}
  E -- abandona --> F[Persistir estado<br/>en localStorage 24h]
  F --> G[Evento diagnostic_abandoned]
  G --> Z1((End: visitante sale))
  E -- completa --> H[Paso final:<br/>email + nombre + consent]
  H --> I{¿Consent<br/>aceptado?}
  I -- no --> J[Mostrar explicación<br/>+ mailto fallback]
  J --> Z2((End: lead no capturado))
  I -- sí --> K[signInAnonymously]
  K --> L[Crear leads/uid<br/>en Firestore]
  L --> M[Crear diagnostics/uid<br/>en Firestore]
  M --> N[Setear cookie<br/>mdg_returning]
  N --> O[Mostrar resultado<br/>+ CTA siguiente]
  O --> P[Evento diagnostic_completed]
  P --> Z3((End: lead cualificado))
```

### 11.2 Flujo: Publicación de Contenido desde el Backoffice

```mermaid
flowchart LR
  S((Start: Editor quiere cambio)) --> A[Login Google]
  A --> B{¿Claim<br/>editor/admin?}
  B -- no --> B1[Denegar + mensaje]
  B1 --> Z1((End: denegado))
  B -- sí --> C[Abrir /admin/]
  C --> D[Seleccionar entidad<br/>products|pages|pricing|...]
  D --> E[Cargar schema<br/>desde settings/schemas]
  E --> F[Cargar doc actual<br/>desde Firestore]
  F --> G[Editar en form<br/>schema-driven]
  G --> H[Validación client-side]
  H --> I{¿Valida?}
  I -- no --> G
  I -- sí --> J{¿Estado<br/>destino?}
  J -- draft --> K[Guardar draft]
  J -- in-review --> L[Asignar reviewer<br/>+ notificar]
  J -- scheduled --> M[Guardar con publishAt futuro]
  J -- published --> N[Publicar ahora]
  K --> O[Crear version snapshot]
  L --> O
  M --> O
  N --> O
  O --> P[Escribir audit event]
  P --> Q[Invalidar cache<br/>en clientes SWR]
  Q --> R[Toast confirmación]
  R --> Z2((End: cambio live))
```

### 11.3 Flujo: Resolución Dual-Source (CMS ↔ Static Fallback)

```mermaid
flowchart LR
  S((Start: página necesita dato)) --> A[content-service.fetch key]
  A --> B[cache-manager.get]
  B --> C{¿Hit?}
  C -- fresh<br/>≤60s --> C1[Return cache]
  C -- stale<br/>>60s ≤7d --> C2[Return stale + trigger refetch]
  C -- miss --> D[Firestore fetch]
  C2 --> D
  D --> E{¿Firestore<br/>responde?}
  E -- sí 200 --> F[Validar contra schema]
  F --> G{¿Valida?}
  G -- sí --> H[Update cache]
  H --> I[Return fresh data]
  G -- no --> J[Log error<br/>mantener stale]
  J --> K{¿Hay<br/>stale?}
  K -- sí --> K1[Return stale]
  K -- no --> L[Return static fallback<br/>desde js/i18n/*]
  E -- no<br/>offline/error --> K
  C1 --> Z((End: dato entregado))
  I --> Z
  K1 --> Z
  L --> Z
```

---

## 13. Adaptive Blueprint (3-axis toggles + homogeneous shell)

Todas las 13 páginas (sitemap §2) comparten un único **blueprint homologado** cuyos slots se adaptan declarativamente a la combinación activa de 3 toggles globales: **Locale** (ES/EN), **Theme** (light/dark), **Audience** (persona/empresa/unknown). Theme afecta solo tokens CSS (ortogonal al contenido); Locale + Audience afectan copy vía cascada de fallback.

La especificación completa — FRs FR-240..FR-253 *(v8, reemplazan FR-200..FR-232 [SUPERSEDED])*, diagrama de shell con sidebar + triple toggle, slots canónicos, cascada de resolución, provenance de audience state, test plan parametrizado 52 combinaciones — vive en **[adaptive-blueprint.md](./adaptive-blueprint.md)** y es input obligatorio de `plan.md` y `data-model.md`. Las entidades nuevas (`AudienceState`, `ContentSlot`) se integran a §4.3 Key Entities; los FRs se integran a §4.1 tras FR-099b.

Este es el patrón "single blueprint, adaptive slots": un shell con sidebar de 7 secciones + triple toggle bottom-left, 8 combinaciones (2×2×2), cero páginas duplicadas. Los dos únicos nodos con audiencia intrínseca (`/empresas/`, `/personas/`) siguen siendo páginas separadas (decision Sitemap §5 Q1) pero exponen el toggle global como "switch to the other" (FR-245, ex-FR-206 [SUPERSEDED]).

---

## 12. Clarifications

### Session 2026-04-14 (v7 — robustness pass: TDD/ATDD, 85% coverage, independent flows, backwards trace)

- Q: ¿Cómo endurecer el spec antes de `/iikit-04-testify` para evitar que un test débil enmascare bugs? → A: **Robustness pass v1** con ciclo TDD/ATDD explícito, schemas de unit tests, contrato de cobertura 85% weighted layered, 10 flows independientes black-box aportados por el asistente, y backcasting inverso FR→US→SC→Constitution. Todo documentado en `robustness-v1.md`. [NFR-007..NFR-013, SC-013..SC-019, US-6 y US-7 nuevas para cubrir orphans FR-200..FR-232]
- Q: ¿85% de cobertura es el número correcto? → A: Sí pero **weighted layered**: pure modules 100%, logic 95%, controllers 80%, global weighted ≥85%. Mutation testing opcional post-merge con Stryker sobre pure modules. [NFR-008]
- Q: ¿TDD y ATDD? → A: **Complementarios, no excluyentes**. ATDD outer loop (`.feature` files from US), TDD inner loop (unit tests from module needs). Pattern: red acceptance → red unit → green unit → green acceptance → refactor. [NFR-007, NFR-009, robustness-v1.md §B]
- Q: ¿Mocks o emulator en integration tests? → A: **Hybrid declarado**. Security rules + auth = solo emulator. Network failures + analytics = solo mocks. [NFR-011]
- Q: ¿Cómo prevenir "test theater"? → A: Header de trazabilidad obligatorio en cada `.spec.js` con `@covers`, `@story`, `@success` tags; pre-commit hook rechaza tests sin header. Mutation testing opcional como segunda capa. [NFR-010]
- Q: ¿Cómo cubrir flujos emergentes que no están en FRs? → A: El asistente aporta **10 flujos black-box** (LinkedIn B2B, mobile flaky, keyboard a11y, SEO crawler, LGPD audit, theme chaos, dev onboarding, content editor, cache poisoning, social share) como QA independiente. Cada flow se materializa como test adicional. [NFR-013, robustness-v1.md §E]
- Q: ¿Hay FRs huérfanos sin User Story? → A: **Sí — 15 FRs (FR-097..099b, FR-200..FR-232) eran orphans**. Corrección: añadir **US-6** (blueprint adaptativo) y **US-7** (sitemap 13 páginas) para cerrar el loop. Backcasting §F.4 detalla scenarios. [US-6, US-7, SC-013..SC-019]

### Session 2026-04-14 (v6 — adaptive blueprint integration)

- Q: ¿Cómo unificar EN/ES + light/dark + personas/empresas en una experiencia de un click? → A: **Three-axis adaptive blueprint** — shell único con 3 toggles globales en el header (locale, theme, audience), slots declarativos con cascada de fallback (audience × locale), theme ortogonal (solo CSS). Las 13 páginas heredan el shell; `/empresas/` y `/personas/` mantienen audiencia intrínseca pero con affordance para cambiar. [nueva §13, nueva adaptive-blueprint.md, FR-200..FR-232, AudienceState y ContentSlot entities, nuevo principio candidato Constitution XXIV ver backcasting.md]
- Q: ¿El audience state se persiste a Firestore? → A: **No** — es puramente client-side (localStorage + cookie opcional). Nunca se escribe a `leads/{uid}` excepto cuando el diagnóstico infiere `segmento` como parte del flujo PII existente (FR-013). Mantiene el principio XXII PII-Append-Only intacto.
- Q: ¿Theme puede afectar contenido (ej. logo inverso)? → A: **No** — invariante del blueprint: theme afecta exclusivamente tokens CSS. Cualquier asset dependiente de theme se resuelve por CSS (`var(--logo-url)`), nunca por JS/content. Esto garantiza ortogonalidad 2×2×2 sin combinatoria de copy.

### Session 2026-04-14 (v5 — post-Constitution v7 alignment)

- Q: ¿Qué pasa si el usuario rechaza el banner LGPD-light de Analytics? → A: **Two-tier consent** — reject bloquea SOLO eventos Analytics (ni siquiera `home_view`); el home renderiza normalmente; el diagnóstico funciona end-to-end porque la captura de PII está gateada por el checkbox explícito de FR-012, independiente del banner y necesario para entregar el servicio (mostrar resultado personalizado). Alineado con Constitution v7 XXII. [FR-072 actualizado; FR-012; XXII]

### Session 2026-04-14 (v4 — /iikit-clarify plan-readiness pass)

- Q: ¿Mantener el backoffice CMS (FR-100..FR-120) en esta feature o dividir? → A: **Split** — 009 se reduce a home + diagnóstico + consumo de `js/cms/` existente; los FR-100..FR-120 se mueven a feature nueva `010-backoffice-cms`. Razón: US-1..US-5 entregan valor independientes del CMS; partir reduce el plan a tamaño sprint y respeta phase discipline. [FR-100..FR-120 → mover a 010; §7 Out of Scope actualizado; §9/§10/§11 secciones CMS marcadas "coverage en 010"]
- Q: ¿Lógica del diagnóstico (6 pasos + scoring + nivel + recomendación)? → A: **Declarativa en spec §4.4** — tabla de datos (preguntas, opciones, pesos, thresholds, recomendación i18n) dentro de spec.md para que TDD pueda escribir `.feature` scenarios contra ella sin decidir en plan. [nueva §4.4 "Diagnóstico Logic"; FR-011, FR-012, US-1]
- Q: ¿Estado default del flag `cms-i18n` al lanzar 009? → A: **OFF** — 009 lanza con dictionaries estáticos de `js/i18n/` como única fuente; `migration-bridge` sigue soportando dual-source pero no lee Firestore `translations/` hasta que 010 active el flag. Razón: cero acoplamiento con 010, 009 shippable independiente. [FR-107 actualizado; A-006 nuevo]
- Q: ¿Qué hacer con leads/diagnostics cuando email existente colisiona en anonymous auth? → A: **Append-only** — cada completion crea docs nuevos `leads/{uid}` y `diagnostics/{uid}`; la deduplicación por email se difiere a una reconciliación admin en 010 (o posterior). Razón: anonymous uids son device-scoped; merging requiere leer across-uids y romper security rules. [FR-017 nuevo; NFR-005; US-1; risk R-09 nuevo]
- Q: ¿Cómo reconciliar "inline critical CSS" (FR-092) con "reusar `dist/output.css` sin nuevas deps" (FR-095)? → A: **Hand-authored `estilos/critical.css`** inlined en `<style>` del `<head>` (tokens + hero + CTA + above-the-fold typography) + `dist/output.css` diferido vía `media="print"` + `onload`. Cero dependencias nuevas, control manual sobre una sola página. [FR-092 actualizado; FR-095 mantenido; nuevo FR-096]

### Session 2026-04-14 (v3 — BFF architecture + Backoffice CMS + C4/BPMN)

- Q: ¿Backend dedicado o BaaS? → A: Firebase BaaS (Firestore + Auth + Storage + Analytics + App Check), cero servidor propio [§9.1, NFR-001]
- Q: ¿CMS propio o headless externo? → A: CMS propio schema-driven sobre Firestore, reutilizando `js/cms/` y `/admin/` ya existentes, extendido con schema registry + block editor + asset library + versioning + audit + flags + experimentos [FR-100..FR-120]
- Q: ¿Modelo de páginas? → A: Content-as-data — cada página es composición ordenada de bloques reutilizables, editable sin código [FR-103, FR-104]
- Q: ¿URLs editables? → A: Sí — campo `path` en `pages/{slug}` + array `redirects` resuelto por router client-side [FR-105]
- Q: ¿Multi-moneda en precios? → A: Sí — `pricing/{id}` soporta COP/USD/MXN/EUR con vigencias [FR-106]
- Q: ¿Traducciones en Firestore o estáticas? → A: Híbrido con flag `cms-i18n` — Firestore cuando esté activo, estático como fallback [FR-107]
- Q: ¿Versionado y rollback? → A: Sí, snapshot por versión en `{entity}_versions/{id}/{vId}` + UI de historial [FR-108]
- Q: ¿Audit log inmutable? → A: Sí, en colección `audit/` con hash antes/después, solo lectura admin [FR-109]
- Q: ¿Workflow de publicación? → A: Sí — draft/in-review/scheduled/published/archived con roles vía custom claims [FR-110]
- Q: ¿Upload de assets? → A: Firebase Storage + transformación client-side (Canvas WebP) antes de subir [FR-111]
- Q: ¿Preview de drafts? → A: Sí, modo `?preview={token}` firmado [FR-112]
- Q: ¿Dashboard de métricas en admin? → A: Sí, live queries sobre leads/diagnostics/audit [FR-113]
- Q: ¿Export de datos? → A: JSON y CSV desde admin [FR-114]
- Q: ¿Feature flags y A/B? → A: Sí, colecciones `flags/` y `experiments/` consumidas por el home [FR-115, FR-116]
- Q: ¿Anti-abuso? → A: Firebase App Check (reCAPTCHA Enterprise v3) sobre writes PII [§9.2]
- Q: ¿Diagramas requeridos? → A: C4 L1+L2+L3 (Mermaid), sequence (4 flujos críticos), BPMN (3 flujos funcionales), topology deployment [§9, §10, §11]

### Session 2026-04-14 (v2 Socratic refinement)

- Q: ¿Tres CTAs iguales o pirámide de intención? → A: Pirámide con diagnóstico dominante [US-1, US-2, US-3, FR-001, FR-002]
- Q: ¿Identidad presente (dark) o futura (Neo-Swiss Light)? → A: Neo-Swiss Light default + Dark mirror toggle [US-4, FR-041, FR-042, FR-045]
- Q: ¿Stack para Hostinger? → A: HTML/CSS/Vanilla JS + Web Components + Firebase client SDK, cero runtime server [NFR-001, NFR-002, C-001, C-002]
- Q: ¿Qué significa "responsive nativo"? → A: 6 viewport classes (xs/sm/md/lg/xl/2xl) con diseños específicos y fluid scale [US-5, FR-050..FR-057]
- Q: ¿Datos mínimos del diagnóstico? → A: Email + nombre + consent [FR-012]
- Q: ¿Persistencia del diagnóstico? → A: localStorage in-progress (24h), Firestore completed, cookie `mdg_returning` (180d) [FR-013, FR-014, FR-016, US-1 scenarios 5-6]
- Q: ¿Analytics vendor? → A: Firebase Analytics (ya integrado) [FR-070, FR-071, FR-072]
- Q: ¿Programas educativos nuevos o existentes? → A: Reutilizar existentes en `empresas/` y `personas/` [FR-030..FR-032, C-003]
- Q: ¿Baseline de SC? → A: Marcado como [BASELINE-TBD], capturado en T-000 del plan [SC-001, SC-002, SC-009, A-001]
- Q: ¿Recurso premium double opt-in? → A: No, solo email + nombre [FR-022]
- Q: ¿Modo oscuro persistente? → A: Sí, localStorage + prefers-color-scheme fallback [FR-045]
- Q: ¿Consent LGPD/GDPR? → A: Banner light, checkbox obligatorio en diagnóstico, cookie `mdg_consent` [FR-012, FR-072]

### Session 2026-04-20 (v7 — /iikit-clarify)

- Q: ¿Manejo de baselines marcados como [BASELINE-TBD] en los SC? → A: Opción A. Capturar de GA4 en la Fase 1 como tarea técnica previa (T-000) antes de implementar, para asegurar precisión. [SC-001, SC-002, SC-009, A-001]

### Session 2026-04-21 (v8 — /iikit-clarify score hardening, spec + plan)

- Q: ¿SC-013, SC-014, SC-015 duplicados entre robustness block y bloque original? → A: Renumerar originales a SC-020 (Touch targets), SC-021 (CLS), SC-022 (Contrast). Robustness keeps SC-013..SC-015 (toggle, blueprint, raw keys). [SC-013, SC-014, SC-015, SC-020, SC-021, SC-022]
- Q: ¿Formalizar `[BASELINE-TBD]` en texto de los SC? → A: Reemplazar con `[baseline: T-000 GA4 capture, 30-day window]` inline en cada SC afectado, documentando la estrategia de resolución dentro del propio criterio. [SC-001, SC-002, SC-009, §1.8, §5.1]
- Q: ¿FR-100..FR-120 listados en detalle MUST-level pese a ser scope 010? → A: Colapsar a tabla de trazabilidad (ID + título + scope 010), eliminando lenguaje MUST de 009. Preserva linkage cross-feature sin ruido de auditoría. [FR-100..FR-120, §4.1, §7]
