<!-- Sync Impact Report
Version: 4.1.0 (Socratic Hardening — sanitization, runner-agnostic BDD, dual-layer verification)
Modified principles:
  - VII. Secure by Default: added input sanitization default (strip,
    not escape/allowlist) and dual-layer security verification
  - XV. BDD Full-Spectrum Quality: added runner-agnostic step
    definitions and Socratic debate protocol for ambiguity resolution
Modified sections:
  - Quality Standards: added input sanitization and dual-layer
    verification standards
  - Governance: added Socratic debate as constitutional mechanism
Previous version: 4.0.0 (Work Philosophy + BDD Full-Spectrum + Quality Gates)
Origin: Socratic debates on TS-022, TS-024, TS-040 during clarify phase
  - Debate 1: sanitization strategy (strip vs escape vs allowlist)
  - Debate 2: static vs runtime verification (runner selection for
    code invariants)
Removed sections: None
Follow-up TODOs:
  - Update plan.md with worktree branching strategy
  - Define BDD scenario coverage matrix per principle
  - Downstream specs may need testify re-run for new BDD scope
-->

# Site MetodologIA Constitution

## Work Philosophy

These meta-principles govern HOW all other principles are
applied. They are the permanent operating pattern for every
decision, every line of code, and every artifact produced.

### XIII. Think First, Act Next

No action without understanding. Every task begins with
analysis, decomposition, and explicit reasoning before any
code is written or any change is made.

- **Understand before modifying**: read existing code,
  understand the context, identify the boundaries of change
  BEFORE writing anything
- **Decompose before solving**: break complex problems into
  atomic sub-problems. Address each with explicit reasoning.
  Combine results with awareness of interactions
- **Verify before committing**: logic check, fact check,
  completeness check, bias check. If confidence in the
  approach is low, seek more information — do not proceed
  on assumption
- **Specify before implementing**: requirements (WHAT) must
  exist before plans (HOW), and plans must exist before
  code. Phase separation is non-negotiable:
  Constitution (WHY) > Spec (WHAT) > Plan (HOW) >
  Tasks (WORK) > Tests (PROOF) > Code (SOLUTION)
- **Evidence before assertion**: every claim about behavior,
  performance, or correctness is tagged with its basis:
  `[CODE]` `[CONFIG]` `[DOC]` `[INFERENCE]` `[ASSUMPTION]`
- If more than 30% of claims in a deliverable are tagged
  `[ASSUMPTION]`, the deliverable MUST display a prominent
  warning and trigger clarification before proceeding

**Rationale**: The most expensive code is code that solves
the wrong problem. Think First prevents the waste of
building before understanding. This is the foundational
discipline that makes TDD (IX), BDD (XV), and Code
Sustainability (XII) possible. Acting without thinking
produces code that must be discarded; thinking without
acting is addressed by the next principle.

### XIV. Simple First, Robust Next

Start with the simplest solution that satisfies the
requirement. Add robustness only when the simple version
is proven insufficient through evidence — never
preemptively.

- **Working beats perfect**: a simple, tested, working
  solution today is better than an over-engineered solution
  that takes three times longer to deliver
- **Progressive refinement**: build the minimum viable
  implementation first. Observe its behavior in practice.
  Add complexity only where observed failure or measured
  inadequacy demands it
- **No premature abstraction**: three similar lines of code
  are better than a premature utility function. Abstract
  only when the pattern has repeated enough to prove the
  abstraction is warranted
- **No speculative features**: do not build for hypothetical
  future requirements. Build for the current requirement
  and ensure the design is extensible (Principle XII) so
  future needs can be added when they become real
- **Complexity requires justification**: any solution that
  is more complex than the simplest alternative MUST
  document why the simpler approach was insufficient.
  The burden of proof is on complexity, not simplicity

