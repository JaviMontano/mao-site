# Data Architecture Insights

Decision patterns for data sourcing, discovery, and persistence boundaries.

### INS-DATA-001: Filesystem facts discovered at build-time; CMS customizations stored in Firestore
- **Origin**: Socratic debate — Q3 page registry mechanism for feature 006
- **Pattern**: When a feature needs to display information about the repository's own structure (pages, files, static assets), the discovery of WHAT EXISTS belongs to a build-time scan (filesystem → JSON). Customizations or overrides of that metadata belong in the cloud store (Firestore). Mixing discovery with persistence creates dual sources of truth — the filesystem is authoritative for structure, the CMS is authoritative for content overrides.
- **Rationale**: Five options debated. Build-time scan won on all axes: VI (derived cache, not dual source), XIV (40-line script vs 63+ runtime fetches vs collection+rules+reseed), I (build→JSON→browser is the same pattern as Tailwind CSS build), XII (CI/hook makes staleness impossible). The hybrid model (JSON base + Firestore overrides) satisfies FR-023 (metadata overrides in Firestore) without violating VI (content authority).
- **Applies when**: Any CMS feature that needs to enumerate or describe static repository artifacts (pages, images, templates). Ask: "Is this fact about what EXISTS (→ build scan) or what the user CUSTOMIZED (→ Firestore)?"
- **Constitutional anchor**: VI (Content Authority), XIV (Simple First), I (Client-Rendered, Cloud-Backed), XII (Code Sustainability)
