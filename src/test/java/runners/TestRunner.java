package runners;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;
import org.testng.annotations.DataProvider;

/**
 * TestNG runner that wires Cucumber feature files to step definitions.
 */
@CucumberOptions(
        features = "src/test/resources/features",
        glue    = {"stepdefinitions", "hooks"},
        tags    = "@regression",
        plugin  = {
                "pretty",
                "html:reports/cucumber-report.html",
                "json:reports/cucumber-report.json"
        },
        monochrome = true
)
public class TestRunner extends AbstractTestNGCucumberTests {

    /**
     * Provides scenarios as a data set; parallel=true enables parallel scenario execution.
     *
     * @return 2D array of scenario objects
     */
    @Override
    @DataProvider(parallel = false)
    public Object[][] scenarios() {
        return super.scenarios();
    }
}
