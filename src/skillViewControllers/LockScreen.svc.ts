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
    private onHideHandler?: OnHideHandler

    public constructor(options: ViewControllerOptions & LockScreen) {
        super(options)
        const { controller } = options
        this.skillViewController = controller as SkillViewController
    }

    public setOnHideHandler(onHideHandler: OnHideHandler) {
        this.onHideHandler = onHideHandler
    }

    public async hide() {
        await this.onHideHandler?.()
    }

    public getSkillViewVc() {
        return this.skillViewController
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

type OnHideHandler = () => Promise<void> | void
