import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import {
    AbstractSkillViewController,
    vcAssert,
    Router,
    SkillViewControllerId,
} from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import SpyRouter from '../../../tests/SpyRouter'

class DemoSkillViewController extends AbstractSkillViewController {
    private router!: Router
    public constructor(options: any) {
        super(options)
        this.router = options.router
    }

    public async noAlert() {
        return true
    }

    public async alertButNoRedirect() {
        await this.alert({ message: 'how dare you!' })
    }

    public async alertAndRedirect() {
        await this.alert({ message: 'oh no!' })
        //@ts-ignore
        await this.router.redirect('taco', {
            bravo: true,
        })
    }

    public async alertAndBadRedirect() {
        await this.alert({ message: 'oh no!' })
        //@ts-ignore
        await this.router.redirect('taco.bravo', {
            bravo: false,
        })
    }

    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView {
        return {
            layouts: [],
        }
    }
}

@suite()
export default class AssertAlertAndRedirectTest extends AbstractViewControllerTest {
    protected controllerMap = {
        demo: DemoSkillViewController,
    }

    private router!: Router
    private vc!: DemoSkillViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.router = new SpyRouter()
        this.vc = this.Vc()
    }

    @test()
    protected async throwsWhenNotAlerting() {
        await assert.doesThrowAsync(() => this.assert(() => this.vc.noAlert()))
    }

    @test()
    protected async passesWhenAlertAndRedirect() {
        await this.assert(() => this.vc.alertAndRedirect())
    }

    @test()
    protected async throwsWhenAlertingButNotRedirecting() {
        await assert.doesThrowAsync(() =>
            this.assert(() => this.vc.alertButNoRedirect())
        )
    }

    @test()
    protected async throwsWhenRedirectingToWrongDestination() {
        await assert.doesThrowAsync(() =>
            this.assert(() => this.vc.alertAndBadRedirect())
        )
    }

    private Vc() {
        //@ts-ignore
        const vc = this.Controller('demo', {
            router: this.router,
        })
        return vc as DemoSkillViewController
    }

    private assert(action: () => Promise<any>): any {
        return vcAssert.assertRendersAlertThenRedirects({
            action,
            vc: this.vc,
            router: this.router,
            destination: {
                id: 'taco' as SkillViewControllerId,
                args: {
                    bravo: true,
                },
            },
        })
    }
}
