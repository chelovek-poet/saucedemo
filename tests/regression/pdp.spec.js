const { test } = require('@playwright/test');
const { AuthPage } = require('../../pageobjects/auth.page');
const { CatalogPage } = require('../../pageobjects/catalog.page');
const { PdpPage } = require('../../pageobjects/pdp.page');
const { CartPage } = require('../../pageobjects/cart.page');
const { STANDARD_USER } = require('../../testData/users.data');

test.describe("Smoke tests", () => {
  test("Buy 1 item", async ({page}) => {
    const authPage = new AuthPage(page);
    const catalogPage = new CatalogPage(page);
    const pdpPage = new PdpPage(page);
    const cartPage = new CartPage(page);

    // arrange
    await authPage.openPage();

    // action
    await authPage.enterLoginPass(STANDARD_USER.login, STANDARD_USER.password);
    await authPage.clickLogin();

    // assert
    await catalogPage.expectPageOpened();

    // action
    const itemTitle = await catalogPage.getItemTitle(0);
    await catalogPage.clickItemDetails(0);

    // assert
    await pdpPage.expectPageOpened();
    await pdpPage.expectItemTitle(itemTitle);

    //action
    await pdpPage.clickAddToCart();

    // assert
    await pdpPage.expectAddToCartButtonPressed(true);
    await pdpPage.expectItemsInCart(1);

    // action
    await pdpPage.clickCartIcon();

    // assert
    await cartPage.expectPageOpened();
  });
});
