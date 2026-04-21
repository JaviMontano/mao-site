# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-6
Feature: Adaptive Blueprint with Sidebar + Triple Toggle
  A visitor on any of the 13 pages sees a sidebar with 7 numbered sections (scroll-spy),
  a simplified header (logo + Ruta/Servicios/Contacto), and a triple toggle always visible
  in the bottom-left corner for switching theme (light/dark), locale (ES/EN), and audience
  (persona/empresa) in <100ms without reload. No raw i18n keys ever appear in the DOM.

  # ── Triple Toggle (FR-245..FR-249) ──

  @TS-043 @FR-246 @FR-247 @SC-013 @P1 @acceptance
  Scenario: Audience toggle updates content in <100ms
    Given a visitor on "/programas/" with mdg_audience=persona
    When they click the audience toggle in the bottom-left triple toggle
    Then hero copy, proof section, and filtered programs update in <100ms
    And localStorage.mdg_audience is "empresa"
    And html[data-audience] is "empresa"

  @TS-044 @FR-242 @FR-240 @P1 @acceptance
  Scenario: Header has 3 nav items and sidebar has 7 sections on desktop
    Given a visitor on any of the 12 sidebar pages at desktop viewport (>=960px)
    When they inspect the layout
    Then the header shows logo + "Ruta" (gold CTA) + "Servicios" + "Contacto"
    And the sidebar shows 7 numbered section links (01-07) with icons
    And the triple toggle is visible fixed at bottom-left

  @TS-045 @FR-240 @FR-242 @P1 @acceptance
  Scenario: Sidebar collapses to drawer on mobile with hamburger
    Given a visitor on any page at xs viewport (360px)
    When they inspect the layout
    Then the sidebar is hidden (off-canvas)
    And a hamburger button is visible in the header
    And the triple toggle is still visible fixed at bottom-left
    When they click the hamburger
    Then the sidebar slides in from the left with backdrop

  @TS-046 @FR-245 @SC-015 @P1 @acceptance
  Scenario: URL param pre-selects audience before first paint
    Given URL "/metodo/?audiencia=empresa"
    When the page loads
    Then html[data-audience] is "empresa" before the first paint
    And no visual flicker occurs

  @TS-047 @FR-249 @P1 @acceptance
  Scenario: Triple toggle is keyboard accessible with ARIA switches
    Given a visitor navigating by keyboard
    When they tab to the audience toggle in the bottom-left
    Then the toggle has role="switch" and aria-checked
    When they press Space
    Then the audience flips and aria-live announces "Cambiado a vista empresas"

  @TS-048 @FR-247 @SC-015 @P1 @acceptance
  Scenario: Missing i18n key falls back gracefully
    Given key "home.hero.empresa.en" is absent from dictionaries
    When the i18n resolver executes cascade
    Then it falls back to "home.hero.unknown.en"
    And never shows the raw key in the DOM

  @TS-049 @FR-247 @SC-013 @P1 @acceptance
  Scenario: Theme change does not alter content slots
    Given a visitor changes theme from light to dark via triple toggle
    When the slots re-render
    Then hero, proof, and CTA content does NOT change
    And only CSS tokens change (orthogonality verified)

  # ── Sidebar Navigation (FR-240..FR-244) ──

  @TS-093 @FR-240 @FR-241 @P1 @acceptance
  Scenario: Sidebar shows 7 numbered sections matching page content
    Given a visitor on "/empresas/" at desktop viewport
    When they inspect the sidebar
    Then it shows exactly 7 links numbered 01 through 07
    And each link has an SVG icon and a translated label
    And each link href matches a section id in the main content

  @TS-094 @FR-243 @P1 @acceptance
  Scenario: Scroll-spy marks active section as user scrolls
    Given a visitor on "/home" at desktop viewport viewing section "propuesta"
    When they scroll down to section "programas" (S4)
    Then the sidebar link "04" gains the is-active class
    And the previous active link loses is-active

  @TS-095 @FR-240 @P1 @acceptance
  Scenario: Sidebar click scrolls to section with header offset
    Given a visitor on any sidebar page at desktop viewport
    When they click sidebar link "05"
    Then the page smooth-scrolls to section 5 with offset of header height + 12px
    And the sidebar marks link "05" as active

  @TS-096 @FR-240 @P1 @acceptance
  Scenario: Mobile sidebar closes on link click
    Given a visitor on any page at xs viewport with sidebar open
    When they click a sidebar section link
    Then the sidebar closes (drawer slides out)
    And the page scrolls to the target section

  @TS-097 @FR-240 @P1 @acceptance
  Scenario: Mobile sidebar closes on Escape key
    Given a visitor on any page at xs viewport with sidebar open
    When they press the Escape key
    Then the sidebar closes
    And focus returns to the hamburger button

  @TS-098 @FR-244 @P1 @acceptance
  Scenario: Sidebar section labels update on locale change
    Given a visitor on "/metodo/" with sidebar visible in ES
    When they switch locale to EN via triple toggle
    Then all 7 sidebar section labels re-render in English
    And the active section remains highlighted

  @TS-099 @FR-245 @FR-248 @P1 @acceptance
  Scenario: Triple toggle visible on mobile with sidebar closed
    Given a visitor on any page at xs viewport (360px) with sidebar closed
    Then the triple toggle is visible at fixed bottom-left
    And all 3 toggle buttons have touch target >=44x44px
    And the toggle does not overlap the main scrollable content

  # ── Parametric Matrix Test (from spec SC-014) ──

  @TS-050 @FR-247 @SC-014 @SC-015 @P1 @acceptance
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
      | casos           | es     | persona  |
      | casos           | es     | empresa  |
      | casos           | en     | persona  |
      | casos           | en     | empresa  |
      | legal           | es     | persona  |
      | legal           | es     | empresa  |
      | legal           | en     | persona  |
      | legal           | en     | empresa  |
      | 404             | es     | persona  |
      | 404             | es     | empresa  |
      | 404             | en     | persona  |
      | 404             | en     | empresa  |

  # ── Contract: Offline pills still visible (FR-099b v8) ──

  @TS-051 @FR-099b @FR-097 @P1 @contract
  Scenario: Offline pills remain visible in header/main
    Given the sidebar and triple toggle are rendered
    When the offline pill appears (Firestore unavailable)
    Then the pill is visible in the header or main content area
    And the pill does not overlap any sidebar or toggle element
    And the pill has contrast >=3:1 in both light and dark themes
