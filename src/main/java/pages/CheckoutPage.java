package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page object for the Checkout flow (info, overview, and confirmation steps).
 */
public class CheckoutPage extends BasePage {

    // Step One — customer info
    private By firstNameField  = By.id("first-name");
    private By lastNameField   = By.id("last-name");
    private By postalCodeField = By.id("postal-code");
    private By continueButton  = By.id("continue");

    // Step Two — overview
    private By finishButton = By.id("finish");
    private By totalLabel   = By.cssSelector(".summary_total_label");

    // Confirmation
    private By confirmationHeader = By.cssSelector(".complete-header");
    private By errorMessage       = By.cssSelector("[data-test='error']");

    public CheckoutPage(WebDriver driver) {
        super(driver);
    }

    /**
     * Fills in customer information and proceeds to the overview step.
     *
     * @param firstName  customer first name
     * @param lastName   customer last name
     * @param postalCode shipping postal code
     */
    public void fillCustomerInfo(String firstName, String lastName, String postalCode) {
        type(firstNameField, firstName);
        type(lastNameField, lastName);
        type(postalCodeField, postalCode);
        click(continueButton);
    }

    /**
     * Clicks the Finish button on the overview step.
     */
    public void finishCheckout() {
        click(finishButton);
    }

    /**
     * Returns the order total label text.
     *
     * @return total label string
     */
    public String getOrderTotal() {
        return getText(totalLabel);
    }

    /**
     * Returns the confirmation header text after a successful order.
     *
     * @return confirmation header string
     */
    public String getConfirmationMessage() {
        return getText(confirmationHeader);
    }

    /**
     * Returns the error message text shown on validation failure.
     *
     * @return error message string
     */
    public String getErrorMessage() {
        return getText(errorMessage);
    }
}
