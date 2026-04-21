# Alerts System

Firebase Functions V2 provides a comprehensive alerts system that monitors Firebase services and triggers Cloud Functions when issues are detected. The alerts system covers App Distribution, Billing, Crashlytics, and Performance Monitoring, enabling automated incident response and monitoring workflows.

## Capabilities

### Main Alerts Framework

The core alerts system provides generic alert handling for all Firebase services.

```typescript { .api }
/**
 * Generic Firebase alert data structure
 */
interface FirebaseAlertData {
  /** Unique identifier for this alert instance */
  alertId: string;
  /** Type of alert (matches the alert configuration) */
  alertType: string;
  /** Firebase project that triggered the alert */
  appId: string;
  /** Timestamp when the alert condition was detected */
  createTime: string;
  /** Timestamp when the alert condition ended (if applicable) */
  endTime?: string;
  /** Alert payload data (varies by alert type) */
  payload: Record<string, any>;
}

/**
 * Create a trigger for any Firebase alert type
 * @param alertType - Type of alert to listen for
 * @param handler - Function to handle the alert
 * @returns CloudFunction for alert handling
 */
function onAlertPublished(
  alertType: string,
  handler: (event: CloudEvent<FirebaseAlertData>) => any | Promise<any>
): CloudFunction<CloudEvent<FirebaseAlertData>>;

function onAlertPublished(
  opts: AlertOptions,
  handler: (event: CloudEvent<FirebaseAlertData>) => any | Promise<any>
): CloudFunction<CloudEvent<FirebaseAlertData>>;

/**
 * Alert configuration options
 */
interface AlertOptions extends EventHandlerOptions {
  /** Specific alert type to listen for */
  alertType?: string;
  /** Alert region */
  region?: string | Expression<string> | ResetValue;
}
```

**Usage Examples:**

```typescript
import { onAlertPublished } from "firebase-functions/alerts";

// Generic alert handler for all Firebase alerts
export const handleFirebaseAlert = onAlertPublished((event) => {
  const alert = event.data;
  
  console.log("Firebase alert received:", {
    alertId: alert.alertId,
    alertType: alert.alertType,
    appId: alert.appId,
    createTime: alert.createTime,
    payload: alert.payload
  });
  
  // Route to appropriate handler based on alert type
  switch (alert.alertType) {
    case "crashlytics.newFatalIssue":
      return handleCrashlyticsAlert(alert);
    case "billing.planUpdate":
      return handleBillingAlert(alert);
    case "appDistribution.newTesterIosDevice":
      return handleAppDistributionAlert(alert);
    case "performance.threshold":
      return handlePerformanceAlert(alert);
    default:
      console.log(`Unknown alert type: ${alert.alertType}`);
      return null;
  }
});

// Specific alert type handler
export const handleCriticalAlerts = onAlertPublished(
  "crashlytics.newFatalIssue",
  (event) => {
    const alert = event.data;
    
    console.log("Critical Crashlytics alert:", alert.payload);
    
    return sendCriticalNotification(alert);
  }
);
```

### App Distribution Alerts

App Distribution alerts notify about new testers, devices, and distribution events.

```typescript { .api }
/**
 * App Distribution new tester iOS device alert
 */
interface AppDistributionNewTesterIosDevicePayload {
  /** Display name of the tester */
  testerName?: string;
  /** Email of the tester */
  testerEmail: string;
  /** iOS device model */
  testerDeviceModelName?: string;
  /** iOS device identifier */
  testerDeviceIdentifier?: string;
}

/**
 * Create trigger for new iOS tester device registration
 */
function onNewTesterIosDevicePublished(
  handler: (event: CloudEvent<AppDistributionNewTesterIosDevicePayload>) => any | Promise<any>
): CloudFunction<CloudEvent<AppDistributionNewTesterIosDevicePayload>>;

function onNewTesterIosDevicePublished(
  opts: AppDistributionOptions,
  handler: (event: CloudEvent<AppDistributionNewTesterIosDevicePayload>) => any | Promise<any>
): CloudFunction<CloudEvent<AppDistributionNewTesterIosDevicePayload>>;

/**
 * App Distribution configuration options
 */
interface AppDistributionOptions extends EventHandlerOptions {
  /** Target Firebase app ID */
  appId?: string;
  /** App Distribution region */
  region?: string | Expression<string> | ResetValue;
}
```

**Usage Examples:**

