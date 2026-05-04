import {test,expect} from '@playwright/test'

test("[@regression] Mocking API Response" , async({page})=>{
    //Mocking API Response
    await page.route('*/**/api/v1/fruits', async route=>{
        const response=await route.fetch();
        const json=await response.json();
        json.push({ name: "Playwright", id: 10 });
        json.push({ name: "Cypress", id: 23 });
        json.push({ name: "Selenium", id: 34 });
        json.push({name:'Postman',id:16});
        json.push({ name: "Testim", id: 30 });
    await route.fulfill({response,json});
    })
// Go to the page
    await page.goto('https://demo.playwright.dev/api-mocking');    
    // Assert that the new fruit is visible
    await expect(page.getByText('Playwright')).toBeVisible();
    await expect(page.getByText('Cypress')).toBeVisible();
    await expect(page.getByText('Selenium')).toBeVisible();
    await expect(page.getByText('Postman')).toBeVisible();
    await expect(page.getByText('Testim')).toBeVisible();
    await page.screenshot({ path: 'test-results/fullpage.png', fullPage: true });
})