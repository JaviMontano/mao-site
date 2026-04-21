# Logger System

Firebase Functions provides a structured logging system compatible with Cloud Logging that supports multiple severity levels, structured data, and console compatibility. The logger is available in both V1 and V2 functions and integrates seamlessly with Google Cloud's logging infrastructure.

## Capabilities

### Core Logging Functions

The logger provides severity-based logging functions with structured data support.

```typescript { .api }
/**
 * Log severity levels compatible with Cloud Logging
 */
type LogSeverity = 
  | "DEBUG"     // Debug information for development
  | "INFO"      // Informational messages  
  | "NOTICE"    // Normal significant conditions
  | "WARNING"   // Warning conditions
  | "ERROR"     // Error conditions
  | "CRITICAL"  // Critical conditions
  | "ALERT"     // Action must be taken immediately
  | "EMERGENCY"; // System is unusable

/**
 * Structured log entry interface
 */
interface LogEntry {
  /** Log severity level */
  severity: LogSeverity;
  /** Primary log message (optional) */
  message?: string;
  /** Additional structured data fields */
  [key: string]: any;
}

/**
 * Write a structured log entry to stdout/stderr
 * @param entry - Structured log entry with severity and optional message
 */
function write(entry: LogEntry): void;

/**
 * Log debug information (DEBUG severity)
 * @param args - Message and additional data to log
 */
function debug(...args: any[]): void;

/**
 * Log informational messages (INFO severity) 
 * @param args - Message and additional data to log
 */
function info(...args: any[]): void;

/**
 * Log informational messages (INFO severity) - alias for info()
 * @param args - Message and additional data to log
 */
function log(...args: any[]): void;

/**
 * Log warning conditions (WARNING severity)
 * @param args - Message and additional data to log
 */
function warn(...args: any[]): void;

/**
 * Log error conditions (ERROR severity) 
 * @param args - Message and additional data to log
 */
function error(...args: any[]): void;
```

### Console Compatibility Layer

The logger provides a console compatibility layer that monkey-patches the global console object to format output as structured JSON logs.

```typescript { .api }
/**
 * Console compatibility module that patches global console methods
 * Import this module to automatically redirect console.* calls to structured logging
 * 
 * @example
 * import 'firebase-functions/logger/compat';
 * 
 * // These console calls will now produce structured JSON logs
 * console.log("Hello world");
 * console.error("Something went wrong", { userId: "123" });
 */
```

**Usage Examples:**

```typescript
import { info, warn, error, debug, write } from "firebase-functions/logger";

// Basic logging with different severity levels
export const exampleFunction = onRequest((req, res) => {
  debug("Function started", { url: req.url, method: req.method });
  
  info("Processing request", { 
    userId: req.headers["user-id"],
    timestamp: new Date().toISOString()
  });
  
  try {
    // Process request logic
    const result = processRequest(req.body);
    
    info("Request processed successfully", { 
      result: result.id,
      processingTime: result.duration
    });
    
    res.json({ success: true, result });
    
  } catch (err) {
    error("Request processing failed", {
      error: err.message,
      stack: err.stack,
      requestData: req.body,
      userId: req.headers["user-id"]
    });
    
    res.status(500).json({ error: "Processing failed" });
  }
});

// Structured logging with custom fields
export const analyticsProcessor = onDocumentCreated("events/{eventId}", (event) => {
  const eventData = event.data;
  const { eventId } = event.params;
  
  info("Processing analytics event", {
    eventId,
    eventType: eventData?.type,
    userId: eventData?.userId,
    timestamp: event.time,
    source: "firestore_trigger"
  });
  
  // Log with custom severity using write()
  write({
    severity: "NOTICE",
    message: "Analytics processing started",
    eventId,
    processingMetadata: {
      functionVersion: "v2.1.0",
      region: "us-central1",
      memoryAllocated: "1GiB"
    }
  });
  
  return processAnalyticsEvent(eventData).then(result => {
    info("Analytics processing completed", {
      eventId,
      processingResult: result,
      metricsGenerated: result.metrics?.length || 0
    });
  }).catch(err => {
    error("Analytics processing failed", {
      eventId,
      error: err.message,
      errorCode: err.code,
      retryable: err.retryable || false
    });
    throw err;
  });
});

// Console compatibility usage
import "firebase-functions/logger/compat";

export const legacyFunction = onRequest((req, res) => {
  // These console calls will be formatted as structured JSON logs
  console.log("Legacy function called");
  console.info("User data:", { userId: req.body.userId });
  console.warn("Deprecated endpoint used", { endpoint: req.path });
  console.error("Validation failed", { errors: ["missing field"] });
  
  res.json({ status: "processed" });
});

// Advanced structured logging for monitoring and alerting
export const criticalSystemProcess = onSchedule("0 * * * *", (event) => {
  info("Starting critical system process", {
    jobName: event.jobName,
    scheduleTime: event.scheduleTime,
    systemStatus: "healthy"
  });
  
  return performCriticalMaintenance()
    .then((result) => {
      if (result.criticalIssuesFound > 0) {
        write({
          severity: "ALERT",
          message: "Critical issues detected during maintenance",
          criticalIssuesFound: result.criticalIssuesFound,
          issueDetails: result.issues,
          actionRequired: "immediate_investigation",
          alertingTeam: "platform-ops"
        });
      }
      
      info("Critical system process completed", {
        duration: result.duration,
        itemsProcessed: result.itemsProcessed,
        issuesFound: result.criticalIssuesFound,
        nextScheduledRun: getNextScheduledTime()
      });
      
    })
    .catch((error) => {
      write({
        severity: "CRITICAL", 
        message: "Critical system process failed",
        error: error.message,
        stack: error.stack,
        systemImpact: "high",
        escalationRequired: true,
        oncallTeam: "platform-ops"
      });
      throw error;
    });
});

// Helper functions
function processRequest(body: any) {
  return { id: "req_123", duration: 150 };
}

function processAnalyticsEvent(eventData: any) {
  return Promise.resolve({ 
    metrics: [{ name: "page_view", value: 1 }] 
  });
}

function performCriticalMaintenance() {
  return Promise.resolve({
    duration: 30000,
    itemsProcessed: 1500,
    criticalIssuesFound: 0,
    issues: []
  });
}

function getNextScheduledTime() {
  return new Date(Date.now() + 3600000).toISOString();
}
```