```typescript
import { onNewTesterIosDevicePublished } from "firebase-functions/alerts/appDistribution";

// Handle new iOS tester device registration
export const onNewIosTesterDevice = onNewTesterIosDevicePublished((event) => {
  const deviceInfo = event.data;
  
  console.log("New iOS tester device registered:", {
    testerName: deviceInfo.testerName,
    testerEmail: deviceInfo.testerEmail,
    deviceModel: deviceInfo.testerDeviceModelName,
    deviceId: deviceInfo.testerDeviceIdentifier,
    eventTime: event.time
  });
  
  // Auto-approve trusted testers
  return autoApproveTester(deviceInfo);
});

// App-specific device registration
export const onProductionAppTesterDevice = onNewTesterIosDevicePublished(
  { appId: "1:123456789:ios:abcdef123456" },
  (event) => {
    const deviceInfo = event.data;
    
    console.log("Production app tester device registered");
    
    // Notify admin team for production app registrations
    return notifyAdminTeam("new_tester_device", {
      testerEmail: deviceInfo.testerEmail,
      deviceModel: deviceInfo.testerDeviceModelName,
      appEnvironment: "production"
    });
  }
);

async function autoApproveTester(deviceInfo: AppDistributionNewTesterIosDevicePayload) {
  // Auto-approval logic for trusted domains
  if (deviceInfo.testerEmail.endsWith("@company.com")) {
    console.log(`Auto-approving internal tester: ${deviceInfo.testerEmail}`);
    // Implementation would use App Distribution API
    return approveDevice(deviceInfo.testerDeviceIdentifier);
  }
  
  return null;
}

async function notifyAdminTeam(eventType: string, data: any) {
  // Implementation for admin notifications
  console.log(`Notifying admin team of ${eventType}:`, data);
}

async function approveDevice(deviceId?: string) {
  // Implementation for device approval
  console.log(`Approving device: ${deviceId}`);
}
```

### Billing Alerts

Billing alerts monitor Firebase project spending and plan changes.

```typescript { .api }
/**
 * Billing plan update alert payload
 */
interface BillingPlanUpdatePayload {
  /** Previous billing plan */
  previousBillingPlan?: string;
  /** Current billing plan */
  currentBillingPlan: string;
  /** Notification type */
  notificationType?: string;
}

/**
 * Billing plan automation alert payload
 */
interface BillingPlanAutomationPayload {
  /** Billing plan automation status */
  billingPlanAutomationStatus: string;
  /** Notification type */
  notificationType?: string;
}

/**
 * Create trigger for billing plan updates
 */
function onPlanUpdatePublished(
  handler: (event: CloudEvent<BillingPlanUpdatePayload>) => any | Promise<any>
): CloudFunction<CloudEvent<BillingPlanUpdatePayload>>;

/**
 * Create trigger for billing plan automation events
 */
function onPlanAutomationPublished(
  handler: (event: CloudEvent<BillingPlanAutomationPayload>) => any | Promise<any>
): CloudFunction<CloudEvent<BillingPlanAutomationPayload>>;

/**
 * Billing alert configuration options
 */
interface BillingOptions extends EventHandlerOptions {
  /** Billing region */
  region?: string | Expression<string> | ResetValue;
}
```

**Usage Examples:**

```typescript
import { onPlanUpdatePublished, onPlanAutomationPublished } from "firebase-functions/alerts/billing";

// Monitor billing plan changes
export const onBillingPlanUpdate = onPlanUpdatePublished((event) => {
  const billingInfo = event.data;
  
  console.log("Billing plan updated:", {
    previousPlan: billingInfo.previousBillingPlan,
    currentPlan: billingInfo.currentBillingPlan,
    notificationType: billingInfo.notificationType,
    updateTime: event.time
  });
  
  // Alert on plan downgrades
  if (isPlanDowngrade(billingInfo.previousBillingPlan, billingInfo.currentBillingPlan)) {
    return sendBillingAlert("plan_downgrade", billingInfo);
  }
  
  // Log plan upgrades
  if (isPlanUpgrade(billingInfo.previousBillingPlan, billingInfo.currentBillingPlan)) {
    return logPlanUpgrade(billingInfo);
  }
  
  return null;
});

// Monitor billing automation events
export const onBillingAutomation = onPlanAutomationPublished((event) => {
  const automationInfo = event.data;
  
  console.log("Billing automation event:", {
    status: automationInfo.billingPlanAutomationStatus,
    notificationType: automationInfo.notificationType,
    eventTime: event.time
  });
  
  // Handle automation failures
  if (automationInfo.billingPlanAutomationStatus === "FAILED") {
    return handleBillingAutomationFailure(automationInfo);
  }
  
  return null;
});

function isPlanDowngrade(previous?: string, current?: string): boolean {
  const planRanking = { "spark": 0, "blaze": 1, "enterprise": 2 };
  if (!previous || !current) return false;
  return planRanking[previous as keyof typeof planRanking] > planRanking[current as keyof typeof planRanking];
}

function isPlanUpgrade(previous?: string, current?: string): boolean {
  const planRanking = { "spark": 0, "blaze": 1, "enterprise": 2 };
  if (!previous || !current) return false;
  return planRanking[previous as keyof typeof planRanking] < planRanking[current as keyof typeof planRanking];
}

async function sendBillingAlert(alertType: string, billingInfo: BillingPlanUpdatePayload) {
  // Send critical billing alert to finance team
  console.log(`Sending billing alert: ${alertType}`, billingInfo);
}

async function logPlanUpgrade(billingInfo: BillingPlanUpdatePayload) {
  // Log plan upgrade for analytics
  return admin.firestore().collection("billing_events").add({
    eventType: "plan_upgrade",
    previousPlan: billingInfo.previousBillingPlan,
    currentPlan: billingInfo.currentBillingPlan,
    timestamp: admin.firestore.Timestamp.now()
  });
}

async function handleBillingAutomationFailure(automationInfo: BillingPlanAutomationPayload) {
  // Handle billing automation failure
  console.log("Billing automation failed:", automationInfo);
  
  return admin.firestore().collection("billing_issues").add({
    issueType: "automation_failure",
    status: automationInfo.billingPlanAutomationStatus,
    reportedAt: admin.firestore.Timestamp.now(),
    requiresAttention: true
  });
}
```

