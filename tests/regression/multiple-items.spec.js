const { test } = require('@playwright/test');
const { AuthPage } = require('../../pageobjects/auth.page');
const { CatalogPage } = require('../../pageobjects/catalog.page');
const { CartPage } = require('../../pageobjects/cart.page');
const { CheckoutPage } = require('../../pageobjects/checkout.page');
const { STANDARD_USER } = require('../../testData/users.data');

test.describe("Regression tests", () => {
  test("Buy all items", async ({page}) => {
    const authPage = new AuthPage(page);
    const catalogPage = new CatalogPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // arrange
    await authPage.openPage();

    // action
    await authPage.enterLoginPass(STANDARD_USER.login, STANDARD_USER.password);
    await authPage.clickLogin();

    // assert
    await catalogPage.expectPageOpened();

    // action
    const itemsCount = await catalogPage.getItemsCount();
    let totalPrice = 0

    for (let i = 0; i < itemsCount; i++) {
      await catalogPage.clickAddToCart(i);
      totalPrice += await catalogPage.getItemPrice(i);
    }

    // assert
    for (let i = 0; i < itemsCount; i++) {
      await catalogPage.expectAddToCartButtonPressed(i, true);
    }
    await catalogPage.expectItemsInCart(itemsCount);

    // action
    await catalogPage.clickCartIcon();

    // assert
    await cartPage.expectPageOpened();
    await cartPage.expectItemsInCart(itemsCount);

    // action
    await cartPage.clickCheckoutButton();

    // assert
    await checkoutPage.expectPageOpened();

    // action
    await checkoutPage.fillUserInfo(STANDARD_USER);
    await checkoutPage.clickContinueButton();

    // assert
    await checkoutPage.expectItemsInCheckout(itemsCount);
    await checkoutPage.expectSubtotal(totalPrice);
  });
});
