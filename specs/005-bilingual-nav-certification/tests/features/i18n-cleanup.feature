# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-5 @P3
Feature: i18n Efficiency Cleanup
  As a performance-conscious developer
  I want pages without translatable content to skip i18n.js loading
  So that approximately 48 pages avoid unnecessary JS execution

  @TS-026 @FR-017 @SC-007 @acceptance
  Scenario: Page with data-skip-i18n skips i18n loading
    Given a page has data-skip-i18n attribute on site-header
    When SiteHeader renders
    Then i18n.js is not loaded

  @TS-027 @FR-017 @SC-007 @acceptance
  Scenario: Page skipping i18n produces no console errors
    Given a page skips i18n
    When inspected
    Then no i18n-related console errors appear

  @TS-028 @FR-016 @SC-006 @acceptance
  Scenario: Orphaned en.json keys are removed
    Given the certification suite identified orphaned keys
    When cleanup is complete
    Then en.json has zero orphaned keys

  @TS-029 @FR-009 @FR-017 @SC-005 @validation
  Scenario: Zero-key pages become failures after P3 cleanup
    Given data-skip-i18n has been implemented
    When a page has SiteHeader but zero data-i18n keys and no data-skip-i18n
    Then the certification suite reports it as a failure not a warning
