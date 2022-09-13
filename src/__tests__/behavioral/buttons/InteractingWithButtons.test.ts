import { assert, test } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import vcAssert from '../../../tests/utilities/vcAssert'

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
}
