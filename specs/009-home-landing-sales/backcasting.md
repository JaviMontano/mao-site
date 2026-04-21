# Backcasting — Constitution ↔ Spec (009) v2

**Purpose**: Trazabilidad bidireccional entre `CONSTITUTION.md` v7.0.0 y los spec artifacts de 009 v8 (spec.md, plan.md, sitemap.md, adaptive-blueprint.md, tasks.md). Actualizado para la **sidebar architecture v8**: sidebar de 7 secciones + triple toggle fixed bottom-left + admin content editor Firestore-backed.

**Version**: v2 (v1 + sidebar architecture + triple toggle relocation + admin content editor + 17 legacy redirects)

---

## Direction 1 — Constitution → Spec (forward pass)

**Question**: ¿Qué principios constitucionales **exigen** algo de la sidebar architecture v8, y cómo los materializamos como FRs?

| Constitution v7 principle | Exigencia sobre v8 architecture | Dónde se materializa en 009 v8 | Status |
|---|---|---|---|
| **I. BaaS-First, Zero Server** | Sidebar, triple toggle y admin editor MUST ser client-side. Admin escribe a Firestore, no a server propio. | Admin editor → Firestore `slots/{pageSlug}` (FR-250..FR-253). Triple toggle client-only (FR-245..FR-249). Zero server runtime. | ✅ cubierto |
| **II. Accessibility-First** | Sidebar MUST ser keyboard-navigable. Triple toggle MUST usar `role="switch"` con `aria-checked`. Screen readers MUST anunciar cambios. Touch targets ≥44px. | FR-249 (keyboard + aria-live), FR-248 (touch targets), FR-240 (sidebar ARIA landmark), FR-243 (scroll-spy). SiteHeader.js con hamburger `aria-expanded`. | ✅ cubierto |
| **III. SEO Integrity** | El sidebar NO afecta URLs canónicas. 13 páginas con sitemap.xml. Legacy redirects son 301. | FR-242 (header 3 nav), sitemap.md (12 URLs), .htaccess (17 RewriteRule 301s), scripts/generate-sitemap-xml.js | ✅ cubierto |
| **IV. Component Consistency** | Triple toggle es UN componente (`TripleToggle.js`). Sidebar es UN componente (`SiteSidebar.js`). Header simplificado. Todos usan tokens de `variables.css`. | FR-245 (TripleToggle WC), FR-240 (SiteSidebar WC), FR-242 (SiteHeader simplificado). Tokens compartidos. | ✅ cubierto |
| **V. Brand Separation** | MetodologIA single brand. Admin UI no expone branding interno. | N/A — todo es MetodologIA. Admin en `/admin/` es internal-only. | ✅ N/A |
| **VI. Cloud-First + Static Fallback** | Admin escribe a Firestore; site lee via migration-bridge.js; fallback a JSON estático si Firestore down. | FR-252 (fallback explícito), FR-251 (Firestore schema), plan.md v7 clarification. | ✅ cubierto |
| **VII. Secure by Default** | Admin write requires custom claim. Public read gated by `status=='published'`. App Check en PII writes. | FR-253 (admin custom claim), FR-248 (security rules slots/), contracts/firestore-rules.md ampliado. | ✅ cubierto |
| **VIII. SWR + Offline UX** | Offline pill MUST ser visible independiente de sidebar y triple toggle. No debe ser obstruida. | FR-099b v8 (pill en header/main, no overlap con sidebar/toggle). OfflinePill.js independiente de SiteSidebar. | ✅ cubierto |
| **IX. TDD** | 107 BDD scenarios hash-locked. Tests antes de implementación en cada phase de tasks.md. | 9 .feature files, testify hash locked. Tasks.md v3.1 ordena tests primero en cada phase. NFR-007. | ✅ cubierto |
| **X. Design System Governance** | Sidebar, triple toggle y admin UI usan tokens CSS canónicos. No tokens nuevos. | FR-240 usa `--sidebar-w`, `--header-h` (nuevos en variables.css pero son layout, no design). Todos los colores usan tokens existentes. | ✅ cubierto |
| **XI. Brand Voice Integrity** | 4 variantes de copy (ES×persona, ES×empresa, EN×persona, EN×empresa) MUST preservar voz de marca. Admin editor facilita pero no garantiza voice. | FR-046 (brand voice audit manual por PR). T092 (brand voice audit task). Admin editor escribe; humano audita. | ✅ cubierto |
| **XII. Code Sustainability** | Nuevos módulos con nombres business-readable. Domain-organized. | `SiteSidebar.js`, `TripleToggle.js`, `scroll-spy.js`, `sections-config.js`, `content-editor.js`. Todo claro. | ✅ cubierto |
| **XIII. Think First** | Sidebar architecture derivada de Socratic debate con panel UX+Producto+Tech. 3 sesiones documentadas. | plan.md v7 clarifications (3 sessions), backcasting.md (este archivo). | ✅ cubierto |
| **XIV. Simple First** | Admin editor es la mínima CMS viable (4 textareas, zero schema registry). Sidebar usa IntersectionObserver nativo (no library). Triple toggle son 3 `<button>` con `role="switch"`. | Plan v7 clarification Q7 justifica scope bounded. scroll-spy.js ~40 líneas. TripleToggle.js ~150 líneas. | ✅ cubierto (justified) |
| **XV. BDD Full-Spectrum** | Scenarios cubren sidebar (TS-093..099), triple toggle (TS-043..049 v8), admin (TS-100..107). Multi-ángulo: UX, a11y, security, perf. | 9 .feature files, 107 scenarios. us-6 (sidebar+toggle), us-8 (admin), cross-cutting (a11y+perf). | ✅ cubierto |
| **XVI. Sequential-First** | Leaf modules primero (scroll-spy, sections-config, bus, toggle), luego componentes, luego shell, luego páginas. WIP ≤3. | Tasks.md v3.1 Phase 2 (7 leaf modules) → Phase 4 (components) → Phase 5-6 (pages). | ✅ cubierto |
| **XVII. Continuous Learning** | Patrón sidebar architecture MUST archivarse en insights/ post-merge. | Pendiente `insights/sidebar-architecture-pattern.md` post-merge. | ⏳ pendiente post-merge |
| **XVIII. Indexable Repo** | Nuevos dirs (`js/sidebar/`) requieren README. | Plan structure lists all new dirs. README auto-generation post-implement. | ✅ cubierto |
| **XIX. Bug Protocol** | N/A (new feature). | — | N/A |
| **XX. Branch-to-Environment** | feature → staging → main → production via SSH. | Unchanged. Branch `009-home-landing-sales`. | ✅ cubierto |
| **XXI. Zero Hardcoding** | 84 section labels en i18n (168 keys). Copy en dictionaries. Admin custom claim from env. | FR-244 (section i18n keys), FR-251 (slot variants in Firestore), plan.md. Zero hardcoded strings. | ✅ cubierto |
| **XXII. PII-Append-Only** | `slots/` NO es PII. leads/ y diagnostics/ unchanged (append-only). | FR-253 clarifies slots/ is non-PII content. Existing PII contracts untouched. | ✅ cubierto |
| **XXIII. Feature-Bounded** | Solo `slots/{pageSlug}` añadido. Full backoffice deferred to 010. 13 pages hard constraint. | Plan v7 §Scope Boundary. FR-250..FR-253 scoped to content editing only. | ✅ cubierto |

