package reports;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;
import constants.FrameworkConstants;

import java.io.File;

/**
 * Manages a singleton ExtentReports instance and thread-local test nodes.
 */
public class ExtentManager {

    private static ExtentReports extent;
    private static final ThreadLocal<ExtentTest> testThreadLocal = new ThreadLocal<>();

    /**
     * Returns (or initialises) the singleton ExtentReports instance.
     *
     * @return shared ExtentReports instance
     */
    public static ExtentReports getInstance() {
        if (extent == null) {
            new File(FrameworkConstants.REPORTS_DIR).mkdirs();
            ExtentSparkReporter spark = new ExtentSparkReporter(
                    FrameworkConstants.EXTENT_REPORT_PATH);
            spark.config().setTheme(Theme.STANDARD);
            spark.config().setDocumentTitle("UIAutomationPOC Report");
            spark.config().setReportName("Test Execution Report");
            extent = new ExtentReports();
            extent.attachReporter(spark);
            extent.setSystemInfo("OS", System.getProperty("os.name"));
            extent.setSystemInfo("Java", System.getProperty("java.version"));
        }
        return extent;
    }

    /**
     * Creates a new test node and stores it for the current thread.
     *
     * @param testName name of the test case
     * @return the created ExtentTest
     */
    public static ExtentTest createTest(String testName) {
        ExtentTest test = getInstance().createTest(testName);
        testThreadLocal.set(test);
        return test;
    }

    /**
     * Returns the ExtentTest for the current thread.
     *
     * @return current thread's ExtentTest
     */
    public static ExtentTest getTest() {
        return testThreadLocal.get();
    }

    /**
     * Flushes all test results to the report file.
     */
    public static void flush() {
        if (extent != null) {
            extent.flush();
        }
    }
}
