# Feature 007: Infrastructure Hardening — Implementation Plan

**Status**: PLAN (amended post-critique)
**Spec**: `specs/007-infrastructure-hardening/spec.md` (amended post-critique)
**Branch**: `007-infrastructure-hardening`

## Execution Strategy

3 phases, 12 tasks, strict dependency order. Each phase is a logical commit.

**Phase A** — Constants extraction (FR-001). Foundation for everything else. Must land first because all subsequent tasks import from `constants.js`.

**Phase B** — Cache hardening (FR-002, FR-003). Independent from Phase C. Refactors cache-manager to use constants, adds invalidation methods.

**Phase C** — Atomic writes + audit (FR-004, FR-005). Highest complexity. Rewrites admin-api internals + test mocks.

```
Phase A: T01 → T02 → T03 → T04  (constants + consumers + tests + verify)
                                ↓
Phase B:                  T05 → T06  (cache refactor + invalidation)
                                ↓
Phase C:                  T07 → T08 → T09  (atomic writes + test rewrite)
                                          ↓
Phase D:                            T10 → T11 → T12  (verify + smoke + commit)
```

**Sequential execution** — no fictional parallelism. Single agent, one task at a time.

---

## Phase A: Constants Extraction (FR-001)

### T01: Create `js/cms/constants.js`

**FR**: FR-001
**Files**: Create `js/cms/constants.js`
**Approach**:

```js
// Pure exports, zero side effects, zero imports
export const ROLE_LEVELS = { super_admin: 4, admin: 3, editor: 2, viewer: 1 };
export const BILINGUAL_FIELDS = ['title', 'tagline', 'description', 'transformation'];
export const PRICING_CATEGORIES = ['b2c_base', 'b2b_multipliers', 'premium'];
export const SUPPORTED_LANGS = ['es', 'en'];
export const CACHE_DB_NAME = 'metodologia-cms';
export const CACHE_DB_VERSION = 1;
export const CACHE_STORES = ['programs', 'pricing', 'translations'];
export const DEFAULT_CACHE_TTL_MS = 3_600_000;
export const AUDIT_TTL_DAYS = 90;
export const AUDIT_TTL_MS = AUDIT_TTL_DAYS * 24 * 60 * 60 * 1000;
export const FIRESTORE_BATCH_LIMIT = 500;
```

**AC**: AC-001-3 (zero side effects)

### T02: Wire constants into all consumers

**FR**: FR-001
**Depends on**: T01
**Files** (6 modifications):

| File | Remove local | Import from constants |
|------|-------------|----------------------|
| `js/cms/cache-manager.js` | `DB_NAME`, `DB_VERSION`, `STORES` | `CACHE_DB_NAME`, `CACHE_DB_VERSION`, `CACHE_STORES` |
| `js/cms/auth-service.js` | `ROLE_LEVELS` | `ROLE_LEVELS` |
| `js/cms/admin-api.js` | `BILINGUAL_FIELDS`, TTL expression | `BILINGUAL_FIELDS`, `AUDIT_TTL_MS` |
| `js/cms/content-service.js` | `3600000` default literal | `DEFAULT_CACHE_TTL_MS` |
| `admin/js/admin-app.js` | `ROLE_LEVELS` | `ROLE_LEVELS` |
| `admin/js/program-editor.js` | `BILINGUAL_FIELDS` | `BILINGUAL_FIELDS` |

**Approach**: For each file:
1. Add `import { ... } from './constants.js';` (or `'../../js/cms/constants.js'` for admin/)
2. Delete the local constant declaration
3. Verify no other local references to the deleted constant name
4. `content-service.js` line 20: replace `let cacheTtlMs = 3600000` with `let cacheTtlMs = DEFAULT_CACHE_TTL_MS`
5. `content-service.js` line 183: replace `cacheTtlMs = 3600000` in `_reset()` with `cacheTtlMs = DEFAULT_CACHE_TTL_MS`
6. `admin-api.js` lines 59, 102, 131, 171: replace `new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)` with `new Date(Date.now() + AUDIT_TTL_MS)`

