# Contract: Certification Suite Output

## Vitest Output (Static Certification)

The static certification test produces structured output per level:

```
Level | Total Keys | Translated | Coverage | Status
L1    | 225        | 225        | 100%     | PASS
L2    | 180        | 175        | 97%      | FAIL (target: 100%)
L3    | 95         | 90         | 95%      | PASS (target: >=90%)
L4    | 240        | 180        | 75%      | PASS (target: headings+CTAs)
L5    | 85         | 85         | 100%     | PASS

Missing keys: 5 (listed per page)
Orphaned keys: 1 (listed)
Untranslated pages: 12 (warnings)
```

## Test Assertions (Vitest)

### Fail conditions (test fails):
- Any `data-i18n` key missing from en.json → lists key + page
- Any orphaned en.json key (no HTML reference) → lists key
- L1 coverage < 100%
- L2 coverage < 100%
- L3 coverage < 90%
- L5 coverage < 100%

### Warning conditions (test passes with console output):
- Pages with SiteHeader but zero `data-i18n` keys
- Cotizador pages (dynamic content out of scope)
- Strategy 3 floating nav pages (auto-generated sections)

### L4 special handling:
- Only checks headings (`h1`-`h6`), CTAs (`a`, `button`), and nav elements
- Does not fail on untranslated body text

## Playwright Output (Rendered Certification)

### Layer 1: data-i18n value match
For each `data-i18n` element on L1 pages:
- Get rendered `textContent`
- Compare against en.json value for that key
- Fail if mismatch (element shows Spanish despite en.json having English)

### Layer 2: Spanish pattern scan
For visible text NOT inside `data-i18n` elements:
- Scan against patterns from `data/i18n-spanish-patterns.json`
- Fail if any pattern matches
- Report element selector + matched text

## Translation Check Algorithm

A key is "translated" when ALL conditions are true:
1. en.json entry exists for the key path
2. en.json value is non-empty string
3. en.json value differs from es.json value for the same key path
4. UNLESS the key's value appears in `data/i18n-allowlist.json`
