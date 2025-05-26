import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import listAssert from '../../../tests/utilities/listAssert'
import { ListRow, StatusIndicatorStatus } from '../../../types/heartwood.types'

@suite()
export default class AssertingIndicatorsInListsTest extends AbstractViewControllerTest {
    @test()
    protected async throwsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            listAssert.rowRendersStatusIndicator()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['listVc', 'row'],
        })
    }

    @test()
    protected async throwsWhenNotFound() {
        const rowId = generateId()
        const listVc = this.ListVc([
            {
                id: rowId,
                cells: [],
            },
        ])
        assert.doesThrow(
            () => listAssert.rowRendersStatusIndicator(listVc, rowId),
            'status indicator'
        )
    }

    @test()
    protected async passesWhenFoundInFirstRowAndFirstCell() {
        const rowId = generateId()
        const listVc = this.ListVc([
            {
                id: rowId,
                cells: [
                    {
                        statusIndicator: {
                            status: 1,
                        },
                    },
                ],
            },
        ])

        listAssert.rowRendersStatusIndicator(listVc, rowId)
    }

    @test()
    protected async foundInFirstRowAndSecondCell() {
        const rowId = generateId()
        const listVc = this.ListVc([
            {
                id: rowId,
                cells: [
                    {},
                    {
                        statusIndicator: {
                            status: 1,
                        },
                    },
                ],
            },
        ])
        listAssert.rowRendersStatusIndicator(listVc, rowId)
    }

    @test()
    protected async foundInSecondRowAndFirstCell() {
        const rowId = generateId()
        const listVc = this.ListVc([
            {
                id: generateId(),
                cells: [],
            },
            {
                id: rowId,
                cells: [
                    {
                        statusIndicator: {
                            status: 1,
                        },
                    },
                ],
            },
        ])
        listAssert.rowRendersStatusIndicator(listVc, rowId)
    }

    @test()
    protected async throwsIfStatusDifferent() {
        const listVc = this.ListVc([
            {
                id: generateId(),
                cells: [
                    {
                        statusIndicator: {
                            status: 1,
                        },
                    },
                ],
            },
        ])

        assert.doesThrow(
            () => listAssert.rowRendersStatusIndicator(listVc, 0, 2),
            'status'
        )
    }

    @test('matches expected status 1', 1)
    @test('matches expected status 2', 2)
    protected async matchesIfStatusMatches(status: StatusIndicatorStatus) {
        const listVc = this.ListVc([
            {
                id: generateId(),
                cells: [
                    {
                        statusIndicator: {
                            status,
                        },
                    },
                ],
            },
        ])
        listAssert.rowRendersStatusIndicator(listVc, 0, status)
    }

    private ListVc(rows: ListRow[]) {
        return this.Controller('list', {
            rows,
        })
    }
}
