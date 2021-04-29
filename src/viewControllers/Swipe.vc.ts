import { SpruceSchemas } from '@sprucelabs/mercury-types'
import SpruceError from '../errors/SpruceError'
import {
	SwipeController,
	ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

type ViewModel = SpruceSchemas.Heartwood.v2021_02_11.Card
type Slide = SpruceSchemas.Heartwood.v2021_02_11.CardSection

export type SwipeViewControllerOptions = {
	slides: Slide[]
	onSlideChange?: (slide: number) => void
} & Pick<ViewModel, 'footer'>

export default class SwipeViewController extends AbstractViewController<ViewModel> {
	private currentSlide = 0
	private slides: Slide[]
	private swipeController?: SwipeController
	private footer?: SpruceSchemas.Heartwood.v2021_02_11.CardFooter | null
	private slideChangeHandler: ((slide: number) => void) | undefined
	public static swipeDelay = 500

	public constructor(
		options: SwipeViewControllerOptions & ViewControllerOptions
	) {
		super(options)
		this.slides = options.slides
		this.footer = options.footer
		this.slideChangeHandler = options.onSlideChange
	}

	public async swipeToSlide(slide: number) {
		this.swipeController?.swipeTo(slide)
		await this.handleSlideChange(slide)
	}

	private async handleSlideChange(slide: number) {
		if (this.currentSlide !== slide) {
			this.currentSlide = slide
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					this.slideChangeHandler?.(slide)
					resolve()
				}, SwipeViewController.swipeDelay)
			})
		}
	}

	public getCurrentSlide() {
		return this.currentSlide
	}

	public updateSlide(slideIdx: number, slide: Partial<Slide>) {
		if (slideIdx < 0 || slideIdx > this.slides.length - 1) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: ['slideIdx'],
			})
		}

		this.slides[slideIdx] = {
			...this.slides[slideIdx],
			...slide,
		}
	}

	public markSlideAsComplete(idx: number) {
		if (!this.slides[idx]) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: ['slideIdx'],
			})
		}
		this.slides[idx].isComplete = true
	}

	public render(): ViewModel {
		return {
			body: {
				swipeController: (controller) => (this.swipeController = controller),
				onSelectSlideTitle: this.swipeToSlide.bind(this),
				onChangeSlide: this.handleSlideChange.bind(this),
				sections: this.slides,
				shouldEnableSectionSwiping: true,
			},
			footer: this.footer,
		}
	}
}
