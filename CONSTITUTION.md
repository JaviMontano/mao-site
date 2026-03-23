<!-- Sync Impact Report
Version: 5.4.1 (Phase Separation Cleanup)
Added principles: None
Added sections: None
Modified sections:
  - XV: replaced Playwright/Vitest/Firebase names with
    generic "E2E runners/unit runners/emulators"
  - XIX: replaced "Playwright" with "browser automation",
    "Playwright E2E or Vitest unit" with "E2E or unit"
  - XX: replaced Hostinger/Cloudflare/SSH specifics with
    generic "production hosting/CDN/server". Deploy
    checklist now references runbook instead of inline
    SSH commands
Previous version: 5.4.0 (Branch-to-Environment Parity)
Origin: Constitution audit per KISS/YAGNI — phase
  separation rules require no tool-specific content in
  the constitution (those belong in plan.md or runbooks).
  Full history review confirmed no missing governance
  principles. 20 principles cover: architecture (I),
  quality (II-III, IX, XV), brand (V, X, XI), data (VI-VIII),
  security (VII), sustainability (XII), philosophy (XIII-XIV),
  workflow (XVI), knowledge (XVII-XVIII), operations (XIX-XX).
Removed sections: None
Follow-up TODOs:
  - Set up GitHub branch protection rules on main + staging
  - Add GitHub Actions CI for staging PR gate
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
- **Task atomicity**: a single task MUST address a single
  concern that can be completed, tested, and verified
  independently. If a task description contains "and" or
  a comma-separated list of 3+ distinct concerns, it MUST
  be split. The heuristic: one task = one TDD red-green
  cycle. A task that requires multiple independent test
  suites to verify is too large

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
- **Audit trail qualification**: audit log entries that
  record "which field changed" MUST use a fully qualified
  path that identifies collection, document, field name,
  and variant without ambiguity (e.g.,
  `programs/diagnostico.description_es`). A generic field
  name is insufficient for recovery — the log must be
  self-sufficient without additional context

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
  nature of the test — browser-dependent tests use E2E
  runners, code structure invariants use unit test runners,
  security rules use emulators. A scenario that verifies a
  static code property (e.g., "no scattered queries") is
  valid BDD — the step definition executes a grep, not a
  browser interaction. Traceability is preserved via
  `@TS-xxx` tags linking scenario to requirement to
  implementation regardless of runner
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

### XVI. Sequential-First, Parallel-Ready Workflow

Development work follows a sequential-by-default discipline.
Parallelism is a controlled exception, not the default mode.
Tasks advance linearly along the critical path; concurrent
execution is permitted only for tasks with zero shared
dependencies.

- **Sequential is the default**: when choosing between
  sequential and parallel execution, always choose
  sequential. The critical path is the backbone of every
  plan; tasks execute in dependency order, one completing
  before the next begins. This reduces debugging surface,
  prevents compounding errors, and preserves the logical
  framework of the plan
- **WIP limit: 3 concurrent agents maximum**: no more than
  3 agents may execute tasks simultaneously. Each agent
  works on a task that has zero pre-dependencies, zero
  co-dependencies, and zero shared state with the other
  active tasks. If a candidate task shares any dependency
  with an in-progress task, it waits — it does not start
- **Forward-only progression**: tasks always move forward.
  A completed task is never revisited unless a downstream
  failure requires it (and that revisit is tracked as a
  new task, not a rollback). No circular dependencies, no
  speculative re-work, no "let's redo this while we wait"
- **Parallel eligibility criteria**: a task may run in
  parallel with other active tasks ONLY when ALL of the
  following are true:
  (1) it touches different files than all active tasks,
  (2) it has no data dependency on any active task's output,
  (3) it has no logical dependency on any active task's
  outcome (e.g., a design decision that could change),
  (4) its failure would not invalidate any active task's
  work
- **Branch-per-task isolation**: each task or feature is
  developed on its own branch, isolated from other
  in-progress work
- **Worktree-based parallelism**: when tasks meet the
  parallel eligibility criteria above, they may execute
  simultaneously in separate worktrees. Worktrees are
  a mechanism for safe parallelism — they do not override
  the sequential-first default
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

