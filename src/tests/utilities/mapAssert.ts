import { assert } from '@sprucelabs/test'
import { Card, Map, MapPin, ViewController } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'

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

	assertMapHasPin(vc: ViewController<Map>, pin: Partial<MapPin>) {
		const { pins } = renderUtil.render(vc)
		assert.doesInclude(
			pins,
			pin,
			`Oh no! I checked the map and could not find that pin anywhere! Try 'this.mapVc.addPin(...)'!`
		)
	},
}

export default mapAssert
