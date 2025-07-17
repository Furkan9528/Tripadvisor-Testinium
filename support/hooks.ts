import { Before, After} from '@cucumber/cucumber'
import { CustomWorld } from './world'

Before(async function (this: CustomWorld) {
    await this.init()
    await this.homePage.goto(this.baseURL)
})

After(async function (this: CustomWorld) {
    await this.close()
})

