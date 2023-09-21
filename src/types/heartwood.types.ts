import {
	DateUtil,
	Locale as ILocale,
	TimezoneName as ITimezoneName,
} from '@sprucelabs/calendar-utils'
import { MercuryClient } from '@sprucelabs/mercury-client'
import {
	PermissionContractId,
	PermissionId,
	SpruceSchemas,
} from '@sprucelabs/mercury-types'
import {
	AddressFieldValue,
	FieldDefinitions,
	FieldError,
	Schema,
	SchemaFieldNames,
	SchemaPartialValues,
} from '@sprucelabs/schema'
import { CalendarEventOptions } from '..'
import { fancyIcons, lineIcons } from '../constants'
import mapUtil from '../maps/map.utility'
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
import CalendarEventViewController from '../viewControllers/CalendarEvent.vc'
import CardViewControllerImpl, {
	CardViewControllerOptions,
} from '../viewControllers/card/Card.vc'
import ConfirmViewController, {
	ConfirmViewControllerOptions,
} from '../viewControllers/Confirm.vc'
import DialogViewController, {
	DialogViewControllerOptions,
} from '../viewControllers/Dialog.vc'
import FeedViewController, {
	FeedViewControllerOptions,
} from '../viewControllers/Feed.vc'
import AutocompleteInputViewController, {
	AutocompleteInputViewControllerOptions,
} from '../viewControllers/form/AutocompleteInput.vc'
import FormViewControllerImpl, {
	FormViewControllerOptions,
} from '../viewControllers/form/Form.vc'
import FormBuilderPageViewControllerImpl, {
	FormBuilderCardViewControllerOptions,
} from '../viewControllers/formBuilder/FormBuilderCard.vc'
import ListViewController, {
	ListViewControllerOptions,
} from '../viewControllers/list/List.vc'
import ListRowViewController from '../viewControllers/list/ListRow.vc'
import LoginViewController, {
	LoginViewControllerOptions,
} from '../viewControllers/Login.vc'
import MapViewController, {
	MapViewControllerOptions,
} from '../viewControllers/Map.vc'
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
	SwipeCardPassthroughMethods,
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

export { default as MapViewController } from '../viewControllers/Map.vc'

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

export type LineIcon = (typeof lineIcons)[number]
export type FancyIcon = (typeof fancyIcons)[number]

export type RowValues = Record<string, any> & {
	rowId?: string
}

export type RowStyle = NonNullable<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow['style']
>

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

export type BigFormOnSubmitOptions<S extends Schema = Schema> =
	FormOnChangeOptions<S> & {
		presentSlide: number
		controller: BigFormViewController<S>
	}

type OnSubmitResponse = void | boolean

export type SubmitHandler<S extends Schema = Schema> = (
	options: FormOnChangeOptions<S>
) => Promise<OnSubmitResponse> | OnSubmitResponse

export type SubmitSlideHandler<S extends Schema = Schema> = (
	options: BigFormOnSubmitOptions<S>
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
	locale: ILocale
	scope: Scope
	themes: ThemeManager
}

export type Theme = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Theme
export type InputButton =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton

