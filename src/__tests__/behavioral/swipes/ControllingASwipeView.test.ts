import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { Card } from '../../../types/heartwood.types'
import SwipeCardViewController, {
    SwipeViewControllerOptions,
} from '../../../viewControllers/SwipeCard.vc'

@suite()
export default class SwipingThroughSlidesTest extends AbstractViewControllerTest {
    protected controllerMap = {}
    private vc!: SwipeCardViewController
    private slide1Id!: string
    private slide2Id!: string
    private slide3Id!: string
    private changeHandlerHitCount = 0

    protected async beforeEach() {
        await super.beforeEach()

        this.slide1Id = generateId()
        this.slide2Id = generateId()
        this.slide3Id = generateId()
        this.changeHandlerHitCount = 0

        this.vc = this.Vc({
            header: {
                title: generateId(),
            },
            onSlideChange: async () => {
                this.changeHandlerHitCount++
            },
            slides: [
                {
                    id: this.slide1Id,
                    title: 'step 1',
                },
                {
                    id: this.slide2Id,
                    title: 'step 2',
                },
                {
                    id: this.slide3Id,
                    title: 'step 3',
                },
            ],
            footer: {
                buttons: [
                    {
                        id: generateId(),
                    },
                ],
            },
        })
    }

    @test()
    protected async canCreateSwipingThroughSlides() {
        assert.isTruthy(this.vc)
    }

    @test()
    protected async startsAtFirstSlide() {
        assert.isEqual(this.vc.getPresentSlide(), 0)
    }

    @test()
    protected async canJumpToFutureSlide() {
        await this.vc.jumpToSlide(1)
        assert.isEqual(this.vc.getPresentSlide(), 1)
    }

    @test()
    protected async cantJumpPastLastSlide() {
        const vc = this.Vc({
            slides: [
                {
                    title: 'step 1',
                    text: { content: 'hey there!' },
                },
            ],
        })

        await vc.jumpToSlide(10)
        assert.isEqual(this.vc.getPresentSlide(), 0)
    }

    @test()
    protected async renders() {
        const model = this.render(this.vc)

        assert.isLength(model.body?.sections, 3)
        assert.isEqual(model.body?.sections?.[0].title, 'step 1')
        assert.isEqual(model.body?.sections?.[1].title, 'step 2')
        assert.isEqual(model.body?.sections?.[2].title, 'step 3')
    }

