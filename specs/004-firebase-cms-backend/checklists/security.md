# Security Checklist: 004-firebase-cms-backend

**Purpose**: Validate security requirements quality — coverage, enforceability, and defense-in-depth
**Created**: 2026-03-22
**Feature**: [spec.md](../spec.md) | Constitution VII (Secure by Default)

## Authentication Requirements

- [x] SEC001 Is the authentication method specified? [Completeness, FR-008] — Yes: Firebase Authentication with "admin" custom claim. Research R3 selects Google sign-in.
- [x] SEC002 Is the distinction between authentication and authorization explicit? [Clarity, US-6 scenario 3] — Yes: US-6 scenario 3 explicitly tests "authenticated without admin claim → denied." FR-012 distinguishes read (public) from write (admin claim).
- [x] SEC003 Are authentication failure scenarios covered? [Scenario Coverage, US-4 scenario 1] — Yes: US-4 scenario 1 (unauthenticated → login screen), US-4 scenario 5 (non-admin denied).

## Authorization Requirements

- [x] SEC004 Are role definitions clear and minimal? [Clarity, FR-008/012] — Yes: two roles — public (unauthenticated, read-only) and admin (authenticated + custom claim, read/write). Least-privilege by design.
- [x] SEC005 Is role provisioning documented? [Completeness, Edge Cases] — Yes: CLI script using `setCustomUserClaims`, documented in runbook. No self-registration for admin role.
- [x] SEC006 Is role escalation prevention addressed? [Scenario Coverage, US-6 scenario 3] — Yes: security rules check `request.auth.token.admin == true`, not just `request.auth != null`.

## Data Layer Security

- [x] SEC007 Are security rules enforced at the data layer, not application layer? [Constitution VII] — Yes: Firestore security rules are the enforcement point. Client-side checks are convenience only.
- [x] SEC008 Does every collection have explicit read/write rules? [Completeness, US-6 scenario 5] — Yes: US-6 scenario 5 requires "every collection has explicit rules — no wildcards or open permissions."
- [x] SEC009 Is schema validation enforced server-side on write? [Completeness, FR-013] — Yes: FR-013 requires security rules validate required fields, data types, and both language variants.
- [x] SEC010 Are security rules testable before deployment? [Completeness, FR-014] — Yes: FR-014 requires version-controlled rules tested against Firebase Emulator. Plan includes `tests/integration/firestore-rules.test.js`.

## Secret Management

- [x] SEC011 Is the no-secrets-in-client-code requirement explicit? [Completeness, FR-015] — Yes: FR-015 says "No API keys, service account credentials, or admin secrets MUST appear in client-side code. Firebase client config (public) is the only exception."
- [x] SEC012 Is the Firebase client config exception justified? [Clarity, FR-015] — Yes: Firebase client config (apiKey, projectId, etc.) is public by design — it identifies the project but doesn't grant access. Access is controlled by security rules.
- [x] SEC013 Is there an automated verification for secret exposure? [Measurability, SC-008] — Yes: SC-008 specifies "verified by grep scan of deployed assets."

## Audit Trail

- [x] SEC014 Is the audit log append-only? [Completeness, FR-011] — Yes: data-model defines audit_log as append-only with admin-only read. Security rules should enforce no update/delete on audit_log.
- [x] SEC015 Does the audit log capture sufficient detail for forensics? [Completeness, FR-011, SC-012] — Yes: timestamp, admin identity, collection, document ID, field changed, previous value, new value.
- [x] SEC016 Is audit log retention bounded to prevent unbounded growth? [Completeness, FR-011] — Yes: 90-day retention via TTL field. Clarification session confirms.

## Input Validation

- [x] SEC017 Is input sanitization specified? [Completeness, FR-023] — Yes: "no raw HTML stored in Firestore. Content is plain text or structured data only."
- [x] SEC018 Is validation enforced at both client and server? [Defense in Depth, FR-010/013] — Yes: FR-010 (admin UI blocks incomplete submissions), FR-013 (security rules validate schema on write). Two layers.

## Score: 18/18 — Security requirements complete
