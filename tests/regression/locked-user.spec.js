const { test } = require('@playwright/test');
const { AuthPage } = require('../../pageobjects/auth.page');
const { LOCKED_USER } = require('../../testData/users.data');

test.describe("Smoke tests", () => {
  test("Buy 1 item", async ({page}) => {
    const authPage = new AuthPage(page);

    // arrange
    await authPage.openPage();

    // action
    await authPage.enterLoginPass(LOCKED_USER.login, LOCKED_USER.password);
    await authPage.clickLogin();

    // assert
    await authPage.expectPageOpened();
    await authPage.expectLockedUserError();
  });
});
