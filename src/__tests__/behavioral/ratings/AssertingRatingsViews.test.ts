import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { CardViewControllerOptions } from '../../../viewControllers/card/Card.vc'

export default class AssertingRatingsViewsTest extends AbstractViewControllerTest {
	@test('throws when no rating found 1')
	@test('throws when no rating found 2', { body: { sections: [{}] } })
	protected static throwsWhenNoRatingsRendered(options?: any) {
		const cardVc = this.Vc(options)
		assert.doesThrow(() => vcAssert.assertCardRendersRatings(cardVc))
	}

	@test()
	protected static knowsWhenRatingsInFirstSection() {
		const cardVc = this.Vc({
			body: {
				sections: [
					{
						ratings: {},
					},
				],
			},
		})

		vcAssert.assertCardRendersRatings(cardVc)
	}

	@test()
	protected static knowsIfRatingsInThirdSection() {
		const cardVc = this.Vc({
			body: {
				sections: [
					{},
					{},
					{
						ratings: {},
					},
				],
			},
		})

		vcAssert.assertCardRendersRatings(cardVc)
	}

	@test()
	protected static returnsVc() {
		const ratingsVc = this.Controller('ratings', {})
		const cardVc = this.Vc({
			body: {
				sections: [
					{},
					{},
					{
						ratings: ratingsVc.render(),
					},
				],
			},
		})

		const vc = vcAssert.assertCardRendersRatings(cardVc)
		assert.isEqual(vc, ratingsVc)
	}

	private static Vc(options?: CardViewControllerOptions) {
		return this.Controller('card', { ...options })
	}
}
