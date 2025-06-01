import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import talkingSprucebotInteractor from '../../../tests/utilities/talkingSprucebotInteractor'

@suite()
export default class InteractingWithTalkingSprucebotTest extends AbstractViewControllerTest {
    @test()
    protected async throwsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            talkingSprucebotInteractor.simulateOnComplete()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['talkingVc'],
        })
    }

    @test()
    protected async throwsIfNoOnCompleteSet() {
        const vc = this.Controller('talking-sprucebot', {
            sentences: this.emptySentences,
        })

        await assert.doesThrowAsync(
            () => talkingSprucebotInteractor.simulateOnComplete(vc),
            'onComplete'
        )
    }

    @test()
    protected async canSimulateOnComplete() {
        let wasHit = false
        const vc = this.Controller('talking-sprucebot', {
            sentences: this.emptySentences,
            onComplete: () => {
                wasHit = true
            },
        })

        await talkingSprucebotInteractor.simulateOnComplete(vc)

        assert.isTrue(wasHit, 'onComplete was not hit')
    }

    private get emptySentences() {
        return [
            {
                words: generateId(),
            },
        ]
    }
}
