import {
    DateUtil,
    Locale as ILocale,
    TimezoneName as ITimezoneName,
} from '@sprucelabs/calendar-utils'
import { MercuryClient, MercuryClientFactory } from '@sprucelabs/mercury-client'
import {
    buildEventContract,
    MercuryEventEmitter,
    PermissionContractId,
    PermissionId,
    SpruceSchemas,
} from '@sprucelabs/mercury-types'
import {
    AddressFieldValue,
    buildSchema,
    FieldDefinitions,
    FieldError,
    Schema,
    SchemaFieldNames,
    SchemaPartialValues,
    SchemaValues,
} from '@sprucelabs/schema'
import { personSchema } from '@sprucelabs/spruce-core-schemas'
import { Log } from '@sprucelabs/spruce-skill-utils'
import { fancyIcons, lineIcons } from '../constants'
import mapUtil from '../maps/map.utility'
import LockScreenSkillViewController, {
    LockScreenSkillViewControllerOptions,
} from '../skillViewControllers/LockScreen.svc'
import { UniversalViewOptionFields } from '../utilities/removeUniversalViewOptions'
import { CalendarEventOptions } from '../viewControllers/AbstractCalendarEvent.vc'
import AbstractController from '../viewControllers/AbstractController'
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
import BarChartViewController, {
    BarChartViewControllerOptions,
} from '../viewControllers/charts/BarChart.vc'
import LineGraphViewController, {
    LineGraphViewControllerOptions,
} from '../viewControllers/charts/LineGraph.vc'
import ConfirmViewController, {
    ConfirmViewControllerOptions,
} from '../viewControllers/Confirm.vc'
import CountdownTimerViewController, {
    CountdownTimerViewControllerOptions,
} from '../viewControllers/countdownTimer/CountdownTimer.vc'
import DialogViewController, {
    DialogOptions,
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
import LoginCardViewController, {
    LoginCardViewControllerOptions,
} from '../viewControllers/LoginCard.vc'
import MapViewController, {
    MapViewControllerOptions,
} from '../viewControllers/Map.vc'
import NavigationViewController from '../viewControllers/navigation/Navigation.vc'
import PagerViewController, {
    PagerViewControllerOptions,
} from '../viewControllers/pagers/Pager.vc'
import PolarAreaViewController, {
    PolarAreaViewControllerOptions,
} from '../viewControllers/PolarAreaViewController.vc'
import ProgressNavigatorViewController, {
    ProgressNavigatorViewControllerOptions,
} from '../viewControllers/progressNavigator/ProgressNavigator.vc'
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
import WebRtcPlayerViewController, {
    WebRtcPlayerOptions,
} from '../viewControllers/webRtcStreaming/WebRtcPlayer.vc'

export { default as MapViewController } from '../viewControllers/Map.vc'

export type ErrorHandler = (message: string) => void

type Person = SpruceSchemas.Spruce.v2020_07_22.Person

export const didLoginPayload = buildSchema({
    id: 'authDidLoginPayload',
    fields: {
        token: {
            type: 'text',
            isRequired: true,
        },
        person: {
            type: 'schema',
            isRequired: true,
            options: {
                schema: personSchema,
            },
        },
    },
})

export const didLogoutPayload = buildSchema({
    id: 'authDidLogoutPayload',
    fields: {
        person: {
            type: 'schema',
            isRequired: true,
            options: {
                schema: personSchema,
            },
        },
    },
})

export type DidLoginPayload = SchemaValues<typeof didLoginPayload>
export type DidLogoutPayload = SchemaValues<typeof didLogoutPayload>

export interface Storage {
    removeItem(key: string): void
    setItem(key: string, value: string): void
    getItem(key: string): string | null
}

export const authContract = buildEventContract({
    eventSignatures: {
        'did-login': {
            emitPayloadSchema: didLoginPayload,
        },
        'will-logout': {
            emitPayloadSchema: didLogoutPayload,
        },
        'did-logout': {
            emitPayloadSchema: didLogoutPayload,
        },
    },
})

export type AuthContract = typeof authContract

export interface Authenticator {
    //Get the logged in person, if someone is logged in
    getPerson(): Person | null
    //Log a person in by setting their token and Person record.
    setSessionToken(token: string, person: Person): void
    //Get the session token of a logged in person
    getSessionToken(): string | null
    //Check if someone is logged in
    isLoggedIn(): boolean
    //Clear the session, logging the person out
    clearSession(): Promise<void>
    //Add an event listener for when someone logs in or out to take some action
    addEventListener: MercuryEventEmitter<AuthContract>['on']
}

export interface AuthenticatorStatic {
    getInstance(): Authenticator
}

export interface TypedFieldError<
    S extends Schema,
    N extends SchemaFieldNames<S> = SchemaFieldNames<S>,
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
    Args extends Record<string, any> = Record<string, any>,
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
export type SkillViewLayout =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillViewLayout
export type SimpleViewControllerFactory = Pick<
    ViewControllerFactory,
    'Controller' | 'setController'
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
export type Dialog = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Dialog
export type Receipt = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Receipt
export type Pager = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Pager
export type Slide =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection
export type SkillView =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView
export type LockScreen =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LockScreen
export type Calendar =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar
export type CalendarPerson =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarPerson
export type CardFooter =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter
export type CardFooterLayout = NonNullable<CardFooter['layout']>
export type FormBuilder<S extends Schema = Schema> =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormBuilderImportExportObject<S>
export type FormBuilderPage =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormBuilderImportExportPage
export type Navigation =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Navigation
export type NavigationButton =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationButton
export type LayoutWidth = NonNullable<SkillView['width']>

export type NavigationItem =
    | NavigationButton
    | NavigationSpacer
    | NavigationImage

export interface NavigationSpacer {
    isSpacer: true
}

export interface NavigationImage {
    image: string
}

export type BigForm<S extends Schema> =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigForm<S>

export type CountdownTimer =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CountdownTimer
export type ProgressNavigator =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressNavigator
export type ProgressNavigatorStep =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressNavigatorStep
export type Progress =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Progress
export type PolarArea =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PolarArea
export type PolarAreaDataItem =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PolarAreaDataItem
export type BarChart =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BarChart
export type LineGraph =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LineGraph
export type ChartDataSet =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ChartDataSet
export type ChartDataPoint =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ChartDataPoint
export type Form<S extends Schema = any> =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Form<S>
export type WebRtcPlayer =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.WebRtcPlayer
export type StatusIndicator =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatusIndicator
export type StatusIndicatorStatus = NonNullable<StatusIndicator['status']>
export type TalkingSprucebot =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TalkingSprucebot
export type NavigationRoute =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationRoute
export type LayoutStyle = NonNullable<
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillViewLayout['style']
>
export type LayoutColumn = Card[]
export type ListColumnWidth = NonNullable<List['columnWidths']>[number]
export type DragAndDropListSortHandler = NonNullable<List['onDragAndDropSort']>

export type TriggerRender = () => void
export type TriggerRenderHandler = () => void

export { WebRtcStreamer } from '../webRtcStreaming/WebRtcStreamer'
export * from '../webRtcStreaming/WebRtcConnection'

export type WebRtcCropPoint =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.WebRtcCropPoint

export type WebRtcPlayerCropHandler = (
    point?: WebRtcCropPoint
) => void | Promise<void>

export interface ViewController<ViewModel extends Record<string, any>> {
    render(): ViewModel
    setTriggerRenderHandler: (handler: TriggerRenderHandler) => void
    triggerRender: TriggerRender
    destroy?: () => Promise<void> | void
    willBlur?: () => void | Promise<void>
    didBlur?: () => void | Promise<void>
    willFocus?: () => void | Promise<void>
    didFocus?: () => void | Promise<void>
    didHide?: () => void | Promise<void>
}

export type ScopeFlag = 'location' | 'organization' | 'employed' | 'none'

export type ButtonGroupButton = Omit<Button, 'onClick' | 'onClickHintIcon'> & {
    id: string
}

export type LineIconPosition = NonNullable<Button['lineIconPosition']>

export interface SkillViewController<
    Args extends Record<string, any> = Record<string, any>,
    ViewModel extends Record<string, any> = SkillView,
> extends ViewController<ViewModel> {
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
    renderNavigation?(): null | undefined | Navigation
    renderProgressNavigator?(): null | undefined | ProgressNavigator
    getTitle?(): string | undefined
    getSubtitle?(): string | undefined
}

export type ImportedViewController = (new (
    options: ViewControllerOptions
) => ViewController<any> | SkillViewController) & {
    id: string
}

export type ViewControllerId = keyof ViewControllerMap
export type SkillViewControllerId = keyof SkillViewControllerMap
export type AppControllerId = keyof AppControllerMap

export interface RedirectOptions {
    shouldTrackHistory?: boolean
}

export type RouterDestination =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RouterDestination

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
    getParentController?(): ButtonGroupViewController
}

