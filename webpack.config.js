const webpack = require('webpack')
const path = require('path');


module.exports = {
    name: "browser",
    entry: "./src/app-client.js",
    output: {
        path: path.join(__dirname, "/src/static-pc/build"),
        filename: '[name].js',
        chunkFilename: '[name]-[id].js',
        publicPath: "/build/",
    },
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.html' },
            ]
        },
        contentBase: 'src/static-pc'
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            loader: 'babel-loader', // 加载模块 "babel" 是 "babel-loader" 的缩写
            include: path.join(__dirname, 'src')
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]',
            include: path.join(__dirname, 'src')
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!sass-loader',
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=25000',
            include: path.join(__dirname, 'src')
        }]
    }
}
