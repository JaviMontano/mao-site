/**
 * Admin write operations — edit, validate, audit log.
 * @module js/cms/admin-api
 */
import {
  getFirestore,
  doc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { AuthService } from './auth-service.js';

let db = null;

// Bilingual field pairs that must be updated together
const BILINGUAL_FIELDS = [
  'title', 'tagline', 'description', 'transformation',
];

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

export const AdminAPI = {
  init(app) {
    db = getFirestore(app);
  },

  sanitizeInput,

  /**
   * Write an audit log entry with extended action types.
   * @param {Object} entry
   */
  async writeAuditEntry(entry) {
    const user = AuthService.getCurrentUser();
    await addDoc(collection(db, 'audit_log'), {
      timestamp: serverTimestamp(),
      admin_id: user?.uid || 'unknown',
      admin_email: user?.email || 'unknown',
      ...entry,
      ttl: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  },

  /**
   * Update a program document with bilingual validation and audit log.
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
    await updateDoc(docRef, sanitized);

    // Create audit log entry with fully qualified field paths
    for (const [key, val] of Object.entries(fields)) {
      await addDoc(collection(db, 'audit_log'), {
        timestamp: serverTimestamp(),
        admin_id: user?.uid || 'unknown',
        admin_email: user?.email || 'unknown',
        collection: 'programs',
        document_id: programId,
        field: `programs/${programId}.${key}`,
        previous_value: null, // Would need a read-before-write for actual previous
        new_value: typeof val === 'string' ? sanitizeInput(val) : val,
        ttl: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      });
    }
  },

  /**
   * Update a pricing document.
   * @param {string} category
   * @param {Object} data
   */
  async updatePricing(category, data) {
    const user = AuthService.getCurrentUser();
    const docRef = doc(db, 'pricing', category);
    await updateDoc(docRef, {
      ...data,
      updated_at: serverTimestamp(),
      updated_by: user?.email || 'unknown',
    });

    await addDoc(collection(db, 'audit_log'), {
      timestamp: serverTimestamp(),
      admin_id: user?.uid || 'unknown',
      admin_email: user?.email || 'unknown',
      collection: 'pricing',
      document_id: category,
      field: `pricing/${category}`,
      previous_value: null,
      new_value: data,
      ttl: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  },

  /**
   * Merge partial translation updates.
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

    await updateDoc(docRef, flatUpdates);

    await addDoc(collection(db, 'audit_log'), {
      timestamp: serverTimestamp(),
      admin_id: user?.uid || 'unknown',
      admin_email: user?.email || 'unknown',
      collection: 'translations',
      document_id: lang,
      field: `translations/${lang}`,
      previous_value: null,
      new_value: flatUpdates,
      ttl: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    });
  },
};
