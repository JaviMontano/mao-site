# Functions

Cloud Functions management for deploying, configuring, and monitoring serverless functions in Firebase projects.

## Capabilities

### List Functions

Lists all deployed Cloud Functions in the project.

```typescript { .api }
/**
 * List deployed Cloud Functions
 * @param options - Command options
 * @returns Promise resolving to array of function information
 */
function list(options?: Options): Promise<Array<{
  name: string;
  status: string;
  trigger: {
    httpsTrigger?: {
      url: string;
    };
    eventTrigger?: {
      eventType: string;
      resource: string;
    };
  };
  runtime: string;
  availableMemoryMb: number;
  timeout: string;
  environmentVariables?: Record<string, string>;
}>>;
```

**Usage Examples:**

```javascript
const client = require("firebase-tools");

// List all functions
const functions = await client.functions.list({
  project: "my-project"
});

console.log("Deployed functions:", functions.map(f => f.name));
```

### Delete Functions

Deletes one or more Cloud Functions.

```typescript { .api }
/**
 * Delete Cloud Functions
 * @param functionName - Name of function to delete, or comma-separated list
 * @param options - Delete options
 * @returns Promise resolving when deletion completes
 */
function deleteFunctions(
  functionName: string,
  options?: Options & {
    /** Force deletion without confirmation */
    force?: boolean;
  }
): Promise<void>;
```

**Usage Examples:**

```javascript
// Delete a single function
await client.functions.delete("myFunction", {
  project: "my-project",
  force: true
});

// Delete multiple functions
await client.functions.delete("func1,func2,func3", {
  project: "my-project"
});
```

### View Function Logs

Retrieves and displays Cloud Functions execution logs.

```typescript { .api }
/**
 * View Cloud Functions logs
 * @param options - Log viewing options
 * @returns Promise resolving when log viewing completes
 */
function log(options?: Options & {
  /** Number of log lines to retrieve */
  lines?: number;
  /** Filter logs by text content */
  filter?: string;
  /** Open logs in browser */
  open?: boolean;
  /** Follow logs in real-time */
  tail?: boolean;
}): Promise<void>;
```

**Usage Examples:**

```javascript
// View recent logs
await client.functions.log({
  project: "my-project",
  lines: 100
});

// Filter logs by function name
await client.functions.log({
  project: "my-project",
  filter: "myFunction"
});

// Follow logs in real-time
await client.functions.log({
  project: "my-project",
  tail: true
});
```

### Interactive Shell

Starts an interactive shell for testing Cloud Functions locally.

```typescript { .api }
/**
 * Start interactive Functions shell
 * @param options - Shell configuration options
 * @returns Promise resolving when shell session ends
 */
function shell(options?: Options & {
  /** Port for shell server */
  port?: number;
  /** Host for shell server */
  host?: string;
}): Promise<void>;
```

**Usage Examples:**

```javascript
// Start interactive shell
await client.functions.shell({
  project: "my-project",
  port: 5001
});
```

## Configuration Management

### Get Configuration

Retrieves Cloud Functions runtime configuration variables.

```typescript { .api }
/**
 * Get function configuration
 * @param options - Configuration options
 * @returns Promise resolving to configuration object
 */
function configGet(options?: Options & {
  /** Specific config key to retrieve */
  key?: string;
}): Promise<Record<string, string>>;
```

### Set Configuration

Sets Cloud Functions runtime configuration variables.

```typescript { .api }
/**
 * Set function configuration
 * @param configData - Configuration key-value pairs
 * @param options - Set options
 * @returns Promise resolving when configuration is set
 */
function configSet(
  configData: Record<string, string> | string,
  options?: Options
): Promise<void>;
```

### Unset Configuration

Removes Cloud Functions runtime configuration variables.

```typescript { .api }
/**
 * Unset function configuration
 * @param keys - Configuration keys to remove
 * @param options - Unset options
 * @returns Promise resolving when configuration is removed
 */
function configUnset(
  keys: string | string[],
  options?: Options
): Promise<void>;
```

### Clone Configuration

Copies configuration from one project to another.

```typescript { .api }
/**
 * Clone function configuration
 * @param options - Clone options
 * @returns Promise resolving when configuration is cloned
 */
function configClone(options?: Options & {
  /** Source project ID */
  from: string;
  /** Destination project ID */
  to?: string;
  /** Only clone specific keys */
  only?: string;
  /** Skip specific keys */
  except?: string;
}): Promise<void>;
```

### Export Configuration

Exports function configuration to a file.

```typescript { .api }
/**
 * Export function configuration
 * @param options - Export options
 * @returns Promise resolving when configuration is exported
 */
function configExport(options?: Options & {
  /** Output file path */
  dest?: string;
}): Promise<void>;
```

**Configuration Usage Examples:**

