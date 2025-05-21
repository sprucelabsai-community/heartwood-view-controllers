import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, generateId, suite, test } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import buttonAssert from '../../../tests/utilities/buttonAssert'
import { Button, CardViewController } from '../../../types/heartwood.types'
import { ButtonGroupViewControllerOptions } from '../../../viewControllers/ButtonGroup.vc'
import { testFormSchema } from '../forms/testFormOptions'

@suite()
export default class AssertingButtonsTest extends AbstractViewControllerTest {
    private vc!: CardViewController
    @test()
    protected assertCardRendersButtonsThrowsWhenMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => buttonAssert.cardRendersButtons())

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'ids'],
        })
    }

    @test()
    protected returnsStubButtonVc() {
        const btnVc = this.assertRendersButton()
        assert.isTruthy(btnVc)
    }

    @test()
    protected hasRenderMethod() {
        const btnVc = this.assertRendersButton()
        assert.isFunction(btnVc.render)
    }

    @test(
        'renders expected button 1',
        [
            {
                id: 'test',
            },
        ],
        'test'
    )
    @test(
        'renders expected button 2',
        [
            {
                id: 'test',
            },
            {
                id: 'test2',
                label: 'go team!',
            },
        ],
        'test2'
    )
    protected renderReturnsButtonModel(buttons: Button[], idToCheck: string) {
        const btnVc = this.assertRendersButton(buttons, idToCheck)
        const model = this.render(btnVc)
        const match: any = buttons.find((b) => b.id === idToCheck)

        assert.isEqualDeep(model, match)
    }

    @test(`can find 2 buttons`, ['first', 'third'])
    @test(`can find 3 buttons`, ['first', 'third', 'fourth'])
    protected canFindManyButtons(toCheckIds: string[]) {
        this.vc = this.Vc([
            {
                id: 'first',
            },
            {
                id: 'second',
            },
            {
                id: 'third',
            },
            {
                id: 'fourth',
            },
        ])

        const buttonVcs = buttonAssert.cardRendersButtons(this.vc, toCheckIds)
        assert.isLength(buttonVcs, toCheckIds.length)
    }

    @test()
    protected laterModelRendersAsExpected() {
        const vc = this.Vc([
            {
                id: 'first',
            },
            {
                id: 'second',
                label: 'Waka',
            },
        ])

        const [, secondBtnVc] = buttonAssert.cardRendersButtons(vc, [
            'first',
            'second',
        ])

        const model = this.render(secondBtnVc)

        assert.isEqualDeep(model, { id: 'second', label: 'Waka' })
    }

    @test()
    protected knowsWhenButtonIsDisabledOrEnabled() {
        const id = generateId()
        const id2 = generateId()

        this.vc = this.Vc([
            {
                id,
            },
            {
                id: id2,
                isEnabled: false,
            },
        ])

        assert.doesThrow(
            () => buttonAssert.buttonIsDisabled(this.vc, generateId()),
            'missing buttons'
        )

        assert.doesThrow(
            () => buttonAssert.buttonIsEnabled(this.vc, generateId()),
            'missing buttons'
        )

        assert.doesThrow(
            () => buttonAssert.buttonIsDisabled(this.vc, id),
            'not disabled'
        )

        assert.doesThrow(
            () => buttonAssert.buttonIsEnabled(this.vc, id2),
            'not enabled'
        )

        buttonAssert.buttonIsDisabled(this.vc, id2)
        buttonAssert.buttonIsEnabled(this.vc, id)
    }

    @test()
    protected async knowsIfButtonIsSelected() {
        const selectedId1 = generateId()
        const id2 = generateId()

        this.vc = this.Vc([
            {
                id: 'button-1',
                isSelected: true,
            },
            {
                id: 'button-2',
                isSelected: false,
            },
            {
                id: selectedId1,
                isSelected: true,
            },
            {
                id: id2,
                isSelected: false,
            },
        ])

        this.assertButtonIsSelected('button-1')
        assert.doesThrow(() => this.assertButtonIsSelected('button-2'))
        this.assertButtonIsSelected(selectedId1)
        assert.doesThrow(() => this.assertButtonIsSelected(id2))
    }

    @test('can find button if in form 1', 'test', 'cheesy')
    @test('can find button if in form 2', 'test2', 'burrito')
    protected async canFindButtonIfItsInAForm(
        buttonId: string,
        buttonId2: string
    ) {
        const formVc = this.Controller(
            'form',
            buildForm({
                schema: testFormSchema,
                sections: [],
                footer: {
                    buttons: [
                        { id: buttonId, label: 'Go!' },
                        { id: buttonId2, label: 'Go!' },
                    ],
                },
            })
        )

        this.vc = this.Controller('card', {
            body: {
                sections: [
                    {
                        form: formVc.render(),
                    },
                ],
            },
        })

        buttonAssert.cardRendersButton(this.vc, buttonId)
        buttonAssert.cardRendersButton(this.vc, buttonId2)

        assert.doesThrow(() =>
            buttonAssert.cardRendersButton(this.vc, generateId())
        )
    }

    @test()
    protected async throwsWhenNoButtonGroupFound() {
        this.vc = this.Controller('card', {})
        this.assertThrowsBecauseNoButtonGroup()
        this.vc = this.Vc([{ id: 'test' }])
        this.assertThrowsBecauseNoButtonGroup()
    }

    @test()
    protected async canFindButtonGroup() {
        const buttonGroup = this.ButtonGroup()
        this.vc = this.Vc(buttonGroup.render())
        this.assertCardRendersButtonGroup()
    }

    @test()
    protected async canFindButtonGroupInSecondSection() {
        const buttonGroup = this.ButtonGroup()
        this.vc = this.Controller('card', {
            body: {
                sections: [
                    {},
                    {
                        buttons: buttonGroup.render(),
                    },
                ],
            },
        })

        const actual = buttonAssert.cardRendersButtonGroup(this.vc)
        assert.isEqual(actual, buttonGroup)
    }

    @test()
    protected async canAssertIsMultiSelect() {
        assert.doesThrow(() =>
            buttonAssert.buttonGroupIsMultiSelect(this.ButtonGroup())
        )
        buttonAssert.buttonGroupIsMultiSelect(
            this.ButtonGroup({ shouldAllowMultiSelect: true })
        )
    }

    private ButtonGroup(options?: Partial<ButtonGroupViewControllerOptions>) {
        return this.Controller('button-group', {
            buttons: [{ id: 'test' }],
            ...options,
        })
    }

    private assertCardRendersButtonGroup() {
        buttonAssert.cardRendersButtonGroup(this.vc)
    }

    private assertThrowsBecauseNoButtonGroup() {
        assert.doesThrow(() => buttonAssert.cardRendersButtonGroup(this.vc))
    }

    private assertButtonIsSelected(id: string) {
        buttonAssert.buttonIsSelected(this.vc, id)
    }

    private assertRendersButton(buttons?: Button[], idToCheck = 'test') {
        this.vc = this.Vc(buttons)
        const btnVc = buttonAssert.cardRendersButton(this.vc, idToCheck)

        return btnVc
    }

    private Vc(
        buttons:
            | SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[]
            | undefined
    ) {
        return this.Controller('card', {
            body: {
                sections: [
                    {
                        buttons: buttons ?? [
                            {
                                id: 'test',
                            },
                        ],
                    },
                ],
            },
        })
    }
}
