# V1 API (Legacy)

The V1 API provides the legacy Firebase Cloud Functions interface with traditional event handlers and function builders. While V2 is recommended for new projects, V1 remains fully supported and is widely used in existing codebases.

## Capabilities

### Core Function Building

The V1 API uses a builder pattern for configuring and creating functions.

```typescript { .api }
/**
 * Core function builder for configuring runtime options and deployment settings
 */
class FunctionBuilder {
  /**
   * Configure deployment regions for the function
   * @param regions - One or more region strings or expressions
   * @returns FunctionBuilder for method chaining
   */
  region(...regions: Array<string | Expression<string> | ResetValue>): FunctionBuilder;
  
  /**
   * Configure runtime options such as memory, timeout, and networking
   * @param runtimeOptions - Runtime configuration options
   * @returns FunctionBuilder for method chaining
   */
  runWith(runtimeOptions: RuntimeOptions): FunctionBuilder;
  
  // Provider-specific builders
  readonly https: HttpsBuilder;
  readonly database: DatabaseBuilder;
  readonly firestore: FirestoreBuilder;
  readonly auth: AuthBuilder;
  readonly storage: StorageBuilder;
  readonly pubsub: PubSubBuilder;
  readonly analytics: AnalyticsBuilder;
  readonly remoteConfig: RemoteConfigBuilder;
  readonly tasks: TasksBuilder;
  readonly testLab: TestLabBuilder;
}

/**
 * Main module functions for creating configured function builders
 */
function region(...regions: string[]): FunctionBuilder;
function runWith(runtimeOptions: RuntimeOptions): FunctionBuilder;
```

### Runtime Configuration

```typescript { .api }
/**
 * Supported memory options for V1 functions
 */
const VALID_MEMORY_OPTIONS = ["128MB", "256MB", "512MB", "1GB", "2GB", "4GB", "8GB"] as const;

/**
 * Supported deployment regions for V1 functions
 */
const SUPPORTED_REGIONS = [
  "us-central1", "us-east1", "us-east4", "us-west2", "us-west3", "us-west4",
  "europe-central2", "europe-west1", "europe-west2", "europe-west3", "europe-west6",
  "asia-east1", "asia-east2", "asia-northeast1", "asia-northeast2", "asia-northeast3",
  "asia-south1", "asia-southeast1", "asia-southeast2",
  "northamerica-northeast1", "southamerica-east1", "australia-southeast1"
] as const;

/**
 * Runtime configuration options for V1 functions
 */
interface RuntimeOptions {
  /** Failure policy configuration (true enables retry with exponential backoff) */
  failurePolicy?: FailurePolicy | boolean;
  /** Memory allocation for the function */
  memory?: (typeof VALID_MEMORY_OPTIONS)[number] | Expression<number> | ResetValue;
  /** Maximum execution time in seconds (up to 540s) */
  timeoutSeconds?: number | Expression<number> | ResetValue;
  /** Minimum number of instances to keep warm */
  minInstances?: number | Expression<number> | ResetValue;
  /** Maximum number of instances for scaling */
  maxInstances?: number | Expression<number> | ResetValue;
  /** VPC connector for private networking */
  vpcConnector?: string | Expression<string> | ResetValue;
  /** VPC connector egress settings */
  vpcConnectorEgressSettings?: "VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED" | "PRIVATE_RANGES_ONLY" | "ALL_TRAFFIC" | ResetValue;
  /** Service account for function execution */
  serviceAccount?: "default" | string | Expression<string> | ResetValue;
  /** Ingress settings for function access */
  ingressSettings?: "INGRESS_SETTINGS_UNSPECIFIED" | "ALLOW_ALL" | "ALLOW_INTERNAL_ONLY" | "ALLOW_INTERNAL_AND_GCLB" | ResetValue;
  /** Custom labels for the function */
  labels?: Record<string, string>;
  /** Function invoker permissions */
  invoker?: "public" | "private" | string | string[];
  /** Secret bindings for the function */
  secrets?: (string | SecretParam)[];
  /** Enforce App Check token validation */
  enforceAppCheck?: boolean;
  /** Consume App Check token on invocation */
  consumeAppCheckToken?: boolean;
  /** Preserve external changes to the function */
  preserveExternalChanges?: boolean;
}

/**
 * Deployment configuration options extending runtime options
 */
interface DeploymentOptions extends RuntimeOptions {
  /** Omit function from deployment */
  omit?: boolean | Expression<boolean>;
  /** Target deployment regions */
  regions?: Array<(typeof SUPPORTED_REGIONS)[number] | string | Expression<string> | ResetValue>;
  /** Schedule configuration for periodic execution */
  schedule?: Schedule;
}
```

**Usage Examples:**

```typescript
import * as functions from "firebase-functions/v1";

// Basic function configuration
export const api = functions
  .region("us-central1", "europe-west1")
  .runWith({
    memory: "1GB",
    timeoutSeconds: 60
  })
  .https.onRequest((req, res) => {
    res.json({ message: "Hello from configured function!" });
  });

// Advanced configuration with networking and security
export const secureApi = functions
  .runWith({
    memory: "2GB",
    vpcConnector: "projects/my-project/locations/us-central1/connectors/my-connector",
    serviceAccount: "custom-service@my-project.iam.gserviceaccount.com",
    invoker: ["user@example.com"],
    enforceAppCheck: true
  })
  .https.onCall((data, context) => {
    return { processed: true };
  });
```

### Core Function Types

```typescript { .api }
/**
 * Core cloud function interface for V1 functions
 */
interface CloudFunction<T> extends Runnable<T> {
  /** Function handler that processes input data and context */
  (input: any, context?: any): PromiseLike<any> | any;
  /** Trigger annotation for the Functions Framework */
  __trigger: TriggerAnnotation;
  /** Endpoint manifest for deployment */
  __endpoint: ManifestEndpoint;
  /** Required APIs for the function */
  __requiredAPIs?: ManifestRequiredAPI[];
}

/**
 * HTTPS function interface for HTTP request handlers
 */
interface HttpsFunction {
  /** HTTP request handler */
  (req: Request, resp: Response): void | Promise<void>;
  /** Trigger annotation for the Functions Framework */
  __trigger: TriggerAnnotation;
  /** Endpoint manifest for deployment */
  __endpoint: ManifestEndpoint;
  /** Required APIs for the function */
  __requiredAPIs?: ManifestRequiredAPI[];
}

/**
 * Blocking function interface for authentication blocking functions
 */
interface BlockingFunction {
  /** Blocking function handler */
  (req: Request, resp: Response): void | Promise<void>;
  /** Trigger annotation for the Functions Framework */
  __trigger: TriggerAnnotation;
  /** Endpoint manifest for deployment */
  __endpoint: ManifestEndpoint;
  /** Required APIs for the function */
  __requiredAPIs?: ManifestRequiredAPI[];
}

/**
 * Event context providing metadata about function invocation
 */
interface EventContext<Params = Record<string, string>> {
  /** Authentication information (if available) */
  auth?: { uid: string; token: EventContextAuthToken };
  /** Type of authentication used */
  authType?: "ADMIN" | "USER" | "UNAUTHENTICATED";
  /** Unique identifier for this event */
  eventId: string;
  /** Type of event that triggered the function */
  eventType: string;
  /** Path parameters extracted from the trigger */
  params: Params;
  /** Resource that generated the event */
  resource: Resource;
  /** ISO timestamp when the event occurred */
  timestamp: string;
}

/**
 * Resource information in event context
 */
interface Resource {
  /** Service that generated the event */
  service: string;
  /** Resource name/path */
  name: string;
  /** Resource type */
  type?: string;
  /** Resource labels */
  labels?: { [tag: string]: string };
}
```

