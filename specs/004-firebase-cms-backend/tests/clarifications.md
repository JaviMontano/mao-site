# Testify Clarifications

Ambiguities detected in `.feature` files via Socratic debate against Constitution v4.0.0.
These clarifications MUST be incorporated in the next `/iikit-04-testify` re-run.

## Session 2026-03-22

- Q: TS-006 uses non-standard Gherkin "Or" keyword — how should the 3G fallback behavior be structured? -> A: Split into 2 separate scenarios: (1) "Firestore responds within 2s on 3G -> render Firestore content" and (2) "Firestore exceeds 2s on 3G -> fall back to static/cached content within same window." Each scenario has an unambiguous Given/When/Then. The "Or" keyword is not valid Gherkin and creates unparseable step definitions. [TS-006, FR-021, SC-011, XV, IX, XIV]

- Q: TS-013 "elements translate identically to the current static JSON behavior" — how is "identically" verified in automation? -> A: Rewrite Then as: "Then every element with data-i18n displays the same text as its corresponding key in the static JSON file." Verification is string equality per key using Playwright textContent() comparison on a representative set of data-i18n elements. "Identically" is not a testable assertion. [TS-013, FR-004, SC-003, XIII, XII, XIV]

- Q: TS-003 "no code deployment was triggered" — can an E2E test verify absence of a deployment? -> A: No. Remove the step "And no code deployment was triggered." The existing "within 5 seconds" assertion already proves no deployment occurred (deployments take minutes). The step is redundant and has no automatable step definition. Parsimony: do not add steps that cannot generate step definitions. [TS-003, FR-020, SC-009, XV, IX, XIV]

- Q: TS-036 tests schema rejection only for programs collection (missing title_en) — does FR-013 schema validation apply to all collections? -> A: Yes. FR-013 states "Security rules MUST validate document schema on write — required fields, data types, both language variants present." Add schema rejection scenarios for pricing (e.g., missing premium_price field) and translations (e.g., missing en variant). Minimum: one negative schema validation scenario per collection. [TS-036, FR-013, SC-005, XV, VII, IX]
