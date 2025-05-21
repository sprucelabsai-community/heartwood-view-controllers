import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import ListViewController, {
    ListViewControllerOptions,
} from '../../../viewControllers/list/List.vc'

@suite()
export default class AssertingCheckboxTogglesRowEnabledTest extends AbstractViewControllerTest {
    protected vc!: ListViewController

    @test()
    protected async hasFunction() {
        assert.isFunction(vcAssert.assertCheckboxTogglesRowEnabled)
    }

    @test()
    protected async throwsWhenMissingParams() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            vcAssert.assertCheckboxTogglesRowEnabled()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['listVc', 'row'],
        })
    }

    @test()
    protected async throwsWhenNoCheckboxFound() {
        this.vc = this.ListVc({ rows: [this.renderRow()] })
        await assert.doesThrowAsync(() => this.assertToggles(), 'first cell')
    }

    @test()
    protected async throwsWhenCheckboxDoesNotToggleEnabled() {
        this.vc = this.ListVcWithCheckboxOnChange(() => {})
        await assert.doesThrowAsync(() => this.assertToggles(), 'toggle')
    }

    @test()
    protected async throwsWhenNoCheckbox() {
        this.vc = this.ListVc({
            rows: [
                this.renderRow([
                    {
                        id: 'yes',
                    },
                ]),
            ],
        })
        await assert.doesThrowAsync(() => this.assertToggles(), 'first cell')
    }

    @test()
    protected async passesWhenListChangesRowEnabled() {
        this.vc = this.ListVcWithCheckboxOnChange(() => {
            this.vc.getRowVc(0).setIsEnabled(false)
        })

        await this.assertToggles()
    }

    @test()
    protected async passesWhenCheckingSecondRow() {
        this.vc = this.ListVc({
            rows: [
                { id: 'yay', cells: [] },
                this.renderRowWithCheckboxInFirstCell(() => {
                    this.vc.getRowVc(1).setIsEnabled(false)
                }),
            ],
        })

        await this.assertToggles(1)
    }

    @test()
    protected async passesWhenDisabledRowIsEnabled() {
        this.vc = this.ListVcWithCheckboxOnChange(() => {
            this.vc.getRowVc(0).setIsEnabled(true)
        })
        this.vc.getRowVc(0).setIsEnabled(false)
        await this.assertToggles()
    }

    private assertToggles(row: string | number = 0) {
        return vcAssert.assertCheckboxTogglesRowEnabled(this.vc, row)
    }

    private ListVcWithCheckboxOnChange(onChange: () => void) {
        return this.ListVc({
            rows: [this.renderRowWithCheckboxInFirstCell(onChange)],
        })
    }

    private renderRowWithCheckboxInFirstCell(
        onChange: () => void
    ): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow {
        return this.renderRow([
            {
                checkboxInput: {
                    name: 'first',
                    onChange,
                },
            },
        ])
    }

    private renderRow(cells: Cell[] = []): Row {
        return { id: generateId(), cells }
    }

    private ListVc(options?: ListViewControllerOptions) {
        return this.Controller('list', { ...options })
    }
}

type Row = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow
type Cell = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCell
