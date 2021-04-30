import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import SwipeViewController, {
	SwipeViewControllerOptions,
} from '../../viewControllers/Swipe.vc'

export default class SwipingThroughSlidesTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
	private static vc: SwipeViewController
	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Vc({
			slides: [
				{
					title: 'step 1',
				},
				{
					title: 'step 2',
				},
				{
					title: 'step 3',
				},
			],
		})
	}

	private static Vc(options: SwipeViewControllerOptions): SwipeViewController {
		return this.Factory().Controller('swipe', options)
	}

	@test()
	protected static async canCreateSwipingThroughSlides() {
		assert.isTruthy(this.vc)
	}

	@test()
	protected static async startsAtFirstSlide() {
		assert.isEqual(this.vc.getCurrentSlide(), 0)
	}

	@test()
	protected static async canJumpToFutureSlide() {
		await this.vc.swipeToSlide(1)
		assert.isEqual(this.vc.getCurrentSlide(), 1)
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

		await vc.swipeToSlide(10)
		assert.isEqual(this.vc.getCurrentSlide(), 0)
	}

	@test()
	protected static async renders() {
		const model = this.vc.render()
		assert.isLength(model.body?.sections, 3)
		assert.isEqual(model.body?.sections?.[0].title, 'step 1')
		assert.isEqual(model.body?.sections?.[1].title, 'step 2')
		assert.isEqual(model.body?.sections?.[2].title, 'step 3')
	}

	@test()
	protected static async updatingBadSectionThrows() {
		const err = assert.doesThrow(() =>
			this.vc.updateSlide(10, { text: { content: 'Hey' } })
		)

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['slideIdx'],
		})
	}

	@test()
	protected static async canUpdateSection() {
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

		vc.updateSlide(0, { text: { content: 'hey there updated' } })

		const model = vc.render()
		assert.isEqual(model.body?.sections?.[0].text?.content, 'hey there updated')
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
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['slideIdx'],
		})
	}

	@test()
	protected static canMarkeSlideAsComplete() {
		let model = this.vc.render()
		assert.isUndefined(model.body?.sections?.[0].isComplete)

		this.vc.markSlideAsComplete(0)

		model = this.vc.render()
		assert.isTrue(model.body?.sections?.[0].isComplete)
	}

	@test()
	protected static async settingCurrentSlideTriggersSlideCallback() {
		SwipeViewController.swipeDelay = 0
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

		await vc.swipeToSlide(1)
		assert.isEqual(onSlideChangeSlide, 1)
		assert.isEqual(changeHitCount, 1)

		await vc.swipeToSlide(0)
		assert.isEqual(onSlideChangeSlide, 0)
		assert.isEqual(changeHitCount, 2)

		await vc.swipeToSlide(0)
		assert.isEqual(onSlideChangeSlide, 0)
		assert.isEqual(changeHitCount, 2)
	}
}
