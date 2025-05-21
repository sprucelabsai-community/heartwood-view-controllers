import { assert, test, suite } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import { interactor } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

@suite()
export default class ClickingButtonHintsTest extends AbstractViewControllerTest {
    @test()
    protected async throwsWhenMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            interactor.clickButtonHint()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'buttonId'],
        })
    }

    @test()
    protected async throwsWhenNotFindingButton() {
        const cardVc = this.Controller('card', {})
        await assert.doesThrowAsync(
            () => interactor.clickButtonHint(cardVc, 'not-found'),
            'not find'
        )
    }

    @test()
    protected async throwsWhenNoHintListenerWasSet() {
        const cardVc = this.Controller('card', {
            body: {
                sections: [
                    {
                        buttons: [{ id: 'found', shouldShowHintIcon: true }],
                    },
                ],
            },
        })
        await assert.doesThrowAsync(
            () => interactor.clickButtonHint(cardVc, 'found'),
            'onClickHintIcon'
        )
    }

    @test()
    protected async throwsWhenHintNotSetToTrue() {
        const cardVc = this.Controller('card', {
            body: {
                sections: [
                    {
                        buttons: [
                            {
                                id: 'found',
                                shouldShowHintIcon: false,
                                onClickHintIcon: () => {},
                            },
                        ],
                    },
                ],
            },
        })
        await assert.doesThrowAsync(
            () => interactor.clickButtonHint(cardVc, 'found'),
            'shouldShowHintIcon'
        )
    }

    @test()
    protected async canClickFirstHintIcon() {
        const cardVc = this.Controller('card', {
            body: {
                sections: [
                    {
                        buttons: [
                            {
                                id: 'found',
                                onClickHintIcon: () => {},
                                shouldShowHintIcon: true,
                            },
                        ],
                    },
                ],
            },
        })
        await interactor.clickButtonHint(cardVc, 'found')
    }

    @test()
    protected async clicksALaterButton() {
        const cardVc = this.Controller('card', {
            body: {
                sections: [
                    {},
                    {
                        buttons: [
                            { id: 'found' },
                            {
                                id: 'another',
                                onClickHintIcon: () => {},
                                shouldShowHintIcon: true,
                            },
                        ],
                    },
                ],
            },
        })
        await interactor.clickButtonHint(cardVc, 'another')
    }

    @test()
    protected async clicksButtonInFooter() {
        const cardVc = this.Controller('card', {
            footer: {
                buttons: [
                    { id: 'found' },
                    {
                        id: 'another',
                        onClickHintIcon: () => {},
                        shouldShowHintIcon: true,
                    },
                ],
            },
        })
        await interactor.clickButtonHint(cardVc, 'another')
    }

    @test()
    protected async triggersCallback() {
        let wasHit = false
        const cardVc = this.Controller('card', {
            body: {
                sections: [
                    {
                        buttons: [
                            {
                                id: 'a-button',
                                onClickHintIcon: () => {
                                    wasHit = true
                                },
                                shouldShowHintIcon: true,
                            },
                        ],
                    },
                ],
            },
        })

        await interactor.clickButtonHint(cardVc, 'a-button')

        assert.isTrue(wasHit)
    }
}
