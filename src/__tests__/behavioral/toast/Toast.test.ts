import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import toastAssert from '../../../tests/utilities/toastAssert'
import { ToastMessage } from '../../../types/heartwood.types'
import CardViewController from '../../../viewControllers/card/Card.vc'

@suite()
export default class ToastTest extends AbstractViewControllerTest {
    private vc!: CardViewController

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.vc = this.Controller('card', {})
    }

    @test()
    protected async canCreateToast() {
        let wasHit = false
        let passedOptions: ToastMessage | undefined
        this.views = this.Factory({
            toastHandler: (options) => {
                passedOptions = options
                wasHit = true
            },
        })

        const vc = this.views.Controller('card', {})

        const expected = {
            message: generateId(),
        }

        //@ts-ignore
        vc.toast(expected)

        assert.isEqual(wasHit, true)
        assert.isEqualDeep(passedOptions, expected)
    }

    @test()
    protected async throwsWhenNotToasted() {
        await assert.doesThrowAsync(
            () => toastAssert.rendersToast(this.vc, () => {}),
            'this.toast'
        )

        await toastAssert.doesNotRenderToast(this.vc, () => {})
    }

    @test()
    protected async knowsIfToastIsRendered() {
        this.vc = this.Controller('card', {})

        await toastAssert.rendersToast(this.vc, () => this.renderToast())

        await assert.doesThrowAsync(
            () =>
                toastAssert.doesNotRenderToast(this.vc, () =>
                    this.renderToast()
                ),
            'should not'
        )
    }

    private renderToast(): void | Promise<void> {
        //@ts-ignore
        return this.vc.toast({ message: 'hi' })
    }
}
