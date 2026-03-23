# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

Feature: Firestore Security Rules Contracts
  Contract tests derived from contracts/firestore-rules.md.

  Rule: Users collection access

    @TS-057 @FR-007 @FR-014 @SC-002 @P1 @contract
    Scenario: Authenticated user can read own user doc
      Given an authenticated user with uid "user1"
      When they read "users/user1"
      Then the read is allowed

    @TS-058 @FR-007 @FR-016 @SC-002 @P1 @contract
    Scenario: Super admin can read all user docs
      Given an authenticated user with role "super_admin"
      When they read "users/other-user"
      Then the read is allowed

    @TS-059 @FR-007 @SC-002 @P1 @contract
    Scenario: Non-super-admin cannot read other user docs
      Given an authenticated user with role "editor"
      When they read "users/other-user"
      Then the read is denied

    @TS-060 @FR-007 @FR-015 @P1 @contract
    Scenario: User can update own profile fields
      Given an authenticated user with uid "user1"
      When they update "users/user1" with display_name and preferred_language
      Then the write is allowed

    @TS-061 @FR-007 @P1 @contract
    Scenario: User cannot update own role field
      Given an authenticated user with uid "user1"
      When they update "users/user1" with role field
      Then the write is denied

    @TS-062 @FR-007 @P1 @contract
    Scenario: Client cannot create user docs
      Given any authenticated user
      When they create a document in "users" collection
      Then the write is denied

  Rule: Content collections RBAC

    @TS-063 @FR-007 @SC-002 @P1 @contract
    Scenario Outline: Editor can write to content collections
      Given an authenticated user with role "editor"
      When they write to "<collection>"
      Then the write is allowed

      Examples:
        | collection   |
        | programs     |
        | pricing      |
        | translations |

    @TS-064 @FR-007 @SC-002 @P1 @contract
    Scenario: Viewer cannot write to content collections
      Given an authenticated user with role "viewer"
      When they write to "programs"
      Then the write is denied

    @TS-065 @FR-007 @P1 @contract
    Scenario: Only admin+ can delete programs
      Given an authenticated user with role "editor"
      When they delete a document in "programs"
      Then the delete is denied

  Rule: Config collection access

    @TS-066 @FR-007 @FR-009 @P1 @contract
    Scenario: Any role can read config/access
      Given an authenticated user with any role
      When they read "config/access"
      Then the read is allowed

    @TS-067 @FR-007 @FR-009 @P1 @contract
    Scenario: Only super admin can write config/access
      Given an authenticated user with role "admin"
      When they write to "config/access"
      Then the write is denied

  Rule: Audit log immutability

    @TS-068 @FR-007 @FR-025 @P1 @contract
    Scenario: Admin can read audit log
      Given an authenticated user with role "admin"
      When they read "audit_log"
      Then the read is allowed

    @TS-069 @FR-007 @P1 @contract
    Scenario: Editor cannot read audit log
      Given an authenticated user with role "editor"
      When they read "audit_log"
      Then the read is denied

    @TS-070 @FR-007 @P1 @contract
    Scenario: Audit log entries cannot be updated
      Given an authenticated user with role "super_admin"
      When they update an "audit_log" document
      Then the write is denied

    @TS-071 @FR-007 @P1 @contract
    Scenario: Audit log entries cannot be deleted
      Given an authenticated user with role "super_admin"
      When they delete an "audit_log" document
      Then the delete is denied

  Rule: Page overrides access

    @TS-072 @FR-007 @FR-023 @P2 @contract
    Scenario: Editor can create page overrides
      Given an authenticated user with role "editor"
      When they create a document in "page_overrides"
      Then the write is allowed

    @TS-073 @FR-007 @P2 @contract
    Scenario: Only admin+ can delete page overrides
      Given an authenticated user with role "editor"
      When they delete a document in "page_overrides"
      Then the delete is denied

  Rule: Legacy backward compatibility

    @TS-074 @FR-007 @P1 @contract
    Scenario: Legacy admin claim grants write access during migration
      Given an authenticated user with legacy "admin: true" claim and no role claim
      When they write to "programs"
      Then the write is allowed
