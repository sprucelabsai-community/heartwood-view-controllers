import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import listAssert from '../../../tests/utilities/listAssert'
import vcAssert from '../../../tests/utilities/vcAssert'

@suite()
export default class AssertingCheckboxesInListsTest extends AbstractViewControllerTest {
    private readonly cellWithCheckbox = {
        checkboxInput: {
            name: 'test',
        },
    }

    private readonly rowWithCheckboxInFirstCell = {
        id: 'test',
        cells: [this.cellWithCheckbox],
    }

    private readonly rowWithCheckboxInSecondCell = {
        id: 'test',
        cells: [{}, this.cellWithCheckbox],
    }

    private readonly rowWithoutCheckbox = {
        id: 'test-2',
        cells: [{}],
    }

    @test()
    protected hasCheckboxAssertion() {
        assert.isFunction(vcAssert.assertRowRendersCheckBox)
    }

    @test()
    protected throwsWhenNoCheckbox() {
        this.assertThrows([], 0)
        this.assertThrows([], 1)
        this.assertThrows(
            [this.rowWithCheckboxInFirstCell, this.rowWithoutCheckbox],
            1
        )
        this.assertThrows(
            [this.rowWithCheckboxInFirstCell, this.rowWithoutCheckbox],
            0,
            'panda',
            'I could not find a checkbox by name'
        )
    }

    @test()
    protected passesWhenCheckboxInFirstRowFirstCell() {
        this.assertFound([this.rowWithCheckboxInFirstCell], 0)
        this.assertFound([this.rowWithCheckboxInSecondCell], 0)
    }

    @test()
    protected passesWhenCheckboxHasMatchingName() {
        this.assertFound([this.rowWithCheckboxInFirstCell], 0, 'test')
        this.assertFound([this.rowWithCheckboxInSecondCell], 0, 'test')
    }

    private assertThrows(
        rows: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow[],
        row: number,
        name?: string,
        expectedError?: string
    ) {
        const listVc = this.Controller('list', {
            rows,
        })

        const err = assert.doesThrow(() =>
            vcAssert.assertRowRendersCheckBox(listVc, row, name)
        )

        listAssert.rowDoesNotRenderCheckbox(listVc, row, name)

        if (expectedError) {
            assert.doesInclude(err.message, expectedError)
        }
    }

    private assertFound(
        rows: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow[],
        row: number,
        name?: string
    ) {
        const listVc = this.Controller('list', {
            rows,
        })
        vcAssert.assertRowRendersCheckBox(listVc, row, name)

        assert.doesThrow(() =>
            listAssert.rowDoesNotRenderCheckbox(listVc, row, name)
        )
    }
}
