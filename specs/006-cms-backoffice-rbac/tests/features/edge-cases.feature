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
    Scenario: Concurrent edits on same document
      Given two editors are editing the same program document
      When both save changes
      Then last-write wins
      And the second editor sees a conflict notification

  Rule: Orphaned user cleanup

    @TS-039 @FR-014 @P3 @acceptance
    Scenario: Firebase Auth user deleted externally
      Given a Firebase Auth user is deleted externally
      When an admin reviews the user list
      Then the orphaned CMS user record is flagged for cleanup

  Rule: Legacy migration

    @TS-040 @FR-005 @P1 @acceptance
    Scenario: Legacy admin claim auto-migrates to new role
      Given a user has legacy "admin: true" custom claim without a "role" claim
      When they sign in to the CMS
      Then the migrateMyRole Cloud Function assigns them "admin" role
      And the legacy "admin: true" claim is removed
