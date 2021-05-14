import fsUtil from 'fs'
import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import {
	importExportCwd,
	importExportDestination,
	importExportSource,
	importExportSource_syntaxError,
} from '../../tests/constants'
import ViewControllerExporter from '../../viewControllers/ViewControllerExporter'

export default class ViewControllerExporterTest extends AbstractSpruceTest {
	private static readonly source = importExportSource
	private static readonly buildCwd = importExportCwd
	private static readonly destination = importExportDestination

	private static exporter: ViewControllerExporter

	protected static async beforeEach() {
		await super.beforeEach()
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
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['source', 'destination'],
		})
	}

	@test()
	protected static async packagerThrowsMissingDestination() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			this.exporter.export({ source: this.source })
		)
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
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

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
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

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['source'],
		})
	}

	@test()
	protected static async throwsWithSyntaxError() {
		const err = await assert.doesThrowAsync(() =>
			this.exporter.export({
				source: importExportSource_syntaxError,
				destination: this.destination,
			})
		)

		errorAssertUtil.assertError(err, 'EXPORT_FAILED')
		assert.doesInclude(err.message, 'Missing semicolon')
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
}
