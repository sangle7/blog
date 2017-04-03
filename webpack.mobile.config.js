const webpack = require('webpack')
const path = require('path');


module.exports = {
	name: "mobile",
	entry: "./src/mobile/main.jsx",
	output: {
		path: path.join(__dirname, "buildmobile/build"),
		filename: 'bundle.js',
		publicPath: "/build/",
	},
	devServer: {
		historyApiFallback: true,
		contentBase: 'buildmobile'
	},
	devtool: 'inline-source-map',
	module: {
		loaders: [{
			test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
			loader: 'babel-loader' // 加载模块 "babel" 是 "babel-loader" 的缩写
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
		}, {
			test: /\.scss$/,
			loader: 'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!sass-loader'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=25000'
		}]
	}
}