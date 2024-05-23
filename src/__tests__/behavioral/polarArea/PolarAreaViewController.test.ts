import { randomInt } from 'crypto'
import { test, assert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { PolarAreaDataItem } from '../../../types/heartwood.types'
import PolarAreaViewController from '../../../viewControllers/PolarAreaViewController.vc'

export default class PolarAreaViewControllerTest extends AbstractViewControllerTest {
    private static vc: PolarAreaViewController

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.reset([])
    }

    @test()
    protected static async canCreatePolarAreaViewController() {
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
    protected static async canUpdateData() {
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
    protected static async updatingDataTriggersRender() {
        this.setData([])
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    private static setData(data: PolarAreaDataItem[]) {
        this.vc.setData(data)
    }

    private static resetAndAssertRendersExpectedData(
        data: PolarAreaDataItem[]
    ) {
        this.reset(data)

        this.assertRenderedDataEquals(data)
    }

    private static assertRenderedDataEquals(data: PolarAreaDataItem[]) {
        const model = this.render(this.vc)
        assert.isEqual(model.controller, this.vc)
        assert.isEqualDeep(model.data, data)
    }

    private static reset(data: PolarAreaDataItem[]) {
        this.vc = this.Controller('polar-area', {
            data,
        })
    }
}