### HTTPS Functions

HTTP request handlers and callable functions with authentication and validation support.

```typescript { .api }
/**
 * HTTPS function builders
 */
interface HttpsBuilder {
  /**
   * Create an HTTP request handler function
   * @param handler - Function to handle HTTP requests
   * @returns HttpsFunction for HTTP request handling
   */
  onRequest(handler: (req: Request, resp: Response) => void | Promise<void>): HttpsFunction;
  
  /**
   * Create a callable function for client SDK invocation
   * @param handler - Function to handle callable requests
   * @returns HttpsFunction for callable invocation
   */
  onCall(handler: (data: any, context: CallableContext) => any | Promise<any>): HttpsFunction;
}

/**
 * Express.js Request interface for HTTP functions
 */
interface Request extends express.Request {
  /** Request body data */
  body: any;
  /** Query parameters */
  query: { [key: string]: any };
  /** Request headers */
  headers: { [key: string]: string };
  /** Request method */
  method: string;
  /** Request URL */
  url: string;
}

/**
 * Context for callable functions with authentication and app information
 */
interface CallableContext {
  /** Authenticated user information */
  auth?: {
    uid: string;
    token: DecodedIdToken;
  };
  /** Application information */
  app?: {
    appId: string;
    installationId?: string;
  };
  /** Raw request for advanced use cases */
  rawRequest: express.Request;
  /** Instance ID token for authentication */
  instanceIdToken?: string;
}

/**
 * Error codes for callable function errors
 */
type FunctionsErrorCode =
  | "ok"
  | "cancelled" 
  | "unknown"
  | "invalid-argument"
  | "deadline-exceeded"
  | "not-found"
  | "already-exists"
  | "permission-denied"
  | "resource-exhausted"
  | "failed-precondition"
  | "aborted"
  | "out-of-range"
  | "unimplemented"
  | "internal"
  | "unavailable"
  | "data-loss"
  | "unauthenticated";

/**
 * HTTPS error class for callable functions
 */
class HttpsError extends Error {
  constructor(code: FunctionsErrorCode, message: string, details?: any);
  readonly code: FunctionsErrorCode;
  readonly details: any;
}
```

**Usage Examples:**

```typescript
import * as functions from "firebase-functions/v1";
import { HttpsError } from "firebase-functions/v1/https";

// HTTP request handler
export const api = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }
  
  const { name } = req.body;
  res.json({ greeting: `Hello, ${name}!` });
});

// Callable function with validation and error handling
export const processPayment = functions.https.onCall((data, context) => {
  // Check authentication
  if (!context.auth) {
    throw new HttpsError("unauthenticated", "User must be authenticated");
  }
  
  // Validate input
  if (!data.amount || data.amount <= 0) {
    throw new HttpsError("invalid-argument", "Amount must be positive");
  }
  
  // Process payment logic here
  return {
    paymentId: "pay_123",
    amount: data.amount,
    userId: context.auth.uid
  };
});
```

### Database Triggers

Firebase Realtime Database change event handlers with path parameter support.

```typescript { .api }
/**
 * Database builder for targeting specific database instances
 */
interface DatabaseBuilder {
  /**
   * Target a specific Realtime Database instance
   * @param instance - Database instance URL or ID
   * @returns InstanceBuilder for that instance
   */
  instance(instance: string): InstanceBuilder;
  
  /**
   * Create a reference trigger on the default database
   * @param path - Database path with optional parameters in {param} format
   * @returns RefBuilder for the path
   */
  ref<Ref extends string>(path: Ref): RefBuilder<Ref>;
}

/**
 * Instance builder for database instance-specific triggers
 */
interface InstanceBuilder {
  /**
   * Create a reference trigger on this database instance
   * @param path - Database path with optional parameters in {param} format  
   * @returns RefBuilder for the path
   */
  ref<Ref extends string>(path: Ref): RefBuilder<Ref>;
}

/**
 * Reference builder for creating database triggers on specific paths
 */
interface RefBuilder<Ref extends string> {
  /**
   * Trigger on any write (create, update, or delete) to this path
   * @param handler - Function to handle write events
   * @returns CloudFunction for write events
   */
  onWrite(handler: (change: Change<DataSnapshot>, context: EventContext<ParamsOf<Ref>>) => PromiseLike<any> | any): CloudFunction<Change<DataSnapshot>>;
  
  /**
   * Trigger on updates to existing data at this path
   * @param handler - Function to handle update events  
   * @returns CloudFunction for update events
   */
  onUpdate(handler: (change: Change<DataSnapshot>, context: EventContext<ParamsOf<Ref>>) => PromiseLike<any> | any): CloudFunction<Change<DataSnapshot>>;
  
  /**
   * Trigger on creation of new data at this path
   * @param handler - Function to handle create events
   * @returns CloudFunction for create events
   */
  onCreate(handler: (snapshot: DataSnapshot, context: EventContext<ParamsOf<Ref>>) => PromiseLike<any> | any): CloudFunction<DataSnapshot>;
  
  /**
   * Trigger on deletion of data at this path
   * @param handler - Function to handle delete events
   * @returns CloudFunction for delete events
   */
  onDelete(handler: (snapshot: DataSnapshot, context: EventContext<ParamsOf<Ref>>) => PromiseLike<any> | any): CloudFunction<DataSnapshot>;
}

/**
 * Realtime Database data snapshot
 */
interface DataSnapshot {
  /** Get the data as a JavaScript value */
  val(): any;
  /** Check if the snapshot contains data */
  exists(): boolean;
  /** Get a child snapshot */
  child(path: string): DataSnapshot;
  /** Iterate over child snapshots */
  forEach(action: (child: DataSnapshot) => boolean | void): boolean;
  /** Check if snapshot has a child at the given path */
  hasChild(path: string): boolean;
  /** Check if snapshot has any children */
  hasChildren(): boolean;
  /** Get the key (name) of this snapshot's location */
  key: string | null;
  /** Get the number of children */
  numChildren(): number;
  /** Get the reference to this snapshot's location */
  ref: Reference;
  /** Export the entire contents as a JavaScript object */
  exportVal(): any;
  /** Get the priority of the data */
  getPriority(): string | number | null;
}
```

**Usage Examples:**

```typescript
import * as functions from "firebase-functions/v1";

// User profile creation trigger
export const onUserProfileCreate = functions.database
  .ref("/users/{userId}/profile")
  .onCreate((snapshot, context) => {
    const profile = snapshot.val();
    const { userId } = context.params;
    
    console.log(`New profile created for user ${userId}:`, profile);
    
    // Initialize user settings
    return snapshot.ref.parent?.child("settings").set({
      notifications: true,
      theme: "light",
      createdAt: new Date().toISOString()
    });
  });

// Chat message handler with before/after comparison
export const onMessageUpdate = functions.database
  .ref("/chats/{chatId}/messages/{messageId}")
  .onWrite((change, context) => {
    const { chatId, messageId } = context.params;
    
    if (!change.before.exists()) {
      // New message
      const message = change.after.val();
      console.log(`New message in ${chatId}: ${message.text}`);
    } else if (!change.after.exists()) {
      // Message deleted
      console.log(`Message ${messageId} deleted from ${chatId}`);
    } else {
      // Message updated
      const before = change.before.val();
      const after = change.after.val();
      console.log(`Message updated in ${chatId}:`, { before, after });
    }
  });

// Multi-database instance support  
export const onDevDataChange = functions.database
  .instance("my-project-dev-default-rtdb")
  .ref("/data/{id}")
  .onUpdate((change, context) => {
    console.log("Dev database data changed:", context.params.id);
  });
```

