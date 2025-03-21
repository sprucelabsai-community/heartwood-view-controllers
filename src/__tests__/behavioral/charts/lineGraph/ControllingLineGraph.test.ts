import { test } from '@sprucelabs/test-utils'
import { LineGraph } from '../../../../types/heartwood.types'
import LineGraphViewController from '../../../../viewControllers/charts/LineGraph.vc'
import AbstractChartTest from '../AbstractChartTest'

export default class ControllingLineGraphTest extends AbstractChartTest {
    @test()
    protected static async returnsSelfAsController() {
        this.assertRenderControllerAsInstanceOf(LineGraphViewController)
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

    protected static setup(options?: LineGraph) {
        this.vc = this.Controller('line-graph', options ?? {})
    }
}
