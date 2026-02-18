# @sprucelabs/heartwood-view-controllers

All the power of Heartwood in one, convenient package.

This module provides the controller layer for building UIs in the Spruce Platform. It includes abstract base classes, 30+ built-in view controllers, type-safe builders, and a comprehensive test utility suite.

## Installation

```bash
yarn add @sprucelabs/heartwood-view-controllers
```

## Class Hierarchy

```
AbstractController
├── AbstractViewController<ViewModel>
│   └── AbstractSkillViewController<Args, ViewModel>
└── AbstractAppController
```

### AbstractController

The base class for all controllers. Provides:

| Method | Description |
|---|---|
| `Controller(name, options)` | Instantiate a child controller. |
| `renderInDialog(options)` | Render a `Dialog`. |
| `hideDialog()` | Hide the active `Dialog`. |
| `toast(options)` | Show a toast message. |
| `alert(options)` | Show an alert `Dialog` and wait for dismissal. |
| `confirm(options)` | Show a confirm `Dialog` and return `true`/`false`. |
| `askForAVote(options)` | Request a feature vote. |
| `mixinControllers(map)` | Register additional controllers at runtime. |
| `destroy()` | Destroy this controller and all children. |

Protected properties: `device`, `connectToApi`, `views` (ViewControllerFactory).

### AbstractViewController\<ViewModel\>

Extends `AbstractController`. Base class for all view controllers.

| Method | Description |
|---|---|
| `triggerRender()` | Notify the view layer to re-render. |
| `setTriggerRenderHandler(handler)` | Set the render handler. |
| `renderOnce(cb)` | Batch updates — suspends rendering until `cb` completes, then triggers one render. |
| `renderOnceSync(cb)` | Synchronous version of `renderOnce`. |
| `render()` | Abstract. Return the view model. |

Protected properties: `dates` (DateUtil), `maps` (MapUtil), `log` (Log), `plugins` (ViewControllerPlugins).

### AbstractSkillViewController\<Args\>

Extends `AbstractViewController`. Base class for skill-level controllers (full-page views).

| Method | Description |
|---|---|
| `load(options)` | Called after login and scope prerequisites are met. |
| `focus()` | Called when this view becomes active. |
| `blur()` | Called when this view loses focus. |
| `setTitle(title)` | Set the skill view title. |
| `getTitle()` | Get the title. |
| `setSubtitle(subtitle)` | Set the subtitle. |
| `getSubtitle()` | Get the subtitle. |
| `renderLockScreen(options)` | Render a lock screen overlay. |

### AbstractAppController

Extends `AbstractController`. Base class for app-level controllers.

| Method | Description |
|---|---|
| `load(options)` | Called when the app initializes. |
| `renderLockScreen(options)` | Render a lock screen overlay. |

## Built-in Controllers

Instantiate any of these with `this.Controller(id, options)`:

| ID | Class | Description |
|---|---|---|
| `'card'` | CardViewController | Renders a card with header, body sections, and footer. |
| `'dialog'` | DialogViewController | Modal dialog wrapping a card. |
| `'form'` | FormViewController | Schema-driven form with validation. |
| `'big-form'` | BigFormViewController | Multi-slide form (extends FormViewController). |
| `'list'` | ListViewController | Rows of data with inputs, buttons, and selection. |
| `'calendar'` | CalendarViewController | Day/month calendar with events, people, and shifts. |
| `'calendar-event'` | CalendarEventViewController | Individual calendar event. |
| `'swipe-card'` | SwipeCardViewController | Card with swipeable slides. |
| `'tool-belt'` | ToolBeltViewController | Side panel with focusable tools. |
| `'navigation'` | NavigationViewController | Navigation bar with buttons. |
| `'login-card'` | LoginCardViewController | Multi-step login flow (phone/email + PIN). |
| `'active-record-card'` | ActiveRecordCardViewController | Card backed by a remote data source. |
| `'active-record-list'` | ActiveRecordListViewController | List backed by a remote data source. |
| `'button-bar'` | ButtonBarViewController | Horizontal bar of selectable buttons. |
| `'button-group'` | ButtonGroupViewController | Group of selectable buttons (single or multi-select). |
| `'confirm'` | ConfirmViewController | Confirmation dialog with accept/decline. |
| `'feed'` | FeedViewController | Message feed with scrolling. |
| `'talking-sprucebot'` | TalkingSprucebotViewController | Animated Sprucebot with typed sentences. |
| `'countdown-timer'` | CountdownTimerViewController | Timer counting down to a target time. |
| `'progress-navigator'` | ProgressNavigatorViewController | Step-based progress indicator. |
| `'pager'` | PagerViewController | Page navigation controls. |
| `'stats'` | StatsViewController | Stat values display. |
| `'progress'` | ProgressViewController | Progress bar (0-1). |
| `'ratings'` | RatingsViewController | Star/radio rating input. |
| `'bar-chart'` | BarChartViewController | Bar chart visualization. |
| `'line-graph'` | LineGraphViewController | Line graph visualization. |
| `'polar-area'` | PolarAreaViewController | Polar area chart. |
| `'map'` | MapViewController | Map with pins. |
| `'autocomplete-input'` | AutocompleteInputViewController | Text input with suggestions. |
| `'lock-screen'` | LockScreenSkillViewController | Full-screen lock overlay. |
| `'web-rtc-player'` | WebRtcPlayerViewController | WebRTC video player with cropping. |

