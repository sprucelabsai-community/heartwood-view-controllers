import { test, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import { AbstractSkillViewController, ViewControllerOptions } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import CardViewController from '../../viewControllers/card/Card.vc'

class NoDestroy extends AbstractSkillViewController {
	public cardVc: CardViewController
	public cardVc2: CardViewController
	public constructor(options: ViewControllerOptions) {
		super(options)

		this.cardVc = this.Controller('card', { header: { title: 'hey!' } })
		this.cardVc2 = this.Controller('card', {})
	}

	public render() {
		return {
			layouts: [],
		}
	}
}

class NoChildren extends AbstractSkillViewController {
	public cardVc: CardViewController
	public cardVc2: CardViewController
	public constructor(options: ViewControllerOptions) {
		super(options)

		this.cardVc = this.Controller('card', { header: { title: 'hey!' } })
		this.cardVc2 = this.Controller('card', {})
	}

	public render() {
		return {
			layouts: [],
		}
	}
}

declare module '../../types/heartwood.types' {
	interface ViewControllerMap {
		noDestroy: NoDestroy
		noChildren: NoChildren
	}
}

export default class DestroyingVcsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		noDestroy: NoDestroy,
		noChildren: NoChildren,
	}

	protected static async beforeEach() {
		await super.beforeEach()
	}

	@test()
	protected static async factoryHasDestroy() {
		const vc = this.Controller('noDestroy', {})

		//@ts-ignore
		assert.isFunction(vc.destroy)

		//@ts-ignore
		await vc.destroy()
	}

	@test()
	protected static async destroyCallsDestroyOnChildren() {
		const vc = this.Controller('noDestroy', {})

		//@ts-ignore
		assert.isFalsy(vc.cardVc.wasDestroyed)

		//@ts-ignore
		await vc.destroy()

		//@ts-ignore
		assert.isTrue(vc.cardVc.wasDestroyed)

		//@ts-ignore
		assert.isTrue(vc.cardVc2.wasDestroyed)
	}

	@test()
	protected static async destroyWithNoChildren() {
		const vc = this.Controller('noChildren', {})

		//@ts-ignore
		await vc.destroy()
	}

	@test()
	protected static async destroysChildEvenWithoutLocalReference() {
		const vc = this.Controller('noDestroy', {})
		const card = vc.cardVc

		//@ts-ignore
		card.destroy

		//@ts-ignore
		delete vc.cardVc

		//@ts-ignore
		await vc.destroy()

		//@ts-ignore
		assert.isTrue(card.wasDestroyed)
	}

	@test()
	protected static async callingDestroyTwiceThrows() {
		const vc = this.Controller('noDestroy', {})
		await vc.destroy()
		const err = await assert.doesThrowAsync(() => vc.destroy())

		errorAssert.assertError(err, 'VIEW_ALREADY_DESTROYED')
	}
}
