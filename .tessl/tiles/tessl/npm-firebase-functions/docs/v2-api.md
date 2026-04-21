# V2 API (Current Generation)

The V2 API provides the modern CloudEvents-compliant Firebase Cloud Functions interface with enhanced configuration options, improved performance, and streaming support. V2 is the recommended approach for new projects and offers significant improvements over the V1 legacy API.

## Capabilities

### Core CloudEvents Model

The V2 API is built on the CloudEvents specification for standardized event handling.

```typescript { .api }
/**
 * CloudEvents specification compliant event interface
 */
interface CloudEvent<T> {
  /** CloudEvents specification version (always "1.0") */
  readonly specversion: "1.0";
  /** Unique event identifier */
  id: string;
  /** Event source (service that generated the event) */
  source: string;
  /** Optional event subject for additional context */
  subject?: string;
  /** Event type identifier */
  type: string;
  /** RFC3339 timestamp when event occurred */
  time: string;
  /** Event payload data */
  data: T;
}

/**
 * V2 Cloud Function interface for CloudEvents
 */
interface CloudFunction<EventType extends CloudEvent<unknown>> {
  /** Raw CloudEvent handler for the Functions Framework */
  (raw: CloudEvent<unknown>): any | Promise<any>;
  /** Typed event handler with proper typing */
  run(event: EventType): any | Promise<any>;
  /** Internal trigger metadata */
  __trigger?: unknown;
  /** Endpoint manifest for deployment */
  __endpoint: ManifestEndpoint;
}
```

### Global Configuration

V2 functions support enhanced global configuration with improved memory options and concurrency control.

```typescript { .api }
/**
 * Global configuration options for all V2 functions
 */
interface GlobalOptions {
  /** Omit function from deployment */
  omit?: boolean | Expression<boolean>;
  /** Default deployment region */
  region?: SupportedRegion | string | Expression<string> | ResetValue;
  /** Memory allocation (up to 32GB in V2) */
  memory?: MemoryOption | Expression<number> | ResetValue;
  /** Function timeout in seconds (up to 3600s in V2) */
  timeoutSeconds?: number | Expression<number> | ResetValue;
  /** Minimum instances for cold start reduction */
  minInstances?: number | Expression<number> | ResetValue;
  /** Maximum instances for scaling limit */
  maxInstances?: number | Expression<number> | ResetValue;
  /** Concurrent request handling per instance */
  concurrency?: number | Expression<number> | ResetValue;
  /** CPU allocation (number of vCPUs or "gcf_gen1" for legacy) */
  cpu?: number | "gcf_gen1";
  /** VPC connector for private networking */
  vpcConnector?: string | Expression<string> | ResetValue;
  /** VPC egress settings */
  vpcConnectorEgressSettings?: VpcEgressSetting | ResetValue;
  /** Service account for function execution */
  serviceAccount?: string | Expression<string> | ResetValue;
  /** Ingress settings for function access */
  ingressSettings?: IngressSetting | ResetValue;
  /** Function invoker permissions */
  invoker?: "public" | "private" | string | string[];
  /** Custom labels for organization */
  labels?: Record<string, string>;
  /** Secret bindings for secure configuration */
  secrets?: (string | SecretParam)[];
  /** Enforce App Check token validation for security */
  enforceAppCheck?: boolean;
  /** Preserve external configuration changes */
  preserveExternalChanges?: boolean;
}

/**
 * V2 supported regions (expanded from V1)
 */
type SupportedRegion = 
  | "asia-east1" | "asia-northeast1" | "asia-northeast2" | "europe-north1"
  | "europe-west1" | "europe-west4" | "us-central1" | "us-east1" 
  | "us-east4" | "us-west1" | "asia-east2" | "asia-northeast3"
  | "asia-southeast1" | "asia-southeast2" | "asia-south1"
  | "australia-southeast1" | "europe-central2" | "europe-west2"
  | "europe-west3" | "europe-west6" | "northamerica-northeast1"
  | "southamerica-east1" | "us-west2" | "us-west3" | "us-west4";

/**
 * V2 memory options (enhanced with larger sizes)
 */
type MemoryOption = 
  | "128MiB" | "256MiB" | "512MiB" | "1GiB" | "2GiB" 
  | "4GiB" | "8GiB" | "16GiB" | "32GiB";

/**
 * VPC egress settings for private networking
 */
type VpcEgressSetting = "PRIVATE_RANGES_ONLY" | "ALL_TRAFFIC";

/**
 * Ingress settings for function access control
 */
type IngressSetting = "ALLOW_ALL" | "ALLOW_INTERNAL_ONLY" | "ALLOW_INTERNAL_AND_GCLB";

/**
 * Event handler options extending global options
 */
interface EventHandlerOptions extends Omit<GlobalOptions, "enforceAppCheck"> {
  /** Custom event type (for generic handlers) */
  eventType?: string;
  /** Event filters for conditional triggering */
  eventFilters?: Record<string, string | Expression<string>>;
  /** Event filter path patterns for advanced filtering */
  eventFilterPathPatterns?: Record<string, string | Expression<string>>;
  /** Enable automatic retry on failure */
  retry?: boolean | Expression<boolean> | ResetValue;
  /** Override region for this specific handler */
  region?: string | Expression<string> | ResetValue;
  /** Override service account for this handler */
  serviceAccount?: string | Expression<string> | ResetValue;
  /** Pub/Sub channel for custom routing */
  channel?: string;
}

/**
 * Set global configuration for all V2 functions
 * @param options - Global configuration options
 */
function setGlobalOptions(options: GlobalOptions): void;

/**
 * Register initialization callback
 * @param callback - Function to run during initialization
 */
function onInit(callback: () => void | Promise<void>): void;
```

**Usage Examples:**

