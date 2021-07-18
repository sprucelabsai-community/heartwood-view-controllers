import { MercuryClient } from '@sprucelabs/mercury-client'
import AuthenticatorImpl from '../auth/Authenticator'
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
	Authenticator,
} from '../types/heartwood.types'
import BigFormViewController from './BigForm.vc'
import ButtonGroupViewController from './ButtonGroup.vc'
import CardViewController from './Card.vc'
import ConfirmViewController from './Confirm.vc'
import DialogViewController from './Dialog.vc'
import FormViewController from './Form.vc'
import FormBuilderViewController from './formBuilder/FormBuilder.vc'
import ListViewController from './list/List.vc'
import LoginViewController from './Login.vc'
import SwipeViewController from './Swipe.vc'

export const CORE_CONTROLLER_MAP = {
	form: FormViewController,
	login: LoginViewController,
	swipe: SwipeViewController,
	buttonGroup: ButtonGroupViewController,
	card: CardViewController,
	dialog: DialogViewController,
	bigForm: BigFormViewController,
	confirm: ConfirmViewController,
	formBuilder: FormBuilderViewController,
	list: ListViewController,
}

type ViewControllerConstructor<Vc extends ViewController<any>> = new (
	options: ViewControllerOptions
) => Vc

type ConnectToApi = () => Promise<MercuryClient>

export default class ViewControllerFactory {
	private controllerMap: Record<string, any>
	private renderInDialogHandler: RenderInDialogHandler
	private confirmHandler: ConfirmHandler
	private connectToApi: ConnectToApi
	private auth: Authenticator

	public constructor(options: {
		controllerMap: Record<string, any>
		renderInDialogHandler: RenderInDialogHandler
		confirmHandler: ConfirmHandler
		connectToApi: ConnectToApi
		auth: Authenticator
	}) {
		const { controllerMap, renderInDialogHandler, confirmHandler } = options
		this.controllerMap = { ...controllerMap, ...CORE_CONTROLLER_MAP }
		this.renderInDialogHandler = renderInDialogHandler
		this.confirmHandler = confirmHandler
		this.connectToApi = options.connectToApi
		this.auth = options.auth
	}

	public setRenderInDialogHandler(handler: RenderInDialogHandler) {
		this.renderInDialogHandler = handler
	}

	public setConfirmHandler(handler: ConfirmHandler) {
		this.confirmHandler = handler
	}

	public static Factory(options: {
		controllerMap?: Record<string, any>
		renderInDialogHandler?: RenderInDialogHandler
		confirmHandler?: ConfirmHandler
		connectToApi: ConnectToApi
		auth?: Authenticator
	}) {
		const {
			controllerMap = {},
			renderInDialogHandler,
			confirmHandler,
			connectToApi,
			auth,
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
			auth: auth ?? AuthenticatorImpl.getInstance(),
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
			connectToApi: async (...args: any[]) => {
				debugger
				//@ts-ignore
				const client = await this.connectToApi(...args)
				if (!client.isAuthenticated() && this.auth.isLoggedIn()) {
					await client.authenticate({ token: this.auth.getToken() as string })
				}
				return client
			},
		}

		//@ts-ignore
		let instance = new Class(constructorOptions)

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