## Key Types

### ViewControllerOptions

Constructor options provided to all controllers:

| Property | Type | Description |
|---|---|---|
| `vcFactory` | `ViewControllerFactory` | Factory for instantiating controllers. |
| `connectToApi` | `() => Promise<MercuryClient>` | Connect to the Mercury API. |
| `device` | `Device` | Access native device capabilities. |
| `dates` | `DateUtil` | Date formatting and math. |
| `maps` | `MapUtil` | Map utilities. |
| `log` | `Log` | Logging. |
| `plugins` | `ViewControllerPlugins` | Registered plugins. |
| `renderInDialogHandler` | `RenderInDialogHandler` | Handler for rendering dialogs. |
| `confirmHandler` | `ConfirmHandler` | Handler for confirm dialogs. |
| `toastHandler` | `ToastHandler` | Handler for toast messages. |
| `voteHandler` | `VoteHandler` | Handler for vote requests. |
| `renderLockScreenHandler` | `RenderLockScreenHandler` | Handler for lock screens. |

### SkillViewControllerLoadOptions\<Args\>

Passed to `load()` when a skill view appears:

| Property | Type | Description |
|---|---|---|
| `router` | `Router` | Navigate between skill views. |
| `authenticator` | `Authenticator` | Access the logged-in person. |
| `authorizer` | `Authorizer` | Check permissions. |
| `scope` | `Scope` | Access the current organization or location. |
| `locale` | `Locale` | Locale and timezone information. |
| `themes` | `ThemeManager` | Manage the current theme. |
| `dependencyLoader` | `DependencyLoader` | Load trusted dependencies (e.g., `'@zoom/videosdk'`). |
| `args` | `Args` | Arguments passed via `router.redirect()`. |

### ScopeFlag

```ts
type ScopeFlag = 'location' | 'organization' | 'employed' | 'none'
```

### Router

| Method | Description |
|---|---|
| `redirect(id, args?, options?)` | Navigate to a skill view. |
| `back()` | Navigate to the previous skill view. |
| `getNamespace?()` | Get the current namespace (optional). |

### Authenticator

| Method | Description |
|---|---|
| `getPerson()` | Get the logged-in person (or `null`). |
| `isLoggedIn()` | Check if a person is logged in. |
| `getSessionToken()` | Get the current session token. |
| `setSessionToken(token, person)` | Set the session. |
| `clearSession()` | Log out. |
| `addEventListener(eventName, cb)` | Listen for login/logout events. |

### Scope

| Method | Description |
|---|---|
| `getCurrentOrganization()` | Get the current organization. |
| `setCurrentOrganization(id)` | Set the current organization. |
| `getCurrentLocation()` | Get the current location. |
| `setCurrentLocation(id)` | Set the current location. |
| `clearSession()` | Clear the current scope. |

### Device

| Method | Description |
|---|---|
| `openUrl(url)` | Open a URL. |
| `vibrate()` | Vibrate the device. |
| `call(phoneNumber)` | Initiate a phone call. |
| `setCachedValue(key, value)` | Store a cached value. |
| `getCachedValue(key)` | Retrieve a cached value. |
| `sendCommand(command, payload?)` | Send a command to the device. |
| `turnTorchOn(brightness?)` | Turn on the torch. |
| `turnTorchOff()` | Turn off the torch. |
| `submitFeedback(options)` | Submit user feedback. |
| `setTheatreSetting(name, value)` | Set a theatre setting. |
| `getTheatreSetting(name)` | Get a theatre setting. |
| `AudioController(url)` | Create an audio controller. |
| `setPowerBehavior(options)` | Configure power behavior (e.g., keep screen awake). |

## Layout Styles

Use `buildSkillViewLayout(style, cards)` to create typed layouts:

| Style | Required Cards | Optional Cards |
|---|---|---|
| `'one-col'` | `cards` | `headerCard` |
| `'two-col'` | `cards` | `headerCard` |
| `'three-col'` | `cards` | `headerCard` |
| `'big-left'` | `leftCards` | `rightCards`, `headerCard` |
| `'big-right'` | `rightCards` | `leftCards`, `headerCard` |
| `'big-top'` | `topCards` | `bottomCards`, `headerCard` |
| `'big-top-left'` | `leftCards` | `rightCards`, `bottomCards`, `headerCard` |
| `'grid'` | `cards` | `headerCard` |

## Builders

| Builder | Description |
|---|---|
| `buildForm(options)` | Type-safe form builder. |
| `buildBigForm(options)` | Type-safe multi-slide form builder. |
| `buildActiveRecordCard(options)` | Active record card builder. |
| `buildActiveRecordList(options)` | Active record list builder. |
| `buildSkillViewLayout(style, cards)` | Type-safe layout builder. |

## Test Utilities

### vcAssert

Primary assertion library for skill views, cards, dialogs, confirms, alerts, redirects, scope, login, and more.

