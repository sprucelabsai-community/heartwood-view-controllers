import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import feedInteractor from '../../../tests/utilities/feedInteractor'
import FeedViewController, {
    FeedViewControllerOptions,
} from '../../../viewControllers/Feed.vc'

@suite()
export default class InteractingWithTheFeedTest extends AbstractViewControllerTest {
    private vc!: FeedViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Vc()
    }

    @test()
    protected async throwsWithMissingParams() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            feedInteractor.submitMessage()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'message'],
        })
    }

    @test()
    protected async throwsWithNoMessageCallback() {
        await assert.doesThrowAsync(
            () => this.submitMessage('hey there!'),
            'onSubmitMessage'
        )
    }

    @test()
    protected async invokesSubmitCallback() {
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
    protected async submittingMessageReturnsResponseFromHandler(
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

    private submitMessage(message: string): any {
        return feedInteractor.submitMessage(this.vc, message)
    }

    private Vc(
        options?: Partial<FeedViewControllerOptions>
    ): FeedViewController {
        return this.Controller('feed', { ...options, items: [] })
    }
}
