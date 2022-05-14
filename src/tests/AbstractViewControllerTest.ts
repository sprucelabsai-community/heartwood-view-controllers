import { SchemaRegistry } from '@sprucelabs/schema'
import AbstractSpruceTest from '@sprucelabs/test'
import Authenticator from '../auth/Authenticator'
import {
	ControllerOptions,
	ViewController,
	ViewControllerMap,
} from '../types/heartwood.types'
import renderUtil, { RenderOptions } from '../utilities/render.utility'
import SwipeCardViewController from '../viewControllers/SwipeCard.vc'
import ViewControllerFactory from '../viewControllers/ViewControllerFactory'
import MercuryFixture from './fixtures/MercuryFixture'
import SpyDevice from './SpyDevice'
import StubStorage from './StubStorage'
import interactor from './utilities/interactor'
import vcAssert from './utilities/vcAssert.utility'

export default abstract class AbstractViewControllerTest extends AbstractSpruceTest {
	protected static controllerMap: Record<string, any> = {}
	private static mercuryFixture?: MercuryFixture
	private static views?: ViewControllerFactory

	protected static get mercury() {
		if (!this.mercuryFixture) {
			this.mercuryFixture = new MercuryFixture(this.cwd)
		}

		return this.mercuryFixture
	}

	protected static async beforeEach() {
		await super.beforeEach()
		Authenticator.reset()
		Authenticator.setStorage(new StubStorage())
		vcAssert._setVcFactory(this.Factory())
		SchemaRegistry.getInstance().forgetAllSchemas()
		this.mercuryFixture = undefined
		SwipeCardViewController.swipeDelay = 0
		this.views = undefined
		await MercuryFixture.beforeEach()
	}

	protected static async afterEach() {
		await super.afterEach()
		this.mercuryFixture?.destroy()
	}

	protected static Factory() {
		const mercury = this.mercury

		return ViewControllerFactory.Factory({
			controllerMap: this.controllerMap,
			device: new SpyDevice(),
			connectToApi: () => {
				return mercury.connectToApi()
			},
		})
	}

	protected static getFactory() {
		if (!this.views) {
			this.views = this.Factory()
		}

		return this.views
	}

	protected static Controller<N extends keyof ViewControllerMap>(
		name: N,
		options: ControllerOptions<N>
	) {
		const vc = this.getFactory().Controller(name, options)

		//vc's have to be rendered once to attach counters
		//@ts-ignore
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
		return interactor.click(button)
	}
}