```javascript
// Get all configuration
const config = await client.functions.config.get({
  project: "my-project"
});

// Get specific configuration key
const apiKey = await client.functions.config.get({
  project: "my-project",
  key: "api.key"
});

// Set configuration
await client.functions.config.set({
  "api.key": "your-api-key",
  "db.url": "https://your-db.firebaseio.com"
}, { project: "my-project" });

// Set single configuration value
await client.functions.config.set("api.timeout=30", {
  project: "my-project"
});

// Remove configuration
await client.functions.config.unset(["api.key", "old.setting"], {
  project: "my-project"
});

// Clone configuration between projects
await client.functions.config.clone({
  from: "source-project",
  to: "dest-project"
});
```

## Secrets Management

### Set Secret

Creates or updates a secret for Cloud Functions.

```typescript { .api }
/**
 * Set function secret
 * @param secretName - Name of the secret
 * @param options - Secret configuration options
 * @returns Promise resolving when secret is set
 */
function secretsSet(
  secretName: string,
  options?: Options & {
    /** Secret value (if not provided interactively) */
    data?: string;
    /** Data file containing secret value */
    dataFile?: string;
  }
): Promise<void>;
```

### Get Secret Metadata

Retrieves metadata about a secret (not the secret value).

```typescript { .api }
/**
 * Get secret metadata
 * @param secretName - Name of the secret
 * @param options - Command options
 * @returns Promise resolving to secret metadata
 */
function secretsGet(
  secretName: string,
  options?: Options
): Promise<{
  name: string;
  createTime: string;
  labels?: Record<string, string>;
}>;
```

### Access Secret Value

Retrieves the actual value of a secret.

```typescript { .api }
/**
 * Access secret value
 * @param secretName - Name of the secret
 * @param options - Access options
 * @returns Promise resolving to secret value
 */
function secretsAccess(
  secretName: string,
  options?: Options & {
    /** Secret version to access */
    version?: string;
  }
): Promise<string>;
```

### Describe Secret

Shows detailed information about a secret.

```typescript { .api }
/**
 * Describe secret details
 * @param secretName - Name of the secret
 * @param options - Command options
 * @returns Promise resolving when description is displayed
 */
function secretsDescribe(
  secretName: string,
  options?: Options
): Promise<void>;
```

### Destroy Secret

Permanently deletes a secret.

```typescript { .api }
/**
 * Destroy secret
 * @param secretName - Name of the secret
 * @param options - Destroy options
 * @returns Promise resolving when secret is destroyed
 */
function secretsDestroy(
  secretName: string,
  options?: Options & {
    /** Force destruction without confirmation */
    force?: boolean;
  }
): Promise<void>;
```

### Prune Unused Secrets

Removes secrets that are no longer referenced by any functions.

```typescript { .api }
/**
 * Prune unused secrets
 * @param options - Prune options
 * @returns Promise resolving when pruning completes
 */
function secretsPrune(options?: Options & {
  /** Force pruning without confirmation */
  force?: boolean;
  /** Dry run - show what would be pruned */
  dryRun?: boolean;
}): Promise<void>;
```

**Secrets Usage Examples:**

```javascript
// Set a secret interactively
await client.functions.secrets.set("api-key", {
  project: "my-project"
});

// Set a secret from file
await client.functions.secrets.set("database-cert", {
  project: "my-project",
  dataFile: "./db-cert.json"
});

// Get secret metadata
const metadata = await client.functions.secrets.get("api-key", {
  project: "my-project"
});

// Access secret value
const secretValue = await client.functions.secrets.access("api-key", {
  project: "my-project"
});

// Destroy secret
await client.functions.secrets.destroy("old-secret", {
  project: "my-project",
  force: true
});

// Prune unused secrets
await client.functions.secrets.prune({
  project: "my-project",
  dryRun: true
});
```

## Artifacts Management

### Set Artifact Policy

Configure artifact retention policies for Cloud Functions.

```typescript { .api }
/**
 * Set artifact retention policy for Cloud Functions
 * @param options - Policy configuration options
 * @returns Promise resolving when policy is set
 */
function artifactsSetpolicy(options?: Options & {
  /** Retention policy configuration */
  policy?: string;
  /** Maximum number of versions to retain */
  maxVersions?: number;
}): Promise<void>;
```

### Delete GCF Artifacts (Experimental)

Remove old Cloud Functions artifacts to save storage space.

```typescript { .api }
/**
 * Delete old Cloud Functions artifacts (experimental feature)
 * @param options - Deletion options
 * @returns Promise resolving when artifacts are deleted
 */
function deletegcfartifacts(options?: Options & {
  /** Force deletion without confirmation */
  force?: boolean;
  /** Dry run - show what would be deleted */
  dryRun?: boolean;
}): Promise<void>;
```

**Artifacts Usage Examples:**

```javascript
// Set artifact retention policy
await client.functions.artifacts.setpolicy({
  project: "my-project",
  maxVersions: 10
});

// Delete old artifacts (requires deletegcfartifacts experiment)
await client.functions.deletegcfartifacts({
  project: "my-project",
  dryRun: true
});
```