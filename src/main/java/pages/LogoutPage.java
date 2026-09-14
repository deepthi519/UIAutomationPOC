package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * Page object for the navigation menu and logout action.
 */
public class LogoutPage extends BasePage {

    private By menuButton  = By.id("react-burger-menu-btn");
    private By logoutLink  = By.id("logout_sidebar_link");
    private By loginButton = By.id("login-button");

    public LogoutPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Opens the burger menu.
     */
    public void openMenu() {
        click(menuButton);
    }

    /**
     * Clicks the Logout link in the side menu.
     * Waits for the side-menu animation to complete before clicking.
     */
    public void clickLogout() {
        new WebDriverWait(driver, Duration.ofSeconds(10))
                .until(ExpectedConditions.elementToBeClickable(logoutLink))
                .click();
    }

    /**
     * Returns true if the login button is visible (i.e. user is on login page).
     *
     * @return login page visibility status
     */
    public boolean isLoginPageDisplayed() {
        return waitForElement(loginButton).isDisplayed();
    }
}
