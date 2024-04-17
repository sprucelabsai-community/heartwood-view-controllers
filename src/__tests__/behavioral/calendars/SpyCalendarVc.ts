import CalendarViewController from '../../../viewControllers/Calendar.vc'

export default class SpyCalendarVc extends CalendarViewController {
    public clearSelectedEventId() {
        this.selectedEventId = 'aoeuaoue'
    }

    public clearEventVcs() {
        this.vcsById = {}
    }
}
