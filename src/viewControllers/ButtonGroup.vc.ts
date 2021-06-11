import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	ButtonController,
	ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

type Button = SpruceSchemas.Heartwood.v2021_02_11.Button
type ViewModel = Button[]

type SelectionChangeHandler = (selected: number[]) => void | Promise<void>
type HintClickHandler = (selected: number) => void

export interface ButtonGroupViewControllerOptions {
	buttons: Button[]
	onSelectionChange?: SelectionChangeHandler
	onClickHintIcon?: HintClickHandler
	shouldAllowMultiSelect?: boolean
	selected?: number[]
}

export default class ButtonGroupViewController extends AbstractViewController<ViewModel> {
	private buttons: Button[]
	private selectedButtons: number[] = []
	private selectionChangeHandler?: SelectionChangeHandler
	private shouldAllowMultiSelect: boolean
	private buttonTriggerRenderHandlers: (() => void)[] = []
	private buttonControllers: { controller: ButtonController }[] = []
	private hasBeenRendered: boolean[] = []
	private clickHintHandler?: HintClickHandler

	public constructor(
		options: ButtonGroupViewControllerOptions & ViewControllerOptions
	) {
		super(options)

		this.buttons = options.buttons
		this.selectionChangeHandler = options.onSelectionChange
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

	public selectButtons(idxs: number[]) {
		this.selectedButtons = idxs
	}

	public selectButton(idx: number) {
		if (this.isSelected(idx)) {
			return
		}

		if (!this.shouldAllowMultiSelect) {
			this.selectedButtons = []
		}

		this.selectedButtons.push(idx)
		this.didSelectHandler()
	}

	private didSelectHandler() {
		this.rebuildAndTriggerRender()
		void this.selectionChangeHandler?.([...this.selectedButtons])
	}

	private rebuildAndTriggerRender() {
		this.rebuildButtons()
		this.triggerRender()
	}

	private isSelected(idx: number) {
		if (this.selectedButtons.length === 0) {
			return null
		}
		return this.selectedButtons.indexOf(idx) > -1
	}

	public deselectButton(idx: number) {
		const match = this.selectedButtons.indexOf(idx)
		if (match > -1) {
			this.selectedButtons.splice(match, 1)
			this.rebuildAndTriggerRender()

			void this.selectionChangeHandler?.([...this.selectedButtons])
		}
	}

	private rebuildButtons() {
		this.buttonControllers = this.buttons.map((button, idx) => ({
			controller: this.buildButtonController(button, idx),
		}))
	}

	private buildButtonController(
		button: SpruceSchemas.Heartwood.v2021_02_11.Button,
		idx: number
	): ButtonController {
		const controller: ButtonController = {
			triggerRender: () => {},
			//@ts-ignore
			render: () => {
				this.buttonTriggerRenderHandlers[idx] = controller.triggerRender

				const shouldQueueShow = !this.hasBeenRendered[idx]
				this.hasBeenRendered[idx] = true

				const options = {
					...button,
					controller: this,
					isSelected: this.isSelected(idx),
					shouldQueueShow,
					onClick: () => {
						if (!this.isSelected(idx)) {
							this.selectButton(idx)
						} else {
							this.deselectButton(idx)
						}
						controller.triggerRender()
					},
					onClickHintIcon: () => {
						this.handleClickHintIcon(idx)
					},
				}

				return options
			},
		}

		return controller
	}
	private handleClickHintIcon(idx: number) {
		this.clickHintHandler?.(idx)
	}

	public render(): ViewModel {
		return this.buttonControllers
	}

	public getSelectedButtons() {
		return this.selectedButtons
	}
}
