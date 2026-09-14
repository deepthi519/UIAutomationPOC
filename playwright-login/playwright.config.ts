import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory where test files are located
  testDir: './tests',

  // Run tests in parallel (one worker per scenario, mirrors Selenium's per-scenario browser)
  fullyParallel: false,
  workers: 1,

  // Retry once on CI, never locally
  retries: process.env.CI ? 1 : 0,

  // Reporters: list in console + HTML report (equivalent to ExtentReport)
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  use: {
    // Base URL — mirrors config.properties base.url
    baseURL: 'https://www.saucedemo.com',

    // Headed by default so you can watch; set --headed=false or CI=true for headless
    headless: false,

    // Equivalent to pageLoadTimeout(30s) in DriverFactory
    navigationTimeout: 30_000,

    // Equivalent to WebDriverWait(10s) in BasePage
    actionTimeout: 10_000,

    // Suppress Chrome's password-manager dialogs (same as DriverFactory prefs)
    launchOptions: {
      args: [
        '--disable-features=PasswordLeakDetection',
      ],
    },
    contextOptions: {
      // Disables save-password prompts
      storageState: undefined,
    },

    // Capture screenshot on failure (equivalent to ScreenshotUtils in @After hook)
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'off',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        // Do NOT spread devices['Desktop Chrome'] — it sets deviceScaleFactor
        // which is incompatible with a null viewport (maximised window).
        channel: 'chrome',
        headless: false,
        launchOptions: {
          args: [
            '--start-maximized',
            '--disable-features=PasswordLeakDetection',
            '--disable-save-password-bubble',
          ],
        },
        ignoreHTTPSErrors: true,
      },
    },
  ],
});
