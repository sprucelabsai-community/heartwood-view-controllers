import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
    ButtonGroupButton,
    ViewControllerOptions,
} from '../types/heartwood.types'
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

        this.buttonGroupVc = this.Controller('button-group', {
            ...options,
        })
    }

    public getButtonGroupVc() {
        return this.buttonGroupVc
    }

    public async setSelectedButtons(ids: string[]) {
        await this.buttonGroupVc.setSelectedButtons(ids)
    }

    public getSelectedButtons() {
        return this.buttonGroupVc.getSelectedButtons()
    }

    public async selectButton(id: string) {
        await this.buttonGroupVc.selectButton(id)
    }

    /**
     * @deprecated vc.selectButtons -> vc.setSelectedButtons
     */
    public async selectButtons(ids: string[]) {
        await this.setSelectedButtons(ids)
    }

    public setButtons(buttons: ButtonGroupButton[]) {
        this.buttonGroupVc.setButtons(buttons)
        this.triggerRender()
    }

    public async deselectButton(id: string) {
        await this.buttonGroupVc.deselectButton(id)
    }

    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBar {
        return {
            controller: this,
            buttons: this.buttonGroupVc.render() as any,
        }
    }
}
