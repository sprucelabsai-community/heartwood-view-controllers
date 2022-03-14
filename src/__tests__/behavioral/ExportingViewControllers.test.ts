import fsUtil from 'fs'
import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import {
	buildCwd_nodeModulesImport,
	importExportCwd,
	importExportSource,
	importExportSource_nodeModulesImport,
	importExportSource_syntaxError,
	importExportSource_withDefines,
} from '../../tests/constants'
import ViewControllerExporter from '../../viewControllers/ViewControllerExporter'

export default class ViewControllerExporterTest extends AbstractSpruceTest {
	private static readonly source = importExportSource
	private static readonly buildCwd = importExportCwd
	private static destination: string

	private static exporter: ViewControllerExporter

	protected static async beforeEach() {
		await super.beforeEach()

		this.destination = diskUtil.resolvePath(
			diskUtil.createRandomTempDir(),
			'bundle.js'
		)

		this.exporter = ViewControllerExporter.Exporter(this.buildCwd)
	}

	@test()
	protected static throwsWhenMissingCwd() {
		//@ts-ignore
		assert.doesThrow(() => ViewControllerExporter.Exporter())
	}

	@test()
	protected static canGetPackager() {
		assert.isTruthy(this.exporter)
	}

	@test()
	protected static packagerCanGetCwd() {
		assert.isEqual(this.exporter.getCwd(), this.buildCwd)
	}

	@test()
	protected static packagerNeedsToBeAbsolutePath() {
		assert.isTrue(this.exporter.getCwd()[0] === pathUtil.sep)
	}

	@test()
	protected static async packagerThrowsMissingParams() {
		//@ts-ignore
		const err = await assert.doesThrowAsync(() => this.exporter.export())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['source', 'destination'],
		})
	}

	@test()
	protected static async packagerThrowsMissingDestination() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			this.exporter.export({ source: this.source })
		)
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['destination'],
		})
	}

	@test()
	protected static async destinationMustBeAJsFile() {
		const err = await assert.doesThrowAsync(() =>
			this.exporter.export({
				source: this.source,
				destination: this.resolvePath('test', 'taco'),
			})
		)

		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['destination'],
		})
	}

	@test()
	protected static async sourceFileMustExist() {
		const err = await assert.doesThrowAsync(() =>
			this.exporter.export({
				source: '../aoestuhasoetuh',
				destination: this.destination,
			})
		)

		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['source'],
		})
	}

	@test.only()
	protected static async throwsWithSyntaxError() {
		const err = await assert.doesThrowAsync(() =>
			this.exporter.export({
				source: importExportSource_syntaxError,
				destination: this.destination,
			})
		)

		errorAssert.assertError(err, 'EXPORT_FAILED')
		assert.doesInclude(err.message, 'Unexpected keyword')
	}

	@test()
	protected static async packagerPackages() {
		await this.exporter.export({
			source: this.source,
			destination: this.destination,
		})

		assert.isTrue(diskUtil.doesFileExist(this.destination))
		assert.isAbove(fsUtil.statSync(this.destination).size, 0)

		const contents = diskUtil.readFile(this.destination)
		assert.doesInclude(contents, 'go-team')
	}

	@test()
	protected static async canExportViewThatImportsSomethingFromNodeModules() {
		const destination = diskUtil.resolvePath(
			__dirname,
			'..',
			'..',
			'..',
			'src',
			'__tests__',
			'testDirsAndFiles',
			'skill_import_from_node_module',
			'node_modules',
			'test.ts'
		)
		const contents = `export type Test = 'test'`

		diskUtil.writeFile(destination, contents)

		this.exporter = ViewControllerExporter.Exporter(buildCwd_nodeModulesImport)

		await this.exporter.export({
			source: importExportSource_nodeModulesImport,
			destination: this.destination,
		})
	}

	@test()
	protected static async profileStatsDestMustBeADirectory() {
		const err = await assert.doesThrowAsync(() =>
			this.exporter.export({
				source: this.source,
				destination: this.destination,
				profilerStatsDestination: this.resolvePath('test.ts'),
			})
		)

		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['profilerStatsDestination'],
		})
	}

	@test()
	protected static async canExportProfileStats() {
		const statsDestination = diskUtil.createRandomTempDir()

		await this.exporter.export({
			source: this.source,
			destination: this.destination,
			profilerStatsDestination: this.resolvePath(statsDestination),
		})

		const filepath = this.resolvePath(statsDestination, '/stats.json')
		assert.isTrue(
			diskUtil.doesFileExist(filepath),
			`Did not generate ${filepath}.`
		)
	}

	@test()
	protected static async doesNotIncludeChalk() {
		await this.exporter.export({
			source: this.source,
			destination: this.destination,
		})

		const contents = diskUtil.readFile(this.destination)
		assert.doesNotInclude(contents, 'chalk')
	}

	@test('can use define plugin 1', {
		'process.env.TACO': JSON.stringify('ninja'),
	})
	@test('can use define plugin 2', {
		'process.env.TACO': JSON.stringify('salad'),
		'process.env.BURRITO': JSON.stringify('supreme'),
	})
	protected static async canPassCustomDefinesToExporterConfig(
		definePlugin: any
	) {
		await this.exporter.export({
			source: this.source,
			destination: this.destination,
			defines: definePlugin,
		})

		const config = this.exporter.getConfig()
		assert.doesInclude(config, {
			plugins: [{ definitions: definePlugin }],
		})
	}

	@test(
		'replace process.env.TACO with salad',
		'process.env.TACO',
		JSON.stringify('salad')
	)
	@test(
		'replace process.env.TACO with pizza',
		'process.env.TACO',
		JSON.stringify('pizza')
	)
	@test(
		'replace WIZARDS_NAME with Merlin',
		'WIZARDS_NAME',
		JSON.stringify('Merlin')
	)
	protected static async exportedCustomDefinesAreReplaced(
		key: string,
		value: string
	) {
		await this.exporter.export({
			source: importExportSource_withDefines,
			destination: this.destination,
			defines: { [key]: value },
		})

		const contents = diskUtil.readFile(this.destination)

		assert.doesNotInclude(contents, key)
		assert.doesInclude(contents, value)
	}
}
