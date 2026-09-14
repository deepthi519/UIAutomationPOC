package stepdefinitions;

import factory.DriverFactory;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.testng.Assert;
import pages.CartPage;
import pages.CheckoutPage;

/**
 * Step definitions for checkout-related Cucumber scenarios.
 */
public class CheckoutSteps {

    private CartPage cartPage() {
        return new CartPage(DriverFactory.getDriver());
    }

    private CheckoutPage checkoutPage() {
        return new CheckoutPage(DriverFactory.getDriver());
    }

    @When("the user proceeds to checkout")
    public void theUserProceedsToCheckout() {
        cartPage().clickCheckout();
    }

    @When("the user enters customer info {string} {string} and postal code {string}")
    public void theUserEntersCustomerInfo(String firstName, String lastName, String postalCode) {
        checkoutPage().fillCustomerInfo(firstName, lastName, postalCode);
    }

    @When("the user completes the order")
    public void theUserCompletesTheOrder() {
        checkoutPage().finishCheckout();
    }

    @Then("the order confirmation message should be {string}")
    public void theOrderConfirmationMessageShouldBe(String expectedMessage) {
        Assert.assertEquals(checkoutPage().getConfirmationMessage(), expectedMessage);
    }

    @Then("the order total should be {string}")
    public void theOrderTotalShouldBe(String expectedTotal) {
        CheckoutPage cp = checkoutPage();
        Assert.assertTrue(cp.getOrderTotal().contains(expectedTotal),
                "Order total mismatch. Actual: " + cp.getOrderTotal());
    }

    @Then("the user should see a checkout error {string}")
    public void theUserShouldSeeACheckoutError(String expectedError) {
        Assert.assertEquals(checkoutPage().getErrorMessage(), expectedError);
    }
}
