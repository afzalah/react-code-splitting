const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || "development";

module.exports = {
    entry: {
        vendor: [
            "react", "react-dom", "react-transition-group", "react-redux", "react-router", "redux", "redux-thunk",
            "jquery", "lodash", "numeral", "html-entities", "store",
            "moment", "moment-range", "moment-timezone", "moment-duration-format",
            "highcharts", "core-js", "history",
            "rest", "rest/interceptor/pathPrefix", "rest/interceptor/template", "rest/interceptor/mime",
            "rest/interceptor/errorCode", "rest/interceptor/defaultRequest",
            "bootstrap", "bootstrap/dist/css/bootstrap.css", "bootstrap-daterangepicker",
            "react-bootstrap", "react-bootstrap-daterangepicker", "react-highcharts", "react-list", "react-select",
            "react-router-bootstrap",
            "redux-persist-transform-encrypt", "elliptic", "bn.js", "browserify-aes", "hash.js",
            "readable-stream", "buffer",
            "sockjs-client", "json3", "url"
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
                test: /\.modernizrrc$/,
                loader: "modernizr-loader"
            }, {
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
            cssProcessor: require('cssnano'),
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