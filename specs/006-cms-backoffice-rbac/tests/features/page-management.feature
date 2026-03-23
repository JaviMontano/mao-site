# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-006
Feature: Page Management
  As a content editor, I want to see all site pages in the CMS and
  manage their bilingual metadata so that I can maintain site
  structure from the backoffice.

  @TS-029 @FR-022 @FR-024 @SC-005 @P2 @acceptance
  Scenario: Page registry shows all public pages
    Given I open the pages tab
    When the page loads
    Then I see a table of all public pages with title, path, level (L1-L5), and i18n coverage percentage

  @TS-030 @FR-022 @SC-005 @P2 @acceptance
  Scenario: Page detail view shows metadata
    Given I click a page in the registry
    When detail view opens
    Then I see meta tags, OG tags, and data-i18n key count per language

  @TS-031 @FR-023 @P2 @acceptance
  Scenario: Page title override stored in Firestore
    Given I edit a page's title in EN
    When I save
    Then the override is stored in Firestore for runtime injection
    And no direct HTML modification occurs