export interface ViewControllerMap {
    'active-record-card': ActiveRecordCardViewController
    'active-record-list': ActiveRecordListViewController
    'autocomplete-input': AutocompleteInputViewController
    'bar-chart': BarChartViewController
    'big-form': BigFormViewController<any>
    'button-bar': ButtonBarViewController
    'button-group': ButtonGroupViewController
    'calendar-event': CalendarEventViewController
    'countdown-timer': CountdownTimerViewController
    'form-builder-card': FormBuilderCardViewController
    'line-graph': LineGraphViewController
    'lock-screen': LockScreenSkillViewController
    'login-card': LoginCardViewController
    'polar-area': PolarAreaViewController
    'progress-navigator': ProgressNavigatorViewController
    'swipe-card': SwipeCardViewController
    'talking-sprucebot': TalkingSprucebotViewController
    'tool-belt': ToolBeltViewController
    'web-rtc-player': WebRtcPlayerViewController
    calendar: CalendarViewController
    card: CardViewController
    confirm: ConfirmViewController
    dialog: DialogViewController
    feed: FeedViewController
    form: FormViewController<any>
    list: ListViewController
    map: MapViewController
    navigation: NavigationViewController
    pager: PagerViewController
    progress: ProgressViewController
    ratings: RatingsViewController
    stats: StatsViewController
}