    @test()
    protected async updatingBadSectionThrows() {
        const err = assert.doesThrow(() =>
            this.vc.setSlide(10, { text: { content: 'Hey' } })
        )

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['slide'],
        })
    }

    @test('should break into cards true', true)
    @test('should break into cards false', false)
    protected async canSetBreakIntoCardsOnLandscape(
        shouldBreakIntoCardsOnLandscape: boolean
    ) {
        let vc = this.Vc({
            shouldBreakIntoCardsOnLandscape,
            slides: [],
        })

        const model = this.render(vc)
        assert.isEqual(
            model.body?.shouldSwipeBreakIntoCardsOnLandscape,
            shouldBreakIntoCardsOnLandscape
        )
    }

    @test()
    protected async canSetSlide() {
        const vc = this.Vc({
            slides: [
                {
                    title: 'step 1',
                    text: { content: 'hey there!' },
                },
                {
                    title: 'step 2',
                    text: { content: 'hey there dude!!' },
                },
            ],
        })

        vc.setSlide(0, { text: { content: 'hey there updated' } })

        const model = this.render(vc)
        assert.isEqual(
            model.body?.sections?.[0].text?.content,
            'hey there updated'
        )
    }

    @test()
    protected async throwsWhenSettingSlideThatDoesNotExist() {
        const vc = this.Vc({
            slides: [
                {
                    id: 'testing',
                },
            ],
        })
        const err = assert.doesThrow(() => vc.setSlide('test', {}))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['slide'],
        })
    }

    @test()
    protected async canSetSlideById() {
        const vc = this.Vc({
            slides: [
                {
                    id: 'step-1',
                    title: 'step 1',
                    text: { content: 'hey there!' },
                },
                {
                    id: 'step-2',
                    title: 'step 2',
                    text: { content: 'hey there dude!!' },
                },
            ],
        })

        vc.setSlide('step-1', { text: { content: 'hey there updated' } })

        let model = this.render(vc)
        assert.isEqual(
            model.body?.sections?.[0].text?.content,
            'hey there updated'
        )
        assert.isEqual(model.body?.sections?.[0].id, 'step-1')

        vc.setSlide('step-2', { text: { content: 'what is up?' } })

        model = this.render(vc)
        assert.isEqual(model.body?.sections?.[1].text?.content, 'what is up?')
        assert.isEqual(model.body?.sections?.[1].id, 'step-2')
    }

    @test()
    protected updatingSectionThatDoesNotExistThrows() {
        const vc = this.Vc({
            slides: [
                {
                    id: 'testing',
                },
            ],
        })
        const err = assert.doesThrow(() => vc.updateSlide('test', {}))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['slide'],
        })
    }

    @test()
    protected updatesIfFound() {
        const vc = this.Vc({
            slides: [
                {
                    id: 'testing',
                },
                {
                    id: 'next',
                },
            ],
        })

        const updates = {
            buttons: [
                {
                    id: 'test',
                    label: 'team',
                },
            ],
        }

        vc.updateSlide('testing', updates)

        let section = this.renderSection(vc)

        assert.isEqualDeep(section, { ...updates, id: 'testing' })

        let updates2 = {
            title: 'hey',
        }

        vc.updateSlide('testing', updates2)

        section = this.renderSection(vc)

        assert.isEqualDeep(section, { ...updates, ...updates2, id: 'testing' })
    }

    @test()
    protected canUpdateSlideThatIsNotTheFirst() {
        const vc = this.Vc({
            slides: [
                {
                    id: 'testing',
                },
                {
                    id: 'next',
                },
            ],
        })

        const updates = {
            buttons: [
                {
                    id: 'test',
                    label: 'team',
                },
            ],
        }

        vc.updateSlide('next', updates)
        const section = this.renderSection(vc, 1)
        assert.isEqualDeep(section, { ...updates, id: 'next' })
    }

    private renderSection(vc: SwipeCardViewController, idx = 0) {
        const model = this.render(vc)
        const section = model.body?.sections?.[idx]
        assert.isTruthy(section)
        delete section.controller
        return section
    }

    @test()
    protected async cardSectionShouldNotCallRenderOnSwipeSlide() {
        let renderCount = 0
        const buttonGroupVc = this.Factory().Controller('buttonGroup', {
            buttons: [],
        })

        buttonGroupVc.render = () => {
            renderCount++
            return []
        }

        const vc = this.Vc({
            slides: [
                {
                    title: 'step 1',
                    text: { content: 'hey there!' },
                    buttons: buttonGroupVc.render(),
                },
                {
                    title: 'step 2',
                    text: { content: 'hey there dude!!' },
                },
            ],
        })

        assert.isEqual(renderCount, 1)

        vc.render()

        assert.isEqual(renderCount, 1)
    }

    @test()
    protected throwsWhenMarkingBadSlideAsComplete() {
        const err = assert.doesThrow(() => this.vc.markSlideAsComplete(-10))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['slide'],
        })
    }

    @test()
    protected canMarkSlideAsComplete() {
        let model = this.render(this.vc)
        assert.isUndefined(model.body?.sections?.[0].isComplete)

        this.vc.markSlideAsComplete(0)

        model = this.render(this.vc)
        assert.isTrue(model.body?.sections?.[0].isComplete)
    }

    @test()
    protected async settingCurrentSlideTriggersSlideCallback() {
        SwipeCardViewController.swipeDelay = 0
        let onSlideChangeSlide = -1
        let changeHitCount = 0
        const vc = this.Vc({
            onSlideChange: (slide: number) => {
                onSlideChangeSlide = slide
                changeHitCount++
            },
            slides: [
                {
                    title: 'step 1',
                    text: { content: 'hey there dude!!' },
                },
                {
                    title: 'step 2',
                    text: { content: 'hey there dude!!' },
                },
            ],
        })

        assert.isEqual(onSlideChangeSlide, -1)

        await vc.jumpToSlide(1)
        assert.isEqual(onSlideChangeSlide, 1)
        assert.isEqual(changeHitCount, 1)

        await vc.jumpToSlide(0)
        assert.isEqual(onSlideChangeSlide, 0)
        assert.isEqual(changeHitCount, 2)

        await vc.jumpToSlide(0)
        assert.isEqual(onSlideChangeSlide, 0)
        assert.isEqual(changeHitCount, 2)
    }

    @test()
    protected canUpdateFooter() {
        this.vc = this.Vc({
            slides: [],
        })
        assert.isFalsy(this.render(this.vc).footer)
        this.vc.setFooter({ buttons: [{ label: 'Hey!' }] })
        assert.doesInclude(this.render(this.vc).footer?.buttons, {
            label: 'Hey!',
        })
    }

    @test()
    protected addingSlideTriggersRender() {
        this.vc.addSlide({ title: 'Go!' })
        vcAssert.assertTriggerRenderCount(this.vc, 1)

        this.vc.addSlide({ title: 'Go!' })

        vcAssert.assertTriggerRenderCount(this.vc, 2)
    }

    @test()
    protected removingSlideTriggersRender() {
        this.vc.addSlide({ title: 'Go!' })
        this.vc.removeSlide(1)

        vcAssert.assertTriggerRenderCount(this.vc, 2)
    }

    @test()
    protected async addingSlideAtIndexTriggersRender() {
        this.vc.addSlideAtIndex(0, { title: 'new' })
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async cantJumpToBadId() {
        //@ts-ignore
        const err = await assert.doesThrowAsync(() =>
            this.vc.jumpToSlide('taco')
        )
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['slideIndex'],
        })
    }

    @test()
    protected canGetTotalSlides() {
        const vc = this.Vc({
            slides: [],
        })

        assert.isEqual(vc.getTotalSlides(), 0)
    }

    @test()
    protected tracksWhenAdding() {
        assert.isEqual(this.vc.getTotalSlides(), 3)
        this.vc.addSlide({ title: 'go' })
        assert.isEqual(this.vc.getTotalSlides(), 4)
    }

    @test()
    protected async callingTriggerRenderOnCardVcTriggersOnSwipeVc() {
        let wasHit = false
        this.vc.triggerRender = () => {
            wasHit = true
        }

        //@ts-ignore
        this.vc.cardVc.triggerRender()

        assert.isTrue(wasHit)
    }

    @test()
    protected canGetSlideById() {
        this.vc = this.Vc({
            slides: [
                {
                    id: 'test',
                },
            ],
        })

        assert.isEqualDeep(this.vc.getSlide('test'), this.vc.getSlide(0))
    }

    @test()
    protected canBeSetToRenderNull() {
        this.vc.setShouldRenderNull(true)

        const model = this.renderVc()
        this.cleanModel(model)

        assert.isEqualDeep(model, {
            header: null,
            footer: null,
            body: null,
        })
    }

    @test()
    protected async restoresOriginalModelWhenNotNull() {
        const expected = this.renderVc()

        this.vc.setShouldRenderNull(true)
        this.vc.setShouldRenderNull(false)

        const actual = this.renderVc()
        assert.isEqualDeep(this.cleanModel(actual), this.cleanModel(expected))
    }

    @test()
    protected async sameFooterVcEverTime() {
        const vc = this.renderAndGetFooterVc()
        const vc2 = this.renderAndGetFooterVc()
        assert.isEqual(vc, vc2)
    }

    @test()
    protected async throwsWhenGettingBadSlide() {
        const err = assert.doesThrow(() => this.vc.getSlide(generateId()))
        errorAssert.assertError(err, 'INVALID_PARAMETERS')
    }

    @test()
    protected async jumpToSlideWithBadIdThrows() {
        const err = await assert.doesThrowAsync(() =>
            this.vc.jumpToSlide(generateId())
        )
        errorAssert.assertError(err, 'INVALID_PARAMETERS')
    }

    @test()
    protected async jumpToSlideWithGoodId() {
        await this.jumpToSlide(this.slide2Id)
        assert.isEqual(this.vc.getPresentSlide(), 1)
    }

    @test()
    protected async canGetPresentSlideId() {
        this.assertSelectedSlideId(this.slide1Id)
        await this.jumpToSlide(this.slide2Id)
        this.assertSelectedSlideId(this.slide2Id)
    }

    @test()
    protected async jumpingToSameSlideDoesNotSwipeToOnSwipeController() {
        const model = this.renderVc()
        let hitCount = 0
        model.body?.swipeController?.({
            swipeTo: () => {
                hitCount++
            },
        })

        await this.jumpToSlide(1)
        assert.isEqual(hitCount, 1)
        await this.jumpToSlide(1)
        assert.isEqual(hitCount, 1)
    }

    @test()
    protected async slideChangeHandlerDebounces() {
        SwipeCardViewController.swipeDelay = 10
        await Promise.all([
            this.jumpToSlide(1),
            this.jumpToSlide(2),
            this.jumpToSlide(3),
        ])

        this.assertChangeHandlerHitCount(1)
        await this.jumpToSlide(1)

        this.assertChangeHandlerHitCount(2)

        await Promise.all([this.jumpToSlide(2), this.jumpToSlide(3)])

        this.assertChangeHandlerHitCount(3)
    }

    private assertChangeHandlerHitCount(expected: number) {
        assert.isEqual(this.changeHandlerHitCount, expected)
    }

    private async jumpToSlide(id: string | number) {
        await this.vc.jumpToSlide(id)
    }

    private assertSelectedSlideId(expected: string) {
        assert.isEqual(this.vc.getPresentSlideId(), expected)
    }

    private renderAndGetFooterVc() {
        const { controller } = this.render(this.vc)
        const footer = this.render(controller!)
        const vc = footer?.controller
        return vc
    }

    private renderVc() {
        return this.render(this.vc)
    }

    private cleanModel(model: Card) {
        delete model.controller
        return model
    }

    private Vc(options: SwipeViewControllerOptions): SwipeCardViewController {
        return this.Controller('swipeCard', options)
    }
}
