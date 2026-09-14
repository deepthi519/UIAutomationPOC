package stepdefinitions;

import factory.DriverFactory;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.testng.Assert;
import pages.CartPage;
import pages.ProductsPage;

/**
 * Step definitions for cart-related Cucumber scenarios.
 */
public class CartSteps {

    // Resolved fresh per step — never captured at field-init time.
    // Cucumber reuses step-def instances across scenarios; @Before replaces
    // the driver each time, so a field captured at construction holds a
    // stale (already-quit) driver for every scenario after the first.
    private ProductsPage productsPage() {
        return new ProductsPage(DriverFactory.getDriver());
    }

    private CartPage cartPage() {
        return new CartPage(DriverFactory.getDriver());
    }

    @When("the user adds product number {int} to the cart")
    public void theUserAddsProductToCart(int index) {
        productsPage().addProductToCartByIndex(index - 1);
    }

    @When("the user goes to the cart")
    public void theUserGoesToTheCart() {
        productsPage().goToCart();
    }

    @When("the user removes the first item from the cart")
    public void theUserRemovesFirstItemFromCart() {
        cartPage().removeFirstItem();
    }

    @Then("the cart should contain {int} item\\(s)")
    public void theCartShouldContainItems(int expectedCount) {
        Assert.assertEquals(cartPage().getCartItemCount(), expectedCount,
                "Cart item count mismatch");
    }

    @Then("the cart should contain the product {string}")
    public void theCartShouldContainProduct(String productName) {
        Assert.assertTrue(cartPage().getCartItemNames().contains(productName),
                "Product not found in cart: " + productName);
    }

    @Then("the cart should be empty")
    public void theCartShouldBeEmpty() {
        Assert.assertEquals(cartPage().getCartItemCount(), 0,
                "Expected cart to be empty");
    }
}