| Method | Description |
|---|---|
| `attachTriggerRenderCounter(vc)` | Attach a counter to track `triggerRender()` calls on a controller. |
| `assertTriggerRenderCount(vc, expected)` | Assert `triggerRender()` was called exactly `expected` times. |
| `assertRendersConfirm(vc, action)` | Assert action triggers a confirm dialog. Returns confirm vc with `accept()` and `decline()`. |
| `assertDoesNotRenderConfirm(vc, action)` | Assert action does not trigger a confirm dialog. |
| `assertRendersDialog(vc, action, dialogHandler?)` | Assert action renders a dialog. Returns `DialogViewController`. |
| `assertDoesNotRenderDialog(vc, action)` | Assert action does not render a dialog. |
| `assertRendersAlert(vc, action, style?)` | Assert action renders an alert dialog. Default style is `'error'`. |
| `assertDoesNotRenderAlert(vc, action, style?)` | Assert action does not render an alert dialog. |
| `assertRendersSuccessAlert(vc, action)` | Assert action renders a success alert (shorthand for `assertRendersAlert` with `'success'`). |
| `assertAsksForAVote(vc, action)` | Assert action triggers `askForAVote()`. Returns vote vc with `castVote()`. |
| `assertCardRendersSection(vc, sectionIdOrIdx)` | Assert card renders a body section by id or index. |
| `assertCardDoesNotRenderSection(vc, sectionIdOrIdx)` | Assert card does not render a body section. |
| `assertCardDoesNotRenderList(vc, id?)` | Assert card does not render a list. |
| `assertDialogWasClosed(vc)` | Assert a dialog is no longer visible. |
| `assertRendersValidCard(vc)` | Validate a card's view model against the card schema. |
| `assertCardRendersHeader(cardVc)` | Assert card renders a header. |
| `assertCardRendersFooter(cardVc)` | Assert card renders a footer. |
| `assertCardDoesNotRenderFooter(cardVc)` | Assert card does not render a footer. |
| `assertSkillViewRendersCards(vc, expected?)` | Assert skill view renders cards. `expected` can be a number or `string[]` of ids. |
| `assertSkillViewDoesNotRenderCards(vc, expected?)` | Assert skill view does not render cards with the given ids. |
| `assertSkillViewRendersCard(vc, id?)` | Assert skill view renders a card, optionally by id. Returns `CardViewController`. |
| `assertSkillViewDoesNotRenderCard(vc, id)` | Assert skill view does not render a card with the given id. |
| `assertSkillViewRendersSwipeCard(vc)` | Assert skill view renders a swipe card. Returns `SwipeCardViewController`. |
| `assertIsSwipeCard(vc)` | Assert a card view controller is a swipe card. |
| `assertCardIsBusy(vc)` | Assert card body is busy (`isBusy: true`). |
| `assertCardIsNotBusy(vc)` | Assert card body is not busy. |
| `assertSkillViewRendersViewController(vc, VcClass)` | Assert skill view renders a controller that is an instance of `VcClass`. |
| `assertSkillViewDoesNotRenderViewController(vc, VcClass)` | Assert skill view does not render a controller of that class. |
| `assertSkillViewRendersCalendar(svc)` | Assert skill view renders a calendar. Returns `CalendarViewController`. |
| `assertSkillViewDoesNotRenderCalendar(svc)` | Assert skill view does not render a calendar. |
| `assertCardRendersCalendar(vc)` | Assert card renders a calendar. Returns `CalendarViewController`. |
| `assertCardDoesNotRenderCalendar(vc)` | Assert card does not render a calendar. |
| `assertCardRendersTalkingSprucebot(vc, id?)` | Assert card renders a talking Sprucebot. Returns `TalkingSprucebotViewController`. |
| `assertCardDoesNotRenderTalkingSprucebot(vc, id?)` | Assert card does not render a talking Sprucebot. |
| `assertIsFullScreen(vc)` | Assert skill view is rendered full screen. |
| `assertIsNotFullScreen(vc)` | Assert skill view is not rendered full screen. |
| `assertLoginIsRequired(vc)` | Assert skill view requires login (`getIsLoginRequired()` returns `true`). |
| `assertLoginIsNotRequired(vc)` | Assert skill view does not require login. |
| `assertActionRedirects(options)` | Assert action triggers a redirect. Options: `{ router, action, destination? }`. |
| `assertActionDoesNotRedirect(options)` | Assert action does not trigger a redirect. |
| `assertRendersAlertThenRedirects(options)` | Assert action renders an alert, then redirects after dismissal. |
| `patchAlertToThrow(vc)` | Patch a controller so error alerts cause test failures instead of rendering. |
| `assertCardRendersProgress(vc, percentComplete?, id?)` | Assert card renders a progress view. Returns `ProgressViewController`. |
| `assertCardDoesNotRenderProgress(vc, id?)` | Assert card does not render a progress view. |
| `assertCardRendersStats(vc)` | Assert card renders a stats view. Returns `StatsViewController`. |
| `assertStatsRendersValue(vc, idx, value)` | Assert a stat renders a specific value at a given index. |
| `assertCardRendersRatings(vc)` | Assert card renders a ratings view. Returns `RatingsViewController`. |
| `assertControllerInstanceOf(vc, Class)` | Assert a controller is an instance of `Class`. |
| `assertRendersAsInstanceOf(vc, Class, errorMessage?)` | Assert a vc renders a controller that is an instance of `Class`. |
| `assertSkillViewNotScoped(vc)` | Assert skill view has no scope (returns `['none']`). |
| `assertSkillViewScopedBy(vc, scopedBy)` | Assert skill view is scoped by specific flags (e.g., `'organization'`, `['employed', 'location']`). |
| `assertCardFooterIsDisabled(vc)` | Assert card footer is disabled. |
| `assertCardFooterIsEnabled(vc)` | Assert card footer is enabled. |
| `assertCardFooterIsBusy(vc)` | Assert card footer is busy. |
| `assertCardFooterIsNotBusy(vc)` | Assert card footer is not busy. |
| `assertCardRendersCriticalError(vc)` | Assert card renders a critical error. Returns the critical error model. |
| `assertCardDoesNotRenderCriticalError(vc)` | Assert card does not render a critical error. |

