import { Locator, Page } from "@playwright/test";
import {
  invalidLoginCredentials,
  logInCredentials,
} from "../pageData/pageData";

export default class LoginPage {
  page: Page;
  userNameInputField: Locator;
  passwordInputField: Locator;
  loginBtn: Locator;
  errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInputField = page.getByPlaceholder("Username");
    this.passwordInputField = page.getByPlaceholder("Password");
    this.loginBtn = page.locator("#login-button");
    this.errorMessage = page.locator("//h3[@data-test='error']");
  }

  async logIntoApplication() {
    await this.userNameInputField.fill(logInCredentials.userName);
    await this.passwordInputField.fill(logInCredentials.password);
    await this.loginBtn.click();
  }

  async loginWithWrongUserNameAndPassword() {
    await this.userNameInputField.fill(invalidLoginCredentials.userName);
    await this.passwordInputField.fill(invalidLoginCredentials.password);
    await this.loginBtn.click();
  }

  async loginWithUserNameOnly() {
    await this.userNameInputField.fill(logInCredentials.userName);
    await this.passwordInputField.fill("");
    await this.loginBtn.click();
  }

  async loginWithPasswordOnly() {
    await this.userNameInputField.fill("");
    await this.passwordInputField.fill(logInCredentials.password);
    await this.loginBtn.click();
  }

  async loginWithEmptyFields() {
    await this.userNameInputField.fill("");
    await this.passwordInputField.fill("");
    await this.loginBtn.click();
  }
}
