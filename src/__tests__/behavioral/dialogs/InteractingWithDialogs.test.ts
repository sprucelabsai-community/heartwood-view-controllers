import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'

@suite()
export default class InteractingWithDialogsTest extends AbstractViewControllerTest {
    @test()
    protected async canCallDidHide() {
        const cardVc = this.Controller('card', {})

        let wasHit = false

        //@ts-ignore
        cardVc.didHide = async () => {
            wasHit = true
        }

        await interactor.hide(cardVc)

        assert.isTrue(wasHit)
    }

    @test()
    protected async doesNotCrashIfNoDidHide() {
        const cardVc = this.Controller('card', {})
        await interactor.hide(cardVc)
    }
}
