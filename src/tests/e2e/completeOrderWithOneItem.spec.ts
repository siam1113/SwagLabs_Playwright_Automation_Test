import { test, expect } from "@playwright/test";
import CartPage from "../../pageObjects/CartPage";
import CheckoutPage from "../../pageObjects/CheckoutPage";
import InventoryPage from "../../pageObjects/InventoryPage";
import LoginPage from "../../pageObjects/LoginPage";
import ProductPage from "../../pageObjects/ProductPage";

test(`Verify completing order with one item`, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkOutPage = new CheckoutPage(page);
  let product;

  // Step 0: Navigate to login page
  await page.goto("/");

  // Step 1: Login
  await loginPage.logIntoApplication();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  // Step 2: View a product
  await inventoryPage.clickOnTheProduct();
  expect(page.url()).toContain("https://www.saucedemo.com/inventory-item.html");

  // Step 3: Add the product in cart
  product = await productPage.addProductToCart();
  await expect(productPage.cartProductCount).toHaveText("1");

  // Step 4: Go to cart
  await productPage.clickOnCartIcon();
  await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

  // Step 5: Verify added products are in the cart
  await cartPage.verifyAddedProductAreInTheCart(product);

  // Step 6: Click on checkout
  await cartPage.clickOnCheckout();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html"
  );

  // Step 7: Fill checkout information and continue
  await checkOutPage.fillUpCheckoutInformationAndContinue();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html"
  );

  // Step 8: Finish the checkout process
  await checkOutPage.clickOnFinishBtn();
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html"
  );
  await expect(checkOutPage.completeOrderMsg).toBeVisible();
});
