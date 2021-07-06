import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import EditFormBuilderSectionViewController from '../../../viewControllers/formBuilder/EditFormBuilderSection.vc'
import FormBuilderViewController from '../../../viewControllers/formBuilder/FormBuilder.vc'

export default class ExportingABuiltFormTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		editFormBuilderSection: EditFormBuilderSectionViewController,
	}
	private static vc: FormBuilderViewController

	protected static async beforeEach() {
		await super.beforeEach()

		this.vc = this.Controller('formBuilder', {
			header: {
				title: 'My title',
				subtitle: 'why now?',
			},
		})
	}

	@test()
	protected static hasToObject() {
		assert.isFunction(this.vc.toObject)
	}

	@test('header title set 1', 'My title', 'why now?')
	@test('header title set 1', 'My title!', 'why not?')
	protected static exportsBasicToStart(title: string, subtitle: string) {
		this.vc = this.Controller('formBuilder', {
			header: {
				title,
				subtitle,
			},
		})

		const exported = this.vc.toObject()
		assert.isEqualDeep(exported, {
			title,
			subtitle,
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
						},
					},
					sections: [
						{
							title: 'Section 1',
							fields: [{ name: 'field1' }],
						},
					],
				},
			],
		})
	}

	@test()
	protected static async canExportNewPage() {
		await this.vc.addPage()
		const exported = this.vc.toObject()

		assert.isEqualDeep(exported.pages, [
			{
				title: 'Page 1',
				schema: {
					id: 'formBuilder1',
					fields: {
						field1: {
							type: 'text',
							label: 'Field 1',
						},
					},
				},
				sections: [
					{
						title: 'Section 1',
						fields: [{ name: 'field1' }],
					},
				],
			},
			{
				title: 'Page 2',
				schema: {
					id: 'formBuilder2',
					fields: {
						field1: {
							type: 'text',
							label: 'Field 1',
						},
					},
				},
				sections: [
					{
						title: 'Section 1',
						fields: [{ name: 'field1' }],
					},
				],
			},
		])
	}

	@test()
	protected static canExportNewSection() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addSection()

		const exported = this.vc.toObject()

		assert.isEqualDeep(exported.pages, [
			{
				title: 'Page 1',
				schema: {
					id: 'formBuilder1',
					fields: {
						field1: {
							type: 'text',
							label: 'Field 1',
						},
						field2: {
							type: 'text',
							label: 'Field 2',
						},
					},
				},
				sections: [
					{
						title: 'Section 1',
						fields: [{ name: 'field1' }],
					},
					{
						title: 'Section 2',
						fields: [{ name: 'field2' }],
					},
				],
			},
		])
	}
}
