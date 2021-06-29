import { validateSchemaValues } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import formSchema from '#spruce/schemas/heartwood/v2021_02_11/form.schema'
import buildForm from '../../builders/buildForm'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
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
				code: 'invalid_value',
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
				code: 'invalid_value',
				name: 'first',
			},
		])

		this.vc.setErrors([
			{
				code: 'invalid_value',
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
			parameters: ['sectionIndex'],
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
}
