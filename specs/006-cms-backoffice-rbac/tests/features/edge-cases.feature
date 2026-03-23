# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

Feature: Edge Cases
  Cross-cutting edge cases from spec.md that span multiple user stories.

  Rule: Concurrent editing conflict

    @TS-038 @FR-018 @P2 @acceptance
    Scenario: Concurrent edit detected before save
      Given two editors are editing the same program document
      And editor A saves their changes
      When editor B attempts to save
      Then editor B sees a warning "Document was modified by another user"
      And editor B can choose to reload the latest version or overwrite

  Rule: Orphaned user cleanup

    @TS-039 @FR-014 @P3 @acceptance
    Scenario: Orphaned user removed manually by super admin
      Given a Firebase Auth user was deleted externally
      And their CMS user record still exists in Firestore
      When a super admin reviews the user list and identifies the orphan
      Then they can click "Remove" to delete the orphaned user record

  Rule: Legacy migration

    @TS-040 @FR-005 @P1 @acceptance
    Scenario: Legacy admin claim auto-migrates to new role
      Given a user has legacy "admin: true" custom claim without a "role" claim
      When they sign in to the CMS
      Then the migrateMyRole Cloud Function assigns them "admin" role
      And the legacy "admin: true" claim is removed
