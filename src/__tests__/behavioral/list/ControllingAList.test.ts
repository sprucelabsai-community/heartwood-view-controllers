import { validateSchemaValues } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import listSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/list.schema'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssertUtil from '../../../tests/utilities/vcAssert.utility'
import ListViewController from '../../../viewControllers/list/List.vc'

export default class ControllingAListTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
	protected static vc: ListViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Controller('list', {})
	}

	@test()
	protected static canCreateList() {
		assert.isTruthy(this.vc)
	}

	@test()
	protected static mixesInOptionsToModel() {
		//@ts-ignore
		const model = this.render(this.Controller('list', { taco: 'bravo' }))
		assert.doesInclude(model, { taco: 'bravo' })
	}

	@test()
	protected static rendersValidModel() {
		const model = this.render(this.vc)
		validateSchemaValues(listSchema, model)
	}

	@test()
	protected static async startsWithNoRows() {
		const rows = this.vc.getRows()
		assert.isLength(rows, 0)

		assert.isEqual(this.vc.getTotalRows(), 0)

		const model = this.render(this.vc)
		assert.isLength(model.rows, 0)
	}

	@test()
	protected static async cantAddEmptyRow() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.addRow())
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['cells'],
		})
	}

	@test(`Can't add row with cells = true`, true)
	@test(`Can't add row with cells = {}`, {})
	@test(`Can't add row with cells = []`, {})
	protected static cantAddBadRow(cells: any) {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.addRow({ cells }))
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['cells'],
		})
	}

	@test()
	protected static canAddRow() {
		this.vc.addRow({
			cells: [
				{
					text: {
						content: 'I wanna!',
					},
				},
			],
		})

		const rows = this.vc.getRows()
		assert.isLength(rows, 1)
		assert.isEqualDeep(rows[0].cells[0], {
			text: {
				content: 'I wanna!',
			},
		})

		const model = this.render(this.vc)
		assert.isLength(model.rows, 1)
		assert.doesInclude(model.rows[0].cells[0], {
			text: {
				content: 'I wanna!',
			},
		})

		assert.isEqual(this.vc.getTotalRows(), 1)
	}

	@test()
	protected static addingRowTriggersRender() {
		this.vc.addRow({
			cells: [
				{
					text: {
						content: 'I wanna!',
					},
				},
			],
		})

		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static canAddRowAtIndex() {
		this.vc.addRow({
			cells: [
				{
					text: {
						content: 'First',
					},
				},
			],
		})

		this.vc.addRow({
			cells: [
				{
					text: {
						content: 'Second',
					},
				},
			],
		})

		this.vc.addRow({
			atIndex: 1,
			cells: [
				{
					text: {
						content: 'I wanna!',
					},
				},
			],
		})

		let rows = this.vc.getRows()

		assert.isEqual(rows[1]?.cells[0]?.text?.content, 'I wanna!')

		this.vc.addRow({
			atIndex: 2,
			cells: [
				{
					text: {
						content: 'I wanna 2!',
					},
				},
			],
		})

		rows = this.vc.getRows()

		assert.isEqual(rows[2]?.cells[0]?.text?.content, 'I wanna 2!')
	}

	@test()
	protected static canAddATextInputToARow() {
		this.vc.addRow({
			cells: [
				{
					textInput: {
						name: 'firstName',
						label: 'First name',
					},
				},
			],
		})
	}

	@test()
	protected static canAddASelectinputToARow() {
		this.vc.addRow({
			cells: [
				{
					selectInput: {
						name: ' favColor',
						label: 'Favorite color',
						choices: [
							{
								label: 'Blue',
								value: 'blue',
							},
							{
								label: 'Red',
								value: 'red',
							},
						],
					},
				},
			],
		})
	}

	@test()
	protected static cantGetRowVcFromBadRow() {
		const err = assert.doesThrow(() => this.vc.getRowVc(0))

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['rowIdx'],
		})
	}

	@test()
	protected static canGetGoodRowVc() {
		this.vc.addRow({
			cells: [
				{
					text: { content: 'so exciting!' },
				},
			],
		})

		const rowVc = this.vc.getRowVc(0)
		assert.isTruthy(rowVc)
	}

	@test()
	protected static async cantSetValueOnRowFieldByNameDoesNotExist() {
		this.vc.addRow({
			cells: [
				{
					text: { content: 'so exciting!' },
				},
			],
		})

		const rowVc = this.vc.getRowVc(0)
		const err = await assert.doesThrowAsync(() => rowVc.setValue('taco', true))

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['fieldName'],
		})
	}

	@test()
	public static rowVcHasNoValuesToStart() {
		this.vc.addRow({
			cells: [
				{
					text: { content: 'so exciting!' },
				},
			],
		})

		const rowVc = this.vc.getRowVc(0)
		assert.isEqualDeep(rowVc.getValues(), {})
	}

	@test()
	protected static async canSetValueOnGoodFieldName() {
		this.vc.addRow({
			cells: [
				{
					textInput: { name: 'lastName', label: 'row 1' },
				},
			],
		})

		this.vc.addRow({
			cells: [
				{
					textInput: { name: 'firstName', label: 'row 2' },
				},
				{
					textInput: { name: 'lastName', label: 'row 2' },
				},
			],
		})

		let rowVc = this.vc.getRowVc(1)

		await rowVc.setValue('firstName', 'cheapseats')
		await rowVc.setValue('lastName', 'cheapseats')

		rowVc = this.vc.getRowVc(0)
		await rowVc.setValue('lastName', 'cheapseats')
	}

	@test()
	protected static emptyValuesOnListToStart() {
		const values = this.vc.getValues()
		assert.isEqualDeep(values, [])
	}

	@test()
	protected static async settingValuesOnRowVcSetsValues() {
		this.vc.addRow({
			cells: [
				{
					textInput: { name: 'lastName', label: 'row 1', value: 'Horse' },
				},
			],
		})

		const rowVc = this.vc.getRowVc(0)
		assert.isEqualDeep(rowVc.getValues(), { lastName: 'Horse' })

		await rowVc.setValue('lastName', 'Taco')
		assert.isEqualDeep(rowVc.getValues(), { lastName: 'Taco' })
	}

	@test()
	protected static async settingValuesOnRowVcSetsValuesWithMultipleCells() {
		this.vc.addRow({
			cells: [
				{
					textInput: { name: 'firstName', label: 'row 1', value: 'Mr.' },
				},
				{
					textInput: { name: 'lastName', label: 'row 1', value: 'Horse' },
				},
			],
		})

		const rowVc = this.vc.getRowVc(0)
		assert.isEqualDeep(rowVc.getValues(), {
			lastName: 'Horse',
			firstName: 'Mr.',
		})

		await rowVc.setValue('lastName', 'Taco')
		assert.isEqualDeep(rowVc.getValues(), {
			lastName: 'Taco',
			firstName: 'Mr.',
		})
	}

	@test()
	protected static async canGetValuesOnList() {
		this.vc.addRow({
			cells: [
				{
					textInput: { name: 'firstName', label: 'row 1', value: 'Mr.' },
				},
				{
					textInput: { name: 'lastName', label: 'row 1', value: 'Horse' },
				},
				{
					selectInput: {
						name: 'middleInitial',
						label: 'row 1',
						value: 'Green',
						choices: [],
					},
				},
			],
		})

		let values = this.vc.getValues()

		assert.isEqualDeep(values[0], {
			firstName: 'Mr.',
			middleInitial: 'Green',
			lastName: 'Horse',
		})

		const rowVc = this.vc.getRowVc(0)
		await rowVc.setValue('firstName', 'Ms.')
		await rowVc.setValue('middleInitial', 'Purple')

		values = this.vc.getValues()

		assert.isEqualDeep(values[0], {
			firstName: 'Ms.',
			middleInitial: 'Purple',
			lastName: 'Horse',
		})
	}

	@test()
	protected static async renderingRendersValueOnInputs() {
		this.vc.addRow({
			cells: [
				{
					textInput: { name: 'firstName', label: 'row 1', value: 'Mr.' },
				},
				{
					textInput: { name: 'lastName', label: 'row 1', value: 'Horse' },
				},
				{
					selectInput: {
						name: 'middleInitial',
						label: 'row 1',
						value: 'Green',
						choices: [],
					},
				},
			],
		})

		const rowVc = this.vc.getRowVc(0)

		await rowVc.setValue('firstName', 'Ms.')
		await rowVc.setValue('middleInitial', 'Purple')

		const model = this.render(this.vc)

		assert.isEqual(model.rows[0].cells[0].textInput?.value, 'Ms.')
	}

	@test()
	protected static async canSetValueOnSetValueOfField() {
		this.vc.addRow({
			cells: [
				{
					textInput: { name: 'firstName', label: 'row 1', value: 'Mr.' },
				},
				{
					textInput: { name: 'lastName', label: 'row 1', value: 'Horse' },
				},
				{
					selectInput: {
						name: 'middleInitial',
						label: 'row 1',
						value: 'Green',
						choices: [],
					},
				},
			],
		})

		const model = this.render(this.vc)
		await model.rows[0].cells[0].textInput?.setValue?.('firstName', 'Trip')
		await model.rows[0].cells[2].selectInput?.setValue?.(
			'middleInitial',
			'Brown'
		)

		const rowVc = this.vc.getRowVc(0)
		const values = rowVc.getValues()

		assert.isEqualDeep(values, {
			firstName: 'Trip',
			lastName: 'Horse',
			middleInitial: 'Brown',
		})
	}

	@test()
	protected static canSetRowsDuringConstruction() {
		const vc = this.Controller('list', {
			rows: [
				{
					cells: [
						{
							text: { content: 'go team!' },
						},
					],
				},
			],
		})

		assert.isEqual(vc.getTotalRows(), 1)
	}

	@test()
	protected static async settingValueOnRowTriggersRender() {
		this.vc.addRow({
			cells: [
				{
					textInput: { name: 'firstName', label: 'row 1', value: 'Mr.' },
				},
				{
					textInput: { name: 'lastName', label: 'row 1', value: 'Horse' },
				},
				{
					selectInput: {
						name: 'middleInitial',
						label: 'row 1',
						value: 'Green',
						choices: [],
					},
				},
			],
		})

		const rowVc = this.vc.getRowVc(0)
		vcAssertUtil.assertTriggerRenderCount(rowVc, 0)

		await rowVc.setValue('firstName', 'Test')

		vcAssertUtil.assertTriggerRenderCount(rowVc, 1)
	}

	@test()
	protected static async onChangeOnInputFiredWhenChanged() {
		let onChangeInputValue: string | undefined
		let onChangeSelectValue: string | undefined

		this.vc.addRow({
			cells: [
				{
					textInput: {
						name: 'firstName',
						label: 'row 1',
						value: 'Mr.',
						onChange: (value) => {
							onChangeInputValue = value
						},
					},
				},
				{
					selectInput: {
						name: 'middleInitial',
						label: 'row 1',
						value: 'Green',
						choices: [],
						onChange: (value) => {
							onChangeSelectValue = value
						},
					},
				},
			],
		})

		const rowVc = this.vc.getRowVc(0)

		await rowVc.setValue('firstName', 'Test')
		assert.isEqual(onChangeInputValue, 'Test')

		await rowVc.setValue('firstName', 'Test2')
		assert.isEqual(onChangeInputValue, 'Test2')

		await rowVc.setValue('middleInitial', 'Test2')
		assert.isEqual(onChangeSelectValue, 'Test2')
	}

	@test()
	protected static gettingBadValueOnRowThrows() {
		this.vc.addRow({
			cells: [
				{
					textInput: {
						name: 'firstName',
						label: 'row 1',
						value: 'Mr.',
					},
				},
				{
					selectInput: {
						name: 'middleInitial',
						label: 'row 1',
						value: 'Green',
						choices: [],
					},
				},
			],
		})

		const rowVc = this.vc.getRowVc(0)
		const err = assert.doesThrow(() => rowVc.getValue('waka'))

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['fieldName'],
		})

		assert.isEqual(rowVc.getValue('firstName'), 'Mr.')
		assert.isEqual(rowVc.getValue('middleInitial'), 'Green')
	}

	@test()
	protected static canSetRowsDirectly() {
		this.vc.setRows([
			{
				cells: [
					{
						text: { content: 'yay' },
					},
				],
			},
		])

		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)

		let rowVc = this.vc.getRowVc(0)
		let model = this.render(rowVc)

		assert.isEqual(model.cells[0].text?.content, 'yay')

		this.vc.setRows([
			{
				cells: [
					{
						text: { content: 'yay 2' },
					},
				],
			},
		])

		rowVc = this.vc.getRowVc(0)
		model = this.render(rowVc)

		assert.isEqual(model.cells[0].text?.content, 'yay 2')
	}

	@test()
	protected static cantDeleteBadRow() {
		const err = assert.doesThrow(() => this.vc.deleteRow(-1))
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['rowIdx'],
		})
	}

	@test()
	protected static canDeleteRow() {
		this.vc.addRow({
			cells: [
				{
					text: {
						content: 'Hey there!',
					},
				},
			],
		})
		this.vc.addRow({
			cells: [
				{
					text: {
						content: 'Bye there!',
					},
				},
			],
		})

		const rowVc1 = this.vc.getRowVc(0)
		assert.doesInclude(this.render(rowVc1), {
			'cells[0].text.content': 'Hey there!',
		})

		this.vc.deleteRow(0)
		assert.isEqual(this.vc.getTotalRows(), 1)
		vcAssertUtil.assertTriggerRenderCount(this.vc, 3)

		const rowVc2 = this.vc.getRowVc(0)
		assert.doesInclude(this.render(rowVc2), {
			'cells[0].text.content': 'Bye there!',
		})
	}

	@test()
	protected static async canDeleteRow2() {
		this.add2Rows()

		const rowVc1 = this.vc.getRowVc(0)
		assert.doesInclude(this.render(rowVc1), {
			'cells[0].text.content': 'Hey there!',
		})

		const rowVc2 = this.vc.getRowVc(1)
		assert.doesInclude(this.render(rowVc2), {
			'cells[0].text.content': 'Bye there!',
		})

		await rowVc1.delete()

		const newRow1 = this.vc.getRowVc(0)
		assert.doesInclude(this.render(newRow1), {
			'cells[0].text.content': 'Bye there!',
		})
	}

	@test()
	protected static rowsVcsKnowIfTheyAreTheLastRow() {
		this.vc.addRow({
			cells: [
				{
					text: {
						content: 'Hey there!',
					},
				},
			],
		})
		assert.isTrue(this.vc.getRowVc(0).isLastRow())
		this.add2Rows()

		assert.isFalse(this.vc.getRowVc(0).isLastRow())
		assert.isTrue(this.vc.getRowVc(2).isLastRow())
	}

	@test()
	protected static cantGetRowByIdThatIsntFound() {
		const err = assert.doesThrow(() => this.vc.getRowVc('test'))
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['rowId'],
		})
	}

	@test()
	protected static cantAddRowsWithIdsThatExist() {
		const err = assert.doesThrow(() =>
			this.vc.addRows([
				{
					id: 'test',
					cells: [
						{
							text: {
								content: 'Hey there!',
							},
						},
					],
				},
				{
					id: 'test',
					cells: [
						{
							text: {
								content: 'Hey there!',
							},
						},
					],
				},
			])
		)

		errorAssertUtil.assertError(err, 'DUPLICATE_ROW_ID', {
			rowId: 'test',
		})
	}

	@test()
	protected static blocksDuplicateRowsWhenAddingRowsOneAtATime() {
		this.vc.addRows([
			{
				id: 'test',
				cells: [
					{
						text: {
							content: 'Hey there!',
						},
					},
				],
			},
		])

		const err = assert.doesThrow(() =>
			this.vc.addRow({
				id: 'test',
				cells: [
					{
						text: {
							content: 'Hey there!',
						},
					},
				],
			})
		)

		errorAssertUtil.assertError(err, 'DUPLICATE_ROW_ID', {
			rowId: 'test',
		})

		this.vc.addRow({ id: 'unique', cells: [{ text: { content: 'oh boy!' } }] })
	}

	@test()
	protected static canGetRowsById() {
		this.vc.addRows([
			{
				id: 'test',
				cells: [
					{
						text: {
							content: 'Hey there!',
						},
					},
				],
			},
			{
				id: 'test2',
				cells: [
					{
						text: {
							content: 'Hey there! taco breath',
						},
					},
				],
			},
		])

		const rowVc = this.vc.getRowVc('test')
		const model = this.render(rowVc)

		assert.isEqual(rowVc.getId(), 'test')
		assert.doesInclude(model, {
			id: 'test',
			cells: [
				{
					text: {
						content: 'Hey there!',
					},
				},
			],
		})

		const rowVc2 = this.vc.getRowVc('test2')
		assert.isEqual(rowVc2.getId(), 'test2')

		const err = assert.doesThrow(() => this.vc.getRowVc('aoeu'))
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['rowId'],
		})
	}

	@test()
	protected static canUpsertRowByIdToUpdate() {
		this.vc.addRows([
			{
				id: 'test1',
				cells: [
					{
						text: {
							content: 'Hey there!',
						},
					},
				],
			},
			{
				id: 'test2',
				cells: [
					{
						text: {
							content: 'Hey there! taco breath',
						},
					},
				],
			},
		])

		this.vc.upsertRowById('test1', {
			cells: [{ text: { content: 'updated!' } }],
		})

		let model = this.render(this.vc)
		assert.isEqual(model.rows[0]?.cells[0]?.text?.content, 'updated!')

		this.vc.upsertRowById('test2', {
			cells: [{ text: { content: 'updated 2!' } }],
		})

		model = this.render(this.vc)
		assert.isEqual(model.rows[1]?.cells[0]?.text?.content, 'updated 2!')

		this.vc.upsertRowById('does-not-exist', {
			cells: [{ text: { content: 'totally new!' } }],
		})

		assert.isEqual(this.vc.getTotalRows(), 3)
		model = this.render(this.vc)
		assert.isEqual(model.rows[2]?.cells[0]?.text?.content, 'totally new!')
	}

	@test()
	protected static async cantdeleteRowIfNoIdFound() {
		const err = await assert.doesThrowAsync(() =>
			this.vc.deleteRow('aoeuaoeuaoeuaoeu')
		)
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['rowId'],
		})
	}

	@test()
	protected static async canRemoveRowById() {
		this.add3Rows()

		this.vc.deleteRow('test2')
		assert.isEqual(this.vc.getTotalRows(), 2)

		let model = this.render(this.vc)
		assert.isEqual(model.rows[0]?.cells[0]?.text?.content, 'Hey there!')
		assert.isEqual(model.rows[1]?.cells[0]?.text?.content, 'Hey there! 3')

		this.vc.deleteRow('test1')
		model = this.render(this.vc)
		assert.isEqual(model.rows[0]?.cells[0]?.text?.content, 'Hey there! 3')
	}

	@test()
	protected static async deletingAllRowsTriggersRenderAndResetsRowVcs() {
		this.add3Rows()
		const startingRenderCount = 3

		this.vc.getRowVc(0)

		this.vc.deleteAllRows()

		assert.isEqual(this.vc.getTotalRows(), 0)
		vcAssertUtil.assertTriggerRenderCount(this.vc, 1 + startingRenderCount)

		//@ts-ignore
		assert.isLength(this.vc._rowVcs, 0)
	}

	private static add3Rows() {
		this.vc.addRows([
			{
				id: 'test1',
				cells: [
					{
						text: {
							content: 'Hey there!',
						},
					},
				],
			},
			{
				id: 'test2',
				cells: [
					{
						text: {
							content: 'Hey there! 2',
						},
					},
				],
			},
			{
				id: 'test3',
				cells: [
					{
						text: {
							content: 'Hey there! 3',
						},
					},
				],
			},
		])
	}

	private static add2Rows() {
		this.vc.addRows([
			{
				cells: [
					{
						text: {
							content: 'Hey there!',
						},
					},
				],
			},
			{
				cells: [
					{
						text: {
							content: 'Bye there!',
						},
					},
				],
			},
		])
	}
}