### Crashlytics Alerts

Crashlytics alerts monitor app stability and crash events.

```typescript { .api }
/**
 * Crashlytics new fatal issue alert payload
 */
interface CrashlyticsNewFatalIssuePayload {
  /** Issue details */
  issue: {
    /** Unique issue identifier */
    issueId: string;
    /** Issue title/summary */
    issueTitle: string;
    /** Issue subtitle with additional details */
    issueSubtitle: string;
    /** Firebase app information */
    appVersion: string;
  };
  /** Velocity of issue occurrence */
  velocity: {
    /** Number of crashes in this issue */
    crashCount: number;
    /** Number of affected users */
    userCount: number;
  };
  /** When the issue was first detected */
  createTime: string;
  /** Link to Crashlytics console for this issue */
  resolveTime?: string;
}

/**
 * Crashlytics new non-fatal issue alert payload
 */
interface CrashlyticsNewNonfatalIssuePayload {
  /** Issue details */
  issue: {
    /** Unique issue identifier */
    issueId: string;
    /** Issue title/summary */
    issueTitle: string;
    /** Issue subtitle with additional details */
    issueSubtitle: string;
    /** Firebase app information */
    appVersion: string;
  };
  /** Velocity of issue occurrence */
  velocity: {
    /** Number of errors in this issue */
    errorCount: number;
    /** Number of affected users */
    userCount: number;
  };
  /** When the issue was first detected */
  createTime: string;
  /** Link to Crashlytics console for this issue */
  resolveTime?: string;
}

/**
 * Crashlytics regression alert payload
 */
interface CrashlyticsRegressionAlertPayload {
  /** Regression alert type */
  type: string;
  /** Issue details */
  issue: {
    /** Unique issue identifier */
    issueId: string;
    /** Issue title/summary */
    issueTitle: string;
    /** Issue subtitle with additional details */
    issueSubtitle: string;
    /** Firebase app information */
    appVersion: string;
  };
  /** When the regression was detected */
  createTime: string;
  /** Link to Crashlytics console */
  resolveTime?: string;
}

/**
 * Crashlytics stability digest alert payload
 */
interface CrashlyticsStabilityDigestPayload {
  /** Digest type */
  digestType: string;
  /** Trending issues in this digest */
  trendingIssues: Array<{
    /** Issue type (fatal or nonfatal) */
    type: string;
    /** Issue details */
    issue: {
      issueId: string;
      issueTitle: string;
      issueSubtitle: string;
      appVersion: string;
    };
    /** Event counts */
    eventCount: number;
    /** Affected user count */
    userCount: number;
  }>;
  /** Time period covered by this digest */
  createTime: string;
}

/**
 * Crashlytics velocity alert payload
 */
interface CrashlyticsVelocityAlertPayload {
  /** Velocity alert type */
  type: string;
  /** Issue details */
  issue: {
    /** Unique issue identifier */
    issueId: string;
    /** Issue title/summary */
    issueTitle: string;
    /** Issue subtitle with additional details */
    issueSubtitle: string;
    /** Firebase app information */
    appVersion: string;
  };
  /** Velocity metrics */
  velocity: {
    /** Crash or error count */
    crashCount: number;
    /** Number of affected users */
    userCount: number;
  };
  /** When the velocity alert was triggered */
  createTime: string;
}

/**
 * Create trigger for new fatal issue alerts
 */
function onNewFatalIssuePublished(
  handler: (event: CloudEvent<CrashlyticsNewFatalIssuePayload>) => any | Promise<any>
): CloudFunction<CloudEvent<CrashlyticsNewFatalIssuePayload>>;

/**
 * Create trigger for new non-fatal issue alerts
 */
function onNewNonfatalIssuePublished(
  handler: (event: CloudEvent<CrashlyticsNewNonfatalIssuePayload>) => any | Promise<any>
): CloudFunction<CloudEvent<CrashlyticsNewNonfatalIssuePayload>>;

/**
 * Create trigger for regression alerts
 */
function onRegressionAlertPublished(
  handler: (event: CloudEvent<CrashlyticsRegressionAlertPayload>) => any | Promise<any>
): CloudFunction<CloudEvent<CrashlyticsRegressionAlertPayload>>;

/**
 * Create trigger for stability digest alerts
 */
function onStabilityDigestPublished(
  handler: (event: CloudEvent<CrashlyticsStabilityDigestPayload>) => any | Promise<any>
): CloudFunction<CloudEvent<CrashlyticsStabilityDigestPayload>>;

/**
 * Create trigger for velocity alerts
 */
function onVelocityAlertPublished(
  handler: (event: CloudEvent<CrashlyticsVelocityAlertPayload>) => any | Promise<any>
): CloudFunction<CloudEvent<CrashlyticsVelocityAlertPayload>>;

/**
 * Declares a function that can handle a new Application Not Responding (ANR) issue published to Crashlytics
 * @param handler - Event handler that is triggered when a new ANR issue is published to Crashlytics
 * @returns A function that you can export and deploy
 */
function onNewAnrIssuePublished(
  handler: (event: CloudEvent<CrashlyticsNewAnrIssuePayload>) => any | Promise<any>
): CloudFunction<CloudEvent<CrashlyticsNewAnrIssuePayload>>;

/**
 * Declares a function that can handle a new Application Not Responding (ANR) issue published to Crashlytics
 * @param opts - Options that can be set on an individual event-handling function
 * @param handler - Event handler that is triggered when a new ANR issue is published to Crashlytics
 * @returns A function that you can export and deploy
 */
function onNewAnrIssuePublished(
  opts: CrashlyticsOptions,
  handler: (event: CloudEvent<CrashlyticsNewAnrIssuePayload>) => any | Promise<any>
): CloudFunction<CloudEvent<CrashlyticsNewAnrIssuePayload>>;

/**
 * Crashlytics alert configuration options
 */
interface CrashlyticsOptions extends EventHandlerOptions {
  /** Target Firebase app ID */
  appId?: string;
  /** Crashlytics region */
  region?: string | Expression<string> | ResetValue;
}
```

