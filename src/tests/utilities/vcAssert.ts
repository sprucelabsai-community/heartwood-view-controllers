import {
	assertOptions,
	SelectChoice,
	validateSchemaValues,
} from '@sprucelabs/schema'
import { FieldDefinitions } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { assert } from '@sprucelabs/test'
import cardSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/card.schema'
import { ButtonBarViewController } from '../..'
import { CORE_CONTROLLER_MAP } from '../../controllerMap'
import {
	ConfirmOptions,
	LineIcon,
	SkillViewController,
	ViewController,
	Router,
	CardViewController,
	ScopedBy,
} from '../../types/heartwood.types'
import normalizeFormSectionFieldNamesUtil from '../../utilities/normalizeFieldNames.utility'
import renderUtil from '../../utilities/render.utility'
import { AlertOptions } from '../../viewControllers/Abstract.vc'
import ActiveRecordCardViewController from '../../viewControllers/ActiveRecordCard.vc'
import BigFormViewController from '../../viewControllers/BigForm.vc'
import DialogViewController from '../../viewControllers/Dialog.vc'
import FormViewController from '../../viewControllers/Form.vc'
import FormBuilderCardViewController from '../../viewControllers/formBuilder/FormBuilderCard.vc'
import ListViewController from '../../viewControllers/list/List.vc'
import ListRowViewController from '../../viewControllers/list/ListRow.vc'
import ProgressViewController from '../../viewControllers/reporting/Progress.vc'
import StatsViewController from '../../viewControllers/reporting/Stats.vc'
import SwipeCardViewController from '../../viewControllers/SwipeCard.vc'
import TalkingSprucebotViewController from '../../viewControllers/TalkingSprucebot.vc'
import ToolBeltViewController from '../../viewControllers/ToolBelt.vc'
import ViewControllerFactory from '../../viewControllers/ViewControllerFactory'
import { attachTriggerRenderCounter } from './attachTriggerRenderCounter'
import formTestUtil from './formTest.utility'

const WAIT_TIMEOUT = 5000
export type Vc = ViewController<any>
type Button = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button
type CardSection =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection
type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
export interface ConfirmViewController {
	accept: () => any | Promise<any>
	decline: () => any | Promise<any>
	options: ConfirmOptions
}

export function pluckAllFromCard<K extends keyof CardSection>(
	model: Card,
	key: K
): CardSection[K][] {
	return model.body?.sections?.map((s) => s?.[key]).filter((k) => !!k) ?? []
}

export function pluckFirstFromCard(model: Card, key: keyof CardSection) {
	return pluckAllFromCard(model, key)[0] as any
}

async function wait(...promises: (Promise<any> | undefined | any)[]) {
	return new Promise<any>((resolve, reject) => {
		let isDone = false

		const done = () => {
			if (!isDone) {
				isDone = true

				setTimeout(() => {
					clearTimeout(timeout)
					//@ts-ignore
					resolve()
				}, 0)
			}

			isDone = true
		}

		const catcher = (err: any) => {
			if (!isDone) {
				isDone = true
				reject(err)
			} else {
				throw err
			}
		}

		const timeout = setTimeout(done, WAIT_TIMEOUT)

		for (const promise of promises) {
			promise?.catch?.(catcher)?.then?.(done)
		}
	})
}

export interface SelectViewController {
	getChoices: () => SelectChoice[]
	getIsRequired: () => boolean
}

export interface AssertRedirectOptions {
	router: Router
	action: () => Promise<any> | any
	destination?: {
		id?: string
		args?: Record<string, any>
	}
}

type FormVc = FormViewController<any> | BigFormViewController<any>

