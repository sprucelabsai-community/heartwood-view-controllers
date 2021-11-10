import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { ViewControllerOptions } from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'
import ButtonGroupViewController, {
	ButtonGroupViewControllerOptions,
} from './ButtonGroup.vc'

type ButtonBar = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBar,
	'controller'
>
export type ButtonBarViewControllerOptions = ButtonBar &
	ButtonGroupViewControllerOptions

export default class ButtonBarViewController extends AbstractViewController<ButtonBar> {
	private buttonGroupVc: ButtonGroupViewController

	public constructor(options: ButtonBar & ViewControllerOptions) {
		super(options)

		this.buttonGroupVc = this.Controller('buttonGroup', {
			...options,
		})
	}

	public getButtonGroupVc() {
		return this.buttonGroupVc
	}

	public getSelectedButtons() {
		return this.buttonGroupVc.getSelectedButtons()
	}

	public selectButton(idx: number) {
		this.buttonGroupVc.selectButton(idx)
	}

	public selectButtons(idxs: number[]) {
		this.buttonGroupVc.selectButtons(idxs)
	}

	public deselectButton(idx: number) {
		this.buttonGroupVc.deselectButton(idx)
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBar {
		return {
			controller: this,
			buttons: this.buttonGroupVc.render(),
		}
	}
}
