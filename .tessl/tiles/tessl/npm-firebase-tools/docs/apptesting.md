# App Testing

Firebase App Testing provides AI-driven automated testing capabilities for web applications using natural language test descriptions.

## Capabilities

### Test Execution

Execute automated tests written in natural language and driven by AI.

```typescript { .api }
/**
 * Run automated tests written in natural language driven by AI
 * @param target - Target environment or configuration for testing
 * @param options - Configuration options
 * @returns Promise resolving when test execution completes
 */
function apptestingExecute(
  target: string,
  options?: Options & {
    /** Firebase web app ID for testing */
    app?: string;
    /** Test file pattern filter */
    testFilePattern?: string;
    /** Test name pattern filter */
    testNamePattern?: string;
    /** Request test execution without waiting for completion */
    testsNonBlocking?: boolean;
  }
): Promise<void>;
```

## Usage Examples

### Basic Test Execution

```typescript
import * as client from "firebase-tools";

// Execute tests for a target environment
await client.apptesting.execute("production", {
  project: "my-project",
  app: "1:123456789:web:abc123def456"
});

// Execute specific test files
await client.apptesting.execute("staging", {
  project: "my-project",
  app: "1:123456789:web:abc123def456",
  testFilePattern: "auth-*.test.js"
});

// Execute tests matching a name pattern
await client.apptesting.execute("development", {
  project: "my-project",
  app: "1:123456789:web:abc123def456",
  testNamePattern: "login flow"
});

// Non-blocking execution
await client.apptesting.execute("production", {
  project: "my-project",
  app: "1:123456789:web:abc123def456",
  testsNonBlocking: true
});
```

## CLI Usage

### Test Execution

```bash
# Execute tests for target environment
firebase apptesting:execute production --app=1:123456789:web:abc123def456

# Execute specific test files
firebase apptesting:execute staging \
  --app=1:123456789:web:abc123def456 \
  --test-file-pattern="auth-*.test.js"

# Execute tests matching name pattern
firebase apptesting:execute development \
  --app=1:123456789:web:abc123def456 \
  --test-name-pattern="login flow"

# Non-blocking execution
firebase apptesting:execute production \
  --app=1:123456789:web:abc123def456 \
  --tests-non-blocking
```

## Test Configuration

App Testing requires:

1. **Target Configuration**: Define test environments (development, staging, production)
2. **Test Files**: Natural language test descriptions in supported formats
3. **Web App**: Firebase web app configuration for the application under test

## Test File Format

Tests are written in natural language describing user interactions and expected outcomes:

```
Test: User login flow
Given a user visits the login page
When they enter valid credentials and click submit  
Then they should be redirected to the dashboard
And see a welcome message
```

## Notes

- App Testing uses AI to interpret natural language test descriptions
- Tests run against live web applications using real browser automation
- Results include screenshots, logs, and detailed execution reports
- The `app` parameter should be the Firebase web app ID
- Test execution may take several minutes depending on test complexity
- Use `--tests-non-blocking` for CI/CD pipelines to avoid timeouts