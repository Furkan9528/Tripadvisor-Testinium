import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber"
import { CustomWorld } from "../support/world"

setDefaultTimeout(60 * 1000 * 2)

Given('I navigate to the TripAdvisor main page', async function (this: CustomWorld) {
    console.log("Welcome to TripAdvisors")
    await this.homePage.acceptCookiesIfVisible();
});

When('I should see the TripAdvisor logo', async function (this: CustomWorld) {
    await this.homePage.isLogoVisible();
});

Then('I should see the search bar', async function (this: CustomWorld) {
    await this.homePage.isSearchBarVisible();
});

Then('I should see the Sign In button', async function (this: CustomWorld) {
    await this.homePage.isSignInButtonVisible();
});

When('I click to the destionation field', async function (this: CustomWorld) {
    await this.homePage.clickDestinationField();
});

Then('I will see the list of popular destionations displayed', async function (this: CustomWorld) {
    await this.homePage.isDestinationListVisible();
});

When('I select a random destination from the list', async function (this: CustomWorld) {
    await this.homePage.randomSelectAPopularCity();
})

Then('I will be redirected to the discovery page', async function (this: CustomWorld)  {
    await this.homePage.redirectToDiscoveryPage();
})

Then('I will see the header Things to do', async function (this: CustomWorld)   {
    await this.homePage.thingsTodoField();
})

When('I select a random place from the list', async function (this: CustomWorld) {
    await this.homePage.randomPlaceField();
})

Then('I should be redirected to the newly opened tab for the place', async function (this: CustomWorld) {
    await this.homePage.newTab();
})

Then('I should see the description of the selected place in the new tab', async function (this: CustomWorld) {
    await this.homePage.descriptionOfTheSelectedPlace();
})

Then('I should see the following opening hours:', async function (this: CustomWorld)  {
    await this.homePage.labelScores();
})

Then('I should see the scores of the places', async function (this: CustomWorld) {
    await this.homePage.scoresOfThePlaces();
})