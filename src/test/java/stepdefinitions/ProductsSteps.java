package stepdefinitions;

import factory.DriverFactory;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.testng.Assert;
import pages.ProductsPage;

/**
 * Step definitions for products-related Cucumber scenarios.
 */
public class ProductsSteps {

    // Do NOT capture the driver at field-init time — Cucumber may reuse this
    // class instance across scenarios while @Before replaces the driver each
    // time. Always resolve the page object fresh inside each step method.
    private ProductsPage page() {
        return new ProductsPage(DriverFactory.getDriver());
    }

    @Then("the products page title should be {string}")
    public void theProductsPageTitleShouldBe(String expectedTitle) {
        Assert.assertEquals(page().getPageTitle(), expectedTitle,
                "Products page title mismatch");
    }

    @Then("the products list should not be empty")
    public void theProductsListShouldNotBeEmpty() {
        Assert.assertFalse(page().getAllProducts().isEmpty(),
                "Products list was empty");
    }

    @When("the user sorts products by {string}")
    public void theUserSortsProductsBy(String sortOption) {
        page().sortProducts(sortOption);
    }
}