### buttonAssert

Assert button rendering, state, and selection in cards, sections, and footers.

| Method | Description |
|---|---|
| `buttonBarRendersButton(buttonBarVc, buttonId)` | Assert a button bar renders a button with the given id. |
| `lastButtonInCardFooterIsPrimaryIfThereAreAnyButtons(vc)` | Assert the primary button is last in the card footer. |
| `cardRendersButtonBar(cardVc)` | Assert card renders a button bar. Returns `ButtonBarViewController`. |
| `cardRendersButtonGroup(cardVc)` | Assert card renders a button group. Returns `ButtonGroupViewController`. |
| `buttonGroupIsMultiSelect(buttonGroupVc)` | Assert a button group allows multi-select. |
| `cardSectionRendersButton(vc, sectionIdOrIdx, buttonId?)` | Assert a card section renders a button, optionally by id. |
| `footerRendersButtonWithType(vc, type?)` | Assert footer renders a button with the given type (e.g., `'primary'`, `'secondary'`). |
| `cardDoesNotRenderButtons(vc, ids)` | Assert card does not render buttons with the given ids. |
| `cardDoesNotRenderButton(vc, id)` | Assert card does not render a button with the given id. |
| `cardRendersButtons(vc, ids)` | Assert card renders buttons with the given ids. Returns `ButtonViewController[]`. |
| `cardRendersButton(vc, id)` | Assert card renders a button with the given id. Returns `ButtonViewController`. |
| `buttonIsDisabled(vc, id)` | Assert a button is disabled (`isEnabled: false`). |
| `buttonIsEnabled(vc, id)` | Assert a button is enabled. |
| `buttonIsSelected(vc, id)` | Assert a button is selected (`isSelected: true`). |

### listAssert

Assert row rendering, inputs, toggles, selection, and content in lists.

| Method | Description |
|---|---|
| `listRendersRows(listVc, expectedRows?)` | Assert list renders rows. `expectedRows` can be a count or `string[]` of ids. |
| `listRendersRow(listVc, row)` | Assert list renders a row by id or index. Returns `ListRowViewController`. |
| `listDoesNotRenderRow(listVc, row)` | Assert list does not render a row. |
| `cardRendersList(vc, id?)` | Assert card renders a list. Returns `ListViewController`. |
| `cardDoesNotRenderList(vc, id?)` | Assert card does not render a list. |
| `skillViewRendersSwipeCard(vc)` | Assert skill view renders a swipe card. Returns `SwipeCardViewController`. |
| `rowRendersCheckBox(listVc, row, name?)` | Assert row renders a checkbox, optionally by name. |
| `rowDoesNotRenderCheckbox(listVc, row, name?)` | Assert row does not render a checkbox. |
| `rowRendersStatusIndicator(listVc, row, expectedStatus?)` | Assert row renders a status indicator, optionally checking status. |
| `rowRendersCalendar(listVc, row)` | Assert row renders a calendar (month view). |
| `rowRendersButtonBar(listVc, row)` | Assert row renders a button bar. Returns `ButtonBarViewController`. |
| `rowRendersCell(listVc, row, cell)` | Assert row renders a cell by id or index. |
| `rowDoesNotRenderCell(listVc, row, cell)` | Assert row does not render a cell. |
| `rowRendersButton(listVc, row, buttonId?)` | Assert row renders a button, optionally by id. |
| `rowDoesNotRenderButton(listVc, row, buttonId?)` | Assert row does not render a button. |
| `rowRendersButtonWithIcon(vc, icon)` | Assert a row renders a button with the given `lineIcon`. |
| `buttonInRowIsDisabled(listVc, row, buttonId)` | Assert a button in a row is disabled. |
| `buttonInRowIsEnabled(listVc, row, buttonId)` | Assert a button in a row is enabled. |
| `rowRendersInput(vc, row, inputName)` | Assert row renders an input by name. |
| `rowDoesNotRenderInput(vc, row, inputName)` | Assert row does not render an input. |
| `inputIsInteractive(vc, row, inputName)` | Assert an input in a row is interactive. |
| `inputIsNotInteractive(vc, row, inputName)` | Assert an input in a row is not interactive. |
| `rowRendersContent(vc, row, content)` | Assert row renders text content (searches text, subText, html, markdown, button labels). |
| `rowDoesNotRenderContent(vc, row, content)` | Assert row does not render text content. |
| `rowRendersToggle(listVc, row, toggleName?)` | Assert row renders a toggle input, optionally by name. |
| `rowDoesNotRenderToggle(listVc, row, toggleName?)` | Assert row does not render a toggle. |
| `rowRendersSelect(listVc, row, name?)` | Assert row renders a select input. Returns `SelectViewController`. |
| `rowRendersRatings(listVc, row)` | Assert row renders a ratings input. |
| `rowIsSelected(listVc, row)` | Assert a row is selected. |
| `rowIsNotSelected(listVc, row)` | Assert a row is not selected. |
| `rowsAreSelected(listVc, rows)` | Assert multiple rows are selected. |
| `rowIsEnabled(listVc, row)` | Assert a row is enabled. |
| `rowIsDisabled(listVc, row)` | Assert a row is disabled. |
| `checkboxTogglesRowEnabled(listVc, row)` | Assert clicking a checkbox toggles the row's enabled state. |
| `rowIsStyle(vc, row, style)` | Assert a row has a specific style (e.g., `'standard'`). |
| `valueEquals({ listVc, row, name, value })` | Assert an input value in a row equals expected. |
| `valueDoesNotEqual({ listVc, row, name, value })` | Assert an input value in a row does not equal expected. |

