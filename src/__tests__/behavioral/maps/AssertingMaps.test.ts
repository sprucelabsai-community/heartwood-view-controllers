import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import {
	CardSection,
	CardViewController,
	MapViewController,
} from '../../../types/heartwood.types'
import mapAssert from '../../../utilities/mapAssert'
import { CardViewControllerOptions } from '../../../viewControllers/card/Card.vc'

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
