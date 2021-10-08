import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import * as constants from '../../tests/constants'
import ViewControllerExporter from '../../viewControllers/ViewControllerExporter'
import ViewControllerImporter from '../../viewControllers/ViewControllerImporter'

export default class ViewControllerImporterTest extends AbstractViewControllerTest {
	protected static controllerMap: Record<string, any> = {}
	private static importer: ViewControllerImporter

	public static async beforeAll() {
		await super.beforeAll()

		const exporter = ViewControllerExporter.Exporter(constants.importExportCwd)

		await exporter.export({
			source: constants.importExportSource,
			destination: constants.importExportDestination,
		})

		await exporter.export({
			source: constants.importExportSource_noIds,
			destination: constants.importExportDestination_noIds,
		})
	}

	protected static async beforeEach() {
		await super.beforeEach()
		this.importer = ViewControllerImporter.Importer()
	}

	@test()
	protected static canCreateViewControllerImporter() {
		assert.isTruthy(this.importer)
	}

	@test('throws with syntax error', 'aosetuh')
	@test('throws with no object in response', '')
	protected static importingInvalidScriptThrows(script: string) {
		const err = assert.doesThrow(() => this.importer.import(script))
		errorAssertUtil.assertError(err, 'INVALID_VIEW_CONTROLLER_SOURCE')
	}

	@test()
	protected static throwsIfMissingPublicStaticIdOnVc() {
		const err = assert.doesThrow(() => this.importControllers('_noIds'))
		errorAssertUtil.assertError(err, 'INVALID_VIEW_CONTROLLER_SOURCE')
		assert.doesInclude(err.message, 'public static readonly id =')
	}

	@test()
	protected static importingValidScripts() {
		const controllers = this.importControllers()

		assert.isArray(controllers)
		assert.isLength(controllers, 2)
		assert.isTruthy(controllers[0])
		assert.isEqual(controllers[0].id, 'book')
		assert.isTruthy(controllers[1])
		assert.isEqual(controllers[1].id, 'book-form')
	}

	private static importControllers(suffix: '' | '_noIds' = '') {
		const contents = diskUtil.readFile(
			//@ts-ignore
			constants[`importExportDestination${suffix}`]
		)

		const controllers = this.importer.import(contents)

		return controllers
	}

	@test()
	protected static canInstantiateImportedController() {
		const factory = this.importAndGetFactory()

		//@ts-ignore
		const vc = factory.Controller('book', {})
		//@ts-ignore
		const vc2 = factory.Controller('book-form', {})

		assert.isFunction(vc.render)
		assert.isEqual(vc.render(), 'go-team')
		assert.isFunction(vc2.render)
		//@ts-ignore
		assert.isEqual(vc2.render().msg, 'what the?')
	}

	@test()
	protected static cantMessWithGlobalWindow() {
		this.importAndRenderVc()
		//@ts-ignore
		assert.isFalsy(global.window?.__hack)
	}

	@test()
	protected static cantMessWithDocument() {
		this.importAndRenderVc()
		//@ts-ignore
		assert.isFalsy(global.document?.__hack)
	}

	@test()
	protected static cantGetAnyGlobalVars() {
		//@ts-ignore
		global.__hack2 = true
		const model = this.importAndRenderVc()
		//@ts-ignore
		assert.isFalsy(model.globalHack2Value)
	}

	@test()
	protected static canGetTimeoutFunctions() {
		const model = this.importAndRenderVc()

		//@ts-ignore
		assert.isEqual(model.setTimeout, setTimeout)
		//@ts-ignore
		assert.isEqual(model.clearTimeout, clearTimeout)
	}

	@test()
	protected static hyphenedVarsCantCrashIt() {
		//@ts-ignore
		global['oh-no'] = true
		this.importAndRenderVc()
	}

	@test()
	protected static constructorIsInvoked() {
		const factory = this.importAndGetFactory()

		//@ts-ignore
		const vc = factory.Controller('book', {})

		//@ts-ignore
		assert.isEqual(vc.getValueSetInConstructor(), 'set!')
	}

	private static importAndGetFactory() {
		const controllers = this.importControllers()
		const factory = this.Factory()

		factory.importControllers(controllers)

		return factory
	}

	private static importAndRenderVc() {
		const factory = this.importAndGetFactory()

		//@ts-ignore
		const vc = factory.Controller('book-form', {})
		const model = vc.render()
		return model
	}
}
