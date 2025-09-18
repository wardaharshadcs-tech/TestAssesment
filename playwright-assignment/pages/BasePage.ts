import { Page, expect, test } from "@playwright/test";

const CAPTCHA_MODE = process.env.CAPTCHA_MODE || "manual";
// Give user up to 4 minutes (240000 ms) to solve captcha
const CAPTCHA_TIMEOUT = parseInt(process.env.CAPTCHA_TIMEOUT || "240000", 10);

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async isVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async click(selector: string) {
    await this.page.locator(selector).click();
  }

  async type(selector: string, text: string) {
    await this.page.locator(selector).fill(text);
  }

  async getText(selector: string): Promise<string> {
    return this.page.locator(selector).innerText();
  }

  // ✅ Cookie popup
  async handleCookiePopup() {
    const acceptBtn = this.page.getByRole("button", { name: "Accept" });
    if (await acceptBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      console.log("🍪 Cookie popup detected → accepting...");
      await acceptBtn.click();
    }
  }

  // ✅ Captcha handler (global, up to 4 minutes)
  async handleCaptcha(stage: string) {
    const captchaCheckbox = this.page
      .frameLocator("iframe[title*='captcha']")
      .locator("div.recaptcha-checkbox");

    if (await captchaCheckbox.isVisible({ timeout: CAPTCHA_TIMEOUT }).catch(() => false)) {
      if (CAPTCHA_MODE === "manual") {
        console.log(`⚠️ Captcha detected (${stage}).`);
        console.log("👉 You have up to 4 minutes to solve it manually.");
        console.log("👉 Once solved, click ▶ Resume in Playwright Inspector.");
        await this.page.pause(); // pauses test, you solve captcha, then resume
      } else if (CAPTCHA_MODE === "skip") {
        console.log(`⚠️ Captcha detected (${stage}) — skipping this test in CI.`);
        test.skip();
      }
    }
  }
}
