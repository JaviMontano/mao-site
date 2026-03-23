/**
 * Firebase Auth wrapper — Google sign-in, admin claims, state management.
 * @module js/cms/auth-service
 */
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
} from 'firebase/auth';

let auth = null;

const ROLE_LEVELS = { super_admin: 4, admin: 3, editor: 2, viewer: 1 };

export const AuthService = {
  /**
   * Initialize auth with a Firebase app.
   * @param {FirebaseApp} app
   */
  init(app) {
    auth = getAuth(app);
  },

  /**
   * Sign in with Google popup.
   * @returns {Promise<User>}
   */
  async signIn() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  },

  /**
   * Check if current user has admin custom claim (legacy).
   * @returns {Promise<boolean>}
   */
  async isAdmin() {
    if (!auth?.currentUser) return false;
    const tokenResult = await auth.currentUser.getIdTokenResult();
    return tokenResult.claims.admin === true || !!tokenResult.claims.role;
  },

  /**
   * Get the current user's RBAC role from custom claims.
   * @returns {Promise<string|null>}
   */
  async getRole() {
    if (!auth?.currentUser) return null;
    const tokenResult = await auth.currentUser.getIdTokenResult();
    return tokenResult.claims.role || null;
  },

  /**
   * Check if user has at least the given permission level.
   * @param {string} requiredRole - minimum role needed
   * @returns {Promise<boolean>}
   */
  async hasPermission(requiredRole) {
    const role = await this.getRole();
    if (!role) return false;
    return (ROLE_LEVELS[role] || 0) >= (ROLE_LEVELS[requiredRole] || 0);
  },

  /**
   * Detect legacy admin:true claim without role claim.
   * @returns {Promise<boolean>}
   */
  async isLegacyAdmin() {
    if (!auth?.currentUser) return false;
    const tokenResult = await auth.currentUser.getIdTokenResult();
    return tokenResult.claims.admin === true && !tokenResult.claims.role;
  },

  /**
   * Subscribe to auth state changes.
   * @param {Function} callback - receives (user | null)
   * @returns {Function} unsubscribe
   */
  onAuthStateChanged(callback) {
    return firebaseOnAuthStateChanged(auth, callback);
  },

  /**
   * Sign out and clear state.
   * @returns {Promise<void>}
   */
  async signOut() {
    await firebaseSignOut(auth);
  },

  /** Get current user */
  getCurrentUser() {
    return auth?.currentUser || null;
  },

  /** Force refresh the ID token to pick up new claims. */
  async refreshToken() {
    if (auth?.currentUser) {
      await auth.currentUser.getIdToken(true);
    }
  },

  /** Test helpers */
  _setAuth(mockAuth) {
    auth = mockAuth;
  },

  _reset() {
    auth = null;
  },
};