**AC**: AC-001-1 (no magic numbers in consumers)

### T03: Test constants module

**FR**: FR-001
**Depends on**: T01
**Files**: Create `tests/unit/constants.test.js`
**Tests**:
- All exports exist and have expected types
- `ROLE_LEVELS` has exactly 4 keys with correct hierarchy order
- `BILINGUAL_FIELDS` has 4 entries
- `PRICING_CATEGORIES` has 3 entries
- `SUPPORTED_LANGS` has 2 entries
- `AUDIT_TTL_MS` equals `90 * 24 * 60 * 60 * 1000` (derived correctly)
- `CACHE_STORES` matches current production store names
- No side effects (module is pure)

### T04: Verify existing tests still pass

**FR**: FR-001
**Depends on**: T02, T03
**Command**: `npx vitest run`
**Expected**: All 46+ existing tests green. If any fail, the constants wiring introduced a regression — fix before proceeding.

**Key risk**: `auth-service.test.js` line 126 has a local `ROLE_LEVELS` in the test itself (not imported from source). This is test-local and should NOT be changed — it's testing behavior, not implementation. Confirm it still passes.

---

## Phase B: Cache Hardening (FR-002, FR-003)

### T05: Refactor cache-manager to import constants

**FR**: FR-002
**Depends on**: T04 (Phase A verified green)
**Files**: Modify `js/cms/cache-manager.js`
**Approach**:
1. Replace lines 7-9 (`DB_NAME`, `DB_VERSION`, `STORES`) with import from `constants.js`
2. Update `getDB()` to use `CACHE_DB_NAME`, `CACHE_DB_VERSION`
3. Update upgrade handler to use `CACHE_STORES`
4. Add `oldVersion, newVersion` params to upgrade handler signature (for future logging/migration)

**This is a refactor** — the logic is already additive. Behavior unchanged.

**AC**: AC-002-4 (local constants removed)

### T06: Add invalidation methods to CacheManager

**FR**: FR-003
**Depends on**: T05
**Files**: Modify `js/cms/cache-manager.js`, modify `tests/unit/cache-manager.test.js`

**Production code** — add to `CacheManager` object:

```js
async invalidateStore(storeName) {
  const db = await getDB();
  if (!db.objectStoreNames.contains(storeName)) {
    throw new Error(`CacheManager: store not found: ${storeName}`);
  }
  const tx = db.transaction(storeName, 'readwrite');
  await tx.objectStore(storeName).clear();
  await tx.done;
},

async invalidateAll() {
  const db = await getDB();
  for (const store of CACHE_STORES) {
    if (db.objectStoreNames.contains(store)) {
      const tx = db.transaction(store, 'readwrite');
      await tx.objectStore(store).clear();
      await tx.done;
    }
  }
},
```

**Test updates** — `cache-manager.test.js`:
- Mock needs `objectStoreNames` property (currently not mocked). Add:
  ```js
  objectStoreNames: { contains: (name) => ['programs', 'pricing', 'translations'].includes(name) }
  ```
- Mock needs `transaction()` that returns `{ objectStore: () => ({ clear: vi.fn() }), done: Promise.resolve() }`
- New test cases:
  - `invalidateStore('programs')` calls `clear()` on programs store
  - `invalidateStore('nonexistent')` throws `Error` with descriptive message
  - `invalidateAll()` calls `clear()` on all 3 stores
  - `invalidateAll()` succeeds even when a store is missing from IndexedDB (skips it)

**AC**: AC-003-1, AC-003-2, AC-003-3, AC-003-4

---

## Phase C: Atomic Writes + Audit (FR-004, FR-005)

### T07: Refactor `updateProgram` to `runTransaction` with read-before-write

**FR**: FR-004, FR-005
**Depends on**: T04 (Phase A verified green)
**Files**: Modify `js/cms/admin-api.js`

**Approach**:
1. Add imports: `runTransaction`, `writeBatch`, `getDoc` from `firebase/firestore`
2. Add import: `FIRESTORE_BATCH_LIMIT` from `constants.js`
3. Rewrite `updateProgram`:

