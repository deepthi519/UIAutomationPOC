@regression
Feature: Logout
  As a logged-in user
  I want to log out of the application
  So that my session is securely ended

  Background:
    Given the user navigates to the login page
    And the user logs in with username "standard_user" and password "secret_sauce"

  @smoke
  Scenario: Logout successfully
    When the user opens the menu
    And the user clicks logout
    Then the user should be redirected to the login page

  Scenario: User is redirected to login page after logout
    When the user opens the menu
    And the user clicks logout
    Then the login page should be displayed
