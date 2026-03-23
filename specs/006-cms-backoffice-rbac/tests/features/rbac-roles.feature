# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-002
Feature: Role-Based Access Control
  As a super admin, I want to assign roles to team members so that
  editors can manage content while viewers can only read.

  @TS-006 @FR-005 @FR-016 @SC-002 @P1 @acceptance
  Scenario: Super admin sees all users with roles
    Given I am a super admin
    When I open user management
    Then I see all registered users with their current roles

  @TS-007 @FR-005 @FR-006 @SC-002 @P1 @acceptance
  Scenario: Editor sees content tabs but not user management
    Given I assign "editor" role to "contacto@metodologia.info"
    When that user logs in
    Then they see content editing tabs
    But they do NOT see user management

  @TS-008 @FR-005 @FR-006 @SC-002 @P1 @acceptance
  Scenario: Viewer sees read-only content
    Given I assign "viewer" role to a student
    When that user logs in
    Then they see read-only content with no edit buttons

  @TS-009 @FR-007 @SC-002 @P1 @acceptance
  Scenario: Firestore rules block editor from user management
    Given a user with "editor" role attempts a user management operation
    When the request reaches Firestore
    Then security rules block the operation

  Rule: Role hierarchy determines UI visibility

    @TS-010 @FR-006 @SC-002 @P1 @acceptance
    Scenario Outline: Role-based tab visibility
      Given I am logged in with role "<role>"
      When the CMS renders
      Then I can see user management: "<manage_users>"
      And I can see content editing: "<edit_content>"
      And I can see content viewing: "<view_content>"
      And I can see audit log: "<view_audit>"

      Examples:
        | role        | manage_users | edit_content | view_content | view_audit |
        | super_admin | yes          | yes          | yes          | yes        |
        | admin       | no           | yes          | yes          | yes        |
        | editor      | no           | yes          | yes          | no         |
        | viewer      | no           | no           | yes          | no         |

  Rule: Last super admin protection

    @TS-011 @FR-008 @P1 @acceptance
    Scenario: System prevents demotion of last super admin
      Given there is only one super_admin in the system
      When a super admin attempts to demote themselves
      Then the operation is rejected with "Cannot demote last super admin"
