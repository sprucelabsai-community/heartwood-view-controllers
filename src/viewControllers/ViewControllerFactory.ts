import { MercuryClient } from '@sprucelabs/mercury-client'
import { assertOptions } from '@sprucelabs/schema'
import { CORE_CONTROLLER_MAP } from '../controllerMap'
import SpruceError from '../errors/SpruceError'
import {
	ConfirmHandler,
	ControllerOptions,
	ImportedViewController,
	RenderInDialogHandler,
	ViewController,
	ViewControllerMap,
	ViewControllerId,
	ViewControllerOptions,
	VoteHandler,
	Device,
} from '../types/heartwood.types'

export type ViewControllerConstructor<Vc extends ViewController<any>> = new (
	options: ViewControllerOptions
) => Vc

type ConnectToApi = () => Promise<MercuryClient>

export default class ViewControllerFactory {
	private controllerMap: Record<string, any>
	private renderInDialogHandler: RenderInDialogHandler
	private confirmHandler: ConfirmHandler
	private connectToApi: ConnectToApi
	private voteHandler: VoteHandler
	private device: Device

	public constructor(options: {
		controllerMap: Record<string, any>
		renderInDialogHandler: RenderInDialogHandler
		confirmHandler: ConfirmHandler
		connectToApi: ConnectToApi
		voteHandler: VoteHandler
		device: Device
	}) {
		const {
			controllerMap,
			renderInDialogHandler,
			confirmHandler,
			connectToApi,
			voteHandler,
			device,
		} = options

		this.controllerMap = { ...controllerMap, ...CORE_CONTROLLER_MAP }
		this.renderInDialogHandler = renderInDialogHandler
		this.confirmHandler = confirmHandler
		this.connectToApi = connectToApi
		this.voteHandler = voteHandler
		this.device = device
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

	public static Factory(options: {
		controllerMap?: Record<string, any>
		renderInDialogHandler?: RenderInDialogHandler
		voteHandler?: VoteHandler
		confirmHandler?: ConfirmHandler
		connectToApi: ConnectToApi
		device: Device
	}) {
		const {
			controllerMap = {},
			renderInDialogHandler,
			confirmHandler,
			connectToApi,
			voteHandler,
			device,
		} = assertOptions(options, ['connectToApi', 'device'])

		return new this({
			controllerMap,
			connectToApi,
			device,
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
			renderInDialogHandler: this.renderInDialogHandler,
			confirmHandler: this.confirmHandler,
			voteHandler: options?.voteHandler ?? this.voteHandler,
			connectToApi: this.connectToApi,
			device: this.device,
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
