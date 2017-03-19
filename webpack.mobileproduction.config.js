const webpack = require('webpack')
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const assetsPath = path.join(__dirname, "public", "buildmobile");

module.exports = {
    name: "mobile",
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'marked', 'highlight.js', 'mobx', 'mobx-react', 'material-ui'],
        main: "./src/mobile/main.jsx"
    },
    output: {
        path: assetsPath,
        publicPath: "/build/",
        filename: '[chunkhash].[name].js'
    },
    devtool: false,
    module: {
        rules: [{
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            use: 'babel-loader' // 加载模块 "babel" 是 "babel-loader" 的缩写
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!sass-loader'
            })
        }, {
            test: /\.(png|jpg)$/,
            use: 'url-loader?limit=25000'
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
        new ExtractTextPlugin('styles.css')
    ]
}