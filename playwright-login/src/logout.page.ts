/**
 * logout.page.ts
 * Playwright TypeScript equivalent of LogoutPage.java.
 *
 * Selenium to Playwright locator mapping:
 *   By.id("react-burger-menu-btn") = page.locator('#react-burger-menu-btn')
 *   By.id("logout_sidebar_link")   = page.locator('#logout_sidebar_link')
 *   By.id("login-button")          = page.locator('#login-button')
 *
 *   click(menuButton)               = menuButton.click()
 *   WebDriverWait elementToBeClickable(logoutLink).click() =
 *     logoutLink.waitFor({ state: 'visible' }) then click()
 *   waitForElement(loginButton).isDisplayed() = loginButton.isVisible()
 */

import { Page, Locator } from '@playwright/test';

export class LogoutPage {
  private readonly menuButton:  Locator;
  private readonly logoutLink:  Locator;
  private readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    // By.id("react-burger-menu-btn")
    this.menuButton  = page.locator('#react-burger-menu-btn');
    // By.id("logout_sidebar_link")
    this.logoutLink  = page.locator('#logout_sidebar_link');
    // By.id("login-button")
    this.loginButton = page.locator('#login-button');
  }

  /**
   * Opens the burger side menu.
   * Equivalent of openMenu() / click(menuButton).
   */
  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  /**
   * Clicks the Logout link in the side menu.
   * Equivalent of clickLogout() with WebDriverWait elementToBeClickable.
   * waitFor({ state: 'visible' }) replaces the Selenium explicit wait —
   * the side-menu animates open before the link becomes interactable.
   */
  async clickLogout(): Promise<void> {
    await this.logoutLink.waitFor({ state: 'visible' });
    await this.logoutLink.click();
  }

  /**
   * Returns true if the login page button is visible.
   * Equivalent of isLoginPageDisplayed() / waitForElement(loginButton).isDisplayed().
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    await this.loginButton.waitFor({ state: 'visible' });
    return this.loginButton.isVisible();
  }
}
