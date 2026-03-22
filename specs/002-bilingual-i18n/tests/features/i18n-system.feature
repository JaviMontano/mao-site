# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-3 @P1
Feature: Translation System Architecture
  As the i18n system
  I need to load JSON translations and apply them to the DOM
  So that the bilingual experience works reliably

  @TS-008 @FR-003 @FR-004
  Scenario: i18n module initializes with correct language
    Given es.json and en.json exist in /js/i18n/
    When i18n.js initializes
    Then it loads the correct JSON based on localStorage "lang" key
    And defaults to "es" when no preference is stored

  @TS-009 @FR-004 @SC-003
  Scenario: Text content translation via data-i18n
    Given a page with an element having data-i18n="nav.ruta"
    When language is set to "en"
    Then the element text content becomes the value of "nav.ruta" from en.json

  @TS-010 @FR-005
  Scenario: Attribute translation via data-i18n-placeholder
    Given a page with an input having data-i18n-placeholder="search.placeholder"
    When language is set to "en"
    Then the input placeholder attribute is translated to English

  @TS-011 @FR-006
  Scenario: Graceful fallback for missing translation key
    Given en.json does not contain key "page.missing_key"
    And an element has data-i18n="page.missing_key" with Spanish text
    When language is set to "en"
    Then the element retains its original Spanish text
    And no JavaScript error occurs

  @TS-012 @FR-011
  Scenario: Dynamic content translation API
    Given new DOM elements are injected after page load
    And those elements have data-i18n attributes
    When window.i18n.translate(parentElement) is called
    Then the injected elements are translated to the current language

  @TS-013 @FR-012 @SC-006
  Scenario: Page load performance impact
    Given the i18n system is loaded on a page
    When the page load time is measured
    Then the additional load time is less than 50ms compared to baseline
