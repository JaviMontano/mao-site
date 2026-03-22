# Data Model: Sitewide UX/UI Polish

**Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)

## Overview

This feature modifies no persistent data stores (Constitution I: Static-First, no databases). The "data model" describes the client-side data structures affected by the changes.

## DM-1: i18n Translation JSON

**Files**: `js/i18n/en.json`, `js/i18n/es.json`

**Structure** (existing, extended):
```json
{
  "nav.ruta": "string",
  "nav.recursos": "string",
  "home.hero.title": "string",
  "home.hero.subtitle": "string",
  "home.hero.badge": "string",
  "home.hero.cta_primary": "string",
  "home.hero.cta_secondary": "string",
  "home.quote.text": "string",
  "[page].[section].[element]": "string — new keys added per FR-004"
}
```

**Validation rules**:
- Every `data-i18n` attribute in HTML must have a corresponding key in both en.json and es.json
- es.json values must exactly match the HTML fallback text (FR-005)
- Keys follow dot-notation: `{page}.{section}.{element}`

**State transitions**: None — static JSON, no runtime mutations.

## DM-2: Language State

**Storage**: `localStorage` key `"lang"` (existing)
**Values**: `"es"` | `"en"`
**Default**: `"es"` (falls back to browser language detection)

**State flow**:
1. Page load → `resolveLang()` checks localStorage → browser language → defaults to `"es"`
2. User clicks toggle → `setLang(lang)` → updates localStorage → translates DOM → syncs all toggle buttons

## DM-3: Floating Nav Section Detection

**Runtime structure** (SiteHeader.js `detectSections()` return):
```typescript
type Section = {
  id: string;     // DOM element ID
  label: string;  // Display text (max 24 chars)
  el: Element;    // DOM reference
}
// Returns Section[] (max 8)
```

**Change**: Add exclusion filter for elements with `data-nav-exclude` attribute or `hook-quote-section` class. Applied before the `slice(0, 8)` cap.

## DM-4: Standalone Download Variants

**Pattern**: For each standalone HTML download, an EN variant file is created.
```
recursos/flujos-genspark/wf-01-standalone.html    → wf-01-standalone-en.html
recursos/playbooks/playbook-xyz.pdf                → playbook-xyz-en.pdf
data/business-logic.json                           → bilingual keys within same file
```

**No schema changes** — EN variants are full copies with translated content, not parameterized templates.
