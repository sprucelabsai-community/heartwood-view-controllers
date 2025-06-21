import { DateUtil, dateUtil } from '@sprucelabs/calendar-utils'
import { assertOptions } from '@sprucelabs/schema'
import { Log, buildLog } from '@sprucelabs/spruce-skill-utils'
import { CORE_CONTROLLER_MAP } from '../controllerMap'
import SpruceError from '../errors/SpruceError'
import mapUtil from '../maps/map.utility'
import {
    ConfirmHandler,
    ControllerOptions,
    ImportedViewController,
    RenderInDialogHandler,
    ViewController,
    ViewControllerMap,
    ViewControllerId,
    VoteHandler,
    Device,
    MapUtil,
    ViewControllerConstructor,
    ToastHandler,
    ViewControllerPlugins,
    ViewControllerPluginsByName,
    ConnectToApi,
    ViewControllerPlugin,
    ViewControllerPluginOptions,
    ViewControllerOptions,
    AppController,
    AppControllerConstructor,
    AppControllerId,
    AppControllerMap,
    RenderLockScreenHandler,
} from '../types/heartwood.types'
import DialogViewController from './Dialog.vc'

export default class ViewControllerFactory {
    public static Class?: typeof ViewControllerFactory

    protected connectToApi: ConnectToApi
    protected log?: Log
    protected plugins: ViewControllerPlugins = {}
    protected toastHandler: ToastHandler
    protected controllerMap: Record<string, any>
    protected renderInDialogHandler: RenderInDialogHandler
    protected confirmHandler: ConfirmHandler
    protected voteHandler: VoteHandler
    protected device: Device
    protected dates: DateUtil
    protected maps: MapUtil
    protected AppMap: Record<string, AppControllerConstructor> = {}
    protected renderLockScreenHandler: RenderLockScreenHandler

    public constructor(options: ViewControllerFactoryConstructorOptions) {
        const {
            controllerMap,
            renderInDialogHandler,
            renderLockScreenHandler,
            confirmHandler,
            connectToApi,
            voteHandler,
            device,
            dates,
            maps,
            toastHandler,
            log,
            pluginsByName,
        } = options

        this.controllerMap = { ...controllerMap, ...CORE_CONTROLLER_MAP }
        this.renderInDialogHandler = renderInDialogHandler
        this.renderLockScreenHandler = renderLockScreenHandler
        this.confirmHandler = confirmHandler
        this.connectToApi = connectToApi
        this.voteHandler = voteHandler
        this.toastHandler = toastHandler
        this.device = device
        this.maps = maps ?? mapUtil
        this.dates = dates ?? dateUtil
        this.log = log
        this.importPlugins(pluginsByName)
    }

    public setRenderInDialogHandler(handler: RenderInDialogHandler) {
        this.renderInDialogHandler = handler
    }

    public setConfirmHandler(handler: ConfirmHandler) {
        this.confirmHandler = handler
    }

    public setVoteHandler(handler: VoteHandler) {
        this.voteHandler = handler
    }

    public static Factory(options: ViewControllerFactoryOptions) {
        const {
            controllerMap = {},
            renderInDialogHandler,
            renderLockScreenHandler,
            confirmHandler,
            connectToApi,
            voteHandler,
            device,
            dates,
            maps,
            toastHandler,
            log,
            pluginsByName,
        } = assertOptions(options, ['connectToApi', 'device'])

        return new (this.Class ?? this)({
            controllerMap,
            connectToApi,
            device,
            dates,
            maps,
            log,
            pluginsByName,
            toastHandler: toastHandler ?? (() => {}),
            confirmHandler: confirmHandler ?? (async () => false),
            voteHandler: voteHandler ?? (async () => {}),
            renderInDialogHandler:
                renderInDialogHandler ??
                (() => {
                    return {} as DialogViewController
                }),
            renderLockScreenHandler: renderLockScreenHandler ?? (() => {}),
        })
    }

    public setController<Vc extends ViewController<any>>(
        name: string,
        Class: ViewControllerConstructor<Vc>
    ) {
        //@ts-ignore
        this.controllerMap[name] = Class
    }

    public mixinControllers(
        map: Record<string, ViewControllerConstructor<ViewController<any>>>
    ) {
        this.controllerMap = {
            ...this.controllerMap,
            ...map,
        }
    }

    public importControllers<Vc extends ImportedViewController>(
        Vcs: Vc[],
        plugins?: ViewControllerPluginsByName
    ) {
        for (const Vc of Vcs) {
            this.controllerMap[Vc.id] = Vc
        }

        this.importPlugins(plugins)
    }

    public setAppController(App: AppControllerConstructor) {
        //@ts-ignore
        this.AppMap[App.id] = App
    }

