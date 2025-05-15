/* eslint-disable @typescript-eslint/no-unused-vars */
import { LockScreenSkillViewControllerOptions } from '../skillViewControllers/LockScreen.svc'
import {
    AppController,
    AppControllerLoadOptions,
    RenderLockScreenHandler,
    ViewControllerOptions,
    ViewControllerPlugins,
} from '../types/heartwood.types'
import AbstractController from './AbstractController'

export default abstract class AbstractAppController
    extends AbstractController
    implements AppController
{
    public static id: string
    protected plugins: ViewControllerPlugins

    private renderLockScreenHandler: RenderLockScreenHandler

    public constructor(options: ViewControllerOptions) {
        super(options)

        const { plugins, renderLockScreenHandler } = options

        this.plugins = plugins
        this.renderLockScreenHandler = renderLockScreenHandler
    }

    public async load(options: AppControllerLoadOptions) {}

    protected renderLockScreen(options: LockScreenSkillViewControllerOptions) {
        const controller = this.Controller('lock-screen', { ...options })
        this.renderLockScreenHandler?.(controller.render())
        return controller
    }
}
