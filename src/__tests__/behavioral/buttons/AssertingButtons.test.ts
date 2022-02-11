import { assert, test } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import { vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

export default class AssertingButtonsTest extends AbstractViewControllerTest {
	@test()
	protected static assertCardRendersButtonsThrowsWhenMissing() {
		//@ts-ignore
		const err = assert.doesThrow(() => vcAssert.assertCardRendersButtons())

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc', 'ids'],
		})
	}
}
