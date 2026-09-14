@regression
Feature: Checkout
  As a logged-in user
  I want to complete the checkout process
  So that I can purchase the items in my cart

  Background:
    Given the user navigates to the login page
    And the user logs in with username "standard_user" and password "secret_sauce"
    And the user adds product number 1 to the cart
    And the user goes to the cart

  @smoke
  Scenario: Successful checkout with valid customer info
    When the user proceeds to checkout
    And the user enters customer info "John" "Doe" and postal code "12345"
    And the user completes the order
    Then the order confirmation message should be "Thank you for your order!"

  Scenario: Checkout total is displayed correctly
    When the user proceeds to checkout
    And the user enters customer info "Jane" "Smith" and postal code "90210"
    Then the order total should be "Total:"

  Scenario: Checkout fails when first name is missing
    When the user proceeds to checkout
    And the user enters customer info "" "Doe" and postal code "12345"
    Then the user should see an error message "Error: First Name is required"
