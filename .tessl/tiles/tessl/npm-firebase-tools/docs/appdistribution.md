# App Distribution

Firebase App Distribution for distributing pre-release versions of mobile apps to trusted testers before releasing to app stores.

## Capabilities

### Distribute App

Uploads and distributes an app binary to testers and groups.

```typescript { .api }
/**
 * Distribute app to testers and groups
 * @param options - Distribution configuration options
 * @returns Promise resolving when distribution completes
 */
function distribute(options: Options & {
  /** Path to app file (APK/AAB for Android, IPA for iOS) */
  file: string;
  /** Release notes for this distribution */
  releaseNotes?: string;
  /** File containing release notes */
  releaseNotesFile?: string;
  /** Comma-separated list of group aliases */
  groups?: string;
  /** Comma-separated list of tester emails */
  testers?: string;
}): Promise<{
  name: string;
  displayVersion: string;
  buildVersion: string;
  releaseNotes?: string;
  downloadUrl: string;
  distributionTime: string;
}>;
```

**Usage Examples:**

```javascript
const client = require("firebase-tools");

// Distribute to specific testers
await client.appdistribution.distribute({
  project: "my-project",
  file: "./app-release.apk",
  releaseNotes: "Bug fixes and performance improvements",
  testers: "alice@example.com,bob@example.com"
});

// Distribute to groups with release notes from file
await client.appdistribution.distribute({
  project: "my-project",  
  file: "./MyApp.ipa",
  releaseNotesFile: "./release-notes.txt",
  groups: "qa-team,beta-testers"
});
```

## Tester Management

### List Testers

Lists all testers in the project.

```typescript { .api }
/**
 * List all testers in the project
 * @param options - Command options
 * @returns Promise resolving to array of tester information
 */
function testersList(options?: Options): Promise<Array<{
  name: string;
  email: string;
  displayName?: string;
  groups?: string[];
  lastActivityTime?: string;
}>>;
```

### Add Testers

Adds testers to the project.

```typescript { .api }
/**
 * Add testers to the project
 * @param options - Add tester options
 * @returns Promise resolving when testers are added
 */
function testersAdd(options: Options & {
  /** Comma-separated list of tester emails */
  emails: string;
  /** File containing list of tester emails (one per line) */
  file?: string;
}): Promise<void>;
```

### Remove Testers

Removes testers from the project.

```typescript { .api }
/**
 * Remove testers from the project
 * @param options - Remove tester options
 * @returns Promise resolving when testers are removed
 */
function testersDelete(options: Options & {
  /** Comma-separated list of tester emails */
  emails: string;
  /** File containing list of tester emails (one per line) */
  file?: string;
}): Promise<void>;
```

**Tester Management Examples:**

```javascript
// List all testers
const testers = await client.appdistribution.testers.list({
  project: "my-project"
});

// Add individual testers
await client.appdistribution.testers.add({
  project: "my-project",
  emails: "new-tester@example.com,another@example.com"
});

// Add testers from file
await client.appdistribution.testers.add({
  project: "my-project",
  file: "./testers.txt"
});

// Remove testers
await client.appdistribution.testers.delete({
  project: "my-project",
  emails: "former-tester@example.com"
});
```

## Group Management

### List Groups

Lists all tester groups in the project.

```typescript { .api }
/**
 * List all tester groups
 * @param options - Command options
 * @returns Promise resolving to array of group information
 */
function groupsList(options?: Options): Promise<Array<{
  name: string;
  displayName: string;
  testerCount: number;
  releaseCount: number;
  inviteLinkCount: number;
}>>;
```

### Create Group

Creates a new tester group.

```typescript { .api }
/**
 * Create a new tester group
 * @param options - Group creation options
 * @returns Promise resolving when group is created
 */
function groupsCreate(options: Options & {
  /** Group display name */
  displayName: string;
  /** Group alias for referencing */
  alias?: string;
}): Promise<{
  name: string;
  displayName: string;
  alias: string;
}>;
```

### Delete Group

Deletes a tester group.

```typescript { .api }
/**
 * Delete a tester group
 * @param options - Group deletion options
 * @returns Promise resolving when group is deleted
 */
function groupsDelete(options: Options & {
  /** Group alias to delete */
  alias: string;
}): Promise<void>;
```

**Group Management Examples:**

```javascript
// List all groups
const groups = await client.appdistribution.groups.list({
  project: "my-project"
});

// Create new group
await client.appdistribution.groups.create({
  project: "my-project",
  displayName: "QA Team",
  alias: "qa-team"
});

// Delete group
await client.appdistribution.groups.delete({
  project: "my-project",
  alias: "old-group"
});
```

## App Requirements

### Android Apps

- **File Formats**: APK or AAB (Android App Bundle)
- **Signing**: Apps must be signed with a valid certificate
- **Size Limit**: Maximum 150MB per APK/AAB
- **API Level**: Minimum API level 16 (Android 4.1)

### iOS Apps

- **File Format**: IPA (iOS App Store Package)
- **Signing**: Apps must be signed with valid provisioning profile
- **Size Limit**: Maximum 150MB per IPA
- **iOS Version**: Minimum iOS 10.0

## Distribution Features

- **Tester Management**: Add/remove testers and organize into groups
- **Release Notes**: Include detailed release notes with each distribution
- **Download Tracking**: Monitor tester engagement and download statistics
- **Notifications**: Automatic email notifications to testers about new releases
- **Web Interface**: Testers can download apps through Firebase console
- **Integration**: Works with CI/CD pipelines for automated distribution

## Security and Privacy

- **Access Control**: Only invited testers can access distributed apps
- **Secure Downloads**: All downloads are served over HTTPS
- **Tester Authentication**: Testers must sign in with Google account
- **App Privacy**: Apps are never publicly accessible
- **Data Protection**: Tester information is protected according to Firebase privacy policies