### Direction 1 — gaps

**0 gaps.** Todos los principios cubiertos. Los 2 gaps de v1 (FR-099b y FR-046) ya fueron resueltos en spec.md v8.

---

## Direction 2 — Spec → Constitution (reverse pass)

### Propuesta de amendment — Constitution v7.1.0 (XXIV)

La propuesta de v1 sigue vigente con actualización para v8:

> **XXIV. Adaptive Blueprint Personalization**
>
> Cada página pública del sitio MUST renderizarse desde un **shell único** con:
> - **Sidebar izquierdo** con 7 secciones numeradas por página y scroll-spy (≥960px: fixed, <960px: drawer).
> - **Triple toggle** siempre visible fixed bottom-left para 3 ejes ortogonales:
>   - **Locale** (`es`/`en`): afecta texto vía `data-i18n` + diccionarios externos.
>   - **Theme** (`light`/`dark`): afecta exclusivamente tokens CSS. **NUNCA** afecta contenido.
>   - **Audience** (`persona`/`empresa`/`unknown`): afecta copy, proof, CTAs y filtros vía slots tipados.
> - **Header simplificado**: logo + 3 nav (Ruta, Servicios, Contacto). Sin toggles.
> - **Admin content editor**: cada text slot editable en 4 variantes (2 locales × 2 audiences) via Firestore-backed UI.
>
> **Invariantes**:
> 1. **Ortogonalidad**: theme es CSS-only; locale + audience son content-only.
> 2. **Shell homologado**: todas las páginas comparten skeleton (`<html data-theme data-audience>`, `<site-header>`, `<site-sidebar>`, `<triple-toggle>`, `<main data-page-slug>`, `<site-footer>`).
> 3. **7 secciones por página**: cada página (excl. 404) define exactamente 7 `<section id>` navegables via sidebar scroll-spy.
> 4. **Cascada de fallback**: 5 niveles. Ninguna key cruda en DOM de producción.
> 5. **Instantaneidad**: toggle <100ms sin reload.
> 6. **Client-only state**: locale/theme/audience en localStorage. Ninguno es PII.
> 7. **Triple toggle siempre visible**: `position: fixed; bottom: 1rem; left: 1rem;` independiente del sidebar.
> 8. **Cobertura verificable**: test E2E parametrizado (N pages × 2 locale × 2 audience), sin skips.

