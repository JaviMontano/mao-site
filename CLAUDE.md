# MetodologIA Site — Claude Code Instructions

@AGENTS.md

## Project Identity

- **Domain**: metodologia.info (EdTech, LatAm)
- **Brand**: MetodologIA — "Success as a Service"
- **Stack**: Vanilla JS + Web Components + Tailwind CSS + Firebase BaaS
- **Constitution**: CONSTITUTION.md (governance source of truth)

## Repo Topology

```
Local repo                     → Local upstream (origin)           → GitHub mirror (github)        → Hostinger (production)
/Users/deonto/claude-code/     /Users/deonto/claude-code/          github.com/JaviMontano/         156.67.75.195:65002
site-metodologia-agentic       site-metodologia                    mao-site.git                     ~/domains/metodologia.info/public_html/
```

## Branch Strategy (Constitution XX)

```
feature/* ──PR──→ staging ──PR──→ main ──SSH──→ production
  (dev)          (pre-prod)      (prod)        (CDN+origin)
```

- **Never** commit directly to `main` or `staging`
- **Hotfix**: `hotfix/*` → PR to `main` → backport to `staging`
- Feature branches created from `staging`

## Deploy Route

```bash
# 1. Merge staging → main via GitHub PR
# 2. SSH deploy
ssh -p 65002 u363367449@156.67.75.195 \
  "cd domains/metodologia.info/public_html && git pull origin main"
# 3. Purge caches
#    - Hostinger: hpanel → Dashboard → "Limpiar caché"
#    - CDN: hpanel → CDN → "Vaciar caché"
# 4. Verify live with Playwright
```

## Environment Map

| Environment | Branch | URL | Access |
|-------------|--------|-----|--------|
| Local dev | any | `npx serve .` → localhost:3000 | direct |
| GitHub | main, staging | github.com/JaviMontano/site-metodologia | git push |
| Production | main | metodologia.info | SSH port 65002 |
| Emulator | any | localhost:4000 (Firebase) | `firebase emulators:start` |
| Admin CMS | main | metodologia.info/admin/ | Google Auth + admin claim |

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `js/cms/` | Content service modules (7 files) — Firestore read/cache/fallback |
| `admin/` | Protected CMS editor (noindex) |
| `components/` | Web components: SiteHeader.js, SiteFooter.js |
| `js/i18n/` | i18n module + JSON dictionaries (ES/EN, 140+ keys per page) |
| `firebase/` | Security rules, indexes, emulator config |
| `scripts/` | Seed script, admin claim script |
| `tests/` | unit/ (Vitest), integration/ (emulator), e2e/ (Playwright) |
| `specs/` | IIKit feature specs (per-feature subdirs) |
| `insights/` | Reusable decision patterns from Socratic debates |
| `estilos/` | CSS: variables.css, base.css, components.css |
| `ruta/` | Route page + cotizadores (personas, empresas) |
| `empresas/`, `personas/` | Audience landing pages |
| `recursos/` | 14 resource categories + premium/ |

## Active Bugs

| ID | Status | Summary |
|----|--------|---------|
| BUG-001 | CDN propagating | SiteHeader.js stale on Cloudflare — correct on origin, CDN dev mode ON |
| BUG-002 | Fixed locally | `ruta-mode.js` now has a committed `data/business-logic.json` contract artifact |

## Test Commands

```bash
npx vitest run              # 46 unit tests (8 files)
npx vitest run tests/unit   # Unit only
npx playwright test         # E2E (requires dev server)
npx playwright test tests/e2e/ruta-i18n.spec.js  # BUG-001 regression
```

## Session Quick Start

1. Check `git branch` — you should be on a feature branch from `staging`
2. Read `CONSTITUTION.md` for governance
3. Check this file's Active Bugs before starting work
4. Run `npx vitest run` to verify baseline is green
