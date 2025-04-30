import { Before, After, AfterAll } from '@cucumber/cucumber'
import { CustomWorld } from './world'
import { Browser } from '@playwright/test'

let browser: Browser;

Before(async function (this: CustomWorld) {
    await this.init()
})

After(async function (this  : CustomWorld) {
    await this.close()
})

AfterAll(async function(){
    await browser.close();
})