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
    this.context = await this.browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      locale: 'tr-TR',
      timezoneId: 'Europe/Istanbul',
      geolocation: { longitude: 28.9784, latitude: 41.0082 },
      permissions: ['geolocation'],
      javaScriptEnabled: true,
      acceptDownloads: true,
    });

    this.page = await this.context.newPage()

    await this.page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
      });
    });

    // URL'i environment'a göre alıyoruz
    this.baseURL = process.env.URL || '';  // Dev ya da Prod'dan gelen URL

    console.log(`Using base URL: ${this.baseURL}`);  // Kontrol amaçlı baseURL'i yazdırıyoruz
  }

  async close() {
    await this.browser?.close()
  }
}

setWorldConstructor(CustomWorld)
