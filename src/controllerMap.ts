import { LineGraphViewController, PagerViewController } from '.'
import LockScreenSkillViewController from './skillViewControllers/LockScreen.svc'
import ActiveRecordCardViewController from './viewControllers/activeRecord/ActiveRecordCard.vc'
import ActiveRecordListViewController from './viewControllers/activeRecord/ActiveRecordList.vc'
import BigFormViewController from './viewControllers/BigForm.vc'
import ButtonBarViewController from './viewControllers/ButtonBar.vc'
import ButtonGroupViewController from './viewControllers/ButtonGroup.vc'
import CalendarViewController from './viewControllers/Calendar.vc'
import CalendarEventViewController from './viewControllers/CalendarEvent.vc'
import CardViewController from './viewControllers/card/Card.vc'
import BarChartViewController from './viewControllers/charts/BarChart.vc'
import ConfirmViewController from './viewControllers/Confirm.vc'
import CountdownTimerViewController from './viewControllers/countdownTimer/CountdownTimer.vc'
import DialogViewController from './viewControllers/Dialog.vc'
import FeedViewController from './viewControllers/Feed.vc'
import AutocompleteInputViewController from './viewControllers/form/AutocompleteInput.vc'
import FormViewController from './viewControllers/form/Form.vc'
import ListViewController from './viewControllers/list/List.vc'
import LoginViewController from './viewControllers/Login.vc'
import MapViewController from './viewControllers/Map.vc'
import NavigationViewController from './viewControllers/navigation/Navigation.vc'
import PolarAreaViewController from './viewControllers/PolarAreaViewController.vc'
import ProgressNavigatorViewController from './viewControllers/progressNavigator/ProgressNavigator.vc'
import RatingsViewController from './viewControllers/Ratings.vc'
import ProgressViewController from './viewControllers/reporting/Progress.vc'
import StatsViewController from './viewControllers/reporting/Stats.vc'
import SwipeCardViewController from './viewControllers/SwipeCard.vc'
import TalkingSprucebotViewController from './viewControllers/TalkingSprucebot.vc'
import ToolBeltViewController from './viewControllers/ToolBelt.vc'
import WebRtcPlayerViewController from './viewControllers/webRtcStreaming/WebRtcPlayer.vc'

export const CORE_CONTROLLER_MAP = {
    form: FormViewController,
    /**
     * @deprecated 'login' -> 'login-card'
     */
    login: LoginViewController,
    'login-card': LoginViewController,
    /**
     * @deprecated 'swipeCard' -> 'swipe-card'
     */
    swipeCard: SwipeCardViewController,
    'swipe-card': SwipeCardViewController,
    /**
     * @deprecated 'buttonGroup' -> 'button-group'
     */
    buttonGroup: ButtonGroupViewController,
    'button-group': ButtonGroupViewController,
    card: CardViewController,
    dialog: DialogViewController,
    /**
     * @deprecated 'bigForm' -> 'big-form'
     */
    bigForm: BigFormViewController,
    'big-form': BigFormViewController,
    confirm: ConfirmViewController,
    list: ListViewController,
    /**
     * @deprecated 'toolBelt' -> 'tool-belt'
     */
    toolBelt: ToolBeltViewController,
    'tool-belt': ToolBeltViewController,
    calendar: CalendarViewController,

    'calendar-event': CalendarEventViewController,

    /**
     * @deprecated 'buttonBar' -> 'button-bar'
     */
    buttonBar: ButtonBarViewController,
    'button-bar': ButtonBarViewController,
    /**
     * @deprecated 'talkingSprucebot' -> 'talking-sprucebot'
     */
    talkingSprucebot: TalkingSprucebotViewController,
    'talking-sprucebot': TalkingSprucebotViewController,
    /**
     * @deprecated 'activeRecordCard' -> 'activeRecordCard'
     */
    activeRecordCard: ActiveRecordCardViewController,
    'active-record-card': ActiveRecordCardViewController,

    /**
     * @deprecated 'activeRecordList' -> 'active-record-list'
     */
    activeRecordList: ActiveRecordListViewController,
    'active-record-list': ActiveRecordListViewController,
    stats: StatsViewController,
    progress: ProgressViewController,
    ratings: RatingsViewController,
    /**
     * @deprecated 'autocompleteInput' -> 'autocomplete-input'
     */
    autocompleteInput: AutocompleteInputViewController,
    'autocomplete-input': AutocompleteInputViewController,
    map: MapViewController,
    feed: FeedViewController,
    navigation: NavigationViewController,
    'countdown-timer': CountdownTimerViewController,
    'progress-navigator': ProgressNavigatorViewController,
    'polar-area': PolarAreaViewController,
    pager: PagerViewController,
    'bar-chart': BarChartViewController,
    'line-graph': LineGraphViewController,
    'lock-screen': LockScreenSkillViewController,
    'web-rtc-player': WebRtcPlayerViewController,
}
