# Testify Clarifications — 009-home-landing-sales

## Session 2026-04-21 (Socratic debate on 4 testify gaps)

### Gap A — Two-Tier Consent Rejection (Critical)

- Q: ¿Los `.feature` cubren el caso donde el visitante rechaza el banner de Analytics pero completa el diagnóstico con PII consent? → A: **No — gap crítico.** El spec v5 clarificó la ortogonalidad (line 1110): reject bloquea SOLO eventos Analytics; PII consent es independiente. Añadidos TS-084..TS-087 en `cross-cutting-performance-a11y.feature`. Debate socrático reveló que son 4 escenarios (no 3): home_view, diagnostic complete sin analytics, CTA clicks, y fallback mailto — todos con Analytics consent rechazado pero comportamiento funcional intacto. [FR-072, FR-012, FR-015, FR-070, SC-017]

### Gap B — Back-Navigation + Step 6 Validation (Medium)

- Q: ¿Qué pasa cuando el usuario navega hacia atrás en el stepper y cambia una respuesta? → A: Las respuestas **persisten** en localStorage al navegar back (FR-014). Cambiar una respuesta y avanzar **recalcula** el score con todas las respuestas actuales. No hay branching condicional — las preguntas son independientes (spec §4.5 "orden fijo"). [FR-011, FR-014, TS-088, TS-089]

- Q: ¿Step 6 solo valida email? → A: **No — faltan nombre (2-80 chars) y consent checkbox.** El spec dice "nombre obligatorio, 2–80 chars" (§1.5) y "checkbox obligatorio con link a política" (FR-012). PII de step 6 vive SOLO en memoria (nunca localStorage per NFR-006); navegar back y volver la preserva en memoria. Añadidos TS-090..TS-092. [FR-012, NFR-006, TS-013 (ya existía para email)]

### Gap C — TS-050 Vague Assertions (Medium)

- Q: ¿Qué significa "layout correct" en 52 combinaciones? → A: **3 invariantes concretos**, no visual regression. Debate socrático descartó screenshots (explosión combinatoria, invalidan con cambios de contenido). Los invariantes son: (1) zero raw keys via regex en textContent + atributos (SC-015), (2) zero horizontal overflow via scrollWidth <= clientWidth (SC-012), (3) zero empty slots en elementos `[data-i18n]`/`[data-slot]` visibles. [SC-014, SC-015, SC-012, TS-050]

### Gap D — CSS Measurement Approach (Medium)

- Q: ¿Comparar custom property strings o computed styles? → A: **Custom property strings via `getComputedStyle(document.documentElement).getPropertyValue('--var').trim()`.** Formato canónico: hex para colores (#F9FAFB), px para radios (6px). El spec usa estos formatos explícitamente (FR-041, FR-044). "Without flash" reemplazado por "<100ms measured via performance.now()" (SC-013). Dark mode verificado vía `html[data-theme="dark"]` attribute antes de leer propiedades. [FR-040..FR-045, SC-006, SC-013, TS-027, TS-028, TS-031, TS-032]