    private importPlugins(
        pluginsByName: ViewControllerPluginsByName | undefined
    ) {
        for (const plugin in pluginsByName ?? []) {
            const Plugin = pluginsByName![plugin]
            this.addPlugin(plugin, this.BuildPlugin(Plugin))
        }
    }

    public BuildPlugin<P extends ViewControllerPlugin>(
        Plugin: new (options: ViewControllerPluginOptions) => P
    ): P {
        return new Plugin(this.sharedConstructorOptions())
    }

    public BuildApp<A extends AppController>(
        App: new (options: ViewControllerOptions) => A,
        options?: Partial<ViewControllerOptions>
    ): A {
        const app = new App({
            ...this.buildViewContructorOptions('App'),
            ...options,
        }) as A

        //@ts-ignore
        if (app.id) {
            throw new SpruceError({
                code: 'INVALID_APP_CONTROLLER',
                friendlyMessage: `Property \`id\` is reserved in your AppController. Please rename it to \`_id\`.`,
                //@ts-ignore
                id: App.id,
            })
        }

        //@ts-ignore
        app.id = App.id

        return app
    }

    public hasController(name: string): boolean {
        //@ts-ignore
        return !!this.controllerMap[name]
    }

    public hasApp(namespace: string): boolean {
        return !!this.AppMap[namespace]
    }

    public getController<N extends ViewControllerId>(name: N) {
        return this.controllerMap[name]
    }

    public setDates(dates: DateUtil) {
        this.dates = dates
    }

    public addPlugin(named: string, plugin: ViewControllerPlugin) {
        //@ts-ignore
        this.plugins[named] = plugin
    }

    public App<Id extends AppControllerId>(
        namespace: Id,
        options?: Partial<ViewControllerOptions>
    ) {
        const App = this.AppMap[namespace]

        if (!App) {
            throw new SpruceError({
                code: 'APP_NOT_FOUND',
                namespace,
            })
        }

        return this.BuildApp(App, options) as AppControllerMap[Id]
    }

    public Controller<
        N extends ViewControllerId,
        O extends ControllerOptions<N>,
    >(id: N, options: O): ViewControllerMap[N] {
        const Class = this.controllerMap[id]

        if (!Class) {
            throw new SpruceError({
                code: 'INVALID_VIEW_CONTROLLER_NAME',
                name: id,
                validNames: Object.keys(this.controllerMap),
            })
        }

        const constructorOptions = this.buildViewContructorOptions(id, options)

        const oldController = Class.prototype.Controller

        //@ts-ignore
        let instance = new Class(constructorOptions)

        Class.prototype.Controller = oldController

        //@ts-ignore
        if (instance.id) {
            throw new SpruceError({
                code: 'INVALID_SKILL_VIEW_CONTROLLER',
                friendlyMessage: `Property \`id\` is reserved in your ViewController. Please rename it to \`_id\`.`,
                id,
            })
        }

        //@ts-ignore
        instance.id = id

        //@ts-ignore
        return instance
    }

    protected buildViewContructorOptions(
        name: string,
        options?: Record<string, any>
    ): ViewControllerOptions {
        return {
            ...options,
            vcFactory: this,
            ...this.sharedConstructorOptions(name),
            renderInDialogHandler: this.renderInDialogHandler,
            confirmHandler: this.confirmHandler,
            renderLockScreenHandler: this.renderLockScreenHandler,
            voteHandler: options?.voteHandler ?? this.voteHandler,
            toastHandler: this.toastHandler,
        }
    }

    private sharedConstructorOptions(name?: string) {
        return {
            connectToApi: this.connectToApi,
            dates: this.dates,
            device: this.device,
            log: this.log ?? buildLog(name),
            maps: this.maps,
            plugins: this.plugins,
        }
    }
}

export interface ViewControllerFactoryOptions {
    controllerMap?: Record<string, any>
    renderInDialogHandler?: RenderInDialogHandler
    renderLockScreenHandler?: RenderLockScreenHandler
    voteHandler?: VoteHandler
    confirmHandler?: ConfirmHandler
    toastHandler?: ToastHandler
    connectToApi: ConnectToApi
    device: Device
    dates?: DateUtil
    maps?: MapUtil
    log?: Log
    pluginsByName?: ViewControllerPluginsByName
}

export interface ViewControllerFactoryConstructorOptions {
    controllerMap: Record<string, any>
    renderInDialogHandler: RenderInDialogHandler
    renderLockScreenHandler: RenderLockScreenHandler
    connectToApi: ConnectToApi
    confirmHandler: ConfirmHandler
    voteHandler: VoteHandler
    toastHandler: ToastHandler
    device: Device
    dates?: DateUtil
    maps?: MapUtil
    log?: Log
    pluginsByName?: ViewControllerPluginsByName
}