```typescript
import { setGlobalOptions } from "firebase-functions/options";

// Set global defaults for all V2 functions
setGlobalOptions({
  region: "us-central1",
  memory: "1GiB",
  timeoutSeconds: 300,
  concurrency: 100,
  minInstances: 1,
  maxInstances: 10,
  enforceAppCheck: true,
  labels: {
    team: "backend",
    environment: "production"
  }
});

// Global configuration with advanced networking
setGlobalOptions({
  memory: "2GiB",
  cpu: 2,
  vpcConnector: "projects/my-project/locations/us-central1/connectors/my-vpc",
  vpcConnectorEgressSettings: "PRIVATE_RANGES_ONLY",
  serviceAccount: "functions@my-project.iam.gserviceaccount.com",
  ingressSettings: "ALLOW_INTERNAL_AND_GCLB"
});
```

### HTTPS Functions

V2 HTTPS functions provide enhanced HTTP handling with CORS, streaming, and Genkit integration.

```typescript { .api }
/**
 * V2 HTTPS function options
 */
interface HttpsOptions extends Omit<GlobalOptions, "region" | "enforceAppCheck"> {
  /** Deployment regions (can specify multiple) */
  region?: SupportedRegion | string | Array<SupportedRegion | string> | Expression<string> | ResetValue;
  /** CORS configuration for cross-origin requests */
  cors?: string | Expression<string> | Expression<string[]> | boolean | RegExp | Array<string | RegExp>;
  /** Memory allocation */
  memory?: MemoryOption | Expression<number> | ResetValue;
  /** Function timeout */
  timeoutSeconds?: number | Expression<number> | ResetValue;
  /** Minimum instances */
  minInstances?: number | Expression<number> | ResetValue;
  /** Maximum instances */
  maxInstances?: number | Expression<number> | ResetValue;
  /** Concurrency per instance */
  concurrency?: number | Expression<number> | ResetValue;
  /** CPU allocation */
  cpu?: number | "gcf_gen1";
  /** Invoker permissions */
  invoker?: "public" | "private" | string | string[];
}

/**
 * V2 callable function options with App Check and streaming support
 */
interface CallableOptions<T = any> extends HttpsOptions {
  /** Enforce App Check token validation */
  enforceAppCheck?: boolean;
  /** Consume App Check token on invocation */
  consumeAppCheckToken?: boolean;
  /** Heartbeat interval for streaming (seconds, null to disable) */
  heartbeatSeconds?: number | null;
}

/**
 * V2 HTTPS function interface
 */
interface HttpsFunction {
  /** HTTP request handler */
  (req: Request, res: express.Response): void | Promise<void>;
  /** Internal trigger metadata */
  __trigger?: unknown;
  /** Endpoint manifest */
  __endpoint: ManifestEndpoint;
}

/**
 * V2 callable function with streaming support
 */
interface CallableFunction<T, Return, Stream = unknown> extends HttpsFunction {
  /** Execute callable function */
  run(request: CallableRequest<T>): Return;
  /** Stream responses to client */
  stream(request: CallableRequest<T>, response: CallableResponse<Stream>): { 
    stream: AsyncIterable<Stream>; 
    output: Return; 
  };
}

/**
 * Callable request context with enhanced authentication
 */
interface CallableRequest<T> {
  /** Request data payload */
  data: T;
  /** Authentication context */
  auth?: AuthData;
  /** App Check context */
  app?: AppCheckData;
  /** Raw Express request */
  rawRequest: express.Request;
}

/**
 * Callable response for streaming
 */
interface CallableResponse<T> {
  /** Send streaming data to client */
  write(data: T): void;
  /** End streaming response */
  end(): void;
}

/**
 * Create HTTP request handler function
 */
function onRequest(
  opts: HttpsOptions,
  handler: (request: Request, response: express.Response) => void | Promise<void>
): HttpsFunction;

function onRequest(
  handler: (request: Request, response: express.Response) => void | Promise<void>
): HttpsFunction;

/**
 * Create callable function with optional streaming
 */
function onCall<T, Return, Stream>(
  opts: CallableOptions<T>,
  handler: (request: CallableRequest<T>, response?: CallableResponse<Stream>) => Return
): CallableFunction<T, Return, Stream>;

function onCall<T, Return, Stream>(
  handler: (request: CallableRequest<T>, response?: CallableResponse<Stream>) => Return
): CallableFunction<T, Return, Stream>;

/**
 * Integration with Genkit AI actions
 */
function onCallGenkit<A extends GenkitAction>(
  action: A
): CallableFunction<GenkitActionInput<A>, GenkitActionOutput<A>, GenkitActionStream<A>>;
```

**Usage Examples:**

```typescript
import { onRequest, onCall } from "firebase-functions/https";

// Basic HTTP function with CORS
export const api = onRequest(
  { 
    cors: true,
    memory: "512MiB",
    region: ["us-central1", "europe-west1"]
  },
  (req, res) => {
    if (req.method === "POST") {
      const { name } = req.body;
      res.json({ greeting: `Hello, ${name}!` });
    } else {
      res.status(405).send("Method Not Allowed");
    }
  }
);

// Callable function with App Check
export const processPayment = onCall<
  { amount: number; currency: string },
  { paymentId: string; status: string }
>(
  {
    enforceAppCheck: true,
    memory: "1GiB",
    timeoutSeconds: 60
  },
  (request) => {
    const { amount, currency } = request.data;
    
    // Validate authentication
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "User must be authenticated");
    }
    
    // Process payment logic here
    return {
      paymentId: `pay_${Date.now()}`,
      status: "success"
    };
  }
);

// Streaming callable function
export const chatStream = onCall<
  { message: string },
  { finalResponse: string },
  { chunk: string }
>(
  {
    heartbeatSeconds: 30,
    timeoutSeconds: 300
  },
  async (request, response) => {
    const { message } = request.data;
    
    // Simulate streaming AI chat response
    const words = `Response to "${message}": Here is a streaming response...`.split(' ');
    
    for (const word of words) {
      response?.write({ chunk: word + ' ' });
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return { finalResponse: "Chat response complete" };
  }
);

// Advanced CORS configuration
export const publicApi = onRequest(
  {
    cors: [
      /^https:\/\/.*\.example\.com$/,
      "https://app.example.com",
      "https://staging.example.com"
    ],
    invoker: "public"
  },
  (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  }
);
```

