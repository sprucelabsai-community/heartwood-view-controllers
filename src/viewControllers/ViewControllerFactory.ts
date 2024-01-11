import { DateUtil, dateUtil } from '@sprucelabs/calendar-utils'
import { MercuryClient } from '@sprucelabs/mercury-client'
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
} from '../types/heartwood.types'

export default class ViewControllerFactory {
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
		} = assertOptions(options, ['connectToApi', 'device'])

		return new this({
			controllerMap,
			connectToApi,
			device,
			dates,
			maps,
			log,
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

	public importControllers<Vc extends ImportedViewController>(Vcs: Vc[]) {
		for (const Vc of Vcs) {
			//@ts-ignore
			this.controllerMap[Vc.id] = Vc
		}
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
			dates: this.dates,
			renderInDialogHandler: this.renderInDialogHandler,
			confirmHandler: this.confirmHandler,
			voteHandler: options?.voteHandler ?? this.voteHandler,
			connectToApi: this.connectToApi,
			device: this.device,
			maps: this.maps,
			log: this.log ?? buildLog(name),
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
}

type ConnectToApi = () => Promise<MercuryClient>

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
}
