# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-6
Feature: Adaptive Blueprint with 3 Toggles
  A visitor on any of the 13 pages sees 3 toggles (locale ES/EN, theme light/dark,
  audience persona/empresa) in the header. Toggling any axis updates the shell in
  <100ms without reload, flicker, or context loss. URL params pre-select audience
  before first paint. No raw i18n keys ever appear in the DOM.

  # ── Acceptance Tests (from spec.md US-6) ──

  @TS-043 @FR-200 @SC-013 @P1 @acceptance
  Scenario: Audience toggle updates content in <100ms
    Given a visitor on "/programas/" with mdg_audience=persona
    When they click the audience toggle to "empresa"
    Then hero copy, proof section, and filtered programs update in <100ms
    And localStorage.mdg_audience is "empresa"
    And html[data-audience] is "empresa"

  @TS-044 @FR-200 @P1 @acceptance
  Scenario: Three toggles visible on md+ viewports
    Given a visitor on any of the 13 pages at md+ viewport
    When they inspect the header
    Then the 3 toggles (locale, theme, audience) are visible

  @TS-045 @FR-200 @P1 @acceptance
  Scenario: Toggles collapse to preferences button on xs/sm
    Given a visitor on any of the 13 pages at xs or sm viewport
    When they inspect the header
    Then the toggles collapse to a button "Preferencias" with aria-expanded

  @TS-046 @FR-200 @SC-015 @P1 @acceptance
  Scenario: URL param pre-selects audience before first paint
    Given URL "/metodo/?audiencia=empresa"
    When the page loads
    Then html[data-audience] is "empresa" before the first paint
    And no visual flicker occurs

  @TS-047 @FR-200 @P1 @acceptance
  Scenario: Audience toggle is keyboard accessible with ARIA
    Given a visitor navigating by keyboard
    When they tab to the audience toggle and press Arrow Right
    Then the other option activates
    And aria-live announces "Cambiado a vista empresas" or "Switched to business view"

  @TS-048 @FR-200 @SC-015 @P1 @acceptance
  Scenario: Missing i18n key falls back gracefully
    Given key "home.hero.empresa.en" is absent from dictionaries
    When the i18n resolver executes cascade
    Then it falls back to "home.hero.unknown.en"
    And never shows the raw key in the DOM

  @TS-049 @FR-200 @SC-013 @P1 @acceptance
  Scenario: Theme change does not alter content slots
    Given a visitor changes theme from light to dark
    When the slots re-render
    Then hero, proof, and CTA content does NOT change
    And only CSS tokens change (orthogonality verified)

  # ── Parametric Matrix Test (from spec SC-014) ──

  @TS-050 @FR-200 @SC-014 @SC-015 @P1 @acceptance
  Scenario Outline: Adaptive blueprint matrix passes for all combinations
    Given page "<page>" with locale "<locale>" and audience "<audience>"
    When the page renders
    Then no text node, title, alt, aria-label, or placeholder attribute matches the raw key pattern /[\w-]+\.[\w-]+\.[\w-]+/
    And document.documentElement.scrollWidth <= document.documentElement.clientWidth (zero horizontal overflow)
    And every visible element with [data-i18n] or [data-slot] has textContent.trim().length > 0

    Examples:
      | page            | locale | audience |
      | home            | es     | persona  |
      | home            | es     | empresa  |
      | home            | en     | persona  |
      | home            | en     | empresa  |
      | diagnostico     | es     | persona  |
      | diagnostico     | es     | empresa  |
      | diagnostico     | en     | persona  |
      | diagnostico     | en     | empresa  |
      | recursos        | es     | persona  |
      | recursos        | es     | empresa  |
      | recursos        | en     | persona  |
      | recursos        | en     | empresa  |
      | metodo          | es     | persona  |
      | metodo          | es     | empresa  |
      | metodo          | en     | persona  |
      | metodo          | en     | empresa  |
      | nosotros        | es     | persona  |
      | nosotros        | es     | empresa  |
      | nosotros        | en     | persona  |
      | nosotros        | en     | empresa  |
      | programas       | es     | persona  |
      | programas       | es     | empresa  |
      | programas       | en     | persona  |
      | programas       | en     | empresa  |
      | empresas        | es     | persona  |
      | empresas        | es     | empresa  |
      | empresas        | en     | persona  |
      | empresas        | en     | empresa  |
      | personas        | es     | persona  |
      | personas        | es     | empresa  |
      | personas        | en     | persona  |
      | personas        | en     | empresa  |
      | insights        | es     | persona  |
      | insights        | es     | empresa  |
      | insights        | en     | persona  |
      | insights        | en     | empresa  |
      | contacto        | es     | persona  |
      | contacto        | es     | empresa  |
      | contacto        | en     | persona  |
      | contacto        | en     | empresa  |
      | precios         | es     | persona  |
      | precios         | es     | empresa  |
      | precios         | en     | persona  |
      | precios         | en     | empresa  |
      | legal           | es     | persona  |
      | legal           | es     | empresa  |
      | legal           | en     | persona  |
      | legal           | en     | empresa  |
      | 404             | es     | persona  |
      | 404             | es     | empresa  |
      | 404             | en     | persona  |
      | 404             | en     | empresa  |

  # ── Contract: Offline pills coexist with toggles (FR-099b) ──

  @TS-051 @FR-099b @FR-097 @P1 @contract
  Scenario: Offline pills remain visible alongside toggles
    Given the 3 toggles are rendered in the header
    When the offline pill appears (Firestore unavailable)
    Then the pill is visible in the same header landmark
    And the pill does not overlap or obstruct any toggle
    And the pill has contrast >=3:1 in both light and dark themes
