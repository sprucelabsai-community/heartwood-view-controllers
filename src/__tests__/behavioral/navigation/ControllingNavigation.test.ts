import { test, suite, assert } from '@sprucelabs/test-utils'
import vcAssert from '../../../tests/utilities/vcAssert'
import { Navigation } from '../../../types/heartwood.types'
import NavigationViewController from '../../../viewControllers/navigation/Navigation.vc'
import AbstractNavigationTest from './AbstractNavigationTest'

@suite()
export default class ControllingNavigationTest extends AbstractNavigationTest {
    @test()
    protected async canCreateNavigation() {
        this.NavigationVc()
    }

    @test('renders empty navigation 1', {
        isVisible: true,
        buttons: [],
        shouldRenderButtonLabels: false,
    })
    @test('renders empty navigation 2', {
        isVisible: false,
        buttons: [{ id: 'yay' }],
        shouldRenderButtonLabels: false,
    })
    protected async passesViewModelsThrough(options: Navigation) {
        const vc = this.NavigationVc(options)
        const { controller, ...rest } = vc.render()
        assert.isEqual(controller, vc)
        assert.isEqualDeep(rest, options)
    }

    @test()
    protected async canShowHideNavigation() {
        const vc = this.NavigationVc()
        vc.hide()
        this.assertNavIsVisible(vc, false)
    }

    @test()
    protected async canHideNavigation() {
        const vc = this.NavigationVc({ isVisible: false })
        vc.show()
        this.assertNavIsVisible(vc, true)
    }

    private assertNavIsVisible(
        vc: NavigationViewController,
        expected: boolean
    ) {
        assert.isEqual(vc.render().isVisible, expected)
        vcAssert.assertTriggerRenderCount(vc, 1)
    }
}