### Firestore Triggers

Cloud Firestore document change event handlers with collection and document targeting.

```typescript { .api }
/**
 * Firestore builder for targeting databases and namespaces
 */
interface FirestoreBuilder {
  /**
   * Target a specific Firestore database
   * @param database - Database ID (default: "(default)")
   * @returns DatabaseBuilder for that database
   */
  database(database: string): FirestoreDatabaseBuilder;
  
  /**
   * Target a specific namespace (multi-tenancy)
   * @param namespace - Namespace ID
   * @returns NamespaceBuilder for that namespace
   */
  namespace(namespace: string): NamespaceBuilder;
  
  /**
   * Create a document trigger on the default database
   * @param path - Document path with optional parameters in {param} format
   * @returns DocumentBuilder for the path
   */
  document<Path extends string>(path: Path): DocumentBuilder<Path>;
}

/**
 * Database builder for Firestore database-specific triggers
 */
interface FirestoreDatabaseBuilder {
  /**
   * Target a specific namespace within this database
   * @param namespace - Namespace ID
   * @returns NamespaceBuilder for that namespace
   */
  namespace(namespace: string): NamespaceBuilder;
  
  /**
   * Create a document trigger within this database
   * @param path - Document path with optional parameters in {param} format
   * @returns DocumentBuilder for the path
   */
  document<Path extends string>(path: Path): DocumentBuilder<Path>;
}

/**
 * Namespace builder for multi-tenant Firestore applications
 */
interface NamespaceBuilder {
  /**
   * Create a document trigger within this namespace
   * @param path - Document path with optional parameters in {param} format
   * @returns DocumentBuilder for the path
   */
  document<Path extends string>(path: Path): DocumentBuilder<Path>;
}

/**
 * Document builder for creating Firestore document triggers
 */
interface DocumentBuilder<Path extends string> {
  /**
   * Trigger on any write (create, update, or delete) to this document
   * @param handler - Function to handle write events
   * @returns CloudFunction for write events
   */
  onWrite(handler: (change: Change<DocumentSnapshot>, context: EventContext<ParamsOf<Path>>) => PromiseLike<any> | any): CloudFunction<Change<DocumentSnapshot>>;
  
  /**
   * Trigger on updates to existing documents at this path
   * @param handler - Function to handle update events
   * @returns CloudFunction for update events
   */
  onUpdate(handler: (change: Change<QueryDocumentSnapshot>, context: EventContext<ParamsOf<Path>>) => PromiseLike<any> | any): CloudFunction<Change<QueryDocumentSnapshot>>;
  
  /**
   * Trigger on creation of new documents at this path
   * @param handler - Function to handle create events  
   * @returns CloudFunction for create events
   */
  onCreate(handler: (snapshot: QueryDocumentSnapshot, context: EventContext<ParamsOf<Path>>) => PromiseLike<any> | any): CloudFunction<QueryDocumentSnapshot>;
  
  /**
   * Trigger on deletion of documents at this path
   * @param handler - Function to handle delete events
   * @returns CloudFunction for delete events
   */
  onDelete(handler: (snapshot: QueryDocumentSnapshot, context: EventContext<ParamsOf<Path>>) => PromiseLike<any> | any): CloudFunction<QueryDocumentSnapshot>;
}

/**
 * Firestore document snapshot interface
 */
interface DocumentSnapshot {
  /** Check if the document exists */
  exists: boolean;
  /** Document reference */
  ref: DocumentReference;
  /** Document ID */
  id: string;
  /** Document metadata */
  metadata: SnapshotMetadata;
  /** Get document data */
  data(): DocumentData | undefined;
  /** Get a specific field value */
  get(fieldPath: string): any;
  /** Check if document is equal to another */
  isEqual(other: DocumentSnapshot): boolean;
}

/**
 * Firestore query document snapshot (guaranteed to exist)
 */
interface QueryDocumentSnapshot extends DocumentSnapshot {
  /** Check if the document exists (always true) */
  exists: true;
  /** Get document data (never undefined) */
  data(): DocumentData;
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
import * as functions from "firebase-functions/v1";

// User document creation with initialization
export const onUserCreate = functions.firestore
  .document("users/{userId}")
  .onCreate((snapshot, context) => {
    const userData = snapshot.data();
    const { userId } = context.params;
    
    console.log(`New user created: ${userId}`, userData);
    
    // Initialize user metadata
    return snapshot.ref.collection("metadata").doc("profile").set({
      createdAt: new Date(),
      lastLoginAt: null,
      loginCount: 0
    });
  });

// Order status update with inventory management
export const onOrderUpdate = functions.firestore
  .document("orders/{orderId}")
  .onUpdate((change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const { orderId } = context.params;
    
    // Check if status changed to 'completed'
    if (before.status !== 'completed' && after.status === 'completed') {
      console.log(`Order ${orderId} completed, updating inventory`);
      
      // Update inventory for each item
      const batch = change.after.ref.firestore.batch();
      after.items.forEach((item: any) => {
        const inventoryRef = change.after.ref.firestore
          .collection("inventory")
          .doc(item.productId);
        
        batch.update(inventoryRef, {
          quantity: admin.firestore.FieldValue.increment(-item.quantity),
          lastUpdated: new Date()
        });
      });
      
      return batch.commit();
    }
    
    return null;
  });

// Multi-database support
export const onTestDocCreate = functions.firestore
  .database("test-database")  
  .document("test-collection/{docId}")
  .onCreate((snapshot, context) => {
    console.log("Test document created in test database");
  });

// Namespace support for multi-tenancy
export const onTenantDataUpdate = functions.firestore
  .namespace("tenant-a")
  .document("data/{dataId}")
  .onWrite((change, context) => {
    console.log("Tenant A data changed");
  });
```

### Authentication Triggers

Firebase Authentication user lifecycle events and blocking functions for custom authentication flows.

