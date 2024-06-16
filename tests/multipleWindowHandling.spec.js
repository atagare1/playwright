const {test,expect} = require('@playwright/test');

test.only('First Playwright test with fixture-browser', async ({browser})=> {
    const context= await browser.newContext();
    const page= await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const docLink= page.locator("[class='blinkingText']")

    const [subPage]= await Promise.all(
        [context.waitForEvent('page'),
        docLink.click(),]    )

    console.log(await subPage.locator('p[class="im-para red"]').textContent())

});

