# Feature Specification: Firebase CMS Backend

**Feature Branch**: `004-firebase-cms-backend`
**Created**: 2026-03-22
**Status**: Draft
**Constitution**: v4.0.0 (16 principles)
**Input**: Migrate editable site content (program catalogs, pricing, translations, premium resources) from hardcoded HTML/JS to a Firebase Firestore backend with an admin interface, per Constitution principles I, VI, VII, VIII, IX, XII, XIII, XIV, XV, XVI. [DOC]

## User Stories

### User Story 1 - Program Catalog from Cloud (Priority: P1)

An administrator updates a program's description, benefits, or transformation text via an admin interface, and the change appears on the live site within seconds — no code deployment required. Visitors on empresas/ and personas/ pages see content fetched from Firestore instead of hardcoded JS objects.

**Why this priority**: Program catalogs are the highest-churn content (6 programs × 2 audiences × 2 languages). [INFERENCE] Currently hardcoded in `empresas/index.html:360-445` and `personas/index.html:412-458` as inline JS objects, requiring a developer for every text change. [CODE]

**Independent Test**: Update a program description in the admin interface, refresh the public page without deploying, confirm the new text appears.

**Acceptance Scenarios**:

1. **Given** a program catalog document exists in Firestore for "Diagnóstico", **When** a visitor loads empresas/index.html, **Then** the program card displays title, tagline, description, benefits, and transformation from Firestore — not from inline JS.
2. **Given** an admin updates the "Estrategia" program description in the admin interface, **When** a visitor reloads the page, **Then** the updated description appears without any code deployment.
3. **Given** the Firestore backend is unreachable, **When** a visitor loads any program page, **Then** the page displays cached content from the last successful fetch — never a blank card or error state.
4. **Given** a program has both ES and EN content in Firestore, **When** the visitor switches language via the toggle, **Then** the program card text updates to the selected language using content from the same Firestore document.
5. **Given** the site is loaded for the first time on a slow connection (3G), **When** Firestore content loads, **Then** program cards render within 2 seconds or fall back to embedded HTML text.

---

### User Story 2 - Pricing from Cloud (Priority: P1)

All pricing data (B2C base prices, B2B multipliers, premium SKU prices, cotizador program details) is stored in Firestore and fetched at runtime. Price changes made by an admin take effect immediately across cotizadores and the premium catalog.

**Why this priority**: Prices change frequently (last update: 50% increase on premium, March 2026). [CODE] Currently scattered across `data-price` attributes, JS constants in `cotizador.js`, and HTML table rows — 3+ files for one price change. [CODE]

**Independent Test**: Change a price in the admin interface, reload the cotizador, confirm the new price appears in calculations.

**Acceptance Scenarios**:

1. **Given** B2C base prices are stored in Firestore, **When** a visitor loads the cotizador, **Then** checkbox prices and total calculations use Firestore values — not hardcoded `data-price` attributes.
2. **Given** B2B multipliers are stored in Firestore, **When** the empresas cotizador calculates a total, **Then** it uses Firestore multipliers instead of inline JS constants.
3. **Given** premium resource prices are stored in Firestore, **When** a visitor loads recursos/premium/index.html, **Then** the pricing table displays Firestore values.
4. **Given** an admin changes the "Bootcamp" base price from 920,000 to 1,100,000 COP, **When** a visitor loads the cotizador, **Then** the new price is reflected in all calculations.
5. **Given** Firestore is unreachable, **When** a visitor uses the cotizador, **Then** cached prices are used and calculations work correctly — no NaN or broken totals.

---

### User Story 3 - Translations from Cloud (Priority: P2)

The i18n translation dictionaries (currently `es.json` and `en.json` at ~15K tokens each) are stored in Firestore and fetched at runtime. Translation updates made by an admin take effect without deployment. The existing `data-i18n` attribute contract remains unchanged.

**Why this priority**: Translations are stable but growing (every new page adds keys). [INFERENCE] Moving to Firestore enables admin editing and eliminates the need to deploy for copy corrections. [INFERENCE]

**Independent Test**: Update a translation key in the admin interface, reload the page, confirm the new text appears.

**Acceptance Scenarios**:

