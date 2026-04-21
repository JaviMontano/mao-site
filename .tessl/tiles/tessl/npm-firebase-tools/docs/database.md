# Database Operations

Firebase Realtime Database operations for reading, writing, and managing JSON data with real-time synchronization capabilities.

## Capabilities

### Get Data

Retrieves data from a specific path in the Firebase Realtime Database.

```typescript { .api }
/**
 * Get data from Firebase Realtime Database
 * @param path - Database path to read from
 * @param options - Command options
 * @returns Promise resolving to the data at the specified path
 */
function get(
  path: string,
  options?: Options & {
    /** Pretty print JSON output */
    pretty?: boolean;
    /** Output in shallow mode */
    shallow?: boolean;
    /** Limit number of results */
    limitToFirst?: number;
    /** Limit number of results from end */
    limitToLast?: number;
    /** Order by specific child key */
    orderBy?: string;
    /** Start at specific value */
    startAt?: string | number;
    /** End at specific value */
    endAt?: string | number;
    /** Equal to specific value */
    equalTo?: string | number;
  }
): Promise<any>;
```

**Usage Examples:**

```javascript
const client = require("firebase-tools");

// Get all data at root
const rootData = await client.database.get("/", {
  project: "my-project"
});

// Get user data
const userData = await client.database.get("/users/user123", {
  project: "my-project",
  pretty: true
});

// Get data with query
const recentPosts = await client.database.get("/posts", {
  project: "my-project",
  orderBy: "timestamp",
  limitToLast: 10
});
```

### Set Data

Sets data at a specific path in the Firebase Realtime Database.

```typescript { .api }
/**
 * Set data in Firebase Realtime Database
 * @param path - Database path to write to
 * @param data - Data to write (JSON object, string, number, boolean, or null)
 * @param options - Command options
 * @returns Promise resolving when data is written
 */
function set(
  path: string,
  data: any,
  options?: Options & {
    /** Confirm destructive operations */
    confirm?: boolean;
  }
): Promise<void>;
```

**Usage Examples:**

```javascript
// Set user data
await client.database.set("/users/user123", {
  name: "John Doe",
  email: "john@example.com",
  lastLogin: Date.now()
}, { project: "my-project" });

// Set primitive value
await client.database.set("/settings/theme", "dark", {
  project: "my-project"
});

// Set null to delete
await client.database.set("/temp/session123", null, {
  project: "my-project"
});
```

### Update Data

Updates specific fields at a path without overwriting the entire object.

```typescript { .api }
/**
 * Update data in Firebase Realtime Database
 * @param path - Database path to update
 * @param data - Partial data object with fields to update
 * @param options - Command options
 * @returns Promise resolving when data is updated
 */
function update(
  path: string,
  data: Record<string, any>,
  options?: Options
): Promise<void>;
```

**Usage Examples:**

```javascript
// Update user fields
await client.database.update("/users/user123", {
  lastLogin: Date.now(),
  loginCount: 42
}, { project: "my-project" });

// Multi-path update
await client.database.update("/", {
  "users/user123/status": "online",
  "sessions/session456/active": true,
  "stats/totalUsers": 1000
}, { project: "my-project" });
```

### Push Data

Adds data to a list with an auto-generated key.

```typescript { .api }
/**
 * Push data to Firebase Realtime Database list
 * @param path - Database path to push to
 * @param data - Data to push
 * @param options - Command options
 * @returns Promise resolving to object with the generated key
 */
function push(
  path: string,
  data: any,
  options?: Options
): Promise<{
  name: string;
}>;
```

**Usage Examples:**

```javascript
// Push new message
const result = await client.database.push("/messages", {
  text: "Hello, world!",
  author: "user123",
  timestamp: Date.now()
}, { project: "my-project" });

console.log("Generated key:", result.name);

// Push to notifications
await client.database.push("/notifications/user123", {
  type: "message",
  message: "You have a new message",
  read: false
}, { project: "my-project" });
```

