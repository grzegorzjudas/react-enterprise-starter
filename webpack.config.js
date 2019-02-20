const path = require('path');

function getEnvironment () {
    const options = [ 'development', 'production', 'none' ];
    const env = process.env.NODE_ENV;

    return options.includes(env) ? env : 'production';
}

function switchEnvs (dev, prod) {
    if (getEnvironment() === 'development') return dev;

    return prod;
}

module.exports = [
    {
        name: "client",
        entry: path.resolve(__dirname, 'src/client/index.js'),
        mode: getEnvironment(),
        output: {
            path: path.resolve(__dirname, 'build/static/'),
            filename: 'app.js'
        }
    },
    {
        name: "server",
        entry: path.resolve(__dirname, 'src/server/index.ts'),
        mode: getEnvironment(),
        target: 'node',
        devtool: switchEnvs('cheap-module-source-map'),
        output: {
            path: path.resolve(__dirname, 'build/'),
            filename: 'server.js'
        },
        resolve: {
            alias: {
                'server/controller': path.join(__dirname, './src/server/controller'),
                'server/lib': path.join(__dirname, './src/server/lib'),
                'server/middleware': path.join(__dirname, './src/server/middleware'),
                'server/model': path.join(__dirname, './src/server/model'),
                'server/route': path.join(__dirname, './src/server/route'),
                'server/service': path.join(__dirname, './src/server/service')
            },
            extensions: [ '.ts', '.js', '.json' ]
        },
        externals: switchEnvs({
            express: 'commonjs express'
        }),
        module: {
            rules: [
                {
                    test: /\.(ts|js)$/,
                    exclude: [ /node_modules/, /\.spec.ts(x|)$/ ],
                    use: [
                        { loader: 'ts-loader' }
                    ]
                }
            ]
        }
    }
];
