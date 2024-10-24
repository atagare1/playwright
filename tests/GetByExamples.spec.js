const {test, expect}= require('@playwright/test');

test('Getby Examples', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.fill("input[name='name']","test")
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Employed').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill("test123");
    await page.getByRole('button',{name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole('link',{name:'Shop'}).click();
    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button').click();

})

