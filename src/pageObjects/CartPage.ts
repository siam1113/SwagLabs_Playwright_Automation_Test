import { expect, Locator, Page } from "@playwright/test";

export default class CartPage {
  page: Page;
  checkOutBtn: Locator;
  continueShoppingBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkOutBtn = page.getByText("Checkout");
    this.continueShoppingBtn = page.getByText("Continue shopping");
  }

  async clickOnCheckout() {
    await this.checkOutBtn.click();
  }

  async clickOnContinueShopping() {
    await this.continueShoppingBtn.click();
  }

  async verifyAddedProductAreInTheCart(productName: string) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async verifyAddedProductsAreInTheCart(productsName: string[]) {
    productsName.forEach(async (productName) => {
      await expect(
        this.page.getByText(productName, { exact: true })
      ).toBeVisible();
    });
  }
}
