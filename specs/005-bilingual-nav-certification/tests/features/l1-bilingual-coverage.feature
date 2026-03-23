# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-3 @P1
Feature: Level 1 Bilingual Coverage
  As a visitor on the critical path
  I want zero Spanish remnants when I switch to English
  So that the experience is fully bilingual

  Background:
    Given language is set to EN

  @TS-017 @FR-011 @FR-006 @SC-003 @acceptance
  Scenario: Homepage has zero Spanish remnants in English
    Given language is EN on index.html
    When page renders
    Then all data-i18n elements show English text
    And zero Spanish remnants are detected

  @TS-018 @FR-011 @FR-006 @SC-003 @acceptance
  Scenario: Ruta page has zero Spanish remnants in English
    Given language is EN on ruta/index.html
    When page renders
    Then all data-i18n elements show English text
    And zero Spanish remnants are detected

  @TS-019 @FR-011 @FR-006 @SC-003 @acceptance
  Scenario: Empresas page has zero Spanish remnants in English
    Given language is EN on empresas/index.html
    When page renders
    Then all data-i18n elements show English text
    And zero Spanish remnants are detected

  @TS-020 @FR-011 @FR-006 @SC-003 @acceptance
  Scenario: Personas page has zero Spanish remnants in English
    Given language is EN on personas/index.html
    When page renders
    Then all data-i18n elements show English text
    And zero Spanish remnants are detected

  @TS-021 @FR-006 @SC-003 @validation
  Scenario: Spanish remnant detection uses two-layer scan
    Given the rendered certification check runs on an L1 page in EN
    Then layer 1 verifies all data-i18n elements render en.json values
    And layer 2 scans visible text outside data-i18n for Spanish patterns
