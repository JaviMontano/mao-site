# Parameters System

Firebase Functions provides a comprehensive parameter management system that allows you to define, validate, and access environment configuration with CLI integration. The parameters system supports multiple data types, validation rules, and deployment-time configuration through the Firebase CLI.

## Capabilities

### Core Parameter Types

The parameters system provides strongly-typed parameter definitions with validation and CLI integration.

```typescript { .api }
/**
 * Base expression class for all parameter types and computed values
 */
abstract class Expression<T extends string | number | boolean | string[]> {
  /** Get the runtime value of this expression */
  abstract value(): T;
  /** Convert to Cloud Expression Language (CEL) format */
  abstract toCEL(): string;
  /** Serialize to JSON for deployment manifests */
  abstract toJSON(): string;
}

/**
 * Base parameter class with comparison operations
 */
abstract class Param<T extends string | number | boolean | string[]> extends Expression<T> {
  /**
   * Create a parameter with name and optional configuration
   * @param name - Parameter name (must be valid environment variable name)
   * @param options - Parameter configuration options
   */
  constructor(name: string, options?: ParamOptions<T>);
  
  /** Compare this parameter to another value or expression */
  cmp(cmp: "==" | "!=" | ">" | ">=" | "<" | "<=", rhs: T | Expression<T>): CompareExpression<T>;
  
  /** Check equality with another value or expression */
  equals(rhs: T | Expression<T>): CompareExpression<T>;
  
  /** Check inequality with another value or expression */
  notEquals(rhs: T | Expression<T>): CompareExpression<T>;
  
  /** Check if this parameter is greater than another value */
  greaterThan(rhs: T | Expression<T>): CompareExpression<T>;
  
  /** Check if this parameter is greater than or equal to another value */
  greaterThanOrEqualTo(rhs: T | Expression<T>): CompareExpression<T>;
  
  /** Check if this parameter is less than another value */
  lessThan(rhs: T | Expression<T>): CompareExpression<T>;
  
  /** Check if this parameter is less than or equal to another value */
  lessThanOrEqualTo(rhs: T | Expression<T>): CompareExpression<T>;
}

/**
 * Secret parameter for sensitive configuration data
 */
class SecretParam {
  /**
   * Create a secret parameter
   * @param name - Secret name (must exist in Secret Manager)
   */
  constructor(name: string);
  
  /** Get the secret value at runtime */
  value(): string;
}

/**
 * Parameter configuration options
 */
interface ParamOptions<T> {
  /** Default value if parameter is not provided during deployment */
  default?: T | Expression<T>;
  /** Human-readable label for CLI prompts */
  label?: string;
  /** Description explaining the parameter's purpose */
  description?: string;
  /** Input configuration for CLI interaction */
  input?: ParamInput<T>;
}

/**
 * Comparison expression result for conditional logic
 */
interface CompareExpression<T> extends Expression<boolean> {
  /** The comparison operation */
  cmp: string;
  /** Left-hand side of comparison */
  lhs: Expression<T>;
  /** Right-hand side of comparison */
  rhs: Expression<T>;
}
```

### Parameter Definition Functions

Functions for creating typed parameters with validation and CLI integration.

```typescript { .api }
/**
 * Define a string parameter
 * @param name - Parameter name
 * @param options - String parameter options
 * @returns StringParam instance
 */
function defineString(name: string, options?: ParamOptions<string>): StringParam;

/**
 * Define a boolean parameter  
 * @param name - Parameter name
 * @param options - Boolean parameter options
 * @returns BooleanParam instance
 */
function defineBoolean(name: string, options?: ParamOptions<boolean>): BooleanParam;

/**
 * Define an integer parameter
 * @param name - Parameter name  
 * @param options - Integer parameter options
 * @returns IntParam instance
 */
function defineInt(name: string, options?: ParamOptions<number>): IntParam;

/**
 * Define a floating-point parameter
 * @param name - Parameter name
 * @param options - Float parameter options  
 * @returns FloatParam instance
 */
function defineFloat(name: string, options?: ParamOptions<number>): FloatParam;

/**
 * Define a list/array parameter
 * @param name - Parameter name
 * @param options - List parameter options
 * @returns ListParam instance
 */
function defineList(name: string, options?: ParamOptions<string[]>): ListParam;

/**
 * Define a secret parameter referencing Google Cloud Secret Manager
 * @param name - Secret name in Secret Manager
 * @returns SecretParam instance
 */
function defineSecret(name: string): SecretParam;

/**
 * Specific parameter type classes
 */
class StringParam extends Param<string> {}
class BooleanParam extends Param<boolean> {}
class IntParam extends Param<number> {}
class FloatParam extends Param<number> {}
class ListParam extends Param<string[]> {}
```

