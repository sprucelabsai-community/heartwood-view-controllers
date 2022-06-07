import pathUtil from 'path'
import { assertOptions, SchemaError } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import TerserPlugin from 'terser-webpack-plugin'
import { Configuration, DefinePlugin, webpack } from 'webpack'
import SpruceError from '../errors/SpruceError'

export default class ViewControllerExporter {
	private cwd: string
	private constructor(cwd: string) {
		this.cwd = cwd
	}
	private config: Configuration = {}

	public static Exporter(cwd: string) {
		if (!cwd) {
			throw new SchemaError({ code: 'MISSING_PARAMETERS', parameters: ['cwd'] })
		}
		return new this(cwd)
	}

	public async export(options: {
		source: string
		destination: string
		profilerStatsDestination?: string
		defines?: any
	}): Promise<void> {
		this.assertValidExportOptions(options)

		const { source, destination, profilerStatsDestination, defines } = options

		this.assertValidSource(source)

		const { filename, dirname } = this.splitToFileAndDir(destination)

		this.assertValidDestinationFilename(filename)

		this.config = this.buildConfiguration(
			source,
			dirname,
			filename,
			!!profilerStatsDestination,
			defines
		)

		await this.webpack(this.config, profilerStatsDestination)
	}

	public getCwd(): string {
		return this.cwd
	}

	public getConfig(): Configuration {
		return this.config
	}

	private splitToFileAndDir(destination: string) {
		const dirname = pathUtil.dirname(destination)
		const filename = pathUtil.basename(destination)
		return { filename, dirname }
	}

	private webpack(config: Configuration, profilerStatsDestination?: string) {
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

				if (profilerStatsDestination) {
					const contents = JSON.stringify(stats.toJson())
					diskUtil.writeFile(
						diskUtil.resolvePath(profilerStatsDestination, 'stats.json'),
						contents
					)
				}

				resolve()
			})
		})
	}

	private buildConfiguration(
		entry: string,
		destinationDirname: string,
		destinationFilename: string,
		shouldProfile?: boolean,
		defines?: any
	): Configuration {
		return {
			entry,
			context: this.cwd,
			stats: !!shouldProfile,
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
					tty: false,
					timers: false,
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
						// exclude: /node_modules/, // **/node_modules/*.d.ts files are being imported downstream once this package is exported. Started 10/5/2021
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
				minimizer: [new TerserPlugin()],
			},
			plugins: [
				new DefinePlugin({
					...defines,
				}),
			],
		}
	}

	private assertValidDestinationFilename(filename: string) {
		if (filename.substr(-3) !== '.js') {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['destination'],
				friendlyMessage: `Destination must be a javascript file (ending in .js).`,
			})
		}
	}

	private assertValidSource(entry: string) {
		const absolute = diskUtil.resolvePath(this.cwd, entry)

		if (!diskUtil.doesFileExist(absolute)) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['source'],
				friendlyMessage: `Source file must exist. Could not find ${absolute}.`,
			})
		}
	}

	private assertValidExportOptions(options: {
		source: string
		destination: string
		profilerStatsDestination?: string
	}) {
		assertOptions(options ?? {}, ['source', 'destination'])

		if (options.profilerStatsDestination) {
			if (!diskUtil.isDir(options.profilerStatsDestination)) {
				throw new SchemaError({
					code: 'INVALID_PARAMETERS',
					parameters: ['profilerStatsDestination'],
					friendlyMessage:
						'env.VIEW_PROFILER_STATS_DESTINATION_DIR must point to a directory that already exists.',
				})
			}
		}
	}
}
