import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import FormBuilderViewController, {
	FormBuilderImportExportObject,
	FormBuilderViewControllerOptions,
} from '../../../viewControllers/formBuilder/FormBuilder.vc'

export default class GettingFormBuilderValuesTest extends AbstractViewControllerTest {
	protected static controllerMap: Record<string, any> = {
		formBuilder: FormBuilderViewController,
	}

	private static readonly singlePageForm: FormBuilderImportExportObject = {
		title: 'Building your form',
		pages: [
			{
				title: 'Page 1',
				schema: {
					id: 'formBuilder1',
					fields: {
						field1: {
							type: 'text',
							label: 'Field 1',
						},
						firstName: {
							type: 'text',
							label: 'First name',
						},
						lastName: {
							type: 'text',
							label: 'Last name',
						},
						email: {
							type: 'text',
							label: 'Email',
						},
					},
				},
				sections: [
					{
						title: 'Section 1',
						shouldRenderAsGrid: false,
						fields: [
							{
								//@ts-ignore
								name: 'firstName',
							},
							{
								//@ts-ignore
								name: 'lastName',
							},
							{
								//@ts-ignore
								name: 'email',
							},
						],
					},
				],
			},
		],
	}

	private static readonly multiPageForm: FormBuilderImportExportObject = {
		title: 'Building your form',
		pages: [
			{
				title: 'Page 1',
				schema: {
					id: 'formBuilder1',
					fields: {
						field1: {
							type: 'text',
							label: 'Field 1',
						},
						firstName: {
							type: 'text',
							label: 'First name',
						},
						lastName: {
							type: 'text',
							label: 'Last name',
						},
						email: {
							type: 'text',
							label: 'Email',
						},
					},
				},
				sections: [
					{
						title: 'Section 1',
						shouldRenderAsGrid: false,
						fields: [
							{
								//@ts-ignore
								name: 'firstName',
							},
							{
								//@ts-ignore
								name: 'lastName',
							},
							{
								//@ts-ignore
								name: 'email',
							},
						],
					},
				],
			},
			{
				title: 'Page 1',
				schema: {
					id: 'formBuilder1',
					fields: {
						firstName: {
							type: 'text',
							label: 'First name',
						},
						lastName: {
							type: 'text',
							label: 'Last name',
						},
						email: {
							type: 'text',
							label: 'Email',
						},
					},
				},
				sections: [
					{
						title: 'Section 1',
						shouldRenderAsGrid: false,
						fields: [
							{
								//@ts-ignore
								name: 'firstName',
							},
							{
								//@ts-ignore
								name: 'lastName',
							},
							{
								//@ts-ignore
								name: 'email',
							},
						],
					},
				],
			},
		],
	}

	@test()
	protected static canCreateGettingFormBuilderValues() {
		const vc = this.Vc()
		assert.isFunction(vc.getValues)
	}

	@test()
	protected static getsGoodStartingValues() {
		const values = this.Vc().getValues()
		assert.isEqualDeep(values, [{ field1: undefined }])
	}

	@test()
	protected static async firstPageCanHaveMultipleFields() {
		const vc = this.Vc()
		await vc.importObject(this.singlePageForm)

		const expected = {
			firstName: 'hey',
			lastName: 'there!',
			email: 'whatever@whatever.com',
		}

		vc.getPageVc(0).setValues(expected)

		const values = vc.getValues()

		assert.isEqualDeep(values, [expected])
	}

	@test('cant set bad values {object}', { waka: true })
	protected static async cantSetBadValues(expected: any) {
		const vc = this.Vc()
		await vc.importObject(this.singlePageForm)

		const err = assert.doesThrow(() => vc.setValues(expected))
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['values'],
		})
	}

	@test()
	protected static async canSetGoodValuesToSinglePageForm() {
		const vc = this.Vc()
		await vc.importObject(this.singlePageForm)

		const expected = [
			{ firstName: 'tay', email: undefined, lastName: undefined },
		]
		vc.setValues(expected)

		const values = vc.getValues()
		assert.isEqualDeep(values, expected)
	}

	@test()
	protected static async canSetGoodValuesToMultiPageForm() {
		const vc = this.Vc()
		await vc.importObject(this.multiPageForm)

		const expected = [{ firstName: 'tay' }, { firstName: 'tayayay' }]
		vc.setValues(expected)

		const values = vc.getValues()
		assert.isEqualDeep(values, [
			{ firstName: 'tay', email: undefined, lastName: undefined },
			{ firstName: 'tayayay', email: undefined, lastName: undefined },
		])
	}

	@test()
	protected static async secondPageWorks() {
		const vc = this.Vc()
		await vc.importObject(this.multiPageForm)

		const expected1 = {
			firstName: 'what',
			lastName: 'aoeu!',
			email: 'whataoeuaoever@whatever.com',
		}
		const expected2 = {
			firstName: 'that',
			lastName: 'theaoeuaoeure!',
			email: 'whatever@whaaoeutever.com',
		}

		vc.getPageVc(0).setValues(expected1)
		vc.getPageVc(1).setValues(expected2)

		const values = vc.getValues()

		assert.isEqualDeep(values, [expected1, expected2])
	}

	private static Vc(options?: FormBuilderViewControllerOptions) {
		return this.Controller('formBuilder', { ...options })
	}
}
