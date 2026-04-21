# Project Management

Firebase project creation, listing, and management functionality for organizing Firebase resources and services.

## Capabilities

### List Projects

Lists all Firebase projects accessible to the authenticated user.

```typescript { .api }
/**
 * List Firebase projects
 * @param options - Command options
 * @returns Promise resolving to array of project information
 */
function list(options?: Options): Promise<Array<{
  projectId: string;
  projectNumber: string;
  displayName: string;
  name: string;
  resources: {
    hostingSite?: string;
    realtimeDatabaseInstance?: string;
    storageBucket?: string;
    locationId?: string;
  };
  state: "ACTIVE" | "DELETE_REQUESTED";
}>>;
```

**Usage Examples:**

```javascript
const client = require("firebase-tools");

// List all projects
const projects = await client.projects.list();

console.log("Your Firebase projects:");
projects.forEach(project => {
  console.log(`- ${project.displayName} (${project.projectId})`);
});
```

### Create Project

Creates a new Firebase project.

```typescript { .api }
/**
 * Create new Firebase project
 * @param projectId - Unique project identifier
 * @param options - Project creation options
 * @returns Promise resolving when project is created
 */
function create(
  projectId: string,
  options?: Options & {
    /** Display name for the project */
    displayName?: string;
    /** Google Cloud organization ID */
    organization?: string;
    /** Google Cloud folder ID */
    folder?: string;
  }
): Promise<{
  projectId: string;
  displayName: string;
  resources: {
    hostingSite?: string;
    realtimeDatabaseInstance?: string;
    storageBucket?: string;
    locationId?: string;
  };
}>;
```

**Usage Examples:**

```javascript
// Create project with minimal configuration
await client.projects.create("my-new-project", {
  displayName: "My New Project"
});

// Create project in organization
await client.projects.create("company-project", {
  displayName: "Company Project",
  organization: "123456789"
});

// Create project in folder
await client.projects.create("team-project", {
  displayName: "Team Project", 
  folder: "folders/987654321"
});
```

### Add Firebase to GCP Project

Adds Firebase services to an existing Google Cloud Platform project.

```typescript { .api }
/**
 * Add Firebase to existing GCP project
 * @param options - Configuration options
 * @returns Promise resolving when Firebase is added
 */
function addfirebase(options: Options & {
  /** GCP project ID to add Firebase to */
  gcpProject: string;
}): Promise<{
  projectId: string;
  displayName: string;
  resources: {
    hostingSite?: string;
    realtimeDatabaseInstance?: string;
    storageBucket?: string;
    locationId?: string;
  };
}>;
```

**Usage Examples:**

```javascript
// Add Firebase to existing GCP project
await client.projects.addfirebase({
  gcpProject: "existing-gcp-project-123"
});
```

## Project Information

### Project Structure

Firebase projects contain the following components:

- **Project ID**: Unique identifier (immutable after creation)
- **Project Number**: Google-assigned numeric identifier
- **Display Name**: Human-readable project name (can be changed)
- **Resources**: Associated Firebase and GCP resources
- **State**: Project lifecycle state (ACTIVE, DELETE_REQUESTED)

### Default Resources

When creating a Firebase project, the following resources are automatically provisioned:

- **Hosting Site**: Default hosting site (projectId.web.app)
- **Realtime Database**: Default database instance (optional)
- **Storage Bucket**: Default Cloud Storage bucket (projectId.appspot.com)
- **Location**: Default GCP region for services

### Resource Naming

Firebase projects follow specific naming conventions:

- **Project ID**: 
  - Must be 6-30 characters
  - Lowercase letters, numbers, and hyphens only
  - Cannot start/end with hyphen
  - Must be globally unique across all Firebase/GCP
  
- **Display Name**:
  - Can contain any characters
  - Maximum 30 characters
  - Used in Firebase console and communications
  
- **Hosting Site**: Defaults to `{projectId}.web.app`
- **Storage Bucket**: Defaults to `{projectId}.appspot.com`
- **Database Instance**: Defaults to `{projectId}-default-rtdb`

## Project Organization

### Google Cloud Organization

Projects can be organized under Google Cloud organizations:

- **Centralized Management**: Organization-level IAM and policies
- **Billing Management**: Centralized billing account management
- **Resource Hierarchy**: Organize projects into folders and hierarchies
- **Compliance**: Organization-level compliance and security policies

### Folder Structure

Google Cloud folders provide additional organization:

- **Hierarchical Organization**: Nest projects within folder structures
- **Inherited Policies**: IAM policies inherited from parent folders
- **Department Organization**: Organize by team, department, or environment
- **Access Control**: Folder-level access management

## Project Lifecycle

### Project States

- **ACTIVE**: Project is active and all services are available
- **DELETE_REQUESTED**: Project deletion has been requested (30-day grace period)

### Project Deletion

- **Grace Period**: 30 days to restore deleted projects
- **Resource Cleanup**: All Firebase resources are scheduled for deletion
- **Data Recovery**: Data may be recoverable during grace period
- **Permanent Deletion**: After 30 days, deletion is permanent

### Project Restoration

Deleted projects can be restored through the Firebase console during the 30-day grace period.

## Best Practices

### Project Naming

- **Descriptive Names**: Use clear, descriptive project IDs
- **Environment Suffix**: Include environment in name (e.g., `myapp-prod`, `myapp-staging`)
- **Team Prefixes**: Use team or organization prefixes for clarity
- **Consistent Conventions**: Establish and follow naming conventions

### Project Organization

- **Environment Separation**: Separate projects for dev, staging, and production
- **Feature Isolation**: Create separate projects for major features when needed
- **Team Boundaries**: Align projects with team responsibilities
- **Resource Management**: Monitor quotas and limits across projects

### Security Considerations

- **IAM Roles**: Use principle of least privilege for project access
- **Service Accounts**: Create dedicated service accounts for different purposes
- **API Keys**: Restrict API keys to specific services and domains
- **Access Reviews**: Regularly review and audit project access

### Billing Management

- **Budget Alerts**: Set up billing alerts and budgets
- **Cost Monitoring**: Monitor costs across projects and services
- **Resource Cleanup**: Remove unused resources to control costs
- **Billing Accounts**: Use appropriate billing account organization