### formAssert

Assert form fields, sections, validation state, and rendering.

| Method | Description |
|---|---|
| `inputVcIsValid(inputVc)` | Validate a custom `FormInputViewController` implements `getValue`, `setValue`, `setHandlers`, `getRenderedValue`, and `setRenderedValue`. |
| `formRendersSection(formVc, sectionId)` | Assert form renders a section by id. |
| `formDoesNotRendersSection(formVc, sectionId)` | Assert form does not render a section. |
| `formRendersField(formVc, fieldName, fieldDefinition?)` | Assert form renders a field, optionally matching a partial field definition. |
| `formDoesNotRenderField(formVc, fieldName)` | Assert form does not render a field. |
| `formRendersFields(formVc, fields)` | Assert form renders multiple fields by name. |
| `formIsDisabled(vc)` | Assert form is disabled. |
| `formIsEnabled(vc)` | Assert form is enabled. |
| `formIsBusy(vc)` | Assert form is busy. |
| `formIsNotBusy(vc)` | Assert form is not busy. |
| `cardRendersForm(vc, id?, errorMessage?)` | Assert card renders a form (or big form). Returns `FormViewController` or `BigFormViewController`. |
| `cardRendersForms(vc, count)` | Assert card renders a specific number of forms. |
| `cardDoesNotRenderForm(vc, id)` | Assert card does not render a form with the given id. |
| `formFieldRendersUsingInputVc(vc, fieldName, inputVc)` | Assert a form field renders using a specific custom input vc instance. |
| `fieldRendersUsingInstanceOf(vc, fieldName, Class)` | Assert a form field renders using an instance of a given class. |
| `skillViewRendersFormBuilder(vc, id?)` | Assert skill view renders a form builder card. Returns `FormBuilderCardViewController`. |
| `formFieldRendersAs(vc, fieldName, expected)` | Assert a form field renders as a specific component type (e.g., `'textarea'`). |
| `fieldRendersInputButton(vc, fieldName, id?)` | Assert a form field renders a right-side input button. Returns the button model. |

### navigationAssert

Assert navigation buttons, redirects, permissions, and visibility.

| Method | Description |
|---|---|
| `rendersButton(vc, id)` | Assert navigation renders a button with the given id. |
| `rendersButtons(vc, ids)` | Assert navigation renders multiple buttons. |
| `doesNotRenderButton(vc, id)` | Assert navigation does not render a button. |
| `buttonRedirectsTo({ vc, button, destination })` | Assert a navigation button redirects to a destination (`{ id, args? }`). |
| `rendersButtonLabels(vc)` | Assert navigation renders button labels (`shouldRenderButtonLabels: true`). |
| `skillViewRendersNavigation(vc, msg?)` | Assert skill view renders a navigation. Returns the navigation controller. |
| `skillViewDoesNotRenderNavigation(vc)` | Assert skill view does not render a navigation. |
| `appRendersNavigation(vc)` | Assert app controller renders a navigation. Returns the navigation controller. |
| `appDoesNotRenderNavigation(vc)` | Assert app controller does not render a navigation. |
| `buttonRequiresViewPermissions(vc, button, permissionContractId)` | Assert a button requires a specific view permission contract. |
| `hasAdditionalValidRoutes(vc, routes)` | Assert navigation has specific additional valid routes. |
| `isHidden(vc)` | Assert navigation is hidden. |
| `isVisible(vc)` | Assert navigation is visible. |
| `assertActionRefreshesPermissions(vc, action)` | Assert an action triggers a permissions refresh. |
| `assertActionDoesNotRefreshPermissions(vc, action)` | Assert an action does not trigger a permissions refresh. |

### toolBeltAssert

Assert tool belt tools, focus, open/close, and sticky tools.

