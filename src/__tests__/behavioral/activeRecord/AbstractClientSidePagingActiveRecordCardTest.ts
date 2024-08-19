import { Location } from '@sprucelabs/spruce-core-schemas'
import { RecursivePartial } from '@sprucelabs/test-utils'
import buildActiveRecordCard, {
    ActiveRecordPagingOptions,
} from '../../../builders/buildActiveRecordCard'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import MockActiveRecordCard from '../../../tests/MockActiveRecordCard'
import { ActiveRecordCardViewControllerOptions } from '../../../viewControllers/activeRecord/ActiveRecordCard.vc'
import { ListLocationsTargetAndPayload } from '../../support/EventFaker'

export default abstract class AbstractClientSidePagingActiveRecordCard extends AbstractViewControllerTest {
    protected static vc: MockActiveRecordCard
    protected static locations: Location[] = []
    protected static listLocationsTargetAndPayload?: ListLocationsTargetAndPayload
    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()

        this.getFactory().setController(
            'active-record-card',
            MockActiveRecordCard
        )

        this.clearFakedLocations()
        delete this.listLocationsTargetAndPayload

        await this.eventFaker.fakeListLocations((targetAndPayload) => {
            const { target, payload } = targetAndPayload ?? {}
            this.listLocationsTargetAndPayload = { target, payload }
            return this.locations
        })

        this.setupCardWithPaging()
    }

    protected static clearFakedLocations() {
        this.locations = []
    }

    protected static async load() {
        await this.vc.load()
    }

    protected static addFakedLocation() {
        this.locations.push(this.eventFaker.generateLocationValues())
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

    protected static setupCardVc(
        options?: RecursivePartial<ActiveRecordCardViewControllerOptions>
    ) {
        this.vc = this.Controller(
            'active-record-card',
            buildActiveRecordCard({
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
}
