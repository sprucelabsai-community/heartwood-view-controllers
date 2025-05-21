import { NumberFieldDefinition, Schema } from '@sprucelabs/schema'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import { formBuilderFieldTypes } from '../../../constants'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import formAssert from '../../../tests/utilities/formAssert'
import interactor from '../../../tests/utilities/interactor'
import {
    FieldRenderOptions,
    RatingsInputComponent,
} from '../../../types/heartwood.types'
import EditFormBuilderFieldCardViewController from '../../../viewControllers/formBuilder/EditFormBuilderFieldCard.vc'

@suite()
export default class AddingARatingsFieldTest extends AbstractViewControllerTest {
    private editFieldVc!: EditFormBuilderFieldCardViewController
    private label!: string

    protected controllerMap = {
        'edit-form-builder-field': EditFormBuilderFieldCardViewController,
    }
    private submittedField?: {
        fieldDefinition: NumberFieldDefinition
        renderOptions: FieldRenderOptions<Schema>
    }

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()

        this.label = generateId()
        delete this.submittedField

        this.editFieldVc = this.EditFieldVc()
    }

    @test()
    protected async hasRatingsField() {
        assert.isEqual(formBuilderFieldTypes.ratings, 'Ratings')
    }

    @test()
    protected async editFieldSelectExpectedType() {
        assert.isEqual(this.editFieldFormVc.getValue('type'), 'ratings')
    }

    @test()
    protected async editFormRendersExpectedFieldsWhenSelectingRating() {
        formAssert.formRendersFields(this.editFieldFormVc, [
            'steps',
            'leftLabel',
            'rightLabel',
            'middleLabel',
            'icon',
        ])
    }

    @test()
    protected async returnsRenderAsOptionsWhenSettingOnlySteps() {
        await this.setValue('steps', 5)
        await this.submitForm()

        assert.isEqualDeep(this.submittedField?.fieldDefinition, {
            type: 'number',
            label: this.label,
            isRequired: false,
        })

        this.assertRenderAs({
            type: 'ratings',
            steps: 5,
        })
    }

    @test()
    protected async passesBackCorrectLeftLabel() {
        const label = generateId()
        await this.setValue('leftLabel', label)
        await this.submitForm()

        this.assertRenderAs({
            type: 'ratings',
            leftLabel: label,
        })
    }

    @test()
    protected async canSetABunchOfThingsAndGetBackExpectedRenderAs() {
        await this.setValue('steps', 10)
        await this.setValue('leftLabel', 'left')
        await this.setValue('rightLabel', 'right')
        await this.setValue('middleLabel', 'middle')
        await this.setValue('icon', 'star')

        await this.submitForm()

        this.assertRenderAs({
            type: 'ratings',
            steps: 10,
            leftLabel: 'left',
            rightLabel: 'right',
            middleLabel: 'middle',
            icon: 'star',
        })
    }

    @test('can start with steps at 10', 10)
    @test('can start with steps at 20', 20)
    protected async renderAsOptionsPopulateForm(steps: number) {
        this.editFieldVc = this.EditFieldVc({
            steps,
        })

        this.assertFieldEquals('steps', steps)
    }

    @test()
    protected async canSetStartingLeftLabel() {
        const leftLabel = generateId()
        this.editFieldVc = this.EditFieldVc({
            leftLabel,
        })

        this.assertFieldEquals('leftLabel', leftLabel)
    }

    @test()
    protected async canSetMultipleToStart() {
        const leftLabel = generateId()
        const rightLabel = generateId()
        const middleLabel = generateId()
        const icon = 'star'

        this.editFieldVc = this.EditFieldVc({
            leftLabel,
            rightLabel,
            middleLabel,
            icon,
        })

        this.assertFieldEquals('leftLabel', leftLabel)
        this.assertFieldEquals('rightLabel', rightLabel)
        this.assertFieldEquals('middleLabel', middleLabel)
        this.assertFieldEquals('icon', icon)
    }

    private assertFieldEquals(
        field: keyof RatingsInputComponent,
        expected: number | string
    ) {
        assert.isEqual(this.editFieldFormVc.getValue(field), expected)
    }

    private EditFieldVc(
        renderAs?: Partial<RatingsInputComponent>
    ): EditFormBuilderFieldCardViewController {
        return this.Controller('edit-form-builder-field', {
            name: 'test',
            field: {
                type: 'number',
                label: this.label,
                isRequired: false,
            },
            onDone: (fieldDefinition, renderOptions) => {
                this.submittedField = {
                    fieldDefinition: fieldDefinition as NumberFieldDefinition,
                    renderOptions,
                }
            },
            renderOptions: {
                renderAs: {
                    type: 'ratings',
                    ...renderAs,
                },
            },
        })
    }

    private async submitForm() {
        await interactor.submitForm(this.editFieldFormVc)
    }

    private assertRenderAs(renderAs: RatingsInputComponent) {
        assert.isEqualDeep(this.submittedField?.renderOptions, {
            //@ts-ignore
            name: 'test',
            renderAs,
        })
    }

    private async setValue(
        name: keyof RatingsInputComponent,
        value: number | string
    ) {
        await this.editFieldFormVc.setValue(name, value)
    }

    private get editFieldFormVc() {
        return this.editFieldVc.getFormVc()
    }
}
