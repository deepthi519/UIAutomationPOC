package utils;

import constants.FrameworkConstants;
import factory.DriverFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Captures and saves screenshots to the screenshots directory.
 */
public class ScreenshotUtils {

    private static final Logger log = LogManager.getLogger(ScreenshotUtils.class);

    /**
     * Takes a screenshot and saves it as {@code <name>_<timestamp>.png}.
     *
     * @param name descriptive name for the screenshot file
     * @return absolute path of the saved file, or empty string on failure
     */
    public static String takeScreenshot(String name) {
        try {
            String timestamp = LocalDateTime.now()
                    .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String fileName = name + "_" + timestamp + ".png";
            Path screenshotsDir = Paths.get(FrameworkConstants.SCREENSHOTS_DIR);
            Files.createDirectories(screenshotsDir);

            File src = ((TakesScreenshot) DriverFactory.getDriver())
                    .getScreenshotAs(OutputType.FILE);
            File dest = screenshotsDir.resolve(fileName).toFile();
            Files.copy(src.toPath(), dest.toPath());

            log.info("Screenshot saved: {}", dest.getAbsolutePath());
            return dest.getAbsolutePath();
        } catch (IOException e) {
            log.error("Failed to capture screenshot: {}", e.getMessage());
            return "";
        }
    }
}
