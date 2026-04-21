# Remote Config

Firebase Remote Config management for dynamically updating app behavior and appearance without requiring users to download an app update.

## Capabilities

### Get Remote Config

Retrieves the current Remote Config template from Firebase.

```typescript { .api }
/**
 * Get Firebase Remote Config template
 * @param options - Command options
 * @returns Promise resolving to Remote Config template
 */
function get(options?: Options & {
  /** Version number to retrieve (default: latest) */
  versionNumber?: string;
  /** Output format */
  format?: "json" | "yaml";
  /** Output file path */
  output?: string;
}): Promise<{
  conditions: Array<{
    name: string;
    expression: string;
    tagColor?: string;
  }>;
  parameters: Record<string, {
    defaultValue?: {
      value?: string;
      useInAppDefault?: boolean;
    };
    conditionalValues?: Record<string, {
      value: string;
    }>;
    description?: string;
  }>;
  parameterGroups: Record<string, {
    description?: string;
    parameters: Record<string, any>;
  }>;
  version: {
    versionNumber: string;
    updateTime: string;
    updateUser: {
      email: string;
    };
    updateOrigin: string;
    updateType: string;
    rollbackSource?: string;
    description?: string;
  };
  etag: string;
}>;
```

**Usage Examples:**

```javascript
const client = require("firebase-tools");

// Get current Remote Config template
const config = await client.remoteconfig.get({
  project: "my-project"
});

console.log("Current config version:", config.version.versionNumber);
console.log("Parameters:", Object.keys(config.parameters));

// Get specific version
const oldConfig = await client.remoteconfig.get({
  project: "my-project",
  versionNumber: "123"
});

// Save to file
await client.remoteconfig.get({
  project: "my-project",
  output: "./remote-config-backup.json",
  format: "json"
});
```

### Rollback Remote Config

Rolls back Remote Config to a previous version.

```typescript { .api }
/**
 * Rollback Firebase Remote Config to previous version
 * @param versionNumber - Version number to rollback to
 * @param options - Rollback options
 * @returns Promise resolving when rollback completes
 */
function rollback(
  versionNumber: string,
  options?: Options & {
    /** Confirm rollback without prompting */
    confirm?: boolean;
  }
): Promise<{
  version: {
    versionNumber: string;
    updateTime: string;
    updateUser: {
      email: string;
    };
    updateOrigin: string;
    updateType: string;
    rollbackSource: string;
    description?: string;
  };
}>;
```

**Usage Examples:**

```javascript
// Rollback to specific version
await client.remoteconfig.rollback("125", {
  project: "my-project",
  confirm: true
});

// Interactive rollback (prompts for confirmation)
await client.remoteconfig.rollback("124", {
  project: "my-project"
});
```

## Version Management

### List Versions

Lists Remote Config version history.

```typescript { .api }
/**
 * List Firebase Remote Config versions
 * @param options - Command options
 * @returns Promise resolving to array of version information
 */
function versionsList(options?: Options & {
  /** Limit number of versions to return */
  limit?: number;
}): Promise<Array<{
  versionNumber: string;
  updateTime: string;
  updateUser: {
    email: string;
    name?: string;
  };
  updateOrigin: "REMOTE_CONFIG_UPDATE_ORIGIN_UNSPECIFIED" | "CONSOLE" | "REST_API" | "ADMIN_SDK_NODE" | "ADMIN_SDK_JAVA" | "ADMIN_SDK_PYTHON" | "ADMIN_SDK_GO";
  updateType: "REMOTE_CONFIG_UPDATE_TYPE_UNSPECIFIED" | "INCREMENTAL_UPDATE" | "FORCED_UPDATE" | "ROLLBACK";
  rollbackSource?: string;
  description?: string;
}>>;
```

**Usage Examples:**

```javascript
// List recent versions
const versions = await client.remoteconfig.versions.list({
  project: "my-project",
  limit: 10
});

console.log("Recent Remote Config versions:");
versions.forEach(version => {
  console.log(`- Version ${version.versionNumber}: ${version.updateTime} by ${version.updateUser.email}`);
  if (version.description) {
    console.log(`  Description: ${version.description}`);
  }
});
```

## Remote Config Structure

### Parameters

Remote Config parameters are key-value pairs that control app behavior:

