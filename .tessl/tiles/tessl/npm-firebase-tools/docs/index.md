# Firebase CLI Tools

Firebase CLI is a comprehensive command-line interface tool that enables developers to test, manage, and deploy Firebase projects from the terminal. It provides extensive functionality for deploying code and assets to Firebase projects, running local web servers for Firebase Hosting sites, interacting with Firebase databases, managing Firebase Auth users through import/export operations, and controlling Firebase emulators for local development and testing.

## Package Information

- **Package Name**: firebase-tools
- **Package Type**: npm
- **Language**: TypeScript
- **Installation**: `npm install firebase-tools` (global: `npm install -g firebase-tools`)
- **CLI Binary**: `firebase`
- **Node.js Support**: >= 20.0.0 || >= 22.0.0

## Core Imports

For programmatic usage as a Node.js module:

```javascript
const client = require("firebase-tools");
```

TypeScript:

```typescript
import * as client from "firebase-tools";
```

## Basic Usage

### CLI Usage

```bash
# Login to Firebase
firebase login

# Initialize a project
firebase init

# Deploy to Firebase
firebase deploy

# Start local emulators
firebase emulators:start
```

### Programmatic Usage

```javascript
const client = require("firebase-tools");

// Deploy hosting
await client.deploy(["hosting"], { 
  project: "my-project",
  cwd: process.cwd()
});

// List Firebase apps
const apps = await client.apps.list("web", { 
  project: "my-project" 
});

// Start emulators programmatically
await client.emulators.start({
  only: "hosting,functions",
  project: "my-project"
});
```

## Architecture

Firebase CLI is built around several key components:

- **Client Object**: Main exported object containing all programmatic APIs organized by namespace
- **Command System**: Commander.js-based CLI with 200+ commands across 15+ service areas
- **Authentication**: Multiple auth methods including local login, service accounts, and CI tokens
- **Emulator Suite**: Local development environment for all Firebase services
- **Deployment Engine**: Handles deployment of code and configuration to Firebase projects
- **Configuration Management**: firebase.json-based project configuration system

## Global Types

```typescript { .api }
interface Options {
  /** Current working directory */
  cwd?: string;
  /** Path to firebase.json configuration */
  configPath?: string;
  /** Firebase project ID */
  project?: string;
  /** Output JSON format */
  json?: boolean;
  /** Non-interactive mode */
  nonInteractive?: boolean;
  /** Debug mode */
  debug?: boolean;
  /** Google account email */
  account?: string;
  /** Authentication token (deprecated) */
  token?: string;
  /** Force interactive prompts */
  interactive?: boolean;
}

class FirebaseError extends Error {
  /** Exit code for CLI */
  exit: number;
  /** HTTP status code */
  status: number;
  /** Additional error context */
  context: unknown;
  /** Child errors */
  children: unknown[];
  
  constructor(message: string, options?: {
    exit?: number;
    status?: number;
    context?: unknown;
    children?: unknown[];
  });
}
```

## Core API

```typescript { .api }
interface FirebaseClient {
  /** Commander.js program instance */
  cli: any;
  /** Logger utilities */
  logger: any;
  /** Error handling function */
  errorOut: (error: FirebaseError) => void;
  /** Get command by name */
  getCommand: (name: string) => any;
}
```

## Capabilities

### App Distribution

Firebase App Distribution for distributing pre-release versions of mobile apps to testers.

```typescript { .api }
function distribute(options: Options & {
  file: string;
  releaseNotes?: string;
  groups?: string;
  testers?: string;
}): Promise<void>;
```

[App Distribution](./appdistribution.md)

### App Management

Create and manage Firebase applications within your project.

```typescript { .api }
function create(
  platform?: "web" | "ios" | "android",
  displayName?: string,
  options?: Options & { packageName?: string; bundleId?: string; }
): Promise<any>;

function list(
  platform?: "web" | "ios" | "android",
  options?: Options
): Promise<any[]>;
```

[App Management](./apps.md)

### Authentication

Import and export Firebase Authentication user accounts.

```typescript { .api }
function authExport(options: Options & {
  format: "csv" | "json";
  exportPath: string;
}): Promise<void>;

function authUpload(options: Options & {
  dataFile: string;
  hashAlgo?: string;
  hashKey?: string;
  rounds?: number;
}): Promise<void>;
```

[Authentication](./authentication.md)

### Database Operations

Firebase Realtime Database data manipulation and management.

```typescript { .api }
function databaseGet(path: string, options?: Options): Promise<any>;
function databaseSet(path: string, data: any, options?: Options): Promise<void>;
function databaseUpdate(path: string, data: any, options?: Options): Promise<void>;
function databaseRemove(path: string, options?: Options): Promise<void>;
```

[Database Operations](./database.md)

### Deployment

Deploy Firebase project resources including hosting, functions, database rules, and more.

```typescript { .api }
function deploy(
  targets?: Array<"database" | "storage" | "firestore" | "functions" | "hosting" | "remoteconfig" | "extensions" | "dataconnect" | "apphosting">,
  options?: Options & {
    only?: string;
    except?: string;
    force?: boolean;
    message?: string;
  }
): Promise<void>;
```

