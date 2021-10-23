import { ButtonBarViewController } from '.'
import BigFormViewController from './viewControllers/BigForm.vc'
import ButtonGroupViewController from './viewControllers/ButtonGroup.vc'
import CalendarViewController from './viewControllers/Calendar.vc'
import CardViewController from './viewControllers/Card.vc'
import ConfirmViewController from './viewControllers/Confirm.vc'
import DialogViewController from './viewControllers/Dialog.vc'
import FormViewController from './viewControllers/Form.vc'
import ListViewController from './viewControllers/list/List.vc'
import LoginViewController from './viewControllers/Login.vc'
import SwipeViewController from './viewControllers/Swipe.vc'
import ToolBeltViewController from './viewControllers/ToolBelt.vc'

export const CORE_CONTROLLER_MAP = {
	form: FormViewController,
	login: LoginViewController,
	swipe: SwipeViewController,
	buttonGroup: ButtonGroupViewController,
	card: CardViewController,
	dialog: DialogViewController,
	bigForm: BigFormViewController,
	confirm: ConfirmViewController,
	list: ListViewController,
	toolBelt: ToolBeltViewController,
	calendar: CalendarViewController,
	buttonBar: ButtonBarViewController,
}
