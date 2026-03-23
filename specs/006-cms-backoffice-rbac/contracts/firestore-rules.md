# Firestore Security Rules Contract

**Version**: 2.0 (RBAC upgrade from binary admin)

## Helper Functions

```
function isAuthenticated()   → request.auth != null
function getUserRole()       → request.auth.token.role
function isSuperAdmin()      → getUserRole() == 'super_admin'
function isAdminOrAbove()    → getUserRole() in ['super_admin', 'admin']
function isEditorOrAbove()   → getUserRole() in ['super_admin', 'admin', 'editor']
function isViewer()          → getUserRole() == 'viewer'
function hasAnyRole()        → getUserRole() != null
```

## Rules by Collection

### `programs/{programId}`
| Operation | Rule | Rationale |
|-----------|------|-----------|
| read | `true` | Public content |
| create | `isEditorOrAbove()` + schema validation | Editors create programs |
| update | `isEditorOrAbove()` + schema validation | Editors edit programs |
| delete | `isAdminOrAbove()` | Destructive — admin+ only |

### `pricing/{category}`
| Operation | Rule | Rationale |
|-----------|------|-----------|
| read | `true` | Public content |
| write | `isEditorOrAbove()` | Editors manage pricing |

### `translations/{lang}`
| Operation | Rule | Rationale |
|-----------|------|-----------|
| read | `true` | Public content |
| write | `isEditorOrAbove()` + `_meta` required | Editors manage translations |

### `users/{uid}`
| Operation | Rule | Rationale |
|-----------|------|-----------|
| read own | `isAuthenticated() && request.auth.uid == uid` | Users read own profile |
| read all | `isSuperAdmin()` | User management |
| create | `false` | Only Cloud Function creates |
| update own (profile) | `isAuthenticated() && request.auth.uid == uid` + allowed fields only | display_name, preferred_language |
| update role | `false` | Only Cloud Function changes roles |
| delete | `false` | Never delete user docs from client |

**Allowed self-update fields**: `display_name`, `preferred_language`, `updated_at`, `last_login`, `total_sessions`
**Blocked self-update fields**: `role`, `is_bootstrap`, `source`, `email`, `uid`, `role_history`, `created_at`

### `config/access`
| Operation | Rule | Rationale |
|-----------|------|-----------|
| read | `hasAnyRole()` | All CMS users need access config |
| write | `isSuperAdmin()` | Only super_admin manages access |

### `config/invites/{hash}`
| Operation | Rule | Rationale |
|-----------|------|-----------|
| read | `isSuperAdmin()` | View pending invites |
| create | `false` | Only Cloud Function creates |
| delete | `isSuperAdmin()` | Cancel invitations |

### `page_overrides/{pathHash}`
| Operation | Rule | Rationale |
|-----------|------|-----------|
| read | `isEditorOrAbove()` | Editors see merged page data |
| create | `isEditorOrAbove()` | Editors create overrides |
| update | `isEditorOrAbove()` | Editors edit overrides |
| delete | `isAdminOrAbove()` | Destructive — admin+ only |

### `config/settings`
| Operation | Rule | Rationale |
|-----------|------|-----------|
| read | `true` | Public (cache TTL, migrations) |
| write | `isSuperAdmin()` | System config |

### `audit_log/{entryId}`
| Operation | Rule | Rationale |
|-----------|------|-----------|
| read | `isAdminOrAbove()` | Audit visibility |
| create | `isEditorOrAbove()` | Content editors create audit entries |
| update | `false` | Immutable |
| delete | `false` | Immutable |

## Migration from v1 Rules

**Current**: `isAdmin() → request.auth.token.admin == true`
**New**: Role-based functions using `request.auth.token.role`

**Backward compatibility**: During migration, accept EITHER:
- `request.auth.token.role` (new system)
- `request.auth.token.admin == true` (legacy — treated as admin role)

Migration helper:
```
function isLegacyAdmin() → request.auth.token.admin == true
function hasWriteAccess() → isEditorOrAbove() || isLegacyAdmin()
```

Remove legacy support after all users have refreshed tokens (1 week after deploy).
