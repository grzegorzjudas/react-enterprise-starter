module.exports = {
    moduleFileExtensions: [
        "js",
        "ts",
        "tsx"
    ],
    moduleNameMapper: {
        "\\.css$": "<rootDir>/node_modules/identity-obj-proxy",
        "^.+\\.html$": "<rootDir>/htmlMapper.js",
        "^client/(.*)$": "<rootDir>/src/client/$1",
        "^server/(.*)$": "<rootDir>/src/server/$1"
    },
    transform: {
        "^.+\\.ts(x)?$": "ts-jest"
    },
    testMatch: [
        "**/__tests__/**/*.(ts|tsx)",
        "**/(*.|)spec.+(ts|tsx)"
    ],
    setupFilesAfterEnv: [
        "<rootDir>/testSetup.js"
    ],
    testEnvironment: "jsdom",
    moduleDirectories: [
        "<rootDir>/node_modules"
    ]
}
