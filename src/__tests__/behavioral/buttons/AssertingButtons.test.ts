import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'

type Button = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button

export default class AssertingButtonsTest extends AbstractViewControllerTest {
	@test()
	protected static assertCardRendersButtonsThrowsWhenMissing() {
		//@ts-ignore
		const err = assert.doesThrow(() => vcAssert.assertCardRendersButtons())

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc', 'ids'],
		})
	}

	@test()
	protected static returnsStubButtonVc() {
		const btnVc = this.assertRendersButton()
		assert.isTruthy(btnVc)
	}

	@test()
	protected static hasRenderMethod() {
		const btnVc = this.assertRendersButton()
		assert.isFunction(btnVc.render)
	}

	@test(
		'renders expected button 1',
		[
			{
				id: 'test',
			},
		],
		'test'
	)
	@test(
		'renders expected button 2',
		[
			{
				id: 'test',
			},
			{
				id: 'test2',
				label: 'go team!',
			},
		],
		'test2'
	)
	protected static renderReturnsButtonModel(
		buttons: Button[],
		idToCheck: string
	) {
		const btnVc = this.assertRendersButton(buttons, idToCheck)
		const model = this.render(btnVc)
		const match: any = buttons.find((b) => b.id === idToCheck)

		assert.isEqualDeep(model, match)
	}

	@test(`can find 2 buttons`, ['first', 'third'])
	@test(`can find 3 buttons`, ['first', 'third', 'fourth'])
	protected static canFindManyButtons(toCheckIds: string[]) {
		const vc = this.Vc([
			{
				id: 'first',
			},
			{
				id: 'second',
			},
			{
				id: 'third',
			},
			{
				id: 'fourth',
			},
		])

		const buttonVcs = vcAssert.assertCardRendersButtons(vc, toCheckIds)
		assert.isLength(buttonVcs, toCheckIds.length)
	}

	@test()
	protected static laterModelRendersAsExpected() {
		const vc = this.Vc([
			{
				id: 'first',
			},
			{
				id: 'second',
				label: 'Waka',
			},
		])

		const [, secondBtnVc] = vcAssert.assertCardRendersButtons(vc, [
			'first',
			'second',
		])

		const model = this.render(secondBtnVc)

		assert.isEqualDeep(model, { id: 'second', label: 'Waka' })
	}

	private static assertRendersButton(buttons?: Button[], idToCheck = 'test') {
		const vc = this.Vc(buttons)
		const btnVc = vcAssert.assertCardRendersButton(vc, idToCheck)

		return btnVc
	}

	private static Vc(
		buttons:
			| SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[]
			| undefined
	) {
		return this.Controller('card', {
			body: {
				sections: [
					{
						buttons: buttons ?? [
							{
								id: 'test',
							},
						],
					},
				],
			},
		})
	}
}
