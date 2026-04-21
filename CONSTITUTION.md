<!-- Sync Impact Report
Version: 7.1.0 (Adaptive Blueprint Personalization)
Breaking changes: none
Additive changes:
  - XXIV (NEW): Adaptive Blueprint Personalization —
    three-axis orthogonal personalization (locale/theme/
    audience), single shell with intra-page navigation,
    declarative slot cascade, instant transitions,
    client-only state, content manageable without redeploy.
Non-breaking: all principles I-XXIII unchanged
Origin: Feature 009-home-landing-sales v8 introduced
  sidebar architecture + triple toggle + admin content
  editor as systemic patterns affecting all future features
  that touch public pages. Backcasting Direction 2 validated
  the pattern as constitutional (4/4 systemicity test).
  Socratic debate (Elena/Diego/Carlos) refined wording to
  abstract invariants, removing implementation details
  (sidebar width, toggle position, section count) which
  belong in plan.md.
Previous version: 7.0.0 (Cloud-First Content-as-Data)
Follow-up TODOs:
  - Refresh PREMISE.md to v7.1 alignment
  - Create insights/adaptive-blueprint-pattern.md (XVII)
  - Add blueprint compliance row to feature spec template
  - Feature 010 MUST expose slot editor enforcing cascade
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
  completeness check, bias check. If confidence is low,
  seek more information — do not proceed on assumption
- **Specify before implementing**: requirements (WHAT) must
  exist before plans (HOW), and plans before code.
  Constitution (WHY) > Spec (WHAT) > Plan (HOW) >
  Tasks (WORK) > Tests (PROOF) > Code (SOLUTION)
- **Evidence before assertion**: every claim is tagged:
  `[CODE]` `[CONFIG]` `[DOC]` `[INFERENCE]` `[ASSUMPTION]`
- If more than 30% of claims are tagged `[ASSUMPTION]`,
  the deliverable MUST display a warning and trigger
  clarification before proceeding

**Rationale**: The most expensive code solves the wrong
problem. Think First prevents waste. This discipline makes
TDD (IX), BDD (XV), and Sustainability (XII) possible.

> **Acceptance criteria**:
> - Every PR description contains evidence tags on claims
> - No code commit exists without a prior spec or task ref
> - Deliverables with >30% ASSUMPTION tags are flagged
>
> **Anti-pattern**: "Let me just quickly fix this" — code
> changes without reading existing code or checking context.
>
> **Edge case**: Hotfixes (XIX) may compress Think First
> into minutes, but never skip it entirely.

### XIV. Simple First, Robust Next

Start with the simplest solution that satisfies the
requirement. Add robustness only when the simple version
is proven insufficient through evidence.

- **Working beats perfect**: a simple, tested solution today
  beats an over-engineered one that takes 3x longer
- **Progressive refinement**: build the minimum viable
  implementation first. Add complexity only where observed
  failure demands it
- **No premature abstraction**: three similar lines are
  better than a premature utility function. Abstract only
  when the pattern has repeated enough to prove it
- **No speculative features**: build for the current
  requirement. Ensure the design is extensible (XII) so
  future needs can be added when real
- **Complexity requires justification**: any solution more
  complex than the simplest alternative MUST document why
  the simpler approach was insufficient
- **Task atomicity**: a single task MUST address a single
  concern. If it contains "and" or 3+ distinct concerns,
  split it. One task = one TDD red-green cycle

**Rationale**: Unnecessary complexity is the primary source
of maintenance burden and bugs. Simple First is strategic —
robustness is added through iterative refinement guided by
evidence, not anticipation.

> **Acceptance criteria**:
> - No utility function exists without 3+ call sites
> - Every complex solution has a "why not simpler" comment
> - Tasks map 1:1 to test suites
>
> **Anti-pattern**: Building a "flexible" abstraction layer
> for a feature that has exactly one use case today.
>
> **Edge case**: Security (VII) overrides — sanitization
> and auth are never "premature." Add them from day one.

## Core Principles

### I. BaaS-First, Zero Server

The site is a client-rendered application with **Firebase
as the single backend**. There is no custom server —
ever. The browser renders; Firestore stores content;
Firebase Auth authenticates; Firebase Storage holds
assets; Firebase Analytics captures events; App Check
prevents abuse.

- Pages render entirely in the browser — no server-side
  rendering framework, no Node runtime in production
- The ONLY runtime dependencies are Firebase client SDKs
  and the static shell served by Hostinger
- Writes to PII collections use Firebase anonymous auth
  with App Check attestation (see XXII PII-Append-Only)
- Cloud Functions are permitted ONLY when a client-side
  approach is infeasible (e.g., OG image generation,
  third-party webhook handlers) — never as "poor man's
  server" for business logic that can live in the client
- Every feature spec MUST declare which Firebase services
  it depends on and what happens when each is down
- Introducing a non-Firebase backend service requires a
  constitutional amendment (major version bump)
- The build step (CSS compilation) is a dev convenience,
  not a runtime dependency

**Rationale**: Formalizing Firebase as the single backend
eliminates vendor-drift debates, reduces ops to zero, and
gives security rules a single enforcement surface. The
"managed BaaS" abstraction of v6 was honest but invited
abstraction leakage; v7 is concrete. Client rendering
preserves static-site speed while enabling real-time
content updates.

> **Acceptance criteria**:
> - Every page renders meaningful content with Firestore
>   stubbed offline (fallback to static or cache)
> - No `<noscript>` fallback shows a blank or error state
> - Zero custom server processes in production
> - Each feature spec has a "Firebase services used" list
>
> **Anti-pattern**: Adding an SSR framework or Node server
> "for SEO" when static HTML + client fetch suffices.
> Adding a second backend provider "just for this one
> thing."
>
> **Edge case**: If a future page requires server-side
> rendering (e.g., dynamic OG images), it is handled by a
> Cloud Function — not a persistent server, not a new
> provider.

