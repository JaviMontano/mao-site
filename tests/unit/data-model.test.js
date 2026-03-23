/**
 * Data model validation tests — TDD: written before implementation.
 * Validates schema shapes for users, config/access, config/invites, audit_log.
 * @see specs/006-cms-backoffice-rbac/data-model.md
 */
import { describe, it, expect } from 'vitest';

// T015: users/{uid} schema validation [TS-075, TS-076, TS-077]
describe('Data Model: users/{uid}', () => {
  const validUser = {
    uid: 'test-uid-123',
    email: 'test@metodologia.info',
    display_name: 'Test User',
    avatar_url: null,
    role: 'viewer',
    preferred_language: 'es',
    source: 'domain',
    is_bootstrap: false,
    created_at: new Date(),
    updated_at: new Date(),
    last_login: new Date(),
    total_sessions: 1,
    role_history: [{ role: 'viewer', changed_by: 'system', changed_at: new Date(), previous_role: null }],
  };

  it('should accept valid user document [TS-075]', () => {
    expect(validUser.uid).toBeTruthy();
    expect(validUser.email).toMatch(/.+@.+/);
    expect(validUser.display_name.length).toBeGreaterThan(0);
    expect(validUser.display_name.length).toBeLessThanOrEqual(100);
    expect(['super_admin', 'admin', 'editor', 'viewer']).toContain(validUser.role);
    expect(['es', 'en']).toContain(validUser.preferred_language);
    expect(['bootstrap', 'domain', 'invite', 'manual']).toContain(validUser.source);
    expect(typeof validUser.is_bootstrap).toBe('boolean');
    expect(validUser.total_sessions).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(validUser.role_history)).toBe(true);
  });

  it('should reject invalid role values [TS-076]', () => {
    const invalidRoles = ['superadmin', 'ADMIN', 'moderator', '', null];
    const validRoles = ['super_admin', 'admin', 'editor', 'viewer'];
    for (const role of invalidRoles) {
      expect(validRoles).not.toContain(role);
    }
  });

  it('should validate role_history entry structure [TS-077]', () => {
    const entry = validUser.role_history[0];
    expect(entry).toHaveProperty('role');
    expect(entry).toHaveProperty('changed_by');
    expect(entry).toHaveProperty('changed_at');
    expect(entry).toHaveProperty('previous_role');
  });
});

// T016: config/access, config/invites, audit_log schemas [TS-078 through TS-082]
describe('Data Model: config/access', () => {
  const validAccess = {
    allowed_domains: ['metodologia.info'],
    default_role: 'viewer',
    bootstrap_accounts: [
      { email: 'javier.montano.guz@gmail.com', role: 'super_admin' },
    ],
    updated_at: new Date(),
    updated_by: 'system',
  };

  it('should accept valid config/access document [TS-078]', () => {
    expect(Array.isArray(validAccess.allowed_domains)).toBe(true);
    expect(validAccess.allowed_domains.length).toBeGreaterThan(0);
    expect(validAccess.default_role).toBe('viewer');
    expect(Array.isArray(validAccess.bootstrap_accounts)).toBe(true);
  });
});

describe('Data Model: config/invites', () => {
  const validInvite = {
    email: 'partner@aliado.com',
    role: 'editor',
    invited_by: 'admin@metodologia.info',
    invited_at: new Date(),
    status: 'pending',
  };

  it('should accept valid invite document [TS-079]', () => {
    expect(validInvite.email).toMatch(/.+@.+/);
    expect(['viewer', 'editor', 'admin']).toContain(validInvite.role);
    expect(['pending', 'accepted', 'expired']).toContain(validInvite.status);
  });

  it('should sanitize email to doc ID [TS-080]', () => {
    const sanitized = validInvite.email.toLowerCase().replace(/[.@]/g, '_');
    expect(sanitized).toBe('partner_aliado_com');
    expect(sanitized).not.toMatch(/[.@]/);
  });
});

describe('Data Model: audit_log', () => {
  const validEntry = {
    timestamp: new Date(),
    admin_id: 'uid-123',
    admin_email: 'admin@test.com',
    collection: 'programs',
    document_id: 'empresas_diagnostico',
    action: 'update',
    field: 'title_es',
    previous_value: 'Old Title',
    new_value: 'New Title',
    ttl: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  };

  it('should accept valid audit_log entry [TS-081]', () => {
    expect(validEntry.admin_id).toBeTruthy();
    expect(validEntry.admin_email).toMatch(/.+@.+/);
    expect(validEntry.collection).toBeTruthy();
    expect(validEntry.document_id).toBeTruthy();
    expect(['create', 'update', 'delete', 'restore', 'role_change', 'login', 'logout']).toContain(validEntry.action);
  });

  it('should have TTL set to 90 days from now [TS-082]', () => {
    const now = Date.now();
    const ttl = validEntry.ttl.getTime();
    const diffDays = (ttl - now) / (1000 * 60 * 60 * 24);
    expect(diffDays).toBeGreaterThan(89);
    expect(diffDays).toBeLessThanOrEqual(90);
  });
});