export interface ViewControllerOptionsMap {
    'active-record-card': ActiveRecordCardViewControllerOptions
    'active-record-list': ActiveRecordListViewControllerOptions
    'autocomplete-input': AutocompleteInputViewControllerOptions
    'bar-chart': BarChartViewControllerOptions
    'big-form': BigFormViewControllerOptions<Schema>
    'button-bar': ButtonBarViewControllerOptions
    'button-group': ButtonGroupViewControllerOptions
    'calendar-event': CalendarEventOptions
    'countdown-timer': CountdownTimerViewControllerOptions
    'form-builder-card': FormBuilderCardViewControllerOptions
    'line-graph': LineGraphViewControllerOptions
    'lock-screen': LockScreenSkillViewControllerOptions
    'login-card': LoginCardViewControllerOptions
    'polar-area': PolarAreaViewControllerOptions
    'progress-navigator': ProgressNavigatorViewControllerOptions
    'swipe-card': SwipeViewControllerOptions
    'talking-sprucebot': TalkingSprucebotViewControllerOptions
    'tool-belt': ToolBeltViewControllerOptions
    'web-rtc-player': WebRtcPlayerOptions
    calendar: CalendarViewControllerOptions
    card: CardViewControllerOptions
    confirm: ConfirmViewControllerOptions
    dialog: DialogViewControllerOptions
    feed: FeedViewControllerOptions
    form: FormViewControllerOptions<any>
    list: ListViewControllerOptions
    map: MapViewControllerOptions
    navigation: Navigation
    pager: PagerViewControllerOptions
    progress: ProgressViewControllerOptions
    ratings: RatingsViewControllerOptions
    stats: StatsViewControllerOptions
}

export interface SkillViewControllerMap {}
export interface SkillViewControllerArgsMap {}
export interface AppControllerMap {}

export type ControllerOptions<
    N extends ViewControllerId,
    O extends ViewControllerOptionsMap = ViewControllerOptionsMap,
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
    O extends SkillViewControllerArgsMap = SkillViewControllerArgsMap,
> = N extends keyof O ? O[N] : Record<string, never>

export interface OnRenderHandler {
    onRender?(): void
}

export type RenderInDialogHandler = (
    options: DialogOptions
) => DialogViewController

export type AlertHandler = AbstractController['alert']
export type RenderLockScreenHandler = (options: LockScreen) => void

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
    plugins: ViewControllerPlugins
    vcFactory: ViewControllerFactory
    connectToApi: () => Promise<MercuryClient>
    renderInDialogHandler: RenderInDialogHandler
    renderLockScreenHandler: RenderLockScreenHandler
    confirmHandler: ConfirmHandler
    voteHandler: VoteHandler
    toastHandler: ToastHandler
    device: Device
    dates: DateUtil
    maps: MapUtil
    log: Log
}

export type RenderAsInputComponentType =
    | 'colorPicker'
    | 'number'
    | 'textarea'
    | 'ratings'
    | 'checkbox'
    | 'autocomplete'
    | 'tags'
    | 'signature'
    | 'password'
    | 'search'
    | 'slider'
    | 'markdownInput'

export type RenderAsInputComponent =
    | RenderAsInputComponentType
    | RatingsInputComponent

export type RatingsInputComponent = Pick<
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Ratings,
    'steps' | 'leftLabel' | 'rightLabel' | 'middleLabel' | 'icon'
