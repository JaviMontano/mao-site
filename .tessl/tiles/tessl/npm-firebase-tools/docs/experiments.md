# Experiments

Firebase Labs experiments management for enabling and configuring beta features and experimental functionality.

## Capabilities

### Experiment Management

List, enable, and disable Firebase Labs experiments.

```typescript { .api }
/**
 * List all available experiments with their status and descriptions
 * @param options - Configuration options
 * @returns Promise resolving to array of experiment objects
 */
function experimentsList(options?: Options): Promise<any[]>;

/**
 * Get detailed description of a specific experiment
 * @param experiment - Experiment name
 * @param options - Configuration options
 * @returns Promise resolving to experiment details
 */
function experimentsDescribe(
  experiment: string,
  options?: Options
): Promise<any>;

/**
 * Enable a Firebase Labs experiment
 * @param experiment - Experiment name to enable
 * @param options - Configuration options
 * @returns Promise resolving when experiment is enabled
 */
function experimentsEnable(
  experiment: string,
  options?: Options
): Promise<void>;

/**
 * Disable a Firebase Labs experiment
 * @param experiment - Experiment name to disable
 * @param options - Configuration options
 * @returns Promise resolving when experiment is disabled
 */
function experimentsDisable(
  experiment: string,
  options?: Options
): Promise<void>;
```

## Usage Examples

### Experiment Management

```typescript
import * as client from "firebase-tools";

// List all experiments
const experiments = await client.experiments.list({
  project: "my-project"
});

console.log("Available experiments:");
experiments.forEach(exp => {
  console.log(`- ${exp.name}: ${exp.enabled ? 'enabled' : 'disabled'}`);
  console.log(`  ${exp.description}`);
});

// Get experiment description
const expDetails = await client.experiments.describe("webframeworks", {
  project: "my-project"
});

// Enable an experiment
await client.experiments.enable("webframeworks", {
  project: "my-project"
});

// Disable an experiment
await client.experiments.disable("webframeworks", {
  project: "my-project"
});
```

## CLI Usage

### List Experiments

```bash
# List all experiments with status
firebase experiments:list
```

### Experiment Control

```bash
# Describe a specific experiment
firebase experiments:describe webframeworks

# Enable an experiment
firebase experiments:enable webframeworks

# Disable an experiment  
firebase experiments:disable webframeworks
```

## Common Experiments

Some commonly used Firebase Labs experiments include:

- **webframeworks**: Enhanced web framework support
- **apphosting**: Firebase App Hosting functionality  
- **rtdbrules**: Realtime Database security rules management
- **deletegcfartifacts**: Cloud Functions artifact cleanup
- **mcp**: Model Context Protocol support
- **internaltesting**: Internal testing features

## Notes

- Experiments are CLI-wide settings that affect all projects
- Some experiments may require additional setup or configuration
- Experimental features may change or be removed in future versions
- Enable experiments only when needed for specific functionality
- Check experiment descriptions for any prerequisites or warnings