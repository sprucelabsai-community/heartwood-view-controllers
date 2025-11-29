import { DateUtil } from '@sprucelabs/calendar-utils'
import { Log } from '@sprucelabs/spruce-skill-utils'
import {
    ConfirmHandler,
    ViewController,
    ViewControllerOptions,
    ConfirmOptions,
    MapUtil,
    ViewControllerPlugins,
    TriggerRenderHandler,
} from '../types/heartwood.types'
import AbstractController from './AbstractController'

export default abstract class AbstractViewController<
    ViewModel extends Record<string, any>,
>
    extends AbstractController
    implements ViewController<ViewModel>
{
    public static id: string

    protected dates: DateUtil
    protected maps: MapUtil
    private confirmHandler: ConfirmHandler

    private suspendRenderCount = 0
    protected plugins: ViewControllerPlugins = {}
    protected log: Log
    protected triggerRenderHandler?: TriggerRenderHandler

    public constructor(options: ViewControllerOptions) {
        super(options)

        const { confirmHandler, dates, maps, log, plugins } = options

        this.confirmHandler = confirmHandler
        this.dates = dates
        this.maps = maps
        this.log = log
        this.plugins = plugins
    }

    public triggerRender() {
        if (this.suspendRenderCount === 0) {
            this.triggerRenderHandler?.()
        }
    }

    public setTriggerRenderHandler(handler: TriggerRenderHandler) {
        this.triggerRenderHandler = handler
    }

    /**
     * @deprecated this.getVcFactory() -> this.views()
     */
    protected getVcFactory() {
        return this.views
    }

    private suspendRendering() {
        this.suspendRenderCount++
    }

    private restoreRendering() {
        this.suspendRenderCount--
    }

    public async renderOnce(cb: () => any | Promise<any>) {
        this.suspendRendering()

        await cb()

        this.restoreRendering()
        this.triggerRender()
    }

    public renderOnceSync(cb: () => any) {
        this.suspendRendering()

        cb()

        this.restoreRendering()
        this.triggerRender()
    }

    protected async confirm(options: ConfirmOptions) {
        return this.confirmHandler(options)
    }

    protected getDevice() {
        return this.device
    }

    public abstract render(): ViewModel
}
