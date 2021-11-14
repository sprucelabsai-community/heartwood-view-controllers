import { MercuryClient } from '@sprucelabs/mercury-client'
import { SchemaError } from '@sprucelabs/schema'
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

	public constructor(options: {
		controllerMap: Record<string, any>
		renderInDialogHandler: RenderInDialogHandler
		confirmHandler: ConfirmHandler
		connectToApi: ConnectToApi
		voteHandler: VoteHandler
	}) {
		const { controllerMap, renderInDialogHandler, confirmHandler } = options
		this.controllerMap = { ...controllerMap, ...CORE_CONTROLLER_MAP }
		this.renderInDialogHandler = renderInDialogHandler
		this.confirmHandler = confirmHandler
		this.connectToApi = options.connectToApi
		this.voteHandler = options.voteHandler
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
	}) {
		const {
			controllerMap = {},
			renderInDialogHandler,
			confirmHandler,
			connectToApi,
			voteHandler,
		} = options ?? {}

		if (!options?.connectToApi) {
			throw new SchemaError({
				code: 'MISSING_PARAMETERS',
				parameters: ['connectToApi'],
			})
		}

		return new this({
			controllerMap,
			connectToApi,
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
