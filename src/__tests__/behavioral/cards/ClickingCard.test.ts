import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'

@suite()
export default class ClickingCardTest extends AbstractViewControllerTest {
    @test()
    protected async throwsIfMissing() {
        //@ts-ignore
        const err = await assert.doesThrowAsync(() => interactor.clickCard())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async canClickCard() {
        let wasHit = false
        const vc = this.Controller('card', {
            onClick: () => {
                wasHit = true
            },
        })

        assert.isFalse(wasHit)
        await interactor.clickCard(vc)
        assert.isTrue(wasHit)
    }

    @test()
    protected async throwsIfOnClickNotSet() {
        const cardId = generateId()
        const vc = this.Controller('card', {
            id: cardId,
        })

        await assert.doesThrowAsync(
            () => interactor.clickCard(vc),
            'onClick is not set, please set add onClick: ()=>{} in your card to make the it clickable'
        )
    }
}
