import { Navigation, ViewControllerOptions } from '../../types/heartwood.types'
import removeUniversalViewOptions from '../../utilities/removeUniversalViewOptions'
import AbstractViewController from '../Abstract.vc'

export default class NavigationViewController extends AbstractViewController<Navigation> {
	private model: Navigation
	public constructor(options: ViewControllerOptions) {
		super(options)
		this.model = removeUniversalViewOptions(options)
	}

	public hide() {
		this.model.isVisible = false
		this.triggerRender()
	}

	public show() {
		this.model.isVisible = true
		this.triggerRender()
	}

	public render(): Navigation {
		return { controller: this, ...this.model }
	}
}
