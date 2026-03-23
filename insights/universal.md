# Universal Insights

Cross-cutting decision patterns that apply regardless of domain.

### INS-001: Socratic elimination beats option selection
- **Origin**: All 3 debates (TS-024, TS-022/TS-040, TS-020)
- **Pattern**: When multiple implementation options exist, don't pick the "best" — systematically eliminate each option by testing it against constitutional principles until only one survives. The survivor is the answer by necessity, not preference.
- **Rationale**: Selection is subjective and debatable. Elimination is objective and auditable. Each eliminated option has a documented contradiction with a specific principle.
- **Applies when**: Any decision with 2+ options that have divergent implementation consequences
- **Constitutional anchor**: XIII (Think First), XV (Socratic debate protocol)

### INS-002: Every debate produces three outputs, not one
- **Origin**: All 3 debates
- **Pattern**: A Socratic debate always produces: (1) the direct answer, (2) refinements to the original question that weren't visible before, (3) gaps in coverage discovered by examining adjacent territory. Capture all three — the refinements and gaps are often more valuable than the answer.
- **Rationale**: Deep examination of one question illuminates its neighbors. TS-024 revealed sanitization default. TS-022 revealed runner-agnostic BDD. TS-020 revealed qualified field paths AND a missing UX scenario.
- **Applies when**: After every Socratic debate — always scan for secondary findings
- **Constitutional anchor**: XVII (Continuous Learning Loop)

### INS-003: "Simple First" means the simplest that satisfies ALL principles, not just the requirement
- **Origin**: TS-024 debate (strip vs allowlist)
- **Pattern**: XIV (Simple First) is not permission to cut corners. The simplest solution must satisfy the functional requirement AND all applicable constitutional principles (security, sustainability, BDD coverage). If the "simplest" option fails a principle, it's not actually a valid option — eliminate it and test the next simplest.
- **Rationale**: In TS-024, allowlist seemed "richer" and escape seemed "safer" — but both violated principles. Strip was simplest AND the only option that passed all checks.
- **Applies when**: Invoking XIV to justify a choice — always verify against other principles first
- **Constitutional anchor**: XIV (Simple First), XIII (Think First)

### INS-004: Separate platform defaults from feature requests
- **Origin**: Q4 debate (concurrent admin edits)
- **Pattern**: When an edge case combines "the platform already does X by default" with "we should add Y on top", separate them. The platform default needs no code, no test, no scenario — it's a fact. The improvement on top is evaluated independently against XIV (Simple First). Mixing them creates the illusion that the whole thing is a feature to build, when half of it is free.
- **Rationale**: Firestore's last-write-wins is not a feature we implement — it's what happens if we do nothing. The warning UI on top is the actual feature, and it failed the XIV test (speculative, 1-3 admins). Separation prevented building unnecessary code.
- **Applies when**: Any edge case that describes how the platform/framework already behaves + a proposed enhancement
- **Constitutional anchor**: XIV (Simple First), XVII (Continuous Learning Loop)
