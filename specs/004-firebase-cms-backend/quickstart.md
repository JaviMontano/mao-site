# Quickstart: Firebase CMS Backend

**Feature**: 004-firebase-cms-backend
**Date**: 2026-03-22

## Prerequisites

- Node.js 18+ (for Firebase CLI and scripts)
- Firebase CLI: `npm install -g firebase-tools`
- Java 11+ (for Firebase Emulator Suite)

## Setup

### 1. Install project dependencies

```bash
npm install
```

This adds Firebase SDK, `idb`, and Vitest (dev) to `package.json`.

### 2. Initialize Firebase project

```bash
firebase login
firebase init firestore   # select existing project or create new
firebase init emulators    # enable Auth + Firestore emulators
```

### 3. Start emulators

```bash
firebase emulators:start --only auth,firestore
```

Emulator UI: http://localhost:4000

### 4. Seed test data

```bash
node scripts/seed-firestore.js --emulator
```

Seeds Firestore emulator with current hardcoded content (programs, prices, translations).

### 5. Set admin claim (emulator)

```bash
node scripts/set-admin-claim.js --emulator --email your@email.com
```

### 6. Open the site

Serve with any static server:
```bash
npx serve .
```

Navigate to http://localhost:3000 — content should load from Firestore emulator.
Navigate to http://localhost:3000/admin/ — login with Google, access admin editor.

## Test Scenarios

### T1: Content loads from Firestore

1. Start emulators + seed data
2. Open empresas/index.html
3. Verify program cards display Firestore content (not hardcoded JS)
4. Check browser DevTools Network tab for Firestore requests

### T2: Admin edit → public update

1. Login to /admin/ as admin user
2. Edit "Diagnóstico" program description
3. Save (verify both ES/EN fields required)
4. Open empresas/index.html in a new tab
5. Verify updated description appears

### T3: Offline resilience

1. Load any page once (populates IndexedDB cache)
2. Stop Firestore emulators
3. Reload the page
4. Verify content still displays from cache — no blank sections

### T4: Security rules enforcement

1. Open browser console on a public page
2. Attempt Firestore write:
   ```js
   import { getFirestore, doc, setDoc } from 'firebase/firestore';
   await setDoc(doc(getFirestore(), 'programs', 'test'), { title_es: 'hack' });
   ```
3. Verify write is denied (permission error)

### T5: Unauthenticated admin access denied

1. Open /admin/ in an incognito window
2. Verify login screen appears — no content editor visible
3. Verify no Firestore admin data is accessible

### T6: Missing language variant blocked

1. Login to /admin/ as admin
2. Edit a program, clear the EN description field
3. Click save
4. Verify validation error: "EN translation required"

### T7: Audit log created

1. Login to /admin/, edit any content
2. Check Firestore emulator UI → audit_log collection
3. Verify entry with timestamp, admin ID, field, previous value

## Running Tests

```bash
# Unit tests (content service, cache manager)
npx vitest run

# Security rules tests (requires emulators running)
npx vitest run tests/integration/firestore-rules.test.js

# E2E tests (requires emulators + static server)
npx playwright test tests/e2e/
```
