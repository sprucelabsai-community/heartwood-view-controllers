import { test, assert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import toastAssert from '../../../tests/utilities/toastAssert'
import { ToastOptions } from '../../../types/heartwood.types'
import CardViewController from '../../../viewControllers/card/Card.vc'

export default class ToastTest extends AbstractViewControllerTest {
	private static vc: CardViewController

	protected static async beforeEach(): Promise<void> {
		await super.beforeEach()
		this.vc = this.Controller('card', {})
	}

	@test()
	protected static async canCreateToast() {
		let wasHit = false
		let passedOptions: ToastOptions | undefined
		this.views = this.Factory({
			toastHandler: (options) => {
				passedOptions = options
				wasHit = true
			},
		})

		const vc = this.views.Controller('card', {})

		const expected = {
			message: generateId(),
		}

		//@ts-ignore
		vc.toast(expected)

		assert.isEqual(wasHit, true)
		assert.isEqualDeep(passedOptions, expected)
	}

	@test()
	protected static async throwsWhenNotToasted() {
		await assert.doesThrowAsync(
			() => toastAssert.rendersToast(this.vc, () => {}),
			'this.toast'
		)

		await toastAssert.doesNotRenderToast(this.vc, () => {})
	}

	@test()
	protected static async knowsIfToastIsRendered() {
		this.vc = this.Controller('card', {})

		await toastAssert.rendersToast(this.vc, () => this.renderToast())

		await assert.doesThrowAsync(
			() => toastAssert.doesNotRenderToast(this.vc, () => this.renderToast()),
			'should not'
		)
	}

	private static renderToast(): void | Promise<void> {
		//@ts-ignore
		return this.vc.toast({ message: 'hi' })
	}
}
