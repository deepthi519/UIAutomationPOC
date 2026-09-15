/**
 * cart.page.ts
 * Playwright TypeScript equivalent of CartPage.java.
 *
 * Selenium to Playwright locator mapping:
 *   By.cssSelector(".cart_item")           = page.locator('.cart_item')
 *   By.id("checkout")                      = page.locator('#checkout')
 *   By.id("continue-shopping")             = page.locator('#continue-shopping')
 *   By.cssSelector(".inventory_item_name") = page.locator('.inventory_item_name')
 *   By.cssSelector("[data-test^='remove']")= page.locator("[data-test^='remove']")
 *
 *   driver.findElements(cartItems).size()  = locator.count() (after waitFor)
 *   driver.findElements(itemNames).stream().map(getText) = locator.allTextContents()
 */

import { Page, Locator } from '@playwright/test';

export class CartPage {
  // Locators - direct equivalent of private By fields in CartPage.java
  private readonly cartItems:     Locator;
  private readonly checkoutBtn:   Locator;
  private readonly continueBtn:   Locator;
  private readonly itemNames:     Locator;
  private readonly removeButtons: Locator;

  constructor(private readonly page: Page) {
    // By.cssSelector(".cart_item")
    this.cartItems    = page.locator('.cart_item');
    // By.id("checkout")
    this.checkoutBtn  = page.locator('#checkout');
    // By.id("continue-shopping")
    this.continueBtn  = page.locator('#continue-shopping');
    // By.cssSelector(".inventory_item_name")
    this.itemNames    = page.locator('.inventory_item_name');
    // By.cssSelector("[data-test^='remove']")
    this.removeButtons = page.locator("[data-test^='remove']");
  }

  /**
   * Returns true if at least one cart item is present.
   * Equivalent of isCartPageDisplayed() / !driver.findElements(cartItems).isEmpty().
   */
  async isCartPageDisplayed(): Promise<boolean> {
    return (await this.cartItems.count()) > 0;
  }

  /**
   * Returns the count of items in the cart.
   * Equivalent of getCartItemCount() / driver.findElements(cartItems).size().
   * waitFor() is needed before count() because count() does not auto-wait.
   * If the cart is empty, count() returns 0 immediately — no waitFor needed.
   */
  async getCartItemCount(): Promise<number> {
    const count = await this.cartItems.count();
    if (count === 0) return 0;
    return count;
  }

  /**
   * Returns names of all items currently in the cart.
   * Equivalent of getCartItemNames() using stream().map(WebElement::getText).
   * allTextContents() collects text from every matching element at once.
   */
  async getCartItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  /**
   * Removes the first item from the cart.
   * Equivalent of removeFirstItem().
   */
  async removeFirstItem(): Promise<void> {
    const count = await this.removeButtons.count();
    if (count > 0) {
      await this.removeButtons.first().click();
    }
  }

  /**
   * Clicks the Checkout button.
   * Equivalent of clickCheckout().
   */
  async clickCheckout(): Promise<void> {
    await this.checkoutBtn.click();
  }

  /**
   * Clicks the Continue Shopping button.
   * Equivalent of continueShopping().
   */
  async continueShopping(): Promise<void> {
    await this.continueBtn.click();
  }
}
