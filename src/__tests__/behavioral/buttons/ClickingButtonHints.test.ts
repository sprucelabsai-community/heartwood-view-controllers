import { assert, test } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import { interactor } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

export default class ClickingButtonHintsTest extends AbstractViewControllerTest {
	@test()
	protected static async throwsWhenMissing() {
		//@ts-ignore
		const err = await assert.doesThrowAsync(() => interactor.clickButtonHint())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc', 'buttonId'],
		})
	}

	@test()
	protected static async throwsWhenNotFindingButton() {
		const cardVc = this.Controller('card', {})
		await assert.doesThrowAsync(
			() => interactor.clickButtonHint(cardVc, 'not-found'),
			'not find'
		)
	}

	@test()
	protected static async throwsWhenNoHintListenerWasSet() {
		const cardVc = this.Controller('card', {
			body: {
				sections: [
					{
						buttons: [{ id: 'found' }],
					},
				],
			},
		})
		await assert.doesThrowAsync(
			() => interactor.clickButtonHint(cardVc, 'found'),
			'onClickHintIcon'
		)
	}

	@test()
	protected static async canClickFirstHintIcon() {
		const cardVc = this.Controller('card', {
			body: {
				sections: [
					{
						buttons: [{ id: 'found', onClickHintIcon: () => {} }],
					},
				],
			},
		})
		await interactor.clickButtonHint(cardVc, 'found')
	}

	@test()
	protected static async clicksALaterButton() {
		const cardVc = this.Controller('card', {
			body: {
				sections: [
					{},
					{
						buttons: [
							{ id: 'found' },
							{ id: 'another', onClickHintIcon: () => {} },
						],
					},
				],
			},
		})
		await interactor.clickButtonHint(cardVc, 'another')
	}

	@test()
	protected static async clicksButtonInFooter() {
		const cardVc = this.Controller('card', {
			footer: {
				buttons: [
					{ id: 'found' },
					{ id: 'another', onClickHintIcon: () => {} },
				],
			},
		})
		await interactor.clickButtonHint(cardVc, 'another')
	}

	@test()
	protected static async triggersCallback() {
		let wasHit = false
		const cardVc = this.Controller('card', {
			body: {
				sections: [
					{
						buttons: [
							{
								id: 'a-button',
								onClickHintIcon: () => {
									wasHit = true
								},
							},
						],
					},
				],
			},
		})

		await interactor.clickButtonHint(cardVc, 'a-button')

		assert.isTrue(wasHit)
	}
}
