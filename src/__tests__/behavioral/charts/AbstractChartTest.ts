import { assert, errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    BarChart,
    ChartViewController,
    LineGraph,
} from '../../../types/heartwood.types'

export default abstract class AbstractChartTest extends AbstractViewControllerTest {
    protected static vc: ChartViewController<Charts>

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.setup()
    }

    protected static assertRenderControllerAsInstanceOf(Class: any) {
        const model = this.render(this.vc)
        assert.isInstanceOf(model.controller, Class)
    }

    protected static assertRendersAsExpectedWithModelPassedToConstructor() {
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

    private static assertConstructedWithRendersExpected(expected: Charts) {
        this.setup(expected)
        this.assertRenderedEquals(expected)
    }

    protected static setup(_options?: Record<string, any>) {
        throw new Error(
            'You must implement setup(options: ViewModel) in your test.'
        )
    }

    protected static assertRenderedEquals(expected: Charts) {
        const actual = this.render(this.vc)
        assert.isEqualDeep(actual, { ...expected, controller: this.vc })
    }

    protected static assertSettingDataSetsRendersAsExpected() {
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

    private static assertSettingDataRendersAsExpected(actual: Charts) {
        this.setDataSets(actual)
        this.assertRenderedEquals(actual)
    }

    protected static setDataSets(actual: Charts) {
        this.vc.setDataSets(actual.dataSets)
    }

    protected static assertSettingDataTriggersRender() {
        this.setDataSets({
            dataSets: [],
        })

        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    protected static assertRetainsId() {
        const id = generateId()
        this.setup({ id, dataSets: [] })
        this.setDataSets({ dataSets: [] })
        const model = this.render(this.vc)
        assert.isEqual(model.id, id)
    }

    protected static assertSetDataSetsThrowsWhenMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.setDataSets())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['dataSets'],
        })
    }
}

type Charts = BarChart | LineGraph
