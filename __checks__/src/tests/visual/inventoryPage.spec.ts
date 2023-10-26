import { test, expect } from "@playwright/test";
import LoginPage from "../../pageObjects/LoginPage";
import { URLS } from "../../pageData/pageData";

test.skip("Inventory page", async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Step 0: Navigate to login page and login
  await page.goto("/");
  await loginPage.logIntoApplication();
  await expect(page).toHaveURL(URLS.inventoryPage);

  // Step 1: Compare the screenshots
  await expect(page).toHaveScreenshot();
});
