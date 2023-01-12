import { test, expect } from "@playwright/test";
import CartPage from "../../pageObjects/CartPage";
import InventoryPage from "../../pageObjects/InventoryPage";
import LoginPage from "../../pageObjects/LoginPage";
import ProductPage from "../../pageObjects/ProductPage";

test.describe(`Cart page`, () => {
  test("Verify the functionality of remove and continue shopping button", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Step 0: Navigate to login page and login
    await page.goto("/");
    await loginPage.logIntoApplication();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    // Step 3: Click on add single product in the cart
    await inventoryPage.addSingleProductInTheCart();

    // Step 4: Navigate to cart page
    await productPage.clickOnCartIcon();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    // Step 5: Verify product added to the cart
    await expect(productPage.cartProductCount).toHaveText("1");

    // Step 6: Click on remove button
    await inventoryPage.clickOnRemoveBtn();

    // Step 7: Verify product removed
    await expect(productPage.cartProductCount).toBeHidden();

    // Step 8: Click on continue shopping button
    await cartPage.clickOnContinueShopping();

    // Step 9: Verify user navigated to inventory page again
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
});
