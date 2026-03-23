# Testify Clarifications

Ambiguities detected in `.feature` files via Socratic debate against Constitution v4.0.0.
These clarifications MUST be incorporated in the next `/iikit-04-testify` re-run.

## Session 2026-03-22

- Q: TS-006 uses non-standard Gherkin "Or" keyword — how should the 3G fallback behavior be structured? -> A: Split into 2 separate scenarios: (1) "Firestore responds within 2s on 3G -> render Firestore content" and (2) "Firestore exceeds 2s on 3G -> fall back to static/cached content within same window." Each scenario has an unambiguous Given/When/Then. The "Or" keyword is not valid Gherkin and creates unparseable step definitions. [TS-006, FR-021, SC-011, XV, IX, XIV]

- Q: TS-013 "elements translate identically to the current static JSON behavior" — how is "identically" verified in automation? -> A: Rewrite Then as: "Then every element with data-i18n displays the same text as its corresponding key in the static JSON file." Verification is string equality per key using Playwright textContent() comparison on a representative set of data-i18n elements. "Identically" is not a testable assertion. [TS-013, FR-004, SC-003, XIII, XII, XIV]

- Q: TS-003 "no code deployment was triggered" — can an E2E test verify absence of a deployment? -> A: No. Remove the step "And no code deployment was triggered." The existing "within 5 seconds" assertion already proves no deployment occurred (deployments take minutes). The step is redundant and has no automatable step definition. Parsimony: do not add steps that cannot generate step definitions. [TS-003, FR-020, SC-009, XV, IX, XIV]

- Q: TS-036 tests schema rejection only for programs collection (missing title_en) — does FR-013 schema validation apply to all collections? -> A: Yes. FR-013 states "Security rules MUST validate document schema on write — required fields, data types, both language variants present." Add schema rejection scenarios for pricing (e.g., missing premium_price field) and translations (e.g., missing en variant). Minimum: one negative schema validation scenario per collection. [TS-036, FR-013, SC-005, XV, VII, IX]

## Session 2026-03-23

- Q: TS-024 says "raw HTML is stripped or escaped before storage" — which sanitization strategy? -> A: Strip (remove tags, keep text content). Socratic debate eliminated escape (produces visible `&lt;` artifacts, violates FR-023 "plain text only") and allowlist (no rich-text use case exists, adds dependency + XSS surface, violates XIV Simple First). Refinement: strip with `<script>`/`<style>` content removal using native DOMParser — zero dependencies. Extensible to markdown/rich-text later via schema `format` field without rewrite. [TS-024, FR-023, XIV, VII]

- Q: TS-022 and TS-040 assert static code properties (no secrets, no scattered queries) — how are these automated as BDD scenarios? -> A: Hybrid strategy per test nature. TS-022 (secrets): Playwright step definition with dual-layer verification — (1) grep scan of `.js`/`.html` for secret patterns (`sk-`, `-----BEGIN`, `service_account`, `private_key`) excluding `firebase-config.js` (public config), and (2) `page.evaluate` runtime scan of `window` globals and `<script>` content. TS-040 (centralized access): Vitest unit test with `@TS-040` tag — grep for Firestore API calls (`collection`, `doc`, `getDoc`, `getDocs`) outside `js/cms/`, no browser needed. Gherkin scenarios unchanged — they document behavior; step definitions choose the natural runner (browser tests → Playwright, code scans → Vitest). Trazability preserved via `@TS-xxx` tags linking scenario → requirement → implementation. [TS-022, TS-040, FR-015, FR-016, SC-005, SC-008, XV, VII, XII, XIV]
