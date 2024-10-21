const {test,expect}=require('@playwright/test')

test('FrameHandling', async({page})=> {
    
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    //Show/Hide verfication

    expect(await page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    expect(await page.locator('#displayed-text')).toBeHidden();
    
    //Alert Handling and mouse hover
    //await page.pause();

    page.on('dialog',dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator('#mousehover').hover();

    const frame1= page.frameLocator('#courses-iframe');
    await frame1.locator("li a[href *='lifetime-access']:visible").click()
    const textmsg=await frame1.locator('.text h2').textContent();
    console.log("suscribers: ".concat(textmsg.split(" ")[1]))





})