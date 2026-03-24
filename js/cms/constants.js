/**
 * Shared constants — single source of truth for CMS configuration.
 * Pure exports, zero side effects, zero imports.
 * @module js/cms/constants
 */

/** Role hierarchy for RBAC permission checks. */
export const ROLE_LEVELS = { super_admin: 4, admin: 3, editor: 2, viewer: 1 };

/** Bilingual field bases requiring ES/EN pair validation. */
export const BILINGUAL_FIELDS = ['title', 'tagline', 'description', 'transformation'];

/** Pricing document categories in Firestore. */
export const PRICING_CATEGORIES = ['b2c_base', 'b2b_multipliers', 'premium'];

/** Supported i18n language codes. */
export const SUPPORTED_LANGS = ['es', 'en'];

/** IndexedDB database name. */
export const CACHE_DB_NAME = 'metodologia-cms';

/** IndexedDB schema version — bump when CACHE_STORES changes. */
export const CACHE_DB_VERSION = 1;

/** IndexedDB object store names (one per cached collection). */
export const CACHE_STORES = ['programs', 'pricing', 'translations'];

/** Default cache TTL in milliseconds (1 hour). */
export const DEFAULT_CACHE_TTL_MS = 3_600_000;

/** Audit log retention in days. */
export const AUDIT_TTL_DAYS = 90;

/** Audit log retention in milliseconds (derived). */
export const AUDIT_TTL_MS = AUDIT_TTL_DAYS * 24 * 60 * 60 * 1000;

/** Firestore batch/transaction operation limit (safety rail). */
export const FIRESTORE_BATCH_LIMIT = 500;
