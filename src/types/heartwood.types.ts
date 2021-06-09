import { MercuryClient } from '@sprucelabs/mercury-client'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	InvalidFieldError,
	Schema,
	SchemaFieldNames,
	SchemaPartialValues,
} from '@sprucelabs/schema'
import { fancyIcons, lineIcons } from '../constants'
import BigFormViewControllerImpl, {
	BigFormViewControllerOptions,
} from '../viewControllers/BigForm.vc'
import ButtonGroupViewController, {
	ButtonGroupViewControllerOptions,
} from '../viewControllers/ButtonGroup.vc'
import CardViewControllerImpl, {
	CardViewControllerOptions,
} from '../viewControllers/Card.vc'
import ConfirmViewController, {
	ConfirmViewControllerOptions,
} from '../viewControllers/Confirm.vc'
import DialogViewController, {
	DialogViewControllerOptions,
} from '../viewControllers/Dialog.vc'
import FormViewControllerImpl, {
	FormViewControllerOptions,
} from '../viewControllers/Form.vc'
import LoginViewController, {
	LoginViewControllerOptions,
} from '../viewControllers/Login.vc'
import SwipeViewController, {
	SwipeViewControllerOptions,
} from '../viewControllers/Swipe.vc'
import ViewControllerFactory from '../viewControllers/ViewControllerFactory'
export type ErrorHandler = (message: string) => void

type Person = SpruceSchemas.Spruce.v2020_07_22.Person
type DidLoginPayload = (payload: { token: string; person: Person }) => void
type DidLogoutPayload = (payload: { person: Person }) => void
interface Payloads {
	'did-login': DidLoginPayload
	'did-logout': DidLogoutPayload
}

export interface Authenticator {
	setToken(token: string, person: Person): void
	getToken(): string | null
	isLoggedIn(): boolean
	clearToken(): void
	addEventListener<N extends 'did-login' | 'did-logout'>(
		name: N,
		cb: Payloads[N]
	): void
}

export interface AuthenticatorStatic {
	getInstance(): Authenticator
}

export interface TypedInvalidFieldError<
	S extends Schema,
	N extends SchemaFieldNames<S> = SchemaFieldNames<S>
> extends InvalidFieldError {
	name: N
	code: 'invalid_value' | 'missing_required'
}

export interface WithErrorHandler {
	onError?: ErrorHandler
}

export type LineIcon = typeof lineIcons[number]
export type FancyIcon = typeof fancyIcons[number]

export type FormErrorsByField<S extends Schema = Schema> = Record<
	SchemaFieldNames<S>,
	TypedInvalidFieldError<S>[]
>

export interface FormOnChangeOptions<S extends Schema = Schema> {
	values: SchemaPartialValues<S>
	controller: FormViewController<S>
	errorsByField: FormErrorsByField<S>
	isValid: boolean
}

export type FormOnSubmitOptions<S extends Schema = Schema> =
	FormOnChangeOptions<S>

type OnSubmitResponse = void | boolean
export type SubmitHandler<
	S extends Schema = Schema,
	Extra extends Record<string, any> | undefined = undefined
> = (
	options: Extra extends undefined
		? FormOnChangeOptions<S>
		: FormOnChangeOptions<S> & Extra
) => Promise<OnSubmitResponse> | OnSubmitResponse

export interface SwipeController {
	swipeTo(idx: number): void
}

export interface SkillViewControllerLoadOptions {
	router: Router
	args?: Record<string, any>
	authenticator: Authenticator
}

export type CardViewController = CardViewControllerImpl
export type FormViewController<S extends Schema> = FormViewControllerImpl<S>
export type BigFormViewController<S extends Schema> =
	BigFormViewControllerImpl<S>

export interface ViewController<ViewModel extends Record<string, any>> {
	render(): ViewModel
	triggerRender: () => void
}

export interface SkillViewController extends ViewController<SkillView> {
	load(options: SkillViewControllerLoadOptions): Promise<void>
}

export type ImportedViewController = (new () =>
	| ViewController<any>
	| SkillViewController) & {
	id: string
}

export interface Router {
	redirect(id: string, args?: Record<string, any>): Promise<void>
	back(): Promise<void>
}

export type SkillView = SpruceSchemas.Heartwood.v2021_02_11.SkillView

export interface ButtonController {
	render(): SpruceSchemas.Heartwood.v2021_02_11.Button
	triggerRender: () => void
}

export interface ViewControllerMap {
	form: typeof FormViewControllerImpl
	login: typeof LoginViewController
	swipe: typeof SwipeViewController
	buttonGroup: typeof ButtonGroupViewController
	card: typeof CardViewControllerImpl
	dialog: typeof DialogViewController
	bigForm: typeof BigFormViewControllerImpl
	confirm: typeof ConfirmViewController
}

export interface ViewControllerOptionsMap {
	form: FormViewControllerOptions<any>
	login: LoginViewControllerOptions
	swipe: SwipeViewControllerOptions
	buttonGroup: ButtonGroupViewControllerOptions
	card: CardViewControllerOptions
	dialog: DialogViewControllerOptions
	bigForm: BigFormViewControllerOptions<Schema>
	confirm: ConfirmViewControllerOptions
}

export type ControllerOptions<
	N extends keyof ViewControllerMap,
	O extends ViewControllerOptionsMap = ViewControllerOptionsMap
> = N extends keyof O ? O[N] : Record<string, never>

export type Client = MercuryClient

export type OnRenderHandler = {
	onRender?(): void
}

export type RenderInDialogHandler = (
	options: DialogViewControllerOptions
) => void

export interface ConfirmOptions {
	title?: string
	subtitle?: string
	message?: string
}

export type ConfirmHandler = (options: ConfirmOptions) => Promise<boolean>

export interface ViewControllerOptions {
	vcFactory: ViewControllerFactory<any>
	connectToApi: () => Promise<Client>
	renderInDialogHandler: RenderInDialogHandler
	confirmHandler: ConfirmHandler
}

export type BuiltViewController<
	Vc extends ViewController<any> = ViewController<any>
> = {
	id: string
} & Vc

export type BuiltSkillViewController<
	Vc extends SkillViewController = SkillViewController
> = {
	id: string
} & Vc

export type RenderFieldOptions<S extends Schema> = {
	name: SchemaFieldNames<S>
	renderAs?: 'colorPicker' | 'number'
	renderHintAs?: 'subtitle' | 'tooltip'
	label?: string
	hint?: string
}
