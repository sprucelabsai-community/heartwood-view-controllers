import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
class ClickingACell {}

export default class ClickingACellTest extends AbstractViewControllerTest {
	@test()
	protected static async canCreateClickingACell() {
		const err = await assert.doesThrowAsync(() => interactor.clickCell())
	}
}
