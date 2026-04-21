# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-8
Feature: Admin Content Editor with 4-Variant Text Management
  An admin logs into /admin/, navigates to the content editor, selects a page,
  and edits content slots in 4 variants (ES-persona, ES-empresa, EN-persona,
  EN-empresa). Changes persist to Firestore slots/{pageSlug} and the public
  site renders them via migration-bridge.js without redeploy.

  # ── Acceptance Tests (from spec.md US-8) ──

  @TS-100 @FR-250 @P1 @acceptance
  Scenario: Admin sees 13 page cards after login
    Given an authenticated admin on "/admin/content-editor.html"
    When the editor loads
    Then they see 13 page cards with name and slot count
    And each card is clickable

  @TS-101 @FR-250 @FR-251 @P1 @acceptance
  Scenario: Admin sees 4 textareas per content slot
    Given an admin selects the "Home" page card
    When the slot editor loads
    Then each content slot shows 4 textareas labeled:
      | label           |
      | ES × Persona    |
      | ES × Empresa    |
      | EN × Persona    |
      | EN × Empresa    |

  @TS-102 @FR-251 @P1 @acceptance
  Scenario: Admin edits and saves a slot variant
    Given an admin edits the "hero.headline" slot variant "EN × Empresa"
    When they change the text to "Transform your team with method"
    And they click save
    Then Firestore document "slots/home" updates with variants.empresa.en containing the new text

  @TS-103 @FR-252 @P1 @acceptance
  Scenario: Public site renders Firestore-edited content
    Given Firestore "slots/home" has variant "empresa.en" = "Transform your team"
    And a visitor loads the home with mdg_locale=en and mdg_audience=empresa
    When the slot-resolver executes
    Then the hero headline shows "Transform your team" (from Firestore, not static JSON)

  @TS-104 @FR-252 @P1 @acceptance
  Scenario: Public site falls back to static JSON when Firestore unavailable
    Given Firestore is unavailable
    And a visitor loads the home with mdg_locale=en and mdg_audience=empresa
    When the slot-resolver executes
    Then the hero headline shows the static JSON value (not an error)

  @TS-105 @FR-253 @P1 @contract
  Scenario: Non-admin cannot write to slots collection
    Given an unauthenticated user
    When they attempt to write to Firestore "slots/home"
    Then the write is denied by security rules

  @TS-106 @FR-253 @P1 @contract
  Scenario: Admin with custom claim can write to slots collection
    Given a user with Firebase Auth custom claim admin=true
    When they write to Firestore "slots/home"
    Then the write succeeds

  @TS-107 @FR-250 @P1 @validation
  Scenario: Content editor requires authentication
    Given an unauthenticated visitor on "/admin/content-editor.html"
    When the page loads
    Then they are redirected to the login screen
    And the editor is not accessible
