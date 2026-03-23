# Research: CMS Backoffice RBAC

**Branch**: `006-cms-backoffice-rbac` | **Date**: 2026-03-23

## R1: Firebase SDK Import Strategy (BUG-003 Resolution)

**Problem**: All `js/cms/*.js` modules use bare imports (`import { initializeApp } from 'firebase/app'`). The admin page loads `admin-app.js` as `<script type="module">` — browsers cannot resolve bare specifiers without a bundler.

**Options considered**:

| Option | Complexity | Build Step | Tree-Shake | Constitution |
|--------|-----------|------------|------------|-------------|
| A. esbuild bundle | Low | Yes (1 cmd) | Yes | XIV (Simple First) ✓ |
| B. Import maps | Low | No | No | XIV ✓ but fragile mapping |
| C. Firebase CDN compat | Medium | No | No | Rewrites all imports |
| D. Vite/Rollup | High | Yes (config) | Yes | XIV violation (overkill) |

**Decision**: **Option A — esbuild**
- One command: `npx esbuild admin/js/admin-app.js --bundle --outfile=admin/js/admin-bundle.js --format=esm --minify`
- Zero config file. Added as npm script `"build:admin"`.
- Tree-shakes Firebase SDK (Firebase v10 modular is designed for this).
- `admin/index.html` changes `src="js/admin-app.js"` → `src="js/admin-bundle.js"`.
- Source modules stay as-is — unit tests continue using vitest (Node resolver).
- **Rationale**: XIV demands simplest solution. esbuild has zero config, sub-second builds, and is already a transitive dep of vitest. No new dependency needed.

**Alternatives rejected**:
- **Import maps**: Firebase's internal module graph has 100+ files. Mapping them manually is fragile and breaks on upgrades.
- **CDN compat**: Rewrites every import across 7 modules + 3 editor files. Higher risk, no tree-shaking.
- **Vite**: Full dev server + config + plugin system for a single entry point is overkill.

[CODE] esbuild already in node_modules via vitest dependency chain.
[DOC] Firebase v10 modular SDK designed for tree-shaking bundlers.

## R2: Cloud Functions for Privileged Operations

**Problem**: Setting Firebase custom claims requires the Admin SDK, which runs server-side only. The current `set-admin-claim.js` is a CLI script — unsuitable for CMS UI.

**Options considered**:

| Option | Latency | Cost at 1-10 users | Security |
|--------|---------|---------------------|----------|
| A. Cloud Functions (callable) | ~200ms cold | $0 (free tier) | SDK validates auth token |
| B. Cloud Run | ~500ms cold | $0 (free tier) | Manual auth validation |
| C. Admin SDK in browser | N/A | N/A | IMPOSSIBLE (leaks credentials) |

**Decision**: **Option A — Firebase Cloud Functions v2 (callable)**
- Callable functions auto-verify the calling user's ID token.
- `onCall` receives `auth.uid` and `auth.token` — we check `token.role === 'super_admin'` before executing.
- Functions deployed to `us-central1` (default Firebase region).
- **Requires Blaze plan** (pay-as-you-go). Cost at this scale: effectively $0 [CONFIG].

**Functions needed**:

| Function | Trigger | Caller Must Be |
|----------|---------|----------------|
| `setUserRole` | onCall | super_admin |
| `inviteUser` | onCall | super_admin |
| `removeUser` | onCall | super_admin |
| `onUserFirstLogin` | Auth onCreate | system (auto) |

**Firebase project setup**:
```
functions/
  index.js          # Function definitions
  package.json      # firebase-functions, firebase-admin
```

[CONFIG] Blaze plan required — confirmed in spec clarifications.
[DOC] Firebase callable functions validate auth automatically.

## R3: Custom Claims vs Firestore Document for Role Storage

**Problem**: Where to store the user's role? Custom claims (JWT) vs Firestore `users/{uid}` doc vs both?

