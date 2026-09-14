# UIAutomationPOC

A Java-based UI test automation framework using **Selenium 4**, **TestNG**, **Cucumber 7**, **ExtentReports 5**, and **Log4j2**.

## Stack

| Layer | Technology |
|-------|-----------|
| Browser automation | Selenium 4 + WebDriverManager |
| Test runner | TestNG 7 |
| BDD layer | Cucumber 7 (cucumber-testng) |
| Reports | ExtentReports 5 (Spark) |
| Logging | Log4j2 |
| Data | Jackson (JSON) |
| Build | Maven 3 |

## Project Structure

```
UIAutomationPOC/
├── pom.xml
├── testng.xml
├── src/main/java/
│   ├── pages/          # Page Object classes
│   ├── factory/        # DriverFactory (ThreadLocal WebDriver)
│   ├── utils/          # ConfigReader, WaitUtils, ScreenshotUtils, JsonReader
│   ├── constants/      # FrameworkConstants
│   └── reports/        # ExtentManager
└── src/test/
    ├── java/
    │   ├── runners/         # TestRunner (AbstractTestNGCucumberTests)
    │   ├── stepdefinitions/ # LoginSteps, CartSteps, CheckoutSteps
    │   └── hooks/           # Hooks (Before/After)
    └── resources/
        ├── features/        # login.feature, cart.feature, checkout.feature
        ├── config/          # config.properties
        ├── testdata/        # users.json, products.json
        └── log4j2.xml
```

## Prerequisites

- Java 11+
- Maven 3.8+
- Chrome or Firefox browser installed

## Running Tests

```bash
# Run all regression tests
mvn clean test

# Run only smoke tests (update testng.xml tag or @CucumberOptions tags)
mvn clean test -Dcucumber.filter.tags="@smoke"

# Run headless
mvn clean test -Dheadless=true
```

## Configuration

Edit [`src/test/resources/config/config.properties`](src/test/resources/config/config.properties):

```properties
base.url=https://www.saucedemo.com
browser=chrome          # chrome | firefox
headless=false
explicit.wait.seconds=10
```

## Reports

After a test run:
- **Extent HTML report** → `reports/ExtentReport.html`
- **Cucumber HTML report** → `reports/cucumber-report.html`
- **Log file** → `reports/automation.log`
- **Screenshots** (on failure) → `screenshots/`
