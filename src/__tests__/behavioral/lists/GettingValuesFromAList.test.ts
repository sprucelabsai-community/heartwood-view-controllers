import { test, suite, assert } from '@sprucelabs/test-utils'
import { generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { RowValues } from '../../../types/heartwood.types'

@suite()
export default class GettingValuesFromAListTest extends AbstractViewControllerTest {
    private row = generateId()
    private name = generateId()
    private value = generateId()
    @test()
    protected async valuesDropInIdOfRowsIfExist() {
        const vc = this.ListVc()

        const values = vc.getValues()
        this.assertRowValuesEquals(values)
    }

    @test()
    protected async throwsIfSetValueIsMissingParams() {
        const vc = this.ListVc(generateId())
        await assert.doesThrowAsync(
            //@ts-ignore
            () => vc.setValue(),
            'Options must have a row, name, and value.'
        )
    }

    @test()
    protected async canSetValues() {
        const newValue = generateId()
        const vc = this.ListVc()
        await vc.setValue(this.row, this.name, newValue)
        const values = vc.getValues()
        this.assertRowValuesEquals(values, newValue)
    }

    @test()
    protected async throwIfGetValuesMissingParams() {
        const vc = this.ListVc(generateId())
        //@ts-ignore
        assert.doesThrow(() => vc.getValue(), 'Row and name are required.')
    }

    @test()
    protected async canGetValue() {
        const vc = this.ListVc()
        const response = vc.getValue(this.row, this.name)
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
