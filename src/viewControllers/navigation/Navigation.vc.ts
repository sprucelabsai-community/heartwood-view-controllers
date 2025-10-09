import SpruceError from '../../errors/SpruceError'
import {
    Navigation,
    NavigationButton,
    NavigationItem,
    ViewControllerOptions,
} from '../../types/heartwood.types'
import removeUniversalViewOptions from '../../utilities/removeUniversalViewOptions'
import AbstractViewController from '../Abstract.vc'

export default class NavigationViewController extends AbstractViewController<Navigation> {
    private model: Navigation
    public constructor(options: ViewControllerOptions) {
        super(options)
        this.model = removeUniversalViewOptions(options)
    }

    public hide() {
        this.model.isVisible = false
        this.triggerRender()
    }

    public show() {
        this.model.isVisible = true
        this.triggerRender()
    }

    public setButtons(buttons: NavigationButton[]) {
        this.model.buttons = buttons
        this.triggerRender()
    }

    public setShouldRenderButtonLabels(shouldRender: boolean) {
        this.model.shouldRenderButtonLabels = shouldRender
        this.triggerRender()
    }

    public updateButton(id: string, updates: Partial<NavigationItem>) {
        const buttons = this.model.buttons ?? []
        const idx = buttons?.findIndex((b) => (b as NavigationButton).id === id)

        if (idx === -1) {
            throw new SpruceError({
                code: 'BUTTON_NOT_FOUND',
                id,
            })
        }

        let button = buttons[idx] as NavigationButton
        button = {
            ...button,
            ...updates,
        }

        buttons[idx] = button

        this.triggerRender()
    }

    public render(): Navigation {
        return { controller: this, ...this.model }
    }
}
