# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-2 @P1
Feature: Bilingual Certification Suite
  As the project owner
  I want an automated test suite that certifies bilingual completeness
  So that i18n gaps are caught in CI not by users

  @TS-008 @FR-005 @SC-002 @acceptance
  Scenario: Missing translation key detected and reported
    Given the test suite runs
    When a data-i18n key on any page has no corresponding en.json entry
    Then the test reports the missing key and fails

  @TS-009 @FR-009 @SC-005 @acceptance
  Scenario: Untranslated page detected as warning
    Given a developer adds a new page with SiteHeader
    When they do not add data-i18n keys
    Then the suite reports the untranslated page as a warning

  @TS-010 @FR-008 @SC-002 @SC-006 @acceptance
  Scenario: Orphaned en.json key detected and reported
    Given en.json has a key with no corresponding data-i18n in any HTML
    Then the suite reports it as orphaned

  @TS-011 @FR-010 @SC-004 @acceptance
  Scenario: Coverage percentage reported per level
    Given the certification suite runs
    Then it outputs coverage percentage for each level L1 through L5

  @TS-012 @FR-010 @validation
  Scenario: Translation check uses three-condition validation
    Given an en.json entry exists for a data-i18n key
    When the entry is non-empty and differs from the es.json value
    Then the key is counted as translated
    But if the entry matches es.json and is not in the allowlist
    Then the key is counted as untranslated

  @TS-013 @FR-010 @validation
  Scenario: Allowlist prevents false positives on identical terms
    Given en.json and es.json have identical values for a key
    When the value appears in data/i18n-allowlist.json
    Then the key is counted as translated

  @TS-014 @FR-010 @validation
  Scenario: Page level classification uses directory rules with overrides
    Given the certification suite classifies pages
    Then pages matching directory patterns are assigned levels automatically
    And pages in data/i18n-levels.json overrides use the override level

  @TS-015 @FR-009 @acceptance
  Scenario: Zero-key pages reported as warnings in P1
    Given a page has SiteHeader but zero data-i18n keys
    When the certification suite runs in P1 mode
    Then the page is reported as a warning not a failure

  @TS-016 @FR-007 @SC-001 @acceptance
  Scenario: Floating nav labels verified on pages with floating nav
    Given the certification suite runs the rendered check
    When a page has a floating navigation
    Then it verifies floating nav labels are translated in EN mode