### Database Triggers

V2 Realtime Database triggers with CloudEvents format and enhanced filtering.

```typescript { .api }
/**
 * Realtime Database event data for V2
 */
interface DatabaseEvent<T, Params = Record<string, string>> extends CloudEvent<T> {
  /** Path parameters extracted from the trigger path */
  params: Params;
  /** Database instance information */
  location: string;
  /** Authentication context */
  authType: "ADMIN" | "USER" | "UNAUTHENTICATED";
  /** Authenticated user ID (if available) */
  authId?: string;
}

/**
 * Database reference change event
 */
interface ReferenceEvent<T, Params = Record<string, string>> extends DatabaseEvent<T, Params> {
  /** Reference path */
  ref: string;
}

/**
 * Create trigger for reference writes (create, update, delete)
 */
function onValueWritten<Document = any>(
  ref: string,
  handler: (event: ReferenceEvent<Document, ParamsOf<string>>) => any | Promise<any>
): CloudFunction<ReferenceEvent<Document, ParamsOf<string>>>;

function onValueWritten<Document = any>(
  opts: DatabaseOptions,
  handler: (event: ReferenceEvent<Document, ParamsOf<string>>) => any | Promise<any>
): CloudFunction<ReferenceEvent<Document, ParamsOf<string>>>;

/**
 * Create trigger for reference updates
 */
function onValueUpdated<Document = any>(
  ref: string,
  handler: (event: ReferenceEvent<Change<Document>, ParamsOf<string>>) => any | Promise<any>
): CloudFunction<ReferenceEvent<Change<Document>, ParamsOf<string>>>;

/**
 * Create trigger for reference creation
 */
function onValueCreated<Document = any>(
  ref: string,
  handler: (event: ReferenceEvent<Document, ParamsOf<string>>) => any | Promise<any>
): CloudFunction<ReferenceEvent<Document, ParamsOf<string>>>;

/**
 * Create trigger for reference deletion
 */
function onValueDeleted<Document = any>(
  ref: string,
  handler: (event: ReferenceEvent<Document, ParamsOf<string>>) => any | Promise<any>
): CloudFunction<ReferenceEvent<Document, ParamsOf<string>>>;

/**
 * Database trigger options
 */
interface DatabaseOptions extends EventHandlerOptions {
  /** Target database instance */
  instance?: string;
  /** Database region */
  region?: string | Expression<string> | ResetValue;
}
```

**Usage Examples:**

```typescript
import { onValueCreated, onValueUpdated, onValueDeleted } from "firebase-functions/database";

// User profile creation
export const onUserProfileCreate = onValueCreated(
  "/users/{userId}/profile",
  (event) => {
    const profile = event.data;
    const { userId } = event.params;
    
    console.log(`New profile created for user ${userId}:`, profile);
    
    // Initialize user settings using the Admin SDK
    return admin.database().ref(`/users/${userId}/settings`).set({
      notifications: true,
      theme: "light",
      createdAt: event.time
    });
  }
);

// Message update tracking
export const onMessageUpdate = onValueUpdated(
  "/chats/{chatId}/messages/{messageId}",
  (event) => {
    const { before, after } = event.data;
    const { chatId, messageId } = event.params;
    
    console.log(`Message updated in ${chatId}:`, { before, after });
    
    // Update message timestamp
    return admin.database()
      .ref(`/chats/${chatId}/messages/${messageId}/updatedAt`)
      .set(event.time);
  }
);

// User cleanup on profile deletion
export const onProfileDelete = onValueDeleted(
  "/users/{userId}/profile", 
  (event) => {
    const { userId } = event.params;
    
    console.log(`Profile deleted for user ${userId}`);
    
    // Clean up related data
    const updates: Record<string, null> = {
      [`/users/${userId}/settings`]: null,
      [`/users/${userId}/preferences`]: null,
      [`/user_index/${userId}`]: null
    };
    
    return admin.database().ref().update(updates);
  }
);

// Multi-database instance support
export const onDevDataChange = onValueCreated(
  {
    instance: "my-project-dev-default-rtdb",
    region: "us-central1"
  },
  "/data/{id}",
  (event) => {
    console.log("Dev database data created:", event.params.id);
  }
);
```

### Firestore Triggers

V2 Firestore triggers with CloudEvents format and enhanced document handling.