const vcAssert = {
	_setVcFactory(factory: ViewControllerFactory) {
		//@ts-ignore
		this.factory = factory
	},
	attachTriggerRenderCounter(vc: Vc) {
		//@ts-ignore
		attachTriggerRenderCounter(vc)
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
		action: () => any | Promise<any>
	) {
		let confirmVc: ConfirmViewController = {
			//@ts-ignore
			id: 'confirm',
			accept: async () => {},
			options: {},
			decline: async () => {},
		}

		let wasHit = false

		const confirmPromise = new Promise((confirmResolve) => {
			//@ts-ignore
			const originalConfirm = vc._originalConfirm

			//@ts-ignore
			vc.confirm = async (options: ConfirmOptions) => {
				wasHit = true

				originalConfirm?.()
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
		action: () => any | Promise<any>
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

	async assertRendersSuccessAlert(
		vc: ViewController<any>,
		action: () => any | Promise<any>
	) {
		await this.assertRendersAlert(vc, action, 'success')
	},

	async assertRendersAlert(
		vc: ViewController<any>,
		action: () => any | Promise<any>,
		style: AlertOptions['style'] = 'error'
	) {
		let wasAlertTriggered = false

		//@ts-ignore
		let oldAlert = vc._originalAlert ? vc._originalAlert : vc.alert.bind(vc)
		let alertOptions: any

		//@ts-ignore
		vc.alert = (options: any) => {
			wasAlertTriggered = true
			alertOptions = options
			return oldAlert(options)
		}

		let dlgVc: DialogViewController | undefined

		try {
			dlgVc = await this.assertRendersDialog(vc, action)
		} catch (err: any) {
			assert.fail(
				`Expected this.alert() to be called in your view '${getVcName(
					vc
				)}' within 5 seconds and it wasn't.${
					err.stack.includes('renderInDialog(')
						? ``
						: ` This was the specific error:\n\n${err.stack}`
				}`
			)
		}

		assert.isTrue(
			wasAlertTriggered,
			`Expected this.alert() to be called in '${getVcName(
				vc
			)}' within 5 seconds and it wasn't.`
		)

		//@ts-ignore
		dlgVc.alertOptions = alertOptions
		const passedStyle = alertOptions.style ?? 'error'

		assert.isEqual(
			passedStyle,
			style,
			`I expected this.alert({ type: '${style}' }) to be called in ${getVcName(
				vc
			)}, but it wasn't!`
		)

		return dlgVc as DialogViewController & {
			alertOptions: AlertOptions
		}
	},

	async assertDoesNotRenderAlert(
		vc: ViewController<any>,
		action: () => any | Promise<any>
	) {
		//@ts-ignore
		let oldAlert = vc._originalAlert
			? //@ts-ignore
			  vc._originalAlert.bind(vc)
			: //@ts-ignore
			  vc.alert?.bind(vc)

		let message = ''

		//@ts-ignore
		vc._originalAlert = (options: any) => {
			message = options.message
			return oldAlert(options)
		}

		try {
			await this.assertRendersAlert(vc, action)
		} catch {
			return
		}

		assert.fail(
			`Didn't expect your controller to render an alert, but it did! It reads:\n\n${message}`
		)
	},

	async assertAsksForAVote(
		vc: ViewController<any>,
		action: () => Promise<any>
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
		action: () => any | Promise<any>,
		dialogHandler?: (dialogVc: DialogViewController) => any | Promise<any>
	): Promise<DialogViewController> {
		let run = () => {}

		return new Promise((resolve, reject) => {
			try {
				let wasHit = false
				let dialogVc: DialogViewController | undefined
				//@ts-ignore
				const oldRenderInDialog =
					//@ts-ignore
					vc._originalRenderInDialog ??
					//@ts-ignore
					vc.renderInDialog?.bind(vc) ??
					function () {}

				let dialogPromise = new Promise((resolve) => {
					//@ts-ignore
					vc.renderInDialog = (...args: any[]) => {
						dialogVc = oldRenderInDialog(...args)
						//@ts-ignore
						dialogVc.getParent = () => {
							//@ts-ignore
							return dialogVc?.getCardVc().getParent()
						}

						resolve(undefined)
						return dialogVc
					}
				})

				let dialogHandlerPromise: any

				//@ts-ignore
				const originalHandler = vc.renderInDialogHandler?.bind(vc)

				//@ts-ignore
				vc.renderInDialogHandler = ({ controller }) => {
					wasHit = true

					originalHandler?.({ controller })

					//@ts-ignore
					setTimeout(async () => {
						dialogHandlerPromise = dialogHandler?.(controller)?.catch?.(
							(err: any) => {
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
		vc: ViewController<Card> | FormViewController<any>,
		id?: string
	): ListViewController {
		const model = renderUtil.render(vc)
		const lists = pluckAllFromCard(
			//@ts-ignore
			model.body ? model : { body: model },
			'list'
		)

		let foundList = false
		let foundById = false
		let match: any

		for (const list of lists) {
			if (!match && list?.controller instanceof ListViewController) {
				foundList = true
				match = list
			}

			if (id && list?.id === id) {
				foundById = true
				match = list
				break
			}
		}

		assert.isTrue(
			foundList,
			"Expected to find a list inside your CardViewController, but didn't find one!"
		)

		if (id) {
			assert.isTrue(foundById, `Found a list, but nothing with the id '${id}'!`)
		}

		return match?.controller
	},

	assertCardDoesNotRenderList(
		vc: ViewController<Card> | FormViewController<any>,
		id?: string
	) {
		try {
			this.assertCardRendersList(vc, id)
		} catch {
			return
		}

		assert.fail(
			`Your view controller renders a list${
				id ? ` with the id '${id}'` : ''
			} and it shouldn't.`
		)
	},

	assertCardRendersButtonBar(
		cardVc: ViewController<Card>
	): ButtonBarViewController {
		assertOptions({ cardVc }, ['cardVc'])

		const model = renderUtil.render(cardVc)

		const match = model.body?.sections?.find((s) => !!s.buttonBar)

		assert.isTruthy(match, `Your card does not render a button bar.`)

		return match.buttonBar?.controller as any
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
		formVc: FormVc,
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

	assertFormDoesNotRenderField(formVc: FormVc, fieldName: string) {
		try {
			this.assertFormRendersField(formVc, fieldName)
		} catch {
			return
		}

		assert.fail(`Form should not be rendering \`${fieldName}\`, but it is.`)
	},

	assertFormRendersFields(formVc: FormVc, fields: string[]) {
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

	assertButtonBarRendersButton(
		buttonBarVc: ButtonBarViewController,
		buttonId: string
	) {
		assertOptions({ buttonBarVc, buttonId }, ['buttonBarVc', 'buttonId'])

		const model = renderUtil.render(buttonBarVc)
		const match = model.buttons.find((b) => b.id === buttonId)

		assert.isTruthy(
			match,
			`Your button bar doesn't have a button with the id '${buttonId}'`
		)
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
		return listVc.getRowVc(row)
	},

	assertRowRendersCalendar(listVc: ListViewController, row: string | number) {
		assertOptions({ listVc, row }, ['listVc', 'row'])

		const rowVc = listVc.getRowVc(row)
		const model = renderUtil.render(rowVc)

		const match = model.cells.find((c) => c.calendar)

		assert.isTruthy(match, `I could not find a calendar in row '${row}'!`)

		assert.isEqual(
			match?.calendar?.view,
			'month',
			`Your calendar needs view='month' in order to render in a row!`
		)
	},

	assertRowRendersButtonBar(
		listVc: ListViewController,
		row: string | number
	): ButtonBarViewController {
		assertOptions({ listVc, row }, ['listVc', 'row'])

		const rowVc = listVc.getRowVc(row)
		const model = renderUtil.render(rowVc)

		for (const cell of model.cells ?? []) {
			if (cell.buttonBar) {
				return cell.buttonBar.controller as any
			}
		}

		assert.fail(
			`I could not find a buttonBar inside your list at row '${row}'!`
		)

		return {} as any
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
			`Your list does not render a button with the id of '${buttonId}' in row '${row}'.`
		)
	},

	assertRowDoesNotRenderButton(
		listVc: ListViewController,
		row: string | number,
		buttonId: string
	) {
		try {
			this.assertRowRendersButton(listVc, row, buttonId)
		} catch {
			return
		}
		assert.fail(
			`Your list renders a button with the id of '${buttonId}' in row '${row}' and it should not!`
		)
	},

	assertListDoesNotRenderRow(listVc: ListViewController, row: string | number) {
		try {
			this.assertListRendersRow(listVc, row)
		} catch {
			return
		}
		assert.fail(`I found a row '${row}' and I didn't expect to!`)
	},

	assertSkillViewRendersSwipeCard(
		vc: SkillViewController
	): SwipeCardViewController {
		assertOptions({ vc }, ['vc'])

		const model = renderUtil.render(vc)

		for (const layout of model.layouts) {
			for (const card of layout.cards ?? []) {
				if (card.controller instanceof SwipeCardViewController) {
					return card.controller
				}
			}
		}
		assert.fail(`I could not find a swipe view in '${getVcName(vc)}'!`)
		return {} as any
	},

	assertSkillViewRendersFormBuilder(
		vc: SkillViewController,
		id?: string
	): FormBuilderCardViewController {
		const model = renderUtil.render(vc)

		for (const layout of model.layouts) {
			for (const card of layout.cards ?? []) {
				const vc = card?.controller
				//@ts-ignore
				if (vc && vc.__isFormBuilder && (!id || card.id === id)) {
					return vc as any
				}
			}
		}

		assert.fail(
			`Could not find a form builder${
				id ? ` with the id ${id}` : ''
			} in your skill view!`
		)

		return {} as any
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
				`Expected your card '${getVcName(
					vc
				)}' to be busy. Try \`this.setIsBusy(true)\` or setting { body: { isBusy: true } }`
			)
		}
	},

	assertCardIsNotBusy(vc: ViewController<Card>) {
		const model = renderUtil.render(vc)
		if (model.body?.isBusy) {
			assert.fail(
				`Expected your card '${getVcName(
					vc
				)}' not to be busy, but it was. Try \`this.setIsBusy(false)\`.`
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

	assertCardDoesNotRenderButtons(vc: ViewController<Card>, ids: string[]) {
		try {
			this.assertCardRendersButtons(vc, ids)
		} catch {
			return
		}

		const { found } = checkForButtons(vc, ids)

		assert.fail(
			`I did not expect your card to render buttons:\n\n${found.join(', ')}`
		)
	},

	assertCardDoesNotRenderButton(vc: ViewController<Card>, id: string) {
		try {
			this.assertCardRendersButton(vc, id)
		} catch {
			return
		}

		assert.fail(
			`I did not expect your card to render a button with the id '${id}', but it did!`
		)
	},

	assertCardRendersButtons(vc: ViewController<Card>, ids: string[]) {
		const { missing } = checkForButtons(vc, ids)

		if (missing.length > 0) {
			assert.fail(
				`Your card '${getVcName(
					vc
				)}' is missing buttons with the following ids: ${missing.join(', ')}`
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

	async assertActionFocusesTool(
		svcOrToolBelt: SkillViewController | ToolBeltViewController,
		toolId: string,
		action: () => Promise<any> | any
	) {
		const toolBeltVc = this.assertRendersToolBelt(svcOrToolBelt, false)

		let passedToolId: any

		toolBeltVc.focusTool = (id: string) => {
			passedToolId = id
		}

		await wait(action())

		this.assertToolBeltRendersTool(svcOrToolBelt, toolId)

		assert.isTruthy(
			passedToolId,
			`I expected you to focus the tool '${toolId}', but you didn't! Try 'this.toolBeltVc.focusTool('${toolId}')'`
		)

		assert.isEqual(
			passedToolId,
			toolId,
			`You did not focus the tool I expected. I was waiting for '${toolId}' but got '${passedToolId}'.`
		)
	},

	assertRendersToolBelt(
		svcOrToolBelt: SkillViewController | ToolBeltViewController,
		assertHasAtLeast1Tool = true
	) {
		let toolBelt:
			| SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBelt
			| undefined
			| null

		if (svcOrToolBelt instanceof ToolBeltViewController) {
			toolBelt = svcOrToolBelt.render()
		} else {
			const svc = svcOrToolBelt
			assert.isFunction(
				svc.renderToolBelt,
				`Your skill view '${getVcName(
					svc
				)}' needs\n\n'public renderToolBelt() { return this.toolBeltVc.render() }'`
			)
			toolBelt = svc.renderToolBelt()
		}

		if (assertHasAtLeast1Tool) {
			assert.isTrue(
				(toolBelt?.tools?.length ?? 0) > 0,
				'You tool belt does not render any tools!'
			)
		}

		return toolBelt?.controller as ToolBeltViewController
	},

	assertToolInstanceOf(
		svcOrToolBelt: SkillViewController | ToolBeltViewController,
		toolId: string,
		Class: any
	): ViewController<any> {
		const vc = this.assertRendersToolBelt(svcOrToolBelt)
		const tool = vc.getTool(toolId)

		assert.isTruthy(tool, `The tool '${toolId}' does not exist!`)

		const checks = [
			tool?.card?.controller,
			//@ts-ignore
			tool?.card?.controller?.getParent?.(),
		]

		for (const check of checks) {
			assert.isTruthy(
				check,
				`Your tool wasn't properly rendered. Make sure you are either render another vc:\n\npublic render() { return this.cardVc.render() }\n\nor control it yourself\n\npublic render() { return { controller: this }}`
			)

			const match = isVcInstanceOf(check, Class)
			if (match) {
				return match as any
			}
		}

		assert.fail(`The tool '${toolId}' wasn't an instance of a '${Class.name}'`)

		return null as any
	},

	assertToolBeltDoesNotRenderTool(
		svc: SkillViewController | ToolBeltViewController,
		toolId: string
	) {
		try {
			this.assertToolBeltRendersTool(svc, toolId)
		} catch {
			return
		}
		assert.fail(`You rendered the tool '${toolId}' and should not have!`)
	},
	assertToolBeltRendersTool(
		svcOrToolBelt: SkillViewController | ToolBeltViewController,
		toolId: string
	) {
		const toolBeltVc = this.assertRendersToolBelt(svcOrToolBelt)

		const tool = toolBeltVc?.getTool?.(toolId)
		assert.isTruthy(
			tool,
			`I could not find a tool with the id of '${toolId}' in your ToolBelt. Try this.toolBeltVc.addTool({...}).`
		)

		return tool.card.controller as ViewController<Card>
	},

	assertDoesNotRenderToolBelt(svc: SkillViewController) {
		try {
			this.assertRendersToolBelt(svc)
		} catch {
			return
		}

		assert.fail(`Your skill view should not be rendering a toolbelt with tools`)
	},

	assertSkillViewRendersCalendar(svc: SkillViewController) {
		const model = renderUtil.render(svc)

		for (const layout of model.layouts ?? []) {
			for (const card of layout?.cards ?? []) {
				const calendar = pluckFirstFromCard(card ?? {}, 'calendar')
				if (calendar) {
					return calendar.controller
				}
			}
		}

		assert.fail('Your skill view does not render a calendar!')
	},

	assertCardRendersCalendar(vc: ViewController<Card>) {
		const model = renderUtil.render(vc)
		const calendar = pluckFirstFromCard(model, 'calendar')

		if (calendar) {
			return calendar.controller
		}

		assert.fail(`Your card '${getVcName(vc)}' does not render a calendar!`)
	},

	assertCardDoesNotRenderCalendar(vc: ViewController<Card>) {
		try {
			this.assertCardRendersCalendar(vc)
		} catch {
			return
		}

		assert.fail(`Your card rendered a calendar and should not.`)
	},

	/**
	 * @deprecated - use assertSkillViewRendersCalendar
	 */
	assertRendersCalendar(svc: SkillViewController) {
		return this.assertSkillViewRendersCalendar(svc)
	},

	assertSkillViewDoesNotRenderCalendar(svc: SkillViewController) {
		try {
			this.assertSkillViewRendersCalendar(svc)
		} catch {
			return
		}

		assert.fail('Your skill view should not be rendering a calendar right now!')
	},
	/**
	 * @deprecated - use assertSkillViewDoesNotRenderCalendar
	 */
	assertDoesNotRenderCalendar(svc: SkillViewController) {
		return this.assertSkillViewDoesNotRenderCalendar(svc)
	},

	assertCardRendersTalkingSprucebot(
		vc: ViewController<Card>
	): TalkingSprucebotViewController {
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
			`Your skill view ${getVcName(
				vc
			)} does not require login and it should! Try implementing \`public async getIsLoginRequired() { return true }\` in your SkillViewController.`
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

	async assertActionDoesNotRedirect(
		options: Omit<AssertRedirectOptions, 'destination'>
	) {
		try {
			await this.assertActionRedirects(options)
		} catch {
			return
		}

		assert.fail(`You redirected and should not have!`)
	},

	async assertActionRedirects(options: AssertRedirectOptions) {
		const { router, action, destination } = options

		//@ts-ignore
		const oldRedirect = router._originalRedirect ?? router.redirect.bind(router)

		let wasHit = false
		let failMessage: any | undefined
		let results: any | undefined

		const redirectPromise = new Promise((resolve: any) => {
			//@ts-ignore
			router.redirect = async (id: any, args: any) => {
				try {
					wasHit = true

					if (destination?.id && destination.id !== id) {
						assert.fail(
							`I expected to be redirected to '${destination.id}' but I was sent to '${id}'.`
						)
						return
					}

					if (destination?.args) {
						assert.isEqualDeep(
							args,
							destination.args,
							`The args you passed to your redirect are not what I expected!`
						)
					}

					//@ts-ignore
					results = oldRedirect(id, args)
					await results
				} catch (err: any) {
					failMessage = err
				}
				resolve()
			}
		})

		await wait(action())

		assert.isTrue(wasHit, `I expected to be redirected, but was not!`)

		await redirectPromise

		if (failMessage) {
			throw failMessage
		}

		return results
	},

	assertRowRendersToggle(
		listVc: ListViewController,
		row: string | number,
		toggleName?: string
	) {
		const rowVc = this.assertListRendersRow(listVc, row)
		const model = renderUtil.render(rowVc)

		for (const cell of model.cells ?? []) {
			if (toggleName && cell.toggleInput?.name === toggleName) {
				return
			} else if (!toggleName && cell.toggleInput) {
				return
			}
		}

		assert.fail(
			`Could not find a toggle${
				toggleName ? ` named '${toggleName}'` : ''
			} in row '${row}' in your list!`
		)
	},

	assertRowIsSelected(listVc: ListViewController, row: string | number) {
		this.assertRowsAreSelected(listVc, [row])
	},

	assertRowIsNotSelected(listVc: ListViewController, row: string | number) {
		try {
			this.assertRowIsSelected(listVc, row)
		} catch {
			return
		}

		assert.fail(`I didn't expect row '${row}' to be selected, but it was!`)
	},

	assertRowsAreSelected(listVc: ListViewController, rows: (string | number)[]) {
		for (const row of rows) {
			const rowVc = listVc.getRowVc(row)

			if (!rowVc.getIsSelected()) {
				assert.fail(`I expected row '${row}' to be selected, but it wasn't!!`)
			}
		}
	},

	assertRowIsEnabled(listVc: ListViewController, row: string | number) {
		const rowVc = listVc.getRowVc(row)
		const model = renderUtil.render(rowVc)
		assert.isTrue(model.isEnabled ?? true, `The row '${row}' is not enabled!`)
	},

	assertRowIsDisabled(listVc: ListViewController, row: string | number) {
		try {
			this.assertRowIsEnabled(listVc, row)

			// eslint-disable-next-line no-empty
		} catch {
			return
		}

		assert.fail(
			`I expected row '${row}' to be disabled, but it was actually enabled!`
		)
	},

	assertRowDoesNotRenderToggle(
		listVc: ListViewController,
		row: string | number,
		toggleName?: string
	) {
		try {
			this.assertRowRendersToggle(listVc, row, toggleName)
		} catch {
			return
		}

		assert.fail(
			`I found a toggle${
				toggleName ? ` named '${toggleName}'` : ''
			} in row '${row}' and I didn't expect to.`
		)
	},

	assertRowRendersSelect(
		listVc: ListViewController,
		row: string | number
	): SelectViewController {
		const rowVc = listVc.getRowVc(row)
		const model = renderUtil.render(rowVc)

		for (const cell of model.cells ?? []) {
			if (cell.selectInput) {
				return {
					getChoices() {
						return cell.selectInput?.choices ?? []
					},
					getIsRequired() {
						return !!cell.selectInput?.isRequired
					},
				}
			}
		}

		assert.fail(
			`Could not find select in row '${row}' and I totally expected to!`
		)

		return {} as any
	},

	assertRowRendersRatings(listVc: ListViewController, row: string | number) {
		const rowVc = listVc.getRowVc(row)
		const model = renderUtil.render(rowVc)

		for (const cell of model.cells ?? []) {
			if (cell.ratingsInput) {
				return
			}
		}

		assert.isTruthy(
			model.cells?.[0]?.ratingsInput,
			`I couldn't find a ratingsInput in row '${row}'!`
		)
	},

	assertSkillViewRendersActiveRecordCard(
		svc: SkillViewController,
		id?: string
	) {
		const cardVc = this.assertSkillViewRendersCard(svc, id)

		assert.isTruthy(
			//@ts-ignore
			cardVc.__isActiveRecord,
			`I expected to find an active record card with the id of ${id}, but I didn't!`
		)

		//@ts-ignore
		return cardVc.__activeRecordParent
	},

	assertIsActiveRecordCard(vc: ViewController<Card>) {
		assert.isTruthy(
			//@ts-ignore
			vc instanceof ActiveRecordCardViewController || vc.__activeRecordParent,
			`The card you sent was not an active record card!`
		)
	},

	assertControllerInstanceOf<Controller extends ViewController<any>>(
		vc: ViewController<any>,
		Class: new (...arg: any[]) => Controller
	): Controller {
		const match = isVcInstanceOf(vc, Class)

		assert.isTruthy(
			match,
			`Expected your ${
				Object.getPrototypeOf(vc)?.constructor?.name ?? 'view controller'
			} to be an instance of ${Class.name}, but it wasn't!`
		)

		return match as unknown as Controller
	},

	assertRendersAsInstanceOf<Controller extends ViewController<any>>(
		vc: ViewController<any>,
		Class: new (...args: any[]) => Controller
	): Controller {
		try {
			const model = renderUtil.render(vc)
			assert.isTruthy(
				model.controller,
				`Your view controller does not return a controllor. Make sure you return 'controller:this' from rende() or that you're rending a built in skill view.`
			)
			return this.assertControllerInstanceOf<Controller>(
				model.controller,
				Class
			)
		} catch {
			assert.fail(
				`Expected your ${
					Object.getPrototypeOf(vc)?.constructor?.name ?? 'view controller'
				} to render a controller that is an instance of ${
					Class.name
				}, but it didn't!`
			)
		}

		return {} as Controller
	},

	assertCardRendersStats(vc: ViewController<Card>) {
		const model = renderUtil.render(vc)
		const match = pluckFirstFromCard(model, 'stats')
		assert.isTruthy(
			match,
			`Your card did not render stats and I expected it to!`
		)

		return match.controller
	},

	assertStatsRendersValue(vc: StatsViewController, idx: number, value: number) {
		const model = renderUtil.render(vc)
		const expected = model.stats[idx]?.value
		assert.isEqual(
			expected,
			value,
			`Expected stats to render '${value}' at index '${idx}', but found '${
				expected ?? 'nothing'
			}'.`
		)
	},

	async assertRendersAlertThenRedirects(
		options: AssertRedirectOptions & { vc: ViewController<any> }
	) {
		await this.assertActionRedirects({
			...options,
			action: async () => {
				const alertVc = await this.assertRendersAlert(
					options.vc,
					options.action
				)

				await alertVc.hide()
			},
		})
	},

	patchAlertToThrow(vc: ViewController<any>) {
		//@ts-ignore
		if (!vc._originalAlert) {
			//@ts-ignore
			vc._originalAlert = vc.alert.bind(vc)
		}

		//@ts-ignore
		vc.alert = async (options: AlertOptions) => {
			if (!options.style || options.style === 'error') {
				assert.fail(
					`Skill view '${getVcName(
						vc
					)}' unexpectedly rendered an error alert. It reads:\n\n${
						options.message
					}`
				)
			}
		}
	},

	/**
	 * @deprecated use formTestUtil.patchSubmitToThrow() instead
	 */
	patchSubmitToThrow() {
		formTestUtil.patchSubmitToThrow()
	},

	assertCardRendersProgress(
		vc: ViewController<Card>,
		expectedPercentComplete?: number
	): ProgressViewController {
		const model = renderUtil.render(vc)

		const progress = pluckFirstFromCard(model, 'progress')
		assert.isTruthy(
			progress,
			`I expected your card to render progress view, but it didn't!`
		)

		//@ts-ignore
		const controller = progress.controller

		const progressModel = renderUtil.render(
			controller ?? { render: () => ({}) }
		)

		if (typeof expectedPercentComplete === 'number') {
			assert.isEqual(
				expectedPercentComplete,
				progressModel.percentComplete,
				`Expected progress to be at '${expectedPercentComplete}', but found '${
					progressModel.percentComplete ?? 'nothing'
				}'`
			)
		}

		//@ts-ignore
		return controller
	},

	assertCardRendersRatings(vc: ViewController<Card>) {
		const model = renderUtil.render(vc)
		const progress = pluckFirstFromCard(model, 'ratings')

		assert.isTruthy(
			progress,
			`Expected to find a ratings view inside your card, but I didn't!`
		)

		return progress.controller
	},

	assertSkillViewNotScoped(vc: SkillViewController) {
		const scope = vc.getScopedBy?.() ?? 'none'
		assert.isEqual(
			scope,
			'none',
			`Your skill view '${getVcName(
				vc
			)}' should not be scoped, but is set to '${scope}'!`
		)
	},

	assertSkillViewScopedBy(vc: SkillViewController, scopedBy: ScopedBy) {
		if (scopedBy !== 'location' && scopedBy !== 'organization') {
			assert.fail(
				`Valid scopes are 'none', 'location', or 'organization'. You passed '${scopedBy}'.`
			)
		}

		const scope = vc.getScopedBy?.() ?? 'none'
		assert.isEqual(
			scope,
			scopedBy,
			`Your skill view '${getVcName(
				vc
			)}' should be scoped to ${scopedBy}, but is set to '${scope}' Try \`public getScopedBy = () => '${scopedBy}' as const\`!`
		)
	},
}

export default vcAssert

function checkForButtons(
	vc: ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>,
	ids: string[]
): { found: string[]; missing: string[] } {
	const model = renderUtil.render(vc)
	const buttons = [...(model.footer?.buttons ?? [])]

	pluckAllFromCard(model, 'buttons').forEach((b) => {
		if (b) {
			buttons.push(...b)
		}
	})

	const missing: string[] = []
	const found: string[] = []

	for (const id of ids) {
		const match = buttons.find((b) => b?.id === id)
		if (!match) {
			missing.push(id)
		} else {
			found.push(id)
		}
	}
	return { found, missing }
}

export function getVcName(vc: ViewController<any>) {
	return (
		//@ts-ignore
		vc.id ?? Object.getPrototypeOf(vc)?.constructor?.name ?? `view controller`
	)
}

function isVcInstanceOf<C>(vc: any, Class: new () => C): C | false {
	if (vc) {
		if (vc instanceof Class) {
			return vc
		} else if (vc?.getParent?.() instanceof Class) {
			return vc.getParent()
		} else if (vc?.getParent?.()?.getParent?.() instanceof Class) {
			return vc?.getParent?.()?.getParent?.()
		}
	}

	return false
}

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
