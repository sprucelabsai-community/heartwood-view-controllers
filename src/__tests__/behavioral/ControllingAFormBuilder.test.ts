import { validateSchemaValues } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import cardSchema from '#spruce/schemas/heartwood/v2021_02_11/card.schema'
import formSchema from '#spruce/schemas/heartwood/v2021_02_11/form.schema'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import renderUtil from '../../utilities/render.utility'
import FormBuilderViewController, {
	PageViewController,
} from '../../viewControllers/FormBuilder.vc'

export default class BuildingAFormTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
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
	protected static async rendersValidModel() {
		validateSchemaValues(cardSchema, this.renderVc())
	}

	@test()
	protected static has1PageToStart() {
		const model = this.renderVc()
		assert.isLength(model.body?.sections, 1)
		assert.isEqual(model.body?.sections?.[0]?.title, 'Page 1')
	}

	@test()
	protected static async canAddMorePages() {
		assert.isEqual(this.vc.getTotalPages(), 1)
		this.vc.addPage()
		assert.isEqual(this.vc.getTotalPages(), 2)
		assert.isEqual(this.renderVc().body?.sections?.[1].title, 'Page 2')
		this.vc.addPage()
		assert.isEqual(this.vc.getTotalPages(), 3)
		assert.isEqual(this.renderVc().body?.sections?.[2].title, 'Page 3')
	}

	@test()
	protected static async canRemovePages() {
		this.vc.addPage() // 2 pages
		this.vc.addPage() // 3 pages
		this.vc.addPage() // 4 pages

		this.vc.removePage(2)

		const model = this.renderVc()

		assert.isEqual(model.body?.sections?.[0].title, 'Page 1')
		assert.isEqual(model.body?.sections?.[1].title, 'Page 2')
		assert.isEqual(model.body?.sections?.[2].title, 'Page 4')

		assert.isEqual(this.vc.getTotalPages(), 3)
	}

	@test()
	protected static canAddPageAtIndex() {
		this.vc.addPage()
		this.vc.addPage()
		this.vc.addPage()

		assert.isEqual(this.vc.getTotalPages(), 4)

		this.vc.addPage(0)

		const model = this.renderVc()

		assert.isEqual(model.body?.sections?.[0]?.title, 'Page 5')

		assert.isEqual(this.vc.getTotalPages(), 5)
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
	protected static newPagesCanBeGot() {
		this.vc.addPage()

		const pageVc = this.vc.getPageVc(1)
		assert.isTruthy(pageVc)

		const pageModel = this.render(pageVc)
		validateSchemaValues(formSchema, pageModel)
	}

	@test()
	protected static addingASectionTitlesItWithNextSection() {
		const pageVc = this.vc.getPageVc(0)
		pageVc.addSection()

		const model = this.render(pageVc)

		assert.isEqual(model.sections?.[1].title, 'Section 2')
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
		//@ts-ignore
		assert.isEqualDeep(section.fields, [{ name: 'field1' }])
	}

	@test()
	protected static formSchemaHasFieldToStart() {
		const pageVc = this.vc.getPageVc(0)
		this.assertFirstFieldConfiguredCorrectly(pageVc)
	}

	@test()
	protected static newPageAddsFieldsToStart() {
		this.vc.addPage()
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
		assert.isEqualDeep(model.sections[1].fields[1], { name: 'field2' })
	}

	@test()
	protected static hasAddPageButtonInFooter() {
		const model = this.render(this.vc)

		assert.doesInclude(model.footer?.buttons?.[0], { label: 'Add page' })
		assert.isFunction(model.footer?.buttons?.[0].onClick)
	}

	@test()
	protected static async clickingAddPageAddsAPage() {
		const model = this.render(this.vc)
		await model.footer?.buttons?.[0]?.onClick?.()
		assert.isEqual(this.vc.getTotalPages(), 2)
	}

	private static assertFirstFieldConfiguredCorrectly(
		pageVc: PageViewController
	) {
		const model = this.render(pageVc)
		assert.isTruthy(model.schema.fields)
		assert.isLength(Object.keys(model.schema.fields), 1)
		assert.doesInclude(model.schema.fields, { field1: { type: 'text' } })
		assert.isTruthy(model.schema.fields.field1)
		assert.isEqual(model.schema.fields.field1.label, 'Field 1')

		const section = pageVc.getSection(0)
		//@ts-ignore
		assert.isEqualDeep(section.fields, [{ name: 'field1' }])
	}

	private static renderVc() {
		return renderUtil.render(this.vc)
	}
}