```typescript { .api }
/**
 * Firestore event data for V2
 */
interface FirestoreEvent<T, Params = Record<string, string>> extends CloudEvent<T> {
  /** Path parameters extracted from document path */
  params: Params;
  /** Firestore database location */
  location: string;
  /** Document name/path */
  document: string;
  /** Firestore namespace (for multi-tenancy) */
  namespace?: string;
  /** Database ID (default: "(default)") */
  database?: string;
}

/**
 * Create trigger for document writes (create, update, delete)
 */
function onDocumentWritten<Document = DocumentData>(
  document: string,
  handler: (event: FirestoreEvent<Change<Document> | undefined, ParamsOf<string>>) => any | Promise<any>
): CloudFunction<FirestoreEvent<Change<Document> | undefined, ParamsOf<string>>>;

function onDocumentWritten<Document = DocumentData>(
  opts: FirestoreOptions,
  handler: (event: FirestoreEvent<Change<Document> | undefined, ParamsOf<string>>) => any | Promise<any>
): CloudFunction<FirestoreEvent<Change<Document> | undefined, ParamsOf<string>>>;

/**
 * Create trigger for document creation
 */
function onDocumentCreated<Document = DocumentData>(
  document: string,
  handler: (event: FirestoreEvent<Document | undefined, ParamsOf<string>>) => any | Promise<any>
): CloudFunction<FirestoreEvent<Document | undefined, ParamsOf<string>>>;

/**
 * Create trigger for document updates
 */
function onDocumentUpdated<Document = DocumentData>(
  document: string,
  handler: (event: FirestoreEvent<Change<Document>, ParamsOf<string>>) => any | Promise<any>
): CloudFunction<FirestoreEvent<Change<Document>, ParamsOf<string>>>;

/**
 * Create trigger for document deletion
 */
function onDocumentDeleted<Document = DocumentData>(
  document: string,
  handler: (event: FirestoreEvent<Document, ParamsOf<string>>) => any | Promise<any>
): CloudFunction<FirestoreEvent<Document, ParamsOf<string>>>;

/**
 * Firestore trigger options
 */
interface FirestoreOptions extends EventHandlerOptions {
  /** Target Firestore database */
  database?: string;
  /** Target namespace (multi-tenancy) */
  namespace?: string;
  /** Firestore region */
  region?: string | Expression<string> | ResetValue;
  /** Document path filters */
  document?: string;
}

/**
 * Generic document data interface
 */
interface DocumentData {
  [field: string]: any;
}
```

**Usage Examples:**

```typescript
import { onDocumentCreated, onDocumentUpdated, onDocumentDeleted } from "firebase-functions/firestore";

// User document creation with profile initialization
export const onUserCreate = onDocumentCreated(
  "users/{userId}",
  (event) => {
    const userData = event.data;
    const { userId } = event.params;
    
    if (!userData) {
      console.log("No user data in create event");
      return null;
    }
    
    console.log(`New user created: ${userId}`, userData);
    
    // Initialize user metadata using Admin SDK
    return admin.firestore()
      .collection("users")
      .doc(userId)
      .collection("metadata")
      .doc("profile")
      .set({
        createdAt: admin.firestore.Timestamp.now(),
        lastLoginAt: null,
        loginCount: 0,
        preferences: {
          notifications: true,
          theme: "light"
        }
      });
  }
);

// Order status tracking with inventory management
export const onOrderUpdate = onDocumentUpdated(
  "orders/{orderId}",
  (event) => {
    const { before, after } = event.data;
    const { orderId } = event.params;
    
    console.log(`Order ${orderId} updated:`, { before, after });
    
    // Check if status changed to completed
    if (before.status !== "completed" && after.status === "completed") {
      console.log(`Order ${orderId} completed, updating inventory`);
      
      // Update inventory using batch operations
      const batch = admin.firestore().batch();
      
      after.items?.forEach((item: any) => {
        const inventoryRef = admin.firestore()
          .collection("inventory")
          .doc(item.productId);
        
        batch.update(inventoryRef, {
          quantity: admin.firestore.FieldValue.increment(-item.quantity),
          lastUpdated: admin.firestore.Timestamp.now(),
          lastOrderId: orderId
        });
      });
      
      return batch.commit();
    }
    
    return null;
  }
);

// User data cleanup on account deletion
export const onUserDelete = onDocumentDeleted(
  "users/{userId}",
  async (event) => {
    const deletedUserData = event.data;
    const { userId } = event.params;
    
    console.log(`User deleted: ${userId}`, deletedUserData);
    
    // Clean up user-related data
    const batch = admin.firestore().batch();
    
    // Delete user subcollections
    const subcollections = ["orders", "preferences", "notifications", "metadata"];
    
    for (const subcol of subcollections) {
      const subcollectionRef = admin.firestore()
        .collection("users")
        .doc(userId)
        .collection(subcol);
      
      const docs = await subcollectionRef.get();
      docs.forEach(doc => batch.delete(doc.ref));
    }
    
    // Remove user from global indexes
    batch.delete(admin.firestore().collection("user_index").doc(userId));
    
    return batch.commit();
  }
);

// Multi-database support
export const onTestDocCreate = onDocumentCreated(
  {
    database: "test-database",
    region: "us-central1"
  },
  "test-collection/{docId}",
  (event) => {
    console.log("Test document created in test database");
  }
);

// Namespace support for multi-tenancy
export const onTenantDataUpdate = onDocumentUpdated(
  {
    namespace: "tenant-a",
    database: "multi-tenant-db"
  },
  "data/{dataId}",
  (event) => {
    console.log("Tenant A data updated");
  }
);
```

### Storage Triggers

V2 Cloud Storage triggers with CloudEvents format and enhanced metadata handling.

```typescript { .api }
/**
 * Storage event data for V2
 */
interface StorageEvent extends CloudEvent<StorageObjectData> {
  /** Storage bucket name */
  bucket: string;
  /** Object name/path */
  name: string;
}

/**
 * Storage object data in CloudEvents format
 */
interface StorageObjectData {
  /** Object name */
  name: string;
  /** Bucket name */
  bucket: string;
  /** Generation ID */
  generation: string;
  /** Content type */
  contentType?: string;
  /** Object size in bytes */
  size?: string;
  /** Creation time */
  timeCreated?: string;
  /** Update time */
  updated?: string;
  /** Custom metadata */
  metadata?: Record<string, string>;
}

/**
 * Create trigger for object finalization (upload complete)
 */
function onObjectFinalized(
  handler: (event: StorageEvent) => any | Promise<any>
): CloudFunction<StorageEvent>;

function onObjectFinalized(
  opts: StorageOptions,
  handler: (event: StorageEvent) => any | Promise<any>
): CloudFunction<StorageEvent>;

/**
 * Create trigger for object deletion
 */
function onObjectDeleted(
  handler: (event: StorageEvent) => any | Promise<any>
): CloudFunction<StorageEvent>;

/**
 * Create trigger for object archival
 */
function onObjectArchived(
  handler: (event: StorageEvent) => any | Promise<any>
): CloudFunction<StorageEvent>;

/**
 * Create trigger for metadata updates
 */
function onObjectMetadataUpdated(
  handler: (event: StorageEvent) => any | Promise<any>
): CloudFunction<StorageEvent>;

/**
 * Storage trigger options
 */
interface StorageOptions extends EventHandlerOptions {
  /** Target storage bucket */
  bucket?: string;
  /** Storage region */
  region?: string | Expression<string> | ResetValue;
}
```

