const {test,expect} = require('@playwright/test');

test('First Playwright test with fixture-browser', async ({browser})=> {
    const context= await browser.newContext();
    const page= await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropdown = page.locator('select[class="form-control"]')

    await page.fill('#username','rahulshettyacademy');
    await page.fill('#password','learning');
    await dropdown.selectOption('consult');
    await page.locator('[class="customradio"]').last().click();
    await page.locator('#okayBtn').click();
    await page.locator('#terms').check();
    expect(page.locator('#terms')).toBeChecked();
    //await page.locator('#terms').uncheck();
    //expect( await page.locator('#terms').isChecked()).toBeFalsy();
    await page.locator('#signInBtn').click();
    page.pause()

});

