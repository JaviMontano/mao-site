# Admin CMS Modules

## Architecture

All modules are bundled by esbuild into `admin-bundle.js`. Entry point: `admin-app.js`.

## Modules

| Module | Role Gate | Purpose |
|--------|-----------|---------|
| `admin-app.js` | — | Auth state, RBAC tab routing, legacy migration |
| `program-editor.js` | viewer+ | Bilingual program editing with stale indicators |
| `price-editor.js` | viewer+ | B2C/B2B/premium pricing with save |
| `i18n-editor.js` | viewer+ | Translation key editor with bulk save |
| `page-registry.js` | editor+ | Site page listing with i18n coverage |
| `user-manager.js` | super_admin | User list, role assignment, invites, domains |
| `audit-viewer.js` | admin+ | Audit log with filters and version restore |
| `profile-editor.js` | viewer+ | User profile preferences |
| `idle-timer.js` | — | 8-hour idle timeout with sessionStorage |

## Tab Routing

Tabs are rendered dynamically based on the user's role. See `TAB_DEFS` in `admin-app.js`.

## Build

```bash
npm run build:admin   # Bundle for production
npm run watch:admin   # Watch mode for development
```
