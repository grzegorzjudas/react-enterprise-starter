const puppeteer = require('puppeteer');

const headless = ![ '', 'development' ].includes(process.env.NODE_ENV);

/* tslint:disable-next-line no-floating-promises */
(async () => {
    const browser = await puppeteer.launch({ headless });
    const page = await browser.newPage();
    await page.goto('http://localhost:8080');
    await page.screenshot({ path: 'build/screenshot.png' });

    await browser.close();
})();
