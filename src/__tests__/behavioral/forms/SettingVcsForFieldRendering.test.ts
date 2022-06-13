import { buildSchema, SchemaFieldNames } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import FormViewController from '../../../viewControllers/form/Form.vc'
import SpyTextFieldInput from './SpyTextFieldInput'

export default class SettingVcsForFieldRenderingTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		textInput: SpyTextFieldInput,
	}
	private static formVc: FormViewController<FormSchema>
	private static firstNameVc: SpyTextFieldInput
	private static emailVc: SpyTextFieldInput

	protected static async beforeEach() {
		await super.beforeEach()

		this.firstNameVc = this.SpyInputVc()
		this.emailVc = this.SpyInputVc()

		this.formVc = this.FormVc()
	}

	@test('throws when vc not found 1', 'lastName')
	@test('throws when vc not found 2', 'age')
	protected static cantGetFieldVcWhenNoVcSet(fieldName: any) {
		const err = assert.doesThrow(() => this.formVc.getFieldVc(fieldName))
		errorAssert.assertError(err, 'NO_FIELD_VC_SET', {
			fieldName,
		})
	}

	@test()
	protected static async passesWhenFieldVcSet() {
		const vc = this.formVc.getFieldVc('firstName')
		assert.isEqual(vc, this.firstNameVc)

		const vc2 = this.formVc.getFieldVc('email')
		assert.isEqual(vc2, this.emailVc)
	}

	@test()
	protected static async settingValueOnFormCallsSetValueOnFieldVc() {
		const value = generateId()
		await this.formVc.setValue('firstName', value)
		assert.isEqual(this.firstNameVc.value, value)
	}

	@test('form decorates set value 1', 'new value')
	@test('form decorates set value 2', 'another value')
	protected static async formDecoratesSetValueOnVc(
		name: SchemaFieldNames<FormSchema>,
		value: string
	) {
		await this.firstNameVc.setValue(value)
		assert.isEqual(this.formVc.getValue('firstName'), value)

		await this.emailVc.setValue(value)
		assert.isEqual(this.formVc.getValue('email'), value)
	}

	@test()
	protected static async formVcCanStillSetRenderedValue() {
		const rendered = generateId()
		await this.firstNameVc.setValue('hey', rendered)
		assert.isEqual(this.firstNameVc.renderedValue, rendered)
	}

	@test()
	protected static async settingValueDoesNotClearRenderedValue() {
		await this.firstNameVc.setRenderedValue('hey!')
		await this.formVc.setValue('firstName', 'waka')
		assert.isEqual(this.firstNameVc.renderedValue, 'hey!')
	}

	@test('setting value from from model sets rendered value 1', generateId())
	@test('setting value from from model sets rendered value 2', '')
	protected static async settingValueFromFormModelWithRenderedDoesNotDirtyForm(
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
	protected static async settingRenderedValueToNullRestoresFormModelSetValueBehavior() {
		await this.firstNameVc.setRenderedValue(null)
		const model = this.render(this.formVc)
		model.setValue('firstName', 'hey')
		await this.wait(1)
		assert.isEqual(this.formVc.getValue('firstName'), 'hey')
	}

	@test()
	protected static async dirtySetAsExpectedWhenSettingValueOnField() {
		await this.emailVc.setValue('waka awka')
		assert.isTrue(this.formVc.getIsDirty())
	}

	@test()
	protected static async focusAndBlurHandlersCalled() {
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

		assert.isFalse(wasBlurHit)
		assert.isFalse(wasFocusHit)

		await interactor.focus(this.emailVc)

		assert.isFalse(wasBlurHit)
		assert.isTrue(wasFocusHit)

		await interactor.blur(this.emailVc)

		assert.isTrue(wasBlurHit)
		assert.isTrue(wasFocusHit)
	}

	private static FormVc() {
		return this.Controller(
			'form',
			buildForm({
				schema: formSchema,
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

	private static SpyInputVc(
		options?: Omit<TextInput, 'name'>
	): SpyTextFieldInput {
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
