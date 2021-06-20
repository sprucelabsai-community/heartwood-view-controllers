import { MercuryClient } from '@sprucelabs/mercury-client'
import SpruceError from '../errors/SpruceError'
import {
	BuiltSkillViewController,
	BuiltViewController,
	ConfirmHandler,
	ControllerOptions,
	ImportedViewController,
	RenderInDialogHandler,
	SkillViewController,
	ViewController,
	ViewControllerMap,
	ViewControllerId,
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

type ViewControllerConstructor<Vc extends ViewController<any>> = new (
	options: ViewControllerOptions
) => Vc

type ConnectToApi = () => Promise<MercuryClient>

type BuiltViewControllerOrSkillViewController<
	Vc extends ViewController<any> | SkillViewController
> = Vc extends SkillViewController
	? BuiltSkillViewController<Vc>
	: BuiltViewController<Vc>

export default class ViewControllerFactory<
	Map extends ViewControllerMap = ViewControllerMap
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
	): BuiltViewControllerOrSkillViewController<
		InstanceType<ViewControllerMap[N]>
	> {
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
		let instance = new Class(constructorOptions) as InstanceType<
			ViewControllerMap[N]
		>

		if (isFunction) {
			//@ts-ignore
			instance = instance.__proto__ ?? instance
		}

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

		//@ts-ignorea
		return instance
	}
}
