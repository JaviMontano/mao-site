# Feature Specification: CMS Backoffice with Role-Based Access Control

**Feature Branch**: `006-cms-backoffice-rbac`
**Created**: 2026-03-23
**Status**: Draft
**Constitution**: v6.2.0

## Problem Statement

The current admin CMS (`/admin/`) is a functional MVP with binary
admin/non-admin access, but it has critical gaps:

- **Import error**: Firebase SDK uses bare `import "firebase/app"`
  without a bundler — admin page cannot load [BUG-003]
- **Binary roles**: Only `admin: true/false` — no distinction
  between super admin, editor, viewer
- **No user management**: Admin claims set only via CLI script
- **No domain control**: Any Google account with a claim can access
- **No page management**: CMS edits programs/pricing/translations
  but cannot manage HTML pages or bilingual content
- **No audit UI**: Audit log in Firestore but invisible to admins
- **Price editor**: Skeleton only — no working inputs or save

**Current state** (measured 2026-03-23):

| Metric | Value |
|--------|-------|
| Admin login | Broken (Firebase import error) |
| Role model | Binary (admin/non-admin) |
| User management | CLI only (set-admin-claim.js) |
| Working editors | 2/3 (programs, translations) |
| Audit visibility | 0% (log exists, no UI) |
| Page management | None |

## User Stories

### US1 — Working Admin Login (P1)

As a site administrator, I want the admin page to load and
authenticate me so that I can access the CMS.

**Why P1**: Nothing else works until the admin page loads. The
Firebase import error blocks all functionality.

**Independent test**: Navigate to `/admin/`, click "Sign in with
Google", see the editor interface.

**Acceptance scenarios**:

1. **Given** I navigate to `/admin/`, **When** the page loads,
   **Then** I see a branded login page with Google sign-in button
   and zero console errors
2. **Given** I click sign-in with a super-admin account
   (javier.montano.guz@gmail.com), **When** authentication
   completes, **Then** I see the full CMS editor with all tabs
3. **Given** I click sign-in with an unauthorized account,
   **When** authentication completes, **Then** I see an access
   denied message with instructions to request access

---

### US2 — Role-Based Access Control (P1)

As a super admin, I want to assign roles to team members so that
editors can manage content while viewers can only read.

**Why P1**: Without roles, every admin has full destructive access.
Role separation is a security prerequisite.

**Independent test**: Super admin assigns "editor" role to a user,
that user can edit programs but not manage other users.

**Acceptance scenarios**:

1. **Given** I am a super admin, **When** I open user management,
   **Then** I see all registered users with their current roles
2. **Given** I assign "editor" role to contacto@metodologia.info,
   **When** that user logs in, **Then** they see content editing
   tabs but NOT user management
3. **Given** I assign "viewer" role to a student, **When** that
   user logs in, **Then** they see read-only content with no
   edit buttons
4. **Given** a user with "editor" role attempts a user management
   operation, **When** the request reaches Firestore, **Then**
   security rules block the operation

**Role hierarchy**:

| Role | Manage Users | Edit Content | View Content | View Audit |
|------|-------------|-------------|-------------|-----------|
| super_admin | Yes | Yes | Yes | Yes |
| admin | No | Yes (all) | Yes | Yes |
| editor | No | Yes (all) | Yes | No |
| viewer | No | No | Yes | No |

---

### US3 — Domain and Invite Allowlisting (P1)

As a super admin, I want to control who can access the CMS via
domain allowlisting and email invitations so that only authorized
people can sign in.

**Why P1**: Security — without allowlisting, any Google account
could potentially access the CMS.

**Independent test**: Add `metodologia.info` to domain allowlist,
verify only `@metodologia.info` emails and invited externals access.

**Acceptance scenarios**:

1. **Given** `metodologia.info` is in the domain allowlist,
   **When** german@metodologia.info signs in for the first time,
   **Then** they are granted "viewer" role automatically
2. **Given** an external email (partner@aliado.com) is NOT
   invited, **When** they try to sign in, **Then** access is
   denied with "Request access" instructions
3. **Given** super admin invites partner@aliado.com as "editor",
   **When** that person signs in, **Then** they receive the role
4. **Given** a domain is removed from the allowlist, **When**
   users from that domain try to access CMS, **Then** they are
   blocked on next token refresh

**Pre-configured accounts**:

