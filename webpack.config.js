const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

const argv = require("minimist")(process.argv.slice(2));

const src_dir = path.join(__dirname, "/src");
const nodeEnv = process.env.NODE_ENV || "development";

const webPackDefaultPlugins = [
    new webpack.DllReferencePlugin({
        context: ".",
        manifest: require("./dist/vendor-manifest.json")
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        // Required
        inject: false,
        template: "node_modules/html-webpack-template/index.ejs",

        appMountId: "app",
        file: "index.html",
        title: "Code Splitting",
        baseHref: buildDep("/", "/react/"),
        scripts: [
            buildDep("./dist/vendor.dll.js", "/react/vendor.dll.js")
        ]
    }),
    new ExtractTextPlugin("[name].[hash].css"),
    new webpack.DefinePlugin({
        "process.env": {NODE_ENV: JSON.stringify(nodeEnv)}
    }),
    new webpack.ProvidePlugin({
        "$": "jquery",
        "jQuery": "jquery"
    }),
    new CopyWebpackPlugin([{
        from: src_dir + "/assets/**/*"
    }]),
    new webpack.optimize.CommonsChunkPlugin({
        names: buildDep(["app", "vendor"], ["app", "vendor", "manifest"]),
        filename: buildDep("[name].js", "[name].[chunkhash].js")
    }),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        mangle: true,
        comments: false
    })
];

const webPackDevPlugins = [
    new StyleLintPlugin({
        files: ["src/**/*.less"],
        failOnError: false,
        emitErrors: false,
        syntax: "less"
    })
];

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const webPackDefaultLoaders = [
    {
        test: /\.modernizrrc$/,
        loader: "modernizr-loader"
    }, {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        loaders: buildDep(
            ["react-hot-loader/webpack", "ts-loader"],
            ["ts-loader"]
        )
    }, {
        test: /\.json$/,
        loader: "json-loader"
    }, {
        test: /\.(less|css)$/,
        loader: buildDep([{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "less-loader", options: {
                strictMath: true,
                noIeCompat: true
            }
        }], extractLess.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
        }))
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
];

const webPackDevLoaders = [
    {
        enforce: "pre",
        test: /\.(tsx|ts)?$/,
        loader: "tslint-loader",
        options: {
            typeCheck: false
        },
        exclude: /(node_modules)/
    }
];

console.log("NODE_ENV: ", nodeEnv);

const config = {
    devtool: buildDep("cheap-module-eval-source-map"),
    context: __dirname,
    entry: {
        app: src_dir + "/App.tsx"

    },
    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: buildDep("", "/react"),
        filename: buildDep("[name].js", "[name].[chunkhash].js"),
        chunkFilename: buildDep("[name].js", "[name].[chunkhash].js")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            modernizr$: path.resolve(__dirname, "./.modernizrrc"),
            "settings": getSettingsFile()
        },
        modules: [
            path.resolve("./src"),
            "node_modules"
        ]
    },
    module: {
        loaders: buildDep(webPackDefaultLoaders.concat(webPackDevLoaders), webPackDefaultLoaders)
    },
    plugins: buildDep(webPackDevPlugins.concat(webPackDefaultPlugins), webPackDefaultPlugins),
    devServer: {
        contentBase: "./",
        hot: true,
        disableHostCheck: true
    }
};

// Disable linting by resetting the preLoaders
if (isLintingDisabled()) {
    config.module.preLoaders = [];
}

module.exports = config;

function getEnv() {
    const validEnvironments = ["dev", "prod"];
    const nodeEnv = process.env.NODE_ENVIRONMENT || "dev";

    if (validEnvironments.indexOf(nodeEnv) !== -1) {
        console.log("NODE_ENVIRONMENT=" + nodeEnv);
    } else {
        console.warn("NODE_ENVIRONMENT=" + nodeEnv + " is not a known environment!");
    }

    return nodeEnv;
}

function getSettingsFile() {
    /* tslint:disable */
    const nodefoxEnv = getEnv();
    /* tslint:enable */
    // return src_dir + "/settings-" + nodefoxEnv + ".ts"
    return src_dir + "/settings-common.ts";
}

/**
 * If running in debug mode, return the "debug" argument, else return the "release" argument.
 */
function buildDep(debug, release) {
    return isDebug() ? debug : release;
}

function isDebug() {
    return nodeEnv === "development";
}

function isLintingDisabled() {
    return !!argv["disable-linting"];
}