**Status**: Propuesta. Requiere aprobación explícita del usuario.

---

## 3. Consolidation — changes from backcasting v2

### 3.1 Direction 1 gaps → ZERO

Todos los gaps de v1 ya fueron resueltos:
- [x] FR-099b v8 (offline pill independiente de sidebar/toggle) — en spec.md
- [x] FR-046 (brand voice audit por audience variant) — en spec.md
- [x] FR-240..FR-253 cubren toda la sidebar architecture — en spec.md v8

### 3.2 Direction 2 → PENDING user approval

- [x] **CONSTITUTION.md**: principio XXIV añadido con wording abstracto (invariantes duraderos, sin detalles de implementación). Aprobado via Socratic debate (Elena/Diego/Carlos). v7.1.0.

---

## 4. Convergence test — is the loop closed?

- [x] Cada principio Constitution v7 tiene verificación en Direction 1 (23/23)
- [x] Cada gap de Direction 1 tiene FR resuelto en spec v8
- [x] Test de sistemicidad Direction 2 ejecutado (4/4 "sí")
- [x] Wording de amendment en §2 listo para commit
- [x] Usuario ha dado approval sobre Constitution v7.1.0 (Socratic debate → Opción A: wording abstracto)

**Status del loop**: **100% cerrado**.

---

## 5. FR → US → SC → Constitution traceability (v8 additions)

| FR | US | SC | Constitution |
|---|---|---|---|
| FR-240 (SiteSidebar) | US-6 | SC-014 | IV, II, XXIV (prop) |
| FR-241 (7 sections) | US-6 | SC-014 | XXIV (prop) |
| FR-242 (Header 3 nav) | US-6 | SC-007 | IV, III |
| FR-243 (Scroll-spy) | US-6 | SC-013 | II, XXIV (prop) |
| FR-244 (Section i18n) | US-6 | SC-015 | XXI, IV |
| FR-245 (TripleToggle fixed) | US-6 | SC-013 | XXIV (prop), II |
| FR-246 (3 switches) | US-6 | SC-013 | II, XXIV (prop) |
| FR-247 (<100ms) | US-6 | SC-013 | XXIV (prop), XIV |
| FR-248 (Touch targets) | US-6 | SC-020 | II |
| FR-249 (Keyboard + ARIA) | US-6 | SC-007 | II |
| FR-250 (Admin editor) | US-8 | SC-009 | I, XXIII |
| FR-251 (Firestore schema) | US-8 | SC-009 | I, VI |
| FR-252 (Static fallback) | US-8 | SC-009 | VI |
| FR-253 (Admin security) | US-8 | SC-017 | VII |

**Orphan check**: 0 FRs without US. 0 FRs without SC. 0 FRs without Constitution principle.

---

## 6. Meta

Backcasting v2 actualiza v1 para la sidebar architecture. Feature 010 replicará este template cuando agregue backoffice CMS completo.
