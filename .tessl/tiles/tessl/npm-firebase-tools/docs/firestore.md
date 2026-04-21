# Firestore

Cloud Firestore database operations for managing NoSQL documents, collections, indexes, and backups in Firebase projects.

## Capabilities

### Delete Documents

Deletes documents and collections from Cloud Firestore with various deletion modes.

```typescript { .api }
/**
 * Delete Firestore documents or collections
 * @param path - Firestore path to delete (document or collection)
 * @param options - Deletion configuration options
 * @returns Promise resolving when deletion completes
 */
function firestoreDelete(
  path: string,
  options?: Options & {
    /** Recursively delete subcollections */
    recursive?: boolean;
    /** Delete only at the specified path level */
    shallow?: boolean;
    /** Delete all collections (use with root path) */
    allCollections?: boolean;
    /** Yes to all prompts */
    yes?: boolean;
  }
): Promise<{
  deletedDocuments: number;
  deletedCollections: number;
}>;
```

**Usage Examples:**

```javascript
const client = require("firebase-tools");

// Delete a specific document
await client.firestore.delete("users/user123", {
  project: "my-project"
});

// Delete entire collection recursively
await client.firestore.delete("posts", {
  project: "my-project",
  recursive: true,
  yes: true
});

// Delete only documents in collection (not subcollections) 
await client.firestore.delete("comments", {
  project: "my-project",
  shallow: true
});

// Delete all collections (dangerous!)
await client.firestore.delete("/", {
  project: "my-project",
  allCollections: true,
  yes: true
});
```

### List Indexes

Lists all composite indexes in the Firestore database.

```typescript { .api }
/**
 * List Firestore composite indexes
 * @param options - Command options
 * @returns Promise resolving when indexes are listed
 */
function indexes(options?: Options): Promise<void>;
```

**Usage Examples:**

```javascript
// List all indexes
await client.firestore.indexes({
  project: "my-project"
});
```

### List Locations

Lists available Firestore locations/regions.

```typescript { .api }
/**
 * List available Firestore locations
 * @param options - Command options
 * @returns Promise resolving to array of location information
 */
function locations(options?: Options): Promise<Array<{
  locationId: string;
  name: string;
  type: string;
}>>;
```

**Usage Examples:**

```javascript
// List available locations
const locations = await client.firestore.locations({
  project: "my-project"
});

console.log("Available locations:", locations);
```

## Database Management

### List Databases

Lists all Firestore databases in the project.

```typescript { .api }
/**
 * List Firestore databases
 * @param options - Command options
 * @returns Promise resolving to array of database information
 */
function databasesList(options?: Options): Promise<Array<{
  name: string;
  uid: string;
  createTime: string;
  updateTime: string;
  locationId: string;
  type: string;
  concurrencyMode: string;
  appEngineIntegrationMode: string;
  keyPrefix: string;
  deleteProtectionState: string;
  etag: string;
}>>;
```

### Get Database

Gets detailed information about a specific Firestore database.

```typescript { .api }
/**
 * Get Firestore database information
 * @param options - Command options
 * @returns Promise resolving to database details
 */
function databasesGet(options?: Options & {
  /** Database ID (default: '(default)') */
  database?: string;
}): Promise<{
  name: string;
  uid: string;
  createTime: string;
  updateTime: string;
  locationId: string;
  type: string;
  concurrencyMode: string;
  appEngineIntegrationMode: string;
  keyPrefix: string;
  deleteProtectionState: string;
  etag: string;
}>;
```

### Create Database

Creates a new Firestore database.

```typescript { .api }
/**
 * Create Firestore database
 * @param options - Database creation options
 * @returns Promise resolving when database is created
 */
function databasesCreate(options: Options & {
  /** Database ID */
  database: string;
  /** Location/region for the database */
  location: string;
  /** Database type: 'firestore-native' or 'datastore-mode' */
  type?: "firestore-native" | "datastore-mode";
  /** Delete protection state */
  deleteProtectionState?: "DELETE_PROTECTION_ENABLED" | "DELETE_PROTECTION_DISABLED";
}): Promise<void>;
```

### Update Database

Updates Firestore database configuration.

```typescript { .api }
/**
 * Update Firestore database
 * @param options - Database update options
 * @returns Promise resolving when database is updated
 */
function databasesUpdate(options: Options & {
  /** Database ID */
  database: string;
  /** Delete protection state */
  deleteProtectionState?: "DELETE_PROTECTION_ENABLED" | "DELETE_PROTECTION_DISABLED";
}): Promise<void>;
```

### Delete Database

Deletes a Firestore database.

```typescript { .api }
/**
 * Delete Firestore database
 * @param options - Database deletion options
 * @returns Promise resolving when database is deleted
 */
function databasesDelete(options: Options & {
  /** Database ID to delete */
  database: string;
  /** Force deletion without confirmation */
  force?: boolean;
}): Promise<void>;
```

