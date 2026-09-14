package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;


/**
 * Page object for the Products listing page.
 */
public class ProductsPage extends BasePage {

    private By pageTitle    = By.cssSelector(".title");
    private By productItems = By.cssSelector(".inventory_item");
    private By addToCartBtn = By.cssSelector("[data-test^='add-to-cart']");
    private By cartIcon     = By.cssSelector(".shopping_cart_link");
    private By cartBadge    = By.className("shopping_cart_badge");
    private By sortDropdown = By.cssSelector("select.product_sort_container");

    public ProductsPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Returns the page title text.
     *
     * @return page title string
     */
    public String getPageTitle() {
        return getText(pageTitle);
    }

    /**
     * Returns true if the products page title is visible.
     *
     * @return visibility status
     */
    public boolean isProductsPageDisplayed() {
        return driver.findElement(pageTitle).isDisplayed();
    }

    /**
     * Returns all product item elements on the page.
     *
     * @return list of product WebElements
     */
    public List<WebElement> getAllProducts() {
        return driver.findElements(productItems);
    }

    /**
     * Adds the product at the given index (0-based) to the cart.
     *
     * @param index zero-based index of the product
     */
    public void addProductToCartByIndex(int index) {
        List<WebElement> buttons = new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.numberOfElementsToBeMoreThan(addToCartBtn, 0));
        System.out.println("[DEBUG] Add-to-cart buttons found: " + buttons.size());
        buttons.get(index).click();
    }

    /**
     * Navigates to the cart page and waits until cart.html is loaded.
     */
    public void goToCart() {
        click(cartIcon);
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.urlContains("cart.html"));
    }

    /**
     * Returns the cart badge count text.
     *
     * @return cart badge count string
     */
    public String getCartCount() {
        return getText(cartBadge);
    }

    /**
     * Selects a sort option by visible text.
     *
     * @param option the sort option text
     */
    public void sortProducts(String option) {
        // Use presenceOfElementLocated — the <select> is interactive before
        // Selenium considers it "visible" (visibilityOf checks size/display
        // which can lag behind DOM presence on React-rendered pages).
        WebElement dropdown = new WebDriverWait(driver, Duration.ofSeconds(15))
                .until(ExpectedConditions.presenceOfElementLocated(sortDropdown));
        new Select(dropdown).selectByVisibleText(option);
    }
}
