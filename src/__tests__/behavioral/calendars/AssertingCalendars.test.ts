import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test, suite } from '@sprucelabs/test-utils'
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

    public CardVc() {
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

@suite()
export default class AssertingCalendarsTest extends AbstractViewControllerTest {
    protected controllerMap = {
        cal: CalendarPage,
        calVc: CalVc,
    }
    private vc!: CalendarPage

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Controller('cal' as any, {}) as CalendarPage
    }

    @test()
    protected assertingCalendarReturnsController() {
        const match = vcAssert.assertSkillViewRendersCalendar(this.vc)

        assert.isTruthy(match)
        assert.isEqual(match, this.vc.getCalVc().getCalendarVc())
        vcAssert.assertRendersAsInstanceOf(match, CalVc)
    }

    @test()
    protected canAssertCardRendersCalendar() {
        const vc = this.Controller('card', {})

        assert.doesThrow(() => vcAssert.assertCardRendersCalendar(vc))
        vcAssert.assertCardDoesNotRenderCalendar(vc)

        const cardVc = this.vc.CardVc()

        vcAssert.assertCardRendersCalendar(cardVc)
        assert.doesThrow(() => vcAssert.assertCardDoesNotRenderCalendar(cardVc))
    }
}