```typescript { .api }
/**
 * Authentication builder for user lifecycle events
 */
interface AuthBuilder {
  /**
   * Create user authentication triggers and blocking functions
   * @param userOptions - Optional configuration for blocking functions
   * @returns UserBuilder for user events
   */
  user(userOptions?: UserOptions): UserBuilder;
}

/**
 * User builder for authentication event handlers
 */
interface UserBuilder {
  /**
   * Trigger when a new user account is created
   * @param handler - Function to handle user creation
   * @returns CloudFunction for user creation events
   */
  onCreate(handler: (user: UserRecord, context: EventContext) => PromiseLike<any> | any): CloudFunction<UserRecord>;
  
  /**
   * Trigger when a user account is deleted
   * @param handler - Function to handle user deletion  
   * @returns CloudFunction for user deletion events
   */
  onDelete(handler: (user: UserRecord, context: EventContext) => PromiseLike<any> | any): CloudFunction<UserRecord>;
  
  /**
   * Blocking function that runs before user account creation
   * @param handler - Function to handle pre-creation logic
   * @returns BlockingFunction for user creation blocking
   */
  beforeCreate(handler: (user: AuthUserRecord, context: AuthEventContext) => MaybeAsync<BeforeCreateResponse | void>): BlockingFunction;
  
  /**
   * Blocking function that runs before user sign-in
   * @param handler - Function to handle pre-sign-in logic
   * @returns BlockingFunction for user sign-in blocking  
   */
  beforeSignIn(handler: (user: AuthUserRecord, context: AuthEventContext) => MaybeAsync<BeforeSignInResponse | void>): BlockingFunction;
  
  /**
   * Blocking function that runs before sending verification emails
   * @param handler - Function to handle pre-email logic
   * @returns BlockingFunction for email blocking
   */
  beforeEmail(handler: (context: AuthEventContext) => MaybeAsync<BeforeEmailResponse | void>): BlockingFunction;
  
  /**
   * Blocking function that runs before sending SMS verification
   * @param handler - Function to handle pre-SMS logic  
   * @returns BlockingFunction for SMS blocking
   */
  beforeSms(handler: (context: AuthEventContext) => MaybeAsync<BeforeSmsResponse | void>): BlockingFunction;
}

/**
 * Configuration options for authentication blocking functions
 */
interface UserOptions {
  blockingOptions?: {
    /** Include ID token in blocking function context */
    idToken?: boolean;
    /** Include access token in blocking function context */
    accessToken?: boolean;
    /** Include refresh token in blocking function context */
    refreshToken?: boolean;
  };
}

/**
 * Firebase Auth user record interface
 */
interface UserRecord {
  /** User's unique ID */
  uid: string;
  /** User's email address */
  email?: string;
  /** Whether email is verified */
  emailVerified: boolean;
  /** User's display name */
  displayName?: string;
  /** User's photo URL */
  photoURL?: string;
  /** Phone number */
  phoneNumber?: string;
  /** Whether user is disabled */
  disabled: boolean;
  /** User metadata */
  metadata: UserMetadata;
  /** Custom claims */
  customClaims?: Record<string, any>;
  /** Provider data */
  providerData: UserInfo[];
  /** Password hash */
  passwordHash?: string;
  /** Password salt */
  passwordSalt?: string;
}

/**
 * User record for blocking functions (may be incomplete)
 */
interface AuthUserRecord {
  /** User's unique ID */
  uid: string;
  /** User's email address */
  email?: string;
  /** Whether email is verified */
  emailVerified?: boolean;
  /** User's display name */
  displayName?: string;
  /** User's photo URL */
  photoURL?: string;
  /** Phone number */
  phoneNumber?: string;
  /** Whether user is disabled */
  disabled?: boolean;
  /** User metadata */
  metadata?: UserMetadata;
  /** Custom claims */
  customClaims?: Record<string, any>;
  /** Provider data */
  providerData?: UserInfo[];
}

/**
 * Authentication event context for blocking functions
 */
interface AuthEventContext {
  /** Firebase project locale */
  locale?: string;
  /** Client IP address */
  ipAddress?: string;
  /** User agent string */
  userAgent?: string;
  /** Event ID */
  eventId?: string;
  /** Event type */
  eventType?: string;
  /** Authentication method used */
  authType?: string;
  /** Resource information */
  resource?: string;
  /** Event timestamp */
  timestamp?: string;
}

/**
 * Response for beforeCreate blocking function
 */
interface BeforeCreateResponse {
  /** Display name to set */
  displayName?: string;
  /** Custom claims to set */
  customClaims?: Record<string, any>;
}

/**
 * Response for beforeSignIn blocking function  
 */
interface BeforeSignInResponse {
  /** Custom claims to set */
  customClaims?: Record<string, any>;
  /** Session claims to add to ID token */
  sessionClaims?: Record<string, any>;
}

/**
 * Response for beforeEmail blocking function
 */
interface BeforeEmailResponse {
  /** Custom email template to use */
  emailTemplate?: {
    subject?: string;
    body?: string;
  };
}

/**
 * Response for beforeSms blocking function
 */
interface BeforeSmsResponse {
  /** Custom SMS template to use */
  smsTemplate?: {
    body?: string;
  };
}
```

**Usage Examples:**

```typescript
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";

// User creation handler with profile initialization
export const onUserCreate = functions.auth.user().onCreate((user, context) => {
  console.log(`New user created: ${user.uid}`);
  
  // Create user profile document
  return admin.firestore().collection("profiles").doc(user.uid).set({
    email: user.email,
    displayName: user.displayName || "Anonymous",
    photoURL: user.photoURL || null,
    createdAt: new Date(),
    preferences: {
      notifications: true,
      theme: "light"
    }
  });
});

// User deletion cleanup
export const onUserDelete = functions.auth.user().onDelete((user, context) => {
  console.log(`User deleted: ${user.uid}`);
  
  // Clean up user data
  const batch = admin.firestore().batch();
  
  // Delete user profile
  batch.delete(admin.firestore().collection("profiles").doc(user.uid));
  
  // Delete user-specific collections (you might want to do this differently)
  return batch.commit().then(() => {
    console.log(`Cleanup completed for user ${user.uid}`);
  });
});

// Blocking function to add custom claims on user creation
export const beforeUserCreate = functions.auth.user().beforeCreate((user, context) => {
  // Add custom claims based on email domain
  const customClaims: Record<string, any> = {};
  
  if (user.email?.endsWith("@admin.example.com")) {
    customClaims.role = "admin";
    customClaims.permissions = ["read", "write", "delete"];
  } else if (user.email?.endsWith("@example.com")) {
    customClaims.role = "user";
    customClaims.permissions = ["read", "write"];
  }
  
  return {
    customClaims,
    displayName: user.displayName || `User ${user.uid.substring(0, 8)}`
  };
});

// Blocking function to enforce security policies on sign-in
export const beforeUserSignIn = functions.auth.user().beforeSignIn((user, context) => {
  // Block sign-in from certain IP ranges
  const blockedIPRanges = ["192.168.1.", "10.0.0."];
  const clientIP = context.ipAddress || "";
  
  if (blockedIPRanges.some(range => clientIP.startsWith(range))) {
    throw new functions.auth.HttpsError(
      "permission-denied",
      "Sign-in not allowed from this location"
    );
  }
  
  // Add session-specific claims
  return {
    sessionClaims: {
      signInTime: Date.now(),
      ipAddress: clientIP,
      userAgent: context.userAgent
    }
  };
});
```

### Storage Triggers

Cloud Storage object change event handlers for file processing and lifecycle management.

