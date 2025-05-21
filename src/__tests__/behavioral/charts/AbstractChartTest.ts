import { assert, errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    BarChart,
    ChartViewController,
    LineGraph,
} from '../../../types/heartwood.types'

export default abstract class AbstractChartTest extends AbstractViewControllerTest {
    protected vc!: ChartViewController<Charts>

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.setup()
    }

    protected assertRenderControllerAsInstanceOf(Class: any) {
        const model = this.render(this.vc)
        assert.isInstanceOf(model.controller, Class)
    }

    protected assertRendersAsExpectedWithModelPassedToConstructor() {
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

    private assertConstructedWithRendersExpected(expected: Charts) {
        this.setup(expected)
        this.assertRenderedEquals(expected)
    }

    protected setup(_options?: Record<string, any>) {
        throw new Error(
            'You must implement setup(options: ViewModel) in your test.'
        )
    }

    protected assertRenderedEquals(expected: Charts) {
        const actual = this.render(this.vc)
        assert.isEqualDeep(actual, { ...expected, controller: this.vc })
    }

    protected assertSettingDataSetsRendersAsExpected() {
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

    private assertSettingDataRendersAsExpected(actual: Charts) {
        this.setDataSets(actual)
        this.assertRenderedEquals(actual)
    }

    protected setDataSets(actual: Charts) {
        this.vc.setDataSets(actual.dataSets)
    }

    protected assertSettingDataTriggersRender() {
        this.setDataSets({
            dataSets: [],
        })

        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    protected assertRetainsId() {
        const id = generateId()
        this.setup({ id, dataSets: [] })
        this.setDataSets({ dataSets: [] })
        const model = this.render(this.vc)
        assert.isEqual(model.id, id)
    }

    protected assertSetDataSetsThrowsWhenMissingRequired() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.setDataSets())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['dataSets'],
        })
    }
}

type Charts = BarChart | LineGraph
