# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

Feature: Cross-Cutting: Performance, Accessibility, i18n, and Analytics
  Non-functional requirements that span all user stories: performance budgets,
  WCAG compliance, i18n coverage, analytics events, and offline UX.

  # ── Performance (from spec FR-090..FR-096, SC-005, SC-007, SC-021) ──

  @TS-060 @FR-090 @SC-005 @P1 @acceptance
  Scenario: LCP meets budget on 4G mobile
    Given the home on a 4G-throttled connection (Lighthouse mobile)
    When the page loads
    Then LCP is <=2.5s

  @TS-061 @FR-090 @SC-005 @P1 @acceptance
  Scenario: LCP meets budget on desktop cable
    Given the home on desktop cable connection
    When the page loads
    Then LCP is <=1.5s

  @TS-062 @FR-091 @SC-007 @SC-021 @P1 @acceptance
  Scenario: Core Web Vitals within budget
    Given a Lighthouse audit on the home page
    When results are evaluated
    Then TBT is <200ms
    And CLS is <0.1
    And INP is <200ms

  @TS-063 @FR-092 @FR-096 @P1 @acceptance
  Scenario: Critical CSS is inlined and deferred stylesheet loads
    Given the home HTML source
    When the <head> is inspected
    Then critical CSS (tokens + hero + CTA + typography) is in an inline <style> tag
    And dist/output.css is loaded via media="print" with onload swap
    And no FOUC occurs on first paint

  @TS-064 @FR-093 @P1 @validation
  Scenario: Fonts use swap display and preconnect
    Given the home HTML source
    When font loading is inspected
    Then fonts use font-display: swap
    And a preconnect hint for fonts.googleapis.com is present

  @TS-065 @FR-094 @P1 @validation
  Scenario: Non-critical JS is deferred
    Given the home HTML source
    When script tags are inspected
    Then all non-critical scripts use defer or type="module"

  @TS-066 @FR-095 @P1 @validation
  Scenario: No new dependencies introduced
    Given the project dependency list
    When compared to the pre-feature baseline
    Then zero new runtime dependencies are added

  # ── Accessibility (from spec FR-060..FR-065, SC-022) ──

  @TS-067 @FR-061 @SC-007 @SC-022 @P1 @acceptance
  Scenario: WCAG 2.1 AA contrast ratios pass
    Given the home in light mode
    When foreground/background color pairs are audited
    Then normal text has contrast >=4.5:1
    And large text has contrast >=3:1
    And UI components have contrast >=3:1

  @TS-068 @FR-062 @P1 @acceptance
  Scenario: Focus rings are visible on all interactive elements
    Given a visitor using keyboard navigation
    When they tab through the page
    Then every interactive element shows a visible focus ring

  @TS-069 @FR-064 @P1 @acceptance
  Scenario: Reduced motion preference disables animations
    Given a visitor with prefers-reduced-motion: reduce
    When the home loads
    Then entrance animations are disabled
    And transitions are limited to <=100ms

  @TS-070 @FR-065 @P1 @validation
  Scenario: Decorative icons have aria-hidden, functional icons have aria-label
    Given lucide icons on the home page
    When inspected
    Then decorative icons have aria-hidden="true"
    And functional icons have an aria-label attribute

  @TS-071 @FR-063 @P1 @acceptance
  Scenario: Page is navigable without JavaScript
    Given JavaScript is disabled
    When the home is loaded
    Then a degraded but functional static HTML is rendered
    And links to /diagnostico/, /recursos/, /empresas/, /personas/ are navigable

  # ── i18n (from spec FR-060, SC-010, SC-015) ──

  @TS-072 @FR-060 @SC-010 @P1 @acceptance
  Scenario: Home is 100% translated in ES and EN
    Given the home with locale set to "es"
    When all data-i18n elements are audited
    Then zero untranslated strings are found
    And switching to "en" also yields zero untranslated strings

  @TS-073 @FR-060 @SC-015 @P1 @validation
  Scenario: No raw i18n keys in production DOM
    Given the home in production mode
    When the DOM is inspected with regex for key patterns
    Then zero occurrences of raw keys (e.g., "home.hero.persona.es") are found

  # ── Offline UX (from spec FR-097..FR-099) ──

  @TS-074 @FR-097 @FR-098 @P1 @acceptance
  Scenario: Offline pill appears when Firestore fails
    Given Firestore is stubbed to fail
    When the home loads
    Then an "offline" pill (yellow) appears near the header within 3 seconds

  @TS-075 @FR-099 @P1 @acceptance
  Scenario: Cache state pills are announced by screen readers
    Given a screen reader is active
    When the cache state changes to "offline"
    Then aria-live="polite" announces the state change

  # ── UTM Deep Linking (from spec FR-080) ──

  @TS-076 @FR-080 @P1 @acceptance
  Scenario Outline: UTM content highlights corresponding route
    Given a visitor arrives with utm_content="<utm>"
    When the home loads
    Then the "<route>" section has a subtle gold glow highlight
    And the base CTA hierarchy is not changed

    Examples:
      | utm          | route        |
      | diagnostico  | diagnostic   |
      | recurso      | resources    |
      | oferta       | programs     |

  # ── Home Layout Structure (from spec FR-003..FR-005) ──

  @TS-077 @FR-005 @P1 @acceptance
  Scenario: Home follows the canonical section order
    Given the home page is fully rendered
    When the section order is inspected
    Then the order is: hero, social proof, 3 expanded routes, active programs, closing CTAs, footer

  @TS-078 @FR-003 @P1 @acceptance
  Scenario: Social proof section exists between hero and programs
    Given the home page
    When the area between hero and programs section is inspected
    Then a social proof section (testimonials or logos or metrics) is present

  @TS-079 @FR-004 @P1 @acceptance
  Scenario: Closing section repeats all 3 CTAs before footer
    Given the home page
    When the section before the footer is inspected
    Then all 3 CTAs (diagnostic, resources, offer) are repeated

  # ── Analytics Home Events (from spec FR-070..FR-072) ──

  @TS-080 @FR-070 @FR-071 @P1 @contract
  Scenario Outline: CTA click events fire with metadata
    Given a visitor clicks <cta>
    When the Analytics event fires
    Then event "<event>" includes locale, device_class, and source

    Examples:
      | cta                 | event               |
      | primary CTA         | cta_click_primary   |
      | secondary CTA       | cta_click_secondary |
      | tertiary CTA        | cta_click_tertiary  |

  @TS-081 @FR-070 @P1 @contract
  Scenario: Home view event fires on page load
    Given a visitor loads the home page
    When the page finishes loading
    Then event "home_view" fires with locale, device_class, and source

  # ── Two-Tier Consent: Analytics Rejection (from spec v5 clarification + FR-072) ──
  # The Analytics consent banner and the PII consent checkbox (FR-012 step 6) are
  # orthogonal. Rejecting analytics MUST NOT block diagnostic completion or lead writes.

  @TS-084 @FR-072 @P1 @acceptance
  Scenario: Rejected analytics consent suppresses home_view event
    Given a visitor rejects the Analytics consent banner
    When the home page loads
    Then event "home_view" is NOT fired
    And the home page renders normally with all sections visible

  @TS-085 @FR-072 @FR-012 @SC-017 @P1 @acceptance
  Scenario: Rejected analytics consent does not block diagnostic lead write
    Given a visitor rejects the Analytics consent banner
    And they complete the diagnostic with PII consent checkbox checked
    When the diagnostic result is shown
    Then the lead is persisted in Firestore "leads/{uid}" with fuente "home-diagnostic"
    And the diagnostic is persisted in Firestore "diagnostics/{uid}"
    And event "diagnostic_completed" is NOT fired

  @TS-086 @FR-072 @FR-070 @P1 @acceptance
  Scenario: Rejected analytics consent suppresses all CTA click events
    Given a visitor rejects the Analytics consent banner
    When they click the primary CTA
    Then event "cta_click_primary" is NOT fired
    And the diagnostic flow opens normally

  @TS-087 @FR-072 @FR-015 @P1 @acceptance
  Scenario: Rejected analytics consent with Firestore fallback still works
    Given a visitor rejects the Analytics consent banner
    And Firestore is unavailable
    When they submit the degraded contact form
    Then the mailto fallback activates
    And zero Analytics events are fired

  # ── Bundle Size (from spec NFR-004) ──

  @TS-082 @SC-007 @P1 @validation
  Scenario: Initial bundle is under 250KB
    Given the home page HTML + critical CSS
    When the combined size is measured
    Then it is <250 KB

  @TS-083 @SC-007 @P1 @validation
  Scenario: Total page weight under 800KB with lazy loading
    Given the home page fully loaded with all lazy resources
    When the total transfer size is measured
    Then it is <800 KB
