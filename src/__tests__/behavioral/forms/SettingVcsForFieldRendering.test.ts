import { buildSchema, cloneDeep, SchemaFieldNames } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import formAssert from '../../../tests/utilities/formAssert'
import interactor from '../../../tests/utilities/interactor'
import {
    FormInputHandlers,
    FormInputOptions,
    FormInputViewController,
    TriggerRenderHandler,
    ViewControllerOptions,
} from '../../../types/heartwood.types'
import FormViewController, {
    FormViewControllerOptions,
} from '../../../viewControllers/form/Form.vc'
import SpyTextFieldInput from './SpyTextFieldInput'

class EmailSpyTextFieldInput extends SpyTextFieldInput {}

//@ts-ignore
class NoRenderedValueValueMethods
    implements FormInputViewController<TextInput>
{
    public model!: FormInputOptions
    private getValueHandler!: () => any
    private setValueHandler!: (value: any) => Promise<void>

    public constructor(options: ViewControllerOptions & FormInputOptions) {
        this.model = options
    }

    public setHandlers(options: FormInputHandlers<TextInput>): void {
        const { getValue, setValue } = options
        this.getValueHandler = getValue
        this.setValueHandler = setValue
    }

    public async setValue(value: any): Promise<void> {
        await this.setValueHandler(value)
    }

    public getValue() {
        return this.getValueHandler()
    }

    public render() {
        return {} as any
    }

    public triggerRender() {}

    public setTriggerRenderHandler(handler: TriggerRenderHandler) {
        this.triggerRender = handler
    }
}

@suite()
export default class SettingVcsForFieldRenderingTest extends AbstractViewControllerTest {
    protected controllerMap = {
        textInput: SpyTextFieldInput,
        noRenderedValue: NoRenderedValueValueMethods,
    }
    private formVc!: FormViewController<FormSchema>
    private firstNameVc!: SpyTextFieldInput
    private emailVc!: EmailSpyTextFieldInput

    protected async beforeEach() {
        await super.beforeEach()

        this.firstNameVc = this.SpyInputVc()
        this.emailVc = this.SpyInputVc()

        this.formVc = this.FormVc()

        //@ts-ignore
        formAssert._setVcFactory(this.Factory())
    }

    @test('throws when vc not found 1', 'lastName')
    @test('throws when vc not found 2', 'age')
    protected cantGetFieldVcWhenNoVcSet(fieldName: any) {
        const err = assert.doesThrow(() => this.formVc.getFieldVc(fieldName))
        errorAssert.assertError(err, 'NO_FIELD_VC_SET', {
            fieldName,
        })
    }

    @test()
    protected async passesWhenFieldVcSet() {
        const vc = this.formVc.getFieldVc('firstName')
        assert.isEqual(vc, this.firstNameVc)

        const vc2 = this.formVc.getFieldVc('email')
        assert.isEqual(vc2, this.emailVc)
    }

    @test()
    protected async settingValueOnFormCallsSetValueOnFieldVc() {
        const value = generateId()
        await this.formVc.setValue('firstName', value)
        assert.isEqual(this.firstNameVc.getValue(), value)
    }

    @test()
    protected async assertRequiresGetAndSetValues() {
        await assert.doesThrowAsync(
            //@ts-ignore
            () => formAssert.inputVcIsValid(this.Controller('card', {})),
            'getValue'
        )

        //@ts-ignore
        this.firstNameVc.setValue = () => {}

        await assert.doesThrowAsync(
            //@ts-ignore
            () => formAssert.inputVcIsValid(this.firstNameVc),
            'setValueHandler'
        )

        //@ts-ignore
        this.firstNameVc.setValue = 0

        await assert.doesThrowAsync(
            //@ts-ignore
            () => formAssert.inputVcIsValid(this.firstNameVc),
            'setValue'
        )
    }

    @test('form decorates set value 1', 'new value')
    @test('form decorates set value 2', 'another value')
    protected async formDecoratesSetValueOnVc(
        name: SchemaFieldNames<FormSchema>,
        value: string
    ) {
        await this.firstNameVc.setValue(value)
        assert.isEqual(this.formVc.getValue('firstName'), value)

        await this.emailVc.setValue(value)
        assert.isEqual(this.formVc.getValue('email'), value)
    }

    @test()
    protected async formVcCanStillSetRenderedValue() {
        const rendered = generateId()
        await this.firstNameVc.setValue('hey', rendered)
        assert.isEqual(this.firstNameVc.renderedValue, rendered)
    }

