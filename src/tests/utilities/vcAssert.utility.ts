import { validateSchemaValues } from '@sprucelabs/schema'
import { FieldDefinitions } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { assert } from '@sprucelabs/test'
import cardSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/card.schema'
import { CORE_CONTROLLER_MAP } from '../../controllerMap'
import {
	ConfirmOptions,
	LineIcon,
	SkillViewController,
	ViewController,
	CardViewController,
} from '../../types/heartwood.types'
import normalizeFormSectionFieldNamesUtil from '../../utilities/normalizeFieldNames.utility'
import renderUtil from '../../utilities/render.utility'
import BigFormViewController from '../../viewControllers/BigForm.vc'
import DialogViewController from '../../viewControllers/Dialog.vc'
import FormViewController from '../../viewControllers/Form.vc'
import ListViewController from '../../viewControllers/list/List.vc'
import ListRowViewController from '../../viewControllers/list/ListRow.vc'
import ViewControllerFactory from '../../viewControllers/ViewControllerFactory'

const WAIT_TIMEOUT = 5000
type Vc = ViewController<any>

async function wait(promise?: Promise<any> | void) {
	return new Promise<void>((resolve) => {
		let isDone = false

		const done = () => {
			if (!isDone) {
				isDone = true

				setTimeout(() => {
					clearTimeout(timeout)
					resolve()
				}, 0)
			}

			isDone = true
		}

		const timeout = setTimeout(done, WAIT_TIMEOUT)
		promise?.then(done)
	})
}

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

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
				await wait(action())
				assert.isTrue(
					wasHit,
					`this.confirm() was not invoked in your view controller within ${WAIT_TIMEOUT} milliseconds.`
				)
			}

			run().then(resolve).catch(reject)
		})
	},

	async assertDoesNotRenderDialog(
		vc: ViewController<any>,
		action: () => void | Promise<void>
	) {
		try {
			await this.assertRendersDialog(vc, action)
		} catch {
			return
		}

		assert.fail(
			`Your view controller rendered a dialog and it should not have!`
		)
	},

	async assertRendersDialog(
		vc: ViewController<any>,
		action: () => void | Promise<void>,
		dialogHandler?: (dialogVc: DialogViewController) => void | Promise<void>
	): Promise<DialogViewController> {
		let run = () => {}
		return new Promise((resolve, reject) => {
			try {
				let wasHit = false
				let dialogVc: DialogViewController | undefined

				//@ts-ignore
				const oldRenderInDialog = vc.renderInDialog?.bind(vc) ?? function () {}
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
					setTimeout(async () => {
						dialogHandlerPromise = dialogHandler?.(controller)?.catch?.(
							(err) => {
								reject(err)
							}
						)
					}, 0)
				}

				run = async () => {
					try {
						await wait(action())

						assert.isTrue(
							wasHit,
							`this.renderInDialog() was not invoked in your view controller within ${WAIT_TIMEOUT} milliseconds.`
						)

						await dialogHandlerPromise

						assert.isTruthy(dialogVc)

						resolve(dialogVc)
					} catch (err) {
						reject(err)
					}
				}

				void run()
			} catch (err) {
				reject(err)
			}
		})
	},

	assertCardRendersForm(vc: ViewController<Card> | DialogViewController) {
		const model = renderUtil.render(vc)
		const form = model.body?.sections
			?.map((s) => s.form ?? s.bigForm)
			.find((s) => !!s)

		assert.isTrue(
			form?.controller instanceof FormViewController,
			"Expected to find a form inside your CardViewController, but didn't find one!"
		)

		return form?.controller as
			| FormViewController<any>
			| BigFormViewController<any>
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
		//@ts-ignore TODO make shouldAllowEditing part of formBuilderSchema
		delete model.shouldAllowEditing
		validateSchemaValues(cardSchema, model)

		if (model.footer?.buttons) {
			this.assertPrimaryButtonIsLastInFooter(model.footer)
		}
	},

	assertPrimaryButtonIsLastInFooter(
		footer: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter
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

	assertFormRendersField(
		formVc: FormViewController<any> | BigFormViewController<any>,
		fieldName: string,
		fieldDefinition?: Partial<FieldDefinitions>
	) {
		const model = renderUtil.render(formVc)
		const schema = formVc.getSchema()

		for (const section of model.sections) {
			const fields = normalizeFormSectionFieldNamesUtil.toObjects(
				section.fields,
				schema
			)
			const match = fields.find((n) => n.name === fieldName)

			if (match) {
				if (fieldDefinition) {
					assert.doesInclude(match, fieldDefinition)
				}

				return
			}
		}

		assert.fail(
			`Form does not render field named \`${fieldName}\`. Make sure it's in your form's schema and set in \`form.sections.fields\`.`
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

	assertFormRendersFields(
		formVc: FormViewController<any> | BigFormViewController<any>,
		fields: string[]
	) {
		for (const field of fields) {
			this.assertFormRendersField(formVc, field)
		}
	},

	assertCardRendersHeader(
		cardVc: ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>
	) {
		const model = renderUtil.render(cardVc)
		assert.isObject(model.header, `Your card did not render a header!`)
	},

	assertCardRendersFooter(
		cardVc: ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>
	) {
		const model = renderUtil.render(cardVc)
		assert.isObject(model.footer, `Your card did not render a footer!`)
	},

	assertListRendersRows(
		listVc: ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List>,
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

	assertSkillViewRendersCard(vc: SkillViewController): CardViewController {
		return this.assertSkillViewRendersCards(vc)[0]
	},

	assertSkillViewRendersCards(
		vc: SkillViewController,
		expectedCount?: number
	): CardViewController[] {
		const model = renderUtil.render(vc)
		const cards: CardViewController[] = []

		for (const layout of model?.layouts ?? []) {
			//@ts-ignore
			const card = layout.cards?.[0]

			if (card) {
				//@ts-ignore
				cards.push(card.controller ?? this.factory.Controller('card', card))
			}
		}

		if (typeof expectedCount === 'number' && cards.length !== expectedCount) {
			assert.fail(
				`Expected your skill view to render ${expectedCount} card${
					expectedCount === 1 ? '' : 's'
				}, but it got ${cards.length}.`
			)
		} else if (typeof expectedCount === 'undefined' && cards.length === 0) {
			assert.fail('Expected your skill view to render a card, but it did not!')
		}

		return cards
	},

	assertCardBodyIsLoading(vc: CardViewController) {
		if (!vc.isBodyLoading()) {
			assert.fail(
				`Expected your card body to have \`isLoading=true\`, but it wasn't.`
			)
		}
	},

	assertCardBodyIsNotLoading(vc: CardViewController) {
		if (vc.isBodyLoading()) {
			assert.fail(
				`Expected your card body to have \`isLoading=false\`, but it wasn't. Try \`this.setBodyIsLoading(false)\`.`
			)
		}
	},

	assertRowRendersContent(vc: ListRowViewController, content: string) {
		const model = renderUtil.render(vc)

		for (const cell of model.cells) {
			const value = `${cell.subText?.content ?? ''} 
				${cell.subText?.html ?? ''}
				${cell.text?.content ?? ''}
				${cell.text?.html ?? ''}
			${cell.button?.label ?? ''}`

			if (value?.toLowerCase().includes(content.toLowerCase())) {
				return
			}
		}
		assert.fail(
			`Expected a row to render content \`${content}\`, but it did not.`
		)
	},

	assertSkillViewDoesNotRenderViewController(
		vc: SkillViewController,
		VcClass: any
	) {
		try {
			this.assertSkillViewRendersViewController(vc, VcClass)
		} catch {
			return
		}
		//@ts-ignore
		assert.fail(`Expected not to find a ${VcClass.name} inside ${vc.id}!`)
	},

	assertSkillViewRendersViewController(vc: SkillViewController, VcClass: any) {
		const model = renderUtil.render(vc)
		const fieldsToCheck = Object.keys(CORE_CONTROLLER_MAP)

		for (const layout of model.layouts ?? []) {
			for (const card of layout.cards ?? []) {
				const vc = findControllerInModel(VcClass, card)
				if (vc) {
					return vc
				}
				for (const section of card.body?.sections ?? []) {
					for (const f of fieldsToCheck) {
						//@ts-ignore
						const m = section[f]
						const vc = findControllerInModel(VcClass, m)
						if (vc) {
							return vc
						}
					}
				}
			}
		}

		assert.fail(
			`Expected a ${
				VcClass.name ?? 'UknownViewController'
			} to be rendered in your skill view, but it wasn't!`
		)
	},

	assertRowRendersButtonWithIcon(vc: ListRowViewController, icon: LineIcon) {
		const model = renderUtil.render(vc)

		for (const cell of model?.cells ?? []) {
			if (cell.button?.lineIcon === icon) {
				return
			}
		}

		assert.fail(`Could not find button with \`lineIcon='${icon}'\` in row!`)
	},

	assertCardRendersForms(vc: CardViewController, count: number) {
		const model = renderUtil.render(vc)
		const forms =
			model.body?.sections
				?.map((s) => s.form?.controller ?? s.bigForm?.controller)
				.filter((s) => !!s) ?? []

		if (forms.length !== count) {
			assert.fail(
				`Expected your card to render ${count} form${
					count === 1 ? '' : 's'
				}, but I found ${forms.length === 0 ? 'none' : forms.length}!`
			)
		}

		return forms as FormViewController<any>[] | BigFormViewController<any>[]
	},

	assertCardRendersCriticalError(vc: CardViewController) {
		assert.isTrue(
			vc.getHasCriticalError(),
			'Your card did not have a critical error set.'
		)
	},

	assertCardDoesNotRenderCriticalError(vc: CardViewController) {
		assert.isFalse(
			vc.getHasCriticalError(),
			'Your card was not supposed to render a critical error!'
		)
	},

	assertRendersToolBelt(svc: SkillViewController) {
		const toolBelt = svc.renderToolBelt()

		assert.isTrue(
			(toolBelt?.tools?.length ?? 0) > 0,
			'Your skill view does not render a tool belt with any tools!'
		)

		return toolBelt?.controller
	},

	assertDoesNotRenderToolBelt(svc: SkillViewController) {
		try {
			this.assertRendersToolBelt(svc)
		} catch {
			return
		}

		assert.fail(`Your skill view should not be rendering a toolbelt with tools`)
	},

	assertRendersCalendar(svc: SkillViewController) {
		const model = renderUtil.render(svc)

		for (const layout of model.layouts ?? []) {
			for (const card of layout?.cards ?? []) {
				for (const section of card?.body?.sections ?? []) {
					if (section?.calendar) {
						return
					}
				}
			}
		}

		assert.fail('Your skill view does not render a calendar!')
	},

	assertDoesNotRenderCalendar(svc: SkillViewController) {
		try {
			this.assertRendersCalendar(svc)
		} catch {
			return
		}

		assert.fail('Your skill view should not be rendering a calendar right now!')
	},
}

export default vcAssertUtil

function findControllerInModel(VcClass: any, model: any) {
	if (model?.controller instanceof VcClass) {
		return model?.controller
	}

	if (
		VcClass.name.toLowerCase().includes(
			//@ts-ignore
			model?.controller?.id?.toLowerCase() ?? '******nope'
		)
	) {
		return model?.controller
	}

	return null
}
