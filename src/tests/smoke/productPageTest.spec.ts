import { test, expect } from "@playwright/test";
import InventoryPage from "../../pageObjects/InventoryPage";
import LoginPage from "../../pageObjects/LoginPage";
import ProductPage from "../../pageObjects/ProductPage";

test.describe(`Product page`, () => {
  test("Verify the functionality of add/remove and back to order button", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);

    // Step 0: Navigate to login page and login
    await page.goto("/");
    await loginPage.logIntoApplication();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    // Step 1: Navigate to product page
    await inventoryPage.clickOnTheProduct();
    expect(page.url()).toContain(
      "https://www.saucedemo.com/inventory-item.html"
    );

    // Step 2: Click on add to cart
    await productPage.addProductToCart();

    // Step 3: Verify product added to the cart
    await expect(productPage.cartProductCount).toHaveText("1");

    // Step 4: Click on remove button
    await inventoryPage.clickOnRemoveBtn();

    // Step 5: Verify product removed
    await expect(productPage.cartProductCount).toBeHidden();

    // Step 6: Click on back to order
    await productPage.clickOnBackToProducts();

    // Step 7: Verify user navigated to inventory page again
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
});
