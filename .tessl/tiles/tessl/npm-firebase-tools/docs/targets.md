# Target Management

Firebase CLI target management for configuring deployment targets and resource mappings in complex project setups.

## Capabilities

### Target Configuration

Manage deployment targets and resource mappings.

```typescript { .api }
/**
 * Display current deployment target configuration
 * @param options - Configuration options
 * @returns Promise resolving when target display completes
 */
function target(options?: Options): Promise<void>;

/**
 * Apply a deployment target configuration
 * @param type - Target type (hosting, storage, database, etc.)
 * @param target - Target name
 * @param resource - Resource identifier
 * @param options - Configuration options
 * @returns Promise resolving when target is applied
 */
function targetApply(
  type: string,
  target: string,
  resource: string,
  options?: Options
): Promise<void>;

/**
 * Clear deployment target configuration
 * @param type - Target type to clear
 * @param target - Target name to clear
 * @param options - Configuration options
 * @returns Promise resolving when target is cleared
 */
function targetClear(
  type: string,
  target: string,
  options?: Options
): Promise<void>;

/**
 * Remove a deployment target configuration
 * @param type - Target type
 * @param target - Target name  
 * @param resource - Resource identifier
 * @param options - Configuration options
 * @returns Promise resolving when target is removed
 */
function targetRemove(
  type: string,
  target: string,
  resource: string,
  options?: Options
): Promise<void>;
```

## Usage Examples

### Target Management

```typescript
import * as client from "firebase-tools";

// Display current target configuration
await client.target({
  project: "my-project"
});

// Apply hosting target configuration
await client.target.apply("hosting", "production", "my-site-prod", {
  project: "my-project"
});

await client.target.apply("hosting", "staging", "my-site-staging", {
  project: "my-project"
});

// Apply storage target configuration
await client.target.apply("storage", "production", "my-bucket-prod", {
  project: "my-project"
});

// Clear a target
await client.target.clear("hosting", "staging", {
  project: "my-project"
});

// Remove a specific resource from target
await client.target.remove("hosting", "production", "my-site-prod", {
  project: "my-project"
});
```

## CLI Usage

### Target Configuration

```bash
# Display current targets
firebase target

# Apply hosting targets
firebase target:apply hosting production my-site-prod
firebase target:apply hosting staging my-site-staging

# Apply storage targets  
firebase target:apply storage production my-bucket-prod
firebase target:apply storage staging my-bucket-staging

# Apply database targets
firebase target:apply database production my-db-prod
firebase target:apply database staging my-db-staging

# Clear targets
firebase target:clear hosting staging
firebase target:clear storage production

# Remove specific resources
firebase target:remove hosting production my-site-prod
firebase target:remove storage staging my-bucket-staging
```

## Target Types

Supported target types include:

- **hosting**: Firebase Hosting sites
- **storage**: Cloud Storage buckets  
- **database**: Realtime Database instances
- **firestore**: Firestore databases
- **functions**: Cloud Functions regions

## Configuration

Targets are stored in `.firebaserc` file:

```json
{
  "projects": {
    "default": "my-project"
  },
  "targets": {
    "my-project": {
      "hosting": {
        "production": ["my-site-prod"],
        "staging": ["my-site-staging"]
      },
      "storage": {
        "production": ["my-bucket-prod"],
        "staging": ["my-bucket-staging"]
      }
    }
  }
}
```

## Deployment with Targets

Use targets in deployment commands:

```bash
# Deploy to specific hosting target
firebase deploy --only hosting:production

# Deploy to multiple targets
firebase deploy --only hosting:staging,storage:staging

# Deploy functions to specific target
firebase deploy --only functions --project=staging
```

## Usage Scenarios

### Multi-Environment Setup

```typescript
// Configure production environment
await client.target.apply("hosting", "prod", "my-app-prod", { project: "my-project" });
await client.target.apply("storage", "prod", "my-storage-prod", { project: "my-project" });

// Configure staging environment  
await client.target.apply("hosting", "staging", "my-app-staging", { project: "my-project" });
await client.target.apply("storage", "staging", "my-storage-staging", { project: "my-project" });
```

### Multi-Site Hosting

```typescript
// Configure multiple hosting sites
await client.target.apply("hosting", "blog", "my-blog-site", { project: "my-project" });
await client.target.apply("hosting", "docs", "my-docs-site", { project: "my-project" });
await client.target.apply("hosting", "admin", "my-admin-site", { project: "my-project" });
```

## Notes

- Targets enable deployment to specific resources in multi-environment setups
- Configuration is stored locally in `.firebaserc` file
- Targets must be configured before using them in deployment commands
- Multiple resources can be assigned to the same target name
- Use targets with `--only` flag to deploy to specific environments
- Target configuration is project-specific and can be shared across team members