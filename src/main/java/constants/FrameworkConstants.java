package constants;

/**
 * Central store for framework-wide path and timeout constants.
 */
public final class FrameworkConstants {

    private FrameworkConstants() {}

    /** Root directory for generated Extent HTML reports. */
    public static final String REPORTS_DIR = "reports/";

    /** Root directory for captured screenshots. */
    public static final String SCREENSHOTS_DIR = "screenshots/";

    /** Path to the Extent report HTML file. */
    public static final String EXTENT_REPORT_PATH = REPORTS_DIR + "ExtentReport.html";

    /** Default browser if none is specified in config.properties. */
    public static final String DEFAULT_BROWSER = "chrome";

    /** Prefix used to tag smoke-level tests. */
    public static final String SMOKE_TAG = "@smoke";

    /** Prefix used to tag regression-level tests. */
    public static final String REGRESSION_TAG = "@regression";
}
