const path = require('path');
const webpack = require('webpack');
const exec = require('child_process').exec;

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

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

printEnvironment(ENV, true);
cleanWorkspace();

module.exports = [
    {
        name: "client",
        entry: path.resolve(__dirname, 'src/client/index.tsx'),
        mode: ENV,
        output: {
            path: path.resolve(__dirname, 'build/static/'),
            filename: 'app.js'
        },
        resolve: {
            alias: {
                'server': path.join(__dirname, './src/server'),
                'client': path.join(__dirname, './src/client'),
            },
            extensions: [ '.ts', '.tsx', '.js' ]
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js)$/,
                    exclude: [ /node_modules/, /\.spec.ts$/ ],
                    use: [
                        { loader: 'ts-loader' }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader', options: { modules: true, importLoaders: 1, sourceMap: true } }
                    ]
                }
            ]
        },
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
                'server': path.join(__dirname, './src/server'),
                'client': path.join(__dirname, './src/client'),
            },
            extensions: [ '.ts', '.tsx', '.js', '.json' ]
        },
        externals: switchEnvs({
            express: 'commonjs express'
        }),
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js)$/,
                    exclude: [ /node_modules/, /\.spec.ts$/ ],
                    use: [
                        { loader: 'ts-loader' }
                    ]
                },
                {
                    test: /\.css$/,
                    include: [
                        path.resolve(__dirname, 'src/client/global.css')
                    ],
                    use: ExtractTextWebpackPlugin.extract({
                        use: [
                            { loader: 'css-loader', options: { modules: false, sourceMap: true }}
                        ]
                    })
                },
                {
                    test: /\.css$/,
                    exclude: [
                        /node_modules/,
                        path.resolve(__dirname, 'src/client/global.css')
                    ],
                    use: ExtractTextWebpackPlugin.extract({
                        use: [
                            { loader: 'css-loader', options: { modules: true, sourceMap: true } }
                        ]
                    })
                },
                {
                    test: /\.html$/,
                    use: [
                        { loader: 'html-loader' }
                    ]
                }
            ]
        },
        plugins: [
            new ExtractTextWebpackPlugin({
                filename: 'static/style.css',
                ignoreOrder:  true
            }),
            new webpack.DefinePlugin({
                CONFIG: JSON.stringify({
                    ...(CONFIG._default || {}),
                    ...(CONFIG[ENV] || {})
                })
            })
        ]
    }
];
