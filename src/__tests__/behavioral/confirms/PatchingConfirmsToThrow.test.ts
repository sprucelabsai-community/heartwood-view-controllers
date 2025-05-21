import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { AbstractViewController, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import confirmTestPatcher from '../../../tests/utilities/confirmTestPatcher'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
class ConfirmVc extends AbstractViewController<Card> {
    public async goConfirm() {
        await this.confirm({ title: 'Crap!!' })
    }

    public render(): Card {
        return {}
    }
}

@suite()
export default class PatchingConfirmsToThrowTest extends AbstractViewControllerTest {
    protected controllerMap = {
        confirmTest: ConfirmVc,
    }
    private vc!: ConfirmVc

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Controller('confirmTest', {}) as any
        confirmTestPatcher.patchConfirmToThrow(this.vc)
    }

    @test()
    protected async patchingCausesConfirmsToThrow() {
        await assert.doesThrowAsync(() => this.vc.goConfirm())
    }

    @test()
    protected async canStillAssertAConfirm() {
        await vcAssert.assertRendersConfirm(this.vc, () => this.vc.goConfirm())
    }

    @test()
    protected async confirmHandlerCalledStill() {
        let wasHit = false
        //@ts-ignore
        this.vc.confirmHandler = () => {
            wasHit = true
        }
        await vcAssert.assertRendersConfirm(this.vc, () => this.vc.goConfirm())

        assert.isTrue(wasHit)
    }
}
