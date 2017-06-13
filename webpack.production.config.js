const webpack = require('webpack')
const path = require('path');


module.exports = [{
    name: "browser",
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'marked', 'highlight.js', 'mobx', 'mobx-react'],
        main: "./src/components/pc/main.jsx"
    },
    output: {
        path: path.join(__dirname, "/src/static-pc/build"),
        publicPath: "/build/",
        filename: '[name].js'
    },
    devtool: false,
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
    ]
}, {
    name: "mobile",
    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'marked', 'highlight.js', 'mobx', 'mobx-react'],
        main: "./src/components/mobile/main.jsx"
    },
    output: {
        path: path.join(__dirname, "/src/static-mobile/build"),
        publicPath: "/build/",
        filename: '[name].js'
    },
    devtool: false,
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
        })
    ]
}]
