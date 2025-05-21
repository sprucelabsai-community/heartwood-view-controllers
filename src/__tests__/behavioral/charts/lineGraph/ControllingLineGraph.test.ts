import { test, suite } from '@sprucelabs/test-utils'
import { LineGraph } from '../../../../types/heartwood.types'
import LineGraphViewController from '../../../../viewControllers/charts/LineGraph.vc'
import AbstractChartTest from '../AbstractChartTest'

@suite()
export default class ControllingLineGraphTest extends AbstractChartTest {
    @test()
    protected async returnsSelfAsController() {
        this.assertRenderControllerAsInstanceOf(LineGraphViewController)
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

    protected setup(options?: LineGraph) {
        this.vc = this.Controller('line-graph', options ?? {})
    }
}
