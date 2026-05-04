import { test, expect } from '@playwright/test'

test('[@regression] Mock API request ', async ({ page }) => {
    //Mocking API Request
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [
            { name: "name1", id: 10 },
            { name: "name2", id: 23 },
            { name: "name3", id: 34 },
            { name: "name4", id: 30 }
        ];
        await route.fulfill({ json });
    })

    await page.goto('https://demo.playwright.dev/api-mocking');
    await page.screenshot({ path: 'test-results/mockedpage.png' });
    await expect(page.getByText('name1')).toBeVisible();
    await expect(page.getByText('name2')).toBeVisible();
    await expect(page.getByText('name3')).toBeVisible();
    await expect(page.getByText('name4')).toBeVisible();
})