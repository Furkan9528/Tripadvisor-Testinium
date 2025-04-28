import { Given, Then, When } from "@cucumber/cucumber"
import { expect } from '@playwright/test'
import { CustomWorld } from "../support/world"

Given('a login to TurkishAirlines application with and', {timeout: 20000}, async function (this: CustomWorld) {
    const page = this.page;
    await page.goto(this.baseURL); 
    await page.waitForTimeout(2000); 
    await page.waitForLoadState('networkidle'); 

    await page.getByText('Button Triggering AJAX Request').click();
    await page.waitForTimeout(2000);
  
    const successButton = page.locator('.bg-success');
    await successButton.waitFor({state: "attached"})

    //await page.waitForSelector('.bg-success')
    await expect(successButton).toHaveText('Data loaded with AJAX get request.')
});

When('the greeter says hello', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log("Hello")
});

Then('I should have heard {string}', async function (string) {
    console.log("Hello2")

});
