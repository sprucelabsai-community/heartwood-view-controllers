import fsUtil from 'fs'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import packagerUtil from '../../utilities/packager.utility'

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
