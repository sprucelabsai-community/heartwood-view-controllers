import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'

export default class FakingSomethingForInterviewTest extends AbstractViewControllerTest {
	private static fake: FakingSomethingForInterview
	@test()
	protected static async beforeEach() {
		await super.beforeEach()
		this.fake = new FakingSomethingForInterview()
	}

	@test()
	protected static canReturnTrue() {
		this.assertTrue()
	}

	@test()
	protected static canOverrideTrue() {
		this.setResponseTo(false)
		this.assertFalse()
		this.setResponseTo(true)
		this.assertTrue()
	}

	private static setResponseTo(response: boolean) {
		this.fake.setResponseTo(response)
	}

	private static assertTrue() {
		assert.isTrue(this.fake.getResults())
	}

	private static assertFalse() {
		assert.isFalse(this.fake.getResults())
	}
}

class FakingSomethingForInterview {
	private result = true
	public setResponseTo(results: boolean) {
		this.result = results
	}
	public getResults(): boolean {
		return this.result
	}
}
