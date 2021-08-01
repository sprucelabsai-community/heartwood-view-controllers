import { validateSchemaValues } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import cardSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/card.schema'
import formSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/form.schema'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactionUtil from '../../../tests/utilities/interaction.utility'
import vcAssertUtil from '../../../tests/utilities/vcAssert.utility'
import introspectionUtil from '../../../utilities/introspection.utility'
import renderUtil from '../../../utilities/render.utility'
import { EditFormBuilderFieldViewController } from '../../../viewControllers/formBuilder/EditFormBuilderField.vc'
import FormBuilderViewController from '../../../viewControllers/formBuilder/FormBuilder.vc'
import { FormBuilderPageViewController } from '../../../viewControllers/formBuilder/FormBuilderPage.vc'
import ManagePageTitlesCardViewController from '../../../viewControllers/formBuilder/ManagePageTitlesCard.vc'

export default class BuildingAFormTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		formBuilder: FormBuilderViewController,
	}
	private static vc: FormBuilderViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Controller('formBuilder', {})
	}

	@test()
	protected static canBuildFormBuilder() {
		assert.isTruthy(this.vc)
	}

	@test()
	protected static startsWithBasicCard() {
		const viewModel = this.renderVc()
		assert.isString(viewModel.header?.title)
	}

	@test()
	protected static async canSetHeaderTitle() {
		this.vc.setHeaderTitle('go team')
		assert.isEqual(this.renderVc().header?.title, 'go team')
	}

	@test()
	protected static canSetShouldAllowEditing() {
		this.vc = this.Controller('formBuilder', {
			shouldAllowEditing: true,
		})

		const model = this.render(this.vc)
		assert.isTrue(model.shouldAllowEditing)
	}

	@test()
	protected static shouldAllowEditingTrueByDefault() {
		const model = this.render(this.vc)
		assert.isTrue(model.shouldAllowEditing)
		assert.isTrue(this.vc.getShouldAllowEditing())
		this.vc.setShouldAllowEditing(false)
		assert.isFalse(this.vc.getShouldAllowEditing())
	}

	@test()
	protected static canDisableFormEditing() {
		this.vc = this.Controller('formBuilder', {
			shouldAllowEditing: false,
		})

		const model = this.render(this.vc)
		assert.isFalse(model.shouldAllowEditing)
	}

	@test()
	protected static rendersValidModel() {
		//TODO make a form builder like card but with shouldAllowEditing
		const model = this.renderVc()
		delete model.shouldAllowEditing
		validateSchemaValues(cardSchema, model)
	}

	@test()
	protected static has1FormPageToStart() {
		const model = this.renderVc()

		assert.isLength(model.body?.sections, 1)
		assert.isEqual(model.body?.sections?.[0]?.title, 'Page 1')
		assert.isTruthy(model.body?.sections?.[0]?.form)
	}

	@test()
	protected static startsAtPageZero() {
		assert.isEqual(this.vc.getPresentPage(), 0)
	}

	@test()
	protected static async canAddMorePages() {
		assert.isEqual(this.vc.getTotalPages(), 1)

		await this.vc.addPage()

		assert.isEqual(this.vc.getPresentPage(), 0)
		assert.isEqual(this.vc.getTotalPages(), 2)
		assert.isEqual(this.renderVc().body?.sections?.[1].title, 'Page 2')

		await this.vc.addPage()

		assert.isEqual(this.vc.getPresentPage(), 0)
		assert.isEqual(this.vc.getTotalPages(), 3)
		assert.isEqual(this.renderVc().body?.sections?.[2].title, 'Page 3')
	}

	@test()
	protected static async canRemovePages() {
		await this.vc.addPage() // 2 pages
		await this.vc.addPage() // 3 pages
		await this.vc.addPage() // 4 pages

		assert.isEqual(this.vc.getPresentPage(), 0)

		await this.vc.jumpToPage(3)
		await this.vc.removePage(2)

		assert.isEqual(this.vc.getPresentPage(), 1)

		const model = this.renderVc()

		assert.isEqual(model.body?.sections?.[0].title, 'Page 1')
		assert.isEqual(model.body?.sections?.[1].title, 'Page 2')
		assert.isEqual(model.body?.sections?.[2].title, 'Page 4')

		assert.isEqual(this.vc.getTotalPages(), 3)
	}

	@test()
	protected static async removingPageTriggersRender() {
		await this.vc.addPage()
		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)
		await this.vc.removePage(0)
		vcAssertUtil.assertTriggerRenderCount(this.vc, 2)
	}

	@test()
	protected static async canAddPageAtIndex() {
		await this.vc.addPage()
		await this.vc.addPage()
		await this.vc.addPage()

		assert.isEqual(this.vc.getTotalPages(), 4)

		await this.vc.addPage({ atIndex: 0 })

		assert.isEqual(this.vc.getPresentPage(), 0)

		let model = this.renderVc()

		assert.isEqual(model.body?.sections?.[0]?.title, 'Page 5')
		assert.isEqual(this.vc.getTotalPages(), 5)

		await this.vc.addPage({ atIndex: 2 })
		assert.isEqual(this.vc.getTotalPages(), 6)

		model = this.renderVc()
		assert.isEqual(model.body?.sections?.[2]?.title, 'Page 6')
	}

	@test()
	protected static async canAddPageAndPassTitle() {
		await this.vc.addPage({ title: 'Page title' })
		const model = this.renderVc()
		assert.isEqual(model.body?.sections?.[1]?.title, 'Page title')
	}

	@test()
	protected static pagesHave1SectionByDefault() {
		const model = this.renderVc()
		assert.isEqual(
			model.body?.sections?.[0].form?.sections?.[0].title,
			'Section 1'
		)
	}

	@test()
	protected static canGetPageAtIndex() {
		const pageVc = this.vc.getPageVc(0)
		assert.isTruthy(pageVc)

		const pageModel = this.render(pageVc)

		validateSchemaValues(formSchema, pageModel)
	}

	@test()
	protected static async canGetTitleFromPageVc() {
		const pageVc = this.vc.getPageVc(0)
		assert.isEqual(pageVc.getTitle(), 'Page 1')

		await this.vc.addPage()
		assert.isEqual(this.vc.getPageVc(1).getTitle(), 'Page 2')
	}

	@test()
	protected static async canSetTitle() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.setTitle('Page Waka')

		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)

		assert.isEqual(pageVc.getTitle(), 'Page Waka')
		const model = this.render(this.vc)
		assert.isEqual(model.body?.sections?.[0].title, 'Page Waka')
	}

	@test()
	protected static async newPagesCanBeGot() {
		await this.vc.addPage()

		const pageVc = this.vc.getPageVc(1)
		assert.isTruthy(pageVc)

		const pageModel = this.render(pageVc)
		validateSchemaValues(formSchema, pageModel)
	}

	@test()
	protected static async addingPageTriggersRender() {
		vcAssertUtil.assertTriggerRenderCount(this.vc, 0)
		await this.vc.addPage()
		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static addingASectionTitlesItWithNextSection() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addSection()

		const model = this.render(pageVc)

		assert.isEqual(model.sections?.[1].title, 'Section 2')
	}

	@test()
	protected static canSetTitleWhenAddingSection() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addSection({ title: 'Go team!' })

		const model = this.render(pageVc)
		assert.isEqual(model.sections[1].title, 'Go team!')
	}

	@test()
	protected static addingSectionShouldAddTextField() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addSection()

		let schema = pageVc.getSchema()

		assert.isTruthy(schema.fields?.field2)
		assert.isEqual(schema.fields?.field2.type, 'text')
		assert.isEqual(schema.fields?.field2.label, 'Field 2')

		pageVc.addSection()

		pageVc.getSchema()

		assert.isTruthy(schema.fields?.field3)
		assert.isEqual(schema.fields?.field3.type, 'text')
		assert.isEqual(schema.fields?.field3.label, 'Field 3')
	}

	@test()
	protected static addingMultipleSectionsTitlesCorrectly() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addSection()
		pageVc.addSection()

		const model = this.render(pageVc)
		assert.isEqual(model.sections?.[2].title, 'Section 3')
	}

	@test()
	protected static sectionComesWith1FieldToStart() {
		const pageVc = this.vc.getPageVc(0)
		const section = pageVc.getSection(0)
		assert.isLength(section.fields, 1)
	}

	@test()
	protected static newSectionsComeWith1FieldToStart() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addSection()

		const section = pageVc.getSection(1)
		assert.isLength(section.fields, 1)
		assert.isEqualDeep(section.fields, [
			//@ts-ignore
			{ name: 'field2', label: 'Field 2', type: 'text' },
		])
	}

	@test()
	protected static formSchemaHasFieldToStart() {
		const pageVc = this.vc.getPageVc(0)
		this.assertFirstFieldConfiguredCorrectly(pageVc)
	}

	@test()
	protected static async newPageAddsFieldsToStart() {
		await this.vc.addPage()
		const pageVc = this.vc.getPageVc(1)
		this.assertFirstFieldConfiguredCorrectly(pageVc)
	}

	@test()
	protected static canAddFieldToFirstSectionOfFirstPage() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addField(0)

		const model = this.render(pageVc)

		assert.isLength(model.sections[0].fields, 2)

		//@ts-ignore
		assert.isEqualDeep(model.sections[0].fields[1], { name: 'field2' })
		assert.isTruthy(model.schema.fields?.field2)
		assert.isEqual(model.schema.fields?.field2.label, 'Field 2')
	}

	@test()
	protected static addingASecondFieldIncrementsName() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addField(0)
		pageVc.addField(0)

		const model = this.render(pageVc)

		assert.isLength(model.sections[0].fields, 3)
		//@ts-ignore
		assert.isEqualDeep(model.sections[0].fields[2], { name: 'field3' })

		assert.isEqual(model.schema.fields?.field3.label, 'Field 3')
	}

	@test()
	protected static canAddFieldToNewSection() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addSection()
		pageVc.addField(1)

		const model = this.render(pageVc)

		//@ts-ignore
		assert.isEqualDeep(model.sections[1].fields[1], { name: 'field3' })
	}

	@test()
	protected static hasAddPageButtonInFooter() {
		const model = this.render(this.vc)

		assert.doesInclude(model.footer?.buttons?.[0], { label: 'Add page' })
		assert.isFunction(model.footer?.buttons?.[0].onClick)
	}

	@test()
	protected static async clickingAddPageInFooterAddsAPage() {
		const model = this.render(this.vc)

		await vcAssertUtil.assertRendersDialog(
			this.vc,
			() => this.click(model.footer?.buttons?.[0]),
			async (dialogVc) => {
				const form = vcAssertUtil.assertCardRendersForm(dialogVc)

				form.setValue('title', 'taco bell')
				await form.submit()
			}
		)

		assert.isEqual(this.vc.getTotalPages(), 2)

		vcAssertUtil.assertRendersValidCard(this.vc)
	}

	@test()
	protected static doesNotHaveRemovePageButtonInFooterToStart() {
		const model = this.render(this.vc)
		assert.isArray(model.footer?.buttons)
		assert.doesNotInclude(model.footer?.buttons, { label: 'Remove page' })
	}

	@test()
	protected static async hasRemovePageButtonAfterPageHasBeenAdded() {
		await this.vc.addPage()
		const model = this.render(this.vc)

		assert.isArray(model.footer?.buttons)
		assert.doesInclude(model.footer?.buttons, { label: 'Remove page' })
	}

	@test()
	protected static async removeButtonIsRemovedWhenDownToOnePage() {
		await this.vc.addPage()
		await this.vc.removePage(0)

		const model = this.render(this.vc)

		assert.isArray(model.footer?.buttons)
		assert.isLength(model.footer?.buttons, 1)
	}

	@test()
	protected static async hittingRemoveRemovesSecondPageAndSwipesToFirst() {
		await this.vc.addPage()

		const model = this.render(this.vc)

		await this.click(model.footer?.buttons?.[1])

		assert.isEqual(this.vc.getTotalPages(), 1)

		const updatedModel = this.render(this.vc)
		const sections = updatedModel.body?.sections

		assert.isArray(sections)
		assert.isLength(sections, 1)
		assert.isEqual(sections[0].title, 'Page 2')
		assert.isEqual(this.vc.getPresentPage(), 0)
	}

	@test()
	protected static async canRemovePresentPageDirectly() {
		await this.vc.addPage()
		await this.vc.addPage()
		await this.vc.addPage()
		await this.vc.addPage()

		await this.vc.jumpToPage(4)
		await this.vc.removePresentPage()

		assert.isEqual(this.vc.getPresentPage(), 3)

		await this.vc.jumpToPage(0)
		await this.vc.removePresentPage()

		assert.isEqual(this.vc.getPresentPage(), 0)
	}

	@test()
	protected static formsShouldNotIncludeActionButtons() {
		const pageVc = this.vc.getPageVc(0)
		const model = this.render(pageVc)
		assert.isFalse(model.shouldShowSubmitControls)
	}

	@test()
	protected static canSetHeaderDuringCostruction() {
		const vc = this.Controller('formBuilder', {
			header: { title: 'Hey', subtitle: 'Hey2' },
		})
		const model = this.render(vc)
		assert.isEqual(model.header?.title, 'Hey')
		assert.isEqual(model.header?.subtitle, 'Hey2')
	}

	@test()
	protected static renderedFormBuilderReturnsFormBuilderAsController() {
		const model = this.vc.render()
		assert.isTrue(model.controller instanceof FormBuilderViewController)
	}

	@test()
	protected static async formBuilderPassesCallsToSwipeVc() {
		const { controller } = this.vc.render()
		assert.isTruthy(controller)

		//@ts-ignore
		const swipeFunctions = introspectionUtil.getAllFuncs(this.vc.swipeVc)
		const builderProtoFunctions = introspectionUtil.getAllFuncs(
			//@ts-ignore
			this.vc
		)

		for (const func of swipeFunctions) {
			const shouldFuncHaveBeenDelegated =
				builderProtoFunctions.indexOf(func) === -1

			if (shouldFuncHaveBeenDelegated) {
				let wasHit = false

				//@ts-ignore
				this.vc.swipeVc[func] = () => {
					wasHit = true
				}

				assert.isFunction(
					//@ts-ignore
					this.vc[func],
					`\`${func}\` never got setup as a delegate method in FormBuilder`
				)

				//@ts-ignore
				await this.vc[func]()
				assert.isTrue(wasHit, `\`${func}\` did not delegate it's call.`)
			}
		}
	}

	@test()
	protected static canAddTextSection() {
		const pageVc = this.vc.getPageVc(0)

		pageVc.addSection({
			type: 'text',
			text: 'What are you thinking?',
		})

		const model = this.render(pageVc)

		assert.isEqualDeep(model.sections[1].text, {
			content: 'What are you thinking?',
		})

		assert.isUndefined(model.sections[1].fields)
	}

	@test()
	protected static async canGetCurrentPages() {
		let pageVc = this.vc.getPresentPageVc()
		assert.isEqual(pageVc.getIndex(), 0)

		await this.vc.addPage()
		await this.vc.jumpToPage(1)

		pageVc = this.vc.getPresentPageVc()
		assert.isEqual(pageVc.getIndex(), 1)
	}

	@test()
	protected static async canGetAllPageVcs() {
		let vcs = this.vc.getPageVcs()

		assert.isArray(vcs)
		assert.isLength(vcs, 1)

		const vc = vcs[0]
		const model = this.render(vc)

		validateSchemaValues(formSchema, model)

		await this.vc.addPage()

		vcs = this.vc.getPageVcs()
		assert.isLength(vcs, 2)
	}

	@test()
	protected static async deletesPageWhenConfirmingOnClickDeletePage() {
		assert.isFunction(this.vc.handleClickDeletePage)

		await vcAssertUtil.assertRendersConfirm(
			this.vc,
			() => this.vc.handleClickDeletePage(),
			() => true
		)

		const model = this.render(this.vc)

		assert.isLength(model.body?.sections, 0)
	}

	@test()
	protected static async cancelsDeletingPageWhenConfirmingOnClickDeletePage() {
		assert.isFunction(this.vc.handleClickDeletePage)

		await vcAssertUtil.assertRendersConfirm(
			this.vc,
			() => this.vc.handleClickDeletePage(),
			() => false
		)

		const model = this.render(this.vc)
		assert.isLength(model.body?.sections, 1)
	}

	@test()
	protected static async showsAddDialogWhenHandlingClickAddPage() {
		assert.isFunction(this.vc.handleClickAddPage)

		const { dialogVc } = await vcAssertUtil.assertRendersDialog(this.vc, () =>
			this.vc.handleClickAddPage()
		)

		const formVc = vcAssertUtil.assertCardRendersForm(dialogVc)
		const schema = formVc.getSchema()

		assert.isFalse(formVc.shouldShowCancelButton())
		assert.doesInclude(schema.fields.title, { type: 'text', isRequired: true })
	}

	@test()
	protected static async submittingAddFormAddsPage() {
		const { dialogVc } = await vcAssertUtil.assertRendersDialog(this.vc, () =>
			this.vc.handleClickAddPage()
		)
		const formVc = vcAssertUtil.assertCardRendersForm(dialogVc)
		formVc.setValue('title', 'A new one!')

		await formVc.submit()

		const pageVc = this.vc.getPageVc(1)
		assert.isEqual(pageVc.getTitle(), 'A new one!')

		vcAssertUtil.assertDialogWasClosed(dialogVc)
	}

	@test()
	protected static async canAddSectionToPageAtIndex() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addSection({ atIndex: 0, title: 'Now the first!' })

		const model = this.render(pageVc)

		assert.isEqual(model.sections[0].title, 'Now the first!')
	}

	@test()
	protected static addingSectionToIndexThatIsTooHighJustAddsToEnd() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addSection({ atIndex: 100, title: 'Now the last!' })

		const model = this.render(pageVc)

		assert.isEqual(model.sections[1].title, 'Now the last!')
	}

	@test()
	protected static gettingABadSectionFails() {
		const err = assert.doesThrow(() => this.vc.getPageVc(0).getSection(-1))
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['sectionIdx'],
		})
	}

	@test()
	protected static canGetSection() {
		const section = this.vc.getPageVc(0).getSection(0)
		assert.isTruthy(section)
	}

	@test()
	protected static byDefaultSectionHasField1() {
		const section = this.vc.getPageVc(0).getSection(0)

		assert.isEqualDeep(section, {
			title: 'Section 1',
			shouldRenderAsGrid: false,
			type: 'form',
			//@ts-ignore
			fields: [{ name: 'field1', type: 'text', label: 'Field 1' }],
		})
	}

	@test()
	protected static async handlesClickingPageTitles() {
		assert.isFunction(this.vc.handleClickPageTitles)

		await vcAssertUtil.assertRendersDialog(
			this.vc,
			async () => this.vc.handleClickPageTitles(),
			async (dialogVc) => {
				assert.isTrue(
					dialogVc.getCardVc() instanceof ManagePageTitlesCardViewController
				)

				const vc = dialogVc.getCardVc() as ManagePageTitlesCardViewController
				await interactionUtil.clickPrimaryInFooter(vc)
				vcAssertUtil.assertDialogWasClosed(dialogVc)
			}
		)
	}

	@test()
	protected static async throwsWhenPassingBadParamsToUpdateField() {
		const pageVc = this.vc.getPageVc(0)
		//@ts-ignore
		const err = assert.doesThrow(() => pageVc.setField())
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['fieldName', 'updates'],
		})
	}

	@test('rename field1 to taco', 'field1', 'taco', 0, 0, [
		{ name: 'taco' },
		{ name: 'field2' },
	])
	@test('rename field2 to taco2', 'field2', 'taco2', 0, 0, [
		{ name: 'field1' },
		{ name: 'taco2' },
	])
	@test('rename field3 (section 2) to taco', 'field3', 'taco2', 1, 0, [
		{
			name: 'taco2',
		},
	])
	@test('rename field1 (of page 2) to taco', 'field1', 'taco3', 0, 1, [
		{
			name: 'taco3',
		},
	])
	protected static async handlesClickingEditFieldAndClosing(
		oldFieldName: string,
		newFieldName: string,
		sectionIdx = 0,
		pageIdx = 0,
		expectedFields: any
	) {
		assert.isFunction(this.vc.handleClickEditField)

		const pageVc = this.vc.getPresentPageVc()
		pageVc.addField(0)
		pageVc.addSection()

		await this.vc.addPage()

		const model = await this.updateFieldThroughEditFieldVcAndRenderPage({
			oldFieldName,
			newFieldName,
			pageIdx,
		})

		assert.isEqualDeep(model.sections[sectionIdx].fields, expectedFields)
	}

	@test()
	protected static async canUpdateSelectOptions() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addField(0)
		pageVc.addField(0)

		await this.updateFieldThroughEditFieldVcAndRenderPage({
			oldFieldName: 'field1',
			selectOptions: ['What', 'Is', 'Up?'],
			expectedFormValues: {
				name: 'field1',
				label: 'Field 1',
				type: 'text',
				isRequired: undefined,
				selectOptions: undefined,
			},
		})

		await this.updateFieldThroughEditFieldVcAndRenderPage({
			oldFieldName: 'field1',
			selectOptions: null,
			expectedFormValues: {
				name: 'field1',
				label: 'Taco',
				type: 'select',
				isRequired: undefined,
				selectOptions: `What\nIs\nUp?`,
			},
		})
	}

	@test()
	protected static canCustomizeFooterButtons() {
		const footer = {
			footer: {
				buttons: [
					{
						label: 'Hey there!',
					},
				],
			},
		}

		//@ts-ignore
		this.vc = this.Controller('formBuilder', { footer })

		const model = this.render(this.vc, {
			shouldStripControllers: true,
			shouldStripFunctions: true,
			shouldStripPrivateFields: true,
		})

		//@ts-ignore
		assert.isEqualDeep(model.footer, footer)

		//@ts-ignore
		const built = this.vc.buildFooter()

		//@ts-ignore
		assert.isEqualDeep(built, footer)
	}

	private static async updateFieldThroughEditFieldVcAndRenderPage(options: {
		oldFieldName: string
		newFieldName?: string
		selectOptions?: string[] | null
		pageIdx?: number
		expectedFormValues?: Record<string, any>
	}) {
		const {
			oldFieldName,
			newFieldName,
			selectOptions = ['Hey', 'There', 'Dude'],
			pageIdx = 0,
			expectedFormValues,
		} = options

		await this.vc.jumpToPage(pageIdx)

		await vcAssertUtil.assertRendersDialog(
			this.vc,
			async () => this.vc.handleClickEditField(oldFieldName),
			async (dialogVc) => {
				assert.isTrue(
					dialogVc.getCardVc() instanceof EditFormBuilderFieldViewController
				)

				const vc = dialogVc.getCardVc() as EditFormBuilderFieldViewController
				const formVc = vc.getFormVc()

				if (expectedFormValues) {
					assert.isEqualDeep(formVc.getValues(), expectedFormValues)
				}

				formVc.setValue('name', newFieldName ?? oldFieldName)
				formVc.setValue('label', 'Taco')
				formVc.setValue('type', selectOptions ? 'select' : 'text')
				formVc.setValue(
					'selectOptions',
					selectOptions && selectOptions.join('\n')
				)

				await interactionUtil.clickPrimaryInFooter(formVc)
				vcAssertUtil.assertDialogWasClosed(dialogVc)
			}
		)

		const pageVc = this.vc.getPageVc(pageIdx)
		newFieldName &&
			vcAssertUtil.assertFormRendersField(pageVc as any, newFieldName)
		newFieldName &&
			vcAssertUtil.assertFormDoesNotRenderField(pageVc as any, oldFieldName)

		const model = this.render(pageVc)

		if (selectOptions) {
			assert.isEqualDeep(
				//@ts-ignore
				model.schema.fields[newFieldName ?? oldFieldName].options.choices,
				selectOptions.map((o) => ({ label: o, value: namesUtil.toCamel(o) }))
			)
		}

		return model
	}

	private static assertFirstFieldConfiguredCorrectly(
		pageVc: FormBuilderPageViewController
	) {
		const model = this.render(pageVc)

		assert.isTruthy(model.schema.fields)
		assert.isLength(Object.keys(model.schema.fields), 1)
		assert.doesInclude(model.schema.fields, { field1: { type: 'text' } })
		assert.isTruthy(model.schema.fields.field1)
		assert.isEqual(model.schema.fields.field1.label, 'Field 1')

		const section = pageVc.getSection(0)

		assert.isEqualDeep(section.fields, [
			//@ts-ignore
			{ name: 'field1', label: 'Field 1', type: 'text' },
		])
	}

	private static renderVc() {
		return renderUtil.render(this.vc)
	}
}
