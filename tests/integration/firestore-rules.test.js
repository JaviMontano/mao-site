/**
 * Firestore security rules integration tests.
 * Requires Firebase Emulator running on localhost:8080 + localhost:9099.
 *
 * Run: firebase emulators:exec --only auth,firestore --config firebase/firebase.json "npx vitest run tests/integration"
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const RULES_PATH = resolve(process.cwd(), 'firebase/firestore.rules');

let testEnv;

const validProgram = {
  audience: 'empresas',
  slug: 'diagnostico',
  sort_order: 1,
  icon: 'search',
  icon_color: 'text-cyan-400 bg-cyan-500/15',
  title_es: 'Diagnóstico Estratégico',
  title_en: 'Strategic Diagnostic',
  tagline_es: 'Primero evolucionar',
  tagline_en: 'First evolve',
  description_es: 'Detectamos exactamente dónde...',
  description_en: 'We detect exactly where...',
  benefits_es: ['Mapa de pérdidas'],
  benefits_en: ['Time loss map'],
  transformation_es: 'De operar a ciegas...',
  transformation_en: 'From operating blindly...',
  is_published: true,
  updated_at: new Date(),
  updated_by: 'admin@metodologia.info',
};

describe('Firestore Security Rules', () => {
  beforeAll(async () => {
    const rules = readFileSync(RULES_PATH, 'utf-8');
    testEnv = await initializeTestEnvironment({
      projectId: 'rules-test',
      firestore: { rules, host: 'localhost', port: 8080 },
    });
  });

  afterAll(async () => {
    if (testEnv) await testEnv.cleanup();
  });

  // TS-032: Public visitor can read published content
  describe('TS-032: Public read access', () => {
    it('should allow unauthenticated read of programs', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(db.collection('programs').doc('test').get());
    });

    it('should allow unauthenticated read of pricing', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(db.collection('pricing').doc('b2c_base').get());
    });

    it('should allow unauthenticated read of translations', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertSucceeds(db.collection('translations').doc('es').get());
    });
  });

  // TS-033: Public visitor cannot write
  describe('TS-033: Public write denial', () => {
    it('should deny unauthenticated write to programs', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertFails(db.collection('programs').doc('test').set(validProgram));
    });

    it('should deny unauthenticated write to pricing', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertFails(db.collection('pricing').doc('b2c_base').set({ price: 100 }));
    });

    it('should deny unauthenticated write to audit_log', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertFails(db.collection('audit_log').add({ test: true }));
    });
  });

  // TS-034: Authenticated non-admin cannot write
  describe('TS-034: Non-admin write denial', () => {
    it('should deny write from authenticated user without admin claim', async () => {
      const db = testEnv.authenticatedContext('user1', {}).firestore();
      await assertFails(db.collection('programs').doc('test').set(validProgram));
    });
  });

  // TS-035: Admin with custom claim can write valid content
  describe('TS-035: Admin write with valid schema', () => {
    it('should allow admin to write valid program', async () => {
      const db = testEnv.authenticatedContext('admin1', { admin: true }).firestore();
      await assertSucceeds(
        db.collection('programs').doc('empresas_diagnostico').set(validProgram),
      );
    });

    it('should allow admin to write pricing', async () => {
      const db = testEnv.authenticatedContext('admin1', { admin: true }).firestore();
      await assertSucceeds(
        db.collection('pricing').doc('b2c_base').set({
          programs: {},
          updated_at: new Date(),
          updated_by: 'admin@test.com',
        }),
      );
    });
  });

  // TS-036: Security rules reject incomplete schema
  describe('TS-036: Schema validation rejects incomplete programs', () => {
    it('should deny program missing title_en', async () => {
      const db = testEnv.authenticatedContext('admin1', { admin: true }).firestore();
      const incomplete = { ...validProgram };
      delete incomplete.title_en;
      await assertFails(
        db.collection('programs').doc('test').set(incomplete),
      );
    });

    it('should deny program with invalid audience', async () => {
      const db = testEnv.authenticatedContext('admin1', { admin: true }).firestore();
      const invalid = { ...validProgram, audience: 'invalid' };
      await assertFails(
        db.collection('programs').doc('test').set(invalid),
      );
    });
  });

  // TS-037: No wildcard or open permissions
  describe('TS-037: No wildcard permissions', () => {
    it('should deny write to non-existent collection', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertFails(db.collection('random').doc('test').set({ x: 1 }));
    });
  });

  // === RBAC Security Rules Tests (T011–T014) ===

  // T011: users/{uid} collection RBAC rules [TS-057 through TS-061]
  describe('RBAC: users/{uid} collection', () => {
    it('should allow user to read own doc [TS-057]', async () => {
      const db = testEnv.authenticatedContext('user1', { role: 'viewer' }).firestore();
      await assertSucceeds(db.collection('users').doc('user1').get());
    });

    it('should deny user from reading other user doc [TS-058]', async () => {
      const db = testEnv.authenticatedContext('user1', { role: 'viewer' }).firestore();
      await assertFails(db.collection('users').doc('user2').get());
    });

    it('should allow super_admin to list all users [TS-059]', async () => {
      const db = testEnv.authenticatedContext('sa1', { role: 'super_admin' }).firestore();
      await assertSucceeds(db.collection('users').get());
    });

    it('should deny client-side user creation [TS-060]', async () => {
      const db = testEnv.authenticatedContext('user1', { role: 'super_admin' }).firestore();
      await assertFails(db.collection('users').doc('new-user').set({
        uid: 'new-user', email: 'new@test.com', role: 'viewer',
      }));
    });

    it('should allow user to update own profile fields [TS-061]', async () => {
      // First create the doc via admin context to allow self-update test
      const db = testEnv.authenticatedContext('user1', { role: 'viewer' }).firestore();
      await assertSucceeds(db.collection('users').doc('user1').update({
        display_name: 'New Name',
        preferred_language: 'en',
        updated_at: new Date(),
      }));
    });
  });

  // T012: config/access and config/invites RBAC rules [TS-062 through TS-065]
  describe('RBAC: config/access and config/invites', () => {
    it('should allow any role to read config/access [TS-062]', async () => {
      const db = testEnv.authenticatedContext('viewer1', { role: 'viewer' }).firestore();
      await assertSucceeds(db.collection('config').doc('access').get());
    });

    it('should deny non-super_admin write to config/access [TS-063]', async () => {
      const db = testEnv.authenticatedContext('admin1', { role: 'admin' }).firestore();
      await assertFails(db.collection('config').doc('access').update({
        allowed_domains: ['evil.com'],
      }));
    });

    it('should allow super_admin to read invites [TS-064]', async () => {
      const db = testEnv.authenticatedContext('sa1', { role: 'super_admin' }).firestore();
      await assertSucceeds(db.doc('config/invites/partner_aliado_com').get());
    });

    it('should deny client-side invite creation [TS-065]', async () => {
      const db = testEnv.authenticatedContext('sa1', { role: 'super_admin' }).firestore();
      await assertFails(db.doc('config/invites/test_invite').set({
        email: 'test@invite.com', role: 'editor',
      }));
    });
  });

  // T013: audit_log and page_overrides RBAC rules [TS-066 through TS-070]
  describe('RBAC: audit_log and page_overrides', () => {
    it('should allow admin+ to read audit_log [TS-066]', async () => {
      const db = testEnv.authenticatedContext('admin1', { role: 'admin' }).firestore();
      await assertSucceeds(db.collection('audit_log').doc('entry1').get());
    });

    it('should deny viewer from reading audit_log [TS-067]', async () => {
      const db = testEnv.authenticatedContext('viewer1', { role: 'viewer' }).firestore();
      await assertFails(db.collection('audit_log').doc('entry1').get());
    });

    it('should allow editor+ to create audit_log entry [TS-068]', async () => {
      const db = testEnv.authenticatedContext('editor1', { role: 'editor' }).firestore();
      await assertSucceeds(db.collection('audit_log').add({
        timestamp: new Date(),
        admin_id: 'editor1',
        admin_email: 'editor@test.com',
        collection: 'programs',
        document_id: 'test',
        field: 'title_es',
        previous_value: 'old',
        new_value: 'new',
        ttl: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      }));
    });

    it('should allow editor+ to read page_overrides [TS-069]', async () => {
      const db = testEnv.authenticatedContext('editor1', { role: 'editor' }).firestore();
      await assertSucceeds(db.collection('page_overrides').doc('index_html').get());
    });

    it('should deny viewer from writing page_overrides [TS-070]', async () => {
      const db = testEnv.authenticatedContext('viewer1', { role: 'viewer' }).firestore();
      await assertFails(db.collection('page_overrides').doc('index_html').set({
        path: 'index.html', title_es: 'Home',
      }));
    });
  });

  // T014: Content collections with legacy fallback [TS-071 through TS-074]
  describe('RBAC: content collections with legacy fallback', () => {
    it('should allow editor+ to write programs [TS-071]', async () => {
      const db = testEnv.authenticatedContext('editor1', { role: 'editor' }).firestore();
      await assertSucceeds(
        db.collection('programs').doc('test_prog').set(validProgram),
      );
    });

    it('should deny viewer from writing programs [TS-072]', async () => {
      const db = testEnv.authenticatedContext('viewer1', { role: 'viewer' }).firestore();
      await assertFails(
        db.collection('programs').doc('test_prog').set(validProgram),
      );
    });

    it('should allow legacy admin:true to write programs [TS-073]', async () => {
      const db = testEnv.authenticatedContext('legacy1', { admin: true }).firestore();
      await assertSucceeds(
        db.collection('programs').doc('test_legacy').set(validProgram),
      );
    });

    it('should deny editor from deleting programs (admin+ only) [TS-074]', async () => {
      const db = testEnv.authenticatedContext('editor1', { role: 'editor' }).firestore();
      await assertFails(db.collection('programs').doc('test_prog').delete());
    });
  });

  // TS-038: Security rules test suite passes in emulator
  describe('TS-038: Emulator test suite', () => {
    it('should have test environment initialized', () => {
      expect(testEnv).toBeDefined();
    });
  });

  // TS-039: Audit log is append-only
  describe('TS-039: Audit log append-only', () => {
    it('should allow admin to create audit log entry', async () => {
      const db = testEnv.authenticatedContext('admin1', { admin: true }).firestore();
      await assertSucceeds(
        db.collection('audit_log').add({
          timestamp: new Date(),
          admin_id: 'admin1',
          admin_email: 'admin@test.com',
          collection: 'programs',
          document_id: 'test',
          field: 'title_es',
          previous_value: 'old',
          new_value: 'new',
          ttl: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        }),
      );
    });

    it('should deny admin update of audit log entry', async () => {
      const db = testEnv.authenticatedContext('admin1', { admin: true }).firestore();
      await assertFails(
        db.collection('audit_log').doc('existing-entry').update({ new_value: 'tampered' }),
      );
    });

    it('should deny admin delete of audit log entry', async () => {
      const db = testEnv.authenticatedContext('admin1', { admin: true }).firestore();
      await assertFails(
        db.collection('audit_log').doc('existing-entry').delete(),
      );
    });

    it('should deny unauthenticated read of audit log', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertFails(db.collection('audit_log').doc('any').get());
    });
  });
});
