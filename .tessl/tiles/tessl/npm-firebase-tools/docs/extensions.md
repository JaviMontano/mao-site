# Extensions

Firebase Extensions marketplace and management for installing, configuring, and managing pre-built solutions that extend Firebase functionality.

## Capabilities

### Install Extension

Installs a Firebase Extension from the marketplace or custom source.

```typescript { .api }
/**
 * Install Firebase Extension
 * @param extensionName - Extension name or source
 * @param options - Installation options
 * @returns Promise resolving when extension is installed
 */
function install(
  extensionName: string,
  options?: Options & {
    /** Instance ID for the extension */
    instanceId?: string;
    /** Extension parameters */
    params?: Record<string, any>;
    /** Parameters file path */
    paramsFile?: string;
    /** Auto-approve installation */
    force?: boolean;
  }
): Promise<{
  name: string;
  instanceId: string;
  config: {
    name: string;
    createTime: string;
    updateTime: string;
    state: string;
  };
}>;
```

**Usage Examples:**

```javascript
const client = require("firebase-tools");

// Install extension from marketplace
await client.ext.install("firebase/storage-resize-images", {
  project: "my-project",
  instanceId: "resize-images-prod"
});

// Install with custom parameters
await client.ext.install("firebase/firestore-send-email", {
  project: "my-project",
  instanceId: "send-email",
  params: {
    SMTP_CONNECTION_URI: "smtps://username:password@smtp.gmail.com:465",
    DEFAULT_FROM: "noreply@myapp.com",
    DEFAULT_REPLY_TO: "support@myapp.com"
  }
});

// Install with parameters from file
await client.ext.install("firebase/firestore-translate-text", {
  project: "my-project",
  paramsFile: "./translate-config.env",
  force: true
});
```

### List Extensions

Lists all installed extensions in the project.

```typescript { .api }
/**
 * List installed Firebase Extensions
 * @param options - Command options
 * @returns Promise resolving to array of extension information
 */
function list(options?: Options): Promise<Array<{
  name: string;
  instanceId: string;
  createTime: string;
  updateTime: string;
  state: "DEPLOYING" | "ACTIVE" | "PAUSED" | "ERRORED";
  config: {
    name: string;
    displayName: string;
    description: string;
    version: string;
  };
  serviceAccountEmail: string;
  errorStatus?: string;
}>>;
```

**Usage Examples:**

```javascript
// List all installed extensions
const extensions = await client.ext.list({
  project: "my-project"
});

console.log("Installed extensions:");
extensions.forEach(ext => {
  console.log(`- ${ext.config.displayName} (${ext.instanceId}): ${ext.state}`);
});
```

### Get Extension Info

Gets detailed information about an extension from the marketplace.

```typescript { .api }
/**
 * Get extension information from marketplace
 * @param extensionName - Extension name to get info for
 * @param options - Command options
 * @returns Promise resolving when information is displayed
 */
function info(
  extensionName: string,
  options?: Options
): Promise<void>;
```

**Usage Examples:**

```javascript
// Get extension info
await client.ext.info("firebase/storage-resize-images");

// Get info for specific version
await client.ext.info("firebase/firestore-send-email@0.1.7");
```

### Configure Extension

Reconfigures an installed extension's parameters.

```typescript { .api }
/**
 * Configure installed extension
 * @param options - Configuration options
 * @returns Promise resolving when extension is reconfigured
 */
function configure(options: Options & {
  /** Instance ID of extension to configure */
  instanceId: string;
  /** New parameters */
  params?: Record<string, any>;
  /** Parameters file path */
  paramsFile?: string;
}): Promise<void>;
```

**Usage Examples:**

```javascript
// Reconfigure extension parameters
await client.ext.configure({
  project: "my-project",
  instanceId: "resize-images-prod",
  params: {
    IMG_SIZES: "200x200,400x400,800x800",
    IMG_TYPE: "webp"
  }
});
```

### Update Extension

Updates an installed extension to a newer version.

```typescript { .api }
/**
 * Update installed extension
 * @param options - Update options
 * @returns Promise resolving when extension is updated
 */
function update(options: Options & {
  /** Instance ID of extension to update */
  instanceId: string;
  /** Specific version to update to */
  version?: string;
  /** Auto-approve update */
  force?: boolean;
}): Promise<void>;
```

**Usage Examples:**

```javascript
// Update to latest version
await client.ext.update({
  project: "my-project",
  instanceId: "send-email"
});

// Update to specific version
await client.ext.update({
  project: "my-project",
  instanceId: "resize-images-prod",
  version: "0.2.1",
  force: true
});
```

### Uninstall Extension

Removes an installed extension from the project.

```typescript { .api }
/**
 * Uninstall Firebase Extension
 * @param options - Uninstall options
 * @returns Promise resolving when extension is uninstalled
 */
function uninstall(options: Options & {
  /** Instance ID of extension to uninstall */
  instanceId: string;
  /** Force uninstall without confirmation */
  force?: boolean;
}): Promise<void>;
```

