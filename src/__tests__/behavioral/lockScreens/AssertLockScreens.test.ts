import { test, assert, errorAssert } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import LockScreenSkillViewController, {
    LockScreenSkillViewControllerOptions,
} from '../../../skillViewControllers/LockScreen.svc'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import lockScreenAssert from '../../../tests/utilities/lockScreenAssert'
import vcAssert from '../../../tests/utilities/vcAssert'
import { SkillView, ViewControllerId } from '../../../types/heartwood.types'

export default class AssertLockScreensTest extends AbstractViewControllerTest {
    private static rootSvc: LockingSkillView

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.views = this.Factory({})
        this.views.setController('odin.root', LockingSkillView)
        this.views.setController('odin.lock', LockScreen)

        this.rootSvc = this.views.Controller(
            'odin.root' as ViewControllerId,
            {}
        ) as LockingSkillView
    }

    @test()
    protected static async throwsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            lockScreenAssert.actionRendersLockScreen()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['svcOrApp', 'action'],
        })
    }

    @test()
    protected static async throwsIfActionDoesNotRenderLockScreen() {
        await assert.doesThrowAsync(
            () =>
                lockScreenAssert.actionRendersLockScreen(
                    this.rootSvc,
                    () => {}
                ),
            'renderLockScreen'
        )
    }

    @test()
    protected static async doesNotThrowIfActionRendersLockScreen() {
        const action = () => {
            this.renderLockScreen()
        }
        await this.assertRendersLockScreen(action)
    }

    @test()
    protected static async canAssertRenderScreenRendersAsInstanceOf() {
        const svc = this.Controller(
            'odin.lock' as ViewControllerId,
            {}
        ) as LockScreen

        const lockVc = await this.assertRendersLockScreen(() => {
            this.renderLockScreen(svc.render())
        })

        vcAssert.assertRendersAsInstanceOf(lockVc, LockScreen)
    }

    @test()
    protected static async canStillAccessLockSvcFromRenderLockScreen() {
        let returnedLockScreen: LockScreenSkillViewController | undefined
        const lockVc = await this.assertRendersLockScreen(() => {
            returnedLockScreen = this.renderLockScreen()
        })

        assert.isEqual(
            returnedLockScreen,
            lockVc,
            'LockScreen instance not returned from renderLockScreen'
        )
    }

    private static renderLockScreen(
        options?: LockScreenSkillViewControllerOptions
    ) {
        return this.rootSvc.callRenderLockScreen({ ...options })
    }

    private static async assertRendersLockScreen(action: () => void) {
        return await lockScreenAssert.actionRendersLockScreen(
            this.rootSvc,
            action
        )
    }
}

class LockingSkillView extends AbstractSkillViewController {
    public callRenderLockScreen(options: LockScreenSkillViewControllerOptions) {
        return this.renderLockScreen(options)
    }

    public render(): SkillView {
        return {
            controller: this,
        }
    }
}

class LockScreen extends AbstractSkillViewController {
    public render(): SkillView {
        return {
            controller: this,
        }
    }
}
