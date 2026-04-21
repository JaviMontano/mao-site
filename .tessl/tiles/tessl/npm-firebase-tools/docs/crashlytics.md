# Crashlytics

Firebase Crashlytics provides crash reporting and debugging tools for mobile applications, including symbol file management for native code crash symbolication.

## Capabilities

### Symbol Management

Upload debug symbols for native code to enable crash symbolication.

```typescript { .api }
/**
 * Upload symbol files for native code crash symbolication
 * @param symbolFiles - Array of symbol file paths to upload
 * @param options - Configuration options
 * @returns Promise resolving when upload completes
 */
function crashlyticsSymbolsUpload(
  symbolFiles: string[],
  options?: Options & {
    /** Firebase app ID for the target application */
    app?: string;
    /** Symbol generator type - breakpad (default) or csym */
    generator?: "breakpad" | "csym";
    /** Generate symbols without uploading them */
    dryRun?: boolean;
  }
): Promise<void>;
```

### Mapping File Management

Generate and upload ProGuard/R8 mapping files for Android applications.

```typescript { .api }
/**
 * Generate a unique identifier for mapping file uploads
 * @param options - Configuration options
 * @returns Promise resolving to generated mapping file ID
 */
function crashlyticsMappingfileGenerateid(options?: Options & {
  /** Firebase app ID for the target application */
  app?: string;
}): Promise<string>;

/**
 * Upload ProGuard/R8 mapping file for Android crash deobfuscation
 * @param mappingFile - Path to the mapping file
 * @param options - Configuration options
 * @returns Promise resolving when upload completes
 */
function crashlyticsMappingfileUpload(
  mappingFile: string,
  options?: Options & {
    /** Firebase app ID for the target application */
    app?: string;
    /** Resource name for the mapping file */
    resourceName?: string;
  }
): Promise<void>;
```

## Usage Examples

### Symbol File Upload

```typescript
import * as client from "firebase-tools";

// Upload debug symbols for crash symbolication
await client.crashlytics.symbols.upload(
  ["path/to/symbols.sym", "path/to/other.sym"],
  {
    project: "my-project",
    app: "1:123456789:android:abc123def456",
    generator: "breakpad"
  }
);

// Dry run to generate symbols without uploading
await client.crashlytics.symbols.upload(
  ["path/to/symbols.sym"],
  {
    project: "my-project", 
    app: "1:123456789:android:abc123def456",
    dryRun: true
  }
);
```

### Mapping File Management

```typescript
// Generate mapping file ID
const mappingFileId = await client.crashlytics.mappingfile.generateid({
  project: "my-project",
  app: "1:123456789:android:abc123def456"
});

// Upload ProGuard mapping file
await client.crashlytics.mappingfile.upload("proguard-mapping.txt", {
  project: "my-project",
  app: "1:123456789:android:abc123def456",
  resourceName: mappingFileId
});
```

## CLI Usage

### Symbol Upload

```bash
# Upload symbols with breakpad generator
firebase crashlytics:symbols:upload path/to/symbols.sym --app=1:123456789:android:abc123def456

# Upload with csym generator
firebase crashlytics:symbols:upload path/to/symbols.sym --app=1:123456789:android:abc123def456 --generator=csym

# Dry run to test symbol generation
firebase crashlytics:symbols:upload path/to/symbols.sym --app=1:123456789:android:abc123def456 --dry-run
```

### Mapping File Upload

```bash
# Generate mapping file ID
firebase crashlytics:mappingfile:generateid --app=1:123456789:android:abc123def456

# Upload mapping file
firebase crashlytics:mappingfile:upload proguard-mapping.txt --app=1:123456789:android:abc123def456 --resource-name=<mapping-file-id>
```

## Notes

- Symbol files help Crashlytics provide meaningful stack traces for native code crashes
- ProGuard/R8 mapping files enable deobfuscation of Android crash reports
- The `app` parameter should be the Firebase app ID, not the package name
- Breakpad is the default symbol generator, but csym is also supported
- Use `--dry-run` to test symbol generation without uploading