**Rationale**: Parallelism is powerful but dangerous.
Concurrent execution multiplies debugging surface, creates
hidden state interactions, and produces merge conflicts that
consume more time than sequential execution would have taken.
The sequential-first discipline follows the critical path
and logical framework: each task builds on verified
foundations, not assumptions about concurrent work. The WIP
limit of 3 agents is a practical ceiling — beyond 3
concurrent streams, coordination overhead exceeds execution
gains. Forward-only progression prevents the waste of
circular rework. Parallel eligibility criteria ensure that
when parallelism is used, it is genuinely safe — not merely
convenient. This principle makes the Think First (XIII) and
Simple First (XIV) disciplines scalable: sequential
execution IS the simple approach; parallelism is the
complexity that requires justification (XIV).

### XVII. Continuous Learning Loop

Every decision, debate, and discovery feeds back into the
system as a reusable insight. The project does not repeat
mistakes or re-debate settled questions — it compounds
knowledge.

- **Socratic debate as decision engine**: when a decision
  has 2+ options with divergent consequences, resolve it
  through structured Socratic debate — test each option
  against constitutional principles, eliminate by
  contradiction, record the surviving answer with full
  rationale. No ad-hoc decisions for consequential choices
- **Three outputs per debate**: every debate produces
  (1) the direct answer, (2) refinements to the original
  question discovered during analysis, (3) coverage gaps
  in adjacent territory. Capture all three
- **Insights capture**: after every debate or significant
  discovery, extract the reusable decision pattern and
  record it in `insights/<domain>.md` with origin, pattern,
  rationale, trigger conditions, and constitutional anchor.
  Universal patterns go in `insights/universal.md`; domain-
  specific patterns go in their domain file
- **Constitution evolution**: when an insight reveals a
  recurring ambiguity or a missing base definition, the
  constitution MUST be amended to prevent the ambiguity
  from recurring. The goal is that each debate makes future
  debates unnecessary for the same class of decision
- **Insight consultation before debate**: before starting a
  new Socratic debate, check `insights/` for existing
  patterns that may already resolve the question. If a
  prior insight applies, cite it — do not re-debate
- **No knowledge loss**: insights, clarifications, and
  debate outcomes are never deleted — they are updated or
  superseded with a reference to the replacement. The
  audit trail of reasoning is as valuable as the code

**Rationale**: A project that doesn't learn from its own
decisions is condemned to re-debate them. The Socratic
debates on TS-024, TS-022/TS-040, and TS-020 produced
insights that now prevent entire categories of future
ambiguity (sanitization defaults, runner selection, audit
log design). This principle formalizes the feedback loop:
debates → insights → constitution amendments → fewer
debates needed. The compounding effect means the project
gets faster and more precise over time, not slower.

### XVIII. Indexable & Self-Organizing Repository

Every directory in the project MUST be navigable by a human
or agent reading only index files. The repository organizes
itself — no folder exists without explaining its purpose.

- **README per directory**: every directory MUST contain a
  README.md that explains its purpose, contents, and
  relationship to the project. A developer (or AI agent)
  should understand any folder's role by reading its README
  alone — without asking anyone
- **Index-driven navigation**: the project root README
  links to top-level directories. Each directory's README
  links to its children. The result is a navigable tree
  where no folder is an orphan
- **Auto-organization**: when a new directory is created
  (by human or agent), it MUST immediately get a README.
  When files accumulate without structure, they MUST be
  organized into named subdirectories with READMEs. Entropy
  is actively countered — the repo gets more organized over
  time, not less
- **.gitignore governance**: files and directories that are
  not part of the deployable site or version-controlled
  artifacts MUST be gitignored. The `.gitignore` file is a
  living document with comments explaining each exclusion.
  No silent exclusions — every pattern has a reason
- **Workspace separation**: user interaction files (inputs,
  drafts, scratch work, session artifacts) live in
  `workspace/` which is gitignored. The repo contains only
  source code, specs, and governance artifacts. This
  separation prevents the repo from accumulating transient
  files that obscure its structure
- **Staleness prevention**: directories older than 30 days
  without updates are flagged during session protocol for
  review. Empty directories are removed. Orphaned files are
  relocated or deleted

