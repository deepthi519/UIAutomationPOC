@regression
Feature: Products
  As a logged-in user
  I want to view and sort the product list
  So that I can find what I want to buy

  Background:
    Given the user navigates to the login page
    And the user logs in with username "standard_user" and password "secret_sauce"

  @smoke
  Scenario: Products page is displayed after login
    Then the products page title should be "Products"

  Scenario: Products list is not empty
    Then the products list should not be empty

  Scenario: Sort products A to Z
    When the user sorts products by "Name (A to Z)"
    Then the products page title should be "Products"

  Scenario: Sort products Z to A
    When the user sorts products by "Name (Z to A)"
    Then the products page title should be "Products"

  Scenario: Sort products by price low to high
    When the user sorts products by "Price (low to high)"
    Then the products page title should be "Products"

  Scenario: Sort products by price high to low
    When the user sorts products by "Price (high to low)"
    Then the products page title should be "Products"
