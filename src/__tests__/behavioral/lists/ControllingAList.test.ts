import { validateSchemaValues } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test-utils'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import listSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/list.schema'
import { interactor, ListColumnWidth } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
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
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['cells'],
        })
    }

    @test(`Can't add row with cells = true`, true)
    @test(`Can't add row with cells = {}`, {})
    @test(`Can't add row with cells = []`, {})
    protected static cantAddBadRow(cells: any) {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.addRow({ cells }))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['cells'],
        })
    }

    @test()
    protected static canAddRow() {
        this.vc.addRow({
            id: 'can-add',
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
            id: 'add-triggers',
            cells: [
                {
                    text: {
                        content: 'I wanna!',
                    },
                },
            ],
        })

        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected static canAddRowAtIndex() {
        this.vc.addRow({
            id: 'can-add-at-index-1',
            cells: [
                {
                    text: {
                        content: 'First',
                    },
                },
            ],
        })

        this.vc.addRow({
            id: 'can-add-at-index-2',
            cells: [
                {
                    text: {
                        content: 'Second',
                    },
                },
            ],
        })

        this.vc.addRow({
            id: 'can-add-at-index-3',
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
            id: 'can-add-at-index-4',
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
            id: generateId(),
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
            id: generateId(),
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

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['rowIdx'],
        })
    }

    @test()
    protected static canGetGoodRowVc() {
        this.vc.addRow({
            id: generateId(),
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
            id: generateId(),
            cells: [
                {
                    text: { content: 'so exciting!' },
                },
            ],
        })

        const rowVc = this.vc.getRowVc(0)
        const err = await assert.doesThrowAsync(() =>
            rowVc.setValue('taco', true)
        )

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['fieldName'],
        })
    }

    @test()
    public static rowVcHasNoValuesToStart() {
        this.vc.addRow({
            id: generateId(),
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
            id: generateId(),
            cells: [
                {
                    textInput: { name: 'lastName', label: 'row 1' },
                },
            ],
        })

        this.vc.addRow({
            id: generateId(),
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
        const rowId = generateId()
        this.vc.addRow({
            id: rowId,
            cells: [
                {
                    textInput: {
                        name: 'lastName',
                        label: 'row 1',
                        value: 'Horse',
                    },
                },
            ],
        })

        const rowVc = this.vc.getRowVc(0)
        assert.isEqualDeep(rowVc.getValues(), { rowId, lastName: 'Horse' })

        await rowVc.setValue('lastName', 'Taco')
        assert.isEqualDeep(rowVc.getValues(), { rowId, lastName: 'Taco' })
    }

    @test()
    protected static async settingValuesOnRowVcSetsValuesWithMultipleCells() {
        const rowId = generateId()
        this.vc.addRow({
            id: rowId,
            cells: [
                {
                    textInput: {
                        name: 'firstName',
                        label: 'row 1',
                        value: 'Mr.',
                    },
                },
                {
                    textInput: {
                        name: 'lastName',
                        label: 'row 1',
                        value: 'Horse',
                    },
                },
            ],
        })

        const rowVc = this.vc.getRowVc(0)
        assert.isEqualDeep(rowVc.getValues(), {
            lastName: 'Horse',
            firstName: 'Mr.',
            rowId,
        })

        await rowVc.setValue('lastName', 'Taco')
        assert.isEqualDeep(rowVc.getValues(), {
            lastName: 'Taco',
            firstName: 'Mr.',
            rowId,
        })
    }

    @test()
    protected static async canGetValuesOnList() {
        const rowId = generateId()
        this.vc.addRow({
            id: rowId,
            cells: [
                {
                    textInput: {
                        name: 'firstName',
                        label: 'row 1',
                        value: 'Mr.',
                    },
                },
                {
                    textInput: {
                        name: 'lastName',
                        label: 'row 1',
                        value: 'Horse',
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

        let values = this.vc.getValues()

        assert.isEqualDeep(values[0], {
            firstName: 'Mr.',
            middleInitial: 'Green',
            lastName: 'Horse',
            rowId,
        })

        const rowVc = this.vc.getRowVc(0)
        await rowVc.setValue('firstName', 'Ms.')
        await rowVc.setValue('middleInitial', 'Purple')

        values = this.vc.getValues()

        assert.isEqualDeep(values[0], {
            firstName: 'Ms.',
            middleInitial: 'Purple',
            lastName: 'Horse',
            rowId,
        })
    }

    @test()
    protected static async renderingRendersValueOnInputs() {
        this.vc.addRow({
            id: generateId(),
            cells: [
                {
                    textInput: {
                        name: 'firstName',
                        label: 'row 1',
                        value: 'Mr.',
                    },
                },
                {
                    textInput: {
                        name: 'lastName',
                        label: 'row 1',
                        value: 'Horse',
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

        await rowVc.setValue('firstName', 'Ms.')
        await rowVc.setValue('middleInitial', 'Purple')

        const model = this.render(this.vc)

        assert.isEqual(model.rows[0].cells[0].textInput?.value, 'Ms.')
    }

    @test()
    protected static async canSetValueOnSetValueOfField() {
        const rowId = generateId()
        this.vc.addRow({
            id: rowId,
            cells: [
                {
                    textInput: {
                        name: 'firstName',
                        label: 'row 1',
                        value: 'Mr.',
                    },
                },
                {
                    textInput: {
                        name: 'lastName',
                        label: 'row 1',
                        value: 'Horse',
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
            rowId,
        })
    }

    @test()
    protected static canSetRowsDuringConstruction() {
        const vc = this.Controller('list', {
            rows: [
                {
                    id: generateId(),
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
            id: generateId(),
            cells: [
                {
                    textInput: {
                        name: 'firstName',
                        label: 'row 1',
                        value: 'Mr.',
                    },
                },
                {
                    textInput: {
                        name: 'lastName',
                        label: 'row 1',
                        value: 'Horse',
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
        vcAssert.assertTriggerRenderCount(rowVc, 0)

        await rowVc.setValue('firstName', 'Test')

        vcAssert.assertTriggerRenderCount(rowVc, 1)
    }

    @test()
    protected static async onChangeOnInputFiredWhenChanged() {
        let onChangeInputValue: string | undefined
        let onChangeSelectValue: string | undefined

        this.vc.addRow({
            id: generateId(),
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
            id: generateId(),
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

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['fieldName'],
        })

        assert.isEqual(rowVc.getValue('firstName'), 'Mr.')
        assert.isEqual(rowVc.getValue('middleInitial'), 'Green')
    }

    @test()
    protected static canSetRowsDirectly() {
        this.vc.setRows([
            {
                id: generateId(),
                cells: [
                    {
                        text: { content: 'yay' },
                    },
                ],
            },
        ])

        vcAssert.assertTriggerRenderCount(this.vc, 1)

        let rowVc = this.vc.getRowVc(0)
        let model = this.render(rowVc)

        assert.isEqual(model.cells[0].text?.content, 'yay')

        this.vc.setRows([
            {
                id: generateId(),
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
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['rowIdx'],
        })
    }

    @test()
    protected static canDeleteRow() {
        this.vc.addRow({
            id: generateId(),
            cells: [
                {
                    text: {
                        content: 'Hey there!',
                    },
                },
            ],
        })
        this.vc.addRow({
            id: generateId(),
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
        vcAssert.assertTriggerRenderCount(this.vc, 3)

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
            id: generateId(),
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
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['rowId'],
        })
    }

    @test()
    protected static throwsWhenInstantiatingVcWithDuplicateRowIds() {
        const err = assert.doesThrow(() =>
            this.Controller('list', {
                rows: [
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
                ],
            })
        )

        errorAssert.assertError(err, 'DUPLICATE_ROW_ID', {
            rowId: 'test',
        })
    }

    @test()
    protected static throwsWhenInstantiatingVcWithDuplicateRowIds2() {
        const err = assert.doesThrow(() =>
            this.Controller('list', {
                rows: [
                    {
                        id: 'first',
                        cells: [
                            {
                                text: {
                                    content: 'Hey there!',
                                },
                            },
                        ],
                    },
                    {
                        id: 'second',
                        cells: [
                            {
                                text: {
                                    content: 'Hey there!',
                                },
                            },
                        ],
                    },
                    {
                        id: 'first',
                        cells: [
                            {
                                text: {
                                    content: 'Hey there!',
                                },
                            },
                        ],
                    },
                ],
            })
        )

        errorAssert.assertError(err, 'DUPLICATE_ROW_ID', {
            rowId: 'first',
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

        errorAssert.assertError(err, 'DUPLICATE_ROW_ID', {
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

        errorAssert.assertError(err, 'DUPLICATE_ROW_ID', {
            rowId: 'test',
        })

        this.vc.addRow({
            id: 'unique',
            cells: [{ text: { content: 'oh boy!' } }],
        })
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
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['rowId'],
        })
    }

    @test()
    protected static canUpsertRowToUpdate() {
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

        this.vc.upsertRow('test1', {
            cells: [{ text: { content: 'updated!' } }],
        })

        let model = this.render(this.vc)
        assert.isEqual(model.rows[0]?.cells[0]?.text?.content, 'updated!')

        this.vc.upsertRow('test2', {
            cells: [{ text: { content: 'updated 2!' } }],
        })

        model = this.render(this.vc)
        assert.isEqual(model.rows[1]?.cells[0]?.text?.content, 'updated 2!')

        this.vc.upsertRow('does-not-exist', {
            cells: [{ text: { content: 'totally new!' } }],
        })

        assert.isEqual(this.vc.getTotalRows(), 3)
        model = this.render(this.vc)
        assert.isEqual(model.rows[2]?.cells[0]?.text?.content, 'totally new!')
    }

    @test()
    protected static async upsertingRowRendersIt() {
        this.vc.upsertRow('taco', {
            cells: [],
        })
        vcAssert.assertTriggerRenderCount(this.vc, 1)
        this.vc.upsertRow('taco', {
            cells: [],
        })
        vcAssert.assertTriggerRenderCount(this.vc, 2)
    }

    @test()
    protected static async cantDeleteRowIfNoIdFound() {
        const err = await assert.doesThrowAsync(() =>
            this.vc.deleteRow('aoeuaoeuaoeuaoeu')
        )
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
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
        vcAssert.assertTriggerRenderCount(this.vc, 1 + startingRenderCount)

        //@ts-ignore
        assert.isLength(this.vc._rowVcs, 0)
    }

    @test()
    protected static async returningFalseFromOnChangeStopsItFromChangingValues() {
        this.vc.addRow({
            id: 'my-row',
            cells: [
                {
                    toggleInput: {
                        name: 'isEnabled',
                        value: false,
                        onChange: () => false,
                    },
                },
            ],
        })

        await interactor.clickToggleInRow(this.vc, 'my-row')

        const values = this.vc.getValues()
        assert.isFalse(values[0].isEnabled)
    }

    @test()
    protected static canSetRowHeight() {
        this.vc.addRow({
            id: 'my-row',
            height: 'content',
            cells: [
                {
                    toggleInput: {
                        name: 'isEnabled',
                        value: false,
                        onChange: () => false,
                    },
                },
            ],
        })

        assert.isEqual(this.render(this.vc).rows[0].height, 'content')
    }

    @test()
    protected static async canClickOnRow() {
        let wasHit = false

        this.vc.addRow({
            id: generateId(),
            cells: [],
            onClick: () => {
                wasHit = true
            },
        })

        const listVc = this.vc
        await interactor.clickRow(listVc, 0)

        assert.isTrue(wasHit)
    }

    @test()
    protected static async canEnableAndDisableRow() {
        this.vc.addRow({
            id: generateId(),
            cells: [],
        })

        let model = this.render(this.vc)
        assert.isUndefined(model.rows[0].isEnabled)

        this.vc.getRowVc(0).setIsEnabled(false)

        model = this.render(this.vc)
        assert.isFalse(model.rows[0].isEnabled)

        this.vc.getRowVc(0).setIsEnabled(true)

        model = this.render(this.vc)
        assert.isTrue(model.rows[0].isEnabled)
    }

    @test()
    protected static async settingValueToSameValueHasNoEffect() {
        let hitCount = 0

        this.vc.addRow({
            id: 'first',
            cells: [
                {
                    textInput: {
                        name: 'firstName',
                        onChange: () => {
                            hitCount++
                        },
                    },
                },
            ],
        })

        const first = this.vc.getRowVc('first')
        await first.setValue('firstName', 'test')
        assert.isEqual(hitCount, 1)
        await first.setValue('firstName', 'test')
        assert.isEqual(hitCount, 1)
    }

    @test()
    protected static async canSetColumnWidths() {
        this.assertSettingColumnWidthsRendersExpected(['content', 'fill'])
        this.assertSettingColumnWidthsRendersExpected(['fill'])
    }

    @test()
    protected static settingColmunWidthsTriggersRender() {
        this.setColumnWidths(['content', 'fill'])
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected static async valuesAreUpdatedInOnChange() {
        let onChangedValue: string | undefined
        let listValue: string | undefined

        this.vc.setRows([
            {
                id: generateId(),
                cells: [
                    {
                        textInput: {
                            name: 'test',
                            onChange: async (value) => {
                                onChangedValue = value
                                listValue = this.vc.getValues()[0].test
                            },
                        },
                    },
                ],
            },
        ])

        const value = generateId()
        await this.vc.getRowVc(0).setValue('test', value)

        assert.isEqual(listValue, onChangedValue)
    }

    @test()
    protected static async canCheckIfRowExistsByIdx() {
        this.vc.addRow({
            id: generateId(),
            cells: [],
        })

        assert.isTrue(this.vc.doesRowExist(0))
        assert.isFalse(this.vc.doesRowExist(1))
    }

    private static assertSettingColumnWidthsRendersExpected(
        widths: ListColumnWidth[]
    ) {
        this.setColumnWidths(widths)
        assert.isEqualDeep(this.render(this.vc).columnWidths, widths)
    }

    private static setColumnWidths(widths: ListColumnWidth[]) {
        this.vc.setColumnWidths(widths)
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
                id: generateId(),
                cells: [
                    {
                        text: {
                            content: 'Hey there!',
                        },
                    },
                ],
            },
            {
                id: generateId(),
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
