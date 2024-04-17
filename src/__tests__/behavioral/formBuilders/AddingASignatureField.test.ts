import { IFieldDefinition, buildSchema } from '@sprucelabs/schema'
import { test, assert, generateId } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import { FormBuilderFieldType, formBuilderFieldTypes } from '../../../constants'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import vcAssert from '../../../tests/utilities/vcAssert'
import { FieldRenderOptions, FormBuilder } from '../../../types/heartwood.types'
import EditFormBuilderFieldCardViewController from '../../../viewControllers/formBuilder/EditFormBuilderFieldCard.vc'
import EditFormBuilderSectionCardViewController, {
    SimpleSection,
} from '../../../viewControllers/formBuilder/EditFormBuilderSectionCard.vc'
import FormBuilderCardViewController from '../../../viewControllers/formBuilder/FormBuilderCard.vc'

export default class AddingASignatureFieldTest extends AbstractViewControllerTest {
    protected static controllerMap = {
        'edit-form-builder-field': EditFormBuilderFieldCardViewController,
        'form-builder-card': FormBuilderCardViewController,
    }

    private static passedOptions: IFieldDefinition | undefined
    private static passedRenderOptions:
        | FieldRenderOptions<any>
        | undefined
        | null
    private static editFieldVc: EditFormBuilderFieldCardViewController
    private static builderVc: FormBuilderCardViewController
    private static editSectionVc: EditFormBuilderSectionCardViewController

    protected static async beforeEach() {
        await super.beforeEach()
        this.passedOptions = undefined
        this.passedRenderOptions = undefined

        this.resetEditFieldVc('sig', {
            type: 'text',
        })

        this.builderVc = this.Controller('form-builder-card', {
            shouldAllowEditing: true,
        })

        await this.builderVc.importObject(builtTestForm)
    }

    @test()
    protected static async hasSignatureAsPartOffFieldTypes() {
        assert.isEqual(formBuilderFieldTypes.signature, 'Signature')
    }

    @test()
    protected static async passesBackRenderAsOptionsWhenEditingField() {
        const name = generateId()

        this.resetEditFieldVc(name, {
            type: 'text',
        })

        await this.selectTypeAndSave('signature')

        assert.isEqual(this.passedOptions?.type, 'image')
        assert.isEqualDeep(this.passedRenderOptions, {
            name: name as never,
            renderAs: 'signature',
        })
    }

    @test()
    protected static async didNotBreakRenderOptionsForOtherFields() {
        await this.selectTypeAndSave('text')
        assert.isEqualDeep(this.passedRenderOptions, { name: 'sig' })
    }

    @test()
    protected static async editFieldVcSelectsSignatureFieldOnTheWayIn() {
        this.resetEditFieldVc(
            'signature',
            {
                type: 'image',
            },
            {
                renderAs: 'signature',
            }
        )
        assert.isEqual(this.editFieldFormVc.getValue('type'), 'signature')
    }

    @test()
    protected static async selectsImageFieldWithoutRenderOptions() {
        this.resetEditFieldVc(
            'signatuer',
            {
                type: 'image',
            },
            {}
        )
        assert.isEqual(this.editFieldFormVc.getValue('type'), 'image')
    }

    @test()
    protected static async signatureRenderOptionsPassedBackFromEdit() {
        await this.clickEditField('toSignature')
        await this.selectNewFieldTypeAndSubmit('signature')
        const field = this.getFieldFromBuilder('toSignature')

        assert.isEqual(field.type, 'image')
        assert.isEqualDeep(field.renderOptions, {
            renderAs: 'signature',
            name: 'toSignature',
        })
    }

    @test()
    protected static async switchingFromSignatureRemovesRenderAs() {
        await this.clickEditField('fromSignature')
        await this.selectNewFieldTypeAndSubmit('text')

        const field = this.getFieldFromBuilder('fromSignature')

        assert.isEqual(field.type, 'text')
        assert.isEqualDeep(field.renderOptions, {
            name: 'fromSignature',
        })
    }

    @test()
    protected static async renderOptionsPassedToEditFieldVc() {
        await this.clickEditField('fromSignature')
        const values = this.editFieldFormVc.getValues()
        assert.isEqual(values.type, 'signature')
    }

    @test()
    protected static async selectingSignatureFieldFromEditSectionSetsRenderOptions() {
        let passedSection: SimpleSection | undefined
        this.editSectionVc = this.builderVc.EditSectionVc({
            onDone: (section) => {
                passedSection = section
            },
        })

        const firstRow = this.getFirstRowOfEditSectionFieldList()

        await firstRow.setValue('fieldType', 'signature')

        await this.submitEditSectionForm()

        assert.isEqualDeep(passedSection?.fields, [
            {
                type: 'image',
                label: 'Field 1',
                renderOptions: {
                    name: 'field1' as never,
                    renderAs: 'signature',
                },
            },
        ])
    }