**Usage Examples:**

```typescript
import { 
  onNewFatalIssuePublished,
  onNewNonfatalIssuePublished,
  onRegressionAlertPublished,
  onStabilityDigestPublished,
  onVelocityAlertPublished,
  onNewAnrIssuePublished
} from "firebase-functions/alerts/crashlytics";

// Handle critical fatal crashes
export const onFatalCrash = onNewFatalIssuePublished((event) => {
  const crashInfo = event.data;
  
  console.log("New fatal crash detected:", {
    issueId: crashInfo.issue.issueId,
    issueTitle: crashInfo.issue.issueTitle,
    appVersion: crashInfo.issue.appVersion,
    crashCount: crashInfo.velocity.crashCount,
    userCount: crashInfo.velocity.userCount,
    createTime: crashInfo.createTime
  });
  
  // Send immediate alert for high-impact crashes
  if (crashInfo.velocity.userCount > 100) {
    return sendCriticalCrashAlert(crashInfo);
  }
  
  // Create incident ticket for all fatal crashes
  return createIncidentTicket("fatal_crash", crashInfo);
});

// Monitor non-fatal errors for trends
export const onNonfatalError = onNewNonfatalIssuePublished((event) => {
  const errorInfo = event.data;
  
  console.log("New non-fatal error detected:", {
    issueId: errorInfo.issue.issueId,
    issueTitle: errorInfo.issue.issueTitle,
    errorCount: errorInfo.velocity.errorCount,
    userCount: errorInfo.velocity.userCount
  });
  
  // Track error trends in database
  return trackErrorTrend(errorInfo);
});

// Handle app regression alerts
export const onAppRegression = onRegressionAlertPublished((event) => {
  const regressionInfo = event.data;
  
  console.log("App regression detected:", {
    type: regressionInfo.type,
    issueId: regressionInfo.issue.issueId,
    issueTitle: regressionInfo.issue.issueTitle,
    appVersion: regressionInfo.issue.appVersion
  });
  
  // Immediately alert development team about regressions
  return alertDevelopmentTeam("regression", regressionInfo);
});

// Process daily stability digest
export const onStabilityDigest = onStabilityDigestPublished((event) => {
  const digest = event.data;
  
  console.log("Stability digest received:", {
    digestType: digest.digestType,
    trendingIssuesCount: digest.trendingIssues.length,
    createTime: digest.createTime
  });
  
  // Generate daily stability report
  return generateStabilityReport(digest);
});

// Monitor crash velocity for rapid response
export const onCrashVelocity = onVelocityAlertPublished((event) => {
  const velocityInfo = event.data;
  
  console.log("Crash velocity alert:", {
    type: velocityInfo.type,
    issueId: velocityInfo.issue.issueId,
    crashCount: velocityInfo.velocity.crashCount,
    userCount: velocityInfo.velocity.userCount
  });
  
  // Trigger automated rollback if crash rate is too high
  if (velocityInfo.velocity.crashCount > 1000) {
    return triggerEmergencyRollback(velocityInfo);
  }
  
  return null;
});

// Handle Android Application Not Responding (ANR) issues
export const onAndroidANR = onNewAnrIssuePublished((event) => {
  const anrInfo = event.data;
  
  console.log("New ANR issue detected:", {
    issueId: anrInfo.issue.issueId,
    issueTitle: anrInfo.issue.issueTitle,
    appVersion: anrInfo.issue.appVersion,
    userCount: anrInfo.velocity.userCount,
    anrCount: anrInfo.velocity.crashCount
  });
  
  // ANR issues indicate performance problems, alert performance team
  return alertPerformanceTeam("anr_issue", anrInfo);
});

// App-specific ANR monitoring for production
export const onProductionANR = onNewAnrIssuePublished(
  { appId: "1:123456789:android:abcdef123456" },
  (event) => {
    const anrInfo = event.data;
    
    console.log("Production ANR detected - high priority");
    
    // For production ANRs, immediately escalate to senior engineers
    return escalateToSeniorTeam("production_anr", {
      issueId: anrInfo.issue.issueId,
      userImpact: anrInfo.velocity.userCount,
      appVersion: anrInfo.issue.appVersion
    });
  }
);

// Helper functions
async function sendCriticalCrashAlert(crashInfo: CrashlyticsNewFatalIssuePayload) {
  // Send high-priority alert to on-call engineer
  console.log("Sending critical crash alert:", crashInfo.issue.issueTitle);
  
  return admin.firestore().collection("critical_alerts").add({
    type: "fatal_crash",
    issueId: crashInfo.issue.issueId,
    issueTitle: crashInfo.issue.issueTitle,
    userCount: crashInfo.velocity.userCount,
    crashCount: crashInfo.velocity.crashCount,
    severity: "critical",
    createdAt: admin.firestore.Timestamp.now(),
    status: "open"
  });
}

async function createIncidentTicket(type: string, crashInfo: CrashlyticsNewFatalIssuePayload) {
  // Create incident ticket in tracking system
  console.log(`Creating ${type} incident ticket`);
  
  return admin.firestore().collection("incidents").add({
    type,
    issueId: crashInfo.issue.issueId,
    title: crashInfo.issue.issueTitle,
    description: crashInfo.issue.issueSubtitle,
    appVersion: crashInfo.issue.appVersion,
    impact: {
      userCount: crashInfo.velocity.userCount,
      crashCount: crashInfo.velocity.crashCount
    },
    status: "open",
    createdAt: admin.firestore.Timestamp.now()
  });
}

async function trackErrorTrend(errorInfo: CrashlyticsNewNonfatalIssuePayload) {
  // Track error trends for analysis
  return admin.firestore().collection("error_trends").add({
    issueId: errorInfo.issue.issueId,
    title: errorInfo.issue.issueTitle,
    appVersion: errorInfo.issue.appVersion,
    errorCount: errorInfo.velocity.errorCount,
    userCount: errorInfo.velocity.userCount,
    timestamp: admin.firestore.Timestamp.now()
  });
}

async function alertDevelopmentTeam(alertType: string, regressionInfo: CrashlyticsRegressionAlertPayload) {
  // Alert development team about regression
  console.log(`Alerting dev team about ${alertType}`);
  
  return admin.firestore().collection("dev_alerts").add({
    type: alertType,
    issueId: regressionInfo.issue.issueId,
    title: regressionInfo.issue.issueTitle,
    appVersion: regressionInfo.issue.appVersion,
    urgency: "high",
    createdAt: admin.firestore.Timestamp.now()
  });
}

async function generateStabilityReport(digest: CrashlyticsStabilityDigestPayload) {
  // Generate stability report from digest
  const report = {
    digestType: digest.digestType,
    period: digest.createTime,
    totalTrendingIssues: digest.trendingIssues.length,
    fatalIssues: digest.trendingIssues.filter(i => i.type === "fatal").length,
    nonfatalIssues: digest.trendingIssues.filter(i => i.type === "nonfatal").length,
    totalAffectedUsers: digest.trendingIssues.reduce((sum, issue) => sum + issue.userCount, 0),
    generatedAt: admin.firestore.Timestamp.now()
  };
  
  return admin.firestore().collection("stability_reports").add(report);
}

async function triggerEmergencyRollback(velocityInfo: CrashlyticsVelocityAlertPayload) {
  // Trigger emergency rollback for high crash rate
  console.log("Triggering emergency rollback due to high crash rate");
  
  return admin.firestore().collection("emergency_actions").add({
    action: "rollback",
    trigger: "crash_velocity",
    issueId: velocityInfo.issue.issueId,
    crashCount: velocityInfo.velocity.crashCount,
    userCount: velocityInfo.velocity.userCount,
    initiatedAt: admin.firestore.Timestamp.now(),
    status: "pending"
  });
}
```

