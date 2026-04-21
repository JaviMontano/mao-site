# Emulators

Firebase emulator suite for local development and testing. Provides local emulation of Firebase services including Authentication, Functions, Firestore, Realtime Database, Storage, Hosting, Pub/Sub, and Extensions.

## Capabilities

### Start Emulators

Starts the Firebase emulator suite for local development.

```typescript { .api }
/**
 * Start Firebase emulators
 * @param options - Emulator configuration options
 * @returns Promise resolving when emulators are started
 */
function start(options?: Options & {
  /** Comma-separated list of emulators to start */
  only?: string;
  /** Node.js inspect flag for Functions emulator */
  inspect?: string;
  /** Import data from export directory */
  import?: string;
  /** Export data on exit */
  exportOnExit?: string | boolean;
  /** Host to bind emulators to */
  host?: string;
  /** Port for emulator UI */
  uiPort?: number;
  /** Disable emulator UI */
  ui?: boolean;
}): Promise<{
  hub: {
    host: string;
    port: number;
  };
  emulators: Record<string, {
    host: string;
    port: number;
  }>;
}>;
```

**Usage Examples:**

```javascript
const client = require("firebase-tools");

// Start all configured emulators
await client.emulators.start({
  project: "my-project"
});

// Start specific emulators
await client.emulators.start({
  project: "my-project",
  only: "functions,firestore,auth"
});

// Start emulators with data import
await client.emulators.start({
  project: "my-project",
  import: "./emulator-data",
  exportOnExit: true
});

// Start emulators on custom host/port
await client.emulators.start({
  project: "my-project",
  host: "0.0.0.0",
  uiPort: 4001,
  ui: true
});
```

### Execute with Emulators

Runs a command with Firebase emulators running, automatically starting and stopping them.

```typescript { .api }
/**
 * Execute command with Firebase emulators
 * @param script - Command/script to execute
 * @param options - Execution options
 * @returns Promise resolving when script completes
 */
function exec(
  script: string,
  options?: Options & {
    /** Comma-separated list of emulators to start */
    only?: string;
    /** Import data from export directory */
    import?: string;
    /** Export data after execution */
    exportOnExit?: string | boolean;
    /** Environment variables for the script */
    env?: Record<string, string>;
  }
): Promise<{
  exitCode: number;
  stdout: string;
  stderr: string;
}>;
```

**Usage Examples:**

```javascript
// Run tests with emulators
await client.emulators.exec("npm test", {
  project: "my-project",
  only: "firestore,auth"
});

// Run script with environment variables
await client.emulators.exec("node test-script.js", {
  project: "my-project",
  env: {
    FIRESTORE_EMULATOR_HOST: "localhost:8080",
    FIREBASE_AUTH_EMULATOR_HOST: "localhost:9099"
  }
});
```

### Export Emulator Data

Exports data from running emulators to a directory.

```typescript { .api }
/**
 * Export emulator data
 * @param options - Export configuration options
 * @returns Promise resolving when export completes
 */
function exportData(options?: Options & {
  /** Export directory path */
  exportPath: string;
  /** Force overwrite existing export */
  force?: boolean;
}): Promise<void>;
```

**Usage Examples:**

```javascript
// Export emulator data
await client.emulators.export({
  project: "my-project",
  exportPath: "./backup-data",
  force: true
});
```

## Available Emulators

### Authentication Emulator

- **Service**: Firebase Authentication
- **Default Port**: 9099
- **Features**: User management, custom claims, email verification
- **Data**: User accounts, custom claims

### Functions Emulator

- **Service**: Cloud Functions
- **Default Port**: 5001
- **Features**: HTTP functions, background functions, callable functions
- **Data**: No persistent data (functions are executed on-demand)

### Firestore Emulator

- **Service**: Cloud Firestore
- **Default Port**: 8080
- **Features**: Document operations, queries, security rules
- **Data**: Documents, collections, security rules

### Realtime Database Emulator

- **Service**: Firebase Realtime Database
- **Default Port**: 9000
- **Features**: Real-time data sync, security rules
- **Data**: JSON data tree, security rules

### Storage Emulator

- **Service**: Cloud Storage
- **Default Port**: 9199
- **Features**: File upload/download, security rules
- **Data**: Files and metadata

### Hosting Emulator

- **Service**: Firebase Hosting
- **Default Port**: 5000
- **Features**: Static file serving, rewrites, redirects
- **Data**: No persistent data (serves files from local directory)

### Pub/Sub Emulator

- **Service**: Cloud Pub/Sub
- **Default Port**: 8085
- **Features**: Topic and subscription management, message publishing
- **Data**: Topics, subscriptions, messages

### Extensions Emulator

- **Service**: Firebase Extensions
- **Default Port**: Various
- **Features**: Extension execution, lifecycle events
- **Data**: Extension state and configurations

### Data Connect Emulator

- **Service**: Firebase Data Connect
- **Default Port**: 9399
- **Features**: GraphQL API, database connections
- **Data**: Database schemas and connections

### Emulator UI

- **Service**: Emulator Suite UI
- **Default Port**: 4000
- **Features**: Visual interface for all emulators
- **Access**: Web-based dashboard for emulator management

## Configuration

Emulator configuration is specified in `firebase.json`:

```json
{
  "emulators": {
    "auth": {
      "host": "localhost",
      "port": 9099
    },
    "functions": {
      "host": "localhost",
      "port": 5001
    },
    "firestore": {
      "host": "localhost",
      "port": 8080
    },
    "database": {
      "host": "localhost",
      "port": 9000
    },
    "hosting": {
      "host": "localhost",
      "port": 5000
    },
    "storage": {
      "host": "localhost",
      "port": 9199
    },
    "pubsub": {
      "host": "localhost",
      "port": 8085
    },
    "ui": {
      "enabled": true,
      "host": "localhost",
      "port": 4000
    },
    "singleProjectMode": true
  }
}
```

## Environment Variables

When emulators are running, they set environment variables for client SDKs:

```bash
FIRESTORE_EMULATOR_HOST=localhost:8080
FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
FIREBASE_DATABASE_EMULATOR_HOST=localhost:9000
FIREBASE_STORAGE_EMULATOR_HOST=localhost:9199
GCLOUD_PROJECT=demo-project
```

These variables automatically configure Firebase client SDKs to connect to local emulators instead of production services.