### II. Accessibility-First

Every page must be usable by people with disabilities and
meet accessibility standards.

- All interactive elements must be keyboard-navigable
- Modals: proper ARIA (role, aria-modal, aria-labelledby)
- Skip-to-content links on every page
- Color contrast must meet WCAG AA minimum
- Images must have meaningful alt text
- Admin interfaces must also meet accessibility standards

**Rationale**: Accessibility is a legal and ethical
requirement. An EdTech site must model inclusive design.

> **Acceptance criteria**:
> - Lighthouse accessibility score >= 90 on every page
> - Tab order test passes for all interactive elements
> - No ARIA role missing on modal or dialog elements
>
> **Anti-pattern**: "We'll add accessibility later" — it
> is never cheaper to retrofit than to build in.
>
> **Edge case**: Decorative images use empty alt="" — not
> every image needs descriptive text.

### III. SEO Integrity

Every public page must be discoverable and correctly
described for search engines and social platforms.

- Required meta tags: description, robots, canonical,
  Open Graph, Twitter Card
- Internal/admin pages: noindex
- Sitemap must reflect actual site structure
- No duplicate or orphaned canonical URLs
- Dynamic content must be in the DOM before crawl timeout

**Rationale**: Organic search is the primary acquisition
channel. Backend-sourced content must be as crawlable as
static HTML.

> **Acceptance criteria**:
> - Meta tag audit passes with zero missing required tags
> - Sitemap entries match deployed page count exactly
> - Google Search Console shows zero crawl errors
>
> **Anti-pattern**: Adding a page without updating the
> sitemap or canonical URL.
>
> **Edge case**: Pages behind auth (admin) are exempt from
> SEO requirements — they use noindex.

### IV. Component Consistency

Shared UI patterns are implemented once and reused, not
duplicated across pages.

- Site-wide elements (header, footer) use web components
- Modal behavior uses a unified system
- No inline styles for patterns in the stylesheet
- CSS follows established token and layering system
- Backend data access goes through centralized service
  modules — no scattered inline queries
- i18n uses a single attribute contract (`data-i18n`)

**Rationale**: Duplication creates drift. A single source
of truth for UI and data access patterns prevents
inconsistency and reduces maintenance burden.

> **Acceptance criteria**:
> - Zero inline `style=` attributes that duplicate a CSS
>   class
> - All backend reads go through a service module
> - Grep for raw hex colors outside variables.css = 0
>
> **Anti-pattern**: Copy-pasting a modal implementation
> into a new page instead of calling ModalSystem.
>
> **Edge case**: One-off landing pages may use scoped
> styles, but they must still reference design tokens.

### V. Brand Separation

MetodologIA is a distinct brand. Site content must never
mix or reference other brands.

- No references to parent companies or internal tooling
  in public content
- Visual identity consistently MetodologIA
- Program names match the defined catalog exactly
- Admin interfaces may carry subtle "powered by" marks

**Rationale**: Brand confusion undermines trust. The site
represents MetodologIA exclusively.

> **Acceptance criteria**:
> - Grep for "Sofka" in public HTML = 0 results
> - All program names match the canonical catalog
> - No third-party logos on public pages
>
> **Anti-pattern**: Mentioning the BaaS provider name in
> user-facing error messages or UI labels.
>
> **Edge case**: Technical docs (specs, plans) may
> reference tool names — the rule applies to public pages.

### VI. Cloud-First with Declarative Static Fallback

Content authority lives in Firestore by default. Static
files are a **declarative, versioned fallback** consumed
automatically by `migration-bridge.js` when Firestore is
unreachable, stale-beyond-TTL, or gated by a feature flag.

- The dual-source bridge is **PERMANENT**, not
  transitional — it is the resilience mechanism, not a
  migration step
- Each editable key has exactly one canonical location
  (Firestore) and at most one fallback (static JSON or
  HTML snippet)
- When a feature flag toggles a collection from static to
  Firestore, the static copy MUST remain valid as the
  fallback contract — it is not deleted, it is frozen
- Schema validation rejects writes that would invalidate
  the fallback contract (e.g., adding a new required
  field without a default)
- Bilingual content (ES/EN) stores both variants together
- Admin changes take effect immediately — no deploy step
- **Reversibility**: every destructive write (update,
  delete) MUST preserve the previous value so that
  content can be restored. The audit trail is both a
  record and a recovery mechanism
- Content versions are immutable snapshots — restoring a
  version creates a new write, never overwrites history

**Rationale**: v6 framed dual-source as transitional
("during migration"). Reality proved that dual-source is
the steady-state resilience mechanism: Firestore is
primary, static is the fallback guarantee. v7 formalizes
this. Reversibility still applies — content authority
must also be a recoverable source of truth.

> **Acceptance criteria**:
> - Every editable key has a declared canonical location
>   (Firestore) and optional fallback source (static)
> - Schema validation rejects writes that break the
>   fallback contract
> - Both ES/EN variants present for every content key
> - Fallback coverage test: every page renders meaningful
>   content with Firestore stubbed offline
>
> **Anti-pattern**: Editing a price in both the HTML file
> and Firestore "just to be safe" — the static copy is
> the frozen fallback, not an editable source.
>
> **Edge case**: A feature may ship with a collection
> still empty in Firestore if `scripts/seed.js` hasn't
> run yet — the declarative fallback covers day-1 launch.

### VII. Secure by Default