### Performance Monitoring Alerts

Performance Monitoring alerts detect app performance issues and threshold breaches.

```typescript { .api }
/**
 * Performance threshold alert payload
 */
interface PerformanceThresholdAlertPayload {
  /** Threshold alert details */
  thresholdAlert: {
    /** Alert condition that was breached */
    alertCondition: string;
    /** Metric type (e.g., app_start_time, network_request_duration) */
    metricType: string;
    /** Threshold value that was exceeded */
    thresholdValue: number;
    /** Actual measured value */
    actualValue: number;
    /** Percentile if applicable (e.g., 90, 95, 99) */
    percentile?: number;
    /** Number of violations in the alert period */
    violationCount: number;
    /** Alert investigation period */
    investigationPeriod: string;
  };
  /** App version that triggered the alert */
  appVersion: string;
  /** When the threshold was first breached */
  createTime: string;
  /** Links to Performance Monitoring console */
  links: {
    /** Link to the specific performance issue */
    consoleUri: string;
  };
}

/**
 * Create trigger for performance threshold alerts
 */
function onThresholdAlertPublished(
  handler: (event: CloudEvent<PerformanceThresholdAlertPayload>) => any | Promise<any>
): CloudFunction<CloudEvent<PerformanceThresholdAlertPayload>>;

function onThresholdAlertPublished(
  opts: PerformanceOptions,
  handler: (event: CloudEvent<PerformanceThresholdAlertPayload>) => any | Promise<any>
): CloudFunction<CloudEvent<PerformanceThresholdAlertPayload>>;

/**
 * Performance Monitoring alert configuration options
 */
interface PerformanceOptions extends EventHandlerOptions {
  /** Target Firebase app ID */
  appId?: string;
  /** Performance Monitoring region */
  region?: string | Expression<string> | ResetValue;
}
```

