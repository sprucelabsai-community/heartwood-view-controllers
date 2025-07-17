import { buildSchema } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { generateId } from '@sprucelabs/test-utils'
import Authenticator from '../../../auth/Authenticator'
import buildBigForm from '../../../builders/buildBigForm'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { DEMO_NUMBER, DEMO_NUMBER2 } from '../../../tests/constants'
import interactor from '../../../tests/utilities/interactor'
import {
    SkillViewController,
    TriggerRenderHandler,
} from '../../../types/heartwood.types'
import LoginCardViewController from '../../../viewControllers/LoginCard.vc'

type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView

class GoodSkillViewController implements SkillViewController {
    private model!: SkillView
    public constructor(model: SkillView) {
        this.model = model
    }

    public renderToolBelt() {
        return null
    }

    public async load() {}
    public triggerRender() {}
    public setTriggerRenderHandler(handler: TriggerRenderHandler) {
        this.triggerRender = handler
    }

    public render() {
        return this.model
    }
}

@suite()
export default class InteractorTest extends AbstractViewControllerTest {
    protected controllerMap = {
        good: GoodSkillViewController,
    }
    private loginVc!: LoginCardViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.loginVc = this.LoginVc()
    }

    @test()
    protected async canCreateinteractor() {
        assert.isTruthy(interactor)
    }

    @test()
    protected async loginGoesBackToFirstSlideError() {
        await this.client.on(
            'request-pin::v2020_12_25',
            () => assert.fail('Noo!') as any
        )
        await assert.doesThrowAsync(
            () => interactor.submitLoginForm(this.loginVc, '666-000-0000'),
            'Noo!'
        )

        assert.isEqual(this.loginVc.getLoginForm().getPresentSlide(), 0)
    }

    @test(`can login with ${DEMO_NUMBER}`, DEMO_NUMBER)
    @test(`can login with ${DEMO_NUMBER2}`, DEMO_NUMBER2)
    protected async loginPassesWithGoodDemoNumber(phone: string) {
        const challenge = generateId()

        await this.eventFaker.fakeRequestPin(challenge)

        let passedChallenge: string | undefined

        const personId = generateId()
        await this.eventFaker.fakeConfirmPin({
            personId,
            cb: ({ payload }) => {
                passedChallenge = payload.challenge
            },
        })

        let loggedInPersonId: string | undefined
        const auth = Authenticator.getInstance()

        await auth.addEventListener('did-login', ({ person }) => {
            loggedInPersonId = person.id
        })

        await interactor.submitLoginForm(this.LoginVc(), phone)

        assert.isTrue(auth.isLoggedIn())
        assert.isEqual(loggedInPersonId, personId)
        assert.isEqual(passedChallenge, challenge)
    }

    @test()
    protected async cantClickFooterActionInFormWithoutOne() {
        const formVc = this.Controller('form', {
            shouldRenderSubmitControls: false,
            schema: {
                id: 'test',
                fields: {},
            },
            sections: [],
        })

        await assert.doesThrowAsync(() =>
            interactor.clickPrimaryInFooter(formVc)
        )
    }

    @test()
    protected async submitsFormIfThereIsASubmitButton() {
        const formVc = this.Controller('form', {
            schema: {
                id: 'test',
                fields: {},
            },
            sections: [],
        })

        await interactor.clickPrimaryInFooter(formVc)
    }

    @test('can submit big form with 2 sections', [
        {
            fields: ['first'],
        },
        {
            fields: ['second'],
        },
    ])
    @test('can submit big form with 3 sections', [
        {
            fields: ['first'],
        },
        {
            fields: ['second'],
        },
        {
            fields: ['third'],
        },
    ])
    protected async canSubmitBigFormAllAtOnce(sections: any) {
        let wasHit = false

        const bigFormVc = this.Controller(
            'big-form',
            buildBigForm({
                onSubmit: () => {
                    wasHit = true
                },
                schema: buildSchema({
                    id: 'test',
                    fields: {
                        first: {
                            type: 'text',
                        },
                        second: {
                            type: 'text',
                        },
                        third: {
                            type: 'text',
                        },
                    },
                }),
                sections,
            })
        )

        await bigFormVc.jumpToSlide(bigFormVc.getTotalSlides() - 1)
        await interactor.submitForm(bigFormVc)

        assert.isTrue(wasHit)
    }

    @test()
    protected async canClickButtonInRow() {
        const vc = this.Controller('list', {
            rows: [
                {
                    id: 'first',
                    cells: [
                        {
                            button: {
                                id: 'edit',
                                onClick: () => {},
                            },
                        },
                    ],
                },
                {
                    id: 'second',
                    cells: [
                        {
                            button: {
                                id: 'stamp',
                                onClick: () => {},
                            },
                        },
                        {
                            button: {
                                id: 'champ',
                                onClick: () => {},
                            },
                        },
                    ],
                },
            ],
        })

        await assert.doesThrowAsync(() =>
            interactor.clickButtonInRow(vc, 5, 'edit')
        )
        await assert.doesThrowAsync(() =>
            interactor.clickButtonInRow(vc, 0, 'stamp')
        )
        await assert.doesThrowAsync(() =>
            interactor.clickButtonInRow(vc, 0, 'champ')
        )
        await assert.doesThrowAsync(() =>
            interactor.clickButtonInRow(vc, 'first', 'champ')
        )

        await interactor.clickButtonInRow(vc, 0, 'edit')
        await interactor.clickButtonInRow(vc, 'first', 'edit')
        await interactor.clickButtonInRow(vc, 1, 'stamp')
        await interactor.clickButtonInRow(vc, 1, 'champ')
        await interactor.clickButtonInRow(vc, 'second', 'champ')
    }

    @test()
    protected async clickingButtonInRowTriggersCallback() {
        let wasHit = false
        const vc = this.Controller('list', {
            rows: [
                {
                    id: 'first',
                    cells: [
                        {
                            button: {
                                id: 'edit',
                                onClick: () => {
                                    wasHit = true
                                },
                            },
                        },
                    ],
                },
            ],
        })

        await interactor.clickButtonInRow(vc, 'first', 'edit')

        assert.isTrue(wasHit)
    }

    @test()
    protected async canClickButtonsInCard() {
        const badButton = `${new Date().getTime() * Math.random()}`
        const button1Id = `${new Date().getTime() * Math.random()}`
        const button2Id = `${new Date().getTime() * Math.random()}`
        const button3Id = `${new Date().getTime() * Math.random()}`
        const button4Id = `${new Date().getTime() * Math.random()}`

        const vc = this.Controller('card', {
            body: {
                sections: [
                    {
                        buttons: [
                            {
                                id: button1Id,
                                onClick: () => {},
                            },
                            {
                                id: button2Id,
                                onClick: () => {},
                            },
                        ],
                    },
                    {
                        buttons: [
                            {
                                id: button3Id,
                                onClick: () => {},
                            },
                        ],
                    },
                ],
            },

            footer: {
                buttons: [
                    {
                        id: button4Id,
                        onClick: () => {},
                    },
                ],
            },
        })

        await assert.doesThrowAsync(() => interactor.clickButton(vc, badButton))

        await interactor.clickButton(vc, button1Id)
        await interactor.clickButton(vc, button2Id)
        await interactor.clickButton(vc, button3Id)
        await interactor.clickButton(vc, button4Id)
    }

    @test()
    protected async clickingButtonWaitsUntilFinished() {
        const button1Id = `${new Date().getTime() * Math.random()}`
        let wasHit = false
        let lateHit = false

        const vc = this.Controller('card', {
            body: {
                sections: [
                    {
                        buttons: [
                            {
                                id: button1Id,
                                onClick: async () => {
                                    wasHit = true
                                    await new Promise((resolve) =>
                                        setTimeout(resolve, 10)
                                    )
                                    lateHit = true
                                },
                            },
                        ],
                    },
                ],
            },
        })

        const promise = interactor.clickButton(vc, button1Id)
        assert.isFalse(lateHit)
        assert.isTrue(wasHit)

        await promise

        assert.isTrue(lateHit)
    }

    @test()
    protected async submittingFormThatIsDisabledThrows() {
        const formVc = this.Controller(
            'form',
            buildForm({
                shouldRenderSubmitControls: false,
                isEnabled: false,
                schema: {
                    id: 'test',
                    fields: {},
                },
                sections: [],
            })
        )

        await assert.doesThrowAsync(() => interactor.submitForm(formVc))
    }

    private LoginVc() {
        return this.Controller('login-card', {})
    }
}
