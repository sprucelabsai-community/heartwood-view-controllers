import { validateSchemaValues } from '@sprucelabs/schema'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import listCellSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/listCell.schema'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { ListCell, ListRow } from '../../../types/heartwood.types'
import ListCellViewController from '../../../viewControllers/list/ListCell.vc'

@suite()
export default class ControllingARowCellTest extends AbstractViewControllerTest {
    protected controllerMap = {}

    @test('cant get cell -1', -1)
    @test('cant get cell 1000', 100)
    protected cantGetACellVcFromBadIndex(cellIdx: number) {
        const err = assert.doesThrow(() => this.CellVc(cellIdx))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['cellIdx'],
        })
    }

    @test()
    protected canGetGoodCell() {
        const cellVc = this.CellVc(0)
        assert.isTrue(cellVc instanceof ListCellViewController)
    }

    @test()
    protected cellHasRender() {
        const cellVc = this.CellVc(0)
        assert.isFunction(cellVc.render)
    }

    @test()
    protected rendersValidCell() {
        const cellVc = this.CellVc(0)
        const model = this.render(cellVc)
        validateSchemaValues(listCellSchema, model)
    }

    @test('renders expected 1', { text: { content: 'hey!' } })
    @test('renders expected 2', { text: { content: 'hey you!' } })
    @test('renders expected 3', { button: { label: 'hey you!' } })
    @test('renders expected 4', { [`${Math.random()}`]: { label: 'hey you!' } })
    protected rendersExpectedContent(cellModel: ListCell) {
        const cellVc = this.CellVc(0, cellModel)
        const model = this.render(cellVc)
        assert.isEqualDeep(model, { ...cellModel, controller: cellVc })
    }

    @test()
    protected listRendersCells() {
        const listVc = this.ListVcWithSingleRow()
        const model = this.render(listVc)
        assert.isTrue(
            model.rows[0].cells[0].controller instanceof ListCellViewController
        )
    }

    @test()
    protected cellVcsReUsed() {
        const vc = this.ListVc([
            {
                id: 'first',
                cells: [
                    {
                        lineIcon: 'add',
                    },
                ],
            },
        ])

        const rowVc = vc.getRowVc(0)
        const cellVc = rowVc.getCellVc(0)

        const updates: ListCell = {
            lineIcon: 'alarm',
        }
        vc.upsertRow('first', {
            cells: [updates],
        })

        assert.isEqualDeep(
            this.render(cellVc, { shouldStripControllers: true }),
            updates
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
    @test(
        'setting date input list and triggers render in all the right places',
        {
            dateInput: {
                name: 'firstName',
                value: 100,
            },
        },
        100
    )
    protected async settingValueOnInputSetsValueOnListAndTriggersRender(
        cellModel: ListCell,
        value: any
    ) {
        const listVc = this.ListVcWithSingleRow(cellModel)

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

    @test()
    protected knowsWhenDeleted() {
        const listVc = this.ListVc([
            {
                id: 'first',
                cells: [{}, {}],
            },
        ])

        const cellVc = listVc.getRowVc(0).getCellVc(0)
        assert.isFalse(cellVc.getIsDeleted())

        listVc.deleteRow(0)
        assert.isTrue(cellVc.getIsDeleted())

        const err = assert.doesThrow(() => this.render(cellVc))
        errorAssert.assertError(err, 'CELL_DELETED')
    }

    @test('knows if date input by name exists', 'dateInput')
    @test('knows if text input by name exists', 'textInput')
    protected async knowsIfHasInput(input: 'dateInput' | 'textInput') {
        const name = generateId()
        const name2 = generateId()

        const cellVc = this.CellVc(0, {
            [input]: {
                name,
            },
        })

        assert.isTrue(cellVc.hasInput(name))
        assert.isFalse(cellVc.hasInput(name2))
    }

    @test()
    protected async knowsIfHasInputWithMultipleInputs() {
        const name = generateId()
        const name2 = generateId()
        const name3 = generateId()

        const cellVc = this.CellVc(0, {
            dateInput: {
                name,
            },
            textInput: {
                name: name2,
            },
            toggleInput: {
                name: name3,
            },
        })

        assert.isTrue(cellVc.hasInput(name))
        assert.isTrue(cellVc.hasInput(name2))
        assert.isTrue(cellVc.hasInput(name3))
    }

    private CellVc(idx: number, cellModel?: ListCell) {
        const listVc = this.ListVcWithSingleRow(cellModel)

        const rowVc = listVc.getRowVc(0)
        const cell = rowVc.getCellVc(idx)

        return cell
    }

    private ListVcWithSingleRow(
        cellModel: ListCell = { text: { content: 'hey!' } }
    ) {
        const rows = [
            {
                id: 'random',
                cells: [cellModel],
            },
        ]
        return this.ListVc(rows)
    }

    private ListVc(rows: ListRow[]) {
        return this.Controller('list', {
            rows,
        })
    }
}
