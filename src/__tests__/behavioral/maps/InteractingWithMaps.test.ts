import { test, assert } from '@sprucelabs/test-utils'
import { generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import mapInteractor from '../../../tests/utilities/mapInteractor'
import { MapPin, MapViewController } from '../../../types/heartwood.types'
import generatePinValues from './generatePinValues'

export default class InteractingWithMapsTest extends AbstractViewControllerTest {
	private static mapVc: MapViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.mapVc = this.Controller('map', {})
	}

	@test()
	protected static async canCreateInteractingWithMaps() {
		assert.isFunction(mapInteractor.clickButtonOnPin)
	}

	@test()
	protected static async knowsWhenCantFindPin() {
		await this.assertCantFindPin(0, 0)
	}

	@test()
	protected static async knowsWhenCantFindButton() {
		this.addPin()
		await this.assertCantFindButton(0, 0)
		await this.assertCantFindPin(1, 0)
	}

	@test()
	protected static async canClickButton() {
		let wasHit = false

		this.addPin({
			buttons: [
				{
					onClick: () => {
						wasHit = true
					},
				},
			],
		})

		await this.clickButtonInPin(0, 0)
		assert.isTrue(wasHit)
		await this.assertCantFindButton(0, 1)
	}

	@test()
	protected static async canMatchButtonById() {
		const buttonId = generateId()
		this.addPin({
			buttons: [
				{
					id: buttonId,
					onClick: () => {},
				},
			],
		})

		await this.clickButtonInPin(0, buttonId)
	}

	private static async assertCantFindButton(pin: number, button: number) {
		await this.assertFailsToClick(pin, button, 'not find button')
	}

	private static async assertCantFindPin(pin: number, button: number | string) {
		await this.assertFailsToClick(pin, button, 'not find that pin')
	}

	private static addPin(pin?: Partial<MapPin>) {
		this.mapVc.addPin({ ...generatePinValues(), ...pin })
	}

	private static async assertFailsToClick(
		pin: number,
		button: number | string,
		message: string
	) {
		await assert.doesThrowAsync(
			() => this.clickButtonInPin(pin, button),
			message
		)
	}

	private static async clickButtonInPin(pin: number, button: number | string) {
		await mapInteractor.clickButtonOnPin(this.mapVc, pin, button)
	}
}
