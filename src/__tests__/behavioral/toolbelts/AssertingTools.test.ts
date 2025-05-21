import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, suite, assert } from '@sprucelabs/test-utils'
import {
    AbstractViewController,
    TriggerRenderHandler,
    toolBeltAssert,
} from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    SkillViewController,
    ViewControllerOptions,
} from '../../../types/heartwood.types'
import CardViewController from '../../../viewControllers/card/Card.vc'
import FormViewController from '../../../viewControllers/form/Form.vc'
import SwipeCardViewController from '../../../viewControllers/SwipeCard.vc'
import ToolBeltViewController, {
    OpenToolBeltOptions,
} from '../../../viewControllers/ToolBelt.vc'

type ToolBelt = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBelt
type SkillView = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView
type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

declare module '../../../types/heartwood.types' {
    interface ViewControllerMap {
        toolBeltSvc: ToolBeltSkillViewController
        fancy: FancyCard
        tool: FancyTool
    }
    interface ViewControllerOptionsMap {
        toolBeltSvc: { toolBelt?: ToolBelt | null }
    }
}

class FancyTool extends AbstractViewController<Card> {
    public render() {
        return this.Controller('fancy', {}).render()
    }
}

class GoodSkillViewController implements SkillViewController {
    private model!: SkillView
    private isLoginRequired = false

    public constructor(model: SkillView) {
        this.model = model
        //@ts-ignore
        this.isLoginRequired = model.isLoginRequired
    }

    public async getIsLoginRequired() {
        return this.isLoginRequired
    }

    public async load() {}
    public triggerRender() {}
    public setTriggerRenderHandler(handler: TriggerRenderHandler) {
        this.triggerRender = handler
    }

    public renderToolBelt() {
        return null
    }

    public render() {
        return this.model
    }
}

class ToolBeltSkillViewController implements SkillViewController {
    private toolBelt?: ToolBeltViewController | undefined
    public constructor(
        options: { toolBelt: ToolBelt | null } & ViewControllerOptions
    ) {
        this.toolBelt = options?.toolBelt
            ? options.vcFactory.Controller('tool-belt', options.toolBelt)
            : undefined
    }

    public async load() {}
    public triggerRender() {}
    public setTriggerRenderHandler(handler: TriggerRenderHandler) {
        this.triggerRender = handler
    }

    public async focusTool(id: string) {
        this.toolBelt?.focusTool(id)
    }

    public open(options?: OpenToolBeltOptions) {
        this.toolBelt?.open(options)
    }

    public close() {
        this.toolBelt?.close()
    }

    public async delayedFocusTool(id: string) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.toolBelt?.focusTool(id)
    }

    public async delayedAddAndFocusTool(id: string) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.toolBelt?.addTool({ id, lineIcon: 'calendar', card: {} })
        this.toolBelt?.focusTool(id)
    }

    public renderToolBelt() {
        return this.toolBelt?.render() ?? null
    }

    public getToolBeltVc() {
        return this.toolBelt
    }

    public render(): SkillView {
        return {
            layouts: [],
        }
    }
}

class FancyCard extends AbstractViewController<Card> {
    public render(): Card {
        return this.Controller('card', {}).render()
    }
}

@suite()
export default class AssertingToolsTest extends AbstractViewControllerTest {
    private swipeVc!: SwipeCardViewController
    private fancyTool!: FancyTool

    protected controllerMap = {
        toolBeltSvc: ToolBeltSkillViewController,
        good: GoodSkillViewController,
        fancy: FancyCard,
        tool: FancyTool,
    }

    @test()
    protected hasAssertRendersToolBelt() {
        assert.isFunction(vcAssert.assertRendersToolBelt)
    }

    @test('throws if given nothing', null)
    @test('throws if given no tools', { tools: [] })
    protected throwsIfSkillViewControllerDoesNotRenderToolBelt(
        toolBelt: ToolBelt | null
    ) {
        const vc = this.Controller('toolBeltSvc', { toolBelt })

        assert.doesThrow(() => vcAssert.assertRendersToolBelt(vc as any))
        vcAssert.assertDoesNotRenderToolBelt(vc as any)
    }

    @test()
    protected async renderingNullToolBeltThrows() {
        const vc = this.Controller('good', {})
        assert.doesThrow(
            () => toolBeltAssert.rendersToolBelt(vc),
            'public renderToolBelt'
        )
    }

    @test()
    protected async passeBackToolWhenCheckingForTool() {
        const randomId = `${new Date().getTime() * Math.random()}`

        const card1 = this.Controller('card', {
            header: {
                title: 'hey!',
            },
        })

        const vc = this.Controller('toolBeltSvc', {
            toolBelt: {
                controller: 'waka' as any,
                tools: [
                    {
                        id: 'taco',
                        lineIcon: 'add',
                        card: card1.render(),
                    },
                    {
                        id: randomId,
                        lineIcon: 'alarm',
                        card: {} as any,
                    },
                ],
            },
        })

        vcAssert.assertRendersToolBelt(vc)

        this.assertToolRendersCard(vc, card1)

        vcAssert.assertToolBeltRendersTool(vc, randomId)

        assert.doesThrow(() =>
            vcAssert.assertToolBeltDoesNotRenderTool(vc, randomId)
        )
    }

