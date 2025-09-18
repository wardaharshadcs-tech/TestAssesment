import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class LoginPage extends BasePage {
  private loginNavBtn = this.page.locator("//div[normalize-space()='Log in']");
  private emailInput = this.page.getByRole("textbox", { name: "Email" });
  private passwordInput = this.page.getByRole("textbox", { name: "Password" });
  private loginBtn = this.page.getByRole("button", { name: "Log in" });

  // Profile name after login
  private profileBtn = this.page.getByRole("button", { name: "WA Wardah Arshad" });

  // Error messages
  private errorInvalidCreds = this.page.getByText("Invalid credentials");

  async gotoLogin() {
    await this.navigateTo("/");
    await this.page.waitForTimeout(2000);
    await this.handleCookiePopup();
    await this.handleCaptcha("on base page");

    await expect(this.loginNavBtn).toBeVisible({ timeout: 10000 });
    await this.loginNavBtn.scrollIntoViewIfNeeded();
    await this.handleCookiePopup();
    await this.handleCaptcha("before nav login");

    await this.loginNavBtn.click();
    await this.handleCookiePopup();
    await this.handleCaptcha("on login page");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await expect(this.loginBtn).toBeEnabled();

    await this.handleCookiePopup();
    await this.handleCaptcha("before final submit");

    await this.loginBtn.click();

    // Captcha handling (pause for manual solve, up to 4 minutes)
    await this.handleCaptcha("after submit");

    // ✅ Wait for page to fully load after login
    await this.page.waitForLoadState("networkidle", { timeout: 60000 });
  }

  async assertLoginSuccess() {
    await expect(this.profileBtn).toBeVisible({ timeout: 20000 });
  }

  async assertLoginFailure() {
    await expect(this.errorInvalidCreds).toBeVisible({ timeout: 20000 });
  }
}