Access control is enforced at the data layer. User input
is sanitized at the boundary. Security claims are verified
both statically and at runtime.

- Backend security rules enforce least-privilege access
- Authentication via managed identity provider only
- No secrets, API keys, or admin credentials in client code
- Admin operations require role-based authorization
- Security rules are version-controlled and tested
- **Input sanitization**: user text MUST be HTML-stripped
  before storage. `<script>` and `<style>` removed with
  content. Native browser APIs (DOMParser) preferred
- **Dual-layer verification**: security invariants checked
  by (1) static analysis and (2) runtime inspection
- **Audit trail**: entries use fully qualified paths
  (e.g., `programs/diagnostico.description_es`)
- **Access governance**:
  - **Least privilege**: every role receives the minimum
    permissions needed for its function. New users default
    to the lowest-privilege role
  - **Separation of duties**: the ability to manage users
    MUST be restricted to a distinct privilege level from
    content editing
  - **Irrevocable bootstrap**: the system MUST maintain at
    least one account with full administrative privileges
    that cannot be demoted or removed via the UI
  - **Role change auditability**: every role assignment or
    change MUST be logged with who changed it, when, and
    the previous role
  - **Domain-scoped auto-provisioning**: when users are
    auto-provisioned via domain rules, they MUST receive
    the lowest-privilege role by default

**Rationale**: A CMS is a write-capable system. Data-layer
security is the last line of defense. Input sanitization
prevents copy-paste contamination. Dual-layer verification
follows defense-in-depth. Access governance ensures that
role management itself is a controlled, audited process —
not an afterthought bolted onto content permissions.

> **Acceptance criteria**:
> - Secrets scan clean on every commit (G0 gate)
> - Security rules pass emulator tests (positive + negative)
> - Audit log entries resolve to exact field without context
>
> **Anti-pattern**: Relying on client-side JS to hide admin
> buttons instead of enforcing access in security rules.
> Allowing any user to self-assign a higher role without
> a distinct administrative privilege.
>
> **Edge case**: Rich-text fields (if ever justified per
> XIV) use allowlist sanitization, not strip — but must be
> explicitly declared in the schema. Bootstrap accounts
> are the only exception to "no hardcoded config" — they
> are a security invariant, not a convenience shortcut.

### VIII. SWR + Explicit Offline UX

The site uses Stale-While-Revalidate (SWR) caching and
provides an **EXPLICIT offline UX signal** — never silent
degradation. Users always know whether they see fresh,
cached, or fallback content.

- All Firestore reads go through `js/cms/cache-manager.js`
  with IndexedDB SWR: fresh window ≤60s, stale window
  ≤7d, then revalidate-or-fallback
- The UI MUST surface cache state with visible signals:
  - An "offline" pill shows when serving from stale cache
    without a successful revalidation
  - A "syncing" micro-indicator shows during revalidation
  - A "fallback" pill shows when static fallback served
    (Firestore unreachable or flag gated)
- Admin interfaces show a **blocking** connectivity banner
  when Firestore is unreachable — they do not operate in
  stale-read mode
- Every feature spec MUST include at least one Playwright
  test that asserts the offline pill appears when
  Firestore is stubbed to fail
- Cache TTLs are documented per-collection in
  `js/cms/cache-manager.js` and enforced by tests

**Rationale**: v6 required "no error state when backend
is unreachable" but did not mandate visible feedback.
Users who see stale data without knowing it make decisions
on stale data. v7 makes cache state an explicit UX
contract: the user is always told the truth.

> **Acceptance criteria**:
> - Site renders program catalog with network offline AND
>   shows the offline pill
> - Cache TTL is documented per-collection and enforced
> - Every feature has a Playwright test for the offline pill
> - Admin shows a blocking banner when Firestore is down
>
> **Anti-pattern**: Showing a spinner indefinitely when
> Firestore times out. Silently serving stale data without
> a visible signal.
>
> **Edge case**: Admin interfaces (CMS backoffice in
> feature 010) are exempt from stale-read resilience —
> they MUST show a clear connectivity warning and refuse
> to write until Firestore is reachable.

### IX. Test-Driven Development

All production code MUST be preceded by tests. Tests define
behavior; code satisfies them. TDD operates within Think
First (XIII) and BDD (XV) governance.

- Red-green-refactor is the required workflow
- ATDD: feature behavior specified as Given/When/Then
  before implementation
- E2E tests cover critical journeys: content loading,
  offline resilience, admin workflows, i18n, cotizadores
- Security rules tested against emulator before deploy
- Test assertions MUST NOT be modified to pass — fix code
- Feature files are hash-locked — changes require testify
- Tests MUST run in automation (CI or pre-commit)

**Rationale**: TDD prevents unnecessary code. Tests define
the exact boundary of what the system must do. ATDD makes
acceptance criteria executable. Hash-locked feature files
prevent weakening tests to match broken code.

> **Acceptance criteria**:
> - No production code committed without a test that
>   preceded it
> - CI gate blocks merge on test failure
> - Feature file hashes match context.json
>
> **Anti-pattern**: Writing tests after the code "to get
> coverage" — this is verification, not TDD.
>
> **Edge case**: Exploratory spikes may skip TDD, but
> spike code is thrown away — never promoted to production.

### X. Design System Governance

The site follows a documented design system with canonical
tokens. Visual decisions are made once and enforced
everywhere.

- **Aesthetic**: Neo-Swiss Light — flat vector, Swiss grid,
  generous whitespace, soft geometric forms, consistent
  iconography. Light is the DEFAULT theme; Dark is a
  user-toggleable mirror
