# Data Model: Firebase CMS Backend

**Feature**: 004-firebase-cms-backend
**Date**: 2026-03-22
**Storage**: Cloud Firestore

## Collections Overview

| Collection | Purpose | Read | Write | Doc Count |
|-----------|---------|------|-------|-----------|
| `programs` | Program catalog content | Public | Admin only | ~9 (6 personas + 3 empresas) |
| `pricing` | All pricing data | Public | Admin only | 3 (b2c_base, b2b_multipliers, premium) |
| `translations` | i18n dictionaries | Public | Admin only | 2 (es, en) |
| `audit_log` | Change tracking | Admin only | Admin only (auto) | Unbounded (90-day TTL) |
| `config` | System configuration | Internal | Admin only | 1 (settings) |

## Collection: `programs`

**Path**: `programs/{programId}`

Program IDs follow the pattern: `{audience}_{slug}` (e.g., `empresas_diagnostico`, `personas_estrategia`).

### Document Schema

```json
{
  "audience": "empresas | personas",
  "slug": "diagnostico",
  "sort_order": 1,
  "icon": "search",
  "icon_color": "text-cyan-400 bg-cyan-500/15",

  "title_es": "Diagnóstico Estratégico",
  "title_en": "Strategic Diagnostic",
  "tagline_es": "Primero evolucionar con método",
  "tagline_en": "First evolve with method",
  "description_es": "Detectamos exactamente dónde...",
  "description_en": "We detect exactly where...",
  "benefits_es": ["Mapa de pérdidas...", "Priorización..."],
  "benefits_en": ["Time loss map...", "Impact-based..."],
  "transformation_es": "De operar a ciegas...",
  "transformation_en": "From operating blindly...",

  "is_published": true,
  "updated_at": "2026-03-22T10:00:00Z",
  "updated_by": "admin@metodologia.info"
}
```

### Validation Rules (enforced in security rules)

- `audience`: required, must be "empresas" or "personas"
- `slug`: required, string, non-empty
- `sort_order`: required, integer >= 0
- `title_es`, `title_en`: required, string, non-empty
- `description_es`, `description_en`: required, string, non-empty
- `benefits_es`, `benefits_en`: required, array of strings, min 1 item
- `transformation_es`, `transformation_en`: required, string, non-empty
- `is_published`: required, boolean
- `updated_at`: required, timestamp
- `updated_by`: required, string (admin email)

### Entities from Spec

| Spec Source | Firestore Field | Notes |
|-------------|----------------|-------|
| `programsData.title` (empresas/index.html:364) | `title_es` / `title_en` | Split by language |
| `programsData.tagline` (empresas/index.html:365) | `tagline_es` / `tagline_en` | Split by language |
| `programsData.description` (empresas/index.html:366) | `description_es` / `description_en` | Plain text only (FR-023) |
| `programsData.benefits` (empresas/index.html:367-371) | `benefits_es` / `benefits_en` | Array of strings |
| `programsData.transformation` (empresas/index.html:373) | `transformation_es` / `transformation_en` | Plain text only |
| `programsData.icon` (empresas/index.html:362) | `icon` | Shared across languages |
| `programsData.iconColor` (empresas/index.html:363) | `icon_color` | Tailwind classes |

---

## Collection: `pricing`

**Path**: `pricing/{category}`

### Document: `pricing/b2c_base`

```json
{
  "programs": {
    "empoderamiento": { "price": 2760000, "mejora": 40, "name_es": "N7: Empoderamiento", "name_en": "N7: Empowerment" },
    "champions": { "price": 2760000, "mejora": 50, "name_es": "N9: Digital Champions", "name_en": "N9: Digital Champions" }
  },
  "coaching": {
    "estrategia": { "price": 3910000, "mejora": 20, "name_es": "N1: Estrategia Personal", "name_en": "N1: Personal Strategy" }
  },
  "bootcamps": {
    "ofimatica": { "price": 920000, "mejora": 12, "name_es": "N2: Ofimática IA", "name_en": "N2: Office AI" },
    "ventas": { "price": 920000, "mejora": 15, "name_es": "N3: Ventas IA", "name_en": "N3: Sales AI" },
    "orden": { "price": 920000, "mejora": 10, "name_es": "N4: Orden Digital", "name_en": "N4: Digital Order" },
    "amplificado": { "price": 920000, "mejora": 18, "name_es": "N5: Trabajo Amplificado", "name_en": "N5: Amplified Work" },
    "gerencia": { "price": 920000, "mejora": 12, "name_es": "N6: Gerencia IA", "name_en": "N6: AI Management" },
    "coding": { "price": 920000, "mejora": 20, "name_es": "N8: Vibe Coding", "name_en": "N8: Vibe Coding" }
  },
  "currency": "COP",
  "updated_at": "2026-03-22T10:00:00Z",
  "updated_by": "admin@metodologia.info"
}
```

