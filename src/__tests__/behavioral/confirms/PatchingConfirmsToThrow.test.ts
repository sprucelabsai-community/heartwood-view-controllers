import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import { AbstractViewController, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import confirmTestPatcher from '../../../tests/utilities/confirmTestPatcher'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
class ConfirmVc extends AbstractViewController<Card> {
	public async goConfirm() {
		await this.confirm({ title: 'Crap!!' })
	}

	public render(): Card {
		return {}
	}
}

export default class PatchingConfirmsToThrowTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		confirmTest: ConfirmVc,
	}
	private static vc: ConfirmVc

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Controller('confirmTest', {}) as any
	}

	@test()
	protected static patcherExists() {
		assert.isFunction(confirmTestPatcher.patchConfirmToThrow)
	}

	@test()
	protected static async patchingCausesConfirmsToThrow() {
		confirmTestPatcher.patchConfirmToThrow(this.vc)
		await assert.doesThrowAsync(() => this.vc.goConfirm())
	}

	@test()
	protected static async canStillAssertAConfirm() {
		confirmTestPatcher.patchConfirmToThrow(this.vc)
		await vcAssert.assertRendersConfirm(this.vc, () => this.vc.goConfirm())
	}
}
