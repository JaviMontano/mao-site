# Operational Tracking Insights

Decision patterns for login tracking, session management, and informational field governance.

### INS-OPS-001: Informational fields can be tracked client-side; reserve server-side for access control fields
- **Origin**: Socratic debate — Q2 login tracking mechanism for feature 006
- **Pattern**: Fields that are purely informational (last_login, total_sessions, activity logs) and have no impact on access control decisions can be safely updated by the client. Security rules restrict the client to only these fields — role, is_bootstrap, source remain server-only (Cloud Function). Server-side tracking (blocking functions, scheduled sync) should be reserved for fields that gate access decisions.
- **Rationale**: Three options debated: (A) client-side update in onAuthStateChanged, (B) Identity Platform beforeSignIn blocking function, (C) scheduled Cloud Function sync. Option A won on all constitutional axes: VII (risk is trivial — no privilege escalation from falsifying own login count), XIV (10 lines vs platform upgrade), I (natural client→cloud pattern), VI (only option that captures both login + logout), FR-028 (full compliance). Options B and C add infrastructure for fields that don't warrant it.
- **Applies when**: Deciding whether to track a user activity metric client-side vs server-side. Ask: "Can manipulating this field escalate privileges or bypass access control?" If no → client-side is sufficient.
- **Constitutional anchor**: VII (Secure by Default — proportional security), XIV (Simple First), I (Client-Rendered, Cloud-Backed)
- **Mitigation for logout**: Use `navigator.sendBeacon()` on `beforeunload` for best-effort logout tracking. Accept ~10% miss rate for tab kills/crashes at 1-10 user scale.
