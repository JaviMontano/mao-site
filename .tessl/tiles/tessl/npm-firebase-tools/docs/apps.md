# App Management

Firebase app management functionality for creating and managing Firebase applications (web, iOS, Android) within your project.

## Capabilities

### Create App

Creates a new Firebase app in the specified project.

```typescript { .api }
/**
 * Create a new Firebase app
 * @param platform - Platform type (web, ios, or android)
 * @param displayName - Display name for the app
 * @param options - Command options including project configuration
 * @returns Promise resolving to app creation result
 */
function create(
  platform?: "web" | "ios" | "android",
  displayName?: string,
  options?: Options & {
    /** Package name for Android apps */
    packageName?: string;
    /** Bundle ID for iOS apps */
    bundleId?: string;
  }
): Promise<{
  appId: string;
  platform: string;
  displayName: string;
  packageName?: string;
  bundleId?: string;
}>;
```

**Usage Examples:**

```javascript
const client = require("firebase-tools");

// Create a web app
const webApp = await client.apps.create("web", "My Web App", {
  project: "my-project"
});

// Create an Android app
const androidApp = await client.apps.create("android", "My Android App", {
  project: "my-project",
  packageName: "com.example.myapp"
});

// Create an iOS app
const iosApp = await client.apps.create("ios", "My iOS App", {
  project: "my-project",
  bundleId: "com.example.myapp"
});
```

### List Apps

Lists all Firebase apps in the project.

```typescript { .api }
/**
 * List Firebase apps in the project
 * @param platform - Optional platform filter (web, ios, or android)
 * @param options - Command options including project configuration
 * @returns Promise resolving to array of apps
 */
function list(
  platform?: "web" | "ios" | "android",
  options?: Options
): Promise<Array<{
  appId: string;
  platform: string;
  displayName: string;
  packageName?: string;
  bundleId?: string;
}>>;
```

**Usage Examples:**

```javascript
// List all apps
const apps = await client.apps.list(undefined, { project: "my-project" });

// List only web apps
const webApps = await client.apps.list("web", { project: "my-project" });

// List only mobile apps
const iosApps = await client.apps.list("ios", { project: "my-project" });
const androidApps = await client.apps.list("android", { project: "my-project" });
```

### Initialize App

Initializes app configuration.

```typescript { .api }
/**
 * Initialize app configuration
 * @param options - Command options
 * @returns Promise resolving when initialization completes
 */
function init(options?: Options): Promise<void>;
```

### Get SDK Config

Retrieves SDK configuration for an app.

```typescript { .api }
/**
 * Get SDK configuration for an app
 * @param options - Command options including app ID
 * @returns Promise resolving to SDK configuration
 */
function sdkconfig(options?: Options & {
  /** App ID to get configuration for */
  appId?: string;
}): Promise<any>;
```

## Android SHA Management

### List SHA Certificates

Lists Android SHA certificates for an app.

```typescript { .api }
/**
 * List Android SHA certificates
 * @param options - Command options including app ID
 * @returns Promise resolving to array of SHA certificates
 */
function androidShaList(options?: Options & {
  appId: string;
}): Promise<Array<{
  name: string;
  shaHash: string;
  certType: string;
}>>;
```

### Add SHA Certificate

Adds an Android SHA certificate to an app.

```typescript { .api }
/**
 * Add Android SHA certificate
 * @param options - Command options including SHA hash and app ID
 * @returns Promise resolving when certificate is added
 */
function androidShaCreate(options?: Options & {
  appId: string;
  shaHash: string;
  certType?: "SHA_1" | "SHA_256";
}): Promise<void>;
```

### Remove SHA Certificate

Removes an Android SHA certificate from an app.

```typescript { .api }
/**
 * Remove Android SHA certificate
 * @param options - Command options including certificate name and app ID
 * @returns Promise resolving when certificate is removed
 */
function androidShaDelete(options?: Options & {
  appId: string;
  shaId: string;
}): Promise<void>;
```

**Usage Examples:**

```javascript
// List SHA certificates
const certs = await client.apps.android.sha.list({
  project: "my-project",
  appId: "1:123456789:android:abcdef"
});

// Add SHA certificate
await client.apps.android.sha.create({
  project: "my-project",
  appId: "1:123456789:android:abcdef",
  shaHash: "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD",
  certType: "SHA_1"
});

// Remove SHA certificate
await client.apps.android.sha.delete({
  project: "my-project",
  appId: "1:123456789:android:abcdef",
  shaId: "sha_id_from_list"
});
```