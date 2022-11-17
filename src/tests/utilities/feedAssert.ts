import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import { Card, ViewController } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import { pluckFirstFromCard } from './assertSupport'

const feedAssert = {
	cardRendersFeed(vc: ViewController<Card>) {
		assertOptions({ vc }, ['vc'])

		const model = renderUtil.render(vc)
		const feed = pluckFirstFromCard(model, 'feed')

		assert.isTruthy(feed, `Your card does not render a feed view!`)

		return feed.controller
	},
}

export default feedAssert
