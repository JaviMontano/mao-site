# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-001
Feature: Working Admin Login
  As a site administrator, I want the admin page to load and
  authenticate me so that I can access the CMS.

  @TS-001 @FR-001 @FR-002 @SC-001 @P1 @acceptance
  Scenario: Admin page loads without errors
    Given I navigate to /admin/
    When the page loads
    Then I see a branded login page with Google sign-in button
    And there are zero console errors

  @TS-002 @FR-003 @FR-005 @FR-006 @SC-001 @P1 @acceptance
  Scenario: Super admin signs in and sees full CMS
    Given I click sign-in with super-admin account "javier.montano.guz@gmail.com"
    When authentication completes
    Then I see the full CMS editor with all tabs

  @TS-003 @FR-003 @FR-011 @SC-003 @P1 @acceptance
  Scenario: Unauthorized account is denied access
    Given I click sign-in with an unauthorized account
    When authentication completes
    Then I see an access denied message with instructions to request access

  @TS-004 @FR-004 @P1 @acceptance
  Scenario: Session times out after 8 hours of inactivity
    Given I am logged in as any CMS user
    And I have been idle for 8 hours
    When the idle timer fires
    Then I am signed out automatically
    And I see a session expired message

  @TS-005 @FR-004 @P1 @acceptance
  Scenario: User interaction resets idle timer
    Given I am logged in as any CMS user
    And the idle timer is running
    When I perform a user interaction (click, keypress, or navigation)
    Then the idle timer resets to 8 hours
