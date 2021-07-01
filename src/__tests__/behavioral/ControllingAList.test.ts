import { validateSchemaValues } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import listSchema from '#spruce/schemas/heartwood/v2021_02_11/list.schema'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import vcAssertUtil from '../../tests/utilities/vcAssert.utility'
import ListViewController from '../../viewControllers/list/List.vc'

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
		assert.isEqualDeep(model.rows[0].cells[0], {
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
	protected static cantSetValueOnRowFieldByNameDoesNotExist() {
		this.vc.addRow({
			cells: [
				{
					text: { content: 'so exciting!' },
				},
			],
		})

		const rowVc = this.vc.getRowVc(0)

		const err = assert.doesThrow(() => rowVc.setValue('taco', true))

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
	protected static canSetValueOnGoodFieldName() {
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

		rowVc.setValue('firstName', 'cheapseats')
		rowVc.setValue('lastName', 'cheapseats')

		rowVc = this.vc.getRowVc(0)
		rowVc.setValue('lastName', 'cheapseats')
	}

	@test()
	protected static emptyValuesOnListToStart() {
		const values = this.vc.getValues()
		assert.isEqualDeep(values, [])
	}

	@test()
	protected static settingValuesOnRowVcSetsValues() {
		this.vc.addRow({
			cells: [
				{
					textInput: { name: 'lastName', label: 'row 1', value: 'Horse' },
				},
			],
		})

		const rowVc = this.vc.getRowVc(0)
		assert.isEqualDeep(rowVc.getValues(), { lastName: 'Horse' })

		rowVc.setValue('lastName', 'Taco')
		assert.isEqualDeep(rowVc.getValues(), { lastName: 'Taco' })
	}

	@test()
	protected static settingValuesOnRowVcSetsValuesWithMultipleCells() {
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

		rowVc.setValue('lastName', 'Taco')
		assert.isEqualDeep(rowVc.getValues(), {
			lastName: 'Taco',
			firstName: 'Mr.',
		})
	}

	@test()
	protected static canGetValuesOnList() {
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
		rowVc.setValue('firstName', 'Ms.')
		rowVc.setValue('middleInitial', 'Purple')

		values = this.vc.getValues()

		assert.isEqualDeep(values[0], {
			firstName: 'Ms.',
			middleInitial: 'Purple',
			lastName: 'Horse',
		})
	}

	@test()
	protected static renderingRendersValueOnInputs() {
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

		rowVc.setValue('firstName', 'Ms.')
		rowVc.setValue('middleInitial', 'Purple')

		const model = this.render(this.vc)

		assert.isEqual(model.rows[0].cells[0].textInput?.value, 'Ms.')
	}

	@test()
	protected static canSetValueOnSetValueOfField() {
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
		model.rows[0].cells[0].textInput?.setValue('firstName', 'Trip')
		model.rows[0].cells[2].selectInput?.setValue('middleInitial', 'Brown')

		const rowVc = this.vc.getRowVc(0)
		const values = rowVc.getValues()

		assert.isEqualDeep(values, {
			firstName: 'Trip',
			lastName: 'Horse',
			middleInitial: 'Brown',
		})
	}

	@test()
	protected static async canSetRowsDuringConstruction() {
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
}
