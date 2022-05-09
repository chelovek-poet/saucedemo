# Saucedemo Playwright project

## How to install
npm i

## How to run tests
npx playwright test

## How to contribute
Just make a pull request with new tests!

## How to maintain project
Please keep project structure:
* /pageobjects - folder for PageObject classes. Each PageObject corresponds to its Saucedemo site page and consists of 3 sections: Elements (css/xpath locators), Actions (action test steps with the elements of the page) and Expects (assertion test stteps).
* /tests - folder with .spec.js files (grouped in subfolders), the tests are made using steps described in PageObjects.
* /testData - some additional data for tests
* package.json - package file for npm so that you can install all the dependencies with a single `npm i` command
* playwright.config.js - configuration file with Playwright options