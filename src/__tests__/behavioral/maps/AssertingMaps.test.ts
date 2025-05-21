import { test, suite, assert } from '@sprucelabs/test-utils'
import { generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import mapAssert from '../../../tests/utilities/mapAssert'
import {
    CardSection,
    CardViewController,
    MapPin,
    MapViewController,
} from '../../../types/heartwood.types'
import { CardViewControllerOptions } from '../../../viewControllers/card/Card.vc'
import generatePinValues from './generatePinValues'

@suite()
export default class AssertingMapsTest extends AbstractViewControllerTest {
    private vc!: CardViewController
    private mapVc!: MapViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.CardVc()
        this.mapVc = this.Controller('map', {})
    }

    @test()
    protected async canCreateAssertingMaps() {
        assert.isFunction(mapAssert.assertCardRendersMap)
    }

    @test()
    protected async knowsIfDoesNotRenderMap() {
        this.assertDoesNotRenderMap()
        this.addSection({})
        this.assertDoesNotRenderMap()
        this.addMapSection()
        this.assertRendersMap()
    }

    @test()
    protected async knowsIfRendersMapInFirstSection() {
        this.addMapSection()
        this.assertRendersMap()
    }

    @test()
    protected async returnsMapController() {
        this.addMapSection()
        assert.isEqual(this.assertRendersMap(), this.mapVc)
    }

    @test()
    protected async knowsIfMapHasNoPins() {
        this.assertDoesNotHavePin({})
    }

    @test()
    protected async canFindPinMatchingAnything() {
        const pin = generatePinValues()
        this.mapVc.addPin(pin)

        this.assertHasPin({ title: pin.title })
        this.assertDoesNotHavePin({ title: generateId() })
        this.assertHasPin({ address: pin.address })
    }

    private assertDoesNotHavePin(pin: Partial<MapPin>) {
        assert.doesThrow(
            () => this.assertHasPin(pin),
            'could not find that pin'
        )
    }

    private assertHasPin(pin: Partial<MapPin>) {
        return mapAssert.assertMapHasPin(this.mapVc, pin)
    }

    private assertRendersMap() {
        return mapAssert.assertCardRendersMap(this.vc)
    }

    private addMapSection() {
        const section = { map: this.render(this.mapVc) }
        this.addSection(section)
    }

    private addSection(section: CardSection) {
        this.vc.addSection(section)
    }

    private assertDoesNotRenderMap() {
        assert.doesThrow(
            () => mapAssert.assertCardRendersMap(this.vc),
            'it does not'
        )
    }

    private CardVc(options?: CardViewControllerOptions) {
        return this.Controller('card', { ...options })
    }
}
