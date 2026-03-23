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