- **Palette v7 (Light default, exclusive)**:
  `--bg #F9FAFB`, `--bg-soft #F0F0EC`,
  `--bg-card rgba(255,255,255,.88)`,
  `--navy #122562`, `--gold #FFD700`,
  `--gold-dark #B8860B`, `--blue #137DC5`,
  `--text #1F2833`, `--text-sec #4A5568`,
  `--text-muted #808080`, `--border rgba(18,37,98,.08)`
- **Palette v7 (Dark mirror)**:
  `--bg #0B2545`, `--bg-soft #071A33`,
  `--text #F0F4F8`, gold/blue desaturated
- **Typography v7**: Poppins (headings), Montserrat (body),
  Trebuchet MS (notes, labels, micro-copy) — supersedes
  v6 Poppins/Trebuchet/Futura trio
- **Radius tokens**: `--radius-sm 6px`, `--radius-md 12px`,
  `--radius-lg 20px`, `--radius-xl 32px`
- **Theme persistence**: active theme stored in
  `localStorage` as `mdg_theme`, with
  `prefers-color-scheme` fallback
- **Visual rules**: high legibility, no text on noisy
  backgrounds, soft shadows, faceless figures in
  illustrations
- All tokens defined in one source (CSS custom properties)
  and referenced — never hardcoded as raw values
- Dark and Light themes both comply with palette and
  contrast (WCAG 2.1 AA minimum)

**Rationale**: Without a governed design system, pages
drift into visual inconsistency. Canonical tokens ensure
every page looks like the same brand.

> **Acceptance criteria**:
> - Grep for raw hex outside variables.css = 0
> - Both themes pass WCAG AA contrast check
> - New components use only existing tokens
>
> **Anti-pattern**: Adding `color: #137DC5` inline instead
> of using `var(--brand-blue)`.
>
> **Edge case**: Third-party embeds (e.g., YouTube) cannot
> conform to the palette — wrap them in branded containers.

### XI. Brand Voice Integrity

All public content follows MetodologIA Brand Voice v3.0 —
method-driven, evidence-based communication.

- **Structure**: Minto pyramid — conclusion first,
  supporting reasons (MECE), evidence, call to action
- **Evidence honesty**: strong claims need data, indicator,
  signal, or explicit "data required" marker
- **Language**: Spanish (LatAm neutral, "tu" form)
- **Prohibited** (zero tolerance): "hack", "truco",
  "secreto", "resultados instantaneos", "arquitecto",
  "arquitectura", "transformacion"
- **Preferred**: "metodo", "disenar/diseno", "sistemas",
  "gobernanza", "(R)Evolucion", "Success as a Service"
- **Voice pillars**: (R)Evolucion (method closes gap),
  Intention over intensity, Technology as ally
- **Quality gate**: Minto, MECE, honest evidence, zero
  red-list terms, executable CTA, both languages present

**Rationale**: Brand voice is a quality system, not style
preference. Minto structure drives decisions. Evidence
honesty prevents credibility erosion.

> **Acceptance criteria**:
> - Red-list grep on public HTML = 0 matches
> - Every CTA is actionable (links to a page or action)
> - Both ES/EN variants present for published content
>
> **Anti-pattern**: Using "transformacion digital" in a
> headline because it sounds impressive.
>
> **Edge case**: Internal docs (specs, plans) may use
> technical terms freely — the red-list applies to public
> content only.

### XII. Code Sustainability

All code is written for the person who maintains it next.
The codebase must be understandable and modifiable without
specialist knowledge of the original implementation.

- **Business-readable**: names reflect business concepts,
  not implementation mechanics
- **Naming conventions**: documented, consistent. No
  ad-hoc abbreviations or inconsistent casing
- **Slugging**: URL paths and file names use kebab-case
  derived from business names
- **Scaffolding**: new features follow existing directory
  patterns — self-documenting structure
- **README-driven**: every module/directory has a README
  explaining purpose and boundaries
- **Clean code**: no dead code, no magic numbers, no
  functions longer than one screen. Single responsibility
- **Extensible**: new content types addable by following
  patterns, not modifying core infrastructure
- **Interoperable**: modules communicate through documented
  contracts, not shared mutable state
- **Scalable simplicity**: prefer simplest solution;
  complexity added only when proven insufficient

**Rationale**: A small team where anyone may touch any
part. Code requiring specialist knowledge is a single
point of failure. Business-readable naming and consistent
conventions reduce onboarding time and maintenance risk.

> **Acceptance criteria**:
> - No function name requires reading its body to
>   understand its purpose
> - Every directory has a README.md
> - No dead code or commented-out blocks in production
>
> **Anti-pattern**: Naming a function `processData()`
> instead of `loadProgramCatalog()`.
>
> **Edge case**: Generated/vendor code is exempt from
> naming conventions — but must be isolated in clearly
> marked directories.

### XV. BDD Full-Spectrum Quality

BDD is the overarching quality pattern. Scenarios address
every quality dimension: strategic, tactical, operational,
technical, UX, UI, backend, middleware, data, DevSecOps,
CI, and CD.

- **Full-spectrum**: acceptance scenarios for every quality
  dimension relevant to the feature
- **Coverage angles**: strategic (business alignment),
  tactical (migration sequence), operational (admin UX),
  technical (perf/security), UX (intuitive behavior),
  UI (design system compliance), backend (rules/model),
  middleware (caching/service), data (schema/i18n/audit),
  DevSecOps (secrets/rules), CI/CD (gates/automation)
- **BDD as specification**: Given/When/Then written BEFORE
  code (ATDD) and hash-locked to prevent drift
- **Traceability**: every scenario traces to FR-XXX,
  SC-XXX, and a constitutional principle