| Method | Description |
|---|---|
| `rendersToolBelt(svcOrToolBelt, assertHasAtLeast1Tool?)` | Assert vc renders a tool belt. Returns `ToolBeltViewController`. |
| `doesNotRenderToolBelt(svc)` | Assert vc does not render a tool belt with tools. |
| `hidesToolBelt(svc)` | Assert tool belt is hidden (`renderToolBelt()` returns `null`). |
| `toolBeltRendersTool(svcOrToolBelt, toolId)` | Assert tool belt renders a tool with the given id. Returns the tool's card vc. |
| `toolBeltDoesNotRenderTool(svc, toolId)` | Assert tool belt does not render a tool. |
| `toolInstanceOf(svcOrToolBelt, toolId, Class)` | Assert a tool is an instance of `Class`. Returns the tool vc. |
| `toolBeltStickyToolInstanceOf({ toolBeltVc, position, Class })` | Assert a sticky tool at a position (`'top'` or `'bottom'`) is an instance of `Class`. |
| `toolBeltDoesNotRenderStickyTools(svcOrToolBelt)` | Assert tool belt does not render sticky tools. |
| `actionFocusesTool(svcOrToolBelt, toolId, action)` | Assert an action focuses a specific tool. |
| `actionOpensToolBelt(svcOrToolBelt, action, options?)` | Assert an action opens the tool belt. |
| `actionDoesNotOpenToolBelt(svcOrToolBelt, action)` | Assert an action does not open the tool belt. |
| `actionClosesToolBelt(svcOrToolBelt, action)` | Assert an action closes the tool belt. |
| `actionDoesNotCloseToolBelt(svcOrToolBelt, action)` | Assert an action does not close the tool belt. |

### toastAssert

Assert toast message rendering and content.

| Method | Description |
|---|---|
| `rendersToast(cb)` | Assert an action renders a toast message. Returns the toast message. |
| `doesNotRenderToast(cb)` | Assert an action does not render a toast message. |
| `toastMatches(action, message)` | Assert a toast matches a partial `ToastMessage` (e.g., `{ headline, classification }`). |

### feedAssert

Assert feed rendering and scroll mode.

| Method | Description |
|---|---|
| `cardRendersFeed(vc)` | Assert card renders a feed. Returns `FeedViewController`. |
| `scrollModeEquals(vc, expected)` | Assert feed scroll mode equals expected value. |

### activeRecordCardAssert

Assert active record card rendering and paging.

| Method | Description |
|---|---|
| `rendersAsActiveRecordCard(vc)` | Assert a card vc is an active record card. |
| `skillViewRendersActiveRecordCard(svc, id?)` | Assert skill view renders an active record card. Returns `ActiveRecordCardViewController`. |
| `pagingOptionsEqual(vc, expected)` | Assert active record card paging options match expected `ActiveRecordPagingOptions`. |

### activeRecordListAssert

Assert active record list rendering.

| Method | Description |
|---|---|
| `cardRendersActiveRecordList(vc, id?)` | Assert card renders an active record list. Returns `ActiveRecordListViewController`. |
| `cardDoesNotRendersActiveRecordList(vc, id?)` | Assert card does not render an active record list. |

### lockScreenAssert

Assert lock screen rendering.

| Method | Description |
|---|---|
| `actionRendersLockScreen(svcOrApp, action)` | Assert an action renders a lock screen. Returns `LockScreenSkillViewController`. |
| `actionDoesNotRenderLockScreen(svcOrApp, action)` | Assert an action does not render a lock screen. |

### deviceAssert

Assert device vibration, calls, URLs, and torch state.

| Method | Description |
|---|---|
| `wasVibrated(vc)` | Assert the device was vibrated. |
| `wasNotVibrated(vc)` | Assert the device was not vibrated. |
| `madeCall(vc, number)` | Assert the device made a phone call to the given number. |
| `openedUrl(vc, url)` | Assert the device opened a URL. |
| `isTorchOn(vc, expectedBrightness?)` | Assert the torch is on, optionally at a specific brightness. |
| `isTorchOff(vc)` | Assert the torch is off. |

### chartAssert

Assert bar chart and line graph rendering and data sets.

| Method | Description |
|---|---|
| `cardRendersBarChart(cardVc, id?)` | Assert card renders a bar chart. Returns the chart controller. |
| `cardRendersLineGraph(cardVc, id?)` | Assert card renders a line graph. Returns the chart controller. |
| `dataSetsEqual(chartVc, dataSets)` | Assert chart data sets match expected `ChartDataSet[]`. |

### pagerAssert

Assert pager rendering, pages, and state.

| Method | Description |
|---|---|
| `cardRendersPager(vc, id?)` | Assert card renders a pager. Returns `PagerViewController`. |
| `cardDoesNotRenderPager(vc, id?)` | Assert card does not render a pager. |
| `totalPages(vc, expected)` | Assert pager total pages equals expected. |
| `currentPage(vc, expected)` | Assert pager current page equals expected. |
| `pagerIsConfigured(vc)` | Assert pager has both `currentPage` and `totalPages` set. |
| `pagerIsCleared(vc)` | Assert pager is cleared (no `currentPage` or `totalPages`). |

### progressNavigatorAssert

Assert progress navigator steps and completion.

