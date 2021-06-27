import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import Authenticator from '../auth/Authenticator'
import SpruceError from '../errors/SpruceError'
import { ControllerOptions, ViewControllerMap } from '../types/heartwood.types'
import renderUtil from '../utilities/render.utility'
import AbstractViewController from '../viewControllers/Abstract.vc'
import ViewControllerFactory from '../viewControllers/ViewControllerFactory'
import MockStorage from './MockStorage'

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

	protected static Controller<N extends keyof ViewControllerMap>(
		name: N,
		options: ControllerOptions<N>
	) {
		const vc = this.Factory().Controller(name, options)

		//vc's have to be rendered once to attach counters
		this.render(vc)

		return vc
	}

	protected static render<Vc extends AbstractViewController<any>>(vc: Vc) {
		return renderUtil.render(vc)
	}
}
