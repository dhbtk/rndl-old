const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

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
        filename: "bundle[hash].js",
        publicPath: '/'
    },

    resolve: {
        extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".css"]
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "babel-loader?presets[]=es2015!ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: "css-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader",
                })
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                use: "url-loader"
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle[hash].css'),
        new HtmlWebpackPlugin({
            template: 'index.html.ejs',
            inject: 'body',
            custom: {
                cable: process.env.NODE_ENV === 'production' ? "wss://torque.edanni.io/cable/" : "/cable"
            }
        })
    ],

    devtool: "cheap-module-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "../public"),
        compress: true,
        historyApiFallback: true,
        proxy: {
            "/api": "http://localhost:3000",
            "/auth": "http://localhost:3000",
            "/cable": "http://localhost:3000"
        }
    }
};

module.exports = config;
