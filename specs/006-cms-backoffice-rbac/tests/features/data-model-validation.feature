# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

Feature: Data Model Validation
  Validation tests derived from data-model.md field constraints.

  Rule: User document validation

    @TS-075 @FR-005 @FR-014 @P1 @validation
    Scenario: Role field must be a valid enum value
      Given a user document
      When the role field is set to "moderator"
      Then a validation error is returned with message "Invalid role"

    @TS-076 @FR-014 @P1 @validation
    Scenario: Display name must be 1-100 characters
      Given a user document
      When display_name is set to an empty string
      Then a validation error is returned with message "Display name required"

    @TS-077 @FR-015 @P2 @validation
    Scenario: Preferred language must be es or en
      Given a user document
      When preferred_language is set to "fr"
      Then a validation error is returned with message "Invalid language"

  Rule: Invite document validation

    @TS-078 @FR-012 @P1 @validation
    Scenario: Invite email must be valid
      Given an invite creation request
      When the email is "not-an-email"
      Then a validation error is returned with message "Invalid email"

    @TS-079 @FR-012 @P1 @validation
    Scenario: Invite role cannot be super_admin
      Given an invite creation request
      When the role is "super_admin"
      Then a validation error is returned with message "Cannot invite as super_admin"

  Rule: Invite document ID sanitization

    @TS-080 @FR-012 @P1 @validation
    Scenario: Email is sanitized for Firestore doc ID
      Given an invite for "partner@aliado.com"
      When the document ID is generated
      Then the doc ID is "partner_aliado_com"

  Rule: Page override validation

    @TS-081 @FR-023 @P2 @validation
    Scenario: Page title override must be under 200 characters
      Given a page override document
      When title_es exceeds 200 characters
      Then a validation error is returned with message "Title too long"

  Rule: Audit log TTL

    @TS-082 @FR-025 @P2 @validation
    Scenario: Audit entries have 90-day TTL
      Given a new audit log entry is created
      When the TTL field is set
      Then it equals the current timestamp plus 90 days
