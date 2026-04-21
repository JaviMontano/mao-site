# Utility Commands

Core Firebase CLI utilities for authentication, project management, and general operations.

## Capabilities

### Authentication

#### Login

Authenticates the Firebase CLI to your Google account.

```typescript { .api }
/**
 * Authenticate to Firebase
 * @param options - Authentication options
 * @returns Promise resolving when authentication completes
 */
function login(options?: Options & {
  /** Force re-authentication */
  reauth?: boolean;
  /** Use localhost for auth redirect */
  localhost?: boolean;
}): Promise<void>;
```

#### Login CI

Generates a CI token for use in continuous integration environments.

```typescript { .api }
/**
 * Generate CI authentication token
 * @param options - CI token options
 * @returns Promise resolving to CI token information
 */
function loginCi(options?: Options): Promise<{
  token: string;
  expires?: string;
}>;
```

#### Login Add

Adds an additional Google account for multi-account management.

```typescript { .api }
/**
 * Add additional authentication account
 * @param options - Add account options
 * @returns Promise resolving when account is added
 */
function loginAdd(options?: Options): Promise<void>;
```

#### Login List

Lists all authenticated accounts.

```typescript { .api }
/**
 * List authenticated accounts
 * @param options - Command options
 * @returns Promise resolving to array of account information
 */
function loginList(options?: Options): Promise<Array<{
  email: string;
  active: boolean;
}>>;
```

#### Login Use

Sets the active/default account.

```typescript { .api }
/**
 * Set active authentication account
 * @param email - Email of account to make active
 * @param options - Command options
 * @returns Promise resolving when account is activated
 */
function loginUse(email: string, options?: Options): Promise<void>;
```

#### Logout

Signs out of Firebase and clears authentication.

```typescript { .api }
/**
 * Sign out of Firebase
 * @param options - Logout options
 * @returns Promise resolving when logout completes
 */
function logout(options?: Options): Promise<void>;
```

**Authentication Examples:**

```javascript
const client = require("firebase-tools");

// Login to Firebase
await client.login();

// Login with re-authentication
await client.login({ reauth: true });

// Generate CI token
const ciToken = await client.login.ci();
console.log("CI Token:", ciToken.token);

// Add additional account
await client.login.add();

// List all accounts
const accounts = await client.login.list();
console.log("Authenticated accounts:", accounts);

// Switch active account
await client.login.use("user@example.com");

// Logout
await client.logout();
```

### Project Management

#### Initialize Project

Initializes a Firebase project in the current directory.

```typescript { .api }
/**
 * Initialize Firebase project
 * @param options - Initialization options
 * @returns Promise resolving when initialization completes
 */
function init(options?: Options & {
  /** Services to initialize (comma-separated) */
  only?: string;
  /** Initialize with default settings */
  defaults?: boolean;
}): Promise<void>;
```

#### Use Project

Sets the active Firebase project for the current directory.

```typescript { .api }
/**
 * Set active Firebase project
 * @param projectId - Project ID to activate
 * @param options - Command options
 * @returns Promise resolving when project is activated
 */
function use(projectId: string, options?: Options): Promise<void>;
```

#### Open Project Resources

Opens Firebase project resources in the default browser.

```typescript { .api }
/**
 * Open project resources in browser
 * @param options - Open options
 * @returns Promise resolving when browser opens
 */
function open(options?: Options & {
  /** Specific resource to open */
  resource?: "overview" | "hosting" | "database" | "firestore" | "functions" | "extensions";
}): Promise<void>;
```

**Project Management Examples:**

```javascript
// Initialize project with specific services
await client.init({
  only: "hosting,functions,firestore",
  defaults: false
});

// Set active project
await client.use("my-project-id");

// Open project overview
await client.open({
  project: "my-project",
  resource: "overview"
});

// Open hosting dashboard
await client.open({
  project: "my-project",
  resource: "hosting"
});
```

### Development Server

#### Serve

Starts a local development server for Firebase Hosting.

```typescript { .api }
/**
 * Start local development server
 * @param options - Server options
 * @returns Promise resolving when server stops
 */
function serve(options?: Options & {
  /** Port for the server */
  port?: number;
  /** Host for the server */
  host?: string;
  /** Serve only specific targets */
  only?: string;
}): Promise<void>;
```

**Development Server Examples:**

```javascript
// Start development server
await client.serve({
  project: "my-project",
  port: 5000,
  host: "localhost"
});

// Serve only hosting
await client.serve({
  project: "my-project",
  only: "hosting",
  port: 8080
});
```

### Deployment Targets

#### Target Apply

Applies a deployment target to a resource.

```typescript { .api }
/**
 * Apply deployment target
 * @param type - Target type (hosting, storage, etc.)
 * @param name - Target name
 * @param resource - Resource identifier
 * @param options - Command options
 * @returns Promise resolving when target is applied
 */
function targetApply(
  type: string,
  name: string,
  resource: string,
  options?: Options
): Promise<void>;
```

#### Target Clear

Clears deployment targets for a resource type.

```typescript { .api }
/**
 * Clear deployment targets
 * @param type - Target type to clear
 * @param options - Command options
 * @returns Promise resolving when targets are cleared
 */
function targetClear(type: string, options?: Options): Promise<void>;
```

#### Target Remove

Removes a specific deployment target.

```typescript { .api }
/**
 * Remove deployment target
 * @param type - Target type
 * @param name - Target name
 * @param options - Command options
 * @returns Promise resolving when target is removed
 */
function targetRemove(
  type: string,
  name: string,
  options?: Options
): Promise<void>;
```

#### Target List

Lists all deployment targets.

```typescript { .api }
/**
 * List deployment targets
 * @param options - Command options
 * @returns Promise resolving to targets information
 */
function target(options?: Options): Promise<Record<string, any>>;
```

**Deployment Targets Examples:**

```javascript
// Apply hosting target
await client.target.apply("hosting", "staging", "my-site-staging", {
  project: "my-project"
});

// Apply storage target
await client.target.apply("storage", "images", "my-images-bucket", {
  project: "my-project"
});

// List all targets
const targets = await client.target({
  project: "my-project"
});

// Clear hosting targets
await client.target.clear("hosting", {
  project: "my-project"
});

// Remove specific target
await client.target.remove("hosting", "staging", {
  project: "my-project"
});
```

### Help and Information

#### Help

Displays help information for Firebase CLI commands.

```typescript { .api }
/**
 * Display help information
 * @param command - Specific command to get help for
 * @param options - Help options
 * @returns Promise resolving when help is displayed
 */
function help(command?: string, options?: Options): Promise<void>;
```

**Help Examples:**

```javascript
// Show general help
await client.help();

// Show help for specific command
await client.help("deploy");

// Show help for command group
await client.help("functions");
```

## Environment Variables

Firebase CLI respects several environment variables:

- `FIREBASE_TOKEN`: CI authentication token
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to service account key file
- `FIREBASE_PROJECT`: Default project ID
- `FIREBASE_CONFIG_PATH`: Path to firebase.json
- `FIREBASE_CLI_EXPERIMENTS`: Comma-separated list of enabled experiments

**Environment Usage Examples:**

```bash
# Set CI token
export FIREBASE_TOKEN="your-ci-token"

# Set default project
export FIREBASE_PROJECT="my-default-project"

# Use service account
export GOOGLE_APPLICATION_CREDENTIALS="./service-account.json"

# Enable experiments
export FIREBASE_CLI_EXPERIMENTS="webframeworks,pintags"
```