**Decision**: **Both — claims as cache, Firestore as source of truth**
- **Firestore `users/{uid}.role`** = authoritative role record.
- **Custom claim `role`** = cached copy for security rules (rules can't read arbitrary Firestore docs efficiently).
- **Cloud Function `setUserRole`** writes to BOTH atomically.
- **Security rules** check `request.auth.token.role` (claim).
- **Client UI** reads claim from ID token for tab rendering.

**Sync strategy**: When a role is changed via `setUserRole`:
1. Write `users/{uid}.role` in Firestore.
2. Set custom claim `{ role: 'editor' }` via Admin SDK.
3. Write audit log entry.
4. Client refreshes ID token on next page load to pick up new claim.

**Why both?**:
- Claims alone: max 1000 bytes, no query support, stale until token refresh.
- Firestore alone: security rules would need to `get()` user doc on every write — 1 extra read per operation, plus race conditions.
- Both: rules use fast claim check, UI uses claim for rendering, Firestore is queryable for user management.

[DOC] Firebase custom claims limited to 1000 bytes total.
[INFERENCE] Dual storage is standard Firebase RBAC pattern.

## R4: Domain Allowlisting Implementation

**Problem**: How to auto-provision users from `@metodologia.info` while blocking others?

**Decision**: **Auth onCreate trigger + env config + Firestore config**
- Bootstrap accounts defined in environment config (`functions.config().bootstrap.accounts`) per Constitution XXI — never hardcoded in source.
- `config/access` Firestore doc stores domain rules:
  ```json
  {
    "allowed_domains": ["metodologia.info"],
    "default_role": "viewer"
  }
  ```
- `onUserFirstLogin` (Auth onCreate trigger) checks:
  1. Is email in bootstrap accounts (env config)? → Create user doc with bootstrap role + `is_bootstrap: true`.
  2. Is email in `config/invites`? → Create user doc with invited role, delete invite.
  3. Is email in `config/access.allowed_domains`? → Auto-create user doc with `default_role`.
  4. Neither? → Create user doc with `role: null` (blocked). Client checks role; null = access denied.
- `onUserFirstLogin` lazy-syncs `config/access.bootstrap_accounts` from env config for UI display.
- **Blocking is NOT at Firebase Auth level** — any Google user can authenticate. The CMS checks the role claim; `null` or absent role = denied.

[INFERENCE] Firebase Auth cannot restrict sign-in by domain without custom Identity Platform (Enterprise). Blocking at the application layer (role check) is the standard approach.

## R5: Session Timeout Implementation

**Problem**: FR-004 requires 8-hour inactivity timeout.

**Decision**: **Client-side idle timer**
- Track `click`, `keypress`, `mousemove` events on `document`.
- Debounced handler resets a `setTimeout(signOut, 8 * 60 * 60 * 1000)`.
- On timeout: `AuthService.signOut()` + redirect to login screen.
- No server-side token revocation — Firebase ID tokens are valid for 1 hour regardless. The 8h timeout is a UX safety measure, not a cryptographic guarantee.
- Store `lastActivity` in `sessionStorage` to survive same-tab refreshes.

[DOC] Firebase ID tokens have 1-hour lifetime with automatic refresh.
[INFERENCE] Client-side timeout sufficient per spec clarification (no server-side revocation).

## R6: Audit Log as Version History

**Problem**: FR-026/FR-027 require version restore from audit entries.

**Decision**: **Audit entries store full before/after snapshots**
- Current audit schema already stores `previous_value` and `new_value`.
- **Reconstruction**: To view version N of a document, apply audit entries in reverse from current state, or forward from initial seed.
- **Restore**: Read target audit entry's `new_value` for the field, write it as a new update (creating a new audit entry with `action: 'restore'`).
- No separate `versions` collection — aligns with XIV (Simple First) and existing audit infrastructure.

**Limitation**: If a document has 100+ edits, reconstruction is O(n) audit reads. At 1-10 users this is negligible. If scale demands it, add periodic snapshots later.

[CODE] Existing AdminAPI.updateProgram() already creates audit entries with old/new values.
[INFERENCE] O(n) reconstruction acceptable at current scale (1-10 users, <100 edits/doc).

## R7: Admin Page Architecture — New Tabs

**Decision**: Extend existing tab-based architecture with new tabs for RBAC features.

**New tabs** (role-gated):

| Tab | Visible To | Content |
|-----|-----------|---------|
| Programs | editor+ | Existing — enhanced bilingual |
| Prices | editor+ | Existing — fix skeleton (FR-019) |
| Translations | editor+ | Existing — add bulk save (FR-020) |
| Pages | editor+ | NEW — page registry (FR-022) |
| Users | super_admin | NEW — user management (FR-016) |
| Audit | super_admin, admin | NEW — audit viewer (FR-025) |
| Profile | all | NEW — user profile (FR-015) |

**Tab rendering**: `admin-app.js` reads role from ID token claim, renders only permitted tabs. Security rules enforce at data layer regardless.

[CODE] Existing tab system uses `role="tablist"` with ARIA — new tabs follow same pattern.
