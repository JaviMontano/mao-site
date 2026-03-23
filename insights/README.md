# Insights Log

Structured knowledge extracted from Socratic debates, clarification sessions, and implementation discoveries. Each insight is a reusable decision pattern anchored to constitutional principles.

## How This Works

1. Every Socratic debate produces **insights** — reusable patterns, not one-time answers
2. Insights are classified by domain and stored in separate files for scalable consultation
3. The Constitution (XVII) mandates this capture loop
4. Agents load only the domain files relevant to the current task context

## Index

| File | Domain | Insights | Last Updated |
|------|--------|----------|--------------|
| [universal.md](universal.md) | Cross-cutting patterns | 3 | 2026-03-23 |
| [security.md](security.md) | Security, sanitization, access control | 3 | 2026-03-23 |
| [bdd-testing.md](bdd-testing.md) | BDD, test strategy, runners, verification | 4 | 2026-03-23 |
| [data-integrity.md](data-integrity.md) | Data layer, audit, schemas, storage | 2 | 2026-03-23 |
| [ux-operational.md](ux-operational.md) | UX feedback, admin experience, operational | 1 | 2026-03-23 |
| [rbac-governance.md](rbac-governance.md) | RBAC governance, role management, access control | 4 | 2026-03-23 |
| [operational-tracking.md](operational-tracking.md) | Login tracking, session management, informational fields | 1 | 2026-03-23 |
| [data-architecture.md](data-architecture.md) | Data sourcing, discovery vs persistence boundaries | 1 | 2026-03-23 |

## Adding New Domain Files

When insights accumulate in a domain not yet tracked:
1. Create `insights/<domain-slug>.md` with the standard format
2. Add it to this index table
3. Reference the constitutional principle that generated it

## Insight Format

Each insight follows:
```markdown
### INS-XXX: <title>
- **Origin**: <debate/session that produced it>
- **Pattern**: <the reusable decision rule>
- **Rationale**: <why, anchored to constitution>
- **Applies when**: <trigger conditions>
- **Constitutional anchor**: <principle numbers>
```
