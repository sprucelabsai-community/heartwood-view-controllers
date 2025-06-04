import { SchemaError } from '@sprucelabs/schema'
import { functionDelegationUtil } from '@sprucelabs/spruce-skill-utils'
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Slide,
    SwipeController,
    ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'
import CardViewController from './card/Card.vc'
import sectionIdOrIdxToIdx from './card/sectionIdOrIdxToIdx'

export default class SwipeCardViewController extends AbstractViewController<Card> {
    private presentSlide = 0
    private swipeController?: SwipeController
    private slideChangeHandler:
        | ((slide: number) => void | Promise<void>)
        | undefined
    public static swipeDelay = 500
    private cardVc: CardViewController

    public setHeaderTitle!: CardViewController['setHeaderTitle']
    public setHeaderSubtitle!: CardViewController['setHeaderSubtitle']
    public setSections!: CardViewController['setSections']
    public getHeaderTitle!: CardViewController['getHeaderTitle']
    public getHeaderSubtitle!: CardViewController['getHeaderSubtitle']
    public getFooter!: CardViewController['getFooter']
    private cardBeforeNull?: CardSnapshot
    private timeout?: NodeJS.Timeout
    private didChangeResolve?: (value: void | PromiseLike<void>) => void

    public constructor(
        options: SwipeViewControllerOptions & ViewControllerOptions
    ) {
        super(options)

        const { onSlideChange, ...rest } = options

        this.slideChangeHandler = onSlideChange

        this.cardVc = this.CardVc(rest)

        functionDelegationUtil.delegateFunctionCalls(this, this.cardVc)

        this.cardVc.triggerRender = () => {
            this.triggerRender()
        }
    }

    private CardVc(
        options: SwipeViewControllerOptions & ViewControllerOptions
    ) {
        const { slides, isBusy, ...rest } = options
        return this.Controller('card', {
            ...rest,
            body: {
                isBusy,
                sections: slides,
                shouldSwipeBreakIntoCardsOnLandscape:
                    options.shouldBreakIntoCardsOnLandscape,
                swipeController: (controller) =>
                    (this.swipeController = controller),
                onSelectSlideTitle: this.jumpToSlide.bind(this),
                onChangeSlide: this.handleSlideChange.bind(this),
                shouldEnableSectionSwiping: true,
            },
        })
    }

    public async jumpToSlide(slide: number | string) {
        if (slide === this.getPresentSlide()) {
            return
        }

        const normalized = sectionIdOrIdxToIdx(this.getSlides(), slide)

        if (normalized === -1 && typeof slide !== 'number') {
            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                parameters: ['slideIndex'],
            })
        } else if (normalized === -1) {
            return
        }

        this.swipeController?.swipeTo(normalized)

        await this.handleSlideChange(normalized)
    }

    private async handleSlideChange(slide: number) {
        if (this.presentSlide !== slide) {
            clearTimeout(this.timeout)

            this.didChangeResolve?.()
            this.presentSlide = slide

            await new Promise<void>((resolve) => {
                this.didChangeResolve = resolve
                this.timeout = setTimeout(async () => {
                    await this.slideChangeHandler?.(slide)
                    delete this.didChangeResolve
                    resolve()
                }, SwipeCardViewController.swipeDelay)
            })
        }
    }

    public getPresentSlide() {
        return this.presentSlide
    }

    public getPresentSlideId() {
        return this.getSlide(this.getPresentSlide()).id
    }

    public setSlide(idOrIdx: number | string, slide: Partial<Slide>) {
        const idx = sectionIdOrIdxToIdx(this.getSlides(), idOrIdx)
        this.assertSlideExists(idx, idOrIdx)
        return this.cardVc.setSection(idx, slide)
    }

    public updateSlide(idOrIdx: number | string, updates: Partial<Slide>) {
        const idx = sectionIdOrIdxToIdx(this.getSlides(), idOrIdx)
        this.assertSlideExists(idx, idOrIdx)
        this.cardVc.updateSection(idx, updates)
    }

    private assertSlideExists(slide: number, idOrIdx: string | number) {
        if (!this.getSlides()?.[slide]) {
            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                parameters: ['slide'],
                friendlyMessage: `I couldn't update slide ${idOrIdx} because it doesn't exist.`,
            })
        }
    }

    public markSlideAsComplete(slideIdx: number) {
        this.assertSlideExists(slideIdx, slideIdx)
        const section = this.cardVc.getSection(slideIdx)
        section.isComplete = true
    }

    public getSlides() {
        return this.cardVc.getSections()
    }

    public removeSlide(idOrIdx: number | string) {
        return this.cardVc.removeSection(idOrIdx)
    }

    public addSlideAtIndex(idx: number, slide: Slide) {
        return this.cardVc.addSectionAtIndex(idx, slide)
    }

    public addSlide(slide: Slide) {
        return this.cardVc.addSection(slide)
    }

    public getSlide(idOrIdx: number | string) {
        return this.cardVc.getSection(idOrIdx)
    }

    public setFooter(footer: CardFooter | null | undefined) {
        this.cardVc.setFooter(footer)
    }

    public setShouldRenderNull(shouldRenderNull: boolean) {
        if (shouldRenderNull) {
            this.cardBeforeNull = {
                header: this.cardVc.getHeader(),
                body: this.cardVc.getBody(),
                footer: this.cardVc.getFooter(),
            }

            this.cardVc.setHeader(null)
            this.cardVc.setBody(null)
            this.cardVc.setFooter(null)
        } else {
            this.cardVc.setHeader(this.cardBeforeNull?.header)
            this.cardVc.setBody(this.cardBeforeNull?.body)
            this.cardVc.setFooter(this.cardBeforeNull?.footer)
        }
    }

    public getTotalSlides(): number {
        return this.cardVc.getTotalSections()
    }

    public render(): Card {
        //@ts-ignore
        return { ...this.cardVc.render(), controller: this }
    }
}

export type SwipeViewControllerOptions = {
    slides: Slide[]
    shouldBreakIntoCardsOnLandscape?: boolean
    onSlideChange?: (slide: number) => void
    isBusy?: boolean
} & Omit<Card, 'body'>

const PASSTHROUGH_METHODS = [
    'setHeaderTitle',
    'setHeaderSubtitle',
    'enableFooter',
    'disableFooter',
    'getIsFooterEnabled',
    'setHeader',
    'setFooterIsBusy',
    'getIsFooterBusy',
] as const

export type SwipeCardPassthroughMethods = {
    [K in (typeof PASSTHROUGH_METHODS)[number]]: CardViewController[K]
}

interface CardSnapshot {
    header: CardHeader | null | undefined
    body: CardBody | null | undefined
    footer: CardFooter | null | undefined
}
