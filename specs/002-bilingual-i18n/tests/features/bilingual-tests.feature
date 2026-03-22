# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-7 @P3
Feature: Playwright Bilingual Test Suite
  As a developer
  I want automated tests verifying bilingual functionality
  So that regressions are caught before deployment

  @TS-021 @SC-005
  Scenario: Bilingual test suite passes completely
    Given the Playwright bilingual test suite exists
    When all tests are executed
    Then toggle existence, click behavior, and persistence are verified
    And header/footer translation is verified
    And no JavaScript errors occur in either language
    And the test suite reports 100% pass rate

  @TS-022 @SC-005
  Scenario: New wave translations are covered by tests
    Given a new wave of translations has been added
    When the bilingual test suite runs
    Then the new pages are verified for correct translation
    And fallback behavior for untranslated pages is verified
