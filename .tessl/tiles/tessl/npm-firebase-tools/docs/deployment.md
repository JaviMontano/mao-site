# Deployment

Firebase project deployment functionality for deploying code, configuration, and resources to Firebase projects.

## Capabilities

### Deploy

Deploys Firebase project resources to the cloud. Supports selective deployment of specific services.

```typescript { .api }
/**
 * Deploy Firebase project resources
 * @param targets - Array of deployment targets to deploy
 * @param options - Deployment configuration options
 * @returns Promise resolving when deployment completes
 */
function deploy(
  targets?: Array<"database" | "storage" | "firestore" | "functions" | "hosting" | "remoteconfig" | "extensions" | "dataconnect" | "apphosting">,
  options?: Options & {
    /** Only deploy specified targets (comma-separated) */
    only?: string;
    /** Deploy all except specified targets (comma-separated) */
    except?: string;
    /** Force deployment without confirmation */
    force?: boolean;
    /** Deployment message/description */
    message?: string;
    /** Skip functions pre-deploy hooks */
    skipFunctionsPredeployTrigger?: boolean;
    /** Export data before deploying database rules */
    export?: string;
  }
): Promise<{
  status: "success" | "error";
  hosting?: {
    site: string;
    url: string;
    expireTime?: string;
  };
  functions?: Array<{
    name: string;
    status: "deployed" | "failed";
    httpsTrigger?: {
      url: string;
    };
  }>;
}>;
```

**Usage Examples:**

```javascript
const client = require("firebase-tools");

// Deploy everything
await client.deploy(undefined, { 
  project: "my-project" 
});

// Deploy only hosting
await client.deploy(["hosting"], { 
  project: "my-project",
  message: "Deploy new website version"
});

// Deploy functions and firestore
await client.deploy(["functions", "firestore"], { 
  project: "my-project",
  force: true
});

// Deploy using --only syntax
await client.deploy(undefined, { 
  project: "my-project",
  only: "hosting,functions:myFunction"
});

// Deploy everything except database
await client.deploy(undefined, { 
  project: "my-project",
  except: "database"
});
```

## Deployment Targets

### Database

Deploys Firebase Realtime Database rules and indexes.

- **Files**: `database.rules.json`, `.indexOn` rules
- **Scope**: Database security rules and performance indexes
- **Validation**: Rules syntax validation before deployment

### Storage

Deploys Firebase Storage security rules.

- **Files**: `storage.rules`
- **Scope**: Cloud Storage security rules
- **Validation**: Rules syntax validation

### Firestore

Deploys Cloud Firestore security rules and indexes.

- **Files**: `firestore.rules`, `firestore.indexes.json`
- **Scope**: Firestore security rules and composite indexes
- **Validation**: Rules and index validation

### Functions

Deploys Cloud Functions code and configuration.

- **Files**: Functions source code, `package.json`
- **Scope**: Function deployment, environment variables, secrets
- **Features**: Automatic dependency installation, runtime selection

### Hosting

Deploys static website files to Firebase Hosting.

- **Files**: All files in hosting directory (default: `public/`)
- **Scope**: Static website hosting with global CDN
- **Features**: Single-page app support, custom headers, redirects

### Remote Config

Deploys Remote Config templates and parameters.

- **Files**: Remote Config JSON templates
- **Scope**: App configuration parameters and conditions
- **Features**: Gradual rollout, A/B testing support

### Extensions

Deploys Firebase Extensions configuration.

- **Files**: Extension configuration files
- **Scope**: Extension instances and parameters
- **Features**: Extension lifecycle management

### Data Connect

Deploys Firebase Data Connect services and schemas.

- **Files**: Data Connect configuration and GraphQL schemas
- **Scope**: Database connections and GraphQL API
- **Features**: Schema validation and migration

### App Hosting

Deploys Firebase App Hosting applications.

- **Files**: Application source code and configuration
- **Scope**: Full-stack web application hosting
- **Features**: Server-side rendering, dynamic content

## Deployment Configuration

Deployment behavior is controlled by `firebase.json` configuration:

```json
{
  "database": {
    "rules": "database.rules.json"
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "functions": [
    {
      "source": "functions",
      "codebase": "default",
      "runtime": "nodejs20"
    }
  ],
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "storage": {
    "rules": "storage.rules"
  },
  "remoteconfig": {
    "template": "remoteconfig.template.json"
  }
}
```

## Error Handling

Deployment can fail due to various reasons:

- **Syntax Errors**: Invalid rules or configuration syntax
- **Permission Errors**: Insufficient IAM permissions
- **Quota Errors**: Exceeding service quotas or limits
- **Network Errors**: Connectivity issues during deployment
- **Build Errors**: Function compilation or dependency issues

**Common Error Patterns:**

```javascript
try {
  await client.deploy(["functions"], { project: "my-project" });
} catch (error) {
  if (error.status === 403) {
    // Permission denied
    console.error("Insufficient permissions for deployment");
  } else if (error.status === 400) {
    // Bad request - likely syntax error
    console.error("Configuration error:", error.message);
  } else {
    // Other deployment errors
    console.error("Deployment failed:", error.message);
  }
}
```