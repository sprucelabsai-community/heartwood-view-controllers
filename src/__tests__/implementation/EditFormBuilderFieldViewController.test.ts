import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import { fieldTypeChoices } from '../../constants'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import interactor from '../../tests/utilities/interactor'
import vcAssert from '../../tests/utilities/vcAssert.utility'
import { FormBuilderFieldType } from '../../types/heartwood.types'
import FormViewController from '../../viewControllers/Form.vc'
import {
	EditFormBuilderFieldCardViewController,
	EditFormBuilderFieldOptions,
} from '../../viewControllers/formBuilder/EditFormBuilderFieldCard.vc'
import FormBuilderCardViewController from '../../viewControllers/formBuilder/FormBuilderCard.vc'

declare module '../../types/heartwood.types' {
	interface ViewControllerMap {
		editFormBuilderField: EditFormBuilderFieldCardViewController
	}

	export interface ViewControllerOptionsMap {
		editFormBuilderField: EditFormBuilderFieldOptions
	}
}

export default class EditFormBuilderFieldViewControllerTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		editFormBuilderField: EditFormBuilderFieldCardViewController,
		formBuilderCard: FormBuilderCardViewController,
	}

	@test('throws when missing everything', {}, [
		'name',
		'label',
		'type',
		'options',
		'onDone',
	])
	@test('throws when supplied just name', { name: 'yay' }, [
		'label',
		'type',
		'options',
		'onDone',
	])
	@test(
		'throws when supplied just name and label',
		{ name: 'yay', label: 'go duck!' },
		['type', 'options', 'onDone']
	)
	@test(
		'throws when supplied just name, label, type',
		{ name: 'yay', label: 'go duck!', type: 'text' },
		['options', 'onDone']
	)
	@test(
		'throws when supplied just name, label, type, options',
		{ name: 'yay', label: 'go duck!', type: 'text', options: {} },
		['onDone']
	)
	protected static async throwsWhenMissingParameters(
		options: any,
		expected: string[]
	) {
		const err = assert.doesThrow(() =>
			this.Controller('editFormBuilderField', options)
		)
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: expected,
		})
	}

	@test('fails with type Jeepers', 'Jeepers')
	@test('fails with type Creepers', 'Creepers')
	@test('fails with type random', Math.random())
	protected static throwsWhenPassedBadType(type: FormBuilderFieldType) {
		const err = assert.doesThrow(() =>
			this.Controller('editFormBuilderField', {
				name: 'firstName',
				label: 'First name',
				onDone: () => {},
				type,
				options: {},
			})
		)
		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['type'],
		})
	}

	@test()
	protected static canBuildWithGoodOptions() {
		const vc = this.Vc()
		assert.isTruthy(vc)
	}

	@test()
	protected static shouldRenderFormAccessibleFromGetter() {
		const vc = this.Vc()
		const formVc = vcAssert.assertCardRendersForm(vc)
		assert.isEqual(formVc, vc.getFormVc())
	}

	@test()
	protected static shouldRenderNameLabelAndTypeAtLeast() {
		const formVc = this.Vc().getFormVc()
		this.assertRendersExpectedFields(formVc)
		vcAssert.assertFormDoesNotRenderField(formVc, 'selectOptions')
	}

	@test()
	protected static async shouldRenderTextAreaForSelectOptionsWhenTypeIsDropdown() {
		const formVc = this.Vc().getFormVc()

		await formVc.setValue('type', 'select')
		this.assertRendersExpectedFields(formVc)
		vcAssert.assertFormRendersField(formVc, 'selectOptions')

		await formVc.setValue('type', 'text')
		this.assertRendersExpectedFields(formVc)
		vcAssert.assertFormDoesNotRenderField(formVc, 'selectOptions')
	}

	@test()
	protected static shouldShowSelectOptionsIfTheyArePassedByDefault() {
		const formVc = this.Vc({
			type: 'select',
		}).getFormVc()

		this.assertRendersExpectedFields(formVc)
		vcAssert.assertFormRendersField(formVc, 'selectOptions')
	}

	@test('values set at construction 1', {
		name: 'firstName',
		label: 'First name',
		type: 'text',
		isRequired: undefined,
		options: {},
	})
	@test(
		'values set at construction 2',
		{
			name: 'firstName2',
			label: 'First name2',
			type: 'select',
			isRequired: undefined,
			options: {
				choices: [
					{ label: 'hey', value: 'hey' },
					{ label: 'Hey too', value: 'heyToo' },
				],
			},
		},
		'hey\nHey too'
	)
	protected static async setsFieldsPassedToConstructorAndBackFromSubmit(
		initialValues: any,
		expectedSelectOptions: string
	) {
		let submittedResults: any
		const formVc = this.Vc({
			...initialValues,
			onDone: (values) => {
				submittedResults = values
			},
		}).getFormVc()

		let expected = { ...initialValues }
		delete expected.options

		if (expectedSelectOptions) {
			expected.selectOptions = expectedSelectOptions
		}

		const actual = formVc.getValues()

		assert.isEqualDeep(actual, expected)
		await interactor.submitForm(formVc)
		assert.isEqualDeep(submittedResults, initialValues)
	}

	@test()
	protected static async retainsOptionsNotSupported() {
		let submittedResults: any
		const formVc = this.Vc({
			name: 'firstName2',
			label: 'First name2',
			type: 'text',
			options: {
				//@ts-ignore
				anythingGoes: true,
			},
			onDone: (values) => {
				submittedResults = values
			},
		}).getFormVc()

		await interactor.submitForm(formVc)
		assert.isEqualDeep(submittedResults, {
			name: 'firstName2',
			label: 'First name2',
			type: 'text',
			isRequired: undefined,
			options: {
				anythingGoes: true,
			},
		})
	}

	@test()
	protected static async retainsOptionsNotSupportedOnSelect() {
		let submittedResults: any
		const formVc = this.Vc({
			name: 'firstName2',
			label: 'First name2',
			type: 'select',
			options: {
				//@ts-ignore
				anythingGoes: true,
				choices: [{ value: 'one', label: 'One' }],
			},
			onDone: (values) => {
				submittedResults = values
			},
		}).getFormVc()

		await interactor.submitForm(formVc)
		assert.isEqualDeep(submittedResults, {
			name: 'firstName2',
			label: 'First name2',
			type: 'select',
			isRequired: undefined,
			options: {
				anythingGoes: true,
				choices: [{ value: 'one', label: 'One' }],
			},
		})
	}

	@test()
	protected static async rendersRequiredField() {
		let submittedResults: any
		const formVc = this.Vc({
			name: 'firstName2',
			label: 'First name2',
			type: 'select',
			options: {
				//@ts-ignore
				anythingGoes: true,
				choices: [{ value: 'one', label: 'One' }],
			},
			onDone: (values) => {
				submittedResults = values
			},
		}).getFormVc()

		vcAssert.assertFormRendersField(formVc, 'isRequired')
		await formVc.setValue('isRequired', true)

		await interactor.submitForm(formVc)

		assert.isTrue(submittedResults.isRequired)
	}

	private static Vc(options?: Partial<EditFormBuilderFieldOptions>) {
		return this.Controller('editFormBuilderField', {
			name: 'firstName',
			label: 'First name',
			type: 'text',
			onDone: () => {},
			options: {},
			...options,
		})
	}

	private static assertRendersExpectedFields(formVc: FormViewController<any>) {
		vcAssert.assertFormRendersField(formVc, 'name')
		vcAssert.assertFormRendersField(formVc, 'label')
		vcAssert.assertFormRendersField(formVc, 'type', {
			type: 'select',
			options: {
				choices: fieldTypeChoices,
			},
		})
		assert.doesInclude(fieldTypeChoices, 'ratings')
		assert.doesInclude(fieldTypeChoices, 'address')
	}
}
