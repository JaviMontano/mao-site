# Requirements Checklist: 006-cms-backoffice-rbac

## Content Quality

- [x] No implementation details in spec (no tech stack, no file paths, no code) [Clarity, Spec global] — GAP-004 resolved: FR-001 "CDN-based" removed (implementation detail belonged in plan.md)
- [x] All requirements are testable (measurable outcomes, not vague goals) [Clarity, Spec FR-001–FR-028]
- [x] User stories are independently testable (each delivers standalone value) [Completeness, Spec US1–US8]
- [x] Evidence tags on assumptions ([CODE], [DOC], [INFERENCE], [CONFIG]) [Traceability, Spec Assumptions]
- [x] Edge cases identified for boundary conditions [Coverage, Spec Edge Cases]
- [x] Out of scope clearly defined [Completeness, Spec Out of Scope]

## Requirement Completeness

- [x] All user stories have acceptance scenarios (Given/When/Then) [Completeness, Spec US1–US8]
- [x] All functional requirements map to at least one user story [Traceability, Spec FR-001–FR-028]
- [x] All success criteria map to functional requirements [Traceability, Spec SC-001–SC-008]
- [x] Key entities identified with descriptions [Completeness, Spec Key Entities]
- [x] Priority assignments (P1/P2/P3) are justified with rationale [Clarity, Spec US1–US8]
- [x] Pre-configured accounts specified with roles and sources [Completeness, Spec US3]

## Clarity

- [x] Is SC-001 "loads in <2s" defined with a measurement method (first contentful paint, time to interactive, etc.)? [Clarity, Spec SC-001] — SC-001 targets page load with zero console errors; at 1-10 CMS users on internal tool, "load" = full interactive is the practical interpretation. Acceptable for this scale.
- [x] Is the "branded login page" in FR-002 specified with required brand elements? [Clarity, Spec FR-002] — MetodologIA brand; specific elements follow Design System (Constitution X). Sufficient as spec-level requirement.
- [x] Are the "Request access" instructions in US3/SC3 specified or left to implementation? [Clarity, Spec US3] — Spec defines the behavior ("access denied with instructions to request access"); exact copy is an implementation detail. Acceptable.
- [x] Is the "conflict notification" for concurrent edits defined with notification mechanism and content? [Clarity, Spec Edge Cases] — Spec says "last-write wins with conflict notification" as edge case behavior. Mechanism is an implementation detail for plan.md. Acceptable at spec level.
- [x] Is "i18n coverage percentage" in FR-022/SC-005 defined with a formula? [Clarity, Spec FR-022, SC-005] — Coverage = data-i18n keys with EN translation / total data-i18n keys. Derivable from the bilingual editing requirements (FR-018). Acceptable.
- [x] Are the "working save" criteria for price editor (FR-019) specified with input types and validation rules? [Clarity, Spec FR-019] — FR-019 specifies "B2C base, B2B multipliers, and premium pricing with working save." Input types are implementation (plan.md defines schema). Acceptable.

## Consistency

- [x] Is the role hierarchy table (US2) consistent with role-gating described in FR-006, FR-025? [Consistency, Spec US2, FR-006, FR-025] — Table shows audit access for admin+; FR-025 says "audit log viewer" without explicit role gate, but the role hierarchy is authoritative. Plan.md architecture diagram confirms `[admin+]` for audit-viewer. Consistent.
- [x] Are FR-013 "hardcoded" accounts consistent with Constitution XXI (Zero Hardcoding)? [Consistency, Spec FR-013, Constitution XXI] — [Conflict] Spec FR-013 says "hardcode initial super_admin accounts" and the pre-configured accounts table says "Source: Hardcoded". Constitution XXI (v6.2.0, added after spec was drafted) mandates Zero Hardcoding. Plan clarifications resolve this: bootstrap accounts use deploy-time env config, not source code literals. **Spec needs update to align FR-013 with XXI.** → Resolved: see Gap Resolution below.
- [x] Is the audit_log "Create: admin+" security rule (data-model) consistent with editors writing content audit entries? [Consistency, Spec FR-025, data-model audit_log] — Editors create content but audit entries are created by admin-api.js on behalf of authenticated users. The `admin+` rule means authenticated users with role >= editor can create audit entries. Consistent with role hierarchy.
- [x] Is US3 scenario 4 ("block on next token refresh") consistent with FR-009/FR-011 which don't mention token refresh timing? [Consistency, Spec US3, FR-009, FR-011] — Edge case section specifies "block on next token refresh, not mid-session." FRs define the rules; edge case defines timing. Complementary, not conflicting.

## Data Loss Prevention

- [x] FR-021 unsaved changes indicator covers both in-app navigation and browser close [Coverage, Spec FR-021, US5] — In-app: confirm dialog before tab switch or navigation. Browser close: `beforeunload` event. Both paths must warn if dirty state exists.

## Constitution XXI Compliance

- [x] XXI (Zero Hardcoding) scope: security invariants and business values (bootstrap accounts, domain allowlist, pricing) MUST be configurable. Domain constants (8h timeout, "viewer" default role, 90-day TTL) are acceptable as code constants at 1-10 CMS users — these are internal parameters, not admin-managed values. [Consistency, Constitution XXI, FR-004, FR-010, FR-013]

## Acceptance Criteria Quality

- [x] Are all GWT scenarios falsifiable (can clearly determine pass/fail)? [Criteria Quality, Spec US1–US8]
- [x] Do acceptance scenarios cover both happy path and error cases per user story? [Coverage, Spec US1–US8] — US1 covers success + unauthorized; US2 covers CRUD + role blocking; US3 covers allowlist + deny + invite + removal. Covered.
- [x] Are acceptance scenarios specific enough for automated BDD testing? [Criteria Quality, Spec US1–US8]
- [x] Does each user story define an independent test for quick validation? [Criteria Quality, Spec US1–US8]

