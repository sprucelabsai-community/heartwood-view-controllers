import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { CardViewControllerOptions } from '../../../viewControllers/card/Card.vc'
import { ProgressViewControllerOptions } from '../../../viewControllers/reporting/Progress.vc'

export default class AssertingProgressTest extends AbstractViewControllerTest {
	@test()
	protected static assertThrowsIfNotRenderingProgress() {
		const vc = this.CardVc()
		assert.doesThrow(() => vcAssert.assertCardRendersProgress(vc))
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

		vcAssert.assertCardRendersProgress(vc)
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

		vcAssert.assertCardRendersProgress(vc)
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

		const matchVc = vcAssert.assertCardRendersProgress(vc)
		assert.isEqual(matchVc, progressVc)
	}

	@test()
	protected static throwsWhenAssertPercentCompleteIsWrong() {
		const vc = this.ProgressVc()
		assert.doesThrow(() => vcAssert.assertCardRendersProgress(vc, 1))
	}

	@test('matches percent 0.5', 0.5)
	@test('matches percent 1', 1)
	protected static passesWhenFindingPercentThatMatches(
		percentComplete: number
	) {
		const vc = this.ProgressVc({ percentComplete })
		vcAssert.assertCardRendersProgress(vc, percentComplete)
		vcAssert.assertCardRendersProgress(vc)
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
