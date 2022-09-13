import { assert } from '@sprucelabs/test-utils'
import { Map, ViewController } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import interactor from './interactor'

const mapInteractor = {
	async clickButtonOnPin(
		vc: ViewController<Map>,
		pinIdx: number,
		buttonId: number | string
	) {
		const { pins } = renderUtil.render(vc)
		const pin = pins?.[pinIdx]

		assert.isTruthy(pin, 'I could not find that pin!')

		const button = pin.buttons?.find(
			(b, idx) => idx === buttonId || b.id === buttonId
		)

		assert.isTruthy(
			button,
			`I could not find button '${buttonId}' in your pin!`
		)

		return interactor.click(button)
	},
}

export default mapInteractor
