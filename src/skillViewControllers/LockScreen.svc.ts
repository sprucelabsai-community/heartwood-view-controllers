import {
    LockScreen,
    SkillView,
    SkillViewController,
    ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractSkillViewController from './Abstract.svc'

export default class LockScreenSkillViewController extends AbstractSkillViewController<
    Record<string, any>,
    LockScreen
> {
    private skillViewController?: SkillViewController
    private hideHandler?: HideHandler
    private isVisible = true

    public constructor(options: ViewControllerOptions & LockScreen) {
        super(options)
        const { controller } = options
        this.skillViewController = controller as SkillViewController
    }

    public setHideHindler(hideHandler: HideHandler) {
        this.hideHandler = hideHandler
    }

    public async hide() {
        await this.hideHandler?.()
        this.isVisible = false
    }

    public getSkillViewVc() {
        return this.skillViewController
    }

    public getIsVisible(): boolean {
        return this.isVisible
    }

    public render(): LockScreen {
        return {
            controller: this,
            skillViewController:
                this.skillViewController ?? (this as SkillViewController),
        }
    }
}

export type LockScreenSkillViewControllerOptions = SkillView

type HideHandler = () => Promise<void> | void