```js
async updateProgram(programId, fields) {
  // Validate bilingual pairs (unchanged)
  for (const base of BILINGUAL_FIELDS) { ... }

  // Sanitize (unchanged)
  const sanitized = { ... };

  const user = AuthService.getCurrentUser();
  sanitized.updated_at = serverTimestamp();
  sanitized.updated_by = user?.email || 'unknown';

  const docRef = doc(db, 'programs', programId);

  // Validate batch size: 1 update + N audit entries
  const auditFieldKeys = Object.keys(fields);
  if (1 + auditFieldKeys.length > FIRESTORE_BATCH_LIMIT) {
    throw new Error(`Batch size ${1 + auditFieldKeys.length} exceeds limit ${FIRESTORE_BATCH_LIMIT}`);
  }

  await runTransaction(db, async (transaction) => {
    // Read current state for previous_value
    const currentSnap = await transaction.get(docRef);
    const currentData = currentSnap.exists() ? currentSnap.data() : {};

    // Write updated fields
    transaction.update(docRef, sanitized);

    // Create audit entries with actual previous values
    for (const [key, val] of Object.entries(fields)) {
      const auditRef = doc(collection(db, 'audit_log'));
      transaction.set(auditRef, {
        timestamp: serverTimestamp(),
        admin_id: user?.uid || 'unknown',
        admin_email: user?.email || 'unknown',
        collection: 'programs',
        document_id: programId,
        field: `programs/${programId}.${key}`,
        previous_value: currentData[key] ?? null,
        new_value: typeof val === 'string' ? sanitizeInput(val) : val,
        ttl: new Date(Date.now() + AUDIT_TTL_MS),
      });
    }
  });
}
```

**Key difference from current code**: `transaction.get()` inside the transaction callback + `transaction.update()` + `transaction.set()` instead of separate `updateDoc()` + `addDoc()` calls.

**Assumption**: Programs always exist before admin edits them (seeded via `scripts/seed-firestore.js`). `transaction.update()` throws if doc doesn't exist — this is acceptable because the admin UI only shows existing programs. No defensive `transaction.set()` fallback needed.

**AC**: AC-004-1, AC-004-2, AC-004-5, AC-005-1, AC-005-4, AC-005-5

### T08: Refactor `updatePricing` and `updateTranslations` to `writeBatch`

**FR**: FR-004, FR-005
**Depends on**: T07 (shares the same file, sequential to avoid merge conflicts)
**Files**: Modify `js/cms/admin-api.js`

**updatePricing**:
```js
async updatePricing(category, data) {
  const user = AuthService.getCurrentUser();
  const docRef = doc(db, 'pricing', category);

  // Read-before-write (outside batch — acceptable for low-contention)
  const currentSnap = await getDoc(docRef);
  const currentData = currentSnap.exists() ? currentSnap.data() : {};

  const batch = writeBatch(db);

  batch.update(docRef, {
    ...data,
    updated_at: serverTimestamp(),
    updated_by: user?.email || 'unknown',
  });

  const auditRef = doc(collection(db, 'audit_log'));
  batch.set(auditRef, {
    timestamp: serverTimestamp(),
    admin_id: user?.uid || 'unknown',
    admin_email: user?.email || 'unknown',
    collection: 'pricing',
    document_id: category,
    field: `pricing/${category}`,
    previous_value: currentData,
    new_value: data,
    ttl: new Date(Date.now() + AUDIT_TTL_MS),
  });

  await batch.commit();
}
```