[Deployment](./deployment.md)

### Emulators

Local Firebase emulator suite for development and testing.

```typescript { .api }
function emulatorsStart(options?: Options & {
  only?: string;
  inspect?: string;
  port?: number;
  host?: string;
  ui?: boolean;
}): Promise<void>;

function emulatorsExec(script: string, options?: Options): Promise<void>;
```

[Emulators](./emulators.md)

### Extensions

Firebase Extensions marketplace and management.

```typescript { .api }
function extInstall(
  extensionName: string,
  options?: Options & {
    params?: Record<string, any>;
    instanceId?: string;
  }
): Promise<void>;

function extList(options?: Options): Promise<any[]>;
```

[Extensions](./extensions.md)

### Firestore

Cloud Firestore database operations and management.

```typescript { .api }
function firestoreDelete(
  path: string,
  options?: Options & {
    recursive?: boolean;
    shallow?: boolean;
    allCollections?: boolean;
  }
): Promise<void>;
```

[Firestore](./firestore.md)

### Functions

Cloud Functions deployment, configuration, and management.

```typescript { .api }
function functionsList(options?: Options): Promise<any[]>;
function functionsDelete(functionName: string, options?: Options): Promise<void>;
function functionsLog(options?: Options & {
  lines?: number;
  filter?: string;
  open?: boolean;
}): Promise<void>;
```

[Functions](./functions.md)

### Hosting

Firebase Hosting website deployment and management.

```typescript { .api }
function hostingDisable(options?: Options): Promise<void>;
function hostingClone(
  source: string,
  target: string,
  options?: Options
): Promise<void>;
```

[Hosting](./hosting.md)

### Project Management

Firebase project creation and configuration.

```typescript { .api }
function projectsList(options?: Options): Promise<any[]>;
function projectsCreate(
  projectId: string,
  options?: Options & {
    displayName?: string;
    organization?: string;
  }
): Promise<any>;
```

[Project Management](./projects.md)

### Remote Config

Firebase Remote Config template management.

```typescript { .api }
function remoteConfigGet(options?: Options): Promise<any>;
function remoteConfigRollback(
  versionNumber: string,
  options?: Options
): Promise<void>;
```

[Remote Config](./remoteconfig.md)

### App Hosting

Firebase App Hosting for building and deploying full-stack applications.

```typescript { .api }
function apphostingBackendsList(options?: Options): Promise<any[]>;
function apphostingBackendsCreate(
  backendId: string,
  options?: Options & {
    location?: string;
    serviceAccount?: string;
  }
): Promise<any>;
```

[App Hosting](./apphosting.md)

### App Testing

Firebase App Testing for device testing and quality assurance.

```typescript { .api }
function apptestingExecute(options?: Options & {
  testType?: string;
  deviceSpecs?: string;
}): Promise<void>;
```

[App Testing](./apptesting.md)

### Crashlytics

Firebase Crashlytics for crash reporting and symbol management.

```typescript { .api }
function crashlyticsSymbolsUpload(
  symbolFiles: string[],
  options?: Options & {
    app?: string;
    generator?: "breakpad" | "csym";
    dryRun?: boolean;
  }
): Promise<void>;
```

[Crashlytics](./crashlytics.md)

### Data Connect

Firebase Data Connect for managed PostgreSQL with type-safe SDK generation.

```typescript { .api }
function dataconnectServicesList(options?: Options): Promise<any[]>;
function dataconnectSqlDiff(options?: Options): Promise<void>;
function dataconnectSdkGenerate(options?: Options): Promise<void>;
```

[Data Connect](./dataconnect.md)

### Experiments

Firebase Labs experiments management for beta features.

```typescript { .api }
function experimentsList(options?: Options): Promise<any[]>;
function experimentsEnable(experiment: string, options?: Options): Promise<void>;
function experimentsDisable(experiment: string, options?: Options): Promise<void>;
```

[Experiments](./experiments.md)

### Local Development

Local development server and setup utilities.

```typescript { .api }
function serve(options?: Options & {
  port?: number;
  host?: string;
  only?: string;
}): Promise<void>;

function setupEmulatorsDatabase(options?: Options): Promise<void>;
function setupEmulatorsFirestore(options?: Options): Promise<void>;
```

[Local Development](./localdev.md)

### Target Management

Deployment target configuration and management.

```typescript { .api }
function target(options?: Options): Promise<void>;
function targetApply(
  type: string,
  target: string,
  resource: string,
  options?: Options
): Promise<void>;
```

[Target Management](./targets.md)

### Utility Commands

Core CLI utilities and authentication.

```typescript { .api }
function init(options?: Options): Promise<void>;
function login(options?: Options & { reauth?: boolean }): Promise<void>;
function logout(options?: Options): Promise<void>;
function use(projectId: string, options?: Options): Promise<void>;
```

[Utility Commands](./utilities.md)