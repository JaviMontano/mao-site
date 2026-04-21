# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-5
Feature: Responsive Native on All Devices
  A visitor accesses the home from any device (xs through 2xl) and perceives
  a native design — not generic responsive. Three routes preserved, fold shows
  primary CTA, no horizontal scroll, touch targets comply with WCAG.

  # ── Acceptance Tests (from spec.md US-5) ──

  @TS-033 @FR-050 @FR-054 @SC-011 @SC-020 @P1 @acceptance
  Scenario: iPhone SE portrait shows hero without scroll
    Given a visitor on iPhone SE (360x640 portrait)
    When the page loads
    Then the value proposition and primary CTA are visible without scroll
    And navigation is in a drawer
    And touch targets are >=44px
    And base typography is 16px

  @TS-034 @FR-051 @SC-011 @P1 @acceptance
  Scenario: iPhone 15 landscape shows compact hero
    Given a visitor on iPhone 15 landscape (844x390)
    When the page loads
    Then the hero collapses to a compact layout
    And the primary CTA remains visible

  @TS-035 @FR-050 @SC-011 @P1 @acceptance
  Scenario: iPad portrait shows wide 1-col hero
    Given a visitor on iPad portrait (768x1024)
    When the page loads
    Then the hero displays in 1-col wide layout
    And CTAs are arranged horizontally

  @TS-036 @FR-050 @SC-011 @P1 @acceptance
  Scenario: Desktop 1920x1080 shows 2-col hero
    Given a visitor on desktop (1920x1080)
    When the page loads
    Then the hero displays in 2-col layout with max-w 1440 centered

  @TS-037 @FR-062 @SC-011 @P1 @acceptance
  Scenario: Keyboard navigation follows correct focus order
    Given a visitor using keyboard navigation
    When they tab from the beginning of the page
    Then the focus order is: skip-link, nav, primary CTA, secondary CTA, programs section, footer

  # ── Cross-viewport validation (from spec FR-050..FR-057) ──

  @TS-038 @FR-055 @SC-012 @P1 @validation
  Scenario Outline: No horizontal scroll on any viewport
    Given the home at viewport <viewport>
    When the page is fully loaded
    Then no horizontal scroll is present

    Examples:
      | viewport    |
      | xs (360)    |
      | sm (390)    |
      | md (768)    |
      | lg (1024)   |
      | xl (1280)   |
      | 2xl (1536)  |

  @TS-039 @FR-054 @SC-020 @P1 @validation
  Scenario Outline: Touch targets meet minimum size on <class>
    Given the home at viewport class <class>
    When interactive elements are measured
    Then all touch targets are >=<min_size>px
    And spacing between targets is >=8px

    Examples:
      | class | min_size |
      | xs    | 44       |
      | sm    | 44       |
      | md    | 48       |
      | lg    | 48       |
      | xl    | 48       |
      | 2xl   | 48       |

  @TS-040 @FR-052 @P1 @validation
  Scenario: Typography uses fluid clamp() scaling
    Given the home CSS is inspected
    When font-size declarations are reviewed
    Then heading sizes use clamp() for fluid scaling between breakpoints
    And no hard step changes in font size between adjacent viewports

  @TS-041 @FR-053 @P1 @validation
  Scenario: iOS safe areas are respected
    Given the home on an iOS device with notch/Dynamic Island
    When rendered in Safari
    Then the layout respects env(safe-area-inset-*) values
    And no content is obscured by the notch or home indicator

  @TS-042 @FR-056 @FR-057 @SC-021 @P1 @validation
  Scenario: Images use responsive loading with reserved space
    Given images on the home page
    When the page loads
    Then images below the fold have loading="lazy"
    And images use srcset with WebP/AVIF + fallback
    And all media have aspect-ratio or explicit width/height to prevent CLS
