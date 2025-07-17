import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly cookieAcceptButton: Locator;
    readonly logo: Locator;
    readonly searchBar: Locator;
    readonly signInButton: Locator;
    readonly destinationField: Locator;
    readonly destinationList: Locator;
    readonly discoveryPage: Locator;
    readonly titleOfAbout: Locator;
    readonly descriptionOfSelectedPlace: Locator;
    readonly scoresField: Locator;
    readonly scoresOfThePlace: Locator;
    thingsToDoItems?: any[];
    thingsToDoItemsLocator?: number;
    destinationItems?: any[];
    destinationCount?: number;
    
    constructor(page: Page) {
        this.page = page;
        this.cookieAcceptButton = page.locator('#onetrust-accept-btn-handler');
        this.logo = page.locator('img[alt="Tripadvisor"][src="https://static.tacdn.com/img2/brand_refresh_2025/logos/wordmark.svg"]');
        this.searchBar = page.locator('.LhcRH._G._H.B-.G_._S.t.u.j.H0');
        this.signInButton = page.locator('.rmyCe._G.B-.z._S.c.Wc.wSSLS.w.jWkoZ.sOtnj');
        this.destinationField = page.locator('.hUpcN._G.G_.B-.z.F1.w.R0.OavzT._O');
        this.destinationList = page.locator('.bHYOc._f.Pj');
        this.discoveryPage = page.locator('.TQENi.k');
        this.titleOfAbout = page.locator('.EZPvt');
        this.descriptionOfSelectedPlace = page.locator('.biGQs._P.fiohW.KeZJf');
        this.scoresField = page.locator('.biGQs._P.fiohW.mowmC.KeZJf');
        this.scoresOfThePlace = page.locator('.');
    }

    async goto(baseURL: string) {
        await this.page.goto(baseURL);
        await this.acceptCookiesIfVisible();
    }

    async acceptCookiesIfVisible() {
        const btn = this.cookieAcceptButton;
        await btn.waitFor({ state: 'visible', timeout: 10000 }).catch(() => { });

        if (await btn.isVisible()) {
            await Promise.all([
                this.page.waitForLoadState('networkidle'),
                btn.click(),
            ]);
            await btn.waitFor({ state: 'hidden' });
        }
    }

    async isLogoVisible() {
        await expect(this.logo).toBeVisible();
    }

    async isSearchBarVisible() {
        await expect(this.searchBar).toBeVisible();
    }

    async isSignInButtonVisible() {
        await expect(this.signInButton).toBeVisible();
    }

    async clickDestinationField() {
        await this.destinationField.click();
    }

    async isDestinationListVisible() {
        const destinationItemsLocator = this.page.locator(
            '#typeahead_results a[role="option"][href]'
        );
        await destinationItemsLocator.first().waitFor({ state: 'visible', timeout: 5000 });
        const count = await destinationItemsLocator.count();
        console.log('Popular destinations count:', count);
        expect(count).toBeGreaterThan(0);
        this.destinationItems = [];
        for (let i = 0; i < count; i++) {
            try {
                const city = (await destinationItemsLocator
                    .nth(i)
                    .locator('div.biGQs._P.fiohW.ezezH')
                    .innerText())
                    .trim();
                if (city === "Your go-to guide for dog-friendly travel") {
                    console.log(`Skipped index ${i}: irrelevant entry "${city}"`);
                    continue;
                }
                console.log(`Destination ${i}:`, city);
                this.destinationItems.push(city);
            } catch (error) {
                console.warn(`Skipping index ${i} due to error:`, error);
                continue;
            }
        }
        this.destinationCount = count;
    }

    async randomSelectAPopularCity(): Promise<string> {
        await this.isDestinationListVisible();
        if (!this.destinationItems || this.destinationItems.length === 0) {
            throw new Error('Destination list is empty call isDestinationListVisible() first.');
        }
        const randomIndex = Math.floor(Math.random() * this.destinationItems.length);
        const destinationItemsLocator = await this.page.locator('#typeahead_results a[role="option"][href]');
        const target = destinationItemsLocator.nth(randomIndex);
        const cityName = (await target
            .locator('div.biGQs._P.fiohW.ezezH')
            .innerText())
            .trim();
        console.log(`Randomly selected city → ${cityName} (index ${randomIndex})`);
        await target.click();
        return cityName;
    }

    async redirectToDiscoveryPage() {
        await expect(this.discoveryPage).toBeVisible();
    }

    async thingsTodoField() {
        const firstListItems = this.titleOfAbout.first();
        await expect(firstListItems).toBeVisible();
    }

    async placesOfCity() {
        const thingsToDoList = this.page.locator('ul.DSinh').first();
        await thingsToDoList.waitFor({ state: 'visible', timeout: 5000 });
        const topLevelLis = thingsToDoList.locator('> li');
        const countList = await topLevelLis.count();
        console.log('Popular places count:', countList);

        this.thingsToDoItems = [];
        for (let i = 0; i < countList; i++) {
            const places = (await topLevelLis
                .nth(i)
                .innerText())
                .trim();
            console.log(`Things to Do ${i}:`, places);
            this.thingsToDoItems.push(places);
        }
        this.thingsToDoItemsLocator = countList;
    }

    async randomPlaceField() {
        await this.placesOfCity();
        if (!this.thingsToDoItems || this.thingsToDoItems.length === 0) {
            throw new Error('Things to do list is empty call placesOfCity() first.')
        }
        const randomIndex = Math.floor(Math.random() * this.thingsToDoItems.length);
        const thingsToDoItemsLocator = await this.page.locator('ul.DSinh > li');
        const target = thingsToDoItemsLocator.nth(randomIndex);
        const placeName = (await target.innerText()).trim();
        console.log(`Randomly selected place → ${placeName} (index ${randomIndex})`);
        await target.click()
        return placeName;
    }

    async newTab() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page')
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const newUrl = newPage.url();
        console.log('New tab URL:', newUrl);
        expect(newUrl.includes('/Attraction_Review')).toBeTruthy();
    }

    async descriptionOfTheSelectedPlace() {
        await expect(this.descriptionOfSelectedPlace.first()).toBeVisible();
    }

    async labelScores() {
        await expect(this.scoresField.first()).toBeVisible();
    }

    async scoresOfThePlaces(){
        await expect(this.scoresOfThePlace).toBeVisible();
    }

}