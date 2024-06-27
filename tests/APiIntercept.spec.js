const {test,expect, request} = require('@playwright/test');
const {ApiUtils} = require('./Utils/ApiUtils.js');
const loginPayload={userEmail: "test01@test.com", userPassword: "Test@pass1"}
const createOrderPayload={orders:[{country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45"}]}
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;
 
test.beforeAll('before all', async () => {
    const apiContext= await request.newContext();
    const apiUtils= new ApiUtils(apiContext,loginPayload)
    response= await apiUtils.createOrder(createOrderPayload)


})
test('API session handling and searching orderID for order created with API', async ({browser})=> {

    const context= await browser.newContext();
    const page= await context.newPage();
    //await page.pause();
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    
    //await page.waitForLoadState('networkidle');
    //await page.locator('tbody tr').first().waitFor()
  
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {

        const resp=await page.request.fetch(route.request())
        let body=JSON.stringify(fakePayLoadOrders);
        route.fulfill(
            {
                resp,
                body,
            }
        );
    });
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
});



