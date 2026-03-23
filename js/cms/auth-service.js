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
   * Check if current user has admin custom claim.
   * @returns {Promise<boolean>}
   */
  async isAdmin() {
    if (!auth?.currentUser) return false;
    const tokenResult = await auth.currentUser.getIdTokenResult();
    return tokenResult.claims.admin === true;
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

  /** Test helpers */
  _setAuth(mockAuth) {
    auth = mockAuth;
  },

  _reset() {
    auth = null;
  },
};
