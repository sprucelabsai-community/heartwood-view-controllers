import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import TerserPlugin from 'terser-webpack-plugin'
import { Configuration, webpack, DefinePlugin } from 'webpack'
import SpruceError from '../errors/SpruceError'

export default const packagerUtil = {
	async package(options: { source: string; destination: string }) {
		const missing: string[] = []
		for (const key of ['source', 'destination']) {
			//@ts-ignore
			if (!options?.[key]) {
				missing.push(key)
			}
		}

		if (missing.length > 0) {
			throw new SpruceError({
				code: 'MISSING_PARAMETERS',
				parameters: missing,
			})
		}

		const { source: entry, destination } = options

		if (!diskUtil.doesFileExist(entry)) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: ['source'],
				friendlyMessage: `Source file must exist. Could not find ${entry}.`,
			})
		}

		const dirname = pathUtil.dirname(destination)
		const filename = pathUtil.basename(destination)

		if (filename.substr(-3) !== '.js') {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: ['destination'],
				friendlyMessage: `Destination must be a javascript file (ending in .js).`,
			})
		}

		const config: Configuration = {
			entry,
			resolve: {
				extensions: ['.ts', '.js'],
				fallback: {
					path: false,
					fs: false,
					util: false,
					stream: false,
					child_process: false,
					os: false,
					constants: false,
					http: false,
					https: false,
					crypto: false,
					vm: false,
					inspector: false,
				},
			},
			output: {
				path: dirname,
				publicPath: '/',
				filename,
			},
			module: {
				rules: [
					{
						test: /\.ts$/,
						exclude: /node_modules/,
						use: {
							loader: `babel-loader`,
							options: {
								sourceMaps: false,
								presets: [
									['@babel/preset-env', { modules: false }],
									'@babel/preset-typescript',
								],
								plugins: [
									'@babel/plugin-transform-runtime',
									['@babel/plugin-proposal-class-properties', { loose: true }],
									[
										'module-resolver',
										{
											root: ['./'],
											alias: {
												'#spruce': './src/.spruce',
											},
										},
									],
								],
							},
						},
					},
				],
			},
			optimization: {
				minimize: true,
				minimizer: [
					new TerserPlugin({
						terserOptions: {
							output: {
								ascii_only: true,
							},
						},
					}),
				],
			},
			plugins: [
				new DefinePlugin({
					'process.env.HOST': JSON.stringify(process.env.HOST),
				}),
			],
		}

		return new Promise((resolve: any, reject) => {
			webpack(config, (err) => {
				if (err) {
					reject(err)
					return
				}
				resolve()
			})
		})
	},
}
