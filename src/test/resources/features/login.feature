@regression @smoke
Feature: Login
  As a registered user
  I want to log in to the application
  So that I can access my account

  Background:
    Given the user navigates to the login page

  @smoke
  Scenario: Successful login with valid credentials
    When the user logs in with username "standard_user" and password "secret_sauce"
    Then the user should be on the products page

  Scenario: Failed login with invalid password
    When the user logs in with username "standard_user" and password "wrong_password"
    Then the user should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Failed login with locked-out user
    When the user logs in with username "locked_out_user" and password "secret_sauce"
    Then the user should see an error message "Epic sadface: Sorry, this user has been locked out."

  Scenario: Failed login with blank username
    When the user logs in with username "" and password "secret_sauce"
    Then the user should see an error message "Epic sadface: Username is required"

  Scenario: Failed login with blank password
    When the user logs in with username "standard_user" and password ""
    Then the user should see an error message "Epic sadface: Password is required"

  Scenario Outline: Login with multiple user types
    When the user logs in with username "<username>" and password "<password>"
    Then the user should be on the products page

    Examples:
      | username        | password     |
      | standard_user   | secret_sauce |
      | problem_user    | secret_sauce |