1. **Given** translations are stored in Firestore, **When** the i18n module initializes, **Then** it fetches translations from Firestore instead of static JSON files.
2. **Given** the `data-i18n` attribute contract exists on page elements, **When** translations are fetched from Firestore, **Then** elements translate identically to the current static JSON behavior.
3. **Given** an admin corrects a typo in the EN translation for "nav.contact", **When** a visitor reloads the page in EN mode, **Then** the corrected text appears.
4. **Given** Firestore is unreachable on first visit, **When** the i18n module initializes, **Then** it falls back to the bundled static JSON files (es.json/en.json) — translations still work.
5. **Given** a visitor has cached translations from a previous visit, **When** Firestore has newer translations, **Then** the cache is updated within a defined staleness window (configurable, default 1 hour).

---

### User Story 4 - Admin Interface (Priority: P1)

An authenticated administrator accesses a content editor at a protected route (e.g., `/admin/`) to view, edit, and publish content (programs, prices, translations). The admin interface enforces validation, requires both ES and EN variants before publishing, and logs all changes.

**Why this priority**: Without an admin interface, the CMS has no user-facing value — content would still require a developer to edit Firestore directly. [INFERENCE]

**Independent Test**: Log in as admin, edit a program description, save, verify the change appears on the public page.

**Acceptance Scenarios**:

1. **Given** a user navigates to /admin/, **When** they are not authenticated, **Then** they see a login screen — not the content editor.
2. **Given** an authenticated admin opens the content editor, **When** they select "Programs", **Then** they see all 6 programs with their current ES and EN content side-by-side.
3. **Given** an admin edits the "Ventas" program description, **When** they submit with only the ES field filled, **Then** the save is blocked with a validation error: "EN translation required."
4. **Given** an admin saves a valid edit (both languages present), **When** the save completes, **Then** a change log entry is created with timestamp, admin ID, field changed, and previous value.
5. **Given** a non-admin authenticated user attempts to access /admin/, **When** the page loads, **Then** access is denied — the admin interface requires the "admin" role, not just authentication.
6. **Given** the admin interface is open, **When** inspecting client-side code, **Then** no API keys, service account credentials, or admin secrets are exposed in the browser.

---

### User Story 5 - Offline Resilience & Caching (Priority: P2)

The site caches all Firestore content (programs, prices, translations) client-side after the first successful fetch. When Firestore is unreachable, the site serves cached content transparently. Cache staleness is bounded by a configurable TTL.

**Why this priority**: Constitution VIII mandates offline resilience. [DOC] The site serves users across Latin America with variable connectivity — a backend dependency must not reduce reliability. [INFERENCE]

**Independent Test**: Load the site once (populates cache), disconnect from internet, reload — site still works with cached content.

**Acceptance Scenarios**:

1. **Given** a visitor has loaded the site at least once, **When** they return with no internet connection, **Then** all pages display cached content (programs, prices, translations) — no blank sections or error states.
2. **Given** cached content exists but is older than the TTL, **When** the visitor loads a page with connectivity, **Then** fresh content is fetched from Firestore and the cache is updated.
3. **Given** cached content exists and is within the TTL, **When** the visitor loads a page, **Then** the cached content is used immediately (no Firestore fetch) for instant rendering.
4. **Given** the cache contains prices from a previous session, **When** the admin has updated prices and the cache TTL has expired, **Then** the next page load fetches the new prices and updates the cache.
5. **Given** Firestore becomes unreachable during a visit (mid-session), **When** the visitor navigates to a new page, **Then** the page renders from cache — no interruption to the browsing experience.

---

### User Story 6 - Security Rules & Access Control (Priority: P1)

Firestore security rules enforce that public visitors can only read published content, and only authenticated users with the "admin" role can write. Rules are version-controlled, tested before deployment, and follow least-privilege principles.

**Why this priority**: Constitution VII mandates data-layer security. [DOC] A CMS is write-capable — without enforceable rules, any client-side restriction can be bypassed. [INFERENCE]

**Independent Test**: Attempt to write to Firestore from an unauthenticated browser session — confirm the write is denied.

**Acceptance Scenarios**:

