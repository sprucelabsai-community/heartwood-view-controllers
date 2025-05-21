import { test, suite, assert } from '@sprucelabs/test-utils'
import { interactor } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { ListViewControllerOptions } from '../../../viewControllers/list/List.vc'

@suite()
export default class ClickingRowsTest extends AbstractViewControllerTest {
    @test()
    protected async canPassAnyRow() {
        let wasHit = false
        const vc = this.ListVc({
            rows: [
                {
                    id: 'first',
                    cells: [],
                },
                {
                    id: 'second',
                    onClick: () => {
                        wasHit = true
                    },
                    cells: [],
                },
            ],
        })

        assert.isFalse(wasHit)
        await interactor.clickRow(vc, 1)
        assert.isTrue(wasHit)
    }

    @test()
    protected async clickingOnDisabledRowThrows() {
        let wasHit = false
        const vc = this.ListVc({
            rows: [
                {
                    id: 'first',
                    cells: [],
                },
                {
                    id: 'second',
                    onClick: () => {
                        wasHit = true
                    },
                    isEnabled: false,
                    cells: [],
                },
            ],
        })

        assert.isFalse(wasHit)
        await assert.doesThrowAsync(() => interactor.clickRow(vc, 1))
        assert.isFalse(wasHit)
    }

    protected ListVc(options?: Partial<ListViewControllerOptions>) {
        return this.Controller('list', {
            rows: [
                {
                    id: 'first',
                    cells: [],
                },
            ],
            ...options,
        })
    }
}
