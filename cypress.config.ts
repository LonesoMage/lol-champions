import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents() {
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
})