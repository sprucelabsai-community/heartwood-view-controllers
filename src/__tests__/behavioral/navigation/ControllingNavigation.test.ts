import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import vcAssert from '../../../tests/utilities/vcAssert'
import { Navigation, NavigationButton } from '../../../types/heartwood.types'
import NavigationViewController from '../../../viewControllers/navigation/Navigation.vc'
import AbstractNavigationTest from './AbstractNavigationTest'

@suite()
export default class ControllingNavigationTest extends AbstractNavigationTest {
    private vc!: NavigationViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.NavigationVc()
    }

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

    @test()
    protected async canToggleButtonLabels() {
        this.assertDoesNotRenderButtonLabels()

        this.setShouldRenderButtonLabels(true)

        const updatedModel = this.render(this.vc)
        assert.isTrue(
            updatedModel.shouldRenderButtonLabels,
            'button labels should be rendered'
        )

        this.setShouldRenderButtonLabels(false)
        this.assertDoesNotRenderButtonLabels()
    }

    @test()
    protected async settingShouldRenderButtonLabelsTriggersRender() {
        this.setShouldRenderButtonLabels(true)
        vcAssert.assertTriggerRenderCount(this.vc, 1)
        this.setShouldRenderButtonLabels(false)
        vcAssert.assertTriggerRenderCount(this.vc, 2)
    }

    @test()
    protected async canSetbuttons() {
        const buttons: NavigationButton[] = [
            { id: 'go', label: 'team', lineIcon: 'add' },
        ]

        this.setButtons(buttons)
        this.assertRenderedButtonsEqual(buttons)
    }

    @test()
    protected async canSetDifferentButtons() {
        const buttons: NavigationButton[] = [
            { id: 'more', label: 'then', lineIcon: 'add-square' },
            { id: 'go2', label: 'team2', lineIcon: 'add' },
        ]

        this.setButtons(buttons)
        this.assertRenderedButtonsEqual(buttons)
    }

    @test()
    protected async settingButtonsTriggersRender() {
        const buttons: NavigationButton[] = [
            { id: generateId(), label: generateId(), lineIcon: 'alarm' },
        ]

        this.setButtons(buttons)
        vcAssert.assertTriggerRenderCount(this.vc, 1)

        this.setButtons(buttons)
        vcAssert.assertTriggerRenderCount(this.vc, 2)
    }

    private assertRenderedButtonsEqual(buttons: NavigationButton[]) {
        const model = this.render(this.vc)
        assert.isEqualDeep(
            model.buttons,
            buttons,
            'Did not set buttons correctly'
        )
    }

    private setButtons(buttons: NavigationButton[]) {
        this.vc.setButtons(buttons)
    }

    private setShouldRenderButtonLabels(shouldRender: boolean) {
        this.vc.setShouldRenderButtonLabels(shouldRender)
    }

    private assertDoesNotRenderButtonLabels() {
        const model = this.render(this.vc)
        assert.isFalsy(
            model.shouldRenderButtonLabels,
            'button labels should not be rendered'
        )
    }

    private assertNavIsVisible(
        vc: NavigationViewController,
        expected: boolean
    ) {
        assert.isEqual(vc.render().isVisible, expected)
        vcAssert.assertTriggerRenderCount(vc, 1)
    }
}
