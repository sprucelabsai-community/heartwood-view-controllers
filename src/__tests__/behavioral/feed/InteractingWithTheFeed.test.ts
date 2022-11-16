import { test, assert, errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import feedInteractor from '../../../tests/utilities/feedInteractor'
import FeedViewController, {
	FeedViewControllerOptions,
} from '../../../viewControllers/Feed.vc'

export default class InteractingWithTheFeedTest extends AbstractViewControllerTest {
	private static vc: FeedViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Vc()
	}

	@test()
	protected static async throwsWithMissingParams() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			feedInteractor.submitMessage()
		)

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc', 'message'],
		})
	}

	@test()
	protected static async throwsWithNoMessageCallback() {
		await assert.doesThrowAsync(
			() => this.submitMessage('hey there!'),
			'onSubmitMessage'
		)
	}

	@test()
	protected static async invokesSubmitCallback() {
		let passedMessage: string | undefined

		this.vc = this.Vc({
			onSubmitMessage: (message) => {
				passedMessage = message
			},
		})

		const expected = generateId()
		await this.submitMessage(expected)

		assert.isEqual(passedMessage, expected)
	}

	@test('onSubmit responds with true', true)
	@test('onSubmit responds with false', false)
	protected static async submittingMessageReturnsResponseFromHandler(
		expected: boolean
	) {
		this.vc = this.Vc({
			onSubmitMessage: () => {
				return expected
			},
		})

		const actual = await this.submitMessage(generateId())
		assert.isEqual(actual, expected)
	}

	private static submitMessage(message: string): any {
		return feedInteractor.submitMessage(this.vc, message)
	}

	private static Vc(
		options?: Partial<FeedViewControllerOptions>
	): FeedViewController {
		return this.Controller('feed', { ...options, items: [] })
	}
}
