import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { ViewControllerOptions } from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'
import ButtonGroupViewController, {
	ButtonGroupViewControllerOptions,
} from './ButtonGroup.vc'

type ButtonBar = ButtonGroupViewControllerOptions
export type ButtonBarViewControllerOptions = ButtonBar

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

	public selectButton(id: string) {
		this.buttonGroupVc.selectButton(id)
	}

	public selectButtons(ids: string[]) {
		this.buttonGroupVc.selectButtons(ids)
	}

	public deselectButton(id: string) {
		this.buttonGroupVc.deselectButton(id)
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBar {
		return {
			controller: this,
			buttons: this.buttonGroupVc.render() as any,
		}
	}
}