**Rationale**: A 63+ page site with specs, insights, admin
interfaces, and workspace interactions can quickly become
unnavigable. Index-driven organization ensures that the
project remains understandable at any scale. README-per-
directory is the cheapest possible documentation — it lives
next to the code it describes and is maintained as part of
the same commit. The workspace separation prevents the repo
from becoming a dumping ground for transient files. This
principle makes XII (Code Sustainability) concrete at the
directory level.

### XIX. User-Reported Bug Protocol

Bugs reported by users or discovered during manual review
follow a mandatory triage-diagnose-fix-verify pipeline.
User-reported bugs are high-signal events — they represent
real-world failures that automated tests missed.

- **Immediate triage**: user-reported bugs are P0 by default.
  Stop feature work and triage within the current session.
  The user's perspective is the source of truth for severity
  — what they observed IS the bug, not what the code
  "should" do
- **Browser automation verification first**: before writing
  any fix, reproduce the bug with browser automation on the
  live URL. Capture the exact failure state — what the user
  sees, not what the developer assumes. If the bug cannot
  be reproduced in automation, investigate the deployment
  gap (local vs production divergence)
- **Root cause before fix**: never apply a surface patch.
  Trace the symptom to its root cause using the 5 Whys
  pattern. Document the causal chain. A fix that addresses
  a symptom without understanding the cause will recur
- **Deployment-parity check**: if the live site differs from
  the local repo, the first fix is synchronization. A code
  fix in a repo that is not deployed is not a fix — it is
  a promise. Verify the deployed artifacts match the repo
  HEAD before declaring victory
- **Regression test mandatory**: every user-reported bug
  generates at least one regression test (E2E or unit) that
  fails before the fix and passes after. This test is
  permanent — it guards against recurrence
- **No workarounds**: do not instruct the user to "clear
  cache", "hard refresh", or "try another browser". Fix the
  code. The user's environment is the production environment
- **Audit trail**: every user-reported bug is logged with:
  (1) user's description, (2) reproduced symptoms,
  (3) root cause chain, (4) fix applied, (5) regression
  test added, (6) deployment verified

**Rationale**: User-reported bugs are the most expensive kind
of bug — they mean a real person experienced a broken
product. The cost of a user-reported bug is not just the fix,
it is the trust erosion. This protocol ensures that user
reports trigger a thorough response: reproduce, understand,
fix at the root, prevent recurrence, and verify the fix
reaches production. The automation-first approach catches the
class of bugs that offline tests miss: deployment gaps, CDN
caching, build artifacts that diverge from source.

### XX. Branch-to-Environment Parity

Every environment has exactly one source branch. Code flows
forward through branches — never backward, never skipping
a stage. What reaches users is what passed through every
gate.

```
feature/* ──→ staging ──→ main ──→ production hosting
   (dev)      (pre-prod)  (prod)    (CDN + origin)
```

- **Feature branches** (`NNN-slug` or `feature/*`): all
  development happens here. One feature per branch, branched
  from `staging`. Tests run locally. No direct commits to
  `staging` or `main`
- **`staging`** (pre-production): integration branch where
  features are merged via PR. E2E tests run against a
  staging URL or local server before promoting. This is
  the "last look" before production — the project owner
  reviews here
- **`main`** (production): the **only** branch that deploys
  to production. Receives merges exclusively from `staging`
  via PR. Every commit on `main` is deployed code. No
  direct commits, no force pushes, no exceptions
- **Production hosting**: pulls from `main` only. Deploy =
  git pull + server cache purge + CDN cache purge. Deploy
  checklist is non-negotiable (specifics in deploy runbook)

#### Flow rules

1. **Feature → staging**: developer opens PR from feature
   branch to `staging`. CI runs unit tests. Merge when
   green + approved
2. **staging → main**: project owner opens PR from
   `staging` to `main`. E2E tests must pass. This PR is
   the production gate — it is never auto-merged
3. **main → production**: after merge to `main`, execute
   the deploy runbook: git pull on server, purge server
   cache, purge CDN cache, verify live site with browser
   automation
4. **Hotfix path**: for P0 bugs (XIX), create
   `hotfix/slug` from `main`, fix, PR to `main` directly,
   then backport to `staging`. This is the only case where
   `main` receives a non-staging PR

