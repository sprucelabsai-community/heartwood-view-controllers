import fsUtil from 'fs'
import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import TerserPlugin from 'terser-webpack-plugin'
import { Configuration, webpack, DefinePlugin } from 'webpack'
import SpruceError from '../../errors/SpruceError'

const packagerUtil = {
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

export default class PackagingSkillViewsTest extends AbstractSpruceTest {
	private static readonly source = diskUtil.resolvePath(
		__dirname,
		'..',
		'..',
		'..',
		'src',
		'__tests__',
		'testDirsAndFiles',
		'skill',
		'src',
		'.spruce',
		'views',
		'views.ts'
	)

	private static readonly destination = diskUtil.resolvePath(
		diskUtil.createRandomTempDir(),
		'bundle.js'
	)

	@test()
	protected static canGetPackager() {
		assert.isTruthy(packagerUtil)
	}

	@test()
	protected static async packagerThrowsMissingParams() {
		//@ts-ignore
		const err = await assert.doesThrowAsync(() => packagerUtil.package())
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['source', 'destination'],
		})
	}

	@test()
	protected static async packagerThrowsMissingDestination() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			packagerUtil.package({ source: this.source })
		)
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['destination'],
		})
	}

	@test()
	protected static async destinationMustBeAJsFile() {
		const err = await assert.doesThrowAsync(() =>
			packagerUtil.package({
				source: this.source,
				destination: this.resolvePath('test', 'taco'),
			})
		)

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['destination'],
		})
	}

	@test()
	protected static async sourceFileMustExist() {
		const err = await assert.doesThrowAsync(() =>
			packagerUtil.package({
				source: '../aoestuhasoetuh',
				destination: this.destination,
			})
		)

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['source'],
		})
	}

	@test()
	protected static async packagerPackages() {
		await packagerUtil.package({
			source: this.source,
			destination: this.destination,
		})

		assert.isTrue(diskUtil.doesFileExist(this.destination))
		assert.isAbove(fsUtil.statSync(this.destination).size, 0)

		const contents = diskUtil.readFile(this.destination)
		assert.doesInclude(contents, 'go-team')
	}
}
