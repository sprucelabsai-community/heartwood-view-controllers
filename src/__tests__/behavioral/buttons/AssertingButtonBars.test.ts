import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'

export default class AssertingButtonBars extends AbstractViewControllerTest {
	protected static controllerMap = {}

	@test()
	protected static throwsWhenMissingParams() {
		//@ts-ignore
		const err = assert.doesThrow(() => vcAssert.assertButtonBarRendersButton())

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['buttonBarVc', 'buttonId'],
		})
	}

	@test('finds first button', 'first')
	@test('finds second button', 'second')
	protected static findsButton(buttonId: string) {
		const vc = this.Controller('buttonBar', {
			buttons: [
				{
					id: 'first',
					label: 'Hey!',
				},
				{
					id: 'second',
					label: 'There!',
				},
			],
		})

		vcAssert.assertButtonBarRendersButton(vc, buttonId)
	}

	@test()
	protected static thowsWhenNoButton() {
		const vc = this.Controller('buttonBar', {
			buttons: [
				{
					id: 'first',
					label: 'Hey!',
				},
			],
		})

		assert.doesThrow(() => vcAssert.assertButtonBarRendersButton(vc, 'second'))
	}
}
