import { buildSchema, SchemaFieldNames } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import formAssert from '../../../tests/utilities/formAssert'
import interactor from '../../../tests/utilities/interactor'
import {
	FormInputHandlers,
	FormInputOptions,
	FormInputViewController,
	ViewControllerOptions,
} from '../../../types/heartwood.types'
import FormViewController, {
	FormViewControllerOptions,
} from '../../../viewControllers/form/Form.vc'
import SpyTextFieldInput from './SpyTextFieldInput'

//@ts-ignore
class NoRenderedValueValueMethods
	implements FormInputViewController<TextInput>
{
	public model: FormInputOptions
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
}

export default class SettingVcsForFieldRenderingTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		textInput: SpyTextFieldInput,
		noRenderedValue: NoRenderedValueValueMethods,
	}
	private static formVc: FormViewController<FormSchema>
	private static firstNameVc: SpyTextFieldInput
	private static emailVc: SpyTextFieldInput

	protected static async beforeEach() {
		await super.beforeEach()

		this.firstNameVc = this.SpyInputVc()
		this.emailVc = this.SpyInputVc()

		this.formVc = this.FormVc()

		//@ts-ignore
		formAssert._setVcFactory(this.Factory())
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
		assert.isEqual(this.firstNameVc.getValue(), value)
	}

	@test()
	protected static async assertRequiresGetAndSetValues() {
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
	protected static async assertSetsGetsValuesToViewModel() {
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
	protected static async throwsWithNoRenderedValueGetSet() {
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
	protected static assertionThrowsWhenFormFieldDoesNotExist() {
		assert.doesThrow(
			() =>
				formAssert.formFieldRendersUsingInputVc(
					this.formVc,
					generateId(),
					this.firstNameVc
				),
			'not find'
		)
	}

	@test()
	protected static assertionFailsIfVcIsNotBeingUsed() {
		assert.doesThrow(
			() =>
				formAssert.formFieldRendersUsingInputVc(
					this.formVc,
					'firstName',
					this.emailVc
				),
			'did not render'
		)
	}

	@test()
	protected static async passesWhenFieldVcMatches() {
		formAssert.formFieldRendersUsingInputVc(
			this.formVc,
			'firstName',
			this.firstNameVc
		)
	}

	@test()
	protected static async renderedValueOfInputPassedToForm() {
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
	protected static async vcGetsInitialValueFromForm() {
		const firstName = generateId()
		this.formVc = this.FormVc({
			firstName,
		})

		assert.isEqual(this.firstNameVc.getValue(), firstName)
	}

	@test()
	protected static async settingValueOnFormFiresChangeOnField() {
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
	protected static async willChangeOnlyFiredOnceWhenSettingValue() {
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

	private static FormVc(
		values: Record<string, any> = {},
		options?: Partial<FormViewControllerOptions<any>>
	) {
		return this.Controller(
			'form',
			buildForm({
				schema: formSchema,
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