**Usage Examples:**

```typescript
import { onThresholdAlertPublished } from "firebase-functions/alerts/performance";

// Monitor app performance threshold breaches
export const onPerformanceThreshold = onThresholdAlertPublished((event) => {
  const perfAlert = event.data;
  const threshold = perfAlert.thresholdAlert;
  
  console.log("Performance threshold breached:", {
    metricType: threshold.metricType,
    alertCondition: threshold.alertCondition,
    thresholdValue: threshold.thresholdValue,
    actualValue: threshold.actualValue,
    percentile: threshold.percentile,
    violationCount: threshold.violationCount,
    appVersion: perfAlert.appVersion,
    consoleLink: perfAlert.links.consoleUri
  });
  
  // Handle different performance metrics
  switch (threshold.metricType) {
    case "app_start_time":
      return handleAppStartTimeAlert(perfAlert);
    case "network_request_duration":
      return handleNetworkLatencyAlert(perfAlert);
    case "screen_rendering":
      return handleRenderingAlert(perfAlert);
    default:
      return handleGenericPerformanceAlert(perfAlert);
  }
});

// App-specific performance monitoring
export const onProductionAppPerformance = onThresholdAlertPublished(
  { appId: "1:123456789:android:abcdef123456" },
  (event) => {
    const perfAlert = event.data;
    
    console.log("Production app performance issue detected");
    
    // Critical performance issues in production require immediate attention
    return escalateProductionPerformanceIssue(perfAlert);
  }
);

async function handleAppStartTimeAlert(perfAlert: PerformanceThresholdAlertPayload) {
  console.log("App start time threshold exceeded:", {
    threshold: perfAlert.thresholdAlert.thresholdValue,
    actual: perfAlert.thresholdAlert.actualValue,
    appVersion: perfAlert.appVersion
  });
  
  // Check if this is a regression from a recent release
  const isRegression = await checkForStartTimeRegression(
    perfAlert.appVersion,
    perfAlert.thresholdAlert.actualValue
  );
  
  if (isRegression) {
    return alertPerformanceTeam("app_start_regression", perfAlert);
  }
  
  // Track performance trend
  return trackPerformanceMetric("app_start_time", perfAlert);
}

async function handleNetworkLatencyAlert(perfAlert: PerformanceThresholdAlertPayload) {
  console.log("Network latency threshold exceeded:", {
    threshold: perfAlert.thresholdAlert.thresholdValue,
    actual: perfAlert.thresholdAlert.actualValue,
    violations: perfAlert.thresholdAlert.violationCount
  });
  
  // High violation count indicates systemic network issues
  if (perfAlert.thresholdAlert.violationCount > 100) {
    return investigateNetworkInfrastructure(perfAlert);
  }
  
  return trackPerformanceMetric("network_latency", perfAlert);
}

async function handleRenderingAlert(perfAlert: PerformanceThresholdAlertPayload) {
  console.log("Screen rendering performance issue:", {
    threshold: perfAlert.thresholdAlert.thresholdValue,
    actual: perfAlert.thresholdAlert.actualValue,
    percentile: perfAlert.thresholdAlert.percentile
  });
  
  return trackPerformanceMetric("screen_rendering", perfAlert);
}

async function handleGenericPerformanceAlert(perfAlert: PerformanceThresholdAlertPayload) {
  console.log("Generic performance threshold breached:", {
    metricType: perfAlert.thresholdAlert.metricType,
    threshold: perfAlert.thresholdAlert.thresholdValue,
    actual: perfAlert.thresholdAlert.actualValue
  });
  
  return trackPerformanceMetric("generic", perfAlert);
}

async function escalateProductionPerformanceIssue(perfAlert: PerformanceThresholdAlertPayload) {
  // Escalate production performance issues immediately
  return admin.firestore().collection("production_alerts").add({
    type: "performance_threshold",
    severity: "high",
    metricType: perfAlert.thresholdAlert.metricType,
    alertCondition: perfAlert.thresholdAlert.alertCondition,
    thresholdValue: perfAlert.thresholdAlert.thresholdValue,
    actualValue: perfAlert.thresholdAlert.actualValue,
    appVersion: perfAlert.appVersion,
    consoleLink: perfAlert.links.consoleUri,
    escalatedAt: admin.firestore.Timestamp.now(),
    status: "open"
  });
}

async function checkForStartTimeRegression(appVersion: string, actualValue: number): Promise<boolean> {
  // Check historical data for performance regression
  const historicalData = await admin.firestore()
    .collection("performance_history")
    .where("metricType", "==", "app_start_time")
    .orderBy("timestamp", "desc")
    .limit(10)
    .get();
  
  if (historicalData.empty) return false;
  
  const recentAverage = historicalData.docs
    .map(doc => doc.data().actualValue)
    .reduce((sum, val) => sum + val, 0) / historicalData.size;
  
  // Consider it a regression if current value is 50% worse than recent average
  return actualValue > recentAverage * 1.5;
}

async function alertPerformanceTeam(alertType: string, perfAlert: PerformanceThresholdAlertPayload) {
  // Alert performance engineering team
  console.log(`Alerting performance team about ${alertType}`);
  
  return admin.firestore().collection("performance_alerts").add({
    type: alertType,
    metricType: perfAlert.thresholdAlert.metricType,
    severity: "regression",
    appVersion: perfAlert.appVersion,
    thresholdData: perfAlert.thresholdAlert,
    consoleLink: perfAlert.links.consoleUri,
    createdAt: admin.firestore.Timestamp.now(),
    assignedTeam: "performance_engineering"
  });
}

async function investigateNetworkInfrastructure(perfAlert: PerformanceThresholdAlertPayload) {
  // Trigger network infrastructure investigation
  console.log("Investigating network infrastructure due to high violation count");
  
  return admin.firestore().collection("investigations").add({
    type: "network_infrastructure",
    trigger: "high_latency_violations",
    violationCount: perfAlert.thresholdAlert.violationCount,
    metricData: perfAlert.thresholdAlert,
    priority: "high",
    initiatedAt: admin.firestore.Timestamp.now(),
    status: "pending"
  });
}

async function trackPerformanceMetric(metricCategory: string, perfAlert: PerformanceThresholdAlertPayload) {
  // Track performance metrics for trend analysis
  return admin.firestore().collection("performance_history").add({
    category: metricCategory,
    metricType: perfAlert.thresholdAlert.metricType,
    alertCondition: perfAlert.thresholdAlert.alertCondition,
    thresholdValue: perfAlert.thresholdAlert.thresholdValue,
    actualValue: perfAlert.thresholdAlert.actualValue,
    percentile: perfAlert.thresholdAlert.percentile,
    violationCount: perfAlert.thresholdAlert.violationCount,
    appVersion: perfAlert.appVersion,
    timestamp: admin.firestore.Timestamp.fromDate(new Date(perfAlert.createTime))
  });
}
```