**Rationale**: Unnecessary complexity is the primary source
of maintenance burden, onboarding friction, and bugs in
long-lived codebases. Simple First is not simplistic — it
is strategic. Robustness is added through iterative
refinement guided by evidence (tests, metrics, user
feedback), not by anticipation. This principle works in
concert with TDD (IX): tests define the boundary of what
is needed; Simple First ensures we don't exceed it.

## Core Principles

### I. Client-Rendered, Cloud-Backed

The site is a client-rendered application backed by a managed
Backend-as-a-Service (BaaS) provider. The browser does the
rendering; the cloud stores the content.

- Pages render entirely in the browser — no server-side
  rendering framework
- Editable content (prices, descriptions, translations,
  program details) is stored in a cloud document store and
  fetched at runtime
- Static HTML provides the shell, layout, and structure;
  the cloud provides the data
- The site must function in degraded mode when the backend
  is unreachable — cached or fallback content is displayed,
  never a blank page
- No custom servers or self-managed infrastructure — only
  managed cloud services
- The build step (CSS compilation) remains a development
  convenience, not a runtime dependency

**Rationale**: Client rendering preserves the speed and
simplicity of a static site while enabling real-time content
updates from a managed backend. A BaaS provider eliminates
server operations overhead. Degraded mode ensures the site
never appears broken to visitors.

**Migration note**: During the transition period, pages may
source content from either static HTML or the cloud backend.
Both modes must coexist — a page that has not yet been
migrated to cloud content must continue working from its
embedded HTML text.

### II. Accessibility-First

Every page must be usable by people with disabilities and
meet accessibility standards.

- All interactive elements must be keyboard-navigable
- Modals must use proper ARIA attributes (role, aria-modal,
  aria-labelledby)
- Skip-to-content links on every page
- Color contrast must meet minimum accessibility thresholds
- Images must have meaningful alt text
- Admin interfaces (content editor) must also meet
  accessibility standards — not just the public site

**Rationale**: Accessibility is a legal and ethical
requirement, not a nice-to-have. An EdTech site must model
inclusive design — including its own tooling.

### III. SEO Integrity

Every public page must be discoverable and correctly
described for search engines and social platforms.

- Required meta tags: description, robots, canonical, Open
  Graph (type, url, title, description, image), Twitter Card
- Internal/admin/template pages must be marked noindex
- Sitemap must reflect actual site structure
- No duplicate or orphaned canonical URLs
- Dynamic content must be present in the DOM before search
  engine crawl timeout — content fetched from the backend
  must render within the initial page load, not behind
  user interaction

**Rationale**: Organic search is the primary acquisition
channel. Backend-sourced content must be just as crawlable
as static HTML content.

### IV. Component Consistency

Shared UI patterns must be implemented once and reused, not
duplicated across pages or between frontend and admin.

- Site-wide elements (header, footer) use web components
- Modal behavior uses a unified system, not per-page
  implementations
- No inline styles for patterns that exist in the stylesheet
- CSS follows the established token and layering system
- Backend data access must go through centralized service
  modules — no scattered inline queries across pages
- The i18n system uses a single attribute contract
  (`data-i18n`) regardless of whether translations come
  from static JSON files or from the cloud

**Rationale**: Duplication creates drift. A single source
of truth for UI patterns AND data access patterns prevents
inconsistency across 63+ pages and reduces maintenance
burden during the static-to-cloud migration.

### V. Brand Separation

MetodologIA is a distinct brand. Site content must never mix
or reference other brands.

- No references to parent companies, partner brands, or
  internal tooling names in public-facing content
- Visual identity (colors, typography, tone) must be
  consistently MetodologIA
- Program names must match the defined catalog exactly
- Admin/CMS interfaces may carry subtle "powered by" marks
  but the public-facing site is MetodologIA exclusively

**Rationale**: Brand confusion undermines trust. The site
represents MetodologIA exclusively.

### VI. Content Authority

Editable content has a single source of truth. No content
is duplicated between static files and the cloud backend.

- Each piece of editable content (price, description,
  translation, program detail) lives in exactly one place
