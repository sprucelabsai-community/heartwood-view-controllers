import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { CardViewController } from '../../types/heartwood.types'

export default class TriggeringRendersTest extends AbstractViewControllerTest {
    private static vc: CardViewController
    private static hitCount: number

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.vc = this.Controller('card', {})
        this.hitCount = 0
        this.setTriggerRenderHandler()
    }

    @test()
    protected static async canSetTriggerRenderHandler() {
        this.assertHitCountEquals(0)
        this.triggerRender()
        this.assertHitCountEquals(1)
    }

    @test()
    protected static async renderOnceLimitsToOneRender() {
        await this.vc.renderOnce(async () => {
            this.triggerRender()
            this.triggerRender()
            this.triggerRender()
        })

        this.assertHitCountEquals(1)
    }

    @test()
    protected static async renderOnceSyncLimitsToOneRender() {
        this.vc.renderOnceSync(async () => {
            this.triggerRender()
            this.triggerRender()
            this.triggerRender()
        })

        this.assertHitCountEquals(1)
    }

    @test()
    protected static async settingTriggerRenderHandlerWhileRenderingOnceStillRendersOnce() {
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
    protected static async settingTriggerRenderHandlerWhileRenderingOnceSyncStillRendersOnce() {
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
    protected static async nestedRenderOnceStillLimitsToOneRender() {
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
    protected static async nestedRenderOnceSyncStillLimitsToOneRender() {
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

    private static setTriggerRenderHandler() {
        this.vc.setTriggerRenderHandler(() => {
            this.hitCount++
        })
    }

    private static assertHitCountEquals(expected: number) {
        assert.isEqual(this.hitCount, expected)
    }

    private static triggerRender() {
        this.vc.triggerRender()
    }
}
