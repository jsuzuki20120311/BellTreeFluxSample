var webpack = require('webpack');

module.exports = {
	// エントリーポイント
	entry: './script/src/index.js',
	// ソースマップ出力
	devtool: "#source-map",
	// 出力先設定
	output: {
		path: __dirname,
		filename: './script/dist/bundle.js'
	},
	module: {
		loaders: [
			{
			    test: /\.js$/,
			    loader: 'babel-loader',
			    exclude: /node_modules/,
			    query: {
			        presets: ['es2015', 'react']
			    }
			}
		]
	},
	resolve: {
		// ここに登録した拡張子は import時に省略できる
		extensions: ['', '.js']
	}
};