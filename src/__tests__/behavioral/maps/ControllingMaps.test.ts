import { test, assert } from '@sprucelabs/test'
import { generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { MapPin } from '../../../types/heartwood.types'
import MapViewController, {
	MapViewControllerOptions,
} from '../../../viewControllers/Map.vc'

export default class ControllingMapsTest extends AbstractViewControllerTest {
	private static vc: MapViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Vc()
	}

	@test()
	protected static passesThroughModel() {
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
	protected static async canGetPins() {
		const expected = [this.generatePinValues()]
		this.vc = this.Vc({
			pins: expected,
		})
		this.assertPinsEqual(expected)
	}

	@test()
	protected static async canSetPins() {
		const expected = [this.generatePinValues()]
		this.setPins(expected)
		this.assertPinsEqual(expected)
		assert.isNotEqual(this.getPins(), expected)
	}

	@test()
	protected static async settingPinsTriggersRender() {
		this.setPins([])
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	private static setPins(expected: MapPin[]) {
		this.vc.setPins(expected)
	}

	private static assertPinsEqual(expected: MapPin[]) {
		assert.isEqualDeep(this.getPins(), expected)
	}

	private static getPins() {
		return this.vc.getPins()
	}

	private static generateRandomLatLng() {
		return {
			lat: Math.random(),
			lng: Math.random(),
		}
	}

	private static generatePinValues() {
		return {
			address: {
				city: generateId(),
				country: generateId(),
				street1: generateId(),
				province: generateId(),
				zip: generateId(),
			},
		}
	}

	private static Vc(
		options?: Partial<MapViewControllerOptions>
	): MapViewController {
		return this.Controller('map', { ...options })
	}
}
