import { Given, Then, When } from "@cucumber/cucumber"
import { expect } from '@playwright/test'
import { CustomWorld } from "../support/world"

Given('I navigate to the TripAdvisor main page', async function (this: CustomWorld) {
    const page = this.page;
    await page.goto(this.baseURL); 
    await page.locator('#onetrust-accept-btn-handler').click();
});

When('I should see the TripAdvisor logo', async function () {
    const locator = this.page.locator('img[alt="Tripadvisor"][src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"]');
    await expect(locator).toBeVisible();
});

Then('I should see the search bar', async function () {
    console.log("Hello2")

});

Then('I should see the Sign In button', async function () {
    console.log("Hello2")

});
