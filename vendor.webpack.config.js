const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const nodeEnv = process.env.NODE_ENV || "development";

module.exports = {
    entry: {
        vendor: [
            "react", "react-dom", "react-router", "jquery", "lodash", "numeral", "html-entities", "core-js", "history",
            "bootstrap", "bootstrap/dist/css/bootstrap.css", "react-bootstrap", "react-select", "react-router-bootstrap",
            "elliptic", "hash.js", "readable-stream", "buffer", "sockjs-client", "json3", "url"
        ]
    },
    output: {
        filename: "vendor.dll.js",
        path: path.resolve(__dirname, "dist"),
        library: "vendor_lib"
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            }, {
                test: /\.(less|css)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader", "less-loader"]
                })
            }, {
                test: /\.(jpe?g|png|gif)$/i,
                loader: "url-loader?limit=5000&name=/[path][name].[ext]?[hash]",
                exclude: /\/loading\/[^\/]+\.gif$/i
            }, {
                test: /\/loading\/[^\/]+\.gif$/i,
                loader: "url-loader?limit=5000&name=/[path][name].[ext]"
            }, {
                test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                loader: "url-loader?limit=5000&name=/[path][name].[ext]?[hash]"
            }
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            name: "vendor_lib",
            path: "dist/vendor-manifest.json"
        }),
        new ExtractTextPlugin("[name].[hash].css"),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
                discardComments: {removeAll: true}
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: true,
            comments: false
        }),
        new webpack.DefinePlugin({
            "process.env": {NODE_ENV: JSON.stringify(nodeEnv)}
        })
    ]
};