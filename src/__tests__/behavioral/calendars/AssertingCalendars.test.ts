import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test } from '@sprucelabs/test'
import { AbstractViewController, CalendarViewController } from '../../..'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'

type Calendar = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar
class CalVc extends AbstractViewController<Calendar> {
	private calendarVc?: CalendarViewController
	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar {
		return this.getCalendarVc().render()
	}

	public getCalendarVc() {
		if (!this.calendarVc) {
			this.calendarVc = this.Controller('calendar', {
				people: [],
			})
		}

		return this.calendarVc
	}
}

class CalendarPage extends AbstractSkillViewController {
	private calVc?: CalVc
	public getCalVc() {
		if (!this.calVc) {
			this.calVc = this.Controller('calVc' as any, {}) as CalVc
		}

		return this.calVc
	}

	private CardVc() {
		return this.Controller('card', {
			body: {
				sections: [{ calendar: this.getCalVc().render() }],
			},
		})
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView {
		return {
			layouts: [
				{
					cards: [this.CardVc().render()],
				},
			],
		}
	}
}

export default class AssertingCalendarsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		cal: CalendarPage,
		calVc: CalVc,
	}

	@test()
	protected static assertingCalendarReturnsController() {
		const vc = this.Controller('cal' as any, {}) as CalendarPage
		const match = vcAssert.assertSkillViewRendersCalendar(vc)

		assert.isTruthy(match)
		assert.isEqual(match, vc.getCalVc().getCalendarVc())
		vcAssert.assertRendersAsInstanceOf(match, CalVc)
	}
}
