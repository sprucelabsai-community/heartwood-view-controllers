import { assert } from '@sprucelabs/test'
import AbstractViewController from '../../viewControllers/Abstract.vc'

const dialogTestPatcher = {
	patchDialogToThrow(vc: AbstractViewController<any>) {
		//@ts-ignore
		vc._oldRenderInDialog = vc.renderInDialog?.bind(vc)

		//@ts-ignore
		vc.renderInDialog = () => {
			assert.fail(
				`You unexpectedly rendered a dialog. Make sure you use vcAssert.assertRendersDialog()`
			)
		}
	},
}

export default dialogTestPatcher
