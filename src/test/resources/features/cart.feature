@regression
Feature: Shopping Cart
  As a logged-in user
  I want to manage items in my cart
  So that I can review my selections before checkout

  Background:
    Given the user navigates to the login page
    And the user logs in with username "standard_user" and password "secret_sauce"

  @smoke
  Scenario: Add a single item to the cart
    When the user adds product number 1 to the cart
    And the user goes to the cart
    Then the cart should contain 1 item(s)

  Scenario: Add multiple items to the cart
    When the user adds product number 1 to the cart
    And the user adds product number 2 to the cart
    And the user goes to the cart
    Then the cart should contain 2 item(s)

  Scenario: Cart shows correct product name
    When the user adds product number 1 to the cart
    And the user goes to the cart
    Then the cart should contain the product "Sauce Labs Backpack"
