import { test, expect } from '@playwright/test'

test('[@regression] Mock API from HAR file ', async ({ page }) => {

    //Recording HAR File
    await page.routeFromHAR('./har/fruits.har', { url: '*/**/api/v1/fruits', update: false });

    //Go to URL
    await page.goto("https://demo.playwright.dev/api-mocking/");
    //Validate text
    await expect(page.getByText('Strawberry')).toBeVisible();
    //Once har file is generated you have to change the update to false
    await expect(page.getByText('Strawberry')).toBeVisible();
    await expect(page.getByText('Playwright Typescript')).toBeVisible();
    await expect(page.getByText('Playwright Javascript')).toBeVisible();
    await expect(page.getByText('Passionfruit')).toBeVisible();
})