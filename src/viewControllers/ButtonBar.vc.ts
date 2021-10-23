import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { ViewControllerOptions } from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'
import ButtonGroupViewController, {
	ButtonGroupViewControllerOptions,
} from './ButtonGroup.vc'

type ButtonBar = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBar
export type ButtonBarViewControllerOptions = ButtonBar &
	ButtonGroupViewControllerOptions

export default class ButtonBarViewController extends AbstractViewController<ButtonBar> {
	private buttonGroupVc: ButtonGroupViewController
	public constructor(options: ButtonBar & ViewControllerOptions) {
		super(options)

		this.buttonGroupVc = this.vcFactory.Controller('buttonGroup', {
			...options,
		})
	}

	public getButtonGroupVc() {
		return this.buttonGroupVc
	}

	public render(): ButtonBar {
		return {
			controller: this,
			buttons: this.buttonGroupVc.render(),
		}
	}
}
