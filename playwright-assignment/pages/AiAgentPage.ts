import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class AiAgentPage extends BasePage {
  private messages = this.page.locator(".chat-message"); 
  private timestamps = this.page.locator(".chat-timestamp"); 

  async getLastMessage(): Promise<string> {
    return this.messages.last().innerText();
  }

  async assertResponseReceived() {
    await expect(this.messages.last()).toBeVisible({ timeout: 10000 });
  }

  async assertMessageHistory(minMessages: number) {
    const count = await this.messages.count();
    expect(count).toBeGreaterThan(minMessages); // ✅ fixed
  }

  async assertTimestamps() {
    const count = await this.timestamps.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const ts = await this.timestamps.nth(i).innerText();
      expect(ts).toMatch(/\d{1,2}:\d{2}/); // ✅ HH:mm pattern
    }
  }
}
