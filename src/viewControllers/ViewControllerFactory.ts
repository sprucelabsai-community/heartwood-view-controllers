import { MercuryClientFactory } from '@sprucelabs/mercury-client'
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

export default class ViewControllerFactory<
	Map extends ControllerMap = ControllerMap
> {
	private client: any
	private controllerMap: Map
	private renderInDialogHandler: RenderInDialogHandler
	private confirmHandler: ConfirmHandler

	public constructor(options: {
		controllerMap: Partial<Map>
		renderInDialogHandler: RenderInDialogHandler
		confirmHandler: ConfirmHandler
	}) {
		const { controllerMap, renderInDialogHandler, confirmHandler } = options
		this.controllerMap = { ...controllerMap, ...CORE_CONTROLLER_MAP } as Map
		this.renderInDialogHandler = renderInDialogHandler
		this.confirmHandler = confirmHandler
	}

	public setRenderInDialogHandler(handler: RenderInDialogHandler) {
		this.renderInDialogHandler = handler
	}

	public setConfirmHandler(handler: ConfirmHandler) {
		this.confirmHandler = handler
	}

	public static Factory(options?: {
		controllerMap?: Partial<ViewControllerMap>
		renderInDialogHandler?: RenderInDialogHandler
		confirmHandler?: ConfirmHandler
	}) {
		const { controllerMap = {}, renderInDialogHandler, confirmHandler } =
			options ?? {}
		return new this({
			controllerMap,
			confirmHandler: confirmHandler ? confirmHandler : async () => false,
			renderInDialogHandler: renderInDialogHandler
				? renderInDialogHandler
				: () => {},
		})
	}

	private async connectToApi() {
		if (!this.client) {
			this.client = MercuryClientFactory.Client({
				host: process.env.HOST,
				shouldReconnect: false,
			})
		}

		return this.client
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
		return new Class({
			...options,
			vcFactory: this,
			renderInDialogHandler: this.renderInDialogHandler,
			confirmHandler: this.confirmHandler,
			connectToApi: this.connectToApi.bind(this),
		}) as InstanceType<ControllerMap[N]>
	}
}
