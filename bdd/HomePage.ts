describe('Home page', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8080');
    });

    it('should display "Hello world!" text', async () => {
        const text = await page.evaluate(() => document.body.textContent);

        expect(text).toContain('Hello world!');
    });
});
