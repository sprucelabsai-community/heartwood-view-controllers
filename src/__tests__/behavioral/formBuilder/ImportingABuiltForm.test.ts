import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import EditFormBuilderSectionViewController from '../../../viewControllers/formBuilder/EditFormBuilderSection.vc'
import FormBuilderViewController, {
	FormBuilderImportExportObject,
} from '../../../viewControllers/formBuilder/FormBuilder.vc'

export default class ImportingABuiltFormTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		editFormBuilderSection: EditFormBuilderSectionViewController,
		formBuilder: FormBuilderViewController,
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
	protected static hasImportFromObject() {
		assert.isFunction(this.vc.importObject)
	}

	@test()
	protected static async throwsWhenMissingFields() {
		//@ts-ignore
		const err = await assert.doesThrowAsync(() => this.vc.importObject())
		errorAssertUtil.assertError(err, 'VALIDATION_FAILED', {
			errors: [
				{
					options: {
						code: 'MISSING_PARAMETERS',
						parameters: ['title', 'pages'],
					},
				},
			],
		})
	}

	@test(`bad pages 'true'`, true)
	@test(`bad pages '[true]'`, [true])
	@test(`bad pages '['whaaa']'`, ['whaaa'])
	protected static async throwsWhenPassedBadPages(pages: any) {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			this.vc.importObject({ title: 'go team', pages })
		)
		errorAssertUtil.assertError(err, 'VALIDATION_FAILED', {
			errors: [
				{
					options: {
						code: 'INVALID_PARAMETERS',
						parameters: ['pages'],
					},
				},
			],
		})
	}

	@test()
	protected static async throwsWhenMissingSchema() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			this.vc.importObject({ title: 'go team', pages: [{ title: 'yay' }] })
		)
		errorAssertUtil.assertError(err, 'VALIDATION_FAILED', {
			errors: [
				{
					options: {
						code: 'MISSING_PARAMETERS',
						parameters: ['pages.schema', 'pages.sections'],
					},
				},
			],
		})
	}

	@test(`bad pages '[{}]'`, [{}])
	protected static async throwsMoreSPecificERrorsPassedBadPages(pages: any) {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			this.vc.importObject({ title: 'go team', pages })
		)
		errorAssertUtil.assertError(err, 'VALIDATION_FAILED', {
			errors: [
				{
					options: {
						code: 'MISSING_PARAMETERS',
						parameters: ['pages.title', 'pages.schema', 'pages.sections'],
					},
				},
			],
		})
	}

	@test()
	protected static async canImportCustomObject() {
		const simpleImport: FormBuilderImportExportObject = {
			title: 'Building your form',
			subtitle: 'a subtitle',
			pages: [
				{
					title: 'Page 1',
					schema: {
						id: 'formBuilder1',
						fields: {
							firstName: {
								type: 'text',
								label: 'First name',
							},
						},
					},
					sections: [
						{
							title: 'Personal Information',
							shouldRenderAsGrid: false,
							fields: [
								{
									//@ts-ignore
									name: 'firstName',
								},
							],
						},
					],
				},
			],
		}

		await this.vc.importObject(simpleImport)

		assert.isEqualDeep(await this.vc.toObject(), simpleImport)
	}
}