| Method | Description |
|---|---|
| `skillViewRendersNavigator(vc)` | Assert skill view renders a progress navigator. Returns the navigator controller. |
| `skillViewDoesNotRenderNavigator(vc)` | Assert skill view does not render a progress navigator. |
| `rendersStep(vc, stepId)` | Assert navigator renders a step with the given id. |
| `rendersSteps(vc, stepIds)` | Assert navigator renders multiple steps. |
| `currentStep(vc, stepId)` | Assert the current step matches the given id. |
| `stepIsComplete(vc, stepId)` | Assert a step is marked complete. |
| `stepIsNotComplete(vc, stepId)` | Assert a step is not marked complete. |

### countdownTimerAssert

Assert countdown timer rendering and state.

| Method | Description |
|---|---|
| `cardRendersCountdownTimer(vc)` | Assert card renders a countdown timer. Returns `CountdownTimerViewController`. |
| `timerStartedWithEndDate(vc, endDateMs)` | Assert timer was started with a specific end date (ms). |
| `timerIsStopped(vc)` | Assert timer is stopped. |
| `timerStartedWithEndDateInRangeInclusive(vc, bottomMs, topMs)` | Assert timer end date is within an inclusive range. |

### mapAssert

Assert map rendering and pins.

| Method | Description |
|---|---|
| `assertCardRendersMap(vc)` | Assert card renders a map. Returns the map controller. |
| `assertMapHasPin(vc, pin)` | Assert map has a pin matching a partial `MapPin`. |

### webRtcAssert

Assert WebRTC player rendering, offers, answers, and cropping.

| Method | Description |
|---|---|
| `beforeEach(views)` | Set up mock WebRTC controller. **Must be called in `beforeEach` before creating any controllers.** |
| `cardRendersPlayer(vc, id?)` | Assert card renders a WebRTC player. Returns `WebRtcPlayerViewController`. |
| `actionCreatesOffer(vc, action, expectedOptions?)` | Assert an action creates a WebRTC offer. Returns the generated offer SDP. |
| `answerSet(vc, answerSdp?)` | Assert an answer was set on the player, optionally matching a specific SDP. |
| `croppingIsEnabled(vc)` | Assert cropping is enabled on the player. |
| `croppingIsDisabled(vc)` | Assert cropping is disabled on the player. |
| `assertCropEquals(vc, expectedCrop?)` | Assert the crop point matches expected `WebRtcCropPoint`. |

### autocompleteAssert

Assert autocomplete suggestions visibility.

| Method | Description |
|---|---|
| `actionShowsSuggestions(vc, action, expectedSuggestionIds?)` | Assert an action shows autocomplete suggestions, optionally matching ids. |
| `actionHidesSuggestions(vc, action)` | Assert an action hides autocomplete suggestions. |
| `suggestionsAreShowing(vc, suggestionIds)` | Assert specific suggestions are currently showing. |
| `suggestionIsShowing(vc, suggestionId)` | Assert a specific suggestion is showing. |
| `suggestionIsNotShowing(vc, suggestionId)` | Assert a specific suggestion is not showing. |

### vcDurationAssert

Assert duration utility configuration.

| Method | Description |
|---|---|
| `beforeEach(views)` | Set up duration assert. **Must be called in `beforeEach`.** Pass `this.views.getFactory()`. |
| `durationUtilIsConfiguredForVc(vc)` | Assert `durationUtil.dates` is configured to match the vc's dates. |

### vcPluginAssert

Assert plugin installation.

| Method | Description |
|---|---|
| `pluginIsInstalled(vc, named, PluginClass?)` | Assert a plugin is installed on a vc by name, optionally checking it's an instance of `PluginClass`. Returns the plugin. |

### Trigger Render Counting

Track how many times `triggerRender()` is called on a controller:

```ts
vcAssert.attachTriggerRenderCounter(vc)
// ... perform actions ...
vcAssert.assertTriggerRenderCount(vc, expectedCount)
```

### interactor

Simulate clicks, form submissions, row interactions, navigation, and more.

