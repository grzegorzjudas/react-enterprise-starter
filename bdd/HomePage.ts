describe('Home page', () => {
    beforeAll(async () => {
        await page.goto('http://localhost:8080');
    });

    it('should display "Hello world!" text', async () => {
        const text = await page.$eval('h4', header => header.textContent);

        expect(text).toEqual('Hello world!');
    });
});
