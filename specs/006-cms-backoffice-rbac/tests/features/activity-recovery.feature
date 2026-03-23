# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-008
Feature: Activity Logging and Recovery
  As a super admin, I want comprehensive activity logs with recovery
  so that I can trace issues and restore content if needed.

  @TS-035 @FR-026 @SC-007 @P3 @acceptance
  Scenario: Version history shows all edits with diffs
    Given a program was edited 3 times
    When I view its history
    Then I see all 3 versions with diffs

  @TS-036 @FR-027 @SC-007 @P3 @acceptance
  Scenario: Restore previous version
    Given I select a previous version
    When I click "Restore"
    Then the program reverts to that version
    And an audit entry records the restoration

  @TS-037 @FR-028 @P3 @acceptance
  Scenario: Login and logout events logged
    Given a session ends
    When I check activity logs
    Then I see login and logout events for that user