- **Runner-agnostic**: match runner to test nature — E2E
  for browser, unit for code invariants, emulator for
  security rules. A grep-based step definition is valid BDD
- **Socratic debate for ambiguity**: ambiguous scenarios
  resolved through structured debate against principles
  before implementation. Recorded in clarifications.md

**Rationale**: Traditional BDD focuses on user behavior.
A CMS migration has quality dimensions spanning security,
data integrity, performance, and brand compliance. Full-
spectrum BDD ensures nothing falls through the cracks.

> **Acceptance criteria**:
> - Every feature has scenarios for 3+ quality angles
> - Step definitions use the correct runner per nature
> - Ambiguity resolutions are recorded with rationale
>
> **Anti-pattern**: Writing only happy-path functional
> scenarios and calling BDD "done."
>
> **Edge case**: Trivial bug fixes may not need full-
> spectrum BDD — a single regression scenario suffices.

### XVI. Sequential-First, Parallel-Ready Workflow

Development follows sequential-by-default discipline.
Parallelism is a controlled exception. Tasks advance
linearly; concurrent execution only for tasks with zero
shared dependencies.

- **Sequential is default**: critical path is the backbone.
  Tasks execute in dependency order. This reduces debugging
  surface and prevents compounding errors
- **WIP limit: 3 concurrent agents max**: each on a task
  with zero pre-, co-, or shared-state dependencies
- **Forward-only**: completed tasks never revisited unless
  downstream failure requires it (tracked as new task)
- **Parallel eligibility**: ALL must be true —
  (1) different files, (2) no data dependency,
  (3) no logical dependency, (4) failure doesn't
  invalidate other active work
- **Branch-per-task isolation**: each task on its own
  branch
- **Worktree-based parallelism**: parallel tasks in
  separate worktrees when eligible
- **Atomic, mergeable units**: each branch independently
  mergeable
- **Contract-first integration**: parallel tasks agree on
  contracts before implementation
- **No long-lived branches**: short-lived, merged
  frequently
- **Merge discipline**: automated tests + quality gates
  before merge. No force-pushing shared branches

**Rationale**: Parallelism multiplies debugging surface
and creates hidden state interactions. Sequential follows
the critical path; each task builds on verified
foundations. WIP limit of 3 is the practical ceiling.

> **Acceptance criteria**:
> - No more than 3 branches in active development
> - Every parallel task passes the 4-point eligibility
> - No force pushes to staging or main
>
> **Anti-pattern**: Starting 5 tasks in parallel "to go
> faster" then spending 2 days resolving merge conflicts.
>
> **Edge case**: Independent documentation tasks (READMEs,
> specs) may run in parallel freely — they rarely conflict.

### XVII. Continuous Learning Loop

Every decision and discovery feeds back as reusable
insight. The project compounds knowledge — it never
re-debates settled questions.

- **Socratic debate as decision engine**: 2+ options with
  divergent consequences → structured debate against
  principles → eliminate by contradiction → record answer
- **Three outputs per debate**: (1) direct answer,
  (2) question refinements, (3) coverage gaps
- **Insights capture**: reusable patterns recorded in
  `insights/<domain>.md` with origin, pattern, rationale,
  trigger conditions, and constitutional anchor
- **Constitution evolution**: recurring ambiguity →
  constitution amendment to prevent recurrence
- **Insights before debate**: check `insights/` first.
  If a prior insight resolves the question, cite it
- **No knowledge loss**: insights never deleted — updated
  or superseded with reference to replacement

**Rationale**: A project that doesn't learn from its
decisions re-debates them. The feedback loop (debates →
insights → amendments → fewer debates) means the project
gets faster and more precise over time.

> **Acceptance criteria**:
> - Every Socratic debate produces an insights/ entry
> - No duplicate debates on the same class of decision
> - Constitution version increments on ambiguity fixes
>
> **Anti-pattern**: Having the same "should we strip or
> escape HTML?" debate in three different features.
>
> **Edge case**: Trivial decisions (naming, formatting)
> don't need Socratic debate — use team conventions.

### XVIII. Indexable & Self-Organizing Repository

Every directory is navigable by reading only index files.
No folder exists without explaining its purpose.

- **README per directory**: explains purpose, contents,
  and relationship to the project
- **Index-driven navigation**: root README links to
  top-level dirs; each dir links to children
- **Auto-organization**: new directory → immediate README.
  Accumulated files → organized into named subdirectories
- **.gitignore governance**: every exclusion pattern has
  a comment explaining why
- **Workspace separation**: user files in gitignored
  `workspace/`. Repo = source + specs + governance only
- **Staleness prevention**: dirs without updates for 30+
  days flagged for review

**Rationale**: A large project with specs, insights, admin
interfaces, and workspace interactions becomes unnavigable
without active organization. README-per-directory is the
cheapest documentation — maintained alongside the code.

> **Acceptance criteria**:
> - `find . -type d -not -path '*/node_modules/*' |
>   while read d; do test -f "$d/README.md"; done` = 0 fails
> - .gitignore has no uncommented patterns
> - No directory older than 30 days without review flag
>
> **Anti-pattern**: Creating `src/utils/` with 12 files
> and no README explaining what "utils" means here.
>
> **Edge case**: Generated directories (node_modules,
> dist, .cache) are exempt from the README requirement.

### XIX. User-Reported Bug Protocol

User-reported bugs follow a mandatory triage-diagnose-fix-
verify pipeline. They are high-signal events representing
failures that automated tests missed.

- **Immediate triage**: P0 by default. Stop feature work.
  User's perspective is truth for severity
- **Reproduce first**: browser automation on the live URL
  before any fix. If not reproducible, investigate
  deployment gap