    @test()
    protected knowsIfGivenToolBelt() {
        const vc = this.Controller('toolBeltSvc', {
            toolBelt: {
                tools: [
                    {
                        id: 'add',
                        lineIcon: 'add',
                        card: {} as any,
                    },
                ],
            },
        })

        const toolBeltVc = vcAssert.assertRendersToolBelt(vc)
        assert.doesThrow(() => vcAssert.assertDoesNotRenderToolBelt(vc))
        assert.isTrue(toolBeltVc instanceof ToolBeltViewController)
    }

    @test()
    protected knowsWhenASpecificToolIsRendered() {
        const randomId = `${new Date().getTime() * Math.random()}`
        const vc = this.ToolBeltSvc({ tool2Id: randomId })

        const vc2 = this.Controller('good', {
            layouts: [],
        })

        vcAssert.assertToolBeltRendersTool(vc, 'add')
        assert.doesThrow(() => toolBeltAssert.toolBeltRendersTool(vc2, 'add'))
        assert.doesThrow(() => toolBeltAssert.toolBeltRendersTool(vc, 'taco'))
        vcAssert.assertToolBeltDoesNotRenderTool(vc, 'taco')

        vcAssert.assertToolBeltRendersTool(vc, randomId)
    }

    @test()
    protected canCheckInstanceOfTool() {
        let vc = this.ToolBeltSvc()
        const svc = this.ToolBeltSvc()
        assert.isTruthy(svc)

        assert.doesThrow(() =>
            vcAssert.assertToolInstanceOf(svc, 'add', FormViewController)
        )

        const swipeVc = vcAssert.assertToolInstanceOf(
            svc,
            'add',
            SwipeCardViewController
        )

        assert.isEqual(swipeVc, this.swipeVc)

        vcAssert.assertToolInstanceOf(svc, 'edit', CardViewController)

        const randomId = `${new Date().getTime()}`

        vc = this.ToolBeltSvc({
            tool2Id: randomId,
        })

        vcAssert.assertToolInstanceOf(vc, randomId, CardViewController)
    }

    @test()
    protected canTellToolInstanceOfSubClass() {
        vcAssert.assertToolInstanceOf(this.ToolBeltSvc(), 'fancy', FancyCard)
    }

    @test()
    protected canTellParentMostClass() {
        const toolVc = vcAssert.assertToolInstanceOf(
            this.ToolBeltSvc(),
            'tool',
            FancyTool
        )

        assert.isEqual(toolVc, this.fancyTool)
    }

    @test()
    protected async assertToolIsFocusedThrowsIfNoToolBelt() {
        await assert.doesThrowAsync(() =>
            vcAssert.assertActionFocusesTool(
                this.Controller('good', { layouts: [] }),
                'tool',
                async () => {}
            )
        )
    }

    @test()
    protected async assertToolIsFocusedThrowsIfBadToolId() {
        await assert.doesThrowAsync(() =>
            vcAssert.assertActionFocusesTool(
                this.ToolBeltSvc(),
                'no-found',
                async () => {}
            )
        )
    }

    @test('assert focuses tool 1', 'new-tool')
    @test('assert focuses tool 2', 'new-tool-2')
    protected async passesWhenFocusingTool(id: string) {
        const svc = this.ToolBeltSvc({ tool2Id: id })
        await vcAssert.assertActionFocusesTool(svc, id, async () =>
            svc.focusTool(id)
        )

        await vcAssert.assertActionFocusesTool(
            svc.getToolBeltVc() as any,
            id,
            async () => svc.focusTool(id)
        )
    }

    @test()
    protected async passesWhenFocusHappensLater() {
        const svc = this.ToolBeltSvc({ tool2Id: 'ten' })
        await vcAssert.assertActionFocusesTool(svc, 'ten', async () =>
            svc.delayedFocusTool('ten')
        )
    }

    @test()
    protected async canFocusWhenToolStartsWithNoTools() {
        const svc = this.Controller('toolBeltSvc', {
            toolBelt: {
                tools: [],
            },
        })

        await vcAssert.assertActionFocusesTool(svc, 'ten', async () =>
            svc.delayedAddAndFocusTool('ten')
        )
    }

    @test()
    protected async assertToolIsFocusedThrowsIfToolIdDoesNotMatch() {
        const svc = this.ToolBeltSvc({ tool2Id: 'new-tool' })

        await assert.doesThrowAsync(() =>
            vcAssert.assertActionFocusesTool(svc, 'new-tool', async () =>
                svc.focusTool('add')
            )
        )
    }

