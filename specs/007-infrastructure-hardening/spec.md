# Feature 007: Infrastructure Hardening

**Status**: SPEC (amended post-critique)
**Branch**: `007-infrastructure-hardening`
**Phase**: 0 (CMS Migration Plan)
**Constitution**: v6.2.0

## Problem Statement

The CMS backend (Feature 006) is functional but has infrastructure gaps that block Phase 1 expansion (5 new collections). Specifically:

1. **Duplicated constants** — Role levels defined in 2 files, bilingual fields in 2 files, TTL magic numbers in 3 places. Violates Constitution XXI (Zero Hardcoding).
2. **Rigid cache store list** — Hardcoded `['programs', 'pricing', 'translations']` in `cache-manager.js` with no upgrade path for new stores.
3. **Non-atomic admin writes** — `updateProgram()` performs N+N individual writes (fields + audit entries) without a Firestore batch. Partial failure leaves inconsistent state.
4. **Audit entries lack previous values** — `previous_value: null` on all audit entries, making future restore UI impossible.

## Scope

Infrastructure-only. No new admin tabs, no new collections, no visual changes, no Firestore rules changes.

### In Scope

- FR-001: Constants module (`js/cms/constants.js`) as single source of truth
- FR-002: Cache manager upgrade handler for future store additions
- FR-003: Cache invalidation methods (`invalidateStore`, `invalidateAll`)
- FR-004: Atomic batch writes in all AdminAPI write methods
- FR-005: Read-before-write for `previous_value` in audit entries

### Out of Scope

- Draft/published state (deferred to Phase 1 — new collections will use `status` from birth)
- Firestore rules changes (no new fields to validate)
- New admin editors or UI changes
- Cloud Functions (still require Blaze plan)

## Functional Requirements

### FR-001: Constants Module

Create `js/cms/constants.js` exporting:

```js
// Role hierarchy
export const ROLE_LEVELS = { super_admin: 4, admin: 3, editor: 2, viewer: 1 };

// Bilingual field bases (used in validation and editors)
export const BILINGUAL_FIELDS = ['title', 'tagline', 'description', 'transformation'];

// Content domain enums
export const PRICING_CATEGORIES = ['b2c_base', 'b2b_multipliers', 'premium'];
export const SUPPORTED_LANGS = ['es', 'en'];

// Cache configuration
export const CACHE_DB_NAME = 'metodologia-cms';
export const CACHE_DB_VERSION = 1;
export const CACHE_STORES = ['programs', 'pricing', 'translations'];
export const DEFAULT_CACHE_TTL_MS = 3_600_000; // 1 hour

// Audit configuration
export const AUDIT_TTL_DAYS = 90;
export const AUDIT_TTL_MS = AUDIT_TTL_DAYS * 24 * 60 * 60 * 1000;

// Firestore batch limit (safety rail)
export const FIRESTORE_BATCH_LIMIT = 500;
```

**Consumers:**
- `cache-manager.js` → imports `CACHE_DB_NAME`, `CACHE_DB_VERSION`, `CACHE_STORES`
- `auth-service.js` → imports `ROLE_LEVELS`
- `admin-api.js` → imports `BILINGUAL_FIELDS`, `AUDIT_TTL_MS`, `FIRESTORE_BATCH_LIMIT`
- `content-service.js` → imports `DEFAULT_CACHE_TTL_MS`
- `admin/js/admin-app.js` → imports `ROLE_LEVELS`, `PRICING_CATEGORIES`, `SUPPORTED_LANGS`
- `admin/js/program-editor.js` → imports `BILINGUAL_FIELDS`

**Acceptance Criteria:**
- AC-001-1: No string/number literal for role levels, bilingual fields, pricing categories, supported langs, TTLs, or DB config in any consumer file
- AC-001-2: All existing tests pass without modification (behavior unchanged)
- AC-001-3: `constants.js` has zero side effects (pure exports only)

### FR-002: Cache Manager Upgrade Handler

Refactor `cache-manager.js` to import store config from constants. The existing upgrade handler logic is already additive (`if (!db.objectStoreNames.contains(store))`) — this is a **refactor**, not a behavior change. The key change is that `CACHE_STORES` comes from `constants.js` instead of a local array, so Phase 1 only needs to add store names to one file.