**Usage Examples:**

```typescript
import { onObjectFinalized, onObjectDeleted, onObjectMetadataUpdated } from "firebase-functions/storage";

// Image processing on upload with type checking
export const processImage = onObjectFinalized((event) => {
  const { name, bucket, contentType, size } = event.data;
  
  console.log(`Object finalized: ${name} in ${bucket}`, {
    contentType,
    size: size ? parseInt(size) : 0,
    eventId: event.id,
    eventTime: event.time
  });
  
  // Only process images under 10MB
  if (!contentType?.startsWith("image/")) {
    console.log("Not an image file, skipping");
    return null;
  }
  
  const sizeBytes = size ? parseInt(size) : 0;
  if (sizeBytes > 10 * 1024 * 1024) {
    console.log("Image too large, skipping");
    return null;
  }
  
  // Process image (generate thumbnail, optimize, etc.)
  return processImageFile(bucket, name);
});

// File deletion tracking with cleanup
export const onFileDelete = onObjectDeleted(
  {
    bucket: "user-uploads",
    memory: "256MiB"
  },
  (event) => {
    const { name, bucket } = event.data;
    
    console.log(`File deleted: ${name} from ${bucket}`, {
      eventId: event.id,
      deletionTime: event.time
    });
    
    // Record deletion in audit log
    return admin.firestore().collection("audit_logs").add({
      action: "file_deleted",
      resource: `gs://${bucket}/${name}`,
      timestamp: admin.firestore.Timestamp.fromDate(new Date(event.time)),
      eventId: event.id,
      size: event.data.size ? parseInt(event.data.size) : null
    });
  }
);

// Metadata update processing for workflow automation
export const onMetadataUpdate = onObjectMetadataUpdated((event) => {
  const { name, metadata } = event.data;
  
  console.log(`Metadata updated for ${name}:`, metadata);
  
  // Check for processing tags
  if (metadata?.status === "ready-for-processing") {
    console.log(`Queueing ${name} for processing`);
    
    // Add to processing queue
    return admin.firestore().collection("processing_queue").add({
      fileName: name,
      bucket: event.data.bucket,
      priority: metadata.priority || "normal",
      processingType: metadata.type || "default",
      queuedAt: admin.firestore.Timestamp.now(),
      eventId: event.id
    });
  }
  
  if (metadata?.status === "processed") {
    console.log(`Processing completed for ${name}`);
    
    // Update file registry
    return admin.firestore()
      .collection("file_registry")
      .doc(name.replace(/[\/\.]/g, "_"))
      .update({
        processedAt: admin.firestore.Timestamp.now(),
        processingResult: metadata.result || "success",
        eventId: event.id
      });
  }
  
  return null;
});

// Bucket-specific processing with advanced options
export const onBackupFinalized = onObjectFinalized(
  {
    bucket: "app-backups",
    memory: "1GiB",
    timeoutSeconds: 300,
    retry: true
  },
  (event) => {
    const { name, size } = event.data;
    
    console.log(`Backup file created: ${name}`);
    
    // Validate backup file and update inventory
    return Promise.all([
      validateBackupFile(event.data.bucket, name),
      updateBackupInventory(name, size ? parseInt(size) : 0, event.time)
    ]);
  }
);

// Helper functions
async function processImageFile(bucket: string, name: string): Promise<void> {
  // Implementation for image processing
  console.log(`Processing image ${name} in ${bucket}`);
}

async function validateBackupFile(bucket: string, name: string): Promise<boolean> {
  // Implementation for backup validation
  console.log(`Validating backup ${name} in ${bucket}`);
  return true;
}

async function updateBackupInventory(name: string, size: number, timestamp: string): Promise<void> {
  // Implementation for updating backup inventory
  return admin.firestore().collection("backup_inventory").add({
    fileName: name,
    size,
    createdAt: admin.firestore.Timestamp.fromDate(new Date(timestamp)),
    status: "available"
  });
}
```

### Pub/Sub Triggers

V2 Pub/Sub triggers with CloudEvents format and enhanced message handling.

```typescript { .api }
/**
 * Pub/Sub event data for V2
 */
interface MessagePublishedData {
  /** Message payload (base64 encoded) */
  data?: string;
  /** Message attributes */
  attributes?: Record<string, string>;
  /** Message ID */
  messageId?: string;
  /** Publish timestamp */
  publishTime?: string;
  /** Ordering key */
  orderingKey?: string;
}

/**
 * Create trigger for Pub/Sub message publication
 */
function onMessagePublished(
  topic: string,
  handler: (event: CloudEvent<MessagePublishedData>) => any | Promise<any>
): CloudFunction<CloudEvent<MessagePublishedData>>;

function onMessagePublished(
  opts: PubSubOptions,
  handler: (event: CloudEvent<MessagePublishedData>) => any | Promise<any>
): CloudFunction<CloudEvent<MessagePublishedData>>;

/**
 * Pub/Sub trigger options
 */
interface PubSubOptions extends EventHandlerOptions {
  /** Pub/Sub topic name */
  topic?: string;
  /** Pub/Sub region */
  region?: string | Expression<string> | ResetValue;
}
```

**Usage Examples:**

```typescript
import { onMessagePublished } from "firebase-functions/pubsub";