    @test()
    protected async canTellIfToolFocusedEvenIfToolAddedLate() {
        const svc = this.ToolBeltSvc()
        await vcAssert.assertActionFocusesTool(svc, 'new-tool', async () => {
            svc.getToolBeltVc()?.addTool({
                id: 'new-tool',
                lineIcon: 'calendar',
                card: {} as any,
            })
            await svc.focusTool('new-tool')
        })
    }

    @test()
    protected async hasForceOpenAndCloseTheMethods() {
        const vc = this.ToolBeltVc()
        assert.isFunction(vc.open)
        assert.isFunction(vc.close)
    }

    @test()
    protected async throwsWhenToolBeltNotForcedOpen() {
        const svc = this.ToolBeltSvc()
        await assert.doesThrowAsync(
            () => vcAssert.assertActionOpensToolBelt(svc, () => {}),
            'open'
        )

        await vcAssert.assertActionDoesNotOpenToolBelt(svc, () => {})
    }

    @test()
    protected async passesWhenOpened() {
        const svc = this.ToolBeltSvc()
        await vcAssert.assertActionOpensToolBelt(svc, () => {
            svc.open()
        })

        await assert.doesThrowAsync(
            () =>
                vcAssert.assertActionDoesNotOpenToolBelt(svc, () => {
                    svc.open()
                }),
            'open'
        )
    }

    @test()
    protected async openingThrowsWhenOptionsDontMatch() {
        const svc = this.ToolBeltSvc()
        await assert.doesThrowAsync(
            () =>
                vcAssert.assertActionOpensToolBelt(
                    svc,
                    () => {
                        svc.open()
                    },
                    {
                        shouldStayOpen: true,
                    }
                ),
            'shouldStayOpen'
        )
    }

    @test('passes closing when options match 1', {
        shouldStayOpen: true,
    })
    @test('passes closing when options match 2', {
        shouldStayOpen: false,
    })
    protected async worksWhenOpeningWithExpectedOptions(expected: any) {
        const svc = this.ToolBeltSvc()
        await vcAssert.assertActionOpensToolBelt(
            svc,
            () => {
                svc.open(expected)
            },
            expected
        )
    }

    @test()
    protected async throwsWhenToolBeltNotClosed() {
        const svc = this.ToolBeltSvc()
        await assert.doesThrowAsync(
            () => vcAssert.assertActionClosesToolBelt(svc, () => {}),
            'close'
        )

        await vcAssert.assertActionDoesNotCloseToolBelt(svc, () => {})
    }

    @test()
    protected async passesWhenClosed() {
        const svc = this.ToolBeltSvc()
        await vcAssert.assertActionClosesToolBelt(svc, () => {
            svc.close()
        })

        await assert.doesThrowAsync(
            () =>
                vcAssert.assertActionDoesNotCloseToolBelt(svc, () => {
                    svc.close()
                }),
            'close'
        )
    }

    @test()
    protected async canAssertIfRendersStickyTools() {
        const vc = this.Controller('tool-belt', {})

        vc.setStickyTool({ position: 'bottom', card: {}, lineIcon: 'add' })

        assert.doesThrow(
            () => vcAssert.assertToolBeltDoesNotRenderStickyTools(vc),
            'renders sticky'
        )

        vc.removeStickyTool('bottom')

        vcAssert.assertToolBeltDoesNotRenderStickyTools(vc)

        vc.setStickyTool({ position: 'top', card: {}, lineIcon: 'add' })

        assert.doesThrow(
            () => vcAssert.assertToolBeltDoesNotRenderStickyTools(vc),
            'renders sticky'
        )
    }

    private assertToolRendersCard(
        vc: ToolBeltSkillViewController,
        card1: CardViewController
    ) {
        const cardVc = vcAssert.assertToolBeltRendersTool(vc, 'taco')
        assert.isEqual(cardVc, card1)

        const cardVc2 = vcAssert.assertToolBeltRendersTool(
            vc.getToolBeltVc() as any,
            'taco'
        )
        assert.isEqual(cardVc2, card1)
    }

    private ToolBeltVc() {
        return this.Controller('tool-belt', {
            tools: [],
        })
    }

    private ToolBeltSvc(options?: { tool2Id?: string }) {
        this.swipeVc = this.Controller('swipe-card', {
            slides: [],
        })
        this.fancyTool = this.Controller('tool', {})

        return this.Controller('toolBeltSvc', {
            toolBelt: {
                controller: 'waka' as any,
                tools: [
                    {
                        id: 'add',
                        lineIcon: 'add',
                        card: this.swipeVc.render(),
                    },
                    {
                        id: options?.tool2Id ?? 'edit',
                        lineIcon: 'calendar',
                        card: this.Controller('card', {}).render(),
                    },
                    {
                        id: 'fancy',
                        lineIcon: 'calendar',
                        card: this.Controller('fancy', {}).render(),
                    },
                    {
                        id: 'tool',
                        lineIcon: 'calendar',
                        card: this.fancyTool.render(),
                    },
                ],
            },
        })
    }
}
