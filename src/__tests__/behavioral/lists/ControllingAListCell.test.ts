import { validateSchemaValues } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import listCellSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/listCell.schema'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert.utility'
import ListCellViewController, {
	ListCellModel,
} from '../../../viewControllers/list/ListCell.vc'

export default class ControllingARowCellTest extends AbstractViewControllerTest {
	protected static controllerMap = {}

	@test('cant get cell -1', -1)
	@test('cant get cell 1000', 100)
	protected static cantGetACellVcFromBadIndex(cellIdx: number) {
		const err = assert.doesThrow(() => this.CellVc(cellIdx))
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['cellIdx'],
		})
	}

	@test()
	protected static canGetGoodCell() {
		const cellVc = this.CellVc(0)
		assert.isTrue(cellVc instanceof ListCellViewController)
	}

	@test()
	protected static cellHasRender() {
		const cellVc = this.CellVc(0)
		assert.isFunction(cellVc.render)
	}

	@test()
	protected static rendersValidCell() {
		const cellVc = this.CellVc(0)
		const model = this.render(cellVc)
		validateSchemaValues(listCellSchema, model)
	}

	@test('renders expected 1', { text: { content: 'hey!' } })
	@test('renders expected 2', { text: { content: 'hey you!' } })
	@test('renders expected 3', { button: { label: 'hey you!' } })
	@test('renders expected 4', { [`${Math.random()}`]: { label: 'hey you!' } })
	protected static rendersExpectedContent(cellModel: ListCellModel) {
		const cellVc = this.CellVc(0, cellModel)
		const model = this.render(cellVc)
		assert.isEqualDeep(model, { ...cellModel, controller: cellVc })
	}

	@test()
	protected static listRendersCells() {
		const listVc = this.ListVc()
		const model = this.render(listVc)
		assert.isTrue(
			model.rows[0].cells[0].controller instanceof ListCellViewController
		)
	}

	@test(
		'setting text input value on cell sets value on list and triggers render in all the right places',
		{
			textInput: {
				name: 'firstName',
			},
		},
		'Tay'
	)
	@test(
		'setting select input value on cell sets value on list and triggers render in all the right places',
		{
			selectInput: {
				name: 'firstName',
				choices: [{ value: 'heyThere', label: 'hey there!' }],
			},
		},
		'heyThere'
	)
	@test(
		'setting toggle cell sets value on list and triggers render in all the right places',
		{
			toggleInput: {
				name: 'firstName',
			},
		},
		true
	)
	@test(
		'setting toggle cell sets value on list and triggers render in all the right places',
		{
			toggleInput: {
				name: 'firstName',
				value: false,
			},
		},
		false
	)
	@test(
		'setting checkbox cell sets value on list and triggers render in all the right places',
		{
			checkboxInput: {
				name: 'firstName',
				value: false,
			},
		},
		false
	)
	@test(
		'setting ratings cell sets value on list and triggers render in all the right places',
		{
			ratingsInput: {
				name: 'firstName',
			},
		},
		undefined
	)
	@test(
		'setting ratings cell sets value on list and triggers render in all the right places',
		{
			ratingsInput: {
				name: 'firstName',
				value: 0.3,
			},
		},
		0.3
	)
	protected static async settingValueOnInputSetsValueOnListAndTriggersRender(
		cellModel: ListCellModel,
		value: any
	) {
		const listVc = this.ListVc(cellModel)

		const rowVc = listVc.getRowVc(0)
		const cellVc = rowVc.getCellVc(0)
		const model = this.render(cellVc)
		const key = Object.keys(cellModel)[0]

		//@ts-ignore
		assert.isFunction(model[key]?.setValue, `setValue set on ${key}`)

		//@ts-ignore
		await model[key]?.setValue?.('firstName', value)

		const values = listVc.getValues()

		assert.isEqual(values[0].firstName, value)

		vcAssert.assertTriggerRenderCount(rowVc, 0)
		vcAssert.assertTriggerRenderCount(cellVc, 1)
	}

	private static CellVc(idx: number, cellModel?: ListCellModel) {
		const listVc = this.ListVc(cellModel)

		const rowVc = listVc.getRowVc(0)
		const cell = rowVc.getCellVc(idx)

		return cell
	}

	private static ListVc(
		cellModel: ListCellModel = { text: { content: 'hey!' } }
	) {
		return this.Controller('list', {
			rows: [
				{
					id: 'random',
					cells: [cellModel],
				},
			],
		})
	}
}
