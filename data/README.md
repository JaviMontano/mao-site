# data/

Configuration data files consumed by the i18n certification suite and runtime modules.

## Files

| File | Purpose | Consumer |
|------|---------|----------|
| `business-logic.json` | Static business logic fallback for legacy `ruta/` mode switching | `ruta-mode.js`, `cotizador-personas.js`, `cotizador-empresas.js` |
| `i18n-levels.json` | Page → level (L1-L5) classification rules with overrides | `i18n-certification.test.js` |
| `i18n-allowlist.json` | Terms legitimately identical in ES and EN (false positive suppression) | `i18n-certification.test.js` |
| `i18n-spanish-patterns.json` | Regex patterns for Spanish remnant detection in EN mode | `bilingual-certification.spec.js` |
| `site-inventory.json` | Canonical site inventory, legacy redirects, archived HTML, and dynamic detail exclusions | `scripts/count-pages.js`, `scripts/generate-sitemap-xml.js` |

## Schema

Files used by the i18n certification suite follow schemas documented in
`specs/005-bilingual-nav-certification/data-model.md`.

`business-logic.json` and `site-inventory.json` are runtime/build contracts
owned by the route fallback and sitemap/page-count tooling respectively.
