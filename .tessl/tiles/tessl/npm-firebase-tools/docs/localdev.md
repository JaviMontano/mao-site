# Local Development

Firebase CLI provides comprehensive local development tools including a development server and emulator setup utilities.

## Capabilities

### Development Server

Start a local server for static assets and development.

```typescript { .api }
/**
 * Start a local server for static assets and development
 * @param options - Configuration options
 * @returns Promise resolving when server starts
 */
function serve(options?: Options & {
  /** Port to listen on (default: 5000) */
  port?: number;
  /** Host to listen on (default: localhost) */
  host?: string;
  /** Comma-separated list of targets to serve */
  only?: string;
}): Promise<void>;
```

### Emulator Setup

Set up individual Firebase emulators for local development.

```typescript { .api }
/**
 * Set up Realtime Database emulator
 * @param options - Configuration options
 * @returns Promise resolving when setup completes
 */
function setupEmulatorsDatabase(options?: Options): Promise<void>;

/**
 * Set up Firestore emulator  
 * @param options - Configuration options
 * @returns Promise resolving when setup completes
 */
function setupEmulatorsFirestore(options?: Options): Promise<void>;

/**
 * Set up Pub/Sub emulator
 * @param options - Configuration options
 * @returns Promise resolving when setup completes
 */
function setupEmulatorsPubsub(options?: Options): Promise<void>;

/**
 * Set up Storage emulator
 * @param options - Configuration options
 * @returns Promise resolving when setup completes
 */
function setupEmulatorsStorage(options?: Options): Promise<void>;

/**
 * Set up Emulator UI
 * @param options - Configuration options
 * @returns Promise resolving when setup completes
 */
function setupEmulatorsUi(options?: Options): Promise<void>;

/**
 * Set up Data Connect emulator
 * @param options - Configuration options
 * @returns Promise resolving when setup completes
 */
function setupEmulatorsDataconnect(options?: Options): Promise<void>;
```

## Usage Examples

### Development Server

```typescript
import * as client from "firebase-tools";

// Start development server with default settings
await client.serve({
  project: "my-project"
});

// Start server on custom port and host
await client.serve({
  project: "my-project",
  port: 8080,
  host: "0.0.0.0"
});

// Serve only specific targets
await client.serve({
  project: "my-project",
  port: 3000,
  only: "hosting,functions"
});
```

### Emulator Setup

```typescript
// Set up individual emulators
await client.setup.emulators.database({
  project: "my-project"
});

await client.setup.emulators.firestore({
  project: "my-project"
});

await client.setup.emulators.storage({
  project: "my-project"
});

// Set up Emulator UI
await client.setup.emulators.ui({
  project: "my-project"
});
```

## CLI Usage

### Development Server

```bash
# Start development server with defaults
firebase serve

# Custom port and host
firebase serve --port=8080 --host=0.0.0.0

# Serve specific targets only
firebase serve --only=hosting,functions --port=3000
```

### Emulator Setup

```bash
# Set up individual emulators
firebase setup:emulators:database
firebase setup:emulators:firestore  
firebase setup:emulators:storage
firebase setup:emulators:pubsub
firebase setup:emulators:ui
firebase setup:emulators:dataconnect
```

## Supported Targets

The `serve` command supports the following targets:

- **hosting**: Firebase Hosting static files
- **functions**: Cloud Functions (local execution)
- **database**: Realtime Database (via emulator)
- **firestore**: Firestore (via emulator)

## Configuration

Development server behavior is configured through:

- **firebase.json**: Project configuration file
- **Command options**: Port, host, and target specifications  
- **Environment variables**: Additional runtime configuration

## Notes

- The development server automatically serves static files from the hosting directory
- Functions are executed locally with emulated Firebase services
- Database and Firestore require their respective emulators to be running
- The Emulator UI provides a web interface for managing local Firebase services
- Setup commands download and configure emulator binaries
- Use `--host=0.0.0.0` to allow external connections to the development server