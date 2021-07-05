import { validateSchemaValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { assert } from '@sprucelabs/test'
import cardSchema from '#spruce/schemas/heartwood/v2021_02_11/card.schema'
import { ConfirmOptions, ViewController } from '../../types/heartwood.types'
import normalizeFormSectionFieldNamesUtil from '../../utilities/normalizeFieldNames.utility'
import renderUtil from '../../utilities/render.utility'
import DialogViewController from '../../viewControllers/Dialog.vc'
import FormViewController from '../../viewControllers/Form.vc'
import ListViewController from '../../viewControllers/list/List.vc'
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

		//@ts-ignore
		if (!vc._triggerRenderPatched) {
			//@ts-ignore
			vc._triggerRenderPatched = true
			vc.triggerRender = () => {
				//@ts-ignore
				vc.__renderInvocationCount++
			}
		}
	},
	assertTriggerRenderCount(vc: Vc, expected: number) {
		//@ts-ignore
		let actual = vc.__renderInvocationCount

		if (typeof actual === 'undefined') {
			this.attachTriggerRenderCounter(vc)
			actual = 0
		}

		assert.isEqual(
			actual,
			expected,
			`Expected triggerRender of \`${
				//@ts-ignore
				vc.id ?? 'view controller'
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
		return new Promise((resolve, reject) => {
			let wasHit = false

			//@ts-ignore
			vc.confirm = async (options: ConfirmOptions) => {
				try {
					wasHit = true
					const results = confirmHandler?.(options) ?? true

					return results
				} catch (err) {
					reject(err)
				}
			}

			async function run() {
				await action()
				await wait()
				assert.isTrue(
					wasHit,
					'this.confirm() was not invoked in your view controller.'
				)
			}

			run().then(resolve).catch(reject)
		})
	},

	async assertRendersDialog(
		vc: ViewController<any>,
		action: () => void | Promise<void>,
		dialogHandler?: (dialogVc: DialogViewController) => void | Promise<void>
	): Promise<{ dialogVc: DialogViewController }> {
		return new Promise((resolve, reject) => {
			let wasHit = false
			let dialogVc: DialogViewController | undefined

			//@ts-ignore
			const oldRenderInDialog = vc.renderInDialog.bind(vc)
			//@ts-ignore
			vc.renderInDialog = (...args: any[]) => {
				dialogVc = oldRenderInDialog(...args)
				return dialogVc
			}

			let dialogHandlerPromise: any

			//@ts-ignore
			vc.renderInDialogHandler = ({ controller }) => {
				wasHit = true
				//@ts-ignore
				setTimeout(() => {
					dialogHandlerPromise = dialogHandler?.(controller)
				}, 0)
			}

			async function run() {
				try {
					await action()
					await wait()

					assert.isTrue(
						wasHit,
						'this.renderInDialog() was not invoked in your view controller.'
					)

					await dialogHandlerPromise

					assert.isTruthy(dialogVc)

					resolve({
						dialogVc,
					} as any)
				} catch (err) {
					reject(err)
				}
			}

			void run()
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

	assertCardRendersList(
		vc: ViewController<Card> | FormViewController<any>
	): ListViewController {
		const model = renderUtil.render(vc)

		//@ts-ignore
		const list = (model.body ?? model)?.sections
			//@ts-ignore
			?.map((s) => s.list)
			//@ts-ignore
			.find((l) => !!l)

		assert.isTrue(
			list?.controller instanceof ListViewController,
			"Expected to find a list inside your CardViewController, but didn't find one!"
		)

		return list?.controller
	},

	assertCardDoesNotRenderList(
		vc: ViewController<Card> | FormViewController<any>
	) {
		try {
			this.assertCardRendersList(vc)
		} catch {
			return
		}

		assert.fail(`Your view controller renders a list and it shouldn't.`)
	},

	assertDialogWasClosed(vc: DialogViewController) {
		assert.isFalse(vc.getIsVisible(), 'Dialog was not closed!')
	},

	assertRendersValidCard(vc: ViewController<Card>) {
		const model = renderUtil.render(vc)
		validateSchemaValues(cardSchema, model)

		if (model.footer?.buttons) {
			this.assertPrimaryButtonIsLastInFooter(model.footer)
		}
	},

	assertPrimaryButtonIsLastInFooter(
		footer: SpruceSchemas.Heartwood.v2021_02_11.CardFooter
	) {
		const primaryIdx = footer.buttons?.findIndex((b) => b.type === 'primary')

		if (
			footer.buttons &&
			typeof primaryIdx === 'number' &&
			primaryIdx > -1 &&
			footer.buttons?.[footer.buttons.length - 1]?.type !== 'primary'
		) {
			assert.fail('Your primary button has to be last in your footer.')
		}
	},

	assertFormRendersField(formVc: FormViewController<any>, fieldName: string) {
		const model = renderUtil.render(formVc)

		for (const section of model.sections) {
			const fields = normalizeFormSectionFieldNamesUtil.toNames(section.fields)
			if (fields.find((n) => n === fieldName)) {
				return
			}
		}

		assert.fail(
			`Form does not render field named ${fieldName}. Make sure it's set in sections.fields.`
		)
	},

	assertFormDoesNotRenderField(
		formVc: FormViewController<any>,
		fieldName: string
	) {
		try {
			this.assertFormRendersField(formVc, fieldName)
		} catch {
			return
		}

		assert.fail(`Form should not be rendering \`${fieldName}\`, but it is.`)
	},

	assertRendersCardHeader(
		cardVc: ViewController<SpruceSchemas.Heartwood.v2021_02_11.Card>
	) {
		const model = renderUtil.render(cardVc)
		assert.isObject(model.header, `Your card did not render a header!`)
	},

	assertRendersCardFooter(
		cardVc: ViewController<SpruceSchemas.Heartwood.v2021_02_11.Card>
	) {
		const model = renderUtil.render(cardVc)
		assert.isObject(model.footer, `Your card did not render a footer!`)
	},

	assertListRendersRows(
		listVc: ViewController<SpruceSchemas.Heartwood.v2021_02_11.List>,
		expectedTotalRows?: number
	) {
		const model = renderUtil.render(listVc)
		assert.isTruthy(
			model.rows,
			`Your list should have rendered rows, it didn't render anything.`
		)

		if (typeof expectedTotalRows === 'number') {
			assert.isLength(
				model.rows,
				expectedTotalRows,
				`Your list was supposed to render ${expectedTotalRows} row(s), but it rendered ${model.rows.length}.`
			)
		}
	},
}

export default vcAssertUtil