**updateTranslations**:
```js
async updateTranslations(lang, updates) {
  const user = AuthService.getCurrentUser();
  const docRef = doc(db, 'translations', lang);

  // Flatten nested updates (unchanged logic)
  const flatUpdates = {};
  function flatten(obj, prefix = '') { ... }
  flatten(updates);
  flatUpdates['_meta.updated_at'] = serverTimestamp();
  flatUpdates['_meta.updated_by'] = user?.email || 'unknown';

  // Read-before-write for changed keys only
  const currentSnap = await getDoc(docRef);
  const currentData = currentSnap.exists() ? currentSnap.data() : {};

  // Extract previous values for changed keys (skip _meta.*)
  const previousValues = {};
  for (const key of Object.keys(flatUpdates)) {
    if (!key.startsWith('_meta.')) {
      // Navigate nested currentData with dot-notation key
      previousValues[key] = getNestedValue(currentData, key) ?? null;
    }
  }

  const batch = writeBatch(db);

  batch.update(docRef, flatUpdates);

  const auditRef = doc(collection(db, 'audit_log'));
  batch.set(auditRef, {
    timestamp: serverTimestamp(),
    admin_id: user?.uid || 'unknown',
    admin_email: user?.email || 'unknown',
    collection: 'translations',
    document_id: lang,
    field: `translations/${lang}`,
    previous_value: previousValues,
    new_value: flatUpdates,
    ttl: new Date(Date.now() + AUDIT_TTL_MS),
  });

  await batch.commit();
}
```

**Helper needed** — add `getNestedValue(obj, dotPath)`:
```js
function getNestedValue(obj, dotPath) {
  return dotPath.split('.').reduce((o, k) => (o && typeof o === 'object' ? o[k] : undefined), obj);
}
```

**Note on auto-ID pattern**: `doc(collection(db, 'audit_log'))` generates a Firestore auto-ID reference, equivalent to what `addDoc()` does internally. Comment this in code for reviewer clarity.

**IMPORTANT**: Do NOT delete the existing `writeAuditEntry(entry)` method. It serves standalone callers (e.g., `user-manager.js` for role changes) that don't need batch semantics. The per-method atomic audit writes are separate.

**AC**: AC-004-3, AC-004-4, AC-005-2, AC-005-3

### T09: Rewrite admin-api tests for transaction/batch mocks

**FR**: FR-004, FR-005
**Depends on**: T07, T08
**Files**: Modify `tests/unit/admin-api.test.js`
**Risk**: HIGH (flagged in spec risk register)

**Approach**: Complete mock restructuring. The current mock setup uses `updateDoc`/`addDoc`. The new code uses `runTransaction`/`writeBatch`/`getDoc`.

**New mock setup**:
```js
const mockTransaction = {
  get: vi.fn(),   // Must return Promise — see below
  update: vi.fn(),
  set: vi.fn(),
};

const mockBatch = {
  update: vi.fn(),
  set: vi.fn(),
  commit: vi.fn().mockResolvedValue(undefined),
};

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  doc: vi.fn((...args) => ({ path: args.join('/') })),
  collection: vi.fn(),
  getDoc: vi.fn(),
  // CRITICAL: must return Promise.resolve(fn(...)), not fn(...) synchronously
  runTransaction: vi.fn((db, fn) => Promise.resolve(fn(mockTransaction))),
  writeBatch: vi.fn(() => mockBatch),
  serverTimestamp: vi.fn(() => new Date()),
}));
```

**CRITICAL mock detail**: `mockTransaction.get` must return a document snapshot mock. Set in `beforeEach`:
```js
// Default: document exists with previous data
mockTransaction.get.mockResolvedValue({
  exists: () => true,
  data: () => ({
    title_es: 'Old ES', title_en: 'Old EN',
    tagline_es: 'Old Tag ES', tagline_en: 'Old Tag EN',
    description_es: 'Old Desc ES', description_en: 'Old Desc EN',
    transformation_es: 'Old Trans ES', transformation_en: 'Old Trans EN',
  }),
});

// For "document doesn't exist" test:
mockTransaction.get.mockResolvedValue({
  exists: () => false,
  data: () => null,
});
```

Similarly, `getDoc` (used in pricing/translations `writeBatch` path) needs the same mock pattern:
```js
getDoc.mockResolvedValue({
  exists: () => true,
  data: () => ({ programs: { diagnostico: 10000 } }), // pricing example
});
```

**Test cases to preserve** (same assertions, different mock setup):
- `updateProgram` creates audit log → verify `mockTransaction.set` called
- `updateProgram` rejects incomplete bilingual pair → unchanged (validation before transaction)
- `updatePricing` updates document → verify `mockBatch.update` + `mockBatch.commit` called
- `updateTranslations` merges updates → verify `mockBatch.update` with flat keys

