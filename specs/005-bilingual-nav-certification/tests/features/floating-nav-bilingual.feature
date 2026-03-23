# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-1 @P1
Feature: Floating Nav Bilingual
  As a visitor scrolling a long page in English mode
  I want the floating section navigation to display labels in English
  So that I can navigate without language confusion

  Background:
    Given the site is served locally or at the production URL
    And the page has a floating section navigation

  @TS-001 @FR-001 @FR-002 @SC-001 @acceptance
  Scenario: Floating nav labels translate to English on language switch
    Given language is EN and user scrolls past header on ruta/index.html
    When the floating nav appears
    Then all section labels are in English

  @TS-002 @FR-001 @FR-002 @SC-001 @acceptance
  Scenario: Floating nav labels update on live language toggle
    Given user switches from EN to ES while floating nav is visible
    When the toggle fires
    Then labels update to Spanish without page reload

  @TS-003 @FR-001 @FR-002 @acceptance
  Scenario: Strategy 3 auto-labels are exempt from translation certification
    Given a page has auto-detected sections with Strategy 3
    When language is EN
    Then auto-labels remain untranslated and are reported as warnings

  @TS-004 @FR-002 @contract
  Scenario: langchange event is dispatched after language switch
    Given i18n.js is loaded on the page
    When i18n.setLang is called with a new language
    Then a langchange CustomEvent is dispatched on document
    And the event detail contains the new language code

  @TS-005 @FR-002 @contract
  Scenario: Floating nav listens for langchange and re-reads headings
    Given the floating nav is visible with Spanish labels
    And the headings have been translated to English by i18n.js
    When the langchange event fires
    Then floating nav links reflect the updated heading textContent

  @TS-006 @FR-003 @acceptance
  Scenario: Floating nav aria-labels use per-page namespace
    Given the page is ruta/index.html
    When floating nav renders
    Then the nav aria-label uses the key ruta.nav.sections_label from en.json

  @TS-007 @FR-004 @SC-001 @acceptance
  Scenario: Floating nav home link aria-label and title translate
    Given language is EN on any page with floating nav
    When the floating nav is visible
    Then the home link aria-label is the English translation
    And the home link title is the English translation
