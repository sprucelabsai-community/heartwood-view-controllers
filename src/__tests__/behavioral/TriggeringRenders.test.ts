import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { CardViewController } from '../../types/heartwood.types'

@suite()
export default class TriggeringRendersTest extends AbstractViewControllerTest {
    private vc!: CardViewController
    private hitCount!: number

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.vc = this.Controller('card', {})
        this.hitCount = 0
        this.setTriggerRenderHandler()
    }

    @test()
    protected async canSetTriggerRenderHandler() {
        this.assertHitCountEquals(0)
        this.triggerRender()
        this.assertHitCountEquals(1)
    }

    @test()
    protected async renderOnceLimitsToOneRender() {
        await this.vc.renderOnce(async () => {
            this.triggerRender()
            this.triggerRender()
            this.triggerRender()
        })

        this.assertHitCountEquals(1)
    }

    @test()
    protected async renderOnceSyncLimitsToOneRender() {
        this.vc.renderOnceSync(async () => {
            this.triggerRender()
            this.triggerRender()
            this.triggerRender()
        })

        this.assertHitCountEquals(1)
    }

    @test()
    protected async settingTriggerRenderHandlerWhileRenderingOnceStillRendersOnce() {
        await this.vc.renderOnce(async () => {
            this.setTriggerRenderHandler()
            this.triggerRender()
            this.triggerRender()
        })
        this.assertHitCountEquals(1)
        this.triggerRender()
        this.assertHitCountEquals(2)
    }

    @test()
    protected async settingTriggerRenderHandlerWhileRenderingOnceSyncStillRendersOnce() {
        this.vc.renderOnceSync(async () => {
            this.setTriggerRenderHandler()
            this.triggerRender()
            this.triggerRender()
        })
        this.assertHitCountEquals(1)
        this.triggerRender()
        this.assertHitCountEquals(2)
    }

    @test()
    protected async nestedRenderOnceStillLimitsToOneRender() {
        await this.vc.renderOnce(async () => {
            this.triggerRender()
            await this.vc.renderOnce(async () => {
                this.triggerRender()
                this.triggerRender()
            })
            this.triggerRender()
        })

        this.assertHitCountEquals(1)
    }

    @test()
    protected async nestedRenderOnceSyncStillLimitsToOneRender() {
        this.vc.renderOnceSync(async () => {
            this.triggerRender()
            this.vc.renderOnceSync(async () => {
                this.triggerRender()
                this.triggerRender()
            })
            this.triggerRender()
        })

        this.assertHitCountEquals(1)
    }

    private setTriggerRenderHandler() {
        this.vc.setTriggerRenderHandler(() => {
            this.hitCount++
        })
    }

    private assertHitCountEquals(expected: number) {
        assert.isEqual(this.hitCount, expected)
    }

    private triggerRender() {
        this.vc.triggerRender()
    }
}
