# quickstart-debug-api-endpoints

Systematic API testing and debugging workflow for the Tessl quickstart guide.

> **⚠️ Quickstart Example Only**
>
> This tile is a demonstration example for the [Quick Start: Skills, Docs, and Rules](https://docs.tessl.io/introduction-to-tessl/quickstart-skills-docs-rules) guide. It is **not intended for production use**.
>
> For production, create your own skill with your team's specific testing workflows. See [Creating skills](https://docs.tessl.io/guides/create/creating-skills) for guidance.

## Overview

This tile provides a skill that guides your coding agent through a systematic workflow for testing and debugging Express.js API endpoints. The skill activates when you ask your agent to test or debug APIs.

**Type:** Skill
**Name:** `tessl-labs/quickstart-debug-api-endpoints`
**Version:** 1.0.0

## What's Included

### Skill: debug-api-endpoints

Located in `skills/debug-api-endpoints/SKILL.md`, this skill provides a 4-step systematic testing workflow:

1. **Verify Infrastructure**
   - Server starts successfully
   - Health check responds
   - Database connection works
   - Environment variables loaded

2. **Verify Security**
   - Authentication (no token → 401, invalid token → 401, valid token → success)
   - Authorization (wrong role → 403, correct role → success)

3. **Verify Validation**
   - Required fields
   - Data formats and types
   - Boundary conditions
   - Sanitization (XSS, SQL injection prevention)

4. **Verify Functionality**
   - Happy paths (valid requests succeed)
   - Edge cases (duplicates, not found, empty lists)
   - Error scenarios (database errors, timeouts, race conditions)

## Installation

### From Tessl Registry

```sh
tessl install tessl-labs/quickstart-debug-api-endpoints
```

### From Local Path

```sh
tessl install file:./tiles/tessl-demo/quickstart-debug-api-endpoints
```

## How It Works

Skills are **lazy push** - they load when relevant:

1. Install the tile
2. Skill becomes available to your agent
3. When you ask to test/debug an API, the skill activates
4. Your agent follows the systematic workflow

## Example Usage

After installing this tile, ask your agent:

```
"Test the /api/posts endpoint"
```

Your agent will:
- Follow the 4-step workflow systematically
- Check infrastructure before testing endpoints
- Verify security before validation
- Test validation before functionality
- Provide organized, comprehensive test coverage

Instead of random test patterns, you get:
```
✓ Infrastructure: Server running, health check OK
✓ Security: Auth token required, 401 without token
✓ Validation: Required fields checked, formats validated
✓ Functionality: Happy path works, errors handled correctly
```

## When to Use

Use this skill when you need to:
- **Write tests** for a new API endpoint
- **Debug issues** with an existing endpoint
- **Verify changes** didn't break anything
- **Ensure coverage** of security and validation

## Troubleshooting Order

The skill teaches your agent to debug in this order:

1. Infrastructure problem? → Check logs, database, environment
2. Security problem? → Verify tokens, permissions
3. Validation problem? → Review payload, required fields
4. Functionality problem? → Debug business logic, queries

## Used In

This tile is referenced in:
- [Quick Start: Skills, Docs, and Rules](https://docs.tessl.io/introduction-to-tessl/quickstart-skills-docs-rules)

## Related Tiles

- [quickstart-express-api-standards](https://tessl.io/registry/tessl-labs/quickstart-express-api-standards) - API coding standards (rules)
