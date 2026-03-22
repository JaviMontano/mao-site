# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-2 @P1
Feature: Translated SiteHeader and SiteFooter
  As a visitor who selected English
  I want the header and footer to display in English
  So that I have a consistent bilingual experience across all pages

  @TS-005 @FR-007 @SC-001
  Scenario: SiteHeader displays in English
    Given language is set to "en"
    When SiteHeader renders on any page
    Then nav link "Ruta de (R)Evolucion" displays as "Route of (R)Evolution"
    And nav link "Recursos" displays as "Resources"
    And nav link "Servicios" displays as "Services"
    And nav link "Contacto" displays as "Contact"
    And the CTA button displays in English

  @TS-006 @FR-007 @SC-001
  Scenario: SiteFooter displays in English
    Given language is set to "en"
    When SiteFooter renders on any page
    Then all section headers display in English
    And all footer links display in English
    And copyright text displays in English

  @TS-007 @FR-008 @SC-001
  Scenario: Floating nav displays in English
    Given language is set to "en"
    And the user has scrolled past the header
    When the floating nav appears
    Then all section labels in the floating nav display in English