```typescript { .api }
/**
 * Storage builder for targeting specific buckets
 */
interface StorageBuilder {
  /**
   * Target a specific Cloud Storage bucket
   * @param bucket - Bucket name (default: project default bucket)
   * @returns BucketBuilder for that bucket
   */
  bucket(bucket?: string): BucketBuilder;
  
  /**
   * Create object triggers on the default bucket
   * @returns ObjectBuilder for object events
   */
  object(): ObjectBuilder;
}

/**
 * Bucket builder for bucket-specific object triggers
 */
interface BucketBuilder {
  /**
   * Create object triggers within this bucket
   * @returns ObjectBuilder for object events in this bucket
   */
  object(): ObjectBuilder;
}

/**
 * Object builder for creating storage object triggers
 */
interface ObjectBuilder {
  /**
   * Trigger when an object is successfully created/uploaded
   * @param handler - Function to handle object finalization
   * @returns CloudFunction for object finalization events
   */
  onFinalize(handler: (object: ObjectMetadata, context: EventContext) => PromiseLike<any> | any): CloudFunction<ObjectMetadata>;
  
  /**
   * Trigger when an object is deleted
   * @param handler - Function to handle object deletion
   * @returns CloudFunction for object deletion events  
   */
  onDelete(handler: (object: ObjectMetadata, context: EventContext) => PromiseLike<any> | any): CloudFunction<ObjectMetadata>;
  
  /**
   * Trigger when an object is archived
   * @param handler - Function to handle object archival
   * @returns CloudFunction for object archival events
   */
  onArchive(handler: (object: ObjectMetadata, context: EventContext) => PromiseLike<any> | any): CloudFunction<ObjectMetadata>;
  
  /**
   * Trigger when object metadata is updated
   * @param handler - Function to handle metadata updates
   * @returns CloudFunction for metadata update events
   */
  onMetadataUpdate(handler: (object: ObjectMetadata, context: EventContext) => PromiseLike<any> | any): CloudFunction<ObjectMetadata>;
}

/**
 * Cloud Storage object metadata
 */
interface ObjectMetadata {
  /** Object name/path */
  name: string;
  /** Bucket name */
  bucket: string;
  /** Generation number */
  generation: string;
  /** Metageneration number */
  metageneration: string;
  /** Content type */
  contentType?: string;
  /** Content encoding */
  contentEncoding?: string;
  /** Content disposition */
  contentDisposition?: string;
  /** Content language */
  contentLanguage?: string;
  /** Cache control */
  cacheControl?: string;
  /** Object size in bytes */
  size: string;
  /** MD5 hash */
  md5Hash?: string;
  /** CRC32C checksum */
  crc32c?: string;
  /** ETag */
  etag: string;
  /** Creation time */
  timeCreated: string;
  /** Update time */
  updated: string;
  /** Storage class */
  storageClass: string;
  /** Custom metadata */
  metadata?: { [key: string]: string };
  /** Customer-managed encryption key */
  customerEncryption?: {
    encryptionAlgorithm: string;
    keySha256: string;
  };
}
```

**Usage Examples:**

```typescript
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { getStorage } from "firebase-admin/storage";

// Image processing on upload
export const processImage = functions.storage.object().onFinalize((object) => {
  const { name, bucket, contentType } = object;
  
  // Only process images
  if (!contentType?.startsWith("image/")) {
    console.log("Not an image file, skipping processing");
    return null;
  }
  
  console.log(`Processing image: ${name} in bucket ${bucket}`);
  
  // Generate thumbnail (pseudo-code - you'd use a library like Sharp)
  // const thumbnailPath = name.replace(/(\.[^.]+)$/, '_thumb$1');
  // return generateThumbnail(bucket, name, thumbnailPath);
  
  return null;
});

// File cleanup on deletion with metadata tracking
export const onFileDelete = functions.storage.object().onDelete((object, context) => {
  const { name, bucket } = object;
  
  console.log(`File deleted: ${name} from ${bucket}`);
  
  // Update deletion log in Firestore
  return admin.firestore().collection("file_deletions").add({
    fileName: name,
    bucket: bucket,
    deletedAt: new Date(),
    size: parseInt(object.size),
    eventId: context.eventId
  });
});

// Metadata update handler for file organization
export const onMetadataUpdate = functions.storage.object().onMetadataUpdate((object, context) => {
  const { name, metadata } = object;
  
  // Check if file was tagged for processing
  if (metadata?.processStatus === "pending") {
    console.log(`File ${name} marked for processing`);
    
    // Trigger processing workflow
    return admin.firestore().collection("processing_queue").add({
      fileName: name,
      bucket: object.bucket,
      queuedAt: new Date(),
      priority: metadata.priority || "normal"
    });
  }
  
  return null;
});

// Bucket-specific handlers
export const onUploadsFinalize = functions.storage
  .bucket("my-app-uploads")
  .object()
  .onFinalize((object) => {
    console.log(`File uploaded to uploads bucket: ${object.name}`);
    
    // Virus scan for uploaded files
    return scanFileForViruses(object.bucket, object.name);
  });

export const onBackupArchive = functions.storage
  .bucket("my-app-backups")  
  .object()
  .onArchive((object) => {
    console.log(`Backup archived: ${object.name}`);
    
    // Update backup inventory
    return admin.firestore()
      .collection("backup_inventory")
      .doc(object.name)
      .update({
        status: "archived",
        archivedAt: new Date()
      });
  });

// Helper function (implementation would depend on your virus scanning service)
async function scanFileForViruses(bucket: string, fileName: string): Promise<void> {
  // Implement virus scanning logic
  console.log(`Scanning ${fileName} in ${bucket} for viruses`);
}
```

### Pub/Sub and Scheduling

Cloud Pub/Sub message triggers and Cloud Scheduler integration for event-driven and time-based functions.

```typescript { .api }
/**
 * Pub/Sub builder for messaging and scheduling
 */
interface PubSubBuilder {
  /**
   * Create a trigger for messages published to a Pub/Sub topic
   * @param topic - Pub/Sub topic name
   * @returns TopicBuilder for that topic
   */
  topic(topic: string): TopicBuilder;
  
  /**
   * Create a scheduled function using cron syntax
   * @param schedule - Cron schedule expression
   * @returns ScheduleBuilder for scheduled execution
   */
  schedule(schedule: string): ScheduleBuilder;
}

/**
 * Topic builder for Pub/Sub message handlers
 */
interface TopicBuilder {
  /**
   * Handle messages published to this topic
   * @param handler - Function to handle published messages
   * @returns CloudFunction for message handling
   */
  onPublish(handler: (message: Message, context: EventContext) => PromiseLike<any> | any): CloudFunction<Message>;
}

/**
 * Schedule builder for time-based function execution
 */
interface ScheduleBuilder {
  /**
   * Execute function on the defined schedule
   * @param handler - Function to execute on schedule
   * @returns CloudFunction for scheduled execution
   */
  onRun(handler: (context: EventContext) => PromiseLike<any> | any): CloudFunction<unknown>;
}

/**
 * Pub/Sub message interface
 */
interface Message {
  /** Message data (base64 encoded) */
  data: string;
  /** Message attributes */
  attributes: { [key: string]: string };
  /** Message ID */
  messageId: string;
  /** Publish time */
  publishTime: string;
  /** Ordering key for ordered delivery */
  orderingKey?: string;
  
  /**
   * Decode message data as JSON
   * @returns Parsed JSON object
   */
  json: any;
}
```

**Usage Examples:**

