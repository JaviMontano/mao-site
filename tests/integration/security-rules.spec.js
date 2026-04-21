/**
 * Firestore security rules — leads/ + diagnostics/ (Feature 009)
 *
 * Tests append-only PII collections per Constitution XXII and
 * specs/009-home-landing-sales/contracts/firestore-rules.md.
 *
 * Run: firebase emulators:exec --only auth,firestore --config firebase/firebase.json "npx vitest run tests/integration/security-rules.spec.js"
 */
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { serverTimestamp } from 'firebase/firestore';

const RULES_PATH = resolve(process.cwd(), 'firebase/firestore.rules');
const TEST_UID = 'test-user-abc';
const OTHER_UID = 'other-user-xyz';

let testEnv;

// Valid lead payload matching the contract schema
function validLead(uid) {
  return {
    uid,
    email: 'test@example.com',
    name: 'Test User',
    consent: { pii: true },
    segmento: 'persona',
    locale: 'es',
    createdAt: serverTimestamp(),
  };
}

// Valid diagnostic payload matching the contract schema
function validDiagnostic(uid) {
  return {
    uid,
    leadUid: uid,
    status: 'completed',
    steps: [
      { id: 1, answer: 'a' },
      { id: 2, answer: 'b' },
      { id: 3, answer: 'c' },
      { id: 4, answer: 'd' },
      { id: 5, answer: 'e' },
    ],
    resultado: {
      nivel_id: 'explorer',
      score: 7,
    },
    locale: 'es',
    completedAt: serverTimestamp(),
  };
}

describe('Feature 009 — leads/ + diagnostics/ security rules', () => {
  beforeAll(async () => {
    const rules = readFileSync(RULES_PATH, 'utf-8');
    testEnv = await initializeTestEnvironment({
      projectId: 'rules-test-009',
      firestore: { rules, host: 'localhost', port: 8080 },
    });
  });

  afterEach(async () => {
    if (testEnv) await testEnv.clearFirestore();
  });

  afterAll(async () => {
    if (testEnv) await testEnv.cleanup();
  });

  // -------------------------------------------------------
  // leads/{uid}
  // -------------------------------------------------------
  describe('leads/{uid} — append-only PII (Constitution XXII)', () => {
    it('authenticated user can CREATE own doc (uid match)', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertSucceeds(
        db.collection('leads').doc(TEST_UID).set(validLead(TEST_UID)),
      );
    });

    it('authenticated user CANNOT create doc with different uid', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(
        db.collection('leads').doc(OTHER_UID).set(validLead(OTHER_UID)),
      );
    });

    it('authenticated user CANNOT update own doc (append-only)', async () => {
      // Seed via admin context so the doc exists
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('leads').doc(TEST_UID).set(validLead(TEST_UID));

      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(
        db.collection('leads').doc(TEST_UID).update({ name: 'Changed' }),
      );
    });

    it('authenticated user CANNOT delete own doc', async () => {
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('leads').doc(TEST_UID).set(validLead(TEST_UID));

      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(
        db.collection('leads').doc(TEST_UID).delete(),
      );
    });

    it('unauthenticated CANNOT create', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertFails(
        db.collection('leads').doc(TEST_UID).set(validLead(TEST_UID)),
      );
    });

    it('authenticated CANNOT create without consent.pii == true', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      const bad = { ...validLead(TEST_UID), consent: { pii: false } };
      await assertFails(
        db.collection('leads').doc(TEST_UID).set(bad),
      );
    });

    it('authenticated CANNOT create with invalid segmento', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      const bad = { ...validLead(TEST_UID), segmento: 'invalid_value' };
      await assertFails(
        db.collection('leads').doc(TEST_UID).set(bad),
      );
    });

    it('authenticated CANNOT create with uid mismatch in payload', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      const bad = { ...validLead(TEST_UID), uid: OTHER_UID };
      await assertFails(
        db.collection('leads').doc(TEST_UID).set(bad),
      );
    });
  });

  // -------------------------------------------------------
  // diagnostics/{uid}
  // -------------------------------------------------------
  describe('diagnostics/{uid} — append-only PII (Constitution XXII)', () => {
    it('authenticated user can CREATE own doc (uid match)', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertSucceeds(
        db.collection('diagnostics').doc(TEST_UID).set(validDiagnostic(TEST_UID)),
      );
    });

    it('authenticated user CANNOT create doc with different uid', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(
        db.collection('diagnostics').doc(OTHER_UID).set(validDiagnostic(OTHER_UID)),
      );
    });

    it('authenticated user CANNOT update own doc', async () => {
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('diagnostics').doc(TEST_UID).set(validDiagnostic(TEST_UID));

      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(
        db.collection('diagnostics').doc(TEST_UID).update({ status: 'modified' }),
      );
    });

    it('authenticated user CANNOT delete own doc', async () => {
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('diagnostics').doc(TEST_UID).set(validDiagnostic(TEST_UID));

      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(
        db.collection('diagnostics').doc(TEST_UID).delete(),
      );
    });

    it('unauthenticated CANNOT create', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertFails(
        db.collection('diagnostics').doc(TEST_UID).set(validDiagnostic(TEST_UID)),
      );
    });

    it('CANNOT create with only 4 steps (requires 5)', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      const bad = {
        ...validDiagnostic(TEST_UID),
        steps: [
          { id: 1, answer: 'a' },
          { id: 2, answer: 'b' },
          { id: 3, answer: 'c' },
          { id: 4, answer: 'd' },
        ],
      };
      await assertFails(
        db.collection('diagnostics').doc(TEST_UID).set(bad),
      );
    });

    it('CANNOT create with score > 15', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      const bad = {
        ...validDiagnostic(TEST_UID),
        resultado: { nivel_id: 'explorer', score: 16 },
      };
      await assertFails(
        db.collection('diagnostics').doc(TEST_UID).set(bad),
      );
    });

    it('CANNOT create with invalid nivel_id', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      const bad = {
        ...validDiagnostic(TEST_UID),
        resultado: { nivel_id: 'master', score: 10 },
      };
      await assertFails(
        db.collection('diagnostics').doc(TEST_UID).set(bad),
      );
    });
  });

  // -------------------------------------------------------
  // Deny-by-default fallback
  // -------------------------------------------------------
  describe('deny-by-default', () => {
    it('write to unknown collection is denied', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(
        db.collection('unknown_collection').doc('test').set({ x: 1 }),
      );
    });
  });
});
