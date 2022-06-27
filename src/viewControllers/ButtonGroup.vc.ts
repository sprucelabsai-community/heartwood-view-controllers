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
	added: string[]
	removed: string[]
}

export interface ButtonGroupPendingChanges {
	adding: string[]
	removing: string[]
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
	private selectedButtonIds: string[] = []
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
		this.selectedButtonIds = options.selected ?? []

		this.rebuildButtons()
	}

	public triggerRender() {
		for (const handler of this.buttonTriggerRenderHandlers) {
			handler()
		}
	}

	public async selectButtons(ids: string[]) {
		let addingIds = ids.filter((id, idx) => ids.indexOf(id) === idx)

		if (!this.shouldAllowMultiSelect && ids[0]) {
			addingIds = [addingIds[addingIds.length - 1]]
		}

		const selectedKey = this.selectedButtonIds.join('-')
		const newKey = addingIds.join('-')

		if (selectedKey === newKey) {
			return
		}

		const adding = ids.filter((id) => this.selectedButtonIds.indexOf(id) === -1)
		const removing = this.selectedButtonIds.filter(
			(id) => addingIds.indexOf(id) === -1
		)

		const changes: ButtonGroupChanges = { added: adding, removed: removing }
		const pending: ButtonGroupPendingChanges = {
			adding,
			removing,
		}

		const results = await this.willChangeSelectionHandler?.(
			[...this.selectedButtonIds],
			pending
		)

		if (results === false) {
			return
		}

		this.selectedButtonIds = addingIds

		await this.didSelectHandler(changes)
	}

	public async selectButton(id: string) {
		const selected = [...this.selectedButtonIds, id]
		await this.selectButtons(selected)
	}

	private async didSelectHandler(changes: ButtonGroupChanges) {
		this.rebuildAndTriggerRender()
		await this.selectionChangeHandler?.([...this.selectedButtonIds], changes)
	}

	private rebuildAndTriggerRender() {
		this.rebuildButtons()
		this.triggerRender()
	}

	private isSelected(id: string) {
		if (this.selectedButtonIds.length === 0) {
			return null
		}
		return this.selectedButtonIds.indexOf(id) > -1
	}

	public async deselectButton(id: string) {
		const selected = this.selectedButtonIds.filter((i) => i !== id)
		await this.selectButtons(selected)
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

				this.hasBeenRendered[idx] = true

				const options = {
					...button,
					controller,
					isSelected: this.isSelected(button.id),
					onClick: () => {
						if (!this.isSelected(button.id)) {
							return this.selectButton(button.id)
						} else {
							return this.deselectButton(button.id)
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
		return this.selectedButtonIds
	}

	public render(): ViewModel {
		return this.buttonControllers
	}
}
