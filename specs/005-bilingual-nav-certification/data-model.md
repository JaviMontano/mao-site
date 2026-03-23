# Data Model: Bilingual & Floating Nav Certification

## Entities

### TranslationKey

A mapping from an HTML `data-i18n` attribute to a JSON path in the
translation files.

| Field | Type | Validation | Example |
|-------|------|------------|---------|
| key | string | Dot-notation path, non-empty | `ruta.hero.title_line1` |
| en_value | string | Non-empty, differs from es_value (unless in allowlist) | `"Route of (R)Evolution"` |
| es_value | string | Non-empty | `"Ruta de (R)Evolución"` |
| page | string | Relative path from repo root | `ruta/index.html` |
| level | L1-L5 | Derived from page path + overrides | `L1` |

**State transitions**: None (static data).

### PageLevel

Classification of a page into a coverage tier.

| Field | Type | Validation | Example |
|-------|------|------------|---------|
| path | string | Relative HTML file path | `empresas/index.html` |
| level | enum | L1, L2, L3, L4, L5 | `L1` |
| source | enum | `rule` or `override` | `rule` |
| key_count | number | >= 0 | `49` |
| translated_count | number | >= 0, <= key_count | `49` |
| coverage_pct | number | 0-100 | `100` |

### OrphanedKey

An en.json entry with no corresponding `data-i18n` in any HTML file.

| Field | Type | Example |
|-------|------|---------|
| key | string | `cta.old_button` |
| en_value | string | `"Click here"` |

### CertificationResult

Output of the certification suite run.

| Field | Type | Example |
|-------|------|---------|
| level | L1-L5 | `L1` |
| total_keys | number | `225` |
| translated_keys | number | `225` |
| coverage_pct | number | `100` |
| missing_keys | string[] | `[]` |
| orphaned_keys | string[] | `["cta"]` |
| untranslated_pages | string[] | `[]` |
| warnings | string[] | `["cotizador-personas: dynamic content"]` |
| pass | boolean | `true` |

## Relationships

```
PageLevel 1──* TranslationKey  (a page has many keys)
TranslationKey *──1 en.json    (each key maps to one en.json path)
TranslationKey *──1 es.json    (each key maps to one es.json path)
CertificationResult 1──1 PageLevel (one result per level)
OrphanedKey ──x── HTML         (no HTML reference exists)
```

## JSON Schemas

### data/i18n-levels.json

```json
{
  "rules": [
    { "pattern": "index.html", "level": "L1", "exact": true },
    { "pattern": "ruta/index.html", "level": "L1", "exact": true },
    { "pattern": "empresas/index.html", "level": "L1", "exact": true },
    { "pattern": "personas/index.html", "level": "L1", "exact": true },
    { "pattern": "empresas/*.html", "level": "L2" },
    { "pattern": "personas/*.html", "level": "L2" },
    { "pattern": "servicios/*.html", "level": "L2" },
    { "pattern": "recursos/index.html", "level": "L3", "exact": true },
    { "pattern": "recursos/*/index.html", "level": "L3" },
    { "pattern": "recursos/**/*.html", "level": "L4" },
    { "pattern": "contacto/**/*.html", "level": "L5" },
    { "pattern": "nosotros/**/*.html", "level": "L5" },
    { "pattern": "legal/**/*.html", "level": "L5" }
  ],
  "overrides": {},
  "exclude": [
    "TEMPLATE.html",
    "admin/**",
    "archivado/**"
  ]
}
```

### data/i18n-allowlist.json

```json
{
  "description": "Terms legitimately identical in ES and EN",
  "terms": [
    "MetodologIA",
    "Success as a Service",
    "Copyleft",
    "email",
    "Playbooks",
    "Sitemap",
    "Campus",
    "Time to\nValue",
    "Delay of\nFeedback",
    "Friction\nLevel"
  ]
}
```

### data/i18n-spanish-patterns.json

```json
{
  "description": "Regex patterns for detecting Spanish text in EN mode",
  "patterns": [
    "Conoce más",
    "Contáctanos",
    "Nuestros?\\b",
    "Ver más",
    "Siguiente",
    "Anterior",
    "Enviar",
    "Cerrar",
    "Descubre",
    "Comienza",
    "Explorar",
    "Descargar",
    "^El\\s",
    "^La\\s",
    "^Los\\s",
    "^Las\\s"
  ]
}
```
