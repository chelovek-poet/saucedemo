const { test } = require('@playwright/test');
const { AuthPage } = require('../../pageobjects/auth.page');
const { CatalogPage } = require('../../pageobjects/catalog.page');
const { CartPage } = require('../../pageobjects/cart.page');
const { CheckoutPage } = require('../../pageobjects/checkout.page');
const { STANDARD_USER } = require('../../testData/users.data');

test.describe("Regression tests", () => {
  test("Remove item", async ({page}) => {
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
    await catalogPage.clickAddToCart(0);
    await catalogPage.clickAddToCart(1);
    await catalogPage.clickAddToCart(2);
    await catalogPage.clickAddToCart(0);

    // assert
    await catalogPage.expectAddToCartButtonPressed(0, false);
    await catalogPage.expectItemsInCart(2);

    // action
    await catalogPage.clickCartIcon();

    // assert
    await cartPage.expectPageOpened();

    // action
    await cartPage.clickRemove(0);

    // assert
    await cartPage.expectItemsInCart(1);

    // action
    await cartPage.clickCheckoutButton();

    // assert
    await checkoutPage.expectPageOpened();

    // action
    await checkoutPage.fillUserInfo(STANDARD_USER);
    await checkoutPage.clickContinueButton();

    // assert
    await checkoutPage.expectItemsInCheckout(1);
  });
});