#### Prohibitions

- No direct commits to `main` or `staging`
- No force push to `main` (ever) or `staging` (except
  rebase cleanup before merge)
- No deploying from any branch other than `main`
- No skipping the staging → main PR gate
- No merging `main` back into `staging` (forward-only)

#### Deploy checklist (mandatory per deploy)

1. Push `main` to remote
2. Pull `main` on production server
3. Purge server-side cache
4. Purge CDN cache
5. Wait for propagation, verify live site with browser
   automation
6. If CDN stale: activate development mode temporarily

Host-specific commands live in the deploy runbook (see
`memory/reference_hostinger_deploy.md`), not here.

**Rationale**: The BUG-001 incident (2026-03-23) proved that
deployment-parity failures are invisible until a user reports
them. The root cause was a CDN serving a stale JS file for
weeks while the repo had the correct version. A three-branch
model (feature → staging → main) ensures that code is tested
in integration before reaching production, and that `main`
always equals what production serves. The deploy checklist
exists because "git push" is not a deploy — CDN purge and
verification are part of the deploy, not afterthoughts. This
principle makes XVI (Sequential-First) and XIX (Bug Protocol)
enforceable at the infrastructure level.

## Workspace

The `workspace/` directory is the user's local interaction
layer. It is **gitignored** — nothing in workspace/ is
committed to the repository.

### Purpose

Workspace is where the user stages inputs, stores reference
materials, and bridges between task tracking and spec work.
It is the physical interface between the user and the
development pipeline.

### Structure

```
workspace/
  README.md                    # Workspace index
  tasks/                       # Bridge: tasklog.md ↔ active specs
    README.md                  # Task routing index
    TL-XXX-<slug>/            # Per-task working directory
  estandares/                  # Internal style guides, brand refs
  YYYY-MM-DD-<slug>/          # Dated session folders
    README.md                  # Session purpose and contents
    inputs/                    # Raw specs, repos, documents
    outputs/                   # Generated artifacts
    annexes/                   # Supporting material
```

### Rules

- **Dated folders**: use `YYYY-MM-DD-<slug>` format for
  session folders. The slug describes the session purpose
  (e.g., `2026-03-23-firebase-cms-inputs`)
- **Tasks bridge**: when a tasklog.md item requires working
  files, they live in `workspace/tasks/TL-XXX-<slug>/`.
  This connects the tracking system (tasklog.md) to the
  physical files
- **Inputs variety**: a session folder's `inputs/` may
  contain repos, specs, PDFs, screenshots, data files,
  or any material needed to start a workflow. The README
  describes what each input is and how it's used
- **Cleanup**: sessions older than 30 days are reviewed
  during session protocol. Archive valuable outputs,
  delete the rest
- **Estandares**: internal style guides, brand calibration,
  design kit references. These are reference materials for
  the team, not deployable site content
- **Every subfolder has a README**: no exceptions. Even a
  one-file folder explains its purpose

### Interaction Pattern

1. User creates `workspace/YYYY-MM-DD-<slug>/`
2. User drops inputs in `inputs/`
3. Agent reads inputs, runs workflow (IIKit, discovery, etc.)
4. Agent writes outputs to `outputs/` or to the repo specs
5. User reviews, iterates, or starts next session

## Session Protocol

Every new working session MUST follow this initialization
sequence before any work begins. This ensures continuity
across sessions and prevents context loss.

### 1. Context Loading (automatic)

Load the following files in order:
1. `CLAUDE.md` — project instructions and agent rules
2. `CONSTITUTION.md` — governance principles (this file)
3. `insights/README.md` — insights index (load domain
   files on-demand based on task context)
4. `changelog.md` — recent changes and decisions
5. `tasklog.md` — open tasks and pending work

### 2. State Recovery

After loading context:
1. Read `changelog.md` for the last 5 entries — understand
   what happened in recent sessions
2. Read `tasklog.md` for all open items — identify pending
   work, blockers, and stale tasks
3. Check `insights/` for any insights tagged as "needs
   validation" or "tentative"
4. Check git status and recent commits on current branch

### 3. Pending Closure

