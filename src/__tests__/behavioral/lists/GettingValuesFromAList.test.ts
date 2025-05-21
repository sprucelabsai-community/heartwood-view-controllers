import { test, suite, assert } from '@sprucelabs/test-utils'
import { generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

@suite()
export default class GettingValuesFromAListTest extends AbstractViewControllerTest {
    @test()
    protected async valuesDropInIdOfRowsIfExist() {
        const rowId = generateId()
        const name = generateId()
        const value = generateId()

        const vc = this.Controller('list', {
            rows: [
                {
                    id: rowId,
                    cells: [
                        {
                            textInput: {
                                name,
                                value,
                            },
                        },
                    ],
                },
            ],
        })

        const values = vc.getValues()
        assert.isEqualDeep(values, [
            {
                rowId,
                [name]: value,
            },
        ])
    }
}
