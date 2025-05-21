import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'

@suite()
export default class InteractingWithButtonBarsTest extends AbstractViewControllerTest {
    @test()
    protected async throwsWhenMissingParams() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            interactor.clickButtonInButtonBar()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async canClickButtonInButtonBar() {
        let wasHit = false
        let passedSelected: any
        const vc = this.Controller('button-bar', {
            onSelectionChange: (selected) => {
                wasHit = true
                passedSelected = selected
            },
            buttons: [
                {
                    id: 'first',
                    label: 'Hey!',
                },
                {
                    id: 'second',
                    label: 'There!',
                },
            ],
        })

        await interactor.clickButtonInButtonBar(vc, 'first')
        assert.isTrue(wasHit)
        assert.isEqualDeep(passedSelected, ['first'])

        await interactor.clickButtonInButtonBar(vc, 'second')
        assert.isEqualDeep(passedSelected, ['second'])
    }
}
