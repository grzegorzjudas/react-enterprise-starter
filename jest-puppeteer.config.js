const def = require('./jest.config');

const config = Object.assign(def, {
    launch: {
        dumpio: true,
        headless: ![ '', 'development' ].includes(process.env.NODE_ENV)
    },
    preset: 'jest-puppeteer',
    browserContext: 'default',
    testMatch: [
        '<rootDir>/bdd/**/*.ts'
    ]
});

delete config.testEnvironment;

module.exports = config;
