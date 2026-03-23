<!-- Sync Impact Report
Version: 6.0.0 (10x Excellence Pass)
Added: acceptance criteria, anti-patterns, edge cases per
  principle. Principle precedence table. Assumptions & limits.
Removed: Quality Standards section (redundant with I-XII).
Compressed: Governance, Development Workflow, Session Protocol,
  Operational Logs, Workspace.
Origin: User requested 10x value elevation with max 2x length.
  KISS/YAGNI — every sentence must justify its existence.
Previous version: 5.4.1 (Phase Separation Cleanup)
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

### I. Client-Rendered, Cloud-Backed

The site is a client-rendered application backed by a
managed Backend-as-a-Service (BaaS). The browser renders;
the cloud stores content.

- Pages render entirely in the browser — no server-side
  rendering framework
- Editable content is stored in a cloud document store
  and fetched at runtime
- Static HTML provides the shell; the cloud provides data
- The site MUST function in degraded mode when backend is
  unreachable — cached or fallback content, never blank
- No custom servers — only managed cloud services
- The build step (CSS compilation) is a dev convenience,
  not a runtime dependency

**Rationale**: Client rendering preserves static site speed
while enabling real-time content updates. BaaS eliminates
server ops. Degraded mode ensures the site never breaks.

**Migration note**: During transition, pages may source
content from either static HTML or the cloud. Both modes
must coexist until migration completes per section.

> **Acceptance criteria**:
> - Every page renders meaningful content with backend off
> - No `<noscript>` fallback shows a blank or error state
> - Zero custom server processes in production
>
> **Anti-pattern**: Adding an SSR framework or Node server
> "for SEO" when static HTML + client fetch suffices.
>
> **Edge case**: If a future page requires server-side
> rendering (e.g., dynamic OG images), it is handled by a
> serverless function — not a persistent server.

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

### VI. Content Authority

Editable content has a single source of truth. No content
is duplicated between static files and the cloud backend.

- Each editable piece lives in exactly one place
- During migration: authority shifts from HTML to cloud
  one section at a time — never both for the same content
- Content schema must be documented and validated
- Bilingual content (ES/EN) stores both variants together
- Admin changes take effect immediately — no deploy step

**Rationale**: Dual sources create conflicts and stale
data. Migration must be incremental to avoid big-bang risk.

> **Acceptance criteria**:
> - No content key exists in both static HTML and cloud
> - Schema validation rejects unstructured writes
> - Both ES/EN variants present for every content key
>
> **Anti-pattern**: Editing a price in both the HTML file
> and the CMS "just to be safe."
>
> **Edge case**: During migration, a page may read from
> static HTML if its section hasn't migrated yet — this is
> the intended coexistence, not a violation.

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

**Rationale**: A CMS is a write-capable system. Data-layer
security is the last line of defense. Input sanitization
prevents copy-paste contamination. Dual-layer verification
follows defense-in-depth.

> **Acceptance criteria**:
> - Secrets scan clean on every commit (G0 gate)
> - Security rules pass emulator tests (positive + negative)
> - Audit log entries resolve to exact field without context
>
> **Anti-pattern**: Relying on client-side JS to hide admin
> buttons instead of enforcing access in security rules.
>
> **Edge case**: Rich-text fields (if ever justified per
> XIV) use allowlist sanitization, not strip — but must be
> explicitly declared in the schema.

### VIII. Offline Resilience

The site degrades gracefully when connectivity is impaired.

- Client-side caching ensures the site works with
  intermittent connectivity
- Critical content cached for offline after first visit
- Cache invalidation follows a clear strategy — stale
  content acceptable temporarily
- Backend unreachable = last known good content, not error

**Rationale**: The site serves users across Latin America
where connectivity varies. A backend dependency must not
make the site less reliable than the static version.

> **Acceptance criteria**:
> - Site renders program catalog with network offline
> - Cache TTL is documented and enforced
> - No error state visible when backend is unreachable
>
> **Anti-pattern**: Showing a spinner indefinitely when
> the backend times out instead of falling back to cache.
>
> **Edge case**: Admin interfaces may show connectivity
> warnings — they require the backend to function.

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

- **Aesthetic**: Neo-Swiss Clean — flat vector, Swiss grid,
  generous whitespace, soft geometric forms, consistent
  iconography
- **Palette** (exclusive):
  Navy #122562, Gold #FFD700, Blue #137DC5, Dark #1F2833,
  Lavender #BBA0CC, Gray #808080
- **Typography**: Poppins (headings), Trebuchet (body),
  Futura (footnotes, small UI labels)
- **Visual rules**: high legibility, no text on noisy
  backgrounds, soft shadows, faceless figures in
  illustrations
- All tokens defined in one source (CSS custom properties)
  and referenced — never hardcoded as raw values
- Dark/light themes both comply with palette and contrast

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

- **Site scale**: 63+ pages, 1-3 admins, <10K daily
  visitors
- **Team**: 1 human + AI agents — no peer review
  available, gates compensate
- **Hosting**: shared hosting with CDN — no custom
  server-side logic
- **Budget**: zero external services beyond BaaS and
  hosting
- **Language**: Spanish-first (LatAm), English second.
  No other locales planned
- **Browser support**: modern evergreen browsers. No IE11,
  no legacy mobile browsers

These assumptions scope the principles. If the site grows
to 500+ pages, 10+ admins, or 100K+ visitors, principles
I, VII, VIII, and XVI may need re-evaluation.

## Quality Gates

Quality gates formalize checkpoints from the JM Agentic
Development Kit. Every feature MUST pass each applicable
gate before advancing.

| Gate | When | Criteria |
|------|------|----------|
| **G0** | Pre-flight | Secrets scan clean, branch created, constitution compliance confirmed |
| **G1** | After spec | Spec complete (FR/SC/GWT), evidence tags, no unresolved clarifications |
| **G2** | After plan | Data model, API contracts, security rules, BDD hash-locked, tokens referenced |
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
2. **Act** (IX, XIV): TDD red-green-refactor, simplest
   passing solution, BDD angles (XV)
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

**Version**: 6.0.0 | **Ratified**: 2026-03-22 | **Last Amended**: 2026-03-23