```js
import { CACHE_DB_NAME, CACHE_DB_VERSION, CACHE_STORES } from './constants.js';

// In openDB:
upgrade(db, oldVersion, newVersion) {
  // Additive only: create missing stores, never delete
  for (const store of CACHE_STORES) {
    if (!db.objectStoreNames.contains(store)) {
      db.createObjectStore(store);
    }
  }
}
```

**Acceptance Criteria:**
- AC-002-1: When `CACHE_DB_VERSION` is bumped and `CACHE_STORES` has new entries, new stores are created
- AC-002-2: Existing stores and their data are preserved across version bumps
- AC-002-3: Current version stays at 1 (no bump in this feature)
- AC-002-4: Local `DB_NAME`, `DB_VERSION`, `STORES` constants removed — imported from `constants.js`

### FR-003: Cache Invalidation

Add to `CacheManager`:

```js
async invalidateStore(storeName) {
  const db = await getDB();
  if (!db.objectStoreNames.contains(storeName)) {
    throw new Error(`CacheManager: store not found: ${storeName}`);
  }
  const tx = db.transaction(storeName, 'readwrite');
  await tx.objectStore(storeName).clear();
  await tx.done;
}

async invalidateAll() {
  const db = await getDB();
  for (const store of CACHE_STORES) {
    if (db.objectStoreNames.contains(store)) {
      const tx = db.transaction(store, 'readwrite');
      await tx.objectStore(store).clear();
      await tx.done;
    }
  }
}
```

**Acceptance Criteria:**
- AC-003-1: `invalidateStore('programs')` clears all entries in the programs store
- AC-003-2: `invalidateAll()` clears all stores without errors
- AC-003-3: `invalidateStore('nonexistent')` throws a descriptive `Error` (explicit guard, not raw IndexedDB error)
- AC-003-4: Not called automatically yet — exposed for Phase 1 admin integration

### FR-004: Atomic Writes

Refactor `AdminAPI` methods for atomicity. **Critical trade-off from critique:**

- `updateProgram(programId, fields)` → **`runTransaction()`** — reads current doc (for FR-005 previous_value) + writes fields + N audit entries atomically. Transaction guarantees consistency even under concurrent edits (unlikely with 1-10 users, but correctness matters for the most sensitive operation).
- `updatePricing(category, data)` → **`writeBatch()`** — read-before-write via `getDoc()` outside batch, then batch the write + 1 audit entry. Lower contention risk, simpler code.
- `updateTranslations(lang, updates)` → **`writeBatch()`** — same pattern as pricing. Per-key save means batch size stays small.

**Why not `runTransaction` everywhere?** Transactions have a 5-second timeout and retry on contention. For pricing/translations (single audit entry, near-zero contention), the simpler `writeBatch` is sufficient. Programs have per-field audit entries making the read-write consistency more important.

**Acceptance Criteria:**
- AC-004-1: All writes in a single `updateProgram` call are atomic (all succeed or all fail)
- AC-004-2: If audit entry creation fails, the content update also rolls back
- AC-004-3: Batch size never exceeds `FIRESTORE_BATCH_LIMIT` operations (validated before commit)
- AC-004-4: Error messages surface to caller (no silent swallowing)
- AC-004-5: `updateProgram` uses `runTransaction`; `updatePricing` and `updateTranslations` use `writeBatch`

### FR-005: Read-Before-Write Audit

Before each write operation, read the current document to capture `previous_value`:

```js
// In updateProgram:
const currentSnap = await getDoc(docRef);
const currentData = currentSnap.exists() ? currentSnap.data() : {};

// Per-field audit entry:
{
  previous_value: currentData[key] ?? null,
  new_value: sanitized[key],
}
```

**Acceptance Criteria:**
- AC-005-1: Audit entries for `updateProgram` contain actual previous field values
- AC-005-2: Audit entries for `updatePricing` contain the previous category document
- AC-005-3: Audit entries for `updateTranslations` contain previous values for changed keys only (iterate update keys against full doc, skip `_meta.*` keys)
- AC-005-4: If the document doesn't exist yet (first write), `previous_value` is `null`
- AC-005-5: The read adds exactly 1 Firestore read per write operation (not per field)

## Non-Functional Requirements