```json
{
  "parameters": {
    "welcome_message": {
      "defaultValue": {
        "value": "Welcome to our app!"
      },
      "conditionalValues": {
        "premium_users": {
          "value": "Welcome back, premium user!"
        }
      },
      "description": "Message shown on app launch"
    },
    "feature_enabled": {
      "defaultValue": {
        "value": "false"
      },
      "conditionalValues": {
        "beta_testers": {
          "value": "true"
        }
      }
    },
    "max_items_per_page": {
      "defaultValue": {
        "value": "10"
      },
      "conditionalValues": {
        "mobile_users": {
          "value": "5"
        }
      }
    }
  }
}
```

### Conditions

Conditions determine when to serve different parameter values:

```json
{
  "conditions": [
    {
      "name": "premium_users",
      "expression": "user.customAttribute['subscription_type'] == 'premium'",
      "tagColor": "BLUE"
    },
    {
      "name": "beta_testers", 
      "expression": "user.inRandomPercentile <= 10",
      "tagColor": "GREEN"
    },
    {
      "name": "mobile_users",
      "expression": "device.os == 'ios' || device.os == 'android'",
      "tagColor": "ORANGE"
    },
    {
      "name": "us_users",
      "expression": "user.country in ['us', 'ca']",
      "tagColor": "RED"
    }
  ]
}
```

### Parameter Groups

Group related parameters for better organization:

```json
{
  "parameterGroups": {
    "ui_customization": {
      "description": "UI appearance and behavior settings",
      "parameters": {
        "primary_color": {
          "defaultValue": {
            "value": "#1976D2"
          }
        },
        "show_banner": {
          "defaultValue": {
            "value": "true"
          }
        }
      }
    },
    "feature_flags": {
      "description": "Feature toggle switches",
      "parameters": {
        "new_checkout_flow": {
          "defaultValue": {
            "value": "false"
          }
        }
      }
    }
  }
}
```

## Deployment Workflow

### Template Deployment

Remote Config templates are deployed as part of the Firebase deployment process:

```bash
# Deploy Remote Config with other services
firebase deploy --only remoteconfig

# Deploy only Remote Config
firebase deploy --only remoteconfig
```

### Configuration in firebase.json

```json
{
  "remoteconfig": {
    "template": "remoteconfig.template.json"
  }
}
```

### Template File Format

The template file should contain the complete Remote Config structure:

```json
{
  "conditions": [...],
  "parameters": {...},
  "parameterGroups": {...},
  "version": {
    "description": "Updated feature flags and UI customization"
  }
}
```

## Best Practices

### Parameter Design

- **Descriptive Names**: Use clear, descriptive parameter names
- **Default Values**: Always provide sensible default values
- **Data Types**: Use appropriate data types (string, number, boolean, JSON)
- **Documentation**: Include descriptions for all parameters

### Condition Strategy

- **Targeted Rollouts**: Use percentage-based rollouts for gradual feature releases
- **User Segmentation**: Target specific user groups with custom attributes
- **Geographic Targeting**: Use country/region conditions for localized features
- **Device Targeting**: Target specific platforms or device types

### Version Management

- **Descriptive Updates**: Always include meaningful descriptions for version updates
- **Backup Strategy**: Regularly backup Remote Config templates
- **Testing**: Test configuration changes thoroughly before deploying
- **Rollback Plan**: Be prepared to rollback problematic changes

### Performance

- **Caching**: Remote Config values are cached on client devices
- **Fetch Frequency**: Control how often clients fetch updates
- **Minimal Payloads**: Keep parameter values reasonably sized
- **Condition Complexity**: Avoid overly complex condition expressions

## Integration Examples

### Feature Flags

```json
{
  "parameters": {
    "new_payment_flow": {
      "defaultValue": {"value": "false"},
      "conditionalValues": {
        "early_adopters": {"value": "true"}
      }
    }
  },
  "conditions": [
    {
      "name": "early_adopters",
      "expression": "user.customAttribute['beta_tester'] == 'true'"
    }
  ]
}
```

### A/B Testing

```json
{
  "parameters": {
    "button_color": {
      "defaultValue": {"value": "blue"},
      "conditionalValues": {
        "variant_a": {"value": "blue"},
        "variant_b": {"value": "green"}
      }
    }
  },
  "conditions": [
    {
      "name": "variant_a",
      "expression": "user.inRandomPercentile <= 50"
    },
    {
      "name": "variant_b", 
      "expression": "user.inRandomPercentile > 50"
    }
  ]
}
```