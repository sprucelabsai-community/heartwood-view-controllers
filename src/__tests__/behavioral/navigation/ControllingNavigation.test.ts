import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { Navigation } from '../../../types/heartwood.types'

export default class ControllingNavigationTest extends AbstractViewControllerTest {
	@test()
	protected static async canCreateNavigation() {
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
	protected static async passesViewModelsThrough(options: Navigation) {
		const vc = this.NavigationVc(options)
		const { controller, ...rest } = vc.render()
		assert.isEqual(controller, vc)
		assert.isEqualDeep(rest, options)
	}

	private static NavigationVc(navigation?: Navigation) {
		return this.Controller('navigation', { ...navigation })
	}
}
