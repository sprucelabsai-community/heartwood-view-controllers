import { test, assert } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import navigationAssert from '../../../tests/utilities/navigationAssert'
import {
	Navigation,
	NavigationButton,
	ViewControllerOptions,
} from '../../../types/heartwood.types'
import NavigationViewController from '../../../viewControllers/navigation/Navigation.vc'

class NoNavigationSkillView extends AbstractSkillViewController {
	public render() {
		return {}
	}
}

class HasNavSkillView extends AbstractSkillViewController {
	public nav: NavigationViewController

	public constructor(options: ViewControllerOptions) {
		super(options)
		this.nav = this.Controller('navigation', {})
	}

	public renderNavigation() {
		return this.nav.render()
	}

	public render() {
		return {}
	}
}

export default class AssertingNavigationTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		noNav: NoNavigationSkillView,
		hasNav: HasNavSkillView,
	}

	@test()
	protected static async throwsWhenNotFindingButtons() {
		const vc = this.NavigationVc()
		assert.doesThrow(() => navigationAssert.rendersButton(vc, 'test'))
	}

	@test('can find first button 1', [{ id: 'test' }], 'test')
	@test('can find first button 2', [{ id: 'test2' }], 'test2')
	@test('can find second button 1', [{ id: 'test' }, { id: 'test2' }], 'test2')
	protected static async canFindButtons(
		buttons: NavigationButton[],
		id: string
	) {
		const vc = this.NavigationVc({
			buttons,
		})
		navigationAssert.rendersButton(vc, id)
	}

	@test()
	protected static async throwsWhenNotRenderButtonLabels() {
		const vc = this.NavigationVc({
			shouldRenderButtonLabels: false,
		})

		assert.doesThrow(() => navigationAssert.rendersButtonLabels(vc))
	}

	@test()
	protected static async canFindRenderButtonLabels() {
		const vc = this.NavigationVc({
			shouldRenderButtonLabels: true,
		})

		navigationAssert.rendersButtonLabels(vc)
	}

	@test()
	protected static async throwsWhenNotRenderingNavigation() {
		const svc = this.Controller('noNav' as any, {})
		assert.doesThrow(() => navigationAssert.skillViewRendersNavigation(svc))
	}

	@test()
	protected static async canPassIfFindingsNav() {
		const svc = this.Controller('hasNav' as any, {})
		const nav = navigationAssert.skillViewRendersNavigation(svc)
		assert.isEqual(nav, svc.nav)
	}

	private static NavigationVc(navigation?: Navigation) {
		return this.Controller('navigation', { ...navigation })
	}
}
