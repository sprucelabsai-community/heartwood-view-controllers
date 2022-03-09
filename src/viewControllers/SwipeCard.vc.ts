import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { SchemaError } from '@sprucelabs/schema'
import { functionDelegationUtil } from '@sprucelabs/spruce-skill-utils'
import {
	SwipeController,
	ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'
import CardViewController from './card/Card.vc'
import sectionIdOrIdxToIdx from './card/sectionIdOrIdxToIdx'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
type Slide = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection
type Footer = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter

export type SwipeViewControllerOptions = {
	slides: Slide[]
	onSlideChange?: (slide: number) => void
	isBusy?: boolean
} & Omit<Card, 'body'>

const PASSTHROUGH_METHODS = ['setHeaderTitle', 'setHeaderSubtitle'] as const

type PassthroughMethods = {
	[K in typeof PASSTHROUGH_METHODS[number]]: CardViewController[K]
}

/** @ts-ignore */
export default class SwipeCardViewController
	extends AbstractViewController<Card>
	implements PassthroughMethods
{
	private presentSlide = 0
	private swipeController?: SwipeController
	private slideChangeHandler: ((slide: number) => void) | undefined
	public static swipeDelay = 500
	private cardVc: CardViewController

	public setHeaderTitle!: CardViewController['setHeaderTitle']
	public setHeaderSubtitle!: CardViewController['setHeaderSubtitle']
	public setSections!: CardViewController['setSections']

	public constructor(
		options: SwipeViewControllerOptions & ViewControllerOptions
	) {
		super(options)

		const { slides, onSlideChange, isBusy, ...rest } = options

		this.slideChangeHandler = onSlideChange
		this.cardVc = this.Controller('card', {
			...rest,
			body: {
				isBusy,
				sections: slides,
				swipeController: (controller) => (this.swipeController = controller),
				onSelectSlideTitle: this.jumpToSlide.bind(this),
				onChangeSlide: this.handleSlideChange.bind(this),
				shouldEnableSectionSwiping: true,
			},
		})

		functionDelegationUtil.delegateFunctionCalls(this, this.cardVc)

		this.cardVc.triggerRender = () => {
			this.triggerRender()
		}
	}

	public async jumpToSlide(slide: number) {
		if (typeof slide !== 'number') {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['slideIndex'],
			})
		}

		this.swipeController?.swipeTo(slide)
		await this.handleSlideChange(slide)
	}

	private async handleSlideChange(slide: number) {
		if (this.presentSlide !== slide) {
			this.presentSlide = slide
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					this.slideChangeHandler?.(slide)
					resolve()
				}, SwipeCardViewController.swipeDelay)
			})
		}
	}

	public getPresentSlide() {
		return this.presentSlide
	}

	public setSlide(idOrIdx: number | string, slide: Partial<Slide>) {
		const idx = sectionIdOrIdxToIdx(this.getSlides(), idOrIdx)
		this.assertSlideExists(idx)
		return this.cardVc.setSection(idx, slide)
	}

	public updateSlide(idOrIdx: number | string, updates: Partial<Slide>) {
		const idx = sectionIdOrIdxToIdx(this.getSlides(), idOrIdx)
		this.assertSlideExists(idx)
		this.cardVc.updateSection(idx, updates)
	}

	private assertSlideExists(slide: number) {
		if (!this.getSlides()?.[slide]) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['slide'],
				friendlyMessage: `I couldn't update slide ${slide} because it doesn't exist.`,
			})
		}
	}

	public markSlideAsComplete(slideIdx: number) {
		this.assertSlideExists(slideIdx)
		const section = this.cardVc.getSection(slideIdx)
		section.isComplete = true
	}

	public getSlides() {
		return this.cardVc.getSections()
	}

	public removeSlide(idx: number) {
		return this.cardVc.removeSection(idx)
	}

	public addSlideAtIndex(idx: number, slide: Slide) {
		return this.cardVc.addSectionAtIndex(idx, slide)
	}

	public addSlide(slide: Slide) {
		return this.cardVc.addSection(slide)
	}

	public getSlide(idx: number) {
		return this.cardVc.getSection(idx)
	}

	public setFooter(footer: Footer | null | undefined) {
		this.cardVc.setFooter(footer)
	}

	public getTotalSlides(): number {
		return this.cardVc.getTotalSections()
	}

	public render(): Card {
		//@ts-ignore
		return { ...this.cardVc.render(), controller: this }
	}
}
