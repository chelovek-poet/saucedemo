const { expect } = require('@playwright/test');

exports.CheckoutPage = class CheckoutPage {
  /**
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Elements
  //--------------------------------------------------------------------------------------------------------------------
  get firstNameInput() {
    return this.page.locator('#first-name');
  }

  get lastNameInput() {
    return this.page.locator('#last-name');
  }

  get zipCodeInput() {
    return this.page.locator('#postal-code');
  }

  get continueButton() {
    return this.page.locator('#continue');
  }

  get itemsHeaders() {
    return this.page.locator('.inventory_item_name');
  }

  get itemsPrices() {
    return this.page.locator('.inventory_item_price');
  }

  get subtotal() {
    return this.page.locator('.summary_subtotal_label');
  }

  get finishButton() {
    return this.page.locator('#finish');
  }

  // Actions
  //--------------------------------------------------------------------------------------------------------------------
  async openPage() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async fillUserInfo(user) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.zipCodeInput.fill(user.zipCode);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async getItemsCount() {
    return await this.itemsHeaders.count();
  }

  async getItemPrice(itemNumber) {
    return await this.itemsPrices.nth(itemNumber).allTextContents().replace(/[^\d]/g, "");
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }

 // Expects
  //--------------------------------------------------------------------------------------------------------------------
  async expectPageOpened() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
  }

  async expectUserInfoEntered() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
  }

  async expectItemsInCheckout(count) {
    await expect(this.itemsHeaders).toHaveCount(count);
  }

  async expectSubtotal(value) {
    const subtotal = await this.subtotal.textContent();
    await expect(+subtotal.replace(/[^\d]/g, "")).toEqual(value);
  }

  async expectCheckoutCompleted() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
  }
}
