# RBAC Governance Insights

Decision patterns for role-based access control governance in CMS systems.

### INS-RBAC-001: Separate role definition from role governance
- **Origin**: Socratic debate — Constitution v6.0.0 → v6.1.0 evolution
- **Pattern**: The *specific roles* a system supports (super_admin, editor, viewer) belong in the feature spec. The *principles* governing how roles are managed (least privilege, separation of duties, irrevocable bootstrap) belong in the constitution. Mixing them creates either an over-specified constitution or an under-governed spec.
- **Rationale**: The spec 006 defined 4 roles but the constitution only said "role-based authorization" — this left edge cases (last-admin demotion, self-escalation) ungoverned until implementation, when fixing them is 10x more expensive.
- **Applies when**: Any feature that introduces tiered access control. Check: does the constitution govern the management lifecycle (assign, escalate, revoke, audit), or just the existence of roles?
- **Constitutional anchor**: VII (Secure by Default — access governance), XIII (Think First)

### INS-RBAC-002: Editors with full content access is simpler than per-document assignment
- **Origin**: Clarify session — Gap 1 of spec 006
- **Pattern**: For teams of 1-10 CMS users, giving editors access to ALL content types (programs, pricing, translations) is simpler than per-document or per-collection assignment. The separation of duties is achieved by role level (editor vs admin vs super_admin), not by content scope. Per-document assignment adds an assignment UI, storage model, and security rule complexity that doesn't justify itself at this scale.
- **Rationale**: INS-004 (separate platform defaults from feature requests) applies — the simpler model does everything the team needs. Assignment scope is a feature to add WHEN the team grows past the threshold where full access becomes a risk.
- **Applies when**: Deciding between "editors can edit everything" vs "editors are assigned to specific content"
- **Constitutional anchor**: XIV (Simple First), VII (Secure by Default — least privilege still satisfied: editors can't manage users)

### INS-RBAC-003: Bootstrap accounts are security invariants, not configuration
- **Origin**: Socratic debate — irrevocable bootstrap principle
- **Pattern**: The initial super_admin accounts (hardcoded in the system) are not "default configuration" that can be changed — they are a security invariant ensuring the system always has a recovery path. They cannot be removed or demoted via the UI. This is the same class of protection as "the system must have at least one admin" — it's a constraint, not a preference.
- **Rationale**: If all super_admins could demote themselves, a single UI mistake could lock everyone out of user management permanently. The bootstrap accounts are the "break glass" mechanism.
- **Applies when**: Designing admin account management — always ask "what happens if all admins demote themselves?"
- **Constitutional anchor**: VII (Secure by Default — irrevocable bootstrap)

### INS-RBAC-004: Security invariants live in deploy-time config, not source code or runtime stores
- **Origin**: Socratic debate — Q7 bootstrap account source of truth for feature 006. Amended by Constitution v6.2.0 (XXI Zero Hardcoding).
- **Pattern**: When a system has a security invariant that MUST NOT be modifiable via any UI (including cloud consoles), the invariant must live in deploy-time configuration (environment variables, `functions.config()`, `.env` files) — not in source code literals and not in runtime-editable stores (Firestore). Environment variables require deploy access to change, providing a trust boundary above Firestore console while respecting XXI (Zero Hardcoding). The runtime store (Firestore) can hold a MIRROR for UI display, lazy-synced by the authoritative config.
- **Rationale**: Firestore security rules only apply to client SDK requests. The Firebase console and Admin SDK bypass rules completely. Therefore, Firestore cannot be the authority for a "cannot be removed" invariant. Environment variables (`functions.config().bootstrap.accounts`) provide the same deploy-cycle protection as hardcoded arrays without violating XXI. Lazy sync on login keeps the UI mirror fresh without adding overhead to every function call.
- **Applies when**: Any invariant described as "irrevocable", "cannot be removed", or "break glass". Ask: "Can someone with Firebase console access violate this invariant?" If yes → environment variable / deploy-time config.
- **Constitutional anchor**: VII (Secure by Default — irrevocable bootstrap), XXI (Zero Hardcoding), VI (Content Authority — one source + mirror), XIV (Simple First)
