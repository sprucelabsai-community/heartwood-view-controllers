import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

export default class PolarAreaViewControllerTest extends AbstractViewControllerTest {
    @test()
    protected static async canCreatePolarAreaViewController() {
        this.assertRendersExpectedData([
            {
                label: 'Red',
                value: 300,
            },
        ])

        this.assertRendersExpectedData([
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

    private static assertRendersExpectedData(
        data: { label: string; value: number }[]
    ) {
        const vc = this.Controller('polar-area', {
            data,
        })

        const model = this.render(vc)
        assert.isEqual(model.controller, vc)
        assert.isEqualDeep(model.data, data)
    }
}