### Restore Database

Restores a Firestore database from a backup.

```typescript { .api }
/**
 * Restore Firestore database from backup
 * @param options - Restore options
 * @returns Promise resolving when restore completes
 */
function databasesRestore(options: Options & {
  /** Source backup name */
  backup: string;
  /** Destination database ID */
  destination: string;
}): Promise<void>;
```

**Database Management Examples:**

```javascript
// List all databases
const databases = await client.firestore.databases.list({
  project: "my-project"
});

// Get default database info
const dbInfo = await client.firestore.databases.get({
  project: "my-project"
});

// Create new database
await client.firestore.databases.create({
  project: "my-project",
  database: "test-db",
  location: "us-central1",
  type: "firestore-native"
});

// Update database settings
await client.firestore.databases.update({
  project: "my-project", 
  database: "test-db",
  deleteProtectionState: "DELETE_PROTECTION_ENABLED"
});

// Delete database
await client.firestore.databases.delete({
  project: "my-project",
  database: "test-db",
  force: true
});
```

## Backup Management

### List Backups

Lists all Firestore backups.

```typescript { .api }
/**
 * List Firestore backups
 * @param options - Command options
 * @returns Promise resolving to array of backup information
 */
function backupsList(options?: Options): Promise<Array<{
  name: string;
  database: string;
  databaseUid: string;
  snapshotTime: string;
  expireTime: string;
  state: string;
}>>;
```

### Get Backup

Gets detailed information about a specific backup.

```typescript { .api }
/**
 * Get Firestore backup information
 * @param options - Command options
 * @returns Promise resolving to backup details
 */
function backupsGet(options: Options & {
  /** Backup name/ID */
  backup: string;
}): Promise<{
  name: string;
  database: string;
  databaseUid: string;
  snapshotTime: string;
  expireTime: string;
  state: string;
}>;
```

### Delete Backup

Deletes a Firestore backup.

```typescript { .api }
/**
 * Delete Firestore backup
 * @param options - Backup deletion options
 * @returns Promise resolving when backup is deleted
 */
function backupsDelete(options: Options & {
  /** Backup name/ID to delete */
  backup: string;
}): Promise<void>;
```

## Backup Schedules

### List Backup Schedules

Lists all backup schedules for a database.

```typescript { .api }
/**
 * List Firestore backup schedules
 * @param options - Command options
 * @returns Promise resolving to array of schedule information
 */
function backupsSchedulesList(options?: Options & {
  /** Database ID */
  database?: string;
}): Promise<Array<{
  name: string;
  createTime: string;
  updateTime: string;
  retention: string;
  dailyRecurrence?: any;
  weeklyRecurrence?: any;
}>>;
```

### Create Backup Schedule

Creates a new backup schedule.

```typescript { .api }
/**
 * Create Firestore backup schedule
 * @param options - Schedule creation options
 * @returns Promise resolving when schedule is created
 */
function backupsSchedulesCreate(options: Options & {
  /** Database ID */
  database: string;
  /** Backup retention period */
  retention: string;
  /** Daily recurrence configuration */
  dailyRecurrence?: any;
  /** Weekly recurrence configuration */
  weeklyRecurrence?: any;
}): Promise<void>;
```

### Update Backup Schedule

Updates an existing backup schedule.

```typescript { .api }
/**
 * Update Firestore backup schedule
 * @param options - Schedule update options
 * @returns Promise resolving when schedule is updated
 */
function backupsSchedulesUpdate(options: Options & {
  /** Schedule name/ID */
  schedule: string;
  /** Backup retention period */
  retention?: string;
}): Promise<void>;
```

### Delete Backup Schedule

Deletes a backup schedule.

```typescript { .api }
/**
 * Delete Firestore backup schedule
 * @param options - Schedule deletion options
 * @returns Promise resolving when schedule is deleted
 */
function backupsSchedulesDelete(options: Options & {
  /** Schedule name/ID to delete */
  schedule: string;
}): Promise<void>;
```

**Backup Examples:**

```javascript
// List all backups
const backups = await client.firestore.backups.list({
  project: "my-project"
});

// Get backup details
const backup = await client.firestore.backups.get({
  project: "my-project",
  backup: "backup-id"
});

// List backup schedules
const schedules = await client.firestore.backups.schedules.list({
  project: "my-project",
  database: "(default)"
});

// Create daily backup schedule
await client.firestore.backups.schedules.create({
  project: "my-project",
  database: "(default)",
  retention: "14d",
  dailyRecurrence: {}
});

// Delete backup
await client.firestore.backups.delete({
  project: "my-project",
  backup: "backup-id"
});
```