- **Root cause before fix**: 5 Whys pattern. Document the
  causal chain. No surface patches
- **Deployment-parity check**: if live site differs from
  repo, first fix is synchronization
- **Regression test mandatory**: at least one test that
  fails before fix and passes after. Permanent guard
- **No workarounds**: don't tell users to clear cache.
  Fix the code
- **Audit trail**: user description → reproduced symptoms
  → root cause → fix → regression test → deploy verified

**Rationale**: User-reported bugs are the most expensive
kind — they erode trust. This protocol ensures thorough
response: reproduce, understand, fix at root, prevent
recurrence, verify in production.

> **Acceptance criteria**:
> - Every bug report produces a regression test
> - Fix is verified on live URL, not just locally
> - Root cause chain documented before PR is opened
>
> **Anti-pattern**: Fixing the symptom in code and closing
> the issue without verifying the fix reached production.
>
> **Edge case**: Cosmetic bugs (typos, spacing) may skip
> browser automation — but still need a deploy verify step.

### XX. Branch-to-Environment Parity

Every environment has exactly one source branch. Code
flows forward — never backward, never skipping a stage.

```
feature/* ──→ staging ──→ main ──→ production hosting
   (dev)      (pre-prod)  (prod)    (CDN + origin)
```

- **Feature branches** (`NNN-slug` or `feature/*`): all
  dev happens here. One feature per branch from `staging`
- **`staging`**: integration branch. PRs + E2E before
  promoting. Owner reviews here
- **`main`**: only branch that deploys. Merges from
  `staging` via PR only. Every commit = deployed code
- **Production**: pulls from `main` only. Deploy = pull +
  server cache purge + CDN purge. Checklist in runbook

#### Flow rules

1. **Feature → staging**: PR, CI runs tests, merge when
   green
2. **staging → main**: owner PR, E2E must pass, never
   auto-merged
3. **main → production**: deploy runbook (pull, purge
   caches, verify live with automation)
4. **Hotfix**: `hotfix/slug` from `main`, PR to `main`
   directly, backport to `staging`

#### Prohibitions

- No direct commits to `main` or `staging`
- No force push to `main` (ever) or `staging` (except
  rebase cleanup)
- No deploying from non-`main` branches
- No skipping staging → main gate
- No merging `main` back into `staging`

#### Deploy checklist

1. Push `main` to remote
2. Pull `main` on production server
3. Purge server-side cache
4. Purge CDN cache
5. Verify live site with browser automation
6. If CDN stale: activate dev mode temporarily

Host-specific commands in deploy runbook (see
`memory/reference_hostinger_deploy.md`).

**Rationale**: The BUG-001 incident proved deployment-
parity failures are invisible until a user reports them.
Three-branch model ensures code is tested in integration
before production. Deploy checklist exists because
"git push" is not a deploy.

> **Acceptance criteria**:
> - `main` HEAD matches production deployment at all times
> - No commit reaches `main` without passing staging E2E
> - Deploy checklist logged for every production push
>
> **Anti-pattern**: Pushing directly to main "because it's
> a small change" and skipping staging verification.
>
> **Edge case**: Hotfixes bypass staging by design — but
> must backport to staging immediately after deploy.

### XXI. Zero Hardcoding

No value that could change — content, configuration,
thresholds, accounts, feature flags, credentials — is
hardcoded in source code. Every value is managed through
an appropriate configuration mechanism.

- **Content values** (text, prices, program names): managed
  via CMS (Firestore) and editable by authorized roles
- **System configuration** (TTLs, thresholds, feature
  flags): stored in config documents or environment
  variables, never as literals in code
- **Security configuration** (bootstrap accounts, allowed
  domains, role definitions): managed via environment
  variables (`functions.config()`, `.env` files) or
  secured config stores. Deploy-time config is acceptable;
  source code literals are not
- **API keys, endpoints, project IDs**: environment
  variables or config files, never inline strings
- **Magic numbers**: extracted to named constants in config.
  If the value could ever need changing without a code
  deploy, it belongs in a config store
- **The test**: if changing a value requires modifying
  source code and redeploying, the value is hardcoded.
  The correct design makes it changeable via config,
  CMS, or environment without touching code

**Rationale**: This is a CMS — editability and
manageability are core identity traits, not conveniences.
Hardcoded values create hidden dependencies that defeat
the purpose of a content management system. Even security
invariants can be managed securely through environment
variables and deploy-time configuration — hardcoding is
not the only path to immutability. Environment variables
require deploy access to change, providing the same trust
boundary as source code without the rigidity.

> **Acceptance criteria**:
> - `grep -r` for literal strings that match content in
>   CMS = 0 results
> - No function contains a literal email, domain name,
>   or role assignment
> - Every configurable value has a documented config
>   source (env var, Firestore doc, or config file)
>
> **Anti-pattern**: `const BOOTSTRAP = ['admin@x.com']`
> in a Cloud Function instead of reading from
> `functions.config().bootstrap.accounts` or `.env`.
>
> **Edge case**: Development defaults (fallback values
> when config is missing) are acceptable as constants
> IF they are clearly marked as defaults and overridable.
> Test fixtures and mock data are exempt — they are not
> production configuration.

### XXII. PII-Append-Only

Writes to collections containing personally identifiable
information (PII) are **append-only**. Deduplication,
merging, and reconciliation happen in a separate admin
surface, never from client-side consumer features.

- PII collections (`leads/`, `diagnostics/`, and any
  future collection holding email, name, phone, or other
  personal data) MUST be declared in the feature spec
- Client-side writes create NEW documents under the
  current anonymous auth uid — never update-by-email or
  merge-by-phone or any form of cross-uid reconciliation