Before accepting new work, proactively propose closing
pending items:
1. List all open tasks from `tasklog.md` with their age
2. For each: recommend close, continue, or archive with
   reasoning
3. Identify stale items (>7 days without progress) and
   flag them
4. Confirm with user before closing or archiving anything

### 4. Next Steps Proposal

After pending items are resolved (or deferred by user):
1. Analyze the current feature state (IIKit dashboard,
   branch status, phase progress)
2. Suggest 2-3 concrete next steps ranked by impact
3. Include at least one improvement/idea beyond the
   current task (from insights gaps, constitution TODOs,
   or observed patterns)
4. Wait for user direction — never start work without
   explicit confirmation

**Rationale**: AI sessions start with zero context. Without
a protocol, the first 10 minutes are spent re-establishing
what was done and what's next. This protocol frontloads
context recovery so productive work begins immediately. The
pending closure step prevents task accumulation — open items
that never close become invisible technical debt. The next
steps proposal ensures the user always has options, not just
a blank prompt.

## Operational Logs

The project maintains two operational logs for cross-session
continuity. These are living documents, not archives.

### changelog.md

Records significant decisions, completions, and changes.
Each entry includes date, what changed, why, and
constitutional principles involved.

Format:
```markdown
## YYYY-MM-DD
- **[type]**: description — rationale [Principle X, Y]
```

Types: `decision`, `completion`, `amendment`, `insight`,
`blocker`, `discovery`

### tasklog.md

Tracks open work items that span sessions. Each item has a
status, owner, and age.

Format:
```markdown
| ID | Task | Status | Owner | Opened | Notes |
|----|------|--------|-------|--------|-------|
```

Statuses: `open`, `in-progress`, `blocked`, `deferred`

Rules:
- Items older than 14 days without progress MUST be
  reviewed and either closed, deferred, or re-prioritized
- Completed items are moved to a `## Completed` section
  (retained for 30 days, then archived)
- The session protocol (above) reviews this log at the
  start of every session

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
- Audit log field references must be qualified paths — not
  generic names. A log entry must enable recovery without
  supplementary context
- Data-layer behavior (audit logs, schema validation,
  security rules) MUST be tested against the Emulator, not
  through browser E2E tests — match runner to nature
- Every directory MUST have a README.md — no orphan folders
- The `.gitignore` MUST have comments explaining each
  exclusion pattern
- `workspace/` is gitignored — user interaction files never
  enter version control
- Directories without updates for 30+ days are flagged for
  review during session protocol
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
- **Sequential-first workflow** (XVI) governs execution
  order: sequential is the default, parallelism requires
  zero shared dependencies, WIP is capped at 3 concurrent
  agents, and tasks always advance forward — never circular
- **Socratic debate** is the required mechanism for
  resolving ambiguities that have divergent implementation
  consequences. Each option is examined against
  constitutional principles until eliminated by
  contradiction. The surviving option is integrated with
  full rationale. Debates are recorded in clarification
  artifacts for auditability
- **Continuous learning** (XVII) mandates that every debate
  and discovery produces reusable insights captured in
  `insights/`. Constitution amendments follow when insights
  reveal recurring ambiguity classes. The project compounds
  knowledge — it never re-debates a settled class of
  decision
- **Operational logs** (`changelog.md`, `tasklog.md`) are
  maintained across sessions. The session protocol ensures
  they are reviewed at every session start, preventing
  context loss and task accumulation
- **Session protocol** is mandatory: load context → recover
  state → close pending items → propose next steps. No
  work begins without context recovery. No session ends
  without logging significant decisions
- **Insights before debate**: before initiating a Socratic
  debate, consult `insights/` for existing patterns. If a
  prior insight resolves the question, cite it and apply
  it — do not re-debate
- **Indexability** (XVIII) is enforced on every commit that
  creates a new directory — no folder merges without a
  README. Auto-organization is a continuous duty, not a
  periodic cleanup
- **Workspace** is the user's interaction layer. It is
  gitignored and governed by its own README. The repo stays
  clean; the workspace stays flexible. Task bridge
  (`workspace/tasks/`) connects tasklog.md to working files

**Version**: 5.4.1 | **Ratified**: 2026-03-22 | **Last Amended**: 2026-03-23
