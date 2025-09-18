import { FullConfig, chromium } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // 🚫 Block the API that triggers cookie banner
  await context.route("**/api/configs", route => route.abort());

  await browser.close();
}

export default globalSetup;
