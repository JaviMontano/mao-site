# Backend — CMS Development Workspace

Non-served development artifacts for the admin CMS backend.

## Structure

```
backend/
├── schemas/          # JSON Schema definitions for Firestore collections
├── seed-data/        # Pre-generated JSON payloads for seeding Firestore
│   ├── site_config/  # Branding, navigation, social, features
│   ├── curriculum/   # Program curriculum stubs
│   └── page_content/ # Extracted page content (Phase 2)
├── extractors/       # JSDOM-based HTML→JSON extraction scripts (Phase 2)
└── validators/       # Schema validation logic
```

## Collections (Phase 1)

| Collection | Purpose | Doc ID Pattern |
|---|---|---|
| resources | Individual resource items | Auto-generated |
| resource_categories | Category metadata (14 categories) | Slug (e.g., "biblioteca-prompts") |
| page_content | Migrated page sections + meta | Path hash (e.g., "empresas_index_html") |
| curriculum | Program modules + certification | audience_slug (e.g., "empresas_diagnostico") |
| site_config | Branding, nav, social, feature flags | Section key (e.g., "branding") |

## Note

These files are NOT served by Hostinger. The admin UI lives at `/admin/` and editor modules at `/admin/js/`. This folder is for development-time artifacts only.
