# Data Model: CMS Backoffice RBAC

**Branch**: `006-cms-backoffice-rbac` | **Date**: 2026-03-23

## Firestore Collections

### `users/{uid}`

User profile and role record. Created on first login (by Cloud Function).

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| `uid` | string | yes | matches doc ID | Firebase Auth UID |
| `email` | string | yes | valid email | from Auth provider |
| `display_name` | string | yes | 1-100 chars | from Auth, editable |
| `avatar_url` | string | no | valid URL or null | from Auth provider |
| `role` | string | yes | enum: super_admin, admin, editor, viewer | also in custom claim |
| `preferred_language` | string | yes | enum: es, en | default: es |
| `source` | string | yes | enum: bootstrap, domain, invite, manual | how user was provisioned |
| `is_bootstrap` | boolean | yes | — | true = cannot demote via UI |
| `created_at` | timestamp | yes | server timestamp | first login |
| `updated_at` | timestamp | yes | server timestamp | last profile/role change |
| `last_login` | timestamp | yes | server timestamp | updated each login |
| `total_sessions` | number | yes | integer >= 0 | incremented each login |
| `role_history` | array | yes | — | [{role, changed_by, changed_at, previous_role}] |

**Security rules**:
- Read own doc: any authenticated user
- Read all users: super_admin only
- Write own profile fields (display_name, preferred_language): any authenticated user
- Write role fields: NEVER via client — only Cloud Function
- Delete: NEVER via client

**State transitions** (role):
```
null → viewer (domain auto-provision)
null → [any] (invite)
viewer → editor → admin → super_admin (promotion by super_admin)
super_admin → admin → editor → viewer (demotion by super_admin)
bootstrap super_admin → [cannot demote] (invariant)
```

### `config/access`

Singleton document controlling CMS access rules.

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| `allowed_domains` | array<string> | yes | valid domain strings | e.g., ["metodologia.info"] |
| `default_role` | string | yes | enum: viewer | role for domain auto-provision |
| `bootstrap_accounts` | array<object> | yes | — | [{email, role}] — READ-ONLY MIRROR of hardcoded array in Cloud Function. Lazy-synced by `onUserFirstLogin`. Not writable from client (INS-RBAC-004) |
| `updated_at` | timestamp | yes | server timestamp | — |
| `updated_by` | string | yes | valid email | — |

**Security rules**:
- Read: any authenticated user (needed to check own access)
- Write: super_admin only

**Bootstrap accounts** (hardcoded in Cloud Function, mirrored here):
```json
[
  {"email": "javier.montano.guz@gmail.com", "role": "super_admin"},
  {"email": "contacto@metodologia.info", "role": "super_admin"},
  {"email": "german@metodologia.info", "role": "admin"}
]
```

### `config/invites/{sanitized_email}`

Pending invitations for external users. Doc ID is the lowercased email with `.` and `@` replaced by `_` (e.g., `partner@aliado.com` → `partner_aliado_com`). No hashing — directly reversible, Firestore-safe.

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| `email` | string | yes | valid email | invited user's email |
| `role` | string | yes | enum: viewer, editor, admin | assigned role |
| `invited_by` | string | yes | valid email | super_admin who invited |
| `invited_at` | timestamp | yes | server timestamp | — |
| `status` | string | yes | enum: pending, accepted, expired | — |

**Security rules**:
- Read: super_admin only
- Create: super_admin only (via Cloud Function)
- Delete: super_admin only or system (on acceptance)

**Lifecycle**:
```
pending → accepted (user signs in, Cloud Function converts to user doc)
pending → expired (30-day TTL, cleaned by scheduled function or manual)
```