// User notification processing
export const processNotification = onMessagePublished(
  "user-notifications",
  (event) => {
    const message = event.data;
    
    // Decode message data
    const notificationData = message.data 
      ? JSON.parse(Buffer.from(message.data, "base64").toString())
      : {};
    
    console.log("Processing notification:", {
      messageId: message.messageId,
      publishTime: message.publishTime,
      attributes: message.attributes,
      data: notificationData
    });
    
    return sendPushNotification(
      notificationData.userId,
      notificationData.title,
      notificationData.body
    );
  }
);

// Analytics event processing with retry
export const processAnalytics = onMessagePublished(
  {
    topic: "analytics-events",
    retry: true,
    memory: "1GiB"
  },
  (event) => {
    const message = event.data;
    const eventData = message.data 
      ? JSON.parse(Buffer.from(message.data, "base64").toString())
      : {};
    
    console.log("Processing analytics event:", eventData);
    
    // Process different event types
    switch (eventData.type) {
      case "page_view":
        return recordPageView(eventData);
      case "purchase":
        return recordPurchase(eventData);
      case "user_action":
        return recordUserAction(eventData);
      default:
        console.log(`Unknown event type: ${eventData.type}`);
        return null;
    }
  }
);

// Helper functions
async function sendPushNotification(userId: string, title: string, body: string): Promise<void> {
  console.log(`Sending notification to ${userId}: ${title}`);
}

async function recordPageView(eventData: any): Promise<void> {
  console.log("Recording page view:", eventData);
}

async function recordPurchase(eventData: any): Promise<void> {
  console.log("Recording purchase:", eventData);
}

async function recordUserAction(eventData: any): Promise<void> {
  console.log("Recording user action:", eventData);
}
```

### Task Queue Functions

V2 Task Queue functions with enhanced configuration and CloudEvents format.

```typescript { .api }
/**
 * Task queue event data for V2
 */
interface TaskQueueEvent<Args = any> extends CloudEvent<Args> {
  /** Task queue name */
  queueName: string;
  /** Task retry count */
  retryCount: number;
  /** Task schedule time */
  scheduleTime: string;
}

/**
 * Create task queue function
 */
function onTaskDispatched<Args = any>(
  opts: TaskQueueOptions,
  handler: (request: TaskQueueEvent<Args>) => any | Promise<any>
): CloudFunction<TaskQueueEvent<Args>>;

/**
 * Task queue configuration options for V2
 */
interface TaskQueueOptions extends EventHandlerOptions {
  /** Rate limiting configuration */
  rateLimits?: {
    maxConcurrentDispatches?: number;
    maxDispatchesPerSecond?: number;
  };
  /** Retry configuration */
  retryConfig?: {
    maxAttempts?: number;
    maxRetryDuration?: string;
    maxBackoffDuration?: string;
    maxDoublings?: number;
    minBackoffDuration?: string;
  };
  /** Task queue invoker permissions */
  invoker?: string | string[];
  /** Task queue region */
  region?: string | Expression<string> | ResetValue;
}
```

**Usage Examples:**

```typescript
import { onTaskDispatched } from "firebase-functions/tasks";

// Email processing task with enhanced configuration
export const processEmailTask = onTaskDispatched<{
  emailData: {
    to: string;
    subject: string;
    body: string;
    template?: string;
  };
  priority: "high" | "normal" | "low";
}>(
  {
    rateLimits: {
      maxConcurrentDispatches: 20,
      maxDispatchesPerSecond: 10
    },
    retryConfig: {
      maxAttempts: 3,
      maxRetryDuration: "300s",
      minBackoffDuration: "5s",
      maxBackoffDuration: "60s"
    },
    memory: "512MiB",
    timeoutSeconds: 120
  },
  (event) => {
    const { emailData, priority } = event.data;
    
    console.log(`Processing ${priority} priority email task:`, {
      to: emailData.to,
      subject: emailData.subject,
      retryCount: event.retryCount,
      scheduleTime: event.scheduleTime,
      eventId: event.id
    });
    
    return sendEmail(emailData)
      .then(() => {
        console.log(`Email sent successfully to ${emailData.to}`);
      })
      .catch((error) => {
        console.error(`Email task failed:`, error);
        throw error; // Allow retry
      });
  }
);

// Data processing task with high throughput
export const processDataTask = onTaskDispatched<{
  dataId: string;
  operation: "transform" | "validate" | "export";
  options?: Record<string, any>;
}>(
  {
    rateLimits: {
      maxConcurrentDispatches: 100,
      maxDispatchesPerSecond: 50
    },
    retryConfig: {
      maxAttempts: 2,
      maxRetryDuration: "180s"
    },
    memory: "2GiB",
    cpu: 2
  },
  async (event) => {
    const { dataId, operation, options } = event.data;
    
    console.log(`Processing data task:`, {
      dataId,
      operation,
      retryCount: event.retryCount,
      eventId: event.id
    });
    
    try {
      switch (operation) {
        case "transform":
          return await transformData(dataId, options);
        case "validate":
          return await validateData(dataId, options);
        case "export":
          return await exportData(dataId, options);
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }
    } catch (error) {
      console.error(`Data processing failed for ${dataId}:`, error);
      
      // Update task status in database
      await admin.firestore()
        .collection("task_status")
        .doc(event.id)
        .set({
          dataId,
          operation,
          status: "failed",
          error: error.message,
          retryCount: event.retryCount,
          lastAttempt: admin.firestore.Timestamp.now()
        });
      
      throw error;
    }
  }
);

// Helper functions
async function sendEmail(emailData: any): Promise<void> {
  // Implementation for sending emails
}

async function transformData(dataId: string, options?: any): Promise<void> {
  console.log(`Transforming data ${dataId}`);
}