export interface ThemeManager {
	setTheme(theme: Theme): void
	getTheme(): Theme
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

export type FormInputOptions = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Input,
	'name' | 'value'
>
export type FormBuilderCardViewController = FormBuilderPageViewControllerImpl &
	CardUniversals
export type SwipeCardViewController = SwipeCardViewControllerImpl &
	SwipeCardPassthroughMethods &
	CardUniversals
export type FormViewController<S extends Schema> = FormViewControllerImpl<S>
export type BigFormViewController<S extends Schema> =
	BigFormViewControllerImpl<S>
export type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
export type CardSection =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection
export type CardBody =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardBody
export type CardHeader =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeader
export type Button = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button
export type ToolBelt =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBelt
export type Feed = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Feed
export type SimpleViewControllerFactory = Pick<
	ViewControllerFactory,
	'Controller'
>
export type CalendarSelectedDate =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarSelectedDate
export type FormSection<S extends Schema> =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection<S>
export type Map = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Map
export type MapZoom = NonNullable<Map['zoom']>
export type MapPin = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.MapPin
export type LatLng = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LatLng
export type List = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List
export type ListRow = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow
export type ListCell =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCell
export type Receipt = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Receipt
export type Slide =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection
export type SkillView =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView
export type Calendar =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar
export type CalendarPerson =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarPerson
export type CardFooter =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter
export type FormBuilder<S extends Schema = Schema> =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormBuilderImportExportObject<S>
export type FormBuilderPage =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormBuilderImportExportPage

export type Form<S extends Schema = any> =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Form<S>

export type LayoutStyle = NonNullable<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView['layout']
>
export type ListColumnWidth = NonNullable<List['columnWidths']>[number]

export type TriggerRender = () => void

export type TriggerRenderHandler = () => void

export interface ViewController<ViewModel extends Record<string, any>> {
	render(): ViewModel
	setTriggerRenderHandler: (handler: TriggerRenderHandler) => void
	triggerRender: TriggerRender
	destroy?: () => Promise<void> | void
	willBlur?: () => void | Promise<void>
	didBlur?: () => void | Promise<void>
	willFocus?: () => void | Promise<void>
	didFocus?: () => void | Promise<void>
}

export type ScopeFlag = 'location' | 'organization' | 'employed' | 'none'

export type ButtonGroupButton = Omit<Button, 'onClick' | 'onClickHintIcon'> & {
	id: string
}

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
	renderToolBelt?(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBelt | null
	renderNavigation?(): null | undefined
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
	getNamespace?(): string
}

export interface ButtonController {
	render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button
	triggerRender: () => void
	setTriggerRenderHandler(handler: TriggerRenderHandler): void
}

export interface ViewControllerMap {
	form: FormViewController<any>
	/**
	 * @deprecated 'login' -> 'login-card'
	 */
	login: LoginViewController
	'login-card': LoginViewController
	/**
	 * @deprecated 'swipeCard' -> 'swipe-card'
	 */
	swipeCard: SwipeCardViewController
	'swipe-card': SwipeCardViewController
	/**
	 * @deprecated 'buttonGroup' -> 'button-group'
	 */
	buttonGroup: ButtonGroupViewController
	'button-group': ButtonGroupViewController
	card: CardViewController
	dialog: DialogViewController
	/**
	 * @deprecated 'bigForm' -> 'big-form'
	 */
	bigForm: BigFormViewController<any>
	'big-form': BigFormViewController<any>
	confirm: ConfirmViewController
	/**
	 * @deprecated 'form-builder-card' -> 'form-builder-card'
	 */
	formBuilderCard: FormBuilderCardViewController
	'form-builder-card': FormBuilderCardViewController
	list: ListViewController
	toolBelt: ToolBeltViewController
	/**
	 * @deprecated 'toolBelt' -> 'tool-belt'
	 */
	'tool-belt': ToolBeltViewController
	calendar: CalendarViewController

	'calendar-event': CalendarEventViewController
	/**
	 * @deprecated 'buttonBar' -> 'button-bar'
	 */
	buttonBar: ButtonBarViewController
	'button-bar': ButtonBarViewController
	/**
	 * @deprecated 'talkingSprucebot' -> 'talking-sprucebot'
	 */
	talkingSprucebot: TalkingSprucebotViewController
	'talking-sprucebot': TalkingSprucebotViewController
	/**
	 * @deprecated 'activeRecordCard' -> 'activeRecordCard'
	 */
	activeRecordCard: ActiveRecordCardViewController
	'active-record-card': ActiveRecordCardViewController

