import { test, expect } from "@playwright/test";
import { AiAgentPage } from "../pages/AiAgentPage";

test.describe("AI Agent Feature - Chat Interaction", () => {
  test("✅ should send simple text and receive response", async ({ page }) => {
    const aiPage = new AiAgentPage(page);
    await aiPage.goto();

    await aiPage.sendMessage("Hello AI");
    await aiPage.assertResponseReceived();

    const lastMessage = await aiPage.getLastMessage();
    expect(lastMessage.length).toBeGreaterThan(0); // ensure response is not empty
  });

  test("✅ should persist message history in session", async ({ page }) => {
    const aiPage = new AiAgentPage(page);
    await aiPage.goto();

    await aiPage.sendMessage("Message 1");
    await aiPage.assertResponseReceived();

    await aiPage.sendMessage("Message 2");
    await aiPage.assertResponseReceived();

    // history should contain at least 4 messages (2 user + 2 AI)
    await aiPage.assertMessageHistory(3);
  });

  test("✅ should show timestamps for messages", async ({ page }) => {
    const aiPage = new AiAgentPage(page);
    await aiPage.goto();

    await aiPage.sendMessage("Check timestamp");
    await aiPage.assertResponseReceived();

    await aiPage.assertTimestamps();
  });
});
