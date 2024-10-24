const {test,expect} = require('@playwright/test');

test('First Playwright test with fixture-browser', async ({browser})=> {
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    
    /*await page.locator('a.text-reset').click()
    await page.fill('#firstName', 'abc9898')
    await page.fill('#lastName', 'abc9898')
    await page.fill('#userEmail', 'test01@test.com')
    await page.fill('#userMobile', '9890890910')
    await page.fill('#userPassword', 'Test@pass1')
    await page.fill('#confirmPassword', 'Test@pass1')
    await page.locator('input[type="checkbox"]').click()
    await page.locator('#login').click()
    //expect(page.locator('.login-section-wrapper div :nth-child(1)')).toContainText('Account Created Successfully');
    expect(page.locator('h1.headcolor')).toContainText('Account Created Successfully');
 
    await page.locator('.btn.btn-primary').click(); */
    await page.fill('#userEmail', 'test01@test.com');
    await page.fill('#userPassword', 'Test@pass1');
    await page.locator('#login').click()
    await page.waitForLoadState('networkidle');
    //console.log(await page.locator('.card-body h5 b').first().textContent());
    const products=  page.locator('.card-body');
    const titles= await page.locator('.card-body b').allTextContents();
    const prodName= "ZARA COAT 3";
    const prodCount= await products.count();
    console.log(prodCount)
    for(let i=0; i<prodCount; ++i)
    {
        const text=await products.nth(i).locator('b').textContent()

        console.log(text);
        if (await products.nth(i).locator('b').textContent() === prodName) {
            
            //await products.nth(i).locator('text= Add To Cart').click();
            await products.nth(i).locator("text= Add To Cart").click();
            break;

        }

    }

    await page.locator("[routerlink*='cart']").click()
    await page.locator('div li').first().waitFor();
    expect(page.locator("h3:has-text(prodName)").isVisible).toBeTruthy();

    await page.locator('text=Checkout').click()
    await page.locator("[placeholder='Select Country']").pressSequentially('ind')
    const results= page.locator('[class="ta-results list-group ng-star-inserted"]')
    await results.waitFor()

    const optionsCount= await results.locator('button').count();

    for(let i=0; i<optionsCount; i++){

        const text=await results.locator('button').nth(i).textContent()

        if (text.trim() === 'India')

        {
            results.locator('button').nth(i).click();
            break;

        }

    }

    const textboxes= page.locator('.input.txt')

    await textboxes.nth(1).fill('123');
    await textboxes.nth(1).fill('fname lname');

    await page.locator("[class*='action__submit']").click();

    expect(await page.locator("td h1").textContent()).toEqual(" Thankyou for the order. ")

    const orderIDstr= await page.locator("td label").last().textContent()
    const orderIdarr=orderIDstr.split(" ")
    let orderID=orderIdarr[2]
    await page.locator("td label").first().click()
    //console.log(orderID)
    
    await page.locator('tbody tr').first().waitFor()

   /* const orderIdVals= await page.locator('tbody tr th').allTextContents()

    expect(orderIdVals.includes(orderID)).toBeTruthy */

   const rows= page.locator('tbody tr')

   const rowCount=rows.count();

   for(let i=0;i<rowCount; i++){

    if(await rows.nth(i).locator('th').textContent() === orderID)
    {
        await rows.nth(i).locator("button[class='btn btn-primary']").click();

        await page.locator('div[class="col-text -main"]').waitFor()

        expect(await page.locator('div[class="col-text -main"]').textContent()).toEqual(orderID)

    }


   }



});

test('test with fixture- Page', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page).toHaveTitle("Practice Page");
});