/* eslint-disable @typescript-eslint/no-unused-vars */
import { MercuryClient } from '@sprucelabs/mercury-client'
import { LockScreenSkillViewControllerOptions } from '../skillViewControllers/LockScreen.svc'
import {
    AppController,
    AppControllerLoadOptions,
    ControllerOptions,
    RenderLockScreenHandler,
    ViewControllerId,
    ViewControllerMap,
    ViewControllerOptions,
    ViewControllerPlugins,
} from '../types/heartwood.types'
import ViewControllerFactory from './ViewControllerFactory'

export default abstract class AbstractAppController implements AppController {
    public static id: string
    protected plugins: ViewControllerPlugins
    private views: ViewControllerFactory
    private renderLockScreenHandler: RenderLockScreenHandler
    protected connectToApi: () => Promise<MercuryClient>

    public constructor(options: ViewControllerOptions) {
        const { plugins, vcFactory, renderLockScreenHandler, connectToApi } =
            options
        this.plugins = plugins
        this.views = vcFactory
        this.renderLockScreenHandler = renderLockScreenHandler
        this.connectToApi = connectToApi
    }

    public async load(options: AppControllerLoadOptions) {}

    protected renderLockScreen(options: LockScreenSkillViewControllerOptions) {
        const controller = this.Controller('lock-screen', { ...options })
        this.renderLockScreenHandler?.(controller.render())
        return controller
    }

    public Controller<
        N extends ViewControllerId,
        O extends ControllerOptions<N>,
    >(id: N, options: O): ViewControllerMap[N] {
        return this.views.Controller(id, options)
    }
}
