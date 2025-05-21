import { test, suite } from '@sprucelabs/test-utils'
import { BarChart } from '../../../../types/heartwood.types'
import BarChartViewController from '../../../../viewControllers/charts/BarChart.vc'
import AbstractChartTest from '../AbstractChartTest'

@suite()
export default class ControllingBarChartsTest extends AbstractChartTest {
    @test()
    protected async returnsSelfAsController() {
        this.assertRenderControllerAsInstanceOf(BarChartViewController)
    }

    @test()
    protected async passesViewModelThroughToRender() {
        this.assertRendersAsExpectedWithModelPassedToConstructor()
    }

    @test()
    protected async setDataSetsThrowsWithMissing() {
        this.assertSetDataSetsThrowsWhenMissingRequired()
    }

    @test()
    protected async settingDataSetsWithRequiredPasses() {
        this.vc.setDataSets([])
    }

    @test()
    protected async settingDataSetRendersAsExpected() {
        this.assertSettingDataSetsRendersAsExpected()
    }

    @test()
    protected async settingDataSetsTriggersRender() {
        this.assertSettingDataTriggersRender()
    }

    @test()
    protected async settingDataSetsDoesNotLoseId() {
        this.assertRetainsId()
    }

    protected setup(options?: BarChart) {
        this.vc = this.Controller('bar-chart', options ?? {})
    }
}
