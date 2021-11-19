import { SchemaError, SchemaRegistry } from '@sprucelabs/schema'
import AbstractSpruceTest from '@sprucelabs/test'
import Authenticator from '../auth/Authenticator'
import {
	ControllerOptions,
	ViewController,
	ViewControllerMap,
} from '../types/heartwood.types'
import renderUtil, { RenderOptions } from '../utilities/render.utility'
import SwipeViewController from '../viewControllers/Swipe.vc'
import ViewControllerFactory from '../viewControllers/ViewControllerFactory'
import MercuryFixture from './fixtures/MercuryFixture'
import MockStorage from './MockStorage'
import interactionUtil from './utilities/interaction.utility'
import vcAssertUtil from './utilities/vcAssert.utility'

export default abstract class AbstractViewControllerTest extends AbstractSpruceTest {
	protected static controllerMap: Record<string, any>
	private static mercuryFixture?: MercuryFixture

	protected static async beforeEach() {
		await super.beforeEach()
		Authenticator.reset()
		Authenticator.setStorage(new MockStorage())
		vcAssertUtil._setVcFactory(this.Factory())
		SchemaRegistry.getInstance().forgetAllSchemas()
		this.mercuryFixture = undefined
		SwipeViewController.swipeDelay = 0
		await MercuryFixture.beforeEach()
	}

	protected static async afterEach() {
		await super.afterEach()
		this.mercuryFixture?.destroy()
	}

	protected static Factory() {
		if (!this.controllerMap) {
			throw new SchemaError({
				code: 'MISSING_PARAMETERS',
				parameters: [
					'protected static controllerMap = { dashboard: DashboardSkillViewController, profileForm: ProfileFormViewController }',
				],
			})
		}

		const mercury = this.getMercuryFixture()

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
		//@ts-ignore
		this.render(vc)

		vcAssertUtil.attachTriggerRenderCounter(vc as any)

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
		return interactionUtil.click(button)
	}

	protected static getMercuryFixture() {
		if (!this.mercuryFixture) {
			this.mercuryFixture = new MercuryFixture(this.cwd)
		}

		return this.mercuryFixture
	}
}
