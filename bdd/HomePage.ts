describe('Home page', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:8080');
    });

    it('should display "Hello world!" text', async () => {
        const text = await page.evaluate(() => document.body.textContent);

        expect(text).toContain('Hello world!');
    });
});
