const { expect } = require('@playwright/test');

exports.AuthPage = class AuthPage {
  /**
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Elements
  //--------------------------------------------------------------------------------------------------------------------
  get loginInput() {
    return this.page.locator('#user-name');
  }

  get passInput() {
    return this.page.locator('#password');
  }

  get loginButton() {
    return this.page.locator('#login-button');
  }

  get errorMessageContainer() {
    return this.page.locator('.error-message-container');
  }

  // Actions
  //--------------------------------------------------------------------------------------------------------------------
  async openPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async enterLoginPass(login, password) {
    await this.loginInput.fill(login);
    await this.passInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

 // Expects
  //--------------------------------------------------------------------------------------------------------------------
  async expectPageOpened() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/");
  }

  async expectLockedUserError() {
    await expect(this.errorMessageContainer).toHaveText("Epic sadface: Sorry, this user has been locked out.");
  }
}
