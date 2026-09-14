/**
 * login.page.ts
 *
 * Playwright TypeScript equivalent of LoginPage.java.
 *
 * Selenium → Playwright mapping:
 *   By.id("x")           → page.locator('#x')
 *   By.cssSelector("x")  → page.locator('x')
 *   type(locator, value)  → locator.fill(value)
 *   click(locator)        → locator.click()
 *   getText(locator)      → locator.textContent()
 *   WebDriverWait(15s)    → built-in auto-waiting (no explicit wait needed)
 *   urlContains(...)      → page.waitForURL(...)
 */

import { Page, Locator } from '@playwright/test';

export class LoginPage {
  // Locators — direct equivalent of private By fields in LoginPage.java
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton:   Locator;
  private readonly errorMessage:  Locator;

  constructor(private readonly page: Page) {
    // By.id("user-name")       → #user-name
    this.usernameInput = page.locator('#user-name');
    // By.id("password")        → #password
    this.passwordInput = page.locator('#password');
    // By.id("login-button")    → #login-button
    this.loginButton   = page.locator('#login-button');
    // By.cssSelector("h3")     → h3
    this.errorMessage  = page.locator('h3');
  }

  /** Navigates to the SauceDemo login page. Equivalent of driver.get(base.url). */
  async navigate(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
  }

  /** Fills the username field. Equivalent of enterUsername(). */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /** Fills the password field. Equivalent of enterPassword(). */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /** Clicks the Login button. Equivalent of clickLogin(). */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Fills credentials and submits the form, then waits for the page to settle.
   *
   * Equivalent of LoginPage.login() in Java.
   *
   * Playwright auto-waits for elements before interacting, so no explicit
   * WebDriverWait is needed for fill/click. The post-click wait below mirrors
   * the Selenium waitUntil(urlContains || errorVisible) pattern.
   *
   * — success: waits for URL to contain "inventory.html"
   * — failure: error banner is already in DOM and visible immediately
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();

    // Wait for either outcome to settle (15 s timeout, same as Selenium)
    await Promise.race([
      this.page.waitForURL('**/inventory.html', { timeout: 15_000 }),
      this.errorMessage.waitFor({ state: 'visible', timeout: 15_000 }),
    ]).catch(() => {
      // If neither resolves, the test assertion below will fail with a clear message
    });
  }

  /**
   * Returns the text of the error message banner.
   * Equivalent of getErrorMessage().
   */
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return (await this.errorMessage.textContent()) ?? '';
  }

  /**
   * Returns true if the login button is visible (i.e. we are on the login page).
   * Equivalent of isLoginPageDisplayed().
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    return this.loginButton.isVisible();
  }

  /**
   * Returns true if the current URL contains "inventory.html"
   * (i.e. login was successful and products page is loaded).
   * Equivalent of productsPage.isProductsPageDisplayed() after login.
   */
  async isOnProductsPage(): Promise<boolean> {
    return this.page.url().includes('inventory.html');
  }
}
