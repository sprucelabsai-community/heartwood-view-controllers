import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import CalendarViewController from '../../../viewControllers/Calendar.vc'

@suite()
export default class SettingAndGettingShiftsTest extends AbstractViewControllerTest {
    private vc!: CalendarViewController
    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Controller('calendar', {})
    }

    @test()
    protected async noShiftsToStart() {
        assert.isFalsy(this.vc.getShifts())
    }

    @test('can set shifts 1', [
        {
            id: '1234',
            personId: '1234',
            startDateTimeMs: 0,
            endDateTimeMs: 1,
        },
    ])
    @test('can set shifts 2', [
        {
            id: '342234',
            personId: '1232342344',
            startDateTimeMs: 0,
            endDateTimeMs: 1,
        },
        {
            id: '53433',
            personId: '4343345',
            startDateTimeMs: 23,
            endDateTimeMs: 123,
        },
    ])
    protected async canSetShifts(
        expected: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarShift[]
    ) {
        this.vc.setShifts(expected)
        assert.isEqualDeep(this.render(this.vc).shifts, expected)
        assert.isEqualDeep(this.vc.getShifts(), expected)
    }

    @test()
    protected async settingShiftsTriggersRenders() {
        this.vc.setShifts([])
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }
}