```typescript
import * as functions from "firebase-functions/v1";

// Handle user notifications via Pub/Sub
export const sendNotification = functions.pubsub
  .topic("user-notifications")
  .onPublish((message, context) => {
    const notificationData = message.json;
    
    console.log("Processing notification:", {
      messageId: message.messageId,
      publishTime: message.publishTime,
      data: notificationData
    });
    
    // Send notification to user
    return sendPushNotification(
      notificationData.userId,
      notificationData.title,
      notificationData.body
    );
  });

// Process analytics events
export const processAnalytics = functions.pubsub
  .topic("analytics-events")
  .onPublish((message, context) => {
    const event = message.json;
    
    // Process different event types
    switch (event.type) {
      case "page_view":
        return recordPageView(event);
      case "purchase":
        return recordPurchase(event);
      case "user_signup":
        return recordUserSignup(event);
      default:
        console.log(`Unknown event type: ${event.type}`);
        return null;
    }
  });

// Daily data processing job
export const dailyDataProcess = functions.pubsub
  .schedule("0 2 * * *") // Every day at 2 AM
  .onRun((context) => {
    console.log("Starting daily data processing job");
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    return processDataForDate(yesterday);
  });

// Hourly cleanup job
export const hourlyCleanup = functions.pubsub
  .schedule("0 * * * *") // Every hour
  .onRun((context) => {
    console.log("Running hourly cleanup");
    
    // Clean up temporary files, expired sessions, etc.
    return Promise.all([
      cleanupTempFiles(),
      cleanupExpiredSessions(),
      cleanupOldLogs()
    ]);
  });

// Weekly report generation
export const weeklyReport = functions.pubsub
  .schedule("0 8 * * 1") // Every Monday at 8 AM
  .onRun((context) => {
    console.log("Generating weekly report");
    
    const lastWeek = {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      end: new Date()
    };
    
    return generateWeeklyReport(lastWeek);
  });

// Helper functions (implementations would be specific to your needs)
async function sendPushNotification(userId: string, title: string, body: string): Promise<void> {
  // Implementation for sending push notifications
  console.log(`Sending notification to ${userId}: ${title}`);
}

async function recordPageView(event: any): Promise<void> {
  // Implementation for recording page views
}

async function recordPurchase(event: any): Promise<void> {
  // Implementation for recording purchases
}

async function recordUserSignup(event: any): Promise<void> {
  // Implementation for recording user signups
}

async function processDataForDate(date: Date): Promise<void> {
  // Implementation for daily data processing
}

async function cleanupTempFiles(): Promise<void> {
  // Implementation for cleaning up temporary files
}

async function cleanupExpiredSessions(): Promise<void> {
  // Implementation for cleaning up expired sessions
}

async function cleanupOldLogs(): Promise<void> {
  // Implementation for cleaning up old logs
}

async function generateWeeklyReport(period: { start: Date; end: Date }): Promise<void> {
  // Implementation for generating weekly reports
}
```

### Task Queues

Cloud Tasks integration for reliable background job processing with rate limiting and retry configuration.

```typescript { .api }
/**
 * Tasks builder for Cloud Tasks integration
 */
interface TasksBuilder {
  /**
   * Create a task queue function with configuration
   * @param options - Task queue configuration options
   * @returns TaskQueueBuilder for task handling
   */
  taskQueue(options?: TaskQueueOptions): TaskQueueBuilder;
}

/**
 * Task queue builder for handling task dispatch
 */
interface TaskQueueBuilder {
  /**
   * Handle task dispatch events from Cloud Tasks
   * @param handler - Function to handle dispatched tasks
   * @returns CloudFunction for task processing
   */
  onDispatch(handler: (request: TaskContext) => PromiseLike<any> | any): CloudFunction<TaskContext>;
}

/**
 * Task queue configuration options
 */
interface TaskQueueOptions {
  /** Rate limiting configuration */
  rateLimits?: {
    /** Maximum concurrent task dispatches */
    maxConcurrentDispatches?: number;
    /** Maximum task dispatches per second */
    maxDispatchesPerSecond?: number;
  };
  /** Retry configuration for failed tasks */
  retryConfig?: {
    /** Maximum number of retry attempts */
    maxAttempts?: number;
    /** Maximum total retry duration */
    maxRetryDuration?: string;
    /** Maximum backoff duration between retries */
    maxBackoffDuration?: string;
    /** Maximum number of backoff doublings */
    maxDoublings?: number;
    /** Minimum backoff duration between retries */
    minBackoffDuration?: string;
  };
  /** Task queue invoker permissions */
  invoker?: string | string[];
}

/**
 * Task context for task queue functions
 */
interface TaskContext {
  /** Task payload data */
  data: any;
  /** Task metadata */
  metadata: {
    /** Task name */
    name: string;
    /** Queue name */
    queueName: string;
    /** Retry attempt number */
    retryCount: number;
    /** Maximum retry attempts */
    maxRetryCount: number;
    /** Task creation time */
    createTime: string;
    /** Task schedule time */
    scheduleTime: string;
  };
}
```

**Usage Examples:**

```typescript
import * as functions from "firebase-functions/v1";

// Email processing task queue
export const processEmail = functions.tasks
  .taskQueue({
    rateLimits: {
      maxConcurrentDispatches: 10,
      maxDispatchesPerSecond: 5
    },
    retryConfig: {
      maxAttempts: 3,
      maxRetryDuration: "300s",
      minBackoffDuration: "5s",
      maxBackoffDuration: "60s",
      maxDoublings: 3
    }
  })
  .onDispatch((request) => {
    const { emailData } = request.data;
    const { retryCount, maxRetryCount } = request.metadata;
    
    console.log(`Processing email task (attempt ${retryCount + 1}/${maxRetryCount}):`, {
      to: emailData.to,
      subject: emailData.subject,
      taskName: request.metadata.name
    });
    
    return sendEmail(emailData)
      .then(() => {
        console.log(`Email sent successfully to ${emailData.to}`);
      })
      .catch((error) => {
        console.error(`Failed to send email:`, error);
        
        // Re-throw to trigger retry if within retry limits
        if (retryCount < maxRetryCount - 1) {
          throw error;
        } else {
          // Log final failure and handle gracefully
          console.error(`Email failed permanently after ${maxRetryCount} attempts`);
          return recordEmailFailure(emailData, error);
        }
      });
  });

// Image processing task queue with high concurrency
export const processImage = functions.tasks
  .taskQueue({
    rateLimits: {
      maxConcurrentDispatches: 50,
      maxDispatchesPerSecond: 20
    },
    retryConfig: {
      maxAttempts: 2,
      maxRetryDuration: "120s",
      minBackoffDuration: "10s"
    }
  })
  .onDispatch(async (request) => {
    const { imageUrl, transformations } = request.data;
    
    console.log(`Processing image: ${imageUrl}`, {
      transformations,
      taskName: request.metadata.name
    });
    
    try {
      // Download and process image
      const processedImageUrl = await transformImage(imageUrl, transformations);
      
      // Update database with processed image URL
      await updateImageRecord(request.data.imageId, processedImageUrl);
      
      console.log(`Image processed successfully: ${processedImageUrl}`);
      
    } catch (error) {
      console.error(`Image processing failed:`, error);
      
      // Update record with failure status
      await updateImageRecord(request.data.imageId, null, error.message);
      
      throw error; // Allow retry
    }
  });

// Data export task queue with custom invoker permissions
export const exportData = functions.tasks
  .taskQueue({
    rateLimits: {
      maxConcurrentDispatches: 5,
      maxDispatchesPerSecond: 1
    },
    invoker: ["admin@example.com", "export-service@my-project.iam.gserviceaccount.com"]
  })
  .onDispatch(async (request) => {
    const { userId, dataTypes, format } = request.data;
    
    console.log(`Exporting data for user ${userId}:`, {
      dataTypes,
      format,
      taskName: request.metadata.name
    });
    
    try {
      // Generate export file
      const exportUrl = await generateDataExport(userId, dataTypes, format);
      
      // Notify user of completion
      await notifyExportComplete(userId, exportUrl);
      
      console.log(`Data export completed for user ${userId}: ${exportUrl}`);
      
    } catch (error) {
      console.error(`Data export failed for user ${userId}:`, error);
      
      // Notify user of failure
      await notifyExportFailed(userId, error.message);
      
      throw error;
    }
  });

// Helper functions (implementations would be specific to your needs)
async function sendEmail(emailData: any): Promise<void> {
  // Implementation for sending emails
}

async function recordEmailFailure(emailData: any, error: any): Promise<void> {
  // Implementation for recording email failures
}

async function transformImage(imageUrl: string, transformations: any): Promise<string> {
  // Implementation for image transformations
  return "https://example.com/processed-image.jpg";
}

async function updateImageRecord(imageId: string, processedUrl: string | null, error?: string): Promise<void> {
  // Implementation for updating image records
}

async function generateDataExport(userId: string, dataTypes: string[], format: string): Promise<string> {
  // Implementation for generating data exports
  return "https://example.com/exports/user-data.json";
}

async function notifyExportComplete(userId: string, exportUrl: string): Promise<void> {
  // Implementation for notifying export completion
}

async function notifyExportFailed(userId: string, error: string): Promise<void> {
  // Implementation for notifying export failure
}
```

