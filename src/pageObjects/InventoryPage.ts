import { expect, Locator, Page } from "@playwright/test";

export default class InventoryPage {
  page: Page;
  productName: Locator; // First product of the page
  productPrice: Locator; // First product of the page
  addToCartBtn: Locator; // First product of the page
  sortElement: Locator;
  removeBtn: Locator;
  navIcon: Locator;
  logoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator("div.inventory_item_name >> nth=0");
    this.productPrice = page.locator("div.inventory_item_price >> nth=0");
    this.addToCartBtn = page.locator(`text='Add to cart' >> nth=0`);
    this.sortElement = page.locator("select.product_sort_container");
    this.removeBtn = page.getByText("Remove");
    this.navIcon = page.getByText("Open Menu");
    this.logoutBtn = page.getByText("Logout");
  }

  async clickOnTheProduct() {
    await this.productName.click();
  }

  async addSingleProductInTheCart() {
    await this.addToCartBtn.click();
  }

  async addMultipleProductInTheCart() {
    let products: string[] = [];

    for (let i = 0; i < 3; i++) {
      let product = await this.page
        .locator(`div.inventory_item_name >> nth=${i}`)
        .innerText();
      await this.page.locator(`text='Add to cart' >> nth=${i}`).click();
      products.push(product);
    }
    console.log(products);
    return products;
  }

  async clickOnRemoveBtn() {
    await this.removeBtn.click();
  }

  async verifyProductsAreVisible() {
    expect(await this.page.locator("div.inventory_item").count()).toBe(6);
  }

  async sortPriceHightToLow() {
    await this.sortElement.selectOption("hilo");
  }

  async sortPriceLowToHigh() {
    await this.sortElement.selectOption("lohi");
  }

  async logOutFromTheApplication() {
    await this.navIcon.click();
    await this.logoutBtn.click();
  }
}