- Security rules enforce: `create` allowed for the
  owning uid; `update` restricted to the uid that
  created the doc; `delete` denied from the client
- Reconciliation (dedup by email, merge across uids) is
  the responsibility of the admin backoffice and runs
  via trusted admin session or Cloud Function
- The feature spec MUST list how stale/duplicate PII
  docs will be handled downstream (usually: deferred to
  admin feature)

**Rationale**: Anonymous uids are device-scoped — they
do not persist across devices, cleared storage, or
incognito sessions. Merging across uids from the client
requires reading other uids' docs, which breaks the
"own data only" security model. Append-only is safe,
auditable, and compatible with "no registration required"
UX promises. Duplicate leads are a manageable downstream
problem; PII leakage is not.

> **Acceptance criteria**:
> - Every PII collection listed in the feature spec with
>   its reconciliation story
> - Security rules reject client-side updates across uids
> - Admin has a documented reconciliation procedure
> - Analytics/dashboard queries tolerate duplicate emails
>
> **Anti-pattern**: Querying `leads/` by email from the
> client to "reuse" an existing doc. Writing a Cloud
> Function that the client can invoke to merge docs.
>
> **Edge case**: If a user explicitly requests data
> deletion (GDPR/LGPD right-to-be-forgotten), the admin
> deletes all docs matching the email hash via trusted
> session. This is the only merge operation permitted.

### XXIII. Feature-Bounded Architecture

Each feature declares an explicit boundary on which
Firestore collections it READS and WRITES. Features that
need backoffice UI belong in their own dedicated feature,
not bolted onto consumer-facing features.

- Every `spec.md` MUST include a "Collections touched"
  table listing each collection with `read` / `write` /
  `admin` rights
- A feature that introduces a new collection MUST also
  introduce its security rules in the same PR
- Consumer features (home, landing, catalog, diagnóstico)
  READ published data; they MAY write only to their own
  PII collections (see XXII); they do NOT write to
  shared content collections
- Backoffice features (admin CRUD, schema editor, bulk
  operations) live in dedicated features and are the
  only features that hold write rights to content
  collections (`products`, `services`, `pricing`,
  `pages`, `blocks`, `translations`, `flags`,
  `experiments`, etc.)
- Feature splits that move writes to a dedicated
  backoffice MUST document a **seed path** for the
  consumer feature to launch standalone (typically a
  `scripts/seed.js` or declarative fallback)
- A feature's Firestore read scope MUST match its
  security rules — no "this feature reads collection X"
  without public-read rules on X

**Rationale**: Feature 009 proved that mixing consumer
UX with CMS backoffice inflates scope beyond sprint size,
blurs security boundaries, and blocks independent
shipping. Dedicated backoffice features keep consumer
features small, testable, and shippable. The split also
clarifies ownership: consumer teams and content teams
work on different features with different review cycles.

> **Acceptance criteria**:
> - Every spec has a "Collections touched" table
> - PR diff shows rules changes for any new collection
> - Consumer feature CI passes with empty content
>   collections (fallback path proven)
> - Backoffice features are separately scoped in `specs/`
>
> **Anti-pattern**: Adding "admin can also edit this
> here" to a consumer feature spec. Shipping consumer
> features that depend on backoffice features being
> implemented first.
>
> **Edge case**: A consumer feature may include a
> one-off admin seed script (`scripts/seed-X.js`) to
> populate a new collection before the backoffice lands.
> Seed scripts are not a backoffice.

### XXIV. Adaptive Blueprint Personalization

Every public page MUST render from a **single homologated
shell** whose content adapts declaratively to the active
combination of three orthogonal axes:

- **Locale** (`es`/`en`): affects text via `data-i18n` and
  external dictionaries. NEVER affects layout or styling.
- **Theme** (`light`/`dark`): affects **exclusively** CSS
  custom properties. NEVER affects content, copy, or slot
  resolution.
- **Audience** (`persona`/`empresa`/`unknown`): affects
  copy, proof, CTAs, and listing filters via typed content
  slots. NEVER affects CSS tokens.

**Invariants**:

1. **Orthogonality** — theme is CSS-only; locale + audience
   are content-only. No combinatorial CSS per audience, no
   combinatorial content per theme.
2. **Homologated shell** — all public pages share the same
   HTML skeleton with standard landmarks (header, intra-page
   navigation, main, footer). Variation allowed: which
   content slots are present. Variation prohibited:
   alternative layouts, custom headers/footers.
3. **Intra-page navigation** — every page (except error
   pages) MUST provide structured section navigation
   enabling visitors to explore page content non-linearly.
4. **Fallback cascade** — content slots resolve through a
   multi-level cascade (exact match → audience-neutral →
   locale-fallback → default). No raw key MUST ever appear
   in the production DOM.
5. **Instant transitions** — toggling any axis MUST complete
   the DOM update in <100ms without page reload.
6. **Client-only state** — locale, theme, and audience
   preferences live in client storage. None is PII.
7. **Always-accessible toggles** — axis switches MUST be
   accessible at all times without requiring navigation to
   a settings page or opening a menu.
8. **Verifiable coverage** — every new page MUST be added
   to the parametric E2E test matrix (N pages × locales ×
   audiences), validated for zero raw keys and instant
   transitions. No skips.
9. **Content manageable without redeploy** — text content
   MUST be editable through a Firestore-backed admin
   interface with static JSON fallback, so copy changes
   do not require git push + deploy.

**Rationale**: Without this principle, future features
could (a) create pages with divergent layouts breaking UX
consistency, (b) hardcode copy without audience variants
which segments communication poorly, (c) mix theme with
content which explodes variant combinatorics, (d) forget
to include new pages in the parametric test which allows
silent drift, (e) require redeploy for every copy change
which bottlenecks content operations.