| Method | Description |
|---|---|
| `click(button, onClickOptions?)` | Click a button or clickable element. Simulates a full mouse event. |
| `clickButton(vc, buttonId)` | Click a button by id in a card, form, or navigation. |
| `clickCard(vc)` | Click a card (requires `onClick` set on the card model). |
| `clickButtonInGroup(buttonGroupVc, buttonIdOrIdx)` | Click a button in a button group by id or index. |
| `clickButtonHint(vc, buttonId)` | Click a button's hint icon (`onClickHintIcon`). |
| `clickButtonInButtonBar(vc, buttonId)` | Click a button in a button bar by id. |
| `clickInFooterWithType(vc, type)` | Click a footer button by type (e.g., `'primary'`, `'secondary'`, `'destructive'`). |
| `clickPrimaryInFooter(vc)` | Click the primary button in the footer. |
| `clickSecondaryInFooter(vc)` | Click the secondary button in the footer. |
| `clickDestructiveInFooter(vc)` | Click the destructive button in the footer. |
| `clickInputButton(vc, fieldName, id)` | Click a right-side input button on a form field. |
| `clickDestructiveInRow(listVc, rowIdxOrId)` | Click the destructive button in a list row. |
| `cancelForm(vc)` | Cancel a form (triggers `onCancel`). |
| `submitBigFormSlide(vc)` | Submit the current big form slide (validates the slide first). |
| `submitForm(vc)` | Submit a form (triggers `onSubmit`). |
| `clickPagerButton(vc, button)` | Click a pager button: `'previous'`, `'next'`, or a page number. |
| `submitLoginForm(vc, demoNumber)` | Submit a login form with a demo phone number. |
| `clickButtonInRow(vc, rowIdxOrId, buttonId)` | Click a button in a list row by button id. |
| `keyDownOnInputInRow({ vc, key, cell })` | Simulate a key down event on an input in a list row cell. |
| `clickCheckboxInRow(vc, row, name?)` | Toggle a checkbox in a list row, optionally by name. |
| `clickToggleInRow(vc, row)` | Toggle a toggle input in a list row. |
| `selectChoiceInRow({ vc, row, newChoice, name? })` | Select a choice in a list row's select input. |
| `clickRow(listVc, row)` | Click a list row (triggers `onClick`). |
| `dragAndDropListRow(listVc, newRowIds)` | Drag and drop to reorder list rows. Pass the new order of row ids. |
| `clickCell(listVc, rowIdxOrId, cellIdxOrId)` | Click a cell in a list row. |
| `clickCalendarEvent(vc, eventId, blockIdx?)` | Click a calendar event (delegates to `calendarInteractor`). |
| `dragCalendarEventTo(vc, eventId, updates)` | Drag and drop a calendar event (delegates to `calendarInteractor`). |
| `focus(vc)` | Focus a view controller (triggers `willFocus` and `didFocus`). |
| `hide(vc)` | Hide a view controller (triggers `didHide`). |
| `blur(vc)` | Blur a view controller (triggers `willBlur` and `didBlur`). |
| `clickCriticalErrorButton(vc, buttonId)` | Click a button in a card's critical error. |
| `clickNavButton(vc, buttonId)` | Click a navigation button (works with skill view or navigation vc). |

### autocompleteInteractor

Click autocomplete suggestions.

| Method | Description |
|---|---|
| `clickSuggestion(vc, suggestionId)` | Click an autocomplete suggestion by id. Suggestions must be showing. |

### calendarInteractor

Tap, long press, click events, drag and drop, and swipe on calendars.

| Method | Description |
|---|---|
| `tapView(vc, options?)` | Tap on a calendar view (triggers `onTapView`). |
| `longPressThenDrop(vc, options?)` | Long press then drop on a calendar view (triggers `onLongPressViewDrop`). |
| `clickMonthView(vc, dateTimeMs)` | Click on a month view at a specific date (triggers `onClickView`). |
| `clickDayView(vc, dateTimeMs, personId?)` | Click on a day view at a specific time, optionally for a person (triggers `onClickView`). |
| `clickEvent(vc, eventId, blockIdx?)` | Click a calendar event at a specific block index (triggers `onClickEvent`). |
| `dragAndDropEvent(vc, eventId, updates)` | Drag and drop a calendar event (triggers `onDropEvent`). Returns `boolean`. |
| `swipe(vc, direction)` | Swipe on a calendar (triggers `onSwipe`). |

### countdownTimerInteractor

Simulate timer completion.

| Method | Description |
|---|---|
| `simulateOnComplete(vc)` | Simulate the countdown timer completing (triggers `onComplete`). |

### feedInteractor

Submit messages to a feed.

| Method | Description |
|---|---|
| `submitMessage(vc, message)` | Submit a message to a feed (triggers `onSubmitMessage`). Returns `boolean`. |

### talkingSprucebotInteractor

Simulate Sprucebot animation completion.

| Method | Description |
|---|---|
| `simulateOnComplete(talkingVc)` | Simulate the talking Sprucebot finishing its animation (triggers `onComplete`). |

### webRtcInteractor

Simulate crop actions and state changes.

| Method | Description |
|---|---|
| `simulateCrop(vc, cropPoint?)` | Simulate a crop action on a WebRTC player (triggers `onCrop`). |
| `simulateStateChange(vc, state, event?)` | Simulate a WebRTC connection state change (triggers `onStateChange`). Requires `MockRtcPeerConnection` setup. |

### mapInteractor

Click buttons on map pins.

| Method | Description |
|---|---|
| `clickButtonOnPin(vc, pinIdx, buttonId)` | Click a button on a map pin by pin index and button id or index. |

### Test Support

| Export | Description |
|---|---|
| `MockActiveRecordCard` | Mock for active record cards. |
| `MockAudioController` | Mock for audio playback. |
| `MockRtcPeerConnection` | Mock for WebRTC connections. |
| `SpyDevice` | Spy on device interactions. |
| `FakeStorage` | In-memory storage for tests. |
| `StubStorage` | Stub storage for tests. |
| `SpyViewControllerExporter` | Spy on view controller exports. |

## Constants

| Export | Description |
|---|---|
| `fancyIcons` | Array of 400+ fancy icon names. |
| `lineIcons` | Array of line icon names (from `@sprucelabs/calendar-utils`). |
| `defaultSubmitButtonLabel` | `'Go!'` |
| `defaultCancelButtonLabel` | `'Cancel'` |
| `formBuilderFieldTypes` | Map of field types to labels for the form builder. |
| `fieldTypeChoices` | `SelectChoice[]` for the form builder. |
