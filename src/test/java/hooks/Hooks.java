package hooks;

import factory.DriverFactory;
import io.cucumber.java.After;
import io.cucumber.java.AfterAll;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import reports.ExtentManager;
import utils.ConfigReader;
import utils.ScreenshotUtils;

/**
 * Cucumber lifecycle hooks: driver setup/teardown and screenshot on failure.
 */
public class Hooks {

    /**
     * Initialises the WebDriver before each scenario.
     *
     * @param scenario the current Cucumber scenario
     */
    @Before
    public void setUp(Scenario scenario) {
        String browser = ConfigReader.get("browser");
        DriverFactory.initDriver(browser);
        ExtentManager.createTest(scenario.getName());
    }

    /**
     * Quits the driver after each scenario; captures a screenshot on failure.
     *
     * @param scenario the current Cucumber scenario
     */
    @After
    public void tearDown(Scenario scenario) {
        if (scenario.isFailed()) {
            String screenshotPath = ScreenshotUtils.takeScreenshot(scenario.getName());
            ExtentManager.getTest().fail("Scenario failed. Screenshot: " + screenshotPath);
        } else {
            ExtentManager.getTest().pass("Scenario passed.");
        }
        DriverFactory.quitDriver();
    }

    /** Flushes the Extent report after all scenarios have run. */
    @AfterAll
    public static void generateReport() {
        ExtentManager.flush();
    }
}
