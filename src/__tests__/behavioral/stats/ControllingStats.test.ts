import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import StatsViewController, {
    StatsViewControllerOptions,
} from '../../../viewControllers/reporting/Stats.vc'

@suite()
export default class ControllingStatsTest extends AbstractViewControllerTest {
    private vc!: StatsViewController
    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Vc()
    }
    @test()
    protected throwsIfMissingStats() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.Controller('stats', {}))
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['stats'],
        })
    }

    @test('renders stats 1', [
        {
            value: 2,
            label: '1',
        },
    ])
    @test('renders stats 2', [
        {
            value: 100,
            label: 'oh boy!',
        },
    ])
    @test('renders multiple stats', [
        {
            value: 100,
            label: 'oh boy!',
        },
        {
            value: 250,
            label: 'go team!',
        },
    ])
    protected canRenderStats(stats: any) {
        this.vc = this.Vc({ stats })
        const model = this.renderStats()
        assert.isEqualDeep(model.stats, stats)
    }

    @test()
    protected defaultsTrueToFormatValues() {
        const model = this.renderStats()
        assert.isTrue(model.shouldFormatValues)
    }

    @test()
    protected canDisableFormatting() {
        this.vc = this.Vc({ shouldFormatValues: false })
        const model = this.renderStats()
        assert.isFalse(model.shouldFormatValues)
    }

    @test()
    protected cantSetValueForBadIndex() {
        assert.doesThrow(() => this.vc.setValue(-1, 0))
        this.vc.setValue(0, 0)
        assert.doesThrow(() => this.vc.setValue(4, 0))
        this.vc.setValue(1, 0)
        this.vc.setValue(2, 0)
    }

    @test('can set idx 0', 0, 100)
    @test('can set idx 2', 2, 100)
    @test('can set idx 2b', 2, 75)
    @test('can set idx 0 to strting', 0, 'hello')
    protected canHaveNoStatToStart(idx: number, value: number | string) {
        const vc = this.Vc({
            stats: [
                {
                    label: 'coming soon',
                },
            ],
        })

        vc.setValue(idx, value)

        vcAssert.assertStatsRendersValue(vc, idx, value)
    }

    @test()
    protected settingValueTriggersRender() {
        this.vc.setValue(0, 0)
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    private Vc(options?: Partial<StatsViewControllerOptions>) {
        return this.Controller('stats', {
            stats: [
                {
                    value: 250,
                    label: 'go team!',
                },
            ],
            ...options,
        })
    }

    private renderStats() {
        const model = this.render(this.vc)
        return model
    }
}
