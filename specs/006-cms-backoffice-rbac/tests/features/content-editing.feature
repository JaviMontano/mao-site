# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-005
Feature: Bilingual Content Editing
  As a content editor, I want to edit bilingual content (ES/EN)
  side by side for all CMS collections so that translations stay
  synchronized.

  @TS-022 @FR-018 @SC-004 @P1 @acceptance
  Scenario: Bilingual fields displayed side by side
    Given I open the program editor
    When I edit "title_es"
    Then "title_en" is visible beside it
    And a "translation needed" indicator shows if "title_en" is empty

  @TS-023 @FR-018 @SC-004 @P1 @acceptance
  Scenario: Stale translation warning on save
    Given I save a program with only "title_es" changed
    When validation runs
    Then it warns that "title_en" may be stale

  @TS-024 @FR-019 @SC-004 @P1 @acceptance
  Scenario: Pricing editor is fully functional
    Given I open the pricing editor
    When I see B2C pricing
    Then I can edit amounts, labels (ES/EN), and feature lists
    And I can save changes successfully

  @TS-025 @FR-020 @SC-004 @P1 @acceptance
  Scenario: Translation change reaches live site within cache TTL
    Given I edit a translation key
    When I save
    Then the change reaches the live site within cache TTL (1 hour)

  @TS-026 @FR-020 @P1 @acceptance
  Scenario: Translation editor supports bulk save
    Given I have modified multiple translation keys
    When I click bulk save
    Then all changed keys are saved in one batch operation

  @TS-027 @FR-021 @SC-004 @P1 @acceptance
  Scenario: Unsaved changes warning on in-app navigation
    Given I have unsaved changes in an editor
    When I try to navigate to another tab
    Then I see a confirmation dialog warning about unsaved changes

  @TS-028 @FR-021 @P1 @acceptance
  Scenario: Unsaved changes warning on browser close
    Given I have unsaved changes in an editor
    When I try to close the browser tab
    Then the browser shows a beforeunload warning
