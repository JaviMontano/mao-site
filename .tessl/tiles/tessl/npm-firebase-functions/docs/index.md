# Firebase Functions

Firebase Functions provides the Firebase SDK for Cloud Functions, enabling developers to build serverless backend logic that automatically responds to Firebase and HTTPS events. It offers comprehensive APIs for both v1 (legacy) and v2 (current generation) Cloud Functions with extensive provider integrations including Firestore, Realtime Database, Authentication, Storage, Pub/Sub, Analytics, Remote Config, Test Lab, and various alerting systems.

## Package Information

- **Package Name**: firebase-functions
- **Package Type**: npm
- **Language**: TypeScript/JavaScript
- **Installation**: `npm install firebase-functions`
- **Version**: 6.4.0

## Core Imports

### V2 API (Current Generation - Default)

```typescript
import * as functions from "firebase-functions";
import { setGlobalOptions } from "firebase-functions/options";
import { onRequest, onCall } from "firebase-functions/https";
import { onDocumentCreated } from "firebase-functions/firestore";
```

### V1 API (Legacy)

```typescript
import * as functions from "firebase-functions/v1";
import * as https from "firebase-functions/v1/https";
import * as firestore from "firebase-functions/v1/firestore";
```

### Shared Utilities

```typescript
import { info, warn, error } from "firebase-functions/logger";
import { defineString, defineBoolean } from "firebase-functions/params";
```

For CommonJS:

```javascript
const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const { info } = require("firebase-functions/logger");
```

## Basic Usage

### V2 Functions (Recommended)

```typescript
import { onRequest, onCall } from "firebase-functions/https";
import { onDocumentCreated } from "firebase-functions/firestore";
import { setGlobalOptions } from "firebase-functions/options";
import { info } from "firebase-functions/logger";

// Set global configuration
setGlobalOptions({
  region: "us-central1",
  memory: "1GiB"
});

// HTTP function
export const api = onRequest((request, response) => {
  info("Processing HTTP request", { url: request.url });
  response.json({ message: "Hello from Firebase!" });
});

// Callable function with data validation
export const processOrder = onCall<{orderId: string}>({
  region: "us-central1",
  enforceAppCheck: true
}, (request) => {
  const { orderId } = request.data;
  info("Processing order", { orderId });
  
  return { success: true, orderId };
});

// Firestore trigger
export const onUserCreate = onDocumentCreated("users/{userId}", (event) => {
  const userData = event.data?.data();
  info("New user created", { userId: event.params.userId, userData });
});
```

### V1 Functions (Legacy)

```typescript
import * as functions from "firebase-functions/v1";

// HTTP function
export const legacyApi = functions.https.onRequest((req, res) => {
  res.json({ message: "Legacy function" });
});

// Firestore trigger
export const legacyUserCreate = functions.firestore
  .document("users/{userId}")
  .onCreate((snapshot, context) => {
    const userData = snapshot.data();
    console.log("User created:", context.params.userId);
  });
```

## Architecture

Firebase Functions is built around several key architectural components:

### API Generations
- **V1 API (Legacy)**: Original functions API with traditional event handlers and function builders
- **V2 API (Current)**: CloudEvents-compliant API with enhanced configuration options and improved performance

### Provider Ecosystem
- **Core Providers**: HTTPS, Firestore, Realtime Database, Authentication, Storage
- **Messaging**: Pub/Sub, Task Queues, Scheduler
- **Analytics & Monitoring**: Analytics, Performance Monitoring, Crashlytics, Test Lab
- **Configuration**: Remote Config, Alerts system
- **Identity**: Identity Platform (V2), Firebase Auth (V1/V2)

### Shared Systems
- **Logger**: Structured logging compatible with Cloud Logging
- **Parameters**: Environment configuration with CLI integration
- **Tracing**: Distributed tracing context utilities
- **Admin SDK**: Firebase Admin SDK integration and emulator support

### Event Model
- **V1**: Custom event format with `EventContext` for metadata
- **V2**: CloudEvents specification compliance with standardized event structure

## Capabilities

### V1 Legacy API

Complete legacy API with traditional function builders and event handlers for all Firebase services.

```typescript { .api }
// Function builder pattern
class FunctionBuilder {
  region(...regions: Array<string | Expression<string> | ResetValue>): FunctionBuilder;
  runWith(runtimeOptions: RuntimeOptions): FunctionBuilder;
}

// Core function types
interface CloudFunction<T> extends Runnable<T> {
  (input: any, context?: any): PromiseLike<any> | any;
}

interface HttpsFunction {
  (req: Request, resp: Response): void | Promise<void>;
}

// Event context for V1 functions
interface EventContext<Params = Record<string, string>> {
  auth?: { uid: string; token: EventContextAuthToken };
  authType?: "ADMIN" | "USER" | "UNAUTHENTICATED";
  eventId: string;
  eventType: string;
  params: Params;
  resource: Resource;
  timestamp: string;
}
```

