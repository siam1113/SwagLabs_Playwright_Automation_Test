import { test, expect } from "@playwright/test";
import CartPage from "../../pageObjects/CartPage";
import CheckoutPage from "../../pageObjects/CheckoutPage";
import InventoryPage from "../../pageObjects/InventoryPage";
import LoginPage from "../../pageObjects/LoginPage";
import ProductPage from "../../pageObjects/ProductPage";
import { URLS } from "../../pageData/pageData";

test.only(`Verify completing order with multiple item`, async ({
  page,
  context,
}) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkOutPage = new CheckoutPage(page);
  let products: string[];

  // Step 0: Navigate to login page
  await page.goto(URLS.homePage);

  // Step 1: Login
  await loginPage.logIntoApplication();
  await expect(page).toHaveURL(URLS.inventoryPage);

  // Step 2: Add multiple product from the inventory page
  products = await inventoryPage.addMultipleProductInTheCart();
  await expect(productPage.cartProductCount).toHaveText("3");

  // Step 3: Navigate to cart page
  await productPage.clickOnCartIcon();
  await expect(page).toHaveURL(URLS.cartPage);

  // // Step 5: Verify added products are in the cart
  // await cartPage.verifyAddedProductsAreInTheCart(products);

  // Step 4: Click on checkout
  await cartPage.clickOnCheckout();
  await expect(page).toHaveURL(URLS.checkOutPageStepOne);

  // Step 5: Fill checkout information and continue
  await checkOutPage.fillUpCheckoutInformationAndContinue();
  await expect(page).toHaveURL(URLS.checkOutPageStepTwo);

  // Step 6: Finish the checkout process
  await checkOutPage.clickOnFinishBtn();
  await expect(page).toHaveURL(URLS.checkOutPageComplete);
  await expect(checkOutPage.completeOrderMsg).toBeVisible();
});