### Built-in Parameters

Pre-defined parameters for common Firebase and Google Cloud resources.

```typescript { .api }
/**
 * Default Realtime Database URL for the Firebase project
 */
const databaseURL: Param<string>;

/**
 * Firebase project ID
 */
const projectID: Param<string>;

/**
 * Google Cloud project ID (usually same as Firebase project ID)
 */
const gcloudProject: Param<string>;

/**
 * Default Cloud Storage bucket for the Firebase project
 */
const storageBucket: Param<string>;
```

### Input Configuration

Configuration for CLI prompts and validation during deployment.

```typescript { .api }
/**
 * Text input configuration for string parameters
 */
interface TextInput<T> {
  text: {
    /** Example value to show in CLI prompt */
    example?: string;
    /** Regular expression for validation */
    validationRegex?: string | RegExp;
    /** Error message shown when validation fails */
    validationErrorMessage?: string;
  };
}

/**
 * Single-select input configuration
 */
interface SelectInput<T> {
  select: {
    /** Available options for selection */
    options: Array<SelectOptions<T>>;
  };
}

/**
 * Multi-select input configuration for list parameters
 */
interface MultiSelectInput {
  multiSelect: {
    /** Available options for multi-selection */
    options: Array<SelectOptions<string>>;
  };
}

/**
 * Option configuration for select inputs
 */
interface SelectOptions<T> {
  /** Display label for the option */
  label?: string;
  /** Actual value of the option */
  value: T;
}

/**
 * Resource picker input for Firebase/Google Cloud resources
 */
interface ResourceInput {
  resource: {
    /** Type of resource to pick */
    type: string;
  };
}

/**
 * Pre-configured resource picker for Cloud Storage buckets
 */
const BUCKET_PICKER: ResourceInput;

/**
 * Union type for all input configurations
 */
type ParamInput<T> = T extends string 
  ? TextInput<T> | SelectInput<T> | ResourceInput
  : T extends string[]
  ? MultiSelectInput
  : T extends number | boolean
  ? SelectInput<T>
  : never;
```

### Input Helper Functions

Utility functions for creating input configurations.

```typescript { .api }
/**
 * Create a select input from options array or object
 * @param options - Array of values or object with label-value pairs
 * @returns SelectInput configuration
 */
function select<T>(options: T[] | Record<string, T>): SelectInput<T>;

/**
 * Create a multi-select input for list parameters
 * @param options - Array of values or object with label-value pairs  
 * @returns MultiSelectInput configuration
 */
function multiSelect(options: string[] | Record<string, string>): MultiSelectInput;
```

**Usage Examples:**

