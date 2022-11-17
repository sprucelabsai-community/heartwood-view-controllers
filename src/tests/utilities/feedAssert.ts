import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import { Card, ViewController } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import FeedViewController from '../../viewControllers/Feed.vc'
import { pluckFirstFromCard } from './assertSupport'

const feedAssert = {
	cardRendersFeed(vc: ViewController<Card>) {
		assertOptions({ vc }, ['vc'])

		const model = renderUtil.render(vc)
		const feed = pluckFirstFromCard(model, 'feed')

		assert.isTruthy(feed?.controller, `Your card does not render a feed view!`)

		return feed.controller as FeedViewController
	},
}

export default feedAssert
