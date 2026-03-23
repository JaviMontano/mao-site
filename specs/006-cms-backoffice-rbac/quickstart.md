# Quickstart: CMS Backoffice RBAC

**Branch**: `006-cms-backoffice-rbac` | **Date**: 2026-03-23

## Prerequisites

1. Node.js 20+
2. Firebase CLI: `npm install -g firebase-tools`
3. Firebase Blaze plan on `metodologia-pristino-10x`
4. Dependencies: `npm install`

## Local Development Setup

### 1. Start Firebase Emulators

```bash
cd firebase
firebase emulators:start --project metodologia-pristino-10x
```

Emulator UI at http://localhost:4000

### 2. Seed Test Data

```bash
node scripts/seed-firestore.js --emulator
```

### 3. Set Up Test Users (Emulator)

```bash
# Bootstrap super_admin
node scripts/set-admin-claim.js --email javier.montano.guz@gmail.com --emulator

# Or use new RBAC script (once implemented):
node scripts/set-user-role.js --email javier.montano.guz@gmail.com --role super_admin --emulator
```

### 4. Build Admin Bundle

```bash
npm run build:admin
# Equivalent to: npx esbuild admin/js/admin-app.js --bundle --outfile=admin/js/admin-bundle.js --format=esm --minify
```

### 5. Serve Locally

```bash
npx serve . -p 3000
```

Admin at http://localhost:3000/admin/

## Test Scenarios

### T1: Admin Page Loads (BUG-003 fix)

1. Run `npm run build:admin`
2. Navigate to http://localhost:3000/admin/
3. **Expected**: Login page renders, zero console errors
4. **Validates**: FR-001, SC-001

### T2: Role-Based Tab Visibility

1. Sign in as super_admin → see ALL tabs (Programs, Prices, Translations, Pages, Users, Audit, Profile)
2. Sign in as admin → see Programs, Prices, Translations, Pages, Audit, Profile (NO Users tab)
3. Sign in as editor → see Programs, Prices, Translations, Pages, Profile (NO Users, NO Audit)
4. Sign in as viewer → see read-only content, Profile only
5. **Validates**: FR-006, SC-002

### T3: Role Assignment

1. Sign in as super_admin
2. Open Users tab → see all users
3. Assign "editor" to a viewer → confirm role change
4. Sign out, sign in as that user → verify editor tabs visible
5. **Validates**: FR-005, FR-016, US2

### T4: Bootstrap Protection

1. Sign in as super_admin
2. Attempt to demote javier.montano.guz@gmail.com → should be blocked
3. Attempt to demote contacto@metodologia.info → should be blocked
4. **Validates**: FR-008, FR-013, INS-RBAC-003

### T5: Domain Auto-Provisioning

1. In emulator, create auth user with @metodologia.info email
2. Check `users` collection → user doc created with role: viewer
3. Sign in with that account → viewer access granted
4. **Validates**: FR-010, US3 scenario 1

### T6: External User Blocking

1. Sign in with non-allowlisted email (e.g., random@gmail.com)
2. **Expected**: Access denied screen with "Request access" message
3. **Validates**: FR-011, US3 scenario 2

### T7: Invite Flow

1. Super admin invites partner@aliado.com as editor
2. In emulator, create auth user with that email
3. Sign in → editor access granted
4. **Validates**: FR-012, US3 scenario 3

### T8: Bilingual Editing

1. Sign in as editor, open Programs tab
2. Edit `title_es` → see `title_en` alongside with stale indicator
3. Save → verify audit entry created
4. **Validates**: FR-018, SC-004

### T9: Audit Viewer

1. Make several content edits as editor
2. Sign in as super_admin, open Audit tab
3. Filter by "programs" collection → see only program changes
4. Click entry → see full diff (previous + new value)
5. **Validates**: FR-025, FR-026, SC-006

### T10: Version Restore

1. Edit a program 3 times
2. Open audit viewer, find second version
3. Click "Restore" → program reverts to that state
4. New audit entry with action: restore appears
5. **Validates**: FR-027, SC-007

## Running Tests

```bash
# Unit tests
npx vitest run

# Integration tests (requires emulators running)
npx vitest run tests/integration

# E2E tests (requires dev server + emulators)
npx playwright test tests/e2e/admin-flow.spec.js

# All tests
npm test
```

## Cloud Functions Deployment

```bash
cd functions
npm install
firebase deploy --only functions --project metodologia-pristino-10x
```

## Common Issues

| Issue | Solution |
|-------|----------|
| `admin-bundle.js` not found | Run `npm run build:admin` |
| Console: "firebase/app not found" | Bundle not built — bare imports need esbuild |
| "Permission denied" on role change | Caller must be super_admin; check custom claim |
| Emulator auth not working | Ensure emulator ports match firebase.json |
| Custom claim not reflected | Force token refresh: `auth.currentUser.getIdToken(true)` |