- **NFR-001**: No public-facing behavior changes. All getters return identical data.
- **NFR-002**: No new npm dependencies. `idb` and `firebase/firestore` already present.
- **NFR-003**: All changes backward-compatible. Existing admin UI works without modification.
- **NFR-004**: Unit test coverage for all new/modified functions.

## Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **admin-api.test.js mock restructuring** | Certain | High | Current mocks use `updateDoc`/`addDoc`; FR-004 changes to `runTransaction`/`writeBatch`. Mocks must be rewritten, not patched. Plan as dedicated task. |
| Import path breaks in admin/ (relative `../../js/cms/`) | Low | High | Test all imports in emulator before merge |
| IndexedDB upgrade deletes existing cached data | Low | Medium | Upgrade handler is additive-only; tested with mock |
| Batch write exceeds 500 ops on large translation saves | Very Low | Medium | i18n-editor saves per-key (1 at a time); add batch size guard |
| `getDoc` read-before-write adds latency to saves | Low | Low | 1 read per save (~50ms); acceptable for admin operations |

## File Change Summary

| Action | File | Changes |
|--------|------|---------|
| **Create** | `js/cms/constants.js` | New module — shared constants |
| **Modify** | `js/cms/cache-manager.js` | Import constants, add invalidation methods, upgrade handler params |
| **Modify** | `js/cms/content-service.js` | Import `DEFAULT_CACHE_TTL_MS` from constants |
| **Modify** | `js/cms/admin-api.js` | Import constants, add `runTransaction`/`writeBatch`/`getDoc`, read-before-write |
| **Modify** | `js/cms/auth-service.js` | Import `ROLE_LEVELS` from constants |
| **Modify** | `admin/js/admin-app.js` | Import `ROLE_LEVELS` from constants |
| **Modify** | `admin/js/program-editor.js` | Import `BILINGUAL_FIELDS` from constants |
| **Create** | `tests/unit/constants.test.js` | Unit tests for constants module |
| **Create** | `tests/unit/cache-invalidation.test.js` | Unit tests for invalidation methods |
| **Modify** | `tests/unit/admin-api.test.js` | **High-risk**: Mock restructuring — replace `updateDoc`/`addDoc` mocks with `runTransaction`/`writeBatch` mocks. Existing test assertions preserved but mock setup rewritten. |
| **Modify** | `tests/unit/cache-manager.test.js` | Add tests for `invalidateStore`/`invalidateAll`; update mock to support `objectStoreNames` |
| **Modify** | Various existing test files | Update imports if constants source changes affect mocks |

## Dependencies

- Feature 006 merged to staging (✓ done)
- No Cloud Functions needed
- No Blaze plan required
- No new npm packages

## Scope Boundary (Hard)

The following are **explicitly out of scope** and must NOT be done during Feature 007 implementation, even if tempting "while we're in there":

- Auto-calling `invalidateStore()` inside AdminAPI write methods (Phase 1)
- Adding `status: 'draft' | 'published'` field support (Phase 1)
- Refactoring content-service getters into a generic pattern (Phase 1)
- Any Firestore rules changes

If the implementer identifies a need for these, they open a new spec.

## Success Criteria

1. `npx vitest run` — all existing + new tests green
2. Zero duplicated constants across js/cms/ and admin/js/
3. Admin CMS functional in Firebase emulator (manual smoke test)
4. No public-site behavior change (Playwright regression green)

## Critique Amendments Log

| # | Amendment | Source |
|---|-----------|--------|
| 1 | FR-004: `runTransaction` for `updateProgram`, `writeBatch` for pricing/translations | Critique: `writeBatch` can't include reads needed for FR-005 |
| 2 | FR-003: Explicit store existence guard before `clear()` | Critique: raw IndexedDB error is not a clean application error |
| 3 | FR-001: Added `PRICING_CATEGORIES` and `SUPPORTED_LANGS` | Critique: pricing categories hardcoded in 3 files, langs in 3 files |
| 4 | FR-005: Specified key-extraction approach for translation previous values | Critique: clarify how to get only changed keys' previous values |
| 5 | Risk register: Flagged admin-api.test.js mock restructuring as certain/high | Critique: mock architecture changes with runTransaction/writeBatch |
| 6 | FR-002: Noted as refactor (logic already additive), not behavior change | Critique: avoid implying new logic when it's just import source change |