### Document: `pricing/b2b_multipliers`

```json
{
  "program": 13.33333333,
  "foundation": 5.29411765,
  "bootcamp": 15,
  "diagnostic": 1,
  "updated_at": "2026-03-22T10:00:00Z",
  "updated_by": "admin@metodologia.info"
}
```

### Document: `pricing/premium`

```json
{
  "skus": {
    "prompt-library": { "price_cop": 150000, "name_es": "Biblioteca de Prompts", "name_en": "Prompt Library" },
    "...": "..."
  },
  "updated_at": "2026-03-22T10:00:00Z",
  "updated_by": "admin@metodologia.info"
}
```

### Entities from Spec

| Spec Source | Firestore Location | Notes |
|-------------|-------------------|-------|
| `data-price` attributes (cotizador.html:484-552) | `pricing/b2c_base.{category}.{slug}.price` | Integer, COP |
| `data-mejora` attributes (cotizador.html:484-552) | `pricing/b2c_base.{category}.{slug}.mejora` | Percentage integer |
| `B2B_MULTIPLIERS` (cotizador.js:81) | `pricing/b2b_multipliers` | Float multipliers |
| Premium table (recursos/premium/index.html) | `pricing/premium.skus` | Keyed by SKU slug |

---

## Collection: `translations`

**Path**: `translations/{lang}`

### Document: `translations/es`

```json
{
  "nav": {
    "home": "Inicio",
    "companies": "Empresas",
    "people": "Personas",
    "...": "..."
  },
  "hero": {
    "title": "MetodologIA",
    "...": "..."
  },
  "_meta": {
    "key_count": 1132,
    "updated_at": "2026-03-22T10:00:00Z",
    "updated_by": "admin@metodologia.info"
  }
}
```

Structure mirrors the existing `es.json`/`en.json` exactly — nested key-value objects. The `_meta` field is excluded when serving to the i18n module.

---

## Collection: `audit_log`

**Path**: `audit_log/{autoId}`

```json
{
  "timestamp": "2026-03-22T10:30:00Z",
  "admin_id": "uid-abc123",
  "admin_email": "admin@metodologia.info",
  "collection": "programs",
  "document_id": "empresas_diagnostico",
  "field": "description_es",
  "previous_value": "Old description text...",
  "new_value": "New description text...",
  "ttl": "2026-06-20T10:30:00Z"
}
```

- `ttl` field: set to `timestamp + 90 days` for Firestore TTL policy (FR-011)
- Append-only: no updates or deletes by any user
- Read access: admin only

---

## Collection: `config`

**Path**: `config/settings`

```json
{
  "cache_ttl_ms": 3600000,
  "migrated_collections": ["programs"],
  "maintenance_mode": false
}
```

- `cache_ttl_ms`: default 1 hour (FR-007), configurable by admin
- `migrated_collections`: tracks which collections are served from Firestore vs static fallback (FR-017)
- Read by content service on init; admin-writable

---

## State Transitions

### Content Publication Flow

```
Draft → Validated → Published
  |                    |
  v                    v
[admin edits]    [visible on public site]
  |                    |
  v                    v
[validation:      [audit_log entry
 both langs,       created]
 required fields]
```

- There is no explicit "draft" state in v1 — `is_published` is always `true` for existing migrated content
- Validation happens client-side in the admin UI (FR-010) AND server-side in security rules (FR-013)
- Every successful write triggers an audit log entry (FR-011)

### Cache Lifecycle

```
Empty → Populated → Fresh → Stale → Refreshed
                      |              |
                      v              v
                [serve from IDB] [background fetch,
                                  update IDB,
                                  re-render]
```

- TTL check: `Date.now() - entry.cachedAt > config.cache_ttl_ms`
- On Firestore failure: serve stale cache indefinitely (Constitution VIII)
- On first visit with no cache and no Firestore: fall back to static HTML/JSON (FR-017)
