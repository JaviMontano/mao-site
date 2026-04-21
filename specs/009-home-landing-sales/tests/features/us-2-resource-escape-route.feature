# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-2
Feature: Resource as Escape Route
  A visitor not ready to share data sees the secondary CTA "Explorar recursos gratis",
  navigates to the catalog, consumes a resource, and receives a contextual invitation
  to the diagnostic.

  # ── Acceptance Tests (from spec.md US-2) ──

  @TS-016 @FR-020 @FR-001 @P2 @acceptance
  Scenario: Resource CTA is visually subordinate to diagnostic CTA
    Given a visitor on the home page
    When they view the three routes
    Then "Explorar recursos" appears as a secondary CTA
    And it has subordinate visual weight (outline vs filled, medium vs XL size)

  @TS-017 @FR-021 @P2 @acceptance
  Scenario: Resource catalog shows Neo-Swiss consistent preview
    Given a visitor clicks "Explorar recursos"
    When they navigate to the catalog
    Then resources are organized by type
    And the preview styling is Neo-Swiss consistent with existing cartillas

  @TS-018 @FR-021 @P2 @acceptance
  Scenario: Post-consumption shows contextual diagnostic invitation
    Given a visitor opens a free resource
    When they finish consuming it
    Then they see a contextual invitation "Quieres saber que nivel ya tienes? Haz el diagnostico de 3 min"

  @TS-019 @FR-022 @SC-017 @P2 @acceptance
  Scenario: Premium resource requires email to unlock
    Given a visitor attempts to open a premium resource
    When they click on it
    Then a modal "Ingresa tu email para desbloquear" is displayed
    And submitting email registers a lead with source "home-resource-premium"
    And the resource is delivered without double opt-in

  # ── Contract Tests (from plan.md) ──

  @TS-020 @FR-022 @FR-017 @SC-017 @P2 @contract
  Scenario: Premium resource lead write uses correct fuente
    Given an anonymous authenticated user unlocks a premium resource
    When the lead is written to "leads/{uid}"
    Then the "fuente" field is "home-resource-premium"
    And the lead contains email, name, locale, and consent

  # ── Analytics (from spec FR-070) ──

  @TS-021 @FR-070 @P2 @contract
  Scenario Outline: Resource events fire with required metadata
    Given a visitor interacts with resources
    When event "<event>" fires
    Then the event payload includes "locale", "device_class", and "source"

    Examples:
      | event                  |
      | resource_open          |
      | resource_premium_unlock|