| Email | Role | Source |
|-------|------|--------|
| javier.montano.guz@gmail.com | super_admin | Environment config |
| contacto@metodologia.info | super_admin | Environment config |
| german@metodologia.info | admin | Environment config |
| *@metodologia.info | viewer (default) | Domain rule |

---

### US4 — User Profile and Preferences (P2)

As a CMS user, I want to manage my profile and preferences so
that the system adapts to my workflow.

**Why P2**: Profile management is foundational for personalization
but not a security blocker.

**Independent test**: Log in, open profile, update display name
and preferred language, see changes reflected.

**Acceptance scenarios**:

1. **Given** I am logged in, **When** I open my profile, **Then**
   I see my name, email, role, avatar, and last login
2. **Given** I set preferred language to English, **When** I
   navigate the CMS, **Then** the interface is in English
3. **Given** I am a viewer, **When** I view my role field,
   **Then** it is read-only

---

### US5 — Bilingual Content Editing (P1)

As a content editor, I want to edit bilingual content (ES/EN)
side by side for all CMS collections so that translations stay
synchronized.

**Why P1**: Core CMS function. Programs editor works but pricing
is a skeleton. All editors need consistent bilingual UX.

**Independent test**: Edit a program's Spanish title, see English
field alongside it, save both, verify on live site.

**Acceptance scenarios**:

1. **Given** I open the program editor, **When** I edit
   `title_es`, **Then** `title_en` is visible beside it with
   a "translation needed" indicator if empty
2. **Given** I save a program with only `title_es` changed,
   **When** validation runs, **Then** it warns that `title_en`
   may be stale
3. **Given** I open the pricing editor, **When** I see B2C
   pricing, **Then** I can edit amounts, labels (ES/EN), and
   feature lists
4. **Given** I edit a translation key, **When** I save, **Then**
   the change reaches the live site within cache TTL (1 hour)

---

### US6 — Page Management (P2)

As a content editor, I want to see all site pages in the CMS and
manage their bilingual metadata so that I can maintain site
structure from the backoffice.

**Why P2**: Extends CMS from data editing to site-wide content
management. Not blocking core editing.

**Independent test**: See all 81 SiteHeader pages listed, click
one, view/edit its meta tags in both languages.

**Acceptance scenarios**:

1. **Given** I open the pages tab, **When** the page loads,
   **Then** I see a table of all public pages with title, path,
   level (L1-L5), and i18n coverage percentage
2. **Given** I click a page, **When** detail view opens, **Then**
   I see meta tags, OG tags, and `data-i18n` key count per lang
3. **Given** I edit a page's `<title>` in EN, **When** I save,
   **Then** the override is stored in Firestore for runtime
   injection (no direct HTML modification)

---

### US7 — Audit Log Viewer (P2)

As a super admin, I want to view the audit trail of all CMS
changes so that I can track who changed what and when.

**Why P2**: Audit log already exists in Firestore. This adds
visibility without new data infrastructure.

**Independent test**: Make a content edit, view audit log, see
the change entry with timestamp, admin, field, value.

**Acceptance scenarios**:

1. **Given** I open the audit tab, **When** page loads, **Then**
   I see chronological changes with filters by collection, admin,
   date range
2. **Given** I filter by "programs" collection, **When** results
   load, **Then** I see only program-related changes
3. **Given** I click an audit entry, **When** detail opens,
   **Then** I see full change including new value, admin email,
   timestamp

---

### US8 — Activity Logging and Recovery (P3)

As a super admin, I want comprehensive activity logs with recovery
so that I can trace issues and restore content if needed.

**Why P3**: Advanced governance. Audit viewer (US7) must exist
first. Recovery requires version history.

**Independent test**: View change history for a program, see all
versions, restore a previous version.

**Acceptance scenarios**:

1. **Given** a program was edited 3 times, **When** I view its
   history, **Then** I see all 3 versions with diffs
2. **Given** I select a previous version, **When** I click
   "Restore", **Then** the program reverts and an audit entry
   records the restoration
3. **Given** a session ends, **When** I check activity logs,
   **Then** I see login/logout events for that user

---

### Edge Cases

- Super admin removes their own super_admin role — system MUST
  prevent last-super-admin demotion
- Concurrent edits on same document by two editors — last-write
  wins with conflict notification
- Domain removed from allowlist while users are logged in — block
  on next token refresh, not mid-session
- Firebase Auth user deleted externally — CMS user record becomes
  orphaned, cleaned up on admin review
- Firebase import error in admin — MUST be resolved with CDN
  imports before any feature works (BUG-003 prerequisite)

## Functional Requirements

