import { validateSchemaValues } from '@sprucelabs/schema'
import { FieldDefinitions } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { assert } from '@sprucelabs/test'
import cardSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/card.schema'
import { ToolBeltViewController } from '../..'
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
type Button = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button
type CardSection =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection
type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
interface ConfirmViewController {
	accept: () => void | Promise<void>
	decline: () => void | Promise<void>
	options: ConfirmOptions
}

export function pluckAllFromCard<K extends keyof CardSection>(
	v: Card,
	key: K
): CardSection[K][] {
	return v.body?.sections?.map((s) => s?.[key]).filter((k) => !!k) ?? []
}

export function pluckFirstFromCard(v: Card, key: keyof CardSection) {
	return pluckAllFromCard(v, key)[0] as any
}

async function wait(...promises: (Promise<any> | undefined | void)[]) {
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

		for (const promise of promises) {
			promise?.then?.(done)
		}
	})
}

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
		action: () => void | Promise<void>
	) {
		let confirmVc: ConfirmViewController = {
			accept: async () => {},
			options: {},
			decline: async () => {},
		}

		let wasHit = false

		const confirmPromise = new Promise((confirmResolve) => {
			//@ts-ignore
			vc.confirm = async (options: ConfirmOptions) => {
				wasHit = true

				//@ts-ignore
				confirmResolve()

				confirmVc.options = options

				return new Promise((resolve) => {
					confirmVc.accept = async () => {
						resolve(true)
						await actionPromise
					}
					confirmVc.decline = async () => {
						resolve(false)
						await actionPromise
					}
				})
			}
		})

		const actionPromise = action()

		await wait(actionPromise, confirmPromise)

		assert.isTrue(
			wasHit,
			`this.confirm() was not invoked in your view controller within ${WAIT_TIMEOUT} milliseconds.`
		)

		return confirmVc
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

	async assertRendersAlert(
		vc: ViewController<any>,
		action: () => void | Promise<void>
	) {
		let wasAlertTriggered = false

		//@ts-ignore
		let oldAlert = vc.alert.bind(vc)

		//@ts-ignore
		vc.alert = (options: any) => {
			wasAlertTriggered = true
			return oldAlert(options)
		}

		let dlgVc: DialogViewController | undefined

		try {
			dlgVc = await vcAssertUtil.assertRendersDialog(vc, action)
		} catch {
			assert.fail(
				`Expected this.alert() to be called in your view and it wasn't.`
			)
		}

		assert.isTrue(
			wasAlertTriggered,
			`Expected this.alert() to be called in your view and it wasn't.`
		)

		return dlgVc as DialogViewController
	},

	async assertDoesNotRenderAlert(
		vc: ViewController<any>,
		action: () => void | Promise<void>
	) {
		try {
			await this.assertRendersAlert(vc, action)
		} catch {
			return
		}

		assert.fail(`Didn't expect your controller to render an alert, but it did!`)
	},

	async assertAsksForAVote(
		vc: ViewController<any>,
		action: () => Promise<void>
	) {
		let wasHit = false
		const voteVc = {
			castVote: async () => {},
		}

		let votePromise = new Promise((resolve: any) => {
			//@ts-ignores
			vc.voteHandler = async () => {
				wasHit = true
				resolve()
				await new Promise((resolve: any) => {
					voteVc.castVote = async () => {
						await resolve()
						await new Promise((resolve) => setTimeout(resolve, 0))
					}
				})
			}
		})

		await wait(action(), votePromise)

		assert.isTrue(
			wasHit,
			"I totally expected you to `await this.askForAVote()`, but you didn't."
		)

		return voteVc
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

				let dialogPromise = new Promise((resolve) => {
					//@ts-ignore
					vc.renderInDialog = (...args: any[]) => {
						dialogVc = oldRenderInDialog(...args)
						resolve(undefined)
						return dialogVc
					}
				})

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
						await wait(action(), dialogPromise)

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

		const form =
			pluckFirstFromCard(model, 'bigForm') || pluckFirstFromCard(model, 'form')

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
		const list = pluckFirstFromCard(
			//@ts-ignore
			model.body ? model : { body: model },
			'list'
		)

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
			this.assertLastButtonInCardFooterIsPrimaryIfThereAreAnyButtons(vc)
		}
	},

	assertLastButtonInCardFooterIsPrimaryIfThereAreAnyButtons(
		vc: ViewController<Card>
	) {
		const model = renderUtil.render(vc)
		const footer = model.footer ?? {}
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
		listVc: ListViewController,
		expectedRows?: number | string[]
	) {
		const model = renderUtil.render(listVc)
		assert.isTruthy(
			model.rows,
			`Your list should have rendered rows, it didn't render anything.`
		)

		if (typeof expectedRows === 'number') {
			assert.isLength(
				model.rows,
				expectedRows,
				`Your list was supposed to render ${expectedRows} row(s), but it rendered ${model.rows.length}.`
			)
		} else if (Array.isArray(expectedRows)) {
			for (const id of expectedRows) {
				this.assertListRendersRow(listVc, id)
			}
		}
	},

	assertListRendersRow(listVc: ListViewController, row: string | number) {
		if (typeof row === 'number') {
			return listVc.getRowVc(row)
		}
		return listVc.getRowVcById(row)
	},

	assertRowRendersButton(
		listVc: ListViewController,
		row: string | number,
		buttonId: string
	) {
		const rowVc = this.assertListRendersRow(listVc, row)
		const model = renderUtil.render(rowVc)

		for (const cell of model.cells ?? []) {
			if (cell.button?.id === buttonId) {
				return
			}
		}

		assert.fail(
			`Your list does not render a button with the id of '${buttonId}' in row '${row}''`
		)
	},

	assertListDoesNotRenderRow(listVc: ListViewController, row: string | number) {
		try {
			this.assertListRendersRow(listVc, row)
		} catch {
			return
		}
		assert.fail(`I found a row ${row} and I didn't expect to!`)
	},

	assertSkillViewRendersCard(
		vc: SkillViewController,
		id?: string
	): CardViewController {
		return this.assertSkillViewRendersCards(vc, id ? [id] : undefined)[0]
	},

	assertSkillViewDoesNotRenderCards(
		vc: SkillViewController,
		expected?: number | string[]
	) {
		try {
			this.assertSkillViewRendersCards(vc, expected)
		} catch {
			return
		}

		assert.fail(`I didn't expect to find cards`)
	},

	assertSkillViewDoesNotRenderCard(vc: SkillViewController, id: string) {
		try {
			this.assertSkillViewRendersCard(vc, id)
		} catch {
			return
		}

		assert.fail(`I didn't expect to find a card with the id ${id}`)
	},

	assertSkillViewRendersCards(
		vc: SkillViewController,
		expected?: number | string[]
	): CardViewController[] {
		const model = renderUtil.render(vc)
		const cards: CardViewController[] = []
		let matches: CardViewController[] = []

		for (const layout of model?.layouts ?? []) {
			for (const card of layout.cards ?? []) {
				if (card) {
					//@ts-ignore
					cards.push(card.controller ?? this.factory.Controller('card', card))
				}
			}
		}

		if (Array.isArray(expected)) {
			for (const id of expected) {
				const match = cards.find((c) => renderUtil.render(c).id === id)
				if (!match) {
					assert.fail(`I could not find a card with the id of ${id}!`)
				} else {
					matches.push(match)
				}
			}
		} else if (typeof expected === 'number' && cards.length !== expected) {
			assert.fail(
				`Expected your skill view to render ${expected} card${
					expected === 1 ? '' : 's'
				}, but it got ${cards.length}.`
			)
		} else if (typeof expected === 'undefined' && cards.length === 0) {
			assert.fail('Expected your skill view to render a card, but it did not!')
		} else {
			matches = cards
		}

		return matches
	},

	assertCardIsBusy(vc: ViewController<Card>) {
		const model = renderUtil.render(vc)
		if (!model.body?.isBusy) {
			assert.fail(
				`Expected your card body to be busy. Try \`this.setIsBus(true)\``
			)
		}
	},

	assertCardIsNotBusy(vc: ViewController<Card>) {
		const model = renderUtil.render(vc)
		if (model.body?.isBusy) {
			assert.fail(
				`Expected your card body to not be busy, but it was. Try \`this.setIsBusy(false)\`.`
			)
		}
	},

	assertRowRendersContent(
		vc: ListViewController,
		row: string | number,
		content: string
	) {
		const rowVc = this.assertListRendersRow(vc, row)
		const model = renderUtil.render(rowVc)

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

	assertFooterRendersButtonWithType(
		vc: ViewController<Card>,
		type?: Button['type']
	) {
		const model = renderUtil.render(vc)
		const buttons = model.footer?.buttons

		if (
			!buttons ||
			buttons.length === 0 ||
			(type && !buttons.find((b) => b.type === type))
		) {
			assert.fail(
				`Your footer is supposed to render a${
					type ? ` ${type}` : ''
				} button but it doesn't!`
			)
		}
	},

	assertCardRendersButtons(vc: ViewController<Card>, ids: string[]) {
		const model = renderUtil.render(vc)
		const buttons = [...(model.footer?.buttons ?? [])]

		pluckAllFromCard(model, 'buttons').forEach((b) => {
			if (b) {
				buttons.push(...b)
			}
		})

		const missing: string[] = []

		for (const id of ids) {
			const match = buttons.find((b) => b?.id === id)
			if (!match) {
				missing.push(id)
			}
		}

		if (missing.length > 0) {
			assert.fail(
				`Your card is missing buttons with the following ids: ${missing.join(
					', '
				)}`
			)
		}
	},

	assertCardRendersButton(vc: ViewController<Card>, id: string) {
		this.assertCardRendersButtons(vc, [id])
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

		return toolBelt?.controller as ToolBeltViewController | undefined
	},

	assertToolBeltRendersTool(svc: SkillViewController, toolId: string) {
		const toolBeltVc = this.assertRendersToolBelt(svc)

		const tool = toolBeltVc?.getTool?.(toolId)
		assert.isTruthy(
			tool,
			`I could not find a tool with the id of ${toolId} in your ToolBelt. Try this.toolBeltVc.addTool({...}).`
		)

		return {
			tool,
			cardVc: tool.card.controller as ViewController<Card>,
			toolBeltVc,
		}
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
				const calendar = pluckFirstFromCard(card ?? {}, 'calendar')
				if (calendar) {
					return
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

	assertCardRendersTalkingSprucebot(vc: ViewController<Card>) {
		const model = renderUtil.render(vc)
		const sprucebot = pluckFirstFromCard(model, 'talkingSprucebot')

		if (!sprucebot) {
			assert.fail('Your card does not render a talking sprucebot!')
		}

		//@ts-ignore
		return sprucebot.controller
	},

	assertCardDoesNotRenderTalkingSprucebot(vc: ViewController<Card>) {
		try {
			this.assertCardRendersTalkingSprucebot(vc)
		} catch {
			return
		}

		assert.fail(
			`Your Card wasn't supposed to render a talking sprucebot, but it is!`
		)
	},

	assertFormIsDisabled(vc: FormViewController<any>) {
		assert.isFalse(
			vc.isEnabled(),
			'Your form is enabled and it should not be! Try this.formVc.disable()'
		)
	},

	assertFormIsEnabled(vc: FormViewController<any>) {
		assert.isTrue(
			vc.isEnabled(),
			'Your form is not yet enabled! Try this.formVc.enable()'
		)
	},

	assertFormIsBusy(vc: FormViewController<any>) {
		assert.isTrue(
			vc.getIsBusy(),
			'Your form is not busy and should be! Try this.formVc.setIsBusy(true).'
		)
	},

	assertFormIsNotBusy(vc: FormViewController<any>) {
		assert.isFalse(
			vc.getIsBusy(),
			'Your form is still busy. Try this.formVc.setIsBusy(false) to stop it!'
		)
	},

	assertIsFullScreen(vc: SkillViewController) {
		const model = renderUtil.render(vc)

		assert.isTrue(
			model.isFullScreen,
			'Your skill view is not being rendered full screen. Try setting `isFullScreen:true` in your view model.'
		)
	},

	assertIsNotFullScreen(vc: SkillViewController) {
		try {
			this.assertIsFullScreen(vc)
		} catch {
			return
		}

		assert.fail(
			'Your skill view is being rendered full screen. Try setting `isFullScreen:false` in your view model.'
		)
	},

	async assertLoginIsRequired(vc: SkillViewController) {
		const isRequired = await vc.getIsLoginRequired?.()
		assert.isTrue(
			isRequired,
			//@ts-ignore
			`Your skill view ${vc.id} does not require login and it should! Try implementing \`public async getIsLoginRequired() { return true }\` in your SkillViewController.`
		)
	},

	async assertLoginIsNotRequired(vc: SkillViewController) {
		try {
			await this.assertLoginIsRequired(vc)
		} catch {
			return
		}

		assert.fail(
			`Your skill view does not require login and it should! Make sure \`getIsLoginRequired\` returns false in your SkillViewController.`
		)
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
