#!/usr/bin/env node

/**
 * @deprecated Use scripts/set-user-role.js instead.
 * This script sets the legacy admin:true claim. The new RBAC system uses
 * role-based claims (super_admin, admin, editor, viewer).
 *
 * Usage:
 *   node scripts/set-admin-claim.js --emulator --email admin@example.com
 *   node scripts/set-admin-claim.js --email admin@example.com
 */
console.warn('⚠ DEPRECATED: Use scripts/set-user-role.js instead. This script sets legacy admin:true claims.');

import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const args = process.argv.slice(2);
const useEmulator = args.includes('--emulator');
const emailIndex = args.indexOf('--email');
const email = emailIndex !== -1 ? args[emailIndex + 1] : null;

if (!email) {
  console.error('Usage: node scripts/set-admin-claim.js --email <email> [--emulator]');
  process.exit(1);
}

if (useEmulator) {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
}

const app = initializeApp({
  projectId: 'metodologia-pristino-10x',
});

const auth = getAuth(app);

async function main() {
  try {
    const user = await auth.getUserByEmail(email);
    await auth.setCustomUserClaims(user.uid, { admin: true });
    console.log(`✓ Admin claim set for ${email} (uid: ${user.uid})`);
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      console.error(`User not found: ${email}`);
      console.error('The user must sign in at least once before setting claims.');
    } else {
      console.error('Error:', err.message);
    }
    process.exit(1);
  }
}

main();