- During migration: content authority shifts from HTML
  files to the cloud backend one section at a time — never
  both simultaneously for the same content
- Content schema must be documented and validated — no
  free-form unstructured storage
- Bilingual content (ES/EN) follows a consistent structure:
  every editable text has both language variants stored
  together
- Content changes made via the admin interface take effect
  immediately — no deployment step required

**Rationale**: Dual sources of truth create conflicts and
stale data. The CMS vision requires clear ownership of every
piece of content. The migration must be incremental to avoid
big-bang risk.

### VII. Secure by Default

Access control is enforced at the data layer, not the
application layer. User input is sanitized at the boundary.
Security claims are verified both statically and at runtime.

- Backend security rules enforce least-privilege access —
  public visitors read content, only authenticated
  administrators edit it
- Authentication is handled by a managed identity provider,
  not custom auth logic
- No secrets, API keys, or admin credentials in
  client-side code
- Admin operations require role-based authorization — not
  just authentication
- Security rules are version-controlled and tested before
  deployment
- **Input sanitization default**: user-provided text MUST
  be stripped of HTML tags before storage — not escaped, not
  allowlisted. Strip removes tags and keeps text content;
  `<script>` and `<style>` tags are removed with their
  content. No external sanitization libraries unless the
  field explicitly requires rich text (which must be
  justified per XIV). Native browser APIs (DOMParser) are
  preferred over dependencies
- **Dual-layer security verification**: security invariants
  (no secrets in client code, no unauthorized access
  patterns) MUST be verified at two layers — (1) static
  analysis of source files (grep/scan) and (2) runtime
  inspection of deployed artifacts (browser evaluation).
  The marginal cost of the second layer is near-zero when
  E2E tests already exist; the marginal benefit is closing
  vectors that static analysis cannot detect

**Rationale**: A CMS is a write-capable system. Without
server-side enforcement, any client-side restriction can be
bypassed. Data-layer security is the last line of defense
and must be treated as such. Input sanitization at the
boundary prevents contamination from copy-paste (the
primary real-world vector — not malicious injection by
authenticated admins). Dual-layer verification follows the
defense-in-depth principle: static analysis catches known
patterns in source; runtime analysis catches what reaches
the browser through any path.

### VIII. Offline Resilience

The site must degrade gracefully when connectivity is
impaired.

- Client-side caching of backend content ensures the site
  works with intermittent connectivity
- Critical content (program catalog, prices, navigation)
  is cached for offline access after first visit
- Cache invalidation follows a clear strategy — stale
  content is acceptable temporarily, but updates must
  propagate within a defined window
- When backend is unreachable, the site displays the last
  known good content, not an error state

**Rationale**: The site serves users across Latin America
where connectivity varies. A backend dependency must not
make the site less reliable than the static version it
replaces.

### IX. Test-Driven Development

All production code MUST be preceded by tests. Tests define
expected behavior; code is written to satisfy those tests.
This principle operates within the Think First (XIII) and
BDD Full-Spectrum (XV) governance.

- Tests MUST be written before the production code they
  verify — red-green-refactor is the required workflow
- Acceptance Test-Driven Development (ATDD): feature-level
  behavior is specified as executable acceptance scenarios
  (Given/When/Then) before implementation begins
- End-to-end tests MUST cover critical user journeys:
  content loading, offline resilience, admin workflows,
  language switching, cotizador calculations
- Security rules MUST be tested against an emulator before
  deployment — positive and negative access scenarios
- Test assertions MUST NOT be modified to make failing
  tests pass — fix the production code instead
- Feature files (.feature) and test specifications are
  generated from requirements and hash-locked — changes
  require re-running the testify phase, not manual edits
- Tests MUST run in automation (CI or pre-commit) — manual
  test execution is not a substitute for automated gates

