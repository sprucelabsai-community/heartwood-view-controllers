import { assert, test } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import vcAssert from '../../../tests/utilities/vcAssert'
import { testFormSchema } from '../forms/testFormOptions'

export default class InteractingWithButtonsTest extends AbstractViewControllerTest {
	@test()
	protected static async canReceiveButtonVcWithoutErroring() {
		let wasHit = false
		const vc = this.Controller('card', {
			body: {
				sections: [
					{
						buttons: [
							{
								id: 'test',
								label: 'go team',
								onClick: () => {
									wasHit = true
								},
							},
						],
					},
				],
			},
		})

		const btn = vcAssert.assertCardRendersButton(vc, 'test')
		await interactor.click(btn)
		assert.isTrue(wasHit)
	}

	@test()
	protected static async canClickButtonInForm() {
		let wasHit = false
		const formVc = this.Controller(
			'form',
			buildForm({
				schema: testFormSchema,
				sections: [],
				footer: {
					buttons: [
						{
							id: 'test',
							label: 'Go!',
							onClick: () => {
								wasHit = true
							},
						},
					],
				},
			})
		)

		const vc = this.Controller('card', {
			body: {
				sections: [
					{
						form: formVc.render(),
					},
				],
			},
		})

		await interactor.clickButton(vc, 'test')

		assert.isTrue(wasHit)
	}
}
