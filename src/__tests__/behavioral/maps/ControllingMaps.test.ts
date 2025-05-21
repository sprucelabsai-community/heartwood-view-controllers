import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { MapPin, MapZoom } from '../../../types/heartwood.types'
import MapViewController, {
    MapViewControllerOptions,
} from '../../../viewControllers/Map.vc'
import generatePinValues from './generatePinValues'

@suite()
export default class ControllingMapsTest extends AbstractViewControllerTest {
    private vc!: MapViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Vc()
    }

    @test()
    protected passesThroughModel() {
        const model = {
            center: this.generateRandomLatLng(),
            pins: [this.generatePinValues()],
        }
        this.vc = this.Vc(model)
        assert.isEqualDeep(this.render(this.vc), {
            controller: this.vc,
            ...model,
        })
    }

    @test()
    protected async canGetPins() {
        const expected = [this.generatePinValues()]
        this.vc = this.Vc({
            pins: expected,
        })
        this.assertPinsEqual(expected)
    }

    @test()
    protected async canSetPins() {
        const expected = [this.generatePinValues()]
        this.setPins(expected)
        this.assertPinsEqual(expected)
        assert.isNotEqual(this.getPins(), expected)
    }

    @test()
    protected async settingPinsTriggersRender() {
        this.setPins([])
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async canAddOnePinAtTime() {
        const pin = this.addPin()
        this.assertPinsEqual([pin])
        const pin2 = this.addPin()
        this.assertPinsEqual([pin, pin2])
    }

    @test()
    protected async addingPinTriggersRender() {
        this.addPin()
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async canGetSetZoom() {
        this.assertSetsZoom('block')
        this.assertSetsZoom('house')
        vcAssert.assertTriggerRenderCount(this.vc, 2)
        this.setZoom('block')

        vcAssert.assertTriggerRenderCount(this.vc, 3)
    }

    private assertSetsZoom(zoom: MapZoom) {
        this.setZoom(zoom)
        assert.isEqual(this.render(this.vc).zoom, zoom)
        assert.isEqual(this.vc.getZoom(), zoom)
    }

    private setZoom(zoom: MapZoom) {
        this.vc.setZoom(zoom)
    }

    private addPin() {
        const pin = this.generatePinValues()
        this.vc.addPin(pin)
        return pin
    }

    private setPins(expected: MapPin[]) {
        this.vc.setPins(expected)
    }

    private assertPinsEqual(expected: MapPin[]) {
        assert.isEqualDeep(this.getPins(), expected)
    }

    private getPins() {
        return this.vc.getPins()
    }

    private generateRandomLatLng() {
        return {
            lat: Math.random(),
            lng: Math.random(),
        }
    }

    private generatePinValues(): MapPin {
        return generatePinValues()
    }

    private Vc(options?: Partial<MapViewControllerOptions>): MapViewController {
        return this.Controller('map', { ...options })
    }
}
