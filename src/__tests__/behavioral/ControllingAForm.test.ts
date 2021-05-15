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
	protected static async canCreateUsingAFormViewController() {
		//@ts-ignore
		const vc = this.Controller('form', {})
		assert.isTruthy(vc)
	}

	@test()
	protected static async throwsWhenRenderingInvalidForm() {
		//@ts-ignore
		const vc = this.Controller('form', {})
		const err = assert.doesThrow(() => vc.render())

		errorAssertUtil.assertError(err, 'VALIDATION_FAILED')
	}

	@test()
	protected static async rendersValidForm() {
		const view = this.vc.render()

		validateSchemaValues(formSchema, view)
	}

	@test()
	protected static async formIsNotBusyToStart() {
		assert.isFalsy(this.vc.getIsBusy())
		const model = this.vc.render()
		assert.isFalsy(model.isBusy)
	}

	@test()
	protected static async canSetBusy() {
		this.vc.setIsBusy(true)
		assert.isTrue(this.vc.getIsBusy())
		const model = this.vc.render()
		assert.isTrue(model.isBusy)
	}

	@test()
	protected static async canGetValues() {
		const actual = this.vc.getValues()

		assert.isEqualDeep(actual, {})
	}

	@test()
	protected static async canSetValue() {
		this.vc.setValue('first', 'tay')
		const actual = this.vc.getValues()

		assert.isEqualDeep(actual, { first: 'tay' })
	}

	@test()
	protected static async errorsByFieldEmptyToStart() {
		const errorsByField = this.vc.getErrorsByField()
		assert.isLength(Object.keys(errorsByField), 0)
		assert.isFalse(this.vc.hasErrors())
	}

	@test()
	protected static async errorsByFieldShowsFirstDirtyFieldOnly() {
		const errorsByField = this.vc.getErrorsByField()
		assert.isLength(Object.keys(errorsByField), 0)
		assert.isFalse(this.vc.hasErrors())
	}

	@test()
	protected static async validateShowsAllErrors() {
		const errorsByField = this.vc.validate()
		assert.isLength(Object.keys(errorsByField), 2)
	}

	@test()
	protected static async errorsByFieldShowsFirstDirtyField() {
		this.vc.setValue('first', 'Tay')
		this.vc.setValue('first', '')

		const errorsByField = this.vc.getErrorsByField()
		assert.isLength(Object.keys(errorsByField), 1)

		assert.isLength(errorsByField.first, 1)
	}

	@test()
	protected static async fieldErrorsRendered() {
		this.vc.setValue('first', 'Test')
		let model = this.vc.render()

		assert.isLength(Object.keys(model.errorsByField ?? {}), 0)

		this.vc.setValue('first', '')

		model = this.vc.render()
		assert.isLength(Object.keys(model.errorsByField ?? {}), 1)
	}

	@test()
	protected static async settingErrorsSetsErrorsByField() {
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
	protected static async settingErrorsOverwritesLastErrorsByField() {
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
	protected static async submitControlsShowByDefault() {
		const model = this.vc.render()
		assert.isTrue(model.shouldShowSubmitControls)
	}

	@test()
	protected static async canHideAndShowSubmitControls() {
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

		this.vc.setValue('first', 'Tay')

		assert.isFalse(lastIsValid)
		assert.isLength(Object.keys(lastErrorsByField), 0)

		this.vc.setValue('first', '')

		assert.isFalse(lastIsValid)
		assert.isArray(lastErrorsByField.first)
	}

	@test()
	protected static async resettingAFormClearsValuesAndErrors() {
		this.vc.setValue('first', 'Test')
		const errors = this.vc.validate()
		this.vc.setErrorsByField(errors)
		assert.isTrue(this.vc.hasErrors())

		this.vc.reset()

		assert.isFalsy(this.vc.getValues().first)
		assert.isFalse(this.vc.hasErrors())
	}

	@test()
	protected static async resettingFormCallsRender() {
		//@ts-ignore
		const count = this.vc.__triggerRenderCount
		this.vc.reset()
		//@ts-ignore
		assert.isEqual(count + 1, this.vc.__triggerRenderCount)
	}

	@test()
	protected static async resetValuesAreNotSetByRef() {
		this.vc.reset()
		this.vc.setValue('first', 'Tets')
		//@ts-ignore
		assert.isFalsy(this.vc.originalValues.first)
	}
}