**Rationale**: The primary purpose of TDD and ATDD is to
prevent unnecessary code generation. Tests written first
define the exact boundary of what the system must do —
nothing more, nothing less. This discipline is vital for
sustainability and simplicity without trivializing the
enterprise robustness the project requires. A CMS migration
touches every page; test-first prevents both regressions
and overengineering. ATDD ensures acceptance criteria are
executable, not just documented. Hash-locked feature files
prevent the common failure mode of weakening tests to match
broken code.

### X. Design System Governance

The site follows a documented design system with canonical
tokens. Visual decisions are made once and enforced
everywhere — not reinvented per page.

- **Aesthetic**: Neo-Swiss Clean — flat vector illustration,
  Swiss grid (editorial order), generous whitespace,
  column-based composition, soft geometric forms, simple
  consistent iconography
- **Color palette** (exclusive, no deviations):
  Navy #122562, Gold #FFD700, Blue #137DC5, Dark #1F2833,
  Lavender #BBA0CC, Gray #808080
- **Typography hierarchy**: Poppins (headings), Trebuchet
  (body), Futura (footnotes, callouts, small UI labels)
- **Visual rules**: high legibility (large text, high
  contrast), no text on noisy backgrounds, soft shadows
  and micro-gradients (never realistic), faceless human
  figures in illustrations, UI element motifs (chips,
  checklists, timers)
- All design tokens (colors, fonts, spacing, shadows) MUST
  be defined in a single source of truth (CSS custom
  properties or a tokens file) and referenced — never
  hardcoded as raw values across pages
- New pages and components MUST use existing tokens — no
  one-off color values, font stacks, or spacing that
  diverges from the system
- Dark/light theme variants MUST both comply with the
  palette and contrast requirements

**Rationale**: 63+ pages without a governed design system
drift into visual inconsistency. Canonical tokens ensure
every page looks like the same brand. The Neo-Swiss Clean
aesthetic communicates the method-driven, professional
identity of MetodologIA without visual noise.

### XI. Brand Voice Integrity

All public-facing content follows the MetodologIA Brand
Voice v3.0 — a method-driven, evidence-based communication
standard.

- **Structure**: all substantive content uses the Minto
  pyramid — conclusion first, then supporting reasons
  (MECE), then evidence, then a call to action
- **Evidence honesty**: every strong claim must be supported
  by a real data point, a suggested indicator, an observable
  signal, or an explicit "data required" marker — never
  unsupported assertions
- **Language**: Spanish (Latin American neutral, "tu" form),
  no regionalisms or local idioms
- **Prohibited terms** (zero tolerance in published
  content): "hack", "truco", "secreto", "resultados
  instantaneos", "arquitecto", "arquitectura",
  "transformacion" (use "(R)Evolucion" instead)
- **Preferred terms**: "metodo", "disenar/diseno",
  "sistemas", "gobernanza", "capacidades",
  "(R)Evolucion", "Success as a Service" (B2B)
- **Voice pillars**:
  - P1 (R)Evolucion: the gap between current and desired
    state is closed with method
  - P2 Intention over intensity: design before force
  - P3 Technology as ally: automate the repetitive,
    amplify the important
- **Content quality gate**: every published piece must pass
  — Minto structure, MECE supports, honest evidence,
  zero red-list terms, executable CTA, both language
  variants present

**Rationale**: Brand voice is not a style preference — it
is a quality system. The Minto-First structure ensures
content drives decisions, not just comprehension. Evidence
honesty prevents the credibility erosion that comes from
inflated promises. The red/green vocabulary list prevents
brand dilution across 63+ pages of content.

### XII. Code Sustainability

All code must be written for the person who maintains it
next — not the person who writes it now. The codebase must
be understandable, navigable, and modifiable by someone
without specialist knowledge of the original implementation.

- **Business-readable code**: variable names, function names,
  and module names must reflect business concepts — not
  implementation mechanics. A non-developer reading the code
  should understand what it does from its naming alone
- **Naming conventions**: files, directories, CSS classes,
  JS identifiers, and URL slugs follow a documented,
  consistent naming convention. No ad-hoc abbreviations,
  no inconsistent casing across the same domain
