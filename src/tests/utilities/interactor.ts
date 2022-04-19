import { dateUtil } from '@sprucelabs/calendar-utils'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test'
import { DropEventOptions, ListViewController } from '../..'
import { KeyboardKey, ViewController } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import BigFormViewController from '../../viewControllers/BigForm.vc'
import FormViewController from '../../viewControllers/Form.vc'
import ListRowViewController from '../../viewControllers/list/ListRow.vc'
import LoginViewController from '../../viewControllers/Login.vc'
import { ButtonViewController } from './vcAssert'
import { getVcName, pluckAllFromCard } from './vcAssert.utility'

type CardVc =
	ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>
type ButtonBarVc =
	ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBar>
type ButtonGroupVc = ViewController<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[]
>
type Calendar = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar
type FormVc = FormViewController<any> | BigFormViewController<any>

const interactor = {
	async click(
		button?:
			| ButtonViewController
			| {
					onClick?: ((options?: any) => void | Promise<void>) | null | undefined
					id?: string | null
			  }
			| null,
		onClickOptions?: Record<string, any>
	) {
		const btnVc = button as ButtonViewController
		if (btnVc.render) {
			button = btnVc.render()
		}
		//@ts-ignore
		const { onClick, id = '**missing id**' } = button ?? {}

		assert.isFunction(
			onClick,
			`Clicking failed because the button '${id}' does not have onClick set.`
		)
		//@ts-ignore
		await onClick(
			onClickOptions ?? {
				altKey: false,
				bubbles: true,
				button: 0,
				buttons: 0,
				cancelable: true,
				clientX: 269,
				clientY: 433,
				ctrlKey: false,
				currentTarget: `button.button.has_label`,
				defaultPrevented: false,
				detail: 9,
				eventPhase: 3,
				getModifierState: () => {},
				isDefaultPrevented: () => {},
				isPropagationStopped: () => {},
				isTrusted: true,
				metaKey: false,
				movementX: 0,
				movementY: 0,
				nativeEvent: {},
				pageX: 269,
				pageY: 433,
				relatedTarget: null,
				screenX: 2317,
				screenY: 612,
				shiftKey: false,
				target: `button.button.has_label`,
				timeStamp: 19915.5,
				title: 'Page 10',
				type: 'click',
				view: {},
			}
		)
	},

	async clickButton(vc: CardVc | FormVc, buttonId: string) {
		const match = pluckButtonFromCard(vc, buttonId)
		await this.click(match)
	},

	async clickButtonInGroup(
		buttonGroupVc: ButtonGroupVc,
		buttonIdOrIdx: string | number
	) {
		assertOptions({ buttonGroupVc, buttonIdOrIdx }, [
			'buttonGroupVc',
			'buttonIdOrIdx',
		])

		const buttons = renderUtil.render(buttonGroupVc)

		const match = buttons.find(
			(b, idx) => b.id === buttonIdOrIdx || idx === buttonIdOrIdx
		)
		assert.isTruthy(match, `I could not find the '${buttonIdOrIdx}' button!`)

		await this.click(match)
	},

	async clickButtonHint(vc: CardVc | FormVc, buttonId: string) {
		assertOptions({ vc, buttonId }, ['vc', 'buttonId'])

		const button = pluckButtonFromCard(vc, buttonId)

		assert.isTrue(
			button.shouldShowHintIcon,
			`Make sure have 'shouldShowHintIcon' set to true in your button: '${buttonId}'`
		)

		assert.isFunction(
			button.onClickHintIcon,
			`You gotta set 'onClickHintIcon' on your button with the id: '${
				button.id ?? '***missing***'
			}'`
		)
		return button.onClickHintIcon?.()
	},

	async clickButtonInButtonBar(vc: ButtonBarVc, buttonId: string) {
		assertOptions({ vc }, ['vc'])

		const model = renderUtil.render(vc)
		const match = model.buttons.find((b) => b.id === buttonId)
		return this.click(match)
	},

	async clickInFooterWithType(
		vc: CardVc | FormVc,
		type: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button['type']
	) {
		const model = renderUtil.render(vc)
		const primary = pluckButtons(model).find((b) => b.type === type)

		//@ts-ignore
		if (!primary && model.shouldShowSubmitControls) {
			//@ts-ignore
			await this.submitForm(vc)
			return
		}

		assert.isTruthy(
			primary,
			`Your footer doesn't have button with type=${type} to click.`
		)

		return this.click(primary)
	},

	async clickPrimaryInFooter(vc: CardVc | FormVc) {
		return this.clickInFooterWithType(vc, 'primary')
	},

	async clickSecondaryInFooter(vc: CardVc | FormVc) {
		return this.clickInFooterWithType(vc, 'secondary')
	},

	async clickDestructiveInFooter(vc: CardVc | FormVc) {
		return this.clickInFooterWithType(vc, 'destructive')
	},

	async clickDestructiveInRow(
		listVc: ListViewController,
		rowIdxOrId: number | string
	) {
		const vc =
			typeof rowIdxOrId === 'number'
				? listVc.getRowVc(rowIdxOrId)
				: listVc.getRowVc(rowIdxOrId)

		if (!vc) {
			assert.fail(`I could not find row ${rowIdxOrId}!`)
		}

		const model = renderUtil.render(vc)
		const destructiveButton = model.cells
			.map((c) => c.button)
			.find((button) => button?.type === 'destructive')

		assert.isTruthy(
			destructiveButton,
			`There is no button with type=destructive in this row to click!`
		)

		await this.click(destructiveButton, { rowVc: vc })
	},

	async cancelForm(vc: FormVc) {
		const onCancel = renderUtil.render(vc).onCancel

		assert.isFunction(
			onCancel,
			`You don't have a cancel handler set. Try { onCancel: () => {} } in your form!`
		)

		await onCancel()
	},

	async submitForm(vc: FormVc) {
		assert.isTruthy(vc, `You have to pass a view controller to submit a form.`)

		if (!vc.isEnabled()) {
			assert.fail(`You can't submit a form that is disabled!`)
		}

		if ((vc as BigFormViewController<any>).getTotalSlides) {
			const bigFormVc = vc as BigFormViewController<any>
			await bigFormVc.jumpToSlide(bigFormVc.getTotalSlides() - 1)
		}

		const originalSubmit = vc.submit
		//@ts-ignore
		const submit = vc._originalSubmit ?? vc.submit
		vc.submit = submit

		//@ts-ignore
		await renderUtil.render(vc).onSubmit?.()
		vc.submit = originalSubmit
	},

	async submitLoginForm(vc: LoginViewController, demoNumber: string) {
		if (demoNumber) {
			const formVc = vc.getLoginForm()

			//@ts-ignore
			const oldHandler = vc.loginHandler
			const promise = new Promise((resolve, reject) => {
				//@ts-ignore
				vc.loginHandler = async () => {
					//@ts-ignore
					await oldHandler?.()

					//@ts-ignore
					resolve()
				}
				//@ts-ignore

				vc.loginFailedHandler = (err) => {
					reject(err)
				}
			})

			await formVc.setValue('phone', demoNumber)

			await formVc.submit()

			await formVc.setValue('code', demoNumber.substr(demoNumber.length - 4))

			await promise

			return
		}

		assert.fail('Expected a LoginFormController')
	},

	async clickButtonInRow(
		vc: ListViewController,
		rowIdxOrId: number | string,
		buttonId: string
	) {
		const rowVc =
			typeof rowIdxOrId === 'string'
				? vc.getRowVc(rowIdxOrId)
				: vc.getRowVc(rowIdxOrId)

		if (!rowVc) {
			assert.fail(`I could not find row ${rowIdxOrId}!`)
		}
		const rowModel = renderUtil.render(rowVc)
		const button = rowModel.cells.find((c) => c.button?.id === buttonId)?.button
		assert.isTruthy(
			button,
			`I could not find a button with the id of '${buttonId}' to click in row '${rowIdxOrId}'!`
		)

		await this.click(button)
	},

	async keyDownOnElementInRow(options: {
		vc: ListRowViewController
		key: KeyboardKey
		cellIdx: number
	}) {
		const model = renderUtil.render(options.vc)
		const cell = model.cells[options.cellIdx]
		const element = cell.button || cell.selectInput || cell.textInput

		if (!element) {
			assert.fail(
				`No button, selectInput, or textInput set cell '${options.cellIdx}' does not have \`onKeyDown\` set.`
			)
		}
		//@ts-ignore
		if (!element.onKeyDown) {
			assert.fail(
				`Your element in cell '${options.cellIdx}' does not have \`onKeyDown\` set.`
			)
		}

		//@ts-ignore
		await element.onKeyDown({ key: options.key, rowVc: options.vc })
	},

	async clickCheckboxInRow(
		vc: ListViewController,
		row: string | number,
		name?: string
	) {
		const rowVc = vc.getRowVc(row)
		const model = renderUtil.render(rowVc)
		const checkboxInput = model.cells.find((c) =>
			name ? c.checkboxInput?.name === name : c.checkboxInput
		)?.checkboxInput

		assert.isTruthy(
			checkboxInput,
			name
				? `I could not find a checkbox named '${name}'!`
				: `I could not find a checkbox to click!`
		)

		const current = checkboxInput.value ?? false
		await rowVc.setValue(checkboxInput.name, !current)
	},

	async clickToggleInRow(vc: ListViewController, row: string | number) {
		const rowVc = vc.getRowVc(row)
		const model = renderUtil.render(rowVc)

		for (const cell of model.cells) {
			if (cell.toggleInput) {
				const current = cell.toggleInput.value ?? false
				await rowVc.setValue(cell.toggleInput.name, !current)
				return
			}
		}

		assert.fail(`I could not find a toggle in row '${row}' to click.`)
	},

	async selectChoiceInRow(options: {
		vc: ListViewController
		row: string | number
		newChoice: string
		name?: string
	}) {
		const { vc, row, newChoice, name } = options

		const rowVc = vc.getRowVc(row)
		const model = renderUtil.render(rowVc)

		for (const cell of model.cells ?? []) {
			if (cell.selectInput) {
				if (name && cell.selectInput.name !== name) {
					continue
				}

				const choices = cell.selectInput.choices.filter(
					(c) => c.value === newChoice
				)

				assert.isAbove(
					choices.length,
					0,
					`The select in row '${row}' didn't have a choice for '${newChoice}' so I couldn't select it.`
				)

				await rowVc.setValue(cell.selectInput.name, newChoice)
				return
			}
		}

		if (name) {
			assert.fail(
				`I could not find a select by name of '${name}' in row '${row}' to make a choice!`
			)
		}
		assert.fail(`I could not find a select in row '${row}' to make a choice!`)
	},

	async clickRow(listVc: ListViewController, row: number | string) {
		assertOptions(
			{ listVc, row },
			['listVc', 'row'],
			`You have to pass a list and it's row to click it!`
		)

		const rowVc = listVc.getRowVc(row)
		const model = renderUtil.render(rowVc)

		assert.isTruthy(model.onClick, `Row '${model.id}' is missing an onClick!`)

		assert.isNotEqual(
			model.isEnabled,
			false,
			`You tried to click a disabled row. Onclick will not be triggered. You can, however, click a checkbox in a row that is disabled.`
		)

		await model.onClick?.()
	},

	async clickCell(
		listVc: ListViewController,
		rowIdxOrId: number | string,
		cellIdxOrId: number | string
	) {
		assertOptions({ listVc, rowIdxOrId, cellIdxOrId }, [
			'listVc',
			'rowIdxOrId',
			'cellIdxOrId',
		])

		const rowVc = listVc.getRowVc(rowIdxOrId)
		const model = renderUtil.render(rowVc)

		let rowCell

		if (typeof cellIdxOrId === 'string') {
			rowCell = model.cells.find((c) => c.id === cellIdxOrId)
		} else {
			rowCell = model.cells[cellIdxOrId]
		}

		assert.isTruthy(
			rowCell,
			`Could not find Cell '${cellIdxOrId}' in Row '${model.id}'`
		)

		assert.isTruthy(
			rowCell?.onClick,
			`Cell '${cellIdxOrId}' in Row '${model.id}' is missing an onClick!`
		)

		await rowCell.onClick?.()
	},

	async clickCalendarEvent(
		vc: ViewController<Calendar>,
		eventId: string,
		blockIdx?: number
	) {
		assertOptions({ vc, eventId }, ['vc', 'eventId'])

		const { match, model } = findEvent(vc, eventId)
		const idx = blockIdx ?? 0

		assert.isTruthy(
			match,
			`I could not find an event with the id '${eventId}'.`
		)

		assert.isFunction(
			model.onClickEvent,
			`You gotta set 'onClickEvent' on your calendar to click an event!`
		)

		assert.isTruthy(
			match.timeBlocks?.[idx],
			`I could not find block ${idx} in event '${eventId}.'`
		)

		await model.onClickEvent?.({
			viewController: match.controller as any,
			event: match,
			block: match.timeBlocks[idx],
			blockIdx: idx,
		})

		return match
	},

	async dragCalendarEventTo(
		vc: ViewController<Calendar>,
		eventId: string,
		updates: Omit<DropEventOptions, 'event' | 'dragEvent'>
	): Promise<boolean> {
		const { match, model } = findEvent(vc, eventId)

		assert.isTruthy(
			match,
			`I could not find an event with the id of '${eventId}'.`
		)

		assert.isFunction(
			model.onDropEvent,
			`You need to set onDropEvent on your calendar.`
		)

		const results = await model.onDropEvent({
			event: match,
			dragEvent: { ...match, id: 'dragging' },
			...updates,
		})

		assert.isTrue(
			typeof results === 'boolean',
			'You gotta return true or false from onDropEvent.'
		)

		return results as boolean
	},

	async clickCalendarMonthView(
		vc: ViewController<Calendar>,
		dateTimeMs: number
	) {
		assertOptions({ vc, dateTimeMs }, ['vc', 'dateTimeMs'])

		const model = renderUtil.render(vc)

		assert.isEqual(
			model.view,
			'month',
			`Your calendar '${getVcName(
				vc
			)}' needs it's view set to 'month', it's currently set to ${
				model.view ?? '***empty***'
			}`
		)

		assert.isFunction(
			model.onClick,
			`You have to set 'onClick' on your calendar!`
		)

		await model.onClick?.({
			dateTimeMs: dateUtil.getStartOfDay(dateTimeMs),
		})
	},

	async clickCalendarDayView(
		vc: ViewController<Calendar>,
		dateTimeMs: number,
		personId: string
	) {
		assertOptions({ vc, dateTimeMs, personId }, [
			'vc',
			'dateTimeMs',
			'personId',
		])

		const model = renderUtil.render(vc)

		assert.isEqual(
			model.view,
			'day',
			`Your calendar '${getVcName(
				vc
			)}' needs it's view set to 'day', it's currently set to ${
				model.view ?? '***empty***'
			}`
		)

		const personMatch = model?.people?.find((p) => p?.id === personId)

		assert.isTruthy(
			personMatch,
			`I could not find a person with the id of ${personId}.`
		)

		assert.isFunction(
			model.onClick,
			`You have to set 'onClick' on your calendar!`
		)

		await model.onClick?.({
			dateTimeMs,
			personId: personMatch.id,
		})
	},
}

export default interactor

function pluckButtonFromCard(vc: CardVc | FormVc, buttonId: string) {
	const model = renderUtil.render(vc) as any
	const buttons: any[] = [...(model.footer?.buttons ?? [])]

	pluckAllFromCard(model, 'buttons').map((b) => b && buttons.push(...b))
	const match = buttons.find((b) => b.id === buttonId)

	assert.isTruthy(
		match,
		`Could not find a button in '${getVcName(vc)}' with the id '${buttonId}'`
	)
	return match
}

function findEvent(
	vc: ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar>,
	eventId: string
) {
	const model = renderUtil.render(vc)
	const match = model.events?.find((e) => e.id === eventId)
	return { match, model }
}

function pluckButtons(
	model:
		| SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
		| SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Form<any>
) {
	//@ts-ignore
	return (model.criticalError?.buttons ??
		model.footer?.buttons ??
		[]) as SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[]
}
