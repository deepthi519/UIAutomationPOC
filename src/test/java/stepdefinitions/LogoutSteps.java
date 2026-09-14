package stepdefinitions;

import factory.DriverFactory;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.testng.Assert;
import pages.LogoutPage;

/**
 * Step definitions for logout-related Cucumber scenarios.
 */
public class LogoutSteps {

    private LogoutPage logoutPage() {
        return new LogoutPage(DriverFactory.getDriver());
    }

    @When("the user opens the menu")
    public void theUserOpensTheMenu() {
        logoutPage().openMenu();
    }

    @When("the user clicks logout")
    public void theUserClicksLogout() {
        logoutPage().clickLogout();
    }

    @Then("the user should be redirected to the login page")
    public void theUserShouldBeRedirectedToLoginPage() {
        Assert.assertTrue(logoutPage().isLoginPageDisplayed(),
                "Login page was not displayed after logout");
    }

    @Then("the login page should be displayed")
    public void theLoginPageShouldBeDisplayed() {
        Assert.assertTrue(logoutPage().isLoginPageDisplayed(),
                "Login page was not displayed");
    }
}
