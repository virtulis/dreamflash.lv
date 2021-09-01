const MiniCssExtract = require('mini-css-extract-plugin');
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');

module.exports = (env = {}, argv = {}) => ({
	name: 'dreamflash',
	entry: {
		dreamflash: './client.ts',
	},
	context: process.cwd() + '/src/',
	output: {
		path: process.cwd() + '/dist/',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: '/node_modules/',
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtract.loader,
					'css-loader',
					'sass-loader',
				]
			},
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.mjs', '.js', '.json'],
	},
	plugins: [
		new Html({
			template: 'html.tsx',
			inlineSource: '.(js|css)$',
		}),
		new MiniCssExtract(),
		new Copy({
			patterns: [
				{ from: 'img', to: 'img' },
				{ from: 'fonts', to: 'fonts' },
			]
		}),
	],
	devtool: argv.mode === 'production' ? 'source-map' : 'eval-source-map',
	mode: argv.mode || 'development'
});
