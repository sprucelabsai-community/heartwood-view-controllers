import { test, suite, assert } from '@sprucelabs/test-utils'
import { generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import mapInteractor from '../../../tests/utilities/mapInteractor'
import { MapPin, MapViewController } from '../../../types/heartwood.types'
import generatePinValues from './generatePinValues'

@suite()
export default class InteractingWithMapsTest extends AbstractViewControllerTest {
    private mapVc!: MapViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.mapVc = this.Controller('map', {})
    }

    @test()
    protected async canCreateInteractingWithMaps() {
        assert.isFunction(mapInteractor.clickButtonOnPin)
    }

    @test()
    protected async knowsWhenCantFindPin() {
        await this.assertCantFindPin(0, 0)
    }

    @test()
    protected async knowsWhenCantFindButton() {
        this.addPin()
        await this.assertCantFindButton(0, 0)
        await this.assertCantFindPin(1, 0)
    }

    @test()
    protected async canClickButton() {
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
    protected async canMatchButtonById() {
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

    private async assertCantFindButton(pin: number, button: number) {
        await this.assertFailsToClick(pin, button, 'not find button')
    }

    private async assertCantFindPin(pin: number, button: number | string) {
        await this.assertFailsToClick(pin, button, 'not find that pin')
    }

    private addPin(pin?: Partial<MapPin>) {
        this.mapVc.addPin({ ...generatePinValues(), ...pin })
    }

    private async assertFailsToClick(
        pin: number,
        button: number | string,
        message: string
    ) {
        await assert.doesThrowAsync(
            () => this.clickButtonInPin(pin, button),
            message
        )
    }

    private async clickButtonInPin(pin: number, button: number | string) {
        await mapInteractor.clickButtonOnPin(this.mapVc, pin, button)
    }
}
