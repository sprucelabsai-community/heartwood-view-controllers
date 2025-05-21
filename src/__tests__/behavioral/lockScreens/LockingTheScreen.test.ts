import { assert, generateId, test, suite } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import LockScreenSkillViewController, {
    LockScreenSkillViewControllerOptions,
} from '../../../skillViewControllers/LockScreen.svc'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    LockScreen,
    SkillView,
    SkillViewControllerId,
} from '../../../types/heartwood.types'
import AbstractAppController from '../../../viewControllers/Abstract.ac'

@suite()
export default class LockingTheScreenTest extends AbstractViewControllerTest {
    private wasHit!: boolean
    private svc!: LockingSkillView
    private passedOptions?: LockScreen
    private app?: SpyAppController

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()

        delete this.passedOptions
        delete this.app

        this.wasHit = false

        delete SpyLockScreenSkillView.model

        this.views = this.Factory({
            renderLockScreenHandler: async (options) => {
                this.passedOptions = options
                this.wasHit = true
            },
        })

        this.views.setAppController(SpyAppController)
        this.views.setController('lock.root', TestLockScreen)
        this.views.setController('lock-screen', SpyLockScreenSkillView)

        this.setLockingController()
        this.svc = this.Svc()
    }

    @test()
    protected async callingOnSvcCallsHandlerPassedToFactory() {
        this.callRenderLockScreen()

        assert.isTrue(
            this.wasHit,
            `did not call this.renderLockScreenHandler in abstract class`
        )
    }

    @test()
    protected async callingRenderLockScreenWithoutPassingHandlerDoesNotThrow() {
        this.views = this.Factory({})
        this.setLockingController()

        const vc = this.Svc()
        vc.callRenderLockScreen({})
    }

    @test()
    protected async returnsLockScreenVc() {
        this.assertLockScreenInstanceReturnedFromRenderLockScreen()
    }

    @test()
    protected async lockScreenSvcIsRenderedIntoRenderLockScreenHandler() {
        SpyLockScreenSkillView.model = {
            id: generateId(),
            layouts: [],
        }

        this.callRenderLockScreen()
        this.assertRenderLockScreenHandlerPassedExpected()
    }

    @test()
    protected async dialogSvcRendersSkillViewWithPassedOptionsInModel() {
        const vc = this.callRenderLockScreen()
        const model = this.render(vc)
        assert.isEqual(
            model.controller,
            vc,
            `LockScreen did not set controller to self`
        )
    }

    @test()
    protected async setsSkillViewControllerToInstanceOfSkillViewController() {
        const model = this.renderLockScreen()

        vcAssert.assertControllerInstanceOf(
            model.skillViewController,
            //@ts-ignore
            AbstractSkillViewController
        )
    }

    @test()
    protected async passesThroughSkillViewControllerIfPassedToRender() {
        this.assertPassesThroughSkillViewToLockScreen()
    }

    @test()
    protected async callingHideOnLockSvcCallsHideHandler() {
        const vc = this.callRenderLockScreen()

        let wasHit = false

        vc.setHideHandler(() => {
            wasHit = true
        })

        assert.isFalse(wasHit, `Called onHide handler before hide`)

        await vc.hide()

        assert.isTrue(wasHit, `Did not call onHide handler`)
    }

    @test()
    protected async canLockScreenFromAppController() {
        this.dropInApp()
        assert.isFalse(this.wasHit, `Called renderLockScreenHandler too soon`)
        this.callRenderLockScreen()
        assert.isTrue(this.wasHit, `Did not call renderLockScreenHandler`)
    }

    @test()
    protected async lockScreenSvcIsRenderedIntoRenderLockScreenHandlerInApp() {
        SpyLockScreenSkillView.model = {
            id: generateId(),
            layouts: [],
        }

        this.dropInApp()
        this.callRenderLockScreen()
        this.assertRenderLockScreenHandlerPassedExpected()
    }

    @test()
    protected async appReturnsLockScreenVc() {
        this.dropInApp()
        this.assertLockScreenInstanceReturnedFromRenderLockScreen()
    }

    @test()
    protected async passesThroughSkillViewControllerIfPassedToRenderInApp() {
        this.dropInApp()
        this.assertPassesThroughSkillViewToLockScreen()
    }

    @test()
    protected async lockScreenKnowsIfHidden() {
        const vc = this.callRenderLockScreen()
        assert.isTrue(vc.getIsVisible(), `Lock screen should start visible`)
        await vc.hide()
        assert.isFalse(vc.getIsVisible(), `Lock screen should be hidden`)
    }

    @test()
    protected async rendersModelPassedToRenderIfNotSkillViewBeingRendered() {
        const actual = {
            id: generateId(),
            layouts: [],
        }
        const model = this.renderLockScreen(actual)

        assert.doesInclude(model, actual)
    }

    private assertPassesThroughSkillViewToLockScreen() {
        const svc = this.Svc()
        const vc = this.callRenderLockScreen(svc.render())
        const model = vc.render()
        assert.isEqual(
            model.skillViewController,
            svc,
            `Did not pass the rendered skill view controller to the view model`
        )
    }

    private assertLockScreenInstanceReturnedFromRenderLockScreen() {
        const vc = this.callRenderLockScreen()
        vcAssert.assertControllerInstanceOf(vc, LockScreenSkillViewController)
    }

    private dropInApp() {
        this.app = this.views!.App('app' as any) as SpyAppController
    }

    private renderLockScreen(options?: LockScreenSkillViewControllerOptions) {
        const vc = this.callRenderLockScreen(options)
        const model = this.render(vc, {
            shouldStripControllers: false,
            shouldStripPrivateFields: false,
        })
        return model
    }

    private callRenderLockScreen(
        options?: LockScreenSkillViewControllerOptions
    ) {
        return (this.app ?? this.svc).callRenderLockScreen(options ?? {})
    }

    private Svc() {
        return this.Controller(
            'locking' as SkillViewControllerId,
            {}
        ) as LockingSkillView
    }

    private assertRenderLockScreenHandlerPassedExpected() {
        assert.isEqualDeep(this.passedOptions, SpyLockScreenSkillView.model)
    }

    private setLockingController() {
        this.views?.setController('locking', LockingSkillView)
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

class SpyLockScreenSkillView extends LockScreenSkillViewController {
    public static model?: LockScreen
    public render() {
        return SpyLockScreenSkillView.model ?? super.render()
    }
}

class TestLockScreen extends AbstractSkillViewController {
    public render() {
        return {}
    }
}

class SpyAppController extends AbstractAppController {
    public static id = 'app'

    public callRenderLockScreen(options: LockScreenSkillViewControllerOptions) {
        return this.renderLockScreen(options)
    }
}
