# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-003
Feature: Domain and Invite Allowlisting
  As a super admin, I want to control who can access the CMS via
  domain allowlisting and email invitations so that only authorized
  people can sign in.

  @TS-012 @FR-009 @FR-010 @SC-003 @P1 @acceptance
  Scenario: Allowlisted domain user gets auto-provisioned as viewer
    Given "metodologia.info" is in the domain allowlist
    When "german@metodologia.info" signs in for the first time
    Then they are granted "viewer" role automatically

  @TS-013 @FR-011 @SC-003 @P1 @acceptance
  Scenario: Non-allowlisted external user is denied
    Given an external email "partner@aliado.com" is NOT invited
    When they try to sign in
    Then access is denied with "Request access" instructions

  @TS-014 @FR-012 @P1 @acceptance
  Scenario: Invited external user receives assigned role
    Given super admin invites "partner@aliado.com" as "editor"
    When that person signs in
    Then they receive the "editor" role

  @TS-015 @FR-009 @SC-003 @P1 @acceptance
  Scenario: Removed domain blocks users on next auth state change
    Given a domain is removed from the allowlist
    And a user from that domain has an active session
    When onAuthStateChanged fires (page reload or token refresh)
    Then admin-app.js re-checks config/access.allowed_domains
    And the user is signed out with "Domain no longer authorized" message

  Rule: Pre-configured bootstrap accounts

    @TS-016 @FR-013 @SC-008 @P1 @acceptance
    Scenario Outline: Bootstrap accounts have correct roles on deploy
      Given the system is freshly deployed
      When "<email>" signs in for the first time
      Then their role is "<role>"
      And their source is "bootstrap"
      And they cannot be demoted via UI

      Examples:
        | email                          | role        |
        | javier.montano.guz@gmail.com   | super_admin |
        | contacto@metodologia.info      | super_admin |
        | german@metodologia.info        | admin       |

    @TS-017 @FR-013 @SC-008 @P1 @acceptance
    Scenario: Bootstrap accounts cannot be removed
      Given "javier.montano.guz@gmail.com" is a bootstrap super_admin
      When a super admin attempts to remove their access
      Then the operation is rejected with "Bootstrap account cannot be modified"
