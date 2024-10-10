import { test, assert } from '@sprucelabs/test-utils'
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

export default class AssertingMapsTest extends AbstractViewControllerTest {
    private static vc: CardViewController
    private static mapVc: MapViewController

    protected static async beforeEach() {
        await super.beforeEach()
        this.vc = this.CardVc()
        this.mapVc = this.Controller('map', {})
    }

    @test()
    protected static async canCreateAssertingMaps() {
        assert.isFunction(mapAssert.assertCardRendersMap)
    }

    @test()
    protected static async knowsIfDoesNotRenderMap() {
        this.assertDoesNotRenderMap()
        this.addSection({})
        this.assertDoesNotRenderMap()
        this.addMapSection()
        this.assertRendersMap()
    }

    @test()
    protected static async knowsIfRendersMapInFirstSection() {
        this.addMapSection()
        this.assertRendersMap()
    }

    @test()
    protected static async returnsMapController() {
        this.addMapSection()
        assert.isEqual(this.assertRendersMap(), this.mapVc)
    }

    @test()
    protected static async knowsIfMapHasNoPins() {
        this.assertDoesNotHavePin({})
    }

    @test()
    protected static async canFindPinMatchingAnything() {
        const pin = generatePinValues()
        this.mapVc.addPin(pin)

        this.assertHasPin({ title: pin.title })
        this.assertDoesNotHavePin({ title: generateId() })
        this.assertHasPin({ address: pin.address })
    }

    private static assertDoesNotHavePin(pin: Partial<MapPin>) {
        assert.doesThrow(
            () => this.assertHasPin(pin),
            'could not find that pin'
        )
    }

    private static assertHasPin(pin: Partial<MapPin>) {
        return mapAssert.assertMapHasPin(this.mapVc, pin)
    }

    private static assertRendersMap() {
        return mapAssert.assertCardRendersMap(this.vc)
    }

    private static addMapSection() {
        const section = { map: this.render(this.mapVc) }
        this.addSection(section)
    }

    private static addSection(section: CardSection) {
        this.vc.addSection(section)
    }

    private static assertDoesNotRenderMap() {
        assert.doesThrow(
            () => mapAssert.assertCardRendersMap(this.vc),
            'it does not'
        )
    }

    private static CardVc(options?: CardViewControllerOptions) {
        return this.Controller('card', { ...options })
    }
}
