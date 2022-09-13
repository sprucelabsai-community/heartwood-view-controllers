import { test, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import StatsViewController, {
	StatsViewControllerOptions,
} from '../../../viewControllers/reporting/Stats.vc'

export default class ControllingStatsTest extends AbstractViewControllerTest {
	private static vc: StatsViewController
	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Vc()
	}
	@test()
	protected static throwsIfMissingStats() {
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
	protected static canRenderStats(stats: any) {
		this.vc = this.Vc({ stats })
		const model = this.renderStats()
		assert.isEqualDeep(model.stats, stats)
	}

	@test()
	protected static defaultsTrueToFormatValues() {
		const model = this.renderStats()
		assert.isTrue(model.shouldFormatValues)
	}

	@test()
	protected static canDisableFormatting() {
		this.vc = this.Vc({ shouldFormatValues: false })
		const model = this.renderStats()
		assert.isFalse(model.shouldFormatValues)
	}

	@test()
	protected static cantSetValueForBadIndex() {
		assert.doesThrow(() => this.vc.setValue(-1, 0))
		this.vc.setValue(0, 0)
		assert.doesThrow(() => this.vc.setValue(4, 0))
		this.vc.setValue(1, 0)
		this.vc.setValue(2, 0)
	}

	@test('can set idx 0', 0, 100)
	@test('can set idx 2', 2, 100)
	@test('can set idx 2b', 2, 75)
	protected static canHaveNoStatToStart(idx: number, value: number) {
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
	protected static settingValueTriggersRender() {
		this.vc.setValue(0, 0)
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	private static Vc(options?: Partial<StatsViewControllerOptions>) {
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

	private static renderStats() {
		const model = this.render(this.vc)
		return model
	}
}