### Remove Data

Removes data from a specific path in the database.

```typescript { .api }
/**
 * Remove data from Firebase Realtime Database
 * @param path - Database path to remove
 * @param options - Command options
 * @returns Promise resolving when data is removed
 */
function remove(
  path: string,
  options?: Options & {
    /** Confirm destructive operations */
    confirm?: boolean;
  }
): Promise<void>;
```

**Usage Examples:**

```javascript
// Remove specific user
await client.database.remove("/users/user123", {
  project: "my-project",
  confirm: true
});

// Remove old messages
await client.database.remove("/messages/oldMessage", {
  project: "my-project"
});
```

### Import Data

Imports JSON data from a file into the database.

```typescript { .api }
/**
 * Import data from JSON file
 * @param options - Import options
 * @returns Promise resolving when import completes
 */
function importData(options: Options & {
  /** Path to JSON file to import */
  dataFile: string;
  /** Database path to import to (default: /) */
  path?: string;
  /** Disable authentication triggers during import */
  disableTriggers?: boolean;
}): Promise<void>;
```

**Usage Examples:**

```javascript
// Import data from file
await client.database.import({
  project: "my-project",
  dataFile: "./backup.json",
  path: "/",
  disableTriggers: true
});

// Import to specific path
await client.database.import({
  project: "my-project",
  dataFile: "./users.json",
  path: "/users"
});
```

### Profile Database Usage

Profiles database operations to analyze performance and usage patterns.

```typescript { .api }
/**
 * Profile database usage and performance
 * @param options - Profiling options
 * @returns Promise resolving when profiling completes
 */
function profile(options?: Options & {
  /** Duration to profile in seconds */
  duration?: number;
  /** Output file for profiling results */
  output?: string;
  /** Include raw profiling data */
  raw?: boolean;
}): Promise<void>;
```

**Usage Examples:**

```javascript
// Profile for 30 seconds
await client.database.profile({
  project: "my-project",
  duration: 30,
  output: "./profile-results.json"
});
```

## Database Instance Management

### Create Instance

Creates a new Realtime Database instance.

```typescript { .api }
/**
 * Create new database instance
 * @param options - Creation options
 * @returns Promise resolving when instance is created
 */
function instancesCreate(options: Options & {
  /** Instance ID */
  instanceId: string;
  /** Database location/region */
  location: string;
}): Promise<void>;
```

### List Instances

Lists all database instances in the project.

```typescript { .api }
/**
 * List database instances
 * @param options - Command options
 * @returns Promise resolving to array of database instances
 */
function instancesList(options?: Options): Promise<Array<{
  name: string;
  project: string;
  databaseUrl: string;
  type: string;
  state: string;
}>>;
```

**Instance Management Examples:**

```javascript
// List database instances
const instances = await client.database.instances.list({
  project: "my-project"
});

// Create new instance
await client.database.instances.create({
  project: "my-project",
  instanceId: "my-app-staging",
  location: "us-central1"
});
```

## Database Settings

### Get Settings

Retrieves database settings and configuration.

```typescript { .api }
/**
 * Get database settings
 * @param options - Command options
 * @returns Promise resolving to database settings
 */
function settingsGet(options?: Options): Promise<{
  databaseUrl: string;
  rules: string;
  [key: string]: any;
}>;
```

### Set Settings

Updates database settings and configuration.

```typescript { .api }
/**
 * Set database settings
 * @param settings - Settings to update
 * @param options - Command options
 * @returns Promise resolving when settings are updated
 */
function settingsSet(
  settings: Record<string, any>,
  options?: Options
): Promise<void>;
```

**Settings Examples:**

```javascript
// Get current settings
const settings = await client.database.settings.get({
  project: "my-project"
});

// Update settings
await client.database.settings.set({
  "some.setting": "new-value"
}, { project: "my-project" });
```