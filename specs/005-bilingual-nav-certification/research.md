# Research: Bilingual & Floating Nav Certification

## R1: langchange Event vs MutationObserver vs Re-render

**Decision**: CustomEvent `langchange` dispatched from `i18n.setLang()`

**Rationale**: The floating nav needs to know when language changes.
Three approaches were evaluated:

1. **CustomEvent** (chosen): `i18n.setLang()` dispatches
   `document.dispatchEvent(new CustomEvent('langchange', {detail: {lang}}))`.
   SiteHeader listens and re-reads heading text. Clean, explicit contract.
   [Clarification Q1]

2. **MutationObserver**: Watch heading text changes and mirror to floating
   nav. Implicit coupling; fires on any text change, not just i18n.
   Rejected: too broad, performance overhead on pages with dynamic content.

3. **Full re-render**: Destroy and rebuild floating nav on every language
   change. Wasteful; loses scroll position tracking state.
   Rejected: violates XIV (Simple First).

**Alternatives considered**: None remaining.

## R2: Static HTML Parsing for Vitest Certification

**Decision**: Use Node.js `fs` + regex to extract `data-i18n` keys from HTML

**Rationale**: Vitest runs in Node.js. We need to parse 81+ HTML files for
`data-i18n` attributes without a browser. Options:

1. **Regex extraction** (chosen): `data-i18n="([^"]+)"` captures all keys.
   Simple, fast, no dependencies. Works because `data-i18n` values are
   always double-quoted strings (never computed).

2. **JSDOM**: Full DOM parsing. Accurate but adds a heavy dependency.
   Rejected: regex is sufficient for attribute extraction (XIV).

3. **cheerio**: Lightweight HTML parser. Still a dependency.
   Rejected: regex handles the simple pattern.

## R3: Spanish Remnant Pattern List

**Decision**: Curated list of common Spanish UI patterns unlikely in English

**Rationale**: Layer 2 of the remnant detection scans visible text for
Spanish patterns. The list must be:
- High precision (no false positives on English text)
- Covers common UI patterns (CTAs, labels, headers)
- Maintainable (stored in `data/i18n-spanish-patterns.json`)

Initial patterns: "Conoce más", "Contáctanos", "Nuestros?", "Ver más",
"Siguiente", "Anterior", "Enviar", "Cerrar", "Descubre", "Comienza",
"Explorar", "Descargar", common Spanish articles as word boundaries
("El ", "La ", "Los ", "Las " at text start).

Not included: single words that could be proper nouns or brand terms.

## R4: Page Level Classification Rules

**Decision**: Directory-pattern rules with JSON manifest overrides

**Rationale**: 81 pages need deterministic L1-L5 classification.
[Clarification Q8]

Directory rules:
- L1: exact match `index.html`, `ruta/index.html`, `empresas/index.html`,
  `personas/index.html`
- L2: `empresas/*.html`, `personas/*.html`, `servicios/*.html`
  (excluding index files already in L1)
- L3: `recursos/index.html`, `recursos/*/index.html`
- L4: `recursos/**/*.html` (non-index), `biblioteca-*` detail pages
- L5: `contacto/**`, `nosotros/**`, `legal/**`

Override manifest handles edge cases like `servicios/index.html` (L2 not L3).

## Tessl Tiles

No new technologies introduced — all tools (Vitest, Playwright, vanilla JS)
are already in the project. No tile discovery needed.
