import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import { AbstractSkillViewController, vcAssertUtil } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'

class SuccessAlertSkillViewController extends AbstractSkillViewController {
	public async renderSuccess() {
		await this.alert({
			style: 'success',
			message: 'yay bro!',
		})
	}

	public async showWithStyle(style: string) {
		await this.alert({
			style: style as any,
			message: 'yay bro!',
		})
	}

	public async doNothing() {}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView {
		return {
			layouts: [],
		}
	}
}

export default class AssertingSuccessAlertsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		'success.root': SuccessAlertSkillViewController,
	}

	@test()
	protected static async throwsWhenNothingRendered() {
		const vc = this.Vc()

		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertRendersSuccessAlert(vc, () => vc.doNothing())
		)
	}

	@test()
	protected static async doesNotThrowWhenSuccessRendered() {
		const vc = this.Vc()

		await vcAssertUtil.assertRendersSuccessAlert(vc, () => vc.renderSuccess())

		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertRendersAlert(vc, () => vc.renderSuccess())
		)
	}

	@test()
	protected static async throwsWhenAnyOtherAlertStyleRendered() {
		const style = 'info'
		const vc = this.Vc()

		await assert.doesThrowAsync(() =>
			vcAssertUtil.assertRendersSuccessAlert(vc, () => vc.showWithStyle(style))
		)
	}

	private static Vc() {
		return this.Controller(
			'success.root' as any,
			{}
		) as SuccessAlertSkillViewController
	}
}
