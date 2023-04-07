import { test, expect } from "@playwright/test";
import { URLS } from "../../pageData/pageData";

test.skip("Login page", async ({ page }) => {
  await page.goto(URLS.homePage);
  await expect(page).toHaveScreenshot();
});
