import { test, expect } from "@playwright/test";
import { productPrice } from "../../pageData/pageData";
import InventoryPage from "../../pageObjects/InventoryPage";
import LoginPage from "../../pageObjects/LoginPage";
import ProductPage from "../../pageObjects/ProductPage";

test.describe(`Inventory page`, () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 0: Navigate to login page and login
    await page.goto("/");
    await loginPage.logIntoApplication();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Products should be visible", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Step 1: Verify products are visible
    await inventoryPage.verifyProductsAreVisible();
  });

  test("Sort should function properly (price only)", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Step 1: Sort price high to low
    await inventoryPage.sortPriceHightToLow();

    // Step 2: Verify product sorted
    expect(await inventoryPage.productPrice.innerText()).toBe(
      productPrice.high
    );

    // Step 3: Sort price low to high
    await inventoryPage.sortPriceHightToLow();

    // Step 4: Verify product sorted
    expect(await inventoryPage.productPrice.innerText()).toBe(
      productPrice.high
    );
  });

  test("Product count increase when clicking on 'Add To Cart' and decrease when clicking or 'Remove'", async ({
    page,
  }) => {
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);

    // Step 1: Add multiple(3) product
    await inventoryPage.addMultipleProductInTheCart();

    // Step 2: Verify product count increased
    await expect(productPage.cartProductCount).toHaveText("3");

    // Step 3: Remove one product
    await inventoryPage.clickOnFirstRemoveBtn();

    // Step 4: Verify products removed
    await expect(productPage.cartProductCount).toHaveText("2 ");
  });
});
