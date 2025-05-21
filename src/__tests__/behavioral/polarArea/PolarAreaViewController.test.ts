import { randomInt } from 'crypto'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { PolarAreaDataItem } from '../../../types/heartwood.types'
import PolarAreaViewController from '../../../viewControllers/PolarAreaViewController.vc'

@suite()
export default class PolarAreaViewControllerTest extends AbstractViewControllerTest {
    private vc!: PolarAreaViewController

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.reset([])
    }

    @test()
    protected async canCreatePolarAreaViewController() {
        this.resetAndAssertRendersExpectedData([
            {
                label: 'Red',
                value: 300,
            },
        ])

        this.resetAndAssertRendersExpectedData([
            {
                label: 'Blue',
                value: 50,
            },
            {
                label: 'Red',
                value: 300,
            },
        ])
    }

    @test()
    protected async canUpdateData() {
        const data = [
            {
                label: generateId(),
                value: randomInt(10),
            },
        ]
        this.setData(data)
        this.assertRenderedDataEquals(data)
        assert.isNotEqual(this.vc.render().data, data)
    }

    @test()
    protected async updatingDataTriggersRender() {
        this.setData([])
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    private setData(data: PolarAreaDataItem[]) {
        this.vc.setData(data)
    }

    private resetAndAssertRendersExpectedData(data: PolarAreaDataItem[]) {
        this.reset(data)

        this.assertRenderedDataEquals(data)
    }

    private assertRenderedDataEquals(data: PolarAreaDataItem[]) {
        const model = this.render(this.vc)
        assert.isEqual(model.controller, this.vc)
        assert.isEqualDeep(model.data, data)
    }

    private reset(data: PolarAreaDataItem[]) {
        this.vc = this.Controller('polar-area', {
            data,
        })
    }
}
