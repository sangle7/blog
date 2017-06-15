const webpack = require('webpack')
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = [{
    name: "browser",
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'marked', 'highlight.js', 'mobx', 'mobx-react'],
        main: "./src/components/pc/main.jsx"
    },
    output: {
        path: path.join(__dirname, "/src/static-pc"),
        publicPath: "/",
        filename: '[name]-pc.js'
    },
    devtool: false,
    module: {
        loaders: [{
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            use: 'babel-loader', // 加载模块 "babel" 是 "babel-loader" 的缩写
            include: path.join(__dirname, 'src')
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
            }),
            include: path.join(__dirname, 'src')
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]", "sass-loader"]
            }),
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|jpg)$/,
            use: 'url-loader?limit=25000',
            include: path.join(__dirname, 'src')
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'], // 指定公共 bundle 的名字。
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("styles-pc.css"),
    ]
}, {
    name: "mobile",
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'marked', 'highlight.js', 'mobx', 'mobx-react'],
        main: "./src/components/mobile/main.jsx"
    },
    output: {
        path: path.join(__dirname, "/src/static-mobile"),
        publicPath: "/",
        filename: '[name]-mobile.js'
    },
    devtool: false,
    module: {
        loaders: [{
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            use: 'babel-loader', // 加载模块 "babel" 是 "babel-loader" 的缩写
            include: path.join(__dirname, 'src')
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
            }),
            include: path.join(__dirname, 'src')
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]", "sass-loader"]
            }),
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|jpg)$/,
            use: 'url-loader?limit=25000',
            include: path.join(__dirname, 'src')
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'], // 指定公共 bundle 的名字。
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new ExtractTextPlugin("styles-mobile.css"),
    ]
}]