**New test cases**:
- `updateProgram` captures `previous_value` from transaction read
- `updateProgram` sets `previous_value: null` when document doesn't exist
- `updatePricing` captures previous document in audit entry
- `updateTranslations` captures previous values for changed keys only (not `_meta.*`)
- `updateProgram` with batch size exceeding `FIRESTORE_BATCH_LIMIT` throws
- `getNestedValue({a: {b: 1}}, 'a.b')` → `1`
- `getNestedValue({a: {b: 1}}, 'a.c')` → `undefined`
- `getNestedValue({}, 'a.b')` → `undefined`
- `getNestedValue(null, 'a')` → `undefined`
- `sanitizeInput` tests — unchanged, carry over as-is

**AC**: AC-004-1 through AC-005-5

---

## Phase D: Verification

### T10: Run full test suite

**Depends on**: T06, T09
**Command**: `npx vitest run`
**Expected**: All existing + new tests green. Target: ~60+ tests (46 existing + ~14 new).

### T11: Manual smoke test

**Depends on**: T10
**Steps**:
1. Start Firebase emulator: `cd firebase && firebase emulators:start`
2. Start dev server: `npx serve .`
3. Open `localhost:3000` — verify public site loads (NFR-001)
4. Open `localhost:3000/admin/` — verify login + tab rendering
5. If emulator has seed data: edit a program, verify save succeeds
6. Check browser console for import errors

### T12: Commit

**Depends on**: T10 green, T11 pass
**Message**: `feat(007-infrastructure-hardening): constants module, cache invalidation, atomic batch writes with audit history`

---

## Task Summary

| Task | Phase | FR | Files | Depends | Risk |
|------|-------|----|-------|---------|------|
| T01 | A | FR-001 | Create `constants.js` | — | Low |
| T02 | A | FR-001 | Modify 6 consumer files | T01 | Medium |
| T03 | A | FR-001 | Create `constants.test.js` | T01 | Low |
| T04 | A | FR-001 | Verify all tests green | T02, T03 | Low |
| T05 | B | FR-002 | Modify `cache-manager.js` | T04 | Low |
| T06 | B | FR-003 | Modify `cache-manager.js` + tests | T05 | Medium |
| T07 | C | FR-004/005 | Modify `admin-api.js` (updateProgram) | T04 | High |
| T08 | C | FR-004/005 | Modify `admin-api.js` (pricing/translations) | T07 | Medium |
| T09 | C | FR-004/005 | Rewrite `admin-api.test.js` | T07, T08 | **High** |
| T10 | D | — | `npx vitest run` | T06, T09 | Low |
| T11 | D | — | Manual smoke test | T10 | Low |
| T12 | D | — | Git commit | T10, T11 | Low |

## Estimated Test Count

| File | Existing | New | Total |
|------|----------|-----|-------|
| `constants.test.js` | 0 | 8 | 8 |
| `cache-manager.test.js` | 5 | 4 | 9 |
| `admin-api.test.js` | 6 | 10 | 16 |
| Other existing files | 36 | 0 | 36 |
| **Total** | **47** | **22** | **~69** |

## Critique Amendments Log

| # | Amendment | Source |
|---|-----------|--------|
| 1 | Sequential execution diagram (no fictional parallelism) | Single agent can't parallelize |
| 2 | T09: `runTransaction` mock must return `Promise.resolve(fn(...))` | Async/sync mock mismatch |
| 3 | T09: `mockTransaction.get` must return document snapshot mock | Missing mock return value |
| 4 | T09: Added 4 test cases for `getNestedValue` helper | Untested utility function |
| 5 | T07: Documented "programs always exist before edit" assumption | `transaction.update` throws on missing doc |
| 6 | T07/T08: Note `doc(collection(...))` equivalent to `addDoc` auto-ID | Reviewer clarity |
| 7 | T07/T08: Keep `writeAuditEntry` for standalone callers | Prevents accidental deletion |
