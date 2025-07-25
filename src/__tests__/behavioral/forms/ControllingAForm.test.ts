import {
    validateSchemaValues,
    buildSchema,
    Schema,
    FieldDefinitions,
} from '@sprucelabs/schema'
import { locationSchema } from '@sprucelabs/spruce-core-schemas'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import formSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/form.schema'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import formAssert from '../../../tests/utilities/formAssert'
import interactor from '../../../tests/utilities/interactor'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    FieldRenderOptions,
    FormSection,
    FormViewController,
} from '../../../types/heartwood.types'
import { FormViewControllerOptions } from '../../../viewControllers/form/Form.vc'
import { testFormOptions, TestFormSchema } from './testFormOptions'

@suite()
export default class UsingAFormViewControllerTest extends AbstractViewControllerTest {
    protected controllerMap = {}
    private vc!: FormViewController<TestFormSchema>

    private readonly testForm = testFormOptions

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.TestFormVc()
    }

    @test()
    protected canCreateUsingAFormViewController() {
        //@ts-ignore
        const vc = this.Controller('form', {})
        assert.isTruthy(vc)
    }

    @test()
    protected async badValuesDontMessAnythingUp() {
        const vc = this.Controller('form', {
            ...this.testForm,
            values: undefined,
        })

        await vc.setValue('first', true)
    }

    @test()
    protected rendersValidForm() {
        const view = this.vc.render()
        validateSchemaValues(formSchema, view)
    }

    @test()
    protected formIsNotBusyToStart() {
        assert.isFalsy(this.vc.getIsBusy())
        const model = this.vc.render()
        assert.isFalsy(model.isBusy)
    }

    @test()
    protected canSetBusy() {
        this.vc.setIsBusy(true)
        assert.isTrue(this.vc.getIsBusy())
        const model = this.vc.render()
        assert.isTrue(model.isBusy)
    }

    @test()
    protected canGetValues() {
        const actual = this.vc.getValues()

        assert.isEqualDeep(actual, {
            last: undefined,
            first: undefined,
            nickname: undefined,
            favoriteNumber: undefined,
        })
    }

    @test()
    protected async canSetValue() {
        await this.vc.setValue('first', 'tay')
        const actual = this.vc.getValues()

        assert.isEqualDeep(actual, {
            first: 'tay',
            last: undefined,
            nickname: undefined,
            favoriteNumber: undefined,
        })
    }

    @test()
    protected errorsByFieldEmptyToStart() {
        const errorsByField = this.vc.getErrorsByField()
        assert.isLength(Object.keys(errorsByField), 0)
        assert.isFalse(this.vc.hasErrors())
    }

    @test()
    protected errorsByFieldEmtyToStart() {
        const errorsByField = this.vc.getErrorsByField()
        assert.isLength(Object.keys(errorsByField), 0)
        assert.isFalse(this.vc.hasErrors())
    }

    @test()
    protected validateShowsAllErrors() {
        const errorsByField = this.vc.validate()
        assert.isLength(Object.keys(errorsByField), 2)
    }

    @test()
    protected async errorsByFieldShowsFirstDirtyField() {
        await this.vc.setValue('first', 'Tay')
        await this.vc.setValue('first', '')

        const errorsByField = this.vc.getErrorsByField()
        assert.isLength(Object.keys(errorsByField), 1)

        assert.isLength(errorsByField.first, 1)
    }

    @test()
    protected async knowsIfDirty() {
        this.assertIsNotDirty()
        await this.setFirstToRandomValue()
        this.assertIsDirty()
    }

    @test()
    protected async dirtyResetsOnSubmit() {
        await this.setFirstToRandomValue()
        await this.vc.submit()
        this.assertIsNotDirty()
    }

    @test()
    protected async canClearDirty() {
        await this.setFirstToRandomValue()
        this.assertIsDirty()
        this.vc.clearDirty()
        this.assertIsNotDirty()
        await this.setFirstToRandomValue()
        await this.vc.reset()
        this.assertIsNotDirty()
    }

    @test()
    protected async fieldErrorsRendered() {
        await this.vc.setValue('first', 'Test')

        let model = this.vc.render()

        assert.isLength(Object.keys(model.errorsByField ?? {}), 0)

        await this.vc.setValue('first', '')

        model = this.vc.render()
        assert.isLength(Object.keys(model.errorsByField ?? {}), 1)
    }

    @test()
    protected settingErrorsSetsErrorsByField() {
        this.vc.setErrors([
            {
                code: 'INVALID_PARAMETER',
                name: 'first',
            },
        ])

        const errorsByField = this.vc.getErrorsByField()
        assert.isLength(Object.keys(errorsByField), 1)
        assert.isLength(errorsByField.first, 1)
        assert.isTrue(this.vc.hasErrors())
    }

    @test()
    protected settingErrorsOverwritesLastErrorsByField() {
        this.vc.setErrors([
            {
                code: 'INVALID_PARAMETER',
                name: 'first',
            },
        ])

        this.vc.setErrors([
            {
                code: 'INVALID_PARAMETER',
                name: 'last',
            },
        ])

        const errorsByField = this.vc.getErrorsByField()
        assert.isLength(Object.keys(errorsByField), 1)
        assert.isFalsy(errorsByField.first)
        assert.isLength(errorsByField.last, 1)
    }

    @test()
    protected submitControlsShowByDefault() {
        const model = this.vc.render()
        assert.isTrue(model.shouldRenderSubmitControls)
    }

    @test()
    protected canHideAndShowSubmitControls() {
        this.vc.hideSubmitControls()
        assert.isFalse(this.vc.render().shouldRenderSubmitControls)
        this.vc.showSubmitControls()
        assert.isTrue(this.vc.render().shouldRenderSubmitControls)
    }

    @test()
    protected async onChangesReportAsExpected() {
        let lastIsValid: any
        let lastErrorsByField: any

        this.vc = this.Controller('form', {
            ...this.testForm,
            onChange: ({ isValid, errorsByField }) => {
                lastIsValid = isValid
                lastErrorsByField = errorsByField
            },
        }) as any

        await this.vc.setValue('first', 'Tay')

        assert.isFalse(lastIsValid)
        assert.isLength(Object.keys(lastErrorsByField), 0)

        await this.vc.setValue('first', '')

        assert.isFalse(lastIsValid)
        assert.isArray(lastErrorsByField.first)
    }

    @test()
    protected async resettingAFormClearsValuesAndErrors() {
        await this.vc.setValue('first', 'Test')

        const errors = this.vc.validate()

        this.vc.setErrorsByField(errors)
        assert.isTrue(this.vc.hasErrors())

        await this.vc.reset()

        assert.isFalsy(this.vc.getValues().first)
        assert.isFalse(this.vc.hasErrors())
    }

    @test()
    protected async resettingFormCallsRender() {
        //@ts-ignore
        const count = this.vc.__renderInvocationCount

        await this.vc.reset()

        //@ts-ignore
        assert.isEqual(count + 1, this.vc.__renderInvocationCount)
    }

    @test()
    protected async resetValuesAreNotSetByRef() {
        await this.vc.reset()
        await this.vc.setValue('first', 'Tets')
        //@ts-ignore
        assert.isFalsy(this.vc.originalValues.first)
    }

    @test()
    protected async canResetField() {
        const vc: FormViewController<(typeof testFormOptions)['schema']> =
            this.Controller(
                'form',
                buildForm({
                    ...testFormOptions,
                    values: {
                        first: 'tay',
                    },
                })
            ) as any

        await vc.setValue('first', '2000')

        assert.isEqual(vc.getValues().first, '2000')

        await vc.resetField('first')

        assert.isEqual(vc.getValues().first, 'tay')
    }

    @test()
    protected async resetFieldsClearsItsErrors() {
        //@ts-ignore
        await this.vc.setValue('favoriteNumber', 'aoeu')

        let errs = this.vc.getErrorsByField()
        assert.isTruthy(errs.favoriteNumber)

        await this.vc.resetField('favoriteNumber')

        errs = this.vc.getErrorsByField()
        assert.isFalsy(errs.favoriteNumber)
    }

    @test()
    protected throwsGettingBadSection() {
        const err1 = assert.doesThrow(() => this.vc.getSection(-1))

        errorAssert.assertError(err1, 'INVALID_PARAMETERS', {
            parameters: ['sectionIdOrIdx'],
        })
    }

    @test()
    protected cancelButtonDefaultsToShowing() {
        assert.isTrue(this.vc.getShouldRenderCancelButton())
        assert.isTrue(this.render(this.vc).shouldRenderCancelButton)
    }

    @test()
    protected canCheckIfCancelButtonIsShowing() {
        const vc = this.Controller('form', {
            ...this.testForm,
            shouldRenderCancelButton: false,
        })

        assert.isFalse(vc.getShouldRenderCancelButton())
        const model = this.render(vc)

        assert.isFalse(model.shouldRenderCancelButton)
    }

    @test()
    protected cancelButtonIsNotShowingIfSubmitControlsAreNotShowing() {
        const vc = this.Controller('form', {
            ...this.testForm,
            shouldRenderSubmitControls: false,
        })

        assert.isFalse(vc.getShouldRenderCancelButton())
    }

    @test()
    protected defaultSubmitButtonLabel() {
        assert.isEqual(this.vc.getSubmitButtonLabel(), 'Go!')
        assert.isEqual(this.render(this.vc).submitButtonLabel, 'Go!')
    }

    @test()
    protected canSetSubmitButtonLabel() {
        const vc = this.Controller('form', {
            ...this.testForm,
            submitButtonLabel: 'Waka',
        })

        assert.isEqual(vc.getSubmitButtonLabel(), 'Waka')
        assert.isEqual(this.render(vc).submitButtonLabel, 'Waka')
    }

    @test()
    protected addingSectionShouldNotMutateModel() {
        this.vc.addSection({ title: 'go!', fields: [] })
        //test against original form schema to see if it was mutated
        assert.isLength(testFormOptions.sections, 3)
    }

    @test()
    protected addingSectionShouldTriggerRender() {
        this.vc.addSection({ title: 'go!', fields: [] })
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected cantAddWithoutSpecifyingFieldAndSection() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.addFields({}))

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['sectionIdx', 'fields'],
        })
    }

    @test()
    protected cantAddFieldToSectionThatDoesNotExist() {
        const err = assert.doesThrow(() =>
            this.vc.addFields({
                sectionIdx: -1,
                fields: {},
            })
        )

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['sectionIdOrIdx'],
        })
    }

    @test()
    protected addingAFieldToSectionAddsToSchemaAndSection() {
        this.vc.addFields({
            sectionIdx: 0,
            fields: {
                phone: {
                    type: 'phone',
                },
            },
        })

        const schema = this.vc.getSchema()

        //@ts-ignore
        assert.isEqualDeep(schema.fields.phone, { type: 'phone' })

        const section = this.vc.getSection(0)

        //@ts-ignore
        assert.isEqualDeep(section.fields, ['first', { name: 'phone' }])
    }

    @test()
    protected canAddMultipleFields() {
        this.vc.addFields({
            sectionIdx: 0,
            fields: {
                phone1: {
                    type: 'phone',
                },
                phone2: {
                    type: 'phone',
                    label: 'Backup phone',
                },
            },
        })

        this.vc.addFields({
            sectionIdx: 0,
            fields: {
                phone3: {
                    type: 'phone',
                    label: 'Backup phone 3',
                },
            },
        })

        const schema = this.vc.getSchema()

        //@ts-ignore
        assert.isEqualDeep(schema.fields.phone1, { type: 'phone' })
        //@ts-ignore
        assert.isEqualDeep(schema.fields.phone2, {
            type: 'phone',
            label: 'Backup phone',
        })

        //@ts-ignore
        assert.isEqualDeep(schema.fields.phone3, {
            type: 'phone',
            label: 'Backup phone 3',
        })

        const section = this.vc.getSection(0)

        //@ts-ignore
        assert.isEqualDeep(section.fields, [
            'first',
            //@ts-ignore
            { name: 'phone1' },
            //@ts-ignore
            { name: 'phone2' },
            //@ts-ignore
            { name: 'phone3' },
        ])
    }

    @test()
    protected addingFieldsTriggersRender() {
        this.vc.addFields({
            sectionIdx: 0,
            fields: {
                phone1: {
                    type: 'phone',
                },
                phone2: {
                    type: 'phone',
                    label: 'Backup phone',
                },
            },
        })

        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected addingFieldsDoesNotMutateOriginalSchema() {
        const schema = this.vc.getSchema()

        this.vc.addFields({
            sectionIdx: 0,
            fields: {
                phone1: {
                    type: 'phone',
                },
                phone2: {
                    type: 'phone',
                    label: 'Backup phone',
                },
            },
        })

        assert.isNotEqual(schema, this.vc.getSchema())
    }

    @test()
    protected hasUpdateSectionMethod() {
        assert.isFunction(this.vc.updateSection)
    }

    @test()
    protected validatesUpdate() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.updateSection())

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['section', 'newSection'],
        })
    }

    @test()
    protected validatesUpdateForUpdates() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.updateSection(0))

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['newSection'],
        })
    }

    @test()
    protected throwsWithBadSectionOnUpdate() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.updateSection(-1, {}))

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['sectionIdOrIdx'],
        })
    }

    @test()
    protected canUpdateFirstSectionTitle() {
        this.vc.updateSection(0, {
            title: 'Hey gang!',
        })

        let model = this.render(this.vc)

        assert.isEqual(model.sections[0].title, 'Hey gang!')
        //@ts-ignore
        this.vc.updateSection(0, { title: 'go again!', fields: ['cheesy'] })

        model = this.render(this.vc)

        assert.isEqual(model.sections[0].title, 'go again!')
        //@ts-ignore
        assert.isEqual(model.sections[0].fields[0], 'cheesy')
    }

    @test()
    protected updateSectionUpdatesEverything() {
        this.vc.updateSection(0, {
            title: 'Hey gang!',
            fields: ['first'],
            text: {
                content: 'Waka waka!',
            },
        })

        const expected: FormSection<TestFormSchema> = {
            id: 'first',
            title: 'Hey gang!',
            fields: ['first'],
            text: {
                content: 'Waka waka!',
            },
        }
        assert.isEqualDeep(this.vc.getSection(0), expected)
        assert.isEqualDeep(this.vc.getSection('first'), expected)
    }

    @test()
    protected updatesTriggerRender() {
        this.vc.updateSection(0, {
            title: 'do-bee',
        })

        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected hidingSubmitControlsDoesNotImpactFooter() {
        const label = 'What the?'
        this.vc.setFooter({
            buttons: [
                {
                    label,
                },
            ],
        })

        let { footer } = this.render(this.vc)
        assert.isEqual(footer?.buttons?.[0].label, label)

        assert.isTrue(this.vc.getShouldRenderSubmitControls())
        this.vc.hideSubmitControls()
        assert.isFalse(this.vc.getShouldRenderSubmitControls())

        const model = this.render(this.vc)
        assert.isEqualDeep(model.footer, footer)
    }

    @test()
    protected canUpdateSectionsAndTriggerRender() {
        this.vc.setSections([
            {
                title: 'go team!',
                fields: ['first', 'last'],
            },
        ])

        const section = this.vc.getSection(0)

        assert.isEqual(section.title, 'go team!')
        assert.isEqualDeep(section.fields, ['first', 'last'])

        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected canUpdateFooter() {
        this.vc.setFooter({
            buttons: [
                {
                    label: 'What the?',
                },
            ],
        })

        this.vc.setFooter(null)

        const model = this.render(this.vc)
        assert.isFalse('footer' in model)
    }

    @test()
    protected updatingFooterTriggersRender() {
        this.vc.setFooter({})
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected cantUpdateWhenMissingEverything() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.updateField())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['fieldName', 'updates'],
        })
    }

    @test()
    protected cantUpdateWithouSupplyingUpdates() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.updateField('test'))
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['updates'],
        })
    }

    @test('cant update field with bad name deli', 'deli')
    @test('cant update field with bad name random', `${Math.random()}`)
    protected cantUpdateFieldThatDoesNotExist(name: any) {
        const err = assert.doesThrow(() =>
            this.vc.updateField(name, {
                //@ts-ignore
                fieldDefinition: {},
            })
        )
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['fieldName'],
        })
    }

    @test()
    protected canUpdateFieldLabelDirectly() {
        this.vc.updateField('first', {
            fieldDefinition: { type: 'text', label: 'Cheesy burrito' },
        })

        const model = this.render(this.vc)

        assert.isEqualDeep(model.schema.fields.first, {
            type: 'text',
            //@ts-ignore
            label: 'Cheesy burrito',
        })

        assert.isEqualDeep(model.sections[0].fields, ['first'])
    }

    @test()
    protected async updatingFieldDefinitionDoesNotMutateOriginalSchema() {
        const schema = this.vc.getSchema()
        this.vc.updateField('first', {
            fieldDefinition: { type: 'text', label: 'Cheesy burrito' },
        })
        vcAssert.assertTriggerRenderCount(this.vc, 1)
        assert.isNotEqual(schema, this.vc.getSchema())
    }

    @test()
    protected canUpdateFieldLabelWithRenderOptions() {
        this.vc.updateField('first', {
            renderOptions: { label: 'Cheesy burrito' },
        })

        const model = this.render(this.vc)

        assert.isEqualDeep(model.schema.fields.first, {
            type: 'text',
            isRequired: true,
        })

        assert.isEqualDeep(model.sections[0].fields, [
            { name: 'first', label: 'Cheesy burrito' },
        ])
    }

    @test()
    protected canUpdateLabelInFieldInNotFirstSection() {
        this.vc.updateField('nickname', {
            renderOptions: { label: 'Cheesy burrito' },
        })

        const model = this.render(this.vc)

        assert.isEqualDeep(model.sections[1].fields, [
            'last',
            { name: 'nickname', label: 'Cheesy burrito' },
        ])
    }

    @test()
    protected canRenameField() {
        this.vc.updateField('favoriteNumber', {
            newName: 'secondFavoriteNumber',
        })

        const model = this.render(this.vc)

        //@ts-ignore
        assert.isTruthy(model.schema.fields.secondFavoriteNumber)
        assert.isFalsy(model.schema.fields.favoriteNumber)
        assert.isTruthy(testFormOptions.schema.fields.favoriteNumber)

        formAssert.formRendersField(this.vc, 'secondFavoriteNumber')
    }

    @test()
    protected canRenameWhileUpdatingDefinitionAndRenderOptions() {
        this.vc.updateField('favoriteNumber', {
            newName: 'secondFavoriteNumber',
            fieldDefinition: {
                type: 'select',
                options: {
                    choices: [
                        {
                            label: 'hey',
                            value: 'hey',
                        },
                    ],
                },
            },
            renderOptions: { label: 'Cheesy burrito' },
        })

        const model = this.render(this.vc)

        //@ts-ignore
        assert.isTruthy(model.schema.fields.secondFavoriteNumber)
        assert.isEqualDeep(
            //@ts-ignore
            model.schema.fields.secondFavoriteNumber.options.choices,
            [{ label: 'hey', value: 'hey' }]
        )
        assert.isFalsy(model.schema.fields.favoriteNumber)

        assert.isEqualDeep(model.sections[2].fields, [
            //@ts-ignore
            { name: 'secondFavoriteNumber', label: 'Cheesy burrito' },
        ])
    }

    @test()
    protected canDisableForm() {
        this.vc.setIsBusy(false)
        vcAssert.assertTriggerRenderCount(this.vc, 1)

        this.vc.disable()
        vcAssert.assertTriggerRenderCount(this.vc, 2)

        formAssert.formIsDisabled(this.vc)
        formAssert.formIsNotBusy(this.vc)

        this.vc.setIsBusy(true)
        this.vc.disable()

        formAssert.formIsBusy(this.vc)

        this.vc.enable()
        vcAssert.assertTriggerRenderCount(this.vc, 5)

        formAssert.formIsBusy(this.vc)
        formAssert.formIsEnabled(this.vc)
    }

    @test()
    protected async settingValuesTriggersOnChange() {
        let wasHit = false

        const onChange = () => {
            wasHit = true
        }
        const vc = this.FormWithOnChange(onChange)

        await vc.setValues({})

        assert.isTrue(wasHit)
    }

    @test()
    protected async settingValuesOnChangePassesExpectedPayload() {
        const changeOptions: any[] = []

        const vc = this.FormWithOnChange((options) => {
            changeOptions.push(options)
        })

        await vc.setValue('firstName', 'tay')
        await vc.setValues({ firstName: 'tay' })

        assert.doesInclude(changeOptions[0], changeOptions[1])
        assert.doesInclude(changeOptions[1], changeOptions[0])
    }

    @test('will changes triggered with options 1', { firstName: 'Tay' })
    @test('will changes triggered with options 2', { lastName: 'Ro' })
    protected async willChangeIsTriggered(updates: any) {
        let passedOptions: any
        let wasHit = false
        const vc = this.FormWithOnChange(
            () => {},
            (options) => {
                passedOptions = options
                wasHit = true
                return true
            }
        )

        assert.isFalse(wasHit)

        await vc.setValues(updates)

        assert.isTrue(wasHit)
        assert.isEqualDeep(passedOptions, {
            //@ts-ignore
            ...vc.buildChangeOptions({
                includePendingValues: false,
            }),
            changes: {
                ...updates,
            },
        })
    }

    @test()
    protected async cancellingWillStopsDidFromBeingHit() {
        let wasHit = false
        const vc = this.FormWithOnChange(
            () => {
                wasHit = true
            },
            () => {
                return false
            }
        )

        await vc.setValues({ firstName: 'tay' })
        assert.isFalse(wasHit)
    }

    @test()
    protected async noOnChangeIfValueDidNotchange() {
        let hitCount = 0
        const vc = this.FormWithOnChange(() => {
            hitCount++
        })

        await vc.setValue('firstName', 'tay')
        assert.isEqual(hitCount, 1)
        await vc.setValue('firstName', 'tay')
        assert.isEqual(hitCount, 1)

        await vc.setValue('lastName', 'ro')
        assert.isEqual(hitCount, 2)
        await vc.setValue('lastName', 'ro')
        assert.isEqual(hitCount, 2)
    }

    @test()
    protected async cantSubmitIfNotEnabled() {
        let wasHit = false

        const vc = this.Controller(
            'form',
            buildForm({
                id: 'onChangeForm',
                schema: buildSchema({
                    id: 'changeForm',
                    fields: {
                        firstName: {
                            type: 'text',
                        },
                    },
                }),
                onSubmit: () => {
                    wasHit = true
                },
                sections: [{}],
            })
        )

        vc.disable()
        await assert.doesThrowAsync(() => interactor.submitForm(vc))
        assert.isFalse(wasHit)

        vc.enable()
        await interactor.submitForm(vc)
        assert.isTrue(wasHit)
    }

    @test()
    protected canStartOffDisabled() {
        const vc = this.DisabledForm()
        formAssert.formIsDisabled(vc)
    }

    @test()
    protected disablingFormDoesNotDisableEntireFooter() {
        const vc = this.DisabledForm()
        const { footer = {} } = this.render(vc) ?? { footer: {} }
        assert.isFalse('isEnabled' in footer!)
    }

    @test(
        'is valid if required field is set',
        { name: 'test' },
        [['name']],
        true
    )
    @test('si valid if optional field is not set', {}, [['num']], true)
    @test(
        'is valid if required field is second in section and set',
        { name: 'hey!' },
        [['num', 'name']],
        true
    )
    @test(
        'is valid if required field is first in second section and set',
        { name: 'hey!' },
        [['num'], ['name']],
        true
    )
    @test(
        'is not valid if required field is first in second section and not set',
        { num: '5' },
        [['num'], ['name']],
        false
    )
    @test(
        'is not valid if required field is second in first seciton as render as and not set',
        { num: '5' },
        [['num'], [{ name: 'name' }]],
        false
    )
    @test(
        'is valid if valid field is set in renderAs object and set',
        { name: '5' },
        [['num'], [{ name: 'name' }]],
        true
    )
    protected onlyValidatesFieldsThatAreVisible(
        values: any,
        fields: string[][],
        expected: boolean
    ) {
        const vc = this.Controller(
            'form',
            buildForm({
                id: 'onChangeForm',
                isEnabled: false,
                values,
                schema: locationSchema,
                sections: [
                    {
                        fields: fields[0] as any,
                    },
                    {
                        fields: fields[1] as any,
                    },
                ],
            })
        )

        assert.isEqual(vc.isValid(), expected)

        const errorsByField = vc.validate()

        if (expected === false) {
            assert.isAbove(Object.keys(errorsByField).length, 0)
        } else {
            assert.isLength(Object.keys(errorsByField), 0)
        }
    }

    @test('on submit passes only name', { name: 'hey', num: '5' }, [['name']], {
        name: 'hey',
    })
    protected async onSubmitOnlyReturnsVisibleValues(
        values: any,
        fields: any,
        expected: any
    ) {
        let submittedValues: any

        const vc = this.Controller(
            'form',
            buildForm({
                id: 'onChangeForm',
                values,
                onSubmit: ({ values }) => {
                    submittedValues = values
                },
                schema: locationSchema,
                sections: [
                    {
                        fields: fields[0] as any,
                    },
                    {
                        fields: fields[1] as any,
                    },
                ],
            })
        )

        const actual = vc.getValues()

        assert.isEqualDeep(actual, expected)

        await interactor.submitForm(vc)

        assert.isEqualDeep(actual, submittedValues)
    }

    @test()
    protected async canCancelChangeWithOnChangeReturningFalse() {
        const vc = this.Controller(
            'form',
            buildForm({
                id: 'onChangeForm',
                values: { name: 'test' },
                onWillChange: async () => false,
                schema: locationSchema,
                sections: [
                    {
                        fields: ['name'],
                    },
                    {
                        fields: ['address'],
                    },
                ],
            })
        )

        await vc.setValue('name', 'Tay')

        assert.isEqual(vc.getValue('name'), 'test')
    }

    @test(
        'will change gets expected options when changing 1 field',
        'name',
        'Jim'
    )
    @test(
        'will change gets expected options when changing 2 field',
        'name',
        'Phil'
    )
    @test(
        'will change gets expected options when changing 3 field',
        'num',
        'doh'
    )
    protected async canKeepChangeWithOnChangeReturningFalse(
        fieldName: any,
        value: string
    ) {
        let willChangeOptions: any
        let didChangeOptions: any

        const vc = this.Controller(
            'form',
            buildForm({
                id: 'onChangeForm',
                values: { name: 'test', num: 'test' },
                onWillChange: async (options) => {
                    willChangeOptions = options
                    return true
                },
                onSubmit: async (options) => {
                    didChangeOptions = options
                },
                schema: locationSchema,
                sections: [
                    {
                        fields: ['name'],
                    },
                    {
                        fields: ['num'],
                    },
                ],
            })
        )

        await vc.setValue(fieldName, value)
        assert.isEqual(vc.getValue(fieldName), value)

        await vc.submit()

        delete willChangeOptions.controller
        delete didChangeOptions.controller

        assert.isEqualDeep(willChangeOptions, {
            ...didChangeOptions,
            values: { name: 'test', num: 'test' },
            changes: {
                [fieldName]: value,
            },
        })
    }

    @test()
    protected async settingValuesTriggersRender() {
        const vc = this.Controller('form', {
            ...this.testForm,
        })

        await vc.setValues({})
        vcAssert.assertTriggerRenderCount(vc, 1)
    }

    @test()
    protected async formsHaveOnCancel() {
        let wasHit = false
        const vc = this.Controller('form', {
            ...this.testForm,
            onCancel: () => {
                wasHit = true
            },
        })

        const model = this.render(vc)
        await model.onCancel?.()

        assert.isTrue(wasHit)
    }

    @test()
    protected async getFieldIsTyped() {
        const field = this.vc.getField('first')
        assert.isType<'text'>(field.type)
    }

    @test('bad section by id', 'twenty')
    @test('bad section by id 2', 'fiver')
    @test('bad section by idx 1', 10)
    protected async throwsWhenAddingFieldToBadSection(
        sectionIdOrIdx: string | number
    ) {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            this.vc.addFieldToSection(sectionIdOrIdx, 'test')
        )
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['sectionIdOrIdx'],
        })
    }

    @test()
    protected async throwsWhenAddingFieldNameThatDoesNotExistOnSchema() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            this.vc.addFieldToSection('first', 'test')
        )
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['fieldName'],
        })
    }

    @test()
    protected async canAddFieldByNameWithSectionIdx() {
        this.vc.addFieldToSection(0, 'fieldNotPartOfSection')
        this.vc.addFieldToSection(1, 'anotherField')
    }

    @test()
    protected async canAddFieldByNameWithSectionById() {
        this.vc.addFieldToSection('first', 'fieldNotPartOfSection')
        this.vc.addFieldToSection('second', 'anotherField')
    }

    @test('can add field to section 0', 0)
    @test('can add field to section second', 'second')
    protected async actuallyAddsTheFieldToTheSection(
        sectionIdOrIdx: string | number
    ) {
        this.vc.addFieldToSection(sectionIdOrIdx, 'fieldNotPartOfSection')
        const section = this.getSection(sectionIdOrIdx)
        assert.doesInclude(section.fields, 'fieldNotPartOfSection')
    }

    @test()
    protected async addingFieldBySectionTriggersRender() {
        this.vc.addFieldToSection('first', 'fieldNotPartOfSection')
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async canAddFieldWithFieldOptions() {
        const added: FieldRenderOptions<Schema> = {
            //@ts-ignore
            name: 'fieldNotPartOfSection',
            renderAs: 'checkbox',
        }
        const section = 'first'

        this.vc.addFieldToSection(section, added)
        assert.doesInclude(this.getSection(section).fields, added)
    }

    @test()
    protected async throwsIfAddingFieldThatAlreadyIsRendering() {
        assert.doesThrow(() => this.vc.addFieldToSection('first', 'first'))
        const err = assert.doesThrow(() =>
            this.vc.addFieldToSection('first', 'last')
        )

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['fieldName'],
        })
    }

    @test()
    protected async canAddFieldsAtIndex() {
        this.vc.addFieldToSection('first', {
            name: 'fieldNotPartOfSection',
            atIndex: 0,
        })

        this.assertSectionFieldsEqual('first', [
            { name: 'fieldNotPartOfSection' },
            'first',
        ])

        this.vc.addFieldToSection('first', {
            name: 'anotherField',
            atIndex: 1,
        })

        this.assertSectionFieldsEqual('first', [
            { name: 'fieldNotPartOfSection' },
            { name: 'anotherField' },
            'first',
        ])
    }

    @test()
    protected async removingFieldThrowsWithBadField() {
        const err = assert.doesThrow(() =>
            this.vc.removeField(generateId() as any)
        )

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['fieldName'],
        })
    }

    @test()
    protected async canRemoveFieldIfItExists() {
        this.vc.addFieldToSection('first', {
            name: 'fieldNotPartOfSection',
        })

        this.vc.removeField('fieldNotPartOfSection')

        this.assertSectionFieldsEqual('first', ['first'])

        this.vc.addFieldToSection('second', 'fieldNotPartOfSection')
        this.vc.addFieldToSection('second', 'anotherField')

        this.vc.removeField('fieldNotPartOfSection')
        this.assertSectionFieldsEqual('second', [
            'last',
            'nickname',
            'anotherField',
        ])

        this.vc.removeField('nickname')

        this.assertSectionFieldsEqual('second', ['last', 'anotherField'])
    }

    @test()
    protected async removingFieldTriggersRender() {
        this.vc.removeField('nickname')
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async removingFieldDoesNotMutateSection() {
        const section = this.vc.getSection('second')
        this.vc.removeField('nickname')
        assert.isNotEqual(section, this.vc.getSection('second'))
        assert.isNotEqualDeep(section, this.vc.getSection('second'))
    }

    @test()
    protected async knowsIfFieldIsNotBeingRendered() {
        this.assertIsNotRenderingField('fieldNotPartOfSection')
        this.vc.addFieldToSection(0, 'fieldNotPartOfSection')
        this.assertIsRenderingField('fieldNotPartOfSection')
        this.assertIsNotRenderingField('anotherField')
        this.vc.addFieldToSection(0, 'anotherField')
        this.assertIsRenderingField('anotherField')
    }

    @test()
    protected async sectionIsClonedWhenAddingFieldToSection() {
        const expected = this.vc.getSection(0)
        this.vc.addFieldToSection(0, 'fieldNotPartOfSection')
        const actual = this.vc.getSection(0)
        assert.isNotEqual(actual, expected)
    }

    @test()
    protected async canAddFieldDefinitionWhenAddingFieldToSection() {
        this.assertAddingFieldWithDefinitionSetsToSchema({
            type: 'select',
            options: {
                choices: [],
            },
        })

        this.assertAddingFieldWithDefinitionSetsToSchema(
            {
                type: 'text',
                options: {},
            },
            'anotherField'
        )
    }

    @test()
    protected async addingFieldWithNewDefinitionDoesNotMutateOriginalSchema() {
        const originalSchema = this.vc.getSchema()
        this.assertAddingFieldWithDefinitionSetsToSchema({
            type: 'select',
            options: {
                choices: [],
            },
        })

        assert.doesThrow(() =>
            assert.isEqualDeep(originalSchema, this.vc.getSchema())
        )
    }

    @test()
    protected async canSetCancelButtonLabel() {
        const label = generateId()
        this.vc = this.TestFormVc({
            cancelButtonLabel: label,
        })

        const { cancelButtonLabel } = this.render(this.vc)
        assert.isEqual(cancelButtonLabel, label)
    }

    @test()
    protected async canGetFormId() {
        const expected = generateId()
        this.vc = this.TestFormVc({ id: expected })
        const { id } = this.render(this.vc)
        assert.isEqual(id, expected)
        assert.isEqual(this.vc.getId(), expected)
    }

    @test()
    protected async formDoesNotHonorFieldsNotPartOfSchema() {
        this.vc = this.TestFormVc({
            sections: [
                {
                    fields: ['last'],
                },
            ],
        })

        await this.vc.setValues({
            [generateId()]: generateId(),
        })
        assert.isTrue(this.vc.isValid())
        this.vc.validate()
    }

    @test()
    protected async formDoesNotHonorFieldsNotPartOfSchemaUsingConstructor() {
        this.vc = this.TestFormVc({
            values: {
                [generateId()]: generateId(),
            },
            sections: [
                {
                    fields: ['last'],
                },
            ],
        })

        assert.isTrue(this.vc.isValid())
        this.vc.validate()
    }

    @test()
    protected async fieldsComeBackNormalized() {
        this.vc = this.TestFormVc({
            sections: [
                {
                    fields: ['favoriteNumber'],
                },
            ],
        })

        await this.vc.setValue('favoriteNumber', '5' as any)
        assert.isEqualDeep(this.vc.getValues(), { favoriteNumber: 5 })
    }

    @test()
    protected async notSettingRequiredValuesDoesntThrow() {
        await this.vc.setValues({
            last: 'cheesey',
        })
    }

    @test()
    protected async hasSectionReturnsFalseIfSectionDoesNotExist() {
        const section = generateId()
        const hasSection = this.hasSection(section)
        assert.isFalse(hasSection)
    }

    @test()
    protected async hasSectionReturnsTrueIfSectionExists() {
        const sectionId = generateId()
        this.vc.addSection({
            id: sectionId,
        })

        const hasSection = this.hasSection(sectionId)
        assert.isTrue(hasSection)
    }

    @test()
    protected async cantAddTheSameSectionTwiceWithoutIndex() {
        const sectionId = generateId()
        this.vc.addSection({
            id: sectionId,
        })

        const err = assert.doesThrow(() =>
            this.vc.addSection({
                id: sectionId,
            })
        )

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['sectionIdOrIdx'],
        })
    }

    private hasSection(section: string | number) {
        return this.vc.hasSection(section)
    }

    private assertAddingFieldWithDefinitionSetsToSchema(
        definition: FieldDefinitions,
        fieldName = 'fieldNotPartOfSection'
    ) {
        this.vc.addFieldToSection(0, {
            name: fieldName as any,
            fieldDefinition: definition,
        })
        this.assertIsRenderingField(fieldName)

        assert.isEqualDeep(
            //@ts-ignore
            this.vc.getSchema().fields[fieldName] as FieldDefinitions,
            definition
        )
    }

    private assertIsDirty() {
        assert.isTrue(this.vc.getIsDirty())
    }

    private assertIsNotDirty() {
        assert.isFalse(this.vc.getIsDirty())
    }

    private assertIsNotRenderingField(fieldName: string) {
        assert.isFalse(this.vc.isFieldRendering(fieldName as any))
    }

    private assertIsRenderingField(fieldName: string) {
        assert.isTrue(this.vc.isFieldRendering(fieldName as any))
    }

    private assertSectionFieldsEqual(
        section: string,
        expected: (string | { name: string })[]
    ) {
        assert.isEqualDeep(this.getSection(section).fields, expected)
    }

    private getSection(sectionIdOrIdx: string | number) {
        return this.vc.getSection(sectionIdOrIdx)
    }

    private TestFormVc(
        options?: Partial<FormViewControllerOptions<TestFormSchema>>
    ) {
        return this.Controller('form', {
            ...this.testForm,
            ...options,
        }) as FormViewController<TestFormSchema>
    }

    private FormWithOnChange(
        onChange: (options: any) => void,
        onWillChange?: (options: any) => boolean
    ) {
        return this.Controller(
            'form',
            buildForm({
                id: 'onChangeForm',
                schema: buildSchema({
                    id: 'changeForm',
                    fields: {
                        firstName: {
                            type: 'text',
                        },
                        lastName: {
                            type: 'text',
                        },
                    },
                }),
                onChange,
                onWillChange,
                sections: [{}],
            })
        )
    }

    private async setFirstToRandomValue() {
        await this.vc.setValue('first', generateId())
    }

    private DisabledForm() {
        return this.Controller(
            'form',
            buildForm({
                id: 'onChangeForm',
                isEnabled: false,
                schema: buildSchema({
                    id: 'changeForm',
                    fields: {
                        firstName: {
                            type: 'text',
                        },
                    },
                }),
                sections: [{}],
            })
        )
    }
}
