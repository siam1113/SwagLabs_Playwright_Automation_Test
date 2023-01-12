import { test, expect } from "@playwright/test";

test.skip("Login page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot();
});