### Analytics and Remote Config

Google Analytics event processing and Firebase Remote Config update triggers.

```typescript { .api }
/**
 * Analytics builder for Google Analytics event triggers
 */
interface AnalyticsBuilder {
  /**
   * Create a trigger for specific Google Analytics events
   * @param analyticsEventType - Type of analytics event to listen for
   * @returns AnalyticsEventBuilder for that event type
   */
  event(analyticsEventType: string): AnalyticsEventBuilder;
}

/**
 * Analytics event builder for handling analytics events
 */
interface AnalyticsEventBuilder {
  /**
   * Handle analytics event logging
   * @param handler - Function to handle analytics events
   * @returns CloudFunction for analytics event processing
   */
  onLog(handler: (event: AnalyticsEvent, context: EventContext) => PromiseLike<any> | any): CloudFunction<AnalyticsEvent>;
}

/**
 * Remote Config builder for template update events
 */
interface RemoteConfigBuilder {
  /**
   * Handle Remote Config template updates
   * @param handler - Function to handle template updates
   * @returns CloudFunction for Remote Config updates
   */
  onUpdate(handler: (version: TemplateVersion, context: EventContext) => PromiseLike<any> | any): CloudFunction<TemplateVersion>;
}

/**
 * Google Analytics event data
 */
interface AnalyticsEvent {
  /** Analytics event name */
  name: string;
  /** Event parameters */
  params: { [key: string]: any };
  /** User properties */
  userProperties: { [key: string]: any };
  /** Event timestamp */
  logTime: string;
  /** Previous event timestamp */
  previousLogTime?: string;
  /** User ID (if set) */
  userId?: string;
  /** User pseudo ID */
  userPseudoId: string;
  /** Event bundle sequence ID */
  eventBundleSequenceId: number;
  /** User first open time */
  userFirstOpenTime?: string;
}

/**
 * Remote Config template version information  
 */
interface TemplateVersion {
  /** Version number */
  versionNumber: string;
  /** Update time */
  updateTime: string;
  /** Update user */
  updateUser: {
    name: string;
    email: string;
    imageUrl?: string;
  };
  /** Description of changes */
  description?: string;
  /** Update origin (console, rest api, etc.) */
  updateOrigin: string;
  /** Update type (incremental, forced, etc.) */
  updateType: string;
  /** Rollback source version (if this is a rollback) */
  rollbackSource?: string;
}
```

**Usage Examples:**

```typescript
import * as functions from "firebase-functions/v1";

// Purchase event analytics processing
export const onPurchaseEvent = functions.analytics
  .event("purchase")
  .onLog((event, context) => {
    console.log("Purchase event received:", {
      userId: event.userId,
      userPseudoId: event.userPseudoId,
      eventTime: event.logTime,
      eventId: context.eventId
    });
    
    const purchaseData = {
      transactionId: event.params.transaction_id,
      value: event.params.value,
      currency: event.params.currency,
      items: event.params.items
    };
    
    // Store purchase data for further processing
    return storePurchaseData(event.userId || event.userPseudoId, purchaseData);
  });

// User engagement analytics
export const onUserEngagement = functions.analytics
  .event("user_engagement")
  .onLog((event, context) => {
    console.log("User engagement event:", {
      userId: event.userId,
      sessionId: event.params.session_id,
      engagementTime: event.params.engagement_time_msec
    });
    
    // Update user engagement metrics
    return updateUserEngagementMetrics(
      event.userId || event.userPseudoId,
      event.params
    );
  });

// Level completion in games
export const onLevelComplete = functions.analytics
  .event("level_complete")
  .onLog((event, context) => {
    const levelData = {
      levelName: event.params.level_name,
      levelNumber: event.params.level_num,
      score: event.params.score,
      success: event.params.success
    };
    
    console.log("Level completion:", levelData);
    
    // Update player progression
    return updatePlayerProgression(
      event.userId || event.userPseudoId,
      levelData
    );
  });

// Remote Config update handler
export const onRemoteConfigUpdate = functions.remoteConfig.onUpdate((version, context) => {
  console.log("Remote Config updated:", {
    versionNumber: version.versionNumber,
    updateTime: version.updateTime,
    updateUser: version.updateUser.email,
    description: version.description,
    updateOrigin: version.updateOrigin
  });
  
  // Notify relevant systems about config changes
  return Promise.all([
    notifyConfigUpdate(version),
    logConfigChange(version),
    invalidateConfigCache()
  ]);
});

// Helper functions (implementations would be specific to your needs)
async function storePurchaseData(userId: string, purchaseData: any): Promise<void> {
  // Implementation for storing purchase analytics
  console.log(`Storing purchase data for user ${userId}`);
}

async function updateUserEngagementMetrics(userId: string, params: any): Promise<void> {
  // Implementation for updating engagement metrics
  console.log(`Updating engagement metrics for user ${userId}`);
}

async function updatePlayerProgression(userId: string, levelData: any): Promise<void> {
  // Implementation for updating game progression
  console.log(`Updating progression for user ${userId}:`, levelData);
}

async function notifyConfigUpdate(version: TemplateVersion): Promise<void> {
  // Implementation for notifying systems about config updates
  console.log(`Notifying systems about config version ${version.versionNumber}`);
}

async function logConfigChange(version: TemplateVersion): Promise<void> {
  // Implementation for logging config changes
  console.log(`Logging config change: ${version.description}`);
}

async function invalidateConfigCache(): Promise<void> {
  // Implementation for cache invalidation
  console.log("Invalidating Remote Config cache");
}
```

### Test Lab Integration

Firebase Test Lab integration for handling test matrix completion events and test result processing.

