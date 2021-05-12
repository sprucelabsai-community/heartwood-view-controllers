import { MercuryClient } from '@sprucelabs/mercury-client'
import SpruceError from '../errors/SpruceError'
import {
	ConfirmHandler,
	ControllerOptions,
	ImportedViewController,
	RenderInDialogHandler,
	ViewController,
	ViewControllerMap,
	ViewControllerOptions,
} from '../types/heartwood.types'
import BigFormViewController from './BigForm.vc'
import ButtonGroupViewController from './ButtonGroup.vc'
import CardViewController from './Card.vc'
import ConfirmViewController from './Confirm.vc'
import DialogViewController from './Dialog.vc'
import FormViewController from './Form.vc'
import LoginViewController from './Login.vc'
import SwipeViewController from './Swipe.vc'

const CORE_CONTROLLER_MAP = {
	form: FormViewController,
	login: LoginViewController,
	swipe: SwipeViewController,
	buttonGroup: ButtonGroupViewController,
	card: CardViewController,
	dialog: DialogViewController,
	bigForm: BigFormViewController,
	confirm: ConfirmViewController,
}

type ControllerMap = ViewControllerMap

type ViewControllerConstructor<Vc extends ViewController<any>> = new (
	options: ViewControllerOptions
) => Vc

type ConnectToApi = () => Promise<MercuryClient>

export default class ViewControllerFactory<
	Map extends ControllerMap = ControllerMap
> {
	private controllerMap: Map
	private renderInDialogHandler: RenderInDialogHandler
	private confirmHandler: ConfirmHandler
	private connectToApi: ConnectToApi

	public constructor(options: {
		controllerMap: Partial<Map>
		renderInDialogHandler: RenderInDialogHandler
		confirmHandler: ConfirmHandler
		connectToApi: ConnectToApi
	}) {
		const { controllerMap, renderInDialogHandler, confirmHandler } = options
		this.controllerMap = { ...controllerMap, ...CORE_CONTROLLER_MAP } as Map
		this.renderInDialogHandler = renderInDialogHandler
		this.confirmHandler = confirmHandler
		this.connectToApi = options.connectToApi
	}

	public setRenderInDialogHandler(handler: RenderInDialogHandler) {
		this.renderInDialogHandler = handler
	}

	public setConfirmHandler(handler: ConfirmHandler) {
		this.confirmHandler = handler
	}

	public static Factory(options: {
		controllerMap?: Partial<ViewControllerMap>
		renderInDialogHandler?: RenderInDialogHandler
		confirmHandler?: ConfirmHandler
		connectToApi: ConnectToApi
	}) {
		const {
			controllerMap = {},
			renderInDialogHandler,
			confirmHandler,
			connectToApi,
		} = options ?? {}

		if (!options?.connectToApi) {
			throw new SpruceError({
				code: 'MISSING_PARAMETERS',
				parameters: ['connectToApi'],
			})
		}

		return new this({
			controllerMap,
			connectToApi,
			confirmHandler: confirmHandler ? confirmHandler : async () => false,
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

	public setControllers<Vc extends ImportedViewController>(Vcs: Vc[]) {
		for (const Vc of Vcs) {
			//@ts-ignore
			this.controllerMap[Vc.id] = Vc
		}
	}

	public Controller<
		N extends keyof ControllerMap,
		O extends ControllerOptions<N> = ControllerOptions<N>
	>(name: N, options: O): InstanceType<ControllerMap[N]> {
		const Class = this.controllerMap[name]

		if (!Class) {
			throw new SpruceError({
				code: 'INVALID_VIEW_CONTROLLER_NAME',
				name,
				validNames: Object.keys(this.controllerMap),
			})
		}

		//@ts-ignore
		const isFunction = !!Class.__imported

		const constructorOptions = {
			...options,
			vcFactory: this,
			renderInDialogHandler: this.renderInDialogHandler,
			confirmHandler: this.confirmHandler,
			connectToApi: this.connectToApi,
		}

		//@ts-ignore
		const instance = new Class(constructorOptions) as InstanceType<
			ControllerMap[N]
		>

		if (isFunction) {
			//@ts-ignore
			return instance.__proto__ ?? instance
		}

		return instance
	}
}