[V1 API Documentation](./v1-api.md)

### V2 Current Generation API

Modern CloudEvents-compliant API with enhanced configuration and streaming support.

```typescript { .api }
// CloudEvents specification compliance
interface CloudEvent<T> {
  readonly specversion: "1.0";
  id: string;
  source: string;
  subject?: string;
  type: string;
  time: string;
  data: T;
}

interface CloudFunction<EventType extends CloudEvent<unknown>> {
  (raw: CloudEvent<unknown>): any | Promise<any>;
  run(event: EventType): any | Promise<any>;
}

// Enhanced configuration options
interface GlobalOptions {
  omit?: boolean | Expression<boolean>;
  region?: SupportedRegion | string | Expression<string> | ResetValue;
  memory?: MemoryOption | Expression<number> | ResetValue;
  concurrency?: number | Expression<number> | ResetValue;
  cpu?: number | "gcf_gen1";
  invoker?: "public" | "private" | string | string[];
}

// V2 memory options (up to 32GB)
type MemoryOption = "128MiB" | "256MiB" | "512MiB" | "1GiB" | "2GiB" | "4GiB" | "8GiB" | "16GiB" | "32GiB";
```

[V2 API Documentation](./v2-api.md)

### HTTPS Functions

HTTP request handlers and callable functions with CORS, authentication, and streaming support.

```typescript { .api }
// V2 HTTPS with enhanced features
function onRequest(
  opts: HttpsOptions,
  handler: (request: Request, response: express.Response) => void | Promise<void>
): HttpsFunction;

function onCall<T, Return, Stream>(
  opts: CallableOptions<T>,
  handler: (request: CallableRequest<T>, response?: CallableResponse<Stream>) => Return
): CallableFunction<T, Return, Stream>;

interface CallableOptions<T = any> extends HttpsOptions {
  enforceAppCheck?: boolean;
  consumeAppCheckToken?: boolean;
  heartbeatSeconds?: number | null;
}
```

### Database Triggers

Realtime Database and Firestore change event handlers with path parameter extraction.

```typescript { .api }
// V2 Firestore triggers
function onDocumentCreated<Document = DocumentData>(
  document: string,
  handler: (event: FirestoreEvent<Document | undefined, ParamsOf<string>>) => any | Promise<any>
): CloudFunction<FirestoreEvent<Document | undefined, ParamsOf<string>>>;

// V1 Firestore triggers  
interface DocumentBuilder<Path extends string> {
  onWrite(handler: (change: Change<DocumentSnapshot>, context: EventContext<ParamsOf<Path>>) => PromiseLike<any> | any): CloudFunction<Change<DocumentSnapshot>>;
}
```

### Authentication

Firebase Authentication and Identity Platform user lifecycle events and blocking functions.

```typescript { .api }
// V1 Auth blocking functions
interface UserBuilder {
  beforeCreate(handler: (user: AuthUserRecord, context: AuthEventContext) => MaybeAsync<BeforeCreateResponse | void>): BlockingFunction;
  beforeSignIn(handler: (user: AuthUserRecord, context: AuthEventContext) => MaybeAsync<BeforeSignInResponse | void>): BlockingFunction;
}

// V2 Identity Platform
function onUserDeleted(
  handler: (event: AuthUserRecord) => any | Promise<any>
): CloudFunction<AuthUserRecord>;
```

### Messaging & Events

Pub/Sub, Task Queues, Scheduler, and custom event handling with enhanced retry and rate limiting.

```typescript { .api }
// V2 Pub/Sub
function onMessagePublished(
  topic: string,
  handler: (event: CloudEvent<MessagePublishedData>) => any | Promise<any>
): CloudFunction<CloudEvent<MessagePublishedData>>;

// V2 Task Queues
function onTaskDispatched<Args = any>(
  opts: TaskQueueOptions,
  handler: (request: TaskQueueEvent<Args>) => any | Promise<any>
): CloudFunction<TaskQueueEvent<Args>>;
```

### Alerts System

Firebase Alerts for App Distribution, Billing, Crashlytics, and Performance Monitoring.