async function validateData(dataId: string, options?: any): Promise<void> {
  console.log(`Validating data ${dataId}`);
}

async function exportData(dataId: string, options?: any): Promise<void> {
  console.log(`Exporting data ${dataId}`);
}
```

### Identity Platform

V2 Identity Platform triggers for user lifecycle events with enhanced authentication handling.

```typescript { .api }
/**
 * Identity Platform user data for V2
 */
interface AuthUserRecord {
  uid: string;
  email?: string;
  emailVerified?: boolean;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  disabled?: boolean;
  metadata?: {
    createdAt?: string;
    lastSignedInAt?: string;
    lastRefreshAt?: string;
  };
  customClaims?: Record<string, any>;
  providerData?: Array<{
    uid: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    providerId: string;
    phoneNumber?: string;
  }>;
}

/**
 * Create trigger for user creation
 */
function onUserCreated(
  handler: (event: CloudEvent<AuthUserRecord>) => any | Promise<any>
): CloudFunction<CloudEvent<AuthUserRecord>>;

/**
 * Create trigger for user deletion
 */
function onUserDeleted(
  handler: (event: CloudEvent<AuthUserRecord>) => any | Promise<any>
): CloudFunction<CloudEvent<AuthUserRecord>>;

/**
 * Identity Platform options
 */
interface IdentityOptions extends EventHandlerOptions {
  /** Identity region */
  region?: string | Expression<string> | ResetValue;
}
```

**Usage Examples:**

```typescript
import { onUserCreated, onUserDeleted } from "firebase-functions/identity";

// User profile initialization on Identity Platform user creation
export const onIdentityUserCreate = onUserCreated((event) => {
  const user = event.data;
  
  console.log(`Identity Platform user created: ${user.uid}`, {
    email: user.email,
    displayName: user.displayName,
    providers: user.providerData?.map(p => p.providerId),
    eventId: event.id,
    eventTime: event.time
  });
  
  // Create comprehensive user profile
  return admin.firestore().collection("user_profiles").doc(user.uid).set({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || "Anonymous User",
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    emailVerified: user.emailVerified || false,
    providers: user.providerData?.map(p => ({
      providerId: p.providerId,
      uid: p.uid,
      email: p.email
    })) || [],
    createdAt: admin.firestore.Timestamp.fromDate(new Date(event.time)),
    lastLoginAt: user.metadata?.lastSignedInAt 
      ? admin.firestore.Timestamp.fromDate(new Date(user.metadata.lastSignedInAt))
      : null,
    preferences: {
      notifications: true,
      theme: "system",
      language: "en"
    },
    customClaims: user.customClaims || {}
  });
});

// Comprehensive user cleanup on Identity Platform user deletion
export const onIdentityUserDelete = onUserDeleted(async (event) => {
  const user = event.data;
  
  console.log(`Identity Platform user deleted: ${user.uid}`, {
    email: user.email,
    eventId: event.id,
    eventTime: event.time
  });
  
  // Comprehensive cleanup using batch operations
  const batch = admin.firestore().batch();
  
  // Delete user profile
  batch.delete(admin.firestore().collection("user_profiles").doc(user.uid));
  
  // Delete user-specific data collections
  const userCollections = [
    "user_settings",
    "user_preferences", 
    "user_notifications",
    "user_sessions",
    "user_analytics"
  ];
  
  for (const collectionName of userCollections) {
    const userDoc = admin.firestore().collection(collectionName).doc(user.uid);
    batch.delete(userDoc);
  }
  
  // Remove from global indexes
  batch.delete(admin.firestore().collection("user_index").doc(user.uid));
  
  // Remove from email index if email exists
  if (user.email) {
    const emailHash = Buffer.from(user.email).toString("base64");
    batch.delete(admin.firestore().collection("email_index").doc(emailHash));
  }
  
  await batch.commit();
  
  // Log deletion for audit purposes
  return admin.firestore().collection("audit_logs").add({
    action: "user_deleted",
    userId: user.uid,
    userEmail: user.email,
    deletedAt: admin.firestore.Timestamp.fromDate(new Date(event.time)),
    eventId: event.id,
    metadata: {
      providers: user.providerData?.map(p => p.providerId) || [],
      hadCustomClaims: !!(user.customClaims && Object.keys(user.customClaims).length > 0)
    }
  });
});
```

### Scheduler Triggers

V2 Cloud Scheduler integration for time-based function execution.

```typescript { .api }
/**
 * Scheduler event data for V2
 */
interface ScheduledEvent extends CloudEvent<unknown> {
  /** Job name */
  jobName: string;
  /** Schedule time */
  scheduleTime: string;
}

/**
 * Create scheduled function
 */
function onSchedule(
  schedule: string,
  handler: (event: ScheduledEvent) => any | Promise<any>
): CloudFunction<ScheduledEvent>;

function onSchedule(
  opts: ScheduleOptions,
  handler: (event: ScheduledEvent) => any | Promise<any>
): CloudFunction<ScheduledEvent>;

/**
 * Schedule configuration options
 */
interface ScheduleOptions extends EventHandlerOptions {
  /** Cron schedule expression */
  schedule?: string;
  /** Timezone for schedule */
  timeZone?: string;
  /** Scheduler region */
  region?: string | Expression<string> | ResetValue;
}
```

**Usage Examples:**

```typescript
import { onSchedule } from "firebase-functions/scheduler";

// Daily data processing
export const dailyCleanup = onSchedule("0 2 * * *", (event) => {
  console.log("Running daily cleanup job", {
    jobName: event.jobName,
    scheduleTime: event.scheduleTime,
    eventId: event.id
  });
  
  return Promise.all([
    cleanupExpiredSessions(),
    cleanupTempFiles(),
    generateDailyReports()
  ]);
});

