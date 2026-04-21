# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-3
Feature: Educational Offer as High-Intent Path
  A visitor who already knows MetodologIA sees a "Programas activos" section
  below the hero, navigates to empresas/ or personas/, and requests information
  becoming a lead with context.

  # ── Acceptance Tests (from spec.md US-3) ──

  @TS-022 @FR-030 @P3 @acceptance
  Scenario: Programs section shows responsive card layout
    Given a visitor on the home page
    When they scroll 1 viewport past the hero
    Then they see a "Programas activos" section with 3-4 program cards
    And the layout is 1-col on xs/sm, 2-col on md, 3-col on lg+

  @TS-023 @FR-031 @P3 @acceptance
  Scenario: Program card links to existing page
    Given a visitor clicks on a program card
    When they navigate
    Then they land on "empresas/index.html" or "personas/index.html"
    And no new pages are created

  @TS-024 @FR-032 @SC-017 @P3 @acceptance
  Scenario: Information request registers lead with program context
    Given a visitor requests information about a program
    When they submit the form
    Then they are registered as a lead with context "offer:<program-slug>"

  # ── Analytics (from spec FR-070) ──

  @TS-025 @FR-070 @P3 @contract
  Scenario: Program request event fires with context
    Given a visitor submits a program information request
    When the Analytics event fires
    Then event "program_request" includes "locale", "device_class", and "source"
