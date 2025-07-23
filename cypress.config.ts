import { defineConfig } from "cypress";

export default defineConfig({
  screenshotsFolder: 'cypress/short-screens',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:4000'
  },
});
