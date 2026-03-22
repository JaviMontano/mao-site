# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-5 @P2
Feature: Bilingual Prompt Libraries
  As a visitor browsing prompt libraries
  I want the UI chrome to display in my selected language
  So that I can navigate the libraries in English while prompts stay in Spanish

  @TS-017 @FR-004 @FR-007 @SC-001
  Scenario: Library landing page UI chrome in English
    Given language is set to "en"
    When visiting any biblioteca landing page
    Then the hero title, description, and badge display in English
    And the search placeholder displays in English
    And category pill labels display in English
    And the download section labels display in English
    And prompt card content remains in Spanish

  @TS-018 @FR-004
  Scenario: Prompt modal chrome in English
    Given language is set to "en"
    And a visitor is on a biblioteca landing page
    When they click a prompt card to open the modal
    Then the modal chrome ("Copy Prompt", category label, close button) displays in English
    And the prompt content inside the modal remains in Spanish
