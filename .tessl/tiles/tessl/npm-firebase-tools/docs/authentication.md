# Authentication

Firebase Authentication user account management for importing and exporting user data between projects or external systems.

## Capabilities

### Export Users

Exports Firebase Authentication user accounts to a file for backup or migration purposes.

```typescript { .api }
/**
 * Export Firebase Authentication users
 * @param options - Export configuration options
 * @returns Promise resolving when export completes
 */
function authExport(options: Options & {
  /** Output format: 'csv' or 'json' */
  format: "csv" | "json";
  /** Path for exported file */
  exportPath: string;
}): Promise<{
  exportedUserCount: number;
  outputFile: string;
}>;
```

**Usage Examples:**

```javascript
const client = require("firebase-tools");

// Export users to JSON format
await client.auth.export({
  project: "my-project",
  format: "json",
  exportPath: "./users-backup.json"
});

// Export users to CSV format  
await client.auth.export({
  project: "my-project",
  format: "csv",
  exportPath: "./users-export.csv"
});
```

### Import Users

Imports user accounts from a file into Firebase Authentication. Supports various hash algorithms and user data formats.

```typescript { .api }
/**
 * Import users into Firebase Authentication
 * @param options - Import configuration options
 * @returns Promise resolving when import completes
 */
function authUpload(options: Options & {
  /** Path to file containing user data */
  dataFile: string;
  /** Hash algorithm used for passwords */
  hashAlgo?: "HMAC_SHA512" | "HMAC_SHA256" | "HMAC_SHA1" | "HMAC_MD5" | "MD5" | "PBKDF_SHA1" | "PBKDF2_SHA256" | "SCRYPT" | "BCRYPT" | "STANDARD_SCRYPT";
  /** Hash key for HMAC algorithms (base64 encoded) */
  hashKey?: string;
  /** Salt separator for password hashing (base64 encoded) */
  saltSeparator?: string;
  /** Number of rounds for PBKDF algorithms */
  rounds?: number;
  /** Memory cost for scrypt algorithm */
  memCost?: number;
  /** Parallelization for scrypt algorithm */
  parallelization?: number;
  /** Block size for scrypt algorithm */
  blockSize?: number;
  /** Derived key length for scrypt */
  dkLen?: number;
}): Promise<{
  importedUserCount: number;
  failedUserCount: number;
  errors?: Array<{
    index: number;
    message: string;
  }>;
}>;
```

**Usage Examples:**

```javascript
// Import users from JSON file
await client.auth.upload({
  project: "my-project",
  dataFile: "./users-to-import.json"
});

// Import users with SCRYPT password hashing
await client.auth.upload({
  project: "my-project", 
  dataFile: "./users-with-passwords.json",
  hashAlgo: "SCRYPT",
  hashKey: "base64-encoded-key",
  saltSeparator: "base64-encoded-separator",
  rounds: 8,
  memCost: 14
});

// Import users with HMAC_SHA256 hashing
await client.auth.upload({
  project: "my-project",
  dataFile: "./legacy-users.json", 
  hashAlgo: "HMAC_SHA256",
  hashKey: "your-base64-encoded-key"
});
```

## Supported Data Formats

### JSON Format

Users should be provided as an array of user objects:

```json
[
  {
    "uid": "user123",
    "email": "user@example.com",
    "emailVerified": true,
    "displayName": "John Doe",
    "photoURL": "https://example.com/photo.jpg",
    "disabled": false,
    "metadata": {
      "creationTime": "2023-01-01T00:00:00.000Z",
      "lastSignInTime": "2023-06-01T12:00:00.000Z"
    },
    "customClaims": {
      "role": "admin"
    },
    "providerData": [
      {
        "providerId": "password",
        "email": "user@example.com",
        "displayName": "John Doe"
      }
    ],
    "passwordHash": "base64-encoded-hash",
    "salt": "base64-encoded-salt"
  }
]
```

### CSV Format

CSV files should include headers with supported fields:

```csv
uid,email,emailVerified,displayName,photoURL,disabled,creationTime,lastSignInTime
user123,user@example.com,true,John Doe,https://example.com/photo.jpg,false,2023-01-01T00:00:00.000Z,2023-06-01T12:00:00.000Z
user456,jane@example.com,false,Jane Smith,,false,2023-01-02T00:00:00.000Z,2023-05-15T10:30:00.000Z
```

## Supported Hash Algorithms

### SCRYPT (Recommended)

Firebase's default hashing algorithm, most secure option:

- **Parameters**: rounds, memCost, saltSeparator, hashKey
- **Use Case**: Migrating from Firebase projects or other systems using scrypt

### HMAC Variants

HMAC-based algorithms for systems using keyed hashing:

- **HMAC_SHA512**: SHA-512 with HMAC
- **HMAC_SHA256**: SHA-256 with HMAC  
- **HMAC_SHA1**: SHA-1 with HMAC
- **HMAC_MD5**: MD5 with HMAC

### PBKDF2 Variants

Password-Based Key Derivation Function algorithms:

- **PBKDF2_SHA256**: PBKDF2 with SHA-256
- **PBKDF_SHA1**: PBKDF2 with SHA-1

### Legacy Algorithms

Supported for migration from older systems:

- **MD5**: Basic MD5 hashing (not recommended)
- **BCRYPT**: bcrypt algorithm with configurable rounds
- **STANDARD_SCRYPT**: Standard scrypt implementation

## User Data Fields

### Required Fields

- **uid**: Unique user identifier (string, max 128 characters)

### Optional Fields

- **email**: User email address
- **emailVerified**: Whether email is verified (boolean)
- **displayName**: User's display name
- **photoURL**: URL to user's profile photo
- **phoneNumber**: User's phone number (E.164 format)
- **disabled**: Whether account is disabled (boolean)
- **metadata**: Creation and last sign-in timestamps
- **customClaims**: Custom JWT claims object
- **providerData**: Array of linked provider information

### Password Data (for password providers)

- **passwordHash**: Base64-encoded password hash
- **salt**: Base64-encoded password salt
- **hashAlgo**: Algorithm used for hashing
- **hashKey**: Key used for HMAC algorithms
- **rounds**: Iteration count for PBKDF algorithms

## Import Limitations

- **Batch Size**: Maximum 1,000 users per import operation
- **Rate Limits**: Subject to Firebase Auth quotas and limits
- **UID Requirements**: UIDs must be unique and follow Firebase format rules
- **Email Validation**: Email addresses must be valid format
- **Phone Validation**: Phone numbers must be in E.164 format
- **Custom Claims**: Limited to 1000 bytes per user

## Migration Best Practices

1. **Test with Small Batches**: Import small batches first to validate format
2. **Preserve UIDs**: Keep original UIDs when possible for data consistency
3. **Handle Errors**: Check import results for failed users and retry
4. **Verify Data**: Export and compare imported data for accuracy
5. **Update References**: Update any systems referencing user IDs
6. **Security**: Ensure password hashes are properly configured for your source system