### Authentication and Login

- **FR-001**: Admin page MUST load without console errors [US1]
- **FR-002**: Admin page MUST display a branded login page with
  Google sign-in button [US1]
- **FR-003**: System MUST authenticate via Google OAuth popup
  exclusively [US1]
- **FR-004**: System MUST enforce session timeout after 8 hours
  of inactivity — client-side idle tracking with forced sign-out.
  Timer resets on user interaction (click, keypress, navigation).
  No server-side token revocation needed [US1]

### Role-Based Access Control

- **FR-005**: System MUST support 4 roles: super_admin, admin,
  editor, viewer — stored as Firebase custom claims [US2]
- **FR-006**: CMS UI MUST render based on user role — hiding
  tabs and actions the role cannot access [US2]
- **FR-007**: Firestore security rules MUST validate role-based
  permissions on every write [US2]
- **FR-008**: System MUST prevent demotion of last super_admin
  [US2]

### Access Control and Allowlisting

- **FR-009**: System MUST maintain a domain allowlist in Firestore
  config [US3]
- **FR-010**: System MUST auto-assign "viewer" role to first-time
  users from allowlisted domains [US3]
- **FR-011**: System MUST block sign-in from non-allowlisted
  domains unless explicitly invited [US3]
- **FR-012**: Super admin MUST be able to invite external users
  by email with a specific role [US3]
- **FR-013**: System MUST configure initial super_admin accounts
  as deploy-time invariants (environment config) that cannot be
  removed via UI [US3]

### User Management

- **FR-014**: CMS user records MUST be stored in a `users`
  Firestore collection [US4]
- **FR-015**: Users MUST be able to view and edit their profile
  (display name, preferred language, avatar) [US4]
- **FR-016**: Super admins MUST be able to list, search, and
  manage all CMS users [US2]
- **FR-017**: System MUST track last login, total sessions, and
  role change history per user [US4]

### Content Editing

- **FR-018**: All content editors MUST display bilingual fields
  side by side (ES left, EN right). Saving an `_es` field marks
  the corresponding `_en` field as "needs review" (dirty flag).
  Flag resets when `_en` is saved. Empty `_en` fields show
  "translation needed" indicator [US5]
- **FR-019**: Price editor MUST support B2C base, B2B multipliers,
  and premium pricing with working save [US5]
- **FR-020**: Translation editor MUST support bulk save (batch
  all changed keys in one operation) [US5]
- **FR-021**: All editors MUST show "unsaved changes" indicator
  and confirm before navigation [US5]

### Page Management

- **FR-022**: System MUST display a page registry showing all
  public HTML pages with i18n coverage [US6]
- **FR-023**: Page metadata overrides MUST be stored in Firestore
  (not direct HTML edits) [US6]
- **FR-024**: Page registry MUST auto-detect pages by scanning
  site structure [US6]

### Audit and Recovery

- **FR-025**: Audit log viewer MUST display changes with filters
  by collection, user, and date range [US7]
- **FR-026**: Audit entries MUST include previous value alongside
  new value for diff display — the audit log IS the version
  history, no separate version collection [US8]
- **FR-027**: System MUST support restoring a document to a
  previous version by reconstructing from audit entries. Restore
  creates a new write (never overwrites history) [US8]
- **FR-028**: System MUST log login/logout events in addition to
  content changes [US8]

## Success Criteria

- **SC-001**: Admin page loads in <2s with zero console errors
  [FR-001]
- **SC-002**: 4-role RBAC enforced in UI and Firestore rules
  [FR-005, FR-006, FR-007]
- **SC-003**: Domain allowlist blocks unauthorized users on first
  attempt [FR-009, FR-011]
- **SC-004**: All 3 content editors fully functional with
  bilingual fields [FR-018, FR-019, FR-020]
- **SC-005**: Page registry shows 81+ pages with i18n coverage %
  [FR-022]
- **SC-006**: Audit viewer displays last 100 changes with working
  filters [FR-025]
- **SC-007**: Version history enables restore for any document
  [FR-027]
- **SC-008**: Pre-configured accounts have correct roles on first
  deploy [FR-013]

## Key Entities

| Entity | Description |
|--------|-------------|
| CMS User | Profile, role, preferences, activity — `users` collection |
| Role | super_admin, admin, editor, viewer — custom claim + user doc |
| Domain Rule | Allowlisted domain with default role — `config/access` |
| Invite | Email + assigned role for external users — `config/invites` |
| Audit Entry | Timestamp, user, collection, doc, field, old/new values |
| Page Record | HTML path, level, i18n coverage, meta overrides |
| Content Version | Reconstructed from audit entries — no separate collection |

