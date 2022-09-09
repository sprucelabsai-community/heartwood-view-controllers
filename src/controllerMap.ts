import ActiveRecordCardViewController from './viewControllers/activeRecord/ActiveRecordCard.vc'
import ActiveRecordListViewController from './viewControllers/activeRecord/ActiveRecordList.vc'
import BigFormViewController from './viewControllers/BigForm.vc'
import ButtonBarViewController from './viewControllers/ButtonBar.vc'
import ButtonGroupViewController from './viewControllers/ButtonGroup.vc'
import CalendarViewController from './viewControllers/Calendar.vc'
import CardViewController from './viewControllers/card/Card.vc'
import ConfirmViewController from './viewControllers/Confirm.vc'
import DialogViewController from './viewControllers/Dialog.vc'
import AutocompleteInputViewController from './viewControllers/form/AutocompleteInput.vc'
import FormViewController from './viewControllers/form/Form.vc'
import ListViewController from './viewControllers/list/List.vc'
import LoginViewController from './viewControllers/Login.vc'
import MapViewController from './viewControllers/Map.vc'
import RatingsViewController from './viewControllers/Ratings.vc'
import ProgressViewController from './viewControllers/reporting/Progress.vc'
import StatsViewController from './viewControllers/reporting/Stats.vc'
import SwipeCardViewController from './viewControllers/SwipeCard.vc'
import TalkingSprucebotViewController from './viewControllers/TalkingSprucebot.vc'
import ToolBeltViewController from './viewControllers/ToolBelt.vc'

export const CORE_CONTROLLER_MAP = {
	form: FormViewController,
	login: LoginViewController,
	'login-card': LoginViewController,
	swipeCard: SwipeCardViewController,
	buttonGroup: ButtonGroupViewController,
	card: CardViewController,
	dialog: DialogViewController,
	bigForm: BigFormViewController,
	confirm: ConfirmViewController,
	list: ListViewController,
	toolBelt: ToolBeltViewController,
	calendar: CalendarViewController,
	buttonBar: ButtonBarViewController,
	talkingSprucebot: TalkingSprucebotViewController,
	activeRecordCard: ActiveRecordCardViewController,
	activeRecordList: ActiveRecordListViewController,
	stats: StatsViewController,
	progress: ProgressViewController,
	ratings: RatingsViewController,
	autocompleteInput: AutocompleteInputViewController,
	map: MapViewController,
}