// Weekly report with timezone
export const weeklyReport = onSchedule(
  {
    schedule: "0 8 * * 1", // Every Monday at 8 AM
    timeZone: "America/New_York"
  },
  (event) => {
    console.log("Generating weekly report", {
      scheduleTime: event.scheduleTime
    });
    
    return generateWeeklyAnalytics();
  }
);

// Helper functions
async function cleanupExpiredSessions(): Promise<void> {
  console.log("Cleaning up expired sessions");
}

async function cleanupTempFiles(): Promise<void> {
  console.log("Cleaning up temporary files");  
}

async function generateDailyReports(): Promise<void> {
  console.log("Generating daily reports");
}

async function generateWeeklyAnalytics(): Promise<void> {
  console.log("Generating weekly analytics");
}
```

### Remote Config V2

V2 Remote Config triggers with CloudEvents format.

```typescript { .api }
/**
 * Remote Config V2 event data
 */
interface RemoteConfigEvent extends CloudEvent<RemoteConfigEventData> {
  /** Config version number */
  versionNumber: string;
}

/**
 * Remote Config event payload
 */
interface RemoteConfigEventData {
  versionNumber: string;
  updateTime: string;
  updateUser: {
    name: string;
    email: string;
    imageUrl?: string;
  };
  description?: string;
  updateOrigin: string;
  updateType: string;
  rollbackSource?: string;
}

/**
 * Create Remote Config update trigger
 */
function onConfigUpdated(
  handler: (event: RemoteConfigEvent) => any | Promise<any>
): CloudFunction<RemoteConfigEvent>;

function onConfigUpdated(
  opts: RemoteConfigOptions,
  handler: (event: RemoteConfigEvent) => any | Promise<any>
): CloudFunction<RemoteConfigEvent>;

/**
 * Remote Config options
 */
interface RemoteConfigOptions extends EventHandlerOptions {
  /** Remote Config region */
  region?: string | Expression<string> | ResetValue;
}
```

**Usage Examples:**

```typescript
import { onConfigUpdated } from "firebase-functions/remoteConfig";

// Remote Config update handling
export const onRemoteConfigUpdate = onConfigUpdated((event) => {
  const configData = event.data;
  
  console.log("Remote Config updated:", {
    versionNumber: configData.versionNumber,
    updateTime: configData.updateTime,
    updateUser: configData.updateUser.email,
    updateOrigin: configData.updateOrigin,
    description: configData.description
  });
  
  // Invalidate application caches
  return Promise.all([
    invalidateAppCache(),
    notifyClientApps(configData.versionNumber),
    logConfigUpdate(configData)
  ]);
});

// Helper functions
async function invalidateAppCache(): Promise<void> {
  console.log("Invalidating application cache");
}

async function notifyClientApps(version: string): Promise<void> {
  console.log(`Notifying client apps of config version ${version}`);
}

async function logConfigUpdate(configData: any): Promise<void> {
  return admin.firestore().collection("config_updates").add({
    version: configData.versionNumber,
    updateTime: admin.firestore.Timestamp.fromDate(new Date(configData.updateTime)),
    updateUser: configData.updateUser.email,
    description: configData.description || "No description provided",
    origin: configData.updateOrigin
  });
}
```

### Eventarc Integration

Generic Eventarc triggers for custom CloudEvents integration.

```typescript { .api }
/**
 * Create generic Eventarc trigger
 */
function onCustomEventPublished(
  eventType: string,
  handler: (event: CloudEvent<any>) => any | Promise<any>
): CloudFunction<CloudEvent<any>>;

function onCustomEventPublished(
  opts: EventarcOptions,
  handler: (event: CloudEvent<any>) => any | Promise<any>
): CloudFunction<CloudEvent<any>>;

/**
 * Eventarc configuration options
 */
interface EventarcOptions extends EventHandlerOptions {
  /** Custom event type */
  eventType?: string;
  /** Event source filter */
  source?: string;
  /** Eventarc region */
  region?: string | Expression<string> | ResetValue;
}
```

**Usage Examples:**

```typescript
import { onCustomEventPublished } from "firebase-functions/eventarc";

// Custom application events
export const onCustomAppEvent = onCustomEventPublished(
  "myapp.user.action",
  (event) => {
    console.log("Custom app event received:", {
      eventType: event.type,
      source: event.source,
      data: event.data,
      eventId: event.id
    });
    
    // Process custom event
    return processCustomEvent(event.data);
  }
);

// Third-party service integration
export const onThirdPartyEvent = onCustomEventPublished(
  {
    eventType: "thirdparty.webhook.received",
    source: "//thirdparty.googleapis.com/projects/my-project",
    retry: true
  },
  (event) => {
    console.log("Third-party event received:", event.data);
    
    return handleThirdPartyWebhook(event.data);
  }
);

// Helper functions
async function processCustomEvent(data: any): Promise<void> {
  console.log("Processing custom event:", data);
}

async function handleThirdPartyWebhook(data: any): Promise<void> {
  console.log("Handling third-party webhook:", data);
}
```

## Common V2 Types and Utilities

### Path Parameter Extraction

```typescript { .api }
/**
 * Extract path parameters from template strings
 */
type ParamsOf<Path extends string> = Path extends `${infer _Prefix}/{${infer Param}}${infer Suffix}`
  ? { [K in Param | keyof ParamsOf<Suffix>]: string }
  : {};

/**
 * Change detection for before/after comparisons
 */
interface Change<T> {
  /** State before the change */
  before: T;
  /** State after the change */
  after: T;
}
```

### Shared Utilities

```typescript { .api }
/**
 * Shared parameter system (same as V1)
 */
const params: typeof import("firebase-functions/params");

/**
 * Tracing context utilities
 */
const traceContext: {
  getTraceId(): string | undefined;
  getSpanId(): string | undefined;
};

/**
 * Admin SDK configuration
 */
const app: {
  setEmulatedAdminApp(app: any): void;
};
```