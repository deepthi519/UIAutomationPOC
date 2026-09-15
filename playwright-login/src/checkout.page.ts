/**
 * checkout.page.ts
 * Playwright TypeScript equivalent of CheckoutPage.java.
 *
 * Selenium to Playwright locator mapping:
 *   By.id("first-name")                      = page.locator('#first-name')
 *   By.id("last-name")                        = page.locator('#last-name')
 *   By.id("postal-code")                      = page.locator('#postal-code')
 *   By.id("continue")                         = page.locator('#continue')
 *   By.id("finish")                           = page.locator('#finish')
 *   By.cssSelector(".summary_total_label")    = page.locator('.summary_total_label')
 *   By.cssSelector(".complete-header")        = page.locator('.complete-header')
 *   By.cssSelector("[data-test='error']")     = page.locator("[data-test='error']")
 *
 *   type(field, value) = locator.fill(value)
 *   click(button)      = locator.click()
 *   getText(locator)   = locator.textContent()
 */

import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  // Step One locators
  private readonly firstNameField:  Locator;
  private readonly lastNameField:   Locator;
  private readonly postalCodeField: Locator;
  private readonly continueBtn:     Locator;

  // Step Two locators
  private readonly finishBtn:   Locator;
  private readonly totalLabel:  Locator;

  // Confirmation / error locators
  private readonly confirmationHeader: Locator;
  private readonly errorMessage:       Locator;

  constructor(private readonly page: Page) {
    // By.id("first-name")
    this.firstNameField      = page.locator('#first-name');
    // By.id("last-name")
    this.lastNameField       = page.locator('#last-name');
    // By.id("postal-code")
    this.postalCodeField     = page.locator('#postal-code');
    // By.id("continue")
    this.continueBtn         = page.locator('#continue');
    // By.id("finish")
    this.finishBtn           = page.locator('#finish');
    // By.cssSelector(".summary_total_label")
    this.totalLabel          = page.locator('.summary_total_label');
    // By.cssSelector(".complete-header")
    this.confirmationHeader  = page.locator('.complete-header');
    // By.cssSelector("[data-test='error']")
    this.errorMessage        = page.locator("[data-test='error']");
  }

  /**
   * Fills in customer information and clicks Continue.
   * Equivalent of fillCustomerInfo(firstName, lastName, postalCode).
   * Playwright's fill() clears the field then types, matching BasePage.type().
   */
  async fillCustomerInfo(
    firstName:  string,
    lastName:   string,
    postalCode: string,
  ): Promise<void> {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
    await this.continueBtn.click();
  }

  /**
   * Clicks the Finish button on the order overview step.
   * Equivalent of finishCheckout().
   */
  async finishCheckout(): Promise<void> {
    await this.finishBtn.click();
  }

  /**
   * Returns the order total label text.
   * Equivalent of getOrderTotal() / getText(totalLabel).
   */
  async getOrderTotal(): Promise<string> {
    return (await this.totalLabel.textContent()) ?? '';
  }

  /**
   * Returns the confirmation header text after a successful order.
   * Equivalent of getConfirmationMessage() / getText(confirmationHeader).
   */
  async getConfirmationMessage(): Promise<string> {
    return (await this.confirmationHeader.textContent()) ?? '';
  }

  /**
   * Returns the error message text shown on validation failure.
   * Equivalent of getErrorMessage() / getText(errorMessage).
   */
  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? '';
  }
}
