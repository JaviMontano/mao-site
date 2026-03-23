# data/

Configuration data files consumed by the i18n certification suite and runtime modules.

## Files

| File | Purpose | Consumer |
|------|---------|----------|
| `business-logic.json` | Business logic configuration | `ruta-mode.js` |
| `i18n-levels.json` | Page → level (L1-L5) classification rules with overrides | `i18n-certification.test.js` |
| `i18n-allowlist.json` | Terms legitimately identical in ES and EN (false positive suppression) | `i18n-certification.test.js` |
| `i18n-spanish-patterns.json` | Regex patterns for Spanish remnant detection in EN mode | `bilingual-certification.spec.js` |

## Schema

All JSON files follow schemas documented in `specs/005-bilingual-nav-certification/data-model.md`.
