import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import TerserPlugin from 'terser-webpack-plugin'
import { Configuration, webpack, DefinePlugin } from 'webpack'
import SpruceError from '../errors/SpruceError'

export default class ViewControllerExporter {
	private constructor() {}

	public static Exporter() {
		return new this()
	}

	public async export(options: { source: string; destination: string }) {
		this.assertValidExportOptions(options)

		const { source, destination } = options

		this.assertValidSource(source)

		const dirname = pathUtil.dirname(destination)
		const filename = pathUtil.basename(destination)

		this.assertValidDestinationFilename(filename)

		const config: Configuration = this.buildConfiguration(
			source,
			dirname,
			filename
		)

		return this.webpack(config)
	}

	private webpack(config: Configuration) {
		return new Promise((resolve: any, reject) => {
			webpack(config, (err, stats) => {
				if (err) {
					reject(err)
					return
				}

				if (!stats || stats?.compilation.emittedAssets.size === 0) {
					reject(
						new SpruceError({
							code: 'EXPORT_FAILED',
							originalError: stats?.compilation.errors[0],
						})
					)
					return
				}

				resolve()
			})
		})
	}

	private buildConfiguration(
		entry: string,
		dirname: string,
		filename: string
	): Configuration {
		return {
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
									['@babel/preset-env', { loose: true }],
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
	}

	private assertValidDestinationFilename(filename: string) {
		if (filename.substr(-3) !== '.js') {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: ['destination'],
				friendlyMessage: `Destination must be a javascript file (ending in .js).`,
			})
		}
	}

	private assertValidSource(entry: string) {
		if (!diskUtil.doesFileExist(entry)) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: ['source'],
				friendlyMessage: `Source file must exist. Could not find ${entry}.`,
			})
		}
	}

	private assertValidExportOptions(options: {
		source: string
		destination: string
	}) {
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
	}
}
