# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-4 @P2
Feature: Progressive Page Translation
  As a site maintainer
  I want to translate pages in waves
  So that the site becomes progressively bilingual without blocking deployments

  @TS-014 @FR-009 @SC-002
  Scenario: Wave 1 core pages fully translated
    Given Wave 1 is complete (index, ruta, contacto, servicios, vision)
    When a visitor switches to "en"
    Then those 5 pages display fully in English
    And all data-i18n elements on those pages have English text

  @TS-015 @FR-009 @FR-006 @SC-004
  Scenario: Untranslated page graceful fallback
    Given a page has NOT been translated yet
    When a visitor switches to "en"
    Then the page displays in Spanish (original content)
    And the header and footer display in English
    And no JavaScript errors occur
    And no blank or broken UI elements appear

  @TS-016 @FR-009 @SC-007
  Scenario: Wave 2 adds more translated pages
    Given Wave 2 pages have been translated
    When deployed and a visitor switches to "en"
    Then those additional pages also respond to the language toggle
