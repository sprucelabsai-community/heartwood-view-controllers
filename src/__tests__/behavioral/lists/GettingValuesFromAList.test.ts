import { test, suite, assert, errorAssert } from '@sprucelabs/test-utils'
import { generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { RowValues } from '../../../types/heartwood.types'
import ListViewController from '../../../viewControllers/list/List.vc'

@suite()
export default class GettingValuesFromAListTest extends AbstractViewControllerTest {
    private row = generateId()
    private name = generateId()
    private value = generateId()
    private vc!: ListViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.ListVc()
    }

    @test()
    protected async valuesDropInIdOfRowsIfExist() {
        const values = this.vc.getValues()
        this.assertRowValuesEquals(values)
    }

    @test()
    protected async throwsIfSetValueIsMissingParams() {
        const err = await assert.doesThrowAsync(
            //@ts-ignore
            () => this.vc.setValue()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['row', 'name', 'value'],
        })
    }

    @test()
    protected async canSetValues() {
        const newValue = generateId()
        await this.vc.setValue(this.row, this.name, newValue)
        const values = this.vc.getValues()
        this.assertRowValuesEquals(values, newValue)
    }

    @test()
    protected async throwIfGetValuesMissingParams() {
        const err = await assert.doesThrowAsync(
            //@ts-ignore
            () => this.vc.getValue()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['row', 'name'],
        })
    }

    @test()
    protected async canGetValue() {
        const response = this.vc.getValue(this.row, this.name)
        assert.isEqual(response, this.value)
    }

    private assertRowValuesEquals(values: RowValues[], value?: string) {
        assert.isEqualDeep(values, [
            {
                rowId: this.row,
                [this.name]: value ?? this.value,
            },
        ])
    }

    private ListVc(rowId?: string, name?: string, value?: string) {
        return this.Controller('list', {
            rows: [
                {
                    id: this.row ?? rowId,
                    cells: [
                        {
                            textInput: {
                                name: this.name ?? name,
                                value: this.value ?? value,
                            },
                        },
                    ],
                },
            ],
        })
    }
}
