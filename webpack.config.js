const MiniCss = require('mini-css-extract-plugin');
const GoogleFontsPlugin = require('google-fonts-plugin');
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');

module.exports = (env = {}, argv = {}) => ({
	name: 'dreamflash',
	entry: {
		dreamflash: './src/dreamflash.ts',
	},
	output: {
		path: process.cwd() + '/dist/'
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
					MiniCss.loader,
					'css-loader',
					'sass-loader',
				]
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.mjs', '.js', '.json'],
	},
	plugins: [
		new GoogleFontsPlugin({
			fonts: [
				{
					family: 'Caveat',
					variants: ['700'],
					subsets: ['cyrillic', 'latin-ext'],
				},
				{
					family: 'Source Sans Pro',
					variants: ['200', '400i', '400italic', '600' ],
					subsets: ['cyrillic', 'latin-ext'],
				}
			],
			formats: ['woff2'],
		}),
		new Html({
			template: 'src/dreamflash.html',
		}),
		new MiniCss(),
		new Copy([
			{ from: 'src/img/', to: 'img/' },
		]),
	],
	devtool: argv.mode === 'production' ? 'source-map' : 'eval-source-map',
	mode: argv.mode || 'development'
});
