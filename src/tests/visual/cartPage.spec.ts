import { test, expect } from "@playwright/test";
import InventoryPage from "../../pageObjects/InventoryPage";
import LoginPage from "../../pageObjects/LoginPage";
import ProductPage from "../../pageObjects/ProductPage";
import { URLS } from "../../pageData/pageData";

test.skip("Cart page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productPage = new ProductPage(page);

  // Step 0: Navigate to login page and login
  await page.goto("/");
  await loginPage.logIntoApplication();
  await expect(page).toHaveURL(URLS.inventoryPage);

  // Step 3: Click on add single product in the cart
  await inventoryPage.addSingleProductInTheCart();

  // Step 4: Navigate to cart page
  await productPage.clickOnCartIcon();
  await expect(page).toHaveURL(URLS.cartPage);

  // Step 5: Compare screenshots
  await page.waitForTimeout(5000);
  await expect(page).toHaveScreenshot();
});
