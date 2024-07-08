import { NumberFieldDefinition, Schema } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test-utils'
import { formBuilderFieldTypes } from '../../../constants'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import formAssert from '../../../tests/utilities/formAssert'
import interactor from '../../../tests/utilities/interactor'
import { FieldRenderOptions } from '../../../types/heartwood.types'
import EditFormBuilderFieldCardViewController from '../../../viewControllers/formBuilder/EditFormBuilderFieldCard.vc'

export default class AddingARatingsFieldTest extends AbstractViewControllerTest {
    private static editFieldVc: EditFormBuilderFieldCardViewController

    protected static controllerMap = {
        'edit-form-builder-field': EditFormBuilderFieldCardViewController,
    }
    private static submittedField?: {
        fieldDefinition: NumberFieldDefinition
        renderOptions: FieldRenderOptions<Schema>
    }

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        delete this.submittedField

        this.editFieldVc = this.Controller('edit-form-builder-field', {
            name: 'test',
            field: {
                type: 'number',
                label: 'My Field',
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
                },
            },
        })
    }

    @test()
    protected static async hasRatingsField() {
        assert.isEqual(formBuilderFieldTypes.ratings, 'Ratings')
    }

    @test()
    protected static async editFieldSelectExpectedType() {
        assert.isEqual(this.editFieldFormVc.getValue('type'), 'ratings')
    }

    @test()
    protected static async editFormRendersExpectedFieldsWhenSelectingRating() {
        formAssert.formRendersFields(this.editFieldFormVc, [
            'steps',
            'leftLabel',
            'rightLabel',
            'middleLabel',
            'icon',
        ])
    }

    @test()
    protected static async returnsRenderAsOptionsWhenSaving() {
        await this.editFieldFormVc.setValues({
            steps: 5,
        })

        await interactor.submitForm(this.editFieldFormVc)

        assert.isEqualDeep(this.submittedField?.fieldDefinition, {
            type: 'number',
        })
    }

    private static get editFieldFormVc() {
        return this.editFieldVc.getFormVc()
    }
}
