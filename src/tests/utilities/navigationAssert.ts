import { assert } from '@sprucelabs/test-utils'
import {
	Navigation,
	SkillViewController,
	ViewController,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'

const navigationAssert = {
	rendersButton(vc: ViewController<Navigation>, id: string) {
		const model = renderUtil.render(vc)

		const buttons = model.buttons
		const button = buttons?.find((b) => b.id === id)
		assert.isTruthy(
			button,
			`I could not find a button with the id "${id}" in your navigation!`
		)
	},

	rendersButtons(vc: ViewController<Navigation>, ids: string[]) {
		ids.forEach((id) => this.rendersButton(vc, id))
	},

	rendersButtonLabels(vc: ViewController<Navigation>) {
		const model = renderUtil.render(vc)
		assert.isTrue(
			model.shouldRenderButtonLabels,
			`Your navigation should render button labels but it is not! Try shouldRenderButtonLabels: true`
		)
	},

	skillViewRendersNavigation(vc: SkillViewController) {
		const nav = vc.renderNavigation?.()
		assert.isTruthy(
			nav,
			`Your skill view did not render a navigation! Implement renderNavigation() and use this.Controller('navigation', {}) to render one.`
		)

		return nav.controller!
	},
}

export default navigationAssert
