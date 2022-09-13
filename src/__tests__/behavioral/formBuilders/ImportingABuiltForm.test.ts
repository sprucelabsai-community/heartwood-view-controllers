import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { FormBuilder } from '../../../types/heartwood.types'
import EditFormBuilderSectionCardViewController from '../../../viewControllers/formBuilder/EditFormBuilderSectionCard.vc'
import FormBuilderCardViewController from '../../../viewControllers/formBuilder/FormBuilderCard.vc'

export default class ImportingABuiltFormTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		editFormBuilderSection: EditFormBuilderSectionCardViewController,
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
	protected static async canImportCustomObject() {
		const simpleImport: FormBuilder = {
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
