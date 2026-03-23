import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Firebase Auth
const mockUser = {
  uid: 'test-uid',
  email: 'admin@test.com',
  getIdTokenResult: vi.fn(),
};

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
  })),
  signInWithPopup: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
}));

const { getAuth, signInWithPopup, signOut, onAuthStateChanged } = await import('firebase/auth');
const { AuthService } = await import('../../js/cms/auth-service.js');

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    AuthService._reset();
  });

  describe('isAdmin', () => {
    it('should return true when user has admin custom claim', async () => {
      const auth = getAuth();
      auth.currentUser = {
        ...mockUser,
        getIdTokenResult: vi.fn().mockResolvedValue({
          claims: { admin: true },
        }),
      };
      AuthService._setAuth(auth);

      const result = await AuthService.isAdmin();
      expect(result).toBe(true);
    });

    it('should return false when user lacks admin claim', async () => {
      const auth = getAuth();
      auth.currentUser = {
        ...mockUser,
        getIdTokenResult: vi.fn().mockResolvedValue({
          claims: {},
        }),
      };
      AuthService._setAuth(auth);

      const result = await AuthService.isAdmin();
      expect(result).toBe(false);
    });

    it('should return false when no user is signed in', async () => {
      const auth = getAuth();
      auth.currentUser = null;
      AuthService._setAuth(auth);

      const result = await AuthService.isAdmin();
      expect(result).toBe(false);
    });
  });

  describe('onAuthStateChanged', () => {
    it('should register callback for auth state changes', () => {
      const callback = vi.fn();
      AuthService.onAuthStateChanged(callback);
      expect(onAuthStateChanged).toHaveBeenCalled();
    });
  });

  describe('signOut', () => {
    it('should call Firebase signOut and clear state', async () => {
      signOut.mockResolvedValueOnce();
      await AuthService.signOut();
      expect(signOut).toHaveBeenCalled();
    });
  });

  // === T027: RBAC auth-service tests [TS-003, TS-004, TS-005] ===

  describe('getRole [TS-003]', () => {
    it('should return role from custom claims', async () => {
      const auth = getAuth();
      auth.currentUser = {
        ...mockUser,
        getIdTokenResult: vi.fn().mockResolvedValue({
          claims: { role: 'editor' },
        }),
      };
      AuthService._setAuth(auth);

      const role = await AuthService.getRole();
      expect(role).toBe('editor');
    });

    it('should return null when no role claim exists', async () => {
      const auth = getAuth();
      auth.currentUser = {
        ...mockUser,
        getIdTokenResult: vi.fn().mockResolvedValue({
          claims: {},
        }),
      };
      AuthService._setAuth(auth);

      const role = await AuthService.getRole();
      expect(role).toBeNull();
    });

    it('should return null when no user is signed in', async () => {
      const auth = getAuth();
      auth.currentUser = null;
      AuthService._setAuth(auth);

      const role = await AuthService.getRole();
      expect(role).toBeNull();
    });
  });

  describe('hasPermission [TS-004]', () => {
    const ROLE_LEVELS = { super_admin: 4, admin: 3, editor: 2, viewer: 1 };

    it('should return true when user role meets required level', async () => {
      const auth = getAuth();
      auth.currentUser = {
        ...mockUser,
        getIdTokenResult: vi.fn().mockResolvedValue({
          claims: { role: 'admin' },
        }),
      };
      AuthService._setAuth(auth);

      const result = await AuthService.hasPermission('editor');
      expect(result).toBe(true);
    });

    it('should return false when user role is below required level', async () => {
      const auth = getAuth();
      auth.currentUser = {
        ...mockUser,
        getIdTokenResult: vi.fn().mockResolvedValue({
          claims: { role: 'viewer' },
        }),
      };
      AuthService._setAuth(auth);

      const result = await AuthService.hasPermission('editor');
      expect(result).toBe(false);
    });
  });

  describe('legacy claim detection [TS-005]', () => {
    it('should detect legacy admin:true claim without role', async () => {
      const auth = getAuth();
      auth.currentUser = {
        ...mockUser,
        getIdTokenResult: vi.fn().mockResolvedValue({
          claims: { admin: true },
        }),
      };
      AuthService._setAuth(auth);

      const isLegacy = await AuthService.isLegacyAdmin();
      expect(isLegacy).toBe(true);
    });

    it('should not flag as legacy when role claim exists', async () => {
      const auth = getAuth();
      auth.currentUser = {
        ...mockUser,
        getIdTokenResult: vi.fn().mockResolvedValue({
          claims: { admin: true, role: 'admin' },
        }),
      };
      AuthService._setAuth(auth);

      const isLegacy = await AuthService.isLegacyAdmin();
      expect(isLegacy).toBe(false);
    });
  });
});
