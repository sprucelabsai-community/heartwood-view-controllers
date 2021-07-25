import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import AbstractViewController from '../../viewControllers/Abstract.vc'
import ViewControllerFactory from '../../viewControllers/ViewControllerFactory'

interface ViewModel {}

export class TestViewController extends AbstractViewController<ViewModel> {
	public invocations = []
	public constructorOptions: any
	public constructor(options: any) {
		super(options)
		this.constructorOptions = options
	}
	public getVcFactory() {
		return this.vcFactory
	}
	public render() {
		return {}
	}
}

export class TestViewControllerWithId extends AbstractViewController<ViewModel> {
	public id = 'throws'
	public invocations = []
	public constructorOptions: any
	public constructor(options: any) {
		super(options)
		this.constructorOptions = options
	}
	public getVcFactory() {
		return this.vcFactory
	}
	public render() {
		return {}
	}
}

export class TestSkillViewController extends AbstractSkillViewController {
	public render() {
		return {
			layouts: [],
		}
	}
}

declare module '../../types/heartwood.types' {
	interface ViewControllerMap {
		test: TestViewController
		test2: TestViewControllerWithId
		testSkillView: TestSkillViewController
	}
}

export default class BuildingViewControllersTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		test: TestViewController,
		testSkillView: TestSkillViewController,
	}
	private static factory: ViewControllerFactory

	public static async beforeEach() {
		await super.beforeEach()
		this.factory = this.Factory()
	}

	@test()
	protected static async canCreateBuildingViewControllers() {
		assert.isTruthy(this.factory)
	}

	@test()
	protected static async throwsWithoutSettingConnectToApiHandler() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			ViewControllerFactory.Factory()
		)
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['connectToApi'],
		})
	}

	@test()
	protected static async throwsWithInvalidName() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.factory.Controller('bad_name'))
		errorAssertUtil.assertError(err, 'INVALID_VIEW_CONTROLLER_NAME')
	}

	@test()
	protected static hasController() {
		assert.isTrue(this.factory.hasController('test'))
	}

	@test()
	protected static doesNotHaveController() {
		assert.isFalse(this.factory.hasController('test-not-found'))
	}

	@test()
	protected static async getsVcFactoryInConstructorOptions() {
		const vc = this.factory.Controller('test', {})
		assert.isTruthy(vc.constructorOptions.vcFactory)
	}

	@test()
	protected static async canGetVcFactory() {
		const vc = this.factory.Controller('test', {})

		assert.isTruthy(vc.getVcFactory())
	}

	@test()
	protected static builtVcGetsConnectToApiHandler() {
		const vc = this.factory.Controller('test', {})
		assert.isTruthy(vc.constructorOptions.connectToApi)
	}

	@test()
	protected static canMixinControllers() {
		this.factory.mixinControllers({
			test2: TestViewController,
		})

		const vc = this.factory.Controller('test2', {})
		assert.isTruthy(vc)

		const vc2 = this.factory.Controller('test', {})
		assert.isTruthy(vc2)
	}

	@test()
	protected static controllersGetIdsSet() {
		const vc = this.factory.Controller('test', {})
		assert.isTruthy(vc)

		//@ts-ignore
		assert.isEqual(vc.id, 'test')
	}

	@test()
	protected static viewControllerGetTypesed() {
		const vc = this.factory.Controller('test', {})
		assert.isExactType<TestViewController, typeof vc>(true)
	}

	@test()
	protected static skillViewControllerGetTyped() {
		const vc = this.factory.Controller('testSkillView', {})
		assert.isExactType<TestSkillViewController, typeof vc>(true)
	}

	@test()
	protected static throwsIfViewControllerSetsIdProperty() {
		this.factory.mixinControllers({
			test3: TestViewControllerWithId,
		})

		//@ts-ignore
		const err = assert.doesThrow(() => this.factory.Controller('test3'))

		errorAssertUtil.assertError(err, 'INVALID_SKILL_VIEW_CONTROLLER')
	}

	@test()
	protected static getsTimeoutFunctions() {
		const testVc = this.Controller('test', {})
		assert.isEqual(testVc.constructorOptions.setTimeout, setTimeout)
		assert.isEqual(testVc.constructorOptions.clearTimeout, clearTimeout)
	}
}
