import { test, assert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import listAssert from '../../../tests/utilities/listAssert'
import EditFormBuilderSectionCardViewController, {
	SimpleSection,
} from '../../../viewControllers/formBuilder/EditFormBuilderSectionCard.vc'
import FormBuilderCardViewController from '../../../viewControllers/formBuilder/FormBuilderCard.vc'

export default class InstructionSectionsDoNotRenderFieldsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		'form-builder-card': FormBuilderCardViewController,
	}

	private static builderVc: FormBuilderCardViewController
	private static passedValues: SimpleSection | undefined
	private static editSectionVc: EditFormBuilderSectionCardViewController

	private static get editSectionFormVc() {
		return this.editSectionVc.getFormVc()
	}

	protected static async beforeEach() {
		await super.beforeEach()
		this.builderVc = this.Controller('form-builder-card', {
			shouldAllowEditing: true,
		})
		this.passedValues = undefined
		this.editSectionVc = this.EditSectionVc()
	}

	@test()
	protected static async canCreateInstructionSectionsDoNotRenderFields() {
		await this.setSectionType('text')
		await this.editSectionFormVc.setValue('text', generateId())
		await this.submitEditForm()
		assert.isFalsy(this.passedValues?.fields)
	}

	@test()
	protected static async whenSettingBackToFieldsItDropsInRowForField() {
		this.makeTextSection()

		await this.setSectionType('form')
		this.assert1FieldRow()
	}

	@test()
	protected static async dontAddMoreThanOneRowWhenChangingSectionType() {
		this.makeTextSection()
		await this.setSectionType('form')
		await this.setSectionType('text')
		await this.setSectionType('form')
	}

	@test()
	protected static async dontAddRowIfComingInAsForm() {
		await this.setSectionType('text')
		await this.setSectionType('form')
		this.assertTotalFieldRows(2)
	}

	private static assert1FieldRow() {
		const expected = 1
		this.assertTotalFieldRows(expected)
	}

	private static assertTotalFieldRows(expected: number) {
		const listVc = this.editSectionVc.getFieldListVc()
		listAssert.listRendersRows(listVc, expected)
	}

	private static makeTextSection() {
		this.editSectionVc = this.EditSectionVc({
			fields: undefined,
			type: 'text',
			text: 'go dogs!',
		})
	}

	private static EditSectionVc(
		section?: Partial<SimpleSection>
	): EditFormBuilderSectionCardViewController {
		return this.builderVc.EditSectionVc({
			onDone: (values) => {
				this.passedValues = values
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
				...section,
			},
		})
	}

	private static async submitEditForm() {
		await interactor.submitForm(this.editSectionFormVc)
	}

	private static async setSectionType(type: 'text' | 'form') {
		await this.editSectionFormVc.setValue('type', type)
	}
}