> & {
    type: 'ratings'
}

export interface InputComponent {
    type: string
}

export type RatingsInputComponentIcon = NonNullable<
    RatingsInputComponent['icon']
>

export interface FieldRenderOptions<S extends Schema> {
    name: SchemaFieldNames<S>
    renderAs?: RenderAsInputComponent
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

export interface TheaterSettingValueTypes {
    'kiosk-mode': boolean | null
    'load-url': string | null
    'log-destination': string | null
    'audio-volume': number | null
}

export type TheatreSettingName = keyof TheaterSettingValueTypes

export interface Device {
    openUrl(url: string): void
    vibrate(): void
    call(phoneNumber: string): void
    setCachedValue(key: string, value: CachedValue): void
    getCachedValue(key: string): CachedValue
    sendCommand(command: string, payload?: Record<string, any>): void
    turnTorchOn(brightness?: number): void
    turnTorchOff(): void
    setTheatreSetting<N extends TheatreSettingName>(
        name: N,
        value: TheaterSettingValueTypes[N]
    ): void
    getTheatreSetting<N extends TheatreSettingName>(
        name: N
    ): Promise<TheaterSettingValueTypes[N] | null>
    AudioController(audioFileUrl: string): Promise<AudioController>
}

export type AudioControllerStatus = 'pending' | 'stopped' | 'playing' | 'paused'

export interface AudioController {
    play(): void
    pause(): void
    stop(): void
    setVolume(volume: number): void
    getVolume(): Promise<number | null>
    getStatus(): AudioControllerStatus
}

export interface AuthorizerCanOptions<
    ContractId extends PermissionContractId,
    Ids extends PermissionId<ContractId> = PermissionId<ContractId>,
> {
    contractId: ContractId
    target?: SpruceSchemas.Mercury.v2020_12_25.GetResolvedPermissionsContractEmitTarget
    permissionIds: Ids[]
}

export interface AuthorizerDoesHonorOptions<
    ContractId extends PermissionContractId,
> {
    contractId: ContractId
    target?: SpruceSchemas.Mercury.v2020_12_25.DoesHonorPermissionContractEmitTarget
}
type SavePermissionsTarget = Omit<
    SpruceSchemas.Mercury.v2020_12_25.SavePermissionsEmitTarget,
    'permissionPersonId' | 'permissionContractId' | 'permissionSkillId'
>

export interface SavePermissionsOptions<
    ContractId extends PermissionContractId,
    Ids extends PermissionId<ContractId>,
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
        Ids extends PermissionId<ContractId>,
    >(
        options: AuthorizerCanOptions<ContractId, Ids>
    ): Promise<Record<Ids, boolean>>

    savePermissions<
        ContractId extends PermissionContractId,
        Ids extends PermissionId<ContractId>,
    >(
        options: SavePermissionsOptions<ContractId, Ids>
    ): Promise<void>

    doesHonorPermissionContract<ContractId extends PermissionContractId>(
        options: AuthorizerDoesHonorOptions<ContractId>
    ): Promise<boolean>
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
    okButtonLabel?: string
}

export interface ViewControllerPlugins {}

export type ViewControllerPluginConstructor = new (
    options: ViewControllerPluginOptions
) => ViewControllerPlugin

export interface ViewControllerPlugin {}

export type ViewControllerPluginsByName = Record<
    string,
    ViewControllerPluginConstructor
>

export interface ViewControllerPluginOptions {
    connectToApi: MercuryClientFactory
    device: Device
    dates: DateUtil
    maps: MapUtil
    log: Log
    plugins: ViewControllerPlugins
}

export type ConnectToApi = () => Promise<MercuryClient>

export interface ActiveRecordPagingOptions {
    shouldPageClientSide?: boolean
    pageSize?: number
}

export interface ActiveRecordSearchOptions {
    shouldSearchClientSide?: boolean
    placeholder?: string
}

export interface AppController {
    renderNavigation?(): Navigation | null | undefined
    renderToolBelt?(): ToolBelt | null | undefined
    load(options: AppControllerLoadOptions): Promise<void>
}

export type BuiltAppController = AppController & { id: string }

export type AppControllerConstructor = new (
    options: ViewControllerOptions
) => AppController

export interface AppControllerLoadOptions {
    router: Router
    authenticator: Authenticator
    authorizer: Authorizer
    locale: ILocale
    scope: Scope
    themes: ThemeManager
}

export interface ChartViewController<ViewModel extends Record<string, any>>
    extends ViewController<ViewModel> {
    setDataSets(dataSets: ChartDataSet[]): void
}
