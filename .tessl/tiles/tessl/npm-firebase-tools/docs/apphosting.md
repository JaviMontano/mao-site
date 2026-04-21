# App Hosting

Firebase App Hosting provides a comprehensive platform for building and deploying full-stack applications with managed backends, secrets management, and automated rollouts.

## Capabilities

### Backend Management

Manage App Hosting backends for your applications.

```typescript { .api }
/**
 * List all App Hosting backends in the project
 * @param options - Configuration options
 * @returns Promise resolving to array of backend objects
 */
function apphostingBackendsList(options?: Options): Promise<any[]>;

/**
 * Create a new App Hosting backend
 * @param backendId - Unique identifier for the backend
 * @param options - Configuration options
 * @returns Promise resolving to created backend object
 */
function apphostingBackendsCreate(
  backendId: string,
  options?: Options & {
    location?: string;
    serviceAccount?: string;
  }
): Promise<any>;

/**
 * Get details of a specific App Hosting backend
 * @param backendId - Backend identifier
 * @param options - Configuration options
 * @returns Promise resolving to backend details
 */
function apphostingBackendsGet(
  backendId: string,
  options?: Options
): Promise<any>;

/**
 * Delete an App Hosting backend
 * @param backendId - Backend identifier
 * @param options - Configuration options
 * @returns Promise resolving when deletion completes
 */
function apphostingBackendsDelete(
  backendId: string,
  options?: Options
): Promise<void>;
```

### Secrets Management

Manage secrets for App Hosting backends.

```typescript { .api }
/**
 * Set a secret value for App Hosting
 * @param secretId - Secret identifier
 * @param options - Configuration options
 * @returns Promise resolving when secret is set
 */
function apphostingSecretsSet(
  secretId: string,
  options?: Options & {
    data?: string;
    dataFile?: string;
  }
): Promise<void>;

/**
 * Grant access to a secret for App Hosting
 * @param secretId - Secret identifier
 * @param options - Configuration options
 * @returns Promise resolving when access is granted
 */
function apphostingSecretsGrantaccess(
  secretId: string,
  options?: Options & {
    member?: string;
    role?: string;
  }
): Promise<void>;

/**
 * Describe a secret for App Hosting
 * @param secretId - Secret identifier
 * @param options - Configuration options
 * @returns Promise resolving to secret description
 */
function apphostingSecretsDescribe(
  secretId: string,
  options?: Options
): Promise<any>;

/**
 * Access a secret value for App Hosting
 * @param secretId - Secret identifier
 * @param options - Configuration options
 * @returns Promise resolving to secret value
 */
function apphostingSecretsAccess(
  secretId: string,
  options?: Options
): Promise<string>;
```

### Rollout Management

Manage deployments and rollouts for App Hosting backends.

```typescript { .api }
/**
 * Create a new rollout for App Hosting backend
 * @param rolloutId - Rollout identifier
 * @param options - Configuration options
 * @returns Promise resolving to created rollout
 */
function apphostingRolloutsCreate(
  rolloutId: string,
  options?: Options & {
    backend?: string;
    codebase?: string;
  }
): Promise<any>;

/**
 * List rollouts for App Hosting backend
 * @param options - Configuration options
 * @returns Promise resolving to array of rollouts
 */
function apphostingRolloutsList(options?: Options): Promise<any[]>;
```

## Usage Examples

### Basic Backend Management

```typescript
import * as client from "firebase-tools";

// List all backends
const backends = await client.apphosting.backends.list({
  project: "my-project"
});

// Create a new backend
const newBackend = await client.apphosting.backends.create("my-backend", {
  project: "my-project",
  location: "us-central1",
  serviceAccount: "my-service-account@my-project.iam.gserviceaccount.com"
});

// Get backend details
const backend = await client.apphosting.backends.get("my-backend", {
  project: "my-project"
});
```

### Secrets Management

```typescript
// Set a secret
await client.apphosting.secrets.set("my-secret", {
  project: "my-project",
  data: "secret-value"
});

// Grant access to secret
await client.apphosting.secrets.grantaccess("my-secret", {
  project: "my-project",
  member: "user@example.com",
  role: "roles/secretmanager.secretAccessor"
});
```

### Rollout Management

```typescript
// Create a rollout
const rollout = await client.apphosting.rollouts.create("rollout-1", {
  project: "my-project",
  backend: "my-backend",
  codebase: "main"
});

// List rollouts
const rollouts = await client.apphosting.rollouts.list({
  project: "my-project"
});
```