import { selectAssert } from '@sprucelabs/schema'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { ListRow } from '../../../types/heartwood.types'

@suite()
export default class AssertingSelectsInListsTest extends AbstractViewControllerTest {
    protected controllerMap = {}

    @test()
    protected hasAssertRowRendersSelect() {
        assert.isFunction(vcAssert.assertRowRendersSelect)
    }

    @test()
    protected throwsIfCantFindRow() {
        const vc = this.ListVc()

        assert.doesThrow(() => vcAssert.assertRowRendersSelect(vc, 'not-found'))
    }

    @test()
    protected canFindSelectInARandomRowId() {
        const row1Id = `${new Date().getTime()}`
        const vc = this.ListVc({
            row1Id,
        })

        vcAssert.assertRowRendersSelect(vc, row1Id)
    }

    @test()
    protected cantFindSelectInRowThatDoesNotHaveOne() {
        const vc = this.ListVc({})
        assert.doesThrow(() => vcAssert.assertRowRendersSelect(vc, 'last'))
    }

    @test()
    protected canFindSelectInCellAfterFirst() {
        const vc = this.ListVc({})
        vcAssert.assertRowRendersSelect(vc, 'middle')
    }

    @test()
    protected returnsASelectViewController() {
        const vc = this.ListVc({})
        const selectVc = vcAssert.assertRowRendersSelect(vc, 'middle')

        assert.isTruthy(selectVc)
        assert.isFunction(selectVc.getChoices)
        assert.isArray(selectVc.getChoices())

        assert.isFunction(selectVc.getIsRequired)
        assert.isFalse(selectVc.getIsRequired())
    }

    @test()
    protected selectVcKnowsIfRequired() {
        const vc = this.ListVc({
            isMiddleRequired: true,
        })

        const selectVc = vcAssert.assertRowRendersSelect(vc, 'middle')
        assert.isTrue(selectVc.getIsRequired())
    }

    @test()
    protected selectVcKnowsOptions() {
        const vc = this.ListVc({
            isMiddleRequired: true,
        })

        const selectVc = vcAssert.assertRowRendersSelect(vc, 'middle')

        selectAssert.assertSelectChoicesMatch(selectVc?.getChoices(), [
            'foo',
            'taco',
        ])
    }

    @test()
    protected selectVcKnowsOptionsInDifferentRow() {
        const vc = this.ListVc({
            isMiddleRequired: true,
        })

        const selectVc = vcAssert.assertRowRendersSelect(vc, 'first')

        selectAssert.assertSelectChoicesMatch(selectVc?.getChoices(), [
            'red',
            'green',
            'blue',
        ])
    }

    @test(
        'throws if row does not contain specified selectInput.name 1',
        0,
        'panda'
    )
    @test(
        'throws if row does not contain specified selectInput.name 2',
        'time-row-2',
        'eventType'
    )
    protected throwsIfRowDoesNotContainSpecifiedSelectInputName(
        rowIdOrIdx: string,
        name: string
    ) {
        const vc = this.Controller('list', {
            rows: this.generateMultipleRows(),
        })
        assert.doesThrow(
            () => vcAssert.assertRowRendersSelect(vc, rowIdOrIdx, name),
            ' by name'
        )
    }

    @test('findsByMatchingNameInRow 1', 0, 'eventType', 0, 2)
    @test('findsByMatchingNameInRow 2', 'time-row', 'eventType', 0, 2)
    @test('findsByMatchingNameInRow 3', 'time-row-2', 'notEventType2', 1, 1)
    @test('findsByMatchingNameInRow 4', 1, 'notEventType', 1, 0)
    protected findsByMatchingNameInRow(
        idOrIdx: string | number,
        name: string,
        expectedRow: number,
        expectedCell: number
    ) {
        const rows = this.generateMultipleRows()
        const vc = this.Controller('list', { rows })

        const selectVc = vcAssert.assertRowRendersSelect(vc, idOrIdx, name)

        const expected = this.getChoiceValuesForRowCell(
            rows,
            expectedRow,
            expectedCell
        )
        selectAssert.assertSelectChoicesMatch(selectVc?.getChoices(), expected)
    }

    private getChoiceValuesForRowCell(
        rows: ListRow[],
        expectedRow: number,
        expectedCell: number
    ) {
        return (
            rows[expectedRow].cells[expectedCell].selectInput?.choices.map(
                (c) => c.value
            ) ?? []
        )
    }

    private generateMultipleRows() {
        const rows: ListRow[] = [
            {
                id: 'time-row',
                cells: [
                    { text: { content: 'Send' } },
                    {
                        selectInput: {
                            name: 'interval',
                            choices: [{ value: generateId(), label: 'honda' }],
                        },
                    },
                    {
                        selectInput: {
                            name: 'eventType',
                            choices: [
                                { value: generateId(), label: 'Break' },
                                { value: generateId(), label: 'Shift' },
                            ],
                        },
                    },
                ],
            },
            {
                id: 'time-row-2',
                cells: [
                    {
                        selectInput: {
                            name: 'notEventType',
                            choices: [{ value: generateId(), label: 'Shift' }],
                        },
                    },
                    {
                        selectInput: {
                            name: 'notEventType2',
                            choices: [{ value: generateId(), label: 'Shift' }],
                        },
                    },
                ],
            },
        ]
        return rows
    }

    private ListVc(options?: {
        row1Id?: string
        row2Id?: string
        isMiddleRequired?: boolean
    }) {
        return this.Controller('list', {
            rows: [
                {
                    id: options?.row1Id ?? 'first',
                    cells: [
                        {
                            selectInput: {
                                isRequired: true,
                                name: 'favoriteColor',
                                choices: [
                                    { value: 'red', label: 'red' },
                                    { value: 'green', label: 'green' },
                                    { value: 'blue', label: 'blue' },
                                ],
                            },
                        },
                    ],
                },
                {
                    id: 'middle',
                    cells: [
                        {},
                        {},
                        {
                            selectInput: {
                                isRequired: !!options?.isMiddleRequired,
                                name: 'state',
                                choices: [
                                    {
                                        value: 'foo',
                                        label: 'bar',
                                    },
                                    {
                                        value: 'taco',
                                        label: 'bell',
                                    },
                                ],
                            },
                        },
                    ],
                },
                {
                    id: options?.row2Id ?? 'last',
                    cells: [{}],
                },
            ],
        })
    }
}
