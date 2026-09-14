/**
 * products.spec.ts
 * Playwright TypeScript equivalent of products.feature + ProductsSteps.java.
 *
 * Selenium/Cucumber to Playwright mapping:
 *   Background steps          = test.beforeEach()
 *   Assert.assertEquals(a, b) = expect(a).toBe(b)
 *   Assert.assertFalse(x)     = expect(n).toBeGreaterThan(0)
 */

import { test, expect } from '@playwright/test';
import { LoginPage }    from '../src/login.page';
import { ProductsPage } from '../src/products.page';

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
// Feature: Products  @regression
// ---------------------------------------------------------------------------

test.describe('Products', () => {

  // -------------------------------------------------------------------------
  // @smoke
  // Scenario: Products page is displayed after login
  //   Then the products page title should be "Products"
  // -------------------------------------------------------------------------
  test('Products page is displayed after login', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    expect(await productsPage.getPageTitle()).toBe('Products');
  });

  // -------------------------------------------------------------------------
  // Scenario: Products list is not empty
  //   Then the products list should not be empty
  // -------------------------------------------------------------------------
  test('Products list is not empty', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    expect(await productsPage.getProductCount()).toBeGreaterThan(0);
  });

  // -------------------------------------------------------------------------
  // Scenario: Sort products A to Z
  //   When the user sorts products by "Name (A to Z)"
  //   Then the products page title should be "Products"
  // -------------------------------------------------------------------------
  test('Sort products A to Z', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortProducts('Name (A to Z)');

    expect(await productsPage.getPageTitle()).toBe('Products');
  });

  // -------------------------------------------------------------------------
  // Scenario: Sort products Z to A
  //   When the user sorts products by "Name (Z to A)"
  //   Then the products page title should be "Products"
  // -------------------------------------------------------------------------
  test('Sort products Z to A', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortProducts('Name (Z to A)');

    expect(await productsPage.getPageTitle()).toBe('Products');
  });

  // -------------------------------------------------------------------------
  // Scenario: Sort products by price low to high
  //   When the user sorts products by "Price (low to high)"
  //   Then the products page title should be "Products"
  // -------------------------------------------------------------------------
  test('Sort products by price low to high', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortProducts('Price (low to high)');

    expect(await productsPage.getPageTitle()).toBe('Products');
  });

  // -------------------------------------------------------------------------
  // Scenario: Sort products by price high to low
  //   When the user sorts products by "Price (high to low)"
  //   Then the products page title should be "Products"
  // -------------------------------------------------------------------------
  test('Sort products by price high to low', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortProducts('Price (high to low)');

    expect(await productsPage.getPageTitle()).toBe('Products');
  });

});