### `audit_log/{entryId}` (existing, extended)

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| `timestamp` | timestamp | yes | server timestamp | — |
| `admin_id` | string | yes | valid UID | who made the change |
| `admin_email` | string | yes | valid email | — |
| `collection` | string | yes | valid collection name | programs, pricing, translations, users |
| `document_id` | string | yes | — | — |
| `action` | string | yes | enum: create, update, delete, restore, role_change, login, logout | NEW: extended actions |
| `field` | string | no | — | specific field changed (null for login/logout) |
| `previous_value` | any | no | — | value before change |
| `new_value` | any | no | — | value after change |
| `ttl` | timestamp | yes | 90 days from now | auto-cleanup eligibility |

**New action types** (vs existing):
- `role_change` — records role assignment/change with previous_role in previous_value
- `login` — records user login event
- `logout` — records user logout event
- `restore` — records content restoration from history

**Security rules** (unchanged):
- Create: admin+ (authenticated with role claim)
- Read: super_admin, admin
- Update: NEVER (immutable)
- Delete: NEVER (immutable)

### `page_overrides/{path_hash}`

Admin-edited metadata overrides for site pages. Base page data comes from build-time scan (`admin/data/page-registry.json`); this collection stores CMS customizations only (INS-DATA-001).

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| `path` | string | yes | valid relative path | e.g., "empresas/index.html" |
| `title_es` | string | no | 1-200 chars | override for `<title>` in Spanish |
| `title_en` | string | no | 1-200 chars | override for `<title>` in English |
| `description_es` | string | no | 1-300 chars | meta description override ES |
| `description_en` | string | no | 1-300 chars | meta description override EN |
| `og_title_es` | string | no | 1-200 chars | Open Graph title override ES |
| `og_title_en` | string | no | 1-200 chars | Open Graph title override EN |
| `updated_at` | timestamp | yes | server timestamp | — |
| `updated_by` | string | yes | valid email | — |

**Security rules**:
- Read: editor+ (needed to display merged view)
- Create/Update: editor+
- Delete: admin+

**Key generation**: Same sanitization pattern as invites — page path with `/` and `.` replaced by `_` (e.g., `empresas/index.html` → `empresas_index_html`). Directly reversible, stored alongside `path` field for clarity.

### `config/settings` (existing)

| Field | Type | Notes |
|-------|------|-------|
| `cache_ttl_ms` | number | 3600000 (1 hour) |
| `migrated_collections` | array<string> | tracks which collections use Firestore |

No changes needed for RBAC.

### Existing collections (unchanged)

- `programs/{programId}` — program catalog
- `pricing/{category}` — B2C/B2B pricing
- `translations/{lang}` — i18n dictionaries

RBAC changes: security rules updated from `isAdmin()` to role-based checks.

## Custom Claims Schema

Stored in Firebase Auth ID token:

```json
{
  "role": "super_admin" | "admin" | "editor" | "viewer" | null
}
```

**Migration from current**: Replace `{ admin: true }` with `{ role: "super_admin" }` or `{ role: "admin" }`. Cloud Function handles migration on first login.

## Entity Relationship Diagram

```
config/access (singleton)
  └── allowed_domains[] ──→ domain auto-provision logic
  └── bootstrap_accounts[] ──→ irrevocable role assignments

config/invites/{hash}
  └── email ──→ matched on Auth onCreate

users/{uid}
  ├── role ──→ mirrored in custom claims
  ├── role_history[] ──→ audit trail within user doc
  └── source ──→ tracks provisioning origin

audit_log/{entryId}
  ├── admin_id ──→ references users/{uid}
  ├── collection + document_id ──→ references target entity
  └── previous_value + new_value ──→ enables version reconstruction

programs/{id}, pricing/{cat}, translations/{lang}
  └── (existing, unchanged — RBAC enforced by security rules)
```

## Indexes Required

### Existing
- `programs`: `(audience ASC, is_published ASC, sort_order ASC)`

### New
- `audit_log`: `(collection ASC, timestamp DESC)` — for filtered audit viewer
- `audit_log`: `(admin_email ASC, timestamp DESC)` — for user-filtered view
- `audit_log`: `(document_id ASC, timestamp ASC)` — for version reconstruction
- `users`: `(role ASC, email ASC)` — for user management listing
