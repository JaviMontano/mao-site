# Hosting

Firebase Hosting management for deploying and managing static websites with global CDN, custom domains, and preview channels.

## Capabilities

### Disable Hosting

Disables Firebase Hosting for a site, making it inaccessible.

```typescript { .api }
/**
 * Disable Firebase Hosting
 * @param options - Disable options
 * @returns Promise resolving when hosting is disabled
 */
function disable(options?: Options & {
  /** Hosting site ID */
  site?: string;
  /** Confirm the operation */
  confirm?: boolean;
}): Promise<void>;
```

**Usage Examples:**

```javascript
const client = require("firebase-tools");

// Disable default hosting site
await client.hosting.disable({
  project: "my-project",
  confirm: true
});

// Disable specific site
await client.hosting.disable({
  project: "my-project",
  site: "my-site-staging",
  confirm: true
});
```

### Clone Hosting Configuration

Clones hosting configuration from one site to another.

```typescript { .api }
/**
 * Clone hosting configuration between sites
 * @param source - Source site identifier
 * @param target - Target site identifier  
 * @param options - Clone options
 * @returns Promise resolving when configuration is cloned
 */
function clone(
  source: string,
  target: string,
  options?: Options
): Promise<void>;
```

**Usage Examples:**

```javascript
// Clone configuration between sites
await client.hosting.clone(
  "my-site-prod",
  "my-site-staging", 
  { project: "my-project" }
);
```

## Site Management

### Create Site

Creates a new Firebase Hosting site.

```typescript { .api }
/**
 * Create Firebase Hosting site
 * @param options - Site creation options
 * @returns Promise resolving when site is created
 */
function sitesCreate(options: Options & {
  /** Site ID */
  siteId: string;
  /** App ID to associate with site */
  appId?: string;
}): Promise<{
  name: string;
  defaultUrl: string;
  appId?: string;
  labels?: Record<string, string>;
}>;
```

### List Sites

Lists all Firebase Hosting sites in the project.

```typescript { .api }
/**
 * List Firebase Hosting sites
 * @param options - Command options
 * @returns Promise resolving to array of site information
 */
function sitesList(options?: Options): Promise<Array<{
  name: string;
  defaultUrl: string;
  appId?: string;
  labels?: Record<string, string>;
  type: string;
}>>;
```

### Get Site

Gets detailed information about a specific hosting site.

```typescript { .api }
/**
 * Get Firebase Hosting site information
 * @param options - Command options
 * @returns Promise resolving to site details
 */
function sitesGet(options?: Options & {
  /** Site ID */
  siteId: string;
}): Promise<{
  name: string;
  defaultUrl: string;
  appId?: string;
  labels?: Record<string, string>;
  type: string;
}>;
```

### Delete Site

Deletes a Firebase Hosting site.

```typescript { .api }
/**
 * Delete Firebase Hosting site
 * @param options - Site deletion options
 * @returns Promise resolving when site is deleted
 */
function sitesDelete(options: Options & {
  /** Site ID to delete */
  siteId: string;
  /** Force deletion without confirmation */
  force?: boolean;
}): Promise<void>;
```

**Site Management Examples:**

```javascript
// Create new hosting site
await client.hosting.sites.create({
  project: "my-project",
  siteId: "my-new-site"
});

// List all sites
const sites = await client.hosting.sites.list({
  project: "my-project"
});

// Get site details
const siteInfo = await client.hosting.sites.get({
  project: "my-project",
  siteId: "my-site"
});

// Delete site
await client.hosting.sites.delete({
  project: "my-project",
  siteId: "old-site",
  force: true
});
```

## Channel Management

### Create Channel

Creates a preview channel for testing deployments.

```typescript { .api }
/**
 * Create hosting preview channel
 * @param options - Channel creation options
 * @returns Promise resolving when channel is created
 */
function channelCreate(options: Options & {
  /** Channel ID */
  channelId: string;
  /** Site ID */
  site?: string;
  /** Channel expiration time */
  expires?: string;
  /** Time to live (e.g., '7d', '24h') */
  ttl?: string;
}): Promise<{
  name: string;
  url: string;
  expireTime?: string;
  labels?: Record<string, string>;
}>;
```

