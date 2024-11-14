/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AppController,
    AppControllerLoadOptions,
    ControllerOptions,
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

    public constructor(options: ViewControllerOptions) {
        const { plugins, vcFactory } = options
        this.plugins = plugins
        this.views = vcFactory
    }

    public async load(options: AppControllerLoadOptions) {}

    public Controller<
        N extends ViewControllerId,
        O extends ControllerOptions<N>,
    >(id: N, options: O): ViewControllerMap[N] {
        return this.views.Controller(id, options)
    }
}