### Best Practices

**Structured Data Guidelines:**

```typescript
// ✅ Good - Include relevant context
info("User profile updated", {
  userId: "user123",
  fieldsUpdated: ["displayName", "email"],
  updateSource: "profile_page",
  timestamp: new Date().toISOString()
});

// ❌ Avoid - Too verbose or sensitive data
info("User profile updated", {
  userId: "user123", 
  fullUserData: userData, // Too much data
  password: "secret123",  // Sensitive data
  internalSystemId: "sys_456" // Internal details
});
```

**Error Logging Patterns:**

```typescript
// ✅ Good - Include error context and actionable information
try {
  await processPayment(paymentData);
} catch (err) {
  error("Payment processing failed", {
    paymentId: paymentData.id,
    userId: paymentData.userId,
    amount: paymentData.amount,
    error: err.message,
    errorCode: err.code,
    retryable: err.retryable || false,
    paymentProvider: paymentData.provider
  });
  throw err;
}

// ✅ Good - Use appropriate severity levels
if (retryCount > MAX_RETRIES) {
  write({
    severity: "ALERT",
    message: "Maximum retry attempts exceeded",
    operation: "payment_processing",
    retryCount,
    maxRetries: MAX_RETRIES,
    requiresManualIntervention: true
  });
}
```

**Performance Monitoring:**

```typescript
// ✅ Good - Log performance metrics for monitoring
export const performanceMonitoredFunction = onRequest((req, res) => {
  const startTime = Date.now();
  
  info("Request started", {
    requestId: req.headers["x-request-id"],
    endpoint: req.path,
    method: req.method,
    userAgent: req.headers["user-agent"]
  });
  
  return processRequest(req)
    .then(result => {
      const duration = Date.now() - startTime;
      
      info("Request completed", {
        requestId: req.headers["x-request-id"],
        duration,
        statusCode: 200,
        responseSize: JSON.stringify(result).length,
        cacheHit: result.fromCache || false
      });
      
      // Log slow requests for investigation
      if (duration > 5000) {
        warn("Slow request detected", {
          requestId: req.headers["x-request-id"],
          duration,
          endpoint: req.path,
          requiresOptimization: true
        });
      }
      
      res.json(result);
    })
    .catch(err => {
      const duration = Date.now() - startTime;
      
      error("Request failed", {
        requestId: req.headers["x-request-id"],
        duration,
        error: err.message,
        statusCode: err.statusCode || 500,
        endpoint: req.path
      });
      
      res.status(err.statusCode || 500).json({ error: err.message });
    });
});
```

### Integration with Cloud Logging

The Firebase Functions logger automatically integrates with Google Cloud Logging, providing:

- **Structured JSON output** that Cloud Logging can parse and index
- **Severity-based filtering** for alerts and monitoring
- **Automatic correlation** with function execution logs
- **Query and analysis** capabilities in the Cloud Console

**Cloud Logging Query Examples:**

```sql
-- Find all errors in the last hour
resource.type="cloud_function"
severity>=ERROR
timestamp>="2024-01-01T10:00:00Z"

-- Find specific user-related events
resource.type="cloud_function"
jsonPayload.userId="user123"

-- Performance monitoring - slow requests
resource.type="cloud_function"
jsonPayload.duration>5000

-- Critical alerts requiring immediate attention
resource.type="cloud_function"
severity>=ALERT
```

### Migration from Console Logging

When migrating from console-based logging to structured logging:

```typescript
// Before - Basic console logging
console.log("User created:", userId);
console.error("Failed to process:", error);

// After - Structured logging with context
import { info, error } from "firebase-functions/logger";

info("User created", { 
  userId, 
  source: "auth_trigger",
  timestamp: new Date().toISOString()
});

error("Processing failed", {
  operation: "user_creation",
  userId,
  error: error.message,
  retryable: false
});

// Transition approach - Use compatibility layer initially
import "firebase-functions/logger/compat";

// Existing console.* calls work unchanged but output structured logs
console.log("User created:", userId); // Outputs JSON to Cloud Logging
console.error("Failed to process:", error); // Structured error log
```

### Monitoring and Alerting Setup

**Log-based Metrics:**

```typescript
// Create log entries that can trigger Cloud Monitoring alerts
export const healthCheck = onSchedule("*/5 * * * *", async () => {
  try {
    const healthStatus = await checkSystemHealth();
    
    if (healthStatus.status !== "healthy") {
      write({
        severity: "WARNING",
        message: "System health check failed",
        healthStatus: healthStatus.status,
        failedChecks: healthStatus.failedChecks,
        alertMetric: "system_unhealthy", // For alerting
        serviceName: "user_service"
      });
    } else {
      info("System health check passed", {
        healthStatus: "healthy",
        checksPerformed: healthStatus.totalChecks,
        alertMetric: "system_healthy"
      });
    }
  } catch (err) {
    write({
      severity: "CRITICAL",
      message: "Health check system failure",
      error: err.message,
      alertMetric: "health_check_failure",
      requiresImmediateAttention: true
    });
  }
});

async function checkSystemHealth() {
  return { 
    status: "healthy", 
    totalChecks: 5,
    failedChecks: []
  };
}
```