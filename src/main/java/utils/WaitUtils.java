package utils;

import factory.DriverFactory;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * Centralised explicit-wait helpers.
 */
public class WaitUtils {

    private static final int DEFAULT_TIMEOUT = Integer.parseInt(
            ConfigReader.get("explicit.wait.seconds"));

    /**
     * Waits until the element located by the given By is visible.
     *
     * @param locator the By locator
     * @return the visible WebElement
     */
    public static WebElement waitForElementVisible(By locator) {
        WebDriverWait wait = new WebDriverWait(
                DriverFactory.getDriver(), Duration.ofSeconds(DEFAULT_TIMEOUT));
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    /**
     * Waits until the element located by the given By is clickable.
     *
     * @param locator the By locator
     * @return the clickable WebElement
     */
    public static WebElement waitForElementClickable(By locator) {
        WebDriverWait wait = new WebDriverWait(
                DriverFactory.getDriver(), Duration.ofSeconds(DEFAULT_TIMEOUT));
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    /**
     * Waits until the element located by the given By is invisible.
     *
     * @param locator the By locator
     */
    public static void waitForElementInvisible(By locator) {
        WebDriverWait wait = new WebDriverWait(
                DriverFactory.getDriver(), Duration.ofSeconds(DEFAULT_TIMEOUT));
        wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    /**
     * Pauses execution for the given number of milliseconds (use sparingly).
     *
     * @param ms milliseconds to sleep
     */
    public static void hardWait(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
