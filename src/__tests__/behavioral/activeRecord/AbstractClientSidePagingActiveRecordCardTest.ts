import { Location } from '@sprucelabs/spruce-core-schemas'
import { assert, generateId, RecursivePartial } from '@sprucelabs/test-utils'
import { PagerViewController, SwipeCardViewControllerImpl } from '../../..'
import buildActiveRecordCard from '../../../builders/buildActiveRecordCard'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import MockActiveRecordCard from '../../../tests/MockActiveRecordCard'
import {
    ActiveRecordPagingOptions,
    CardFooter,
} from '../../../types/heartwood.types'
import { ActiveRecordCardViewControllerOptions } from '../../../viewControllers/activeRecord/ActiveRecordCard.vc'
import { ListLocationsTargetAndPayload } from '../../support/EventFaker'

export default abstract class AbstractClientSidePagingActiveRecordCard extends AbstractViewControllerTest {
    protected static vc: MockActiveRecordCard
    protected static locations: Location[] = []
    protected static listLocationsTargetAndPayload?: ListLocationsTargetAndPayload
    protected static id: string

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()

        this.getFactory().setController(
            'active-record-card',
            MockActiveRecordCard
        )

        this.getFactory().setController('pager', SpyPager)
        this.getFactory().setController('swipe-card', SpySwipeCard)

        this.clearFakedLocations()
        this.id = generateId()

        delete this.listLocationsTargetAndPayload

        await this.eventFaker.fakeListLocations((targetAndPayload) => {
            const { target, payload } = targetAndPayload ?? {}
            this.listLocationsTargetAndPayload = { target, payload }
            return this.locations
        })

        this.setupCardWithPaging()
    }

    protected static assertRendersPager() {
        this.vc.assertRendersPager()
    }

    protected static async fakeLocationsAndLoad(total: number) {
        this.addFakedLocations(total)
        await this.load()
    }

    protected static clearFakedLocations() {
        this.locations = []
    }

    protected static async load() {
        await this.vc.load()
        this.vc.resetRebuildSlideCount()
    }

    protected static addFakedLocation() {
        this.locations.push(this.eventFaker.generateLocationValues())
    }

    protected static assertRendersRow(id: string) {
        this.vc.assertRendersRow(id)
    }

    protected static setupCardWithPaging(
        pagingOptions?: ActiveRecordPagingOptions
    ) {
        this.setupCardVc({
            paging: {
                shouldPageClientSide: true,
                pageSize: 10,
                ...pagingOptions,
            },
        })
    }

    protected static assertDoesNotRenderRow(id: string) {
        this.vc.assertDoesNotRenderRow(id)
    }

    protected static setupCardVc(
        options?: RecursivePartial<ActiveRecordCardViewControllerOptions>
    ) {
        this.vc = this.Controller(
            'active-record-card',
            buildActiveRecordCard({
                id: this.id,
                eventName: 'list-locations::v2020_12_25',
                responseKey: 'locations',
                //@ts-ignore
                rowTransformer: (location) => ({
                    //@ts-ignore
                    id: location.id,
                    cells: [],
                }),
                ...options,
            })
        ) as MockActiveRecordCard
    }

    protected static addFakedLocations(length: number) {
        Array.from({ length }).forEach(() => this.addFakedLocation())
    }

    protected static assertRenderedFooterIncludes(footer: CardFooter) {
        const actual = this.render(this.vc).footer
        assert.doesInclude(actual, footer)
    }
}

//@ts-ignore
export class SpySwipeCard extends SwipeCardViewControllerImpl {
    public jumpToSlideCount = 0

    public async jumpToSlide(slide: number | string): Promise<void> {
        this.jumpToSlideCount++
        await super.jumpToSlide(slide)
    }
}

export class SpyPager extends PagerViewController {
    public setCurrentPageCount = 0
    public setCurrentPage(page: number): void {
        this.setCurrentPageCount++
        super.setCurrentPage(page)
    }
}
