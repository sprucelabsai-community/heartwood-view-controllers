import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'

export default class InteractingWithDialogsTest extends AbstractViewControllerTest {
    @test()
    protected static async canCallDidHide() {
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
    protected static async doesNotCrashIfNoDidHide() {
        const cardVc = this.Controller('card', {})
        await interactor.hide(cardVc)
    }
}
