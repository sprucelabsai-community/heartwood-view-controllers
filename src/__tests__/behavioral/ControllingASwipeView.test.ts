import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import vcAssertUtil from '../../tests/utilities/vcAssert.utility'
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
		return this.Controller('swipe', options)
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
			this.vc.updateSlide(10, { text: { content: 'Hey' } })
		)

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['slideIndex'],
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

		const model = this.render(vc)
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
			parameters: ['slideIndex'],
		})
	}

	@test()
	protected static canMarkeSlideAsComplete() {
		let model = this.render(this.vc)
		assert.isUndefined(model.body?.sections?.[0].isComplete)

		this.vc.markSlideAsComplete(0)

		model = this.render(this.vc)
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
		assert.isFalsy(this.render(this.vc).footer)
		this.vc.updateFooter({ buttons: [{ label: 'Hey!' }] })
		assert.doesInclude(this.render(this.vc).footer?.buttons, { label: 'Hey!' })
	}

	@test()
	protected static addingSlideTriggersRender() {
		this.vc.addSlide({ title: 'Go!' })
		//@ts-ignore
		vcAssertUtil.assertTriggerRenderCount(this.vc.cardVc, 1)

		this.vc.addSlide({ title: 'Go!' })

		//@ts-ignore
		vcAssertUtil.assertTriggerRenderCount(this.vc.cardVc, 2)
	}

	@test()
	protected static removingSlideTrigersRender() {
		this.vc.addSlide({ title: 'Go!' })
		this.vc.removeSlide(1)

		//@ts-ignore
		vcAssertUtil.assertTriggerRenderCount(this.vc.cardVc, 2)
	}

	@test()
	protected static async cantJumpToSlideWithNonNumericIndex() {
		//@ts-ignore
		const err = await assert.doesThrowAsync(() => this.vc.jumpToSlide('taco'))
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['slideIndex'],
		})
	}
}
