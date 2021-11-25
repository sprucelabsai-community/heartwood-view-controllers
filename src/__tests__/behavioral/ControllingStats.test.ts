import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { StatsViewControllerOptions } from '../../viewControllers/reporting/Stats.vt'

export default class ControllingStatsTest extends AbstractViewControllerTest {
	@test()
	protected static throwsIfMissingStats() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.Controller('stats', {}))
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
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
		const model = this.renderStats({ stats })
		assert.isEqualDeep(model.stats, stats)
	}

	@test()
	protected static defaultsTrueToFormatValues() {
		const model = this.renderStats()
		assert.isTrue(model.shouldFormatValues)
	}

	@test()
	protected static canDisableFormatting() {
		const model = this.renderStats({ shouldFormatValues: false })
		assert.isFalse(model.shouldFormatValues)
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

	private static renderStats(options?: Partial<StatsViewControllerOptions>) {
		const vc = this.Vc(options)
		const model = this.render(vc)
		return model
	}
}
