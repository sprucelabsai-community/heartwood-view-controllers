import { validateSchemaValues, buildSchema } from '@sprucelabs/schema'
import { locationSchema } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import formSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/form.schema'
import { interactionUtil } from '../../..'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import formTestUtil from '../../../tests/utilities/formTest.utility'
import vcAssert from '../../../tests/utilities/vcAssert.utility'
import { FormViewController } from '../../../types/heartwood.types'
import { testFormOptions } from './testFormOptions'

export default class UsingAFormViewControllerTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
	private static vc: FormViewController<typeof testFormOptions['schema']>

	private static readonly testForm = testFormOptions

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Controller('form', {
			...this.testForm,
		}) as any
	}

	@test()
	protected static canCreateUsingAFormViewController() {
		//@ts-ignore
		const vc = this.Controller('form', {})
		assert.isTruthy(vc)
	}

	@test()
	protected static async badValuesDontMessAnythingUp() {
		const vc = this.Controller('form', {
			...this.testForm,
			values: undefined,
		})

		await vc.setValue('first', true)
	}

	@test()
	protected static rendersValidForm() {
		const view = this.vc.render()

		validateSchemaValues(formSchema, view)
	}

	@test()
	protected static formIsNotBusyToStart() {
		assert.isFalsy(this.vc.getIsBusy())
		const model = this.vc.render()
		assert.isFalsy(model.isBusy)
	}

	@test()
	protected static canSetBusy() {
		this.vc.setIsBusy(true)
		assert.isTrue(this.vc.getIsBusy())
		const model = this.vc.render()
		assert.isTrue(model.isBusy)
	}

	@test()
	protected static canGetValues() {
		const actual = this.vc.getValues()

		assert.isEqualDeep(actual, {
			last: undefined,
			first: undefined,
			nickname: undefined,
			favoriteNumber: undefined,
		})
	}

	@test()
	protected static async canSetValue() {
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
	protected static errorsByFieldEmptyToStart() {
		const errorsByField = this.vc.getErrorsByField()
		assert.isLength(Object.keys(errorsByField), 0)
		assert.isFalse(this.vc.hasErrors())
	}

	@test()
	protected static errorsByFieldShowsFirstDirtyFiel() {
		const errorsByField = this.vc.getErrorsByField()
		assert.isLength(Object.keys(errorsByField), 0)
		assert.isFalse(this.vc.hasErrors())
	}

	@test()
	protected static validateShowsAllErrors() {
		const errorsByField = this.vc.validate()
		assert.isLength(Object.keys(errorsByField), 2)
	}

	@test()
	protected static async errorsByFieldShowsFirstDirtyField() {
		await this.vc.setValue('first', 'Tay')
		await this.vc.setValue('first', '')

		const errorsByField = this.vc.getErrorsByField()
		assert.isLength(Object.keys(errorsByField), 1)

		assert.isLength(errorsByField.first, 1)
	}

	@test()
	protected static async fieldErrorsRendered() {
		await this.vc.setValue('first', 'Test')

		let model = this.vc.render()

		assert.isLength(Object.keys(model.errorsByField ?? {}), 0)

		await this.vc.setValue('first', '')

		model = this.vc.render()
		assert.isLength(Object.keys(model.errorsByField ?? {}), 1)
	}

	@test()
	protected static settingErrorsSetsErrorsByField() {
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
	protected static settingErrorsOverwritesLastErrorsByField() {
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
	protected static submitControlsShowByDefault() {
		const model = this.vc.render()
		assert.isTrue(model.shouldShowSubmitControls)
	}

	@test()
	protected static canHideAndShowSubmitControls() {
		this.vc.hideSubmitControls()
		assert.isFalse(this.vc.render().shouldShowSubmitControls)
		this.vc.showSubmitControls()
		assert.isTrue(this.vc.render().shouldShowSubmitControls)
	}

	@test()
	protected static async onChangesReportAsExpected() {
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
	protected static async resettingAFormClearsValuesAndErrors() {
		await this.vc.setValue('first', 'Test')

		const errors = this.vc.validate()

		this.vc.setErrorsByField(errors)
		assert.isTrue(this.vc.hasErrors())

		await this.vc.reset()

		assert.isFalsy(this.vc.getValues().first)
		assert.isFalse(this.vc.hasErrors())
	}

	@test()
	protected static async resettingFormCallsRender() {
		//@ts-ignore
		const count = this.vc.__renderInvocationCount

		await this.vc.reset()

		//@ts-ignore
		assert.isEqual(count + 1, this.vc.__renderInvocationCount)
	}

	@test()
	protected static async resetValuesAreNotSetByRef() {
		await this.vc.reset()
		await this.vc.setValue('first', 'Tets')
		//@ts-ignore
		assert.isFalsy(this.vc.originalValues.first)
	}

	@test()
	protected static async canResetField() {
		const vc: FormViewController<typeof testFormOptions['schema']> =
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
	protected static async resetFieldsClearsItsErrors() {
		await this.vc.setValue('favoriteNumber', 'aoeu')

		let errs = this.vc.getErrorsByField()
		assert.isTruthy(errs.favoriteNumber)

		await this.vc.resetField('favoriteNumber')

		errs = this.vc.getErrorsByField()
		assert.isFalsy(errs.favoriteNumber)
	}

	@test()
	protected static throwsGettingBadSection() {
		const err1 = assert.doesThrow(() => this.vc.getSection(-1))

		errorAssert.assertError(err1, 'INVALID_PARAMETERS', {
			parameters: ['sectionIdx'],
		})
	}

	@test()
	protected static cancelButtonDefaultsToShowing() {
		assert.isTrue(this.vc.shouldShowCancelButton())
		assert.isTrue(this.render(this.vc).shouldShowCancelButton)
	}

	@test()
	protected static canCheckIfCancelButtonIsShowing() {
		const vc = this.Controller('form', {
			...this.testForm,
			shouldShowCancelButton: false,
		})

		assert.isFalse(vc.shouldShowCancelButton())
		const model = this.render(vc)

		assert.isFalse(model.shouldShowCancelButton)
	}

	@test()
	protected static cancelButtonIsNotShowingIfSubmitControlsAreNotShowing() {
		const vc = this.Controller('form', {
			...this.testForm,
			shouldShowSubmitControls: false,
		})

		assert.isFalse(vc.shouldShowCancelButton())
	}

	@test()
	protected static defaultSubmitButtonLabel() {
		assert.isEqual(this.vc.getSubmitButtonLabel(), 'Go!')
		assert.isEqual(this.render(this.vc).submitButtonLabel, 'Go!')
	}

	@test()
	protected static canSetSubmitButtonLabel() {
		const vc = this.Controller('form', {
			...this.testForm,
			submitButtonLabel: 'Waka',
		})

		assert.isEqual(vc.getSubmitButtonLabel(), 'Waka')
		assert.isEqual(this.render(vc).submitButtonLabel, 'Waka')
	}

	@test()
	protected static addingSectionShouldNotMutateModel() {
		this.vc.addSection({ title: 'go!', fields: [] })
		//test against original form schema to see if it was mutated
		assert.isLength(testFormOptions.sections, 3)
	}

	@test()
	protected static addingSectionShouldTriggerRender() {
		this.vc.addSection({ title: 'go!', fields: [] })
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static cantAddWithoutSpecifyingFieldAndSection() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.addFields({}))

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['sectionIdx', 'fields'],
		})
	}

	@test()
	protected static cantAddFieldToSectionThatDoesNotExist() {
		const err = assert.doesThrow(() =>
			this.vc.addFields({
				sectionIdx: -1,
				fields: {},
			})
		)

		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['sectionIdx'],
		})
	}

	@test()
	protected static addingAFieldToSectionAddsToSchemaAndSection() {
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
	protected static canAddMultipleFields() {
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
	protected static addingFieldTriggersRender() {
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
	protected static hasUpdateSectionMethod() {
		assert.isFunction(this.vc.setSection)
	}

	@test()
	protected static validatesUpdate() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.setSection())

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['sectionIdx', 'newSection'],
		})
	}

	@test()
	protected static validatesUpdateForUpdates() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.setSection(0))

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['newSection'],
		})
	}

	@test()
	protected static throwsWithbadSectionOnUpdate() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.setSection(-1, {}))

		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['sectionIdx'],
		})
	}

	@test()
	protected static canUpdateFirstSectionTitle() {
		this.vc.setSection(0, {
			title: 'Hey gang!',
		})

		let model = this.render(this.vc)

		assert.isEqual(model.sections[0].title, 'Hey gang!')
		//@ts-ignore
		this.vc.setSection(0, { title: 'go again!', fields: ['cheesy'] })

		model = this.render(this.vc)

		assert.isEqual(model.sections[0].title, 'go again!')
		//@ts-ignore
		assert.isEqual(model.sections[0].fields[0], 'cheesy')
	}

	@test()
	protected static udpateSectionUpdatesEverything() {
		this.vc.setSection(0, {
			title: 'Hey gang!',
			fields: ['first'],
			text: {
				content: 'Waka waka!',
			},
		})

		assert.isEqualDeep(this.vc.getSection(0), {
			title: 'Hey gang!',
			fields: ['first'],
			text: {
				content: 'Waka waka!',
			},
		})
	}

	@test()
	protected static updatesTriggerRender() {
		this.vc.setSection(0, {
			title: 'doobey',
		})

		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static canSetThenHideFooterButtons() {
		this.vc.setFooter({
			buttons: [
				{
					label: 'What the?',
				},
			],
		})

		let model = this.render(this.vc)
		assert.isEqual(model.footer?.buttons?.[0].label, 'What the?')

		this.vc.hideSubmitControls()

		model = this.render(this.vc)
		assert.isFalsy(model.footer)
	}

	@test()
	protected static canUpdateSectionsAndTriggerRender() {
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
	protected static canUpdateFooter() {
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
	protected static cantUpdateWhenMissingEverything() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.setField())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['fieldName', 'updates'],
		})
	}

	@test()
	protected static cantUpdateWithouSupplyingUpdates() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.setField('test'))
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['updates'],
		})
	}

	@test('cant update field with bad name deli', 'deli')
	@test('cant update field with bad name random', `${Math.random()}`)
	protected static cantUpdateFieldThatDoesNotExist(name: any) {
		const err = assert.doesThrow(() =>
			this.vc.setField(name, {
				//@ts-ignore
				fieldDefinition: {},
			})
		)
		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['fieldName'],
		})
	}

	@test()
	protected static canUpdateFieldLabelDirectly() {
		this.vc.setField('first', {
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
	protected static canUpdateFieldLabelWithRenderOptions() {
		this.vc.setField('first', {
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
	protected static canUpdateLabelInFieldInNotFirstSection() {
		this.vc.setField('nickname', {
			renderOptions: { label: 'Cheesy burrito' },
		})

		const model = this.render(this.vc)

		assert.isEqualDeep(model.sections[1].fields, [
			'last',
			{ name: 'nickname', label: 'Cheesy burrito' },
		])
	}

	@test()
	protected static canRenameField() {
		this.vc.setField('favoriteNumber', {
			newName: 'secondFavoriteNumber',
		})

		const model = this.render(this.vc)

		//@ts-ignore
		assert.isTruthy(model.schema.fields.secondFavoriteNumber)
		assert.isFalsy(model.schema.fields.favoriteNumber)
		assert.isTruthy(testFormOptions.schema.fields.favoriteNumber)

		vcAssert.assertFormRendersField(this.vc, 'secondFavoriteNumber')
	}

	@test()
	protected static canRenameWhileUpdatingDefinitionAndRenderOptions() {
		this.vc.setField('favoriteNumber', {
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
	protected static canDisableForm() {
		this.vc.setIsBusy(false)
		vcAssert.assertTriggerRenderCount(this.vc, 1)

		this.vc.disable()
		vcAssert.assertTriggerRenderCount(this.vc, 2)

		vcAssert.assertFormIsDisabled(this.vc)
		vcAssert.assertFormIsNotBusy(this.vc)

		this.vc.setIsBusy(true)
		this.vc.disable()

		vcAssert.assertFormIsBusy(this.vc)

		this.vc.enable()
		vcAssert.assertTriggerRenderCount(this.vc, 5)

		vcAssert.assertFormIsBusy(this.vc)
		vcAssert.assertFormIsEnabled(this.vc)
	}

	@test()
	protected static async settingValuesTriggersOnChange() {
		let wasHit = false

		const onChange = () => {
			wasHit = true
		}
		const vc = this.FormWithOnChange(onChange)

		await vc.setValues({})

		assert.isTrue(wasHit)
	}

	@test()
	protected static async settingValuesOnChangePassesExpectedPayload() {
		const changeOptions: any[] = []

		const vc = this.FormWithOnChange((options) => {
			changeOptions.push(options)
		})

		await vc.setValue('firstName', 'tay')
		await vc.setValues({ firstName: 'tay' })

		assert.doesInclude(changeOptions[0], changeOptions[1])
		assert.doesInclude(changeOptions[1], changeOptions[0])
	}

	@test()
	protected static async cantSubmitIfNotEnabled() {
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
		await assert.doesThrowAsync(() => interactionUtil.submitForm(vc))
		assert.isFalse(wasHit)

		vc.enable()
		await interactionUtil.submitForm(vc)
		assert.isTrue(wasHit)
	}

	@test()
	protected static canStartOffDisabled() {
		const vc = this.Controller(
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

		vcAssert.assertFormIsDisabled(vc)
	}

	@test('is valid if required field is set', { name: 'test' }, [['name']], true)
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
	protected static onlyValidatesFieldsThatAreVisible(
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
	protected static async onSubmitOnlyReturnsVisibleValues(
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

		await interactionUtil.submitForm(vc)

		assert.isEqualDeep(actual, submittedValues)
	}

	@test()
	protected static async canCancelChangeWithOnChangeReturningFalse() {
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

	@test()
	protected static async canKeepChangeWithOnChangeReturningFalse() {
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

		await vc.setValue('name', 'Tay')
		assert.isEqual(vc.getValue('name'), 'Tay')

		await vc.submit()

		delete willChangeOptions.controller
		delete didChangeOptions.controller

		assert.isEqualDeep(willChangeOptions, {
			...didChangeOptions,
			values: { ...didChangeOptions.values, name: 'test' },
		})
	}

	@test()
	protected static async formsCanBeSetToThrowOnSubmit() {
		formTestUtil.patchSubmitToThrow()
		this.vc = this.Controller('form', {
			...this.testForm,
		}) as any
		await assert.doesThrowAsync(() => this.vc.submit())
		await interactionUtil.submitForm(this.vc)
		await assert.doesThrowAsync(() => this.vc.submit())
	}

	@test()
	protected static async canDisablePatchSubmitToThrow() {
		formTestUtil.disablePatchingSubmitToThrow()
		formTestUtil.patchSubmitToThrow()
		this.vc = this.Controller('form', {
			...this.testForm,
		}) as any
		await this.vc.submit()
	}

	@test()
	protected static async formsHaveOnCancel() {
		let wasHit = false
		const vc = this.Controller('form', {
			...this.testForm,
			onCancel: () => {
				wasHit = true
			},
		})

		const model = this.render(vc)
		model.onCancel?.()

		assert.isTrue(wasHit)
	}

	private static FormWithOnChange(onChange: (options: any) => void) {
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
					},
				}),
				onChange,
				sections: [{}],
			})
		)
	}
}
