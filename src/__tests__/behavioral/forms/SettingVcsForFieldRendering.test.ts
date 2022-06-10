import { buildSchema } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import { FormFieldViewController } from '../../..'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { ViewControllerOptions } from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'
import FormViewController from '../../../viewControllers/Form.vc'

class SpyTextFieldInput
	extends AbstractViewController<TextInput>
	implements FormFieldViewController
{
	public value?: string
	public name: string

	public constructor(options: ViewControllerOptions & { name: string }) {
		super(options)
		this.name = options.name
	}

	public async setValue(value: string) {
		this.value = value
	}

	public getValue() {}

	public render(): TextInput {
		return {
			name: 'test',
		}
	}
}

export default class SettingVcsForFieldRenderingTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		textInput: SpyTextFieldInput,
	}
	private static formVc: FormViewController<FormSchema>
	private static firstNameVc: SpyTextFieldInput
	private static emailVc: SpyTextFieldInput

	protected static async beforeEach() {
		await super.beforeEach()

		this.firstNameVc = this.Controller('textInput' as any, {
			name: 'firstName',
		}) as SpyTextFieldInput

		this.emailVc = this.Controller('textInput' as any, {
			name: 'email',
		}) as SpyTextFieldInput

		this.formVc = this.Controller(
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
}

type TextInput = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextInput

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