## SC-XXX Test Coverage

- [x] SC-001 (admin load <2s, zero errors) references testable metrics [Coverage, Spec SC-001, FR-001]
- [x] SC-002 (4-role RBAC in UI + rules) covers both client and server enforcement [Coverage, Spec SC-002, FR-005–FR-007]
- [x] SC-003 (domain allowlist blocks on first attempt) has matching GWT in US3 [Coverage, Spec SC-003, US3]
- [x] SC-004 (3 editors functional with bilingual) covers all editors in FR-018–FR-020 [Coverage, Spec SC-004, FR-018–FR-020]
- [x] SC-005 (81+ pages) has page registry requirements in FR-022–FR-024 [Coverage, Spec SC-005, FR-022–FR-024]
- [x] SC-006 (last 100 changes with filters) has audit viewer requirements in FR-025 [Coverage, Spec SC-006, FR-025]
- [x] SC-007 (version restore for any document) has restore requirements in FR-027 [Coverage, Spec SC-007, FR-027]
- [x] SC-008 (pre-configured accounts on first deploy) has bootstrap requirements in FR-013 [Coverage, Spec SC-008, FR-013]

## Edge Case Coverage

- [x] Is the "last super_admin demotion" edge case covered by a functional requirement? [Coverage, Spec Edge Cases, FR-008] — FR-008 explicitly covers this.
- [x] Is the "concurrent edits" edge case specified with enough detail for implementation? [Coverage, Spec Edge Cases] — "Last-write wins with conflict notification" — sufficient at spec level, implementation details in plan.md.
- [x] Is the "orphaned CMS user" edge case (Firebase Auth deleted externally) covered by a functional requirement? [Coverage, Spec Edge Cases] — Edge case mentions "cleaned up on admin review" but no FR covers orphan detection/cleanup. [Gap] → Deferred: P3 concern; current scope is 1-10 users where manual cleanup is viable.
- [x] Is the "domain removal while users are logged in" edge case timing consistent with FR-011? [Coverage, Spec Edge Cases, FR-011] — See Consistency section above. Consistent.

## Non-Functional Requirements

- [x] Are performance requirements defined beyond SC-001 (e.g., Firestore query response times)? [Completeness, Spec SC-001] — At 1-10 CMS users, explicit query performance requirements are unnecessary. Admin tool has no SLA. Acceptable.
- [x] Are accessibility requirements specified for the new admin UI elements? [Completeness, Spec global] — Constitution II (Accessibility-First) applies globally. FR-006 says "CMS UI MUST render based on user role" but doesn't specify ARIA attributes for role-gated elements. Acceptable: Constitution II is the governing requirement; specific ARIA patterns are implementation (plan.md).
- [x] Are data retention requirements specified for audit log entries? [Completeness, Spec FR-025] — Plan.md clarifies 90-day TTL with scheduled cleanup. Not in spec directly, but audit log entity description doesn't constrain retention. [Gap] → Deferred: retention policy is an operational concern captured in plan.md and data-model.md.
- [x] Are error handling requirements defined for authentication failures? [Completeness, Spec US1, FR-003] — US1 scenario 3 covers unauthorized access. FR-003 specifies Google OAuth exclusively. Network errors / Firebase outages are not specified. Acceptable: admin is internal, Constitution VIII exempts admin from offline resilience.

## Dependencies & Assumptions

- [x] Is the BUG-003 prerequisite formally linked to the feature's FR-001? [Traceability, Spec FR-001, Edge Cases] — Edge cases section and FR-001 both reference BUG-003. Clear dependency.
- [x] Is the Firebase Blaze plan assumption tagged and justified? [Clarity, Spec Assumptions] — Tagged [CONFIG], justified with cost/scale rationale.
- [x] Is the "1-10 CMS users" scale assumption referenced in requirements that depend on it? [Traceability, Spec Assumptions] — Implicit in several simplification decisions but not referenced per-FR. Acceptable: assumption section is authoritative.
- [x] Are all 5 assumptions classified with evidence tags? [Traceability, Spec Assumptions] — Yes: [CODE], [DOC], [INFERENCE] x2, [CONFIG].

## Gap Resolution Log

### GAP-001: FR-013 "Hardcoded" vs Constitution XXI (Zero Hardcoding)

**Gap**: FR-013 says "System MUST hardcode initial super_admin accounts that cannot be removed via UI" and the pre-configured accounts table lists "Source: Hardcoded". Constitution XXI (v6.2.0) mandates Zero Hardcoding — all values via config mechanisms.

**Risk**: Spec language contradicts the constitution. Implementers reading only the spec would hardcode bootstrap accounts in source code, violating XXI.

**Resolution**: Plan clarifications already resolved the mechanism (deploy-time env config). Spec FR-013 needs wording updated from "hardcode" to "configure as deploy-time invariants" and the pre-configured accounts table "Source" column should say "Environment config" instead of "Hardcoded". **Spec update applied.**

### GAP-002: Orphaned CMS user cleanup (no FR)

**Gap**: Edge case "Firebase Auth user deleted externally" mentions cleanup but no FR covers detection or cleanup mechanism.

**Risk**: Low. At 1-10 users, orphan records are cosmetic. Super admin can manually review user list.

**Resolution**: Deferred to future iteration. Current scope adequate for 1-10 users.

### GAP-003: Audit log retention (no FR)

**Gap**: No spec-level requirement for audit log data retention or cleanup.

**Risk**: Low. Plan.md and data-model.md define 90-day TTL with scheduled cleanup. This is an operational concern properly placed in plan.md.

**Resolution**: Deferred. Operational detail in plan.md is the correct artifact per phase-separation rules.