    @test()
    protected async settingValueDoesNotClearRenderedValue() {
        await this.firstNameVc.setRenderedValue('hey!')
        await this.formVc.setValue('firstName', 'waka')
        assert.isEqual(this.firstNameVc.renderedValue, 'hey!')
    }

    @test('setting value from from model sets rendered value 1', generateId())
    @test('setting value from from model sets rendered value 2', '')
    protected async settingValueFromFormModelWithRenderedDoesNotDirtyForm(
        value: string
    ) {
        await this.firstNameVc.setRenderedValue(value)

        const model = this.render(this.formVc)

        const renderedValue = generateId()

        model.setValue('firstName', renderedValue)
        await this.wait(1)

        assert.isEqual(this.firstNameVc.renderedValue, renderedValue)
        assert.isUndefined(this.firstNameVc.value)
        assert.isUndefined(this.formVc.getValue('firstName'))
        assert.isFalse(this.formVc.getIsDirty())
    }

    @test()
    protected async assertSetsGetsValuesToViewModel() {
        const vc = this.Controller('card', {})
        //@ts-ignore
        vc.setValue = () => {}
        //@ts-ignore
        vc.getValue = () => {}

        await assert.doesThrowAsync(
            //@ts-ignore
            () => formAssert.inputVcIsValid(vc),
            'setHandlers'
        )

        this.firstNameVc.getValue = () => 'hey'

        await assert.doesThrowAsync(
            () => formAssert.inputVcIsValid(this.firstNameVc),
            `this.getValueHandler()`
        )
    }

    @test()
    protected async throwsWithNoRenderedValueGetSet() {
        const vc = this.Controller(
            'noRenderedValue' as any,
            {}
        ) as NoRenderedValueValueMethods

        await assert.doesThrowAsync(
            //@ts-ignore
            () => formAssert.inputVcIsValid(vc),
            `getRenderedValue`
        )

        //@ts-ignore
        vc.getRenderedValue = () => {}

        await assert.doesThrowAsync(
            //@ts-ignore
            () => formAssert.inputVcIsValid(vc),
            `setRenderedValue`
        )
    }

    @test()
    protected async settingRenderedValueToNullRestoresFormModelSetValueBehavior() {
        await this.firstNameVc.setRenderedValue(null)
        const model = this.render(this.formVc)
        model.setValue('firstName', 'hey')
        await this.wait(1)
        assert.isEqual(this.formVc.getValue('firstName'), 'hey')
    }

    @test()
    protected async dirtySetAsExpectedWhenSettingValueOnField() {
        await this.emailVc.setValue('waka awka')
        assert.isTrue(this.formVc.getIsDirty())
    }

    @test()
    protected async focusAndBlurHandlersCalled() {
        let wasBlurHit = false
        let wasFocusHit = false

        this.emailVc = this.SpyInputVc({
            onBlur: () => {
                wasBlurHit = true
            },
            onFocus: () => {
                wasFocusHit = true
            },
        })

        this.FormVc()

        assert.isFalse(wasBlurHit)
        assert.isFalse(wasFocusHit)

        await interactor.focus(this.emailVc)

        assert.isFalse(wasBlurHit)
        assert.isTrue(wasFocusHit)

        await interactor.blur(this.emailVc)

        assert.isTrue(wasBlurHit)
        assert.isTrue(wasFocusHit)
    }

    @test()
    protected assertionThrowsWhenFormFieldDoesNotExist() {
        assert.doesThrow(
            () =>
                formAssert.formFieldRendersUsingInputVc(
                    this.formVc,
                    generateId(),
                    this.firstNameVc
                ),
            'not find'
        )

        assert.doesThrow(
            () =>
                formAssert.fieldRendersUsingInstanceOf(
                    this.formVc,
                    generateId(),
                    SpyTextFieldInput
                ),
            'not find'
        )
    }

    @test()
    protected assertionFailsIfVcIsNotBeingUsed() {
        assert.doesThrow(
            () =>
                formAssert.formFieldRendersUsingInputVc(
                    this.formVc,
                    'firstName',
                    this.emailVc
                ),
            'did not render'
        )

        assert.doesThrow(
            () =>
                formAssert.fieldRendersUsingInstanceOf(
                    this.formVc,
                    'firstName',
                    EmailSpyTextFieldInput
                ),
            'did not render'
        )
    }

    @test()
    protected async passesWhenFieldVcMatches() {
        formAssert.formFieldRendersUsingInputVc(
            this.formVc,
            'firstName',
            this.firstNameVc
        )
    }

