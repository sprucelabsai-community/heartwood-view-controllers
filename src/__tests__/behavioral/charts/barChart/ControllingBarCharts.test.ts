import { test } from '@sprucelabs/test-utils'
import { BarChart } from '../../../../types/heartwood.types'
import BarChartViewController from '../../../../viewControllers/charts/BarChart.vc'
import AbstractChartTest from '../AbstractChartTest'

export default class ControllingBarChartsTest extends AbstractChartTest {
    @test()
    protected static async returnsSelfAsController() {
        this.assertRenderControllerAsInstanceOf(BarChartViewController)
    }

    @test()
    protected static async passesViewModelThroughToRender() {
        this.assertRendersAsExpectedWithModelPassedToConstructor()
    }

    @test()
    protected static async setDataSetsThrowsWithMissing() {
        this.assertSetDataSetsThrowsWhenMissingRequired()
    }

    @test()
    protected static async settingDataSetsWithRequiredPasses() {
        this.vc.setDataSets([])
    }

    @test()
    protected static async settingDataSetRendersAsExpected() {
        this.assertSettingDataSetsRendersAsExpected()
    }

    @test()
    protected static async settingDataSetsTriggersRender() {
        this.assertSettingDataTriggersRender()
    }

    @test()
    protected static async settingDataSetsDoesNotLoseId() {
        this.assertRetainsId()
    }

    protected static setup(options?: BarChart) {
        this.vc = this.Controller('bar-chart', options ?? {})
    }
}
