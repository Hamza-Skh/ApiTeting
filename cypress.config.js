const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: false,
    json: true,
  },
  env: {
    Url: "https://gorest.co.in/public/v2/",
    token: "Bearer 89c07163b5071631e58aa5ef2f9ff924493b40d7c85dc49c43cb6b352b3f8fc5",
  },
});

