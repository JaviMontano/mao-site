# Security Requirements Checklist: 006-cms-backoffice-rbac

This domain-specific checklist supplements `requirements.md` with security-focused requirements quality validation for the RBAC feature.

## Role Model Completeness

- [x] Are all 4 roles defined with explicit permission boundaries? [Completeness, Spec US2 role hierarchy table] — super_admin, admin, editor, viewer with Manage Users / Edit Content / View Content / View Audit columns.
- [x] Is the role hierarchy strictly ordered (no overlapping privilege sets)? [Consistency, Spec US2] — Each role is a superset of the one below: viewer ⊂ editor ⊂ admin ⊂ super_admin.
- [x] Are role assignments specified as server-side only (not client-modifiable)? [Completeness, Spec FR-005, data-model users] — FR-005 says custom claims; data-model says "Write role fields: NEVER via client — only Cloud Function."
- [x] Is the privilege escalation path defined (who can promote whom)? [Completeness, Spec US2, data-model state transitions] — Only super_admin can change roles. State transitions defined in data-model.md.

## Access Control Boundaries

- [x] Are authentication requirements specified for all protected resources? [Coverage, Spec FR-003, FR-007] — FR-003: Google OAuth only. FR-007: Firestore rules validate on every write.
- [x] Is server-side enforcement specified independently of client-side UI hiding? [Completeness, Spec FR-006, FR-007] — FR-006 handles UI gating, FR-007 handles Firestore rules. Both layers required.
- [x] Is the domain allowlist specified with CRUD operations (add, remove, default role)? [Completeness, Spec FR-009, US3] — FR-009: maintain domain allowlist. US3 scenarios cover add/remove. Default role = viewer (FR-010).
- [x] Are invite lifecycle states defined (pending, accepted, expired)? [Completeness, Spec data-model invites] — Yes, with transitions: pending → accepted, pending → expired (30-day TTL).

## Bootstrap and Irrevocability

- [x] Are bootstrap accounts specified as irrevocable (cannot be demoted or removed)? [Completeness, Spec FR-013, FR-008, Edge Cases] — FR-008: prevent last super_admin demotion. FR-013: initial accounts cannot be removed via UI. Edge case: system MUST prevent last-super-admin demotion.
- [x] Is the bootstrap enforcement mechanism specified at both UI and server levels? [Completeness, Spec FR-008, FR-013] — FR-008/FR-013 define the WHAT; mechanism is plan.md concern. Both layers implied by FR-006 (UI) + FR-007 (rules).
- [x] Are bootstrap accounts enumerated with specific emails and roles? [Completeness, Spec US3 pre-configured accounts] — Yes: 3 accounts listed with roles and source.

## Session Security

- [x] Is session timeout specified with a concrete duration? [Clarity, Spec FR-004] — 8 hours of inactivity.
- [x] Is the timeout enforcement mechanism defined (client, server, or both)? [Clarity, Spec FR-004, Clarifications] — Client-side idle tracking. Clarified: timer resets on click/keypress/navigation.
- [x] Are session events (login/logout) specified for audit trail? [Coverage, Spec FR-028] — FR-028: log login/logout events in addition to content changes.

## Audit Trail Integrity

- [x] Are audit entries specified as immutable (no update/delete)? [Completeness, data-model audit_log] — Security rules: "Update: NEVER, Delete: NEVER."
- [x] Is the audit log specified for role changes in addition to content changes? [Coverage, Spec FR-028, data-model audit_log] — Action enum includes `role_change`. role_history array also in user doc.
- [x] Are audit entries specified with previous and new values for diff capability? [Completeness, Spec FR-026] — FR-026: "include previous value alongside new value for diff display."
- [x] Is the relationship between audit viewer access and roles defined? [Completeness, Spec US2 role hierarchy, US7] — Role hierarchy shows View Audit for super_admin and admin only.

## Data Protection

- [x] Are Firestore security rules specified for every new collection? [Coverage, data-model] — users, config/access, config/invites, audit_log, page_overrides all have security rules defined.
- [x] Is personal data handling defined (what's stored, who can read)? [Completeness, data-model users] — User doc fields listed with read/write rules per role level.
- [x] Are client-side caching boundaries defined for sensitive data (roles, user lists)? [Completeness, Spec global] — Constitution VIII exempts admin from offline resilience. Cache behavior for admin data is not specified. Acceptable: internal tool, no sensitive data cached client-side beyond auth state.
