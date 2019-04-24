const MiniCssExtract = require('mini-css-extract-plugin');
const GoogleFontsPlugin = require('google-fonts-plugin');
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = (env = {}, argv = {}) => ({
	name: 'dreamflash',
	entry: {
		dreamflash: './client.ts',
	},
	context: process.cwd() + '/src/',
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
					MiniCssExtract.loader,
					'css-loader',
					'sass-loader',
				]
			},
			{
				test: /\.svg$/,
				use: {
					loader: 'svg-url-loader',
				}
			},
			{
				test: /\.jpg$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						emitFile: false,
					},
				}
			},
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
					subsets: ['latin-ext'],
				},
				{
					family: 'Source Sans Pro',
					variants: ['200', '200italic', '400'],
					subsets: ['cyrillic', 'latin-ext'],
				}
			],
			formats: ['woff2'],
		}),
		new Html({
			template: 'html.tsx',
			inlineSource: '.(js|css)$',
		}),
		new MiniCssExtract(),
		new OptimizeCssAssetsPlugin({
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }],
			},
		}),
		new HtmlWebpackInlineSourcePlugin(),
		new Copy([
			{ from: 'img', to: 'img' },
		]),
	],
	devtool: argv.mode === 'production' ? 'source-map' : 'eval-source-map',
	mode: argv.mode || 'development'
});
