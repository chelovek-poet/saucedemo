const { expect } = require('@playwright/test');

exports.PdpPage = class PdpPage {
  /**
   *
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Elements
  //--------------------------------------------------------------------------------------------------------------------
  get itemsHeader() {
    return this.page.locator('.inventory_details_name');
  }

  get addToCartButton() {
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
  async openPage(itemNumber) {
    await this.page.goto('https://www.saucedemo.com/inventory-item.html?id=' + itemNumber);
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async clickCartIcon() {
    await this.cartIcon.click();
  }

 // Expects
  //--------------------------------------------------------------------------------------------------------------------
  async expectPageOpened() {
    await expect(this.page).toHaveURL(/https:\/\/www\.saucedemo\.com\/inventory-item\.html\?id=.+/);
  }

  async expectItemTitle(title) {
    await expect(this.itemsHeader).toHaveText(title);
  }

  async expectAddToCartButtonPressed(isPressed) {
    if(isPressed) {
      expect(this.addToCartButton).toHaveText("Remove");
    } else {
      expect(this.addToCartButton).toHaveText("Add to cart");
    }
  }

  async expectItemsInCart(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}
