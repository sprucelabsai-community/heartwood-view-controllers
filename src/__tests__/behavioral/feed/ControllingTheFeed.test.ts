import { FeedItem } from '@sprucelabs/spruce-core-schemas'
import { test, assert, generateId, errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import feedAssert from '../../../tests/utilities/feedAssert'
import vcAssert from '../../../tests/utilities/vcAssert'
import { CardSection } from '../../../types/heartwood.types'
import FeedViewController from '../../../viewControllers/Feed.vc'

export default class ControllingTheFeedTest extends AbstractViewControllerTest {
	private static vc: FeedViewController

	protected static async beforeEach() {
		await super.beforeEach()

		this.vc = this.Controller('feed', {
			items: [],
		})
	}

	@test()
	protected static async canAddItems() {
		const item = this.addItem()
		this.assertItemsEqual([item])
		const item2 = this.addItem()
		this.assertItemsEqual([item, item2])
	}

	@test()
	protected static async addingItemTriggersRender() {
		this.addItem()
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static async throwsWhenRemovingItemThatDoesNotExist() {
		this.assertThrowsWhenRemovingBadItemId()
	}

	@test()
	protected static async canRemoveItems() {
		const item = this.addItem()
		this.removeItem(item.id)
		this.assertItemsEqual([])

		const item2 = this.addItem()
		const item3 = this.addItem()

		this.removeItem(item2.id)
		this.assertItemsEqual([item3])
	}

	@test()
	protected static async canRemoveItemsInTheMiddle() {
		const item1 = this.addItem()
		const item2 = this.addItem()
		const item3 = this.addItem()

		this.removeItem(item2.id)
		this.assertItemsEqual([item1, item3])

		this.assertThrowsWhenRemovingBadItemId()
	}

	@test()
	protected static removingItemTriggersRender() {
		const i = this.addItem()
		this.removeItem(i.id)
		vcAssert.assertTriggerRenderCount(this.vc, 2)
	}

	@test()
	protected static async canSetItems() {
		const [one, two, three] = [
			this.generateItemValues(),
			this.generateItemValues(),
			this.generateItemValues(),
		]

		const expected = [one, two, three]

		this.setItems(expected)
		this.assertItemsEqual(expected)
	}

	@test()
	protected static async settingItemsTriggersRender() {
		this.setItems([])
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static async assertingCardRendersFeedThrowsWithMissing() {
		//@ts-ignore
		const err = assert.doesThrow(() => feedAssert.cardRendersFeed())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc'],
		})
	}

	@test()
	protected static throwsIfDoesNotRenderCard() {
		assert.doesThrow(
			() => feedAssert.cardRendersFeed(this.Controller('card', {})),
			`does not render a feed`
		)
	}

	@test()
	protected static knowsIfFeedIsRenderedInFirstSection() {
		this.assertCardRendersFeed([
			{
				feed: this.vc.render(),
			},
		])
	}

	@test()
	protected static knowsIfFeedIsRenderedInSecondSection() {
		this.assertCardRendersFeed([
			{},
			{
				feed: this.vc.render(),
			},
		])
	}

	@test()
	protected static async cardRenderingFeedReturnsFeedVc() {
		const feedVc = this.assertCardRendersFeed([
			{
				feed: this.vc.render(),
			},
		])

		assert.isEqual(feedVc, this.vc)
	}

	private static assertCardRendersFeed(sections: CardSection[]) {
		const vc = this.Controller('card', {
			body: {
				sections,
			},
		})
		return feedAssert.cardRendersFeed(vc)
	}

	private static setItems(items: FeedItem[]) {
		this.vc.setItems(items)
	}

	private static assertThrowsWhenRemovingBadItemId() {
		const err = assert.doesThrow(() => this.removeItem(generateId()))
		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['itemId'],
		})
	}

	private static removeItem(id: string): any {
		return this.vc.removeItem(id)
	}

	private static assertItemsEqual(expected: FeedItem[]) {
		const { items } = this.render(this.vc)
		assert.isEqualDeep(items, expected)
	}

	private static addItem() {
		const item = this.generateItemValues()
		this.vc.addItem(item)
		return item
	}

	private static generateItemValues() {
		return {
			id: generateId(),
			message: generateId(),
			dateCreated: new Date().getTime(),
			fromCasualName: generateId(),
		}
	}
}
