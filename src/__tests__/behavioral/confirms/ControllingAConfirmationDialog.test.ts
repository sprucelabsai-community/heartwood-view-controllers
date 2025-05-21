import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import ConfirmViewController, {
    ConfirmViewControllerOptions,
} from '../../../viewControllers/Confirm.vc'

@suite()
export default class ControllingAConfirmationDialogTest extends AbstractViewControllerTest {
    protected controllerMap = {}
    private vc!: ConfirmViewController

    protected async beforeEach() {
        await super.beforeEach()

        this.vc = this.Confirm()
    }

    @test()
    protected canCreateConfirmationDialog() {
        assert.isTruthy(this.vc)
    }

    @test()
    protected notPassingMessageDoesNotRenderBody() {
        const vc = this.Confirm()

        const model = this.render(vc)

        assert.isUndefined(model.body)
    }

    @test()
    protected settingMessageSetsBody() {
        const vc = this.Confirm({ message: 'Hey!' })
        const model = this.render(vc)

        assert.isEqual(model.body?.sections?.[0]?.title, 'Hey!')
    }

    @test()
    protected canSetAsDescructive() {
        const vc = this.Confirm({ message: 'Hey!', isDestructive: true })
        const model = this.render(vc)

        assert.isEqual(model.footer?.buttons?.[1].type, 'destructive')
    }

    @test()
    protected actionButtonIsPrimaryByDefault() {
        const vc = this.Confirm({ message: 'Hey!' })
        const model = this.render(vc)

        assert.isEqual(model.footer?.buttons?.[1].type, 'primary')
    }

    private Confirm(options?: Partial<ConfirmViewControllerOptions>) {
        return this.Controller('confirm', {
            onAccept: () => {},
            onDecline: () => {},
            ...options,
        })
    }
}
