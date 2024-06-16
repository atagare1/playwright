const {test,expect, request} = require('@playwright/test');
const {ApiUtils} = require('./Utils/ApiUtils.js');
const loginPayload={userEmail: "test01@test.com", userPassword: "Test@pass1"}
const createOrderPayload={orders:[{country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45"}]}
let response;
 
test.beforeAll( async () => {
    const apiContext= await request.newContext();
    const apiUtils= new ApiUtils(apiContext,loginPayload)
    response= await apiUtils.createOrder(createOrderPayload)


})
test.only('API session handling and searching orderID for order created with API', async ({browser})=> {

    const context= await browser.newContext();
    const page= await context.newPage();
    //await page.pause();
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForLoadState('networkidle');
    //await page.locator('tbody tr').first().waitFor()
   const rows= page.locator('tbody tr')

   const rowCount=rows.count();

   for(let i=0;i<rowCount; i++){

    if(await rows.nth(i).locator('th').textContent() === response.orderID)
    {
        await rows.nth(i).locator("button[class='btn btn-primary']").click();

        await page.locator('div[class="col-text -main"]').waitFor()

        expect(await page.locator('div[class="col-text -main"]').textContent()).toEqual(response.orderID)

    }

}



});

