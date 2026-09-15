/**
 * cart.spec.ts
 * Playwright TypeScript equivalent of cart.feature + CartSteps.java.
 *
 * Selenium/Cucumber to Playwright mapping:
 *   Background steps              = test.beforeEach()
 *   @When add product number N    = productsPage.addProductToCartByIndex(N - 1)
 *   @When goes to the cart        = productsPage.goToCart()
 *   @When removes first item      = cartPage.removeFirstItem()
 *   Assert.assertEquals(count, N) = expect(count).toBe(N)
 *   Assert.assertTrue(contains)   = expect(names).toContain(name)
 */

import { test, expect } from '@playwright/test';
import { LoginPage }    from '../src/login.page';
import { ProductsPage } from '../src/products.page';
import { CartPage }     from '../src/cart.page';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

// ---------------------------------------------------------------------------
// Background: navigate to login page + login as standard_user
// Equivalent of Hooks.java @Before + feature Background steps
// ---------------------------------------------------------------------------
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate(BASE_URL);
  await loginPage.login(USERNAME, PASSWORD);
});

// ---------------------------------------------------------------------------
// Feature: Shopping Cart  @regression
// ---------------------------------------------------------------------------

test.describe('Shopping Cart', () => {

  // -------------------------------------------------------------------------
  // @smoke
  // Scenario: Add a single item to the cart
  //   When the user adds product number 1 to the cart
  //   And the user goes to the cart
  //   Then the cart should contain 1 item(s)
  // -------------------------------------------------------------------------
  test('Add a single item to the cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage     = new CartPage(page);

    await productsPage.addProductToCartByIndex(0);  // product number 1 (0-based index)
    await productsPage.goToCart();

    expect(await cartPage.getCartItemCount()).toBe(1);
  });

  // -------------------------------------------------------------------------
  // Scenario: Add multiple items to the cart
  //   When the user adds product number 1 to the cart
  //   And the user adds product number 2 to the cart
  //   And the user goes to the cart
  //   Then the cart should contain 2 item(s)
  // -------------------------------------------------------------------------
  test('Add multiple items to the cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage     = new CartPage(page);

    await productsPage.addProductToCartByIndex(0);  // product number 1
    await productsPage.addProductToCartByIndex(1);  // product number 2
    await productsPage.goToCart();

    expect(await cartPage.getCartItemCount()).toBe(2);
  });

  // -------------------------------------------------------------------------
  // Scenario: Cart shows correct product name
  //   When the user adds product number 1 to the cart
  //   And the user goes to the cart
  //   Then the cart should contain the product "Sauce Labs Backpack"
  // -------------------------------------------------------------------------
  test('Cart shows correct product name', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage     = new CartPage(page);

    await productsPage.addProductToCartByIndex(0);  // product number 1 = Sauce Labs Backpack
    await productsPage.goToCart();

    const names = await cartPage.getCartItemNames();
    expect(names).toContain('Sauce Labs Backpack');
  });

});
