import { test, assert, generateId } from '@sprucelabs/test-utils'
import { CardViewController } from '../../..'
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
		this.assertDoesNotRenderProgress(vc)
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
		vcAssert.assertCardRendersProgress(vc)
	}

	@test()
	protected static throwsWhenAssertPercentCompleteIsWrong() {
		const vc = this.CardWithProgressVc()
		assert.doesThrow(() => vcAssert.assertCardRendersProgress(vc, 1))
		vcAssert.assertCardDoesNotRenderProgress(vc, 1)
	}

	@test('matches percent 0.5', 0.5)
	@test('matches percent 1', 1)
	protected static passesWhenFindingPercentThatMatches(
		percentComplete: number
	) {
		const vc = this.CardWithProgressVc({ percentComplete })
		vcAssert.assertCardRendersProgress(vc, percentComplete)
		vcAssert.assertCardRendersProgress(vc)
		this.assertDoesNotRenderProgress(vc)
		this.assertDoesNotRenderProgress(vc, percentComplete)
	}

	@test()
	protected static async throwsWhenIdDoesNotMatch() {
		const id = 'whatever'
		const vc = this.CardWithProgressVc({
			id,
		})
		assert.doesThrow(() =>
			vcAssert.assertCardRendersProgress(vc, 0.5, generateId())
		)

		vcAssert.assertCardDoesNotRenderProgress(vc, 0.5, generateId())

		vcAssert.assertCardRendersProgress(vc, 0.5, id)
		this.assertDoesNotRenderProgress(vc, 0.5, id)
	}

	@test()
	protected static async canMatchOnSecondId() {
		const vc = this.CardWithProgressVc({
			id: generateId(),
		})

		const id = generateId()

		vc.addSection({
			progress: this.ProgressVc({ id }).render(),
		})

		vcAssert.assertCardRendersProgress(vc, 0.5, id)
		this.assertDoesNotRenderProgress(vc, 0.5, id)

		assert.doesThrow(() => vcAssert.assertCardRendersProgress(vc, 0.2, id))
		vcAssert.assertCardDoesNotRenderProgress(vc, 0.2, id)
	}

	private static CardWithProgressVc(options?: ProgressViewControllerOptions) {
		const progressVc = this.ProgressVc(options)
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

	private static assertDoesNotRenderProgress(
		vc: CardViewController,
		percentComplete?: number,
		id?: string
	) {
		assert.doesThrow(() =>
			vcAssert.assertCardDoesNotRenderProgress(vc, percentComplete, id)
		)
	}

	private static ProgressVc(options?: ProgressViewControllerOptions) {
		return this.Controller('progress', {
			percentComplete: 0.5,
			...options,
		})
	}

	private static CardVc(options?: CardViewControllerOptions) {
		return this.Controller('card', { ...options })
	}
}
