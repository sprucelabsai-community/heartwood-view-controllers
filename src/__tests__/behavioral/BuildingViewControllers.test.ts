import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
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

declare module '../../types/heartwood.types' {
	interface ViewControllerMap {
		test: typeof TestViewController
	}
}

export default class BuildingViewControllersTest extends AbstractSpruceTest {
	private static factory: ViewControllerFactory<any>

	public static async beforeEach() {
		await super.beforeEach()
		this.factory = ViewControllerFactory.Factory({
			controllerMap: {
				test: TestViewController,
			},
		})
	}

	@test()
	protected static async canCreateBuildingViewControllers() {
		assert.isTruthy(this.factory)
	}

	@test()
	protected static async throwsWithInvalidName() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.factory.Controller('bad_name'))
		errorAssertUtil.assertError(err, 'INVALID_VIEW_CONTROLLER_NAME')
	}

	@test()
	protected static async getsVcFactoryInConstructorOptions() {
		//@ts-ignore
		const vc = this.factory.Controller('test', {}) as TestViewController

		assert.isTruthy(vc.constructorOptions.vcFactory)
	}

	@test()
	protected static async canGetVcFactory() {
		//@ts-ignore
		const vc = this.factory.Controller('test', {}) as TestViewController

		assert.isTruthy(vc.getVcFactory())
	}
}
