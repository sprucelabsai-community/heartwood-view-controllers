import { assert, test } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
	CardViewController,
	CriticalError,
} from '../../../types/heartwood.types'

export default class AssertingAndInteractingWithCriticalErrorsTest extends AbstractViewControllerTest {
	private static vc: CardViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Controller('card', {})
	}

	@test()
	protected static async canCreateAssertingCriticalErrors() {
		vcAssert.assertCardDoesNotRenderCriticalError(this.vc)

		assert.doesThrow(() => vcAssert.assertCardRendersCriticalError(this.vc))

		this.setError()

		vcAssert.assertCardRendersCriticalError(this.vc)
		assert.doesThrow(() =>
			vcAssert.assertCardDoesNotRenderCriticalError(this.vc)
		)
	}

	@test()
	protected static async throwsWhenButtonNotFoundInError() {
		await this.assertThrowsMatching('this.cardVc.setCriticalError(...)')
	}

	@test()
	protected static async throwsWhenButtonNotFound() {
		this.setError({
			buttons: [
				{
					id: 'whatever',
				},
			],
		})

		await this.throwsCantFindButton()
	}

	@test()
	protected static async throwsWhenMissingOnClick() {
		this.setError({
			buttons: [
				{
					id: 'whatever',
				},
				{
					id: 'test',
				},
			],
		})

		await this.assertThrowsMatching('onClick', 'whatever')
		await this.assertThrowsMatching('onClick', 'test')
	}

	@test()
	protected static async actuallyCallsTheCallback() {
		let wasHit = false
		this.setError({
			buttons: [
				{
					id: 'test',
					onClick: () => {
						wasHit = true
					},
				},
			],
		})

		await this.clickButton()
		assert.isTrue(wasHit)
	}

	private static async throwsCantFindButton(buttonId?: string) {
		await this.assertThrowsMatching('not find the button', buttonId)
	}

	private static async assertThrowsMatching(
		message: string,
		buttonId?: string
	) {
		await assert.doesThrowAsync(() => this.clickButton(buttonId), message)
	}

	private static clickButton(buttonId = 'test') {
		return interactor.clickCriticalErrorButton(this.vc, buttonId)
	}

	private static setError(error: CriticalError = {}) {
		this.vc.setCriticalError(error)
	}
}