1. **Given** a public visitor (unauthenticated), **When** they attempt to read program content from Firestore, **Then** the read succeeds — public content is readable by anyone.
2. **Given** a public visitor (unauthenticated), **When** they attempt to write to any Firestore collection, **Then** the write is denied by security rules.
3. **Given** an authenticated user without the "admin" custom claim, **When** they attempt to write to Firestore, **Then** the write is denied — authentication alone is insufficient.
4. **Given** an authenticated user with the "admin" custom claim, **When** they write to the programs collection, **Then** the write succeeds and is validated by the security rules (schema validation: required fields present, both languages present).
5. **Given** the security rules file, **When** reviewed in version control, **Then** every collection has explicit read/write rules — no wildcards or open permissions.
6. **Given** a Firestore security rules test suite, **When** run against the Firebase Emulator, **Then** all positive and negative access scenarios pass.

---

### Edge Cases

- What happens during the migration period when some content is in Firestore and some is still in HTML? The content service module checks Firestore first; if the document doesn't exist or the collection isn't migrated yet, it falls back to the static HTML/JS source. Both modes coexist per Constitution VI. [DOC]
- What happens if an admin publishes content with broken formatting (e.g., unclosed HTML tags in a description)? The admin interface sanitizes input — no raw HTML is stored. Content is stored as plain text or structured markdown. [INFERENCE]
- What happens if two admins edit the same program simultaneously? Firestore naturally applies last-write-wins — no code required for this behavior. [CODE] A conflict warning UI (version tracking + "modified by another user" alert) is deferred to v2 — with 1-3 admins editing text sporadically, the collision probability is negligible and the audit log (FR-011) provides recovery for the rare case. [DEFERRED-v2]
- What happens if the Firestore free tier quota is exceeded? The site continues to function on cached content. An alert is sent to the admin. Content reads are prioritized over analytics/logging writes. [ASSUMPTION]
- What happens when a new program is added? The admin creates it in Firestore with all required fields (both languages); the public page dynamically renders the new program card from the collection — no HTML changes needed. [INFERENCE]
- How are admin accounts created? Admin custom claims are provisioned via a CLI script using Firebase Admin SDK (`setCustomUserClaims`). No admin management UI in v1 — the team is 1-3 people and Firebase Console cannot set custom claims directly. A runbook documents the process for adding future admins. [DOC]
- What happens if an admin publishes incorrect content and wants to undo? The audit log (FR-011) stores the previous value for every edit. In v1, recovery is manual — a developer restores the previous value using the audit log. No automated rollback UI. For text content with 1-3 admins, re-editing is faster than building rollback infrastructure. [INFERENCE]

## Requirements

### Functional Requirements

- **FR-001**: Program catalog content (title, tagline, description, benefits, transformation, icon) MUST be stored in Firestore and fetched at runtime on empresas/ and personas/ pages.
- **FR-002**: All pricing data (B2C base prices, B2B multipliers, cotizador program details, premium SKU prices) MUST be stored in Firestore and fetched at runtime.
- **FR-003**: Translation dictionaries (ES and EN) MUST be stored in Firestore and fetchable at runtime by the i18n module.
- **FR-004**: The i18n module MUST maintain the existing `data-i18n` attribute contract regardless of whether translations come from static JSON or Firestore.
- **FR-005**: All Firestore content MUST be cached client-side (IndexedDB or localStorage) after the first successful fetch.
- **FR-006**: When Firestore is unreachable, the site MUST display cached content — never a blank page, error state, or broken UI.
- **FR-007**: Cache staleness MUST be bounded by a configurable TTL (default: 1 hour). Stale cache MUST trigger a background refresh on next page load when connectivity is available.
- **FR-008**: An admin interface MUST be accessible at a protected route, requiring Firebase Authentication with the "admin" custom claim.
- **FR-009**: The admin interface MUST allow editing programs, prices, and translations with side-by-side ES/EN editing.
- **FR-010**: The admin interface MUST block publishing if any required field is empty or if a language variant is missing.
- **FR-011**: All admin edits MUST be logged with timestamp, admin identity, field changed, and previous value. Audit logs MUST have a bounded retention period (default: 90 days).
- **FR-012**: Firestore security rules MUST enforce: public read for published content, write restricted to authenticated users with "admin" custom claim.
- **FR-013**: Security rules MUST validate document schema on write — required fields, data types, both language variants present.
- **FR-014**: Security rules MUST be version-controlled in the repository and tested against the Firebase Emulator before deployment.
- **FR-015**: No API keys, service account credentials, or admin secrets MUST appear in client-side code. Firebase client config (public) is the only exception.
- **FR-016**: A centralized content service module MUST mediate all Firestore access — no scattered inline queries across pages.
- **FR-017**: During the migration period, the content service MUST support dual-source resolution: Firestore first, static HTML/JS fallback if the content has not yet been migrated.
- **FR-018**: Each piece of editable content MUST have exactly one authoritative source — never both Firestore and HTML simultaneously for the same content.
- **FR-019**: Bilingual content MUST be stored together in a single document (both ES and EN variants) — not in separate collections per language.
- **FR-020**: Content changes via the admin interface MUST take effect immediately — no deployment step required.
- **FR-021**: Dynamic content fetched from Firestore MUST be present in the DOM within 2 seconds on a 3G connection, or the page MUST fall back to cached/static content.
- **FR-022**: The admin interface MUST meet accessibility standards (Constitution II) — keyboard-navigable, proper ARIA attributes, color contrast compliance.
- **FR-023**: Admin input MUST be sanitized — no raw HTML stored in Firestore. Content is plain text or structured data only.

