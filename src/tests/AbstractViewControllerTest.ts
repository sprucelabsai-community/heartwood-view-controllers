import { SpruceError as SchemaSpruceError } from '@sprucelabs/schema'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import Authenticator from '../auth/Authenticator'
import {
	ControllerOptions,
	ViewController,
	ViewControllerMap,
} from '../types/heartwood.types'
import renderUtil, { RenderOptions } from '../utilities/render.utility'
import SwipeViewController from '../viewControllers/Swipe.vc'
import ViewControllerFactory from '../viewControllers/ViewControllerFactory'
import MockStorage from './MockStorage'
import interactionUtil from './utilities/interaction.utility'
import vcAssertUtil from './utilities/vcAssert.utility'

export default abstract class AbstractViewControllerTest extends AbstractSpruceFixtureTest {
	protected static controllerMap: Record<string, any>

	protected static async beforeEach() {
		await super.beforeEach()
		Authenticator.reset()
		Authenticator.setStorage(new MockStorage())
		vcAssertUtil._setVcFactory(this.Factory())
		SwipeViewController.swipeDelay = 0
	}

	protected static Factory() {
		if (!this.controllerMap) {
			throw new SchemaSpruceError({
				code: 'MISSING_PARAMETERS',
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

	protected static render<Vc extends ViewController<any>>(
		vc: Vc,
		options?: RenderOptions
	) {
		return renderUtil.render(vc, options)
	}

	protected static click(
		button?: {
			onClick?: (() => void | Promise<void>) | null | undefined
		} | null
	) {
		return interactionUtil.click(button?.onClick)
	}
}
