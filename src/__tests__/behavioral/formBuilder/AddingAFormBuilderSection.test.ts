import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactionUtil from '../../../tests/utilities/interaction.utility'
import vcAssertUtil from '../../../tests/utilities/vcAssert.utility'
import DialogViewController from '../../../viewControllers/Dialog.vc'
import FormViewController from '../../../viewControllers/Form.vc'
import EditFormBuilderSectionViewController, {
	EditSectionSectionSchema,
	EditFormBuilderSectionOptions,
} from '../../../viewControllers/formBuilder/EditFormBuilderSection.vc'
import FormBuilderViewController from '../../../viewControllers/formBuilder/FormBuilder.vc'
import ListViewController from '../../../viewControllers/list/List.vc'

declare module '../../../types/heartwood.types' {
	interface ViewControllerMap {
		editFormBuilderSection: EditFormBuilderSectionViewController
	}

	export interface ViewControllerOptionsMap {
		editFormBuilderSection: EditFormBuilderSectionOptions
	}
}

export default class AddingAFormBuilderSectionTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		editFormBuilderSection: EditFormBuilderSectionViewController,
		formBuilder: FormBuilderViewController,
	}

	private static formBuilderVc: FormBuilderViewController
	private static vc: EditFormBuilderSectionViewController
	private static formVc: FormViewController<EditSectionSectionSchema>
	private static fieldListVc: ListViewController
	private static dialogVc: DialogViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.formBuilderVc = this.Controller('formBuilder', {})
		const { dialogVc, builderSectionVc } = await this.simulateAddSectionClick()
		this.vc = builderSectionVc
		this.dialogVc = dialogVc
		this.formVc = vcAssertUtil.assertCardRendersForm(this.vc) as any
		this.fieldListVc = vcAssertUtil.assertCardRendersList(this.formVc)
	}

	@test()
	protected static handlesClickingAddSection() {
		assert.isFunction(this.formBuilderVc.handleClickAddSection)
	}

	@test()
	protected static throwsWithMissinParams() {
		const err = assert.doesThrow(() =>
			//@ts-ignore
			this.Controller('editFormBuilderSection', {})
		)

		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['onDone'],
		})
	}

	@test('cant click bad section -1', -1)
	@test('cant click bad section 1', 1)
	@test('cant click bad section 2', 2)
	protected static async cantClickBadSection(sectionIdx: number) {
		const err = await assert.doesThrowAsync(() =>
			this.formBuilderVc.handleClickAddSection(sectionIdx)
		)

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['sectionIdx'],
		})
	}

	@test()
	protected static async clickingAddSectionShowsAddSectionDialog() {
		assert.isTruthy(this.vc)
		assert.isTrue(this.vc instanceof EditFormBuilderSectionViewController)
	}

	@test()
	protected static addSectionHasHeaderTtile() {
		const model = this.render(this.vc)
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
	protected static async startsWithOneRowInFields() {
		vcAssertUtil.assertListRendersRows(this.fieldListVc, 1)
		await this.fieldListVc.getRowVc(0).setValue('fieldName', 'what!')
		await this.fieldListVc.getRowVc(0).setValue('fieldType', 'text')
	}

	@test()
	protected static async defaultSectionTitleIncrementsWithSectionInTheCurrentPage() {
		const pageVc = this.formBuilderVc.getPageVc(0)
		pageVc.addSection()

		const formVc = this.formBuilderVc
			.EditSectionVc({ onDone: () => {} })
			.getFormVc()

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

		await interactionUtil.clickSecondaryInFooter(this.formVc)

		assert.isEqual(listVc.getTotalRows(), 3)
	}

	@test()
	protected static async addingFieldsIncrementsNameAndDefaultsToText() {
		this.vc.addField()
		this.vc.addField()
		this.vc.addField()

		const listVc = this.vc.getFieldListVc()

		for (let count = 0; count < listVc.getTotalRows(); count++) {
			const rowVc = listVc.getRowVc(count)
			assert.isEqual(rowVc.getValue('fieldName'), `Field ${count + 1}`)
			assert.isEqual(rowVc.getValue('fieldType'), `text`)
		}
	}

	@test()
	protected static async updatingFieldNameUpdatesInternalSimpleRows() {
		await this.fieldListVc.getRowVc(0).setValue('fieldName', 'Waka')
		await this.fieldListVc.getRowVc(0).setValue('fieldType', 'phone')

		//@ts-ignore
		assert.isEqualDeep(this.vc.rows, [
			{
				label: 'Waka',
				type: 'phone',
				//@ts-ignore
				name: 'field1',
			},
		])
	}

	@test()
	protected static async clickingDestructiveInFieldListRemovesField() {
		this.vc.addField()
		this.vc.addField()
		this.vc.addField()

		const listVc = this.vc.getFieldListVc()

		assert.isEqual(listVc.getRowVc(2).getValue('fieldName'), 'Field 3')
		assert.isEqual(listVc.getTotalRows(), 4)

		await interactionUtil.clickOnDestructiveButtonInRow(listVc, 2)

		//clicking cancel on confirmation
		await vcAssertUtil.assertRendersConfirm(
			this.vc,
			() => interactionUtil.clickOnDestructiveButtonInRow(listVc, 2),
			({ isDestructive }) => {
				assert.isTrue(isDestructive)

				return false
			}
		)

		assert.isEqual(listVc.getRowVc(2).getValue('fieldName'), 'Field 3')
		assert.isEqual(listVc.getTotalRows(), 4)

		//clicking confirm on confirmation
		await vcAssertUtil.assertRendersConfirm(
			this.vc,
			() => interactionUtil.clickOnDestructiveButtonInRow(listVc, 2),
			() => {
				return true
			}
		)

		assert.isEqual(listVc.getRowVc(2).getValue('fieldName'), 'Field 4')
		assert.isEqual(listVc.getTotalRows(), 3)

		//@ts-ignore
		this.vc.onDoneHandler = async (values) => {
			assert.isEqualDeep(values, {
				fields: [
					//@ts-ignore
					{ label: 'Field 1', type: 'text', name: 'field1' },
					//@ts-ignore
					{ label: 'Field 2', type: 'text', name: 'field2' },
					//@ts-ignore
					{ label: 'Field 4', type: 'text', name: 'field4' },
				],
				shouldRenderAsGrid: false,
				title: 'Section 2',
				type: 'form',
			})
		}

		//@ts-ignore
		await this.vc.handleSubmit()
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

	@test()
	protected static async clickingPrimaryInFooterGivesBackSection() {
		this.formVc.setValue('title', 'My new section')
		this.formVc.setValue('type', 'form')
		this.formVc.setValue('shouldRenderAsGrid', true)
		this.vc.addField()
		this.vc.addField()

		let wasOnDoneInvoked = false
		let onDoneValues: any = {}

		//@ts-ignore
		this.vc.onDoneHandler = (values) => {
			wasOnDoneInvoked = true
			onDoneValues = values
		}

		await interactionUtil.submitForm(this.formVc)

		assert.isTrue(wasOnDoneInvoked)
		assert.isEqualDeep(onDoneValues, {
			title: 'My new section',
			type: 'form',
			shouldRenderAsGrid: true,
			fields: [
				{
					label: 'Field 1',
					name: 'field1',
					type: 'text',
				},
				{
					label: 'Field 2',
					name: 'field2',
					type: 'text',
				},
				{
					label: 'Field 3',
					name: 'field3',
					type: 'text',
				},
			],
		})

		this.formVc.setValue('title', 'go again')
		this.formVc.setValue('type', 'text')
		this.formVc.setValue('text', 'how are you?')
		this.formVc.setValue('shouldRenderAsGrid', false)

		this.vc.addField()

		await interactionUtil.submitForm(this.formVc)

		assert.isEqualDeep(onDoneValues, {
			title: 'go again',
			type: 'text',
			shouldRenderAsGrid: false,
			text: 'how are you?',
			fields: [
				{
					label: 'Field 1',
					name: 'field1',
					type: 'text',
				},
				{
					label: 'Field 2',
					name: 'field2',
					type: 'text',
				},
				{
					label: 'Field 3',
					name: 'field3',
					type: 'text',
				},
				{
					label: 'Field 4',
					name: 'field4',
					type: 'text',
				},
			],
		})
	}

	@test()
	protected static async newSectionAddedToFormBuilder() {
		this.formVc.setValue('title', 'My new section')
		this.formVc.setValue('type', 'form')
		this.formVc.setValue('shouldRenderAsGrid', true)
		this.vc.addField()
		this.vc.addField()

		await interactionUtil.submitForm(this.formVc)

		vcAssertUtil.assertDialogWasClosed(this.dialogVc)

		assert.isEqual(this.formBuilderVc.getTotalPages(), 1)
		const pageVc = this.formBuilderVc.getPresentPageVc()
		assert.isEqual(pageVc.getTotalSections(), 2)

		const newSection = pageVc.getSection(1)

		assert.isEqualDeep(newSection, {
			title: 'My new section',
			shouldRenderAsGrid: true,
			type: 'form',
			fields: [
				{
					//@ts-ignore
					name: 'field1',
					label: 'Field 1',
					type: 'text',
				},
				{
					//@ts-ignore
					name: 'field2',
					label: 'Field 2',
					type: 'text',
				},
				{
					//@ts-ignore
					name: 'field3',
					label: 'Field 3',
					type: 'text',
				},
			],
		})
	}

	@test()
	protected static async differentSectionAddedToFormBuilderAtEnd() {
		this.formVc.setValue('title', 'My second section')
		this.formVc.setValue('type', 'text')
		this.formVc.setValue('text', 'What is up?')
		this.formVc.setValue('shouldRenderAsGrid', true)

		await interactionUtil.submitForm(this.formVc)

		vcAssertUtil.assertDialogWasClosed(this.dialogVc)

		assert.isEqual(this.formBuilderVc.getTotalPages(), 1)
		const pageVc = this.formBuilderVc.getPresentPageVc()
		assert.isEqual(pageVc.getTotalSections(), 2)

		const newSection = pageVc.getSection(1)

		assert.isEqualDeep(newSection, {
			title: 'My second section',
			shouldRenderAsGrid: true,
			text: 'What is up?',
			type: 'text',
		})
	}

	@test()
	protected static async sectionAddedToFormBuilderAfterClickedIndex() {
		this.formBuilderVc
			.getPageVc(0)
			.addSection({ title: 'A brand new section!' })
		const { builderSectionVc } = await this.simulateAddSectionClick(0)

		this.formVc = vcAssertUtil.assertCardRendersForm(builderSectionVc) as any

		this.formVc.setValue('title', 'Now second section')
		this.formVc.setValue('type', 'text')
		this.formVc.setValue('text', 'What is up?')

		await interactionUtil.submitForm(this.formVc)

		const newSection = this.formBuilderVc.getPageVc(0).getSection(1)
		assert.isEqual(newSection.title, 'Now second section')
	}

	private static async simulateAddSectionClick(clickedSectionIdx = 0) {
		let builderSectionVc: EditFormBuilderSectionViewController | undefined
		let dialogVc: DialogViewController | undefined

		await vcAssertUtil.assertRendersDialog(
			this.formBuilderVc,
			() => this.formBuilderVc.handleClickAddSection(clickedSectionIdx),
			(vc) => {
				dialogVc = vc
				builderSectionVc =
					vc.getCardVc() as EditFormBuilderSectionViewController
			}
		)
		return {
			builderSectionVc:
				builderSectionVc as EditFormBuilderSectionViewController,
			dialogVc: dialogVc as DialogViewController,
		}
	}
}
