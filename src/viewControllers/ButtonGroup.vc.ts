import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assertOptions } from '@sprucelabs/schema'
import {
	ButtonController,
	ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

type Button = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button,
	'onClick' | 'onClickHintIcon'
> & {
	id: string
}
type ViewModel = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[]

export interface ButtonGroupChanges {
	added?: string
	removed?: string
}

export interface ButtonGroupPendingChanges {
	adding?: string
	removing?: string
}

export type SelectionChangeHandler = (
	selected: string[],
	changed: ButtonGroupChanges
) => void | Promise<void>

export type WillChangeSelectionHandler = (
	selected: string[],
	changes: ButtonGroupPendingChanges
) => void | boolean | Promise<void | boolean>

type HintClickHandler = (selected: string) => void

export interface ButtonGroupViewControllerOptions {
	buttons: Button[]
	onSelectionChange?: SelectionChangeHandler
	onWillChangeSelection?: WillChangeSelectionHandler
	onClickHintIcon?: HintClickHandler
	shouldAllowMultiSelect?: boolean
	selected?: string[]
}

export default class ButtonGroupViewController extends AbstractViewController<ViewModel> {
	private buttons: Button[]
	private selectedButtons: string[] = []
	private selectionChangeHandler?: SelectionChangeHandler
	private shouldAllowMultiSelect: boolean
	private buttonTriggerRenderHandlers: (() => void)[] = []
	private buttonControllers: { controller: ButtonController }[] = []
	private hasBeenRendered: boolean[] = []
	private clickHintHandler?: HintClickHandler
	private willChangeSelectionHandler?: WillChangeSelectionHandler

	public constructor(
		options: ButtonGroupViewControllerOptions & ViewControllerOptions
	) {
		super(options)

		this.buttons = options.buttons
		this.selectionChangeHandler = options.onSelectionChange
		this.willChangeSelectionHandler = options.onWillChangeSelection

		this.shouldAllowMultiSelect = options.shouldAllowMultiSelect ?? false
		this.clickHintHandler = options.onClickHintIcon

		this.rebuildButtons()

		options.selected && this.selectButtons(options.selected)
	}

	public triggerRender() {
		for (const handler of this.buttonTriggerRenderHandlers) {
			handler()
		}
	}

	public selectButtons(ids: string[]) {
		this.selectedButtons = ids
	}

	public async selectButton(id: string) {
		if (this.isSelected(id)) {
			return
		}

		const changes: ButtonGroupChanges = { added: id }
		const pending: ButtonGroupPendingChanges = { adding: id }

		if (!this.shouldAllowMultiSelect && this.selectedButtons[0]) {
			changes.removed = this.selectedButtons[0]
			pending.removing = this.selectedButtons[0]
		}

		const results = await this.willChangeSelectionHandler?.(
			[...this.selectedButtons],
			pending
		)

		if (results === false) {
			return
		}

		if (!this.shouldAllowMultiSelect) {
			this.selectedButtons = []
		}

		this.selectedButtons.push(id)
		await this.didSelectHandler(changes)
	}

	private async didSelectHandler(changes: ButtonGroupChanges) {
		this.rebuildAndTriggerRender()
		await this.selectionChangeHandler?.([...this.selectedButtons], changes)
	}

	private rebuildAndTriggerRender() {
		this.rebuildButtons()
		this.triggerRender()
	}

	private isSelected(id: string) {
		if (this.selectedButtons.length === 0) {
			return null
		}
		return this.selectedButtons.indexOf(id) > -1
	}

	public async deselectButton(id: string) {
		const match = this.selectedButtons.indexOf(id)

		const results = await this.willChangeSelectionHandler?.(
			[...this.selectedButtons],
			{
				removing: id,
			}
		)

		if (results === false) {
			return
		}

		if (match > -1) {
			this.selectedButtons.splice(match, 1)
			await this.didSelectHandler({ removed: id })
		}
	}

	private rebuildButtons() {
		this.buttonControllers = this.buttons.map((button, idx) => ({
			controller: this.buildButtonController(button, idx),
		}))
	}

	private buildButtonController(button: Button, idx: number): ButtonController {
		if (!button.id) {
			assertOptions(button, ['id'])
		}

		const controller: ButtonController = {
			triggerRender: () => {},
			//@ts-ignore
			render: () => {
				this.buttonTriggerRenderHandlers[idx] = controller.triggerRender

				const shouldQueueShow = !this.hasBeenRendered[idx]
				this.hasBeenRendered[idx] = true

				const options = {
					...button,
					controller,
					isSelected: this.isSelected(button.id),
					shouldQueueShow,
					onClick: () => {
						if (!this.isSelected(button.id)) {
							this.selectButton(button.id)
						} else {
							this.deselectButton(button.id)
						}
					},
					onClickHintIcon: () => {
						this.handleClickHintIcon(button.id)
					},
				}

				return options
			},
		}

		return controller
	}

	private handleClickHintIcon(id: string) {
		this.clickHintHandler?.(id)
	}

	public getSelectedButtons() {
		return this.selectedButtons
	}

	public render(): ViewModel {
		return this.buttonControllers
	}
}
