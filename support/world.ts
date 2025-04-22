import { chromium, Browser, Page, BrowserContext } from '@playwright/test'
import { setWorldConstructor, World } from '@cucumber/cucumber'
import dotenv from 'dotenv'

const environment = process.env.ENV; // Terminalden gelen ENV değeri (dev veya prod)

if (environment === 'dev') {
  dotenv.config({ path: './env/.env.dev' });  // .env.dev dosyasını yükle
} else if (environment === 'prod') {
  dotenv.config({ path: './env/.env.prod' });  // .env.prod dosyasını yükle
} else {
  dotenv.config({ path: './env/.env.dev' });  // Varsayılan olarak .env.dev
}

export class CustomWorld extends World {
  browser!: Browser
  context!: BrowserContext
  page!: Page
  baseURL!: string;

  async init() {
    this.browser = await chromium.launch({ headless: false })
    this.context = await this.browser.newContext()
    this.page = await this.context.newPage()

    // URL'i environment'a göre alıyoruz
    this.baseURL = process.env.URL || '';  // Dev ya da Prod'dan gelen URL

    console.log(`Using base URL: ${this.baseURL}`);  // Kontrol amaçlı baseURL'i yazdırıyoruz
  }

  async close() {
    await this.browser?.close()
  }
}

setWorldConstructor(CustomWorld)
