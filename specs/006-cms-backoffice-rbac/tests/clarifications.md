# Testify Clarifications

## Session 2026-03-23

- Q: How does "removed domain blocks users on next token refresh" work mechanically? -> A: Client-side check — `admin-app.js` re-checks `config/access.allowed_domains` on each `onAuthStateChanged` event (page reload or token refresh). Signs out user if domain no longer allowed. No server-side revocation needed at 1-10 users (XIV Simple First). [FR-009, FR-011, US-3, SC-003, TS-015]
- Q: When an invited user also matches an allowlisted domain, which provisioning path takes precedence? -> A: Invite takes precedence. `onUserFirstLogin` checks in order: (1) bootstrap accounts, (2) pending invite, (3) domain allowlist. First match wins. An explicit invite with role "editor" overrides the generic "viewer" domain default. [FR-010, FR-012, US-3, TS-054, TS-055]
- Q: What does "conflict notification" mean for concurrent edits — pre-save warning or post-save toast? -> A: Pre-save warning via Firestore `onSnapshot`. Each editor listens for changes; if document updates while editing, a warning "Document was modified by another user" appears before save. Editor can reload latest or overwrite. [FR-018, US-5, TS-038]
- Q: How are orphaned CMS users (Auth deleted externally) detected? -> A: Passive — no active Auth cross-reference. Super admin manually identifies orphans in user list and clicks "Remove" to delete the record. Sufficient at 1-10 users. Active verification can be added later if needed. [FR-014, FR-016, US-2, TS-039]