```typescript { .api }
// Main alerts
function onAlertPublished(
  alertType: string,
  handler: (event: FirebaseAlertData) => any | Promise<any>
): CloudFunction<FirebaseAlertData>;

// Specialized alert handlers
function onNewFatalIssuePublished(
  handler: (event: CrashlyticsNewFatalIssuePayload) => any | Promise<any>
): CloudFunction<CrashlyticsNewFatalIssuePayload>;
```

[Alerts Documentation](./alerts.md)

### Logging System

Structured logging compatible with Cloud Logging with severity levels and metadata support.

```typescript { .api }
type LogSeverity = "DEBUG" | "INFO" | "NOTICE" | "WARNING" | "ERROR" | "CRITICAL" | "ALERT" | "EMERGENCY";

interface LogEntry {
  severity: LogSeverity;
  message?: string;
  [key: string]: any;
}

function write(entry: LogEntry): void;
function info(...args: any[]): void;
function error(...args: any[]): void;
```

[Logger Documentation](./logger.md)

### Parameters System

Environment parameter management with CLI integration supporting multiple data types and validation.

```typescript { .api }
abstract class Param<T extends string | number | boolean | string[]> extends Expression<T> {
  constructor(name: string, options?: ParamOptions<T>);
  equals(rhs: T | Expression<T>): CompareExpression<T>;
}

function defineString(name: string, options?: ParamOptions<string>): StringParam;
function defineBoolean(name: string, options?: ParamOptions<boolean>): BooleanParam;
function defineSecret(name: string): SecretParam;

// Built-in parameters
const projectID: Param<string>;
const databaseURL: Param<string>;
const storageBucket: Param<string>;
```

[Parameters Documentation](./params.md)

### Storage & File Processing

Cloud Storage object change events with metadata and content processing capabilities.

```typescript { .api }
// V2 Storage
function onObjectFinalized(
  handler: (event: CloudEvent<StorageObjectData>) => any | Promise<any>
): CloudFunction<CloudEvent<StorageObjectData>>;

// V1 Storage  
interface ObjectBuilder {
  onFinalize(handler: (object: ObjectMetadata, context: EventContext) => PromiseLike<any> | any): CloudFunction<ObjectMetadata>;
  onMetadataUpdate(handler: (object: ObjectMetadata, context: EventContext) => PromiseLike<any> | any): CloudFunction<ObjectMetadata>;
}
```

### Analytics & Testing

Google Analytics event processing and Firebase Test Lab integration for comprehensive app analytics.

```typescript { .api }
// V1 Analytics
function event(analyticsEventType: string): AnalyticsEventBuilder;

interface AnalyticsEventBuilder {
  onLog(handler: (event: AnalyticsEvent, context: EventContext) => PromiseLike<any> | any): CloudFunction<AnalyticsEvent>;
}

// Test Lab
interface TestMatrixBuilder {
  onComplete(handler: (testMatrix: TestMatrix, context: EventContext) => PromiseLike<any> | any): CloudFunction<TestMatrix>;
}
```

## Common Types

### Path Parameter Extraction

```typescript { .api }
// Extract path parameters from template strings
type ParamsOf<Path extends string> = Path extends `${infer _Prefix}/{${infer Param}}${infer Suffix}`
  ? { [K in Param | keyof ParamsOf<Suffix>]: string }
  : {};

// Change detection for before/after comparisons
interface Change<T> {
  before: T;
  after: T;
}
```

### Memory and Region Configuration

```typescript { .api }
// V1 memory options
const VALID_MEMORY_OPTIONS = ["128MB", "256MB", "512MB", "1GB", "2GB", "4GB", "8GB"] as const;

// V2 memory options (enhanced)  
type MemoryOption = "128MiB" | "256MiB" | "512MiB" | "1GiB" | "2GiB" | "4GiB" | "8GiB" | "16GiB" | "32GiB";

// Supported regions
type SupportedRegion = "us-central1" | "us-east1" | "us-east4" | "us-west1" | "us-west2" | "us-west3" | "us-west4" | 
                     "europe-west1" | "europe-west2" | "europe-west3" | "europe-west6" | "europe-central2" |
                     "asia-east1" | "asia-east2" | "asia-northeast1" | "asia-northeast2" | "asia-northeast3" |
                     "asia-south1" | "asia-southeast1" | "asia-southeast2" | "australia-southeast1" |
                     "northamerica-northeast1" | "southamerica-east1";
```

### Expression System

```typescript { .api }
// Parameter expressions for dynamic configuration
abstract class Expression<T extends string | number | boolean | string[]> {
  value(): T;
  toCEL(): string;
  toJSON(): string;
}

// Reset values for configuration overrides
interface ResetValue {
  __reset: true;
}
```