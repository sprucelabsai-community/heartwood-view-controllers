import { validateSchemaValues, buildSchema } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import formSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/form.schema'
import { interactionUtil } from '../..'
import buildForm from '../../builders/buildForm'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import vcAssertUtil from '../../tests/utilities/vcAssert.utility'
import { FormViewController } from '../../types/heartwood.types'

const testForm = buildForm({
	id: 'testForm',
	schema: {
		id: 'test',
		fields: {
			first: {
				type: 'text',
				isRequired: true,
			},
			last: {
				type: 'text',
			},
			nickname: {
				type: 'text',
				isRequired: true,
			},
			favoriteNumber: {
				type: 'number',
			},
		},
	},
	sections: [
		{
			fields: ['first'],
		},
		{
			fields: ['last', 'nickname'],
		},
		{
			fields: [{ name: 'favoriteNumber' }],
		},
	],
})
export default class UsingAFormViewControllerTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
	private static vc: FormViewController<typeof testForm['schema']>

	private static readonly testForm = testForm

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
	protected static badValuesDontMessAnythingUp() {
		const vc = this.Controller('form', {
			...this.testForm,
			values: undefined,
		})

		vc.setValue('first', true)
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

		assert.isEqualDeep(actual, {})
	}

	@test()
	protected static canSetValue() {
		this.vc.setValue('first', 'tay')
		const actual = this.vc.getValues()

		assert.isEqualDeep(actual, { first: 'tay' })
	}

	@test()
	protected static errorsByFieldEmptyToStart() {
		const errorsByField = this.vc.getErrorsByField()
		assert.isLength(Object.keys(errorsByField), 0)
		assert.isFalse(this.vc.hasErrors())
	}

	@test()
	protected static errorsByFieldShowsFirstDirtyFieldOnly() {
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
	protected static errorsByFieldShowsFirstDirtyField() {
		this.vc.setValue('first', 'Tay')
		this.vc.setValue('first', '')

		const errorsByField = this.vc.getErrorsByField()
		assert.isLength(Object.keys(errorsByField), 1)

		assert.isLength(errorsByField.first, 1)
	}

	@test()
	protected static fieldErrorsRendered() {
		this.vc.setValue('first', 'Test')
		let model = this.vc.render()

		assert.isLength(Object.keys(model.errorsByField ?? {}), 0)

		this.vc.setValue('first', '')

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
	protected static onChangesReportAsExpected() {
		let lastIsValid: any
		let lastErrorsByField: any

		this.vc = this.Controller('form', {
			...this.testForm,
			onChange: ({ isValid, errorsByField }) => {
				lastIsValid = isValid
				lastErrorsByField = errorsByField
			},
		}) as any

		this.vc.setValue('first', 'Tay')

		assert.isFalse(lastIsValid)
		assert.isLength(Object.keys(lastErrorsByField), 0)

		this.vc.setValue('first', '')

		assert.isFalse(lastIsValid)
		assert.isArray(lastErrorsByField.first)
	}

	@test()
	protected static resettingAFormClearsValuesAndErrors() {
		this.vc.setValue('first', 'Test')
		const errors = this.vc.validate()
		this.vc.setErrorsByField(errors)
		assert.isTrue(this.vc.hasErrors())

		this.vc.reset()

		assert.isFalsy(this.vc.getValues().first)
		assert.isFalse(this.vc.hasErrors())
	}

	@test()
	protected static resettingFormCallsRender() {
		//@ts-ignore
		const count = this.vc.__renderInvocationCount
		this.vc.reset()
		//@ts-ignore
		assert.isEqual(count + 1, this.vc.__renderInvocationCount)
	}

	@test()
	protected static resetValuesAreNotSetByRef() {
		this.vc.reset()
		this.vc.setValue('first', 'Tets')
		//@ts-ignore
		assert.isFalsy(this.vc.originalValues.first)
	}

	@test()
	protected static canResetField() {
		const vc: FormViewController<typeof testForm['schema']> = this.Controller(
			'form',
			buildForm({
				...testForm,
				values: {
					first: 'tay',
				},
			})
		) as any

		vc.setValue('first', '2000')

		assert.isEqual(vc.getValues().first, '2000')

		vc.resetField('first')

		assert.isEqual(vc.getValues().first, 'tay')
	}

	@test()
	protected static resetFieldsClearsItsErrors() {
		this.vc.setValue('favoriteNumber', 'aoeu')

		let errs = this.vc.getErrorsByField()
		assert.isTruthy(errs.favoriteNumber)

		this.vc.resetField('favoriteNumber')

		errs = this.vc.getErrorsByField()
		assert.isFalsy(errs.favoriteNumber)
	}

	@test()
	protected static throwsGettingBadSection() {
		const err1 = assert.doesThrow(() => this.vc.getSection(-1))

		errorAssertUtil.assertError(err1, 'INVALID_PARAMETERS', {
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
		assert.isLength(testForm.sections, 3)
	}

	@test()
	protected static addingSectionShouldTriggerRender() {
		this.vc.addSection({ title: 'go!', fields: [] })
		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static cantAddWithoutSpecifyingFieldAndSection() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.addFields({}))

		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
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

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
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

		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static hasUpdateSectionMethod() {
		assert.isFunction(this.vc.setSection)
	}

	@test()
	protected static validatesUpdate() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.setSection())

		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['sectionIdx', 'newSection'],
		})
	}

	@test()
	protected static validatesUpdateForUpdates() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.setSection(0))

		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['newSection'],
		})
	}

	@test()
	protected static throwsWithbadSectionOnUpdate() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.setSection(-1, {}))

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
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

		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)
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

		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)
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
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['fieldName', 'updates'],
		})
	}

	@test()
	protected static cantUpdateWithouSupplyingUpdates() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.setField('test'))
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
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
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
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
		assert.isTruthy(testForm.schema.fields.favoriteNumber)

		vcAssertUtil.assertFormRendersField(this.vc, 'secondFavoriteNumber')
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
		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)

		this.vc.disable()
		vcAssertUtil.assertTriggerRenderCount(this.vc, 2)

		vcAssertUtil.assertFormIsDisabled(this.vc)
		vcAssertUtil.assertFormIsNotBusy(this.vc)

		this.vc.setIsBusy(true)
		this.vc.disable()

		vcAssertUtil.assertFormIsBusy(this.vc)

		this.vc.enable()
		vcAssertUtil.assertTriggerRenderCount(this.vc, 5)

		vcAssertUtil.assertFormIsBusy(this.vc)
		vcAssertUtil.assertFormIsEnabled(this.vc)
	}

	@test()
	protected static settingValuesTriggersOnChange() {
		let wasHit = false

		const onChange = () => {
			wasHit = true
		}
		const vc = this.FormWithOnChange(onChange)

		vc.setValues({})

		assert.isTrue(wasHit)
	}

	@test()
	protected static async settingValuesOnChangePassesExpectedPayload() {
		const changeOptions: any[] = []

		const vc = this.FormWithOnChange((options) => {
			changeOptions.push(options)
		})

		vc.setValue('firstName', 'tay')
		vc.setValues({ firstName: 'tay' })

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
		await interactionUtil.submitForm(vc)
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

		vcAssertUtil.assertFormIsDisabled(vc)
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
