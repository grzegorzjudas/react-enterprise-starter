const def = require('./jest.config');

function switchEnvs (dev, prod) {
    if (process.env.NODE_ENV === 'development') return dev;

    return prod;
}

const config = Object.assign(def, {
    launch: {
        dumpio: true,
        headless: switchEnvs(false, true),
        args: switchEnvs([], [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]),
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    },
    preset: 'jest-puppeteer',
    browserContext: 'default',
    testMatch: [
        '<rootDir>/bdd/**/*.ts'
    ]
});

delete config.testEnvironment;

module.exports = config;
