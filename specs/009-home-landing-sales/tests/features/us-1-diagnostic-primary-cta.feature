# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-1
Feature: Diagnostic as Primary CTA
  A visitor arrives at the home and sees a prominent "Iniciar diagnostico gratuito"
  button, completes a 6-step questionnaire, and receives a personalized result with
  lead registration in Firestore.

  # ── Acceptance Tests (from spec.md US-1) ──

  @TS-001 @FR-001 @FR-002 @FR-051 @SC-005 @P1 @acceptance
  Scenario: Hero visible without scroll on xs viewport
    Given a new visitor on the home page at viewport xs (360x640)
    When the page finishes loading with LCP <=2.5s on 4G
    Then they see the Neo-Swiss Light hero with a value proposition of <=12 words
    And the primary button "Iniciar diagnostico gratuito" is visible without scroll
    And the primary button has a touch target >=44px

  @TS-002 @FR-001 @FR-002 @FR-051 @P1 @acceptance
  Scenario: Hero in 2-col layout on 2xl viewport
    Given the same visitor on viewport 2xl (1920x1080)
    When the page loads
    Then they see the hero in a 2-col optimized layout
    And the primary CTA maintains dominant visual weight

  @TS-003 @FR-010 @FR-011 @SC-004 @P1 @acceptance
  Scenario: Diagnostic flow has 6 steps with progress indicator
    Given a visitor clicks "Iniciar diagnostico gratuito"
    When they enter the diagnostic flow
    Then they see short steps with <=6 questions
    And a persistent progress indicator is visible
    And back/next buttons are present
    And estimated time "~3 min" is displayed

  @TS-004 @FR-012 @FR-013 @SC-003 @SC-009 @SC-017 @P1 @acceptance
  Scenario: Completed diagnostic persists lead and diagnostic to Firestore
    Given a visitor completes the diagnostic
    When they submit the last step with email, name, and consent
    Then the responses are persisted in Firestore "diagnostics/{uid}"
    And a lead is created in "leads/{uid}" with inferred segment, locale, and source "home-hero"
    And an Analytics event "diagnostic_completed" is fired

  @TS-005 @FR-014 @P1 @acceptance
  Scenario: Abandoned diagnostic resumes from localStorage
    Given a visitor abandons the diagnostic at step 3
    When they return to the home within the same session (<=24h)
    Then they see a banner "Tienes un diagnostico sin terminar — continuar"
    And clicking the banner resumes from step 3

  @TS-006 @FR-016 @FR-081 @P1 @acceptance
  Scenario: Returning visitor sees mutated CTA
    Given a visitor with cookie "mdg_returning"
    When the home loads
    Then the primary CTA text changes to "Continuar tu ruta" instead of "Iniciar diagnostico"

  # ── Contract Tests (from plan.md + spec §4.5 diagnostic logic) ──

  @TS-007 @FR-013 @FR-017 @SC-017 @P1 @contract
  Scenario: Firestore security rules allow anonymous write to diagnostics
    Given an anonymous authenticated user with uid "test-uid"
    When they write a diagnostic document to "diagnostics/test-uid"
    Then the write succeeds
    And the document contains required fields: steps, resultado, locale, fuente, completedAt

  @TS-008 @FR-013 @FR-017 @P1 @contract
  Scenario: Firestore denies write to another user's diagnostic
    Given an anonymous authenticated user with uid "user-a"
    When they attempt to write to "diagnostics/user-b"
    Then the write is denied by security rules

  @TS-009 @FR-013 @FR-017 @P1 @contract
  Scenario: Firestore denies update on existing diagnostic (append-only)
    Given a diagnostic document exists at "diagnostics/test-uid"
    When the owner attempts to update the document
    Then the update is denied by security rules

  @TS-010 @FR-013 @FR-017 @SC-017 @P1 @contract
  Scenario: Lead document has non-empty fuente field
    Given a completed diagnostic session
    When the lead is written to "leads/{uid}"
    Then the "fuente" field is one of "home-diagnostic", "home-resource-premium", "contact-form", "insights-subscribe", "diagnostic-mailto-fallback"

  # ── Validation Tests (from data-model.md + spec §4.5 scoring) ──

  Rule: Diagnostic scoring produces correct nivel

    @TS-011 @FR-012 @P1 @validation
    Scenario Outline: Scoring maps weight sum to correct nivel
      Given a visitor completes steps 1-5 with total weight <score>
      When the resultado is computed
      Then the nivel_id is "<nivel>"

      Examples:
        | score | nivel      |
        | 0     | explorer   |
        | 4     | explorer   |
        | 5     | builder    |
        | 9     | builder    |
        | 10    | strategist |
        | 15    | strategist |

  Rule: Diagnostic steps are mandatory and sequential

    @TS-012 @FR-011 @P1 @validation
    Scenario: All 5 weighted steps must be answered before step 6
      Given a visitor is on step 3 of the diagnostic
      When they attempt to skip to step 6 without answering steps 3-5
      Then navigation to step 6 is blocked
      And the current step remains active

    @TS-013 @FR-012 @P1 @validation
    Scenario: Step 6 requires email, name, and consent
      Given a visitor reaches step 6 of the diagnostic
      When they attempt to submit without providing email
      Then a validation error is shown for the email field
      And submission is blocked

  Rule: Back-navigation preserves state and recalculates score

    @TS-088 @FR-011 @FR-014 @P1 @validation
    Scenario: In-app back button preserves previous answers in localStorage
      Given a visitor has answered steps 1-3 of the diagnostic
      When they click the in-app back button to return to step 1
      Then step 1 shows their previous answer pre-selected
      And steps 2 and 3 retain their answers in localStorage

    @TS-089 @FR-011 @FR-012 @P1 @validation
    Scenario: Changing an earlier answer recalculates the final score
      Given a visitor has answered all 5 weighted steps (total weight 7, nivel "builder")
      When they navigate back to step 1 and change their answer (weight delta +3)
      And they advance back to step 6 and complete the diagnostic
      Then the resultado.score reflects the updated sum (10)
      And the nivel_id is "strategist"

  Rule: Step 6 PII validation is complete

    @TS-090 @FR-012 @P1 @validation
    Scenario: Step 6 validates name length (2-80 characters)
      Given a visitor reaches step 6 of the diagnostic
      When they enter a name with 1 character
      Then a validation error is shown for the name field
      And submission is blocked

    @TS-091 @FR-012 @P1 @validation
    Scenario: Step 6 consent checkbox is required
      Given a visitor reaches step 6 with valid email and name
      When they attempt to submit without checking the consent checkbox
      Then a validation error is shown for the consent field
      And submission is blocked

    @TS-092 @FR-012 @FR-014 @P1 @validation
    Scenario: PII fields preserved in memory when navigating back from step 6
      Given a visitor has entered email and name on step 6
      When they navigate back to step 5 and then return to step 6
      Then the email and name fields retain their values from memory
      And the PII data is NOT stored in localStorage

  # ── Degraded State Tests (from spec FR-015) ──

  @TS-014 @FR-015 @P1 @acceptance
  Scenario: Diagnostic degrades to contact form when Firestore unavailable
    Given Firestore is unavailable
    When a visitor attempts to submit the diagnostic
    Then a contact form is displayed with message "Servicio temporal fuera — usa este formulario"
    And the form captures name and email via mailto fallback

  # ── Analytics Contract (from spec FR-070, FR-071) ──

  @TS-015 @FR-070 @FR-071 @P2 @contract
  Scenario Outline: Diagnostic events include required metadata
    Given a visitor triggers event "<event>"
    When the Analytics event fires
    Then the event payload includes "locale", "device_class", and "source"

    Examples:
      | event                |
      | diagnostic_start     |
      | diagnostic_step_1    |
      | diagnostic_step_6    |
      | diagnostic_completed |
      | diagnostic_abandoned |
