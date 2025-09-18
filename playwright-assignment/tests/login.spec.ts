import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { TestData } from "../utils/testData";

test.describe("Login Feature", () => {
  test("✅ should login successfully with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
    await loginPage.login(TestData.validUser.email, TestData.validUser.password);
    await loginPage.assertLoginSuccess(); // waits until profile name shows
  });

  test("❌ should fail login with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();
    const fake = TestData.fakeUser();
    await loginPage.login(fake.email, fake.password);
    await loginPage.assertLoginFailure(); // checks invalid creds
  });

  test("🔒 should show invalid credentials for locked account", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLogin();

    const { email, password } = TestData.lockoutUser;
    await loginPage.login(email, password);
    await loginPage.assertLoginFailure(); // locked account still shows invalid
  });
});