### List Channels

Lists all preview channels for a site.

```typescript { .api }
/**
 * List hosting preview channels
 * @param options - Command options
 * @returns Promise resolving to array of channel information
 */
function channelList(options?: Options & {
  /** Site ID */
  site?: string;
}): Promise<Array<{
  name: string;
  url: string;
  expireTime?: string;
  labels?: Record<string, string>;
  createTime: string;
  updateTime: string;
}>>;
```

### Deploy to Channel

Deploys content to a preview channel.

```typescript { .api }
/**
 * Deploy to hosting preview channel
 * @param options - Channel deployment options
 * @returns Promise resolving when deployment completes
 */
function channelDeploy(options: Options & {
  /** Channel ID */
  channelId: string;
  /** Site ID */
  site?: string;
  /** Only deploy hosting */
  only?: string;
}): Promise<{
  status: "success" | "error";
  hosting?: {
    site: string;
    url: string;
    expireTime?: string;
  };
}>;
```

### Delete Channel

Deletes a preview channel.

```typescript { .api }
/**
 * Delete hosting preview channel
 * @param options - Channel deletion options
 * @returns Promise resolving when channel is deleted
 */
function channelDelete(options: Options & {
  /** Channel ID to delete */
  channelId: string;
  /** Site ID */
  site?: string;
  /** Force deletion without confirmation */
  force?: boolean;
}): Promise<void>;
```

### Open Channel

Opens a preview channel in the default browser.

```typescript { .api }
/**
 * Open hosting preview channel in browser
 * @param options - Open options
 * @returns Promise resolving when browser opens
 */
function channelOpen(options: Options & {
  /** Channel ID to open */
  channelId: string;
  /** Site ID */
  site?: string;
}): Promise<void>;
```

**Channel Management Examples:**

```javascript
// Create preview channel
await client.hosting.channel.create({
  project: "my-project",
  channelId: "feature-branch",
  ttl: "7d"
});

// List all channels
const channels = await client.hosting.channel.list({
  project: "my-project"
});

// Deploy to channel
await client.hosting.channel.deploy({
  project: "my-project",
  channelId: "feature-branch",
  only: "hosting"
});

// Open channel in browser
await client.hosting.channel.open({
  project: "my-project", 
  channelId: "feature-branch"
});

// Delete channel
await client.hosting.channel.delete({
  project: "my-project",
  channelId: "old-feature",
  force: true
});
```

## Hosting Features

### Static File Serving

- **Global CDN**: Automatic global content distribution
- **HTTPS**: Automatic SSL certificates for all domains
- **HTTP/2**: Modern protocol support for faster loading
- **Compression**: Automatic gzip compression for text files

### Custom Domains

- **Domain Connection**: Connect custom domains to hosting sites
- **SSL Certificates**: Automatic SSL provisioning for custom domains
- **Apex Domains**: Support for both www and apex domain configurations
- **Domain Verification**: Automated domain ownership verification

### Redirects and Rewrites

- **URL Redirects**: Configure HTTP redirects for URL management
- **Rewrites**: Serve different content for specific URL patterns
- **SPA Support**: Single-page application routing support
- **Function Integration**: Route requests to Cloud Functions

### Preview Channels

- **Branch Previews**: Deploy branches to temporary URLs
- **Pull Request Integration**: Automatic preview generation
- **Temporary URLs**: Time-limited preview environments
- **Team Collaboration**: Share preview links with team members

## Configuration

Hosting behavior is configured in `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "/api/**",
        "function": "api"
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "redirects": [
      {
        "source": "/old-page",
        "destination": "/new-page",
        "type": 301
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=7200"
          }
        ]
      }
    ]
  }
}
```

## Multi-Site Configuration

For multiple hosting sites in one project:

```json
{
  "hosting": [
    {
      "site": "my-site-prod",
      "public": "dist-prod",
      "ignore": ["firebase.json", "**/.*"]
    },
    {
      "site": "my-site-staging", 
      "public": "dist-staging",
      "ignore": ["firebase.json", "**/.*"]
    }
  ]
}
```