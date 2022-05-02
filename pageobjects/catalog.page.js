const { expect } = require('@playwright/test');

exports.CatalogPage = class CatalogPage {
  /**
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Elements
  //--------------------------------------------------------------------------------------------------------------------
  get itemsHeaders() {
    return this.page.locator('.inventory_item_name');
  }

  get itemsPrices() {
    return this.page.locator('.inventory_item_price');
  }

  get addToCartButtons() {
    return this.page.locator('.btn_inventory');
  }

  get cartIcon() {
    return this.page.locator('.shopping_cart_link');
  }

  get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  // Actions
  //--------------------------------------------------------------------------------------------------------------------
  async openPage() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async getItemsCount() {
    return await this.itemsHeaders.count();
  }

  async getItemTitle(itemNumber) {
    return await this.itemsHeaders.nth(itemNumber).textContent();
  }

  async clickItemDetails(itemNumber) {
    await this.itemsHeaders.nth(itemNumber).click();
  }

  async getItemPrice(itemNumber) {
    const price = await this.itemsPrices.nth(itemNumber).textContent();
    return +price.replace(/[^\d]/g, "");
  }

  async clickAddToCart(itemNumber) {
    await this.addToCartButtons.nth(itemNumber).click();
  }

  async clickCartIcon() {
    await this.cartIcon.click();
  }

 // Expects
  //--------------------------------------------------------------------------------------------------------------------
  async expectPageOpened() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
  }

  async expectAddToCartButtonPressed(itemNumber, isPressed) {
    if(isPressed) {
      expect(this.addToCartButtons.nth(itemNumber)).toHaveText("Remove");
    } else {
      expect(this.addToCartButtons.nth(itemNumber)).toHaveText("Add to cart");
    }
  }

  async expectItemsInCart(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}
