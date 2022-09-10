import { assert } from '@sprucelabs/test'
import { Card, ViewController } from '../types/heartwood.types'
import renderUtil from './render.utility'

const mapAssert = {
	assertCardRendersMap(vc: ViewController<Card>) {
		const card = renderUtil.render(vc)

		const match = card.body?.sections?.find((s) => !!s.map)
		assert.isTruthy(
			match,
			`I expected your card to render a map, but it does not!!`
		)

		return match.map!.controller!
	},
}

export default mapAssert
