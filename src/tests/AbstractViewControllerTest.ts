import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import Authenticator from '../auth/Authenticator'
import SpruceError from '../errors/SpruceError'
import { ControllerOptions, ViewControllerMap } from '../types/heartwood.types'
import AbstractViewController from '../viewControllers/Abstract.vc'
import ViewControllerFactory from '../viewControllers/ViewControllerFactory'
import { MockStorage } from './MockStorage'

export default abstract class AbstractViewControllerTest extends AbstractSpruceFixtureTest {
	protected static controllerMap: Record<string, any>

	protected static async beforeEach() {
		await super.beforeEach()
		Authenticator.reset()
		Authenticator.setStorage(new MockStorage())
	}

	protected static Factory() {
		if (!this.controllerMap) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: [
					'protected static controllerMap = { dashboard: DashboardSkillViewController, profileForm: ProfileFormViewController }',
				],
			})
		}

		const mercury = this.Fixture('mercury')

		return ViewControllerFactory.Factory({
			controllerMap: this.controllerMap,
			connectToApi: () => {
				return mercury.connectToApi()
			},
		})
	}

	public static Controller<N extends keyof ViewControllerMap>(
		name: N,
		options: ControllerOptions<N>
	) {
		const controller = this.Factory().Controller(name, options)

		//@ts-ignore
		controller.__triggerRenderCount = 0

		if (
			controller.triggerRender ===
			AbstractViewController.prototype.triggerRender
		) {
			controller.triggerRender = () => {
				//@ts-ignore
				controller.__triggerRenderCount++
			}
		}

		return controller
	}
}
