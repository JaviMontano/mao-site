/**
 * Environment configuration for Cloud Functions.
 * Bootstrap accounts loaded from environment variables per Constitution XXI.
 * @module functions/config
 */

/**
 * Parse bootstrap accounts from environment variable.
 * Format: JSON array of {email, role} objects.
 * Set via: firebase functions:config:set bootstrap.accounts='[{"email":"...","role":"super_admin"}]'
 * Or via .env: BOOTSTRAP_ACCOUNTS='[{"email":"...","role":"super_admin"}]'
 * @returns {Array<{email: string, role: string}>}
 */
export function getBootstrapAccounts() {
  const raw = process.env.BOOTSTRAP_ACCOUNTS;
  if (!raw) return [];
  try {
    const accounts = JSON.parse(raw);
    if (!Array.isArray(accounts)) return [];
    return accounts.filter(
      (a) => a && typeof a.email === 'string' && typeof a.role === 'string',
    );
  } catch {
    return [];
  }
}

/**
 * Check if an email is a bootstrap account.
 * @param {string} email
 * @returns {{isBootstrap: boolean, role: string|null}}
 */
export function checkBootstrap(email) {
  const accounts = getBootstrapAccounts();
  const match = accounts.find(
    (a) => a.email.toLowerCase() === email.toLowerCase(),
  );
  return match
    ? { isBootstrap: true, role: match.role }
    : { isBootstrap: false, role: null };
}
