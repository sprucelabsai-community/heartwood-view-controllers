import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import { interactor } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

type Button = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button

export default class ClickingButtonHintsTest extends AbstractViewControllerTest {
	@test()
	protected static async throwsWhenMissing() {
		//@ts-ignore
		const err = await assert.doesThrowAsync(() => interactor.clickButtonHint())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['button'],
		})
	}

	@test()
	protected static async canClickHintIcon() {
		const button = await this.button({
			onClickHintIcon: () => {},
		})
		await interactor.clickButtonHint(button)
	}

	@test()
	protected static async throwsWhenNoHintListenerWasSet() {
		const button = await this.button({})
		await assert.doesThrowAsync(() => interactor.clickButtonHint(button))
	}

	@test()
	protected static async triggersCallback() {
		let wasHit = false
		const button = await this.button({
			onClickHintIcon: () => {
				wasHit = true
			},
		})
		await interactor.clickButtonHint(button)

		assert.isTrue(wasHit)
	}

	private static async button(btn: Partial<Button>) {
		const button = {
			...btn,
		}

		return button as Button
	}
}
