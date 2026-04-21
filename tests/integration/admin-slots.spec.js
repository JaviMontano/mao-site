/**
 * Firestore security rules — slots/{pageSlug} (Feature 009, US-8)
 *
 * Tests admin write, public read, non-admin denied for content slots
 * per specs/009-home-landing-sales/tests/features/us-8-admin-content-editor.feature
 * [TS-105, TS-106]
 *
 * Run: firebase emulators:exec --only auth,firestore --config firebase/firebase.json "npx vitest run tests/integration/admin-slots.spec.js"
 */
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const RULES_PATH = resolve(process.cwd(), 'firebase/firestore.rules');
const ADMIN_UID = 'admin-user-001';
const NON_ADMIN_UID = 'regular-user-002';

let testEnv;

// Valid slot document matching the schema: { slotId, variants }
function validSlotDoc() {
  return {
    slots: {
      'hero.headline': {
        slotId: 'hero.headline',
        variants: {
          'persona.es': 'Descubre tu potencial',
          'persona.en': 'Discover your potential',
          'empresa.es': 'Transforma tu equipo',
          'empresa.en': 'Transform your team',
        },
      },
    },
    updatedAt: new Date().toISOString(),
    updatedBy: ADMIN_UID,
  };
}

describe('Feature 009 — slots/{pageSlug} security rules (US-8)', () => {
  beforeAll(async () => {
    const rules = readFileSync(RULES_PATH, 'utf-8');
    testEnv = await initializeTestEnvironment({
      projectId: 'rules-test-slots-009',
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
  // slots/{pageSlug} — admin write [TS-106]
  // -------------------------------------------------------
  describe('slots/{pageSlug} — admin write (TS-106)', () => {
    it('admin with legacy claim can WRITE to slots/', async () => {
      const db = testEnv
        .authenticatedContext(ADMIN_UID, { admin: true })
        .firestore();
      await assertSucceeds(
        db.collection('slots').doc('home').set(validSlotDoc()),
      );
    });

    it('admin with role claim can WRITE to slots/', async () => {
      const db = testEnv
        .authenticatedContext(ADMIN_UID, { role: 'admin' })
        .firestore();
      await assertSucceeds(
        db.collection('slots').doc('home').set(validSlotDoc()),
      );
    });

    it('super_admin can WRITE to slots/', async () => {
      const db = testEnv
        .authenticatedContext(ADMIN_UID, { role: 'super_admin' })
        .firestore();
      await assertSucceeds(
        db.collection('slots').doc('empresas').set(validSlotDoc()),
      );
    });

    it('admin can UPDATE existing slot doc', async () => {
      // Seed via admin context
      const seed = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await seed.collection('slots').doc('home').set(validSlotDoc());

      const db = testEnv
        .authenticatedContext(ADMIN_UID, { admin: true })
        .firestore();
      await assertSucceeds(
        db.collection('slots').doc('home').update({ updatedBy: ADMIN_UID }),
      );
    });

    it('admin can DELETE slot doc', async () => {
      const seed = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await seed.collection('slots').doc('home').set(validSlotDoc());

      const db = testEnv
        .authenticatedContext(ADMIN_UID, { role: 'admin' })
        .firestore();
      await assertSucceeds(
        db.collection('slots').doc('home').delete(),
      );
    });
  });

  // -------------------------------------------------------
  // slots/{pageSlug} — public read
  // -------------------------------------------------------
  describe('slots/{pageSlug} — public read', () => {
    it('unauthenticated user can READ published slots', async () => {
      // Seed a slot doc
      const seed = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await seed.collection('slots').doc('home').set(validSlotDoc());

      const db = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(
        db.collection('slots').doc('home').get(),
      );
    });

    it('authenticated non-admin can READ slots', async () => {
      const seed = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await seed.collection('slots').doc('home').set(validSlotDoc());

      const db = testEnv.authenticatedContext(NON_ADMIN_UID).firestore();
      await assertSucceeds(
        db.collection('slots').doc('home').get(),
      );
    });
  });

  // -------------------------------------------------------
  // slots/{pageSlug} — non-admin denied [TS-105]
  // -------------------------------------------------------
  describe('slots/{pageSlug} — non-admin denied (TS-105)', () => {
    it('unauthenticated user CANNOT write to slots/', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertFails(
        db.collection('slots').doc('home').set(validSlotDoc()),
      );
    });

    it('authenticated non-admin CANNOT write to slots/', async () => {
      const db = testEnv.authenticatedContext(NON_ADMIN_UID).firestore();
      await assertFails(
        db.collection('slots').doc('home').set(validSlotDoc()),
      );
    });

    it('editor role CANNOT write to slots/ (admin+ required)', async () => {
      const db = testEnv
        .authenticatedContext(NON_ADMIN_UID, { role: 'editor' })
        .firestore();
      await assertFails(
        db.collection('slots').doc('home').set(validSlotDoc()),
      );
    });

    it('viewer role CANNOT write to slots/', async () => {
      const db = testEnv
        .authenticatedContext(NON_ADMIN_UID, { role: 'viewer' })
        .firestore();
      await assertFails(
        db.collection('slots').doc('home').set(validSlotDoc()),
      );
    });

    it('non-admin CANNOT delete slots/', async () => {
      const seed = testEnv.withSecurityRulesDisabled((ctx) => ctx.firestore());
      await seed.collection('slots').doc('home').set(validSlotDoc());

      const db = testEnv.authenticatedContext(NON_ADMIN_UID).firestore();
      await assertFails(
        db.collection('slots').doc('home').delete(),
      );
    });
  });
});
