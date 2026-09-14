package factory;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import utils.ConfigReader;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

/**
 * Creates and manages a thread-local WebDriver instance.
 */
public class DriverFactory {

    private static final ThreadLocal<WebDriver> driverThreadLocal = new ThreadLocal<>();

    /**
     * Initialises the WebDriver for the given browser.
     *
     * @param browser browser name: "chrome" or "firefox"
     */
    public static void initDriver(String browser) {
        WebDriver driver;
        switch (browser.toLowerCase()) {
            case "firefox" -> {
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions options = new FirefoxOptions();
                if (Boolean.parseBoolean(ConfigReader.get("headless"))) {
                    options.addArguments("--headless");
                }
                driver = new FirefoxDriver(options);
            }
            default -> {
                WebDriverManager.chromedriver().setup();
                ChromeOptions options = new ChromeOptions();
                if (Boolean.parseBoolean(ConfigReader.get("headless"))) {
                    options.addArguments("--headless=new");
                }
                options.addArguments("--start-maximized");
                // Disable password manager + breach-detection dialog.
                // Must use a mutable HashMap — setExperimentalOption requires
                // a serialisable map and silently ignores immutable Map.of().
                Map<String, Object> prefs = new HashMap<>();
                prefs.put("credentials_enable_service", false);
                prefs.put("profile.password_manager_enabled", false);
                prefs.put("profile.password_manager_leak_detection", false);
                options.setExperimentalOption("prefs", prefs);
                // Belt-and-suspenders: also suppress via command-line flag
                options.addArguments("--disable-features=PasswordLeakDetection");
                driver = new ChromeDriver(options);
            }
        }
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
        driverThreadLocal.set(driver);
    }

    /**
     * Returns the WebDriver for the current thread.
     *
     * @return active WebDriver instance
     */
    public static WebDriver getDriver() {
        return driverThreadLocal.get();
    }

    /**
     * Quits the WebDriver and removes it from the thread-local store.
     * Swallows any exception thrown by quit() so that a crashed browser
     * never leaves the ThreadLocal dirty for the next scenario.
     */
    public static void quitDriver() {
        WebDriver driver = driverThreadLocal.get();
        if (driver != null) {
            try {
                driver.quit();
            } catch (Exception ignored) {
                // browser may have already closed (e.g. crash or session timeout)
            } finally {
                driverThreadLocal.remove();
            }
        }
    }
}
