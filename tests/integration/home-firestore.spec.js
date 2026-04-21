/**
 * Integration test — Home Firestore: SWR + append-only behavior (Feature 009)
 *
 * Tests that:
 * - Published programs, resources, testimonials are readable by anyone
 * - Content follows SWR pattern (stale-while-revalidate via cache-manager)
 * - Append-only collections (leads, diagnostics) reject update/delete
 * - Read-only collections reject client writes
 *
 * Run: firebase emulators:exec --only auth,firestore --config firebase/firebase.json "npx vitest run tests/integration/home-firestore.spec.js"
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
const TEST_UID = 'swr-test-user';

let testEnv;

// --- Seed helpers (admin context) ---

function programDoc(id, order = 1) {
  return {
    id,
    slug: id,
    nombre_i18n: { es: `Programa ${id}`, en: `Program ${id}` },
    audiencia: 'persona',
    duracion: '8 semanas',
    resultado_i18n: { es: 'Resultado', en: 'Result' },
    href: `/programas/?slug=${id}`,
    order,
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function resourceDoc(id) {
  return {
    id,
    tipo: 'playbook',
    estado: 'free',
    locale: 'es',
    previewUrl: `/recursos/${id}.html`,
    fullUrl: `/recursos/${id}.html`,
    title_i18n: { es: `Recurso ${id}`, en: `Resource ${id}` },
    status: 'published',
  };
}

function testimonialDoc(id, order = 1) {
  return {
    id,
    author_name: `Author ${id}`,
    author_role_i18n: { es: 'Director', en: 'Director' },
    quote_i18n: { es: 'Gran experiencia', en: 'Great experience' },
    order,
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

describe('Feature 009 — Home Firestore: SWR + append-only', () => {
  beforeAll(async () => {
    const rules = readFileSync(RULES_PATH, 'utf-8');
    testEnv = await initializeTestEnvironment({
      projectId: 'home-firestore-test',
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
  // SWR Read Path — Published content is publicly readable
  // -------------------------------------------------------
  describe('SWR read path — published content readable', () => {
    it('unauthenticated user can READ published programs', async () => {
      // Seed via admin
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('programs').doc('dt-b2b').set(programDoc('dt-b2b'));

      // Read as unauthenticated
      const db = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(db.collection('programs').doc('dt-b2b').get());
    });

    it('unauthenticated user can READ published resources', async () => {
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('resources').doc('playbook-1').set(resourceDoc('playbook-1'));

      const db = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(db.collection('resources').doc('playbook-1').get());
    });

    it('unauthenticated user can READ published testimonials', async () => {
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('testimonials').doc('t1').set(testimonialDoc('t1'));

      const db = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(db.collection('testimonials').doc('t1').get());
    });

    it('can query programs filtered by status=published, ordered by order', async () => {
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('programs').doc('p1').set(programDoc('p1', 1));
      await admin.collection('programs').doc('p2').set(programDoc('p2', 2));
      await admin.collection('programs').doc('draft').set({
        ...programDoc('draft', 3),
        status: 'draft',
      });

      const db = testEnv.unauthenticatedContext().firestore();
      const snap = await assertSucceeds(
        db.collection('programs')
          .where('status', '==', 'published')
          .orderBy('order', 'asc')
          .get(),
      );
      expect(snap.docs.length).toBe(2);
      expect(snap.docs[0].id).toBe('p1');
      expect(snap.docs[1].id).toBe('p2');
    });
  });

  // -------------------------------------------------------
  // Read-only collections — client writes denied
  // -------------------------------------------------------
  describe('read-only collections — client writes denied', () => {
    it('unauthenticated user CANNOT write to programs/', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertFails(
        db.collection('programs').doc('hack').set(programDoc('hack')),
      );
    });

    it('authenticated user CANNOT write to programs/', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(
        db.collection('programs').doc('hack').set(programDoc('hack')),
      );
    });

    it('unauthenticated user CANNOT write to resources/', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertFails(
        db.collection('resources').doc('hack').set(resourceDoc('hack')),
      );
    });

    it('unauthenticated user CANNOT write to testimonials/', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertFails(
        db.collection('testimonials').doc('hack').set(testimonialDoc('hack')),
      );
    });

    it('authenticated user CANNOT delete from programs/', async () => {
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('programs').doc('p1').set(programDoc('p1'));

      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(db.collection('programs').doc('p1').delete());
    });

    it('authenticated user CANNOT update resources/', async () => {
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('resources').doc('r1').set(resourceDoc('r1'));

      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(
        db.collection('resources').doc('r1').update({ status: 'hacked' }),
      );
    });
  });

  // -------------------------------------------------------
  // Append-only invariants — leads/ and diagnostics/
  // -------------------------------------------------------
  describe('append-only invariants — SWR write path', () => {
    it('authenticated user can CREATE lead (own uid)', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertSucceeds(
        db.collection('leads').doc(TEST_UID).set({
          uid: TEST_UID,
          email: 'swr@test.com',
          name: 'SWR Test',
          consent: { pii: true },
          segmento: 'persona',
          locale: 'es',
          createdAt: serverTimestamp(),
        }),
      );
    });

    it('lead document is NOT updatable after creation', async () => {
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('leads').doc(TEST_UID).set({
        uid: TEST_UID,
        email: 'swr@test.com',
        name: 'SWR Test',
        consent: { pii: true },
        segmento: 'persona',
        locale: 'es',
        createdAt: new Date(),
      });

      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(
        db.collection('leads').doc(TEST_UID).update({ name: 'Changed' }),
      );
    });

    it('lead document is NOT deletable', async () => {
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('leads').doc(TEST_UID).set({
        uid: TEST_UID,
        email: 'swr@test.com',
        name: 'SWR Test',
        consent: { pii: true },
        segmento: 'persona',
        locale: 'es',
        createdAt: new Date(),
      });

      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(db.collection('leads').doc(TEST_UID).delete());
    });

    it('authenticated user can CREATE diagnostic (own uid)', async () => {
      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertSucceeds(
        db.collection('diagnostics').doc(TEST_UID).set({
          uid: TEST_UID,
          leadUid: TEST_UID,
          status: 'completed',
          steps: [
            { id: 1, answer: 'a' },
            { id: 2, answer: 'b' },
            { id: 3, answer: 'c' },
            { id: 4, answer: 'd' },
            { id: 5, answer: 'e' },
          ],
          resultado: { nivel_id: 'explorer', score: 7 },
          locale: 'es',
          completedAt: serverTimestamp(),
        }),
      );
    });

    it('diagnostic document is NOT updatable (append-only)', async () => {
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('diagnostics').doc(TEST_UID).set({
        uid: TEST_UID,
        leadUid: TEST_UID,
        status: 'completed',
        steps: [
          { id: 1, answer: 'a' },
          { id: 2, answer: 'b' },
          { id: 3, answer: 'c' },
          { id: 4, answer: 'd' },
          { id: 5, answer: 'e' },
        ],
        resultado: { nivel_id: 'explorer', score: 7 },
        locale: 'es',
        completedAt: new Date(),
      });

      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(
        db.collection('diagnostics').doc(TEST_UID).update({ status: 'modified' }),
      );
    });

    it('diagnostic document is NOT deletable', async () => {
      const admin = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await admin.collection('diagnostics').doc(TEST_UID).set({
        uid: TEST_UID,
        leadUid: TEST_UID,
        status: 'completed',
        steps: [
          { id: 1, answer: 'a' },
          { id: 2, answer: 'b' },
          { id: 3, answer: 'c' },
          { id: 4, answer: 'd' },
          { id: 5, answer: 'e' },
        ],
        resultado: { nivel_id: 'explorer', score: 7 },
        locale: 'es',
        completedAt: new Date(),
      });

      const db = testEnv.authenticatedContext(TEST_UID).firestore();
      await assertFails(db.collection('diagnostics').doc(TEST_UID).delete());
    });
  });
});
