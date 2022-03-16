import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'

export default class ClickingACellTest extends AbstractViewControllerTest {
	@test()
	protected static async canCreateClickingACell() {
		//@ts-ignore
		await assert.doesThrowAsync(() => interactor.clickCell())
	}
}
