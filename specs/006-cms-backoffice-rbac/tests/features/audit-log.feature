# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-007
Feature: Audit Log Viewer
  As a super admin, I want to view the audit trail of all CMS
  changes so that I can track who changed what and when.

  @TS-032 @FR-025 @SC-006 @P2 @acceptance
  Scenario: Audit log shows chronological changes with filters
    Given I open the audit tab
    When the page loads
    Then I see chronological changes with filters by collection, admin, and date range

  @TS-033 @FR-025 @SC-006 @P2 @acceptance
  Scenario: Filter audit log by collection
    Given I filter by "programs" collection
    When results load
    Then I see only program-related changes

  @TS-034 @FR-026 @P2 @acceptance
  Scenario: Audit entry detail shows full change
    Given I click an audit entry
    When detail opens
    Then I see full change including previous value, new value, admin email, and timestamp
