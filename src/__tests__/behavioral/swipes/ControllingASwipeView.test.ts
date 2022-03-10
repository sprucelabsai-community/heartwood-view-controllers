import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import SwipeCardViewController, {
	SwipeViewControllerOptions,
} from '../../../viewControllers/SwipeCard.vc'

export default class SwipingThroughSlidesTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
	private static vc: SwipeCardViewController
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
		assert.isEqual(model.body?.sections?.[0].text?.content, 'hey there updated')
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
		assert.isEqual(model.body?.sections?.[0].text?.content, 'hey there updated')
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
		assert.isFalsy(this.render(this.vc).footer)
		this.vc.setFooter({ buttons: [{ label: 'Hey!' }] })
		assert.doesInclude(this.render(this.vc).footer?.buttons, { label: 'Hey!' })
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
	protected static async cantJumpToSlideWithNonNumericIndex() {
		//@ts-ignore
		const err = await assert.doesThrowAsync(() => this.vc.jumpToSlide('taco'))
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

	private static Vc(
		options: SwipeViewControllerOptions
	): SwipeCardViewController {
		return this.Controller('swipeCard', options)
	}
}
