# Frontend — Public Site Development Workspace

Non-served development artifacts for the public-facing site.

## Structure

```
frontend/
└── content-adapters/   # Phase 4: Firestore→DOM adapter modules
    ├── resource-adapter.js     # recursos/ pages
    ├── page-adapter.js         # Generic page content overlay
    ├── curriculum-adapter.js   # Program detail pages
    └── config-adapter.js       # Site-wide config (nav, branding)
```

## How Adapters Work (Phase 4)

Each adapter calls ContentService getters. If CMS returns data (collection is migrated), the adapter replaces static DOM content. If CMS returns null (not migrated), the static HTML remains untouched.

## Note

Public HTML pages stay at their current root-relative paths (required by Hostinger deploy). This folder contains development-time modules only.
