const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    /*
     * app.tsx represents the entry point to your web application. Webpack will
     * recursively go through every "require" statement in app.tsx and
     * efficiently build out the application's dependency tree.
     */
    entry: ["./src/app.tsx"],

    /*
     * The combination of path and filename tells Webpack what name to give to
     * the final bundled JavaScript file and where to store this file.
     */
    output: {
        path: path.resolve(__dirname, "../public"),
        filename: "bundle.js",
        publicPath: '/'
    },

    resolve: {
        extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".css"]
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: "css-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new HtmlWebpackPlugin({
            template: 'index.html.ejs',
            inject: 'body'
        })
    ],

    devtool: "cheap-module-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "../public"),
        compress: true,
        historyApiFallback: true,
        proxy: {
            "/api": "http://localhost:3000",
            "/auth": "http://localhost:3000"
        }
    }
};

module.exports = config;
