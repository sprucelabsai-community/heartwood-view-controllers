import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import TerserPlugin from 'terser-webpack-plugin'
import { Configuration, webpack } from 'webpack'
import SpruceError from '../errors/SpruceError'

export default class ViewControllerExporter {
	private cwd: string
	private constructor(cwd: string) {
		this.cwd = cwd
	}

	public static Exporter(cwd: string) {
		if (!cwd) {
			throw new SpruceError({ code: 'MISSING_PARAMETERS', parameters: ['cwd'] })
		}
		return new this(cwd)
	}

	public async export(options: {
		source: string
		destination: string
	}): Promise<void> {
		this.assertValidExportOptions(options)

		const { source, destination } = options

		this.assertValidSource(source)

		const { filename, dirname } = this.splitToFileAndDir(destination)

		this.assertValidDestinationFilename(filename)

		const config: Configuration = this.buildConfiguration(
			source,
			dirname,
			filename
		)

		await this.webpack(config)
	}

	public getCwd(): string {
		return this.cwd
	}

	private splitToFileAndDir(destination: string) {
		const dirname = pathUtil.dirname(destination)
		const filename = pathUtil.basename(destination)
		return { filename, dirname }
	}

	private webpack(config: Configuration) {
		return new Promise((resolve: any, reject) => {
			webpack(config, (err, stats) => {
				if (err) {
					reject(err)
					return
				}

				if (stats?.hasErrors()) {
					reject(
						new SpruceError({
							code: 'EXPORT_FAILED',
							originalError: stats?.compilation.errors[0],
						})
					)
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
		destinationDirname: string,
		destinationFilename: string
	): Configuration {
		return {
			entry,
			context: this.cwd,
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
					worker_threads: false,
					dns: false,
					net: false,
					mongodb: false,
					tls: false,
					zlib: false,
					aws4: false,
					'fs-extra': false,
					url: false,
					querystring: false,
					buffer: false,
					assert: false,
					'mongodb-client-encryption': false,
				},
			},
			output: {
				path: destinationDirname,
				publicPath: '/',
				filename: destinationFilename,
			},
			module: {
				rules: [
					{
						test: /\.ts$/,
						exclude: /node_modules/,
						use: {
							loader: `babel-loader`,
							options: {
								configFile: false,
								sourceMaps: false,
								presets: [
									['@babel/preset-env', { modules: false, loose: false }],
									'@babel/preset-typescript',
								],
								plugins: [
									'@babel/plugin-transform-runtime',
									['@babel/plugin-proposal-class-properties', { loose: false }],
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
		const absolute = diskUtil.resolvePath(this.cwd, entry)

		if (!diskUtil.doesFileExist(absolute)) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: ['source'],
				friendlyMessage: `Source file must exist. Could not find ${absolute}.`,
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
