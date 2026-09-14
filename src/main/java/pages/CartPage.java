package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

/**
 * Page object for the Cart page.
 */
public class CartPage extends BasePage {

    private By cartItems              = By.cssSelector(".cart_item");
    private By checkoutButton         = By.id("checkout");
    private By continueShoppingButton = By.id("continue-shopping");
    private By itemNames              = By.cssSelector(".inventory_item_name");
    private By removeButtons          = By.cssSelector("[data-test^='remove']");

    public CartPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Returns true if the cart page is displayed.
     *
     * @return visibility status
     */
    public boolean isCartPageDisplayed() {
        return !driver.findElements(cartItems).isEmpty();
    }

    /**
     * Returns names of all items currently in the cart.
     *
     * @return list of item name strings
     */
    public List<String> getCartItemNames() {
        return driver.findElements(itemNames)
                .stream()
                .map(WebElement::getText)
                .toList();
    }

    /**
     * Returns the count of items in the cart.
     *
     * @return number of cart items
     */
    public int getCartItemCount() {
        return driver.findElements(cartItems).size();
    }

    /**
     * Removes the first item from the cart.
     */
    public void removeFirstItem() {
        List<WebElement> buttons = driver.findElements(removeButtons);
        if (!buttons.isEmpty()) {
            buttons.get(0).click();
        }
    }

    /**
     * Clicks the Checkout button.
     */
    public void clickCheckout() {
        click(checkoutButton);
    }

    /**
     * Clicks the Continue Shopping button.
     */
    public void continueShopping() {
        click(continueShoppingButton);
    }
}
