/**
 * logout.spec.ts
 * Playwright TypeScript equivalent of logout.feature + LogoutSteps.java.
 *
 * Selenium/Cucumber to Playwright mapping:
 *   Background steps                          = test.beforeEach()
 *   logoutPage.openMenu()                    = logoutPage.openMenu()
 *   logoutPage.clickLogout()                 = logoutPage.clickLogout()
 *   Assert.assertTrue(isLoginPageDisplayed) = expect(result).toBe(true)
 */

import { test, expect } from '@playwright/test';
import { LoginPage }  from '../src/login.page';
import { LogoutPage } from '../src/logout.page';

const BASE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

// ---------------------------------------------------------------------------
// Background:
//   Given the user navigates to the login page
//   And the user logs in with username "standard_user" and password "secret_sauce"
// ---------------------------------------------------------------------------
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate(BASE_URL);
  await loginPage.login(USERNAME, PASSWORD);
});

// ---------------------------------------------------------------------------
// Feature: Logout  @regression
// ---------------------------------------------------------------------------

test.describe('Logout', () => {

  // -------------------------------------------------------------------------
  // @smoke
  // Scenario: Logout successfully
  //   When the user opens the menu
  //   And the user clicks logout
  //   Then the user should be redirected to the login page
  // -------------------------------------------------------------------------
  test('Logout successfully', async ({ page }) => {
    const logoutPage = new LogoutPage(page);

    await logoutPage.openMenu();
    await logoutPage.clickLogout();

    expect(await logoutPage.isLoginPageDisplayed()).toBe(true);
  });

  // -------------------------------------------------------------------------
  // Scenario: User is redirected to login page after logout
  //   When the user opens the menu
  //   And the user clicks logout
  //   Then the login page should be displayed
  // -------------------------------------------------------------------------
  test('User is redirected to login page after logout', async ({ page }) => {
    const logoutPage = new LogoutPage(page);

    await logoutPage.openMenu();
    await logoutPage.clickLogout();

    expect(await logoutPage.isLoginPageDisplayed()).toBe(true);
  });

});
