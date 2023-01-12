import { test, expect } from "@playwright/test";
import { loginErrorMessages } from "../../pageData/pageData";
import InventoryPage from "../../pageObjects/InventoryPage";
import LoginPage from "../../pageObjects/LoginPage";

test.describe(`Verifying login logout functionality`, () => {
  test(`Verify login with valid credentials`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 0: Navigate to login page
    await page.goto("/");

    // Step 1: Login with valid credentials
    await loginPage.logIntoApplication();

    // Step 2: Verify user successfully logged in
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test(`Verify error message while logging in with wrong username and password`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    // Step 0: Navigate to login page
    await page.goto("/");

    // Step 1: Login with wrong credentials
    await loginPage.loginWithWrongUserNameAndPassword();

    // Step 2: Verify error message showing up
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    await expect(loginPage.errorMessage).toHaveText(
      loginErrorMessages.wrongUserNamePassword
    );
  });

  test(`Verify error message while logging in with only username`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    // Step 0: Navigate to login page
    await page.goto("/");

    // Step 1: Login with wrong credentials
    await loginPage.loginWithUserNameOnly();

    // Step 2: Verify error message showing up
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    await expect(loginPage.errorMessage).toHaveText(
      loginErrorMessages.onlyUsername
    );
  });

  test(`Verify error message while logging in with only password`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    // Step 0: Navigate to login page
    await page.goto("/");

    // Step 1: Login with wrong credentials
    await loginPage.loginWithPasswordOnly();

    // Step 2: Verify error message showing up
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    await expect(loginPage.errorMessage).toHaveText(
      loginErrorMessages.onlyPassword
    );
  });

  test(`Verify login error message with no credentials(empty fields)`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    // Step 0: Navigate to login page
    await page.goto("/");

    // Step 1: Login with wrong credentials
    await loginPage.loginWithEmptyFields();

    // Step 2: Verify error message showing up
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    await expect(loginPage.errorMessage).toHaveText(
      loginErrorMessages.emptyField
    );
  });

  test("Verify log out functionality", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Step 0: Navigate to login page
    await page.goto("/");

    // Step 1: Login to the application
    await loginPage.logIntoApplication();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    // Step 3: Logout from the application
    await inventoryPage.logOutFromTheApplication();

    // Step 4: Verify user successfully logged out
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });
});
