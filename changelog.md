# Changelog

Significant decisions, completions, and changes across sessions.

## 2026-03-23

- **[amendment]**: Constitution v5.1.0 — added XVIII (Indexable & Self-Organizing Repository), Workspace section, gitignore governance. [XVIII, XII]
- **[decision]**: `estandares/` moved to `workspace/estandares/` — internal references are not repo content, they're user interaction material. Removed from git tracking. [XVIII]
- **[decision]**: `workspace/` gitignored with comment — user interaction layer stays local. Tasks bridge (`workspace/tasks/`) connects tasklog.md to working files. [XVIII]
- **[amendment]**: Constitution v5.0.0 — added XVII (Continuous Learning Loop), Session Protocol, Operational Logs, Insights System. Structural evolution for cross-session scalability. [XVII, XIII, XV]
- **[amendment]**: Constitution v4.1.0 — codified sanitization default (VII), runner-agnostic BDD (XV), dual-layer verification (VII) from Socratic debates. [VII, XV, XIV]
- **[insight]**: Created `insights/` system with 5 domain files, 13 total insights extracted from 3 Socratic debates. [XVII]
- **[decision]**: TS-024 — HTML sanitization strategy: strip (not escape, not allowlist). DOMParser native, zero dependencies. [VII, XIV]
- **[decision]**: TS-022/TS-040 — static invariant verification: hybrid strategy. Playwright for browser-inspectable (TS-022), Vitest for code-scan (TS-040). Runner matches nature. [XV, VII]
- **[decision]**: TS-020 — audit log verification: Emulator integration test. Qualified field paths required (e.g., `programs/diagnostico.description_es`). UX confirmation gap detected. [VII, XV, FR-011]
- **[discovery]**: Missing BDD scenario for positive save confirmation UX in admin interface (operational coverage angle, XV). Not yet added — pending testify re-run. [XV]
- **[decision]**: Q4 — concurrent admin edits deferred to v2. Firestore last-write-wins is platform default (no code). Warning UI is speculative for 1-3 admins. Audit log is v1 mitigation. [XIV, FR-011]
- **[decision]**: Q5 — program name divergence (Empoderamiento/Alto Rendimiento) needs no dedicated scenario. Data variety in Firestore, not a distinct code path. [XIV, INS-004]
- **[completion]**: Clarify phase complete — 5/5 ambiguities resolved (3 Socratic debates + 2 direct resolutions). 8 total clarifications across 2 sessions. [XV, XVII]

## 2026-03-22

- **[completion]**: Constitution v4.0.0 ratified — 16 principles including Work Philosophy (XIII-XVI), Quality Gates (G0-G3). [All]
- **[completion]**: Feature specification `004-firebase-cms-backend` — 6 user stories, 23 FRs, 13 SCs, 7 edge cases. [XIII]
- **[completion]**: Implementation plan with architecture, project structure, migration strategy (3 sequential waves). [XIV, XVI]
- **[completion]**: Testify phase — 40 BDD scenarios across 6 feature files, hash-locked. [XV, IX]
- **[completion]**: Requirements checklist + security checklist passed. [G1, G2]
- **[decision]**: Migration waves are sequential, not parallel — XIV (Simple First) governs for 1-person + AI team. [XIV, XVI]
- **[decision]**: Clarify session resolved 4 ambiguities: TS-006 (Or keyword), TS-013 (identically), TS-003 (no deployment), TS-036 (per-collection schema). [XV, IX]
