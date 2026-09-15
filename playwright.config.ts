/**
 * Root-level playwright.config.ts
 *
 * Allows "npx playwright test" to be run directly from the UIAutomationPOC/
 * root directory. Settings are kept in sync with playwright-login/playwright.config.ts.
 * We do NOT import playwright-login/playwright.config.ts here — doing so would
 * load the playwright-login/node_modules copy of @playwright/test a second time,
 * causing the "Requiring @playwright/test second time" conflict.
 */

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-login/tests',

  fullyParallel: false,
  workers: 1,

  retries: process.env.CI ? 1 : 0,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-login/playwright-report', open: 'never' }],
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: false,
    navigationTimeout: 30_000,
    actionTimeout: 10_000,
    launchOptions: {
      args: ['--disable-features=PasswordLeakDetection'],
    },
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'off',
  },

  projects: [
    {
      name: 'chromium',
      use: {
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
