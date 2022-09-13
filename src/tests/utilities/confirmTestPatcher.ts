import { assert } from '@sprucelabs/test-utils'
import { AbstractViewController } from '../..'

const confirmTestPatcher = {
	patchConfirmToThrow(vc: AbstractViewController<any>) {
		//@ts-ignore
		vc._originalConfirm = vc.confirm?.bind(vc)

		//@ts-ignore
		vc.confirm = async () => {
			assert.fail(
				`Your view controller unexpectedly rendered a confirm! If this was intentional, use 'await vcAssert.assertRendersConfirm(this.vc, () => ...)'`
			)
		}
	},
}

export default confirmTestPatcher
