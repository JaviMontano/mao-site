# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-4 @P2
Feature: Level 2-5 Coverage Expansion
  As the project owner
  I want all remaining pages to reach level-appropriate bilingual coverage
  So that the entire site is certifiably bilingual

  @TS-022 @FR-012 @SC-004 @acceptance
  Scenario: L2 product pages reach 100% coverage
    Given L2 pages are empresas, personas, and servicios subpages
    When certified
    Then 100% of keys are translated

  @TS-023 @FR-013 @SC-004 @acceptance
  Scenario: L3 resource index pages reach 90% coverage
    Given L3 pages are recursos index and sub-index pages
    When certified
    Then at least 90% of keys are translated

  @TS-024 @FR-014 @SC-004 @acceptance
  Scenario: L4 resource detail pages have headings and CTAs translated
    Given L4 pages are resource detail and biblioteca detail pages
    When certified
    Then headings CTAs and nav elements are translated

  @TS-025 @FR-015 @SC-004 @acceptance
  Scenario: L5 support pages reach 100% coverage
    Given L5 pages are contacto nosotros and legal pages
    When certified
    Then 100% of keys are translated
