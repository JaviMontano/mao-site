# Contract: i18n Key Coverage

Every `data-i18n` attribute in any HTML file MUST have a matching key in both `js/i18n/en.json` and `js/i18n/es.json`.

## Validation

```bash
# Extract all data-i18n keys from HTML
grep -roh 'data-i18n="[^"]*"' --include="*.html" . | \
  sed 's/data-i18n="//;s/"//' | sort -u > /tmp/html-keys.txt

# Extract all keys from en.json
jq -r 'keys[]' js/i18n/en.json | sort -u > /tmp/en-keys.txt

# Diff — must be empty
diff /tmp/html-keys.txt /tmp/en-keys.txt
```

## Key Naming Convention

`{page}.{section}.{element}`

Examples:
- `home.hero.title`
- `empresas.programs.card1.title`
- `nav.ruta`

## es.json Fidelity Contract

For every key `K` in es.json, `es.json[K]` MUST exactly match the `textContent` of the HTML element carrying `data-i18n="K"`. This is the fallback-fidelity guarantee (FR-005).