> **Acceptance criteria**:
> - Every feature with public content verifies blueprint
>   compliance in its Constitution Check table
> - E2E parametric matrix runs in CI and blocks merge
> - Content slots exist in locale × audience variants
> - Admin editor enables copy changes without redeploy
>
> **Anti-patterns**:
> - Creating a page with its own `<header>` instead of the
>   shared header component
> - Writing `if (theme === 'dark') show(darkLogo)` in JS —
>   theme switching belongs in CSS
> - Creating `/empresas/programas/` as a separate page for
>   "the business version of programs" when audience state
>   + content slots solve this declaratively
> - Requiring a deploy to fix a typo in hero copy

## Principle Precedence

When principles conflict, resolution order:

1. **Security (VII) > all others** — no principle
   justifies a security compromise
2. **Accessibility (II) > convenience** — UX shortcuts
   that break a11y are rejected
3. **Brand (V, XI) > aesthetics** — a visually pleasing
   deviation from brand is still a deviation
4. **Simple First (XIV) > completeness** — ship less,
   ship correct
5. **Think First (XIII) > speed** — understanding before
   velocity

When two principles at the same precedence level conflict,
the project owner decides and the decision is recorded as
an insight (XVII).

## Assumptions & Limits

- **Site scale**: 63+ pages, 1-10 CMS users across 4 role
  levels, <10K daily visitors
- **Role management**: via CMS UI for super admins, not
  CLI scripts. Bootstrap accounts via environment config
- **Team**: 1 human + AI agents — no peer review
  available, gates compensate
- **Hosting**: shared hosting with CDN — no custom
  server-side logic. Serverless functions for privileged
  operations (role assignment, claims management)
- **Budget**: zero external services beyond BaaS and
  hosting
- **Language**: Spanish-first (LatAm), English second.
  No other locales planned
- **Browser support**: modern evergreen browsers. No IE11,
  no legacy mobile browsers

These assumptions scope the principles. If the site grows
to 500+ pages, 20+ CMS users, or 100K+ visitors,
principles I, VII, VIII, and XVI may need re-evaluation.

## Quality Gates

Quality gates formalize checkpoints from the JM Agentic
Development Kit. Every feature MUST pass each applicable
gate before advancing.

| Gate | When | Criteria |
|------|------|----------|
| **G0** | Pre-flight | Secrets scan clean, branch created, constitution compliance confirmed |
| **G1** | After spec | Spec complete (FR/SC/GWT), evidence tags, no unresolved clarifications |
| **G2** | After plan | Data model, API contracts, security rules (incl. RBAC), BDD hash-locked, tokens referenced, role governance verified |
| **G3** | Deploy-ready | Tests pass, Lighthouse >= 90, emulator tests, a11y audit, brand scan clean |

- Gates enforced by IIKit phase pipeline
- Failed gate = no advancement. Fix, don't bypass
- Results recorded in `.specify/context.json`

## Workspace

The `workspace/` directory is gitignored — the user's
local interaction layer for inputs, drafts, and session
artifacts.

- **Structure**: `workspace/tasks/TL-XXX-<slug>/` for
  task working files; `workspace/YYYY-MM-DD-<slug>/` for
  dated sessions with `inputs/`, `outputs/`, `annexes/`
- **Rules**: every subfolder has a README; sessions older
  than 30 days are reviewed; `estandares/` holds internal
  style guides
- **Interaction**: user drops inputs → agent runs workflow
  → outputs to `outputs/` or repo specs → user reviews
- Full structure documented in `workspace/README.md`

## Session Protocol

Every session follows: load context → recover state →
close pending items → propose next steps. Details in
`memory/session-protocol.md`. Key rules:

- Load CLAUDE.md, CONSTITUTION.md, insights/README.md,
  changelog.md, tasklog.md
- Check last 5 changelog entries and all open tasks
- Propose closing stale items (>7 days) before new work
- Never start work without explicit user confirmation

## Operational Logs

- **changelog.md**: significant decisions and changes.
  Format: `## YYYY-MM-DD` / `- **[type]**: description`
  Types: decision, completion, amendment, insight, blocker
- **tasklog.md**: open work items spanning sessions.
  Items >14 days without progress MUST be reviewed.
  Completed items retained 30 days then archived

## Development Workflow

Think → Act → Verify → Integrate. Each phase maps to
principles:

1. **Think** (XIII): read context, decompose, verify
   spec/plan/tests exist, identify quality gate
2. **Act** (IX, XIV, XXI): TDD red-green-refactor, simplest
   passing solution, BDD angles (XV), zero hardcoding
3. **Verify** (II, VII, X, XI): full test suite, token
   compliance, secrets scan, a11y, quality gate
4. **Integrate** (XVI, XX): atomic branch, resolve
   conflicts, re-test, update sitemap/SEO/README

## Governance

This constitution governs all MetodologIA site
development. It supersedes ad-hoc decisions.

- **Amendments**: explicit owner approval + version
  increment + documented rationale
- **Conflicts**: resolved by project owner per the
  Principle Precedence table above
- **Work philosophy** (XIII, XIV) governs application
  of all other principles
- **Quality gates** (G0-G3) are mandatory; no bypass
- **Socratic debate** required for ambiguities with
  divergent consequences. Insights before debate (XVII)
- **Operational logs** maintained across sessions;
  session protocol ensures review at every start
- **Indexability** (XVIII) enforced on every commit that
  creates a directory

**Version**: 7.0.0 | **Ratified**: 2026-03-22 | **Last Amended**: 2026-04-14
