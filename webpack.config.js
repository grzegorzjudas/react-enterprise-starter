const path = require('path');
const webpack = require('webpack');
const exec = require('child_process').exec;

const CONFIG = require('./config.json');
const ENV = getEnvironment();

function printEnvironment (environment, colors) {
    console.log([
        colors ? '\x1b[34m' : '',
        '===================================',
        `Building for: ${environment}`,
        '===================================',
        colors ? '\x1b[0m' : ''
    ].join('\n'));
}

function getEnvironment () {
    const options = [ 'development', 'production', 'none' ];
    const env = process.env.NODE_ENV;

    return options.includes(env) ? env : 'production';
}

function switchEnvs (dev, prod) {
    if (ENV === 'development') return dev;

    return prod;
}

function cleanWorkspace () {
    exec('rm -rf build/');
}

printEnvironment(ENV, ENV === 'development');
cleanWorkspace();

module.exports = [
    {
        name: "client",
        entry: path.resolve(__dirname, 'src/client/index.js'),
        mode: ENV,
        output: {
            path: path.resolve(__dirname, 'build/static/'),
            filename: 'app.js'
        }
    },
    {
        name: "server",
        entry: path.resolve(__dirname, 'src/server/index.ts'),
        mode: ENV,
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
        },
        plugins: [
            new webpack.DefinePlugin({
                CONFIG: JSON.stringify({
                    ...(CONFIG._default || {}),
                    ...(CONFIG[ENV] || {})
                })
            })
        ]
    }
];
