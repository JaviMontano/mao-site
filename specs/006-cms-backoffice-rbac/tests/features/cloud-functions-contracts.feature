# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

Feature: Cloud Functions API Contracts
  Contract tests derived from contracts/cloud-functions.md.

  Rule: setUserRole callable

    @TS-041 @FR-005 @SC-002 @P1 @contract
    Scenario: setUserRole succeeds for super admin caller
      Given a super_admin is authenticated
      And a target user exists with role "viewer"
      When setUserRole is called with targetUid and newRole "editor"
      Then the response contains success: true
      And the response contains previousRole: "viewer"
      And the response contains newRole: "editor"

    @TS-042 @FR-005 @P1 @contract
    Scenario: setUserRole rejects non-super-admin caller
      Given an "editor" is authenticated
      When setUserRole is called
      Then the error code is "permission-denied"

    @TS-043 @FR-008 @P1 @contract
    Scenario: setUserRole rejects demotion of bootstrap account
      Given a super_admin is authenticated
      And the target user is a bootstrap account
      When setUserRole is called with a lower role
      Then the error code is "failed-precondition"

    @TS-044 @FR-008 @P1 @contract
    Scenario: setUserRole rejects demotion of last super admin
      Given a super_admin is authenticated
      And the target is the only super_admin
      When setUserRole is called with newRole "admin"
      Then the error code is "failed-precondition"

    @TS-045 @FR-005 @P1 @contract
    Scenario: setUserRole rejects invalid role value
      Given a super_admin is authenticated
      When setUserRole is called with newRole "superuser"
      Then the error code is "invalid-argument"

  Rule: inviteUser callable

    @TS-046 @FR-012 @P1 @contract
    Scenario: inviteUser creates pending invitation
      Given a super_admin is authenticated
      And "partner@aliado.com" does not have a CMS account
      When inviteUser is called with email "partner@aliado.com" and role "editor"
      Then the response contains success: true
      And the response contains email: "partner@aliado.com"
      And the response contains role: "editor"

    @TS-047 @FR-012 @P1 @contract
    Scenario: inviteUser rejects duplicate invitation
      Given a super_admin is authenticated
      And a pending invite exists for "partner@aliado.com"
      When inviteUser is called with email "partner@aliado.com"
      Then the error code is "already-exists"

    @TS-048 @FR-012 @P1 @contract
    Scenario: inviteUser rejects existing user
      Given a super_admin is authenticated
      And "existing@example.com" already has a CMS account
      When inviteUser is called with email "existing@example.com"
      Then the error code is "already-exists"

  Rule: removeUserAccess callable

    @TS-049 @FR-016 @P1 @contract
    Scenario: removeUserAccess succeeds for non-bootstrap user
      Given a super_admin is authenticated
      And the target user is not a bootstrap account
      When removeUserAccess is called with targetUid
      Then the response contains success: true
      And the response contains the removedRole

    @TS-050 @FR-013 @P1 @contract
    Scenario: removeUserAccess rejects bootstrap account removal
      Given a super_admin is authenticated
      And the target user is a bootstrap account
      When removeUserAccess is called with targetUid
      Then the error code is "failed-precondition"

  Rule: migrateMyRole callable

    @TS-051 @FR-005 @P1 @contract
    Scenario: migrateMyRole converts legacy admin claim
      Given a user has legacy "admin: true" claim without "role" claim
      When migrateMyRole is called
      Then the response contains success: true
      And the response contains migratedRole: "admin"

    @TS-052 @FR-005 @P1 @contract
    Scenario: migrateMyRole rejects user with existing role claim
      Given a user already has a "role" custom claim
      When migrateMyRole is called
      Then the error code is "failed-precondition"

  Rule: onUserFirstLogin auth trigger

    @TS-053 @FR-010 @FR-013 @SC-008 @P1 @contract
    Scenario: First login provisions bootstrap account
      Given a bootstrap email signs in for the first time
      When the onUserFirstLogin trigger fires
      Then a user doc is created with the bootstrap role
      And is_bootstrap is true
      And a custom claim is set with the bootstrap role

    @TS-054 @FR-010 @SC-003 @P1 @contract
    Scenario: First login provisions domain user as viewer
      Given an email from an allowlisted domain signs in for the first time
      And no invite exists for this email
      When the onUserFirstLogin trigger fires
      Then a user doc is created with role "viewer"
      And source is "domain"

    @TS-055 @FR-012 @P1 @contract
    Scenario: First login provisions invited user with invite role
      Given a pending invite exists for the signing-in email
      When the onUserFirstLogin trigger fires
      Then a user doc is created with the invited role
      And the invite status is set to "accepted"
      And source is "invite"

    @TS-056 @FR-011 @SC-003 @P1 @contract
    Scenario: First login blocks non-allowlisted non-invited user
      Given an email from a non-allowlisted domain signs in
      And no invite exists
      When the onUserFirstLogin trigger fires
      Then a user doc is created with role null
      And no custom claim is set
