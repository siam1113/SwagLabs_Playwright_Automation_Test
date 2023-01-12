import { test, expect } from "@playwright/test";

test("Login page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot();
});