```typescript { .api }
/**
 * Test Lab builder for test matrix events
 */
interface TestLabBuilder {
  /**
   * Create a trigger for Test Lab test matrix events
   * @returns TestMatrixBuilder for test events
   */
  testMatrix(): TestMatrixBuilder;
}

/**
 * Test matrix builder for handling test completion
 */
interface TestMatrixBuilder {
  /**
   * Handle test matrix completion events
   * @param handler - Function to handle test completion
   * @returns CloudFunction for test matrix processing
   */
  onComplete(handler: (testMatrix: TestMatrix, context: EventContext) => PromiseLike<any> | any): CloudFunction<TestMatrix>;
}

/**
 * Test Lab test matrix information
 */
interface TestMatrix {
  /** Test matrix ID */
  testMatrixId: string;
  /** Test matrix state */
  state: "PENDING" | "RUNNING" | "FINISHED" | "ERROR" | "UNSUPPORTED_ENVIRONMENT" | "INCOMPATIBLE_ENVIRONMENT" | "INCOMPATIBLE_ARCHITECTURE" | "CANCELLED" | "INVALID";
  /** Test creation time */
  createTime: string;
  /** Test completion time */
  completeTime?: string;
  /** Test outcome summary */
  outcomeSummary: "SUCCESS" | "FAILURE" | "INCONCLUSIVE" | "SKIPPED";
  /** Result storage details */
  resultStorage: {
    /** Google Cloud Storage path for results */
    gcsPath: string;
    /** Tool results history ID */
    toolResultsHistory?: {
      projectId: string;
      historyId: string;
    };
    /** Tool results execution ID */
    toolResultsExecution?: {
      projectId: string;
      historyId: string;
      executionId: string;
    };
  };
  /** Client information */
  clientInfo?: {
    /** Client name */
    clientInfoName: string;
    /** Client details */
    clientInfoDetails: { [key: string]: string };
  };
}
```

**Usage Examples:**

```typescript
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";

// Test matrix completion handler
export const onTestComplete = functions.testLab.testMatrix().onComplete((testMatrix, context) => {
  console.log("Test matrix completed:", {
    testMatrixId: testMatrix.testMatrixId,
    state: testMatrix.state,
    outcome: testMatrix.outcomeSummary,
    gcsPath: testMatrix.resultStorage.gcsPath
  });
  
  // Process test results based on outcome
  switch (testMatrix.outcomeSummary) {
    case "SUCCESS":
      return handleTestSuccess(testMatrix, context);
    case "FAILURE":
      return handleTestFailure(testMatrix, context);
    case "INCONCLUSIVE":
      return handleInconclusiveTest(testMatrix, context);
    case "SKIPPED":
      return handleSkippedTest(testMatrix, context);
    default:
      console.log(`Unknown test outcome: ${testMatrix.outcomeSummary}`);
      return null;
  }
});

// Handle successful test completion
async function handleTestSuccess(testMatrix: TestMatrix, context: EventContext): Promise<void> {
  console.log(`Test ${testMatrix.testMatrixId} passed successfully`);
  
  // Update test result in database
  await admin.firestore().collection("test_results").doc(testMatrix.testMatrixId).set({
    status: "success",
    completedAt: testMatrix.completeTime,
    gcsPath: testMatrix.resultStorage.gcsPath,
    outcome: testMatrix.outcomeSummary,
    toolResultsHistory: testMatrix.resultStorage.toolResultsHistory,
    toolResultsExecution: testMatrix.resultStorage.toolResultsExecution
  });
  
  // Notify stakeholders of success
  await notifyTestSuccess(testMatrix);
  
  // Trigger downstream processes (e.g., deployment pipeline)
  await triggerDeploymentPipeline(testMatrix);
}

// Handle test failures
async function handleTestFailure(testMatrix: TestMatrix, context: EventContext): Promise<void> {
  console.log(`Test ${testMatrix.testMatrixId} failed`);
  
  // Store failure details
  await admin.firestore().collection("test_results").doc(testMatrix.testMatrixId).set({
    status: "failure",
    completedAt: testMatrix.completeTime,
    gcsPath: testMatrix.resultStorage.gcsPath,
    outcome: testMatrix.outcomeSummary,
    toolResultsHistory: testMatrix.resultStorage.toolResultsHistory,
    toolResultsExecution: testMatrix.resultStorage.toolResultsExecution
  });
  
  // Download and parse test results for detailed analysis
  await analyzeTestFailures(testMatrix);
  
  // Notify team of failure
  await notifyTestFailure(testMatrix);
  
  // Create bug reports or tickets if needed
  await createFailureTickets(testMatrix);
}

// Handle inconclusive tests
async function handleInconclusiveTest(testMatrix: TestMatrix, context: EventContext): Promise<void> {
  console.log(`Test ${testMatrix.testMatrixId} was inconclusive`);
  
  // Store inconclusive result
  await admin.firestore().collection("test_results").doc(testMatrix.testMatrixId).set({
    status: "inconclusive",
    completedAt: testMatrix.completeTime,
    gcsPath: testMatrix.resultStorage.gcsPath,
    outcome: testMatrix.outcomeSummary,
    requiresReview: true
  });
  
  // Flag for manual review
  await flagForManualReview(testMatrix);
  
  // Potentially retry the test
  await scheduleTestRetry(testMatrix);
}

// Handle skipped tests
async function handleSkippedTest(testMatrix: TestMatrix, context: EventContext): Promise<void> {
  console.log(`Test ${testMatrix.testMatrixId} was skipped`);
  
  // Log skip reason and update records
  await admin.firestore().collection("test_results").doc(testMatrix.testMatrixId).set({
    status: "skipped",
    completedAt: testMatrix.completeTime,
    outcome: testMatrix.outcomeSummary,
    reason: "Test was skipped - check configuration"
  });
}

// Helper functions (implementations would be specific to your CI/CD setup)
async function notifyTestSuccess(testMatrix: TestMatrix): Promise<void> {
  // Implementation for success notifications (Slack, email, etc.)
  console.log(`Notifying team of test success: ${testMatrix.testMatrixId}`);
}

async function triggerDeploymentPipeline(testMatrix: TestMatrix): Promise<void> {
  // Implementation for triggering deployment after successful tests
  console.log(`Triggering deployment pipeline after test: ${testMatrix.testMatrixId}`);
}

async function notifyTestFailure(testMatrix: TestMatrix): Promise<void> {
  // Implementation for failure notifications
  console.log(`Notifying team of test failure: ${testMatrix.testMatrixId}`);
}

async function analyzeTestFailures(testMatrix: TestMatrix): Promise<void> {
  // Implementation for downloading and analyzing test results from GCS
  console.log(`Analyzing test failures for: ${testMatrix.testMatrixId}`);
}

async function createFailureTickets(testMatrix: TestMatrix): Promise<void> {
  // Implementation for creating tickets in issue tracking system
  console.log(`Creating failure tickets for: ${testMatrix.testMatrixId}`);
}

async function flagForManualReview(testMatrix: TestMatrix): Promise<void> {
  // Implementation for flagging inconclusive tests for review
  console.log(`Flagging for manual review: ${testMatrix.testMatrixId}`);
}

async function scheduleTestRetry(testMatrix: TestMatrix): Promise<void> {
  // Implementation for scheduling test retries
  console.log(`Scheduling retry for: ${testMatrix.testMatrixId}`);
}
```

## Common Types and Utilities

### Change Detection

```typescript { .api }
/**
 * Change object representing before and after states
 */
interface Change<T> {
  /** State before the change */
  before: T;
  /** State after the change */
  after: T;
}
```

### Configuration and Initialization

```typescript { .api }
/**
 * Runtime configuration access (deprecated in V2)
 */
function config(): Record<string, any>;

/**
 * Firebase project configuration
 */
const firebaseConfig: {
  databaseURL: string;
  storageBucket: string;
  projectId: string;
  messagingSenderId: string;
  authDomain: string;
};

/**
 * Initialization callback system
 */
function onInit(callback: () => void | Promise<void>): void;
```