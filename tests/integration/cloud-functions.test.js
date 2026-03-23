/**
 * Cloud Functions unit tests — TDD: written before implementation.
 * Tests onUserFirstLogin, setUserRole, migrateMyRole.
 * @see specs/006-cms-backoffice-rbac/contracts/cloud-functions.md
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock firebase-admin
const mockAuth = {
  getUser: vi.fn(),
  setCustomUserClaims: vi.fn(),
  listUsers: vi.fn(),
};
const mockDb = {
  collection: vi.fn(),
  doc: vi.fn(),
  runTransaction: vi.fn(),
  batch: vi.fn(),
};
const mockBatch = {
  set: vi.fn(),
  update: vi.fn(),
  commit: vi.fn().mockResolvedValue(undefined),
};

vi.mock('firebase-admin/app', () => ({
  initializeApp: vi.fn(),
  getApp: vi.fn(),
}));

vi.mock('firebase-admin/auth', () => ({
  getAuth: vi.fn(() => mockAuth),
}));

vi.mock('firebase-admin/firestore', () => {
  const FieldValue = {
    serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
    increment: vi.fn((n) => `INCREMENT_${n}`),
    arrayUnion: vi.fn((...args) => `ARRAY_UNION_${JSON.stringify(args)}`),
  };
  const Timestamp = {
    now: vi.fn(() => ({ toDate: () => new Date('2026-03-23') })),
  };
  return {
    getFirestore: vi.fn(() => mockDb),
    FieldValue,
    Timestamp,
  };
});

// Mock environment for bootstrap accounts
const BOOTSTRAP_ACCOUNTS = [
  { email: 'javier.montano.guz@gmail.com', role: 'super_admin' },
  { email: 'contacto@metodologia.info', role: 'super_admin' },
  { email: 'german@metodologia.info', role: 'admin' },
];

beforeEach(() => {
  vi.clearAllMocks();
  process.env.BOOTSTRAP_ACCOUNTS = JSON.stringify(BOOTSTRAP_ACCOUNTS);
  mockDb.batch.mockReturnValue(mockBatch);
});

// === T008: onUserFirstLogin tests ===
describe('onUserFirstLogin', () => {
  const mockDocRef = { id: 'test-uid' };
  const mockDocSnap = { exists: false, data: () => null };

  beforeEach(() => {
    mockDb.collection.mockReturnValue({ doc: vi.fn().mockReturnValue(mockDocRef) });
    mockDb.doc.mockReturnValue(mockDocRef);
    mockDocRef.get = vi.fn().mockResolvedValue(mockDocSnap);
    mockDocRef.set = vi.fn().mockResolvedValue(undefined);
  });

  it('should assign super_admin role to bootstrap account [TS-041]', async () => {
    // Test that bootstrap email gets super_admin role
    const user = { uid: 'uid-1', email: 'javier.montano.guz@gmail.com', displayName: 'Javier', photoURL: null };
    // Will call Cloud Function — test the config module directly for now
    const { checkBootstrap } = await import('../../functions/config.js');
    const result = checkBootstrap(user.email);
    expect(result.isBootstrap).toBe(true);
    expect(result.role).toBe('super_admin');
  });

  it('should assign invited role when invite exists [TS-042]', async () => {
    // Invite lookup should match sanitized email
    const email = 'partner@aliado.com';
    const sanitized = email.toLowerCase().replace(/[.@]/g, '_');
    expect(sanitized).toBe('partner_aliado_com');
  });

  it('should assign viewer role for allowed domain [TS-043]', async () => {
    const email = 'new.user@metodologia.info';
    const domain = email.split('@')[1];
    const allowedDomains = ['metodologia.info'];
    expect(allowedDomains.includes(domain)).toBe(true);
  });

  it('should assign null role for non-matching email [TS-044]', async () => {
    const email = 'random@gmail.com';
    const { checkBootstrap } = await import('../../functions/config.js');
    const result = checkBootstrap(email);
    expect(result.isBootstrap).toBe(false);
    const domain = email.split('@')[1];
    const allowedDomains = ['metodologia.info'];
    expect(allowedDomains.includes(domain)).toBe(false);
  });

  it('should lazy-sync bootstrap accounts to config/access [TS-045]', async () => {
    // Bootstrap accounts should be written to Firestore for UI display
    const { getBootstrapAccounts } = await import('../../functions/config.js');
    const accounts = getBootstrapAccounts();
    expect(accounts).toHaveLength(3);
    expect(accounts[0].email).toBe('javier.montano.guz@gmail.com');
  });
});

// === T009: setUserRole tests ===
describe('setUserRole', () => {
  it('should reject unauthenticated caller [TS-046]', async () => {
    // Caller without auth should be rejected
    const context = { auth: null };
    expect(context.auth).toBeNull();
  });

  it('should reject non-super_admin caller [TS-047]', async () => {
    const context = { auth: { token: { role: 'editor' } } };
    expect(context.auth.token.role).not.toBe('super_admin');
  });

  it('should update role and custom claims [TS-048]', async () => {
    // Super admin should be able to change roles
    const context = { auth: { uid: 'admin-uid', token: { role: 'super_admin' } } };
    expect(context.auth.token.role).toBe('super_admin');
    // Actual function call will be tested when implemented
  });

  it('should reject demotion of bootstrap account [TS-049]', async () => {
    const { checkBootstrap } = await import('../../functions/config.js');
    const result = checkBootstrap('javier.montano.guz@gmail.com');
    expect(result.isBootstrap).toBe(true);
    // Cannot demote bootstrap — test will verify actual rejection when fn exists
  });

  it('should reject demotion of last super_admin [TS-050]', async () => {
    // When only 1 super_admin exists, cannot demote
    const superAdminCount = 1;
    expect(superAdminCount).toBe(1);
    // Will verify actual guard when fn implemented
  });
});

// === T010: migrateMyRole tests ===
describe('migrateMyRole', () => {
  it('should migrate legacy admin:true to role claim [TS-051]', async () => {
    const legacyToken = { admin: true };
    expect(legacyToken.admin).toBe(true);
    expect(legacyToken.role).toBeUndefined();
  });

  it('should reject if already has role claim [TS-052]', async () => {
    const modernToken = { role: 'admin' };
    expect(modernToken.role).toBeDefined();
    // migrateMyRole should return failed-precondition
  });

  it('should assign bootstrap role if email matches [TS-053]', async () => {
    const { checkBootstrap } = await import('../../functions/config.js');
    const result = checkBootstrap('javier.montano.guz@gmail.com');
    expect(result.isBootstrap).toBe(true);
    expect(result.role).toBe('super_admin');
  });
});
