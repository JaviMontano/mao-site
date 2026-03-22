# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-1 @P1
Feature: Language Toggle in Navigation
  As a visitor to metodologia.info
  I want a language toggle between the logo and navigation links
  So that I can switch the site between Spanish and English

  Background:
    Given the site is loaded at "/"
    And the default language is "es"

  @TS-001 @FR-001 @FR-004 @SC-003
  Scenario: Toggle switches page text to English
    Given a visitor is on any page in Spanish
    When they click "EN" in the nav toggle
    Then all elements with data-i18n attributes display English text
    And the switch completes in under 200ms
    And no page reload occurs

  @TS-002 @FR-002 @SC-001
  Scenario: Language persists across navigation
    Given a visitor has selected "EN"
    When they navigate to another page
    Then the new page loads in English automatically
    And localStorage key "lang" has value "en"

  @TS-003 @FR-002 @SC-001
  Scenario: Language persists across browser sessions
    Given a visitor has selected "EN" and closes the browser
    When they return to the site
    Then the site loads in English
    And localStorage key "lang" has value "en"

  @TS-004 @FR-001 @SC-001
  Scenario: Toggle visible and functional on mobile
    Given a visitor is on a mobile device (375px width)
    When they view the navigation area
    Then the language toggle is visible
    And clicking "EN" switches the language to English
