import { buildSchema } from '@sprucelabs/schema'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import formAssert from '../../../tests/utilities/formAssert'
import interactor from '../../../tests/utilities/interactor'
import { FormSection, InputButton } from '../../../types/heartwood.types'
import FormViewController from '../../../viewControllers/form/Form.vc'

@suite()
export default class InputButtonsTest extends AbstractViewControllerTest {
    private formVc!: FormViewController<FormSchema>

    @test('throws with no right button 1', 'firstname')
    @test('throws with no right button 2', 'lastName')
    protected async throwsWithNoRigthButton(fieldName: any) {
        this.setupForm([
            {
                fields: [fieldName],
            },
        ])

        this.assertThrowsNoRightButtons(fieldName)
    }

    @test()
    protected async passesWithButton() {
        this.assertPassesWithButtons([
            {
                lineIcon: 'add',
                onClick: () => {},
            },
        ])
    }

    @test()
    protected async mustHaveAtLeastOneButton() {
        this.setupForm([
            {
                fields: [
                    {
                        name: 'firstName',
                        rightButtons: [],
                    },
                ],
            },
        ])

        this.assertThrowsNoRightButtons('firstName')
    }

    @test()
    protected async passesWithMoreThanOneRightButton() {
        this.assertPassesWithButtons([
            {
                lineIcon: 'add',
                onClick: () => {},
            },
            {
                lineIcon: 'add-circle',
                onClick: () => {},
            },
        ])
    }

    @test()
    protected async failsIfCantFindById() {
        this.setupFormWithbuttons([{ lineIcon: 'add', onClick: () => {} }])
        assert.doesThrow(() =>
            this.assertRendersRightButtonsForField('firstName', 'test')
        )
    }

    @test()
    protected async passesIfCanFindById() {
        const id = generateId()
        this.setupFormWithbuttons([{ lineIcon: 'add', onClick: () => {}, id }])
        this.assertRendersRightButtonsForField('firstName', id)
    }

    @test()
    protected async canFindLaterButton() {
        const id = generateId()
        this.setupFormWithbuttons([
            { lineIcon: 'add-square', onClick: () => {} },
            { lineIcon: 'add', onClick: () => {}, id },
        ])

        this.assertRendersRightButtonsForField('firstName', id)
    }

    @test()
    protected async clickingThrowsOnBadButton() {
        this.setupFormWithbuttons([
            { lineIcon: 'add-square', onClick: () => {} },
            { lineIcon: 'add', onClick: () => {} },
        ])

        await assert.doesThrowAsync(() =>
            interactor.clickInputButton(this.formVc, 'firstName', 'test')
        )
    }

    @test()
    protected async clicksOnFirstButton() {
        const id = generateId()
        const id2 = generateId()

        let hit1 = false
        let hit2 = false

        this.setupFormWithbuttons([
            {
                lineIcon: 'add-square',
                onClick: () => {
                    hit1 = true
                },
                id,
            },
            {
                lineIcon: 'add',
                onClick: () => {
                    hit2 = true
                },
                id: id2,
            },
        ])

        await interactor.clickInputButton(this.formVc, 'firstName', id)
        assert.isTrue(hit1)
        await interactor.clickInputButton(this.formVc, 'firstName', id2)
        assert.isTrue(hit2)
    }

    @test()
    protected async canClickDifferentField() {
        let wasHit = false
        this.setupForm([
            {
                fields: [
                    {
                        name: 'lastName',
                        rightButtons: [
                            {
                                id: 'test',
                                lineIcon: 'add',
                                onClick: () => {
                                    wasHit = true
                                },
                            },
                        ],
                    },
                ],
            },
        ])

        await interactor.clickInputButton(this.formVc, 'lastName', 'test')
        assert.isTrue(wasHit)
    }

    private assertPassesWithButtons(rightButtons: InputButton[]) {
        this.setupFormWithbuttons(rightButtons)
        this.assertRendersRightButtonsForField('firstName')
    }

    private setupFormWithbuttons(rightButtons: InputButton[]) {
        this.setupForm([
            {
                fields: [
                    {
                        name: 'firstName',
                        rightButtons,
                    },
                ],
            },
        ])
    }

    private assertRendersRightButtonsForField(fieldName: string, id?: string) {
        formAssert.fieldRendersInputButton(this.formVc, fieldName, id)
    }

    private assertThrowsNoRightButtons(fieldName: any, id?: string) {
        assert.doesThrow(
            () =>
                formAssert.fieldRendersInputButton(this.formVc, fieldName, id),
            'rightButtons'
        )
    }

    private setupForm(sections: FormSection<FormSchema>[]) {
        this.formVc = this.Controller(
            'form',
            buildForm({
                id: 'testForm1',
                sections,
                schema: formSchema,
            })
        )
    }
}

const formSchema = buildSchema({
    id: 'testForm',
    fields: {
        firstName: {
            type: 'text',
        },
        lastName: {
            type: 'text',
        },
    },
})

type FormSchema = typeof formSchema