	/**
	 * @deprecated 'activeRecordList' -> 'active-record-list'
	 */
	activeRecordList: ActiveRecordListViewController
	'active-record-list': ActiveRecordListViewController
	stats: StatsViewController
	progress: ProgressViewController
	ratings: RatingsViewController
	/**
	 * @deprecated 'autocompleteInput' -> 'autocomplete-input'
	 */
	autocompleteInput: AutocompleteInputViewController
	'autocomplete-input': AutocompleteInputViewController
	map: MapViewController
	feed: FeedViewController
}

export interface ViewControllerOptionsMap {
	form: FormViewControllerOptions<any>
	login: LoginViewControllerOptions
	'login-card': LoginViewControllerOptions
	swipeCard: SwipeViewControllerOptions
	'swipe-card': SwipeViewControllerOptions
	buttonGroup: ButtonGroupViewControllerOptions
	'button-group': ButtonGroupViewControllerOptions
	card: CardViewControllerOptions
	dialog: DialogViewControllerOptions
	bigForm: BigFormViewControllerOptions<Schema>
	'big-form': BigFormViewControllerOptions<Schema>
	confirm: ConfirmViewControllerOptions
	formBuilderCard: FormBuilderCardViewControllerOptions
	'form-builder-card': FormBuilderCardViewControllerOptions
	list: ListViewControllerOptions
	toolBelt: ToolBeltViewControllerOptions
	'tool-belt': ToolBeltViewControllerOptions
	calendar: CalendarViewControllerOptions
	'calendar-event': CalendarEventOptions
	buttonBar: ButtonBarViewControllerOptions
	'button-bar': ButtonBarViewControllerOptions
	talkingSprucebot: TalkingSprucebotViewControllerOptions
	'talking-sprucebot': TalkingSprucebotViewControllerOptions
	activeRecordCard: ActiveRecordCardViewControllerOptions
	'active-record-card': ActiveRecordCardViewControllerOptions
	activeRecordList: ActiveRecordListViewControllerOptions
	'active-record-list': ActiveRecordListViewControllerOptions
	stats: StatsViewControllerOptions
	progress: ProgressViewControllerOptions
	ratings: RatingsViewControllerOptions
	autocompleteInput: AutocompleteInputViewControllerOptions
	'autocomplete-input': AutocompleteInputViewControllerOptions
	map: MapViewControllerOptions
	feed: FeedViewControllerOptions
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

export type MapUtil = typeof mapUtil

export interface OpenNavigationOptions {
	to: AddressFieldValue
}

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

export interface ToastOptions {
	message: string
}

export type VoteHandler = (options: VoteOptions) => Promise<void>
export type ToastHandler = (options: ToastOptions) => void

export interface FormInputHandlers<View> {
	getValue: () => any
	setValue: (value: any) => Promise<void>
	setModel: (model: View) => void
	getModel: () => View
}

export interface FormInputViewController<View extends Record<string, any> = any>
	extends ViewController<View> {
	setHandlers(options: FormInputHandlers<View>): void
	setValue(value: any, renderedValue?: any): Promise<void>
	getValue(): any
	setRenderedValue: (renderedValue: any) => Promise<void>
	getRenderedValue: () => any
}

export interface ViewControllerOptions {
	vcFactory: ViewControllerFactory
	connectToApi: () => Promise<Client>
	renderInDialogHandler: RenderInDialogHandler
	confirmHandler: ConfirmHandler
	voteHandler: VoteHandler
	toastHandler: ToastHandler
	device: Device
	dates: DateUtil
	maps: MapUtil
}

export type RenderAsComponent =
	| 'colorPicker'
	| 'number'
	| 'textarea'
	| 'ratings'
	| 'checkbox'
	| 'autocomplete'
	| 'tags'
	| 'signature'

export type FieldRenderOptions<S extends Schema> = {
	name: SchemaFieldNames<S>
	renderAs?: RenderAsComponent
	renderHintAs?: 'subtitle' | 'tooltip'
	placeholder?: string | null
	label?: string | null
	hint?: string | null
	vc?: FormInputViewController
	fieldDefinition?: FieldDefinitions
	rightButtons?: InputButton[]
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

export interface CellInputKeyDownOptions {
	rowVc: ListRowViewController
	key: KeyboardKey
}

export type ScopedBy = 'none' | 'organization' | 'location'
export type CriticalError =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CriticalError

export type OnSubmitFeedMessageHandler = (
	message: string
) => void | boolean | Promise<void | boolean>

/**
 * @deprecated moved to @sprucelabs/calendar-utils
 */
export type TimezoneName = ITimezoneName
/**
 * @deprecated moved to @sprucelabs/calendar-utils
 */
export type Locale = ILocale

export type CachedValue = string | number | Record<string, any> | boolean | null

export interface Device {
	vibrate(): void
	call(phoneNumber: string): void
	setCachedValue(key: string, value: CachedValue): void
	getCachedValue(key: string): CachedValue
}

export interface AuthorizerCanOptions<
	ContractId extends PermissionContractId,
	Ids extends PermissionId<ContractId> = PermissionId<ContractId>
> {
	contractId: ContractId
	permissionIds: Ids[]
	target?: SpruceSchemas.Mercury.v2020_12_25.GetResolvedPermissionsContractEmitTarget
}

type SavePermissionsTarget = Omit<
	SpruceSchemas.Mercury.v2020_12_25.SavePermissionsEmitTarget,
	'permissionPersonId' | 'permissionContractId' | 'permissionSkillId'
>

export interface SavePermissionsOptions<
	ContractId extends PermissionContractId,
	Ids extends PermissionId<ContractId>
> {
	target: SavePermissionsTarget & { personId?: string; skillId?: string }
	contractId: ContractId
	permissions: {
		id: Ids
		can: StatusFlag
	}[]
}

export interface Authorizer {
	can<
		ContractId extends PermissionContractId,
		Ids extends PermissionId<ContractId>
	>(
		options: AuthorizerCanOptions<ContractId, Ids>
	): Promise<Record<Ids, boolean>>
	savePermissions<
		ContractId extends PermissionContractId,
		Ids extends PermissionId<ContractId>
	>(
		options: SavePermissionsOptions<ContractId, Ids>
	): Promise<void>
}

export type ViewControllerConstructor<Vc extends ViewController<any>> = new (
	options: any
) => Vc

type StatusFlag = SpruceSchemas.Mercury.v2020_12_25.StatusFlags

export interface ToolBeltCloseHandlerOptions {
	isDrawer: boolean
}

export type ToolBeltCloseHandler = (
	options: ToolBeltCloseHandlerOptions
) => Promise<void> | void

export interface AlertOptions {
	title?: string
	message: string
	style?: 'info' | 'error' | 'success'
}
