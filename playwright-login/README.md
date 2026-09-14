# playwright-login

Playwright TypeScript POC — Login module migration from Selenium Java.

## Structure

```
playwright-login/
├── src/
│   └── login.page.ts        # Page Object (converted from LoginPage.java)
├── tests/
│   └── login.spec.ts        # Test spec  (converted from login.feature + LoginSteps.java)
├── playwright.config.ts     # Config (mirrors DriverFactory + config.properties)
├── package.json
└── tsconfig.json
```

## Selenium → Playwright Comparison

| Selenium / Cucumber (Java)         | Playwright (TypeScript)                   |
|------------------------------------|-------------------------------------------|
| `LoginPage.java`                   | `src/login.page.ts`                       |
| `LoginSteps.java` + `login.feature`| `tests/login.spec.ts`                     |
| `DriverFactory.initDriver()`       | `test.beforeEach({ page })`               |
| `DriverFactory.quitDriver()`       | Playwright auto-closes after each test    |
| `WebDriverWait(driver, 10s)`       | Built-in auto-waiting (no code needed)    |
| `By.id("x")`                       | `page.locator('#x')`                      |
| `By.cssSelector("x")`              | `page.locator('x')`                       |
| `element.sendKeys(value)`          | `locator.fill(value)`                     |
| `element.click()`                  | `locator.click()`                         |
| `Assert.assertEquals(a, b)`        | `expect(a).toBe(b)`                       |
| `Assert.assertTrue(x)`             | `expect(x).toBeTruthy()`                  |
| `Scenario Outline`                 | `for...of` loop over test cases           |
| `@Before` / `@After` hooks         | `test.beforeEach()` / `test.afterEach()`  |
| Screenshot on failure (Hooks.java) | `screenshot: 'only-on-failure'` in config |

## Setup

```bash
cd playwright-login
npm install
npx playwright install chromium
```

## Run

```bash
# Headless (CI mode)
npm test

# Headed (watch the browser)
npm run test:headed

# Open HTML report after run
npm run test:report
```

## Expected Output

```
  Login
    ✓ Successful login with valid credentials
    ✓ Failed login with invalid password
    ✓ Failed login with locked-out user
    ✓ Failed login with blank username
    ✓ Failed login with blank password
    ✓ Login with multiple user types [standard_user]
    ✓ Login with multiple user types [problem_user]

  7 passed
```

## Baseline Comparison

The Selenium baseline is tagged at `selenium-baseline-v1` in the parent project.
Once this Playwright suite passes 7/7, it becomes the Playwright baseline for
the remaining module migrations (Products, Cart, Checkout, Logout).