```typescript
import { 
  defineString, 
  defineBoolean, 
  defineInt, 
  defineList, 
  defineSecret,
  select,
  multiSelect,
  BUCKET_PICKER,
  projectID,
  databaseURL
} from "firebase-functions/params";

// Basic string parameter with default
const apiEndpoint = defineString("API_ENDPOINT", {
  label: "API Endpoint URL",
  description: "The base URL for the external API service",
  default: "https://api.example.com"
});

// Boolean parameter with select input
const debugMode = defineBoolean("DEBUG_MODE", {
  label: "Enable Debug Mode",
  description: "Enable detailed logging and debugging features",
  default: false,
  input: select({ 
    "Enabled": true, 
    "Disabled": false 
  })
});

// Integer parameter with validation
const maxRetries = defineInt("MAX_RETRIES", {
  label: "Maximum Retry Attempts",
  description: "Maximum number of retry attempts for failed operations",
  default: 3,
  input: select([1, 3, 5, 10])
});

// String parameter with validation regex
const emailDomain = defineString("EMAIL_DOMAIN", {
  label: "Allowed Email Domain",
  description: "Email domain for user registration validation",
  input: {
    text: {
      example: "company.com",
      validationRegex: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
      validationErrorMessage: "Please enter a valid domain name"
    }
  }
});

// List parameter with multi-select
const enabledFeatures = defineList("ENABLED_FEATURES", {
  label: "Enabled Features",
  description: "List of features to enable in the application",
  default: ["auth", "database"],
  input: multiSelect({
    "Authentication": "auth",
    "Database": "database", 
    "Storage": "storage",
    "Analytics": "analytics",
    "Messaging": "messaging"
  })
});

// Secret parameter for sensitive data
const apiKey = defineSecret("API_SECRET_KEY");
const databasePassword = defineSecret("DATABASE_PASSWORD");

// Using built-in parameters
const projectId = projectID; // Firebase project ID
const dbUrl = databaseURL;   // Default database URL

// Using parameters in function configuration
import { onRequest } from "firebase-functions/https";
import { setGlobalOptions } from "firebase-functions/options";

// Configure global options using parameters
setGlobalOptions({
  region: debugMode.value() ? "us-central1" : "us-east1",
  memory: debugMode.value() ? "2GiB" : "1GiB"
});

export const apiHandler = onRequest(
  {
    // Use parameter values in function options
    timeoutSeconds: maxRetries.value() * 30,
    secrets: [apiKey, databasePassword]
  },
  async (req, res) => {
    const config = {
      apiEndpoint: apiEndpoint.value(),
      debugMode: debugMode.value(),
      maxRetries: maxRetries.value(),
      allowedDomain: emailDomain.value(),
      enabledFeatures: enabledFeatures.value(),
      projectId: projectId.value(),
      databaseUrl: dbUrl.value()
    };
    
    // Access secrets securely
    const secretApiKey = apiKey.value();
    const secretDbPassword = databasePassword.value();
    
    if (config.debugMode) {
      console.log("Configuration:", { ...config, apiKey: "[REDACTED]" });
    }
    
    // Use configuration in business logic
    if (config.enabledFeatures.includes("auth")) {
      // Authentication logic
    }
    
    res.json({ 
      status: "success", 
      features: config.enabledFeatures,
      debug: config.debugMode 
    });
  }
);
```

### Advanced Parameter Patterns

**Conditional Configuration:**

```typescript
// Environment-based configuration
const environment = defineString("ENVIRONMENT", {
  label: "Deployment Environment",
  description: "Target environment for deployment",
  default: "development",
  input: select(["development", "staging", "production"])
});

const logLevel = defineString("LOG_LEVEL", {
  label: "Logging Level",
  description: "Minimum log level to output",
  default: environment.equals("production").value() ? "info" : "debug",
  input: select(["debug", "info", "warn", "error"])
});

// Performance configuration based on environment
const concurrency = defineInt("CONCURRENCY", {
  label: "Function Concurrency",
  description: "Number of concurrent requests per instance",
  default: environment.equals("production").value() ? 100 : 10
});

export const scaledFunction = onRequest(
  {
    concurrency: concurrency.value(),
    memory: environment.equals("production").value() ? "2GiB" : "512MiB"
  },
  (req, res) => {
    // Function implementation
    res.json({ environment: environment.value() });
  }
);
```

**Resource Selection with Bucket Picker:**

```typescript
const uploadBucket = defineString("UPLOAD_BUCKET", {
  label: "Upload Bucket",
  description: "Cloud Storage bucket for file uploads",
  input: BUCKET_PICKER
});

const processingBucket = defineString("PROCESSING_BUCKET", {
  label: "Processing Bucket", 
  description: "Cloud Storage bucket for processed files",
  input: BUCKET_PICKER
});

export const fileProcessor = onObjectFinalized(
  { bucket: uploadBucket.value() },
  async (event) => {
    const { name } = event.data;
    
    // Process file and move to processing bucket
    await processFile(uploadBucket.value(), name, processingBucket.value());
  }
);
```

**Complex Validation and Dependencies:**

