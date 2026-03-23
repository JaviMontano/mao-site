# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-004
Feature: User Profile and Preferences
  As a CMS user, I want to manage my profile and preferences so
  that the system adapts to my workflow.

  @TS-018 @FR-014 @FR-015 @P2 @acceptance
  Scenario: User views their profile
    Given I am logged in
    When I open my profile
    Then I see my name, email, role, avatar, and last login

  @TS-019 @FR-015 @P2 @acceptance
  Scenario: User changes preferred language
    Given I set preferred language to English
    When I navigate the CMS
    Then the interface is in English

  @TS-020 @FR-015 @P2 @acceptance
  Scenario: Viewer cannot edit role field
    Given I am a viewer
    When I view my role field
    Then it is read-only

  @TS-021 @FR-017 @P2 @acceptance
  Scenario: Login tracking updates on each sign-in
    Given I am a registered CMS user
    When I sign in
    Then my last_login timestamp is updated
    And my total_sessions counter increments by 1
