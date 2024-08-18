import { test, assert } from '@sprucelabs/test-utils'
import buildActiveRecordCard, {
    ActiveRecordPagingOptions,
} from '../../../builders/buildActiveRecordCard'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import listAssert from '../../../tests/utilities/listAssert'
import pagerAssert from '../../../tests/utilities/pagerAssert'
import vcAssert from '../../../tests/utilities/vcAssert'
import ActiveRecordCardViewController from '../../../viewControllers/activeRecord/ActiveRecordCard.vc'

export default class ActiveRecordCardsWithClientSidePagingTest extends AbstractViewControllerTest {
    private static vc: MockActiveRecordCard
    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.getFactory().setController(
            'active-record-card',
            MockActiveRecordCard
        )
        this.setupCardWithPaging()
    }

    @test()
    protected static async rendersPagerIfPagingEnabled() {
        pagerAssert.cardRendersPager(this.vc, 'active-pager')
    }

    @test()
    protected static async doesNotRenderPagerIfPagingDisabled() {
        this.setupCardVc()
        pagerAssert.cardDoesNotRenderPager(this.vc)
    }

    @test()
    protected static async rendersSwipeControllerIfPagingEnabled() {
        vcAssert.assertIsSwipeCard(this.vc)
    }

    @test()
    protected static async doesNotCreateListIfPaging() {
        assert.isUndefined(this.vc.getListVc())
    }

    @test()
    protected static async getCardReturnsSwipeCard() {
        const { controller } = this.render(this.vc)
        assert.isEqual(controller, this.vc.getCardVc())
    }

    @test()
    protected static async swipeCardRendersList() {
        listAssert.cardRendersList(this.vc)
    }

    @test()
    protected static async loadsResultsIntoFirstList() {
        await this.eventFaker.fakeListLocations()
    }

    private static setupCardWithPaging() {
        this.setupCardVc({
            shouldPageClientSide: true,
            pageSize: 10,
        })
    }

    private static setupCardVc(pagingOptions?: ActiveRecordPagingOptions) {
        this.vc = this.Controller(
            'active-record-card',
            buildActiveRecordCard({
                eventName: 'list-locations::v2020_12_25',
                responseKey: 'locations',
                paging: pagingOptions,
                rowTransformer: (location) => ({
                    id: location.id,
                    cells: [],
                }),
            })
        )
    }
}

class MockActiveRecordCard extends ActiveRecordCardViewController {}
