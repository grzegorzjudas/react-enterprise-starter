const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    apps: [
        {
            name: 'react-enterprise-starter',
            script: `${isDevelopment && 'build/'}server.js`,
            env: {
                NODE_ENV: 'development',
                APP_NAME: 'react-enterprise-starter',
                PORT: 8080,
                STRICT_TLS: false,
                LOG_LEVEL: 'DEBUG'
            }
        }
    ]
}
