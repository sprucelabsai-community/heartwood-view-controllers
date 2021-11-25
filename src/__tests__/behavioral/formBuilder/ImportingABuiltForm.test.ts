import { validationErrorAssertUtil } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import EditFormBuilderSectionViewController from '../../../viewControllers/formBuilder/EditFormBuilderSection.vc'
import FormBuilderCardViewController, {
	FormBuilderImportExportObject,
} from '../../../viewControllers/formBuilder/FormBuilderCard.vc'

export default class ImportingABuiltFormTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		editFormBuilderSection: EditFormBuilderSectionViewController,
		formBuilderCard: FormBuilderCardViewController,
	}
	private static vc: FormBuilderCardViewController

	protected static async beforeEach() {
		await super.beforeEach()

		this.vc = this.Controller('formBuilderCard', {
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

		validationErrorAssertUtil.assertError(err, {
			missing: ['title', 'pages'],
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
		validationErrorAssertUtil.assertError(err, {
			invalid: ['pages'],
		})
	}

	@test()
	protected static async throwsWhenMissingSchema() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			this.vc.importObject({ title: 'go team', pages: [{ title: 'yay' }] })
		)

		validationErrorAssertUtil.assertError(err, {
			missing: ['pages.schema'],
		})
	}

	@test(`bad pages '[{}]'`, [{}])
	protected static async throwsMoreSPecificErrorsPassedBadPages(pages: any) {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			this.vc.importObject({ title: 'go team', pages })
		)

		validationErrorAssertUtil.assertError(err, {
			missing: ['pages.title', 'pages.schema', 'pages.sections'],
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