```typescript
const databaseType = defineString("DATABASE_TYPE", {
  label: "Database Type",
  description: "Type of database to connect to",
  input: select(["firestore", "mysql", "postgresql"])
});

// Conditional parameter based on database type
const connectionPoolSize = defineInt("CONNECTION_POOL_SIZE", {
  label: "Database Connection Pool Size",
  description: "Maximum number of database connections", 
  default: databaseType.equals("firestore").value() ? 1 : 10,
  input: select([1, 5, 10, 25, 50])
});

const databaseHost = defineString("DATABASE_HOST", {
  label: "Database Host",
  description: "Database server hostname",
  // Only required for non-Firestore databases
  default: databaseType.equals("firestore").value() ? "" : undefined,
  input: {
    text: {
      example: "db.example.com",
      validationRegex: /^[a-zA-Z0-9.-]+$/,
      validationErrorMessage: "Please enter a valid hostname"
    }
  }
});

export const databaseFunction = onRequest(async (req, res) => {
  const dbConfig = {
    type: databaseType.value(),
    host: databaseHost.value(),
    poolSize: connectionPoolSize.value()
  };
  
  // Connect to database based on configuration
  const connection = await connectToDatabase(dbConfig);
  
  res.json({ connected: true, dbType: dbConfig.type });
});
```

### Secret Management Integration

**Secure Configuration with Secrets:**

```typescript
// Define secrets for sensitive configuration
const jwtSecret = defineSecret("JWT_SECRET");
const databaseCredentials = defineSecret("DATABASE_CREDENTIALS");
const apiKeys = defineSecret("THIRD_PARTY_API_KEYS");

// Public parameters for non-sensitive configuration  
const jwtExpirationHours = defineInt("JWT_EXPIRATION_HOURS", {
  label: "JWT Token Expiration (hours)",
  description: "How long JWT tokens remain valid",
  default: 24,
  input: select([1, 6, 12, 24, 48, 168]) // 1 hour to 1 week
});

const rateLimitPerMinute = defineInt("RATE_LIMIT_PER_MINUTE", {
  label: "Rate Limit (requests per minute)",
  description: "Maximum requests per user per minute",
  default: 60,
  input: select([10, 30, 60, 120, 300])
});

export const secureApiHandler = onRequest(
  {
    // Bind secrets to function
    secrets: [jwtSecret, databaseCredentials, apiKeys],
    memory: "1GiB"
  },
  async (req, res) => {
    // Access secrets securely at runtime
    const config = {
      jwtSecret: jwtSecret.value(),
      jwtExpirationMs: jwtExpirationHours.value() * 60 * 60 * 1000,
      rateLimit: rateLimitPerMinute.value(),
      dbCredentials: JSON.parse(databaseCredentials.value()),
      apiKeys: JSON.parse(apiKeys.value())
    };
    
    // Implement secure authentication and rate limiting
    const isAuthenticated = await authenticateRequest(req, config);
    const isRateLimited = await checkRateLimit(req, config);
    
    if (!isAuthenticated) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    if (isRateLimited) {
      return res.status(429).json({ error: "Rate limit exceeded" });
    }
    
    // Process authenticated request
    res.json({ success: true });
  }
);

// Helper functions
async function connectToDatabase(config: any) {
  // Database connection logic
  return {};
}

async function processFile(sourceBucket: string, fileName: string, destBucket: string) {
  // File processing logic
}

async function authenticateRequest(req: any, config: any): Promise<boolean> {
  // JWT authentication logic
  return true;
}

async function checkRateLimit(req: any, config: any): Promise<boolean> {
  // Rate limiting logic
  return false;
}
```

### CLI Integration

The parameters system integrates with Firebase CLI for deployment-time configuration:

**Deployment Commands:**
```bash
# Deploy with parameter prompts
firebase deploy --only functions

# Deploy with parameter file
firebase deploy --only functions --params-file=params.staging.json

# Deploy with inline parameters
firebase deploy --only functions --params="DEBUG_MODE=true,MAX_RETRIES=5"
```

**Parameter File Format (params.json):**
```json
{
  "API_ENDPOINT": "https://staging-api.example.com",
  "DEBUG_MODE": true,
  "MAX_RETRIES": 3,
  "ENABLED_FEATURES": ["auth", "database", "storage"],
  "EMAIL_DOMAIN": "staging.company.com"
}
```

**Environment-specific Configuration:**
```typescript
// Use different parameter files for different environments
// params.development.json
// params.staging.json  
// params.production.json

// Deploy to staging:
// firebase use staging
// firebase deploy --only functions --params-file=params.staging.json
```