    @test()
    protected async renderedValueOfInputPassedToForm() {
        const rendered = generateId()

        this.firstNameVc = this.SpyInputVc({
            renderedValue: rendered,
        })

        this.formVc = this.FormVc()

        assert.isEqual(
            this.formVc.getFieldVc('firstName').getRenderedValue(),
            rendered
        )
    }

    @test()
    protected async vcGetsInitialValueFromForm() {
        const firstName = generateId()
        this.formVc = this.FormVc({
            firstName,
        })

        assert.isEqual(this.firstNameVc.getValue(), firstName)
    }

    @test()
    protected async settingValueOnFormFiresChangeOnField() {
        let wasHit = false

        this.firstNameVc = this.SpyInputVc({
            onChange: () => {
                wasHit = true
            },
        })

        this.formVc = this.FormVc()

        await this.formVc.setValue('firstName', 'hey')

        assert.isTrue(wasHit)
    }

    @test()
    protected async willChangeOnlyFiredOnceWhenSettingValue() {
        let hitCount = 0
        this.formVc = this.FormVc(
            {},
            {
                onWillChange: () => {
                    hitCount++
                },
            }
        )

        await this.formVc.setValue('firstName', 'hey')
        assert.isEqual(hitCount, 1)
    }

    @test()
    protected async valueOnFieldNotPassedToFormSchema() {
        this.firstNameVc = this.SpyInputVc({ value: 'there' })
        this.formVc = this.FormVc({
            firstName: 'hey',
        })

        const schema = this.formVc.getSchema()

        //@ts-ignore
        assert.isFalsy(schema.fields.firstName.value)
    }

    @test()
    protected async settingRenderedValueDoesNotTriggerFormChange() {
        let hitCount = 0
        this.formVc = this.FormVc(
            {},
            {
                onChange: () => {
                    hitCount++
                },
            }
        )

        const { setValue } = this.render(this.formVc)

        await this.firstNameVc.setRenderedValue('hey')
        setValue('firstName', generateId())
        await this.wait(1)
        assert.isEqual(hitCount, 0)
    }

    @test()
    protected async settingFieldVcDoesNotAddToSchema() {
        const schema = this.formVc.getSchema()
        assert.isEqualDeep(schema, formSchema)
    }

    @test()
    protected async settingValueToNullClearsRenderedValue() {
        this.formVc = this.FormVc({
            firstName: 'hey',
        })

        await this.firstNameVc.setRenderedValue('hey')
        await this.formVc.setValue('firstName', null)

        assert.isEqual(this.firstNameVc.getRenderedValue(), null)
    }

    @test()
    protected async settingValueToFalseDoesNotClearRenderedValue() {
        this.formVc = this.FormVc({
            firstName: 'hey',
        })

        await this.firstNameVc.setRenderedValue('hey')
        //@ts-ignore
        await this.formVc.setValue('firstName', false)

        assert.isEqual(this.firstNameVc.getRenderedValue(), 'hey')
    }

    @test()
    protected async settingValueToSameValueDoesNotTriggerChange() {
        let hitCount = 0
        this.firstNameVc = this.SpyInputVc({
            onChange: () => {
                hitCount++
            },
        })
        this.formVc = this.FormVc()

        await this.firstNameVc.setValue('hey')
        assert.isEqual(hitCount, 1)
        await this.firstNameVc.setValue('hey')
        assert.isEqual(hitCount, 1)
    }

    private FormVc(
        values: Record<string, any> = {},
        options?: Partial<FormViewControllerOptions<any>>
    ) {
        return this.Controller(
            'form',
            buildForm({
                schema: cloneDeep(formSchema),
                values,
                ...options,
                sections: [
                    {
                        fields: [
                            {
                                name: 'firstName',
                                vc: this.firstNameVc,
                            },
                            {
                                name: 'lastName',
                            },
                            {
                                name: 'email',
                                vc: this.emailVc,
                            },
                            {
                                name: 'age',
                            },
                        ],
                    },
                ],
            })
        )
    }

    private SpyInputVc(options?: Omit<TextInput, 'name'>): SpyTextFieldInput {
        return this.Controller('textInput' as any, {
            ...options,
        }) as SpyTextFieldInput
    }
}

export type TextInput =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextInput

const formSchema = buildSchema({
    id: 'testSchema',
    fields: {
        firstName: {
            type: 'text',
        },
        lastName: {
            type: 'text',
        },
        email: {
            type: 'text',
        },
        age: {
            type: 'number',
        },
    },
})

type FormSchema = typeof formSchema
