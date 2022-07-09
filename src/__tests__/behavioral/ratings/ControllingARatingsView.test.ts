import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import RatingsViewController, {
	RatingsViewControllerOptions,
} from '../../../viewControllers/Ratings.vc'

export default class ControllingARatingsViewTest extends AbstractViewControllerTest {
	private static vc: RatingsViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Vc()
	}

	@test()
	protected static canRenderWithoutOptions() {
		this.render(this.vc)
	}

	@test('1.1 out of range', 1.1)
	@test('-1 out of range', -1)
	protected static throwsIfValueOutOfRange(value: number) {
		const err = assert.doesThrow(() => this.Vc({ value }))
		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['value'],
		})

		const err2 = assert.doesThrow(() => this.vc.setValue(value))
		errorAssert.assertError(err2, 'INVALID_PARAMETERS', {
			parameters: ['value'],
		})
	}

	@test('0.3 is in range', 0.3)
	@test('0.2 is in range', 0.2)
	@test('0.2 is in range', 0.99)
	@test('0 is in range', 0)
	protected static acceptsValueInRange(value: number) {
		this.vc = this.Vc({ value })
		this.assertRendersValue(value)
	}

	@test('set value to 0.3', 0.3)
	@test('set value to 0.2', 0.2)
	protected static canSetValueLater(value: number) {
		this.vc.setValue(value)
		assert.isEqual(this.vc.getValue(), value)
		vcAssert.assertTriggerRenderCount(this.vc, 1)
		this.assertRendersValue(value)
	}

	@test('on change with 0.5', 0.5)
	@test('on change with 0.15', 0.15)
	protected static triggersOnChangeWhenValueBeingChanged(value: number) {
		let wasHit = false
		let passedValue: number | undefined
		this.vc = this.Vc({
			onChange: (value) => {
				wasHit = true
				passedValue = value
			},
		})

		assert.isFalse(wasHit)

		this.vc.setValue(value)

		assert.isTrue(wasHit)
		assert.isEqual(passedValue, value)
	}

	@test()
	protected static throwsWithBadRendersAs() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.Vc({ renderAs: 'aoeu' }))
		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['renderAs'],
		})
	}

	@test()
	protected static canSetToValidRenderAs() {
		assert.isEqual(this.Vc().getRenderAs(), undefined)
		let vc = this.Vc({ renderAs: 'stars' })
		assert.isEqual(vc.getRenderAs(), 'stars')
		assert.isEqual(
			this.render(this.Vc({ renderAs: 'smilies' })).renderAs,
			'smilies'
		)
	}

	@test()
	protected static throwsWhenSettingRenderAsToInvalidValueLater() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.Vc().setRenderAs('aoeu'))
		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['renderAs'],
		})
	}

	@test('can set to smilies later', 'smilies')
	@test('can set to stars later', 'stars')
	protected static canSetValidRenderAsLater(renderAs: any) {
		this.vc.setRenderAs(renderAs)
		vcAssert.assertTriggerRenderCount(this.vc, 1)
		assert.isEqual(this.render(this.vc).renderAs, renderAs)
	}

	@test()
	protected static canControlEditableStatus() {
		assert.isFalse(this.vc.getCanBeChanged())
		assert.isFalse(this.render(this.vc).canBeChanged)

		this.vc.setCanBeChanged(true)
		assert.isTrue(this.render(this.vc).canBeChanged)
		assert.isTrue(this.vc.getCanBeChanged())

		this.vc.setCanBeChanged(false)
		assert.isFalse(this.vc.getCanBeChanged())
		assert.isFalse(this.render(this.vc).canBeChanged)
	}

	@test()
	protected static canPassAndRenderEditableStatus() {
		this.vc = this.Vc({
			canBeChanged: true,
		})

		assert.isTrue(this.vc.getCanBeChanged())
	}

	private static Vc(
		options?: RatingsViewControllerOptions
	): RatingsViewController {
		return this.Controller('ratings', { ...options })
	}

	private static assertRendersValue(value: number) {
		const model = this.render(this.vc)
		assert.isEqual(model.value, value)
	}
}