### Best Practices for Alert Handling

**Alert Routing and Escalation:**

```typescript
// Comprehensive alert router with escalation logic
export const alertRouter = onAlertPublished(async (event) => {
  const alert = event.data;
  
  // Determine alert severity and routing
  const severity = determineAlertSeverity(alert);
  const routing = getAlertRouting(alert.alertType, severity);
  
  console.log("Routing alert:", {
    alertType: alert.alertType,
    severity,
    routing: routing.team,
    escalationLevel: routing.escalationLevel
  });
  
  // Route based on severity and type
  const promises = [];
  
  // Always log the alert
  promises.push(logAlert(alert, severity));
  
  // Route to appropriate team
  promises.push(routeToTeam(routing.team, alert, severity));
  
  // Set up escalation timer for critical alerts
  if (severity === "critical") {
    promises.push(scheduleEscalation(alert, routing.escalationDelayMinutes));
  }
  
  // Update metrics
  promises.push(updateAlertMetrics(alert.alertType, severity));
  
  return Promise.all(promises);
});

function determineAlertSeverity(alert: FirebaseAlertData): "low" | "medium" | "high" | "critical" {
  // Determine severity based on alert type and payload
  if (alert.alertType.includes("fatal") || alert.alertType.includes("regression")) {
    return "critical";
  }
  
  if (alert.alertType.includes("billing") || alert.alertType.includes("velocity")) {
    return "high";
  }
  
  if (alert.alertType.includes("threshold") || alert.alertType.includes("nonfatal")) {
    return "medium";
  }
  
  return "low";
}

function getAlertRouting(alertType: string, severity: string) {
  const routingTable = {
    "crashlytics": { team: "mobile_engineering", escalationLevel: 1, escalationDelayMinutes: 15 },
    "performance": { team: "performance_engineering", escalationLevel: 1, escalationDelayMinutes: 30 },
    "billing": { team: "finance", escalationLevel: 2, escalationDelayMinutes: 60 },
    "appDistribution": { team: "release_management", escalationLevel: 1, escalationDelayMinutes: 45 }
  };
  
  // Default routing
  return routingTable["mobile_engineering"];
}

async function logAlert(alert: FirebaseAlertData, severity: string) {
  return admin.firestore().collection("alert_log").add({
    alertId: alert.alertId,
    alertType: alert.alertType,
    severity,
    appId: alert.appId,
    payload: alert.payload,
    createTime: alert.createTime,
    loggedAt: admin.firestore.Timestamp.now()
  });
}

async function routeToTeam(team: string, alert: FirebaseAlertData, severity: string) {
  // Route alert to appropriate team
  console.log(`Routing ${severity} alert to ${team}`);
  
  return admin.firestore().collection("team_alerts").add({
    team,
    alertId: alert.alertId,
    alertType: alert.alertType,
    severity,
    payload: alert.payload,
    status: "open",
    routedAt: admin.firestore.Timestamp.now()
  });
}

async function scheduleEscalation(alert: FirebaseAlertData, delayMinutes: number) {
  // Schedule escalation for unacknowledged critical alerts
  console.log(`Scheduling escalation in ${delayMinutes} minutes for alert ${alert.alertId}`);
  
  return admin.firestore().collection("escalation_schedule").add({
    alertId: alert.alertId,
    escalateAt: admin.firestore.Timestamp.fromMillis(
      Date.now() + delayMinutes * 60 * 1000
    ),
    status: "pending"
  });
}

async function updateAlertMetrics(alertType: string, severity: string) {
  // Update alerting metrics for monitoring and reporting
  const metricsRef = admin.firestore()
    .collection("alert_metrics")
    .doc(new Date().toISOString().split('T')[0]); // Daily metrics
  
  return metricsRef.set({
    [`${alertType}.${severity}`]: admin.firestore.FieldValue.increment(1),
    lastUpdated: admin.firestore.Timestamp.now()
  }, { merge: true });
}
```