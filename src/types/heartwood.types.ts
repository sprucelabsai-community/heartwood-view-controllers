import { MercuryClient } from '@sprucelabs/mercury-client'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	FieldError,
	Schema,
	SchemaFieldNames,
	SchemaPartialValues,
} from '@sprucelabs/schema'
import { fancyIcons, formBuilderFieldTypes, lineIcons } from '../constants'
import { UniversalViewOptionFields } from '../utilities/removeUniversalViewOptions'
import ActiveRecordCardViewController, {
	ActiveRecordCardViewControllerOptions,
} from '../viewControllers/activeRecord/ActiveRecordCard.vc'
import ActiveRecordListViewController, {
	ActiveRecordListViewControllerOptions,
} from '../viewControllers/activeRecord/ActiveRecordList.vc'
import BigFormViewControllerImpl, {
	BigFormViewControllerOptions,
} from '../viewControllers/BigForm.vc'
import ButtonBarViewController, {
	ButtonBarViewControllerOptions,
} from '../viewControllers/ButtonBar.vc'
import ButtonGroupViewController, {
	ButtonGroupViewControllerOptions,
} from '../viewControllers/ButtonGroup.vc'
import CalendarViewController, {
	CalendarViewControllerOptions,
} from '../viewControllers/Calendar.vc'
import CardViewControllerImpl, {
	CardViewControllerOptions,
} from '../viewControllers/card/Card.vc'
import ConfirmViewController, {
	ConfirmViewControllerOptions,
} from '../viewControllers/Confirm.vc'
import DialogViewController, {
	DialogViewControllerOptions,
} from '../viewControllers/Dialog.vc'
import FormViewControllerImpl, {
	FormViewControllerOptions,
} from '../viewControllers/Form.vc'
import FormBuilderPageViewControllerImpl, {
	FormBuilderCardViewControllerOptions,
} from '../viewControllers/formBuilder/FormBuilderCard.vc'
import ListViewController, {
	ListViewControllerOptions,
} from '../viewControllers/list/List.vc'
import LoginViewController, {
	LoginViewControllerOptions,
} from '../viewControllers/Login.vc'
import RatingsViewController, {
	RatingsViewControllerOptions,
} from '../viewControllers/Ratings.vc'
import ProgressViewController, {
	ProgressViewControllerOptions,
} from '../viewControllers/reporting/Progress.vc'
import StatsViewController, {
	StatsViewControllerOptions,
} from '../viewControllers/reporting/Stats.vc'
import SwipeCardViewControllerImpl, {
	SwipeViewControllerOptions,
} from '../viewControllers/SwipeCard.vc'
import TalkingSprucebotViewController, {
	TalkingSprucebotViewControllerOptions,
} from '../viewControllers/TalkingSprucebot.vc'
import ToolBeltViewController, {
	ToolBeltViewControllerOptions,
} from '../viewControllers/ToolBelt.vc'
import ViewControllerFactory from '../viewControllers/ViewControllerFactory'
export * from './calendar.types'
import '@sprucelabs/mercury-core-events'

export type ErrorHandler = (message: string) => void

type Person = SpruceSchemas.Spruce.v2020_07_22.Person
type DidLoginPayload = (payload: { token: string; person: Person }) => void
type DidLogoutPayload = (payload: { person: Person }) => void
interface Payloads {
	'did-login': DidLoginPayload
	'did-logout': DidLogoutPayload
}

export interface Authenticator {
	getPerson(): Person | null
	setSessionToken(token: string, person: Person): void
	getSessionToken(): string | null
	isLoggedIn(): boolean
	clearSession(): void
	addEventListener<N extends 'did-login' | 'did-logout'>(
		name: N,
		cb: Payloads[N]
	): void
}

export interface AuthenticatorStatic {
	getInstance(): Authenticator
}

export interface TypedFieldError<
	S extends Schema,
	N extends SchemaFieldNames<S> = SchemaFieldNames<S>
> extends FieldError {
	name: N
	code: 'INVALID_PARAMETER' | 'MISSING_PARAMETER'
}

export interface WithErrorHandler {
	onError?: ErrorHandler
}

export type LineIcon = typeof lineIcons[number]
export type FancyIcon = typeof fancyIcons[number]

export type FormErrorsByField<S extends Schema = Schema> = Partial<
	Record<SchemaFieldNames<S>, TypedFieldError<S>[]>
