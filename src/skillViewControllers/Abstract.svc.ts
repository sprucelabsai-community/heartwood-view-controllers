/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    RenderLockScreenHandler,
    SkillView,
    SkillViewController,
    SkillViewControllerLoadOptions,
    ToolBelt,
    ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from '../viewControllers/Abstract.vc'
import { LockScreenSkillViewControllerOptions } from './LockScreen.svc'

export default abstract class AbstractSkillViewController<
        Args extends Record<string, any> = Record<string, any>,
        ViewModel extends Record<string, any> = SkillView,
    >
    extends AbstractViewController<ViewModel>
    implements SkillViewController
{
    public static id: string
    protected title?: string
    protected subtitle?: string
    private renderLockScreenHandler: RenderLockScreenHandler

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.renderLockScreenHandler = options.renderLockScreenHandler
    }

    public async load(options: SkillViewControllerLoadOptions<Args>) {}
    public async focus(): Promise<void> {}
    public async blur(): Promise<void> {}

    protected setTitle(title: string | null | undefined) {
        this.title = title ?? undefined
        this.triggerRender()
    }

    public getTitle() {
        return this.title
    }

    protected setSubtitle(subtitle: string | null | undefined) {
        this.subtitle = subtitle ?? undefined
        this.triggerRender()
    }

    public getSubtitle() {
        return this.subtitle
    }

    public renderToolBelt(): ToolBelt | null {
        return null
    }

    protected renderLockScreen(options: LockScreenSkillViewControllerOptions) {
        const controller = this.Controller('lock-screen', { ...options })
        this.renderLockScreenHandler(controller.render())
        return controller
    }

    public abstract render(): ViewModel
}
