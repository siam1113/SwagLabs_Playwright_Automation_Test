import { Locator, Page } from "@playwright/test";

export default class ProductPage {
  page: Page;
  productName: Locator;
  addToCartBtn: Locator;
  cartIcon: Locator;
  cartProductCount: Locator;
  backToProductsBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator("div.inventory_details_name ");
    this.addToCartBtn = page.getByText("Add to cart");
    this.cartIcon = page.locator("#shopping_cart_container");
    this.cartProductCount = page.locator("span.shopping_cart_badge");
    this.backToProductsBtn = page.getByText("Back to products");
  }

  async addProductToCart() {
    await this.addToCartBtn.click();
    return this.productName.innerText();
  }

  async clickOnCartIcon() {
    this.cartIcon.click();
  }

  async clickOnBackToProducts() {
    await this.backToProductsBtn.click();
  }
}
