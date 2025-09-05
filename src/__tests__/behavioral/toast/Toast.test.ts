import {
    test,
    suite,
    assert,
    generateId,
    errorAssert,
} from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import MockToastMessageHandler, {
    ERROR_MESSAGE_NO_TOAST_HANDLER_INSTANCE_SET,
} from '../../../tests/utilities/MockToastMessageHandler'
import toastAssert from '../../../tests/utilities/toastAssert'
import {
    Card,
    RouterDestination,
    SkillViewControllerId,
    ToastMessage,
    ToastMessageStyle,
} from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'

@suite()
export default class ToastTest extends AbstractViewControllerTest {
    private vc!: ToastableCard
    protected controllerMap = {
        'toastable-card': ToastableCard,
    }

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.vc = this.Controller(
            'toastable-card' as SkillViewControllerId,
            {}
        ) as ToastableCard
    }

    @test()
    protected async canCreateToast() {
        let wasHit = false
        let toastMessage: ToastMessage | undefined
        this.views = this.Factory({
            toastHandler: (options) => {
                toastMessage = options
                wasHit = true
            },
        })

        const vc = this.views.Controller('card', {})

        const expected: ToastMessage = {
            content: generateId(),
        }

        //@ts-ignore
        vc.toast(expected)

        assert.isEqual(wasHit, true)
        assert.isEqualDeep(toastMessage, expected)
    }

    @test()
    protected async toastAssertThrowsWhenMockToastHandlerNotUsed() {
        MockToastMessageHandler.clearInstance()

        await assert.doesThrowAsync(
            () => toastAssert.rendersToast(() => {}),
            ERROR_MESSAGE_NO_TOAST_HANDLER_INSTANCE_SET
        )
    }

    @test()
    protected async throwsWhenNotToasted() {
        await assert.doesThrowAsync(
            () => toastAssert.rendersToast(() => {}),
            'this.toast'
        )

        await toastAssert.doesNotRenderToast(() => {})
    }

    @test()
    protected async knowsIfToastIsRendered() {
        await toastAssert.rendersToast(() => this.renderToast())

        await assert.doesThrowAsync(
            () => toastAssert.doesNotRenderToast(() => this.renderToast()),
            'should not'
        )
    }

    @test()
    protected async toastMatchesThrowsIfMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            toastAssert.toastMatches()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['action', 'message'],
        })
    }

    @test()
    protected async throwsIfContentDoesNotMatch() {
        const content = generateId()

        await assert.doesThrowAsync(() =>
            toastAssert.toastMatches(() => this.renderToast({ content }), {
                content: generateId(),
            })
        )
    }

    @test()
    protected async canMatchMessage() {
        const content = generateId()

        await toastAssert.toastMatches(() => this.renderToast({ content }), {
            content,
        })
    }

    @test()
    protected async throwsIfStyleDoesNotMatch() {
        const content = generateId()
        const style = generateId() as ToastMessageStyle

        await assert.doesThrowAsync(() =>
            toastAssert.toastMatches(
                () => this.renderToast({ content, style }),
                {
                    content,
                    style: generateId() as ToastMessageStyle,
                }
            )
        )
    }

    @test()
    protected async canMatchStyle() {
        const style = generateId() as ToastMessageStyle

        await toastAssert.toastMatches(() => this.renderToast({ style }), {
            style,
        })
    }

    @test()
    protected async missmatchOnDestinationThrows() {
        const destination: RouterDestination = {
            id: generateId() as SkillViewControllerId,
        }

        await assert.doesThrowAsync(() =>
            toastAssert.toastMatches(() => this.renderToast({ destination }), {
                destination: {
                    id: generateId() as SkillViewControllerId,
                },
            })
        )
    }

    @test()
    protected async canMatchDestination() {
        const destination: RouterDestination = {
            id: generateId() as SkillViewControllerId,
        }

        await toastAssert.toastMatches(
            () => this.renderToast({ destination }),
            {
                destination,
            }
        )
    }

    @test()
    protected async throwsIfArgsDontMatch() {
        const destination: RouterDestination = {
            id: generateId() as SkillViewControllerId,
            args: {
                [generateId()]: generateId(),
            },
        }

        await assert.doesThrowAsync(() =>
            toastAssert.toastMatches(() => this.renderToast({ destination }), {
                destination: {
                    id: destination.id,
                    args: {
                        [generateId()]: generateId(),
                    },
                },
            })
        )
    }

    @test()
    protected async assertRendersToastReturnsToastMessage() {
        const expected = this.renderToast()
        const actual = await toastAssert.rendersToast(() =>
            this.renderToast(expected)
        )
        assert.isEqualDeep(
            actual,
            expected,
            'toastAssert.rendersToast should return last message.'
        )
    }

    @test()
    protected async assertMessageIncludesReturnsToastMessage() {
        const expected = this.renderToast({
            content: generateId(),
            style: generateId() as ToastMessageStyle,
        })
        const actual = await toastAssert.toastMatches(
            () => this.renderToast(expected),
            expected
        )
        assert.isEqualDeep(
            actual,
            expected,
            'toastAssert.messageIncludes should return last message.'
        )
    }

    @test()
    protected async canClickOnMessageReturnedFromAssert() {
        let wasHit = false

        const expected = this.renderToast({
            content: generateId(),
            style: generateId() as ToastMessageStyle,
            onClick: () => {
                wasHit = true
            },
        })
        const actual = await toastAssert.toastMatches(
            () => this.renderToast(expected),
            expected
        )

        assert.isFalsy(wasHit, 'onClick should not have been hit yet.')
        await interactor.click(actual)
        assert.isTrue(wasHit, 'Expected onClick to be hit on toast message.')
    }

    private renderToast(message?: Partial<ToastMessage>) {
        const m = { content: generateId(), ...message }
        this.vc.toast(m)
        return m
    }
}

class ToastableCard extends AbstractViewController<Card> {
    public toast(message: ToastMessage) {
        return super.toast(message)
    }

    public render() {
        return {}
    }
}