**Usage Examples:**

```javascript
// Uninstall extension
await client.ext.uninstall({
  project: "my-project",
  instanceId: "old-extension",
  force: true
});
```

### Export Extension Configuration

Exports extension configurations for backup or migration.

```typescript { .api }
/**
 * Export extension configurations
 * @param options - Export options
 * @returns Promise resolving when configuration is exported
 */
function exportConfig(options?: Options & {
  /** Output file path */
  output?: string;
}): Promise<void>;
```

**Usage Examples:**

```javascript
// Export all extension configs
await client.ext.export({
  project: "my-project",
  output: "./extensions-config.json"
});
```

## Extension SDK

### Install Extension SDK

Installs the Firebase Extensions SDK for custom extension development.

```typescript { .api }
/**
 * Install Firebase Extensions SDK
 * @param options - SDK installation options
 * @returns Promise resolving when SDK is installed
 */
function sdkInstall(options?: Options): Promise<void>;
```

**Usage Examples:**

```javascript
// Install Extensions SDK
await client.ext.sdk.install();
```

## Extension Development

### Initialize Extension

Initializes a new extension development project.

```typescript { .api }
/**
 * Initialize extension development project
 * @param options - Initialization options
 * @returns Promise resolving when project is initialized
 */
function devInit(options?: Options & {
  /** Extension template to use */
  template?: string;
}): Promise<void>;
```

### List Developer Extensions

Lists extensions published by the authenticated developer.

```typescript { .api }
/**
 * List developer-published extensions
 * @param options - Command options
 * @returns Promise resolving to array of extension information
 */
function devList(options?: Options): Promise<Array<{
  name: string;
  displayName: string;
  description: string;
  version: string;
  state: string;
  createTime: string;
  updateTime: string;
}>>;
```

### Register Extension

Registers a new extension with Firebase Extensions marketplace.

```typescript { .api }
/**
 * Register extension with marketplace
 * @param options - Registration options
 * @returns Promise resolving when extension is registered
 */
function devRegister(options: Options & {
  /** Extension source directory */
  source: string;
}): Promise<void>;
```

### Upload Extension

Uploads a new version of an extension.

```typescript { .api }
/**
 * Upload extension version
 * @param options - Upload options
 * @returns Promise resolving when extension is uploaded
 */
function devUpload(options: Options & {
  /** Extension source directory */
  source: string;
  /** Version number */
  version?: string;
}): Promise<void>;
```

### Deprecate Extension

Marks an extension version as deprecated.

```typescript { .api }
/**
 * Deprecate extension version
 * @param extensionName - Extension name to deprecate
 * @param options - Deprecation options
 * @returns Promise resolving when extension is deprecated
 */
function devDeprecate(
  extensionName: string,
  options?: Options & {
    /** Specific version to deprecate */
    version?: string;
    /** Deprecation message */
    message?: string;
  }
): Promise<void>;
```

### Undeprecate Extension

Removes deprecation status from an extension version.

```typescript { .api }
/**
 * Undeprecate extension version
 * @param extensionName - Extension name to undeprecate
 * @param options - Undeprecation options
 * @returns Promise resolving when extension is undeprecated
 */
function devUndeprecate(
  extensionName: string,
  options?: Options & {
    /** Specific version to undeprecate */
    version?: string;
  }
): Promise<void>;
```

### Get Extension Usage

Retrieves usage statistics for a published extension.

```typescript { .api }
/**
 * Get extension usage statistics
 * @param extensionName - Extension name to get usage for
 * @param options - Usage options
 * @returns Promise resolving when usage is displayed
 */
function devUsage(
  extensionName: string,
  options?: Options
): Promise<void>;
```

**Development Examples:**

```javascript
// Initialize extension project
await client.ext.dev.init({
  template: "functions"
});

// List your published extensions
const myExtensions = await client.ext.dev.list();

// Upload new version
await client.ext.dev.upload({
  source: "./my-extension",
  version: "1.2.0"
});

// Deprecate old version
await client.ext.dev.deprecate("my-org/my-extension", {
  version: "1.0.0",
  message: "Please upgrade to version 1.2.0"
});

// Get usage stats
await client.ext.dev.usage("my-org/my-extension");
```

## Popular Extensions

### Firebase Official Extensions

- **storage-resize-images**: Automatically resize uploaded images
- **firestore-send-email**: Send emails triggered by Firestore writes
- **firestore-translate-text**: Translate text in Firestore documents
- **storage-extract-image-text**: Extract text from images using OCR
- **firestore-counter**: Efficiently maintain counter fields
- **auth-mailchimp-sync**: Sync user data with Mailchimp
- **firestore-bigquery-export**: Export Firestore data to BigQuery
- **rtdb-limit-child-nodes**: Limit child nodes in Realtime Database

### Community Extensions

Extensions published by third-party developers covering various use cases like payments, analytics, content management, and integrations.