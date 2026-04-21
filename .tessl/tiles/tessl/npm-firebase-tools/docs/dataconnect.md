# Data Connect

Firebase Data Connect provides a managed PostgreSQL database with GraphQL APIs and type-safe SDK generation for web and mobile applications.

## Capabilities

### Service Management

Manage Data Connect services and their lifecycle.

```typescript { .api }
/**
 * List all deployed Data Connect services
 * @param options - Configuration options
 * @returns Promise resolving to array of service objects
 */
function dataconnectServicesList(options?: Options): Promise<any[]>;
```

### SQL Operations

Manage SQL schema, migrations, and database operations.

```typescript { .api }
/**
 * Compare and display differences between local and deployed schemas
 * @param serviceId - Service identifier (optional)
 * @param options - Configuration options
 * @returns Promise resolving when diff completes
 */
function dataconnectSqlDiff(
  serviceId?: string,
  options?: Options
): Promise<void>;

/**
 * Set up CloudSQL database for Data Connect service
 * @param serviceId - Service identifier (optional)
 * @param options - Configuration options
 * @returns Promise resolving when setup completes
 */
function dataconnectSqlSetup(
  serviceId?: string,
  options?: Options
): Promise<void>;

/**
 * Apply schema migrations to the database
 * @param serviceId - Service identifier (optional) 
 * @param options - Configuration options
 * @returns Promise resolving when migration completes
 */
function dataconnectSqlMigrate(
  serviceId?: string,
  options?: Options & {
    /** Automatically approve migration without confirmation */
    auto?: boolean;
  }
): Promise<void>;

/**
 * Grant necessary permissions for Data Connect service
 * @param serviceId - Service identifier (optional)
 * @param options - Configuration options
 * @returns Promise resolving when permissions are granted
 */
function dataconnectSqlGrant(
  serviceId?: string,
  options?: Options
): Promise<void>;

/**
 * Open interactive SQL shell for the database
 * @param serviceId - Service identifier (optional)
 * @param options - Configuration options
 * @returns Promise resolving when shell session ends
 */
function dataconnectSqlShell(
  serviceId?: string,
  options?: Options
): Promise<void>;
```

### SDK Generation

Generate type-safe SDKs for web and mobile platforms.

```typescript { .api }
/**
 * Generate typed SDKs for Data Connect connectors
 * @param options - Configuration options
 * @returns Promise resolving when SDK generation completes
 */
function dataconnectSdkGenerate(options?: Options & {
  /** Watch for changes and regenerate SDKs automatically */
  watch?: boolean;
}): Promise<void>;
```

## Usage Examples

### Service Management

```typescript
import * as client from "firebase-tools";

// List all Data Connect services
const services = await client.dataconnect.services.list({
  project: "my-project"
});

console.log(`Found ${services.length} Data Connect services`);
services.forEach(service => {
  console.log(`- ${service.name}`);
});
```

### SQL Operations

```typescript
// Set up CloudSQL database
await client.dataconnect.sql.setup("my-service", {
  project: "my-project"
});

// Check schema differences
await client.dataconnect.sql.diff("my-service", {
  project: "my-project"
});

// Apply migrations
await client.dataconnect.sql.migrate("my-service", {
  project: "my-project",
  auto: true
});

// Grant permissions
await client.dataconnect.sql.grant("my-service", {
  project: "my-project"
});
```

### SDK Generation

```typescript
// Generate SDKs for all configured connectors
await client.dataconnect.sdk.generate({
  project: "my-project"
});

// Generate SDKs with watch mode
await client.dataconnect.sdk.generate({
  project: "my-project",
  watch: true
});
```

## CLI Usage

### Service Management

```bash
# List all Data Connect services
firebase dataconnect:services:list
```

### SQL Operations

```bash
# Set up CloudSQL database
firebase dataconnect:sql:setup my-service

# Check schema differences
firebase dataconnect:sql:diff my-service

# Apply migrations with auto-approval
firebase dataconnect:sql:migrate my-service --auto

# Grant necessary permissions
firebase dataconnect:sql:grant my-service

# Open SQL shell
firebase dataconnect:sql:shell my-service
```

### SDK Generation

```bash
# Generate SDKs
firebase dataconnect:sdk:generate

# Generate with watch mode
firebase dataconnect:sdk:generate --watch
```

## Configuration

Data Connect services are configured through `dataconnect.yaml` files that define:

- PostgreSQL CloudSQL instance connection
- GraphQL schema definitions
- Connector configurations
- SDK generation settings for JavaScript, Kotlin, Swift, and Dart

## Notes

- Data Connect requires a CloudSQL PostgreSQL instance
- Schema migrations are applied through the `sql:migrate` command
- SDKs are generated based on connector.yaml configurations
- Services can be configured with different PostgreSQL databases
- The SQL shell provides direct database access for debugging