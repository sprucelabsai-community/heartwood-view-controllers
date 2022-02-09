import { assert, test } from '@sprucelabs/test'
import { AbstractSkillViewController, interactor, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

class TestSvc extends AbstractSkillViewController {
	public getListVc() {
		return this.Controller('list', {
			rows: [
				{
					id: 'test',
					cells: [],
				},
			],
		})
	}

	public render() {
		return {
			layouts: [],
		}
	}
}

export default class AssertingConfirmsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		testSvc: TestSvc,
	}

	@test()
	protected static async passesBackErrorInConfirm() {
		//@ts-ignore
		const vc = this.Controller('testSvc', {}) as TestSvc

		const err = await assert.doesThrowAsync(() =>
			vcAssert.assertRendersConfirm(vc, async () =>
				interactor.clickRow(vc.getListVc(), 0)
			)
		)

		assert.doesInclude(err.message, 'onClick')
	}
}
