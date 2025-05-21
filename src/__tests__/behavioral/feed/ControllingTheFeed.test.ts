import { FeedItem } from '@sprucelabs/spruce-core-schemas'
import {
    test,
    suite,
    assert,
    generateId,
    errorAssert,
} from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import feedAssert from '../../../tests/utilities/feedAssert'
import vcAssert from '../../../tests/utilities/vcAssert'
import { CardSection } from '../../../types/heartwood.types'
import FeedViewController from '../../../viewControllers/Feed.vc'

@suite()
export default class ControllingTheFeedTest extends AbstractViewControllerTest {
    private vc!: FeedViewController

    protected async beforeEach() {
        await super.beforeEach()

        this.vc = this.Controller('feed', {
            items: [],
        })
    }

    @test()
    protected async canAddItems() {
        const item = this.addItem()
        this.assertItemsEqual([item])
        const item2 = this.addItem()
        this.assertItemsEqual([item, item2])
    }

    @test()
    protected async addingItemTriggersRender() {
        this.addItem()
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async throwsWhenRemovingItemThatDoesNotExist() {
        this.assertThrowsWhenRemovingBadItemId()
    }

    @test()
    protected async canRemoveItems() {
        const item = this.addItem()
        this.removeItem(item.id)
        this.assertItemsEqual([])

        const item2 = this.addItem()
        const item3 = this.addItem()

        this.removeItem(item2.id)
        this.assertItemsEqual([item3])
    }

    @test()
    protected async canRemoveItemsInTheMiddle() {
        const item1 = this.addItem()
        const item2 = this.addItem()
        const item3 = this.addItem()

        this.removeItem(item2.id)
        this.assertItemsEqual([item1, item3])

        this.assertThrowsWhenRemovingBadItemId()
    }

    @test()
    protected removingItemTriggersRender() {
        const i = this.addItem()
        this.removeItem(i.id)
        vcAssert.assertTriggerRenderCount(this.vc, 2)
    }

    @test()
    protected async canSetItems() {
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
    protected async settingItemsTriggersRender() {
        this.setItems([])
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async assertingCardRendersFeedThrowsWithMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => feedAssert.cardRendersFeed())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected throwsIfDoesNotRenderCard() {
        this.assertDoesNotRenderFeed([])
    }

    @test()
    protected knowsIfFeedIsRenderedInFirstSection() {
        this.assertCardRendersFeed([
            {
                feed: this.vc.render(),
            },
        ])
    }

    @test()
    protected knowsIfFeedIsRenderedInSecondSection() {
        this.assertCardRendersFeed([
            {},
            {
                feed: this.vc.render(),
            },
        ])
    }

    @test()
    protected async cardRenderingFeedReturnsFeedVc() {
        const feedVc = this.assertCardRendersFeed([
            {
                feed: this.vc.render(),
            },
        ])

        assert.isEqual(feedVc, this.vc)
    }

    @test()
    protected async feedWithoutControllerThrows() {
        this.assertDoesNotRenderFeed([
            {
                feed: {
                    items: [],
                },
            },
        ])
    }

    @test()
    protected async canGetItems() {
        const item = this.addItem()
        assert.isEqualDeep(this.vc.getItems(), [item])

        const item2 = this.addItem()
        assert.isEqualDeep(this.vc.getItems(), [item, item2])
    }

    @test()
    protected async cantAddTheSameItemTwice() {
        const item = this.generateItemValues()
        this.vc.addItem(item)
        this.vc.addItem(item)
        this.assertItemsEqual([item])
    }

    private assertDoesNotRenderFeed(sections: CardSection[]) {
        assert.doesThrow(
            () => feedAssert.cardRendersFeed(this.CardVc(sections)),
            `does not render a feed`
        )
    }

    private assertCardRendersFeed(sections: CardSection[]) {
        const vc = this.CardVc(sections)
        return feedAssert.cardRendersFeed(vc)
    }

    private CardVc(sections: CardSection[]) {
        return this.Controller('card', {
            body: {
                sections,
            },
        })
    }

    private setItems(items: FeedItem[]) {
        this.vc.setItems(items)
    }

    private assertThrowsWhenRemovingBadItemId() {
        const err = assert.doesThrow(() => this.removeItem(generateId()))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['itemId'],
        })
    }

    private removeItem(id: string): any {
        return this.vc.removeItem(id)
    }

    private assertItemsEqual(expected: FeedItem[]) {
        const { items } = this.render(this.vc)
        assert.isEqualDeep(items, expected)
    }

    private addItem() {
        const item = this.generateItemValues()
        this.vc.addItem(item)
        return item
    }

    private generateItemValues(): FeedItem {
        return {
            id: generateId(),
            message: generateId(),
            dateCreated: new Date().getTime(),
            source: {
                casualName: generateId(),
                isMe: false,
                isSprucebot: false,
            },
            target: {
                casualName: generateId(),
                isMe: false,
                isSprucebot: false,
            },
        }
    }
}
