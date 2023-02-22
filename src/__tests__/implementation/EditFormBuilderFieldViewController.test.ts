import { SelectChoice } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import { fieldTypeChoices } from '../../constants'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import formAssert from '../../tests/utilities/formAssert'
import interactor from '../../tests/utilities/interactor'
import FormViewController from '../../viewControllers/form/Form.vc'
import {
	EditFormBuilderFieldCardViewController,
	EditFormBuilderFieldOptions,
} from '../../viewControllers/formBuilder/EditFormBuilderFieldCard.vc'
import FormBuilderCardViewController from '../../viewControllers/formBuilder/FormBuilderCard.vc'

export default class EditFormBuilderFieldViewControllerTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		editFormBuilderField: EditFormBuilderFieldCardViewController,
		formBuilderCard: FormBuilderCardViewController,
	}

	@test()
	protected static async throwsWhenMissingParameters() {
		const err = assert.doesThrow(() =>
			//@ts-ignore
			this.Controller('editFormBuilderField', {})
		)
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['name', 'field', 'onDone'],
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
		const formVc = formAssert.cardRendersForm(vc)
		assert.isEqual(formVc, vc.getFormVc())
	}

	@test()
	protected static shouldRenderNameLabelAndTypeAtLeast() {
		const formVc = this.Vc().getFormVc()
		this.assertRendersExpectedFields(formVc)
		formAssert.formDoesNotRenderField(formVc, 'selectOptions')
	}

	@test()
	protected static async shouldRenderTextAreaForSelectOptionsWhenTypeIsDropdown() {
		const formVc = this.Vc().getFormVc()

		await formVc.setValue('type', 'select')
		this.assertRendersExpectedFields(formVc)
		formAssert.formRendersField(formVc, 'selectOptions')

		await formVc.setValue('type', 'text')
		this.assertRendersExpectedFields(formVc)
		formAssert.formDoesNotRenderField(formVc, 'selectOptions')
	}

	@test()
	protected static shouldShowSelectOptionsIfTheyArePassedByDefault() {
		const formVc = this.Vc({
			//@ts-ignore
			field: { type: 'select' },
		}).getFormVc()

		this.assertRendersExpectedFields(formVc)
		formAssert.formRendersField(formVc, 'selectOptions')
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
			field: {
				...initialValues,
			},
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
			field: {
				label: 'First name2',
				//@ts-ignore
				type: 'text',
				options: {
					//@ts-ignore
					anythingGoes: true,
				},
			},
			onDone: (values) => {
				submittedResults = values
			},
		}).getFormVc()

		await interactor.submitForm(formVc)
		assert.isEqualDeep(submittedResults, {
			name: 'firstName2',
			isRequired: undefined,
			label: 'First name2',
			type: 'text',
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
			field: {
				label: 'First name2',
				type: 'select',
				options: {
					//@ts-ignore
					anythingGoes: true,
					choices: [{ value: 'one', label: 'One' }],
				},
			},
			onDone: (values) => {
				submittedResults = values
			},
		}).getFormVc()

		await interactor.submitForm(formVc)
		assert.isEqualDeep(submittedResults, {
			name: 'firstName2',
			label: 'First name2',
			isRequired: undefined,
			type: 'select',
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
			field: {
				//@ts-ignore
				anythingGoes: true,
				choices: [{ value: 'one', label: 'One' }],
			},
			onDone: (values) => {
				submittedResults = values
			},
		}).getFormVc()

		formAssert.formRendersField(formVc, 'isRequired')
		await formVc.setValue('isRequired', true)

		await interactor.submitForm(formVc)

		assert.isTrue(submittedResults.isRequired)
	}

	@test()
	protected static async canUpdateFieldChoices() {
		let passedChoices: SelectChoice[] | undefined

		const vc = this.Vc({
			name: 'color',
			label: 'Fav color',
			type: 'select',
			field: {
				//@ts-ignore
				choices: [{ value: 'one', label: 'One' }],
			},
			onDone: ({ options }) => {
				//@ts-ignore
				passedChoices = options.choices
			},
		})

		const input = 'Five\nSix \nSeven'
		const expected = input.split('\n').map((e) => ({
			label: e.trim(),
			value: namesUtil.toCamel(e.trim()),
		}))

		const form = vc.getFormVc()
		await form.setValue('selectOptions', input)

		await interactor.submitForm(form)
		assert.isEqualDeep(passedChoices, expected)
	}

	private static Vc(options?: Partial<EditFormBuilderFieldOptions>) {
		return this.Controller('editFormBuilderField', {
			name: 'firstName',
			onDone: () => {},
			//@ts-ignore
			field: {
				label: 'First name',
				type: 'text',
			},
			...options,
		})
	}

	private static assertRendersExpectedFields(formVc: FormViewController<any>) {
		formAssert.formRendersField(formVc, 'name')
		formAssert.formRendersField(formVc, 'label')
		formAssert.formRendersField(formVc, 'type', {
			type: 'select',
			options: {
				choices: fieldTypeChoices,
			},
		})
		assert.doesInclude(fieldTypeChoices, 'address')
	}
}

declare module '../../types/heartwood.types' {
	interface ViewControllerMap {
		editFormBuilderField: EditFormBuilderFieldCardViewController
	}

	export interface ViewControllerOptionsMap {
		editFormBuilderField: EditFormBuilderFieldOptions
	}
}
