# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-6 @P3
Feature: SEO hreflang Tags
  As a search engine
  I need hreflang tags on pages
  So that I can discover the bilingual availability of content

  @TS-019 @FR-010 @SC-008
  Scenario: Public pages have hreflang tags
    Given any public page (robots: index, follow)
    When the page source is rendered
    Then it contains a link element with hreflang="es"
    And it contains a link element with hreflang="en"
    And both point to the same URL (client-side translation)

  @TS-020 @FR-010 @SC-008
  Scenario: Internal pages do NOT have hreflang tags
    Given a page with robots "noindex, nofollow"
    When the page source is rendered
    Then it does NOT contain hreflang link elements
