package stepdefinitions;

import factory.DriverFactory;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.testng.Assert;
import pages.LoginPage;
import pages.ProductsPage;
import utils.ConfigReader;

/**
 * Step definitions for login-related Cucumber scenarios.
 */
public class LoginSteps {

    private LoginPage loginPage() {
        return new LoginPage(DriverFactory.getDriver());
    }

    private ProductsPage productsPage() {
        return new ProductsPage(DriverFactory.getDriver());
    }

    @Given("the user navigates to the login page")
    public void theUserNavigatesToTheLoginPage() {
        DriverFactory.getDriver().get(ConfigReader.get("base.url"));
    }

    @When("the user logs in with username {string} and password {string}")
    public void theUserLogsInWithCredentials(String username, String password) {
        loginPage().login(username, password);
        System.out.println("[DEBUG] Current URL after login: " + DriverFactory.getDriver().getCurrentUrl());
    }

    @Then("the user should be on the products page")
    public void theUserShouldBeOnTheProductsPage() {
        Assert.assertTrue(productsPage().isProductsPageDisplayed(),
                "Products page was not displayed after login");
    }

    @Then("the user should see an error message {string}")
    public void theUserShouldSeeAnErrorMessage(String expectedError) {
        Assert.assertEquals(loginPage().getErrorMessage(), expectedError);
    }
}
