const puppeteer = require('puppeteer');

/* tslint:disable-next-line no-floating-promises */
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:8080');
    await page.screenshot({ path: 'build/screenshot.png' });

    await browser.close();
})();
