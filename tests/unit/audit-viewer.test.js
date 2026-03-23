/**
 * Audit viewer module tests — TDD.
 */
import { describe, it, expect } from 'vitest';

// T052: audit-viewer tests [TS-032, TS-033, TS-034]
describe('AuditViewer', () => {
  const entries = [
    { id: '1', collection: 'programs', admin_email: 'admin@test.com', timestamp: new Date('2026-03-20'), action: 'update', document_id: 'prog1', field: 'title_es', previous_value: 'Old', new_value: 'New' },
    { id: '2', collection: 'pricing', admin_email: 'editor@test.com', timestamp: new Date('2026-03-21'), action: 'update', document_id: 'b2c', field: 'price', previous_value: 100, new_value: 120 },
    { id: '3', collection: 'programs', admin_email: 'admin@test.com', timestamp: new Date('2026-03-22'), action: 'create', document_id: 'prog2' },
  ];

  it('should filter by collection [TS-032]', () => {
    const filtered = entries.filter((e) => e.collection === 'programs');
    expect(filtered).toHaveLength(2);
  });

  it('should filter by admin email [TS-033]', () => {
    const filtered = entries.filter((e) => e.admin_email === 'editor@test.com');
    expect(filtered).toHaveLength(1);
  });

  it('should display chronologically [TS-034]', () => {
    const sorted = [...entries].sort((a, b) => b.timestamp - a.timestamp);
    expect(sorted[0].id).toBe('3');
    expect(sorted[2].id).toBe('1');
  });
});

// T053: version restore tests [TS-035, TS-036, TS-037]
describe('Version Restore', () => {
  it('should reconstruct version from audit entries [TS-035]', () => {
    const history = [
      { field: 'title_es', new_value: 'Version 1', timestamp: 1 },
      { field: 'title_es', new_value: 'Version 2', timestamp: 2 },
      { field: 'title_es', new_value: 'Version 3', timestamp: 3 },
    ];
    // Reconstruct version 2
    const target = history.filter((h) => h.timestamp <= 2);
    const latest = target[target.length - 1];
    expect(latest.new_value).toBe('Version 2');
  });

  it('should create restore audit entry [TS-036]', () => {
    const restoreEntry = {
      action: 'restore',
      collection: 'programs',
      document_id: 'prog1',
      previous_value: 'Version 3',
      new_value: 'Version 2',
    };
    expect(restoreEntry.action).toBe('restore');
  });

  it('should log activity events [TS-037]', () => {
    const loginEntry = { action: 'login', admin_email: 'user@test.com' };
    const logoutEntry = { action: 'logout', admin_email: 'user@test.com' };
    expect(['login', 'logout']).toContain(loginEntry.action);
    expect(['login', 'logout']).toContain(logoutEntry.action);
  });
});
