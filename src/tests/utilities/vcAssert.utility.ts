import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { assert } from '@sprucelabs/test'
import { ConfirmOptions, ViewController } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import AbstractViewController from '../../viewControllers/Abstract.vc'
import CardViewController from '../../viewControllers/Card.vc'
import DialogViewController from '../../viewControllers/Dialog.vc'
import FormViewController from '../../viewControllers/Form.vc'
import ViewControllerFactory from '../../viewControllers/ViewControllerFactory'

type Vc = ViewController<any>

async function wait() {
	return new Promise((resolve) => setTimeout(resolve, 0))
}

type Card = SpruceSchemas.Heartwood.v2021_02_11.Card

const vcAssertUtil = {
	_setVcFactory(factory: ViewControllerFactory) {
		//@ts-ignore
		this.factory = factory
	},
	attachTriggerRenderCounter(vc: Vc) {
		//@ts-ignore
		vc.__renderInvocationCount = 0

		if (vc.triggerRender === AbstractViewController.prototype.triggerRender) {
			vc.triggerRender = () => {
				//@ts-ignore
				vc.__renderInvocationCount++
			}
		}
	},
	assertTriggerRenderCount(vc: Vc, expected: number) {
		//@ts-ignore
		const actual = vc.__renderInvocationCount

		if (typeof actual === 'undefined') {
			assert.fail(
				'View controller was not instantiated using `this.Controller()`, so you must pass it through `vcAssertUtil.attachTriggerRenderCounter(vc)`'
			)
		}

		assert.isEqual(
			actual,
			expected,
			`Expected triggerRender of \`${
				//@ts-ignore
				vc.id
			}\` to be invoked \`${expected}\` time${
				expected === 1 ? '' : 's'
			}, but it was actually invoked \`${actual}\` time${
				actual === 1 ? '' : 's'
			}.`
		)
	},
	async assertRendersConfirm(
		vc: ViewController<any>,
		action: () => void | Promise<void>,
		confirmHandler?: (options: ConfirmOptions) => boolean | Promise<boolean>
	) {
		let wasHit = false

		//@ts-ignore
		vc.confirm = async (options: ConfirmOptions) => {
			wasHit = true
			return confirmHandler?.(options) ?? true
		}

		async function run() {
			void action()
			await wait()
			assert.isTrue(
				wasHit,
				'this.confirm() was not invoked in your view controller.'
			)
		}

		return new Promise((resolve, reject) => {
			run().then(resolve).catch(reject)
		})
	},

	async assertRendersDialog(
		vc: ViewController<any>,
		action: () => void | Promise<void>,
		dialogHandler?: (dialogVc: DialogViewController) => void | Promise<void>
	): Promise<{ dialogVc: DialogViewController }> {
		let wasHit = false
		let dialogVc: CardViewController | undefined

		//@ts-ignore
		const oldRenderInDialog = vc.renderInDialog.bind(vc)
		//@ts-ignore
		vc.renderInDialog = (...args: any[]) => {
			dialogVc = oldRenderInDialog(...args)
			return dialogVc
		}

		//@ts-ignore
		vc.renderInDialogHandler = async () => {
			wasHit = true
			//@ts-ignore
			await dialogHandler?.(dialogVc as any)
		}

		async function run() {
			void action()
			await wait()
			assert.isTrue(
				wasHit,
				'this.renderInDialog() was not invoked in your view controller.'
			)

			return {
				dialogVc,
			}
		}

		return new Promise((resolve, reject) => {
			//@ts-ignore
			run().then(resolve).catch(reject)
		})
	},

	assertCardContainsForm(vc: ViewController<Card> | DialogViewController) {
		const model = renderUtil.render(vc)
		const form = model.body?.sections?.map((s) => s.form).find((s) => !!s)

		assert.isTrue(
			form?.controller instanceof FormViewController,
			"Expected to find a form inside your CardViewController, but didn't find one!"
		)

		return form?.controller as FormViewController<any, any>
	},

	assertDialogWasClosed(vc: DialogViewController) {
		assert.isFalse(vc.getIsVisible(), 'Dialog was not closed!')
	},
}

export default vcAssertUtil
