# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-4
Feature: Neo-Swiss Light Identity Coherent with Cartillas
  A visitor who knows the premium cartillas perceives immediate visual continuity:
  same typography, palette, radii, shadows, and patterns as the reference cartillas.

  # ── Acceptance Tests (from spec.md US-4) ──

  @TS-026 @FR-040 @SC-006 @P1 @acceptance
  Scenario: Home shares 100% tokens with reference cartillas
    Given the new home is published
    When compared with the reference cartillas
    Then they share tokens (colors, typography, radii, shadows, spacing) at 100%
    And both use the same CSS custom properties

  @TS-027 @FR-041 @SC-006 @P1 @acceptance
  Scenario: Light mode matches cartilla token values (measured via getComputedStyle)
    Given the home in light mode (default)
    When getComputedStyle(document.documentElement).getPropertyValue is read for each token
    Then "--bg" resolves to "#F9FAFB"
    And "--navy" resolves to "#122562"
    And "--gold" resolves to "#FFD700"
    And "--font-head" resolves to "Poppins"
    And "--font-body" resolves to "Montserrat"
    And "--font-note" resolves to "Trebuchet MS"

  @TS-028 @FR-042 @SC-006 @P1 @acceptance
  Scenario: Dark mode mirrors cartilla dark tokens (measured via getComputedStyle)
    Given the home in dark mode (toggle activated, html[data-theme="dark"])
    When getComputedStyle(document.documentElement).getPropertyValue is read for each token
    Then "--bg" resolves to "#0B2545"
    And "--text" resolves to "#F0F4F8"
    And "--gold" and "--blue" retain their values with desaturated equivalents

  @TS-029 @FR-001 @FR-002 @SC-006 @P1 @acceptance
  Scenario: CTA hierarchy preserved across all viewports
    Given the home at viewports xs, sm, md, lg, xl, and 2xl
    When inspected
    Then the hierarchy of the 3 CTAs is preserved
    And the diagnostic CTA always dominates the fold

  # ── Validation Tests (from spec FR-040..FR-045) ──

  @TS-030 @FR-043 @P1 @validation
  Scenario: Typography uses the 3-level system
    Given the home is rendered
    When CSS custom properties are inspected
    Then "--font-head" resolves to "Poppins"
    And "--font-body" resolves to "Montserrat"
    And "--font-note" resolves to "Trebuchet MS"

  @TS-031 @FR-044 @P1 @validation
  Scenario: Border radii match design system values (px canonical unit)
    Given the home is rendered
    When getComputedStyle(document.documentElement).getPropertyValue is read
    Then "--radius-sm" resolves to "6px"
    And "--radius-md" resolves to "12px"
    And "--radius-lg" resolves to "20px"
    And "--radius-xl" resolves to "32px"

  @TS-032 @FR-045 @SC-013 @P1 @validation
  Scenario: Theme toggle completes DOM update in <100ms with persistence
    Given a visitor toggles to dark mode
    When the toggle click event fires
    Then the DOM update (html[data-theme="dark"] + re-paint) completes in <100ms measured via performance.now()
    And "mdg_theme" in localStorage is "dark"
    And reloading the page renders dark mode immediately (no light-to-dark flash)
