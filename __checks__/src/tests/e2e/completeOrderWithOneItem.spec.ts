import { test, expect } from "@playwright/test";
import CartPage from "../../pageObjects/CartPage";
import CheckoutPage from "../../pageObjects/CheckoutPage";
import InventoryPage from "../../pageObjects/InventoryPage";
import LoginPage from "../../pageObjects/LoginPage";
import ProductPage from "../../pageObjects/ProductPage";
import { URLS } from "../../pageData/pageData";

test(`Verify completing order with one item`, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkOutPage = new CheckoutPage(page);
  let product;

  // Step 0: Navigate to login page
  await page.goto(URLS.homePage);

  // Step 1: Login
  await loginPage.logIntoApplication();
  await expect(page).toHaveURL(URLS.inventoryPage);

  // Step 2: View a product
  await inventoryPage.clickOnTheProduct();
  expect(page.url()).toContain(URLS.productPage);

  // Step 3: Add the product in cart
  product = await productPage.addProductToCart();
  await expect(productPage.cartProductCount).toHaveText("1");

  // Step 4: Go to cart
  await productPage.clickOnCartIcon();
  await expect(page).toHaveURL(URLS.cartPage);

  // Step 5: Verify added products are in the cart
  await cartPage.verifyAddedProductAreInTheCart(product);

  // Step 6: Click on checkout
  await cartPage.clickOnCheckout();
  await expect(page).toHaveURL(URLS.checkOutPageStepOne);

  // Step 7: Fill checkout information and continue
  await checkOutPage.fillUpCheckoutInformationAndContinue();
  await expect(page).toHaveURL(URLS.checkOutPageStepTwo);

  // Step 8: Finish the checkout process
  await checkOutPage.clickOnFinishBtn();
  await expect(page).toHaveURL(URLS.checkOutPageComplete);
  await expect(checkOutPage.completeOrderMsg).toBeVisible();
});
