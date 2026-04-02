import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  testMatch: '**/mobile.test.js',
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
