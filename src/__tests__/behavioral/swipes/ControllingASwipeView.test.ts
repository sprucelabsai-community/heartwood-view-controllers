import { test, assert } from '@sprucelabs/test-utils'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { Card } from '../../../types/heartwood.types'
import SwipeCardViewController, {
    SwipeViewControllerOptions,
} from '../../../viewControllers/SwipeCard.vc'

export default class SwipingThroughSlidesTest extends AbstractViewControllerTest {
    protected static controllerMap = {}
    private static vc: SwipeCardViewController
    private static slide1Id: string
    private static slide2Id: string
    private static slide3Id: string
    private static changeHandlerHitCount = 0

    protected static async beforeEach() {
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
    protected static async canCreateSwipingThroughSlides() {
        assert.isTruthy(this.vc)
    }

    @test()
    protected static async startsAtFirstSlide() {
        assert.isEqual(this.vc.getPresentSlide(), 0)
    }

    @test()
    protected static async canJumpToFutureSlide() {
        await this.vc.jumpToSlide(1)
        assert.isEqual(this.vc.getPresentSlide(), 1)
    }

    @test()
    protected static async cantJumpPastLastSlide() {
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
    protected static async renders() {
        const model = this.render(this.vc)

        assert.isLength(model.body?.sections, 3)
        assert.isEqual(model.body?.sections?.[0].title, 'step 1')
        assert.isEqual(model.body?.sections?.[1].title, 'step 2')
        assert.isEqual(model.body?.sections?.[2].title, 'step 3')
    }

    @test()
    protected static async updatingBadSectionThrows() {
        const err = assert.doesThrow(() =>
            this.vc.setSlide(10, { text: { content: 'Hey' } })
        )

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['slide'],
        })
    }

    @test('should break into cards true', true)
    @test('should break into cards false', false)
    protected static async canSetBreakIntoCardsOnLandscape(
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
    protected static async canSetSlide() {
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
    protected static async throwsWhenSettingSlideThatDoesNotExist() {
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
    protected static async canSetSlideById() {
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
    protected static updatingSectionThatDoesNotExistThrows() {
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
    protected static updatesIfFound() {
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
    protected static canUpdateSlideThatIsNotTheFirst() {
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

    private static renderSection(vc: SwipeCardViewController, idx = 0) {
        const model = this.render(vc)
        const section = model.body?.sections?.[idx]
        assert.isTruthy(section)
        delete section.controller
        return section
    }

    @test()
    protected static async cardSectionShouldNotCallRenderOnSwipeSlide() {
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
    protected static throwsWhenMarkingBadSlideAsComplete() {
        const err = assert.doesThrow(() => this.vc.markSlideAsComplete(-10))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['slide'],
        })
    }

    @test()
    protected static canMarkSlideAsComplete() {
        let model = this.render(this.vc)
        assert.isUndefined(model.body?.sections?.[0].isComplete)

        this.vc.markSlideAsComplete(0)

        model = this.render(this.vc)
        assert.isTrue(model.body?.sections?.[0].isComplete)
    }

    @test()
    protected static async settingCurrentSlideTriggersSlideCallback() {
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
    protected static canUpdateFooter() {
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
    protected static addingSlideTriggersRender() {
        this.vc.addSlide({ title: 'Go!' })
        vcAssert.assertTriggerRenderCount(this.vc, 1)

        this.vc.addSlide({ title: 'Go!' })

        vcAssert.assertTriggerRenderCount(this.vc, 2)
    }

    @test()
    protected static removingSlideTriggersRender() {
        this.vc.addSlide({ title: 'Go!' })
        this.vc.removeSlide(1)

        vcAssert.assertTriggerRenderCount(this.vc, 2)
    }

    @test()
    protected static async addingSlideAtIndexTriggersRender() {
        this.vc.addSlideAtIndex(0, { title: 'new' })
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected static async cantJumpToBadId() {
        //@ts-ignore
        const err = await assert.doesThrowAsync(() =>
            this.vc.jumpToSlide('taco')
        )
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['slideIndex'],
        })
    }

    @test()
    protected static canGetTotalSlides() {
        const vc = this.Vc({
            slides: [],
        })

        assert.isEqual(vc.getTotalSlides(), 0)
    }

    @test()
    protected static tracksWhenAdding() {
        assert.isEqual(this.vc.getTotalSlides(), 3)
        this.vc.addSlide({ title: 'go' })
        assert.isEqual(this.vc.getTotalSlides(), 4)
    }

    @test()
    protected static async callingTriggerRenderOnCardVcTriggersOnSwipeVc() {
        let wasHit = false
        this.vc.triggerRender = () => {
            wasHit = true
        }

        //@ts-ignore
        this.vc.cardVc.triggerRender()

        assert.isTrue(wasHit)
    }

    @test()
    protected static canGetSlideById() {
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
    protected static canBeSetToRenderNull() {
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
    protected static async restoresOriginalModelWhenNotNull() {
        const expected = this.renderVc()

        this.vc.setShouldRenderNull(true)
        this.vc.setShouldRenderNull(false)

        const actual = this.renderVc()
        assert.isEqualDeep(this.cleanModel(actual), this.cleanModel(expected))
    }

    @test()
    protected static async sameFooterVcEverTime() {
        const vc = this.renderAndGetFooterVc()
        const vc2 = this.renderAndGetFooterVc()
        assert.isEqual(vc, vc2)
    }

    @test()
    protected static async throwsWhenGettingBadSlide() {
        const err = assert.doesThrow(() => this.vc.getSlide(generateId()))
        errorAssert.assertError(err, 'INVALID_PARAMETERS')
    }

    @test()
    protected static async jumpToSlideWithBadIdThrows() {
        const err = await assert.doesThrowAsync(() =>
            this.vc.jumpToSlide(generateId())
        )
        errorAssert.assertError(err, 'INVALID_PARAMETERS')
    }

    @test()
    protected static async jumpToSlideWithGoodId() {
        await this.jumpToSlide(this.slide2Id)
        assert.isEqual(this.vc.getPresentSlide(), 1)
    }

    @test()
    protected static async canGetPresentSlideId() {
        this.assertSelectedSlideId(this.slide1Id)
        await this.jumpToSlide(this.slide2Id)
        this.assertSelectedSlideId(this.slide2Id)
    }

    @test()
    protected static async jumpingToSameSlideDoesNotSwipeToOnSwipeController() {
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
    protected static async slideChangeHandlerDebounces() {
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

    private static assertChangeHandlerHitCount(expected: number) {
        assert.isEqual(this.changeHandlerHitCount, expected)
    }

    private static async jumpToSlide(id: string | number) {
        await this.vc.jumpToSlide(id)
    }

    private static assertSelectedSlideId(expected: string) {
        assert.isEqual(this.vc.getPresentSlideId(), expected)
    }

    private static renderAndGetFooterVc() {
        const { controller } = this.render(this.vc)
        const footer = this.render(controller!)
        const vc = footer?.controller
        return vc
    }

    private static renderVc() {
        return this.render(this.vc)
    }

    private static cleanModel(model: Card) {
        delete model.controller
        return model
    }

    private static Vc(
        options: SwipeViewControllerOptions
    ): SwipeCardViewController {
        return this.Controller('swipeCard', options)
    }
}
