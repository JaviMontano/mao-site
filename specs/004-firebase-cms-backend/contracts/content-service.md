# Content Service API Contract

**Module**: `js/cms/content-service.js`
**Type**: ES Module (browser)

## Public API

### `ContentService.init(config)`

Initialize the content service with Firebase app and cache settings.

```js
/**
 * @param {Object} config
 * @param {FirebaseApp} config.app - Initialized Firebase app instance
 * @param {number} [config.cacheTtlMs=3600000] - Cache TTL in milliseconds (default: 1 hour)
 * @returns {Promise<void>}
 */
await ContentService.init({ app, cacheTtlMs: 3600000 });
```

**Behavior**:
1. Initializes Firestore instance from app
2. Reads `config/settings` for `migrated_collections` and `cache_ttl_ms`
3. Initializes IndexedDB cache via CacheManager
4. Marks service as ready

---

### `ContentService.getPrograms(audience)`

Fetch program catalog for a given audience.

```js
/**
 * @param {'empresas' | 'personas'} audience
 * @returns {Promise<Program[]>}
 *
 * @typedef {Object} Program
 * @property {string} id - Document ID (e.g., 'empresas_diagnostico')
 * @property {string} slug
 * @property {number} sort_order
 * @property {string} icon
 * @property {string} icon_color
 * @property {string} title_es
 * @property {string} title_en
 * @property {string} tagline_es
 * @property {string} tagline_en
 * @property {string} description_es
 * @property {string} description_en
 * @property {string[]} benefits_es
 * @property {string[]} benefits_en
 * @property {string} transformation_es
 * @property {string} transformation_en
 */
const programs = await ContentService.getPrograms('empresas');
```

**Resolution order**:
1. If `programs` in `migrated_collections`: query Firestore `programs` where `audience == audience && is_published == true`, ordered by `sort_order`
2. If Firestore fails or not migrated: return cached data from IndexedDB
3. If no cache: return `null` (caller falls back to static HTML)

---

### `ContentService.getPricing(category)`

Fetch pricing data by category.

```js
/**
 * @param {'b2c_base' | 'b2b_multipliers' | 'premium'} category
 * @returns {Promise<Object>} - Document data (shape varies by category, see data-model.md)
 */
const b2cPrices = await ContentService.getPricing('b2c_base');
```

**Resolution order**: Same as `getPrograms` — Firestore → cache → null.

---

### `ContentService.getTranslations(lang)`

Fetch translation dictionary for a language.

```js
/**
 * @param {'es' | 'en'} lang
 * @returns {Promise<Object>} - Nested key-value translation dictionary
 */
const translations = await ContentService.getTranslations('es');
```

**Resolution order**:
1. If `translations` in `migrated_collections`: read Firestore `translations/{lang}`, strip `_meta` field
2. If Firestore fails: return cached translations from IndexedDB
3. If no cache: return `null` (caller falls back to static JSON file)

**i18n integration**: The `i18n.js` module calls this method instead of `fetchJSON` when the content service is available. If it returns `null`, `i18n.js` falls back to its existing XHR-based JSON fetch.

---

### `ContentService.isReady()`

```js
/** @returns {boolean} */
const ready = ContentService.isReady();
```

Returns `true` after `init()` completes. Pages check this before calling other methods.

---

### `ContentService.onReady(callback)`

```js
/** @param {Function} callback */
ContentService.onReady(() => { /* render content */ });
```

Calls `callback` immediately if already ready, otherwise queues it.

---

## Cache Manager Contract

**Module**: `js/cms/cache-manager.js`

### `CacheManager.get(storeName, key)`

```js
/**
 * @param {string} storeName - IndexedDB object store ('programs', 'pricing', 'translations')
 * @param {string} key - Document ID or cache key
 * @returns {Promise<{ data: any, cachedAt: number } | null>}
 */
```

### `CacheManager.set(storeName, key, data)`

```js
/**
 * @param {string} storeName
 * @param {string} key
 * @param {any} data - Structured-clonable data
 * @returns {Promise<void>}
 */
```

Automatically sets `cachedAt = Date.now()`.

### `CacheManager.isStale(entry, ttlMs)`

```js
/**
 * @param {{ cachedAt: number }} entry
 * @param {number} ttlMs
 * @returns {boolean}
 */
```

---

## Admin API Contract

**Module**: `js/cms/admin-api.js`

### `AdminAPI.updateProgram(programId, fields)`

```js
/**
 * @param {string} programId - e.g., 'empresas_diagnostico'
 * @param {Partial<Program>} fields - Fields to update
 * @returns {Promise<void>}
 * @throws {ValidationError} if required fields missing or lang variant incomplete
 * @throws {AuthError} if user lacks admin claim
 */
await AdminAPI.updateProgram('empresas_diagnostico', {
  description_es: 'New description',
  description_en: 'New description EN'
});
```

**Behavior**:
1. Validates all required fields present (client-side pre-check)
2. Validates both language variants present for bilingual fields
3. Sets `updated_at` and `updated_by` automatically
4. Writes to Firestore (security rules enforce server-side validation)
5. Creates audit log entry with previous values

### `AdminAPI.updatePricing(category, data)`

```js
/**
 * @param {'b2c_base' | 'b2b_multipliers' | 'premium'} category
 * @param {Object} data - Updated pricing data
 * @returns {Promise<void>}
 */
```

### `AdminAPI.updateTranslations(lang, updates)`

```js
/**
 * @param {'es' | 'en'} lang
 * @param {Object} updates - Partial nested key-value updates (merged, not replaced)
 * @returns {Promise<void>}
 */
```

---

## Auth Service Contract

**Module**: `js/cms/auth-service.js`

### `AuthService.signIn()`

```js
/** @returns {Promise<User>} - Firebase User object */
const user = await AuthService.signIn();
```

Triggers Google sign-in popup. Returns authenticated user.

### `AuthService.isAdmin()`

```js
/** @returns {Promise<boolean>} */
const admin = await AuthService.isAdmin();
```

Checks `auth.currentUser.getIdTokenResult()` for `claims.admin === true`.

### `AuthService.onAuthStateChanged(callback)`

```js
/** @param {Function} callback - receives (user | null) */
AuthService.onAuthStateChanged((user) => { /* update UI */ });
```

### `AuthService.signOut()`

```js
/** @returns {Promise<void>} */
await AuthService.signOut();
```
