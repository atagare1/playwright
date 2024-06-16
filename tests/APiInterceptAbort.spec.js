const {test,expect} = require('@playwright/test');

test('First Playwright test with fixture-browser', async ({browser})=> {
    const context= await browser.newContext();
    const page= await context.newPage();

    page.route('**/*.{png,jpg,jpeg}',route=> route.abort());
    await page.goto("https://rahulshettyacademy.com/client");
    await page.fill('#userEmail', 'test01@test.com');
    await page.fill('#userPassword', 'Test@pass1');
    await page.locator('#login').click()
    page.on('request', request=> console.log(request.url()));
    page.on('response', response=>console.log(response.status()));
    await page.waitForLoadState('networkidle');
    //console.log(await page.locator('.card-body h5 b').first().textContent());
    const products=  page.locator('.card-body');


});