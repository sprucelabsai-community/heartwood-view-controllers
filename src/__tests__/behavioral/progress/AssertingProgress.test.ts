import { test, assert } from '@sprucelabs/test'
import { vcAssertUtil } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { CardViewControllerOptions } from '../../../viewControllers/Card.vc'
import { ProgressViewControllerOptions } from '../../../viewControllers/reporting/Progress.vc'

export default class AssertingProgressTest extends AbstractViewControllerTest {
	@test()
	protected static assertThrowsIfNotRenderingProgress() {
		const vc = this.CardVc()
		assert.doesThrow(() => vcAssertUtil.assertCardRendersProgress(vc))
	}

	@test()
	protected static passesWhenRenderingProgressInFirstSection() {
		const vc = this.CardVc({
			body: {
				sections: [
					{
						progress: {
							percentComplete: 0.5,
						},
					},
				],
			},
		})

		vcAssertUtil.assertCardRendersProgress(vc)
	}

	@test()
	protected static passesWhenRenderingProgressInThirdSection() {
		const vc = this.CardVc({
			body: {
				sections: [
					{},
					{},
					{
						progress: {},
					},
				],
			},
		})

		vcAssertUtil.assertCardRendersProgress(vc)
	}

	@test()
	protected static assertingReturnsVc() {
		const progressVc = this.Controller('progress', {})
		const vc = this.CardVc({
			body: {
				sections: [
					{
						progress: progressVc.render(),
					},
				],
			},
		})

		const matchVc = vcAssertUtil.assertCardRendersProgress(vc)
		assert.isEqual(matchVc, progressVc)
	}

	@test()
	protected static throwsWhenAssertPercentCompleteIsWrong() {
		const vc = this.ProgressVc()
		assert.doesThrow(() => vcAssertUtil.assertCardRendersProgress(vc, 1))
	}

	@test('matches percent 0.5', 0.5)
	@test('matches percent 1', 1)
	protected static passesWhenFindingPercentThatMatches(
		percentComplete: number
	) {
		const vc = this.ProgressVc({ percentComplete })
		vcAssertUtil.assertCardRendersProgress(vc, percentComplete)
		vcAssertUtil.assertCardRendersProgress(vc)
	}

	private static ProgressVc(options?: ProgressViewControllerOptions) {
		const progressVc = this.Controller('progress', {
			percentComplete: 0.5,
			...options,
		})
		const vc = this.CardVc({
			body: {
				sections: [
					{
						progress: progressVc.render(),
					},
				],
			},
		})
		return vc
	}

	private static CardVc(options?: CardViewControllerOptions) {
		return this.Controller('card', { ...options })
	}
}