    @test()
    protected static async editSectionVcSelectsSignatureFieldOnTheWayIn() {
        let passedSection: SimpleSection | undefined

        this.editSectionVc = this.builderVc.EditSectionVc({
            editingSection: {
                title: generateId(),
                type: 'form',
                fields: [
                    {
                        type: 'image',
                        label: 'Signature',
                        renderOptions: {
                            name: 'field1' as never,
                            renderAs: 'signature',
                        },
                    },
                ],
            },
            onDone: (section) => {
                passedSection = section
            },
        })

        const firstRow = this.getFirstRowOfEditSectionFieldList()
        assert.isEqual(firstRow.getValue('fieldType'), 'signature')

        await this.submitEditSectionForm()

        assert.isEqualDeep(passedSection?.fields, [
            {
                type: 'image',
                label: 'Signature',
                renderOptions: {
                    name: 'field1' as never,
                    renderAs: 'signature',
                },
            },
        ])
    }

    @test()
    protected static async addingSignatureFieldToFormUpdatesSchemaAndSectionAsExpected() {
        const formVc = this.Controller(
            'form',
            buildForm({
                schema: signatureTestSchema,
                sections: [{ title: 'Section 1', fields: [] }],
            })
        )

        formVc.addFields({
            sectionIdx: 0,
            fields: {
                newSignatureField: {
                    type: 'image',
                    label: 'Signature',
                    renderOptions: {
                        renderAs: 'signature',
                    },
                },
            },
        })

        const schema = formVc.getSchema()
        const newSigField = schema.fields.newSignatureField
        assert.isEqualDeep(newSigField, {
            type: 'image',
            label: 'Signature',
        })

        const section = formVc.getSection(0)
        assert.isEqualDeep(section.fields, [
            {
                name: 'newSignatureField',
                renderAs: 'signature',
            },
        ])
    }

    private static async submitEditSectionForm() {
        await interactor.submitForm(this.editSectionVc.getFormVc())
    }

    private static getFirstRowOfEditSectionFieldList() {
        const listVc = this.editSectionVc.getFieldListVc()
        const firstRow = listVc.getRowVc(0)
        return firstRow
    }

    private static getFieldFromBuilder(fieldName: string) {
        const pageVc = this.builderVc.getPresentPageVc()
        const field = pageVc.getField(fieldName as never) as any
        return field
    }

    private static async selectNewFieldTypeAndSubmit(type: string) {
        await this.selectNewFieldType(type)
        await this.submitEditFieldForm()
    }

    private static async clickEditField(fieldName: string) {
        const dlg = await vcAssert.assertRendersDialog(this.builderVc, () =>
            this.builderVc.handleClickEditField(fieldName)
        )

        this.editFieldVc = vcAssert.assertRendersAsInstanceOf(
            dlg.getCardVc(),
            EditFormBuilderFieldCardViewController
        )
    }

    private static async selectTypeAndSave(type: FormBuilderFieldType) {
        await this.selectNewFieldType(type)
        await this.submitEditFieldForm()
    }

    private static async submitEditFieldForm() {
        await interactor.submitForm(this.editFieldFormVc)
    }

    private static get editFieldFormVc() {
        return this.editFieldVc.getFormVc()
    }

    private static async selectNewFieldType(type: string) {
        await this.editFieldFormVc.setValue('type', type)
    }

    private static resetEditFieldVc(
        name: string,
        definition: IFieldDefinition,
        renderOptions?: Partial<FieldRenderOptions<any>>
    ) {
        this.editFieldVc = this.Controller('edit-form-builder-field', {
            name,
            field: definition as any,
            renderOptions,
            onDone: (options, renderOptions) => {
                this.passedOptions = options
                this.passedRenderOptions = renderOptions
            },
        })
    }
}

const signatureTestSchema = buildSchema({
    id: 'addingSigFieldTestForm1',
    fields: {
        toSignature: {
            type: 'text',
        },
        fromSignature: {
            type: 'image',
        },
    },
})

type SigFieldAsTextSchema = typeof signatureTestSchema

const builtTestForm: FormBuilder<SigFieldAsTextSchema> = {
    title: generateId(),
    pages: [
        {
            schema: signatureTestSchema,
            title: generateId(),
            sections: [
                {
                    fields: [
                        'toSignature',
                        { name: 'fromSignature', renderAs: 'signature' },
                    ],
                },
            ],
        },
    ],
}
