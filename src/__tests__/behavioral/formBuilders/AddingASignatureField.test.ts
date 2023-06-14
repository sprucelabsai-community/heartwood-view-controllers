import { IFieldDefinition, Schema } from '@sprucelabs/schema'
import { test, assert, generateId } from '@sprucelabs/test-utils'
import { FormBuilderFieldType, formBuilderFieldTypes } from '../../../constants'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import { FieldRenderOptions } from '../../../types/heartwood.types'
import EditFormBuilderFieldCardViewController from '../../../viewControllers/formBuilder/EditFormBuilderFieldCard.vc'

export default class AddingASignatureFieldTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		'edit-form-builder-field': EditFormBuilderFieldCardViewController,
	}

	private static passedOptions: IFieldDefinition | undefined
	private static passedRenderOptions:
		| FieldRenderOptions<Schema>
		| undefined
		| null
	private static vc: EditFormBuilderFieldCardViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.passedOptions = undefined
		this.passedRenderOptions = undefined

		this.reset('sig', {
			type: 'text',
		})
	}

	@test()
	protected static async hasSignatureAsPartOffFieldTypes() {
		assert.isEqual(formBuilderFieldTypes.signature, 'Signature')
	}

	@test()
	protected static async passesBackRenderAsOptionsWhenEditingField() {
		const name = generateId()

		this.reset(name, {
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
		assert.isFalsy(this.passedRenderOptions)
	}

	private static async selectTypeAndSave(type: FormBuilderFieldType) {
		const formVc = await this.selectType(type)
		await interactor.submitForm(formVc)
	}

	private static async selectType(type: string) {
		const formVc = this.vc.getFormVc()
		await formVc.setValue('type', type)
		return formVc
	}

	private static reset(name: string, definition: FieldDefinition) {
		this.vc = this.Controller('edit-form-builder-field', {
			name,
			field: definition as any,
			onDone: (options, renderOptions) => {
				this.passedOptions = options
				this.passedRenderOptions = renderOptions
			},
		})
	}
}
