import Config, { loadConfigFromObject } from '../config';

describe('Config library', () => {
    it('loads all options from object provided on init', () => {
        const raw = {
            APP_NAME: 'test-app',
            NODE_ENV: 'development'
        };

        loadConfigFromObject(raw);

        expect(Object.keys(Config).length).toEqual(Object.keys(raw).length);
    });
});
