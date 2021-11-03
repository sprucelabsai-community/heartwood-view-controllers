import { buildSchema } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import buildBigForm from '../../builders/buildBigForm'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { DEMO_NUMBER } from '../../tests/constants'
import BigFormViewController from '../../viewControllers/BigForm.vc'

const testFormSchema = buildSchema({
	id: 'bigFormTest',
	fields: {
		phone: {
			type: 'phone',
			isRequired: true,
		},
		pin: {
			type: 'number',
			isRequired: true,
		},
		optional: {
			type: 'text',
		},
	},
})

type TestFormSchema = typeof testFormSchema

export default class ControllingABigFormTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
	private static vc: BigFormViewController<TestFormSchema>

	protected static async beforeEach() {
		await super.beforeEach()

		this.vc = this.Controller(
			'bigForm',
			buildBigForm({
				schema: testFormSchema,
				sections: [
					{
						fields: ['phone'],
					},
					{
						fields: ['pin'],
					},
					{
						fields: ['optional'],
					},
				],
			})
		) as any
	}

	@test()
	protected static async canGetVc() {
		assert.isTruthy(this.vc)
	}

	@test()
	protected static requiredFieldMissingInvalid() {
		const isValid = this.vc.isSlideValid(0)
		assert.isFalse(isValid)
	}

	@test()
	protected static failsWithInvalidPhoneNumber() {
		this.vc.setValue('phone', '12341234')
		const isValid = this.vc.isSlideValid(0)
		assert.isFalse(isValid)
	}

	@test()
	protected static passesWithValidNumber() {
		this.vc.setValue('phone', DEMO_NUMBER)

		const isValid = this.vc.isSlideValid(0)
		assert.isTrue(isValid)

		assert.isFalse(this.vc.isSlideValid(1))
	}

	@test()
	protected static startsAtFirstSlide() {
		assert.isEqual(this.vc.getPresentSlide(), 0)
	}

	@test()
	protected static async canSetCurrentSlide() {
		await this.vc.jumpToSlide(1)
		assert.isEqual(this.vc.getPresentSlide(), 1)
	}

	@test()
	protected static async settingNegativeSlideGoesToZero() {
		await this.vc.jumpToSlide(-1)
		assert.isEqual(this.vc.getPresentSlide(), 0)
	}

	@test()
	protected static async settingTooHighOfSlideSetsToLast() {
		await this.vc.jumpToSlide(9999)
		assert.isEqual(this.vc.getPresentSlide(), 2)
	}

	@test()
	protected static async settingCurrentSlideReplaysThatSlidesTalkingSprucebot() {
		let wasHit = false
		let whatWasHit = -1

		this.vc.replaySlideHeading = (idx) => {
			wasHit = true
			whatWasHit = idx
		}

		await this.vc.jumpToSlide(2)

		assert.isTrue(wasHit)
		assert.isEqual(whatWasHit, 2)
	}

	@test()
	protected static async submittingLastSlideInvokesOnSubmitCallback() {
		let onSubmitSlideCount = 0
		let onSubmitCount = 0
		let onSubmitSlideOptions: any | undefined
		let onSubmitOptions: any | undefined

		this.vc.setOnSubmitSlide((options) => {
			onSubmitSlideCount++
			onSubmitSlideOptions = options
		})

		this.vc.setOnSubmit((options) => {
			onSubmitCount++
			onSubmitOptions = options
		})

		this.vc.setValues({
			optional: 'yay',
			phone: '555-555-5555',
			pin: 123,
		})

		await this.vc.submit()

		assert.isEqual(onSubmitSlideCount, 1)
		assert.isEqual(onSubmitCount, 0)

		await this.vc.submit()

		assert.isEqual(onSubmitSlideCount, 2)
		assert.isEqual(onSubmitCount, 0)

		await this.vc.submit()

		assert.isEqual(onSubmitSlideCount, 3)
		assert.isEqual(onSubmitCount, 1)

		assert.isEqual(onSubmitSlideOptions, onSubmitOptions)
	}

	@test()
	protected static async canCancelSubmitByReturningFalseFromSubmitSlide() {
		this.vc.setOnSubmitSlide(() => {
			if (this.vc.getIsLastSlide()) {
				return false
			}

			return
		})

		let wasHit = false
		this.vc.setOnSubmit(() => {
			wasHit = true
		})

		this.vc.setValues({
			optional: 'yay',
			phone: '555-555-5555',
			pin: 123,
		})

		await this.vc.submit()
		await this.vc.submit()
		await this.vc.submit()

		assert.isFalse(wasHit)
	}
}
