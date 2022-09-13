import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { CardViewController } from '../../../types/heartwood.types'

export default class ControllingACardTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
	private static vc: CardViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Controller('card', {})
	}

	@test()
	protected static getIsFooterEnabledIsTrueToStart() {
		this.assertFooterIsEnabled()
	}

	@test()
	protected static usesValuePassedToFooter() {
		const vc = this.Controller('card', {
			footer: {
				isEnabled: false,
			},
		})
		ControllingACardTest.assertFooterIsDisabled(vc)
	}

	@test()
	protected static canDisableAndEnableFooter() {
		this.vc.disableFooter()
		this.assertFooterIsDisabled()
		this.vc.enableFooter()
	}

	@test('disables footer 1', {
		buttons: [],
		shouldRenderBorder: true,
	})
	@test('disables footer 2', {
		shouldRenderBorder: false,
	})
	protected static persistsFooterOnDisable(footer: Footer) {
		this.vc = this.Controller('card', {
			footer,
		})

		this.vc.disableFooter()

		assert.doesInclude(this.render(this.vc).footer, {
			...footer,
			isEnabled: false,
		})
	}

	@test('enables footer 1', {
		buttons: [],
		shouldRenderBorder: true,
	})
	@test('enables footer 2', {
		shouldRenderBorder: false,
	})
	protected static persistsFooter(footer: Footer) {
		this.vc = this.Controller('card', {
			footer,
		})

		this.vc.enableFooter()

		assert.doesInclude(this.render(this.vc).footer, {
			...footer,
			isEnabled: true,
		})
	}

	@test()
	protected static callingEnableDoesNotBlowUp() {
		this.vc.enableFooter()
	}

	@test()
	protected static triggersRenderAsExpected() {
		this.vc.enableFooter()
		vcAssert.assertTriggerRenderCount(this.vc, 1)
		this.vc.disableFooter()
		vcAssert.assertTriggerRenderCount(this.vc, 2)
	}

	private static assertFooterIsEnabled() {
		assert.isTrue(this.vc.getIsFooterEnabled())
	}

	private static assertFooterIsDisabled(vc?: CardViewController) {
		assert.isFalse((vc ?? this.vc).getIsFooterEnabled())
	}
}

type Footer = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter
