import { assert, test } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { CardFooter, CardViewController } from '../../../types/heartwood.types'

export default class AssertingCardFootersTest extends AbstractViewControllerTest {
	private static vc: CardViewController
	@test()
	protected static knowsIfFooterIsDisabed() {
		this.setFooter({
			isEnabled: false,
		})

		this.assertFooterIsDisabled()
		assert.doesThrow(() => this.assertFooterIsEnabled())
	}

	@test()
	protected static knowsIfFooterIsEnabled() {
		this.setFooter({
			isEnabled: true,
		})

		assert.doesThrow(() => this.assertFooterIsDisabled())
		this.assertFooterIsEnabled()
	}

	@test()
	protected static enabledToStart() {
		this.setFooter({})
		this.assertFooterIsEnabled()
	}

	private static assertFooterIsDisabled() {
		vcAssert.assertCardFooterIsDisabled(this.vc)
	}

	private static assertFooterIsEnabled() {
		vcAssert.assertCardFooterIsEnabled(this.vc)
	}

	private static setFooter(footer: CardFooter) {
		this.vc = this.Controller('card', {
			footer,
		})
	}
}
