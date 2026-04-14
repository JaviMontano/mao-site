# Site MetodologIA Premise

## What

Client-rendered marketing and content platform for MetodologIA (metodologia.info) — a 100+ page bilingual (ES/EN) site built on Tailwind CSS, vanilla JS web components, and **Firebase as the single backend** (Firestore, Auth, Storage, Analytics, App Check). Content lives in Firestore with declarative static fallback via `js/cms/migration-bridge.js`; a dedicated backoffice feature (`010-backoffice-cms`) provides schema-driven editing for prices, services, bilingual content, programs, and pages — no code deployments required for content changes. Consumer-facing features (home, landing, diagnóstico, catalogs) read published content; they never write to shared content collections.

## Who

- **Professionals (Personas)**: Individuals seeking AI skills, productivity tools, and methodology training — from beginners to advanced practitioners.
- **Companies (Empresas)**: Organizations looking for AI consulting, team training, and digital transformation programs.
- **Community**: MetodologIA ecosystem participants accessing free and premium resources.
- **Leads**: Anonymous visitors who complete the diagnóstico flow; their PII is captured append-only (see Constitution XXII).
- **Administrators**: Site owner and editors who manage content through the `010-backoffice-cms` admin interface — schema-driven forms, versioning, rollback, audit log, workflow, feature flags, A/B experiments.

## Why

MetodologIA needs a digital presence that communicates its value proposition, catalogs its training programs, provides a resource library (14 free + 13 premium categories), enables self-service quoting via interactive cotizadores, and captures qualified leads through a frictionless diagnóstico flow. Firebase as the formalized single backend eliminates vendor debates, reduces ops to zero, and gives security rules a single enforcement surface. A **feature-bounded architecture** (Constitution XXIII) keeps consumer features (home, landing pages, diagnóstico) small, testable, and independently shippable, while backoffice features (`006-cms-backoffice-rbac`, `010-backoffice-cms`) own write rights to shared content. Content changes become instant for administrators; developer intervention is reserved for structural changes.

## Domain

EdTech and AI Consulting. Key terms:
- **Cotizador**: Interactive pricing calculator for programs
- **Recursos**: Downloadable resources organized by category (prompts, templates, guides)
- **Premium**: Paid tier of resources with higher-value content
- **Ruta**: Learning path / roadmap for users
- **Diagnóstico**: 6-step frictionless assessment flow that infers user level and produces a personalized recommendation + CTA (see feature `009-home-landing-sales` §4.4)
- **Gemini Gems**: AI assistants built on Google Gemini for specific use cases
- **Content Authority**: Firestore is the canonical source; static files are the declarative frozen fallback consumed by `migration-bridge.js` (see Constitution VI)
- **Neo-Swiss Light**: Default visual theme (light palette with navy + gold accents); Dark is a user-toggleable mirror persisted in `localStorage` (see Constitution X)
- **BaaS-First**: Firebase is the only backend. Custom servers are prohibited (see Constitution I)
- **PII-Append-Only**: Writes to `leads/` and `diagnostics/` create new docs per anonymous uid; deduplication is deferred to admin reconciliation (see Constitution XXII)

## Scope

**In scope**:
- Public marketing pages (home, about, programs, resources, contact, legal) rendered client-side
- Home landing v2 (feature `009-home-landing-sales`): hero + 3 CTAs + prueba social + programas + cierre, Neo-Swiss Light default, responsive xs→2xl, i18n ES/EN
- Diagnóstico flow (6 steps, declarative scoring in spec `009` §4.4) with append-only persistence to `leads/` and `diagnostics/`
- Program catalogs for personas and empresas with info modals
- Interactive cotizadores (real-time pricing with progress bars, informational only)
- Free and premium resource library (14+ categories each)
- Bilingual content pipeline (ES/EN) using `js/i18n/dictionaries/*.json` as static fallback; Firestore `translations/` when feature flag `cms-i18n` is enabled
- SEO optimization (OG tags, Twitter cards, sitemap, canonical URLs)
- Accessibility (WCAG 2.1 AA, skip-to-content, ARIA modals, keyboard navigation, touch targets ≥44×44)
- Responsive design (xs 360 / sm 390 / md 768 / lg 1024 / xl 1280 / 2xl 1536) with Neo-Swiss Light default + Dark mirror
- **Firebase as the single backend**: Firestore + Auth (Google + anonymous) + Storage + Analytics + App Check. No custom server. No second provider.
- Declarative static fallback via `js/cms/migration-bridge.js` — permanent resilience mechanism, not a migration step
- SWR caching via `js/cms/cache-manager.js` with explicit offline/syncing/fallback UX pills (see Constitution VIII)
- Feature-bounded architecture: consumer features (001-003, 005, 009) read published content; backoffice features (006, 010) own write rights
- Backoffice CMS (feature `010-backoffice-cms`, next-up): schema-driven editing, versioning, rollback, audit log, workflow, feature flags, A/B experiments, WCAG-compliant admin UI
- PII append-only writes with admin-side reconciliation deferred to 010 or later
- LGPD/GDPR-light consent with explicit checkbox for PII capture

**Out of scope**:
- Non-Firebase backend services (would require a constitutional amendment)
- Custom server infrastructure (BaaS only, no self-managed servers, no Node runtime in production)
- Payment processing (cotizadores are informational, not transactional)
- User accounts for visitors (auth is admin-only; visitors use anonymous auth for PII writes)
- Full CMS framework adoption (this is a tailor-made solution, not WordPress/Strapi)
- Automatic dedup/merge of leads across anonymous uids (deferred to admin reconciliation in feature 010)
- Email marketing integration (Mailchimp, Brevo) — future phase
