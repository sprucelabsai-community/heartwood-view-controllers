import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'

@suite()
export default class ClickingCheckboxesInListsTest extends AbstractViewControllerTest {
    @test()
    protected async hasClickCheckbox() {
        assert.isFunction(interactor.clickCheckboxInRow)
    }

    private readonly rowWithoutCheckbox = {
        id: 'test',
        cells: [],
    }

    @test()
    protected async throwsWithoutCheckbox() {
        const listVc = this.ListVc([this.rowWithoutCheckbox])
        await assert.doesThrowAsync(
            () => interactor.clickCheckboxInRow(listVc, 0),
            'checkbox'
        )
    }

    @test()
    protected async findsInFirstRowFirstCell() {
        const listVc = this.ListVc([this.rowWithCheckboxFirstCell])

        await interactor.clickCheckboxInRow(listVc, 0)
    }

    @test()
    protected async findsInSecondRow() {
        const listVc = this.ListVc([
            this.rowWithoutCheckbox,
            this.rowWithCheckboxFirstCell,
        ])

        await interactor.clickCheckboxInRow(listVc, 1)
    }

    @test()
    protected async canFindInSecondCell() {
        const listVc = this.ListVc([this.rowWithCheckboxSecondCell])
        await interactor.clickCheckboxInRow(listVc, 0)
    }

    @test()
    protected async setsValueOnClick() {
        const listVc = this.ListVc([this.rowWithCheckboxFirstCell])
        await interactor.clickCheckboxInRow(listVc, 0)
        assert.isTrue(listVc.getValues()[0].whatever)
    }

    @test()
    protected async setsValueOnClickByDifferentName() {
        const listVc = this.ListVc([
            {
                id: 'another',
                cells: [
                    {
                        checkboxInput: {
                            name: 'another',
                        },
                    },
                ],
            },
        ])
        await interactor.clickCheckboxInRow(listVc, 0)
        assert.isTrue(listVc.getValues()[0].another)
        await interactor.clickCheckboxInRow(listVc, 0)
        assert.isFalse(listVc.getValues()[0].another)
    }

    @test()
    protected async throwsWhenCantFindByName() {
        const listVc = this.ListVc([
            {
                id: 'another',
                cells: [
                    {
                        checkboxInput: {
                            name: 'another',
                        },
                    },
                    {
                        checkboxInput: {
                            name: 'last',
                        },
                    },
                ],
            },
        ])

        await assert.doesThrowAsync(() =>
            interactor.clickCheckboxInRow(listVc, 0, 'test')
        )

        await assert.doesThrowAsync(() =>
            interactor.clickCheckboxInRow(listVc, 0, 'what')
        )

        await interactor.clickCheckboxInRow(listVc, 0, 'another')
        await interactor.clickCheckboxInRow(listVc, 0, 'last')
    }

    private get checkboxCell() {
        return {
            checkboxInput: {
                name: 'whatever',
            },
        }
    }

    private get rowWithCheckboxFirstCell() {
        return {
            id: 'another',
            cells: [this.checkboxCell],
        }
    }

    private get rowWithCheckboxSecondCell() {
        return {
            id: 'another',
            cells: [{}, this.checkboxCell],
        }
    }

    private ListVc(
        rows: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow[]
    ) {
        return this.Controller('list', {
            rows,
        })
    }
}
