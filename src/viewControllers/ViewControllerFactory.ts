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
} from '../types/heartwood.types'

export default class ViewControllerFactory {
	public static Class?: typeof ViewControllerFactory
	private controllerMap: Record<string, any>
	private renderInDialogHandler: RenderInDialogHandler
	private confirmHandler: ConfirmHandler
	private connectToApi: ConnectToApi
	private voteHandler: VoteHandler
	private device: Device
	private dates: DateUtil
	private maps: MapUtil
	private toastHandler: ToastHandler
	private log?: Log
	protected plugins: ViewControllerPlugins = {}

	public constructor(options: ViewControllerFactoryConstructorOptions) {
		const {
			controllerMap,
			renderInDialogHandler,
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
			confirmHandler: confirmHandler ? confirmHandler : async () => false,
			voteHandler: voteHandler ? voteHandler : async () => {},
			renderInDialogHandler: renderInDialogHandler
				? renderInDialogHandler
				: () => {},
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
			//@ts-ignore
			this.controllerMap[Vc.id] = Vc
		}

		this.importPlugins(plugins)
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

	public hasController(name: string): boolean {
		//@ts-ignore
		return !!this.controllerMap[name]
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

	public Controller<N extends ViewControllerId, O extends ControllerOptions<N>>(
		name: N,
		options: O
	): ViewControllerMap[N] {
		const Class = this.controllerMap[name]

		if (!Class) {
			throw new SpruceError({
				code: 'INVALID_VIEW_CONTROLLER_NAME',
				name,
				validNames: Object.keys(this.controllerMap),
			})
		}

		const constructorOptions = {
			...options,
			vcFactory: this,
			...this.sharedConstructorOptions(name),
			renderInDialogHandler: this.renderInDialogHandler,
			confirmHandler: this.confirmHandler,
			voteHandler: options?.voteHandler ?? this.voteHandler,
			toastHandler: this.toastHandler,
		}

		const oldController = Class.prototype.Controller

		//@ts-ignore
		let instance = new Class(constructorOptions)

		Class.prototype.Controller = oldController

		//@ts-ignore
		if (instance.id) {
			throw new SpruceError({
				code: 'INVALID_SKILL_VIEW_CONTROLLER',
				friendlyMessage: `Property \`id\` is reserved. Please rename it to \`_id\`.`,
				id: name,
			})
		}

		//@ts-ignore
		instance.id = name

		//@ts-ignore
		return instance
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