## Assumptions

- Firebase Auth custom claims are the RBAC mechanism — no
  external identity provider [CODE]
- Google OAuth is the only sign-in method for CMS [DOC]
- Domain allowlist checked at sign-in time, not continuously
  [INFERENCE]
- Page management reads site structure at scan time, not
  real-time file watching [INFERENCE]
- Firebase Blaze plan (pay-as-you-go) required for Cloud
  Functions — cost is effectively $0 at 1-10 CMS users.
  Serverless functions handle privileged operations (custom
  claims, role assignment) that require Admin SDK [CONFIG]

## Clarifications

### Session 2026-03-23

- Q: What does "assigned" mean for editor content access? -> A: Editors can edit ALL content types (programs, pricing, translations) — no per-document assignment. Role separation is by privilege level, not content scope. Revisit if team exceeds 10 CMS users. [FR-006, US2, SC-002]
- Q: Does Spark plan support custom claims via Cloud Functions? -> A: No. Upgrade to Blaze (pay-as-you-go). Cost is $0 at this scale. Cloud Functions are the canonical mechanism for privileged Admin SDK operations (claims, role assignment). [FR-005, FR-010, FR-012, SC-002, SC-008]
- Q: How is the 8h session timeout enforced? -> A: Client-side idle tracking. JS timer resets on user interaction (click, keypress, navigation). After 8h idle, force signOut(). No server-side token revocation. [FR-004, US1]
- Q: How are content versions stored for restore? -> A: Audit log IS the version history — no separate versions collection. Restore reconstructs from audit entries and creates a new write (never overwrites history). Aligns with VI (Content Authority) and XIV (Simple First). [FR-026, FR-027, US8, SC-007]
- Q: When is a translation considered "stale"? -> A: Any save to an _es field marks the corresponding _en field as "needs review" (dirty flag). Flag resets when _en is saved. Empty _en fields show "translation needed". No timestamp comparison needed. [FR-018, US5, SC-004]
- Q: Should FR-001 prescribe "CDN-based" imports? -> A: No — "CDN-based" is an implementation detail that belongs in plan.md (phase-separation). FR-001 updated to "Admin page MUST load without console errors" without prescribing delivery mechanism. [FR-001, US1, SC-001]
- Q: Does FR-021 cover both in-app navigation and browser close? -> A: Yes — in-app navigation uses confirm dialog before tab switch; browser close uses `beforeunload` event. Both paths must warn if dirty state exists. [FR-021, US5, SC-004]
- Q: Does XXI (Zero Hardcoding) apply to all FR constants (timeout, default role, TTL)? -> A: XXI scope: security invariants and business values (bootstrap accounts, domain allowlist, pricing) MUST be configurable. Domain constants (8h timeout, "viewer" default role, 90-day TTL) are acceptable as code constants at 1-10 CMS users — internal parameters, not admin-managed values. [FR-004, FR-010, FR-013, Constitution XXI]
- Q: How does "removed domain blocks users on next token refresh" work? -> A: Client-side — `admin-app.js` re-checks `config/access.allowed_domains` on each `onAuthStateChanged`. Signs out if domain removed. No server-side revocation at 1-10 users (XIV Simple First). [FR-009, FR-011, US3, SC-003]
- Q: When an invited user also matches an allowlisted domain, which provisioning path wins? -> A: Invite takes precedence. `onUserFirstLogin` checks: (1) bootstrap, (2) invite, (3) domain. First match wins. Explicit invite role overrides generic domain default. [FR-010, FR-012, US3]
- Q: How are concurrent edits handled — pre-save or post-save notification? -> A: Pre-save warning via Firestore `onSnapshot`. Editors get a real-time listener; if document changes while editing, warning shown before save with options to reload or overwrite. [FR-018, US5]
- Q: How are orphaned CMS users detected when Firebase Auth user is deleted externally? -> A: Passive — no active Auth cross-reference at 1-10 users. Super admin manually identifies orphans and clicks "Remove". [FR-014, FR-016, US2]

## Out of Scope

- Custom authentication provider (SAML, LDAP)
- Real-time collaborative editing (Google Docs style)
- Visual page builder / drag-and-drop layout editor
- Content scheduling / future-dated publishing
- Multi-site management
- File/media upload management
- SEO management beyond meta tags