- **Slugging**: all URL paths, file names, and identifiers
  that appear in user-facing contexts use kebab-case slugs
  derived from the business name — predictable, searchable,
  and human-readable
- **Scaffolding**: new features follow established directory
  patterns. The file structure must be self-documenting —
  a new contributor can find where to add code by looking
  at the existing layout, not by asking
- **README-driven**: every significant module or directory
  must have a README or inline documentation that explains
  its purpose, boundaries, and usage — not its
  implementation details
- **Clean code**: no dead code, no commented-out code, no
  magic numbers, no functions longer than what fits on one
  screen. Single responsibility per module. Explicit over
  implicit
- **Extensible without rewrite**: new content types,
  programs, or pages must be addable by following existing
  patterns — not by modifying core infrastructure
- **Interoperable**: modules communicate through documented
  contracts (function signatures, event names, data shapes),
  not through shared mutable state or implicit dependencies
- **Scalable simplicity**: prefer the simplest solution that
  meets the requirement. Complexity is added only when a
  simpler approach has been proven insufficient — never
  preemptively

**Rationale**: The site will be maintained by a small team
where any member may touch any part of the codebase. Code
that requires specialist knowledge to modify becomes a
single point of failure. Business-readable naming, consistent
conventions, and self-documenting structure reduce onboarding
time and maintenance risk. TDD (Principle IX) prevents
unnecessary code; this principle ensures the necessary code
is written for longevity.

### XV. BDD Full-Spectrum Quality

Behavior-Driven Development is the overarching quality
pattern. BDD scenarios do not only cover functional behavior
— they address every angle of the system: strategic,
tactical, operational, technical, UX, UI, backend,
middleware, data, DevSecOps, CI, and CD.

- **Full-spectrum BDD**: acceptance scenarios MUST be defined
  for every quality dimension relevant to the feature —
  not just "happy path" functional behavior
- **Coverage angles** (applicable per feature):
  - **Strategic**: does the feature align with business
    goals and constitutional principles?
  - **Tactical**: does the migration sequence make sense?
    Are dependencies managed?
  - **Operational**: can admins use it? Are error messages
    actionable? Is the runbook clear?
  - **Technical**: does the code meet performance, security,
    and scalability requirements?
  - **User experience**: is the behavior intuitive? Does
    offline degradation feel seamless?
  - **UI**: do components match the design system? Are
    tokens used correctly?
  - **Backend**: do security rules enforce correctly? Does
    the data model validate?
  - **Middleware**: does the content service mediate all
    access? Does caching work?
  - **Data**: is schema validation enforced? Are both
    languages present? Is audit logging complete?
  - **DevSecOps**: are secrets absent from client code?
    Are rules tested before deploy?
  - **CI/CD**: do automated gates block broken code? Do
    tests run before merge?
- **BDD as specification language**: Given/When/Then
  scenarios are the primary artifact for defining expected
  behavior at every level. They are written BEFORE code
  (ATDD, Principle IX) and hash-locked to prevent drift
- **Traceability**: every BDD scenario traces to at least
  one requirement (FR-XXX), one success criterion (SC-XXX),
  and one constitutional principle
- **Runner-agnostic step definitions**: Gherkin scenarios
  document WHAT behavior is expected. Step definitions
  implement HOW it is verified. The runner MUST match the
  nature of the test — browser-dependent tests use
  Playwright, code structure invariants use unit test
  runners (Vitest), security rules use the Firebase
  Emulator. A scenario that verifies a static code property
  (e.g., "no scattered queries") is valid BDD — the step
  definition executes a grep, not a browser interaction.
  Traceability is preserved via `@TS-xxx` tags linking
  scenario to requirement to implementation regardless of
  runner
