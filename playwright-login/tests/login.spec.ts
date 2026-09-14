/**
 * login.spec.ts
 *
 * Playwright TypeScript equivalent of:
 *   - login.feature  (scenario definitions)
 *   - LoginSteps.java (step implementations)
 *
 * Every scenario from login.feature is represented as a test() block.
 * The feature Background ("the user navigates to the login page") is
 * handled by the beforeEach() hook, mirroring Hooks.java @Before.
 *
 * Selenium/Cucumber → Playwright mapping:
 *   @Before setUp()          → test.beforeEach()
 *   @After  tearDown()       → test.afterEach() + screenshot-on-failure (playwright.config.ts)
 *   Assert.assertTrue(...)   → expect(...).toBeTruthy()
 *   Assert.assertEquals(...) → expect(...).toBe(...)
 *   Scenario Outline         → for...of loop with test.each / manual parametrize
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/login.page';

const BASE_URL = 'https://www.saucedemo.com';

// ---------------------------------------------------------------------------
// Equivalent of Hooks.java @Before — navigates to login page before each test
// ---------------------------------------------------------------------------
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate(BASE_URL);
});

// ---------------------------------------------------------------------------
// Feature: Login
// @regression @smoke
// ---------------------------------------------------------------------------

test.describe('Login', () => {

  // -------------------------------------------------------------------------
  // @smoke
  // Scenario: Successful login with valid credentials
  // -------------------------------------------------------------------------
  test('Successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // When the user logs in with username "standard_user" and password "secret_sauce"
    await loginPage.login('standard_user', 'secret_sauce');

    // Then the user should be on the products page
    expect(await loginPage.isOnProductsPage()).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // Scenario: Failed login with invalid password
  // -------------------------------------------------------------------------
  test('Failed login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // When the user logs in with username "standard_user" and password "wrong_password"
    await loginPage.login('standard_user', 'wrong_password');

    // Then the user should see an error message "..."
    expect(await loginPage.getErrorMessage()).toBe(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  // -------------------------------------------------------------------------
  // Scenario: Failed login with locked-out user
  // -------------------------------------------------------------------------
  test('Failed login with locked-out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('locked_out_user', 'secret_sauce');

    expect(await loginPage.getErrorMessage()).toBe(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  // -------------------------------------------------------------------------
  // Scenario: Failed login with blank username
  // -------------------------------------------------------------------------
  test('Failed login with blank username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', 'secret_sauce');

    expect(await loginPage.getErrorMessage()).toBe(
      'Epic sadface: Username is required'
    );
  });

  // -------------------------------------------------------------------------
  // Scenario: Failed login with blank password
  // -------------------------------------------------------------------------
  test('Failed login with blank password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('standard_user', '');

    expect(await loginPage.getErrorMessage()).toBe(
      'Epic sadface: Password is required'
    );
  });

  // -------------------------------------------------------------------------
  // Scenario Outline: Login with multiple user types
  //   | username       | password     |
  //   | standard_user  | secret_sauce |
  //   | problem_user   | secret_sauce |
  // -------------------------------------------------------------------------
  const multiUserCases = [
    { username: 'standard_user', password: 'secret_sauce' },
    { username: 'problem_user',  password: 'secret_sauce' },
  ];

  for (const { username, password } of multiUserCases) {
    test(`Login with multiple user types [${username}]`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.login(username, password);

      // Then the user should be on the products page
      expect(await loginPage.isOnProductsPage()).toBeTruthy();
    });
  }

});
