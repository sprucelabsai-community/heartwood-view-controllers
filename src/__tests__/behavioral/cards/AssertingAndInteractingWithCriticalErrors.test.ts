import { assert, test, suite } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    CardViewController,
    CriticalError,
} from '../../../types/heartwood.types'

@suite()
export default class AssertingAndInteractingWithCriticalErrorsTest extends AbstractViewControllerTest {
    private vc!: CardViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Controller('card', {})
    }

    @test()
    protected async canCreateAssertingCriticalErrors() {
        vcAssert.assertCardDoesNotRenderCriticalError(this.vc)

        assert.doesThrow(() => vcAssert.assertCardRendersCriticalError(this.vc))

        this.setError()

        vcAssert.assertCardRendersCriticalError(this.vc)
        assert.doesThrow(() =>
            vcAssert.assertCardDoesNotRenderCriticalError(this.vc)
        )
    }

    @test()
    protected async throwsWhenButtonNotFoundInError() {
        await this.assertThrowsMatching('this.cardVc.setCriticalError(...)')
    }

    @test()
    protected async throwsWhenButtonNotFound() {
        this.setError({
            buttons: [
                {
                    id: 'whatever',
                },
            ],
        })

        await this.throwsCantFindButton()
    }

    @test()
    protected async throwsWhenMissingOnClick() {
        this.setError({
            buttons: [
                {
                    id: 'whatever',
                },
                {
                    id: 'test',
                },
            ],
        })

        await this.assertThrowsMatching('onClick', 'whatever')
        await this.assertThrowsMatching('onClick', 'test')
    }

    @test()
    protected async actuallyCallsTheCallback() {
        let wasHit = false
        this.setError({
            buttons: [
                {
                    id: 'test',
                    onClick: () => {
                        wasHit = true
                    },
                },
            ],
        })

        await this.clickButton()
        assert.isTrue(wasHit)
    }

    private async throwsCantFindButton(buttonId?: string) {
        await this.assertThrowsMatching('not find the button', buttonId)
    }

    private async assertThrowsMatching(message: string, buttonId?: string) {
        await assert.doesThrowAsync(() => this.clickButton(buttonId), message)
    }

    private clickButton(buttonId = 'test') {
        return interactor.clickCriticalErrorButton(this.vc, buttonId)
    }

    private setError(error: CriticalError = {}) {
        this.vc.setCriticalError(error)
    }
}