- **Socratic debate for ambiguity resolution**: when a BDD
  scenario contains ambiguous terms, untestable assertions,
  or implementation options with divergent consequences, the
  ambiguity MUST be resolved through structured Socratic
  debate before implementation. The debate examines each
  option against constitutional principles (especially VII,
  XIV, XV), eliminates options by contradiction, and
  produces a single answer with rationale. The answer is
  recorded in `tests/clarifications.md` and integrated into
  the artifact. This replaces ad-hoc decision-making with
  principled, auditable reasoning

**Rationale**: Traditional BDD focuses narrowly on user-
facing behavior. But a CMS migration has quality dimensions
that span security, data integrity, performance, offline
resilience, and brand compliance. Full-spectrum BDD ensures
nothing falls through the cracks by making every quality
angle a testable behavior. This is the practical expression
of Think First (XIII): you cannot test what you have not
thought about. Runner-agnostic step definitions prevent the
anti-pattern of forcing all tests through a browser when
many quality angles (code structure, security rules, static
analysis) are naturally verified by other tools. Socratic
debate ensures that ambiguity is resolved by principled
reasoning rather than arbitrary choice — every decision has
a traceable rationale anchored in the constitution.

### XVI. Parallel-Ready Workflow

Development work MUST be structured for parallel execution
across independent work streams using isolated branches.

- **Branch-per-task isolation**: each task or feature is
  developed on its own branch, isolated from other
  in-progress work
- **Worktree-based parallelism**: independent tasks may
  execute simultaneously in separate worktrees, enabling
  multi-agent or multi-developer parallel work without
  merge conflicts
- **Atomic, mergeable units**: each branch produces a
  self-contained change that can be merged independently.
  No branch should depend on another in-progress branch
- **Contract-first integration**: when parallel tasks must
  eventually integrate, they agree on contracts (API
  signatures, data shapes, event names) BEFORE parallel
  implementation begins
- **No long-lived feature branches**: branches are short-
  lived and merged frequently. Work that exceeds one
  sprint is decomposed into smaller mergeable increments
- **Merge discipline**: all branches pass automated tests
  (Principle IX) and quality gates before merge. No force-
  pushing to shared branches

**Rationale**: A multi-agent development workflow (human +
AI agents working concurrently) requires work to be
structured for safe parallelism. Worktree isolation prevents
the "stepping on each other" problem. Contract-first
integration prevents the "works in isolation, breaks on
merge" problem. Atomic units prevent the "can't ship
because branch X isn't ready" problem. This principle makes
the Think First (XIII) and Simple First (XIV) disciplines
scalable across multiple concurrent workers.

## Quality Gates

Quality gates formalize the checkpoints adopted from the
JM Agentic Development Kit. Every feature MUST pass each
applicable gate before advancing.

| Gate | When | Criteria |
|------|------|----------|
| **G0** | Pre-flight | Secrets scan clean, no credentials in client code, branch created, constitution compliance confirmed |
| **G1** | After specification | Spec complete (FR-XXX, SC-XXX, Given/When/Then), evidence tags present, checklist passed, no unresolved clarifications |
| **G2** | After plan + design | Data model documented, API contracts defined, security rules designed, BDD scenarios hash-locked, design system tokens referenced |
| **G3** | Deploy-ready | All automated tests pass, Lighthouse >= 90, security rules pass emulator tests, accessibility audit clean, brand voice red-list scan clean |

- Gates are enforced by the IIKit phase pipeline: G0 at
  constitution, G1 at specify/checklist, G2 at plan/testify,
  G3 at implement
- A feature that fails a gate MUST NOT advance to the next
  phase — fix the failure, do not bypass the gate
- Gate results are recorded in `.specify/context.json` for
  dashboard tracking

## Quality Standards

- No broken links or missing assets on any public page
- No JavaScript console errors in production
- All pages must render correctly on mobile and desktop
- Theme switching (dark/light) must not break layout or
  readability
- Resource downloads must point to valid, accessible files
- Cotizadores must produce correct calculations with no
  rounding or display errors
- Dynamic content from the backend must load within 2
  seconds on a 3G connection or fall back to cached content
