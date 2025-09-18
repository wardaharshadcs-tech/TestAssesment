import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  retries: 1,
  use: {
    headless: false,
    browserName: "chromium",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    baseURL: "https://ask.permission.io",
  },
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  globalSetup: require.resolve("./tests/global-setup"),
});
