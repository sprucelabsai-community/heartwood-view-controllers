import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssertUtil from '../../../tests/utilities/vcAssert.utility'
import FormViewController from '../../../viewControllers/Form.vc'
import FormBuilderViewController from '../../../viewControllers/formBuilder/FormBuilder.vc'
import FormBuilderAddSectionViewController, {
	AddFormBuilderSectionSchema,
} from '../../../viewControllers/formBuilder/FormBuilderAddSection.vc'
import ListViewController from '../../../viewControllers/list/List.vc'

export default class AddingAFormSectionTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
	private static vc: FormBuilderViewController
	private static addSectionVc: FormBuilderAddSectionViewController
	private static formVc: FormViewController<AddFormBuilderSectionSchema>
	private static fieldListVc: ListViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Controller('formBuilder', {})
		this.addSectionVc = await this.showAddSection()
		this.formVc = vcAssertUtil.assertCardContainsForm(this.addSectionVc)
		this.fieldListVc = vcAssertUtil.assertCardRendersList(this.formVc)
	}

	@test()
	protected static handlesClickingAddSection() {
		assert.isFunction(this.vc.handleClickAddSection)
	}

	@test()
	protected static async cantClickBadSection() {
		const err = await assert.doesThrowAsync(() =>
			this.vc.handleClickAddSection(-1)
		)

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['sectionIdx'],
		})
	}

	@test()
	protected static async clickingAddSectionShowsAddSectionDialog() {
		assert.isTruthy(this.addSectionVc)
		assert.isTrue(
			this.addSectionVc instanceof FormBuilderAddSectionViewController
		)
	}

	@test()
	protected static addSectionHasHeaderTtile() {
		const model = this.render(this.addSectionVc)
		assert.isString(model.header?.title)
	}

	@test()
	protected static formRendersExpectedFieldsAndSections() {
		assert.isEqual(this.formVc.getValue('title'), 'Section 2')

		this.formVc.setValue('title', 'My new section')

		assert.isEqual(this.formVc.getValue('type'), 'form')

		this.formVc.setValue('type', 'form')
		this.formVc.setValue('shouldRenderAsGrid', true)

		vcAssertUtil.assertFormRendersField(this.formVc, 'title')
		vcAssertUtil.assertFormRendersField(this.formVc, 'type')
		vcAssertUtil.assertFormRendersField(this.formVc, 'shouldRenderAsGrid')

		assert.isEqual(this.fieldListVc.getTotalRows(), 1)
	}

	@test()
	protected static async defaultSectionTitleIncrementsWithSectionInTheCurrentPage() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addSection()

		const formVc = this.vc.AddSectionVc().getFormVc()

		assert.isEqual(formVc.getValue('title'), 'Section 3')
	}

	@test()
	protected static footerShouldHaveAddFieldAndSaveButtons() {
		const model = this.render(this.formVc)
		assert.isFalse(model.shouldShowCancelButton)
		assert.doesInclude(model.footer?.buttons?.[0].label, 'Add field')
		assert.isEqual(model.submitButtonLabel, 'Done')
	}

	@test()
	protected static async clickingAddFieldAddsRowToList() {
		const model = this.render(this.formVc)
		await this.click(model.footer?.buttons?.[0])

		vcAssertUtil.assertTriggerRenderCount(this.fieldListVc, 1)

		const listVc = vcAssertUtil.assertCardRendersList(this.formVc)

		assert.isEqual(listVc.getTotalRows(), 2)

		await this.click(model.footer?.buttons?.[0])

		assert.isEqual(listVc.getTotalRows(), 3)
	}

	@test()
	protected static switchingSectionToInstructionsHidesFormRelatedFields() {
		this.formVc.setValue('type', 'text')

		vcAssertUtil.assertFormDoesNotRenderField(this.formVc, 'shouldRenderAsGrid')
		vcAssertUtil.assertCardDoesNotRenderList(this.formVc)
		vcAssertUtil.assertFormRendersField(this.formVc, 'text')

		const model = this.render(this.formVc)
		assert.isFalsy(model.footer)
	}

	private static async showAddSection() {
		let addSectionVc: FormBuilderAddSectionViewController | undefined

		await vcAssertUtil.assertRendersDialog(
			this.vc,
			() => this.vc.handleClickAddSection(0),
			(vc) => {
				addSectionVc = vc.getCardVc() as FormBuilderAddSectionViewController
			}
		)
		return addSectionVc as FormBuilderAddSectionViewController
	}
}
