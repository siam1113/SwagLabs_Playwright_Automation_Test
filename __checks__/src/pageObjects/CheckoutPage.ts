import { Locator, Page } from "@playwright/test";
import { checkOutInformation } from "../pageData/pageData";

export default class CheckoutPage {
  page: Page;
  checkoutInfoFirstName: Locator;
  checkoutInfoLastName: Locator;
  checkoutInfoZipCode: Locator;
  continueBtn: Locator;
  finishBtn: Locator;
  completeOrderMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutInfoFirstName = page.getByPlaceholder("First name");
    this.checkoutInfoLastName = page.getByPlaceholder("Last name");
    this.checkoutInfoZipCode = page.getByPlaceholder("Zip/Postal Code");
    this.continueBtn = page.getByText("Continue");
    this.finishBtn = page.getByText("Finish");
    this.completeOrderMsg = page.getByText("THANK YOU FOR YOUR ORDER");
  }

  async fillUpCheckoutInformationAndContinue() {
    await this.checkoutInfoFirstName.fill(checkOutInformation.firstName);
    await this.checkoutInfoLastName.fill(checkOutInformation.lastName);
    await this.checkoutInfoZipCode.fill(checkOutInformation.zipCode);
    await this.continueBtn.click();
  }

  async clickOnFinishBtn() {
    await this.finishBtn.click();
  }
}
