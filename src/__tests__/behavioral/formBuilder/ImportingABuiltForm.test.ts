import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import EditFormBuilderSectionViewController from '../../../viewControllers/formBuilder/EditFormBuilderSection.vc'
import FormBuilderViewController from '../../../viewControllers/formBuilder/FormBuilder.vc'

export default class ImportingABuiltFormTest extends AbstractViewControllerTest {
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
	protected static importOb() {
		assert.isFunction(this.vc.importObject)
	}
}
