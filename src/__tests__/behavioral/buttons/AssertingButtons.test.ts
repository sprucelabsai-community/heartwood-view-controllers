import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, generateId, test } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import { Button } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import buttonAssert from '../../../tests/utilities/buttonAssert'

export default class AssertingButtonsTest extends AbstractViewControllerTest {
	@test()
	protected static assertCardRendersButtonsThrowsWhenMissing() {
		//@ts-ignore
		const err = assert.doesThrow(() => buttonAssert.cardRendersButtons())

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

		const buttonVcs = buttonAssert.cardRendersButtons(vc, toCheckIds)
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

		const [, secondBtnVc] = buttonAssert.cardRendersButtons(vc, [
			'first',
			'second',
		])

		const model = this.render(secondBtnVc)

		assert.isEqualDeep(model, { id: 'second', label: 'Waka' })
	}

	@test()
	protected static knowsWhenButtonIsDisabledOrEnabled() {
		const id = generateId()
		const id2 = generateId()

		const vc = this.Vc([
			{
				id,
			},
			{
				id: id2,
				isEnabled: false,
			},
		])

		assert.doesThrow(
			() => buttonAssert.buttonIsDisabled(vc, generateId()),
			'missing buttons'
		)

		assert.doesThrow(
			() => buttonAssert.buttonIsEnabled(vc, generateId()),
			'missing buttons'
		)

		assert.doesThrow(
			() => buttonAssert.buttonIsDisabled(vc, id),
			'not disabled'
		)

		assert.doesThrow(() => buttonAssert.buttonIsEnabled(vc, id2), 'not enabled')

		buttonAssert.buttonIsDisabled(vc, id2)
		buttonAssert.buttonIsEnabled(vc, id)
	}

	private static assertRendersButton(buttons?: Button[], idToCheck = 'test') {
		const vc = this.Vc(buttons)
		const btnVc = buttonAssert.cardRendersButton(vc, idToCheck)

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