>

export interface FormOnChangeOptions<S extends Schema = Schema> {
	values: SchemaPartialValues<S>
	controller: FormViewController<S>
	errorsByField: FormErrorsByField<S>
	isValid: boolean
}

export type FormWillChangeOptions<S extends Schema> = FormOnChangeOptions<S> & {
	changes: SchemaPartialValues<S>
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

type Organization = SpruceSchemas.Spruce.v2020_07_22.Organization
type Location = SpruceSchemas.Spruce.v2020_07_22.Location

export interface Scope {
	getCurrentOrganization(): Promise<Organization | null>
	setCurrentOrganization(id: string | null): void
	getCurrentLocation(): Promise<Location | null>
	setCurrentLocation(id: string | null): void
	clearSession(): void
}

export interface SkillViewControllerLoadOptions<
	Args extends Record<string, any> = Record<string, any>
> {
	router: Router
	args: Args
	authenticator: Authenticator
	authorizer: Authorizer
	locale: Locale
	scope: Scope
}

export type CardViewController = CardViewControllerImpl

type CardUniversals = Pick<
	CardViewController,
	| 'setCriticalError'
	| 'getHasCriticalError'
	| 'clearCriticalError'
	| 'setIsBusy'
	| 'isBusy'
>

export type FormBuilderCardViewController = FormBuilderPageViewControllerImpl &
	CardUniversals
export type SwipeCardViewController = SwipeCardViewControllerImpl &
	CardUniversals
export type FormViewController<S extends Schema> = FormViewControllerImpl<S>
export type BigFormViewController<S extends Schema> =
	BigFormViewControllerImpl<S>

export interface ViewController<ViewModel extends Record<string, any>> {
	render(): ViewModel
	triggerRender: () => void
	destroy?: () => Promise<void> | void
	willBlur?: () => void
	didBlur?: () => void
	willFocus?: () => void
	didFocus?: () => void
}

export type ScopeFlag = 'location' | 'organization' | 'employed' | 'none'

export interface SkillViewController<
	Args extends Record<string, any> = Record<string, any>
> extends ViewController<SkillView> {
	getIsLoginRequired?(): Promise<boolean>
	focus?(): Promise<void>
	/**
	 * @deprecated -> use getScope() => ['location']
	 */
	getScopedBy?(): ScopedBy
	getScope?(): ScopeFlag[]
	blur?(): Promise<void>
	load(options: SkillViewControllerLoadOptions<Args>): Promise<void>
	renderToolBelt(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBelt | null
	getTitle?(): string | undefined
	getSubtitle?(): string | undefined
}

export type ImportedViewController = (new () =>
	| ViewController<any>
	| SkillViewController) & {
	id: string
}

export type ViewControllerId = keyof ViewControllerMap
export type SkillViewControllerId = keyof SkillViewControllerMap

export interface RedirectOptions {
	shouldTrackHistory?: boolean
}

export interface Router {
	redirect<Id extends SkillViewControllerId>(
		id: Id,
		args?: SkillViewControllerArgs<Id>,
		options?: RedirectOptions
	): Promise<SkillViewControllerMap[Id]>
	back(): Promise<SkillViewController | undefined>
}

export type SkillView =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView

export interface ButtonController {
	render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button
	triggerRender: () => void
}

export interface ViewControllerMap {
	form: FormViewController<any>
	login: LoginViewController
	swipeCard: SwipeCardViewController
	buttonGroup: ButtonGroupViewController
	card: CardViewController
	dialog: DialogViewController
	bigForm: BigFormViewController<any>
	confirm: ConfirmViewController
	formBuilderCard: FormBuilderCardViewController
	activeRecordCard: ActiveRecordCardViewController
	activeRecordList: ActiveRecordListViewController
	list: ListViewController
	toolBelt: ToolBeltViewController
	calendar: CalendarViewController
	buttonBar: ButtonBarViewController
	talkingSprucebot: TalkingSprucebotViewController
	stats: StatsViewController
	progress: ProgressViewController
	ratings: RatingsViewController
}

export interface ViewControllerOptionsMap {
	form: FormViewControllerOptions<any>
	login: LoginViewControllerOptions
	swipeCard: SwipeViewControllerOptions
	buttonGroup: ButtonGroupViewControllerOptions
	card: CardViewControllerOptions
	dialog: DialogViewControllerOptions
	bigForm: BigFormViewControllerOptions<Schema>
	confirm: ConfirmViewControllerOptions
	formBuilderCard: FormBuilderCardViewControllerOptions
	list: ListViewControllerOptions
	toolBelt: ToolBeltViewControllerOptions
	calendar: CalendarViewControllerOptions
	buttonBar: ButtonBarViewControllerOptions
	talkingSprucebot: TalkingSprucebotViewControllerOptions
	activeRecordCard: ActiveRecordCardViewControllerOptions
	activeRecordList: ActiveRecordListViewControllerOptions
	stats: StatsViewControllerOptions
	progress: ProgressViewControllerOptions
	ratings: RatingsViewControllerOptions
}

export interface SkillViewControllerMap {}
export interface SkillViewControllerArgsMap {}

export type ControllerOptions<
	N extends ViewControllerId,
	O extends ViewControllerOptionsMap = ViewControllerOptionsMap
> = Omit<
	N extends keyof O ? O[N] : Record<string, never>,
	UniversalViewOptionFields
>

export type SkillViewControllerArgs<
	N extends SkillViewControllerId,
	O extends SkillViewControllerArgsMap = SkillViewControllerArgsMap
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
	isDestructive?: boolean
	body?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardBody
}

export type ConfirmHandler = (options: ConfirmOptions) => Promise<boolean>
export type VoteOptions =
	SpruceSchemas.Mercury.v2020_12_25.VoteForFeatureEmitPayload & {
		howCoolWouldItBeIf: string
	}

export type VoteHandler = (options: VoteOptions) => Promise<void>

export interface ViewControllerOptions {
	vcFactory: ViewControllerFactory
	connectToApi: () => Promise<Client>
	renderInDialogHandler: RenderInDialogHandler
	confirmHandler: ConfirmHandler
	voteHandler: VoteHandler
	device: Device
}

export type FieldRenderOptions<S extends Schema> = {
	name: SchemaFieldNames<S>
	renderAs?: 'colorPicker' | 'number' | 'textarea' | 'ratings' | 'checkbox'
	renderHintAs?: 'subtitle' | 'tooltip'
	placeholder?: string
	label?: string
	hint?: string
}

export interface DropdownController {
	hide: () => void
	show: () => void
}

export type KeyboardKey =
	| ' '
	| '!'
	| '"'
	| '#'
	| '$'
	| '%'
	| '&'
	| '('
	| ')'
	| '*'
	| '+'
	| ','
	| '-'
	| '.'
	| '/'
	| '0'
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| ':'
	| ';'
	| '<'
	| '='
	| '>'
	| '?'
	| '@'
	| 'A'
	| 'B'
	| 'C'
	| 'D'
	| 'E'
	| 'F'
	| 'G'
	| 'H'
	| 'I'
	| 'J'
	| 'K'
	| 'L'
	| 'M'
	| 'N'
	| 'O'
	| 'P'
	| 'Q'
	| 'R'
	| 'S'
	| 'T'
	| 'U'
	| 'V'
	| 'W'
	| 'X'
	| 'Y'
	| 'Z'
	| '['
	| '\\'
	| ']'
	| '^'
	| '_'
	| '`'
	| 'a'
	| 'b'
	| 'c'
	| 'd'
	| 'e'
	| 'f'
	| 'g'
	| 'h'
	| 'i'
	| 'j'
	| 'k'
	| 'l'
	| 'm'
	| 'n'
	| 'o'
	| 'p'
	| 'q'
	| 'r'
	| 's'
	| 't'
	| 'u'
	| 'v'
	| 'w'
	| 'x'
	| 'y'
	| 'z'
	| '{'
	| '|'
	| '}'
	| '~'
	| 'Tab'
	| 'Enter'
	| 'Escape'

export type FormBuilderFieldType = keyof typeof formBuilderFieldTypes

export type ScopedBy = 'none' | 'organization' | 'location'
export type CriticalError =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CriticalError

export interface Device {
	vibrate(): void
}

export interface Locale {
	setTimezoneOffsetMinutes(offset: number): void
	getTimezoneOffsetMinutes(): number
}

export interface AuthorizerCanOptions<PermissionId extends string> {
	contractId: string
	permissionIds: PermissionId[]
}

export interface Authorizer {
	can<PermissionId extends string>(
		options: AuthorizerCanOptions<PermissionId>
	): Promise<Record<PermissionId, boolean>>
}
