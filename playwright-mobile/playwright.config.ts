import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  webServer: {
    command: 'npm --prefix ../Frontend run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  use: {
    headless: false,
    screenshot: 'on',
  },

  projects: [
    {
      name: 'iPhone 12',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Pixel 5',
      use: { ...devices['Pixel 5'] },
    },
  ],
});