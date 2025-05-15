/* eslint-disable @typescript-eslint/no-unused-vars */
import { MercuryClient } from '@sprucelabs/mercury-client'
import { LockScreenSkillViewControllerOptions } from '../skillViewControllers/LockScreen.svc'
import {
    AppController,
    AppControllerLoadOptions,
    ControllerOptions,
    RenderLockScreenHandler,
    ToastHandler,
    ToastOptions,
    ViewControllerId,
    ViewControllerMap,
    ViewControllerOptions,
    ViewControllerPlugins,
    VoteHandler,
    VoteOptions,
} from '../types/heartwood.types'
import ViewControllerFactory from './ViewControllerFactory'

export default abstract class AbstractAppController implements AppController {
    public static id: string
    protected plugins: ViewControllerPlugins
    private views: ViewControllerFactory
    private renderLockScreenHandler: RenderLockScreenHandler
    protected connectToApi: () => Promise<MercuryClient>
    private toastHandler: ToastHandler
    private voteHandler: VoteHandler

    public constructor(options: ViewControllerOptions) {
        const {
            plugins,
            vcFactory,
            renderLockScreenHandler,
            connectToApi,
            toastHandler,
            voteHandler,
        } = options
        this.plugins = plugins
        this.views = vcFactory
        this.toastHandler = toastHandler
        this.voteHandler = voteHandler
        this.renderLockScreenHandler = renderLockScreenHandler
        this.connectToApi = connectToApi
    }

    public async load(options: AppControllerLoadOptions) {}

    protected renderLockScreen(options: LockScreenSkillViewControllerOptions) {
        const controller = this.Controller('lock-screen', { ...options })
        this.renderLockScreenHandler?.(controller.render())
        return controller
    }

    protected toast(options: ToastOptions) {
        this.toastHandler(options)
    }

    protected async askForAVote(options: VoteOptions) {
        await this.voteHandler(options)
    }

    public Controller<
        N extends ViewControllerId,
        O extends ControllerOptions<N>,
    >(id: N, options: O): ViewControllerMap[N] {
        return this.views.Controller(id, options)
    }
}
