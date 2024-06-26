const {test,expect} = require('@playwright/test');

test('First Playwright test with fixture-browser', async ({browser})=> {
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.fill('#username','rahulshettyacademy');
    await page.fill('#password','learning');
    await page.locator('#signInBtn').click();
    //await expect(page.locator('[style*="block"]')).toContainText("Incorrect");
    //console.log(await page.locator('.card-body a').nth(0).textContent());
    //console.log(await page.locator('.card-body a').first().textContent());
    //console.log(await page.locator('.card-body a').last().textContent());
    console.log(await page.locator('.card-body a').allTextContents());

});

test('test with fixture- Page', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page).toHaveTitle("Practice Page");
});

test("Visual Testing", async({page})=>{

    await page.goto("https://google.com")
    expect(await page.screenshot()).toMatchSnapshot('refScreenshot.png')
});