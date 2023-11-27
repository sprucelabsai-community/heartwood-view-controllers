import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import { ViewControllerOptions } from '../../../types/heartwood.types'
import NavigationViewController from '../../../viewControllers/navigation/Navigation.vc'

export default class HasNavSkillView extends AbstractSkillViewController {
	public nav: NavigationViewController

	public constructor(options: ViewControllerOptions) {
		super(options)
		this.nav = this.Controller('navigation', {})
	}

	public setNav(nav: NavigationViewController) {
		this.nav = nav
	}

	public renderNavigation() {
		return this.nav.render()
	}

	public render() {
		return {}
	}
}
