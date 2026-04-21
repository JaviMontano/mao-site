---
name: debug-api-endpoints
description: When you need to test or debug API endpoints systematically
---

# API Testing and Debugging Workflow

Follow this systematic workflow when testing or debugging Express.js API endpoints. This ensures comprehensive coverage and faster troubleshooting.

## Step 1: Verify Infrastructure

Before testing endpoints, ensure the basic infrastructure is working:

- **Server starts successfully** - Check the server runs without errors
- **Health check responds** - Test the `/health` or `/` endpoint returns 200
- **Database connection works** - Verify database is reachable and queries succeed
- **Environment variables loaded** - Confirm all required config is present

**What to check:**
```sh
# Server starts
npm start

# Health check responds
curl http://localhost:3000/health
# Expected: 200 OK
```

## Step 2: Verify Security

Test authentication and authorization before functional tests:

### Authentication
- **No token returns 401** - Request without Authorization header
- **Invalid token returns 401** - Request with malformed or expired token
- **Valid token succeeds** - Request with correct token proceeds

### Authorization
- **Wrong role returns 403** - User without required permissions
- **Correct role succeeds** - User with proper role can access
- **Admin override works** - Admin users can access all endpoints

**What to check:**
```sh
# No authentication
curl http://localhost:3000/api/protected
# Expected: 401 Unauthorized

# Valid authentication
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/protected
# Expected: 200 OK or 403 Forbidden
```

## Step 3: Verify Validation

Test input validation and error handling:

### Required Fields
- **Missing required field returns 400** - Request without required data
- **Clear error message** - Response explains what's missing

### Data Formats
- **Invalid format returns 400** - Wrong data type, malformed email, etc.
- **Boundary conditions** - Test min/max lengths, ranges
- **Special characters** - Test with edge cases (empty strings, null, undefined)

### Sanitization
- **XSS attempts blocked** - Verify input sanitization
- **SQL injection prevented** - Test with injection patterns

**What to check:**
```sh
# Missing required field
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": ""}'
# Expected: 400 Bad Request with validation error

# Invalid format
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "not-an-email"}'
# Expected: 400 Bad Request
```

## Step 4: Verify Functionality

Test the actual business logic:

### Happy Paths
- **Valid request succeeds** - Correct data with proper auth returns expected result
- **Correct status code** - 200 for GET, 201 for POST, 204 for DELETE
- **Response format correct** - Matches API standards (success: true, data: {...})
- **Data persisted** - Changes saved to database

### Edge Cases
- **Duplicate entry returns 409** - Creating existing resource
- **Not found returns 404** - Requesting non-existent resource
- **Empty lists handled** - GET with no results returns empty array
- **Large payloads** - Test with maximum allowed data size

### Error Scenarios
- **Database errors return 500** - Graceful handling of DB failures
- **Third-party API failures** - Handle external service errors
- **Race conditions** - Test concurrent requests
- **Timeouts handled** - Long-running operations don't hang

**What to check:**
```sh
# Happy path
curl -X POST http://localhost:3000/api/posts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Post", "body": "Content here"}'
# Expected: 201 Created with post data

# Not found
curl http://localhost:3000/api/posts/nonexistent-id
# Expected: 404 Not Found

# Duplicate
curl -X POST http://localhost:3000/api/posts \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Existing Title", "body": "Content"}'
# Expected: 409 Conflict if duplicate
```

## Troubleshooting Tips

When debugging issues, follow the steps in order:

1. **Infrastructure problem?** → Check logs, database connection, environment variables
2. **Security problem?** → Verify token is valid, check user permissions
3. **Validation problem?** → Review request payload, check required fields and formats
4. **Functionality problem?** → Debug business logic, check database queries

**Common Issues:**
- 401 errors → Check token expiration, verify auth middleware
- 403 errors → Check user roles, verify authorization logic
- 400 errors → Review validation rules, check request format
- 500 errors → Check server logs, database connection, third-party services
- Slow responses → Check database indexes, query performance, N+1 queries

## Best Practices

- **Test in order** - Don't skip to functionality if infrastructure isn't working
- **Isolate issues** - Test one thing at a time (auth, then validation, then logic)
- **Check both success and failure cases** - Don't just test happy paths
- **Verify response formats** - Ensure consistency with API standards
- **Use automated tests** - Write integration tests following this workflow
