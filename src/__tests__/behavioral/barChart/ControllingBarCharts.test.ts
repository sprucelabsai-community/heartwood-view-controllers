import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert, generateId, errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { BarChart } from '../../../types/heartwood.types'
import BarChartViewController from '../../../viewControllers/BarChart.vc'

export default class ControllingBarChartsTest extends AbstractViewControllerTest {
    private static vc: BarChartViewController
    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.setup()
    }

    @test()
    protected static async returnsSelfAsController() {
        const model = this.render(this.vc)
        assert.isInstanceOf(model.controller, BarChartViewController)
    }

    @test()
    protected static async passesViewModelThroughToRender() {
        this.assertConstructedWithRendersExpected({
            dataSets: [
                {
                    dataPoints: [],
                    label: 'test',
                },
            ],
        })

        this.assertConstructedWithRendersExpected({
            dataSets: [
                {
                    dataPoints: [
                        {
                            value: 0,
                            label: generateId(),
                        },
                    ],
                    label: 'another',
                },
            ],
        })
    }

    @test()
    protected static async setDataSetsThrowsWithMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.setDataSets())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['dataSets'],
        })
    }

    @test()
    protected static async settingDataSetsWithRequiredPasses() {
        this.vc.setDataSets([])
    }

    @test()
    protected static async settingDataSetRendersAsExpected() {
        this.assertSettingDataRendersAsExpected({
            dataSets: [
                {
                    label: 'hello',
                    dataPoints: [],
                },
            ],
        })

        this.assertSettingDataRendersAsExpected({
            dataSets: [
                {
                    label: generateId(),
                    dataPoints: [
                        {
                            label: generateId(),
                            value: 10,
                        },
                    ],
                },
            ],
        })
    }

    @test()
    protected static async settingDataSetsTriggersRender() {
        this.setDataSets({
            dataSets: [],
        })

        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected static async settingDataSetsDoesNotLoseId() {
        const id = generateId()
        this.setDataSets({ dataSets: [] })
        const model = this.render(this.vc)
        assert.isEqual(model.id, id)
    }

    private static assertSettingDataRendersAsExpected(actual: BarChart) {
        this.setDataSets(actual)
        this.assertRenderedEquals(actual)
    }

    private static setDataSets(
        actual: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BarChart
    ) {
        this.vc.setDataSets(actual.dataSets)
    }

    private static assertConstructedWithRendersExpected(expected: BarChart) {
        this.setup(expected)
        this.assertRenderedEquals(expected)
    }

    private static assertRenderedEquals(
        expected: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BarChart
    ) {
        const actual = this.render(this.vc)
        assert.isEqualDeep(actual, { ...expected, controller: this.vc })
    }

    private static setup(options?: BarChart) {
        this.vc = this.Controller('bar-chart', options ?? {})
    }
}
