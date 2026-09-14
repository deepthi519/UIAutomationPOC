package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * Page object for the Login page.
 */
public class LoginPage extends BasePage {

    private By username =
            By.id("user-name");

    private By password =
            By.id("password");

    private By loginButton =
            By.id("login-button");

    private By errorMessage =
            By.cssSelector("h3");

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public void enterUsername(String user) {
        type(username, user);
    }

    public void enterPassword(String pwd) {
        type(password, pwd);
    }

    public void clickLogin() {
        click(loginButton);
    }

    public String getErrorMessage() {
        return getText(errorMessage);
    }

    /**
     * Enters credentials and submits the login form.
     *
     * @param user the username to enter
     * @param pwd  the password to enter
     */
    public void login(String user, String pwd) {
        enterUsername(user);
        enterPassword(pwd);
        clickLogin();
        // Wait until the page has settled after the login click:
        // — success path: URL moves to inventory.html
        // — failure path: error banner becomes visible
        new WebDriverWait(driver, Duration.ofSeconds(15)).until(
                ExpectedConditions.or(
                        ExpectedConditions.urlContains("inventory.html"),
                        ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-test='error']"))
                )
        );
    }

    /**
     * Returns true if the login button is displayed.
     *
     * @return visibility status of the login button
     */
    public boolean isLoginPageDisplayed() {
        return driver.findElement(loginButton).isDisplayed();
    }
}