## Success Criteria

### Measurable Outcomes

- **SC-001**: 100% of program catalog content on empresas/ and personas/ is sourced from Firestore (zero inline JS program objects remain).
- **SC-002**: 100% of pricing data across cotizadores and premium catalog is sourced from Firestore (zero hardcoded `data-price` attributes or JS constants remain).
- **SC-003**: Translation dictionaries are fetchable from Firestore; existing Playwright bilingual test suites continue to pass at 100%.
- **SC-004**: Site functions fully offline after first visit — all Firestore-sourced content available from cache with zero blank sections.
- **SC-005**: Firestore security rules pass 100% of positive/negative test cases in the Emulator.
- **SC-006**: Admin interface requires authentication + "admin" custom claim — unauthenticated and non-admin users are denied access.
- **SC-007**: Admin interface blocks save when required fields or language variants are missing — zero partial content published.
- **SC-008**: Zero API keys or secrets exposed in client-side code (verified by grep scan of deployed assets).
- **SC-009**: Content updates via admin interface appear on the public site within 5 seconds without deployment.
- **SC-010**: Lighthouse Performance score remains >= 90 on homepage, empresas/, personas/ after migration.
- **SC-011**: Firestore content renders within 2 seconds on 3G or falls back to cache/static within the same window.
- **SC-012**: All admin edits produce an audit log entry with timestamp, admin ID, field, and previous value.
- **SC-013**: During migration, pages with non-migrated content continue to function from static HTML/JS — zero regressions.

## Clarifications

### Session 2026-03-22

- Q: How are admin accounts created and managed? -> A: CLI script using Firebase Admin SDK `setCustomUserClaims`. No admin management UI in v1. Documented in runbook. Firebase Console cannot set custom claims directly. [FR-008, US-4, SC-006, Edge Cases]
- Q: Is content rollback needed when an admin publishes incorrect content? -> A: No rollback UI in v1. Audit log (FR-011) stores previous values for manual recovery. Re-editing is faster than rollback infrastructure for 1-3 admins editing text. [FR-011, US-4, Edge Cases]
- Q: What is the audit log retention policy? -> A: 90-day retention, implementable via Firestore TTL fields. Prevents unbounded growth. [FR-011, SC-012]
- Q: Should migration sequence be defined in the spec? -> A: No — migration order is a plan-level decision. Spec mechanism (FR-017, FR-018, dual-source) is sufficient. [FR-017, FR-018]
- Q: Should TTL configuration location be defined in the spec? -> A: No — the "where" is implementation detail for plan. Spec defines "what" (configurable, default 1h). [FR-007]

### Session 2026-03-22 (clarify phase — post-constitution v4.0.0)

- Q: Are migration waves parallelizable or sequential? -> A: Sequential. XIV (Simple First) governs — shared content service requires validation before next wave. [FR-017, FR-018, Plan Migration Strategy]
- Q: Should BDD scenarios expand to full-spectrum (XV) before tasks? -> A: Yes — expand via testify re-run covering design system, CI/CD, operational, strategic angles. [XV, All US, All SC]
- Q: Should evidence tags be applied retroactively? -> A: Yes — full tagging on spec and plan for XIII compliance. Applied in this session. [XIII, All FR, All SC]