- Admin interface must validate content before saving —
  no empty required fields, no broken references, no
  orphaned translations
- Admin input must be HTML-stripped before storage — plain
  text only unless the field schema explicitly declares a
  rich-text format. `<script>` and `<style>` content must
  be removed entirely, not just tag-stripped
- Security invariants (no secrets, no unauthorized access
  patterns, centralized data access) must pass both static
  scan and runtime verification in CI
- Both language variants (ES/EN) must be present before
  content is published — no partial translations visible
  to users
- All acceptance scenarios MUST have passing automated
  tests before a feature is considered complete
- Security rule changes MUST pass emulator tests before
  deployment
- New UI components MUST use design system tokens — no
  raw hex values, no inline font declarations
- Published content MUST pass the brand voice quality gate
  (Minto structure, evidence, CTA, red-list scan)
- All new modules and directories MUST have a README that
  explains purpose and usage
- Variable and function names MUST reflect business concepts
  — no cryptic abbreviations or implementation-only naming
- File and URL naming MUST follow the documented slug
  convention — no ad-hoc patterns
- Evidence tags MUST be present on all claims in technical
  deliverables — untagged assertions are not acceptable

## Development Workflow

### Think Phase (before every task)

1. Read existing code and understand context
2. Decompose the problem into atomic sub-problems
3. Verify that spec, plan, and tests exist (phase
   separation)
4. Identify which quality gate applies

### Act Phase (implementation)

5. Write tests before production code (TDD/ATDD)
6. Implement the simplest solution that passes the tests
7. Refactor for clarity and sustainability (red-green-
   refactor)
8. Verify against all applicable BDD angles (XV)

### Verify Phase (before commit)

9. Run the full automated test suite — do not commit with
   failing tests
10. Check design system token compliance for UI changes
11. Scan for secrets, red-list terms, naming violations
12. Verify accessibility on affected pages
13. Confirm quality gate criteria are met

### Integration Phase (before merge)

14. Ensure branch is atomic and independently mergeable
15. Resolve conflicts against main — never force-push
16. Run tests again after rebase/merge
17. Update sitemap, SEO tags, and README if affected

## Governance

This constitution governs all development on the
MetodologIA site. It supersedes ad-hoc decisions and
personal preferences.

- **Amendments** require explicit approval from the project
  owner, a version increment, and documentation of the
  change rationale
- **Compliance** is verified by reviewing changes against
  these principles before merging
- **Conflicts** between principles are resolved by the
  project owner; accessibility, security, and brand
  separation take precedence over convenience
- **Work philosophy** (XIII, XIV) governs how all other
  principles are applied — Think First before acting,
  Simple First before adding complexity
- **Migration decisions** (which content migrates to the
  backend and when) are governed by Content Authority
  (Principle VI) — never duplicate, migrate incrementally
- **Test discipline** is non-negotiable: no feature is
  complete without passing automated tests (Principle IX)
- **Quality gates** (G0-G3) are mandatory checkpoints;
  no feature advances past a failed gate
- **Design tokens** are the canonical source for visual
  decisions; deviations require amendment (Principle X)
- **Brand voice** compliance is verified for all published
  content; red-list violations block release (Principle XI)
- **Code sustainability** is verified by naming review,
  README presence, and pattern adherence (Principle XII)
- **BDD coverage** must span all applicable quality angles
  (XV) — narrow functional-only scenarios are insufficient
- **Parallel workflow** discipline ensures branches are
  atomic, contract-first, and short-lived (Principle XVI)
- **Socratic debate** is the required mechanism for
  resolving ambiguities that have divergent implementation
  consequences. Each option is examined against
  constitutional principles until eliminated by
  contradiction. The surviving option is integrated with
  full rationale. Debates are recorded in clarification
  artifacts for auditability

**Version**: 4.1.0 | **Ratified**: 2026-03-22 | **Last Amended**: 2026-03-23
