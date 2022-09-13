import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import { ButtonBarViewController, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

export default class AssertingButtonBarsInCards extends AbstractViewControllerTest {
	@test()
	protected static throwsWhenMissingParams() {
		//@ts-ignore
		const err = assert.doesThrow(() => vcAssert.assertCardRendersButtonBar())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['cardVc'],
		})
	}

	@test()
	protected static canFindButtonBarInFirstSection() {
		this.assertFindsButtonBar([
			{
				buttonBar: this.renderButtonBar(),
			},
		])
	}

	@test()
	protected static throwsWithNoButtonBar() {
		const cardVc = this.CardVc()
		assert.doesThrow(() => vcAssert.assertCardRendersButtonBar(cardVc))
	}

	@test()
	protected static canFindButtonBarInSecionSection() {
		this.assertFindsButtonBar([
			{},
			{
				buttonBar: this.renderButtonBar(),
			},
		])
	}

	@test()
	protected static rendersButtonBar() {
		const buttonBarVc = this.ButtonBarVc()

		const vc = this.assertFindsButtonBar([
			{
				buttonBar: buttonBarVc.render(),
			},
		])

		assert.isEqual(vc, buttonBarVc)
	}

	private static assertFindsButtonBar(sections: Section[]) {
		const cardVc = this.CardVc(sections)

		return vcAssert.assertCardRendersButtonBar(cardVc)
	}

	private static CardVc(sections: Section[] = []) {
		return this.Controller('card', {
			body: {
				sections,
			},
		})
	}

	private static renderButtonBar(): ButtonBar {
		return this.ButtonBarVc().render()
	}

	private static ButtonBarVc(): ButtonBarViewController {
		return this.Controller('buttonBar', {
			buttons: [],
		})
	}
}

type Section = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection
type ButtonBar = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBar
