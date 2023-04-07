import { test, expect } from "@playwright/test";
import InventoryPage from "../../pageObjects/InventoryPage";
import LoginPage from "../../pageObjects/LoginPage";
import ProductPage from "../../pageObjects/ProductPage";
import { URLS } from "../../pageData/pageData";

test.skip("Product page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  // Step 0: Navigate to login page and login
  await page.goto("/");
  await loginPage.logIntoApplication();
  await expect(page).toHaveURL(URLS.inventoryPage);

  // Step 3: Click on add single product in the cart
  await inventoryPage.clickOnTheProduct();
  expect(page.url()).toContain(URLS.productPage);

  // Step 4: Compare the screenshots
  await expect(page).toHaveScreenshot();
});
