/**
 * checkout.spec.ts
 * Playwright TypeScript equivalent of checkout.feature + CheckoutSteps.java.
 *
 * Selenium/Cucumber to Playwright mapping:
 *   Background steps                        = test.beforeEach() — login + add item + go to cart
 *   cartPage.clickCheckout()               = cartPage.clickCheckout()
 *   checkoutPage.fillCustomerInfo(...)     = checkoutPage.fillCustomerInfo(...)
 *   checkoutPage.finishCheckout()          = checkoutPage.finishCheckout()
 *   Assert.assertEquals(actual, expected)  = expect(actual).toBe(expected)
 *   Assert.assertTrue(str.contains(x))    = expect(str).toContain(x)
 *
 * Note: "the user should see an error message" step in checkout.feature
 * is handled by checkoutPage.getErrorMessage() — the step is shared with
 * LoginSteps.java in Cucumber but maps directly here in Playwright.
 */

import { test, expect } from '@playwright/test';
import { LoginPage }    from '../src/login.page';
import { ProductsPage } from '../src/products.page';
import { CartPage }     from '../src/cart.page';
import { CheckoutPage } from '../src/checkout.page';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

// ---------------------------------------------------------------------------
// Background:
//   Given the user navigates to the login page
//   And the user logs in with username "standard_user" and password "secret_sauce"
//   And the user adds product number 1 to the cart
//   And the user goes to the cart
// ---------------------------------------------------------------------------
test.beforeEach(async ({ page }) => {
  const loginPage    = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.navigate(BASE_URL);
  await loginPage.login(USERNAME, PASSWORD);
  await productsPage.addProductToCartByIndex(0);  // product number 1
  await productsPage.goToCart();
});

// ---------------------------------------------------------------------------
// Feature: Checkout  @regression
// ---------------------------------------------------------------------------

test.describe('Checkout', () => {

  // -------------------------------------------------------------------------
  // @smoke
  // Scenario: Successful checkout with valid customer info
  //   When the user proceeds to checkout
  //   And the user enters customer info "John" "Doe" and postal code "12345"
  //   And the user completes the order
  //   Then the order confirmation message should be "Thank you for your order!"
  // -------------------------------------------------------------------------
  test('Successful checkout with valid customer info', async ({ page }) => {
    const cartPage     = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.clickCheckout();
    await checkoutPage.fillCustomerInfo('John', 'Doe', '12345');
    await checkoutPage.finishCheckout();

    expect(await checkoutPage.getConfirmationMessage()).toBe('Thank you for your order!');
  });

  // -------------------------------------------------------------------------
  // Scenario: Checkout total is displayed correctly
  //   When the user proceeds to checkout
  //   And the user enters customer info "Jane" "Smith" and postal code "90210"
  //   Then the order total should be "Total:"
  // -------------------------------------------------------------------------
  test('Checkout total is displayed correctly', async ({ page }) => {
    const cartPage     = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.clickCheckout();
    await checkoutPage.fillCustomerInfo('Jane', 'Smith', '90210');

    expect(await checkoutPage.getOrderTotal()).toContain('Total:');
  });

  // -------------------------------------------------------------------------
  // Scenario: Checkout fails when first name is missing
  //   When the user proceeds to checkout
  //   And the user enters customer info "" "Doe" and postal code "12345"
  //   Then the user should see an error message "Error: First Name is required"
  // -------------------------------------------------------------------------
  test('Checkout fails when first name is missing', async ({ page }) => {
    const cartPage     = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await cartPage.clickCheckout();
    await checkoutPage.fillCustomerInfo('', 'Doe', '12345');

    expect(await checkoutPage.getErrorMessage()).toBe('Error: First Name is required');
  });

});
