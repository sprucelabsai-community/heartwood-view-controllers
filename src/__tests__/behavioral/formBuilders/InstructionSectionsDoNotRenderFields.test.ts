import { test, assert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import { SimpleSection } from '../../../viewControllers/formBuilder/EditFormBuilderSectionCard.vc'
import FormBuilderCardViewController from '../../../viewControllers/formBuilder/FormBuilderCard.vc'

export default class InstructionSectionsDoNotRenderFieldsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		'form-builder-card': FormBuilderCardViewController,
	}

	private static builderVc: FormBuilderCardViewController

	@test()
	protected static async canCreateInstructionSectionsDoNotRenderFields() {
		this.builderVc = this.Controller('form-builder-card', {
			shouldAllowEditing: true,
		})

		let passedValues: SimpleSection | undefined

		const editSectionVc = this.builderVc.EditSectionVc({
			onDone: (values) => {
				passedValues = values
			},
			editingSection: {
				title: generateId(),
				type: 'form',
				fields: [
					{
						type: 'text',
						renderOptions: {
							name: 'firstName' as never,
						},
					},
					{
						type: 'text',
						renderOptions: {
							name: 'lastName' as never,
						},
					},
				],
			},
		})

		const editSectionFormVc = editSectionVc.getFormVc()
		await editSectionFormVc.setValue('type', 'text')
		await editSectionFormVc.setValue('text', generateId())
		await interactor.submitForm(editSectionFormVc)

		assert.isFalsy(passedValues?.fields)
	}
}
