import { test, assert } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import navigationAssert from '../../../tests/utilities/navigationAssert'
import { NavigationButton } from '../../../types/heartwood.types'
import AbstractNavigationTest from './AbstractNavigationTest'
import HasNavSkillView from './HasNavSkillView'

class NoNavigationSkillView extends AbstractSkillViewController {
	public render() {
		return {}
	}
}

export default class AssertingNavigationTest extends AbstractNavigationTest {
	protected static controllerMap = {
		noNav: NoNavigationSkillView,
		hasNav: HasNavSkillView,
	}

	@test()
	protected static async throwsWhenNotFindingButtons() {
		const vc = this.NavigationVc()
		assert.doesThrow(() => navigationAssert.rendersButton(vc, 'test'))
	}

	@test()
	protected static async doesNotFindIfNotFindingAllButtons() {
		const vc = this.NavigationVc({ buttons: [{ id: 'test', lineIcon: 'tag' }] })
		assert.doesThrow(() =>
			navigationAssert.rendersButtons(vc, ['test', 'test2'])
		)
	}

	@test('can find first button 1', [{ id: 'test' }], ['test'])
	@test('can find first button 2', [{ id: 'test2' }], ['test2'])
	@test(
		'can find second button 1',
		[{ id: 'test' }, { id: 'test2' }],
		['test2']
	)
	@test(
		'can find multiple buttons 1',
		[{ id: 'test' }, { id: 'test2' }],
		['test', 'test2']
	)
	protected static async canFindButtons(
		buttons: NavigationButton[],
		ids: string[]
	) {
		const vc = this.NavigationVc({
			buttons,
		})
		navigationAssert.rendersButton(vc, ids[0])
		navigationAssert.rendersButtons(vc, ids)
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
}
