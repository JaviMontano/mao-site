/**
 * Admin write operations — edit, validate, audit log.
 * Atomic writes via runTransaction (programs) and writeBatch (pricing, translations).
 * @module js/cms/admin-api
 */
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
  runTransaction,
  writeBatch,
} from 'firebase/firestore';
import { AuthService } from './auth-service.js';
import { BILINGUAL_FIELDS, AUDIT_TTL_MS, FIRESTORE_BATCH_LIMIT } from './constants.js';

let db = null;

/**
 * Strip HTML tags from text input.
 * Uses DOMParser when available, regex fallback in Node.
 * @param {string} input
 * @returns {string}
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  if (typeof DOMParser !== 'undefined') {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || '';
  }
  // Node fallback: strip tags, remove script/style content
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '');
}

/**
 * Navigate a nested object using a dot-notation path.
 * @param {Object} obj
 * @param {string} dotPath - e.g. 'nav.home'
 * @returns {any}
 */
function getNestedValue(obj, dotPath) {
  return dotPath.split('.').reduce(
    (o, k) => (o && typeof o === 'object' ? o[k] : undefined),
    obj,
  );
}

export { getNestedValue };

export const AdminAPI = {
  init(app) {
    db = getFirestore(app);
  },

  sanitizeInput,

  /**
   * Write a standalone audit log entry (for non-batched operations like role changes).
   * @param {Object} entry
   */
  async writeAuditEntry(entry) {
    const user = AuthService.getCurrentUser();
    await addDoc(collection(db, 'audit_log'), {
      timestamp: serverTimestamp(),
      admin_id: user?.uid || 'unknown',
      admin_email: user?.email || 'unknown',
      ...entry,
      ttl: new Date(Date.now() + AUDIT_TTL_MS),
    });
  },

  /**
   * Update a program document with bilingual validation and audit log.
   * Uses runTransaction for atomic read-write consistency.
   * @param {string} programId
   * @param {Object} fields
   */
  async updateProgram(programId, fields) {
    // Validate bilingual pairs
    for (const base of BILINGUAL_FIELDS) {
      const hasEs = `${base}_es` in fields;
      const hasEn = `${base}_en` in fields;
      if (hasEs !== hasEn) {
        throw new Error(`Bilingual validation failed: ${base}_es and ${base}_en must be updated together`);
      }
    }

    // Sanitize all string fields
    const sanitized = {};
    for (const [key, val] of Object.entries(fields)) {
      sanitized[key] = typeof val === 'string' ? sanitizeInput(val) : val;
    }

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

      // Create per-field audit entries with actual previous values
      // doc(collection(...)) generates auto-ID, equivalent to addDoc behavior
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
  },

  /**
   * Update a pricing document.
   * Uses writeBatch for atomic write + audit.
   * @param {string} category
   * @param {Object} data
   */
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

    // doc(collection(...)) generates auto-ID, equivalent to addDoc behavior
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
  },

  /**
   * Merge partial translation updates.
   * Uses writeBatch for atomic write + audit.
   * @param {string} lang
   * @param {Object} updates - Nested key-value partial updates
   */
  async updateTranslations(lang, updates) {
    const user = AuthService.getCurrentUser();
    const docRef = doc(db, 'translations', lang);

    // Flatten nested updates for Firestore dot-notation merge
    const flatUpdates = {};
    function flatten(obj, prefix = '') {
      for (const [k, v] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${k}` : k;
        if (v && typeof v === 'object' && !Array.isArray(v)) {
          flatten(v, path);
        } else {
          flatUpdates[path] = typeof v === 'string' ? sanitizeInput(v) : v;
        }
      }
    }
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
        previousValues[key] = getNestedValue(currentData, key) ?? null;
      }
    }

    const batch = writeBatch(db);

    batch.update(docRef, flatUpdates);

    // doc(collection(...)) generates auto-ID, equivalent to addDoc behavior
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
  },
};
