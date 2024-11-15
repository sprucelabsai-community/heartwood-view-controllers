import { assert, generateId, test } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import vcAssert from '../../../tests/utilities/vcAssert'
import { SkillView, ViewControllerId } from '../../../types/heartwood.types'
import { testFormSchema } from '../forms/testFormOptions'

export default class InteractingWithButtonsTest extends AbstractViewControllerTest {
    private static vc: ViewModelBasedSkillViewController

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()

        this.getFactory().setController(
            'this-test',
            ViewModelBasedSkillViewController
        )

        this.vc = this.Controller(
            'this-test' as ViewControllerId,
            {}
        ) as ViewModelBasedSkillViewController
    }

    @test()
    protected static async canReceiveButtonVcWithoutErroring() {
        let wasHit = false
        const vc = this.Controller('card', {
            body: {
                sections: [
                    {
                        buttons: [
                            {
                                id: 'test',
                                label: 'go team',
                                onClick: () => {
                                    wasHit = true
                                },
                            },
                        ],
                    },
                ],
            },
        })

        const btn = vcAssert.assertCardRendersButton(vc, 'test')
        await interactor.click(btn)
        assert.isTrue(wasHit)
    }

    @test()
    protected static async canClickButtonInForm() {
        let wasHit = false
        const formVc = this.Controller(
            'form',
            buildForm({
                schema: testFormSchema,
                sections: [],
                footer: {
                    buttons: [
                        {
                            id: 'test',
                            label: 'Go!',
                            onClick: () => {
                                wasHit = true
                            },
                        },
                    ],
                },
            })
        )

        const vc = this.Controller('card', {
            body: {
                sections: [
                    {
                        form: formVc.render(),
                    },
                ],
            },
        })

        await interactor.clickButton(vc, 'test')

        assert.isTrue(wasHit)
    }

    @test()
    protected static async canClickButtonInFirstCardsFooterSkillView() {
        await this.clickButton(this.vc.layout1Card1Footer1)
        this.assertClicksEqual(['layout1Card1Footer1'])
        await this.clickButton(this.vc.layout1Card1Footer2)
        this.assertClicksEqual(['layout1Card1Footer1', 'layout1Card1Footer2'])
    }

    @test()
    protected static async canClickButtonInSecondCardFooter() {
        await this.clickButton(this.vc.layout1Card2Footer1)
        this.assertClicksEqual(['layout1Card2Footer1'])
    }

    @test()
    protected static async canClickButtonInSecondLayout() {
        await this.clickButton(this.vc.layout2Card1Footer1)
        this.assertClicksEqual(['layout2Card1Footer1'])
    }

    private static async clickButton(id: string) {
        await interactor.clickButton(this.vc, id)
    }

    private static assertClicksEqual(expected: string[]) {
        assert.isEqualDeep(this.vc.clicks, expected)
    }
}

class ViewModelBasedSkillViewController extends AbstractSkillViewController {
    public layout1Card1Footer1 = generateId()
    public layout1Card1Footer2 = generateId()
    public layout1Card2Footer1 = generateId()
    public layout2Card1Footer1 = generateId()

    public layout1Card2Body1 = generateId()
    public clicks: string[] = []

    public render(): SkillView {
        return {
            layouts: [
                {
                    cards: [
                        {
                            footer: {
                                buttons: [
                                    {
                                        id: this.layout1Card1Footer1,
                                        onClick: () => {
                                            this.clicks.push(
                                                'layout1Card1Footer1'
                                            )
                                        },
                                    },
                                    {
                                        id: this.layout1Card1Footer2,
                                        onClick: () => {
                                            this.clicks.push(
                                                'layout1Card1Footer2'
                                            )
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            body: {
                                sections: [
                                    {
                                        buttons: [
                                            {
                                                id: this.layout1Card2Body1,
                                                onClick: () => {
                                                    this.clicks.push(
                                                        'layout1Card2Body1'
                                                    )
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                            footer: {
                                buttons: [
                                    {
                                        id: this.layout1Card2Footer1,
                                        onClick: () => {
                                            this.clicks.push(
                                                'layout1Card2Footer1'
                                            )
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    cards: [
                        {
                            body: {
                                sections: [
                                    {
                                        buttons: [
                                            {
                                                id: this.layout2Card1Footer1,
                                                onClick: () => {
                                                    this.clicks.push(
                                                        'layout2Card1Footer1'
                                                    )
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    ],
                },
            ],
        }
    }
}
