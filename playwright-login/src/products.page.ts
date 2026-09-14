/**
 * products.page.ts
 * Playwright TypeScript equivalent of ProductsPage.java.
 *
 * Selenium to Playwright locator mapping:
 *   By.cssSelector(".title")                        = page.locator('.title')
 *   By.cssSelector(".inventory_item")               = page.locator('.inventory_item')
 *   By.cssSelector("[data-test^='add-to-cart']")    = page.locator("[data-test^='add-to-cart']")
 *   By.cssSelector(".shopping_cart_link")           = page.locator('.shopping_cart_link')
 *   By.className("shopping_cart_badge")             = page.locator('.shopping_cart_badge')
 *   By.cssSelector("select.product_sort_container") = page.locator('select.product_sort_container')
 *
 *   getText(locator)                   = locator.textContent()
 *   WebDriverWait presence             = Playwright auto-waits; no explicit wait needed
 *   new Select().selectByVisibleText() = locator.selectOption({ label })
 *   urlContains("cart.html")           = page.waitForURL('** /cart.html')
 */

import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  // Locators - direct equivalent of private By fields in ProductsPage.java
  private readonly pageTitle:    Locator;
  private readonly productItems: Locator;
  private readonly addToCartBtn: Locator;
  private readonly cartIcon:     Locator;
  private readonly cartBadge:    Locator;
  private readonly sortDropdown: Locator;

  constructor(private readonly page: Page) {
    // By.cssSelector(".title")
    this.pageTitle    = page.locator('.title');
    // By.cssSelector(".inventory_item")
    this.productItems = page.locator('.inventory_item');
    // By.cssSelector("[data-test^='add-to-cart']")
    this.addToCartBtn = page.locator("[data-test^='add-to-cart']");
    // By.cssSelector(".shopping_cart_link")
    this.cartIcon     = page.locator('.shopping_cart_link');
    // By.className("shopping_cart_badge")
    this.cartBadge    = page.locator('.shopping_cart_badge');
    // By.cssSelector("select.product_sort_container")
    this.sortDropdown = page.locator('select.product_sort_container');
  }

  /**
   * Returns the page title text.
   * Equivalent of getPageTitle() / getText(pageTitle).
   */
  async getPageTitle(): Promise<string> {
    return (await this.pageTitle.textContent()) ?? '';
  }

  /**
   * Returns true if the products page title element is visible.
   * Equivalent of isProductsPageDisplayed().
   */
  async isProductsPageDisplayed(): Promise<boolean> {
    return this.pageTitle.isVisible();
  }

  /**
   * Returns the count of product items on the page.
   * Equivalent of getAllProducts().size().
   * waitFor() ensures at least one item is present before count() is called —
   * count() returns immediately without waiting unlike other Playwright actions.
   */
  async getProductCount(): Promise<number> {
    await this.productItems.first().waitFor({ state: 'visible' });
    return this.productItems.count();
  }

  /**
   * Adds the product at the given 0-based index to the cart.
   * Equivalent of addProductToCartByIndex(index).
   * Playwright auto-waits for buttons to appear - no explicit wait needed.
   */
  async addProductToCartByIndex(index: number): Promise<void> {
    await this.addToCartBtn.nth(index).click();
  }

  /**
   * Clicks the cart icon and waits for cart.html to load.
   * Equivalent of goToCart().
   */
  async goToCart(): Promise<void> {
    await this.cartIcon.click();
    await this.page.waitForURL('**/cart.html', { timeout: 10_000 });
  }

  /**
   * Returns the cart badge count as a number (0 if badge is not shown).
   * Equivalent of getCartCount().
   */
  async getCartCount(): Promise<number> {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    const text = (await this.cartBadge.textContent()) ?? '0';
    return parseInt(text, 10);
  }

  /**
   * Selects a sort option by its visible label text.
   * Equivalent of sortProducts(option).
   * Playwright's selectOption({ label }) replaces Selenium's
   * new Select(el).selectByVisibleText().
   */
  async sortProducts(option: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
  }
}
